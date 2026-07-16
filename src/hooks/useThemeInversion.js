import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useThemeInversion() {
  useEffect(() => {
    const matchMedia = gsap.matchMedia();

    const createThemeSwitch = (start) => {
      const trigger = ScrollTrigger.create({
        id: "macro-to-gallery-theme-inversion",
        trigger: "#gallery",
        start,
        end: () => ScrollTrigger.maxScroll(window) + 1,
        invalidateOnRefresh: true,
        toggleClass: {
          targets: document.documentElement,
          className: "theme-paper",
        },
      });

      return () => trigger.kill();
      // Codex-Fix: Toggle between contrast-safe palettes instead of interpolating foreground and background through unreadable colors.
    };

    matchMedia.add("(min-width: 768px)", () => createThemeSwitch("top 55%"));
    matchMedia.add("(max-width: 767px)", () => createThemeSwitch("top 62%"));

    return () => {
      matchMedia.revert();
      document.documentElement.classList.remove("theme-paper");
    };
    // Codex-Fix: GSAP matchMedia replaces the discrete trigger at breakpoints and restores the dark endpoint on cleanup.
  }, []);
}
