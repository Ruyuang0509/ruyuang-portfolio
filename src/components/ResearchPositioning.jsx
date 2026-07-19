import { memo } from "react";
import {
  getTrackProjects,
  homepageNarrative,
  instituteEvidenceGroups,
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
    <ol className="grid gap-3 md:grid-cols-4" aria-label="作品集閱讀順序">
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
        label="研究定位"
        title="我從視覺與學習設計，走到聲響互動。"
        titleLines={[["我從視覺與", "學習設計，"], ["走到", "聲響互動。"]]}
      >
        <div className="grid gap-10 md:grid-cols-[0.42fr_0.58fr] md:items-start">
          <div className="paper-panel grid gap-5 rounded-[var(--radius-lg)] p-6 md:p-8">
            <SmallHeading inverse>目前的研究題目</SmallHeading>
            <p className="zh-heading text-[clamp(1.55rem,3vw,3rem)]">{homepageNarrative.thesis}</p>
            <p className="zh-copy text-[color:var(--theme-inverse-text)] opacity-75">我想確認：{homepageNarrative.researchQuestion}</p>
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
        label="研究方向"
        title="五個方向，回到同一個聲響問題。"
        titleLines={[["五個方向，"], ["回到同一個", "聲響問題。"]]}
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
                    方向 0{index + 1}
                  </span>
                  <h3 className="zh-heading text-[clamp(1.35rem,2.2vw,2rem)]">{track.title}</h3>
                  <p className="zh-caption text-[color:var(--theme-muted)]">
                    {track.purpose}
                  </p>
                </div>
                <div className="grid gap-4">
                  <p className="meta-label text-[var(--theme-accent)]">
                    目前包含
                  </p>
                  <ul className="grid gap-2 text-sm font-semibold leading-relaxed text-[var(--theme-text)]">
                    {track.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="zh-caption text-[color:var(--theme-muted)]">
                    {projectCount} 件相關案例 · {track.instituteAlignment.join(" / ")}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </SectionShell>

      <SectionShell
        id="translation-map"
        label="經驗如何轉用"
        title="我把過去的經驗，用在現在的聲響研究。"
        titleLines={[["我把過去的經驗，"], ["用在現在的", "聲響研究。"]]}
      >
        <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--theme-line)]">
          <div className="hidden grid-cols-[0.28fr_0.3fr_0.42fr] border-b border-[color:var(--theme-line)] bg-[color:var(--color-surface)] p-4 md:grid">
            <span className="meta-label text-[var(--theme-accent)]">過去的經驗</span>
            <span className="meta-label text-[var(--theme-accent)]">現在怎麼做</span>
            <span className="meta-label text-[var(--theme-accent)]">在作品裡可以看到什麼</span>
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
        label="研究所主題對照"
        title="每個研究主題，都要回到我做過的作品。"
        titleLines={[["每個研究主題，"], ["都要回到我做過的", "作品。"]]}
      >
        <div className="grid gap-10 md:grid-cols-[0.34fr_0.66fr] md:gap-12">
          <div className="grid content-start gap-5 md:sticky md:top-28 md:self-start">
            <p className="zh-copy-wide text-[color:var(--theme-muted)]">
              這裡只列公開案例已經呈現的角色、工具與成果。點選主題，就能直接查看對應案例。
            </p>
            <nav aria-label="已有對應公開案例的研究所主題">
              <ul className="flex flex-wrap gap-2">
                {instituteEvidenceGroups.map((group) => (
                  <li key={group.id}>
                    <a
                      className="institute-jump-link inverted-pill interactive-link chip-text inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold"
                      href={`#${group.id}`}
                      aria-label={`查看「${group.theme}」的對應案例`}
                    >
                      <span>{group.theme}</span>
                      <span aria-hidden="true">↘</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="grid gap-5">
            {instituteEvidenceGroups.map((group) => (
              <section
                key={group.id}
                id={group.id}
                className="institute-evidence-group evidence-panel grid gap-5 rounded-[var(--radius-md)] p-5 md:p-6"
                aria-labelledby={`${group.id}-title`}
              >
                <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[color:var(--theme-line)] pb-4">
                  <div className="grid gap-2">
                    <p className="meta-label text-[var(--theme-accent)]">公開作品裡做過的事</p>
                    <h3 id={`${group.id}-title`} className="zh-heading text-[clamp(1.45rem,2.6vw,2.35rem)]">
                      {group.theme}
                    </h3>
                  </div>
                  <span className="chip-text rounded-full border border-[color:var(--theme-line)] px-3 py-1 text-xs font-bold text-[color:var(--theme-muted)]">
                    {group.projects.length} 件公開案例
                  </span>
                </div>

                <div className="grid gap-3">
                  {group.projects.map((project) => (
                    <article key={project.id} className="soft-panel grid gap-4 rounded-[var(--radius-sm)] p-4 md:p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <h4 className="zh-heading text-[clamp(1.15rem,1.7vw,1.5rem)]">{project.title}</h4>
                        <span className="zh-label text-[var(--theme-accent)]">{project.status}</span>
                      </div>
                      <p className="zh-caption text-[color:var(--theme-muted)]">{project.rationale}</p>
                      <dl className="grid gap-3 border-t border-[color:var(--theme-line)] pt-3 sm:grid-cols-2">
                        <div>
                          <dt className="zh-label text-[var(--theme-accent)]">角色</dt>
                          <dd className="zh-caption mt-1 text-[var(--theme-text)]">{project.roles.slice(0, 2).join(" / ")}</dd>
                        </div>
                        <div>
                          <dt className="zh-label text-[var(--theme-accent)]">工具</dt>
                          <dd className="zh-caption mt-1 text-[var(--theme-text)]">{project.tools.slice(0, 2).join(" / ")}</dd>
                        </div>
                      </dl>
                      <a
                        className="interactive-link zh-label inline-flex min-h-11 w-fit items-center font-black underline decoration-[var(--theme-accent)] decoration-2 underline-offset-4"
                        href={project.href}
                      >
                        閱讀案例：{project.title}
                      </a>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </SectionShell>
    </>
  );
});

export default ResearchPositioning;
// Codex-Fix: Add a research-proposal entrance between hero and case studies without loading extra dependencies.
