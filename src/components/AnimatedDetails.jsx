import { useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";

const DISCLOSURE_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
const reducedMotionSubscribers = new Set();
let reducedMotionQuery = null;

const getReducedMotionQuery = () => {
  if (typeof window === "undefined") return null;
  reducedMotionQuery ??= window.matchMedia("(prefers-reduced-motion: reduce)");
  return reducedMotionQuery;
};

const notifyReducedMotionSubscribers = () => {
  reducedMotionSubscribers.forEach((subscriber) => subscriber());
};

const subscribeToReducedMotion = (subscriber) => {
  const query = getReducedMotionQuery();
  if (!query) return () => {};
  if (reducedMotionSubscribers.size === 0) {
    query.addEventListener?.("change", notifyReducedMotionSubscribers);
  }
  reducedMotionSubscribers.add(subscriber);

  return () => {
    reducedMotionSubscribers.delete(subscriber);
    if (reducedMotionSubscribers.size === 0) {
      query.removeEventListener?.("change", notifyReducedMotionSubscribers);
    }
  };
};

const getReducedMotionSnapshot = () => getReducedMotionQuery()?.matches ?? false;

const getCollapsedHeight = (details, summary) => {
  const style = window.getComputedStyle(details);
  return summary.getBoundingClientRect().height
    + Number.parseFloat(style.paddingBlockStart || 0)
    + Number.parseFloat(style.paddingBlockEnd || 0)
    + Number.parseFloat(style.borderBlockStartWidth || 0)
    + Number.parseFloat(style.borderBlockEndWidth || 0);
};

const getExpandedHeight = (details) => {
  const style = window.getComputedStyle(details);
  return details.scrollHeight
    + Number.parseFloat(style.borderBlockStartWidth || 0)
    + Number.parseFloat(style.borderBlockEndWidth || 0);
};

export default function AnimatedDetails({
  summary,
  children,
  className = "",
  summaryClassName = "",
  contentClassName = "",
  defaultOpen = false,
}) {
  const panelId = useId();
  const detailsRef = useRef(null);
  const summaryRef = useRef(null);
  const contentRef = useRef(null);
  const animationRef = useRef(null);
  const keyboardActivationRef = useRef(false);
  const sequenceRef = useRef(0);
  const expandedRef = useRef(defaultOpen);
  const reduceMotionRef = useRef(false);
  const layoutFrameRef = useRef(0);
  const completeToggleRef = useRef(null);
  const animateHeightRef = useRef(null);
  const [expanded, setExpanded] = useState(defaultOpen);
  const [phase, setPhase] = useState(defaultOpen ? "open" : "closed");
  const reduceMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );

  reduceMotionRef.current = reduceMotion;

  const notifyLayoutChange = () => {
    if (layoutFrameRef.current) window.cancelAnimationFrame(layoutFrameRef.current);
    layoutFrameRef.current = window.requestAnimationFrame(() => {
      layoutFrameRef.current = 0;
      window.dispatchEvent(new CustomEvent("portfolio:layout-change"));
    });
  };

  completeToggleRef.current = (nextExpanded, sequence) => {
    if (sequence !== sequenceRef.current) return;
    const details = detailsRef.current;
    if (!details) return;

    const animation = animationRef.current;
    animationRef.current = null;
    if (animation) {
      animation.onfinish = null;
      animation.cancel();
    }
    details.open = nextExpanded;
    details.style.removeProperty("height");
    details.style.removeProperty("overflow");
    setPhase(nextExpanded ? "open" : "closed");
    notifyLayoutChange();
  };

  animateHeightRef.current = (nextExpanded, currentHeight, targetHeight, duration, sequence) => {
    const details = detailsRef.current;
    if (!details) return;
    if (reduceMotionRef.current || typeof details.animate !== "function") {
      completeToggleRef.current?.(nextExpanded, sequence);
      return;
    }

    const animation = details.animate(
      { height: [`${currentHeight}px`, `${targetHeight}px`] },
      {
        duration,
        easing: DISCLOSURE_EASING,
        fill: "both",
      },
    );
    animationRef.current = animation;
    animation.onfinish = () => completeToggleRef.current?.(nextExpanded, sequence);
  };

  useLayoutEffect(() => {
    if (detailsRef.current) detailsRef.current.open = defaultOpen;
  }, [defaultOpen]);

  useEffect(() => {
    if (!reduceMotion || !animationRef.current) return;
    completeToggleRef.current?.(expandedRef.current, sequenceRef.current);
  }, [reduceMotion]);

  useEffect(() => {
    const details = detailsRef.current;
    const summaryElement = summaryRef.current;
    const content = contentRef.current;
    if (!details || !summaryElement || !content || typeof ResizeObserver === "undefined") return undefined;

    const observer = new ResizeObserver(() => {
      const animation = animationRef.current;
      if (!animation) return;

      const currentHeight = details.getBoundingClientRect().height;
      const nextExpanded = expandedRef.current;
      const targetHeight = nextExpanded
        ? getExpandedHeight(details)
        : getCollapsedHeight(details, summaryElement);
      if (Math.abs(targetHeight - currentHeight) < 1) return;

      animation.onfinish = null;
      animation.cancel();
      animationRef.current = null;
      details.style.height = `${currentHeight}px`;
      animateHeightRef.current?.(
        nextExpanded,
        currentHeight,
        targetHeight,
        nextExpanded ? 220 : 180,
        sequenceRef.current,
      );
    });

    observer.observe(summaryElement);
    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => {
    sequenceRef.current += 1;
    const animation = animationRef.current;
    if (animation) {
      animation.onfinish = null;
      animation.cancel();
    }
    if (layoutFrameRef.current) window.cancelAnimationFrame(layoutFrameRef.current);
  }, []);

  const toggleDetails = (event) => {
    event.preventDefault();
    const details = detailsRef.current;
    const summaryElement = summaryRef.current;
    if (!details || !summaryElement) return;

    const nextExpanded = !expandedRef.current;
    const currentHeight = details.getBoundingClientRect().height;
    const sequence = sequenceRef.current + 1;
    sequenceRef.current = sequence;

    const animation = animationRef.current;
    if (animation) {
      animation.onfinish = null;
      animation.cancel();
      animationRef.current = null;
    }

    expandedRef.current = nextExpanded;
    setExpanded(nextExpanded);
    setPhase(nextExpanded ? "opening" : "closing");
    details.style.height = `${currentHeight}px`;
    details.style.overflow = "clip";
    if (nextExpanded) details.open = true;

    const targetHeight = nextExpanded
      ? getExpandedHeight(details)
      : getCollapsedHeight(details, summaryElement);
    animateHeightRef.current?.(
      nextExpanded,
      currentHeight,
      targetHeight,
      nextExpanded ? 360 : 300,
      sequence,
    );
  };

  const handleSummaryKeyDown = (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    if (event.repeat) return;
    keyboardActivationRef.current = true;
    toggleDetails(event);
  };

  const handleSummaryKeyUp = (event) => {
    if (event.key === "Enter" || event.key === " ") keyboardActivationRef.current = false;
  };

  const handleSummaryClick = (event) => {
    if (keyboardActivationRef.current) {
      event.preventDefault();
      return;
    }
    toggleDetails(event);
  };

  return (
    <details
      ref={detailsRef}
      className={`animated-disclosure ${className}`.trim()}
      data-state={phase}
      data-expanded={expanded ? "true" : "false"}
    >
      <summary
        ref={summaryRef}
        className={`animated-disclosure__summary ${summaryClassName}`.trim()}
        aria-controls={panelId}
        aria-expanded={expanded}
        onBlur={() => { keyboardActivationRef.current = false; }}
        onClick={handleSummaryClick}
        onKeyDown={handleSummaryKeyDown}
        onKeyUp={handleSummaryKeyUp}
      >
        <span>{summary}</span>
        <span className="animated-disclosure__indicator" aria-hidden="true">↘</span>
      </summary>
      <div ref={contentRef} id={panelId} className={`animated-disclosure__content ${contentClassName}`.trim()}>
        {children}
      </div>
    </details>
  );
}
