import { useEffect } from "react";
import { ProjectDetail } from "../components/CaseStudyShowcase.jsx";
import DataVisualizationSeries from "../components/DataVisualizationSeries.jsx";
import { PureDataLearningSection, WorkEvidenceCard } from "../components/AdmissionEvidenceSections.jsx";
import { workViewSlugs } from "../config/site.js";
import { representativeWorks, pureDataLearningEvidence } from "../data/admission-evidence.js";
import { sortedProjectCaseStudies } from "../data/portfolio.js";

const digitalProjectIds = new Set([
  "interactive-sound-learning",
  "generative-interface-study",
  "data-visualization-cases",
  "learning-dashboard-analysis",
]);

const digitalProjectsBySlug = new Map(
  sortedProjectCaseStudies
    .filter((project) => digitalProjectIds.has(project.slug))
    .map((project) => [project.slug, project]),
);
const huabenWork = representativeWorks.find((work) => work.id === "huaben-short-film");
const secondaryCreationWork = representativeWorks.find((work) => work.id === "hope-feathers-wings-mv");

const getWork = (slug) => {
  if (digitalProjectsBySlug.has(slug)) return digitalProjectsBySlug.get(slug);
  if (slug === "huaben-short-film") return huabenWork;
  if (slug === "pure-data-learning") return pureDataLearningEvidence;
  return null;
};

function WorkNavigation({ currentSlug }) {
  const currentIndex = workViewSlugs.indexOf(currentSlug);
  const previousSlug = workViewSlugs[(currentIndex - 1 + workViewSlugs.length) % workViewSlugs.length];
  const nextSlug = workViewSlugs[(currentIndex + 1) % workViewSlugs.length];
  const previousWork = getWork(previousSlug);
  const nextWork = getWork(nextSlug);

  return (
    <nav className="mx-auto grid max-w-7xl gap-4 border-t border-[color:var(--theme-line)] px-[var(--page-gutter)] py-12 md:grid-cols-2" aria-label="作品導覽">
      <a className="evidence-panel interactive-link rounded-[var(--radius-md)] p-5" href={`#/work/${previousSlug}`}>
        <span className="meta-label block text-[var(--theme-accent)]">上一件作品</span>
        <span className="zh-heading mt-2 block text-xl">{previousWork.title}</span>
      </a>
      <a className="evidence-panel interactive-link rounded-[var(--radius-md)] p-5 md:text-right" href={`#/work/${nextSlug}`}>
        <span className="meta-label block text-[var(--theme-accent)]">下一件作品</span>
        <span className="zh-heading mt-2 block text-xl">{nextWork.title}</span>
      </a>
    </nav>
  );
}

export default function WorkDetailView({ slug }) {
  const work = getWork(slug);

  useEffect(() => {
    if (!work) return undefined;

    document.title = work.seo?.title ?? `${work.title}｜蕭智仁`;
    if (window.__portfolioLenis) {
      window.__portfolioLenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }

    const dispatchReady = () => {
      window.dispatchEvent(new CustomEvent("portfolio:deferred-ready", {
        detail: { targetId: window.location.hash },
      }));
    };
    const frameId = window.requestAnimationFrame(dispatchReady);
    const timerId = window.setTimeout(dispatchReady, 120);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timerId);
    };
  }, [slug, work]);

  if (!work) return null;

  return (
    <main id="main-content" aria-label={work.title} className="work-detail-view page-shell min-h-screen bg-[var(--theme-bg)] pt-24 text-[var(--theme-text)]">
      <div className="mx-auto max-w-7xl px-[var(--page-gutter)] pt-8">
        <a className="interactive-link zh-label inline-flex rounded-full border border-[color:var(--theme-line)] px-5 py-3 text-[var(--theme-accent)]" href="#project-index">
          返回作品索引
        </a>
      </div>

      {digitalProjectsBySlug.has(slug) ? (
        <>
          {(slug === "data-visualization-cases" || slug === "learning-dashboard-analysis") && (
            <DataVisualizationSeries />
          )}
          <ProjectDetail project={work} showNavigation={false} />
        </>
      ) : slug === "huaben-short-film" ? (
        <section className="px-[var(--page-gutter)] py-20 md:py-28" aria-labelledby={`${work.id}-title`}>
          <div className="mx-auto grid max-w-7xl gap-12">
            <WorkEvidenceCard work={work} />
            <div id="secondary-creation" className="grid scroll-mt-28 gap-5">
              <p className="meta-label text-[var(--theme-accent)]">二次創作／課程練習</p>
              <WorkEvidenceCard work={{ ...secondaryCreationWork, type: "二次創作／課程練習" }} />
            </div>
          </div>
        </section>
      ) : (
        <section id="pure-data-learning" className="research-section px-[var(--page-gutter)] py-20 text-[var(--theme-text)] md:py-28" aria-labelledby="pure-data-learning-title">
          <PureDataLearningSection />
        </section>
      )}

      <WorkNavigation currentSlug={slug} />
    </main>
  );
}
