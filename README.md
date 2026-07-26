# 如願個人網站

研究所導向的個人作品集網站。

這個資料夾是未來工作的唯一 canonical project root。舊資料夾 `portfolio-nextgen`、`personal-portfolio-nextgen`、以及原始 Codex 任務資料夾都只作為參考或封存，不應直接編輯。

## Start Here

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

package scripts 會透過 `scripts/run-node.ps1` 執行，所以 Windows/Codex shell 沒有全域 `node` 時，也會回退到 Codex bundled Node runtime。

## Stack

- Vite
- React 19 + JSX
- Motion for React
- React Three Fiber / Three.js
- Tailwind CSS v4
- GSAP 3.13 + ScrollTrigger
- Lenis

## Project Notes

- Canonical folder: `如願個人網站`
- npm package name: `ruyuan-personal-website`
- Local optimized media: `public/media/portfolio`
- Admission evidence data: `src/data/admission-evidence.js`
- Admission evidence sections: `src/components/AdmissionEvidenceSections.jsx`
- Workspace notes: `docs/workspace-consolidation.md`
- Case-study authoring guide: `docs/content-authoring.md`
- Full portfolio work guide: `docs/adding-portfolio-work.md`
- Content governance: `docs/content-governance.md`
- Pre-submission checklist: `docs/pre-submission-checklist.md`
- Research synthesis: `docs/portfolio-display-research.md`
- Visual system notes: `docs/visual-system.md`
- Traditional Chinese visual system: `docs/chinese-visual-system.md`
- Current implementation handoff: `docs/CODEX_HANDOFF.md`
- Portfolio audit: `docs/PORTFOLIO_AUDIT.md`
- Content matrix: `docs/CONTENT_MATRIX.md`
- Hamlet evidence manifest: `docs/evidence/hamlet-media-manifest.json`
- Hamlet formative test plan: `docs/evidence/hamlet-formative-test-plan.md`
- Hamlet rights checklist: `docs/evidence/hamlet-rights-checklist.md`
- Hamlet public rights summary: `docs/evidence/hamlet-rights-evidence-public.md`
- Hamlet applicant attestation draft: `docs/evidence/hamlet-applicant-attestation.md`
- Product and technical documentation index: `docs/website/README.md`
- AI-assisted workflow evidence: `docs/ai-workflow/README.md`
- Admission evidence classification: `docs/admission/ADMISSION_EVIDENCE_SUMMARY.md`
- Admission restructuring plan: `docs/admission/ADMISSION_RESTRUCTURE_PLAN.md`
- Copy and claims audit: `docs/admission/COPY_AND_CLAIMS_AUDIT.md`
- Applicant evidence requests: `docs/admission/EVIDENCE_REQUESTS.md`
- Publication boundary audit: `docs/admission/PUBLICATION_BOUNDARY_AUDIT.md`

The modular handoff under `docs/website/` is the durable product, content,
design, architecture, target-state, and gap-analysis source of truth. The
handoff records verified facts separately from inferred goals and stakeholder
decisions.

## Current Admission Structure

The 2026-07-24 Admission Evidence Pass uses eleven stable review sections:

1. `#top`
2. `#sound-transition`
3. `#reviewer-path`
4. `#interactive-sound-learning`
5. `#pure-data-learning`
6. `#research-positioning`（並保留 `#research-proposal` 相容錨點）
7. `#selected-work`
8. `#collaboration`
9. `#learning-roadmap`
10. `#ai-workflow`
11. `#contact`

The proposal, Pure Data evidence, representative works, collaboration,
roadmap, AI/authorship, and final-link sections are lazy-loaded behind
permanent section wrappers. This preserves direct hash navigation and keeps
the initial entry focused on the Hero, evidence path, and Web Audio flagship.
The data-visualization and existing public case-study systems remain supporting
evidence inside `#selected-work`, after 《畫本》 and before the secondary MV.

## Content Direction

每件作品應該能說清楚：

- 作品名稱、年份、課程或專案來源
- 問題意識與目標使用者
- 互動流程、系統架構、資訊架構
- 視覺稿、截圖、影片、聲音、互動 demo
- 使用工具與個人角色
- 已執行的使用者測試／學習成效證據，或明確標示尚未執行的 planned method
- 反思、限制與研究所深化方向
- 與 AI、互動媒體、聲響、沉浸式體驗、數位孿生、跨域創生的連結

Pure Data v0.2.1 目前只能稱為「學習中／可操作功能原型」與「本機功能測試」。
公開 MP4 可核對四組模擬參數映射、Preset、Reset、Panic 與 meters，但仍含
本機路徑、`validated` 字樣與裁切限制；它不能證明申請者獨立完成 Patch、
已熟練 Pure Data、完成使用者驗證或建成正式研究系統。

## Draft / Submission Mode

- `pnpm run dev:draft`: 施工模式，會顯示內部備註與內容完整度。
- `pnpm run dev:submission`: 送審模式預覽，只渲染公開內容。
- `pnpm run check:submission`: 先核對 Hamlet 證據與字幕，再建置 submission、稽核
  initial/lazy bundle budgets、執行內建禁用詞掃描與 GitHub Pages 路徑檢查。
  這是必要門檻，不是完整的公開邊界證明。
- `pnpm run check:publication`: 額外的公開發佈授權門檻。Hamlet 權利審查目前是
  `pendingApplicantConfirmation`，因此這條命令預期會中止；不得為了讓命令通過而自行改成已授權。
- `public/` 會由 Vite 全量複製。Pure Data MP4／poster、Hamlet 媒體、
  `llms.txt`、social preview 與其他未被 React 引用的檔案都屬實際輸出邊界。
- 目前 canonical／Open Graph URL 使用已確認的 GitHub Pages 專案網址；
  custom domain 與 raster social preview 仍是後續決策。
- 正式送審前仍須獨立檢查 `dist/`：hidden-only 媒體、施工措辭、
  `public/llms.txt`、`public/favicon.svg`、失效 anchor 與 restricted
  檔名都必須納入。已知限制與目前狀態見
  `docs/website/GAP_ANALYSIS.md`。

## 2026-07-24 Local Verification

- `pnpm run doctor`：exit 0；scanner fixtures 57/57，draft／submission
  分別完成 470／467 modules。
- submission `dist/`：132 files，其中 25 個文字檔；`public/` 118 files
  全數存在，0 missing、0 hash mismatch。
- Pure Data MP4 與 poster 的本機 HTTP 檢查皆為 200，content type 與
  bytes 符合檔案 inventory。
- `pnpm run check:publication`：exit 1；11 個 Hamlet 權利與申請者
  attestation blockers 均保留，這是預期的發布阻擋。
- In-app Browser 已嘗試連線，但其本機連線隔離在 shell HTTP 200 時仍回報
  connection refused／受限錯誤。因此本輪沒有把四 viewport、anchor／focus、
  Web Audio、影片播放、reduced-motion、overflow 或 console 驗收標為通過。
- 本輪沒有 commit、push、deploy 或改變 repository visibility。

## 2026-07-26 Hamlet Rights Phase A

- Evidence manifest 已升級為 schema v2，四類素材使用具名 `requiredChecks`、可解析 `evidenceRefs`、conditions 與 limitations；合法的 `commercialUsePermitted: false` 不再被錯誤當作 audit failure。
- Suno〈Blinds-Soft Lament〉00:00–00:40 的特定非營利作品集使用條件、Song ID、公開 credit 與 supplied EML digest 已記錄；本輪沒有找到原始 EML，因此沒有在本機重新計算 digest。
- 八幕原始生成紀錄找到 0 份；reference image 與 Canva stock／template 也沒有足夠證據證明不存在。Applicant attestation 仍為 `confirmed = false`，rights status 與 publication gate 保持 pending／blocked。
- Pages workflow 已在 `check:submission` 後、Configure Pages 與 upload 前加入 `check:publication`。Phase A 合入 main 會刻意停止 production deployment，直到申請者本人確認且 gate 真正通過。
- 公開 Hamlet 頁已更正：原始方向要求 instrumental／no lyrics，但實際 Suno 輸出包含英語歌詞與人聲；WebVTT 是故事字幕，不是歌曲逐字歌詞字幕。
- Rights verification 只處理素材來源與公開範圍，不代表使用者研究、教學效果或學習成效已驗證；`testing.statusKey` 維持 `notValidated`。
- Phase A 實測：install、workspace、media／text／CJK／evidence audits、content check、13/13 rights tests、58/58 scanner fixtures、18/18 sound tests、draft build、submission build／scan／Pages audit 全部 exit 0；`check:publication` 依設計 exit 1，保留 25 個具名 blocker。
- In-app Browser 實測 1280×720、768×1024、375×812、320×568：影片可由鍵盤播放／暫停，Suno link 可取得 `:focus-visible`，八幕 storyboard 與雙語 tracks 保留，11 個 IA anchors 全部存在、duplicate ID 0、global horizontal overflow 0、console warning／error 0。
