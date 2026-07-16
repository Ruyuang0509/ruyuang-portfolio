# 網站交接文件

本目錄是「如願個人網站」的產品、內容、設計與技術交接入口。內容依 2026-07-16 repository 現況整理；已驗證事實、推論與待確認事項分開標示。

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
| [../ai-workflow/README.md](../ai-workflow/README.md) | Prompt 版本、失敗案例與人機責任邊界 |

## 一句話產品定義

這是一個以繁體中文為主、面向研究所審查的聲響科技研究型作品集：以可操作的原生 Web Audio 視聽映射原型為旗艦證據，再用生成式 AI 介面與資料視覺化案例支撐「聲音 × 互動 × 數位學習」研究方向。

## 文件邊界

- 目前只有 `/` 的 Vite SPA；所有導覽都是同頁 hash anchor，沒有獨立案例 route。
- submission mode 公開 4 件案例；`immersive-memory-map` 是 draft-only 隱藏研究構想，不進正式資料集或畫面。
- 公開內容以 [`../../src/data/portfolio.js`](../../src/data/portfolio.js) 為 source of truth；施工備註只放 [`../../src/data/portfolio.internal.js`](../../src/data/portfolio.internal.js)。
- Power BI 原始截圖位於 `restricted-media/`，不是 public 或 build input；公開頁只使用概念化 SVG。
- 沒有 CMS、backend、database、authentication、analytics 或表單。已加入 manual-only GitHub Pages workflow 與相對 base，但尚未 push、遠端執行或 production deploy。
- workspace root 沒有可用的 Git repository，因此無法從 Git history 確認演進意圖或產生正式 diff。
- 本次以內建瀏覽器連線本機 submission server，完成 320、375、768、1024、1280、1440 寬的 rendered smoke test、行動導覽焦點、聲音逾時 fallback 與自訂游標邊界驗證。未宣稱完成 screen reader、真實 200% zoom、system reduced-motion 或實機驗證。

## 關鍵來源

- 入口與頁面組合：[`../../src/main.jsx`](../../src/main.jsx)、[`../../src/App.jsx`](../../src/App.jsx)
- 公開內容：[`../../src/data/portfolio.js`](../../src/data/portfolio.js)
- 旗艦互動：[`../../src/components/SoundInteractionPrototype.jsx`](../../src/components/SoundInteractionPrototype.jsx)、[`../../src/hooks/useWebAudioEngine.js`](../../src/hooks/useWebAudioEngine.js)
- 案例 renderer：[`../../src/components/CaseStudyShowcase.jsx`](../../src/components/CaseStudyShowcase.jsx)
- 設計系統：[`../../src/styles.css`](../../src/styles.css)
- 模式與建置：[`../../vite.config.js`](../../vite.config.js)、[`../../package.json`](../../package.json)
- 既有規範：[`../content-governance.md`](../content-governance.md)、[`../portfolio-display-research.md`](../portfolio-display-research.md)、[`../visual-system.md`](../visual-system.md)、[`../chinese-visual-system.md`](../chinese-visual-system.md)
