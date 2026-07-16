import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const cursorSpring = {
  stiffness: 150,
  damping: 15,
  mass: 0.28,
};
// Codex-Fix: Framer Motion spring physics replaces linear cursor tracking.

export default function CustomCursor() {
  const rawX = useMotionValue(-120);
  const rawY = useMotionValue(-120);
  const x = useSpring(rawX, cursorSpring);
  const y = useSpring(rawY, cursorSpring);
  const reduceMotion = useReducedMotion();
  const stateRef = useRef({ variant: "default", label: "" });
  const activeTargetRef = useRef(null);
  const activeRectRef = useRef(null);
  const frameRef = useRef(0);
  const rectFrameRef = useRef(0);
  const pointerRef = useRef({ x: -120, y: -120 });
  const [cursorState, setCursorState] = useState(stateRef.current);
  const [canUseCustomCursor, setCanUseCustomCursor] = useState(false);

  useEffect(() => {
    const cursorMedia = window.matchMedia("(pointer: fine) and (min-width: 768px)");
    const syncCursorCapability = () => setCanUseCustomCursor(cursorMedia.matches);

    syncCursorCapability();
    if (typeof cursorMedia.addEventListener === "function") {
      cursorMedia.addEventListener("change", syncCursorCapability);
      return () => cursorMedia.removeEventListener("change", syncCursorCapability);
    }

    cursorMedia.addListener(syncCursorCapability);
    return () => cursorMedia.removeListener(syncCursorCapability);
  }, []);

  const setCursorVisual = useCallback((nextState) => {
    const current = stateRef.current;
    if (current.variant === nextState.variant && current.label === nextState.label) return;

    stateRef.current = nextState;
    setCursorState(nextState);
  }, []);
  // Codex-Fix: Keep high-frequency pointer coordinates in MotionValue and only commit React state on visual mode changes.

  const setActiveTarget = useCallback(
    (target) => {
      if (activeTargetRef.current === target) return;

      activeTargetRef.current = target;
      activeRectRef.current = target ? target.getBoundingClientRect() : null;
      setCursorVisual(
        target
          ? {
              variant: target.dataset.cursorVariant || "media",
              label: target.dataset.cursorLabel || "VIEW",
            }
          : { variant: "default", label: "" },
      );
    },
    [setCursorVisual],
  );

  const flushPointer = useCallback(() => {
    frameRef.current = 0;
    const { x: pointerX, y: pointerY } = pointerRef.current;
    const rect = activeRectRef.current;

    if (activeTargetRef.current && rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const pull = 0.34;
      rawX.set(pointerX + (centerX - pointerX) * pull);
      rawY.set(pointerY + (centerY - pointerY) * pull);
      return;
    }

    rawX.set(pointerX);
    rawY.set(pointerY);
  }, [rawX, rawY]);

  const schedulePointerWrite = useCallback(() => {
    if (frameRef.current) return;
    frameRef.current = window.requestAnimationFrame(flushPointer);
  }, [flushPointer]);

  useEffect(() => {
    if (!canUseCustomCursor || reduceMotion) return undefined;

    document.documentElement.classList.add("has-custom-cursor");

    const handlePointerMove = (event) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
      const magneticTarget =
        event.target instanceof Element ? event.target.closest("[data-magnetic]") : null;
      setActiveTarget(magneticTarget);
      schedulePointerWrite();
    };
    // Codex-Fix: Batch pointer writes into rAF and avoid getBoundingClientRect on every pointermove.

    const handlePointerLeave = () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
      activeTargetRef.current = null;
      activeRectRef.current = null;
      rawX.set(-120);
      rawY.set(-120);
      setCursorVisual({ variant: "default", label: "" });
    };

    const readTargetRect = () => {
      rectFrameRef.current = 0;
      if (!activeTargetRef.current) return;
      activeRectRef.current = activeTargetRef.current.getBoundingClientRect();
      schedulePointerWrite();
    };

    const refreshTargetRect = () => {
      if (rectFrameRef.current) return;
      rectFrameRef.current = window.requestAnimationFrame(readTargetRect);
    };
    // Codex-Fix: Throttle layout reads from scroll/resize so the custom cursor does not cause forced reflow bursts.

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", refreshTargetRect, { passive: true });
    window.addEventListener("scroll", refreshTargetRect, { passive: true });

    return () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      if (rectFrameRef.current) window.cancelAnimationFrame(rectFrameRef.current);
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", refreshTargetRect);
      window.removeEventListener("scroll", refreshTargetRect);
    };
  }, [canUseCustomCursor, rawX, rawY, reduceMotion, schedulePointerWrite, setActiveTarget, setCursorVisual]);

  const isMedia = cursorState.variant === "media";
  const isNav = cursorState.variant === "nav";

  return (
    <motion.div
      className="custom-cursor-layer pointer-events-none fixed left-0 top-0 z-[200] hidden h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[10px] font-black uppercase tracking-[0.18em] md:flex"
      style={{ x, y }}
      animate={{
        scale: isMedia ? 1.6 : isNav ? 0.28 : 0.42,
        opacity: isMedia || isNav ? 1 : 0.76,
        backgroundColor: "var(--theme-text)",
        color: "var(--theme-bg)",
        mixBlendMode: isNav ? "normal" : "difference",
      }}
      transition={cursorSpring}
      aria-hidden="true"
    >
      <span className={isMedia ? "opacity-100" : "opacity-0"}>
        {cursorState.label}
      </span>
    </motion.div>
  );
}
