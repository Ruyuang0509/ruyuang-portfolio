import { projectCaseStudies } from "../data/portfolio.js";
import { getProjectCompleteness, getEvidenceAvailability } from "../data/portfolio.governance.js";
import { authoringNotes, getProjectInternalNotes } from "../data/portfolio.internal.js";
import { PORTFOLIO_MODE } from "../config/portfolioMode.js";

function NoteList({ title, items = [] }) {
  if (!items.length) return null;

  return (
    <div className="grid gap-2">
      <p className="meta-label text-[var(--theme-accent)]">{title}</p>
      <ul className="grid gap-2">
        {items.map((item) => (
          <li key={item} className="zh-caption text-[color:var(--theme-muted)]">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function EvidenceStatusPills({ project }) {
  const evidence = getEvidenceAvailability(project);

  return (
    <ul className="flex flex-wrap gap-2" aria-label={`${project.title} 的證據完整度`}>
      {evidence.map((item) => (
        <li
          key={item.label}
          className={
            item.available
              ? "chip-text rounded-full bg-[color:var(--theme-panel)] px-3 py-1.5 text-[0.78rem] font-extrabold text-[var(--theme-text)]"
              : "chip-text rounded-full border border-dashed border-[color:var(--theme-line)] px-3 py-1.5 text-[0.78rem] font-extrabold text-[color:var(--theme-muted)]"
          }
        >
          {item.available ? "已備" : "待補"} {item.label}
        </li>
      ))}
    </ul>
  );
}

function ContentCompletenessChecklist({ project }) {
  const completeness = getProjectCompleteness(project);

  return (
    <aside className="draft-panel grid gap-4 rounded-[var(--radius-md)] p-5">
      <div className="grid gap-2">
        <p className="meta-label text-[var(--theme-accent)]">
          Content Readiness / 內容完整度
        </p>
        <p className="zh-caption text-[color:var(--theme-muted)]">
          必填：{completeness.requiredComplete ? "ready" : completeness.requiredMissing.join(" / ")}
          {" / "}
          建議：{completeness.recommendedComplete ? "ready" : completeness.recommendedMissing.join(" / ")}
        </p>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {completeness.groups.map((item) => (
          <div
            key={item.group}
            className="zh-caption rounded-[var(--radius-sm)] bg-[color:var(--theme-surface)] p-3 text-[color:var(--theme-muted)]"
          >
            <span className="block text-[var(--theme-text)]">{item.group}</span>
            <span>
              {item.applicable
                ? `${item.presentCount}/${item.totalCount} · ${item.level}`
                : "不適用 · submission-hidden"}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}

function DraftBanner() {
  return (
    <aside className="draft-banner px-[clamp(1.25rem,6vw,10vw)] py-4 text-[var(--theme-text)]" aria-label="Draft mode banner">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 rounded-[var(--radius-md)] border border-[color:var(--theme-line)] bg-[color:var(--theme-panel)] p-4 md:flex-row md:items-center md:justify-between">
        <p className="zh-caption">
          <span className="meta-label mr-3 text-[var(--theme-accent)]">Draft Mode</span>
          {PORTFOLIO_MODE} / {authoringNotes.status}
        </p>
        <a className="interactive-link chip-text rounded-full border border-[color:var(--theme-line)] px-4 py-2 text-sm font-extrabold" href="#draft-governance">
          查看內部施工備註
        </a>
      </div>
    </aside>
  );
}

function OverviewDraftPanel() {
  return (
    <aside id="draft-governance" className="draft-panel grid gap-5 rounded-[var(--radius-lg)] p-5 md:p-6">
      <p className="meta-label text-[var(--theme-accent)]">
        Internal Build Notes / 施工模式
      </p>
      <p className="zh-caption text-[color:var(--theme-muted)]">
        {authoringNotes.warning}
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-[var(--radius-sm)] bg-[color:var(--theme-surface)] p-4">
          <p className="zh-label text-[var(--theme-accent)]">Public Content</p>
          <p className="zh-caption mt-2 text-[color:var(--theme-muted)]">
            送審版只讀取公開內容與正式媒體敘事。
          </p>
        </div>
        <div className="rounded-[var(--radius-sm)] bg-[color:var(--theme-surface)] p-4">
          <p className="zh-label text-[var(--theme-accent)]">Internal Build Notes</p>
          <p className="zh-caption mt-2 text-[color:var(--theme-muted)]">
            待補、可替換、風險提醒與 AI 協作備註集中在 draft-only module。
          </p>
        </div>
        <div className="rounded-[var(--radius-sm)] bg-[color:var(--theme-surface)] p-4">
          <p className="zh-label text-[var(--theme-accent)]">Submission Guard</p>
          <p className="zh-caption mt-2 text-[color:var(--theme-muted)]">
            正式建置會執行 forbidden-term scan，避免施工字眼外洩。
          </p>
        </div>
      </div>
    </aside>
  );
}

function ProjectDraftPanel({ projectId }) {
  const project = projectCaseStudies.find((item) => item.id === projectId);
  const notes = getProjectInternalNotes(projectId);
  if (!project || !notes) return null;

  return (
    <aside className="draft-panel grid gap-5 rounded-[var(--radius-lg)] p-5 md:p-6" aria-label={`${project.title} internal build notes`}>
      <div className="grid gap-2">
        <p className="meta-label text-[var(--theme-accent)]">Internal Build Notes</p>
        <h3 className="zh-heading text-[clamp(1.35rem,2vw,2rem)]">{project.title}</h3>
        <p className="zh-caption text-[color:var(--theme-muted)]">{notes.status}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {notes.labels?.map((label) => (
          <span key={label} className="chip-text rounded-full border border-[color:var(--theme-line)] px-3 py-1.5 text-xs font-black text-[var(--theme-text)]">
            {label}
          </span>
        ))}
      </div>
      <EvidenceStatusPills project={project} />
      <ContentCompletenessChecklist project={project} />
      <div className="grid gap-5 lg:grid-cols-2">
        <NoteList title="Missing materials" items={notes.missingMaterials} />
        <NoteList title="Replaceable assets" items={notes.replaceableAssets} />
        <NoteList title="Risk reminders" items={notes.riskReminders} />
        <NoteList title="Pre-submission checklist" items={notes.preSubmissionChecklist} />
      </div>
      {notes.sampleCopy ? (
        <p className="zh-caption rounded-[var(--radius-sm)] bg-[color:var(--theme-surface)] p-4 text-[color:var(--theme-muted)]">
          {notes.sampleCopy}
        </p>
      ) : null}
      {notes.aiCollaborationNotes ? (
        <p className="zh-caption rounded-[var(--radius-sm)] bg-[color:var(--theme-surface)] p-4 text-[color:var(--theme-muted)]">
          {notes.aiCollaborationNotes}
        </p>
      ) : null}
      {notes.hiddenFromSubmissionReason ? (
        <p className="zh-caption rounded-[var(--radius-sm)] border border-dashed border-[color:var(--theme-line)] p-4 text-[color:var(--theme-muted)]">
          {notes.hiddenFromSubmissionReason}
        </p>
      ) : null}
    </aside>
  );
}

export default function PortfolioDraftLayer({ placement = "project", projectId }) {
  if (placement === "banner") return <DraftBanner />;
  if (placement === "overview") return <OverviewDraftPanel />;
  if (projectId) return <ProjectDraftPanel projectId={projectId} />;
  return null;
}
// Codex-Fix: Draft mode renders internal governance data as tool panels; submission builds alias this file away.
