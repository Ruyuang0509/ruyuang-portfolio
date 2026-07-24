# 目標呈現

## 2026-07-24 Admission Evidence Pass

目前 source 已把「已完成／可操作」、「學習中」、「研究構想／尚待驗證」與「待申請者補件」分開，並採用 11 段送審 IA：Hero → 聲音轉向 → 證據導覽 → Web Audio → Pure Data → 研究構想 → 代表作品 → 合作 → Roadmap → AI／作者性 → 真實外部連結。Pure Data、研究構想、代表作品、合作、Roadmap、AI 與 final links 置於永久 anchor wrapper 中 lazy-load；`#selected-work` 內依序放《畫本》、既有資料視覺化／公開案例、最後才是指定 MV。Current source 已通過 `doctor`、build、submission scanner 與獨立 `dist/` inventory；本輪仍未 commit、push 或 deploy。In-app Browser 因本機連線隔離無法連到 shell 已確認 HTTP 200 的 preview，因此 320–1440 rendered matrix 未能執行，不能標為通過。

## 2026-07-23 current-to-target 判讀

PR #5 已把自然、第一人稱的繁體中文敘事部署到 GitHub Pages，並保留原有資訊架構、互動、動效與真實性邊界。這是已落地的目標方向，不是推測；但 `check:publication` 仍以 11 個權利／attestation blockers exit 1，因此「線上可讀、媒體 HTTP 200」與「獲准正式公開」必須繼續分開描述。

## Confirmed goals（明文證據）

1. **聲音互動與空間監聽研究主線。** 最終網站要清楚回答申請者如何把視覺化、資訊架構與使用者理解方法帶入聲音互動，以及未來如何探索精簡揚聲器、開放式耳機混合監聽與視覺化校準。
2. **Web Audio 是目前旗艦證據。** 首屏 CTA 直接進入可操作原型，旗艦長文在支持作品前完整呈現。
3. **誠實區分學習與成果。** Web Audio 有可操作 artifact；Pure Data 有 v0.2.1 本機功能測試影片與 poster，但狀態仍是「學習中／可操作功能原型」「尚待驗證」，不能由影片推論成獨立 Patch 作者性、熟練度、手勢辨識、使用者驗證或正式研究系統。REAPER 仍未形成工程或聲音作品。
4. **研究構想不冒充驗證成果。** 混合監聽系統尚未建置；系統配置、樣本數、量測方式與技術細節仍需依研究所設備、課程訓練、指導教授建議與先導實驗調整。Testing 必須使用 `notValidated`／`exploratory`／`validated` 狀態；未驗證時只能列 planned methods，不可填入成果 metrics。
5. **公開資料安全。** Power BI 實作日期使用已確認值；原始資料、清洗檔、儀表板與實際結果 media 不進 public；探索關聯不能寫成因果。
6. **自然、第一人稱的繁中編輯式呈現。** 片語分行、合宜行高、暖紙墨色與研究檔案節奏是既定方向；公開文案應清楚寫出「我做了什麼、如何製作、目前做到什麼、還沒證明什麼」，避免模板化英語標籤或把團隊／工具貢獻寫成個人成果。
7. **動效是漸進增強，也是既定視覺身份。** Narrative guidance、interaction feedback 與 atmosphere／authorship motion 預設保留；R3F、smooth scroll、custom cursor 與音訊不能阻礙 DOM 閱讀。效能問題先以 paint area、transform／opacity、lazy／intersection、mobile／low-power 複雜度、更新頻率與 reduced-motion 回退處理，只有 profiling 證明實質問題時才移除並記錄替代互動。
8. **draft／submission 強隔離。** construction notes 與 hidden immersive case 不得進正式輸出。
9. **送審可驗證。** Formal output 必須通過 workspace、media、text、CJK、evidence、content、sound mapping／lifecycle、draft build 與 submission scan，並另做文字與資產 inventory 稽核。
10. **公開資產與 metadata 一致。** 所有位於 `public/` 的檔案都視為實際公開範圍，只有完成必要來源／公開決策並揭露限制的資產才應留在其中；favicon、`llms.txt`、robots、social preview、canonical、Open Graph、Twitter、JSON-LD 與頁面 anchors 必須與蕭智仁聲響、互動與數位學習作品集的 11 段 IA 一致。
11. **發布權利先於自動部署。** `check:submission` 證明建置邊界，`check:publication` 才代表 Hamlet 權利清單與申請者 attestation 完成；production workflow 不應繞過後者。
12. **作者角色與證據邊界可逐項追查。** 每件案例都要分開交代個人角色、工具／AI 的協助、公開 artifact、測試狀態、限制與缺失；媒體可播放或 build 通過都不能替代研究成效、來源或權利證據。
13. **Lazy loading 不破壞閱讀契約。** Admission evidence module 可延後載入，但每個 section 的 ID、heading、focus target、error fallback 與 hash settle 必須先存在；效能切割不能讓 direct link 或鍵盤閱讀失效。

來源：[`../../AGENTS.md`](../../AGENTS.md)、[`../portfolio-display-research.md`](../portfolio-display-research.md)、[`../content-governance.md`](../content-governance.md)、[`../visual-system.md`](../visual-system.md) 及現行應用組合。

## Strongly supported inferred goals

- **品牌印象：** 嚴謹、跨域、願意揭露限制，而且有可操作的技術證據；不是把「聲音」當抽象標籤。
- **理想審查旅程：** Hero 先交代身份與方向 → 聲音轉向說明問題意識 → 證據導覽依強度分流 → Web Audio 提供最強可操作證據 → Pure Data 顯示功能影片、AI 與學習限制 → 研究構想分四層 → 代表作品與既有案例支持跨域能力 → 合作事件與四階段 Roadmap → AI／作者性 → Portfolio／GitHub 真實出口。
- **成功行為：** 審查者能清楚辨識目前真正做成的東西、尚未完成的研究、個人角色及下一階段研究方向。
- **動作品質：** 3D 提供氛圍，聲音 mapping 提供核心互動；兩者都應平順、可停止、可回退且不搶走閱讀控制。
- **完成標準：** 不只 schema／畫面完整，還需要真實 participant evidence、Pure Data 公開安全重錄與獨立重建證據、REAPER artifact 或明確不納入、代表作品媒體／rights 決策、媒體字幕／描述與 production sharing setup。

以上為從 code、copy 與治理文件推論的產品意圖，不是已簽核 PRD。

## Assumptions requiring stakeholder confirmation

- 使用者已明確指定國立臺南藝術大學 116 學年度申請作品集；仍需由申請者核對當年度官方系所名稱、招生簡章、格式、截止日與所有送件欄位。本輪不以未核對的官方要求反推作品結論。
- 是否加入公開 Email、履歷、社群、作品下載或其他真正轉換；目前 `#contact` 只有可核對的 GitHub Pages 與 public Repository URL，沒有 Email／CV／社群或研究 PDF。
- Pure Data 現有 source-quality 功能影片最終是否由公開安全重錄取代、何時能補獨立重建；REAPER 是否要形成正式作品證據，或只作研究準備背景。
- AI 文學故事 MV 的成片、字幕與流程目前存在於 repository 且 Pages 可存取，但這只證明技術交付，不代表素材權利已獲核准；仍需由申請者完成權利／來源 attestation、補原始 Prompt 與學生／教師測試，再決定是否維持公開或提高策展比重。
- hidden `immersive-memory-map` 是否永久排除，還是待真實場域與觀眾證據補齊後恢復。
- Power BI 的清洗規則與 measure 定義何時可完成核對、能否另取得資料提供方公開許可，以及哪些原始畫面永遠不得公開。
- 是否需要每件案例獨立 route／SEO、英文版、PDF／print portfolio。
- 是否沿用目前 GitHub Pages、加入 custom domain、social preview raster、analytics 與 privacy policy；canonical 已使用現有 Pages project URL，custom domain 若改動須同步更新所有 metadata 與 final links。

## 理想完成畫面

正式 submission 頁面應讓文字命題先完成首屏，3D 在適合裝置安靜加入；第一個深度案例就是可操作的 Web Audio 原型，聲音只有在使用者主動啟用後播放，且隨時可停止。接續的 Pure Data 區段應讓影片、觀看指南、可證明／不能證明、作者性、權利、限制與下一步一起出現，不讓可播放影片變成過度能力主張。四層研究構想、文字型代表作品、合作事件與四階段 Roadmap 分別回答未來方向、跨域經驗與訓練缺口；AI 只作方法揭露。手機、鍵盤、reduced-motion、不支援音訊、低頻寬、lazy chunk 失敗與列印情境都應能完成閱讀。最後只提供真實、可執行且已確認公開的轉換。

## Production readiness gate

目標狀態不是「內建腳本 exit 0」，而是 current source、current artifact 與公開敘事三者一致：

- submission bundle、TXT／SVG metadata 與 binary asset inventory 都不含 draft-only／restricted material；
- `llms.txt`、favicon、social preview、robots、canonical／Open Graph／Twitter／JSON-LD、final links 與實際 11 anchors 使用同一品牌與 URL 模型；
- Lighthouse／browser evidence 可追溯到目前 source fingerprint，並與 production field evidence 分開；
- screen reader、真實 zoom、system reduced-motion、行動實機與多瀏覽器 Web Audio 有人工紀錄；
- 研究結果、授權、角色、credits、聯絡與申請資訊均由 stakeholder 確認，沒有 AI 代填或未驗證成效。

2026-07-24 current source 已完成 `doctor`（exit 0）、draft／submission build（470／467 modules）、57/57 scanner fixtures，以及 132-file submission `dist/` 對 118-file `public/` inventory 的 0 missing／0 hash mismatch 檢查。2026-07-23 Pages run `29680534295` 與 2026-07-17 Lighthouse 仍只代表更早的 deployed/source fingerprint；本輪沒有 commit、push、deploy 或 current-fingerprint Lighthouse。In-app Browser 的本機連線隔離讓 320–1440 rendered matrix 未能執行，不能以舊 smoke evidence補成通過。Hamlet 權利／attestation 仍未完成，`check:publication` 以 11 個 blockers exit 1；production workflow 未執行此 gate 的 policy gap 也仍需處理，線上可達性不能等同正式公開核准。
