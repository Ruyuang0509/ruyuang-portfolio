# Pre-Submission Checklist

Run this checklist from the canonical project root `如願個人網站` before exporting or sharing the formal portfolio.

## Required Commands

```powershell
pnpm run workspace:check
pnpm run audit:media
pnpm run audit:text
pnpm run audit:cjk
pnpm run content:check
pnpm run test:sound
pnpm run check:submission
```

`check:submission` performs a submission-mode production build, scans the generated `dist/` files for construction-stage wording, and audits the output for GitHub Pages-breaking root-relative asset paths.

## Content Review

- Public copy should describe work, method, evidence, role, reflection, and research direction.
- Internal preparation notes must stay in `src/data/portfolio.internal.js`.
- Submission-facing captions, transcripts, alt text, metadata, and links must be public-safe.
- If evidence is not ready, keep the project as a public-safe research concept or hide it from submission.
- Do not write unfinished testing results as verified outcomes.

## Media Review

- Hero and project media should be local, dimensioned, and responsive.
- Below-the-fold images should remain lazy-loaded.
- Videos should keep posters, captions or transcript summaries, and stable aspect ratios.
- Heavy demos should load only after user intent.

## Accessibility Review

- Confirm heading order remains logical.
- Confirm focus styles are visible.
- Confirm media has meaningful alt text or captions.
- Confirm Traditional Chinese line breaking still reads naturally.
- Confirm reduced-motion mode does not depend on animation to reveal core content.

## Final Export

After `pnpm run check:submission` passes, the `dist/` folder is the clean formal-review output.
## Sound portfolio checks added 2026-07-16

- Confirm the Web Audio demo requires an explicit gesture and can be stopped by button and Escape.
- Confirm pointer, touch, and keyboard sliders expose the same core mappings.
- Confirm `immersive-memory-map`, `時間待確認`, restricted screenshot filenames, and draft notes are absent from submission output.
- Keep Power BI year omitted until verified; do not restore restricted screenshots without authorization and de-identification review.
- Treat `notValidated` as an explicit public testing state with planned methods, not as a completed outcome.
- Confirm Pure Data and REAPER remain learning states unless real files are supplied.
