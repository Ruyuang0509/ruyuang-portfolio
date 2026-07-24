# AI-Assisted Development Workflow

本資料夾記錄作品集建置時的生成式 AI 協作方法。它是開發證據，不是獨立藝術作品，也不代表申請者訓練、微調或部署了大型語言模型。

公開摘要由 `src/data/ai-workflow.js` 提供，並在 11 段送審 IA 的
`#ai-workflow` 區段以 lazy-loaded component 顯示。它位於作品、
研究構想、合作證據與學習路線之後，保持可見但不取代 Web Audio 或
Pure Data 的實作證據。

## 作者責任

- 作品事實、選件、研究主張、視覺方向與公開邊界由申請者決定。
- AI 可協助程式草稿、結構整理、除錯線索與重複檢查。
- 每項完成聲明必須有 source、command、build、browser 或其他可重現證據。
- 不以 AI 產出填補不存在的作品、測試結果、技術熟練度或研究結論。

公開頁固定分成三組：

- **AI 協助：** 程式草稿、Pure Data 初版協作、除錯線索、文件結構與稽核整理。
- **申請者負責：** 作品事實、研究方向、視覺與媒體選擇、公開取捨、功能操作、驗收與最終判斷。
- **申請者尚需補強：** Pure Data 獨立重建、REAPER 工程與輸出、使用者測試、聲學量測與研究方法。

Pure Data 初版 Patch 可以執行，不等於申請者已能獨立解釋或重建。
目前公開的 v0.2.1 影片只作「本機功能測試」與逆向拆解紀錄；
`validated` 介面文字、AI 協作、可見本機路徑與未完成重建都必須保留揭露。

## 文件

- `portfolio-master-prompt.md`：初版完整主提示詞。
- `portfolio-continuation-prompt.md`：後續工作階段使用的完整續作提示詞。
- `prompt-changelog.md`：提示詞 v1／v2／v3 與控制邊界。
- `failure-cases.md`：公開可說明的失敗、診斷、修正與驗證。

目前公開摘要保留三條完整失敗鏈：

1. GitHub Pages 專案子路徑造成資產錯誤。
2. Web Audio 不支援環境曾顯示成一般停止狀態。
3. AI 產生的 Pure Data 結構超出申請者當下理解能力。

每案都要保留問題、發現、診斷、檢查、修正與學習；不能只留下「AI
幫忙修好」的結論。

公開網站只摘要方法與代表案例。Repository 保留 v1／v2 完整文字與 v3
changelog；v3 的完整任務文字來自本輪外部附件，未複製進公開
Repository。Repository 本身是 public，因此完整 prompts、failure logs
與後續加入的 AI 紀錄在 commit／push 前仍需逐檔判斷公開範圍；未渲染於
網站不等於私密。
