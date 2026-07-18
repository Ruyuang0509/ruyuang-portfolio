import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const navItems = [
  { label: "研究定位", target: "#research-positioning" },
  { label: "聲響原型", target: "#interactive-sound-learning" },
  { label: "學習歷程", target: "#learning-trail" },
  { label: "作品索引", target: "#project-index-title" },
  { label: "支持證據", target: "#data-visualization-series" },
  { label: "閱讀路徑", target: "#reviewer-path" },
];

const scrollToSection = (targetId, reduceMotion) => {
  const target = document.querySelector(targetId);
  if (!target) return null;
  if (window.__portfolioLenis && !reduceMotion) {
    window.__portfolioLenis.scrollTo(target, {
      offset: -96,
      duration: 1.15,
      easing: (value) => 1 - Math.pow(1 - value, 3),
    });
    return target;
  }
  target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  return target;
};

const focusSectionTarget = (target) => {
  const focusTarget = target.matches("h1, h2, h3, h4, h5, h6")
    ? target
    : target.querySelector("h1, h2, h3, h4, h5, h6") ?? target;
  const needsTemporaryTabIndex = !focusTarget.hasAttribute("tabindex");

  if (needsTemporaryTabIndex) focusTarget.setAttribute("tabindex", "-1");
  focusTarget.focus({ preventScroll: true });

  if (needsTemporaryTabIndex) {
    focusTarget.addEventListener("blur", () => {
      if (focusTarget.getAttribute("tabindex") === "-1") focusTarget.removeAttribute("tabindex");
    }, { once: true });
  }
};

const getActiveNavTarget = (targetId) => {
  if (!targetId || targetId === "#top") return null;
  const directMatch = navItems.find((item) => item.target === targetId);
  if (directMatch) return directMatch.target;

  const target = document.querySelector(targetId);
  const caseStudy = target?.closest(".case-study-detail");
  if (caseStudy) {
    return caseStudy.id === "interactive-sound-learning"
      ? "#interactive-sound-learning"
      : "#project-index-title";
  }
  if (target?.id === "project-index" || target?.closest("#project-index")) return "#project-index-title";
  if (target?.closest("#data-visualization-series")) return "#data-visualization-series";
  if (target?.closest("#learning-trail")) return "#learning-trail";
  if (target?.id?.startsWith("institute-evidence-")) return "#research-positioning";
  return null;
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTarget, setActiveTarget] = useState(null);
  const reduceMotion = useReducedMotion();
  const menuId = useId();
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const jumpToSection = (event, targetId, { focusTarget = false } = {}) => {
    event.preventDefault();
    setIsOpen(false);
    const target = scrollToSection(targetId, Boolean(reduceMotion));
    if (!target) return;
    setActiveTarget(targetId === "#top" ? null : targetId);
    window.history.replaceState(null, "", targetId);
    window.dispatchEvent(new CustomEvent("portfolio:hash-navigation", {
      detail: { targetId, delay: reduceMotion ? 0 : 1200 },
    }));
    if (focusTarget) window.requestAnimationFrame(() => focusSectionTarget(target));
  };

  const handleKeyboardJump = (event, targetId) => {
    if (event.key !== "Enter") return;
    jumpToSection(event, targetId, { focusTarget: true });
  };

  useEffect(() => {
    const observedTargets = ["#top", ...navItems.map((item) => item.target)]
      .map((targetId) => document.querySelector(targetId))
      .filter(Boolean);
    if (!observedTargets.length || !("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver((entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0];
      if (!visibleEntry) return;
      setActiveTarget(visibleEntry.target.id === "top" ? null : `#${visibleEntry.target.id}`);
    }, {
      rootMargin: "-24% 0px -70% 0px",
      threshold: 0,
    });

    observedTargets.forEach((target) => observer.observe(target));
    const syncActiveTarget = (event) => {
      setActiveTarget(getActiveNavTarget(event.detail?.targetId ?? window.location.hash));
    };
    window.addEventListener("hashchange", syncActiveTarget);
    window.addEventListener("portfolio:hash-navigation", syncActiveTarget);
    window.addEventListener("portfolio:hash-settled", syncActiveTarget);
    setActiveTarget(getActiveNavTarget(window.location.hash));

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", syncActiveTarget);
      window.removeEventListener("portfolio:hash-navigation", syncActiveTarget);
      window.removeEventListener("portfolio:hash-settled", syncActiveTarget);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      triggerRef.current?.focus();
    };
    const handlePointerDown = (event) => {
      if (menuRef.current?.contains(event.target) || triggerRef.current?.contains(event.target)) return;
      setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("pointerdown", handlePointerDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  return (
    <header className="nav-surface fixed inset-x-4 top-4 z-50 flex items-center justify-between rounded-full border border-[color:var(--theme-line)] px-3 py-3 text-[var(--theme-text)] md:inset-x-8">
      <a className="nav-home-link grid text-[0.72rem] font-black leading-[0.9] tracking-[-0.015em] md:text-sm" href="#top" aria-label="RU YUAN，回到首頁" data-magnetic data-cursor-variant="nav" data-cursor-label="TOP" title="回到首頁" onClick={(event) => jumpToSection(event, "#top", { focusTarget: event.detail === 0 })} onKeyDown={(event) => handleKeyboardJump(event, "#top")}>
        <span>RU</span><span>YUAN</span>
      </a>

      <nav className="hidden items-center gap-1 md:flex" aria-label="主要作品集區段">
        {navItems.map((item) => (
          <a key={item.target} className={`nav-section-link zh-label rounded-full px-3 py-2 text-[color:var(--theme-muted)] hover:text-[var(--theme-text)] ${activeTarget === item.target ? "nav-section-link--active" : ""}`} href={item.target} aria-current={activeTarget === item.target ? "location" : undefined} data-magnetic data-cursor-variant="nav" data-cursor-label={item.label} onClick={(event) => jumpToSection(event, item.target, { focusTarget: event.detail === 0 })} onKeyDown={(event) => handleKeyboardJump(event, item.target)}>{item.label}</a>
        ))}
      </nav>

      <button ref={triggerRef} className="mobile-section-trigger cta-button interactive-link chip-text rounded-full px-4 py-2 text-sm font-extrabold" type="button" aria-expanded={isOpen} aria-controls={menuId} aria-label={isOpen ? "關閉閱讀路徑選單" : "開啟閱讀路徑選單"} onClick={() => setIsOpen((value) => !value)}>
        {isOpen ? "關閉" : "閱讀路徑"}
      </button>

      <motion.nav
        ref={menuRef}
        id={menuId}
        className="mobile-section-menu absolute inset-x-0 top-[calc(100%+0.75rem)] overflow-clip rounded-[var(--radius-md)] md:hidden"
        aria-label="行動版作品集區段"
        aria-hidden={!isOpen}
        inert={!isOpen}
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
          y: reduceMotion ? 0 : isOpen ? 0 : -8,
        }}
        transition={{
          duration: reduceMotion ? 0 : isOpen ? 0.36 : 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="grid gap-2 rounded-[var(--radius-md)] border border-[color:var(--theme-line)] p-3">
          {navItems.map((item) => (
            <a key={item.target} className={`nav-section-link interactive-link zh-label rounded-[var(--radius-sm)] px-4 py-3 text-[var(--theme-text)] ${activeTarget === item.target ? "nav-section-link--active" : ""}`} href={item.target} aria-current={activeTarget === item.target ? "location" : undefined} onClick={(event) => jumpToSection(event, item.target, { focusTarget: true })}>{item.label}</a>
          ))}
        </div>
      </motion.nav>
    </header>
  );
}
