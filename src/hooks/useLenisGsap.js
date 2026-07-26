import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export function useLenisGsap() {
  useEffect(() => {
    let refreshFrame = 0;
    let disposed = false;
    let destroyLenisRuntime = () => {};
    let layoutObserver;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

    const refreshLayout = () => {
      if (refreshFrame || disposed) return;
      refreshFrame = window.requestAnimationFrame(() => {
        refreshFrame = 0;
        if (disposed) return;
        window.__portfolioLenis?.resize();
        ScrollTrigger.refresh();
        ScrollTrigger.update();
      });
    };
    const refreshAfterAssetLoad = (event) => {
      if (
        event.target instanceof HTMLImageElement
        || event.target instanceof HTMLVideoElement
      ) {
        refreshLayout();
      }
    };

    window.addEventListener("portfolio:layout-change", refreshLayout);
    window.addEventListener("portfolio:deferred-ready", refreshLayout);
    window.addEventListener("portfolio:hash-settled", refreshLayout);
    document.addEventListener("load", refreshAfterAssetLoad, true);
    document.addEventListener("loadedmetadata", refreshAfterAssetLoad, true);

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
      refreshLayout();
    };
    const refreshAfterFonts = () => {
      if (!disposed) refreshLayout();
    };

    document.fonts?.ready?.then(refreshAfterFonts);
    window.addEventListener("load", refreshLayout, { once: true });
    window.addEventListener("resize", refreshLayout, { passive: true });
    motionPreference.addEventListener?.("change", syncMotionPreference);
    createLenisRuntime();
    layoutObserver = typeof ResizeObserver === "function"
      ? new ResizeObserver(refreshLayout)
      : undefined;
    const layoutRoot = document.querySelector("#main-content");
    if (layoutRoot) layoutObserver?.observe(layoutRoot);
    refreshLayout();
    // Codex-Fix: Refresh Lenis and ScrollTrigger together after deferred sections, hash settling, media, fonts, and responsive layout changes.
    // Codex-Fix: Rebuild the single Lenis/ticker runtime when reduced-motion changes at run time.

    return () => {
      disposed = true;
      if (refreshFrame) window.cancelAnimationFrame(refreshFrame);
      window.removeEventListener("load", refreshLayout);
      window.removeEventListener("resize", refreshLayout);
      window.removeEventListener("portfolio:layout-change", refreshLayout);
      window.removeEventListener("portfolio:deferred-ready", refreshLayout);
      window.removeEventListener("portfolio:hash-settled", refreshLayout);
      document.removeEventListener("load", refreshAfterAssetLoad, true);
      document.removeEventListener("loadedmetadata", refreshAfterAssetLoad, true);
      motionPreference.removeEventListener?.("change", syncMotionPreference);
      layoutObserver?.disconnect();
      destroyLenisRuntime();
    };
  }, []);
}
