# Content Governance

This project uses one portfolio content system with two controlled output modes:

- `draft`: authoring mode. It can show internal build notes, readiness panels, replacement reminders, risk notes, and pre-submission checks.
- `submission`: formal review mode. It renders only public portfolio content and scans the generated output for construction-stage wording.

## Why This Architecture

The site should not be split into two unrelated websites because that would create content drift. It should also not rely on CSS hiding, because hidden text can still ship in HTML or JavaScript. Instead:

1. Public case and homepage narrative content lives in `src/data/portfolio.js`; the standalone proposal, reader-facing admission evidence, and AI／authorship data live in `src/data/admission-research.js`, `src/data/admission-evidence.js`, and `src/data/ai-workflow.js`.
2. Hidden case text lives in `src/data/portfolio.hidden.js`; submission mode resolves `#portfolio-hidden` to an empty module.
3. Detailed admission claims, validation, authorship, AI, rights, limitations, and evidence requests live in `src/data/admission-evidence.audit.js` and align with public records by stable ID.
4. Internal build notes and editorial selection rules (`portfolioPriorityRules`) live in `src/data/portfolio.internal.js`.
5. Draft-only rendering lives in `src/draft/DraftModeEnabled.jsx`, which dynamically imports `admission-evidence.audit.js` so the audit data stays outside the raw entry.
6. Submission builds resolve `#portfolio-draft` to `src/draft/DraftModeDisabled.jsx`, so the audit module and internal panels are not imported.
7. `scripts/submission-output-scanner.mjs` independently scans supported text files and the complete `dist/` inventory; the CLI and regression fixtures share that core.

## Public Content Fields

Use the public data modules `src/data/portfolio.js`,
`src/data/admission-research.js`, `src/data/admission-evidence.js`, and
`src/data/ai-workflow.js` for content that may appear in formal review:

- title, year, source, category, public status
- summary and value proposition
- problem awareness and target audience
- design goal, design process, technology and media
- outcome showcase
- diagrams, public media, captions, transcripts
- optional structured workflow, Prompt decisions, provenance-labelled Prompt templates, real storyboard frames, media layers, evidence-linked deliverables, evidence boundaries, planned evaluation, value cards, next steps, and working CTAs
- tools, roles, reflection, institute connections, and a `themeEvidenceStatus` value for every declared institute theme
- public links, credits, SEO title and description
- reader-facing admission status, purpose, completed work or highlights,
  reflection/version context, next step, evidence links, and submission
  visibility

Public content must not include authoring reminders or construction wording.

## Admission Evidence Governance

`src/data/admission-evidence.js` contains public review records with different
evidence strengths. `src/data/admission-evidence.audit.js` preserves the
detailed evidence and validation boundary behind Draft Mode. Do not flatten
the public labels or audit records into one “completed work” status:

- Pure Data v0.2.1 is publicly `學習中／可操作功能原型`; its matching audit
  record remains `evidenceStatus: 可操作原型` and
  `validationStatus: 尚待驗證`.
- 《畫本》 and 《希望有羽毛和翅膀》 are applicant-provided completed-work
  records with canonical YouTube viewing links. Direct links do not establish
  awards, complete credits, long-term availability, or rights to third-party
  material; those boundaries remain in the matching audit records and public
  material notes.
- Collaboration cards support event-backed organization, resilience, and role
  adjustment. They do not replace sound or research evidence.
- The roadmap distinguishes existing evidence, current learning, work that
  does not yet exist, and graduate-study goals.
- `#contact` contains only the verified GitHub Pages and public Repository
  URLs. It is not evidence that public email, CV, social links, or a research
  PDF exists.

The current Pure Data MP4 and poster are in `public/media/portfolio`, so they
enter every submission build. The public record must use the source-safe
`v0.2.1 本機功能測試` and `模擬視覺參數` labels, retain the learning/prototype
state, and provide concise version context beside the player. The matching
Draft audit record must preserve the visible local path, original
`validated` wording, cropped interface regions, AI-assisted authorship, and
validation limits. It may demonstrate local operation of four simulated
parameter mappings and safety controls; it may not demonstrate independent
Patch authorship, user validation, gesture tracking, Pure Data proficiency, or
a completed research system.

Keep the `.pd`/ZIP, inconsistent v0.2.2 material, AI conversation, and
independent rebuild outside `public/` and public Git until the applicant makes
an explicit evidence and publication decision.

## Admission IA And Lazy Boundaries

The formal review contract contains eleven top-level IDs:

`#top`, `#sound-transition`, `#reviewer-path`,
`#interactive-sound-learning`, `#pure-data-learning`,
`#research-positioning`, `#selected-work`, `#collaboration`,
`#learning-roadmap`, `#ai-workflow`, and `#contact`.

`#research-proposal` is a compatibility alias inside
`#research-positioning`, not an additional narrative. Admission sections use
permanent wrappers with lazy content, stable heading IDs, Suspense fallbacks,
and section error boundaries. Removing the wrapper because its component is
lazy would break hash targeting, focus transfer, and deferred layout
correction.

Navbar, the evidence-path cards, `public/llms.txt`, canonical/Open Graph
metadata, and the rendered DOM must continue to describe the same information
architecture. The canonical URL is currently the verified GitHub Pages
project URL; a future custom-domain change must update canonical, `og:url`,
JSON-LD, `llms.txt`, final links, and the deployment decision together.

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
- admission record claims, validation, authorship, rights, limitations, and
  evidence requests in `admission-evidence.audit.js`
- editorial portfolio selection/checklist rules (`portfolioPriorityRules`)

These notes belong only to the draft/authoring path; submission builds must not import or expose them.

## Status Labels

Public-safe statuses:

- Completed / 已完成
- Operable Prototype / 可操作原型
- Prototype / 原型中
- Learning / 學習中
- In Progress / 整理中
- Research Proposal / 研究構想
- Pending Validation / 尚待驗證

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

The Pure Data operation video has its own evidence boundary rather than a
publication-rights gate equivalent to Hamlet. Its presence, codec metadata,
poster, and playback fallback are technical evidence only. The applicant still
needs a public-safe rerecording, independent rebuild, signal-flow explanation,
version difference, and source/rights decision before upgrading the capability
claim.

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
Use `pnpm run check:publication` before publishing Hamlet media. The applicant-owned checkpoint was completed on 2026-07-26; any later non-zero exit is a release blocker and must not be bypassed.

## 2026-07-26 Final Verification Fingerprint

- `pnpm run doctor`: exit 0.
- Draft: 471 modules; entry 180733 B, CSS 44315 B, initial JS gzip 200889 B.
- Submission: 467 modules; entry 153704 B, CSS 44315 B, initial JS gzip 192936 B.
- Sound 18/18; rights 14/14; scanner fixtures 73/73.
- Submission scanner: 132 dist files, 25 text files, 67 text rules and 9
  inventory rules.
- `public/` inventory: 118 entries, 0 missing and 0 mismatch.
- `pnpm run check:publication`: exit 0, `verified / approved`, within the
  documented Hamlet limited-use scope only.
- Browser smoke at 1280／768／390／320: 0 overflow, broken hash, duplicate ID
  or broken image; console 0; four deep links at 95–112 px; theme endpoints and
  Menu Escape passed.

The print path resets `.theme-reading-surface` semantic tokens to paper,
restores visible overflow and removes its shadow. REAPER copy is limited to
installation only, with no project or output. Screen readers, real zoom, system
reduced-motion, physical devices and multi-browser audio were not checked.
YouTube link reachability does not resolve third-party rights or complete
credits, and those links remain Draft-PR-only.

## Forbidden Formal Output Terms

The submission scan fails if generated output contains construction-stage wording such as:

- 待補
- 可替換
- 範例
- 正式送審前
- 佔位／佔位圖
- 尚未提供
- 待使用者確認
- 假資料
- 內部評語
- placeholder / sample
- TODO / lorem ipsum
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
raw `.pbix` / spreadsheet / CSV / TSV exports, unsupported proficiency labels,
and unsupported claims such as proven effectiveness, learning gains, a
completed multichannel/psychoacoustics system, or industry-standard ability.
The legacy dead-anchor rules cover `#graphic`, `#video`, and `#photo`;
`#contact` is now a real public target. Binary media is checked by relative path
and filename only; it is never decoded as UTF-8 text.

Hidden cases must use an empty media state until real evidence is approved.
Do not keep placeholder binaries in `public/`: Vite publishes that directory in
both dev and build regardless of whether React references a file.
Submission dev uses a dedicated boundary middleware so missing
`/media/portfolio/*` files and all `/dist/*` dev URLs return 404 instead of the
SPA HTML fallback. Filesystem deny rules return 403 for restricted media,
reports, internal data, and the real hidden-case module.

If a project cannot be made public-safe, mark it as an internal note or hide it from submission instead of polishing around the issue.

