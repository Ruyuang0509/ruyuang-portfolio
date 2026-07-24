import { useEffect } from "react";
import { admissionResearchProposal } from "../data/admission-research.js";
import EditorialHeading from "./EditorialHeading.jsx";

export default function ResearchProposalSection() {
  const proposal = admissionResearchProposal;

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("portfolio:deferred-ready", {
      detail: { targetId: "#research-positioning" },
    }));
  }, []);

  return (
    <div className="mx-auto grid max-w-7xl gap-12">
      <header className="grid gap-8 md:grid-cols-[0.34fr_0.66fr] md:gap-16">
        <div className="grid content-start gap-4">
          <p className="meta-label text-[var(--theme-accent)]">{proposal.eyebrow}</p>
          <span className="chip-text w-fit rounded-full border border-[color:var(--theme-line)] px-4 py-2 text-sm font-extrabold">
            {proposal.status}
          </span>
        </div>
        <div className="grid gap-6">
          <EditorialHeading
            as="h2"
            id="research-positioning-title"
            className="editorial-heading zh-display text-[length:var(--font-size-fluid-section)]"
            lines={proposal.titleLines}
          >
            {proposal.title}
          </EditorialHeading>
          <p className="zh-lead text-[var(--theme-text)]">{proposal.statement}</p>
          <p className="zh-copy-wide border-l-2 border-[var(--theme-accent)] pl-5 text-[color:var(--theme-muted)]">
            研究問題：{proposal.researchQuestion}
          </p>
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        {proposal.layers.map((layer) => (
          <article key={layer.id} className="evidence-panel grid content-start gap-5 rounded-[var(--radius-md)] p-5 md:p-6">
            <p className="meta-label text-[var(--theme-accent)]">{layer.label}</p>
            <p className="zh-heading text-[clamp(1.25rem,2vw,1.75rem)]">{layer.summary}</p>
            <ul className="grid gap-2 border-t border-[color:var(--theme-line)] pt-4">
              {layer.items.map((item) => (
                <li key={item} className="zh-caption text-[color:var(--theme-muted)]">{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <section className="grid gap-6 md:grid-cols-[0.3fr_0.7fr] md:gap-12" aria-labelledby="research-workflow-title">
        <div className="grid content-start gap-3">
          <h3 id="research-workflow-title" className="meta-label text-[var(--theme-accent)]">預定研究流程</h3>
          <p className="zh-caption text-[color:var(--theme-muted)]">這是可調整的方法順序，不是已執行的實驗紀錄。</p>
        </div>
        <ol className="grid gap-3">
          {proposal.proposedWorkflow.map((item, index) => (
            <li key={item} className="soft-panel grid grid-cols-[auto_1fr] gap-4 rounded-[var(--radius-sm)] p-4">
              <span className="meta-label text-[var(--theme-accent)]">{String(index + 1).padStart(2, "0")}</span>
              <span className="zh-copy text-[var(--theme-text)]">{item}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="paper-panel grid gap-4 rounded-[var(--radius-lg)] p-6 md:grid-cols-[0.3fr_0.7fr] md:p-8">
        <p className="meta-label">預期學習與貢獻</p>
        <p className="zh-copy text-[var(--theme-inverse-text)]">{proposal.expectedContribution}</p>
      </div>

      <p className="zh-copy rounded-[var(--radius-lg)] border border-[color:var(--theme-line)] p-6 text-[color:var(--theme-muted)] md:p-8">
        {proposal.disclaimer}
      </p>
    </div>
  );
}
