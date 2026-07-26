# Pre-Submission Checklist

Run this checklist from the canonical project root `如願個人網站` before exporting or sharing the formal portfolio.

## Required Commands

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
pnpm run test:submission-scanner
pnpm run check:submission
```

`check:submission` first runs isolated scanner regression fixtures, then performs a submission-mode production build, scans supported text-based files and the complete `dist/` file inventory, and audits the output for GitHub Pages-breaking root-relative asset paths. It is a required baseline; the independent checks below remain defense in depth.

## 2026-07-26 Current Verification

- [x] `pnpm run doctor`：exit 0。
- [x] Submission scanner：72/72 fixtures；fresh `dist/` 132 files／25 text files；67 個 text rules／7 個 inventory rules。
- [x] Submission build：467 modules；initial JS gzip 191397 B；entry 148553 B；CSS 44122 B。
- [x] Browser matrix：1440／1280／768／390／320、7 個 hash 入口、theme forward／reverse、Web Audio 與 Pure Data 影片。
- [x] Public／audit schema 已分離；Draft／Audit 保留 stable-ID 限制紀錄，submission public components 不讀取 audit records。
- [ ] System reduced-motion rendered flow 尚未完整驗證。
- [ ] 完整 Tab／Enter 鍵盤巡覽尚未完整驗證。
- [ ] `pnpm run check:publication` 仍因 11 個 Hamlet rights／attestation blockers exit 1；不得繞過。
- [ ] 本輪 working tree 尚未 commit、push 或發布。下方 2026-07-25 快照僅供歷史比較。

2026-07-25 最新自動驗證快照：`pnpm install --frozen-lockfile` 與 `pnpm run doctor` exit 0；scanner fixtures 57/57、text／inventory rules 54／7；draft build 470 modules、submission build 467 modules；draft initial JS gzip／entry 198914／173631 B，submission 192733／152769 B，CSS 43138 B，lazy 3D closure 638680 raw／169383 gzip B；fresh `dist/` 132 files／25 text files、`public/` 118 files，public→dist 0 missing／0 hash mismatch。這些結果適用目前 11 段 IA fingerprint；正式匯出前仍應依本清單記錄新一輪實際 exit code。

Current submission production preview 已在 1280／375／320 px 完成基本 Browser 稽核：74 個站內 hash links 0 missing、135 個 IDs 0 duplicate、320／375 0 horizontal overflow；行動 menu Escape／還焦、三個 fresh deep links、Pure Data／Hamlet video metadata與 console 0 warning／error已確認。Web Audio發聲、影片實播／fallback、system reduced-motion、Save-Data、screen reader、實機及完整四 viewport matrix仍未執行。

## Production Publication Gate

`check:submission` 不包含素材權利核准。正式公開前另執行：

```powershell
pnpm run check:publication
```

Hamlet manifest 目前仍是 `rightsReview.status: unverified`、`rightsManifestPresent: false`；2026-07-25 最新 `pnpm run check:publication` 實際 exit 1，列出 11 個 Hamlet rights／attestation blockers。不得由工程端或 AI 把 status 改成已核准來消除錯誤。Pages run `30087568225` 已成功部署 PR #6 source，Hamlet 資產仍 HTTP 200；現行 deploy workflow 只跑 `check:submission`，所以在 stakeholder 完成逐項 rights evidence 與 applicant attestation 前，應停止公開或移除未核准資產，並把 `check:publication` 接入 production deploy gate。HTTP 200 與 deployment success 都不是 rights clearance。

## Content Review

- Public copy should describe work, method, evidence, role, reflection, and research direction.
- Hero should identify 蕭智仁、國立嘉義大學數位學習設計與管理學系、`現就讀／預計 2026 年畢業`，以及由視覺／數位學習走向聲音的理由；未經申請者更新確認，不改回「2026 年畢業於」。
- Confirm the high-level order and unique IDs are exactly `#top` → `#sound-transition` → `#reviewer-path` → `#interactive-sound-learning` → `#pure-data-learning` → `#research-positioning` → `#selected-work` → `#collaboration` → `#learning-roadmap` → `#ai-workflow` → `#contact`. `#research-proposal` may remain only as a backward-compatible alias inside research positioning.
- Confirm the internal `#selected-work` order is exactly 《畫本》→ other verifiable works (AI 文學故事 MV、資料視覺化、Power BI) →《希望有羽毛和翅膀》個人 MV 混剪.
- Confirm Reviewer Path is an early evidence guide rather than a duplicate footer or duplicate Navbar, and that all six Navbar targets exist.
- Research positioning must distinguish the current Web Audio and Pure Data artifacts from the future hybrid-monitoring proposal.
- The research section must retain the explicit application-stage disclaimer about equipment, participant count, measurement method, advisor guidance, and pilot-study revision.
- The research section must keep four visible layers: current problem, front-speaker／open-back-headphone initial concept, abilities the applicant can bring, and skills／methods that must be strengthened after admission.
- Public copy should use natural first-person Traditional Chinese where the applicant is the actor, and keep “what I did”, current artifacts, unvalidated outcomes, prohibited inferences, and next steps visibly separate.
- Internal preparation notes must stay in `src/data/portfolio.internal.js`.
- Submission-facing captions, transcripts, alt text, metadata, and links must be public-safe.
- If evidence is not ready, keep the project as a public-safe research concept or hide it from submission.
- Do not write unfinished testing results as verified outcomes.
- Confirm the public Web Audio signal flow includes input, normalization, parameter mapping, Oscillator, Filter, Gain／Envelope, Stereo Panner, Compressor, and Master Output in that order.
- Confirm Pure Data remains `學習中／可操作功能原型` and `尚待驗證`, with the `2026/07/24` start date, AI collaboration boundary, and explicit statement that the applicant did not independently complete the whole Patch. Confirm REAPER remains installed／learning with no public project claim.
- Confirm the interface word `validated` is never presented as user, academic, or research validation; public copy must call the recording a `v0.2.1 本機功能測試`.
- 《畫本》 and the personal MV remix already exist as applicant-provided text-only cases. The earlier “不新增案例” decision is superseded by this evidence／copy decision; until real media, full credit, dates, context, and rights evidence are supplied, they must remain text-only. Do not claim an award for 《畫本》, and do not attribute third-party characters, footage, or music to the applicant.
- Confirm the collaboration section treats 6→17 as an applicant-provided term record and does not attribute the change to one intervention or replace technical evidence with leadership narrative.
- Confirm `#contact` contains only the real portfolio and public GitHub URLs. A private research-plan DOCX actually exists, but it is not an approved public review copy and has no public download; do not describe it as nonexistent or add a link until its literature, equipment, sample, budget, ethics, metadata, and publication scope are reviewed. Do not add a CV／email download unless the actual approved file or address exists.

## Media Review

- Hero and project media should be local, dimensioned, and responsive.
- Below-the-fold images should remain lazy-loaded.
- Videos should keep posters, captions or transcript summaries, and stable aspect ratios.
- Confirm `public/media/portfolio/pd-crossmodal-mapping-v0.2.1-operation-demo.mp4` and `pd-crossmodal-mapping-v0.2.1-operation-demo-poster.png` exist, load under the configured base path, retain the 1276×720 aspect ratio, and are copied byte-for-byte into fresh `dist/`.
- Review the Pure Data recording for the visible local D-drive path and incomplete framing. Prefer a re-recorded, fully framed 60–70 second version with the path hidden; if the original remains, obtain the applicant's explicit public-risk acceptance rather than assuming the copy hides the pixels.
- Test the Pure Data video with normal loading, Save-Data behavior, failed MP4 loading, failed poster loading, keyboard focus, and the text-only viewing guide. Do not require autoplay or audio to understand the evidence boundary.
- Heavy demos should load only after user intent.
- Treat every file under `public/` as publishable. Vite copies unused AVIF/WebP/MP4/TXT/SVG assets as well as assets referenced by React.
- Confirm hidden-only `ph-after-*`, `mv-soft-*`, and `mv-soft-preview.mp4` are absent from the formal artifact.
- In `dev:submission`, confirm those removed URLs and `/dist/*` return 404, valid public media still returns 200, and restricted／internal／hidden／report paths return 403.
- Review `llms.txt`, favicon, robots, social preview, Open Graph metadata, section anchors, and brand naming together.
- Confirm title／Open Graph／Twitter／JSON-LD remain `蕭智仁｜聲響、互動與數位學習作品集`, canonical／OG URL remain `https://ruyuang0509.github.io/ruyuang-portfolio/`, `llms.txt` lists all 11 high-level anchors, and social preview copy mentions Web Audio, Pure Data, and the hybrid-monitoring research concept.

## Accessibility Review

- Confirm heading order remains logical.
- Confirm focus styles are visible.
- Confirm media has meaningful alt text or captions.
- Confirm Traditional Chinese line breaking still reads naturally.
- Confirm reduced-motion mode does not depend on animation to reveal core content.

## Current Browser Coverage And Remaining Checks

- [x] Verify current React render at 1280×720, 375×812 and 320×568; confirm 0 global overflow at 375／320 and 0 console warning／error.
- [x] Inventory the current DOM: 74 internal hash links, 0 broken target; 135 IDs, 0 duplicate.
- [x] Verify mobile menu open／Escape close／trigger focus restore, plus fresh `#pure-data-learning`, `#research-proposal` and `#contact` deep-link offsets.
- [x] Verify Pure Data and Hamlet video elements load metadata without media error; this does not mean playback／subtitles／fallback passed.
- [ ] Complete the requested 768×1024, 1024×768 and 1440×900 viewports, desktop keyboard path, all target sizes and representative section reflow.
- [ ] Verify Web Audio enable／stop／Escape／fallback behavior and confirm there is no autoplay.
- [ ] Verify the Pure Data video, poster, native controls, Save-Data path, keyboard focus, and failed-media fallbacks.
- [ ] Verify system reduced-motion, screen reader, real 200% zoom, iOS／Android and multi-browser audio／video behavior.

Only checked items above are current Browser evidence. Do not generalize them into a full responsive, accessibility, media-playback or device pass.

## Final Export

After `pnpm run check:submission` passes, independently inspect `dist/` before treating it as formal-review output:

```powershell
rg -n "施工模式|Nextgen Portfolio|#graphic|#video|#photo" dist -g "*.html" -g "*.js" -g "*.css" -g "*.json" -g "*.map" -g "*.txt" -g "*.svg" -g "*.vtt" -g "*.webmanifest" -g "*.xml"
rg -n "待使用者確認|假資料|內部評語|lorem ipsum|證明有效|提升學習成效|成功降低門檻|已完成多聲道系統|已完成心理聲學研究|業界標準能力" dist -g "*.html" -g "*.js" -g "*.css" -g "*.json" -g "*.map" -g "*.txt" -g "*.svg" -g "*.vtt" -g "*.webmanifest" -g "*.xml"
rg --files dist/media/portfolio | rg "ph-after|mv-soft"
rg -n "work-02-powerbi-screenshot|C:\\|/Users/|/home/|\.pbix|\.xlsx|\.csv|\.tsv" dist -g "*.html" -g "*.js" -g "*.css" -g "*.json" -g "*.map" -g "*.txt" -g "*.svg" -g "*.vtt" -g "*.webmanifest" -g "*.xml"
```

The expected result is no matches. Do not add \`-a\` to these text searches: forcing MP4／AVIF／WebP bytes through a text regex can create meaningless false positives such as a random \`C:\\\` byte sequence. Audit binaries by relative filename, size and hash inventory instead. The Pure Data MP4 intentionally contains a recorded local path in image pixels, which a text scanner cannot detect; review the rendered frames manually. Also compare the built favicon／TXT／SVG metadata with the actual 11-section information architecture.

## Sound portfolio checks added 2026-07-16

- Confirm the Web Audio demo requires an explicit gesture and can be stopped by button and Escape.
- Confirm pointer, touch, and keyboard sliders expose the same core mappings.
- Confirm `immersive-memory-map`, `時間待確認`, `施工模式`, hidden-only media, restricted screenshot filenames, stale brand metadata, local paths, and draft notes are absent from submission output.
- Confirm the Power BI case displays `2026/06/11–2026/06/12`; do not restore restricted data, screenshots, dashboards, or result-bearing media without explicit permission from the data provider.
- Treat `notValidated` as an explicit public testing state with planned methods, not as a completed outcome.
- Confirm Pure Data remains a learning state even though a real v0.2.1 operation video is now supplied; a video is not an independently authored Patch, user validation, or academic validation. REAPER remains a learning state until a real project and output are supplied.
- Confirm the three Web Audio illustrations remain labelled as visual directions, and the Power BI SVGs as layout／boundary concepts; do not describe them as verified flowcharts, system architecture, IA, real values, or real proportions.
