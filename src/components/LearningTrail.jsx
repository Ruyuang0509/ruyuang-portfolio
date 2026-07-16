import { learningTrail } from "../data/portfolio.js";
import EditorialHeading from "./EditorialHeading.jsx";

export default function LearningTrail() {
  return (
    <section id="learning-trail" className="research-section px-[clamp(1.25rem,6vw,10vw)] py-24 text-[var(--theme-text)] md:py-32" aria-labelledby="learning-trail-title">
      <div className="mx-auto grid max-w-7xl gap-12">
        <div className="grid gap-5 md:grid-cols-[0.36fr_0.64fr] md:gap-16">
          <p className="meta-label text-[var(--theme-accent)]">Learning trail / 學習歷程</p>
          <div className="grid gap-5">
            <EditorialHeading as="h2" id="learning-trail-title" className="editorial-heading zh-display text-[length:var(--font-size-fluid-section)]" lines={[["把正在學習的", "工具，"], ["分成已有證據", "與尚無公開材料。"]]}>把正在學習的工具，分成已有證據與尚無公開材料。</EditorialHeading>
            <p className="zh-copy-wide text-[color:var(--theme-muted)]">這裡只列出目前能誠實說明的學習狀態；沒有 patch、project 或聲音輸出的工具，不以成果方式呈現。</p>
            <a className="interactive-link chip-text w-fit rounded-full border border-[color:var(--theme-line)] px-5 py-3 text-sm font-extrabold" href="#ai-workflow">閱讀生成式 AI 協作方法</a>
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
