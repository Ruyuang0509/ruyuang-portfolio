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
            <p className="zh-copy-wide text-[color:var(--theme-muted)]">Web Audio 已有可操作原型。Pure Data 和 REAPER 還在學習，目前沒有可公開的 Pure Data 補丁檔、REAPER 工程檔或聲音作品。</p>
            <a className="interactive-link chip-text w-fit rounded-full border border-[color:var(--theme-line)] px-5 py-3 text-sm font-extrabold" href="#ai-workflow">查看我如何使用生成式 AI</a>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {learningTrail.map((item) => (
            <article key={item.id} className="soft-panel grid content-start gap-4 rounded-[var(--radius-md)] p-5">
              <p className="meta-label text-[var(--theme-accent)]">{item.status}</p>
              <h3 className="zh-heading text-[clamp(1.35rem,2.4vw,2.1rem)]">{item.title}</h3>
              <p className="zh-caption text-[color:var(--theme-muted)]">{item.evidence}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
