import { useEffect } from "react";
import { aiWorkflow } from "../data/ai-workflow.js";
import EditorialHeading from "./EditorialHeading.jsx";

export default function AiWorkflowSection() {
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("portfolio:deferred-ready", {
      detail: { targetId: "#ai-workflow" },
    }));
  }, []);

  return (
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
            <p className="meta-label text-[var(--theme-accent)]">協作方式的三次調整</p>
            {aiWorkflow.versions.map((item) => (
              <article key={item.version} className="evidence-panel grid gap-3 rounded-[var(--radius-md)] p-5">
                <p className="meta-label text-[var(--theme-accent)]">{item.version}</p>
                <h3 className="zh-heading text-xl">{item.title}</h3>
                <p className="zh-caption text-[color:var(--theme-muted)]">{item.change}</p>
              </article>
            ))}
          </div>

          <div className="grid content-start gap-4">
            <p className="meta-label text-[var(--theme-accent)]">遇到的問題與修正</p>
            {aiWorkflow.failureCases.map((item) => (
              <article key={item.problem} className="evidence-panel grid gap-3 rounded-[var(--radius-md)] p-5">
                <h3 className="zh-heading text-xl">{item.problem}</h3>
                <p className="zh-caption text-[color:var(--theme-muted)]">我怎麼發現：{item.discovery}</p>
                <p className="zh-caption text-[color:var(--theme-muted)]">原因：{item.diagnosis}</p>
                <p className="zh-caption text-[color:var(--theme-muted)]">我怎麼檢查：{item.check}</p>
                <p className="zh-caption text-[color:var(--theme-muted)]">我怎麼修正：{item.correction}</p>
                <p className="zh-caption rounded-[var(--radius-sm)] border border-[color:var(--theme-line)] p-3 text-[color:var(--theme-muted)]">學到什麼：{item.learning}</p>
              </article>
            ))}
          </div>
        </div>
    </div>
  );
}
