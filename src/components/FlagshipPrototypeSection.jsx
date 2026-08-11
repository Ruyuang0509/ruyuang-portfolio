import { lazy, Suspense, useEffect } from "react";
import { sortedProjectCaseStudies } from "../data/portfolio.js";
import EditorialHeading from "./EditorialHeading.jsx";
import SectionErrorBoundary from "./SectionErrorBoundary.jsx";

const SoundInteractionPrototype = lazy(() => import("./SoundInteractionPrototype.jsx"));
const project = sortedProjectCaseStudies.find((item) => item.slug === "interactive-sound-learning");

export default function FlagshipPrototypeSection() {
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("portfolio:deferred-ready", {
      detail: { targetId: "#interactive-sound-learning" },
    }));
  }, []);

  if (!project) return null;

  return (
    <section
      id="interactive-sound-learning"
      className="research-section px-[var(--page-gutter)] py-24 text-[var(--theme-text)] md:py-32"
      aria-labelledby="interactive-sound-learning-title"
      data-stable-section-focus
    >
      <div className="mx-auto grid max-w-7xl gap-12">
        <header className="grid gap-5 md:grid-cols-[0.34fr_0.66fr] md:gap-16">
          <p className="meta-label text-[var(--theme-accent)]">可操作核心作品</p>
          <div className="grid gap-5">
            <EditorialHeading
              as="h2"
              id="interactive-sound-learning-title"
              className="editorial-heading zh-display text-[length:var(--font-size-fluid-section)]"
              lines={project.titleLines}
            >
              {project.title}
            </EditorialHeading>
            <p className="zh-lead text-[var(--theme-text)]">{project.summary}</p>
            <p className="zh-copy-wide text-[color:var(--theme-muted)]">{project.whatThisProves}</p>
          </div>
        </header>

        <SectionErrorBoundary sectionName="互動聲響原型">
          <Suspense fallback={<div className="min-h-[30rem]" aria-busy="true"><p className="zh-caption text-[color:var(--theme-muted)]">互動聲響原型載入中。</p></div>}>
            <SoundInteractionPrototype project={project} />
          </Suspense>
        </SectionErrorBoundary>

        <a
          className="cta-button interactive-link inline-flex min-h-11 items-center gap-4 justify-self-end rounded-[var(--radius-sm)] px-6 py-3 font-extrabold"
          href="#/work/interactive-sound-learning"
        >
          <span>閱讀完整案例</span>
          <span aria-hidden="true">↘</span>
        </a>
      </div>
    </section>
  );
}
