import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useThemeInversion() {
  useEffect(() => {
    const navSurface = document.querySelector(".nav-surface");
    if (!navSurface) return undefined;

    const matchMedia = gsap.matchMedia();

    const createThemeSwitch = (start) => {
      const setPaperChrome = (isPaper) => {
        navSurface.classList.toggle("nav-surface--paper", isPaper);
      };

      const trigger = ScrollTrigger.create({
        id: "gallery-nav-chrome-inversion",
        trigger: "#gallery",
        start,
        invalidateOnRefresh: true,
        onEnter: () => setPaperChrome(true),
        onEnterBack: () => setPaperChrome(true),
        onLeaveBack: () => setPaperChrome(false),
        onRefresh: (self) => setPaperChrome(self.scroll() >= self.start),
      });

      setPaperChrome(window.scrollY >= trigger.start);

      return () => {
        trigger.kill();
        navSurface.classList.remove("nav-surface--paper");
      };
      // Codex-Fix: The trigger now recolors fixed navigation chrome only; content surfaces are static and section-scoped.
    };

    matchMedia.add("(min-width: 768px)", () => createThemeSwitch("top 55%"));
    matchMedia.add("(max-width: 767px)", () => createThemeSwitch("top 62%"));

    return () => {
      matchMedia.revert();
      navSurface.classList.remove("nav-surface--paper");
    };
    // Codex-Fix: Preserve GSAP matchMedia cleanup while keeping the document root palette stable.
  }, []);
}
