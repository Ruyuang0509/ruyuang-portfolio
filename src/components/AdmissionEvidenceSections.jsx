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
    <header className="grid gap-5 md:grid-cols-[0.34fr_0.66fr] md:gap-16">
      <p className="meta-label text-[var(--theme-accent)]">{eyebrow}</p>
      <div className="grid gap-5">
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

function EvidenceList({ title, items, tone = "default" }) {
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

      <div className="flex flex-wrap gap-2" aria-label="Pure Data 證據狀態">
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
            {Math.round(evidence.media.durationSeconds)} 秒 · {evidence.media.width}×{evidence.media.height} · {evidence.media.codecSummary}
          </p>
          {videoFailed ? (
            <p className="zh-caption rounded-[var(--radius-sm)] border border-[color:var(--theme-line)] p-4 text-[color:var(--theme-muted)]" role="alert">
              {evidence.media.fallbackMessage}
            </p>
          ) : null}
        </figcaption>
      </figure>

      <div className="evidence-panel grid gap-5 rounded-[var(--radius-lg)] p-6 md:grid-cols-[0.3fr_0.7fr] md:p-8">
        <p className="meta-label text-[var(--theme-accent)]">目前怎麼描述</p>
        <p className="zh-copy-wide text-[color:var(--theme-muted)]">{evidence.description}</p>
      </div>

      <section className="grid gap-5 md:grid-cols-[0.3fr_0.7fr] md:gap-12" aria-labelledby="pure-data-viewing-guide-title">
        <div className="grid content-start gap-3">
          <h3 id="pure-data-viewing-guide-title" className="meta-label text-[var(--theme-accent)]">觀看指南</h3>
          <p className="zh-caption text-[color:var(--theme-muted)]">影片不自動播放；請依序比較控制值、輸出 meters 與聲音變化。</p>
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
        <EvidenceList title="目前可以證明" items={evidence.whatThisProves} />
        <EvidenceList title="目前不能證明" items={evidence.whatThisDoesNotProve} />
        <EvidenceList
          title="作者性與 AI 協作"
          items={[evidence.authorship, evidence.aiAssistance, evidence.rights]}
          tone="paper"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.62fr_0.38fr]">
        <EvidenceList title="原始影片限制" items={evidence.limitations} />
        <section className="paper-panel grid content-start gap-4 rounded-[var(--radius-md)] p-5">
          <h3 className="zh-heading text-[clamp(1.2rem,2vw,1.65rem)]">下一步</h3>
          <p className="zh-caption text-[var(--theme-inverse-text)] opacity-80">{evidence.nextStep}</p>
        </section>
      </div>
    </div>
  );
}

function WorkEvidenceCard({ work }) {
  return (
    <article className="portfolio-card grid gap-8 rounded-[var(--radius-lg)] p-6 md:p-8">
      <header className="grid gap-4 md:grid-cols-[0.32fr_0.68fr] md:gap-10">
        <div className="grid content-start gap-3">
          <p className="meta-label text-[var(--theme-accent)]">{work.type}</p>
          <span className="chip-text w-fit rounded-full border border-[color:var(--theme-line)] px-3 py-1 text-xs font-extrabold">{work.status}</span>
          {work.context ? <p className="zh-caption text-[color:var(--theme-muted)]">{work.context}</p> : null}
        </div>
        <div className="grid gap-4">
          <h3 className="zh-heading text-[clamp(1.7rem,4vw,3.5rem)]">{work.title}</h3>
          <p className="zh-copy-wide text-[color:var(--theme-muted)]">{work.summary}</p>
        </div>
      </header>

      <dl className="grid gap-4 border-y border-[color:var(--theme-line)] py-5 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <dt className="zh-label text-[var(--theme-accent)]">為什麼做</dt>
          <dd className="zh-caption mt-2 text-[color:var(--theme-muted)]">{work.purpose}</dd>
        </div>
        <div>
          <dt className="zh-label text-[var(--theme-accent)]">個人角色</dt>
          <dd className="zh-caption mt-2 text-[color:var(--theme-muted)]">{work.roles.join("／")}</dd>
        </div>
        <div>
          <dt className="zh-label text-[var(--theme-accent)]">使用工具</dt>
          <dd className="zh-caption mt-2 text-[color:var(--theme-muted)]">{work.tools.length ? work.tools.join("／") : "原始紀錄未列出，不另行推測"}</dd>
        </div>
        <div>
          <dt className="zh-label text-[var(--theme-accent)]">可核對材料</dt>
          <dd className="zh-caption mt-2 text-[color:var(--theme-muted)]">
            {work.evidenceLinks.length ? work.evidenceLinks.map((link) => link.label).join("／") : "本頁僅有申請者提供的作品事實，沒有公開媒體連結"}
          </dd>
        </div>
      </dl>

      <div className="grid gap-4 lg:grid-cols-2">
        <EvidenceList title="目前支持的能力" items={work.whatThisProves} />
        <EvidenceList title="目前不能延伸的主張" items={work.whatThisDoesNotProve} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <EvidenceList title="作者性與素材權利" items={[work.authorship, work.aiAssistance, work.rights]} tone="paper" />
        <EvidenceList title="目前限制與下一步" items={[work.limitations, work.nextStep]} />
      </div>
    </article>
  );
}

export function RepresentativeWorksSection() {
  useDeferredReady("selected-work");
  const [huaben] = representativeWorks;

  return (
    <div className="mx-auto grid max-w-7xl gap-12">
      <SectionHeader
        eyebrow="代表作品"
        id="selected-work"
        title="先看原創影音敘事，再看可核對案例與二次創作。"
        lines={[["先看原創", "影音敘事，"], ["再看可核對案例與", "二次創作。"]]}
        description="《畫本》是目前申請者提供的原創影音敘事代表作；因公開成片與權利紀錄尚未完成核對，本頁只呈現可確認的角色、工具與限制，不以其他素材冒充作品證據。"
      />

      <WorkEvidenceCard work={huaben} />

      <section className="grid gap-6" aria-labelledby="supporting-evidence-title">
        <div className="grid gap-3 md:grid-cols-[0.32fr_0.68fr] md:gap-10">
          <h3 id="supporting-evidence-title" className="meta-label text-[var(--theme-accent)]">其他可核對案例</h3>
          <p className="zh-copy-wide text-[color:var(--theme-muted)]">
            這些案例已有網站原始碼、公開媒體或受控方法敘事可查閱；它們不取代《畫本》的原創短劇角色，也不解除各案自己的驗證或權利限制。
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
        <p className="meta-label text-[var(--theme-accent)]">二次創作／後置案例</p>
        <div className="grid gap-3">
          <h3 id="secondary-creation-title" className="zh-heading text-[clamp(1.7rem,4vw,3.5rem)]">
            最後閱讀素材選擇與剪輯練習。
          </h3>
          <p className="zh-copy-wide text-[color:var(--theme-muted)]">
            這件作品只用來說明媒體研究、素材篩選與剪輯判斷；第三方角色、動畫影像與音樂不列為本人原創成果。
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
        title="不以性格形容詞代替事件，改用三組行動證據。"
        lines={[["不以性格形容詞", "代替事件，"], ["改用三組", "行動證據。"]]}
        description="社團重整、畢業專題角色調整與工作經驗只用來支持組織、韌性與溝通能力，不取代聲音實作與研究證據。"
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {collaborationEvidence.map((item, index) => (
          <article key={item.title} className="soft-panel grid content-start gap-5 rounded-[var(--radius-md)] p-5 md:p-6">
            <p className="meta-label text-[var(--theme-accent)]">{String(index + 1).padStart(2, "0")}</p>
            <h3 className="zh-heading text-[clamp(1.4rem,2.4vw,2.2rem)]">{item.title}</h3>
            <ul className="grid gap-3">
              {item.evidence.map((evidence) => (
                <li key={evidence} className="zh-caption text-[color:var(--theme-muted)]">{evidence}</li>
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
        title="把已有證據、正在學習與未來訓練分開。"
        lines={[["把已有證據、", "正在學習與"], ["未來訓練分開。"]]}
        description="軟體已安裝、曾看過教學或列入計畫，都不等於已形成作品；每個階段只放目前能支持的狀態。"
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
        title="以可操作證據為起點，補足聲音方法，再推進混合監聽研究。"
        lines={[["以可操作證據", "為起點，"], ["補足聲音方法，再推進", "混合監聽研究。"]]}
        description="這份作品集不把我包裝成已完成訓練的聲音專家；它呈現我已做出的原型、正在建立的工具理解，以及能從數位學習與視覺溝通帶入研究的工作方法。"
      />

      <div className="grid gap-4 md:grid-cols-2">
        {finalPortfolioLinks.map((link) => (
          <a
            key={link.href}
            className="portfolio-card interactive-link grid gap-4 rounded-[var(--radius-md)] p-6"
            href={link.href}
            target="_blank"
            rel="noreferrer"
          >
            <h3 className="zh-heading text-[clamp(1.3rem,2vw,1.9rem)]">{link.label}</h3>
            <p className="zh-caption text-[color:var(--theme-muted)]">{link.description}</p>
            <span className="zh-label text-[var(--theme-accent)]">在新分頁開啟 ↗</span>
          </a>
        ))}
      </div>

      <p className="zh-caption rounded-[var(--radius-md)] border border-[color:var(--theme-line)] p-5 text-[color:var(--theme-muted)]">
        研究計畫全文目前保留在非公開工作區；本頁只呈現申請階段摘要，沒有建立未經發布決策確認的下載連結。
      </p>
    </div>
  );
}
