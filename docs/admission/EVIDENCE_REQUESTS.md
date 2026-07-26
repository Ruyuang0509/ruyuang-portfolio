# Admission Evidence Requests

## 2026-07-26 Hamlet update

- Suno〈Blinds-Soft Lament〉特定非營利用途的官方回覆摘要、Song ID、00:00–00:40、限制與 supplied SHA 已進 public rights registry；原始 EML 本輪未找到，仍不得進 public Git。
- 可核對的原始八幕 ChatGPT／OpenAI 生成紀錄為 0；reference image 與特定電影／演員複製的 absence 不能由搜尋空結果推定。
- Canva stock／template inventory 未找到；文學現代來源排除與 Canva absence 均需申請者本人確認。
- Attestation 草稿在 `docs/evidence/hamlet-applicant-attestation.md`，目前未簽。只有收到本人明確確認後才可填姓名、日期並解除 gate。

更新日期：2026-07-24

這份清單列出正式送審前仍需由申請者提供或核准的真實證據。建議先存放於 public Repository 之外的 private workbench；完成內容、權利與個資檢查後，再決定哪些衍生版本可進網站。

## P0｜權利與公開決策

### Hamlet

- `hamlet/rights/scene-images-source-and-terms-2026-07-24.pdf`
- `hamlet/rights/suno-project-or-download-record-2026-07-24.pdf`
- `hamlet/rights/literary-source-edition-and-adaptation-note.md`
- `hamlet/rights/canva-project-source-review-2026-07-24.pdf`
- `hamlet/rights/applicant-publication-attestation-2026-07-24.pdf`

每一項都需記錄來源、工具／方案、適用條款、credit、公開展示範圍與可追溯 evidence reference。申請者 attestation 不得由 AI 代填或代簽。

### Repository 與聯絡資料

- `application/public-repository-scope-decision.md`
- `application/public-contact-scope-decision.md`
- `application/cv-review-copy.pdf`

需由申請者決定完整 prompts、hidden／internal notes、研究草稿、Email、履歷與社群是否公開；不能以不渲染或 alias 代替決策。

## P1｜Pure Data

開始日期：2026/07/24。

### 已有真實證據

- 原始 `v0.2.1.mp4` 已找到並檢查：62.983 秒、1276×720、H.264 影片、AAC 立體聲音訊。
- 網站已以描述性檔名整合：
  - `public/media/portfolio/pd-crossmodal-mapping-v0.2.1-operation-demo.mp4`
  - `public/media/portfolio/pd-crossmodal-mapping-v0.2.1-operation-demo-poster.png`
- 私人工作區另有 v0.2.1 Patch／ZIP 與版本紀錄；目前沒有搬入 public Repository。

### Revised Pure Data portfolio video

- **Expected filename**：`pd-crossmodal-mapping-v0.2.1-portfolio-demo.mp4`
- **Suggested destination**：`public/media/portfolio/pd-crossmodal-mapping-v0.2.1-portfolio-demo.mp4`
- **Required content**：
  - 1920×1080、完整介面框取。
  - 標題列不顯示本機路徑。
  - 介面與旁白／字幕統一使用「本機功能測試」，不使用 `validated`。
  - 依序標示水平→聲像、垂直→音高、速度→濾波、大小→增益與 Panic。
  - 放大一條可由申請者逐物件說明的訊號路徑。
  - 明載輸入為模擬視覺參數，不是攝影機手勢辨識。
  - 明載初版 AI 協作、目前可解釋範圍與限制。
  - 片長約 60–70 秒。
- **Current status**：原始功能紀錄已公開整合，但含本機路徑、`validated`、右側標籤／下方 Patch 裁切與未分段畫面；新版尚未完成。

### Actual `.pd` Patch and independent rebuild

- **Expected filename**：`ruyuan-crossmodal-mapping-v0.3-independent-rebuild.pd`
- **Suggested destination**：先放 private workbench；通過作者性、版本、授權與本機重驗後，再決定是否建立 public 衍生版本。
- **Required content**：
  - 可由申請者逐物件說明的最小輸入、處理與輸出。
  - 初版 AI 協作內容與本人重建差異。
  - 一項具體錯誤、診斷、修正與重驗。
  - 相符的 README、manifest、版本字樣與本機環境紀錄。
  - 不使用跨裝置、使用性或學術驗證語氣。
- **Current status**：私人工作區的 v0.2.1 文件過度使用 `validated`／`confirmed by user`，沒有 AI 協作揭露或 LICENSE；v0.2.2 外層版本與內部紀錄不一致，兩者皆不適合原樣公開。

### Supporting learning records

- `pure-data/2026-07-24/signal-flow.md`
- `pure-data/2026-07-24/ai-collaboration-and-authorship.md`
- `pure-data/2026-07-24/failure-and-rebuild-log.md`
- `pure-data/2026-07-24/video-caption-and-transcript-review.md`

這些紀錄需說明哪些部分能自行解釋／重建、哪些仍需學習；在獨立重建完成前，公開狀態維持「學習中／可操作功能原型」。

## P1｜REAPER

目前狀態：已安裝，尚未開始系統性練習，尚未形成可公開作品。

建議最小練習：

- 60 秒原創聲音場景。
- 3 至 5 個自錄聲音、至少 5 軌。
- 剪輯、淡入淡出、基本增益平衡、EQ、Reverb 與 Pan Automation。
- 處理前後 A/B、路由截圖、一項失敗與修正紀錄。

建議證據檔：

- `reaper/01-source/ruyuan-60s-original-sound-scene-v01.rpp`
- `reaper/02-recordings/source-01.wav` 至 `source-05.wav`
- `reaper/03-captures/routing-overview.png`
- `reaper/03-captures/mixer-and-fx-chain.png`
- `reaper/04-exports/ruyuan-60s-sound-scene-dry.wav`
- `reaper/04-exports/ruyuan-60s-sound-scene-processed.wav`
- `reaper/05-notes/practice-log.md`
- `reaper/05-notes/failure-and-fix.md`
- `reaper/05-notes/recording-rights-and-consent.md`

## P1｜Web Audio

- `web-audio/web-audio-crossmodal-prototype-operation.mp4`
- `web-audio/web-audio-signal-flow-v01.svg`
- `web-audio/authorship-and-code-walkthrough.md`
- `web-audio/browser-device-manual-matrix.md`
- `web-audio/formative-test-protocol-v01.md`

形成性測試可觀察：

- 不先解釋映射時，使用者如何描述左右、高低、音色與音量變化。
- 短任務的完成情形、操作錯誤與口述理解。
- 鍵盤、觸控、滑鼠與 reduced-motion 下的操作差異。

測試執行前不填人數、結果、引言、正確率或學習成效。

## P1｜代表作品

### 《畫本》

- `huaben/huaben-master.mp4`
- `huaben/huaben-project-timeline-or-editing-screenshot.png`
- `huaben/authorship-role-and-credit.md`
- `huaben/original-materials-and-rights.md`
- `huaben/production-date-and-course-context.md`

需核對原創短劇、故事構思、攝影、剪輯、自主學習與影音節奏；不得補寫未提供的得獎或觀眾數據。

### MV 混剪

- `mv-remix/mv-remix-review-copy.mp4`
- `mv-remix/source-cue-sheet.md`
- `mv-remix/rights-and-attribution-ledger.md`
- `mv-remix/course-or-noncommercial-context.md`
- `mv-remix/applicant-editing-role.md`

需明示第三方角色、影像與音樂屬原權利人；申請者角色限於可核對的選曲、取材、素材篩選與剪輯。未取得公開權利時，不放入 `public/`。

## P2｜研究構想與申請資料

- 私人工作區已有完整研究計畫 DOCX 草案；目前不建立公開下載連結。
- `research/hybrid-monitoring-research-concept-review-copy-v02.docx`
- `research/hybrid-monitoring-research-concept-public-summary-v02.pdf`
- `research/references-and-open-questions.md`
- `research/equipment-assumptions-and-limitations.md`
- `application/verified-profile-and-graduation-facts.md`
- `application/116-program-name-and-submission-format-verification.md`

現有 DOCX 含完整申請策略、規劃樣本、預算、倫理與未獨立核對文獻，文件 metadata 日期亦與實際檔案時間不一致。公開前需由申請者核對引文、設備、樣本、預算、倫理、正式系所名稱與 metadata；研究文件必須標為「申請階段研究構想」，並保留配置、渲染、樣本數、量測程序、場地設備、先導實驗與指導方向仍可調整的邊界。
