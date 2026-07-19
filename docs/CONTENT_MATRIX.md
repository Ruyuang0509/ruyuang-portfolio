# 作品集內容矩陣

更新日期：2026-07-18。公開內容的 source of truth 是 `src/data/portfolio.js`；hidden case 文字在 `src/data/portfolio.hidden.js`，施工與風險備註只放 `src/data/portfolio.internal.js`。此表不會把待補素材或 AI 推論直接曝光為完成內容，也區分「HTTP 可公開取得」與「權利已核准」。

| 模組 | 現有內容 | 真實來源 | 完整度 | 公開站處理 | 待補資料 | 不可由 AI 代填的內容 |
|---|---|---|---|---|---|---|
| Hero／申請定位 | 聲音 × 互動 × 數位學習命題、背景能力、兩個站內 CTA | 申請者背景與現行 `homepageNarrative` | 可公開 | 位於首屏；DOM 文字優先，3D 僅漸進增強 | 最終申請年度、截止日與是否加入校名專屬文案 | 學校適配承諾、學術能力結論、未經確認的經歷 |
| 研究定位／五軌道 | 研究問題、證據鏈、能力轉譯、六個主題 | 既有作品內容與提示詞指定目標 | 可公開但仍是申請敘事 | 以研究入口呈現，不宣稱已完成研究 | 正式研究計畫、指導方向、官方招生要求核對 | 最終研究題目、研究成果、系所官方認可 |
| 旗艦互動聲響原型 | React + 原生 Web Audio；pan、pitch、filter、gain 四個 mapping；3 張圖解 | repository 原始碼與本機 rendered prototype | 工程原型完整；研究證據不足 | `notValidated`，需手勢啟用且可停止／fallback | 形成性測試紀錄、可公開聲音錄製或操作影片、測試修訂 | 參與者人數、成功率、學習成效、測試結論 |
| Learning Trail | Web Audio 有 artifact；Pure Data、REAPER 為學習中 | repository 與申請者目前自述 | Web Audio 可公開；另兩項不足 | 明確區分已有證據與學習中 | Pd patch、REAPER session／截圖、聲音輸出、製作反思 | 技術熟練度、未存在的 patch/session、作品完成度 |
| AI 協作方法 | 正確稱為生成式 AI／LLM 協作；責任邊界、Prompt v1/v2、兩個失敗案例 | 兩份使用者提供 prompt、實際除錯文件與目前可讀 Git history | 方法紀錄可公開 | 位於 Learning Trail 後、作品索引前；比重低於旗艦作品 | 未來更多版本比較、若要公開的工具／模型版本與選擇理由 | 自研 LLM、AI 產出等同作者作品、未發生的決策或失敗案例 |
| AI 文學故事 MV | 《Hamlet》40 秒／8 幕 clean MP4、雙語 WebVTT、實際分鏡、五階段工作流、Prompt 限制與衍生 Prompt Template v1 | 使用者提供 Hamlet delivery、`hamlet-media-manifest.json`、公開案例約束與可重跑 `audit:evidence` | 成片、字幕、衍生畫面與 manifest 關聯可核對；原始 Prompt log、教學成效與發布權利未驗證 | 原型中；`artifactVerified`、`artifactDerived`、`processDerived`、`specificationOnly` 分開標示；Template v1 明載 `usedForExistingVideo: false`；保留 `notValidated` | 原始 Prompt log、旁白版本、學生與教師形成性測試紀錄、申請者權利／來源簽核 | 學生回饋、學習成效、節省時間、Canva 專案連結、原始 Prompt 執行紀錄或素材授權結論 |
| 資料視覺化系列 | 兩件案例的共同策展入口、能力與聲響延伸 | 既有課程／專題內容與公開資料 | 可公開 | 在 AI 方法之後，作跨域支持證據 | 系列的最終選件與文字精簡決策 | 未做過的分析、聲響化成效 |
| 資料視覺化實際案例 | Spotify Wrapped 等資料敘事分析、流程圖、YouTube 影片 | 既有影片與案例文案 | `exploratory` | privacy-enhanced iframe、使用者意圖後載入；不宣稱成效 | 人工字幕／transcript 核對、影片 credit | 學習效果、觀看者研究結果、未確認字幕內容 |
| Power BI 學習資料探索 | 概念 SVG、互動／影片觀看／成績探索、限制說明 | 日期備註、清洗檔、Power BI 實作檔與隔離素材 | 2026/06/11–06/12 實作；公開方法敘事可用 | 只公開不含資料值的概念圖；實際結果維持隔離；不作因果宣稱 | 清洗規則、measure 定義、另行公開許可 | 實際資料值、因果關係、授權狀態、學習成效 |
| About／履歷／聯絡 | Reviewer Path 明示沒有公開聯絡資料 | 現行 repository 無真實公開資料 | 未完成 | 不建立假連結或占位 CTA | 簡歷 PDF、Email、GitHub／社群、公開範圍決策 | 私人電話／住址、未授權帳號、虛構履歷或技能 |
| 媒體與 credit | 本機 AVIF/WebP/MP4、公開 SVG、YouTube privacy-enhanced embed | `public/media`、案例 metadata、既有影片 | 技術邊界可發布；Hamlet rights 未核准 | lazy、固定尺寸、poster、no autoplay；restricted media 隔離。Pages 已公開 Hamlet MP4／VTT／poster，但這不是 rights clearance | Hamlet 逐項 rights evidence／attestation；各作品最終作者／團隊 credit、字幕、外部素材授權證明 | 著作權歸屬、授權聲明、未提供的 alt／transcript 事實 |
| 公開 metadata | index、JSON-LD、`llms.txt`、favicon、social preview 與案例 SEO title 已統一為 RU / YUAN | `index.html`、`public/llms.txt`、`public/favicon.svg`、`public/social-preview.svg`、`portfolio.js` | 本機品牌與 anchors 已一致 | Vite 原樣發布 public metadata；scanner 會攔截舊品牌與失效 anchors | canonical URL、正式 domain、raster social preview | 未確認 URL、hosting domain、公開個資 |
| Hidden immersive concept | `immersive-memory-map` 完整文字在 `portfolio.hidden.js`；施工備註在 `portfolio.internal.js`；media 為空 | `portfolio.hidden.js`、`portfolio.internal.js` | draft 文字保留；submission data／asset 隔離完成；submission-visible 專用 completeness 項目不適用 | submission alias 解析為空模組；流程圖／媒體 readiness 顯示 `不適用 · submission-hidden`，不列為缺失；13 個 `ph-after-*`／`mv-soft-*` placeholder 已移除，舊 URL 為 404 | 真實場域、完整原型、影像／聲音與觀眾證據 | 場域成果、參與者回饋、技術完成度 |
| GitHub／部署證據 | 有效 Git history、`origin`、working branch、PR #1–#4 merged、相對 base、Pages audit、push／manual workflow | 本機 Git、GitHub CLI/API、原始碼、本機 build 與公開 HTTP | branch／PR／成功 run／public Pages 均可確認；沒有 custom domain 或 field evidence | `main` push 會自動 build／deploy；`ca956c9` run `29643814012` 成功，首頁 HTTP 200。Deploy 尚未執行 `check:publication` | PR-stage CI、publication gate 串接、canonical／custom domain、production device／field matrix | 未執行的測試、權利核准、field performance、未確認 domain |
| 研究計畫與申請資訊 | 候選研究命題與能力轉譯 | 使用者提示詞與現行作品 | 候選方向 | 以問題與「可深化」語氣呈現 | 正式研究計畫、申請年度、官方課程／師資對應與申請者簽核 | 最終學術主張、官方要求、研究可行性結論 |

## 公開前資料規則

- 沒有證據的欄位保持省略、`notValidated` 或 draft-only，不使用看似完成的 placeholder。
- 後設整理的 Prompt Template 必須標成 `derived`，不得替代原始 Prompt log；若未用於現有成片，需明載 `usedForExistingVideo: false`。
- 結構化 deliverable 的 `statusKey`、`evidenceRefs` 與 `attributionSource` 必須一致；只有 manifest 中可追溯的檔案或衍生物可標為 artifact evidence，核准規格可保留空 `evidenceRefs`。
- `evaluationPlan.status: "planned"` 只描述未來任務、蒐證與資料治理；沒有執行紀錄前，不加入人數、日期、結果、引言或成效指標。
- 可公開作品文字只進 `src/data/portfolio.js`；內部待辦與敏感路徑不複製到公開資料。
- Power BI 資料使用說明明載分析結果不適合公開發表；原始資料、清洗檔、儀表板實作檔、實際截圖與含真實結果的操作紀錄不得搬入 `public/`。只有另取得資料提供方明確許可後，才可重新評估公開範圍。
- 真實使用者資料只在取得適當同意、匿名化並由申請者確認後加入。
- `public/` 內所有檔案都視為可發布；React tree 未引用不代表資產不會出現在 `dist/`。
- 內建 scanner 會檢查「施工模式」、舊品牌、失效 anchors、hidden/restricted filenames 與 raw data extensions；獨立 `dist/` 搜尋仍保留為第二道證據。
- `pnpm run audit:evidence` 可證明 Hamlet manifest、hash、WebVTT、逐字稿與 derivative inventory 一致，但不能證明發布權利；`pnpm run check:publication` 必須在申請者權利簽核完成前保持失敗。
- Completeness 的流程圖／媒體等 submission-visible 建議項目對 hidden case 為不適用；這不改變 public 資產零 placeholder、submission alias 與 scanner 的隔離要求。

