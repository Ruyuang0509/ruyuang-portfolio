import test from "node:test";
import assert from "node:assert/strict";
import {
  WEB_AUDIO_MESSAGES,
  createWebAudioController,
} from "../src/audio/webAudioEngineCore.js";

class FakeAudioParam {
  constructor(value = 0) {
    this.value = value;
    this.calls = [];
  }

  cancelScheduledValues(time) {
    this.calls.push(["cancel", time]);
  }

  exponentialRampToValueAtTime(value, time) {
    this.value = value;
    this.calls.push(["ramp", value, time]);
  }

  setTargetAtTime(value, time, constant) {
    this.value = value;
    this.calls.push(["target", value, time, constant]);
  }

  setValueAtTime(value, time) {
    this.value = value;
    this.calls.push(["value", value, time]);
  }
}

class FakeAudioNode {
  constructor() {
    this.connections = [];
    this.disconnected = false;
  }

  connect(node) {
    this.connections.push(node);
    return node;
  }

  disconnect() {
    this.disconnected = true;
  }
}

class FakeOscillatorNode extends FakeAudioNode {
  constructor() {
    super();
    this.frequency = new FakeAudioParam();
    this.onended = null;
    this.started = false;
    this.stoppedAt = null;
    this.type = "sine";
  }

  start() {
    this.started = true;
  }

  stop(time) {
    this.stoppedAt = time;
  }
}

class FakeFilterNode extends FakeAudioNode {
  constructor() {
    super();
    this.frequency = new FakeAudioParam();
    this.Q = new FakeAudioParam();
    this.type = "allpass";
  }
}

class FakeGainNode extends FakeAudioNode {
  constructor() {
    super();
    this.gain = new FakeAudioParam();
  }
}

class FakePannerNode extends FakeAudioNode {
  constructor() {
    super();
    this.pan = new FakeAudioParam();
  }
}

class FakeCompressorNode extends FakeAudioNode {
  constructor() {
    super();
    this.threshold = new FakeAudioParam();
    this.knee = new FakeAudioParam();
    this.ratio = new FakeAudioParam();
    this.attack = new FakeAudioParam();
    this.release = new FakeAudioParam();
  }
}

const createFakeAudioContextClass = ({ hasStereoPanner = true, oscillatorStartThrows = false, resume } = {}) => {
  const instances = [];

  class FakeAudioContext {
    static instances = instances;

    constructor() {
      this.id = instances.length;
      this.state = "suspended";
      this.currentTime = 1;
      this.closeCalls = 0;
      this.resumeCalls = 0;
      this.destination = new FakeAudioNode();
      this.oscillators = [];
      this.filters = [];
      this.gains = [];
      this.panners = [];
      this.compressors = [];
      if (!hasStereoPanner) this.createStereoPanner = undefined;
      instances.push(this);
    }

    close() {
      this.closeCalls += 1;
      this.state = "closed";
      return Promise.resolve();
    }

    resume() {
      this.resumeCalls += 1;
      if (resume) return resume(this);
      this.state = "running";
      return Promise.resolve();
    }

    createOscillator() {
      const node = new FakeOscillatorNode();
      if (oscillatorStartThrows) {
        node.start = () => {
          throw new Error("oscillator start failed");
        };
      }
      this.oscillators.push(node);
      return node;
    }

    createBiquadFilter() {
      const node = new FakeFilterNode();
      this.filters.push(node);
      return node;
    }

    createGain() {
      const node = new FakeGainNode();
      this.gains.push(node);
      return node;
    }

    createStereoPanner() {
      const node = new FakePannerNode();
      this.panners.push(node);
      return node;
    }

    createDynamicsCompressor() {
      const node = new FakeCompressorNode();
      this.compressors.push(node);
      return node;
    }
  }

  return FakeAudioContext;
};

const createManualTimers = () => {
  let nextId = 1;
  const callbacks = new Map();
  return {
    clearTimer(id) {
      callbacks.delete(id);
    },
    runAll() {
      const pending = [...callbacks.values()];
      callbacks.clear();
      for (const callback of pending) callback();
    },
    size() {
      return callbacks.size;
    },
    setTimer(callback) {
      const id = nextId;
      nextId += 1;
      callbacks.set(id, callback);
      return id;
    },
  };
};

const flushMicrotasks = async () => {
  await Promise.resolve();
  await Promise.resolve();
};

test("unsupported environments stay readable without creating a context", async () => {
  const states = [];
  const controller = createWebAudioController({
    getAudioContextClass: () => null,
    onStateChange: (state) => states.push(state),
  });

  assert.deepEqual(controller.getState(), {
    status: "unsupported",
    errorMessage: WEB_AUDIO_MESSAGES.unsupported,
  });
  assert.equal(await controller.start(), false);
  assert.deepEqual(states.at(-1), controller.getState());
});

test("missing StereoPanner closes the context and reports unsupported", async () => {
  const AudioContextClass = createFakeAudioContextClass({ hasStereoPanner: false });
  const controller = createWebAudioController({ getAudioContextClass: () => AudioContextClass });

  assert.equal(await controller.start(), false);
  assert.equal(AudioContextClass.instances[0].closeCalls, 1);
  assert.deepEqual(controller.getState(), {
    status: "unsupported",
    errorMessage: WEB_AUDIO_MESSAGES.missingStereoPanner,
  });
});

test("successful start builds the graph and applies safe parameter updates", async () => {
  const states = [];
  const AudioContextClass = createFakeAudioContextClass();
  const controller = createWebAudioController({
    getAudioContextClass: () => AudioContextClass,
    onStateChange: (state) => states.push(state),
  });

  assert.equal(await controller.start(), true);
  const context = AudioContextClass.instances[0];
  assert.deepEqual(states.map(({ status }) => status), ["starting", "running"]);
  assert.equal(context.oscillators[0].started, true);
  assert.equal(context.oscillators[0].type, "triangle");
  assert.equal(context.oscillators[0].connections[0], context.filters[0]);
  assert.equal(context.gains[2].connections[0], context.destination);
  assert.ok(context.gains[1].gain.calls.some((call) => call[0] === "target" && call[1] === 1));

  assert.equal(controller.updateParameters({
    pan: 0.4,
    frequency: 440,
    filterFrequency: 3200,
    voiceGain: 0.1,
  }), true);
  assert.equal(context.panners[0].pan.value, 0.4);
  assert.equal(context.oscillators[0].frequency.value, 440);
  assert.equal(context.filters[0].frequency.value, 3200);
  assert.equal(context.gains[0].gain.value, 0.1);
});

test("stop fades, disconnects, closes, and remains idempotent", async () => {
  const timers = createManualTimers();
  const AudioContextClass = createFakeAudioContextClass();
  const controller = createWebAudioController({
    getAudioContextClass: () => AudioContextClass,
    setTimer: timers.setTimer,
    clearTimer: timers.clearTimer,
  });
  await controller.start();
  const context = AudioContextClass.instances[0];

  assert.equal(controller.stop(), true);
  assert.equal(controller.getState().status, "stopped");
  assert.equal(context.oscillators[0].stoppedAt, 1.04);
  assert.ok(context.gains[1].gain.calls.some((call) => call[0] === "ramp"));
  assert.equal(context.closeCalls, 0);
  assert.equal(context.oscillators[0].disconnected, false);
  assert.equal(timers.size(), 1);
  timers.runAll();
  assert.equal(context.closeCalls, 1);
  assert.equal(context.oscillators[0].disconnected, true);
  assert.equal(context.gains[2].disconnected, true);
  assert.equal(controller.stop(), false);
  assert.equal(controller.updateParameters({ pan: 0, frequency: 220, filterFrequency: 700, voiceGain: 0.04 }), false);
});

test("immediate lifecycle stop closes without a throttle-prone release timer", async () => {
  const timers = createManualTimers();
  const AudioContextClass = createFakeAudioContextClass();
  const controller = createWebAudioController({
    getAudioContextClass: () => AudioContextClass,
    setTimer: timers.setTimer,
    clearTimer: timers.clearTimer,
  });
  await controller.start();
  const context = AudioContextClass.instances[0];

  assert.equal(controller.stop({ immediate: true }), true);
  assert.equal(controller.getState().status, "stopped");
  assert.equal(context.closeCalls, 1);
  assert.equal(context.oscillators[0].stoppedAt, 1);
  assert.equal(context.oscillators[0].disconnected, true);
  assert.equal(timers.size(), 0);
});

test("resume rejection closes the pending context and reports an error", async () => {
  const AudioContextClass = createFakeAudioContextClass({
    resume: () => Promise.reject(new Error("permission denied")),
  });
  const controller = createWebAudioController({ getAudioContextClass: () => AudioContextClass });

  assert.equal(await controller.start(), false);
  assert.equal(AudioContextClass.instances[0].closeCalls, 1);
  assert.deepEqual(controller.getState(), {
    status: "error",
    errorMessage: WEB_AUDIO_MESSAGES.startFailed,
  });
});

test("resume timeout closes the pending context and reports an error", async () => {
  const timers = createManualTimers();
  const AudioContextClass = createFakeAudioContextClass({
    resume: () => new Promise(() => undefined),
  });
  const controller = createWebAudioController({
    getAudioContextClass: () => AudioContextClass,
    setTimer: timers.setTimer,
    clearTimer: timers.clearTimer,
  });

  const startPromise = controller.start();
  await flushMicrotasks();
  timers.runAll();
  assert.equal(await startPromise, false);
  assert.equal(AudioContextClass.instances[0].closeCalls, 1);
  assert.equal(controller.getState().status, "error");
});

test("stop while resume is pending prevents a late running state", async () => {
  const timers = createManualTimers();
  const AudioContextClass = createFakeAudioContextClass({
    resume: () => new Promise(() => undefined),
  });
  const states = [];
  const controller = createWebAudioController({
    getAudioContextClass: () => AudioContextClass,
    onStateChange: (state) => states.push(state),
    setTimer: timers.setTimer,
    clearTimer: timers.clearTimer,
  });

  const startPromise = controller.start();
  await flushMicrotasks();
  assert.equal(timers.size(), 1);
  assert.equal(controller.stop(), true);
  assert.equal(controller.getState().status, "stopped");
  assert.equal(timers.size(), 0);
  assert.equal(await startPromise, false);
  assert.equal(states.at(-1).status, "stopped");
  assert.equal(AudioContextClass.instances[0].closeCalls, 1);
});

test("destroy while resume is pending cancels without waiting for timeout", async () => {
  const timers = createManualTimers();
  const AudioContextClass = createFakeAudioContextClass({
    resume: () => new Promise(() => undefined),
  });
  const controller = createWebAudioController({
    getAudioContextClass: () => AudioContextClass,
    setTimer: timers.setTimer,
    clearTimer: timers.clearTimer,
  });

  const startPromise = controller.start();
  await flushMicrotasks();
  assert.equal(timers.size(), 1);
  assert.equal(controller.destroy(), true);
  assert.equal(timers.size(), 0);
  assert.equal(await startPromise, false);
  assert.equal(AudioContextClass.instances[0].closeCalls, 1);
});

test("a newer start cancels an older pending generation", async () => {
  const AudioContextClass = createFakeAudioContextClass({
    resume: (context) => {
      if (context.id === 0) {
        return new Promise(() => undefined);
      }
      context.state = "running";
      return Promise.resolve();
    },
  });
  const controller = createWebAudioController({ getAudioContextClass: () => AudioContextClass });

  const firstStart = controller.start();
  await flushMicrotasks();
  const secondStart = controller.start();
  assert.equal(await secondStart, true);
  assert.equal(await firstStart, false);
  assert.equal(AudioContextClass.instances[0].closeCalls, 1);
  assert.equal(AudioContextClass.instances[1].state, "running");
  assert.equal(controller.getState().status, "running");
  controller.destroy();
});

test("runtime context interruption stops the graph instead of leaving false running UI", async () => {
  const AudioContextClass = createFakeAudioContextClass();
  const controller = createWebAudioController({ getAudioContextClass: () => AudioContextClass });
  await controller.start();
  const context = AudioContextClass.instances[0];

  context.state = "suspended";
  context.onstatechange();
  assert.equal(controller.getState().status, "stopped");
  assert.equal(context.closeCalls, 1);
  assert.equal(context.oscillators[0].disconnected, true);
  assert.equal(controller.updateParameters({ pan: 0, frequency: 220, filterFrequency: 700, voiceGain: 0.04 }), false);
});

test("graph construction failure disconnects local nodes and reports an error", async () => {
  const AudioContextClass = createFakeAudioContextClass({ oscillatorStartThrows: true });
  const controller = createWebAudioController({ getAudioContextClass: () => AudioContextClass });

  assert.equal(await controller.start(), false);
  const context = AudioContextClass.instances[0];
  assert.equal(controller.getState().status, "error");
  assert.equal(context.closeCalls, 1);
  assert.equal(context.oscillators[0].disconnected, true);
  assert.equal(context.gains[2].disconnected, true);
  assert.equal(controller.stop(), false);
});

test("destroy closes a running graph and blocks future work", async () => {
  const AudioContextClass = createFakeAudioContextClass();
  const controller = createWebAudioController({ getAudioContextClass: () => AudioContextClass });
  assert.equal(await controller.start(), true);
  const context = AudioContextClass.instances[0];

  assert.equal(controller.destroy(), true);
  assert.equal(context.closeCalls, 1);
  assert.equal(context.oscillators[0].stoppedAt, 1);
  assert.equal(await controller.start(), false);
  assert.equal(controller.stop(), false);
  assert.equal(controller.updateParameters({ pan: 0, frequency: 220, filterFrequency: 700, voiceGain: 0.04 }), false);
});
