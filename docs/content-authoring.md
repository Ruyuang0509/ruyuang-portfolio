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

## Optional Evidence Fields

These can be empty without breaking the page:

- `diagrams`: interaction flow, system architecture, information architecture
- `media.visualDrafts`
- `media.screenshots`
- `media.videos`
- `media.audio`
- `media.demos`
- `testing`
- `reflection`

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
pnpm run content:check
pnpm run test:sound
pnpm run build:draft
pnpm run check:submission
```
## Interactive sound content fields

For a public interactive sound case, author the research evidence in `src/data/portfolio.js`: `researchQuestion`, `mappings`, `signalFlow`, `listeningGuide`, and `interactivePrototype`. Each mapping needs an input, output audio parameter, reason, and bounded range where applicable. Use `testing.statusKey: "notValidated"` plus `plannedMethods` until real validation exists. Keep asset gaps, privacy concerns, and replacement reminders in `portfolio.internal.js` only.
