# Pre-Submission Checklist

Run this checklist from the canonical project root `如願個人網站` before exporting or sharing the formal portfolio.

## Required Commands

```powershell
pnpm install --frozen-lockfile
pnpm run workspace:check
pnpm run audit:media
pnpm run audit:text
pnpm run audit:cjk
pnpm run audit:evidence
pnpm run content:check
pnpm run test:hamlet-rights
pnpm run test:sound
pnpm run build:draft
pnpm run test:submission-scanner
pnpm run check:submission
```

`check:submission` first runs isolated scanner regression fixtures, then performs a submission-mode production build, scans supported text-based files and the complete `dist/` file inventory, and audits the output for GitHub Pages-breaking root-relative asset paths. It is a required baseline; the independent checks below remain defense in depth.

2026-07-24 最新本機自動驗證快照：`pnpm run doctor` exit 0；scanner fixtures 57/57、inventory rules 7；draft build 470 modules、submission build 467 modules；fresh `dist/` 132 files／25 text files、`public/` 118 files，public→dist 0 missing／0 hash mismatch。這些結果適用目前 11 段 IA fingerprint；正式匯出前仍應依本清單記錄新一輪實際 exit code。

互動式 in-app Browser 已嘗試，但本機連線隔離使其無法連到 preview；shell 端 localhost HTTP 200 不代表 Browser 可用。因此四個要求 viewport，以及 anchor／focus、Web Audio、Pure Data video、reduced-motion、horizontal overflow 與 console 檢查全部未執行，不能列為通過。

## Production Publication Gate

`check:submission` 不包含素材權利核准。正式公開前另執行：

```powershell
pnpm run check:publication
```

2026-07-26 Hamlet manifest 已升級為 schema v2，`rightsManifestPresent: true`；目前仍是 `rightsReview.status: pendingApplicantConfirmation`、`applicantAttestation.confirmed: false` 與 `publicationGate: requiresApplicantAttestation`。Suno 特定 Song ID 的非營利條件已記錄，但原始 EML 本輪未找到；場景生成、現代文本排除與 Canva stock／template 項目仍等待本人確認。不得由工程端或 AI 把 status 改成已核准來消除錯誤。Deploy workflow 現在會在 `check:submission` 後、Configure Pages 與 upload 前執行 `check:publication`，因此 Phase A 將刻意阻擋 production deployment。HTTP 200 與 deployment success 都不是 rights clearance。

Phase A privacy checks：

```powershell
git ls-files | rg "\.eml$|private-evidence|rights-evidence-private"
rg -n "無歌詞配樂|實際成片.*no lyrics|本人作曲|本人作詞|本人演唱" src public
```

另以不寫入 Repository 的 privacy audit 執行已知私人郵件地址與完整郵件標頭 pattern scan。所有掃描都應無命中；無命中只能證明 tracked／source 邊界乾淨，不能證明 private original 存在或待本人確認的事實成立。

2026-07-26 Phase A actual：install、evidence／content、rights tests、scanner、sound、draft build 與 submission check 均 exit 0；publication check exit 1，列出 25 個 pending blockers。四個 Browser viewport 的 disclosure、video、focus、anchors、overflow 與 console 檢查通過；這不解除 applicant checkpoint。

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

## Current Browser Limitation

- [ ] Run all four requested viewports in an interactive Browser. The latest attempt was blocked by local connection isolation even though shell-side localhost HTTP returned 200.
- [ ] Verify all 11 high-level anchors, duplicate IDs, broken targets, deep links, fixed-nav offsets, and keyboard／menu focus behavior.
- [ ] Verify Web Audio enable／stop／Escape／fallback behavior and confirm there is no autoplay.
- [ ] Verify the Pure Data video, poster, native controls, Save-Data path, keyboard focus, and failed-media fallbacks.
- [ ] Verify system reduced-motion behavior, horizontal overflow, broken media, and console warnings／errors.

None of the items in this section were executed in the latest Browser attempt; they must remain unchecked and must not be reported as passing.

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
