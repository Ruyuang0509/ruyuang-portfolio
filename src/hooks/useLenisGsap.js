import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export function useLenisGsap() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.08,
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.88,
    });

    const updateLenis = (time) => {
      // Codex-Fix: Drive Lenis from the GSAP ticker to avoid dual RAF jitter.
      lenis.raf(time * 1000);
    };

    // Codex-Fix: Keep ScrollTrigger synced with Lenis virtual scroll.
    lenis.on("scroll", ScrollTrigger.update);

    // Codex-Fix: Use one high-precision render loop for scroll and animation.
    gsap.ticker.add(updateLenis);

    // Codex-Fix: Disable lag smoothing to prevent reverse-scroll compensation jumps.
    gsap.ticker.lagSmoothing(0);

    // Codex-Fix: Expose Lenis for smooth anchor navigation without native jumps.
    window.__portfolioLenis = lenis;

    let disposed = false;
    let resizeFrame = 0;
    const refresh = () => ScrollTrigger.refresh();
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
    // Codex-Fix: Refresh ScrollTrigger after fonts/load/resize without spamming layout recalculation.

    return () => {
      disposed = true;
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refreshOnResize);
      delete window.__portfolioLenis;
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);
}
