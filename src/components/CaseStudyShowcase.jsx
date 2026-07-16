import { lazy, Suspense, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  sortedProjectCaseStudies,
  instituteThemes,
} from "../data/portfolio.js";
import EditorialHeading from "./EditorialHeading.jsx";
import SectionErrorBoundary from "./SectionErrorBoundary.jsx";
import PortfolioDraftLayer from "#portfolio-draft";

const SoundInteractionPrototype = lazy(() => import("./SoundInteractionPrototype.jsx"));

const cardSpring = {
  type: "spring",
  stiffness: 150,
  damping: 15,
};
// Codex-Fix: Shared spring settings keep overview interactions tactile without layout animation cost.

const diagramLabels = {
  interactionFlow: "互動流程",
  systemArchitecture: "系統架構",
  informationArchitecture: "資訊架構",
};

const defaultCaseReadingAnchors = [
  { key: "problem", label: "問題", title: "問題意識" },
  { key: "process", label: "流程", title: "流程與系統" },
  { key: "media", label: "媒體", title: "媒體證據" },
  { key: "tools", label: "工具", title: "工具與角色" },
  { key: "reflection", label: "反思", title: "研究深化" },
  { key: "themes", label: "連結", title: "本所主題" },
];

const getCaseReadingAnchors = (project) => project.workflow
  ? [
      { key: "problem", label: "背景", title: "專案背景" },
      { key: "workflow", label: "流程", title: "五階段工作流" },
      { key: "prompt-system", label: "Prompt", title: "Prompt Design" },
      { key: "storyboard", label: "分鏡", title: "實際八幕分鏡" },
      { key: "outcomes", label: "價值", title: "成果與價值" },
      { key: "next-steps", label: "後續", title: "洞察與下一步" },
    ]
  : defaultCaseReadingAnchors;
// Codex-Fix: Give every case study a repeatable reviewer reading path instead of forcing long-scroll guessing.

const countMediaEvidence = (media = {}) =>
  [media.visualDrafts, media.screenshots, media.videos, media.audio, media.demos, media.restricted]
    .reduce((total, items) => total + (items?.length ?? 0), 0);

function getEvidenceSnapshot(project) {
  return [
    project.workflow?.stages?.length
      ? { label: "流程階段", value: project.workflow.stages.length }
      : { label: "流程圖", value: project.diagrams?.length ?? 0 },
    { label: "媒體件數", value: countMediaEvidence(project.media) },
    { label: "工具", value: project.tools?.length ?? 0 },
    { label: "角色", value: project.roles?.length ?? 0 },
    { label: "成效", value: project.testing?.statusKey === "validated" ? "已驗證" : project.testing?.statusKey === "exploratory" ? "探索中" : "尚未驗證" },
  ];
}
// Codex-Fix: Summarize evidence density from public data so reviewers can scan credibility before deep reading.

function ChipList({ items = [], accent = false, label = "標籤" }) {
  if (!items.length) return null;

  return (
    <ul className="flex flex-wrap gap-2" aria-label={label}>
      {items.map((item) => (
        <li
          key={item}
          className={
            accent
              ? "inverted-pill chip-text rounded-full px-3.5 py-1.5 text-sm font-extrabold"
              : "chip-text rounded-full border border-[color:var(--theme-line)] px-3.5 py-1.5 text-sm font-semibold text-[color:var(--theme-muted)]"
          }
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function ResponsiveImage({ image, className = "", sizes = "100vw", loading = "lazy", fetchPriority = "auto" }) {
  return (
    <picture>
      {image.avifSrcSet ? <source type="image/avif" srcSet={image.avifSrcSet} sizes={sizes} /> : null}
      {image.webpSrcSet ? <source type="image/webp" srcSet={image.webpSrcSet} sizes={sizes} /> : null}
      <img
        className={className}
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
      />
    </picture>
  );
}
// Codex-Fix: Reusable responsive image primitive preserves prior local AVIF/WebP and CLS protections.

function ProjectOverviewCard({ project, index }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className="portfolio-card group grid gap-5 rounded-[var(--radius-lg)] p-4"
      data-magnetic
      data-cursor-variant="media"
      data-cursor-label="CASE"
      whileHover={reduceMotion ? undefined : { y: -8, scale: 0.99 }}
      transition={cardSpring}
    >
      <a
        className="media-frame block overflow-hidden rounded-[var(--radius-md)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--theme-accent)]"
        href={`#${project.id}`}
        aria-label={`閱讀作品案例：${project.title}`}
      >
        <ResponsiveImage
          image={project.cover}
          className="aspect-[4/5] h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
          sizes="(min-width: 1024px) 29vw, (min-width: 768px) 44vw, 92vw"
          loading={index === 0 ? "eager" : "lazy"}
          fetchPriority={index === 0 ? "high" : "auto"}
        />
      </a>
      <div className="grid gap-5 border-t border-[color:var(--theme-line)] pt-5">
        <div className="grid grid-cols-[1fr_auto] gap-4">
          <div>
            <p className="meta-label mb-2 text-[var(--theme-accent)]">
              {project.year ? `${project.year} / ` : ""}{project.source}
            </p>
            <h3 className="zh-heading text-[length:var(--font-size-fluid-card-title)]">
              <a href={`#${project.id}`}>{project.title}</a>
            </h3>
          </div>
          <span className="text-sm font-bold text-[color:var(--theme-muted)]">0{index + 1}</span>
        </div>
        <p className="zh-caption text-[color:var(--theme-muted)]">
          {project.valueProposition}
        </p>
        <p className="zh-caption rounded-[var(--radius-sm)] border border-[color:var(--theme-line)] p-4 font-bold text-[var(--theme-text)]">
          證明：{project.whatThisProves}
        </p>
        <div className="grid gap-3 rounded-[var(--radius-sm)] bg-[color:var(--theme-surface)] p-4">
          <div>
            <p className="meta-label text-[var(--theme-accent)]">
              Roles
            </p>
            <p className="zh-caption mt-1 text-[var(--theme-text)]">
              {project.roles.slice(0, 4).join(" / ")}
            </p>
          </div>
          <div>
            <p className="meta-label text-[var(--theme-accent)]">
              Tools
            </p>
            <p className="zh-caption mt-1 text-[var(--theme-text)]">
              {project.tools.slice(0, 4).join(" / ")}
            </p>
          </div>
        </div>
        <ChipList items={project.instituteConnections.slice(0, 3)} accent label={`${project.title} 的研究連結`} />
      </div>
    </motion.article>
  );
}

function ProjectReadingMap({ project }) {
  const evidence = getEvidenceSnapshot(project);
  const anchors = getCaseReadingAnchors(project);

  return (
    <aside className="case-reading-map soft-panel grid gap-6 rounded-[var(--radius-md)] p-5" aria-label={`${project.title} 閱讀路徑與證據快覽`}>
      <div className="grid gap-3 md:grid-cols-[0.26fr_0.74fr] md:items-center">
        <p className="meta-label text-[var(--theme-accent)]">Reading map</p>
        <nav className="flex flex-wrap gap-2" aria-label={`${project.title} case study 章節`}>
          {anchors.map((anchor) => (
            <a
              key={anchor.key}
              className="interactive-link chip-text rounded-full border border-[color:var(--theme-line)] px-3.5 py-1.5 text-xs font-extrabold text-[color:var(--theme-muted)] hover:text-[var(--theme-text)]"
              href={`#${project.id}-${anchor.key}`}
            >
              {anchor.label}
            </a>
          ))}
        </nav>
      </div>
      <dl className="grid gap-3 sm:grid-cols-5">
        {evidence.map((item) => (
          <div key={item.label} className="rounded-[var(--radius-sm)] bg-[color:var(--theme-surface)] p-3">
            <dt className="zh-label text-[var(--theme-accent)]">{item.label}</dt>
            <dd className="zh-caption mt-1 font-extrabold text-[var(--theme-text)]">{item.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
// Codex-Fix: Add a compact case-study map so long evidence pages remain navigable and admissions-friendly.

function MetaGrid({ project }) {
  const rows = project.projectInfo?.length
    ? project.projectInfo.map((item) => [item.label, item.value])
    : [
        ["年份 / 日期", project.productionDate ?? project.year],
        ["來源", project.source],
        ["類型", project.category],
        ["狀態", project.status],
      ].filter(([, value]) => value);

  return (
    <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {rows.map(([label, value]) => (
        <div key={label} className="soft-panel rounded-[var(--radius-sm)] p-4">
          <dt className="zh-label text-[var(--theme-accent)]">{label}</dt>
          <dd className="zh-caption mt-2 text-[var(--theme-text)]">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function CaseCtas({ ctas = [], label = "案例快速連結" }) {
  if (!ctas.length) return null;

  return (
    <nav className="flex flex-wrap gap-3" aria-label={label}>
      {ctas.map((cta, index) => {
        const isExternal = cta.href.startsWith("http");
        return (
          <a
            key={`${cta.label}-${cta.href}`}
            className={index === 0
              ? "case-cta cta-button interactive-link chip-text inline-flex items-center rounded-full px-5 py-3 text-sm font-extrabold"
              : "case-cta interactive-link chip-text inline-flex items-center rounded-full border border-[color:var(--theme-line)] px-5 py-3 text-sm font-extrabold text-[var(--theme-text)]"}
            href={cta.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
          >
            {cta.label}
          </a>
        );
      })}
    </nav>
  );
}

function NarrativeBlock({ id, title, children }) {
  if (!children) return null;

  return (
    <section id={id} className="grid gap-5 border-t border-[color:var(--theme-line)] pt-8 md:grid-cols-[0.32fr_0.68fr] md:gap-12">
      <h3 className="meta-label text-[var(--theme-accent)]">{title}</h3>
      <p className="zh-copy-wide text-[var(--theme-text)]">
        {children}
      </p>
    </section>
  );
}

function ChallengePanel({ id, challenge }) {
  if (!challenge) return null;

  return (
    <section id={id} className="case-anchor evidence-panel grid gap-5 rounded-[var(--radius-lg)] p-6 md:grid-cols-[0.32fr_0.68fr] md:gap-12 md:p-8">
      <p className="meta-label text-[var(--theme-accent)]">Core challenge / 核心挑戰</p>
      <div className="grid gap-4">
        <h3 className="zh-heading text-[clamp(1.45rem,2.6vw,2.4rem)]">{challenge.title}</h3>
        <p className="zh-copy-wide text-[color:var(--theme-muted)]">{challenge.description}</p>
      </div>
    </section>
  );
}

function WorkflowSection({ id, workflow }) {
  if (!workflow?.stages?.length) return null;

  return (
    <section id={id} className="case-anchor grid gap-8 border-t border-[color:var(--theme-line)] pt-8" aria-labelledby={`${id}-title`}>
      <div className="grid gap-4 md:grid-cols-[0.32fr_0.68fr] md:gap-12">
        <p className="meta-label text-[var(--theme-accent)]">Workflow / 製作流程</p>
        <div className="grid gap-3">
          <h3 id={`${id}-title`} className="zh-heading text-[clamp(1.55rem,3vw,2.8rem)]">{workflow.title}</h3>
          <p className="zh-copy text-[color:var(--theme-muted)]">{workflow.summary}</p>
        </div>
      </div>
      <ol className="case-workflow-grid grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {workflow.stages.map((stage, index) => (
          <li key={stage.title} className="soft-panel grid content-start gap-5 rounded-[var(--radius-md)] p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="meta-label text-[var(--theme-accent)]">0{index + 1}</span>
              <span className="chip-text rounded-full border border-[color:var(--theme-line)] px-3 py-1 text-xs font-bold text-[color:var(--theme-muted)]">{stage.tool}</span>
            </div>
            <h4 className="zh-heading text-[clamp(1.2rem,1.7vw,1.55rem)]">{stage.title}</h4>
            <p className="zh-caption text-[color:var(--theme-muted)]">{stage.description}</p>
            <div className="mt-auto border-t border-[color:var(--theme-line)] pt-4">
              <p className="zh-label text-[var(--theme-accent)]">控制條件</p>
              <p className="zh-caption mt-2 text-[var(--theme-text)]">{stage.constraint}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function PromptTemplatePanel({ id, template }) {
  if (!template) return null;

  return (
    <article id={`${id}-template`} className="evidence-panel case-anchor grid gap-6 rounded-[var(--radius-lg)] p-6 md:p-8" aria-labelledby={`${id}-template-title`}>
      <div className="grid gap-4 md:grid-cols-[0.32fr_0.68fr] md:gap-12">
        <p className="meta-label text-[var(--theme-accent)]">{template.eyebrow}</p>
        <div className="grid gap-3">
          <h4 id={`${id}-template-title`} className="zh-heading text-[clamp(1.4rem,2.5vw,2.35rem)]">{template.title}</h4>
          <p className="zh-caption font-semibold text-[var(--theme-text)]">{template.provenance}</p>
          <p className="zh-copy text-[color:var(--theme-muted)]">{template.summary}</p>
        </div>
      </div>

      <dl className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {template.variables.map((variable) => (
          <div key={variable.token} className="soft-panel rounded-[var(--radius-sm)] p-4">
            <dt className="zh-label text-[var(--theme-accent)]">{variable.label}</dt>
            <dd className="mt-2 font-mono text-xs font-bold text-[var(--theme-text)]">{variable.token}</dd>
            <dd className="zh-caption mt-3 text-[color:var(--theme-muted)]">{variable.guidance}</dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-4 lg:grid-cols-[0.64fr_0.36fr]">
        <details className="rounded-[var(--radius-md)] border border-[color:var(--theme-line)] p-5">
          <summary className="interactive-link cursor-pointer font-extrabold text-[var(--theme-text)]">展開 Prompt Template v1</summary>
          <pre className="case-prompt-template zh-caption mt-5 rounded-[var(--radius-sm)] bg-[color:var(--theme-surface)] p-4 text-[var(--theme-text)]">{template.prompt.join("\n\n")}</pre>
        </details>
        <aside className="soft-panel rounded-[var(--radius-md)] p-5" aria-label="Prompt Template 人工核對清單">
          <h5 className="meta-label text-[var(--theme-accent)]">Human review / 人工核對</h5>
          <ul className="mt-4 grid gap-3">
            {template.reviewChecklist.map((item) => (
              <li key={item} className="zh-caption border-t border-[color:var(--theme-line)] pt-3 text-[color:var(--theme-muted)]">{item}</li>
            ))}
          </ul>
        </aside>
      </div>
    </article>
  );
}

function PromptDecisionSection({ id, decisions = [], template }) {
  if (!decisions.length) return null;

  return (
    <section id={id} className="case-anchor grid gap-8 border-t border-[color:var(--theme-line)] pt-8" aria-labelledby={`${id}-title`}>
      <div className="grid gap-4 md:grid-cols-[0.32fr_0.68fr] md:gap-12">
        <p className="meta-label text-[var(--theme-accent)]">Prompt system / 限制設計</p>
        <div className="grid gap-3">
          <h3 id={`${id}-title`} className="zh-heading text-[clamp(1.55rem,3vw,2.8rem)]">Prompt Design 的四個具體決策</h3>
          <p className="zh-copy text-[color:var(--theme-muted)]">限制條件先定義可接受的輸出範圍，再交由人工核對情節、語言、畫面與聲音是否同向。</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {decisions.map((decision, index) => (
          <article key={decision.title} className="evidence-panel grid content-start gap-5 rounded-[var(--radius-md)] p-5 md:p-6">
            <div className="flex items-baseline justify-between gap-4">
              <h4 className="zh-heading text-[clamp(1.25rem,2vw,1.8rem)]">{decision.title}</h4>
              <span className="meta-label text-[var(--theme-accent)]">D{index + 1}</span>
            </div>
            <dl className="grid gap-4">
              {[
                ["限制條件", decision.constraint],
                ["為什麼需要", decision.rationale],
                ["避免的輸出問題", decision.outputProblem],
                ["人工判斷點", decision.humanCheck],
              ].map(([label, value]) => (
                <div key={label} className="border-t border-[color:var(--theme-line)] pt-3">
                  <dt className="zh-label text-[var(--theme-accent)]">{label}</dt>
                  <dd className="zh-caption mt-2 text-[color:var(--theme-muted)]">{value}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
      <PromptTemplatePanel id={id} template={template} />
    </section>
  );
}

function StoryboardStrip({ id, storyboard }) {
  if (!storyboard?.frames?.length) return null;

  const handleKeyDown = (event) => {
    const storyboardList = event.currentTarget;
    const firstFrame = storyboardList.querySelector(".case-storyboard__item");
    const styles = window.getComputedStyle(storyboardList);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
    const step = (firstFrame?.getBoundingClientRect().width || storyboardList.clientWidth * 0.85) + gap;
    const maxScroll = storyboardList.scrollWidth - storyboardList.clientWidth;
    let nextPosition;

    if (event.key === "ArrowRight") nextPosition = storyboardList.scrollLeft + step;
    if (event.key === "ArrowLeft") nextPosition = storyboardList.scrollLeft - step;
    if (event.key === "Home") nextPosition = 0;
    if (event.key === "End") nextPosition = maxScroll;
    if (nextPosition === undefined) return;

    event.preventDefault();
    storyboardList.scrollTo({
      left: Math.max(0, Math.min(nextPosition, maxScroll)),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  return (
    <section id={id} className="case-anchor grid gap-8 border-t border-[color:var(--theme-line)] pt-8" aria-labelledby={`${id}-title`}>
      <div className="grid gap-4 md:grid-cols-[0.32fr_0.68fr] md:gap-12">
        <p className="meta-label text-[var(--theme-accent)]">Storyboard / 實際分鏡</p>
        <div className="grid gap-3">
          <h3 id={`${id}-title`} className="zh-heading text-[clamp(1.55rem,3vw,2.8rem)]">{storyboard.title}</h3>
          <p className="zh-copy text-[color:var(--theme-muted)]">{storyboard.summary}</p>
        </div>
      </div>
      <p id={`${id}-instructions`} className="sr-only">使用左右方向鍵瀏覽分鏡，Home 跳到第一幕，End 跳到最後一幕。</p>
      <ol
        className="case-storyboard flex gap-4 overflow-x-auto pb-4"
        tabIndex={0}
        aria-label={`${storyboard.title}，可水平捲動`}
        aria-describedby={`${id}-instructions`}
        onKeyDown={handleKeyDown}
      >
        {storyboard.frames.map((frame, index) => (
          <li key={`${frame.time}-${frame.title}`} className="case-storyboard__item">
            <figure className="soft-panel grid h-full overflow-hidden rounded-[var(--radius-md)]">
              <div className="media-frame overflow-hidden">
                <ResponsiveImage
                  image={frame.image}
                  className="aspect-video h-full w-full object-cover"
                  sizes="(min-width: 1024px) 36vw, (min-width: 768px) 58vw, 84vw"
                />
              </div>
              <figcaption className="grid content-start gap-3 p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="meta-label text-[var(--theme-accent)]">Scene 0{index + 1}</p>
                  <p className="zh-label text-[color:var(--theme-muted)]">{frame.time}</p>
                </div>
                <h4 className="zh-heading text-[clamp(1.15rem,1.7vw,1.5rem)]">{frame.title}</h4>
                <p className="zh-caption font-semibold text-[var(--theme-text)]" lang="en">{frame.subtitle}</p>
                <p className="zh-caption text-[color:var(--theme-muted)]">{frame.description}</p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>
    </section>
  );
}

function FeaturedExample({ id, example }) {
  if (!example) return null;

  return (
    <section id={id} className="case-anchor paper-panel grid gap-8 rounded-[var(--radius-lg)] p-6 md:grid-cols-[0.62fr_0.38fr] md:p-8">
      <div className="grid content-start gap-5">
        <p className="meta-label opacity-70">{example.eyebrow}</p>
        <h3 className="zh-heading text-[clamp(1.65rem,3.4vw,3.25rem)]">{example.title}</h3>
        <p className="zh-copy-wide text-[var(--theme-inverse-text)]">{example.summary}</p>
        <ul className="flex flex-wrap gap-2" aria-label={`${example.title} 的文學主題`}>
          {example.themes?.map((theme) => (
            <li key={theme} className="chip-text rounded-full border border-[color:rgba(255,255,255,0.24)] px-3.5 py-1.5 text-sm font-extrabold text-[var(--theme-inverse-text)]">{theme}</li>
          ))}
        </ul>
      </div>
      <aside className="grid content-start gap-4 border-t border-[color:rgba(255,255,255,0.22)] pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0">
        <p className="zh-label opacity-70">Representative scene</p>
        <h4 className="zh-heading text-[clamp(1.25rem,2vw,1.75rem)]">{example.focusTitle}</h4>
        <p className="zh-caption text-[var(--theme-inverse-text)]">{example.focusDescription}</p>
      </aside>
    </section>
  );
}

function MediaLayerSection({ id, layers = [] }) {
  if (!layers.length) return null;

  return (
    <section id={id} className="case-anchor grid gap-8 border-t border-[color:var(--theme-line)] pt-8" aria-labelledby={`${id}-title`}>
      <div className="grid gap-4 md:grid-cols-[0.32fr_0.68fr] md:gap-12">
        <p className="meta-label text-[var(--theme-accent)]">Narrative layers / 敘事分層</p>
        <div className="grid gap-3">
          <h3 id={`${id}-title`} className="zh-heading text-[clamp(1.55rem,3vw,2.8rem)]">五種媒體，共同服務同一段故事</h3>
          <p className="zh-copy text-[color:var(--theme-muted)]">分層不是軟體清單，而是用來確認每一種媒體負責什麼、如何被檢查，以及哪些仍只是製作規格。</p>
        </div>
      </div>
      <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {layers.map((layer, index) => (
          <li key={layer.label} className="soft-panel grid content-start gap-4 rounded-[var(--radius-md)] p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="meta-label text-[var(--theme-accent)]">L{index + 1}</span>
              <span className="chip-text rounded-full border border-[color:var(--theme-line)] px-3 py-1 text-xs font-bold text-[color:var(--theme-muted)]">{layer.status}</span>
            </div>
            <h4 className="zh-heading text-[clamp(1.15rem,1.6vw,1.45rem)]">{layer.label}</h4>
            <p className="zh-caption text-[color:var(--theme-muted)]">{layer.role}</p>
            <div className="mt-auto border-t border-[color:var(--theme-line)] pt-3">
              <p className="zh-label text-[var(--theme-accent)]">檢查點</p>
              <p className="zh-caption mt-2 text-[var(--theme-text)]">{layer.check}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function DeliverablesSection({ id, deliverables = [] }) {
  if (!deliverables.length) return null;

  return (
    <section id={id} className="case-anchor grid gap-8 border-t border-[color:var(--theme-line)] pt-8" aria-labelledby={`${id}-title`}>
      <div className="grid gap-4 md:grid-cols-[0.32fr_0.68fr] md:gap-12">
        <p className="meta-label text-[var(--theme-accent)]">Delivery / 證據分類</p>
        <div className="grid gap-3">
          <h3 id={`${id}-title`} className="zh-heading text-[clamp(1.55rem,3vw,2.8rem)]">交付、流程產出與製作規格</h3>
          <p className="zh-copy text-[color:var(--theme-muted)]">只有已找到並核對的檔案列為實際成果；其餘內容明確標示為流程產出或製作規格。</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {deliverables.map((item) => (
          <article key={item.title} className="evidence-panel grid content-start gap-4 rounded-[var(--radius-md)] p-5">
            <p className="meta-label text-[var(--theme-accent)]">{item.status}</p>
            <h4 className="zh-heading text-[clamp(1.15rem,1.7vw,1.5rem)]">{item.title}</h4>
            <p className="zh-caption text-[color:var(--theme-muted)]">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function EvidenceBoundarySection({ id, boundary }) {
  if (!boundary) return null;

  const groups = [
    ["Verified artifacts / 可核對成果", boundary.verifiedArtifacts],
    ["Approved specs / 核准規格", boundary.approvedSpecifications],
    ["External gates / 未獨立核對", boundary.notIndependentlyVerified],
  ];

  return (
    <section id={id} className="case-anchor evidence-panel grid gap-7 rounded-[var(--radius-lg)] p-6 md:p-8" aria-labelledby={`${id}-title`}>
      <div className="grid gap-4 md:grid-cols-[0.32fr_0.68fr] md:gap-12">
        <p className="meta-label text-[var(--theme-accent)]">Evidence boundary / 證據邊界</p>
        <h3 id={`${id}-title`} className="zh-heading text-[clamp(1.55rem,3vw,2.8rem)]">{boundary.title}</h3>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {groups.map(([title, items], index) => (
          <article key={title} className="soft-panel rounded-[var(--radius-md)] p-5">
            <p className="meta-label text-[var(--theme-accent)]">0{index + 1}</p>
            <h4 className="zh-heading mt-3 text-[clamp(1.12rem,1.6vw,1.45rem)]">{title}</h4>
            <ul className="mt-4 grid gap-3">
              {items.map((item) => (
                <li key={item} className="zh-caption border-t border-[color:var(--theme-line)] pt-3 text-[color:var(--theme-muted)]">{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function OutcomesSection({ id, outcomes = [] }) {
  if (!outcomes.length) return null;

  return (
    <section id={id} className="case-anchor grid gap-8 border-t border-[color:var(--theme-line)] pt-8" aria-labelledby={`${id}-title`}>
      <div className="grid gap-4 md:grid-cols-[0.32fr_0.68fr] md:gap-12">
        <p className="meta-label text-[var(--theme-accent)]">Value / 成果與價值</p>
        <div className="grid gap-3">
          <h3 id={`${id}-title`} className="zh-heading text-[clamp(1.55rem,3vw,2.8rem)]">流程、內容與跨媒體的一致性</h3>
          <p className="zh-copy text-[color:var(--theme-muted)]">這些價值來自可見的系統與內容設計，不替尚未進行的學習成效測試下結論。</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {outcomes.map((outcome, index) => (
          <article key={outcome.title} className="soft-panel grid content-start gap-5 rounded-[var(--radius-md)] p-6">
            <p className="meta-label text-[var(--theme-accent)]">0{index + 1}</p>
            <h4 className="zh-heading text-[clamp(1.35rem,2vw,1.85rem)]">{outcome.title}</h4>
            <p className="zh-copy text-[color:var(--theme-muted)]">{outcome.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function EvaluationPlanSection({ id, plan }) {
  if (!plan) return null;

  return (
    <section id={id} className="case-anchor grid gap-8 border-t border-[color:var(--theme-line)] pt-8" aria-labelledby={`${id}-title`}>
      <div className="grid gap-4 md:grid-cols-[0.32fr_0.68fr] md:gap-12">
        <div className="grid content-start gap-3">
          <p className="meta-label text-[var(--theme-accent)]">Evaluation plan / 評估計畫</p>
          <span className="chip-text w-fit rounded-full border border-[color:var(--theme-line)] px-3 py-1 text-xs font-bold text-[color:var(--theme-muted)]">{plan.status}</span>
        </div>
        <div className="grid gap-3">
          <h3 id={`${id}-title`} className="zh-heading text-[clamp(1.55rem,3vw,2.8rem)]">{plan.title}</h3>
          <p className="zh-copy text-[color:var(--theme-muted)]">{plan.summary}</p>
          <ChipList items={plan.participantRoles} label={`${plan.title} 的預定參與角色`} />
        </div>
      </div>
      <ol className="grid gap-4 lg:grid-cols-3">
        {plan.tasks.map((task, index) => (
          <li key={task.id} className="evidence-panel grid content-start gap-5 rounded-[var(--radius-md)] p-5">
            <div className="flex items-center justify-between gap-4">
              <span className="meta-label text-[var(--theme-accent)]">0{index + 1}</span>
              <span className="chip-text rounded-full border border-[color:var(--theme-line)] px-3 py-1 text-xs font-bold text-[color:var(--theme-muted)]">{task.status}</span>
            </div>
            <h4 className="zh-heading text-[clamp(1.2rem,1.7vw,1.55rem)]">{task.task}</h4>
            <div>
              <p className="zh-label text-[var(--theme-accent)]">預計蒐集</p>
              <ul className="mt-2 grid gap-2">
                {task.evidenceToCollect.map((item) => <li key={item} className="zh-caption text-[color:var(--theme-muted)]">{item}</li>)}
              </ul>
            </div>
            <div className="mt-auto border-t border-[color:var(--theme-line)] pt-4">
              <p className="zh-label text-[var(--theme-accent)]">修訂用途</p>
              <p className="zh-caption mt-2 text-[var(--theme-text)]">{task.decisionUse}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="zh-caption rounded-[var(--radius-sm)] bg-[color:var(--theme-surface)] p-4 text-[color:var(--theme-muted)]">資料治理：{plan.dataPolicy}</p>
    </section>
  );
}

function CaseClosingPanel({ id, insight, nextSteps = [], ctas = [] }) {
  if (!insight && !nextSteps.length && !ctas.length) return null;

  return (
    <section id={id} className="case-anchor evidence-panel grid gap-8 rounded-[var(--radius-lg)] p-6 md:grid-cols-[0.52fr_0.48fr] md:p-8" aria-labelledby={`${id}-title`}>
      <div className="grid content-start gap-4">
        <p className="meta-label text-[var(--theme-accent)]">Key insight / 關鍵洞察</p>
        <h3 id={`${id}-title`} className="zh-heading text-[clamp(1.55rem,3vw,2.8rem)]">讓生成流程能被重複使用的，不是工具數量</h3>
        <p className="zh-copy-wide text-[var(--theme-text)]">{insight}</p>
      </div>
      <div className="grid content-start gap-6 border-t border-[color:var(--theme-line)] pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
        <div className="grid gap-3">
          <h4 className="meta-label text-[var(--theme-accent)]">Next steps / 下一步</h4>
          <ul className="grid gap-3">
            {nextSteps.map((step) => (
              <li key={step} className="zh-caption rounded-[var(--radius-sm)] bg-[color:var(--theme-surface)] p-4 text-[color:var(--theme-muted)]">{step}</li>
            ))}
          </ul>
        </div>
        <CaseCtas ctas={ctas} label="案例下一步與快速連結" />
      </div>
    </section>
  );
}

function StructuredProjectSections({ sections = [] }) {
  if (!sections.length) return null;

  return (
    <section className="grid gap-5 border-t border-[color:var(--theme-line)] pt-8" aria-label="作品章節化說明">
      <div className="grid gap-3 md:grid-cols-[0.32fr_0.68fr] md:gap-12">
        <h3 className="meta-label text-[var(--theme-accent)]">
          作品脈絡
        </h3>
        <p className="zh-copy text-[color:var(--theme-muted)]">
          依作品定位、問題意識、資料或媒體方法、限制與研究延伸整理，讓案例能快速掃讀，也能深入閱讀。
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <article key={section.title} className="soft-panel grid content-start gap-4 rounded-[var(--radius-md)] p-5">
            <h4 className="zh-heading text-[clamp(1.2rem,1.75vw,1.65rem)]">{section.title}</h4>
            {section.summary ? (
              <p className="zh-copy text-[var(--theme-text)]">{section.summary}</p>
            ) : null}
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="zh-caption text-[color:var(--theme-muted)]">
                {paragraph}
              </p>
            ))}
            {section.bullets?.length ? (
              <ul className="grid gap-2">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="zh-caption text-[color:var(--theme-muted)]">
                    <span className="mr-2 text-[var(--theme-accent)]">•</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
// Codex-Fix: Case studies can now carry rich handoff-driven narrative sections without hard-coding bespoke layouts.

function DiagramGallery({ id, diagrams = [] }) {
  if (!diagrams.length) return null;

  return (
    <section id={id} className="grid gap-8 border-t border-[color:var(--theme-line)] pt-8">
      <div className="grid gap-3 md:grid-cols-[0.32fr_0.68fr] md:gap-12">
        <h3 className="meta-label text-[var(--theme-accent)]">
          流程與架構
        </h3>
        <p className="zh-copy text-[color:var(--theme-muted)]">
          互動流程圖、系統架構圖與資訊架構圖用來補充作品方法，讓媒體成果背後的流程與系統關係更容易被理解。
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {diagrams.map((diagram) => (
          <figure key={`${diagram.type}-${diagram.title}`} className="grid gap-4">
            <div className="media-frame overflow-hidden rounded-[var(--radius-md)]">
              <ResponsiveImage
                image={diagram.image}
                className="aspect-[4/5] h-full w-full object-cover"
                sizes="(min-width: 1024px) 28vw, (min-width: 768px) 42vw, 92vw"
              />
            </div>
            <figcaption className="grid gap-2">
              <p className="zh-label text-[var(--theme-accent)]">
                {diagramLabels[diagram.type] ?? "Diagram"}
              </p>
              <h4 className="zh-heading text-[clamp(1.15rem,1.7vw,1.55rem)]">{diagram.title}</h4>
              <p className="zh-caption text-[color:var(--theme-muted)]">
                {diagram.caption}
              </p>
              <details className="zh-caption text-[color:var(--theme-muted)]">
                <summary className="interactive-link cursor-pointer font-extrabold text-[var(--theme-text)]">
                  圖像文字說明
                </summary>
                <p className="mt-2">{diagram.description}</p>
              </details>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
// Codex-Fix: Complex diagrams now include visible captions and expandable text equivalents.

function ImageEvidenceGrid({ title, items = [] }) {
  if (!items.length) return null;

  return (
    <section className="grid gap-6">
      <h4 className="meta-label text-[var(--theme-accent)]">{title}</h4>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <figure key={item.title} className="grid gap-4">
            <div className="media-frame overflow-hidden rounded-[var(--radius-md)]">
              <ResponsiveImage
                image={item.image}
                className="aspect-[4/5] h-full w-full object-cover"
                sizes="(min-width: 1024px) 34vw, (min-width: 768px) 44vw, 92vw"
              />
            </div>
            <figcaption>
              <p className="zh-heading text-[clamp(1.12rem,1.5vw,1.4rem)]">{item.title}</p>
              <p className="zh-caption mt-1 text-[color:var(--theme-muted)]">
                {item.caption}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function VideoFigure({ video, featured = false }) {
  const transcriptId = `${video.title.replace(/[^a-zA-Z0-9\u3400-\u9fff-]+/g, "-")}-transcript`;
  const tracks = video.tracks?.length
    ? video.tracks
    : video.captionsSrc
      ? [{ kind: "captions", src: video.captionsSrc, srcLang: "zh-Hant", label: "繁體中文字幕", default: true }]
      : [];

  return (
    <figure className="grid gap-4">
      <div className="media-frame overflow-hidden rounded-[var(--radius-md)]">
        {video.youtubeId ? (
          <iframe
            className="aspect-video h-full w-full"
            title={video.title}
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            sandbox="allow-scripts allow-same-origin allow-popups allow-presentation"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            aria-describedby={video.transcript ? transcriptId : undefined}
          />
        ) : (
          <video
            className="aspect-video h-full w-full object-cover"
            controls
            playsInline
            preload="none"
            poster={video.poster.src}
            width={video.poster.width}
            height={video.poster.height}
            aria-describedby={video.transcript ? transcriptId : undefined}
          >
            <source src={video.src} type={video.mimeType ?? "video/mp4"} />
            {tracks.map((track) => (
              <track
                key={`${track.srcLang}-${track.src}`}
                kind={track.kind ?? "subtitles"}
                src={track.src}
                srcLang={track.srcLang}
                label={track.label}
                default={Boolean(track.default)}
              />
            ))}
            你的瀏覽器不支援嵌入影片，請改用作品連結或文字說明。
          </video>
        )}
      </div>
      <figcaption className={featured ? "grid gap-3 md:grid-cols-[0.36fr_0.64fr] md:gap-8" : "grid gap-2"}>
        <div>
          <p className="zh-heading text-[clamp(1.12rem,1.7vw,1.55rem)]">{video.title}</p>
          <p className="zh-caption mt-1 text-[color:var(--theme-muted)]">{video.caption}</p>
        </div>
        {video.transcript ? (
          <div className="grid gap-3">
            <p id={transcriptId} className="zh-caption rounded-[var(--radius-sm)] bg-[color:var(--theme-surface)] p-3 text-[color:var(--theme-muted)]">
              文字摘要：{video.transcript}
            </p>
            {video.transcriptCues?.length ? (
              <details className="zh-caption rounded-[var(--radius-sm)] border border-[color:var(--theme-line)] p-3 text-[color:var(--theme-muted)]">
                <summary className="interactive-link cursor-pointer font-extrabold text-[var(--theme-text)]">閱讀中英雙語逐字稿</summary>
                <ol className="mt-4 grid gap-4">
                  {video.transcriptCues.map((cue) => (
                    <li key={cue.time} className="grid gap-1 border-t border-[color:var(--theme-line)] pt-3">
                      <span className="zh-label text-[var(--theme-accent)]">{cue.time}</span>
                      <span lang="en">EN: {cue.en}</span>
                      <span lang="zh-Hant-TW">中：{cue.zh}</span>
                    </li>
                  ))}
                </ol>
              </details>
            ) : null}
          </div>
        ) : null}
      </figcaption>
    </figure>
  );
}

function FeaturedMedia({ id, project }) {
  const video = project.media?.videos?.find((item) => item.featured);
  if (!video) return null;

  return (
    <section id={id} className="case-anchor grid gap-6" aria-labelledby={`${id}-title`}>
      <div className="grid gap-3 md:grid-cols-[0.32fr_0.68fr] md:gap-12">
        <p className="meta-label text-[var(--theme-accent)]">Featured evidence / 實際成片</p>
        <div className="grid gap-3">
          <h3 id={`${id}-title`} className="zh-heading text-[clamp(1.35rem,2.4vw,2.15rem)]">可播放、可切換字幕的作品證據</h3>
          <p className="zh-copy text-[color:var(--theme-muted)]">{project.featuredMediaIntro}</p>
        </div>
      </div>
      <VideoFigure video={video} featured />
    </section>
  );
}

function VideoEvidence({ videos = [] }) {
  const supportingVideos = videos.filter((video) => !video.featured);
  if (!supportingVideos.length) return null;

  return (
    <section className="grid gap-6">
      <h4 className="meta-label text-[var(--theme-accent)]">Video / 影片</h4>
      <div className="grid gap-6 md:grid-cols-2">
        {supportingVideos.map((video) => <VideoFigure key={video.title} video={video} />)}
      </div>
    </section>
  );
}
// Codex-Fix: Video evidence now preserves 16:9 media, multiple subtitle tracks, playsInline behavior, and complete transcript access.

function AudioEvidence({ audio = [] }) {
  if (!audio.length) return null;

  return (
    <section className="grid gap-4">
      <h4 className="meta-label text-[var(--theme-accent)]">Audio / 聲音</h4>
      {audio.map((item) => {
        const transcriptId = `${item.title.replace(/\s+/g, "-")}-audio-transcript`;

        return (
          <div key={item.title} className="rounded-[var(--radius-md)] border border-[color:var(--theme-line)] p-5">
            <p className="zh-heading text-[clamp(1.12rem,1.5vw,1.4rem)]">{item.title}</p>
            {item.src ? (
              <>
                <audio className="mt-4 w-full" controls preload="none" src={item.src} aria-describedby={item.transcript ? transcriptId : undefined}>
                  你的瀏覽器不支援嵌入音訊，請參考文字摘要。
                </audio>
                {item.transcript ? (
                  <p id={transcriptId} className="zh-caption mt-3 text-[color:var(--theme-muted)]">
                    文字摘要：{item.transcript}
                  </p>
                ) : null}
              </>
            ) : (
              <p className="zh-caption mt-3 text-[color:var(--theme-muted)]">
                {item.caption}
              </p>
            )}
          </div>
        );
      })}
    </section>
  );
}

function DemoEmbedCard({ demo }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const hasExternalHref = demo.href?.startsWith("http");

  return (
    <div className="rounded-[var(--radius-md)] border border-[color:var(--theme-line)] p-5">
      <p className="zh-heading text-[clamp(1.12rem,1.5vw,1.4rem)]">{demo.title}</p>
      <p className="zh-caption mt-2 text-[color:var(--theme-muted)]">
        {demo.caption}
      </p>
      {demo.embedUrl ? (
        isLoaded ? (
          <iframe
            className="mt-5 aspect-video w-full rounded-[var(--radius-sm)] border border-[color:var(--theme-line)]"
            title={demo.title}
            src={demo.embedUrl}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups"
            referrerPolicy="no-referrer"
          />
        ) : (
          <button
            className="cta-button interactive-link chip-text mt-5 inline-flex rounded-full px-5 py-3 text-sm font-extrabold"
            type="button"
            onClick={() => setIsLoaded(true)}
          >
            載入互動 demo
          </button>
        )
      ) : demo.href ? (
        <a
          className="cta-button interactive-link chip-text mt-5 inline-flex rounded-full px-5 py-3 text-sm font-extrabold"
          href={demo.href}
          target={hasExternalHref ? "_blank" : undefined}
          rel={hasExternalHref ? "noreferrer" : undefined}
        >
          開啟 demo
        </a>
      ) : (
        <span className="chip-text mt-5 inline-flex rounded-full border border-[color:var(--theme-line)] px-5 py-3 text-sm font-extrabold text-[color:var(--theme-muted)]">
          Demo 位置已預留
        </span>
      )}
    </div>
  );
}
// Codex-Fix: Heavy iframe demos load only after explicit user intent, preserving initial performance and INP.

function DemoEvidence({ demos = [] }) {
  if (!demos.length) return null;

  return (
    <section className="grid gap-4">
      <h4 className="meta-label text-[var(--theme-accent)]">Interactive Demo / 互動展示</h4>
      <div className="grid gap-4 md:grid-cols-2">
        {demos.map((demo) => (
          <DemoEmbedCard key={demo.title} demo={demo} />
        ))}
      </div>
    </section>
  );
}

function RestrictedMediaEvidence({ items = [] }) {
  if (!items.length) return null;

  return (
    <section className="grid gap-4">
      <h4 className="meta-label text-[var(--theme-accent)]">Restricted / 不公開資料</h4>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.title} className="rounded-[var(--radius-md)] border border-[color:var(--theme-line)] bg-[color:var(--theme-surface)] p-5">
            <p className="zh-heading text-[clamp(1.12rem,1.5vw,1.4rem)]">{item.title}</p>
            <p className="zh-label mt-3 text-[var(--theme-accent)]">{item.status}</p>
            <p className="zh-caption mt-3 text-[color:var(--theme-muted)]">{item.caption}</p>
            <p className="zh-caption mt-3 rounded-[var(--radius-sm)] bg-[color:var(--color-surface)] p-3 text-[color:var(--theme-muted)]">
              公開限制：{item.reason}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
// Codex-Fix: Restricted media is represented as policy text only, so private videos/files never enter the public build.

function MediaEvidence({ id, media }) {
  const hasSupportingEvidence = Boolean(
    media?.visualDrafts?.length
    || media?.screenshots?.length
    || media?.videos?.some((video) => !video.featured)
    || media?.audio?.length
    || media?.demos?.length
    || media?.restricted?.length,
  );
  if (!hasSupportingEvidence) return null;

  return (
    <section id={id} className="grid gap-10 border-t border-[color:var(--theme-line)] pt-8">
      <div className="grid gap-3 md:grid-cols-[0.32fr_0.68fr] md:gap-12">
        <h3 className="meta-label text-[var(--theme-accent)]">
          媒體證據
        </h3>
        <p className="zh-copy text-[color:var(--theme-muted)]">
          視覺稿、截圖、影片、聲音與 demo 都作為「證據」呈現。非首屏媒體延後載入，互動 demo 需要使用者明確點擊才會啟動。
        </p>
      </div>
      <ImageEvidenceGrid title="視覺稿" items={media.visualDrafts} />
      <ImageEvidenceGrid title="介面截圖" items={media.screenshots} />
      <VideoEvidence videos={media.videos} />
      <AudioEvidence audio={media.audio} />
      <DemoEvidence demos={media.demos} />
      <RestrictedMediaEvidence items={media.restricted} />
    </section>
  );
}

function ToolsRoles({ id, project }) {
  return (
    <section id={id} className="grid gap-8 border-t border-[color:var(--theme-line)] pt-8 md:grid-cols-2">
      <div className="grid gap-4">
        <h3 className="meta-label text-[var(--theme-accent)]">工具</h3>
        <ChipList items={project.tools} label={`${project.title} 使用工具`} />
      </div>
      <div className="grid gap-4">
        <h3 className="meta-label text-[var(--theme-accent)]">我的角色</h3>
        <ChipList items={project.roles} label={`${project.title} 個人角色`} />
      </div>
    </section>
  );
}

function TestingResults({ id, testing }) {
  if (!testing) return null;

  return (
    <section id={id} className="grid gap-8 border-t border-[color:var(--theme-line)] pt-8">
      <div className="grid gap-3 md:grid-cols-[0.32fr_0.68fr] md:gap-12">
        <h3 className="meta-label text-[var(--theme-accent)]">
          測試 / 成效
        </h3>
        <p className="zh-copy text-[color:var(--theme-muted)]">
          {testing.status}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {testing.metrics?.map((metric) => (
          <div key={metric.label} className="rounded-[var(--radius-md)] border border-[color:var(--theme-line)] p-5">
            <p className="zh-label text-[var(--theme-accent)]">
              {metric.label}
            </p>
            <p className="zh-heading mt-3 text-[clamp(1.45rem,2.6vw,2.35rem)]">{metric.value}</p>
          </div>
        ))}
      </div>
      {testing.insights?.length ? (
        <ul className="grid gap-3 text-[color:var(--theme-muted)]">
          {testing.insights.map((insight) => (
            <li key={insight} className="zh-copy rounded-[var(--radius-sm)] bg-[color:var(--color-surface)] p-4">
              {insight}
            </li>
          ))}
        </ul>
      ) : null}
      {testing.plannedMethods?.length ? (
        <div className="grid gap-3 rounded-[var(--radius-md)] border border-[color:var(--theme-line)] p-5">
          <h4 className="meta-label text-[var(--theme-accent)]">後續形成性測試方法</h4>
          <ul className="grid gap-2 text-[color:var(--theme-muted)]">
            {testing.plannedMethods.map((method) => <li key={method} className="zh-caption">{method}</li>)}
          </ul>
        </div>
      ) : null}
      {testing.learningOutcomes?.length ? (
        <div className="grid gap-3 rounded-[var(--radius-md)] border border-[color:var(--theme-line)] p-5">
          <h4 className="meta-label text-[var(--theme-accent)]">
            學習成效線索
          </h4>
          <ul className="grid gap-2 text-[color:var(--theme-muted)]">
            {testing.learningOutcomes.map((outcome) => (
              <li key={outcome} className="zh-caption">{outcome}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

function ReflectionPanel({ id, reflection }) {
  if (!reflection) return null;

  const items = [
    ["做得好的地方", reflection.strengths],
    ["限制", reflection.limitations],
    ["研究所深化方向", reflection.graduateDirection],
  ];

  return (
    <section id={id} className="paper-panel grid gap-6 rounded-[var(--radius-lg)] p-6 md:grid-cols-3 md:p-8">
      {items.map(([title, copy]) => (
        <div key={title} className="grid content-start gap-3">
          <h3 className="zh-label opacity-70">{title}</h3>
          <p className="zh-copy text-[var(--theme-inverse-text)]">{copy}</p>
        </div>
      ))}
    </section>
  );
}

function InstituteConnection({ project }) {
  const rationales = Object.entries(project.themeRationales ?? {});

  return (
    <section id={`${project.id}-themes`} className="grid gap-5 border-t border-[color:var(--theme-line)] pt-8">
      <h3 className="meta-label text-[var(--theme-accent)]">
        本所連結
      </h3>
      <ChipList items={project.instituteConnections} accent label={`${project.title} 與研究所主題連結`} />
      {rationales.length ? (
        <dl className="grid gap-3 md:grid-cols-2">
          {rationales.map(([theme, rationale]) => (
            <div key={theme} className="soft-panel rounded-[var(--radius-sm)] p-4">
              <dt className="zh-label text-[var(--theme-accent)]">
                {theme}
              </dt>
              <dd className="zh-caption mt-2 text-[color:var(--theme-muted)]">
                {rationale}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </section>
  );
}
// Codex-Fix: Institute-theme tags require visible rationale, so alignment reads as evidence rather than decoration.

function ProjectLinksCredits({ project }) {
  if (!project.links?.length && !project.credits) return null;

  return (
    <section className="grid gap-6 border-t border-[color:var(--theme-line)] pt-8 md:grid-cols-2">
      {project.links?.length ? (
        <div className="grid gap-4">
          <h3 className="meta-label text-[var(--theme-accent)]">
            連結
          </h3>
          <ul className="grid gap-3">
            {project.links.map((link) => {
              const isExternal = link.href?.startsWith("http");

              return (
                <li key={link.href}>
                  <a
                    className="interactive-link font-black underline decoration-[var(--theme-accent)] decoration-2 underline-offset-4"
                    href={link.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
      <div className="grid gap-4">
        <h3 className="meta-label text-[var(--theme-accent)]">
          合作與註記
        </h3>
        <p className="zh-caption text-[color:var(--theme-muted)]">
          {project.credits}
        </p>
      </div>
    </section>
  );
}

function ProjectDetail({ project, previousProject, nextProject }) {
  return (
    <article
      id={project.id}
      className="case-study-detail scroll-mt-28 px-[clamp(1.25rem,6vw,10vw)] py-28 md:py-36"
      aria-labelledby={`${project.id}-title`}
    >
      <div className="mx-auto grid max-w-7xl gap-12">
        <header className="grid gap-10 md:grid-cols-[0.46fr_0.54fr] md:items-end">
          <div className="grid gap-6">
            <p className="meta-label text-[var(--theme-accent)]">
              {project.eyebrow ?? project.category} / {project.status}
            </p>
            <EditorialHeading
              as="h2"
              id={`${project.id}-title`}
              className="case-title editorial-heading editorial-heading--display zh-display"
              lines={project.titleLines}
            >
              {project.title}
            </EditorialHeading>
            {project.englishTitle ? (
              <p className="zh-caption max-w-[42rem] font-semibold text-[color:var(--theme-muted)]" lang="en">{project.englishTitle}</p>
            ) : null}
          </div>
          <div className="grid gap-6">
            <p className="zh-lead text-[var(--theme-text)]">
              {project.summary}
            </p>
            <ChipList items={project.tags} label={`${project.title} 內容標籤`} />
            <CaseCtas ctas={project.ctas} />
            <MetaGrid project={project} />
          </div>
        </header>

        <FeaturedMedia id={`${project.id}-featured-media`} project={project} />
        <ProjectReadingMap project={project} />
        <PortfolioDraftLayer projectId={project.id} />
        <NarrativeBlock id={`${project.id}-problem`} title={project.challenge ? "專案背景" : "問題意識"}>{project.problemAwareness}</NarrativeBlock>
        <ChallengePanel id={`${project.id}-challenge`} challenge={project.challenge} />
        <NarrativeBlock id={`${project.id}-audience`} title={project.challenge ? "使用情境" : "目標使用者 / 觀眾"}>{project.audience}</NarrativeBlock>
        <NarrativeBlock id={`${project.id}-proof`} title="此作品證明">{project.whatThisProves}</NarrativeBlock>
        <NarrativeBlock id={`${project.id}-goal`} title={project.workflow ? "解決方案摘要" : "設計目標"}>{project.designGoal}</NarrativeBlock>
        {project.interactivePrototype?.type === "webAudioSpatialMapper" ? (
          <SectionErrorBoundary sectionName="互動聲響原型">
            <Suspense fallback={<p className="zh-caption text-[color:var(--theme-muted)]">互動聲響原型載入中。</p>}>
              <SoundInteractionPrototype project={project} />
            </Suspense>
          </SectionErrorBoundary>
        ) : null}
        {project.workflow ? (
          <>
            <WorkflowSection id={`${project.id}-workflow`} workflow={project.workflow} />
            <PromptDecisionSection id={`${project.id}-prompt-system`} decisions={project.promptDecisions} template={project.promptTemplate} />
          </>
        ) : (
          <>
            <NarrativeBlock id={`${project.id}-process-intent`} title="設計流程">{project.designProcess}</NarrativeBlock>
            <NarrativeBlock id={`${project.id}-technology`} title="技術 / 媒體">{project.technologyAndMedia}</NarrativeBlock>
            <NarrativeBlock id={`${project.id}-outcome`} title="成果呈現">{project.outcomeShowcase}</NarrativeBlock>
          </>
        )}
        <StructuredProjectSections sections={project.extendedSections} />
        <StoryboardStrip id={`${project.id}-storyboard`} storyboard={project.storyboard} />
        <FeaturedExample id={`${project.id}-featured-example`} example={project.featuredExample} />
        <MediaLayerSection id={`${project.id}-media-layers`} layers={project.mediaLayers} />
        <DeliverablesSection id={`${project.id}-deliverables`} deliverables={project.deliverables} />
        <EvidenceBoundarySection id={`${project.id}-evidence-boundary`} boundary={project.evidenceBoundary} />
        <OutcomesSection id={`${project.id}-outcomes`} outcomes={project.outcomes} />
        <EvaluationPlanSection id={`${project.id}-evaluation-plan`} plan={project.evaluationPlan} />
        <DiagramGallery id={`${project.id}-process`} diagrams={project.diagrams} />
        <MediaEvidence id={`${project.id}-media`} media={project.media} />
        <ToolsRoles id={`${project.id}-tools`} project={project} />
        <TestingResults id={`${project.id}-testing`} testing={project.testing} />
        <ReflectionPanel id={`${project.id}-reflection`} reflection={project.reflection} />
        <InstituteConnection project={project} />
        <ProjectLinksCredits project={project} />
        <CaseClosingPanel id={`${project.id}-next-steps`} insight={project.keyInsight} nextSteps={project.nextSteps} ctas={project.ctas} />

        <nav className="grid gap-4 border-t border-[color:var(--theme-line)] pt-8 md:grid-cols-2" aria-label={`${project.title} 作品導覽`}>
          {previousProject ? (
            <a className="evidence-panel interactive-link rounded-[var(--radius-md)] p-5" href={`#${previousProject.id}`}>
              <span className="meta-label block text-[var(--theme-accent)]">Previous</span>
              <span className="zh-heading mt-2 block text-xl">{previousProject.title}</span>
            </a>
          ) : (
            <a className="evidence-panel interactive-link rounded-[var(--radius-md)] p-5" href="#project-index">
              <span className="meta-label block text-[var(--theme-accent)]">Back</span>
              <span className="zh-heading mt-2 block text-xl">Project index</span>
            </a>
          )}
          {nextProject ? (
            <a className="evidence-panel interactive-link rounded-[var(--radius-md)] p-5 md:text-right" href={`#${nextProject.id}`}>
              <span className="meta-label block text-[var(--theme-accent)]">Next</span>
              <span className="zh-heading mt-2 block text-xl">{nextProject.title}</span>
            </a>
          ) : (
            <a className="evidence-panel interactive-link rounded-[var(--radius-md)] p-5 md:text-right" href="#reviewer-path">
              <span className="meta-label block text-[var(--theme-accent)]">Finish</span>
              <span className="zh-heading mt-2 block text-xl">Reviewer path</span>
            </a>
          )}
        </nav>
      </div>
    </article>
  );
}

export default function CaseStudyShowcase({ scope = "all", showIndex = true }) {
  const renderedProjects = scope === "flagship"
    ? sortedProjectCaseStudies.filter((project) => project.id === "interactive-sound-learning")
    : scope === "supporting"
      ? sortedProjectCaseStudies.filter((project) => project.id !== "interactive-sound-learning")
      : sortedProjectCaseStudies;

  return (
    <section id={showIndex ? "gallery" : undefined} className="bg-[var(--theme-bg)] text-[var(--theme-text)]">
      {showIndex ? (
        <section id="project-index" aria-labelledby="project-index-title" className="min-h-screen px-[clamp(1.25rem,6vw,10vw)] py-28 md:py-40">
          <div className="mx-auto grid max-w-7xl gap-16">
            <div className="grid gap-8 md:grid-cols-[0.42fr_0.58fr] md:items-end">
              <div className="grid gap-4">
                <p className="meta-label text-[var(--theme-accent)]">Case Study / 作品證據</p>
                <EditorialHeading as="h2" id="project-index-title" className="gallery-title editorial-heading zh-display" lines={[["作品", "證據鏈"]]}>作品證據鏈</EditorialHeading>
              </div>
              <div className="grid gap-5">
                <p className="zh-lead text-[color:var(--theme-muted)]">先從互動聲響原型進入，再閱讀 AI 文學內容、資料視覺化與跨媒介能力如何支持研究方向。</p>
                <PortfolioDraftLayer placement="overview" />
              </div>
            </div>

            <div id="themes" className="grid gap-4">
              <p className="meta-label text-[var(--theme-accent)]">研究所主題</p>
              <ChipList items={instituteThemes} accent label="研究所主題標籤" />
            </div>

            <div className="grid gap-16 lg:grid-cols-3">
              {sortedProjectCaseStudies.map((project, index) => <ProjectOverviewCard key={project.id} project={project} index={index} />)}
            </div>
          </div>
        </section>
      ) : null}

      {renderedProjects.map((project) => {
        const globalIndex = sortedProjectCaseStudies.findIndex((item) => item.id === project.id);
        return (
          <ProjectDetail
            key={project.id}
            project={project}
            previousProject={sortedProjectCaseStudies[globalIndex - 1]}
            nextProject={sortedProjectCaseStudies[globalIndex + 1]}
          />
        );
      })}
    </section>
  );
}
