import { learningTrail } from "../data/portfolio.js";
import EditorialHeading from "./EditorialHeading.jsx";

export default function LearningTrail() {
  return (
    <section id="learning-trail" className="research-section px-[clamp(1.25rem,6vw,10vw)] py-24 text-[var(--theme-text)] md:py-32" aria-labelledby="learning-trail-title">
      <div className="mx-auto grid max-w-7xl gap-12">
        <div className="grid gap-5 md:grid-cols-[0.36fr_0.64fr] md:gap-16">
          <p className="meta-label text-[var(--theme-accent)]">學習進度</p>
          <div className="grid gap-5">
            <EditorialHeading as="h2" id="learning-trail-title" className="editorial-heading zh-display text-[length:var(--font-size-fluid-section)]" lines={[["聲音工具", "學到哪裡，"], ["目前有哪些材料", "可以看。"]]}>聲音工具學到哪裡，目前有哪些材料可以看。</EditorialHeading>
            <p className="zh-copy-wide text-[color:var(--theme-muted)]">Web Audio 已能直接操作；Pure Data 從 2026/07/24 開始練習，REAPER 已完成安裝，但尚未形成工程或聲音輸出。這一區把可操作作品與正在累積的聲音工具經驗放在同一條學習路線上。</p>
            <a className="interactive-link chip-text w-fit rounded-full border border-[color:var(--theme-line)] px-5 py-3 text-sm font-extrabold" href="#project-index-title">接著看代表作品</a>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {learningTrail.map((item) => (
            <article key={item.id} className="soft-panel grid content-start gap-4 rounded-[var(--radius-md)] p-5">
              <div className="flex flex-wrap gap-2">
                <span className="meta-label text-[var(--theme-accent)]">{item.status}</span>
                {item.validationStatus ? (
                  <span className="chip-text rounded-full border border-[color:var(--theme-line)] px-3 py-1 text-xs font-bold text-[color:var(--theme-muted)]">
                    {item.validationStatus}
                  </span>
                ) : null}
              </div>
              <h3 className="zh-heading text-[clamp(1.35rem,2.4vw,2.1rem)]">{item.title}</h3>
              {item.startedAt ? <p className="zh-label text-[var(--theme-accent)]">開始日期：{item.startedAt}</p> : null}
              <p className="zh-caption text-[color:var(--theme-muted)]">{item.evidence}</p>
              {item.aiAssistance ? (
                <p className="zh-caption rounded-[var(--radius-sm)] border border-[color:var(--theme-line)] p-3 text-[color:var(--theme-muted)]">
                  AI 協作與我的學習：{item.aiAssistance}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
