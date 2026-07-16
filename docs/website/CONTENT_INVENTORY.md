# 公開內容清單

## 內容治理

公開文案、案例順序、媒體 metadata 與測試狀態的唯一來源是 [`../../src/data/portfolio.js`](../../src/data/portfolio.js)。施工／風險文字位於 [`../../src/data/portfolio.internal.js`](../../src/data/portfolio.internal.js)，正式內容不得複製其 wording。欄位契約見 [`../content-authoring.md`](../content-authoring.md)、[`../adding-portfolio-work.md`](../adding-portfolio-work.md) 與 [`../content-governance.md`](../content-governance.md)。

## 首頁與固定內容

- 品牌：`RU / YUAN`。
- Eyebrow：`Graduate Portfolio / Sound, Interaction & Learning`。
- 主標：`讓視覺成為聲音的入口，讓聲音成為學習的回饋。`
- 介紹：作者來自國立嘉義大學數位學習設計與管理、插畫、動畫與影像創作，正透過 Pure Data、REAPER 與 Web Audio 探索可測試的跨感官學習經驗。
- Primary CTA：`體驗互動聲響原型` → `#interactive-sound-learning-demo`。
- Secondary CTA：`查看研究與製作歷程` → `#learning-trail`。
- 研究命題：`跨感官映射於數位學習回饋之設計研究：以視覺形態、聲音參數與互動行為為例。`
- 研究問題：`視覺、聲音與互動如何形成可理解、可操作、可測試的跨感官回饋？`
- 證據鏈：`問題意識 → 互動流程 → 媒體證據 → 測試反思`。
- Skip link：`跳到主要內容`。
- Reviewer path：明示沒有公開聯絡資料，提供 `回到聲響原型` 與 `閱讀作品索引`。

## 五個研究軌道

| 軌道 | 內容焦點 |
| --- | --- |
| AI 與互動式創作 | 生成式 AI、Prompt workflow、AI 輔助介面、人機協作 |
| 互動媒體與使用者經驗 | 互動流程、UX/UI、原型測試、感測／回饋 |
| 影音聲響敘事 | 影片、聲音、動態影像、情緒節奏 |
| 數位內容與學習設計 | 內容架構、學習流程、互動腳本、成效評估 |
| 使用者研究與成效資料 | 使用者測試、學習成效、質性觀察、迭代紀錄 |

研究所主題固定為 `AI`、`互動媒體`、`聲響`、`沉浸式體驗`、`數位孿生`、`跨域創生`；每個案例必須同時提供 `themeRationales`，不能只有標籤。

## 學習歷程

| 工具 | 公開狀態 | 證據邊界 |
| --- | --- | --- |
| Web Audio | 已有可操作原型 | 原生 API 映射 pan、pitch、filter、gain；有 mapping 與 AudioContext lifecycle 程式測試 |
| Pure Data | 學習中 | 沒有可公開 patch 或操作紀錄，不當成果展示 |
| REAPER | 學習中 | 沒有可公開 project 或聲音輸出，不建立虛假媒體連結 |

## 生成式 AI 協作方法

- 公開名稱使用「生成式 AI 協作流程」；完整說明可補充「大型語言模型（LLM）協作」，不宣稱自研 LLM。
- AI 協助程式草稿、文件結構、除錯線索與稽核；作品事實、選件、研究主張、視覺方向、修改判斷與最終驗收由作者負責。
- 網站在 Learning Trail 後以低比重 `#ai-workflow` 區段呈現 Prompt v1／v2、兩個實際失敗案例與完整文件路徑，不取代旗艦作品。
- 完整 Prompt、changelog 與 failure cases 位於 [`../ai-workflow/`](../ai-workflow/README.md)。

## 公開案例矩陣（submission：4 件）

| ID／標題 | 狀態 | 核心內容 | 公開證據與限制 |
| --- | --- | --- | --- |
| `interactive-sound-learning` 互動聲響學習原型 | 原型中；`notValidated` | 把視覺位置、動態、量感轉成聲音回饋，支援抽象概念理解 | 原生 Web Audio 可操作 prototype、3 張圖解、4 個 mapping、signal flow、listening guide；沒有正式使用者結果 |
| `generative-interface-study` 生成式 AI 介面研究 | 研究構想；`notValidated` | 讓 prompt、版本比較、修正與判斷可追蹤 | 2 張流程／資訊架構圖；沒有公開媒體、demo 或實測結果，只列形成性測試計畫 |
| `data-visualization-cases` 資料視覺化實際案例與數位學習應用探討 | 已完成；`exploratory` | 分析 Spotify Wrapped 等資料敘事，推論數位學習回饋應用 | 1 張流程圖、1 部 YouTube privacy-enhanced 影片、章節化分析；不宣稱已驗證學習成效 |
| `learning-dashboard-analysis` 線上學習互動行為與學科成績之資料視覺化分析 | 原型中；`exploratory` | Power BI 探索互動、作業與成績分布 | 3 張概念圖、公開 SVG；年份有意省略；原始截圖隔離；不作因果宣稱 |

## Draft-only 隱藏案例

`immersive-memory-map`（沉浸式記憶地圖）仍保留於 draft 資料供未來發展，但標記 `submissionVisibility: hidden`，submission mode 透過條件資料建立不含它。它需要真實場域、完整原型與觀眾測試後才能重新評估公開。這不是目前公開資訊架構的一部分。

## 旗艦 Web Audio 內容

- 研究問題：`視覺位置、動態與量感如何被轉譯成可理解的聲音回饋？`
- 四個 mapping：水平位置→左右聲像；垂直位置→音高；移動速度→濾波亮度；物件大小→音量。
- Signal flow：互動輸入經 mapping 後驅動 oscillator、filter、gain、stereo panner、compressor 與 master output。
- Listening guide：引導使用者檢查左右、高低、速度亮度及大小音量。
- 誠實聲明：聲音由瀏覽器合成，不是 Pure Data 或 REAPER 成果；尚未正式使用者驗證。
- Planned methods：辨識映射的無提示觀察、短任務錯誤／口述紀錄、不同 motion 與輸入方式比較。

## 資料視覺化系列

系列名稱為「資料視覺化與數位學習應用」，英文副標 `Data Visualization in Digital Learning`，收錄後兩件資料視覺化案例。系列入口說明資料敘事、學習回饋、Power BI 與聲響化資料提示的連結，但明確保留兩件作品的獨立性。維護規則見 [`../data-visualization-series.md`](../data-visualization-series.md)。

## 案例欄位契約

- **身份：** `id`、`title`、`titleLines`、`year` 或 `metadataOmissions`、`source`、`category`、`status`、`priority`、`submissionVisibility`。
- **論證：** `summary`、`valueProposition`、`problemAwareness`、`audience`、`whatThisProves`、`designGoal`。
- **方法：** `designProcess`、`technologyAndMedia`、`outcomeShowcase`、`extendedSections`。
- **證據：** `diagrams`、`media.*`、可選 `interactivePrototype`／`interactionMappings`／`signalFlow`／`listeningGuide`。
- **責任與誠信：** `tools`、`roles`、`testing.statusKey`、`testing.status`、實際 evidence 或 `plannedMethods`、`reflection`、`instituteConnections`、`themeRationales`、`credits`、`links`、`seo`。

## 使用者可見文字狀態

- 案例：`原型中`、`研究構想`、`已完成`。
- 驗證：`尚未驗證`、`探索中`、`已驗證`（目前沒有已驗證案例）。
- 音訊：`尚未啟用`、`聲音啟用中`、`聲音播放中`、`聲音已停止`、`瀏覽器不支援`、`聲音啟用失敗`。
- 錯誤 fallback：`暫時無法顯示`、`重新嘗試`、`返回作品索引`。
- 音訊操作：`啟用聲音`、`停止／靜音`、`水平位置`、`垂直位置`、`物件大小`、`濾波亮度`。

## 媒體、替代文字與隱私

- `public/media/portfolio` 使用 420／640／1200 寬 AVIF/WebP 與 3 個本機 MP4；公共 helper 帶固定 dimensions 和 alt。
- `public/media/data-visualization` 只有公開安全的 SVG 系列圖／流程圖／概念圖。
- Power BI 原始 PNG/WebP 位於 `restricted-media/data-visualization/`，不在 `public/`，不被 Vite 複製；公開資料只保留 restricted 說明，不含路徑。
- 資料視覺化影片使用 YouTube ID `NrmK31F2S-M`，renderer 採 `youtube-nocookie.com`。
- 圖解需 alt、caption 與文字長描述；video/audio 架構支援 transcript／caption；iframe demo 需明確使用者操作後載入。

## 仍缺少的內容

- 旗艦原型與生成式 AI 研究都沒有正式使用者驗證結果。
- Pure Data／REAPER 沒有可公開 artifact。
- 生成式 AI 研究沒有可公開 prototype／media。
- Power BI 的年份、原始資料授權與部分 measure 定義未確認；年份因此不公開，而非顯示占位字。
- 案例 `links` 皆空；沒有公開 email、履歷或外部個人連結。
- 未確認 production canonical URL、hosting、analytics、隱私文件與最終社群分享圖相容性。
