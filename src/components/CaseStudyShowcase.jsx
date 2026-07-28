import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  sortedProjectCaseStudies,
  instituteThemes,
} from "../data/portfolio.js";
import EditorialHeading from "./EditorialHeading.jsx";
import SectionErrorBoundary from "./SectionErrorBoundary.jsx";
import PortfolioDraftLayer from "#portfolio-draft";
import AnimatedDetails from "./AnimatedDetails.jsx";
import ResponsiveImage from "./ResponsiveImage.jsx";

const SoundInteractionPrototype = lazy(() => import("./SoundInteractionPrototype.jsx"));
const CaseProcessSection = lazy(() => import("./CaseProcessSection.jsx"));
const ProjectIndexGrid = lazy(() => import("./ProjectIndexGrid.jsx"));
const LazyLearningDashboardProjectDetail = lazy(() => import("./LearningDashboardProjectDetail.jsx"));

const hasSupportingMediaEvidence = (media = {}) => Boolean(
  media.visualDrafts?.length
  || media.screenshots?.length
  || media.videos?.some((video) => !video.featured)
  || media.audio?.length
  || media.demos?.length
  || media.restricted?.length,
);

const defaultCaseReadingAnchors = [
  { key: "problem", label: "問題", title: "問題意識" },
  { key: "process", label: "流程", title: "流程與系統" },
  { key: "media", label: "媒體", title: "媒體證據" },
  { key: "tools", label: "工具", title: "工具與負責項目" },
  { key: "reflection", label: "反思", title: "研究深化" },
  { key: "themes", label: "連結", title: "本所主題" },
];

const getCaseReadingAnchors = (project) => project.workflow
  ? [
      { key: "problem", label: "背景", title: "專案背景" },
      { key: "workflow", label: "流程", title: "五階段製作" },
      { key: "prompt-system", label: "Prompt", title: "Prompt Design" },
      { key: "storyboard", label: "分鏡", title: "實際八幕分鏡" },
      { key: "outcomes", label: "價值", title: "成果與價值" },
      { key: "next-steps", label: "後續", title: "洞察與下一步" },
    ]
  : defaultCaseReadingAnchors
      .filter((anchor) => anchor.key !== "media" || hasSupportingMediaEvidence(project.media))
      .map((anchor) => {
        if (anchor.key !== "process") return anchor;
        if (project.productionWorkflow?.title) {
          return { ...anchor, title: project.productionWorkflow.title };
        }
        return project.diagrams?.[0]?.kind === "visualStrategy"
          ? { ...anchor, label: "視覺", title: "視覺策略" }
          : anchor;
      });

const countMediaEvidence = (media = {}) =>
  [media.visualDrafts, media.screenshots, media.videos, media.audio, media.demos, media.restricted]
    .reduce((total, items) => total + (items?.length ?? 0), 0);

function getEvidenceSnapshot(project) {
  return [
    project.productionWorkflow?.stages?.length
      ? { label: "製作階段", value: project.productionWorkflow.stages.length }
      : project.workflow?.stages?.length
      ? { label: "流程階段", value: project.workflow.stages.length }
      : { label: "圖解", value: project.diagrams?.length ?? 0 },
    { label: "媒體件數", value: countMediaEvidence(project.media) },
    { label: "工具", value: project.tools?.length ?? 0 },
    { label: "負責項目", value: project.roles?.length ?? 0 },
    { label: "成效", value: project.testing?.statusKey === "validated" ? "已驗證" : project.testing?.statusKey === "exploratory" ? "探索中" : "尚未驗證" },
  ];
}

function ChipList({ items = [], accent = false, label = "標籤", variant }) {
  if (!items.length) return null;
  const resolvedVariant = variant ?? (accent ? "accent" : "default");

  return (
    <ul className="flex flex-wrap gap-2" aria-label={label}>
      {items.map((item) => (
        <li
          key={item}
          className={
            resolvedVariant === "static"
              ? "chip-text inline-flex items-center rounded-[var(--radius-sm)] border border-[color:var(--theme-line)] bg-[color:var(--theme-surface)] px-3 py-1.5 text-sm font-bold text-[var(--theme-text)]"
              : resolvedVariant === "accent"
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
              className="case-reading-link interactive-link chip-text inline-flex items-center rounded-full border border-[color:var(--theme-line)] px-3.5 py-1.5 text-xs font-extrabold text-[color:var(--theme-muted)] hover:text-[var(--theme-text)]"
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
            rel={isExternal ? "noopener noreferrer" : undefined}
            onClick={() => {
              if (!cta.focusTarget) return;
              window.requestAnimationFrame(() => {
                document.querySelector(cta.focusTarget)?.focus({ preventScroll: true });
              });
            }}
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
      <p className="meta-label text-[var(--theme-accent)]">核心挑戰</p>
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
        <p className="meta-label text-[var(--theme-accent)]">製作流程</p>
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
            <dl className="mt-auto grid gap-3 border-t border-[color:var(--theme-line)] pt-4">
              {[
                ["輸入", stage.input],
                ["產出", stage.output],
                ["這一步要守住", stage.constraint],
                ["核對重點", stage.humanCheck],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="zh-label text-[var(--theme-accent)]">{label}</dt>
                  <dd className="zh-caption mt-1.5 text-[var(--theme-text)]">{value}</dd>
                </div>
              ))}
            </dl>
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
        <AnimatedDetails
          className="rounded-[var(--radius-md)] border border-[color:var(--theme-line)] p-5"
          summary="展開提示詞模板 v1"
          summaryClassName="interactive-link cursor-pointer font-extrabold text-[var(--theme-text)]"
        >
          <pre className="case-prompt-template zh-caption mt-5 rounded-[var(--radius-sm)] bg-[color:var(--theme-surface)] p-4 text-[var(--theme-text)]">{template.prompt.join("\n\n")}</pre>
        </AnimatedDetails>
        <aside className="soft-panel rounded-[var(--radius-md)] p-5" aria-label="提示詞模板人工核對清單">
          <h5 className="meta-label text-[var(--theme-accent)]">人工核對</h5>
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
        <p className="meta-label text-[var(--theme-accent)]">提示詞限制</p>
        <div className="grid gap-3">
          <h3 id={`${id}-title`} className="zh-heading text-[clamp(1.55rem,3vw,2.8rem)]">四項輸出條件</h3>
          <p className="zh-copy text-[color:var(--theme-muted)]">先界定情節、語言、畫面與聲音的範圍，再逐項人工核對；提示詞不代替最後判斷。</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {decisions.map((decision, index) => (
          <article key={decision.title} className="evidence-panel grid content-start gap-5 rounded-[var(--radius-md)] p-5 md:p-6">
            <div className="flex items-baseline justify-between gap-4">
              <h4 className="zh-heading text-[clamp(1.25rem,2vw,1.8rem)]">{decision.title}</h4>
              <span className="meta-label text-[var(--theme-accent)]">條件 0{index + 1}</span>
            </div>
            <dl className="grid gap-4">
              {[
                ["限制條件", decision.constraint],
                ["為什麼需要", decision.rationale],
                ["避免的輸出問題", decision.outputProblem],
                ["核對重點", decision.humanCheck],
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

function StoryboardStrip({ id, storyboard, videoId }) {
  const [seekStatus, setSeekStatus] = useState("");
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const pendingSeekRef = useRef(null);
  const storyboardListRef = useRef(null);

  const clearPendingSeek = () => {
    const pendingSeek = pendingSeekRef.current;
    if (!pendingSeek) return;
    pendingSeek.video.removeEventListener("loadedmetadata", pendingSeek.applySeek);
    pendingSeek.video.removeEventListener("error", pendingSeek.handleError);
    pendingSeek.video.removeEventListener("abort", pendingSeek.handleError);
    pendingSeekRef.current = null;
  };

  useEffect(() => () => {
    clearPendingSeek();
  }, []);

  if (!storyboard?.frames?.length) return null;

  const handleSceneSeek = (frame, index) => {
    const video = document.getElementById(videoId);
    if (!(video instanceof HTMLVideoElement)) {
      setSeekStatus("目前找不到案例影片，請使用上方作品摘要與逐字稿。");
      return;
    }

    const applySeek = () => {
      clearPendingSeek();
      setActiveFrameIndex(index);
      video.pause();
      video.currentTime = frame.seekSeconds;
      video.scrollIntoView({
        block: "center",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
      setSeekStatus(`已將影片定位至第 ${String(index + 1).padStart(2, "0")} 幕，${frame.time}。`);
    };
    const handleError = () => {
      clearPendingSeek();
      setSeekStatus("影片暫時無法載入；請改用分鏡說明與逐字稿閱讀本段內容。");
    };

    if (video.readyState === HTMLMediaElement.HAVE_NOTHING) {
      clearPendingSeek();
      pendingSeekRef.current = { video, applySeek, handleError };
      video.addEventListener("loadedmetadata", applySeek, { once: true });
      video.addEventListener("error", handleError, { once: true });
      video.addEventListener("abort", handleError, { once: true });
      if (video.networkState === HTMLMediaElement.NETWORK_EMPTY) video.load();
    } else {
      applySeek();
    }
  };

  const moveToFrame = (index) => {
    const storyboardList = storyboardListRef.current;
    if (!storyboardList) return;
    const clampedIndex = Math.max(0, Math.min(index, storyboard.frames.length - 1));
    const firstFrame = storyboardList.querySelector(".case-storyboard__item");
    const styles = window.getComputedStyle(storyboardList);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
    const step = (firstFrame?.getBoundingClientRect().width || storyboardList.clientWidth * 0.85) + gap;
    storyboardList.scrollTo({
      left: step * clampedIndex,
      behavior: "auto",
    });
    setActiveFrameIndex(clampedIndex);
  };

  const handleKeyDown = (event) => {
    let nextIndex;
    if (event.key === "ArrowRight") nextIndex = activeFrameIndex + 1;
    if (event.key === "ArrowLeft") nextIndex = activeFrameIndex - 1;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = storyboard.frames.length - 1;
    if (nextIndex === undefined) return;

    event.preventDefault();
    moveToFrame(nextIndex);
  };

  return (
    <section id={id} className="case-anchor grid gap-8 border-t border-[color:var(--theme-line)] pt-8" aria-labelledby={`${id}-title`}>
      <div className="grid gap-4 md:grid-cols-[0.32fr_0.68fr] md:gap-12">
        <p className="meta-label text-[var(--theme-accent)]">實際分鏡</p>
        <div className="grid gap-3">
          <h3 id={`${id}-title`} className="zh-heading text-[clamp(1.55rem,3vw,2.8rem)]">{storyboard.title}</h3>
          <p className="zh-copy text-[color:var(--theme-muted)]">{storyboard.summary}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3" aria-label="分鏡上一幕與下一幕控制">
        <p className="zh-label text-[color:var(--theme-muted)]" aria-live="polite">目前為第 {String(activeFrameIndex + 1).padStart(2, "0")} / {String(storyboard.frames.length).padStart(2, "0")} 幕</p>
        <div className="flex gap-2">
          <button type="button" className="interactive-link min-h-11 rounded-full border border-[color:var(--theme-line)] px-4 py-2 text-sm font-extrabold disabled:cursor-not-allowed disabled:opacity-45" disabled={activeFrameIndex === 0} onClick={() => moveToFrame(activeFrameIndex - 1)}>上一幕</button>
          <button type="button" className="interactive-link min-h-11 rounded-full border border-[color:var(--theme-line)] px-4 py-2 text-sm font-extrabold disabled:cursor-not-allowed disabled:opacity-45" disabled={activeFrameIndex === storyboard.frames.length - 1} onClick={() => moveToFrame(activeFrameIndex + 1)}>下一幕</button>
        </div>
      </div>
      <p id={`${id}-instructions`} className="sr-only">使用左右方向鍵瀏覽分鏡，Home 跳到第一幕，End 跳到最後一幕；每張卡的「跳至此幕」按鈕可定位上方影片。</p>
      <ol
        ref={storyboardListRef}
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
                  <p className="meta-label text-[var(--theme-accent)]">第 0{index + 1} 幕</p>
                  <p className="zh-label text-[color:var(--theme-muted)]">{frame.time}</p>
                </div>
                <h4 className="zh-heading text-[clamp(1.15rem,1.7vw,1.5rem)]">{frame.title}</h4>
                <p className="mixed-token text-sm font-extrabold text-[var(--theme-accent)]" lang="en">{frame.titleEn}</p>
                <p className="zh-caption font-semibold text-[var(--theme-text)]" lang="en">{frame.subtitle}</p>
                <p className="zh-caption text-[color:var(--theme-muted)]">{frame.description}</p>
                <p className="zh-caption border-t border-[color:var(--theme-line)] pt-3 text-[color:var(--theme-muted)]"><span className="zh-label text-[var(--theme-accent)]">這幕要守住：</span>{frame.control}</p>
                <button
                  type="button"
                  className="interactive-link mt-auto min-h-11 w-fit rounded-full border border-[color:var(--theme-line)] px-4 py-2 text-sm font-extrabold"
                  aria-controls={videoId}
                  onClick={() => handleSceneSeek(frame, index)}
                >
                  跳至此幕
                </button>
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>
      <p className="sr-only" role="status" aria-live="polite">{seekStatus}</p>
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
            <li key={theme} className="chip-text rounded-full border border-[color:var(--theme-inverse-line)] px-3.5 py-1.5 text-sm font-extrabold text-[var(--theme-inverse-text)]">{theme}</li>
          ))}
        </ul>
      </div>
      <aside className="grid content-start gap-4 border-t border-[color:var(--theme-inverse-line)] pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0">
        <p className="zh-label opacity-70">代表場景</p>
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
        <p className="meta-label text-[var(--theme-accent)]">媒體分工</p>
        <div className="grid gap-3">
          <h3 id={`${id}-title`} className="zh-heading text-[clamp(1.55rem,3vw,2.8rem)]">每一層媒體負責什麼</h3>
          <p className="zh-copy text-[color:var(--theme-muted)]">故事節點轉成場景圖像、字幕與情緒配樂，最後在 Canva 合成影片。本片沒有旁白軌。</p>
        </div>
      </div>
      <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {layers.map((layer, index) => (
          <li key={layer.label} className="soft-panel grid content-start gap-4 rounded-[var(--radius-md)] p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="meta-label text-[var(--theme-accent)]">媒體 0{index + 1}</span>
              <span className="chip-text rounded-full border border-[color:var(--theme-line)] px-3 py-1 text-xs font-bold text-[color:var(--theme-muted)]">{layer.status}</span>
            </div>
            <h4 className="zh-heading text-[clamp(1.15rem,1.6vw,1.45rem)]">{layer.label}</h4>
            <p className="zh-caption text-[color:var(--theme-muted)]">{layer.role}</p>
            <div className="mt-auto border-t border-[color:var(--theme-line)] pt-3">
              <p className="zh-label text-[var(--theme-accent)]">製作重點</p>
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
        <p className="meta-label text-[var(--theme-accent)]">作品內容</p>
        <div className="grid gap-3">
          <h3 id={`${id}-title`} className="zh-heading text-[clamp(1.55rem,3vw,2.8rem)]">這一版包含的成果與製作規格</h3>
          <p className="zh-copy text-[color:var(--theme-muted)]">現有成果、由成片整理的流程內容與後續可延伸的製作規格，會以不同狀態呈現。</p>
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

function OutcomesSection({ id, outcomes = [] }) {
  if (!outcomes.length) return null;

  return (
    <section id={id} className="case-anchor grid gap-8 border-t border-[color:var(--theme-line)] pt-8" aria-labelledby={`${id}-title`}>
      <div className="grid gap-4 md:grid-cols-[0.32fr_0.68fr] md:gap-12">
        <p className="meta-label text-[var(--theme-accent)]">目前成果</p>
        <div className="grid gap-3">
          <h3 id={`${id}-title`} className="zh-heading text-[clamp(1.55rem,3vw,2.8rem)]">這一版實際完成了什麼</h3>
          <p className="zh-copy text-[color:var(--theme-muted)]">以下整理已完成的內容與流程；學習觀察會在下一階段另外進行。</p>
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
          <p className="meta-label text-[var(--theme-accent)]">預計怎麼測</p>
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
      <p className="zh-caption rounded-[var(--radius-sm)] bg-[color:var(--theme-surface)] p-4 text-[color:var(--theme-muted)]">資料處理方式：{plan.dataPolicy}</p>
    </section>
  );
}

function CaseClosingPanel({ id, insight, nextSteps = [], ctas = [] }) {
  if (!insight && !nextSteps.length && !ctas.length) return null;

  return (
    <section id={id} className="case-anchor evidence-panel grid gap-8 rounded-[var(--radius-lg)] p-6 md:grid-cols-[0.52fr_0.48fr] md:p-8" aria-labelledby={`${id}-title`}>
      <div className="grid content-start gap-4">
        <p className="meta-label text-[var(--theme-accent)]">製作反思</p>
        <h3 id={`${id}-title`} className="zh-heading text-[clamp(1.55rem,3vw,2.8rem)]">目前的製作反思</h3>
        <p className="zh-copy-wide text-[var(--theme-text)]">{insight}</p>
      </div>
      <div className="grid content-start gap-6 border-t border-[color:var(--theme-line)] pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
        <div className="grid gap-3">
          <h4 className="meta-label text-[var(--theme-accent)]">下一步</h4>
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
          案例補充
        </h3>
        <p className="zh-copy text-[color:var(--theme-muted)]">
          補充製作方法、資料範圍與下一步。
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
// Case studies can carry rich handoff-driven narrative sections without hard-coding bespoke layouts.

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

function VideoFigure({ video, featured = false, id }) {
  const mediaIdBase = video.title.replace(/[^a-zA-Z0-9\u3400-\u9fff-]+/g, "-");
  const transcriptId = `${mediaIdBase}-transcript`;
  const accessibilitySummaryId = `${mediaIdBase}-accessibility-summary`;
  const [mediaStatus, setMediaStatus] = useState("loading");
  const [subtitleTrackError, setSubtitleTrackError] = useState(false);
  const tracks = video.tracks?.length
    ? video.tracks
    : video.captionsSrc
      ? [{ kind: "captions", src: video.captionsSrc, srcLang: "zh-Hant", label: "繁體中文字幕", default: true }]
      : [];
  const describedBy = [video.transcript ? transcriptId : null, video.accessibilitySummary ? accessibilitySummaryId : null]
    .filter(Boolean)
    .join(" ") || undefined;

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
        ) : mediaStatus === "error" ? (
          <div className="relative aspect-video overflow-hidden">
            <ResponsiveImage
              image={video.poster}
              className="absolute inset-0 h-full w-full object-contain"
              sizes="(min-width: 1024px) 72vw, 100vw"
              loading="eager"
              fetchPriority={featured ? "high" : "auto"}
            />
            <div className="absolute inset-x-3 bottom-3 grid gap-2 rounded-[var(--radius-sm)] bg-[color:var(--theme-surface)] p-4 shadow-lg sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-[28rem]">
              <p className="zh-caption font-extrabold text-[var(--theme-text)]">影片暫時無法載入；影片封面、分鏡與逐字稿仍可閱讀。</p>
              <a className="interactive-link zh-caption w-fit font-extrabold text-[var(--theme-accent)] underline" href={video.src}>直接開啟影片檔</a>
            </div>
          </div>
        ) : (
          <video
            id={id}
            className="aspect-video h-full w-full object-contain"
            controls
            playsInline
            tabIndex={0}
            preload={typeof navigator !== "undefined" && navigator.connection?.saveData ? "none" : "metadata"}
            poster={video.poster.src}
            width={video.poster.width}
            height={video.poster.height}
            aria-label={video.title}
            aria-describedby={describedBy}
            onLoadedMetadata={() => setMediaStatus("ready")}
            onError={() => setMediaStatus("error")}
          >
            <source src={video.src} type={video.mimeType ?? "video/mp4"} onError={() => setMediaStatus("error")} />
            {tracks.map((track) => (
              <track
                key={`${track.srcLang}-${track.src}`}
                kind={track.kind ?? "subtitles"}
                src={track.src}
                srcLang={track.srcLang}
                label={track.label}
                default={Boolean(track.default)}
                onError={() => setSubtitleTrackError(true)}
              />
            ))}
            你的瀏覽器不支援嵌入影片，請改用<a className="interactive-link" href={video.src}>直接影片檔</a>或文字說明。
          </video>
        )}
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {mediaStatus === "loading" ? "影片資料載入中；可先閱讀下方摘要與逐字稿。" : mediaStatus === "ready" ? "影片已可播放。" : "影片載入失敗，已顯示影片封面與直接檔案連結。"}
      </p>
      {video.technicalSummary ? <p className="mixed-token text-sm font-extrabold text-[var(--theme-accent)]">{video.technicalSummary}</p> : null}
      {video.accessibilitySummary ? <p id={accessibilitySummaryId} className="zh-caption font-extrabold text-[var(--theme-text)]">{video.accessibilitySummary}</p> : null}
      {subtitleTrackError ? <p className="zh-caption rounded-[var(--radius-sm)] border border-[color:var(--theme-line)] p-3 text-[color:var(--theme-muted)]" role="status">字幕檔暫時無法載入；請改讀下方「中英畫面文字逐字稿」。</p> : null}
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
              <AnimatedDetails
                className="zh-caption rounded-[var(--radius-sm)] border border-[color:var(--theme-line)] p-3 text-[color:var(--theme-muted)]"
                summary="中英畫面文字逐字稿"
                summaryClassName="interactive-link cursor-pointer font-extrabold text-[var(--theme-text)]"
              >
                <p className="mt-4 rounded-[var(--radius-sm)] bg-[color:var(--theme-surface)] p-3 text-[color:var(--theme-muted)]">
                  {video.transcriptNote ?? "下列內容整理影片中的畫面文字與場景描述，不是語音辨識結果。"}
                </p>
                <ol className="mt-4 grid gap-4">
                  {video.transcriptCues.map((cue) => (
                    <li key={cue.time} className="grid gap-1 border-t border-[color:var(--theme-line)] pt-3">
                      <span className="zh-label text-[var(--theme-accent)]">{cue.time}</span>
                      <span lang="en">EN: {cue.en}</span>
                      <span lang="zh-Hant-TW">中：{cue.zh}</span>
                      {cue.visualDescription ? <span>畫面：{cue.visualDescription}</span> : null}
                      {cue.musicMood ? <span>配樂情緒（設計意圖）：{cue.musicMood}</span> : null}
                    </li>
                  ))}
                </ol>
              </AnimatedDetails>
            ) : null}
          </div>
        ) : null}
      </figcaption>
    </figure>
  );
}

function FeaturedMediaDisclosure({ disclosure }) {
  if (!disclosure) return null;

  return (
    <aside className="evidence-panel grid gap-6 rounded-[var(--radius-md)] p-5 md:p-6" aria-label={disclosure.title}>
      <div className="grid gap-2">
        <p className="meta-label text-[var(--theme-accent)]">Rights &amp; credits</p>
        <h4 className="zh-heading text-[clamp(1.15rem,1.8vw,1.55rem)]">{disclosure.title}</h4>
      </div>
      {disclosure.musicCredit ? (
        <div className="soft-panel grid gap-2 rounded-[var(--radius-sm)] p-4">
          <p lang="en" className="font-extrabold text-[var(--theme-text)]">{disclosure.musicCredit.attribution}</p>
          <a
            className="interactive-link w-fit font-extrabold text-[var(--theme-accent)] underline decoration-2 underline-offset-4"
            href={disclosure.musicCredit.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {disclosure.musicCredit.song}
          </a>
          <p className="zh-caption text-[color:var(--theme-muted)]">{disclosure.musicCredit.excerpt}</p>
          <p className="zh-caption text-[color:var(--theme-muted)]">{disclosure.musicCredit.scope}</p>
        </div>
      ) : null}
      {disclosure.sources?.length ? (
        <dl className="grid gap-3 md:grid-cols-2">
          {disclosure.sources.map((source) => (
            <div key={source.label} className="grid content-start gap-1 border-t border-[color:var(--theme-line)] pt-3">
              <dt className="zh-label text-[var(--theme-accent)]">{source.label}</dt>
              <dd className="zh-caption text-[color:var(--theme-muted)]">{source.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {disclosure.attestation ? (
        <p className="zh-caption rounded-[var(--radius-sm)] border border-[color:var(--theme-line)] p-3 text-[color:var(--theme-muted)]">
          <strong className="text-[var(--theme-text)]">{disclosure.attestation.label}：</strong>
          {" "}{disclosure.attestation.value}
        </p>
      ) : null}
    </aside>
  );
}

function FeaturedMedia({ id, project }) {
  const video = project.media?.videos?.find((item) => item.featured);
  if (!video) return null;

  return (
    <section id={id} className="case-anchor grid gap-6" aria-labelledby={`${id}-title`}>
      <div className="grid gap-3 md:grid-cols-[0.32fr_0.68fr] md:gap-12">
        <p className="meta-label text-[var(--theme-accent)]">目前成片</p>
        <div className="grid gap-3">
          <h3 id={`${id}-title`} className="zh-heading text-[clamp(1.35rem,2.4vw,2.15rem)]">40 秒成片與雙語字幕</h3>
          <p className="zh-copy text-[color:var(--theme-muted)]">{project.featuredMediaIntro}</p>
        </div>
      </div>
      <VideoFigure id={`${id}-player`} video={video} featured />
      <FeaturedMediaDisclosure disclosure={project.featuredMediaDisclosure} />
    </section>
  );
}

function VideoEvidence({ videos = [] }) {
  const supportingVideos = videos.filter((video) => !video.featured);
  if (!supportingVideos.length) return null;

  return (
    <section className="grid gap-6">
      <h4 className="meta-label text-[var(--theme-accent)]">影片</h4>
      <div className="grid gap-6 md:grid-cols-2">
        {supportingVideos.map((video) => <VideoFigure key={video.title} video={video} />)}
      </div>
    </section>
  );
}
// Video evidence preserves 16:9 media, multiple subtitle tracks, playsInline behavior, and complete transcript access.

function AudioEvidence({ audio = [] }) {
  if (!audio.length) return null;

  return (
    <section className="grid gap-4">
      <h4 className="meta-label text-[var(--theme-accent)]">聲音</h4>
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
          此案例未提供可開啟的 demo
        </span>
      )}
    </div>
  );
}
// Heavy iframe demos load only after explicit user intent, preserving initial performance and INP.

function DemoEvidence({ demos = [] }) {
  if (!demos.length) return null;

  return (
    <section className="grid gap-4">
      <h4 className="meta-label text-[var(--theme-accent)]">互動展示</h4>
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
      <h4 className="meta-label text-[var(--theme-accent)]">資料使用範圍</h4>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.title} className="rounded-[var(--radius-md)] border border-[color:var(--theme-line)] bg-[color:var(--theme-surface)] p-5">
            <p className="zh-heading text-[clamp(1.12rem,1.5vw,1.4rem)]">{item.title}</p>
            <p className="zh-label mt-3 text-[var(--theme-accent)]">{item.status}</p>
            <p className="zh-caption mt-3 text-[color:var(--theme-muted)]">{item.caption}</p>
            <p className="zh-caption mt-3 rounded-[var(--radius-sm)] bg-[color:var(--color-surface)] p-3 text-[color:var(--theme-muted)]">
              使用方式：{item.reason}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
// Restricted media is represented as policy text only, so private videos/files never enter the public build.

function MediaEvidence({ id, media }) {
  if (!hasSupportingMediaEvidence(media)) return null;

  return (
    <section id={id} className="grid gap-10 border-t border-[color:var(--theme-line)] pt-8">
      <div className="grid gap-3 md:grid-cols-[0.32fr_0.68fr] md:gap-12">
        <h3 className="meta-label text-[var(--theme-accent)]">
          公開媒體
        </h3>
        <p className="zh-copy text-[color:var(--theme-muted)]">
          以下為可公開的視覺稿、截圖、影片、聲音與互動展示；非首屏媒體延後載入，互動 demo 只在明確點擊後啟動。
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
        <h3 className="meta-label text-[var(--theme-accent)]">負責項目</h3>
        <ChipList items={project.roles} label={`${project.title} 負責項目`} />
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
          目前的測試狀態
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
          <h4 className="meta-label text-[var(--theme-accent)]">下一輪怎麼測</h4>
          <ul className="grid gap-2 text-[color:var(--theme-muted)]">
            {testing.plannedMethods.map((method) => <li key={method} className="zh-caption">{method}</li>)}
          </ul>
        </div>
      ) : null}
      {testing.learningOutcomes?.length ? (
        <div className="grid gap-3 rounded-[var(--radius-md)] border border-[color:var(--theme-line)] p-5">
          <h4 className="meta-label text-[var(--theme-accent)]">
            目前整理出的設計線索
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
    ["製作限制", reflection.limitations],
    ["後續方向", reflection.graduateDirection],
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
  const themeGroups = [
    {
      status: "demonstrated",
      label: "這件作品已呈現",
      items: project.instituteConnections
        .filter((theme) => project.themeEvidenceStatus?.[theme] === "demonstrated")
        .map((theme) => ({ theme, rationale: project.themeRationales?.[theme] })),
    },
    {
      status: "researchDirection",
      label: "想延伸的方向",
      items: project.instituteConnections
        .filter((theme) => project.themeEvidenceStatus?.[theme] === "researchDirection")
        .map((theme) => ({ theme, rationale: project.themeRationales?.[theme] })),
    },
  ].filter((group) => group.items.length > 0);

  return (
    <section id={`${project.id}-themes`} className="grid gap-5 border-t border-[color:var(--theme-line)] pt-8">
      <h3 className="meta-label text-[var(--theme-accent)]">
        與研究方向的關係
      </h3>
      {themeGroups.map((group) => (
        <div key={group.status} className="grid gap-3">
          <p className="zh-label text-[color:var(--theme-muted)]">{group.label}</p>
          <ChipList
            items={group.items.map((item) => item.theme)}
            accent={group.status === "demonstrated"}
            label={`${project.title} 的${group.status === "demonstrated" ? "已做內容" : "延伸方向"}`}
          />
          <dl className="grid gap-3 md:grid-cols-2">
            {group.items.map(({ theme, rationale }) => (
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
        </div>
      ))}
    </section>
  );
}
// Keep demonstrated evidence separate from explicitly prospective graduate-study directions.

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
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    aria-label={isExternal ? `${link.label}（另開新視窗）` : undefined}
                  >
                    {link.label}{isExternal ? <span aria-hidden="true"> ↗</span> : null}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
      <div className="grid gap-4">
        <h3 className="meta-label text-[var(--theme-accent)]">
          負責項目與素材說明
        </h3>
        <p className="zh-caption text-[color:var(--theme-muted)]">
          {project.credits}
        </p>
      </div>
    </section>
  );
}

function ProjectDetail({ project, previousProject, nextProject }) {
  if (project.layoutVariant === "learning-dashboard-v2" && project.learningDashboardCase) {
    return (
      <Suspense
        fallback={(
          <article
            id={project.id}
            className="case-study-detail scroll-mt-28 py-24"
            style={{ paddingInline: "clamp(1.25rem, 5vw, 5rem)" }}
            aria-label={`${project.title} 案例內容載入中`}
          >
            <p className="zh-caption text-[color:var(--theme-muted)]">案例內容載入中。</p>
          </article>
        )}
      >
        <LazyLearningDashboardProjectDetail
          project={project}
          previousProject={previousProject}
          nextProject={nextProject}
        />
      </Suspense>
    );
  }

  return (
    <article
      id={project.id}
      className="case-study-detail scroll-mt-28 px-[var(--page-gutter)] py-28 md:py-36"
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
        <NarrativeBlock id={`${project.id}-audience`} title={project.challenge ? "使用情境" : "目標使用者與觀眾"}>{project.audience}</NarrativeBlock>
        <NarrativeBlock id={`${project.id}-proof`} title="負責項目">{project.whatThisProves}</NarrativeBlock>
        <NarrativeBlock id={`${project.id}-goal`} title={project.workflow ? "製作方式" : "設計目標"}>{project.designGoal}</NarrativeBlock>
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
            <NarrativeBlock id={`${project.id}-process-intent`} title="製作方式">{project.designProcess}</NarrativeBlock>
            <NarrativeBlock id={`${project.id}-technology`} title="工具與媒體">{project.technologyAndMedia}</NarrativeBlock>
            <NarrativeBlock id={`${project.id}-outcome`} title="目前成果">{project.outcomeShowcase}</NarrativeBlock>
          </>
        )}
        <StructuredProjectSections sections={project.extendedSections} />
        <StoryboardStrip id={`${project.id}-storyboard`} storyboard={project.storyboard} videoId={`${project.id}-featured-media-player`} />
        <FeaturedExample id={`${project.id}-featured-example`} example={project.featuredExample} />
        <MediaLayerSection id={`${project.id}-media-layers`} layers={project.mediaLayers} />
        <DeliverablesSection id={`${project.id}-deliverables`} deliverables={project.deliverables} />
        <OutcomesSection id={`${project.id}-outcomes`} outcomes={project.outcomes} />
        <EvaluationPlanSection id={`${project.id}-evaluation-plan`} plan={project.evaluationPlan} />
        {project.productionWorkflow || project.diagrams?.length ? (
          <Suspense fallback={null}>
            <CaseProcessSection
              id={`${project.id}-process`}
              productionWorkflow={project.productionWorkflow}
              diagrams={project.diagrams}
              introduction={project.diagramIntro}
              ImageComponent={ResponsiveImage}
            />
          </Suspense>
        ) : null}
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
              <span className="meta-label block text-[var(--theme-accent)]">上一件作品</span>
              <span className="zh-heading mt-2 block text-xl">{previousProject.title}</span>
            </a>
          ) : (
            <a className="evidence-panel interactive-link rounded-[var(--radius-md)] p-5" href="#project-index">
              <span className="meta-label block text-[var(--theme-accent)]">返回</span>
              <span className="zh-heading mt-2 block text-xl">作品索引</span>
            </a>
          )}
          {nextProject ? (
            <a className="evidence-panel interactive-link rounded-[var(--radius-md)] p-5 md:text-right" href={`#${nextProject.id}`}>
              <span className="meta-label block text-[var(--theme-accent)]">下一件作品</span>
              <span className="zh-heading mt-2 block text-xl">{nextProject.title}</span>
            </a>
          ) : (
            <a className="evidence-panel interactive-link rounded-[var(--radius-md)] p-5 md:text-right" href="#secondary-creation">
              <span className="meta-label block text-[var(--theme-accent)]">閱讀完成</span>
              <span className="zh-heading mt-2 block text-xl">前往二次創作案例</span>
            </a>
          )}
        </nav>
      </div>
    </article>
  );
}

export default function CaseStudyShowcase({ scope = "all", showIndex = true }) {
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("portfolio:deferred-ready"));
  }, [scope]);

  const renderedProjects = scope === "flagship"
    ? sortedProjectCaseStudies.filter((project) => project.id === "interactive-sound-learning")
    : scope === "supporting"
      ? sortedProjectCaseStudies.filter((project) => project.id !== "interactive-sound-learning")
      : sortedProjectCaseStudies;

  return (
    <section
      id={showIndex ? "gallery" : undefined}
      className={`${showIndex ? "paper-surface supporting-case-studies" : ""} bg-[var(--theme-bg)] text-[var(--theme-text)]`}
    >
      {showIndex ? (
        <>
          <section id="project-index" aria-labelledby="project-index-title" className="min-h-screen px-[var(--page-gutter)] py-28 md:py-40">
            <div className="mx-auto grid max-w-7xl gap-16">
              <div className="grid gap-8 md:grid-cols-[0.42fr_0.58fr] md:items-end">
                <div className="grid gap-4">
                  <p className="meta-label text-[var(--theme-accent)]">代表作品</p>
                  <EditorialHeading as="h2" id="project-index-title" className="gallery-title editorial-heading zh-display" lines={[["作品索引"]]}>作品索引</EditorialHeading>
                </div>
                <div className="grid gap-5 md:justify-self-end">
                  <p className="zh-lead max-w-[34em] text-[color:var(--theme-muted)]">四件作品橫跨互動聲響、生成式影像敘事與數位學習資料分析；各案例均標示負責項目、製作方法、可驗證成果與後續方向。</p>
                  <PortfolioDraftLayer placement="overview" />
                </div>
              </div>

              <div id="themes" className="grid gap-4">
                <p className="meta-label text-[var(--theme-accent)]">作品關鍵字</p>
                <ChipList items={instituteThemes} variant="static" label="作品關鍵字" />
              </div>

              <Suspense fallback={<div className="min-h-[28rem]" aria-hidden="true" />}>
                <ProjectIndexGrid projects={sortedProjectCaseStudies} />
              </Suspense>
            </div>
          </section>
        </>
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
