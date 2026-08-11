import { lazy, memo, Suspense, useEffect, useState } from "react";
import { useLenisGsap } from "./hooks/useLenisGsap.js";
import { useThemeInversion } from "./hooks/useThemeInversion.js";
import CustomCursor from "./components/CustomCursor.jsx";
import ImmersiveHero from "./components/ImmersiveHero.jsx";
import Navbar from "./components/Navbar.jsx";
import SoundTransitionSection from "./components/ResearchPositioning.jsx";
import FlagshipPrototypeSection from "./components/FlagshipPrototypeSection.jsx";
import EditorialHeading from "./components/EditorialHeading.jsx";
import SectionErrorBoundary from "./components/SectionErrorBoundary.jsx";
import PortfolioDraftLayer from "#portfolio-draft";
import ViewportThemeTransition from "./components/ViewportThemeTransition.jsx";
import { getLegacyWorkSlug, siteIdentity, workViewSlugs } from "./config/site.js";
import { sortedProjectCaseStudies } from "./data/portfolio.js";
import { pureDataLearningEvidence, representativeWorks } from "./data/admission-evidence.js";

const AiWorkflowSection = lazy(() => import("./components/AiWorkflowSection.jsx"));
const WorkDetailView = lazy(() => import("./views/WorkDetailView.jsx"));
const ProjectIndexGrid = lazy(() => import("./components/ProjectIndexGrid.jsx"));
const ResearchProposalSection = lazy(() => import("./components/ResearchProposalSection.jsx"));
const admissionEvidenceModule = () => import("./components/AdmissionEvidenceSections.jsx");
const CollaborationSection = lazy(() => admissionEvidenceModule().then((module) => ({ default: module.CollaborationSection })));
const LearningRoadmapSection = lazy(() => admissionEvidenceModule().then((module) => ({ default: module.LearningRoadmapSection })));
const ContactSection = lazy(() => admissionEvidenceModule().then((module) => ({ default: module.ContactSection })));

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

const getWorkSlugFromHash = (hash) => {
  const match = hash?.match(/^#\/work\/([^/?#]+)\/?$/u);
  if (!match) return null;
  try {
    const slug = decodeURIComponent(match[1]);
    return workViewSlugs.includes(slug) ? slug : null;
  } catch {
    return null;
  }
};

function DeferredSectionFallback({ id, label }) {
  return (
    <div className="mx-auto grid max-w-7xl gap-4" aria-busy="true">
      <p className="meta-label text-[var(--theme-accent)]">內容載入中</p>
      <h2 id={`${id}-title`} className="zh-heading text-2xl">{label}</h2>
    </div>
  );
}

function DeferredAdmissionSection({
  id,
  label,
  children,
  paper = false,
  aliasId,
}) {
  return (
    <section
      id={id}
      className={`${paper ? "paper-surface " : ""}research-section min-h-[40vh] px-[var(--page-gutter)] py-24 text-[var(--theme-text)] md:py-32`}
      aria-labelledby={`${id}-title`}
      data-stable-section-focus
    >
      {aliasId ? <span id={aliasId} className="block scroll-mt-28" aria-hidden="true" /> : null}
      <SectionErrorBoundary sectionName={label} headingId={`${id}-title`} reloadOnRetry>
        <Suspense fallback={<DeferredSectionFallback id={id} label={label} />}>
          {children}
        </Suspense>
      </SectionErrorBoundary>
    </section>
  );
}

const digitalIndexProjects = sortedProjectCaseStudies
  .filter((project) => workViewSlugs.slice(0, 4).includes(project.slug))
  .map((project) => ({ ...project, indexLinks: [] }));
const huabenWork = representativeWorks.find((work) => work.id === "huaben-short-film");
const homeIndexProjects = [
  ...digitalIndexProjects,
  {
    ...huabenWork,
    slug: "huaben-short-film",
    indexTitle: huabenWork.title,
    indexSummary: huabenWork.summary,
    indexTags: huabenWork.highlights.slice(0, 3),
  },
  {
    ...pureDataLearningEvidence,
    slug: "pure-data-learning",
    category: "聲音工具學習",
    indexTitle: pureDataLearningEvidence.title,
    indexSummary: pureDataLearningEvidence.purpose,
    indexCover: {
      src: pureDataLearningEvidence.media.poster,
      width: pureDataLearningEvidence.media.width,
      height: pureDataLearningEvidence.media.height,
      alt: "Pure Data 跨模態參數映射原型操作影片首圖。",
    },
    indexTags: ["Pure Data", "跨模態映射", "學習紀錄"],
  },
];

function HomeProjectIndexSection() {
  return (
    <section id="project-index" className="paper-surface min-h-screen px-[var(--page-gutter)] py-28 text-[var(--theme-text)] md:py-40" aria-labelledby="project-index-title" data-stable-section-focus>
      <span id="selected-work" className="block scroll-mt-28" aria-hidden="true" />
      <span id="gallery" className="block scroll-mt-28" aria-hidden="true" />
      <span id="reviewer-path" className="block scroll-mt-28" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-16">
        <header className="grid gap-8 md:grid-cols-[0.42fr_0.58fr] md:items-end">
          <div className="grid gap-4">
            <p className="meta-label text-[var(--theme-accent)]">公開案例</p>
            <EditorialHeading as="h2" id="project-index-title" className="gallery-title editorial-heading zh-display" lines={[["作品索引"]]}>作品索引</EditorialHeading>
          </div>
          <p className="zh-lead max-w-[34em] text-[color:var(--theme-muted)]">六件作品橫跨互動聲響、生成式影像敘事、影音製作、資料視覺化與聲音工具學習；每張卡片連到獨立案例頁。</p>
        </header>
        <SectionErrorBoundary sectionName="作品索引">
          <Suspense fallback={<div className="min-h-[28rem]" aria-busy="true" />}>
            <ProjectIndexGrid projects={homeIndexProjects} />
          </Suspense>
        </SectionErrorBoundary>
      </div>
    </section>
  );
}

const HomePage = memo(function HomePage() {
  return (
    <main id="main-content" aria-label="蕭智仁聲響、互動與數位學習作品集" className="page-shell min-h-screen text-[var(--theme-text)]">
      <ViewportThemeTransition />
      <SectionErrorBoundary sectionName="首頁"><ImmersiveHero /></SectionErrorBoundary>
      <SectionErrorBoundary sectionName="聲響原型"><FlagshipPrototypeSection /></SectionErrorBoundary>
      <HomeProjectIndexSection />
      <SoundTransitionSection />
      <DeferredAdmissionSection id="research-positioning" aliasId="research-proposal" label="申請階段研究構想">
        <ResearchProposalSection />
      </DeferredAdmissionSection>
      <DeferredAdmissionSection id="collaboration" label="專案與合作" paper>
        <CollaborationSection />
      </DeferredAdmissionSection>
      <DeferredAdmissionSection id="learning-roadmap" label="學習路線" paper>
        <LearningRoadmapSection />
      </DeferredAdmissionSection>
      <DeferredAdmissionSection id="ai-workflow" label="AI／作者性" paper>
        <AiWorkflowSection />
      </DeferredAdmissionSection>
      <DeferredAdmissionSection id="contact" label="研究方向與連結" paper>
        <ContactSection />
      </DeferredAdmissionSection>
    </main>
  );
});

export default function App() {
  const [activeWorkSlug, setActiveWorkSlug] = useState(() => getWorkSlugFromHash(window.location.hash));
  useLenisGsap();
  useThemeInversion();

  useEffect(() => {
    const settleFrames = new Set();
    let navigationTimer = 0;
    let layoutTimer = 0;
    let legacyRedirectTimer = 0;
    let activeCase = null;
    let layoutObserver = null;
    let disposed = false;
    let settleToken = 0;
    let userInterruptedSinceNavigation = false;

    const clearActiveCase = () => {
      activeCase?.removeAttribute("data-hash-target-active");
      activeCase = null;
    };

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
      clearActiveCase();
      if (navigationTimer) {
        window.clearTimeout(navigationTimer);
        navigationTimer = 0;
      }
      if (layoutTimer) {
        window.clearTimeout(layoutTimer);
        layoutTimer = 0;
      }
      if (legacyRedirectTimer) {
        window.clearTimeout(legacyRedirectTimer);
        legacyRedirectTimer = 0;
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
      activeCase = target.closest(".case-study-detail");
      activeCase?.setAttribute("data-hash-target-active", "true");

      window.__portfolioLenis?.resize();
      const finish = () => {
        if (disposed || token !== settleToken) return;
        clearActiveCase();
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

    const scheduleLegacyRedirect = (hash = window.location.hash) => {
      const legacySlug = getLegacyWorkSlug(hash);
      if (!legacySlug || getHashTarget(hash)) return;
      if (legacyRedirectTimer) window.clearTimeout(legacyRedirectTimer);
      legacyRedirectTimer = window.setTimeout(() => {
        legacyRedirectTimer = 0;
        if (window.location.hash === hash && !getHashTarget(hash)) {
          setActiveWorkSlug(legacySlug);
        }
      }, 1200);
    };

    const handleHashChange = () => {
      userInterruptedSinceNavigation = false;
      if (navigationTimer) window.clearTimeout(navigationTimer);

      const hash = window.location.hash;
      const routeSlug = getWorkSlugFromHash(hash);
      if (routeSlug) {
        cancelPendingSettle();
        setActiveWorkSlug(routeSlug);
        return;
      }

      const target = getHashTarget(hash);
      if (activeWorkSlug) {
        if (target) {
          settleHashTarget(hash);
          return;
        }
        cancelPendingSettle();
        setActiveWorkSlug(getLegacyWorkSlug(hash));
        return;
      }

      settleHashTarget(hash);
      scheduleLegacyRedirect(hash);
    };
    const handlePortfolioNavigation = (event) => {
      userInterruptedSinceNavigation = false;
      cancelPendingSettle();
      navigationTimer = window.setTimeout(
        () => {
          navigationTimer = 0;
          settleHashTarget(event.detail?.targetId);
        },
        event.detail?.delay ?? 0,
      );
    };
    const handleDeferredReady = () => {
      if (!window.location.hash || userInterruptedSinceNavigation) return;
      settleHashTarget();
      scheduleLegacyRedirect();
    };
    const handleLayoutChange = () => {
      if (!window.location.hash || userInterruptedSinceNavigation) return;
      if (layoutTimer) window.clearTimeout(layoutTimer);
      layoutTimer = window.setTimeout(() => {
        layoutTimer = 0;
        settleHashTarget();
      }, 48);
    };
    const handleUserInterruption = (event) => {
      if (event.type === "keydown" && !SCROLL_INTERRUPTION_KEYS.has(event.key)) return;
      userInterruptedSinceNavigation = true;
      cancelPendingSettle();
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("portfolio:hash-navigation", handlePortfolioNavigation);
    window.addEventListener("portfolio:deferred-ready", handleDeferredReady);
    window.addEventListener("wheel", handleUserInterruption, { passive: true });
    window.addEventListener("touchstart", handleUserInterruption, { passive: true });
    window.addEventListener("pointerdown", handleUserInterruption, { passive: true });
    window.addEventListener("keydown", handleUserInterruption);
    layoutObserver = typeof ResizeObserver === "function"
      ? new ResizeObserver(handleLayoutChange)
      : null;
    layoutObserver?.observe(document.getElementById("main-content") ?? document.body);
    if (!activeWorkSlug) document.title = siteIdentity.title;
    settleHashTarget();
    if (!activeWorkSlug) scheduleLegacyRedirect();

    return () => {
      disposed = true;
      cancelPendingSettle();
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("portfolio:hash-navigation", handlePortfolioNavigation);
      window.removeEventListener("portfolio:deferred-ready", handleDeferredReady);
      window.removeEventListener("wheel", handleUserInterruption);
      window.removeEventListener("touchstart", handleUserInterruption);
      window.removeEventListener("pointerdown", handleUserInterruption);
      window.removeEventListener("keydown", handleUserInterruption);
      layoutObserver?.disconnect();
      clearActiveCase();
    };
  }, [activeWorkSlug]);

  return (
    <>
      <a className="skip-link" href="#main-content">跳到主要內容</a>
      <CustomCursor />
      <Navbar />
      <PortfolioDraftLayer placement="banner" />
      {activeWorkSlug ? (
        <Suspense fallback={<main id="main-content" className="page-shell min-h-screen" aria-busy="true" />}>
          <WorkDetailView slug={activeWorkSlug} />
        </Suspense>
      ) : <HomePage />}
    </>
  );
}
