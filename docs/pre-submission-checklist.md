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
pnpm run test:submission-scanner
pnpm run check:submission
```

`check:submission` first runs isolated scanner regression fixtures, then performs a submission-mode production build, scans supported text-based files and the complete `dist/` file inventory, and audits the output for GitHub Pages-breaking root-relative asset paths. It is a required baseline; the independent checks below remain defense in depth.

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
- Treat every file under `public/` as publishable. Vite copies unused AVIF/WebP/MP4/TXT/SVG assets as well as assets referenced by React.
- Confirm hidden-only `ph-after-*`, `mv-soft-*`, and `mv-soft-preview.mp4` are absent from the formal artifact.
- In `dev:submission`, confirm those removed URLs and `/dist/*` return 404, valid public media still returns 200, and restricted／internal／hidden／report paths return 403.
- Review `llms.txt`, favicon, robots, social preview, Open Graph metadata, section anchors, and brand naming together.

## Accessibility Review

- Confirm heading order remains logical.
- Confirm focus styles are visible.
- Confirm media has meaningful alt text or captions.
- Confirm Traditional Chinese line breaking still reads naturally.
- Confirm reduced-motion mode does not depend on animation to reveal core content.

## Final Export

After `pnpm run check:submission` passes, independently inspect `dist/` before treating it as formal-review output:

```powershell
rg -n -a "施工模式|Nextgen Portfolio|#graphic|#video|#photo|#contact" dist
rg --files dist/media/portfolio | rg "ph-after|mv-soft"
rg -n -a "work-02-powerbi-screenshot|C:\\|/Users/|/home/|\.pbix|\.xlsx|\.csv|\.tsv" dist
```

The expected result is no matches. Also compare the built favicon／TXT／SVG metadata with the actual page information architecture.

## Sound portfolio checks added 2026-07-16

- Confirm the Web Audio demo requires an explicit gesture and can be stopped by button and Escape.
- Confirm pointer, touch, and keyboard sliders expose the same core mappings.
- Confirm `immersive-memory-map`, `時間待確認`, `施工模式`, hidden-only media, restricted screenshot filenames, stale brand metadata, local paths, and draft notes are absent from submission output.
- Confirm the Power BI case displays `2026/06/11–2026/06/12`; do not restore restricted data, screenshots, dashboards, or result-bearing media without explicit permission from the data provider.
- Treat `notValidated` as an explicit public testing state with planned methods, not as a completed outcome.
- Confirm Pure Data and REAPER remain learning states unless real files are supplied.
