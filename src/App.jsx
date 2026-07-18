import { memo, useEffect } from "react";
import { useLenisGsap } from "./hooks/useLenisGsap.js";
import { useThemeInversion } from "./hooks/useThemeInversion.js";
import CustomCursor from "./components/CustomCursor.jsx";
import CaseStudyShowcase from "./components/CaseStudyShowcase.jsx";
import DataVisualizationSeries from "./components/DataVisualizationSeries.jsx";
import ImmersiveHero from "./components/ImmersiveHero.jsx";
import LearningTrail from "./components/LearningTrail.jsx";
import AiWorkflowSection from "./components/AiWorkflowSection.jsx";
import Navbar from "./components/Navbar.jsx";
import ResearchPositioning from "./components/ResearchPositioning.jsx";
import EditorialHeading from "./components/EditorialHeading.jsx";
import SectionErrorBoundary from "./components/SectionErrorBoundary.jsx";
import PortfolioDraftLayer from "#portfolio-draft";
import ViewportThemeTransition from "./components/ViewportThemeTransition.jsx";

const SCROLL_INTERRUPTION_KEYS = new Set(["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "]);

const getHashTarget = (hash) => {
  const rawId = hash?.startsWith("#") ? hash.slice(1) : hash;
  if (!rawId) return null;
  try {
    return document.getElementById(decodeURIComponent(rawId));
  } catch {
    return document.getElementById(rawId);
  }
};

const ReviewerPathSection = memo(function ReviewerPathSection() {
  return (
    <footer id="reviewer-path" className="paper-surface relative bg-[var(--theme-bg)] px-[clamp(1.25rem,6vw,10vw)] py-28 text-[var(--theme-text)] md:py-36" aria-labelledby="reviewer-path-title">
      <div className="mx-auto grid max-w-7xl gap-12 border-t border-[color:var(--theme-line)] pt-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
        <p className="meta-label text-[var(--theme-accent)]">Reviewer path / 審查路徑</p>
        <div className="grid gap-8">
          <EditorialHeading as="h2" id="reviewer-path-title" className="editorial-heading editorial-heading--display zh-display text-[length:var(--font-size-fluid-case)]" lines={[["沿著", "證據鏈"], ["繼續閱讀。"]]}>沿著證據鏈繼續閱讀。</EditorialHeading>
          <p className="zh-lead text-[var(--theme-text)]">目前沒有公開聯絡資料；這個區段只提供真實可執行的站內閱讀路徑。</p>
          <div className="flex flex-wrap gap-3">
            <a className="cta-button interactive-link chip-text w-fit rounded-full px-7 py-4 text-sm font-extrabold" href="#interactive-sound-learning" data-magnetic data-cursor-variant="media" data-cursor-label="SOUND">回到聲響原型</a>
            <a className="interactive-link chip-text w-fit rounded-full border border-[color:var(--theme-line)] px-7 py-4 text-sm font-extrabold" href="#project-index-title">閱讀作品索引</a>
          </div>
        </div>
      </div>
    </footer>
  );
});

const HomePage = memo(function HomePage() {
  return (
    <main id="main-content" aria-label="RU / YUAN 聲響、互動與學習研究作品集" className="page-shell min-h-screen overflow-hidden bg-[var(--theme-bg)] text-[var(--theme-text)]">
      <ViewportThemeTransition />
      <SectionErrorBoundary sectionName="首頁主張"><ImmersiveHero /></SectionErrorBoundary>
      <ResearchPositioning />
      <SectionErrorBoundary sectionName="互動聲響旗艦案例"><CaseStudyShowcase scope="flagship" showIndex={false} /></SectionErrorBoundary>
      <LearningTrail />
      <AiWorkflowSection />
      <DataVisualizationSeries />
      <SectionErrorBoundary sectionName="支持作品案例"><CaseStudyShowcase scope="supporting" showIndex /></SectionErrorBoundary>
      <ReviewerPathSection />
    </main>
  );
});

export default function App() {
  useLenisGsap();
  useThemeInversion();

  useEffect(() => {
    const settleFrames = new Set();
    let navigationTimer = 0;
    let activeCase = null;
    let disposed = false;
    let settleToken = 0;

    const queueFrame = (callback) => {
      const frame = window.requestAnimationFrame(() => {
        settleFrames.delete(frame);
        callback();
      });
      settleFrames.add(frame);
      return frame;
    };

    const cancelPendingSettle = () => {
      settleToken += 1;
      settleFrames.forEach((frame) => window.cancelAnimationFrame(frame));
      settleFrames.clear();
      if (navigationTimer) {
        window.clearTimeout(navigationTimer);
        navigationTimer = 0;
      }
    };

    const scrollToHashTarget = (target, measuredTop) => {
      const targetTop = measuredTop ?? target.getBoundingClientRect().top;
      const destination = window.scrollY + targetTop - 96;
      if (window.__portfolioLenis) {
        window.__portfolioLenis.scrollTo(destination, { immediate: true });
      } else {
        window.scrollTo({ top: destination, behavior: "auto" });
      }
    };

    const settleHashTarget = (targetId = window.location.hash) => {
      if (!targetId) return;
      const target = getHashTarget(targetId);
      if (!target) return;

      cancelPendingSettle();
      const token = settleToken;
      activeCase?.removeAttribute("data-hash-target-active");
      activeCase = target.closest(".case-study-detail");
      activeCase?.setAttribute("data-hash-target-active", "true");

      window.__portfolioLenis?.resize();
      const finish = () => {
        if (disposed || token !== settleToken) return;
        window.dispatchEvent(new CustomEvent("portfolio:hash-settled", {
          detail: { targetId },
        }));
      };
      const correct = (attempt = 0) => {
        if (disposed || token !== settleToken) return;
        const top = target.getBoundingClientRect().top;
        if (top >= 94 && top <= 114) {
          finish();
          return;
        }

        scrollToHashTarget(target, top);
        if (attempt >= 1) {
          queueFrame(finish);
          return;
        }
        queueFrame(() => queueFrame(() => correct(attempt + 1)));
      };

      queueFrame(() => queueFrame(() => correct()));
    };

    const handleHashChange = () => {
      if (navigationTimer) window.clearTimeout(navigationTimer);
      settleHashTarget();
    };
    const handlePortfolioNavigation = (event) => {
      cancelPendingSettle();
      navigationTimer = window.setTimeout(
        () => {
          navigationTimer = 0;
          settleHashTarget(event.detail?.targetId);
        },
        event.detail?.delay ?? 0,
      );
    };
    const handleUserInterruption = (event) => {
      if (event.type === "keydown" && !SCROLL_INTERRUPTION_KEYS.has(event.key)) return;
      cancelPendingSettle();
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("portfolio:hash-navigation", handlePortfolioNavigation);
    window.addEventListener("wheel", handleUserInterruption, { passive: true });
    window.addEventListener("touchstart", handleUserInterruption, { passive: true });
    window.addEventListener("pointerdown", handleUserInterruption, { passive: true });
    window.addEventListener("keydown", handleUserInterruption);
    settleHashTarget();

    return () => {
      disposed = true;
      cancelPendingSettle();
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("portfolio:hash-navigation", handlePortfolioNavigation);
      window.removeEventListener("wheel", handleUserInterruption);
      window.removeEventListener("touchstart", handleUserInterruption);
      window.removeEventListener("pointerdown", handleUserInterruption);
      window.removeEventListener("keydown", handleUserInterruption);
      activeCase?.removeAttribute("data-hash-target-active");
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">跳到主要內容</a>
      <CustomCursor />
      <Navbar />
      <PortfolioDraftLayer placement="banner" />
      <HomePage />
    </>
  );
}
