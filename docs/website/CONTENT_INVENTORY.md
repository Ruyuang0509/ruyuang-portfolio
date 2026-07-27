# 公開內容清單

## 2026-07-27 最新作者視角組合

- 公開來源已逐句檢視 165 個含「我」的來源行；其中 75 個過量／模板式來源行改寫為作品、方法或流程作主詞。第三人稱代寫感為 10 個來源命中、合併為 7 組不重複字串，已從公開文案移除或改為中性敘述。
- 保留必要第一人稱的範圍是作者的選擇、反思、具名責任、AI 最終判斷與 rights／attestation；團隊角色、`notValidated`、private-original 缺口與 limited-use 邊界未被改寫成較強成果。
- 完整 `pnpm run doctor` exit 0。Draft build：474 modules、entry 181772 B、CSS 46069 B、initial JS gzip 201686 B。Submission build：470 modules、entry 153688 B、CSS 46069 B、initial JS gzip 193282 B；sound 18/18、rights 14/14、scanner 73/73、scan 135 files／28 text files、67／9 rules。
- Browser 定向檢查已覆蓋 1440×1000 與 390×844：4 張作品索引卡、4 階段資料視覺化流程、Hamlet 指定文案、真實 anchor、行動選單與主要段落均為 page／section overflow 0、0 dead anchors、console 0 warning／error。
- 下方 2026-07-26 數字保留為歷史 fingerprint，不取代本節。Production、screen reader、真實 200% zoom、system reduced-motion、實機與多瀏覽器音訊仍未驗。

## 2026-07-26 Hamlet rights inventory delta

- 新增公開文件：`docs/evidence/hamlet-rights-evidence-public.md`、`docs/evidence/hamlet-applicant-attestation.md`；前者只含刪節摘要，後者是蕭智仁於 2026-07-26 完成的正式聲明。
- 新增公開 UI data：Suno canonical credit、六項素材來源／公開範圍與 `confirmed` attestation status。
- 私人 inventory：原始 EML 0 份找到、原始八幕生成紀錄 0 份找到；沒有把需求附件或 MP4 抽幀誤列成原始證據。
- `.eml`、private evidence directories 與 original authorization／support reply filenames 已由 Git ignore、publication audit 與 submission inventory scanner 三層阻擋。
- Suno 使用限目前非營利範圍；rights review 不改變 Hamlet `notValidated` 的學習成效狀態。
- 2026-07-26 整合驗證基線：install、`pnpm run doctor` 均 exit 0；sound 18/18、rights 14/14、scanner 73/73。Draft build 為 471 modules、entry 180733 B、CSS 44315 B、initial JS gzip 200889 B；submission 為 467 modules、entry 153704 B、CSS 44315 B、initial JS gzip 192936 B。
- Submission scan 為 132 files／25 text files、67 個 text rules／9 個 inventory rules；118 個 `public/` files 為 0 missing／0 SHA-256 mismatch。`pnpm run check:publication` exit 0，manifest 為 `verified / approved`。
- Browser 在 1280×800、768×900、390×844、320×720 驗證 0 horizontal overflow、0 broken hashes、0 duplicate IDs、0 broken images，console 0 warning／0 error；Pure Data、Hamlet、`#selected-work`、`#contact` deep links 落在 fixed nav 下約 95–112 px，dark／paper endpoints 與行動 menu Escape／還焦通過。
- 本輪同時完成 public narrative／audit 分層、Draft-only audit data 動態載入、REAPER 公開文字改為「下一階段」、深色 reading surface、theme endpoint、deep-link settle 與 print reading-surface reset。

更新日期：2026-07-27。下列內容描述目前整合 source 與 public 資產邊界；2026-07-26 自動／Browser 結果與 PR #6 Pages run 都只作歷史基線，2026-07-27 最新本機自動與 targeted Browser 結果以上節為準。公開可達、limited-use 權利核准、private originals 可得性與研究／學習成效驗證是四個不同證據層。

## 內容治理

公開案例、首頁敘事、媒體 metadata 與測試狀態的來源是 [`../../src/data/portfolio.js`](../../src/data/portfolio.js)。Pure Data／代表作品／合作／學習路線／連結的公開敘事位於 [`../../src/data/admission-evidence.js`](../../src/data/admission-evidence.js)，完整 evidence／validation／rights／limitations／requests 依 stable ID 位於 [`../../src/data/admission-evidence.audit.js`](../../src/data/admission-evidence.audit.js)；submission components 只讀 public module，Draft／Audit layer 才讀 audit module。研究構想與 AI／作者性分別在 [`../../src/data/admission-research.js`](../../src/data/admission-research.js)、[`../../src/data/ai-workflow.js`](../../src/data/ai-workflow.js)。[`../../src/components/AdmissionEvidenceSections.jsx`](../../src/components/AdmissionEvidenceSections.jsx) 負責呈現 public admission evidence。Hidden case 文字位於 [`../../src/data/portfolio.hidden.js`](../../src/data/portfolio.hidden.js)，施工／風險文字位於 [`../../src/data/portfolio.internal.js`](../../src/data/portfolio.internal.js)；submission mode 會把 hidden case 與 Draft layer alias 到空模組，正式內容不得複製 internal／audit wording。欄位契約見 [`../content-authoring.md`](../content-authoring.md)、[`../adding-portfolio-work.md`](../adding-portfolio-work.md) 與 [`../content-governance.md`](../content-governance.md)。

### 作者視角與公開敘事層級

- 第一層寫作者親自做的選擇、操作與判斷；第二層連到可核對的 artifact、程式或方法；第三層明說尚未驗證、尚未取得或不可由現有證據推論的部分。
- 內容整合只調整敘事順序、欄位與元件呈現，不補寫參與者、成效、節省時間、研究結論、商業權利或官方認可。
- Hamlet 的 `verified / approved` 只適用已記錄的限定非營利用途；private originals 未找到與 `notValidated` 必須同時保留。
- 可見文案、ARIA label、metadata 與 `llms.txt` 應使用一致事實，但不得把施工／audit-only 文字直接搬進 submission。

## 首頁與固定內容

- 品牌：`RU / YUAN`。
- Eyebrow：`116學年度研究所申請作品集｜聲響、互動與數位學習`。
- 主標：`從數位學習與視覺敘事出發，走向聲響互動與空間監聽研究。`
- 介紹：申請者現就讀國立嘉義大學數位學習設計與管理學系、預計 2026 年畢業；目前已完成可操作 Web Audio 原型，從 2026/07/24 開始拆解由 AI 協作產生的 Pure Data 初版 Patch，REAPER 尚未形成可公開作品。
- Primary CTA：`體驗聲響互動原型` → `#interactive-sound-learning-demo`。
- Secondary CTA：`查看學習與研究路線` → `#learning-roadmap`。
- 研究命題：將視覺化、資訊架構與使用者理解方法帶入精簡揚聲器與開放式耳機的混合監聽研究。
- 研究問題：`如何以視覺化校準介面，協助小型創作者理解、建置與操作混合多聲道監聽系統？`
- 可信度：Web Audio 是目前可操作的主要證據；Pure Data／REAPER 仍在學習，混合監聽系統與視覺化校準尚未建置或驗證。
- 證據鏈：`背景與轉向 → 可操作證據 → 學習與限制 → 研究構想`。
- Skip link：`跳到主要內容`。
- Reviewer path：以六張卡依序分流至 Web Audio、Pure Data、《畫本》與代表作品、混合監聽研究構想、學習路線、AI／作者性。頁尾 `#contact` 另提供既有 Pages 與 GitHub Repository；沒有 email、履歷或研究計畫下載，不建立假資料。

### 固定導覽文字

| 位置 | 標籤 |
| --- | --- |
| 桌面與行動選單 | `問題意識`、`Web Audio`、`Pure Data`、`研究構想`、`代表作品`、`學習路線` |
| 行動 trigger | 關閉時 `閱讀選單`；開啟時 `關閉` |
| 行動 trigger aria-label | `開啟區段選單`／`關閉區段選單` |

### 聲音轉向與證據導覽

| 區塊 | 公開文字／目的 |
| --- | --- |
| 01｜開始注意 | 2020 年聆聽經驗使申請者注意同一段聲音在不同播放方式下的距離、位置與細節差異。 |
| 02｜遇到門檻 | 既有說明多依賴器材術語；聽見差異不等於能描述、操作與比較。 |
| 03｜帶入方法 | 數位學習用來拆解抽象概念與理解順序，視覺敘事／資訊架構用來把關係轉成可見介面。 |

Reviewer Path 不是 Navbar 的重複清單，而是六張依證據目的分流的卡：

| 標籤 | 標題 | 說明 | Target |
| --- | --- | --- | --- |
| 最強可操作證據 | Web Audio 跨模態映射 | 直接操作四組聲音參數，並閱讀可證明／不能證明範圍 | `#interactive-sound-learning` |
| 當前工具學習 | Pure Data v0.2.1 | 查看本機功能測試、AI 協作邊界、觀看指南與逆向拆解 | `#pure-data-learning` |
| 原創影音敘事 | 《畫本》與代表作品 | 先看原創短劇角色，再讀其他可核對案例 | `#selected-work` |
| 申請階段研究 | 混合監聽研究構想 | 分開問題、初步構想、可帶入能力與入學後補強 | `#research-positioning` |
| 能力補強時序 | 聲音學習與研究路線 | 區分已有證據、正在學習、尚未形成作品與研究所階段 | `#learning-roadmap` |
| 協作與作者性 | AI 協助與本人責任 | 揭露 AI 協助、申請者決策責任與實際修正案例 | `#ai-workflow` |

## 11 段 IA 內容順序

| 順序 | Anchor／內容 |
| --- | --- |
| 01 | `#top`：Hero、申請者背景、目前證據與研究方向 |
| 02 | `#sound-transition`：轉向聲音的問題意識 |
| 03 | `#reviewer-path`：六條證據閱讀路徑 |
| 04 | `#interactive-sound-learning`：Web Audio 旗艦原型 |
| 05 | `#pure-data-learning`：Pure Data v0.2.1 本機功能測試與學習紀錄 |
| 06 | `#research-positioning`／`#research-proposal`：四層申請階段研究構想 |
| 07 | `#selected-work`：代表作品；資料視覺化系列、作品索引與三件支持案例是此段延伸 |
| 08 | `#collaboration`：專案與合作事件 |
| 09 | `#learning-roadmap`：四階段學習路線 |
| 10 | `#ai-workflow`：AI／作者性與失敗案例 |
| 11 | `#contact`：研究方向、Pages 與 GitHub Repository |

`researchTracks`、術語轉譯與系所主題資料仍可存在於 `portfolio.js`，但 `#research-tracks`、`#translation-map`、`#institute-alignment` 目前沒有由 `App.jsx` 渲染，不能列為可達 IA。

## 學習歷程

| 工具 | 公開狀態 | 證據邊界 |
| --- | --- | --- |
| Web Audio | 可操作原型；尚待驗證 | `我已用瀏覽器原生 Web Audio API，把位置、速度與大小連到聲像、音高、濾波亮度與音量；目前只能證明映射與互動已實作。`；另有 5 個 mapping 與 13 個 AudioContext lifecycle 程式測試 |
| Pure Data | 學習中／可操作功能原型；尚待驗證；2026/07/24 開始 | 公開頁已嵌入 v0.2.1 約 63 秒 H.264／AAC 本機功能測試與 poster，可核對四組參數映射、Preset、Reset、Panic 及輸出監看；`.pd` 與版本資料未放入 repository，初版 Patch 曾由生成式 AI 協作產生，不能主張申請者獨立完成或已熟練 |
| REAPER | 下一階段 | 尚未進入實作，也沒有可公開工程、混音成果或聲音輸出；不再以「正在學習／已安裝」暗示已有操作證據 |

### Pure Data 公開觀看與證據文字

- 觀看指南依序要求比較：水平值→左右聲道、垂直值→音高、速度值→濾波明亮度、物件大小→輸出增益、Panic→靜音。
- 「目前可以證明」只有本機可執行、四組映射會回應、介面有安全控制／輸出監看，以及申請者正用真實 Patch 逆向拆解。
- 「目前不能證明」明列：非申請者獨立完成整份 Patch；未完成使用者驗證；沒有攝影機手勢、追蹤或感測器輸入；不是可直接進行學術實驗的正式系統。
- 作者性文字將操作核對、公開敘事、限制判斷與後續拆解歸於申請者；初版 Patch 為 AI 協作，後續目標是逐步建立可由本人說明、修改與重建的模組。
- 限制共四項：影片可見本機 D 槽路徑、介面含 `validated`、部分 Preset／Patch 超出畫面、尚無分段標題／放大訊號路徑／完整作品集旁白。下一步是獨立重建最小訊號路徑並重錄公開安全版本。

## 生成式 AI 使用說明

- Eyebrow：`生成式 AI 使用說明`。
- 標題：`AI 協助整理與檢查，最後的選擇由我負責。`
- 摘要：`這個網站的程式草稿、文件整理與部分稽核曾使用生成式 AI。我決定作品內容、研究主張與視覺方向，也逐項驗收修改結果。這些是開發紀錄，不代表我訓練或部署了大型語言模型。`
- 責任群組分為 `AI 協助`、`申請者負責`、`申請者尚需補強`；作品事實、研究方向、公開內容與最終驗收仍由申請者負責。
- 網站在代表作品、研究構想、合作事件與學習路線之後，以低比重 `#ai-workflow` 區段呈現提示詞版本與三個實際失敗案例。每案保留問題、發現、診斷、檢查、修正與學習鏈；其中一案明載 AI 產生的 Pure Data 結構超出當下理解能力。
- 完整 Prompt、changelog 與 failure cases 位於 [`../ai-workflow/`](../ai-workflow/README.md)。

| 群組 | 公開項目摘要 |
| --- | --- |
| AI 協助 | 程式草稿／Pure Data 初版與除錯線索；文件架構／重複內容／部分文案候選；建置、媒體、證據、公開邊界與可及性稽核整理 |
| 申請者負責 | 作品事實、研究方向／主張與公開取捨；視覺／媒體／權利與功能操作；修改驗收與最終文字／設計判斷 |
| 申請者尚需補強 | Pure Data 獨立重建與解釋；REAPER 工程／路由／原創輸出；使用者測試、聲學量測與研究方法 |

公開版本摘要固定為三版：v1「作品集主提示詞」、v2「續作提示詞」、v3「送審證據補強」。三個 failure chain 分別是 GitHub Pages 子路徑、無 Web Audio 時的錯誤狀態、以及 AI 產生的 Pure Data 結構超出當下理解能力；每案都保留 discovery → diagnosis → check → correction → learning，而不是只呈現成功結果。

## 代表作品／作品索引

- 索引標頭固定為「代表作品／作品索引」，六個主題在此只作「作品關鍵字」靜態 `<ul><li>`，沒有篩選、button、`aria-pressed`、點擊狀態或假互動。
- 公開順序固定為 `interactive-sound-learning`、`generative-interface-study`、`learning-dashboard-analysis`、`data-visualization-cases`；索引使用 `indexTitle`、`indexSummary`、`indexCover`、`indexLinks`、`indexTags`，完整研究題名與長敘事仍留在案例頁。
- 每卡只顯示 16:10 圖、真實 metadata、編號、短題名／摘要、角色、工具、可到達的成果 anchor、三個靜態標籤與「查看案例」；不再顯示 `overviewFacts`、`whatThisProves` 或大型角色／工具說明框。
- `indexLinks` 只包含已渲染的站內成果：Web Audio 原型、Hamlet 完整影片／製作流程、資料視覺化分析影片；Power BI 沒有可公開 dashboard／影片／報告入口，因此只保留同頁案例 CTA。
- `#project-index` 巢狀位於 `#selected-work`，不計為第 12 個高階 IA；中寬以上 2 欄、窄版 1 欄，圖片使用 lazy／async 載入。

## 公開案例矩陣（submission：4 件）

| ID／標題 | 狀態 | 核心內容 | 公開證據與限制 |
| --- | --- | --- | --- |
| `interactive-sound-learning` 互動聲響學習原型 | 可操作原型；`notValidated` | 作者把水平／垂直位置、移動速度與物件大小連到聲像、音高、濾波亮度與音量，使用者拖動時可直接聽見參數改變 | 原生 Web Audio 可操作 prototype、N1／N2／N3 三張正式視覺策略圖、4 個 mapping、9 階段 signal flow、listening guide 與「可證明／申請者與 AI 分工／不能證明」邊界；三張圖只說明感知／材質／介面語彙，不能證明已幫助使用者理解概念 |
| `generative-interface-study` AI 文學故事 MV | 原型中；`notValidated` | 作者把《Hamlet》拆成八幕，依文本理解、分鏡、圖像與字幕、配樂、剪輯五階段完成 40 秒影片 | 交付版 MP4、英文與繁中 WebVTT、完整雙語逐字稿、8 張實際畫面、Suno canonical credit、素材來源／公開範圍面板、具名 applicant attestation，以及 2026/07/17 事後整理且未用於成片的提示詞模板 v1；目前核准限非營利用途。原始提示詞紀錄、原始場景生成紀錄、原始 EML、可編輯 Canva 與學生／教師測試仍未找到或未完成，不能由 rights approval 推論為已獨立查驗或已具學習成效 |
| `learning-dashboard-analysis` 線上學習互動行為與學科成績之資料視覺化分析 | 2026/06/11–06/12；原型中；`exploratory` | 作者用 Power BI 整理互動紀錄、影片觀看欄位與學科成績，探索資料分布 | 3 張版面／公開邊界概念圖與圖表定義；配圖不是操作流程、系統架構、IA、真實值或真實比例。原始資料、真實數值、Power BI 儀表板／實作檔與結果影像隔離，關聯線索不能用來判斷因果或學習成效 |
| `data-visualization-cases` 資料視覺化實際案例與數位學習應用探討 | 已完成；`exploratory` | 作者以 Spotify Wrapped 等案例拆解資料層級、畫面節奏與個人化回饋，再把觀察帶回數位學習情境 | `productionWorkflow` 由 lazy `CaseProcessSection` 以四階段語意 HTML／CSS 呈現，另有 1 部 YouTube privacy-enhanced 分析影片與章節化分析；工具只列本案實際使用的 Canva／Gemini／ChatGPT，不誤列 Power BI／Excel。完成投影片只供內容核對，不冒充原始製作紀錄；尚未做成可操作介面，沒有使用者測試或學習成效資料 |

## Admission evidence 代表作品（文字型）

| ID／標題 | 目前公開內容 | 尚缺與不可延伸主張 |
| --- | --- | --- |
| `huaben-short-film`《畫本》 | 申請者提供的原創短劇、故事構思、Samsung S24 Ultra 攝影、DaVinci Resolve 剪輯、第 15 屆感動久久競賽情境，以及經確認的 canonical YouTube 作品入口 | 公開卡片提供作品摘要、角色、工具、重點、反思與必要素材說明；仍缺完整 credit、活動紀錄與可獨立核對的權利 artifact。參賽不等於得獎，不主張名次、評語、觀看數或觀眾成效 |
| `hope-feathers-wings-mv`《希望有羽毛和翅膀》個人 MV 混剪 | 非商業二次創作／課程練習；只主張選曲、媒體研究、畫面取材、素材篩選與剪輯，並提供經確認的 canonical YouTube 作品入口 | 角色、原始動畫影像與音樂權利屬原權利人；公開連結不等於申請者擁有第三方素材，來源清單、課程紀錄與完整授權資料仍待補 |

## 專案與合作、Roadmap 與最終連結

| 區塊 | 使用者可見內容 |
| --- | --- |
| 系統化 | 兩度擔任民雄動漫社社長，整理規章、Discord、雲端資料、帳號與交接；任期紀錄為 6→17，但不把成長歸因單一措施 |
| 具韌性 | 餐飲工作中持續調整執行方式；在英語補習班與青年旅遊數位行銷工作適應不同對象、節奏與溝通情境 |
| 能調整角色 | 畢業專題卡關時主動說明限制，轉向器材、製作協調與展出準備，避免中斷團隊進度 |
| 已有可核對證據 | Web Audio 原型、Pure Data v0.2.1 影片、網站建置／內容整理、現有影音作品與案例 |
| 正在學習 | Pure Data 訊號流程、模組重建、參數映射、AI 產出驗證；開始日期 2026/07/24 |
| 尚未形成作品 | REAPER、多聲道路由、空間聲音製作、聲學量測 |
| 研究所階段 | 心理聲學、聲學、空間音訊、混合監聽、實驗設計、監聽轉譯 |

`#contact` 標題為「以可操作證據為起點，補足聲音方法，再推進混合監聽研究。」；外部卡只有「目前作品集」與「GitHub Repository」，皆在新分頁開啟。末段固定說明研究計畫全文仍在非公開工作區，沒有建立未經發布決策確認的下載連結。

## Draft-only 隱藏案例

`immersive-memory-map`（沉浸式記憶地圖）的完整文字保留於 `src/data/portfolio.hidden.js`，並標記 `submissionVisibility: hidden`；`src/data/portfolio.internal.js` 只保存它的施工／風險備註。submission mode 將 `#portfolio-hidden` 解析為空模組，因此建出的資料與畫面不含案例 ID、標題或長文。它需要真實場域、完整原型與觀眾測試後才能重新評估公開，並不是目前公開資訊架構的一部分。

Hidden case 現在使用空 media state。原有 13 個 `ph-after-*`／`mv-soft-*` responsive placeholders 與 MP4、其 generator entries、captions 及 references 均已移除；公開案例沒有共用這些檔案。Scanner 以檔名 inventory 防止回歸，submission dev 舊 URL 為 404。

## 申請階段研究構想

- 標題：`以精簡揚聲器、開放式耳機與視覺化校準，探索較低門檻的混合監聽方式。`
- 研究問題：`精簡揚聲器與開放式耳機能否形成可被理解、校準與比較的混合多聲道監聽配置？`
- 四層定位：
  1. `問題`：完整多聲道監聽所需的揚聲器、輸出、空間、校準與成本門檻。
  2. `初步構想`：保留前方實體揚聲器，以開放式耳機補充側後方資訊，搭配視覺化介面。
  3. `申請者可帶入的能力`：視覺化介面、資訊架構、使用者操作流程、數位學習方法、互動原型與文件化。
  4. `入學後需補強`：聲學、心理聲學、DSP、REAPER 多聲道路由、Pure Data／OSC、量測、研究倫理、實驗設計與統計。
- 預定研究流程共五步，只表示可調整的方法順序，不是已執行的實驗紀錄。
- 固定聲明：`本內容為申請階段研究構想。系統配置、渲染方法、樣本數、量測程序與技術細節，仍須依課程訓練、指導教授建議、場地設備與先導實驗結果調整。`
- 完整研究計畫保留在非公開工作區；公開頁沒有 PDF／DOCX 下載連結。

## 旗艦 Web Audio 內容

- 研究問題：`視覺位置、動態與量感如何被轉譯成可理解的聲音回饋？`
- 案例內研究問題：`使用者是否能從聲像、音高、濾波亮度與音量的變化，聽懂畫面中的位置、速度與大小？`
- 四個 mapping：水平位置→左右聲像；垂直位置→音高；移動速度→濾波亮度；物件大小→音量。
- Signal flow：互動輸入 → 輸入正規化 → 參數映射 → oscillator → filter → voice gain／envelope → stereo panner → compressor → master output；公開說明與實際 controller graph 對齊。
- Listening guide：引導使用者檢查左右、高低、速度亮度及大小音量。
- 誠實聲明：聲音由瀏覽器合成，不是 Pure Data 或 REAPER 成果；尚未正式使用者驗證。
- Planned methods：辨識映射的無提示觀察、短任務錯誤／口述紀錄、不同 motion 與輸入方式比較。

## 資料視覺化系列

系列名稱為「資料視覺化與數位學習應用」，英文副標 `Data Visualization in Digital Learning`，收錄後兩件資料視覺化案例。摘要明確說明一件作品分析 Spotify Wrapped 等資料故事，另一件用 Power BI 探索學習互動與成績分布；兩件作品的資料、目的與方法不同，不是同一研究的前後階段。聲響化、AI 與沉浸式分析只列為後續方向，不是目前成果。維護規則見 [`../data-visualization-series.md`](../data-visualization-series.md)。

## 案例欄位契約

- **身份：** `id`、`title`、`titleLines`、`year` 或 `metadataOmissions`、`source`、`category`、`status`、`priority`、`submissionVisibility`。
- **索引：** 公開案例需有 `indexTitle`、`indexSummary`、`indexCover`、三個 `indexTags` 與 `indexLinks` 陣列；沒有可公開成果 endpoint 時陣列保持空，不建立假連結。
- **論證：** `summary`、`valueProposition`、`problemAwareness`、`audience`、`whatThisProves`、`designGoal`。
- **方法：** `designProcess`、`technologyAndMedia`、`outcomeShowcase`、`extendedSections`；可選 `challenge`、五階段 `workflow`（工具／輸入／產出／控制／人工檢查）、`promptDecisions`、`mediaLayers`。
- **證據：** `diagrams`、`productionWorkflow`、`media.*`、可選 `storyboard`（每幕含 bilingual title、`seekSeconds` 與 control）、`featuredExample`、`deliverables`、`outcomes`、`interactivePrototype`／`interactionMappings`／`signalFlow`／`listeningGuide`。
- **收束：** 可選 `keyInsight`、`nextSteps`、`ctas`；站內 CTA 必須對應實際 renderer anchor，可選 `focusTarget` 也必須指向已渲染控制項。
- **責任與誠信：** `tools`、`roles`、`testing.statusKey`、`testing.status`、實際 evidence 或 `plannedMethods`、`reflection`、`instituteConnections`、`themeRationales`、`credits`、`links`、`seo`。

## 使用者可見文字狀態

- 案例：`可操作原型`、`原型中`、`研究構想`、`已完成`；學習軌跡另使用 `學習中`。
- 驗證：`尚待驗證`、`探索中`、`已驗證`（目前沒有已驗證案例）。
- 音訊：`尚未啟用`、`聲音啟用中`、`聲音播放中`、`聲音已停止`、`瀏覽器不支援`、`聲音啟用失敗`。
- 錯誤 fallback：`暫時無法顯示`、`重新嘗試`、`返回作品索引`。
- 音訊操作：區段標題 `拖曳圖形，聽聲音怎麼變`；控制文字含 `啟用聲音`、`停止／靜音`、`水平位置`、`垂直位置`、`物件大小`、`濾波亮度`。

## 媒體、替代文字與隱私

- `public/media/portfolio` 主要使用 420／640／1200 寬 AVIF/WebP；Web Audio 索引圖另以精確 16:10 的 400／640／1200 變體提供。目錄也包含本機 MP4、Hamlet WebVTT 與 Pure Data PNG poster。Pure Data `pd-crossmodal-mapping-v0.2.1-operation-demo.mp4` 與同名 poster 皆由 `AdmissionEvidenceSections` 引用；影片 metadata 為 1276×720、約 63 秒、H.264／AAC。公共 image helper 帶固定 dimensions、alt 與 lazy／async 行為。此目錄會被 Vite 全量複製，因此「未被 React 引用」仍不等於「未公開」。
- Pure Data 影片與 poster 的畫面都仍可讀到本機 D 槽專案路徑與 `v0.2.1-validated`；頁面文案已將其限定為本機功能測試，但 binary 本身尚未去識別或重錄。這是已知公開風險，不是私有工作檔。
- `public/media/data-visualization` 只有公開安全的 SVG 系列圖／封面／概念圖；兩張 16:10 索引 wrapper 只重用既有安全 SVG，不含 Power BI 真實資料或第三方品牌介面。作品一的製作流程由 HTML／CSS 呈現，不再使用流程 SVG。
- Power BI 原始 PNG/WebP 位於 `restricted-media/data-visualization/`，不在 `public/`，不被 Vite 複製；公開資料只保留 restricted 說明，不含路徑。
- 資料視覺化影片使用 YouTube ID `NrmK31F2S-M`，renderer 採 `youtube-nocookie.com`。
- 圖解需 alt、caption 與文字長描述；video/audio 架構支援 transcript／caption；iframe demo 需明確使用者操作後載入。
- `index.html` 的 title／Open Graph／Twitter title 為 `蕭智仁｜聲響、互動與數位學習作品集`。
- `index.html` description、Open Graph／Twitter description 與 JSON-LD 使用同一原文：`蕭智仁的研究所申請作品集，呈現Web Audio聲響互動原型、Pure Data學習紀錄、影音作品，以及精簡揚聲器與開放式耳機混合監聽的研究構想。`
- Canonical URL、`public/llms.txt`、social preview 與 image alt 使用同一產品方向與有效 anchors；`llms.txt` 另明載 116 學年度與證據邊界，favicon 維持 RU / YUAN 品牌。Metadata／canonical 已完成，不再列為待補。

## 2026-07-26 整合驗證基線與目前發布狀態

- 2026-07-26 `pnpm install`、`pnpm run doctor` 均 exit 0；sound 18/18、rights 14/14、scanner 73/73。這些結果早於 2026-07-27 作者視角、作品索引與案例視覺整合，不能當成目前組合 fingerprint 的驗證。
- Draft build：471 modules、entry 180733 B、CSS 44315 B、initial JS gzip 200889 B。Submission build：467 modules、entry 153704 B、CSS 44315 B、initial JS gzip 192936 B。
- Fresh submission scan：132 files／25 text files、67 個 text rules／9 個 inventory rules；118 個 `public/` files為 0 missing／0 SHA-256 mismatch。
- `pnpm run check:publication` exit 0；manifest 為 `verified / approved`。這只核准目前 limited-use／非營利邊界，不把 Hamlet `notValidated`、private originals 或第三方 YouTube 素材的完整 credit／rights 升格為已驗證。
- Browser 在 1280×800、768×900、390×844、320×720 為 0 overflow、0 broken hashes、0 duplicate IDs、0 broken images、console 0 warning／0 error；Pure Data、Hamlet、`#selected-work`、`#contact` fresh deep links 約 95–112 px，dark／paper endpoints 與行動 menu Escape／focus restore 通過。
- 2026-07-27 組合已完成完整 `doctor`、獨立 publication gate 與 `#project-index`／`productionWorkflow`／Web Audio targeted Browser smoke；兩個命令均 exit 0，publication gate 為 `verified / approved`。本輪 scanner 已驗證實際 submission artifact，但未另做全 `public/` SHA-256 inventory。
- 尚未涵蓋 screen reader、真實 200% zoom、system reduced-motion、實機與多瀏覽器音訊。Pages run `30087568225` 仍只代表 PR #6 歷史部署；Draft PR 與本機 gate 通過不等於已部署或 production publication approval。

## 仍缺少的內容

- 旗艦原型與 AI 文學故事 MV 都沒有正式使用者驗證結果。
- Pure Data 已有公開操作影片與 poster，但沒有公開 `.pd`、獨立重建紀錄、去除本機路徑的送審版影片或使用者／研究驗證；REAPER 仍沒有可公開工程、截圖或聲音輸出。
- 《畫本》與 MV 混剪已加入申請者提供的文字型作品紀錄，但 repository 與可讀 Git history 仍沒有可逐鏡核對的成片、活動紀錄、完整 credit、來源或授權 artifact。
- AI 文學故事 MV 已有影片、字幕、實際分鏡、逐項 rights registry、具名 applicant attestation 與 `verified / approved` manifest。原始 Prompt log、原始場景生成紀錄、原始 EML、可編輯 Canva 與課堂測試仍缺；成片本來就設計為無旁白，不把「旁白版本」列成已承諾交付物。現況是「目前限定非營利用途已取得申請者確認與 publication gate 核准，但 private originals 與學習成效未獨立驗證」。
- Power BI 實作日期已確認為 2026/06/11–06/12；資料使用說明不支持公開分析結果，清洗規則與部分 measure 定義仍需核對。
- 原有 portfolio case `links` 皆空；索引 `indexLinks` 只連到已渲染的站內成果／流程 anchor。`#contact` 只新增已知 Pages 與 GitHub Repository；仍沒有公開 email、履歷、研究計畫下載或其他個人聯絡資料。
- GitHub Pages run `30087568225` 已部署 PR #6 的 11 段 IA、AdmissionEvidence 與 Pd 媒體整合；它早於 PR #7 limited-use rights／attestation 與本次公開展示版整合，不提供目前新組合的部署、使用者研究、輔具／實機或 field performance 證據。2026-07-17／07-18 Lighthouse 也只是舊 source fingerprint 的 localhost 歷史快照。
- Production canonical 與 GitHub Pages hosting 已由目前 source／既有部署 lineage 確認；目前組合的 production HTTP、analytics／隱私文件需求與最終社群分享圖跨平台相容性仍待發布後核對。
