import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const THEME_ENDPOINT_THRESHOLD = 0.62;
const MIN_TRANSITION_VIEWPORTS = 0.8;
const MAX_TRANSITION_VIEWPORTS = 1.2;

const getTransitionBounds = (sourceSection, targetTitle) => {
  const viewportHeight = Math.max(window.innerHeight, 1);
  const scrollTop = window.scrollY;
  const sourceBottom = sourceSection.getBoundingClientRect().bottom + scrollTop;
  const targetTop = targetTitle.getBoundingClientRect().top + scrollTop;
  const end = targetTop - viewportHeight * 0.25;
  const naturalStart = sourceBottom - viewportHeight * 0.7;
  const range = Math.min(
    viewportHeight * MAX_TRANSITION_VIEWPORTS,
    Math.max(viewportHeight * MIN_TRANSITION_VIEWPORTS, end - naturalStart),
  );

  return { start: end - range, end };
};

export function useThemeInversion(routeKey = null) {
  useEffect(() => {
    if (routeKey) return undefined;
    const root = document.documentElement;
    const navSurface = document.querySelector(".nav-surface");
    const transitionLayer = document.querySelector(".viewport-theme-transition");
    const sourceSection = document.querySelector("#interactive-sound-learning");
    const targetTitle = document.querySelector("#project-index-title");
    if (!navSurface || !transitionLayer || !sourceSection || !targetTitle) return undefined;

    const paper = transitionLayer.querySelector('[data-theme-layer="paper"]');
    const mist = transitionLayer.querySelector('[data-theme-layer="mist"]');
    const fieldA = transitionLayer.querySelector('[data-theme-layer="field-a"]');
    const fieldB = transitionLayer.querySelector('[data-theme-layer="field-b"]');
    const fieldC = transitionLayer.querySelector('[data-theme-layer="field-c"]');
    const animatedLayers = [paper, mist, fieldA, fieldB, fieldC].filter(Boolean);
    if (animatedLayers.length !== 5) return undefined;

    let themeEndpointState = null;
    const applyThemeState = (progress) => {
      const isPaper = progress >= THEME_ENDPOINT_THRESHOLD;
      if (themeEndpointState === isPaper) return isPaper;
      themeEndpointState = isPaper;
      navSurface.classList.toggle("nav-surface--paper", isPaper);
      root.dataset.themeEndpoint = isPaper ? "paper" : "dark";
      return isPaper;
    };
    const resetThemeState = () => {
      themeEndpointState = null;
      navSurface.classList.remove("nav-surface--paper");
      delete root.dataset.themeEndpoint;
    };
    const resetLayers = () => {
      gsap.set(animatedLayers, { clearProps: "all" });
      root.classList.remove("theme-transition-ready");
      resetThemeState();
    };
    const revealTransition = (trigger) => {
      trigger.refresh();
      trigger.update();
      root.classList.add("theme-transition-ready");
    };

    const matchMedia = gsap.matchMedia();

    matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(animatedLayers, { opacity: 0 });
      gsap.set(fieldA, { xPercent: -4, yPercent: 3, scale: 0.96 });
      gsap.set(fieldB, { xPercent: 4, yPercent: -3, scale: 0.97 });
      gsap.set(fieldC, { xPercent: 0, yPercent: 4, scale: 0.95 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          id: "viewport-paper-field-transition",
          trigger: sourceSection,
          start: () => getTransitionBounds(sourceSection, targetTitle).start,
          end: () => getTransitionBounds(sourceSection, targetTitle).end,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => applyThemeState(self.progress),
          onRefresh: (self) => applyThemeState(self.progress),
        },
      });

      timeline
        .to(mist, { opacity: 0.9, duration: 0.55, ease: "power1.inOut" }, 0)
        .to(paper, { opacity: 0.18, duration: 0.55, ease: "power1.inOut" }, 0)
        .to(fieldA, { opacity: 0.34, xPercent: 3, yPercent: -2, scale: 1.05, duration: 0.55, ease: "power1.inOut" }, 0)
        .to(fieldB, { opacity: 0.26, xPercent: -2, yPercent: 3, scale: 1.04, duration: 0.55, ease: "power1.inOut" }, 0)
        .to(fieldC, { opacity: 0.22, xPercent: 2, yPercent: -1, scale: 1.03, duration: 0.55, ease: "power1.inOut" }, 0)
        .to(mist, { opacity: 0, duration: 0.45, ease: "power1.inOut" }, 0.55)
        .to(paper, { opacity: 1, duration: 0.45, ease: "power1.inOut" }, 0.55)
        .to(fieldA, { opacity: 0, xPercent: 6, yPercent: -4, scale: 1.08, duration: 0.45, ease: "power1.inOut" }, 0.55)
        .to(fieldB, { opacity: 0, xPercent: -5, yPercent: 5, scale: 1.07, duration: 0.45, ease: "power1.inOut" }, 0.55)
        .to(fieldC, { opacity: 0, xPercent: 4, yPercent: -3, scale: 1.06, duration: 0.45, ease: "power1.inOut" }, 0.55);

      revealTransition(timeline.scrollTrigger);

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
        resetLayers();
      };
    });

    matchMedia.add("(prefers-reduced-motion: reduce)", () => {
      let reducedLayerState = null;
      const applyReducedState = (progress) => {
        const isPaper = applyThemeState(progress);
        if (reducedLayerState === isPaper) return;
        reducedLayerState = isPaper;
        gsap.set(paper, { opacity: isPaper ? 1 : 0 });
        gsap.set([mist, fieldA, fieldB, fieldC], { opacity: 0, clearProps: "transform" });
      };

      const trigger = ScrollTrigger.create({
        id: "viewport-paper-field-transition-reduced",
        trigger: sourceSection,
        start: () => getTransitionBounds(sourceSection, targetTitle).start,
        end: () => getTransitionBounds(sourceSection, targetTitle).end,
        invalidateOnRefresh: true,
        onUpdate: (self) => applyReducedState(self.progress),
        onRefresh: (self) => applyReducedState(self.progress),
      });

      revealTransition(trigger);

      return () => {
        trigger.kill();
        resetLayers();
      };
    });

    return () => {
      matchMedia.revert();
      resetLayers();
    };
  }, [routeKey]);
}
