# 網站交接文件

本目錄是「如願個人網站」的產品、內容、設計與技術交接入口。內容整合 2026-07-26 Hamlet rights／attestation 與公開展示版 source：已驗證事實、limited-use 權利聲明、public／audit 責任、研究構想、學習中內容、尚待驗證項目與待補件分開標示。最新整合的 install／`doctor`、submission／publication gates 與四 viewport Browser QA 均通過；manifest 為 `verified / approved`。原始八幕生成紀錄、原始 EML、可編輯 Canva 專案、第三方 YouTube 完整 rights／credit 與研究／學習成效仍未獨立驗證，Draft PR 也不等於已部署或發布核准。

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
| [../admission/ADMISSION_RESTRUCTURE_PLAN.md](../admission/ADMISSION_RESTRUCTURE_PLAN.md) | 重構前基準、已採用 11 段 IA 與證據缺口 |
| [../admission/COPY_AND_CLAIMS_AUDIT.md](../admission/COPY_AND_CLAIMS_AUDIT.md) | 公開文案、能力主張與不可延伸結論稽核 |
| [../admission/EVIDENCE_REQUESTS.md](../admission/EVIDENCE_REQUESTS.md) | 需由申請者補交的檔名、內容與最低標準 |
| [../admission/PUBLICATION_BOUNDARY_AUDIT.md](../admission/PUBLICATION_BOUNDARY_AUDIT.md) | public／private／tracked source 與發布權利邊界 |

## 一句話產品定義

公開頁是一份蕭智仁的 116 學年度繁體中文研究所申請作品集：從數位學習與視覺敘事背景出發，以可操作的 Web Audio 跨模態映射原型作為目前聲音證據，誠實標示 Pure Data／REAPER 學習邊界，再提出混合多聲道監聽與視覺化校準的申請階段研究構想。使用者指定國立臺南藝術大學為送審目標，但校名未寫入目前公開頁，正式系所名稱與簡章要求仍待 stakeholder 以官方資料核對。

## 文件狀態與可信度

- 本文件包採多檔結構，因產品敘事、內容治理、Web Audio、R3F、視覺系統、submission 邊界與延續開發已超過單一文件容易維護的範圍。
- 最新 IA 以 11 個主要閱讀段落組成：Hero → 轉向聲音的問題意識 → 證據導覽 → Web Audio 旗艦原型 → Pure Data 學習紀錄 → 申請階段研究構想 → 代表作品與其他公開案例 → 專案與合作 → 學習路線 → AI／作者性 → 研究方向與連結。資料視覺化系列與支持案例索引是「代表作品與其他公開案例」內的延伸閱讀，不另計為主段落。原有視覺 token、R3F、聲音互動、卡片、游標與捲動動效均保留。
- Public narrative 與 audit records 依 stable ID 分層；audit data 只由 Draft panel 動態載入。REAPER 公開 roadmap 已改為「下一階段」，print 也會將深色 reading surface 重設為可讀紙色。
- 《畫本》與《希望有羽毛和翅膀》MV 混剪已依申請者提供的作品事實加入精簡公開卡片與經確認的 canonical YouTube 作品入口；不推測成績、觀看成效或第三方素材所有權，並分別標示待補 credit、活動／課程紀錄、來源與完整權利 artifact。
- Pure Data v0.2.1 本機功能測試已透過 `admission-evidence.js` 與 `AdmissionEvidenceSections.jsx` 整合為公開影片、poster、觀看指南、可證明／不能證明、AI 協作、權利與下一步。影片與 poster 已在 `public/`，兩者畫面仍可見本機 D 槽路徑與 `validated` 字樣；這是目前公開風險，不可因頁面文案改稱「本機功能測試」就視為已消除。
- 研究構想由 `admission-research.js` 的四層資料驅動：問題、初步構想、申請者可帶入的能力、入學後需補強；另列預定流程、預期貢獻與不可省略的申請階段聲明。
- Hidden asset、scanner、metadata、canonical 與 fail-closed publication workflow 已完成；Pages run `30087568225` 只代表 PR #6 的歷史部署。自動門檻、獨立 `dist/` 稽核、production HTTP 與人工／Browser 驗收分開記錄。
- 最新整合為 sound 18/18、rights 14/14、scanner 73/73；submission scan 132 files／25 text files、67 text rules／9 inventory rules，118 public files 0 missing／0 SHA-256 mismatch。
- 本文件優先記錄目前可重現的 source／artifact 事實；過去 build／Browser／Lighthouse 結果仍標成具名歷史證據，不把 Draft PR 的本機通過當作 production field evidence。

## 2026-07-26 整合中 source 與驗證邊界

| 面向 | 目前 source 狀態 |
| --- | --- |
| IA | `App.jsx` 已組成上述 11 個主要閱讀段落；桌面與行動導覽目前指向問題意識、Web Audio、Pure Data、研究構想、代表作品與學習路線。 |
| 證據資料 | `src/data/admission-evidence.js` 保存 public narrative；`src/data/admission-evidence.audit.js` 依 stable ID 保存 evidence／validation／rights／limitations／requests。`src/components/AdmissionEvidenceSections.jsx` 只依賴 public module，其同一 dynamic import 提供 Pure Data、代表作品、secondary creation、合作、四階段學習路線與外部連結 6 個 exports。研究構想與 AI／作者性各有獨立 lazy chunk。 |
| Pure Data 媒體 | `pd-crossmodal-mapping-v0.2.1-operation-demo.mp4` 與同名 poster 已由公開頁實際引用；狀態固定為「學習中／可操作功能原型」「尚待驗證」，不等同獨立作者性、使用者驗證或研究驗證。 |
| 研究定位 | `ResearchProposalSection` 以問題／初步構想／可帶入能力／入學後需補強四層呈現混合監聽研究；完整研究計畫仍留在非公開工作區，網站沒有下載連結。 |
| Git／Pages | PR #1–#7 均已 merged；本輪 Draft PR #9 已從最新 `main` 整合公開展示版與 PR #7 rights 基線，GitHub 回報 mergeable；PR #8 保持原衝突狀態。Pages run `30087568225` 是 PR #6 歷史部署；Draft PR 尚未 merge／deploy，不能視為 production publication approval。 |
| 公開邊界 | `public/` 影片與 poster 會被 Vite 複製並可公開存取；admission public／audit source 與 `docs/admission/*` 在 public Git 中也可讀。`.pd`、完整研究計畫、REAPER 工程與 private originals 未放入 public；兩件代表作品以 canonical YouTube URL 連出。Submission alias 不能提供 repository 保密。Metadata 與 canonical 已完成。 |
| 自動驗證 | Install／`doctor` exit 0；draft 471 modules、entry 180733 B、CSS 44315 B、initial JS gzip 200889 B；submission 467 modules、entry 153704 B、CSS 44315 B、initial JS gzip 192936 B。Sound 18/18、rights 14/14、scanner 73/73；132 files／25 text files、67 text／9 inventory rules，118 public files 0 missing／0 hash mismatch。 |
| Publication | 蕭智仁已完成 limited-use applicant attestation；最新整合 `check:publication` exit 0，manifest 為 `verified / approved`。原始八幕生成紀錄、原始 EML、可編輯 Canva 專案、第三方 YouTube 完整 rights／credit仍待核對。 |
| Browser | 1280×800、768×900、390×844、320×720：0 overflow、0 broken hashes、0 duplicate IDs、0 broken images、console 0 warning／0 error；四個 deep links約95–112 px，dark／paper endpoints與行動 menu Escape／還焦通過。Screen reader、真實 200% zoom、system reduced-motion、實機與多瀏覽器音訊未驗。 |
| Production HTTP | 本機整合與 gates 已通過，但 Draft PR 尚未 merge／deploy；production HTTP／field 狀態須發布後另行核對。可達不等於 limited-use 以外的權利、private-original 查驗或研究驗證。 |

## 2026-07-24 Admission Evidence Pass 歷史快照（上述整合前）

| 面向 | 現況 |
| --- | --- |
| Source／IA | 當時新增 standalone 研究構想與 `#research-proposal`；此順序已被上方 11 段 IA 取代。 |
| 證據狀態 | 當時 Web Audio 為 `可操作原型／尚待驗證`，Pure Data／REAPER 僅列 `學習中`，且《畫本》與 MV remix 尚未加入；此列不是最新 source 狀態。 |
| 公開邊界 | GitHub Repository 已確認為 public；tracked hidden／internal／prompts 不因 submission alias 而保密。這是當時快照；`docs/admission/*` 後來已隨 PR #6 進入 public `main`。 |
| Release | 本輪沒有 stage、commit、push、PR、deploy、visibility 或 history 變更。Hamlet publication gate 保持阻擋。 |
| 驗證 | 當時曾有自動門檻與兩個 viewport 的通過紀錄；其 scanner、build、public inventory 與 Browser 結果均已被上方最新狀態取代，不可作為目前結論。Hamlet publication gate 當時亦未解除。 |

## 2026-07-23 交付快照（歷史）

| 面向 | 已驗證現況 |
| --- | --- |
| 本機 Git | `codex/public-copy-rewrite` HEAD `61ea9d8`，與同名 `origin` 同步；開始本次文件更新前工作樹乾淨。其檔案樹與 `main`／`origin/main` 的 `695b520` 相同，但 squash／merge 後的 commit lineage 不同。 |
| Pull requests | GitHub PR #1–#5 均已 merged；PR #5 `caption adjust` 於 2026-07-19 合併。下一輪不可把目前已合併的 branch／PR 當成仍可更新的工作項。 |
| Actions／Pages | `695b520` 的 Pages workflow run `29680534295` 於 2026-07-19 成功；deployment environment 指向公開 GitHub Pages URL。2026-07-23 首頁與 production JS 實測 HTTP 200，bundle 含新版首頁介紹與 AI 區標題，舊介紹句不存在。本輪未能透過未認證 Pages-site endpoint 重新取得 `built` 欄位，不以舊 API 快照代替現行確認。 |
| Publication gate | Hamlet `rightsReview.status` 當時為 `unverified`、`rightsManifestPresent` 為 `false`；影片、英文與繁中 VTT、poster 於 2026-07-23 各自 HTTP 200。當時部署 workflow 只執行 `check:submission`，不執行 `check:publication`，因此「部署成功」不能視為「發布權利已核准」。此差距已由 2026-07-26 PR #7 limited-use attestation 與 fail-closed workflow 取代。 |
| 本次打包範圍 | 只更新 Markdown 交接文件；未修改應用程式、內容資料、媒體、workflow 或 runtime 行為。 |

## 文件邊界

- 目前只有 `/` 的 Vite SPA；所有導覽都是同頁 hash anchor，沒有獨立案例 route。
- submission mode 渲染 4 件案例；`immersive-memory-map` 的完整文字位於 `portfolio.hidden.js`，submission alias 解析為空模組，內部施工備註另在 `portfolio.internal.js`。
- hidden case 使用空 media state；13 個專用 `ph-after-*`／`mv-soft-*` placeholder 與 generator entries 已移除。submission dev 的舊 URL 為 404，restricted／internal／historical artifact 路徑由 filesystem deny 阻擋。
- 案例與首頁敘事以 [`../../src/data/portfolio.js`](../../src/data/portfolio.js) 為 source of truth；Pure Data／代表作品／合作／學習路線／連結的 public narrative 與 audit records 分別在 [`../../src/data/admission-evidence.js`](../../src/data/admission-evidence.js)、[`../../src/data/admission-evidence.audit.js`](../../src/data/admission-evidence.audit.js)，研究構想與 AI／作者性分別在 [`../../src/data/admission-research.js`](../../src/data/admission-research.js)、[`../../src/data/ai-workflow.js`](../../src/data/ai-workflow.js)；施工備註只放 [`../../src/data/portfolio.internal.js`](../../src/data/portfolio.internal.js)。
- Power BI 原始資料、清洗檔、儀表板與實際結果影像不屬於 public 或 build input；公開頁只使用不含資料值的概念化 SVG。
- 沒有 CMS、backend、database、authentication、analytics 或表單。GitHub Pages workflow 會在 push 到 `main` 或手動觸發時執行；相對 base、Pages audit、成功遠端 run 與公開 Pages URL 已確認，沒有 custom domain。
- Git repository、`origin` 與 `main` 已確認；PR #1–#7 均已合併，Draft PR #9 是目前整合工作且 GitHub 回報 mergeable；PR #8 維持原衝突狀態。自動與 Browser QA 已通過；Draft PR 仍不是 merge／deploy。
- 最新 Browser artifacts 已涵蓋四個 viewport、行動導覽、theme endpoints、deep links、overflow／IDs／images與console。未宣稱完成 screen reader、真實 200% zoom、system reduced-motion、實機、多瀏覽器音訊或 production-device 驗證。
- `index.html` title／OG／Twitter／JSON-LD 與 `llms.txt` 主標統一為「蕭智仁｜聲響、互動與數位學習作品集」；RU / YUAN 保留於 Navbar、`og:site_name`、favicon 與部分案例品牌。`llms.txt` 列完整 11 個高階 anchors；scanner 會攔截施工／audit 字詞、舊品牌、失效 anchors、hidden／restricted／private evidence filenames 與 raw data extensions。

## 關鍵來源

- 入口與頁面組合：[`../../src/main.jsx`](../../src/main.jsx)、[`../../src/App.jsx`](../../src/App.jsx)
- 公開內容：[`../../src/data/portfolio.js`](../../src/data/portfolio.js)
- 申請證據 public／audit 資料與 renderer：[`../../src/data/admission-evidence.js`](../../src/data/admission-evidence.js)、[`../../src/data/admission-evidence.audit.js`](../../src/data/admission-evidence.audit.js)、[`../../src/components/AdmissionEvidenceSections.jsx`](../../src/components/AdmissionEvidenceSections.jsx)
- 研究構想：[`../../src/data/admission-research.js`](../../src/data/admission-research.js)、[`../../src/components/ResearchProposalSection.jsx`](../../src/components/ResearchProposalSection.jsx)
- AI／作者性：[`../../src/data/ai-workflow.js`](../../src/data/ai-workflow.js)、[`../../src/components/AiWorkflowSection.jsx`](../../src/components/AiWorkflowSection.jsx)
- Hidden draft data：[`../../src/data/portfolio.hidden.js`](../../src/data/portfolio.hidden.js)
- 旗艦互動：[`../../src/components/SoundInteractionPrototype.jsx`](../../src/components/SoundInteractionPrototype.jsx)、[`../../src/hooks/useWebAudioEngine.js`](../../src/hooks/useWebAudioEngine.js)
- 案例 renderer：[`../../src/components/CaseStudyShowcase.jsx`](../../src/components/CaseStudyShowcase.jsx)
- 設計系統：[`../../src/styles.css`](../../src/styles.css)
- 模式與建置：[`../../vite.config.js`](../../vite.config.js)、[`../../package.json`](../../package.json)
- Submission 檢查：[`../../scripts/scan-submission-output.mjs`](../../scripts/scan-submission-output.mjs)、[`../../scripts/audit-pages-build.mjs`](../../scripts/audit-pages-build.mjs)
- 公開 metadata：[`../../public/llms.txt`](../../public/llms.txt)、[`../../public/favicon.svg`](../../public/favicon.svg)、[`../../index.html`](../../index.html)
- 既有規範：[`../content-governance.md`](../content-governance.md)、[`../portfolio-display-research.md`](../portfolio-display-research.md)、[`../visual-system.md`](../visual-system.md)、[`../chinese-visual-system.md`](../chinese-visual-system.md)
