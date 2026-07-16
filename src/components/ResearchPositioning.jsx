import { memo } from "react";
import {
  getTrackProjects,
  homepageNarrative,
  instituteThemes,
  portfolioPriorityRules,
  researchTracks,
  terminologyMap,
} from "../data/portfolio.js";
import EditorialHeading from "./EditorialHeading.jsx";

function SmallHeading({ children, inverse = false }) {
  return (
    <p className={`meta-label ${inverse ? "text-[var(--theme-inverse-text)] opacity-75" : "text-[var(--theme-accent)]"}`}>
      {children}
    </p>
  );
}

function SectionShell({ id, label, title, titleLines, children }) {
  return (
    <section
      id={id}
      className="research-section px-[clamp(1.25rem,6vw,10vw)] py-24 text-[var(--theme-text)] md:py-32"
      aria-labelledby={`${id}-title`}
    >
      <div className="mx-auto grid max-w-7xl gap-12">
        <div className="grid gap-5 md:grid-cols-[0.36fr_0.64fr] md:gap-16">
          <SmallHeading>{label}</SmallHeading>
          <EditorialHeading
            as="h2"
            id={`${id}-title`}
            className="editorial-heading zh-display text-[length:var(--font-size-fluid-section)]"
            lines={titleLines}
          >
            {title}
          </EditorialHeading>
        </div>
        {children}
      </div>
    </section>
  );
}

function LogicChain() {
  return (
    <ol className="grid gap-3 md:grid-cols-4" aria-label="作品集證據鏈">
      {homepageNarrative.logicChain.map((item, index) => (
        <li
          key={item}
          className="rounded-[var(--radius-md)] border border-[color:var(--theme-line)] p-5"
        >
          <span className="meta-label text-[var(--theme-accent)]">
            0{index + 1}
          </span>
          <p className="zh-heading mt-5 text-[clamp(1.35rem,2.4vw,2.2rem)]">{item}</p>
        </li>
      ))}
    </ol>
  );
}

const ResearchPositioning = memo(function ResearchPositioning() {
  return (
    <>
      <SectionShell
        id="research-positioning"
        label="Research positioning"
        title="從視覺與學習設計，走向可測試的聲響互動。"
        titleLines={[["從視覺與", "學習設計，"], ["走向可測試的", "聲響互動。"]]}
      >
        <div className="grid gap-10 md:grid-cols-[0.42fr_0.58fr] md:items-start">
          <div className="paper-panel grid gap-5 rounded-[var(--radius-lg)] p-6 md:p-8">
            <SmallHeading inverse>{homepageNarrative.eyebrow}</SmallHeading>
            <p className="zh-heading text-[clamp(1.55rem,3vw,3rem)]">{homepageNarrative.thesis}</p>
            <p className="zh-copy text-[color:var(--theme-inverse-text)] opacity-75">核心問題：{homepageNarrative.researchQuestion}</p>
          </div>
          <div className="grid gap-6">
            <p className="zh-lead">{homepageNarrative.credibility}</p>
            <p className="zh-copy-wide text-[color:var(--theme-muted)]">
              {homepageNarrative.argument}
            </p>
            <div className="flex flex-wrap gap-3">
              {homepageNarrative.reviewerPaths.map((path) => (
                <a
                  key={path.target}
                  className="interactive-link chip-text rounded-full border border-[color:var(--theme-line)] px-5 py-3 text-sm font-extrabold"
                  href={path.target}
                >
                  {path.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <LogicChain />
      </SectionShell>

      <SectionShell
        id="research-tracks"
        label="Research tracks"
        title="一條聲響主線，五個互相支援的研究軌道。"
        titleLines={[["一條聲響主線，"], ["五個互相支援的", "研究軌道。"]]}
      >
        <div className="grid gap-5 lg:grid-cols-3 2xl:grid-cols-5">
          {researchTracks.map((track, index) => {
            const projectCount = getTrackProjects(track.id).length;

            return (
              <article
                key={track.id}
                className={`portfolio-card grid content-between gap-8 rounded-[var(--radius-md)] p-5 ${track.id === "multimedia-video-sound" || track.id === "interactive-media-ux" ? "ring-1 ring-[var(--theme-accent)]" : ""}`}
              >
                <div className="grid gap-4">
                  <span className="meta-label text-[var(--theme-accent)]">
                    Track 0{index + 1}
                  </span>
                  <h3 className="zh-heading text-[clamp(1.35rem,2.2vw,2rem)]">{track.title}</h3>
                  <p className="zh-caption text-[color:var(--theme-muted)]">
                    {track.purpose}
                  </p>
                </div>
                <div className="grid gap-4">
                  <p className="meta-label text-[var(--theme-accent)]">
                    Includes
                  </p>
                  <ul className="grid gap-2 text-sm font-semibold leading-relaxed text-[var(--theme-text)]">
                    {track.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="zh-caption text-[color:var(--theme-muted)]">
                    {projectCount} linked {projectCount === 1 ? "case" : "cases"} · {track.instituteAlignment.join(" / ")}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </SectionShell>

      <SectionShell
        id="translation-map"
        label="Translation map"
        title="把原本的學習與媒體經驗，轉譯成研究能力。"
        titleLines={[["把原本的", "學習與媒體經驗，"], ["轉譯成", "研究能力。"]]}
      >
        <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--theme-line)]">
          <div className="hidden grid-cols-[0.28fr_0.3fr_0.42fr] border-b border-[color:var(--theme-line)] bg-[color:var(--color-surface)] p-4 md:grid">
            <span className="meta-label text-[var(--theme-accent)]">原始經驗</span>
            <span className="meta-label text-[var(--theme-accent)]">作品集語言</span>
            <span className="meta-label text-[var(--theme-accent)]">公開作品能讀到的能力</span>
          </div>
          {terminologyMap.map(([from, to, meaning]) => (
            <div
              key={from}
              className="grid gap-3 border-b border-[color:var(--theme-line)] p-5 last:border-b-0 md:grid-cols-[0.28fr_0.3fr_0.42fr] md:gap-6"
            >
              <p className="translation-term zh-caption font-bold text-[color:var(--theme-muted)]">{from}</p>
              <p className="translation-term zh-heading text-[clamp(1.08rem,1.7vw,1.45rem)]">{to}</p>
              <p className="zh-caption text-[color:var(--theme-muted)]">{meaning}</p>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="institute-alignment"
        label="Institute alignment"
        title="主題連結要有證據，而不是只有標籤。"
        titleLines={[["主題連結", "要有證據，"], ["不只是", "標籤。"]]}
      >
        <div className="grid gap-8 md:grid-cols-[0.42fr_0.58fr]">
          <div className="grid content-start gap-4">
            <p className="zh-copy-wide text-[color:var(--theme-muted)]">
              這些主題會在作品案例中被逐一對應。公開頁面只呈現能支撐研究敘事的內容；內部準備事項不納入正式內容。
            </p>
            <div className="flex flex-wrap gap-2" aria-label="研究所主題">
              {instituteThemes.map((theme) => (
                <span
                  key={theme}
                  className="inverted-pill chip-text rounded-full px-4 py-2 text-sm font-extrabold"
                >
                  {theme}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-3">
            {portfolioPriorityRules.map((rule, index) => (
              <p
                key={rule}
                className="soft-panel zh-caption rounded-[var(--radius-sm)] p-4 text-[color:var(--theme-muted)]"
              >
                <span className="mr-3 text-[var(--theme-accent)]">0{index + 1}</span>
                {rule}
              </p>
            ))}
          </div>
        </div>
      </SectionShell>
    </>
  );
});

export default ResearchPositioning;
// Codex-Fix: Add a research-proposal entrance between hero and case studies without loading extra dependencies.
