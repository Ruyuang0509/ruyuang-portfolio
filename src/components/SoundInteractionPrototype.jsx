import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { getSoundParameters, normalizePointerSpeed } from "../audio/soundMapping.js";
import { useWebAudioEngine } from "../hooks/useWebAudioEngine.js";

const statusLabels = {
  notStarted: "尚未啟用",
  starting: "聲音啟用中",
  running: "聲音播放中",
  stopped: "聲音已停止",
  unsupported: "瀏覽器不支援",
  error: "聲音啟用失敗",
};

const keyboardControlInstructions = "使用四個滑桿的方向鍵調整水平、垂直、大小與濾波亮度；Escape 可停止聲音。";

const formatParameterReadout = (parameters) =>
  `左右聲像 ${parameters.pan.toFixed(2)}；音高 ${Math.round(parameters.frequency)} 赫茲；濾波亮度 ${Math.round(parameters.filterFrequency)} 赫茲；受控音量 ${parameters.voiceGain.toFixed(2)}。`;

export default function SoundInteractionPrototype({ project }) {
  const padRef = useRef(null);
  const pointRef = useRef(null);
  const readoutRef = useRef(null);
  const padRectRef = useRef(null);
  const xInputRef = useRef(null);
  const yInputRef = useRef(null);
  const sizeInputRef = useRef(null);
  const speedInputRef = useRef(null);
  const pointerRef = useRef({ id: null, x: 0.5, y: 0.5, speed: 0, size: 0.5, lastX: 0, lastY: 0, lastTime: 0 });
  const frameRef = useRef(0);
  const announcementTimerRef = useRef(0);
  const audioActiveRef = useRef(false);
  const [announcedReadout, setAnnouncedReadout] = useState("");
  const reduceMotion = useReducedMotion();
  const { audioStatus, errorMessage, start, stop, updateParameters } = useWebAudioEngine();
  const readoutId = `${project.id}-sound-parameter-readout`;

  const refreshPadRect = useCallback(() => {
    const rect = padRef.current?.getBoundingClientRect();
    if (!rect) return null;
    padRectRef.current = {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    };
    return padRectRef.current;
  }, []);

  useEffect(() => {
    audioActiveRef.current = audioStatus === "starting" || audioStatus === "running";
  }, [audioStatus]);

  const cancelAudio = useCallback(() => {
    audioActiveRef.current = false;
    stop();
  }, [stop]);

  const renderValues = useCallback(() => {
    frameRef.current = 0;
    const { x, y, size } = pointerRef.current;
    const parameters = getSoundParameters(pointerRef.current);
    const padRect = padRectRef.current;
    if (pointRef.current && padRect) {
      pointRef.current.style.setProperty("--sound-x", `${x * padRect.width}px`);
      pointRef.current.style.setProperty("--sound-y", `${y * padRect.height}px`);
      pointRef.current.style.setProperty("--sound-size", String(0.7 + size * 0.8));
    }
    if (readoutRef.current) {
      readoutRef.current.textContent = formatParameterReadout(parameters);
    }
  }, []);

  const queueReadoutAnnouncement = useCallback(() => {
    if (announcementTimerRef.current) window.clearTimeout(announcementTimerRef.current);
    announcementTimerRef.current = window.setTimeout(() => {
      announcementTimerRef.current = 0;
      setAnnouncedReadout(formatParameterReadout(getSoundParameters(pointerRef.current)));
    }, 450);
  }, []);

  const scheduleRender = useCallback(() => {
    if (!frameRef.current) frameRef.current = window.requestAnimationFrame(renderValues);
  }, [renderValues]);

  const applyValues = useCallback((next) => {
    pointerRef.current = { ...pointerRef.current, ...next };
    updateParameters(getSoundParameters(pointerRef.current));
    scheduleRender();
  }, [scheduleRender, updateParameters]);

  const syncInputs = useCallback(() => {
    if (xInputRef.current) xInputRef.current.value = String(Math.round(pointerRef.current.x * 100));
    if (yInputRef.current) yInputRef.current.value = String(Math.round(pointerRef.current.y * 100));
    if (speedInputRef.current) speedInputRef.current.value = String(Math.round(pointerRef.current.speed * 100));
  }, []);

  const readPointerPosition = useCallback((event) => {
    const rect = padRectRef.current ?? refreshPadRect();
    if (!rect) return;
    const now = performance.now();
    const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
    const elapsed = Math.max(16, now - pointerRef.current.lastTime);
    const distance = Math.hypot(event.clientX - pointerRef.current.lastX, event.clientY - pointerRef.current.lastY);
    applyValues({
      x,
      y,
      speed: normalizePointerSpeed(distance / elapsed),
      lastX: event.clientX,
      lastY: event.clientY,
      lastTime: now,
    });
    syncInputs();
  }, [applyValues, refreshPadRect, syncInputs]);

  const handlePointerDown = (event) => {
    refreshPadRect();
    pointerRef.current.id = event.pointerId;
    pointerRef.current.lastX = event.clientX;
    pointerRef.current.lastY = event.clientY;
    pointerRef.current.lastTime = performance.now();
    event.currentTarget.setPointerCapture(event.pointerId);
    readPointerPosition(event);
  };

  const handlePointerMove = (event) => {
    if (pointerRef.current.id !== event.pointerId) return;
    readPointerPosition(event);
  };

  const handlePointerEnd = (event) => {
    if (pointerRef.current.id !== event.pointerId) return;
    pointerRef.current.id = null;
    applyValues({ speed: 0 });
    syncInputs();
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handleRangeInput = (key) => (event) => {
    applyValues({ [key]: Number(event.currentTarget.value) / 100 });
    queueReadoutAnnouncement();
  };

  useLayoutEffect(() => {
    refreshPadRect();
    renderValues();
  }, [refreshPadRect, renderValues]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && audioActiveRef.current) cancelAudio();
    };
    window.addEventListener("keydown", handleKeyDown);

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && audioActiveRef.current) cancelAudio();
    }, { rootMargin: "80px 0px", threshold: 0.01 });
    if (padRef.current) observer.observe(padRef.current);

    const resizeObserver = typeof ResizeObserver === "undefined"
      ? null
      : new ResizeObserver(() => {
          refreshPadRect();
          scheduleRender();
        });
    if (padRef.current) resizeObserver?.observe(padRef.current);
    const handleResize = () => {
      refreshPadRect();
      scheduleRender();
    };
    if (!resizeObserver) window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (!resizeObserver) window.removeEventListener("resize", handleResize);
      observer.disconnect();
      resizeObserver?.disconnect();
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      if (announcementTimerRef.current) window.clearTimeout(announcementTimerRef.current);
      cancelAudio();
    };
  }, [cancelAudio, refreshPadRect, scheduleRender]);

  const handleStart = async () => {
    audioActiveRef.current = true;
    const didStart = await start();
    if (didStart) {
      updateParameters(getSoundParameters(pointerRef.current));
    } else {
      audioActiveRef.current = false;
    }
  };

  return (
    <section id={`${project.id}-demo`} className="sound-prototype grid gap-8 border-t border-[color:var(--theme-line)] pt-8" aria-labelledby={`${project.id}-demo-title`}>
      <div className="grid gap-4 md:grid-cols-[0.32fr_0.68fr] md:gap-12">
        <p className="meta-label text-[var(--theme-accent)]">Web Audio 互動原型</p>
        <div className="grid gap-3">
          <h3 id={`${project.id}-demo-title`} className="zh-heading text-[clamp(1.55rem,3vw,2.8rem)]">拖曳圖形，聽聲音怎麼變</h3>
          <p className="zh-copy text-[color:var(--theme-muted)]">{project.researchQuestion}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="soft-panel grid gap-5 rounded-[var(--radius-lg)] p-5 md:p-7">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap items-center gap-3" aria-busy={audioStatus === "starting"}>
              <button className="cta-button interactive-link chip-text rounded-full px-5 py-3 text-sm font-extrabold" type="button" onClick={handleStart} disabled={audioStatus === "running" || audioStatus === "starting" || audioStatus === "unsupported"}>啟用聲音</button>
              <button className="interactive-link chip-text rounded-full border border-[color:var(--theme-line)] px-5 py-3 text-sm font-extrabold" type="button" onClick={cancelAudio} disabled={audioStatus !== "starting" && audioStatus !== "running"}>停止／靜音</button>
            </div>
            <p className="zh-label" role="status" aria-live="polite" aria-atomic="true">音訊狀態：{statusLabels[audioStatus] ?? audioStatus}</p>
          </div>

          <div
            ref={padRef}
            className={`sound-pad ${reduceMotion ? "sound-pad--reduced" : ""}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            role="img"
            aria-label="視聽映射圖：拖曳可同時改變左右聲像與音高；下方滑桿提供鍵盤操作"
          >
            <span className="sound-pad__axis sound-pad__axis--x" aria-hidden="true">左聲道　　　　　　　　　右聲道</span>
            <span className="sound-pad__axis sound-pad__axis--y" aria-hidden="true">高音　　低音</span>
            <span ref={pointRef} className="sound-pad__point" aria-hidden="true" />
          </div>
          <p id={readoutId} ref={readoutRef} className="zh-caption text-[color:var(--theme-muted)]" />
          <p className="sr-only" aria-live="polite" aria-atomic="true">{announcedReadout}</p>
          {errorMessage ? <p className="zh-caption rounded-[var(--radius-sm)] border border-[color:var(--theme-line)] p-4 text-[color:var(--theme-muted)]">{errorMessage}</p> : null}
        </div>

        <div className="grid content-start gap-5">
          <div className="soft-panel grid gap-4 rounded-[var(--radius-md)] p-5">
            <h4 className="meta-label text-[var(--theme-accent)]">鍵盤控制</h4>
            <label className="grid gap-2 zh-label">水平位置<input ref={xInputRef} className="sound-range" type="range" min="0" max="100" defaultValue="50" aria-describedby={readoutId} onInput={handleRangeInput("x")} /></label>
            <label className="grid gap-2 zh-label">垂直位置<input ref={yInputRef} className="sound-range" type="range" min="0" max="100" defaultValue="50" aria-describedby={readoutId} onInput={handleRangeInput("y")} /></label>
            <label className="grid gap-2 zh-label">物件大小<input ref={sizeInputRef} className="sound-range" type="range" min="0" max="100" defaultValue="50" aria-describedby={readoutId} onInput={handleRangeInput("size")} /></label>
            <label className="grid gap-2 zh-label">濾波亮度<input ref={speedInputRef} className="sound-range" type="range" min="0" max="100" defaultValue="0" aria-describedby={readoutId} onInput={handleRangeInput("speed")} /></label>
            <p className="zh-caption text-[color:var(--theme-muted)]">{keyboardControlInstructions}</p>
          </div>
          <div className="soft-panel rounded-[var(--radius-md)] p-5">
            <p className="zh-caption text-[color:var(--theme-muted)]">這段聲音由瀏覽器即時合成，不是 Pure Data 或 REAPER 的輸出。</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {project.interactionMappings.map((mapping) => (
          <article key={mapping.id} className="soft-panel grid gap-3 rounded-[var(--radius-md)] p-5">
            <p className="meta-label text-[var(--theme-accent)]">{mapping.input} → {mapping.parameter}</p>
            <p className="zh-copy text-[var(--theme-text)]">{mapping.rationale}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="grid gap-4">
          <h4 className="meta-label text-[var(--theme-accent)]">聲音處理順序</h4>
          <ol className="grid gap-2">
            {project.signalFlow.map((step, index) => <li key={step} className="zh-caption rounded-[var(--radius-sm)] border border-[color:var(--theme-line)] p-3"><span className="mr-3 text-[var(--theme-accent)]">{String(index + 1).padStart(2, "0")}</span>{step}</li>)}
          </ol>
        </div>
        <div className="grid gap-4">
          <h4 className="meta-label text-[var(--theme-accent)]">聆聽方式</h4>
          <ol className="grid gap-2">
            {project.listeningGuide.map((item) => <li key={item} className="zh-caption rounded-[var(--radius-sm)] bg-[color:var(--theme-surface)] p-3">{item}</li>)}
          </ol>
        </div>
      </div>
    </section>
  );
}
