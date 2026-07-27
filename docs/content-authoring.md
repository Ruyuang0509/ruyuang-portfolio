# Content Authoring Guide

This project now uses a structured case-study model with separate public and internal layers.

Public-facing case and homepage narrative content lives in `src/data/portfolio.js`.
The standalone proposal, admission evidence, and AI／authorship records live in
`src/data/admission-research.js`, `src/data/admission-evidence.js`, and
`src/data/ai-workflow.js`. Detailed admission claim, validation, authorship,
rights, limitation, and evidence-request records live in
`src/data/admission-evidence.audit.js`; `DraftModeEnabled` dynamically imports
that module so it stays outside the raw entry, while the submission bundle
excludes it through its Draft alias. Construction-stage notes, replacement
reminders, and pre-submission checks live in
`src/data/portfolio.internal.js` and appear only in Draft Mode.

For the complete current authoring workflow, use `docs/adding-portfolio-work.md`.
For public/internal governance rules, use `docs/content-governance.md`.
For the research decisions behind the layout, use `docs/portfolio-display-research.md`.

## Where To Edit

- Project data: `src/data/portfolio.js`
- Standalone proposal data: `src/data/admission-research.js`
- Pure Data, representative-work, collaboration, roadmap, and final-link data: `src/data/admission-evidence.js`
- Draft-only admission claim／validation／rights records: `src/data/admission-evidence.audit.js`
- AI／authorship data: `src/data/ai-workflow.js`
- Draft-only hidden case text: `src/data/portfolio.hidden.js`
- Draft-only internal notes: `src/data/portfolio.internal.js`
- Case-study layout: `src/components/CaseStudyShowcase.jsx`
- Application proposal layout: `src/components/ResearchProposalSection.jsx`
- Admission evidence layouts: `src/components/AdmissionEvidenceSections.jsx`
- Local media assets: `public/media/portfolio`
- Site metadata: `index.html`, `public/llms.txt`, and `public/social-preview.svg`

## Admission Evidence Records

Admission evidence is not another `projectCaseStudies` collection. Keep the
reader-facing records in `src/data/admission-evidence.js`:

- `pureDataLearningEvidence`: a learning record with a public operation video
- `representativeWorks`: records and canonical viewing links for 《畫本》 and
  the named MV remix
- `supportingEvidenceLinks`: links back to existing verifiable case studies
- `collaborationEvidence`: event-backed collaboration and resilience evidence
- `learningRoadmap`: evidence, learning, no-work-yet, and graduate-study stages
- `finalPortfolioLinks`: the verified Portfolio and public GitHub URLs

The public Pure Data record must retain `status`, `version`, `startedAt`,
`purpose`, `description`, `tools`, `roles`, `completed`, `authorshipNote`,
`versionNote`, `nextStep`, `evidenceLinks`, and `submissionVisibility`. Its
media contract includes a descriptive local filename, poster, MIME type,
intrinsic dimensions, duration, caption, accessibility summary, fallback, and
five-step viewing guide.

Keep the detailed evidence boundary in `admission-evidence.audit.js`. Every
public Pure Data or representative-work record has a one-to-one audit record
with the same stable ID. Audit records retain `evidenceStatus`,
`validationStatus`, supported and unsupported claims, authorship, AI
assistance, rights, limitations, evidence requests, and
`submissionVisibility: "draft-only"`. This source is still readable in the
public Repository; bundle exclusion is not privacy.

Do not promote a representative-work fact or working link into stronger
artifact or rights evidence. 《畫本》 and 《希望有羽毛和翅膀》 use canonical
YouTube links that were confirmed open on 2026-07-26, but a direct URL does not
establish awards, complete credits, long-term availability, or permission for
third-party material. A secondary-creation edit does not transfer ownership of
characters, animation footage, or music.

## Stable Admission Sections

The homepage review contract is:

`#top` → `#sound-transition` → `#reviewer-path` →
`#interactive-sound-learning` → `#pure-data-learning` →
`#research-positioning` → `#selected-work` → `#collaboration` →
`#learning-roadmap` → `#ai-workflow` → `#contact`.

The legacy `#research-proposal` anchor remains an alias inside
`#research-positioning`; it is not a twelfth narrative section. Admission
sections use permanent `DeferredAdmissionSection` wrappers while their content
is lazy-loaded. Keep each wrapper ID and heading ID stable so initial links,
fixed-nav offset correction, focus transfer, and error fallbacks continue to
work before and after the module resolves.

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

Every `submissionVisibility: "public"` work also needs a concise featured-index contract:

- `indexTitle`: the approved short title; keep the complete research title in `title`
- `indexSummary`: evidence-safe summary without invented findings or metrics
- `indexCover`: public-safe image metadata rendered at 16:10
- `indexCoverPosition`: optional focal position for `object-fit: cover`
- `indexTags`: exactly three static, non-interactive keywords
- `indexLinks`: only rendered result endpoints; use an empty array when none can be published

The index renderer always supplies a real `#project-id` case link. Never add `href="#"`, an empty modal, a restricted dashboard URL, or a result button whose destination does not exist.

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
- `titleLines`: 只控制視覺片語與換行；攤平並正規化空白後必須與完整 `title` 完全相同，不能為了排版省略作品名稱
- `challenge`
- `workflow.stages`
- `productionWorkflow`: 四階段、以 `ol` 呈現的案例分析到影片輸出流程
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
- use `preload="metadata"` for a featured case video that supports duration-aware scene seek; reduce to `none` when Save-Data is enabled
- include a caption or short transcript summary
- use `tracks[]` for multiple WebVTT languages; keep `captionsSrc` only as a legacy single-track fallback
- use `transcriptCues[]` when a complete on-page transcript is available; onscreen text without speech may add `visualDescription` and `musicMood`, but must not be labelled as speech recognition
- add a visible `accessibilitySummary` when subtitle languages or a no-narration boundary must remain understandable without opening native controls
- keep Poster, summary, direct-file fallback, transcript, and surrounding case copy available when runtime media or subtitle loading fails
- never autoplay evidence media

The current Pure Data MP4 is a source-quality operation record, not a polished
validation video. It visibly contains a local project path, `validated`
wording, and cropped interface regions. Public copy must call it
`v0.2.1 本機功能測試`, keep the overall state as
`學習中／可操作功能原型`, use “模擬視覺參數” rather than camera/gesture
input, and keep concise version context beside the player. The full path,
wording, framing, authorship, and validation caveats remain in the matching
Draft audit record. A future replacement should hide the local path, correct
the validation wording, frame the complete interface, and retain the current
accessible viewing guide.

The `.pd`/ZIP source, inconsistent v0.2.2 material, AI conversation, and
independent-rebuild work remain outside `public/` and the public Repository.
Adding a safe MP4 or poster does not authorize publishing those source files.

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

That command must fail whenever `docs/evidence/hamlet-rights-checklist.md`, the named/date-stamped applicant attestation, evidence lifecycle, or any item-level check becomes incomplete. The current 2026-07-26 applicant attestation satisfies that checkpoint, but `check:submission` passing by itself is still not equivalent to publication approval.

Completeness checks apply evidence-heavy recommended groups only to submission-visible projects. A submission-hidden case may display `不適用 · submission-hidden` for workflow/media groups; this is an intentional governance state, not a missing-evidence warning and not permission to ship placeholder files.

`content:check` also validates the current admission-evidence order and
boundaries: the Pure Data identity/media record, two ordered representative
works and their canonical links, the one-to-one public/audit stable IDs, the
absence of audit-only fields from public records, three supporting evidence
links, three collaboration groups, four roadmap stages, two final HTTPS links,
the six-item evidence-path navigation, the four-layer research proposal, and
the three AI responsibility/failure chains. Passing that check does not replace
rendered anchor, media playback, rights, or browser verification.

### 2026-07-26 final verification fingerprint

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

This run did not check screen readers, real zoom, system reduced-motion,
physical devices or multi-browser audio. REAPER copy is limited to installation
only, with no project or output. The two YouTube links remain Draft-PR content;
third-party rights and complete credits were not verified, so link reachability
is not publication approval.

## Interactive sound content fields

For a public interactive sound case, author the research evidence in `src/data/portfolio.js`: `researchQuestion`, `mappings`, `signalFlow`, `listeningGuide`, and `interactivePrototype`. Each mapping needs an input, output audio parameter, reason, and bounded range where applicable. Use `testing.statusKey: "notValidated"` plus `plannedMethods` until real validation exists. Keep asset gaps, privacy concerns, and replacement reminders in `portfolio.internal.js` only.
