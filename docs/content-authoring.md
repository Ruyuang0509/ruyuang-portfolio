# Content Authoring Guide

This project now uses a structured case-study model with separate public and internal layers.

Public-facing portfolio content lives in `src/data/portfolio.js`. Construction-stage notes, replacement reminders, and pre-submission checks live in `src/data/portfolio.internal.js` and appear only in Draft Mode.

For the complete current authoring workflow, use `docs/adding-portfolio-work.md`.
For public/internal governance rules, use `docs/content-governance.md`.
For the research decisions behind the layout, use `docs/portfolio-display-research.md`.

## Where To Edit

- Project data: `src/data/portfolio.js`
- Draft-only hidden case text: `src/data/portfolio.hidden.js`
- Draft-only internal notes: `src/data/portfolio.internal.js`
- Case-study layout: `src/components/CaseStudyShowcase.jsx`
- Local media assets: `public/media/portfolio`
- Site metadata: `index.html`

## Required Core Fields

Each work should include:

- `id`: stable URL anchor, lowercase and hyphenated
- `title`
- `year`
- `source`: course, studio, independent project, research, client, or collaboration source
- `category`
- `summary`
- `valueProposition`
- `problemAwareness`
- `audience`
- `cover`
- `tools`
- `roles`
- `instituteConnections`
- `themeRationales`: one non-empty rationale for every declared institute theme
- `themeEvidenceStatus`: classify every declared theme as `demonstrated` or `researchDirection`

## Optional Evidence Fields

These can be empty without breaking the page:

- `diagrams`: interaction flow, system architecture, information architecture
- `media.visualDrafts`
- `media.screenshots`
- `media.videos`
- `media.audio`
- `media.demos`
- `testing`
- `promptTemplate`: 可追溯的原始 Prompt，或清楚標示來源的衍生模板
- `evidenceBoundary`: 分開可核對 artifact、核准規格與尚未獨立驗證項目
- `evaluationPlan`: 尚未執行的形成性評估計畫

Structured long-form modules can also be omitted without breaking other cases:

- `englishTitle`, `tags`, `projectInfo`
- `challenge`
- `workflow.stages`
- `promptDecisions`
- `storyboard.frames`
- `featuredExample`, `mediaLayers`
- `deliverables`, `outcomes`
- `keyInsight`, `nextSteps`, `ctas`

`reflection` is part of the required case-study contract even when structured modules are absent.

## Prompt And Deliverable Provenance

Do not turn a reconstructed workflow into an original production record.

- An original Prompt log needs the real conversation, exported record, or another source that can be traced to the production run.
- A template reconstructed after the work must use `originStatus: "derived"`, a stable `evidenceRef`, and `usedForExistingVideo: false` when it did not generate the existing artifact.
- State the derivation date and source in `provenance`. A derived Prompt Template can be a useful reusable process artifact, but it does not close the missing-original-log gap.
- Give each `promptDecisions` item an evidence status and source. Do not attach artifact references to a decision that is supported only by an approved brief.

Structured `deliverables` need an `id`, public label, `statusKey`, `evidenceRefs`, and `attributionSource`. Use these status keys consistently:

- `artifactVerified`: a delivered file is independently present and checked
- `artifactDerived`: a derivative was reproducibly made from a verified artifact
- `processDerived`: a process artifact was reconstructed or organized after production
- `specificationOnly`: an approved rule or intended direction, not a delivered file

Every non-empty `evidenceRefs` value must resolve to the project evidence manifest. A production specification may intentionally keep `evidenceRefs: []`; that empty list must not be replaced with a reference to an unrelated completed asset.

For the Hamlet case, the current evidence source is `docs/evidence/hamlet-media-manifest.json`. It verifies the clean MP4, bilingual WebVTT files, responsive derivatives, and their relationships. It does not establish the missing original Prompt log or the right to publish every source element.

## Media Rules

Use local assets whenever possible.

Recommended image variants:

- `slug-420.avif`
- `slug-640.avif`
- `slug-1200.avif`
- `slug-420.webp`
- `slug-640.webp`
- `slug-1200.webp`

Videos should:

- use local MP4/WebM when possible
- include a poster image
- use `preload="none"` unless the video is the main above-the-fold media
- include a caption or short transcript summary
- use `tracks[]` for multiple WebVTT languages; keep `captionsSrc` only as a legacy single-track fallback
- use `transcriptCues[]` when a complete on-page transcript is available

Audio should:

- use local MP3/OGG/WAV only when needed
- include a caption, transcript, or listening context
- avoid autoplay

Interactive demos can be represented as public links or sandboxed iframe embeds when they are ready. Preparation notes for demos belong in `src/data/portfolio.internal.js`.

Avoid loading heavy demos automatically above the fold.

Submission-hidden cases must not reference placeholder media from `public/`.
Keep them in an empty media state until real, approved evidence exists; the
submission alias resolves hidden case data to an empty module.

## Testing And Reflection

Testing data can be partial. Use honest labels such as:

- number of participants
- task completion
- observation summary
- learning-outcome notes
- survey or interview takeaways

When a study has not happened, use `evaluationPlan.status: "planned"` and define participant roles, tasks, evidence to collect, decision use, and a privacy/data policy. Do not add participant counts, dates, metrics, findings, quotations, or a validation status until records exist. The Hamlet plan in `docs/evidence/hamlet-formative-test-plan.md` is a protocol, not a result.

Reflection should cover:

- strengths
- limitations
- graduate-study deepening direction

## Verification

After editing content, run:

```powershell
pnpm install
pnpm run workspace:check
pnpm run audit:media
pnpm run audit:text
pnpm run audit:cjk
pnpm run audit:evidence
pnpm run content:check
pnpm run test:sound
pnpm run build:draft
pnpm run check:submission
```

`audit:evidence` checks manifest references, direct-copy and derivative-inventory hashes, AVIF/WebP dimensions, WebVTT timing, and transcript consistency. It does not grant publication rights. Before publishing Hamlet media, also run:

```powershell
pnpm run check:publication
```

That command is expected to fail while `docs/evidence/hamlet-rights-checklist.md` remains `unverified` and the applicant attestation is missing. `check:submission` passing is therefore not equivalent to publication approval.

Completeness checks apply evidence-heavy recommended groups only to submission-visible projects. A submission-hidden case may display `不適用 · submission-hidden` for workflow/media groups; this is an intentional governance state, not a missing-evidence warning and not permission to ship placeholder files.

## Interactive sound content fields

For a public interactive sound case, author the research evidence in `src/data/portfolio.js`: `researchQuestion`, `mappings`, `signalFlow`, `listeningGuide`, and `interactivePrototype`. Each mapping needs an input, output audio parameter, reason, and bounded range where applicable. Use `testing.statusKey: "notValidated"` plus `plannedMethods` until real validation exists. Keep asset gaps, privacy concerns, and replacement reminders in `portfolio.internal.js` only.
