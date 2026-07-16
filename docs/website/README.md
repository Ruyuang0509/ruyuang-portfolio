# 網站交接文件

本目錄是「如願個人網站」的產品、內容、設計與技術交接入口。內容依 2026-07-17 repository 現況整理；已驗證事實、推論與待確認事項分開標示。

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

## 一句話產品定義

這是一個以繁體中文為主、面向研究所審查的聲響科技研究型作品集：以可操作的原生 Web Audio 視聽映射原型為旗艦證據，再用 AI 文學故事 MV 與資料視覺化案例支撐「聲音 × 互動 × 數位學習」研究方向。

## 文件狀態與可信度

- 本文件包採多檔結構，因產品敘事、內容治理、Web Audio、R3F、視覺系統、submission 邊界與延續開發已超過單一文件容易維護的範圍。
- 2026-07-17 完成 hidden asset、scanner 與 metadata closure；仍把自動門檻、獨立 `dist/` 稽核及人工驗收分開記錄。
- 內建 workspace、media、text、CJK、content、sound、32 個 scanner regression tests、submission text／inventory scan 與 Pages audit 都可重跑；自動門檻仍不取代授權、輔具與實機驗收。
- 本文件優先記錄目前可重現事實；過去 browser／Lighthouse 結果標成歷史本機證據，不把它們當作 production 或目前 HEAD 的 field evidence。

## 文件邊界

- 目前只有 `/` 的 Vite SPA；所有導覽都是同頁 hash anchor，沒有獨立案例 route。
- submission mode 渲染 4 件案例；`immersive-memory-map` 的完整文字位於 `portfolio.hidden.js`，submission alias 解析為空模組，內部施工備註另在 `portfolio.internal.js`。
- hidden case 使用空 media state；13 個專用 `ph-after-*`／`mv-soft-*` placeholder 與 generator entries 已移除。submission dev 的舊 URL 為 404，restricted／internal／historical artifact 路徑由 filesystem deny 阻擋。
- 公開內容以 [`../../src/data/portfolio.js`](../../src/data/portfolio.js) 為 source of truth；施工備註只放 [`../../src/data/portfolio.internal.js`](../../src/data/portfolio.internal.js)。
- Power BI 原始資料、清洗檔、儀表板與實際結果影像不屬於 public 或 build input；公開頁只使用不含資料值的概念化 SVG。
- 沒有 CMS、backend、database、authentication、analytics 或表單。manual-only GitHub Pages workflow、相對 base 與 Pages audit 已在 tracked feature branch；尚無可確認的遠端 workflow run、production Pages URL 或 custom domain。
- Git repository、`origin`、`main`、`feat/portfolio-admission-foundation` 與既有 Draft PR #1 已確認；續作不可重複初始化 repository 或建立重複 PR。
- 既有 browser artifacts 記錄 320、375、768、1024、1280、1440 寬的 smoke test、行動導覽焦點、聲音逾時 fallback 與自訂游標邊界。未宣稱完成 screen reader、真實 200% zoom、system reduced-motion、實機或 production 驗證。
- `public/llms.txt`、favicon、social preview、index／JSON-LD 與案例 SEO 已統一為 RU / YUAN；scanner 會攔截施工字詞、舊品牌、失效 anchors、hidden/restricted filenames 與 raw data extensions。

## 關鍵來源

- 入口與頁面組合：[`../../src/main.jsx`](../../src/main.jsx)、[`../../src/App.jsx`](../../src/App.jsx)
- 公開內容：[`../../src/data/portfolio.js`](../../src/data/portfolio.js)
- Hidden draft data：[`../../src/data/portfolio.hidden.js`](../../src/data/portfolio.hidden.js)
- 旗艦互動：[`../../src/components/SoundInteractionPrototype.jsx`](../../src/components/SoundInteractionPrototype.jsx)、[`../../src/hooks/useWebAudioEngine.js`](../../src/hooks/useWebAudioEngine.js)
- 案例 renderer：[`../../src/components/CaseStudyShowcase.jsx`](../../src/components/CaseStudyShowcase.jsx)
- 設計系統：[`../../src/styles.css`](../../src/styles.css)
- 模式與建置：[`../../vite.config.js`](../../vite.config.js)、[`../../package.json`](../../package.json)
- Submission 檢查：[`../../scripts/scan-submission-output.mjs`](../../scripts/scan-submission-output.mjs)、[`../../scripts/audit-pages-build.mjs`](../../scripts/audit-pages-build.mjs)
- 公開 metadata：[`../../public/llms.txt`](../../public/llms.txt)、[`../../public/favicon.svg`](../../public/favicon.svg)、[`../../index.html`](../../index.html)
- 既有規範：[`../content-governance.md`](../content-governance.md)、[`../portfolio-display-research.md`](../portfolio-display-research.md)、[`../visual-system.md`](../visual-system.md)、[`../chinese-visual-system.md`](../chinese-visual-system.md)
