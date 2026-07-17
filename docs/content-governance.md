# Content Governance

This project uses one portfolio content system with two controlled output modes:

- `draft`: authoring mode. It can show internal build notes, readiness panels, replacement reminders, risk notes, and pre-submission checks.
- `submission`: formal review mode. It renders only public portfolio content and scans the generated output for construction-stage wording.

## Why This Architecture

The site should not be split into two unrelated websites because that would create content drift. It should also not rely on CSS hiding, because hidden text can still ship in HTML or JavaScript. Instead:

1. Public portfolio content lives in `src/data/portfolio.js`.
2. Hidden case text lives in `src/data/portfolio.hidden.js`; submission mode resolves `#portfolio-hidden` to an empty module.
3. Internal build notes and editorial selection rules (`portfolioPriorityRules`) live in `src/data/portfolio.internal.js`.
4. Draft-only rendering lives in `src/draft/DraftModeEnabled.jsx`.
5. Submission builds resolve `#portfolio-draft` to `src/draft/DraftModeDisabled.jsx`, so internal panels are not imported.
6. `scripts/submission-output-scanner.mjs` independently scans supported text files and the complete `dist/` inventory; the CLI and regression fixtures share that core.

## Public Content Fields

Use `src/data/portfolio.js` for content that may appear in formal review:

- title, year, source, category, public status
- summary and value proposition
- problem awareness and target audience
- design goal, design process, technology and media
- outcome showcase
- diagrams, public media, captions, transcripts
- optional structured workflow, Prompt decisions, provenance-labelled Prompt templates, real storyboard frames, media layers, evidence-linked deliverables, evidence boundaries, planned evaluation, value cards, next steps, and working CTAs
- tools, roles, reflection, institute connections, and a `themeEvidenceStatus` value for every declared institute theme
- public links, credits, SEO title and description

Public content must not include authoring reminders or construction wording.

## Internal Build Notes

Use `src/data/portfolio.internal.js` for preparation material:

- missing materials
- replaceable assets
- sample copy reminders
- pre-submission checklist
- AI collaboration notes
- risk reminders
- hidden-from-submission reason
- content readiness notes
- evidence manifest/readiness paths and open gates
- rights-review status and applicant attestation requirement
- editorial portfolio selection/checklist rules (`portfolioPriorityRules`)

These notes belong only to the draft/authoring path; submission builds must not import or expose them.

## Status Labels

Public-safe statuses:

- Completed / 已完成
- Prototype / 原型中
- In Progress / 整理中
- Research Proposal / 研究構想

Internal-only statuses:

- Missing Materials / 待補資料
- Hidden from Submission / 不進入送審版

## Institute Alignment Evidence

Every authored project, including submission-hidden draft cases, must classify each declared `instituteConnections` theme in `themeEvidenceStatus`:

- `demonstrated`: the project's work, role, tools, and rationale directly support that theme; only public projects can contribute this relationship to the public evidence summary.
- `researchDirection`: the connection is a future graduate-study direction, not current project evidence.

`instituteEvidenceGroups` is derived exactly from `submissionVisibility === "public"` projects and their `demonstrated` relationships. The public institute-alignment summary therefore currently omits `沉浸式體驗` and `數位孿生`, because no public project marks either as demonstrated. They may remain in the overall taxonomy and in individual case details only when visibly labelled as future research directions.

The editorial `portfolioPriorityRules` are authoring guidance, not applicant evidence. Keep them draft-only; do not import or restate them in submission-facing sections.

## Completeness Applicability

Completeness is not the same as publication visibility. Required identity, narrative, role, reflection, and institute-link fields are still governed for every authored case. Evidence-heavy recommended groups such as workflow/diagrams and public media apply only when `submissionVisibility === "public"`.

Draft Mode therefore reports those groups as `不適用 · submission-hidden` for a hidden case and excludes them from `recommendedMissing`. This prevents an intentional submission boundary from appearing as an unresolved public-evidence warning. It does not permit placeholder assets in `public/`, weaken the submission alias, or bypass the output scanner.

## Evidence And Publication Boundaries

Use a stable evidence reference whenever public copy says an artifact was verified or derived. Structured deliverables distinguish four evidence states:

- `artifactVerified`: delivered file exists and passes integrity/content checks
- `artifactDerived`: derivative can be traced to a verified artifact
- `processDerived`: later process reconstruction, such as Hamlet Prompt Template v1
- `specificationOnly`: approved production intent without a matching delivered artifact

A derived Prompt Template is not an original Prompt log. Keep its provenance explicit and set `usedForExistingVideo: false` when it was assembled after the existing video.

The Hamlet manifest at `docs/evidence/hamlet-media-manifest.json` links the clean MP4, bilingual WebVTT, transcript, responsive derivatives, and derived template. `pnpm run audit:evidence` checks those relationships, direct-copy and derivative-inventory hashes, image dimensions, timing, and inventory. It does not verify authorship, licenses, consent, or the right to publish source elements.

Planned evaluation is also not result evidence. An `evaluationPlan` may describe participants by role, tasks, evidence to collect, decision use, and data handling, while `testing.statusKey` remains `notValidated`. Participant counts, dates, findings, quotations, metrics, and learning outcomes require actual study records.

Hamlet publication remains gated by `docs/evidence/hamlet-rights-checklist.md`. `pnpm run check:publication` requires top-level approval, a complete applicant attestation, and every rights item to have completed checks plus evidence references. It must fail while any part is missing. A passing `check:submission` confirms build hygiene; it must never be interpreted as a rights approval.

## Commands

```powershell
pnpm run dev:draft
pnpm run build:draft
pnpm run dev:submission
pnpm run build:submission
pnpm run audit:evidence
pnpm run scan:submission
pnpm run check:submission
pnpm run check:publication
```

Use `pnpm run check:submission` before any formal review export.
Use `pnpm run check:publication` before publishing Hamlet media; until the applicant-owned rights gate is resolved, its non-zero exit is expected and intentional.

## Forbidden Formal Output Terms

The submission scan fails if generated output contains construction-stage wording such as:

- 待補
- 可替換
- 範例
- 正式送審前
- 佔位／佔位圖
- 尚未提供
- placeholder / sample
- Content Readiness
- Internal Build Notes
- INTERNAL_TODO / INTERNAL_SAMPLE / INTERNAL_REPLACE
- PRE_SUBMISSION_CHECK / HIDE_FROM_SUBMISSION
- AI 協作備註
- 風險提醒
- 這裡保留
- 未來可放入
- 審查者
- 評審可以
- 優先放入能展現 AI、互動媒體、聲響或沉浸式經驗的作品
- 每件作品都要回答：為什麼做、給誰用、如何互動、證據在哪裡

It also rejects legacy branding and dead anchors, hidden case IDs and filenames,
restricted-media paths, local absolute paths, known sensitive source filenames,
and raw `.pbix` / spreadsheet / CSV / TSV exports. Binary media is checked by
relative path and filename only; it is never decoded as UTF-8 text.

Hidden cases must use an empty media state until real evidence is approved.
Do not keep placeholder binaries in `public/`: Vite publishes that directory in
both dev and build regardless of whether React references a file.
Submission dev uses a dedicated boundary middleware so missing
`/media/portfolio/*` files and all `/dist/*` dev URLs return 404 instead of the
SPA HTML fallback. Filesystem deny rules return 403 for restricted media,
reports, internal data, and the real hidden-case module.

If a project cannot be made public-safe, mark it as an internal note or hide it from submission instead of polishing around the issue.

