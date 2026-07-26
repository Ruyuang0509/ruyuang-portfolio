# 網站交接文件

本目錄是「如願個人網站」的產品、內容、設計與技術交接入口。內容依 2026-07-26 Hamlet rights Phase B source、完整自動驗證與四 viewport Browser 回歸整理；已驗證事實、申請者權利聲明、研究構想、學習中內容、尚待驗證項目與待補件分開標示。Manifest 現為 `verified / approved`，但原始八幕生成紀錄、原始 EML、可編輯 Canva 專案與研究／學習成效仍未獨立驗證；2026-07-24 以前的 GitHub／Pages、publication blocker 與 Browser 資訊只保留為歷史快照。

## 文件導覽

| 文件 | 內容 |
| --- | --- |
| [CURRENT_STATE.md](CURRENT_STATE.md) | 產品目的、實際單頁資訊架構、區段與使用者狀態 |
| [CONTENT_INVENTORY.md](CONTENT_INVENTORY.md) | 首頁文案、學習歷程、公開案例、隱藏內容與媒體清單 |
| [TECHNICAL_ARCHITECTURE.md](TECHNICAL_ARCHITECTURE.md) | 技術棧、元件／資料流、Web Audio、建置與內容治理 |
| [DESIGN_AND_INTERACTIONS.md](DESIGN_AND_INTERACTIONS.md) | 視覺 token、動效、聲響互動、響應式與可及性 |
| [TARGET_PRESENTATION.md](TARGET_PRESENTATION.md) | 已確認目標、強證據推論與需確認假設 |
| [GAP_ANALYSIS.md](GAP_ANALYSIS.md) | 現況對目標差距、風險與延續開發順序 |
| [../PORTFOLIO_AUDIT.md](../PORTFOLIO_AUDIT.md) | 本輪問題、嚴重度、修正狀態與實際驗證證據 |
| [../CONTENT_MATRIX.md](../CONTENT_MATRIX.md) | 公開模組、真實來源、缺口與不可由 AI 代填的內容 |
| [../CODEX_HANDOFF.md](../CODEX_HANDOFF.md) | Git 狀態、完成項目、續作命令與 blocker |
| [../pre-submission-checklist.md](../pre-submission-checklist.md) | 內建門檻後的獨立 `dist/`、metadata、hidden asset 與人工驗收清單 |
| [../ai-workflow/README.md](../ai-workflow/README.md) | Prompt 版本、失敗案例與人機責任邊界 |
| [../admission/ADMISSION_EVIDENCE_SUMMARY.md](../admission/ADMISSION_EVIDENCE_SUMMARY.md) | 送審證據四分類與目前可支持的主張 |
| [../admission/EVIDENCE_REQUESTS.md](../admission/EVIDENCE_REQUESTS.md) | 需由申請者補交的檔名、內容與最低標準 |
| [../admission/PUBLICATION_BOUNDARY_AUDIT.md](../admission/PUBLICATION_BOUNDARY_AUDIT.md) | public／private／tracked source 與發布權利邊界 |

## 一句話產品定義

這是蕭智仁申請國立臺南藝術大學 116 學年度的繁體中文作品集：從數位學習與視覺敘事背景出發，以可操作的 Web Audio 跨模態映射原型作為目前聲音證據，誠實標示 Pure Data／REAPER 學習邊界，再提出混合多聲道監聽與視覺化校準的申請階段研究構想。

## 文件狀態與可信度

- 本文件包採多檔結構，因產品敘事、內容治理、Web Audio、R3F、視覺系統、submission 邊界與延續開發已超過單一文件容易維護的範圍。
- 最新 IA 以 11 個主要閱讀段落組成：Hero → 轉向聲音的問題意識 → 證據導覽 → Web Audio 旗艦原型 → Pure Data 學習紀錄 → 申請階段研究構想 → 代表作品與其他公開案例 → 專案與合作 → 學習路線 → AI／作者性 → 研究方向與連結。資料視覺化系列與支持案例索引是「代表作品與其他公開案例」內的延伸閱讀，不另計為主段落。原有視覺 token、R3F、聲音互動、卡片、游標與捲動動效均保留。
- 《畫本》與《希望有羽毛和翅膀》MV 混剪已依申請者提供的作品事實加入文字型證據卡；repository 仍沒有兩者可逐鏡核對的成片或活動／授權 artifact，因此不嵌入媒體、不推測成績，並分別標示待補 credit、公開範圍與第三方權利。
- Pure Data v0.2.1 本機功能測試已透過 `admission-evidence.js` 與 `AdmissionEvidenceSections.jsx` 整合為公開影片、poster、觀看指南、可證明／不能證明、AI 協作、權利與下一步。影片與 poster 已在 `public/`，兩者畫面仍可見本機 D 槽路徑與 `validated` 字樣；這是目前公開風險，不可因頁面文案改稱「本機功能測試」就視為已消除。
- 研究構想由 `admission-research.js` 的四層資料驅動：問題、初步構想、申請者可帶入的能力、入學後需補強；另列預定流程、預期貢獻與不可省略的申請階段聲明。
- Hidden asset、scanner、metadata 與 canonical closure 已完成；既有 Pages 部署仍屬舊 source 快照。自動門檻、獨立 `dist/` 稽核及人工／Browser 驗收分開記錄。
- 內建 workspace、media、text、CJK、evidence、content、sound tests、54 個 submission text rules、9 個 inventory rules 與 Pages audit 都可重跑；自動門檻仍不取代申請者聲明、輔具與實機驗收。
- 本文件優先記錄目前可重現事實；過去 browser／Lighthouse 結果標成歷史本機證據，不把它們當作 production 或目前 HEAD 的 field evidence。

## 2026-07-26 最新 branch 與最終驗證

| 面向 | 目前 source 狀態 |
| --- | --- |
| IA | `App.jsx` 已組成上述 11 個主要閱讀段落；桌面與行動導覽目前指向問題意識、Web Audio、Pure Data、研究構想、代表作品與學習路線。 |
| 證據資料 | 新增 `src/data/admission-evidence.js` 與 `src/components/AdmissionEvidenceSections.jsx`，集中管理 Pure Data、兩件代表作品、合作事件、四階段學習路線與外部連結。 |
| Pure Data 媒體 | `pd-crossmodal-mapping-v0.2.1-operation-demo.mp4` 與同名 poster 已由公開頁實際引用；狀態固定為「學習中／可操作功能原型」「尚待驗證」，不等同獨立作者性、使用者驗證或研究驗證。 |
| 研究定位 | `ResearchProposalSection` 以問題／初步構想／可帶入能力／入學後需補強四層呈現混合監聽研究；完整研究計畫仍留在非公開工作區，網站沒有下載連結。 |
| 公開邊界 | `public/` 影片與 poster 會被 Vite 複製並可公開存取；`.pd`、完整研究計畫、REAPER 工程與兩件代表作品成片均未放入公開 repository。Tracked source 與文件若 commit／push 到 public repository 也會公開，submission alias 不能提供保密。Metadata 與 canonical 已完成。 |
| 自動驗證 | `pnpm run doctor` exit 0；draft 470 modules、submission 467 modules；fresh `dist/` 132 files／25 text files；118 個 `public/` files 為 0 missing／0 SHA-256 mismatch；scanner 為 54 text／9 inventory rules，fixtures 58/58。 |
| Publication | 蕭智仁已於 2026-07-26 完成 applicant attestation；`pnpm run check:publication` exit 0，manifest 為 `verified / approved`。原始八幕生成紀錄、原始 EML 與可編輯 Canva 專案仍未找到。 |
| Browser | 1280×720、768×1024、375×812、320×568 已核對 confirmed disclosure、Suno focus、40 秒影片 keyboard play／pause、8 幕、2 tracks 與 responsive width；待本人確認、舊權利卡片、duplicate ID、broken case target、global overflow 與 clean-tab console error 均為 0。 |

## 2026-07-24 Admission Evidence Pass 歷史快照（上述整合前）

| 面向 | 現況 |
| --- | --- |
| Source／IA | 當時新增 standalone 研究構想與 `#research-proposal`；此順序已被上方 11 段 IA 取代。 |
| 證據狀態 | 當時 Web Audio 為 `可操作原型／尚待驗證`，Pure Data／REAPER 僅列 `學習中`，且《畫本》與 MV remix 尚未加入；此列不是最新 source 狀態。 |
| 公開邊界 | GitHub Repository 已確認為 public；tracked hidden／internal／prompts 不因 submission alias 而保密。新 `docs/admission/*` 目前只在本機 working tree。 |
| Release | 本輪沒有 stage、commit、push、PR、deploy、visibility 或 history 變更。Hamlet publication gate 保持阻擋。 |
| 驗證 | 當時曾有自動門檻與兩個 viewport 的通過紀錄；其 scanner、build、public inventory 與 Browser 結果均已被上方最新狀態取代，不可作為目前結論。Hamlet publication gate 當時亦未解除。 |

## 2026-07-23 交付快照（歷史）

| 面向 | 已驗證現況 |
| --- | --- |
| 本機 Git | `codex/public-copy-rewrite` HEAD `61ea9d8`，與同名 `origin` 同步；開始本次文件更新前工作樹乾淨。其檔案樹與 `main`／`origin/main` 的 `695b520` 相同，但 squash／merge 後的 commit lineage 不同。 |
| Pull requests | GitHub PR #1–#5 均已 merged；PR #5 `caption adjust` 於 2026-07-19 合併。下一輪不可把目前已合併的 branch／PR 當成仍可更新的工作項。 |
| Actions／Pages | `695b520` 的 Pages workflow run `29680534295` 於 2026-07-19 成功；deployment environment 指向公開 GitHub Pages URL。2026-07-23 首頁與 production JS 實測 HTTP 200，bundle 含新版首頁介紹與 AI 區標題，舊介紹句不存在。本輪未能透過未認證 Pages-site endpoint 重新取得 `built` 欄位，不以舊 API 快照代替現行確認。 |
| Publication gate | Hamlet `rightsReview.status` 仍為 `unverified`、`rightsManifestPresent` 為 `false`；影片、英文與繁中 VTT、poster 於 2026-07-23 仍各自 HTTP 200。部署 workflow 只執行 `check:submission`，不執行 `check:publication`，因此「部署成功」不能視為「發布權利已核准」。此仍是最高優先差距。 |
| 本次打包範圍 | 只更新 Markdown 交接文件；未修改應用程式、內容資料、媒體、workflow 或 runtime 行為。 |

## 文件邊界

- 目前只有 `/` 的 Vite SPA；所有導覽都是同頁 hash anchor，沒有獨立案例 route。
- submission mode 渲染 4 件案例；`immersive-memory-map` 的完整文字位於 `portfolio.hidden.js`，submission alias 解析為空模組，內部施工備註另在 `portfolio.internal.js`。
- hidden case 使用空 media state；13 個專用 `ph-after-*`／`mv-soft-*` placeholder 與 generator entries 已移除。submission dev 的舊 URL 為 404，restricted／internal／historical artifact 路徑由 filesystem deny 阻擋。
- 案例與首頁敘事以 [`../../src/data/portfolio.js`](../../src/data/portfolio.js) 為 source of truth；Pure Data／代表作品／合作／學習路線／連結、研究構想與 AI／作者性分別在 [`../../src/data/admission-evidence.js`](../../src/data/admission-evidence.js)、[`../../src/data/admission-research.js`](../../src/data/admission-research.js)、[`../../src/data/ai-workflow.js`](../../src/data/ai-workflow.js)；施工備註只放 [`../../src/data/portfolio.internal.js`](../../src/data/portfolio.internal.js)。
- Power BI 原始資料、清洗檔、儀表板與實際結果影像不屬於 public 或 build input；公開頁只使用不含資料值的概念化 SVG。
- 沒有 CMS、backend、database、authentication、analytics 或表單。GitHub Pages workflow 會在 push 到 `main` 或手動觸發時執行；相對 base、Pages audit、成功遠端 run 與公開 Pages URL 已確認，沒有 custom domain。
- Git repository、`origin`、`main` 與 `codex/public-copy-rewrite` 已確認；PR #1–#5 均已合併。續作應建立新的 `codex/` branch／PR，不再沿用 PR #5。
- 既有 browser artifacts 記錄 320、375、768、1024、1280、1440 寬的 smoke test、行動導覽焦點、聲音逾時 fallback 與自訂游標邊界。未宣稱完成 screen reader、真實 200% zoom、system reduced-motion、實機或 production 驗證。
- 既有 browser artifacts 都是舊 source／IA 的歷史資料；2026-07-26 Phase B 的四 viewport smoke 另記在上方，但仍不取代 screen reader、真實 zoom、system reduced-motion、實機或 production field 驗收。
- `public/llms.txt`、favicon、social preview、index／JSON-LD 與案例 SEO 已統一為 RU / YUAN；scanner 會攔截施工字詞、舊品牌、失效 anchors、hidden/restricted filenames 與 raw data extensions。

## 關鍵來源

- 入口與頁面組合：[`../../src/main.jsx`](../../src/main.jsx)、[`../../src/App.jsx`](../../src/App.jsx)
- 公開內容：[`../../src/data/portfolio.js`](../../src/data/portfolio.js)
- 申請證據資料與 renderer：[`../../src/data/admission-evidence.js`](../../src/data/admission-evidence.js)、[`../../src/components/AdmissionEvidenceSections.jsx`](../../src/components/AdmissionEvidenceSections.jsx)
- 研究構想：[`../../src/data/admission-research.js`](../../src/data/admission-research.js)、[`../../src/components/ResearchProposalSection.jsx`](../../src/components/ResearchProposalSection.jsx)
- Hidden draft data：[`../../src/data/portfolio.hidden.js`](../../src/data/portfolio.hidden.js)
- 旗艦互動：[`../../src/components/SoundInteractionPrototype.jsx`](../../src/components/SoundInteractionPrototype.jsx)、[`../../src/hooks/useWebAudioEngine.js`](../../src/hooks/useWebAudioEngine.js)
- 案例 renderer：[`../../src/components/CaseStudyShowcase.jsx`](../../src/components/CaseStudyShowcase.jsx)
- 設計系統：[`../../src/styles.css`](../../src/styles.css)
- 模式與建置：[`../../vite.config.js`](../../vite.config.js)、[`../../package.json`](../../package.json)
- Submission 檢查：[`../../scripts/scan-submission-output.mjs`](../../scripts/scan-submission-output.mjs)、[`../../scripts/audit-pages-build.mjs`](../../scripts/audit-pages-build.mjs)
- 公開 metadata：[`../../public/llms.txt`](../../public/llms.txt)、[`../../public/favicon.svg`](../../public/favicon.svg)、[`../../index.html`](../../index.html)
- 既有規範：[`../content-governance.md`](../content-governance.md)、[`../portfolio-display-research.md`](../portfolio-display-research.md)、[`../visual-system.md`](../visual-system.md)、[`../chinese-visual-system.md`](../chinese-visual-system.md)
