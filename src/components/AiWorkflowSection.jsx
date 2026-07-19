import { aiWorkflow } from "../data/portfolio.js";
import EditorialHeading from "./EditorialHeading.jsx";

export default function AiWorkflowSection() {
  return (
    <section
      id={aiWorkflow.id}
      className="research-section px-[clamp(1.25rem,6vw,10vw)] py-24 text-[var(--theme-text)] md:py-32"
      aria-labelledby={`${aiWorkflow.id}-title`}
    >
      <div className="mx-auto grid max-w-7xl gap-12">
        <div className="grid gap-5 md:grid-cols-[0.36fr_0.64fr] md:gap-16">
          <p className="meta-label text-[var(--theme-accent)]">{aiWorkflow.eyebrow}</p>
          <div className="grid gap-5">
            <EditorialHeading
              as="h2"
              id={`${aiWorkflow.id}-title`}
              className="editorial-heading zh-display text-[length:var(--font-size-fluid-section)]"
              lines={aiWorkflow.titleLines}
            >
              {aiWorkflow.title}
            </EditorialHeading>
            <p className="zh-copy-wide text-[color:var(--theme-muted)]">{aiWorkflow.summary}</p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {aiWorkflow.responsibilityGroups.map((group) => (
            <article key={group.label} className="soft-panel grid content-start gap-4 rounded-[var(--radius-md)] p-5">
              <h3 className="zh-heading text-[clamp(1.25rem,2vw,1.8rem)]">{group.label}</h3>
              <ul className="grid gap-2">
                {group.items.map((item) => (
                  <li key={item} className="zh-caption text-[color:var(--theme-muted)]">{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="grid content-start gap-4">
            <p className="meta-label text-[var(--theme-accent)]">兩次提示詞調整</p>
            {aiWorkflow.versions.map((item) => (
              <article key={item.version} className="evidence-panel grid gap-3 rounded-[var(--radius-md)] p-5">
                <p className="meta-label text-[var(--theme-accent)]">{item.version}</p>
                <h3 className="zh-heading text-xl">{item.title}</h3>
                <p className="zh-caption text-[color:var(--theme-muted)]">{item.change}</p>
              </article>
            ))}
          </div>

          <div className="grid content-start gap-4">
            <p className="meta-label text-[var(--theme-accent)]">實際出錯與修正</p>
            {aiWorkflow.failureCases.map((item) => (
              <article key={item.problem} className="evidence-panel grid gap-3 rounded-[var(--radius-md)] p-5">
                <h3 className="zh-heading text-xl">{item.problem}</h3>
                <p className="zh-caption text-[color:var(--theme-muted)]">原因：{item.diagnosis}</p>
                <p className="zh-caption text-[color:var(--theme-muted)]">我怎麼改：{item.correction}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="paper-panel grid gap-4 rounded-[var(--radius-lg)] p-6 md:grid-cols-[0.34fr_0.66fr] md:p-8">
          <p className="meta-label">可查閱的文件</p>
          <ul className="grid gap-2" aria-label="生成式 AI 使用說明文件">
            {aiWorkflow.evidencePaths.map((path) => (
              <li key={path} className="mixed-token text-sm font-semibold leading-relaxed">{path}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
