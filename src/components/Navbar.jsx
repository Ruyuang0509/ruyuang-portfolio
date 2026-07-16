import { useEffect, useId, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

const navItems = [
  { label: "研究定位", target: "#research-positioning" },
  { label: "聲響原型", target: "#interactive-sound-learning" },
  { label: "學習歷程", target: "#learning-trail" },
  { label: "作品索引", target: "#project-index" },
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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const menuId = useId();
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const jumpToSection = (event, targetId, { focusTarget = false } = {}) => {
    event.preventDefault();
    setIsOpen(false);
    const target = scrollToSection(targetId, Boolean(reduceMotion));
    if (!target) return;
    window.history.replaceState(null, "", targetId);
    if (focusTarget) window.requestAnimationFrame(() => focusSectionTarget(target));
  };

  const handleKeyboardJump = (event, targetId) => {
    if (event.key !== "Enter") return;
    jumpToSection(event, targetId, { focusTarget: true });
  };

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
    <header className="nav-surface fixed inset-x-4 top-4 z-50 flex items-center justify-between rounded-full border border-[color:var(--theme-line)] px-3 py-3 text-[var(--theme-text)] backdrop-blur-2xl md:inset-x-8">
      <a className="grid text-[0.72rem] font-black leading-[0.9] tracking-[-0.015em] md:text-sm" href="#top" aria-label="RU / YUAN，回到首頁" data-magnetic data-cursor-variant="nav" data-cursor-label="TOP" title="回到首頁" onClick={(event) => jumpToSection(event, "#top", { focusTarget: event.detail === 0 })} onKeyDown={(event) => handleKeyboardJump(event, "#top")}>
        <span>RU</span><span>YUAN</span>
      </a>

      <nav className="hidden items-center gap-1 md:flex" aria-label="主要作品集區段">
        {navItems.map((item) => (
          <a key={item.target} className="zh-label rounded-full px-3 py-2 text-[color:var(--theme-muted)] hover:text-[var(--theme-text)]" href={item.target} data-magnetic data-cursor-variant="nav" data-cursor-label={item.label} onClick={(event) => jumpToSection(event, item.target, { focusTarget: event.detail === 0 })} onKeyDown={(event) => handleKeyboardJump(event, item.target)}>{item.label}</a>
        ))}
      </nav>

      <button ref={triggerRef} className="mobile-section-trigger cta-button interactive-link chip-text rounded-full px-4 py-2 text-sm font-extrabold" type="button" aria-expanded={isOpen} aria-controls={menuId} aria-label={isOpen ? "關閉作品集區段選單" : "開啟作品集區段選單"} onClick={() => setIsOpen((value) => !value)}>
        {isOpen ? "關閉" : "閱讀路徑"}
      </button>

      <nav ref={menuRef} id={menuId} className={`mobile-section-menu absolute inset-x-0 top-[calc(100%+0.75rem)] grid gap-2 rounded-[var(--radius-md)] border border-[color:var(--theme-line)] p-3 md:hidden ${isOpen ? "" : "hidden"}`} aria-label="行動版作品集區段">
        {navItems.map((item) => (
          <a key={item.target} className="interactive-link zh-label rounded-[var(--radius-sm)] px-4 py-3 text-[var(--theme-text)]" href={item.target} onClick={(event) => jumpToSection(event, item.target, { focusTarget: true })}>{item.label}</a>
        ))}
      </nav>
    </header>
  );
}
