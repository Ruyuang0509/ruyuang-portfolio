# Agent Start Here

This folder, `如願個人網站`, is the canonical active personal website project.

Do not use `portfolio-nextgen`, `personal-portfolio-nextgen`, or Codex default work folders as the working tree unless the user explicitly asks for comparison. Those folders are reference/archive locations. This folder is the single source of truth.

## Current Stack

- Vite SPA
- React 19 with JSX
- Motion for React
- React Three Fiber / Three.js
- Tailwind CSS v4 through the Vite plugin
- GSAP 3.13, ScrollTrigger, and Lenis
- Local AVIF/WebP/MP4 media under `public/media/portfolio`

## First Commands

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

Use the Lighthouse path only when performance evidence is needed:

```powershell
pnpm run audit:lighthouse
```

The package scripts call `scripts/run-node.ps1`, which first uses Node from PATH and then falls back to the Codex bundled Node runtime when this Windows/Codex shell does not expose `node` globally.

## Guardrails

- Preserve local responsive AVIF/WebP/MP4 media replacements.
- Read `docs/content-authoring.md` before adding or editing project entries.
- Read `docs/adding-portfolio-work.md` for the required case-study schema and media rules.
- Read `docs/content-governance.md` before adding construction notes, readiness notes, or submission-facing copy.
- Run `pnpm run check:submission` before treating `dist/` as formal review output.
- Read `docs/portfolio-display-research.md` before changing the portfolio information architecture.
- Read `docs/visual-system.md` before changing palette, section surfaces, cards, or dark/light transitions.
- Read `docs/chinese-visual-system.md` before changing Traditional Chinese typography, chips, captions, or long-form case-study copy.
- Read `docs/CODEX_HANDOFF.md`, `docs/PORTFOLIO_AUDIT.md`, and `docs/CONTENT_MATRIX.md` before continuing a prior Codex implementation pass.
- Do not reintroduce remote demo images or demo videos.
- Do not add paid GSAP plugins.
- Keep the R3F scene lazy/progressive so DOM text remains the LCP path.
- Run `workspace:check` before migrating anything from another folder.
- Run `audit:text` after large copy edits so source/docs mojibake is caught before review.
- Keep package metadata ASCII-safe as `ruyuan-personal-website`; the canonical filesystem folder name remains `如願個人網站`.
- Put public-facing portfolio copy in `src/data/portfolio.js`.
- Put construction-stage notes in `src/data/portfolio.internal.js`, which is draft-only.
- Never rely on CSS hiding for internal notes; submission mode aliases draft UI to an empty component.

### Animation Preservation Requirement

The existing motion system is part of the approved visual identity and
admissions narrative. Content simplification must not be interpreted as
animation removal.

Before modifying motion:

1. Inventory the existing animations and classify each as:
   - narrative guidance;
   - interaction feedback;
   - atmosphere / authorship;
   - decorative;
   - performance risk.

2. Preserve narrative guidance, interaction feedback, and authorship motion
   by default.

3. Do not remove an animation unless profiling demonstrates a material
   performance, accessibility, or usability problem.

4. When an effect is expensive, first attempt:
   - smaller paint area;
   - transform / opacity implementation;
   - lazy or intersection-based activation;
   - reduced complexity on mobile or low-power devices;
   - reduced-motion fallback;
   - lower update frequency.

5. Replacing the global full-document theme switch does not authorize removing
   Hero motion, card transitions, custom cursor behavior, sound feedback,
   section reveals, or other unrelated animations.

6. Record every animation removed or materially changed, the evidence supporting
   that decision, and the replacement interaction used to preserve its UX role.
