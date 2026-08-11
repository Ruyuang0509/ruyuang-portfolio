import { useEffect, useState } from "react";
import {
  collaborationEvidence,
  finalPortfolioLinks,
  learningRoadmap,
  pureDataLearningEvidence,
  representativeWorks,
  supportingEvidenceLinks,
} from "../data/admission-evidence.js";
import EditorialHeading from "./EditorialHeading.jsx";

function useDeferredReady(targetId) {
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("portfolio:deferred-ready", {
      detail: { targetId: `#${targetId}` },
    }));
  }, [targetId]);
}

function SectionHeader({ eyebrow, id, title, lines, description }) {
  return (
    <header className="grid min-w-0 gap-5 md:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] md:gap-16">
      <p className="meta-label text-[var(--theme-accent)]">{eyebrow}</p>
      <div className="grid min-w-0 gap-5">
        <EditorialHeading
          as="h2"
          id={`${id}-title`}
          className="editorial-heading zh-display text-[length:var(--font-size-fluid-section)]"
          lines={lines}
        >
          {title}
        </EditorialHeading>
        {description ? <p className="zh-copy-wide text-[color:var(--theme-muted)]">{description}</p> : null}
      </div>
    </header>
  );
}

function PublicList({ title, items, tone = "default" }) {
  if (!items?.length) return null;

  return (
    <section className={`grid content-start gap-4 rounded-[var(--radius-md)] p-5 ${tone === "paper" ? "paper-panel" : "soft-panel"}`}>
      <h3 className="zh-heading text-[clamp(1.2rem,2vw,1.65rem)]">{title}</h3>
      <ul className="grid gap-2">
        {items.map((item) => (
          <li
            key={item}
            className={`zh-caption ${tone === "paper" ? "text-[var(--theme-inverse-text)] opacity-80" : "text-[color:var(--theme-muted)]"}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function PureDataLearningSection() {
  const [videoFailed, setVideoFailed] = useState(false);
  const evidence = pureDataLearningEvidence;
  useDeferredReady(evidence.id);

  return (
    <div className="mx-auto grid max-w-7xl gap-12">
      <SectionHeader
        eyebrow="聲音工具學習紀錄"
        id={evidence.id}
        title={evidence.title}
        lines={[["Pure Data", "跨模態參數"], ["映射原型"]]}
        description={evidence.purpose}
      />

      <div className="flex flex-wrap gap-2" aria-label="Pure Data 作品狀態">
        <span className="chip-text rounded-full border border-[color:var(--theme-line)] px-4 py-2 text-sm font-extrabold">{evidence.status}</span>
        <span className="chip-text rounded-full border border-[color:var(--theme-line)] px-4 py-2 text-sm font-extrabold">{evidence.version}</span>
        <span className="chip-text rounded-full border border-[color:var(--theme-line)] px-4 py-2 text-sm font-extrabold">開始日期：{evidence.startedAt}</span>
      </div>

      <figure className="grid gap-4" aria-labelledby="pure-data-video-title" aria-describedby="pure-data-video-summary">
        <div className="media-frame relative aspect-video overflow-hidden rounded-[var(--radius-lg)]">
          <video
            className="h-full w-full bg-black object-contain"
            controls
            playsInline
            preload="metadata"
            poster={evidence.media.poster}
            width={evidence.media.width}
            height={evidence.media.height}
            onError={() => setVideoFailed(true)}
            aria-label="Pure Data v0.2.1 本機功能測試影片"
          >
            <source src={evidence.media.src} type={evidence.media.mimeType} />
            {evidence.media.fallbackMessage}
          </video>
        </div>
        <figcaption className="grid gap-2">
          <h3 id="pure-data-video-title" className="zh-heading text-[clamp(1.2rem,2vw,1.65rem)]">{evidence.media.title}</h3>
          <p className="zh-caption text-[color:var(--theme-muted)]">{evidence.media.caption}</p>
          <p id="pure-data-video-summary" className="zh-caption text-[color:var(--theme-muted)]">{evidence.media.accessibilitySummary}</p>
          <p className="meta-label text-[var(--theme-accent)]">
            {Math.round(evidence.media.durationSeconds)} 秒 · {evidence.media.width}×{evidence.media.height}
          </p>
          {videoFailed ? (
            <p className="zh-caption rounded-[var(--radius-sm)] border border-[color:var(--theme-line)] p-4 text-[color:var(--theme-muted)]" role="alert">
              {evidence.media.fallbackMessage}
            </p>
          ) : null}
        </figcaption>
      </figure>

      <section className="evidence-panel grid gap-5 rounded-[var(--radius-lg)] p-6 md:grid-cols-[0.3fr_0.7fr] md:p-8" aria-labelledby="pure-data-description-title">
        <h3 id="pure-data-description-title" className="meta-label text-[var(--theme-accent)]">原型說明</h3>
        <p className="zh-copy-wide text-[color:var(--theme-muted)]">{evidence.description}</p>
      </section>

      <section className="grid gap-5 md:grid-cols-[0.3fr_0.7fr] md:gap-12" aria-labelledby="pure-data-viewing-guide-title">
        <div className="grid content-start gap-3">
          <h3 id="pure-data-viewing-guide-title" className="meta-label text-[var(--theme-accent)]">觀看指南</h3>
          <p className="zh-caption text-[color:var(--theme-muted)]">影片不自動播放；可以依序比較控制值、輸出監看與聲音變化。</p>
        </div>
        <ol className="grid gap-3">
          {evidence.viewingGuide.map((item, index) => (
            <li key={item} className="soft-panel grid grid-cols-[auto_1fr] gap-4 rounded-[var(--radius-sm)] p-4">
              <span className="meta-label text-[var(--theme-accent)]">{String(index + 1).padStart(2, "0")}</span>
              <span className="zh-copy text-[var(--theme-text)]">{item}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        <PublicList title="目前完成" items={evidence.completed} />
        <section className="paper-panel grid content-start gap-4 rounded-[var(--radius-md)] p-5">
          <h3 className="zh-heading text-[clamp(1.2rem,2vw,1.65rem)]">AI 協作與學習重點</h3>
          <p className="zh-caption text-[var(--theme-inverse-text)] opacity-80">{evidence.authorshipNote}</p>
        </section>
        <section className="soft-panel grid content-start gap-4 rounded-[var(--radius-md)] p-5">
          <h3 className="zh-heading text-[clamp(1.2rem,2vw,1.65rem)]">回顧與下一步</h3>
          <p className="zh-caption text-[color:var(--theme-muted)]">{evidence.nextStep}</p>
        </section>
      </div>

      <details className="soft-panel rounded-[var(--radius-md)] p-5">
        <summary className="interactive-link zh-label cursor-pointer text-[var(--theme-accent)]">版本說明</summary>
        <p className="zh-caption mt-4 text-[color:var(--theme-muted)]">{evidence.versionNote}</p>
      </details>
    </div>
  );
}

export function WorkEvidenceCard({ work }) {
  const metadata = [
    { label: "創作目的", value: work.purpose },
    { label: "負責項目", value: work.roles?.join("／") },
    { label: "使用工具", value: work.tools?.length ? work.tools.join("／") : "" },
  ].filter((item) => item.value);

  return (
    <article id={work.id} className="portfolio-card grid scroll-mt-28 gap-8 rounded-[var(--radius-lg)] p-6 md:p-8" aria-labelledby={`${work.id}-title`}>
      <header className="grid gap-4 md:grid-cols-[0.32fr_0.68fr] md:gap-10">
        <div className="grid content-start gap-3">
          <p className="meta-label text-[var(--theme-accent)]">{work.type}</p>
          <span className="chip-text w-fit rounded-full border border-[color:var(--theme-line)] px-3 py-1 text-xs font-extrabold">{work.status}</span>
          {work.context ? <p className="zh-caption text-[color:var(--theme-muted)]">{work.context}</p> : null}
        </div>
        <div className="grid gap-4">
          <h3 id={`${work.id}-title`} className="zh-heading text-[clamp(1.7rem,4vw,3.5rem)]">{work.title}</h3>
          <p className="zh-copy-wide text-[color:var(--theme-muted)]">{work.summary}</p>
        </div>
      </header>

      {work.evidenceLinks?.length ? (
        <div className="flex flex-wrap gap-3" aria-label={`${work.title}作品連結`}>
          {work.evidenceLinks.map((link) => (
            <a
              key={link.href}
              className="paper-panel interactive-link rounded-full px-5 py-3"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label}：${work.title}（在新分頁開啟）`}
            >
              <span className="zh-label">{link.label} ↗</span>
            </a>
          ))}
        </div>
      ) : null}

      {metadata.length ? (
        <dl className={`grid gap-4 border-y border-[color:var(--theme-line)] py-5 ${metadata.length > 1 ? "sm:grid-cols-2 lg:grid-cols-3" : ""}`}>
          {metadata.map((item) => (
            <div key={item.label}>
              <dt className="zh-label text-[var(--theme-accent)]">{item.label}</dt>
              <dd className="zh-caption mt-2 text-[color:var(--theme-muted)]">{item.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-2">
        <PublicList title="實作重點" items={work.highlights} />
        <section className="soft-panel grid content-start gap-4 rounded-[var(--radius-md)] p-5">
          <h4 className="zh-heading text-[clamp(1.2rem,2vw,1.65rem)]">回顧與下一步</h4>
          <p className="zh-caption text-[color:var(--theme-muted)]">{work.reflection}</p>
        </section>
      </div>

      {work.materialsNote ? (
        <section className="paper-panel grid gap-3 rounded-[var(--radius-md)] p-5" aria-labelledby={`${work.id}-materials-title`}>
          <h4 id={`${work.id}-materials-title`} className="zh-heading text-[clamp(1.1rem,1.8vw,1.45rem)]">負責項目與素材說明</h4>
          <p className="zh-caption text-[var(--theme-inverse-text)] opacity-80">{work.materialsNote}</p>
        </section>
      ) : null}
    </article>
  );
}

export function RepresentativeWorksSection() {
  useDeferredReady("selected-work");
  const [huaben] = representativeWorks;

  return (
    <div className="mx-auto grid max-w-7xl gap-12">
      <SectionHeader
        eyebrow="原創影音作品"
        id="selected-work"
        title="從原創短劇出發，整理影音敘事與製作方法。"
        lines={[["從原創", "短劇出發，"], ["整理影音", "敘事與"], ["製作方法。"]]}
        description="《畫本》記錄我第一次從故事構思走到拍攝與剪輯的完整流程；後續案例則呈現資料敘事、學習設計與素材剪輯經驗。"
      />

      <WorkEvidenceCard work={huaben} />

      <section className="grid gap-6" aria-labelledby="supporting-work-title">
        <div className="grid gap-3 md:grid-cols-[0.32fr_0.68fr] md:gap-10">
          <h3 id="supporting-work-title" className="meta-label text-[var(--theme-accent)]">延伸案例</h3>
          <p className="zh-copy-wide text-[color:var(--theme-muted)]">
            從影音、資料敘事到學習介面，這些案例整理素材選擇、閱讀順序，以及不同內容形式的轉譯方法。
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {supportingEvidenceLinks.map((item) => (
            <a key={item.target} className="evidence-panel interactive-link grid gap-3 rounded-[var(--radius-md)] p-5" href={item.target}>
              <p className="meta-label text-[var(--theme-accent)]">{item.label}</p>
              <h4 className="zh-heading text-xl">{item.title}</h4>
              <p className="zh-caption text-[color:var(--theme-muted)]">{item.description}</p>
              <span className="zh-label text-[var(--theme-accent)]" aria-hidden="true">閱讀案例 ↘</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

export function SecondaryCreationWorkSection() {
  const remix = representativeWorks[1];

  return (
    <div className="mx-auto grid max-w-7xl gap-8">
      <header className="grid gap-4 md:grid-cols-[0.32fr_0.68fr] md:gap-10">
        <p className="meta-label text-[var(--theme-accent)]">二次創作／剪輯練習</p>
        <div className="grid gap-3">
          <h3 id="secondary-creation-title" className="zh-heading text-[clamp(1.7rem,4vw,3.5rem)]">
            從既有素材練習取材、段落安排與聲畫節奏。
          </h3>
          <p className="zh-copy-wide text-[color:var(--theme-muted)]">
            這項課程練習讓我把注意力放在素材選擇、情緒連接與剪輯節奏，也開始建立整理素材來源的習慣。
          </p>
        </div>
      </header>
      <WorkEvidenceCard work={remix} />
      <a
        className="paper-panel interactive-link justify-self-end rounded-[var(--radius-md)] px-5 py-4 text-right"
        href="#collaboration"
      >
        <span className="meta-label block">下一段</span>
        <span className="zh-heading mt-2 block text-xl">前往專案與合作</span>
      </a>
    </div>
  );
}

export function CollaborationSection() {
  useDeferredReady("collaboration");

  return (
    <div className="mx-auto grid max-w-7xl gap-12">
      <SectionHeader
        eyebrow="專案與合作"
        id="collaboration"
        title="在不同任務裡整理系統、調整角色，也持續回應合作需要。"
        lines={[["在不同任務裡", "整理系統，"], ["調整角色，", "持續回應"], ["合作需要。"]]}
        description="社團重整、畢業專題與工作經驗，讓我練習把複雜任務拆開、清楚溝通限制，並在團隊需要時調整自己的位置。"
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {collaborationEvidence.map((item, index) => (
          <article key={item.title} className="soft-panel grid content-start gap-5 rounded-[var(--radius-md)] p-5 md:p-6">
            <p className="meta-label text-[var(--theme-accent)]">{String(index + 1).padStart(2, "0")}</p>
            <h3 className="zh-heading text-[clamp(1.4rem,2.4vw,2.2rem)]">{item.title}</h3>
            <ul className="grid gap-3">
              {item.evidence.map((itemEvidence) => (
                <li key={itemEvidence} className="zh-caption text-[color:var(--theme-muted)]">{itemEvidence}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

export function LearningRoadmapSection() {
  useDeferredReady("learning-roadmap");

  return (
    <div className="mx-auto grid max-w-7xl gap-12">
      <SectionHeader
        eyebrow="學習路線"
        id="learning-roadmap"
        title="從可操作作品出發，逐步補足聲音工具與研究方法。"
        lines={[["從可操作作品", "出發，"], ["逐步補足", "聲音工具與"], ["研究方法。"]]}
        description="學習路線將已完成的作品、正在練習的工具與研究所階段希望深入的方向分開整理，讓每一步都能接到下一次實作。"
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {learningRoadmap.map((stage, index) => (
          <article key={stage.status} className="evidence-panel grid content-start gap-5 rounded-[var(--radius-md)] p-5">
            <p className="meta-label text-[var(--theme-accent)]">{String(index + 1).padStart(2, "0")}</p>
            <h3 className="zh-heading text-[clamp(1.25rem,2vw,1.8rem)]">{stage.status}</h3>
            <ul className="grid gap-2">
              {stage.items.map((item) => (
                <li key={item} className="zh-caption text-[color:var(--theme-muted)]">{item}</li>
              ))}
            </ul>
            {stage.note ? <p className="zh-label border-t border-[color:var(--theme-line)] pt-4 text-[var(--theme-accent)]">{stage.note}</p> : null}
          </article>
        ))}
      </div>
    </div>
  );
}

export function ContactSection() {
  useDeferredReady("contact");

  return (
    <div className="mx-auto grid max-w-7xl gap-12">
      <SectionHeader
        eyebrow="研究方向與連結"
        id="contact"
        title="以可操作原型為起點，繼續走向聲音方法與混合監聽研究。"
        lines={[["以可操作原型", "為起點，"], ["繼續走向", "聲音方法與"], ["混合監聽研究。"]]}
        description="我希望把數位學習、視覺溝通與互動原型的經驗帶進研究訓練，逐步補足聲音製作、空間音訊與實驗設計方法。"
      />

      <div className="grid gap-4 md:grid-cols-2">
        {finalPortfolioLinks.map((link) => {
          const isExternal = link.href.startsWith("http");
          return (
            <a
              key={link.href}
              className="portfolio-card interactive-link grid gap-4 rounded-[var(--radius-md)] p-6"
              href={link.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
            >
              <h3 className="zh-heading text-[clamp(1.3rem,2vw,1.9rem)]">{link.label}</h3>
              <p className="zh-caption text-[color:var(--theme-muted)]">{link.description}</p>
              <span className="zh-label text-[var(--theme-accent)]">{isExternal ? "在新分頁開啟 ↗" : "前往作品索引 ↘"}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
