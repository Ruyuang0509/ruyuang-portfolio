import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export function useLenisGsap() {
  useEffect(() => {
    let layoutFrame = 0;
    let resizeFrame = 0;
    let disposed = false;
    let destroyLenisRuntime = () => {};
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

    const refresh = () => ScrollTrigger.refresh();
    const refreshAfterDisclosure = () => {
      if (layoutFrame) return;
      layoutFrame = window.requestAnimationFrame(() => {
        layoutFrame = 0;
        window.__portfolioLenis?.resize();
        ScrollTrigger.refresh();
      });
    };
    window.addEventListener("portfolio:layout-change", refreshAfterDisclosure);

    const createLenisRuntime = () => {
      destroyLenisRuntime();
      destroyLenisRuntime = () => {};
      if (motionPreference.matches || disposed) {
        delete window.__portfolioLenis;
        return;
      }

      const lenis = new Lenis({
        autoRaf: false,
        duration: 1.08,
        lerp: 0.085,
        smoothWheel: true,
        wheelMultiplier: 0.88,
      });
      const updateLenis = (time) => lenis.raf(time * 1000);

      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(updateLenis);
      gsap.ticker.lagSmoothing(0);
      window.__portfolioLenis = lenis;

      destroyLenisRuntime = () => {
        if (window.__portfolioLenis === lenis) delete window.__portfolioLenis;
        gsap.ticker.remove(updateLenis);
        lenis.destroy();
        gsap.ticker.lagSmoothing(500, 33);
      };
    };

    const syncMotionPreference = () => {
      createLenisRuntime();
      refresh();
    };
    const refreshAfterFonts = () => {
      if (!disposed) refresh();
    };
    const refreshOnResize = () => {
      if (resizeFrame) return;
      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = 0;
        refresh();
      });
    };

    document.fonts?.ready?.then(refreshAfterFonts);
    window.addEventListener("load", refresh, { once: true });
    window.addEventListener("resize", refreshOnResize, { passive: true });
    motionPreference.addEventListener?.("change", syncMotionPreference);
    createLenisRuntime();
    // Codex-Fix: Refresh ScrollTrigger after fonts/load/resize without spamming layout recalculation.
    // Codex-Fix: Rebuild the single Lenis/ticker runtime when reduced-motion changes at run time.

    return () => {
      disposed = true;
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
      if (layoutFrame) window.cancelAnimationFrame(layoutFrame);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refreshOnResize);
      window.removeEventListener("portfolio:layout-change", refreshAfterDisclosure);
      motionPreference.removeEventListener?.("change", syncMotionPreference);
      destroyLenisRuntime();
    };
  }, []);
}
