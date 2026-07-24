import { lazy, memo, Suspense, useEffect } from "react";
import { useLenisGsap } from "./hooks/useLenisGsap.js";
import { useThemeInversion } from "./hooks/useThemeInversion.js";
import CustomCursor from "./components/CustomCursor.jsx";
import CaseStudyShowcase from "./components/CaseStudyShowcase.jsx";
import DataVisualizationSeries from "./components/DataVisualizationSeries.jsx";
import ImmersiveHero from "./components/ImmersiveHero.jsx";
import Navbar from "./components/Navbar.jsx";
import SoundTransitionSection, { ReviewerPathSection } from "./components/ResearchPositioning.jsx";
import SectionErrorBoundary from "./components/SectionErrorBoundary.jsx";
import PortfolioDraftLayer from "#portfolio-draft";
import ViewportThemeTransition from "./components/ViewportThemeTransition.jsx";

const AiWorkflowSection = lazy(() => import("./components/AiWorkflowSection.jsx"));
const ResearchProposalSection = lazy(() => import("./components/ResearchProposalSection.jsx"));
const admissionEvidenceModule = () => import("./components/AdmissionEvidenceSections.jsx");
const PureDataLearningSection = lazy(() => admissionEvidenceModule().then((module) => ({ default: module.PureDataLearningSection })));
const RepresentativeWorksSection = lazy(() => admissionEvidenceModule().then((module) => ({ default: module.RepresentativeWorksSection })));
const SecondaryCreationWorkSection = lazy(() => admissionEvidenceModule().then((module) => ({ default: module.SecondaryCreationWorkSection })));
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
      className={`${paper ? "paper-surface " : ""}research-section min-h-[40vh] bg-[var(--theme-bg)] px-[clamp(1.25rem,6vw,10vw)] py-24 text-[var(--theme-text)] md:py-32`}
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

function SelectedWorkSection() {
  return (
    <section
      id="selected-work"
      aria-labelledby="selected-work-title"
      data-stable-section-focus
    >
      <div className="research-section min-h-[40vh] bg-[var(--theme-bg)] px-[clamp(1.25rem,6vw,10vw)] py-24 text-[var(--theme-text)] md:py-32">
        <SectionErrorBoundary sectionName="代表作品" headingId="selected-work-title" reloadOnRetry>
          <Suspense fallback={<DeferredSectionFallback id="selected-work" label="代表作品" />}>
            <RepresentativeWorksSection />
          </Suspense>
        </SectionErrorBoundary>
      </div>
      <DataVisualizationSeries />
      <SectionErrorBoundary sectionName="其他公開案例">
        <CaseStudyShowcase scope="supporting" showIndex />
      </SectionErrorBoundary>
      <section
        id="secondary-creation"
        className="research-section bg-[var(--theme-bg)] px-[clamp(1.25rem,6vw,10vw)] py-24 text-[var(--theme-text)] md:py-32"
        aria-labelledby="secondary-creation-title"
        data-stable-section-focus
      >
        <SectionErrorBoundary sectionName="二次創作案例" headingId="secondary-creation-title" reloadOnRetry>
          <Suspense fallback={<DeferredSectionFallback id="secondary-creation" label="二次創作案例" />}>
            <SecondaryCreationWorkSection />
          </Suspense>
        </SectionErrorBoundary>
      </section>
    </section>
  );
}

const HomePage = memo(function HomePage() {
  return (
    <main id="main-content" aria-label="蕭智仁聲響、互動與數位學習作品集" className="page-shell min-h-screen overflow-hidden bg-[var(--theme-bg)] text-[var(--theme-text)]">
      <ViewportThemeTransition />
      <SectionErrorBoundary sectionName="首頁"><ImmersiveHero /></SectionErrorBoundary>
      <SoundTransitionSection />
      <ReviewerPathSection />
      <SectionErrorBoundary sectionName="聲響原型"><CaseStudyShowcase scope="flagship" showIndex={false} /></SectionErrorBoundary>
      <DeferredAdmissionSection id="pure-data-learning" label="Pure Data 學習紀錄">
        <PureDataLearningSection />
      </DeferredAdmissionSection>
      <DeferredAdmissionSection id="research-positioning" aliasId="research-proposal" label="申請階段研究構想">
        <ResearchProposalSection />
      </DeferredAdmissionSection>
      <SelectedWorkSection />
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
  useLenisGsap();
  useThemeInversion();

  useEffect(() => {
    const settleFrames = new Set();
    let navigationTimer = 0;
    let activeCase = null;
    let disposed = false;
    let settleToken = 0;
    let userInterruptedSinceNavigation = false;

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
      userInterruptedSinceNavigation = false;
      if (navigationTimer) window.clearTimeout(navigationTimer);
      settleHashTarget();
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
    settleHashTarget();

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
