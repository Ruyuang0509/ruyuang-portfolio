export const WEB_AUDIO_MESSAGES = Object.freeze({
  unsupported: "此瀏覽器不支援 Web Audio；作品研究說明仍可完整閱讀。",
  missingStereoPanner: "此瀏覽器缺少立體聲定位功能；請改用支援 Web Audio 的瀏覽器。",
  startFailed: "聲音啟用失敗；請確認瀏覽器允許音訊後再試一次。其他作品內容不受影響。",
});

export const getInitialWebAudioState = (getAudioContextClass) =>
  getAudioContextClass()
    ? { status: "notStarted", errorMessage: "" }
    : { status: "unsupported", errorMessage: WEB_AUDIO_MESSAGES.unsupported };

const createResumeAttempt = (context, { setTimer, clearTimer, timeoutMs }) => {
  let cancel = () => undefined;
  const promise = new Promise((resolve, reject) => {
    let settled = false;
    const timeoutId = setTimer(() => {
      if (settled) return;
      settled = true;
      reject(new Error("AudioContext resume timed out"));
    }, timeoutMs);

    Promise.resolve()
      .then(() => context.resume())
      .then(
        (value) => {
          if (settled) return;
          settled = true;
          clearTimer(timeoutId);
          resolve(value);
        },
        (error) => {
          if (settled) return;
          settled = true;
          clearTimer(timeoutId);
          reject(error);
        },
      );

    cancel = () => {
      if (settled) return;
      settled = true;
      clearTimer(timeoutId);
      reject(new Error("AudioContext resume cancelled"));
    };
  });

  return { cancel: () => cancel(), promise };
};

const disconnectGraph = (graph) => {
  if (!graph) return;
  for (const node of graph.nodes) {
    try {
      node.disconnect();
    } catch {
      // A node may already be disconnected during overlapping lifecycle cleanup.
    }
  }
};

const closeContext = (context) => {
  if (!context || context.state === "closed") return;
  void context.close().catch(() => undefined);
};

export function createWebAudioController({
  getAudioContextClass,
  onStateChange = () => undefined,
  setTimer = globalThis.setTimeout.bind(globalThis),
  clearTimer = globalThis.clearTimeout.bind(globalThis),
  resumeTimeoutMs = 3000,
  releaseDelayMs = 50,
} = {}) {
  if (typeof getAudioContextClass !== "function") {
    throw new TypeError("createWebAudioController requires getAudioContextClass");
  }

  let graph = null;
  let pendingContext = null;
  let pendingResumeCancel = null;
  let generation = 0;
  let destroyed = false;
  const scheduledClosures = new Map();
  let state = getInitialWebAudioState(getAudioContextClass);

  const emit = (status, errorMessage = "") => {
    state = { status, errorMessage };
    if (!destroyed) onStateChange(state);
  };

  const finalizeGraph = (targetGraph) => {
    targetGraph.context.onstatechange = null;
    disconnectGraph(targetGraph);
    closeContext(targetGraph.context);
  };

  const flushScheduledClosures = () => {
    const pendingClosures = [...scheduledClosures.entries()];
    scheduledClosures.clear();
    for (const [timerId, targetGraph] of pendingClosures) {
      clearTimer(timerId);
      finalizeGraph(targetGraph);
    }
    return pendingClosures.length > 0;
  };

  const closeGraph = (immediate = false) => {
    const activeGraph = graph;
    const activePendingContext = pendingContext;
    graph = null;
    pendingContext = null;
    generation += 1;
    const cancelResume = pendingResumeCancel;
    pendingResumeCancel = null;
    cancelResume?.();

    const flushedScheduledClosure = immediate ? flushScheduledClosures() : false;

    if (activePendingContext && activePendingContext !== activeGraph?.context) {
      closeContext(activePendingContext);
    }
    if (!activeGraph) return Boolean(activePendingContext) || flushedScheduledClosure;

    const now = activeGraph.context.currentTime;
    activeGraph.oscillator.onended = null;
    try {
      activeGraph.envelope.gain.cancelScheduledValues(now);
      activeGraph.envelope.gain.setValueAtTime(
        immediate ? 0 : Math.max(activeGraph.envelope.gain.value, 0.0001),
        now,
      );
      if (!immediate) {
        activeGraph.envelope.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);
      }
      activeGraph.oscillator.stop(immediate ? now : now + 0.04);
    } catch {
      // The oscillator can only be stopped once; cleanup continues below.
    }

    if (immediate) {
      finalizeGraph(activeGraph);
    } else {
      const timerId = setTimer(() => {
        scheduledClosures.delete(timerId);
        finalizeGraph(activeGraph);
      }, releaseDelayMs);
      scheduledClosures.set(timerId, activeGraph);
    }
    return true;
  };

  const start = async () => {
    if (destroyed) return false;
    const AudioContextClass = getAudioContextClass();
    if (!AudioContextClass) {
      emit("unsupported", WEB_AUDIO_MESSAGES.unsupported);
      return false;
    }

    closeGraph(true);
    const activeGeneration = generation;
    emit("starting");
    let context;

    try {
      context = new AudioContextClass({ latencyHint: "interactive" });
      pendingContext = context;
      if (typeof context.createStereoPanner !== "function") {
        pendingContext = null;
        closeContext(context);
        emit("unsupported", WEB_AUDIO_MESSAGES.missingStereoPanner);
        return false;
      }

      const resumeAttempt = createResumeAttempt(context, {
        setTimer,
        clearTimer,
        timeoutMs: resumeTimeoutMs,
      });
      pendingResumeCancel = resumeAttempt.cancel;
      try {
        await resumeAttempt.promise;
      } finally {
        if (pendingResumeCancel === resumeAttempt.cancel) pendingResumeCancel = null;
      }
      if (destroyed || activeGeneration !== generation) {
        if (pendingContext === context) pendingContext = null;
        closeContext(context);
        return false;
      }

      const oscillator = context.createOscillator();
      const filter = context.createBiquadFilter();
      const voiceGain = context.createGain();
      const envelope = context.createGain();
      const panner = context.createStereoPanner();
      const compressor = context.createDynamicsCompressor();
      const masterGain = context.createGain();

      oscillator.type = "triangle";
      oscillator.frequency.value = 270;
      filter.type = "lowpass";
      filter.frequency.value = 1400;
      filter.Q.value = 0.7;
      voiceGain.gain.value = 0.08;
      envelope.gain.value = 0.0001;
      panner.pan.value = 0;
      compressor.threshold.value = -24;
      compressor.knee.value = 12;
      compressor.ratio.value = 12;
      compressor.attack.value = 0.003;
      compressor.release.value = 0.25;
      masterGain.gain.value = 0.62;

      oscillator.connect(filter);
      filter.connect(voiceGain);
      voiceGain.connect(envelope);
      envelope.connect(panner);
      panner.connect(compressor);
      compressor.connect(masterGain);
      masterGain.connect(context.destination);

      const nextGraph = {
        context,
        oscillator,
        filter,
        voiceGain,
        envelope,
        panner,
        nodes: [oscillator, filter, voiceGain, envelope, panner, compressor, masterGain],
      };
      try {
        oscillator.start();
        envelope.gain.setTargetAtTime(1, context.currentTime, 0.025);
      } catch (error) {
        finalizeGraph(nextGraph);
        throw error;
      }
      graph = nextGraph;
      pendingContext = null;
      context.onstatechange = () => {
        if (destroyed || graph?.context !== context) return;
        if (context.state === "suspended" || context.state === "interrupted" || context.state === "closed") {
          closeGraph(true);
          emit("stopped");
        }
      };
      emit("running");
      return true;
    } catch {
      if (pendingContext === context) pendingContext = null;
      closeContext(context);
      if (destroyed || activeGeneration !== generation) return false;
      emit("error", WEB_AUDIO_MESSAGES.startFailed);
      return false;
    }
  };

  const stop = ({ immediate = false } = {}) => {
    if (destroyed) return false;
    const didCloseGraph = closeGraph(immediate);
    if (!didCloseGraph) return false;
    if (state.status !== "unsupported") emit("stopped");
    return true;
  };

  const updateParameters = ({ pan, frequency, filterFrequency, voiceGain }) => {
    if (destroyed || !graph || graph.context.state !== "running") return false;
    const now = graph.context.currentTime;
    graph.panner.pan.setTargetAtTime(pan, now, 0.025);
    graph.oscillator.frequency.setTargetAtTime(frequency, now, 0.035);
    graph.filter.frequency.setTargetAtTime(filterFrequency, now, 0.045);
    graph.voiceGain.gain.setTargetAtTime(voiceGain, now, 0.035);
    return true;
  };

  const destroy = () => {
    if (destroyed) return false;
    const didCloseGraph = closeGraph(true);
    destroyed = true;
    return didCloseGraph;
  };

  return {
    destroy,
    getState: () => ({ ...state }),
    start,
    stop,
    updateParameters,
  };
}
