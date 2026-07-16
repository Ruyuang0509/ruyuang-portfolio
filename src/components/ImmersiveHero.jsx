import { motion, useReducedMotion } from "motion/react";
import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { homepageNarrative } from "../data/portfolio.js";

const HeroScene = lazy(() => import("./HeroScene.jsx"));
// Codex-Fix: Lazy-load the R3F scene so kinetic type can paint before the heavy 3D runtime.

const heroLines = homepageNarrative.headlineLines.map((line) => line.join(""));
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
    window.addEventListener("resize", evaluateSceneActivity, { passive: true });
    document.addEventListener("visibilitychange", evaluateSceneActivity);
    evaluateSceneActivity();

    return () => {
      observer?.disconnect();
      if (!supportsObserver) window.removeEventListener("scroll", evaluateSceneActivity);
      window.removeEventListener("resize", evaluateSceneActivity);
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
              <HeroScene active={sceneActive} />
            </Suspense>
          </HeroSceneErrorBoundary>
        )}
      </div>

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_30%,rgba(203,232,107,0.16),transparent_24vw),linear-gradient(to_top,var(--color-bg)_4%,transparent_42%)]" />

      <div className="grid w-full gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-end">
        <div className="overflow-hidden">
          <p className="meta-label mb-5 max-w-md text-[var(--color-accent)]">
            {homepageNarrative.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="zh-display text-[18vw] md:text-[12vw]"
          >
            {heroLines.map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <span className="block">{line}</span>
              </span>
            ))}
          </h1>
        </div>

        <div className="grid max-w-xl justify-self-end gap-6 md:pb-7">
          <p className="zh-copy-wide text-[color:var(--color-muted)]">{homepageNarrative.introduction}</p>
          <motion.div
            className="flex flex-wrap gap-3"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.5, duration: reduceMotion ? 0.01 : 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <a className="cta-button interactive-link chip-text rounded-full px-6 py-3 text-sm font-extrabold" href={homepageNarrative.primaryCta.target}>{homepageNarrative.primaryCta.label}</a>
            <a className="interactive-link chip-text rounded-full border border-[color:var(--theme-line)] px-6 py-3 text-sm font-extrabold" href={homepageNarrative.secondaryCta.target}>{homepageNarrative.secondaryCta.label}</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
