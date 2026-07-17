import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PAPER_NAV_THRESHOLD = 0.62;

export function useThemeInversion() {
  useEffect(() => {
    const root = document.documentElement;
    const navSurface = document.querySelector(".nav-surface");
    const transitionLayer = document.querySelector(".viewport-theme-transition");
    const sourceSection = document.querySelector("#data-visualization-series");
    const targetTitle = document.querySelector("#project-index-title");
    if (!navSurface || !transitionLayer || !sourceSection || !targetTitle) return undefined;

    const paper = transitionLayer.querySelector('[data-theme-layer="paper"]');
    const mist = transitionLayer.querySelector('[data-theme-layer="mist"]');
    const fieldA = transitionLayer.querySelector('[data-theme-layer="field-a"]');
    const fieldB = transitionLayer.querySelector('[data-theme-layer="field-b"]');
    const fieldC = transitionLayer.querySelector('[data-theme-layer="field-c"]');
    const animatedLayers = [paper, mist, fieldA, fieldB, fieldC].filter(Boolean);
    if (animatedLayers.length !== 5) return undefined;

    let paperChromeState = null;
    const setPaperChrome = (isPaper) => {
      if (paperChromeState === isPaper) return;
      paperChromeState = isPaper;
      navSurface.classList.toggle("nav-surface--paper", isPaper);
    };
    const resetLayers = () => {
      gsap.set(animatedLayers, { clearProps: "all" });
      root.classList.remove("theme-transition-ready");
      paperChromeState = null;
      setPaperChrome(false);
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
          start: "bottom 85%",
          endTrigger: targetTitle,
          end: "top 15%",
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => setPaperChrome(self.progress >= PAPER_NAV_THRESHOLD),
          onRefresh: (self) => setPaperChrome(self.progress >= PAPER_NAV_THRESHOLD),
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
      let paperEndpoint = null;
      const setEndpoint = (isPaper) => {
        if (paperEndpoint === isPaper) return;
        paperEndpoint = isPaper;
        gsap.set(paper, { opacity: isPaper ? 1 : 0 });
        gsap.set([mist, fieldA, fieldB, fieldC], { opacity: 0, clearProps: "transform" });
        setPaperChrome(isPaper);
      };

      const trigger = ScrollTrigger.create({
        id: "viewport-paper-field-transition-reduced",
        trigger: sourceSection,
        start: "bottom 85%",
        endTrigger: targetTitle,
        end: "top 15%",
        invalidateOnRefresh: true,
        onUpdate: (self) => setEndpoint(self.progress >= 0.5),
        onRefresh: (self) => setEndpoint(self.progress >= 0.5),
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
  }, []);
}
