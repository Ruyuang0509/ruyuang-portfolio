# 如願個人網站

研究所導向的個人作品集網站。

這個資料夾是未來工作的唯一 canonical project root。舊資料夾 `portfolio-nextgen`、`personal-portfolio-nextgen`、以及原始 Codex 任務資料夾都只作為參考或封存，不應直接編輯。

## 2026-07-28 程式碼品質與單一來源稽核

- 完整結果與證據見 [`docs/CODE_QUALITY_AUDIT.md`](docs/CODE_QUALITY_AUDIT.md)；後續維護契約見 [`docs/CODE_STYLE_AND_REFACTORING.md`](docs/CODE_STYLE_AND_REFACTORING.md)。
- 新增 `audit:quality`、`audit:site`，並強化 `audit:media` 為精確 path／missing file gate；三者都已接入 `verify`、`check:submission` 或 workspace contract。
- 網站 identity／11 段 IA、Power BI 九章敘事、共用圖片 renderer 與 testing metric key 已收斂；不可達元件、重複 renderer、孤立資料與 21 個 public media 孤兒已移除。
- 既有 palette、繁中排版、R3F、GSAP／Lenis、Custom Cursor、Web Audio、section reveal、reduced-motion 與 Hamlet limited-use／`notValidated` 邊界保留。
- 最新 `doctor` 與 `check:publication` 均 exit 0；submission 為 473 modules、entry 100968 B、CSS 45757 B、initial JS gzip 183291 B，119-file artifact。沒有 commit、push 或 deploy。

## 2026-07-26 公開展示版整備（本輪已驗證）

- 公開作品資料與內部稽核已分層：`src/data/admission-evidence.js` 只保存公開敘事，完整 evidence／validation／rights／limitations／requests 改由 `src/data/admission-evidence.audit.js` 提供 Draft／Audit 使用。Submission 仍以 module boundary 排除內部資料，不以 CSS 隱藏。
- `DataVisualizationSeries` 現在把文字固定在不透明的深色語意閱讀面；全畫面 mist／paper 場域只在閱讀面外轉場，`useThemeInversion` 以同一個 endpoint 狀態同步 field 與 navigation chrome。`App.jsx` 另以 `ResizeObserver` 在 lazy 內容改變高度後重新校正深層 hash。
- 本輪另把 Draft-only audit data 改為動態拆分以守住 entry budget，修正 REAPER 過度敘述，並讓 print 取消 reading-surface 深色背景。
- `pnpm install --frozen-lockfile` 與 `pnpm run doctor` 均 exit 0；18/18 sound、14/14 rights、73/73 scanner fixtures 通過。Draft 為 471 modules、initial JS gzip 200889 B、entry 180733 B、CSS 44315 B；submission 為 467 modules、initial JS gzip 192936 B、entry 153704 B、CSS 44315 B。
- Submission scan 覆蓋 132 files／25 text files、67 個 text rules／9 個 inventory rules；118 個 `public/` files 在 132-file `dist/` 中為 0 missing、0 hash mismatch。`pnpm run check:publication` exit 0，manifest 為 `verified / approved`。
- Browser 已在 1280×800、768×900、390×844、320×720 驗證 0 overflow、0 broken hashes、0 duplicate IDs、0 broken images、console 0 warning／error；Pure Data、Hamlet、`#selected-work`、`#contact` deep links 位於頂端約 95–112 px，dark／paper theme endpoints 與 mobile menu Escape 還焦通過。
- Hamlet 核准只涵蓋具名的非營利作品集用途，不延伸為商業授權、private originals 已查驗或研究／學習成效成立。Screen reader、真實 200% zoom、system reduced-motion、實機與多瀏覽器音訊仍未驗；兩個 YouTube 作品的第三方 rights／完整 credit 仍待核對。目前 PR #9 是 Draft，不等於發布核准。

## Start Here

```powershell
pnpm install
pnpm run workspace:check
pnpm run audit:quality
pnpm run audit:site
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
- Hamlet confirmed applicant attestation: `docs/evidence/hamlet-applicant-attestation.md`
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

The 2026-07-25 verified site uses eleven stable review sections:

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
- `pnpm run check:publication`: 額外的公開發佈授權門檻。Hamlet applicant attestation
  已由蕭智仁於 2026-07-26 確認；manifest 目前為 `verified / approved`，但每次正式發布仍必須實際執行此門檻。
- `public/` 會由 Vite 全量複製。Pure Data MP4／poster、Hamlet 媒體、
  `llms.txt`、social preview 與其他未被 React 引用的檔案都屬實際輸出邊界。
- 目前 canonical／Open Graph URL 使用已確認的 GitHub Pages 專案網址；
  custom domain 與 raster social preview 仍是後續決策。
- 正式送審前仍須獨立檢查 `dist/`：hidden-only 媒體、施工措辭、
  `public/llms.txt`、`public/favicon.svg`、失效 anchor 與 restricted
  檔名都必須納入。已知限制與目前狀態見
  `docs/website/GAP_ANALYSIS.md`。

## 2026-07-26 Hamlet Rights Phase B

- 蕭智仁已於 2026-07-26 完成 applicant attestation，綁定 Hamlet 交付影片
  SHA-256 `7E50B6EB01E646FB822D6384D73C9C01A08DC9DF8D5D22A3102B777A460D2312`。
- Manifest 現為 `rightsReview.status: verified`、
  `applicantAttestation.confirmed: true`、`publicationGate: approved`；
  `pnpm run check:publication` exit 0。
- 完整 `pnpm run doctor` exit 0：14/14 rights tests、58/58 scanner
  fixtures、18/18 sound tests、draft／submission builds 與 Pages audit 全部通過。
- In-app Browser 在 1280×720、768×1024、375×812、320×568 核對
  confirmed disclosure、Suno credit／focus、40 秒影片、2 條字幕、8 幕分鏡、
  keyboard play／pause、responsive width 與 console；未見待本人確認、舊權利狀態、
  duplicate ID、broken case target、global horizontal overflow 或 console error。
- 仍未找到八幕原始生成紀錄、原始 EML 或可編輯 Canva 專案；權利核准不等於
  這些 private originals 已被獨立查驗，也不把研究／學習成效改為 validated。

## 2026-07-25 PR #6 Verification（歷史快照）

- `pnpm run doctor`：exit 0；scanner fixtures 57/57，draft／submission
  分別完成 470／467 modules。
- 當時的 build budgets：draft initial JS gzip 198914 B／entry 173631 B；
  submission initial JS gzip 192733 B／entry 152769 B；CSS 43138 B；
  lazy 3D closure 638680 raw／169383 gzip B。
- submission `dist/`：132 files，其中 25 個文字檔；`public/` 118 files
  全數存在，0 missing、0 hash mismatch。
- PR #6 已合併到 `main`；工作分支 `e0e30b2` 與 `main` 的
  `e8f35e0` tree identical。Pages run `30087568225` build／deploy
  success，Pages API 為 public／`built`／HTTPS enforced。
- 正式站首頁、目前 entry／CSS、三個 admission lazy chunks、Pure Data
  MP4／poster、Hamlet MP4／雙語 VTT／poster、`llms.txt` 與 social preview
  均實測 HTTP 200。
- 當時 `pnpm run check:publication` exit 1，保留 11 個 Hamlet 權利與申請者
  attestation blockers；此結果已由上方 2026-07-26 Phase B 的
  `verified / approved` 與 exit 0 取代。
- 當時的 submission production preview 以 1280、375 與 320 px 實測：
  React 正常掛載、74 個站內 hash links 無失效 target、135 個 ID 無重複、
  320／375 無全頁水平溢位；行動選單可由 Escape 關閉並還焦，Pure Data、
  舊 `#research-proposal` alias 與 `#contact` 直接深連結可定位，console
  warning／error 為 0。Web Audio 實際發聲、system reduced-motion、
  Save-Data、screen reader、實機與完整四 viewport matrix 當時仍待人工驗收。

## 2026-07-26 Hamlet Rights Phase A（歷史快照）

- Evidence manifest 已升級為 schema v2，四類素材使用具名 `requiredChecks`、可解析 `evidenceRefs`、conditions 與 limitations；合法的 `commercialUsePermitted: false` 不再被錯誤當作 audit failure。
- Suno〈Blinds-Soft Lament〉00:00–00:40 的特定非營利作品集使用條件、Song ID、公開 credit 與 supplied EML digest 已記錄；本輪沒有找到原始 EML，因此沒有在本機重新計算 digest。
- 八幕原始生成紀錄找到 0 份；reference image 與 Canva stock／template 也沒有足夠證據證明不存在。Applicant attestation 仍為 `confirmed = false`，rights status 與 publication gate 保持 pending／blocked。
- Pages workflow 已在 `check:submission` 後、Configure Pages 與 upload 前加入 `check:publication`。Phase A 合入 main 會刻意停止 production deployment，直到申請者本人確認且 gate 真正通過。
- 公開 Hamlet 頁已更正：原始方向要求 instrumental／no lyrics，但實際 Suno 輸出包含英語歌詞與人聲；WebVTT 是故事字幕，不是歌曲逐字歌詞字幕。
- Rights verification 只處理素材來源與公開範圍，不代表使用者研究、教學效果或學習成效已驗證；`testing.statusKey` 維持 `notValidated`。
- Phase A 實測：install、workspace、media／text／CJK／evidence audits、content check、13/13 rights tests、58/58 scanner fixtures、18/18 sound tests、draft build、submission build／scan／Pages audit 全部 exit 0；`check:publication` 依設計 exit 1，保留 25 個具名 blocker。
- In-app Browser 實測 1280×720、768×1024、375×812、320×568：影片可由鍵盤播放／暫停，Suno link 可取得 `:focus-visible`，八幕 storyboard 與雙語 tracks 保留，11 個 IA anchors 全部存在、duplicate ID 0、global horizontal overflow 0、console warning／error 0。
