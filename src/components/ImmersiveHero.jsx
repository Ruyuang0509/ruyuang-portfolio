import { motion, useReducedMotion } from "motion/react";
import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { homepageNarrative } from "../data/portfolio.js";
import EditorialHeading from "./EditorialHeading.jsx";

const HeroScene = lazy(() => import("./HeroScene.jsx"));
// Codex-Fix: Lazy-load the R3F scene so kinetic type can paint before the heavy 3D runtime.

const SCENE_PRELOAD_MARGIN = 240;

class HeroSceneErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    if (import.meta.env.DEV) console.error("Optional Hero scene failed; using the CSS fallback.", error);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

const isHeroNearViewport = (element) => {
  if (!element || document.visibilityState !== "visible") return false;
  const rect = element.getBoundingClientRect();
  return rect.bottom >= -SCENE_PRELOAD_MARGIN && rect.top <= window.innerHeight + SCENE_PRELOAD_MARGIN;
};

const shouldLoadEnhancedScene = () => {
  const saveData = navigator.connection?.saveData === true;
  const lowCoreDevice = (navigator.hardwareConcurrency ?? 8) <= 4;
  const compactViewport = window.matchMedia("(max-width: 640px)").matches;

  return !saveData && !(compactViewport && lowCoreDevice);
};
// Codex-Fix: Gate WebGL as progressive enhancement so low-power or save-data users keep a stable CSS hero.

export default function ImmersiveHero() {
  const heroRef = useRef(null);
  const sceneLoadReadyRef = useRef(false);
  const sceneMountedRef = useRef(false);
  const reduceMotion = useReducedMotion();
  const [canMountScene, setCanMountScene] = useState(false);
  const [sceneActive, setSceneActive] = useState(false);
  const renderHeroLine = reduceMotion
    ? undefined
    : (content, lineIndex) => (
        <motion.span
          className="phrase-line__motion"
          initial={{ y: "112%", rotate: lineIndex % 2 === 0 ? -3 : 3 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{
            delay: 0.12 + lineIndex * 0.09,
            duration: 0.95,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {content}
        </motion.span>
      );

  const evaluateSceneActivity = useCallback(() => {
    const active = isHeroNearViewport(heroRef.current);
    setSceneActive((current) => (current === active ? current : active));

    if (active && sceneLoadReadyRef.current && !sceneMountedRef.current) {
      sceneMountedRef.current = true;
      setCanMountScene(true);
    }
  }, []);

  useEffect(() => {
    if (reduceMotion) return undefined;
    if (!shouldLoadEnhancedScene()) return undefined;

    let idleId;
    sceneLoadReadyRef.current = false;
    const compactViewport = window.matchMedia("(max-width: 640px)").matches;
    const markLoadReady = () => {
      sceneLoadReadyRef.current = true;
      evaluateSceneActivity();
    };
    const timerId = window.setTimeout(() => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(markLoadReady, { timeout: 600 });
      } else {
        markLoadReady();
      }
    }, compactViewport ? 1400 : 900);

    return () => {
      window.clearTimeout(timerId);
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
      if (!sceneMountedRef.current) sceneLoadReadyRef.current = false;
    };
  }, [evaluateSceneActivity, reduceMotion]);
  // Codex-Fix: Give primary DOM content a stable paint window, then recheck current page and Hero visibility before requesting R3F.

  useEffect(() => {
    if (reduceMotion || !heroRef.current) return undefined;

    let observer;
    const supportsObserver = "IntersectionObserver" in window;
    if (supportsObserver) {
      observer = new IntersectionObserver(evaluateSceneActivity, {
        rootMargin: `${SCENE_PRELOAD_MARGIN}px 0px`,
        threshold: 0.01,
      });
      observer.observe(heroRef.current);
    } else {
      window.addEventListener("scroll", evaluateSceneActivity, { passive: true });
    }
    if (!supportsObserver) window.addEventListener("resize", evaluateSceneActivity, { passive: true });
    document.addEventListener("visibilitychange", evaluateSceneActivity);
    evaluateSceneActivity();

    return () => {
      observer?.disconnect();
      if (!supportsObserver) window.removeEventListener("scroll", evaluateSceneActivity);
      if (!supportsObserver) window.removeEventListener("resize", evaluateSceneActivity);
      document.removeEventListener("visibilitychange", evaluateSceneActivity);
    };
  }, [evaluateSceneActivity, reduceMotion]);
  // Codex-Fix: Defer first load while hidden/offscreen, then keep the scene mounted and pause its frame loop outside the preload window.

  return (
    <section
      ref={heroRef}
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-screen items-end overflow-hidden bg-[var(--color-bg)] px-[6vw] py-24 text-[var(--color-text)] md:py-32"
    >
      <div className="hero-canvas-shell absolute inset-0 -z-10" aria-hidden="true">
        {reduceMotion || !canMountScene ? (
          <div className="h-full w-full bg-[radial-gradient(circle_at_70%_30%,rgba(203,232,107,0.13),transparent_28vw),var(--color-bg)]" />
        ) : (
          <HeroSceneErrorBoundary fallback={<div className="h-full w-full bg-[radial-gradient(circle_at_70%_30%,rgba(203,232,107,0.13),transparent_28vw),var(--color-bg)]" />}>
            <Suspense fallback={<div className="h-full w-full bg-[var(--color-bg)]" />}>
              <HeroScene active={sceneActive} eventSource={heroRef} />
            </Suspense>
          </HeroSceneErrorBoundary>
        )}
      </div>

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_30%,rgba(203,232,107,0.16),transparent_24vw),linear-gradient(to_top,var(--color-bg)_4%,transparent_42%)]" />

      <div className="grid w-full gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-end">
        <div className="overflow-hidden">
          <motion.p
            className="meta-label mb-5 max-w-md text-[var(--color-accent)]"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.08, duration: reduceMotion ? 0.01 : 0.62, ease: [0.22, 1, 0.36, 1] }}
          >
            {homepageNarrative.eyebrow}
          </motion.p>
          <EditorialHeading
            as="h1"
            id="hero-title"
            className="hero-title editorial-heading zh-display"
            lines={homepageNarrative.headlineLines}
            renderLine={renderHeroLine}
          >
            {homepageNarrative.headline}
          </EditorialHeading>
        </div>

        <div className="grid max-w-xl justify-self-end gap-6 md:pb-7">
          <motion.p
            className="zh-copy-wide text-[color:var(--color-muted)]"
            initial={reduceMotion ? false : { opacity: 0.35, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.54, duration: reduceMotion ? 0.01 : 0.76, ease: [0.22, 1, 0.36, 1] }}
          >
            {homepageNarrative.introduction}
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-3"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.5, duration: reduceMotion ? 0.01 : 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <a className="hero-cta cta-button interactive-link chip-text inline-flex items-center rounded-full px-6 py-3 text-sm font-extrabold" href={homepageNarrative.primaryCta.target}>{homepageNarrative.primaryCta.label}</a>
            <a className="hero-cta interactive-link chip-text inline-flex items-center rounded-full border border-[color:var(--theme-line)] px-6 py-3 text-sm font-extrabold" href={homepageNarrative.secondaryCta.target}>{homepageNarrative.secondaryCta.label}</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
