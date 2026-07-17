# 目前產品與資訊架構

## 產品目的與受眾（已驗證）

網站的明文定位是 `Graduate Portfolio / Sound, Interaction & Learning`。作者從國立嘉義大學數位學習設計與管理、插畫、動畫與影像創作出發，正以 Pure Data、REAPER 與 Web Audio 探索跨感官學習回饋；目前可公開且可操作的核心證據是原生 Web Audio 原型。主要受眾是研究所審查者，主要成功行為是理解研究問題、操作旗艦原型、再檢視支援案例與學習路徑。來源：[`../../src/data/portfolio.js`](../../src/data/portfolio.js)。

## Repository 與交付狀態

- Canonical root 是 `C:\Users\911su\Documents\Codex\如願個人網站`。
- 目前 HEAD 為 `12710dc`，位於 `feat/portfolio-admission-foundation`，並與同名 `origin` branch 一致；`main`／`origin/main` 目前均為 `6b6e689`。
- 本任務開始時工作樹為 clean；目前本任務修改仍未 stage、commit 或 push，也沒有 merge 或 deploy。manual-only Pages workflow 已在 repository，但本任務沒有重新查詢 PR、遠端 run、Pages URL、custom domain 或 production field data。
- 應用、內容與文件已能形成完整本機 review flow；hidden-only assets、built construction wording、stale metadata、hidden 完整度假警告與 Three 超大 lazy chunk 的已知本機缺口已關閉，也已產生對應當前 source fingerprint 的 Lighthouse lab 證據。真實使用者研究、Hamlet 原始 Prompt log、權利審查、輔具／實機與 production hosting 仍未完成。

## 路由與導覽模型

- **實際 route：** 只有 `/`，client-rendered React SPA；未安裝 router。
- **導覽：** 固定膠囊列包含「研究定位、聲響原型、學習歷程、作品索引、支持證據、閱讀路徑」。桌面直接顯示；行動版由具 `aria-expanded`／`aria-controls` 的「閱讀路徑」按鈕開啟選單。
- **行動選單：** 支援 Escape 關閉並把焦點還給 trigger，也支援點擊選單外關閉；選擇項目後焦點進入目標標題。
- **捲動：** 非 reduced-motion 環境優先由 Lenis 前往 anchor，offset -96px；一般 fallback 使用原生 smooth scroll，reduced-motion 使用 `auto`。導覽會以 `history.replaceState` 更新 hash；桌面鍵盤 Enter 與行動選單會把焦點移到目標標題，桌面滑鼠點擊仍保留焦點在連結。長頁保留可見的平台 scrollbar，它穩定使用 root 深色 tokens；320 px viewport 也不產生水平溢位。
- **主題：** document root 保持深色；支持作品 gallery 與 Reviewer Path 以局部 `paper-surface` tokens 呈現暖紙。`#project-index` 前的靜態過渡橋不含文字，ScrollTrigger 只在 gallery 門檻切換 fixed nav chrome，不再修改 root 或內容 palette。
- **轉換終點：** `#reviewer-path` 明確說明「目前沒有公開聯絡資料」，只提供「回到聲響原型」與「閱讀作品索引」。沒有假聯絡 CTA。

## 實際頁面順序

```mermaid
flowchart TD
  A["Hero：聲音 × 學習主張"] --> B["研究定位／五軌道／能力轉譯／本所連結"]
  B --> C["旗艦案例：互動聲響學習原型"]
  C --> D["Learning Trail：Web Audio／Pure Data／REAPER"]
  D --> E["生成式 AI 協作方法：Prompt／責任／失敗案例"]
  E --> F["資料視覺化系列入口"]
  F --> G["靜態深墨→暖紙 bridge：aria-hidden，無文字"]
  G --> H["作品索引：4 件公開案例"]
  H --> I["3 件支持案例長文"]
  I --> J["Reviewer Path：站內閱讀終點"]
```

旗艦案例在作品索引之前完整呈現；索引仍列出全部 4 件公開案例。`CaseStudyShowcase` 以 `scope="flagship"` 和 `scope="supporting"` 避免重複長文。來源：[`../../src/App.jsx`](../../src/App.jsx)、[`../../src/components/CaseStudyShowcase.jsx`](../../src/components/CaseStudyShowcase.jsx)。

## 區段清單

| Anchor | 目的與主要內容 | 行為／狀態 |
| --- | --- | --- |
| `#top` | 標題「讓視覺成為聲音的入口，讓聲音成為學習的回饋。」、背景、介紹、兩個 CTA | 標題／介紹首幀可見；CTA 保留次要進場；R3F 在 DOM paint window 後延遲漸進載入 |
| `#research-positioning` | 研究命題、可信度、研究問題、證據鏈 | 已實作；由 `homepageNarrative` 驅動 |
| `#research-tracks` | 一條聲響主線與五個支援軌道 | 顯示軌道目的、能力與關聯案例數 |
| `#translation-map` | 把學習／媒體經驗轉成研究能力 | 靜態術語對照卡 |
| `#institute-alignment` | 由公開案例派生的 demonstrated 主題證據 | 目前列出 AI、互動媒體、聲響、跨域創生及其精確案例；「沉浸式體驗」與「數位孿生」因只是研究方向而不出現於摘要 |
| `#interactive-sound-learning` | 旗艦長篇案例 | 原型中；包含 lazy Web Audio demo、3 張圖解、工具、角色、未驗證狀態及計畫 |
| `#interactive-sound-learning-demo` | 可操作視聽映射 | 需使用者點擊啟用聲音；pointer pad 以具說明的圖像語意呈現，touch／4 個 range 提供實際操作；starting／unsupported／timeout fallback；一般停止有短 release，頁面隱藏／unmount 立即清理 |
| `#learning-trail` | 誠實呈現工具學習狀態 | Web Audio 有原型；Pure Data／REAPER 只有學習狀態，沒有偽造作品連結 |
| `#ai-workflow` | 生成式 AI 協作方法 | 低比重呈現 AI 協助、作者責任、Prompt v1／v2、兩個真實失敗案例與文件路徑；不宣稱自研 LLM |
| `#data-visualization-series` | 兩件資料視覺化作品的系列脈絡 | 系列封面、能力、反思、聲響延伸與兩張案例卡 |
| `#project-index` / `#gallery` | 4 件公開案例總覽 | 入口前有 `clamp(96px, 14vw, 240px)` 靜態 bridge；內容使用局部暖紙 tokens，gallery 門檻只觸發 nav chrome 變色 |
| `#generative-interface-study` | AI 文學故事 MV | 原型中；40 秒／8 幕《Hamlet》成片、雙語字幕、實際 storyboard、五階段流程、派生的 Prompt Template v1、證據邊界與計畫中的形成性測試；尚無使用者結果 |
| `#data-visualization-cases` | 資料視覺化案例與數位學習應用 | 已完成分析影片；testing 狀態為 exploratory，不宣稱學習成效 |
| `#learning-dashboard-analysis` | Power BI 學習資料探索 | 原型中；實作日期 2026/06/11–06/12；概念圖公開，實際資料與結果隔離；不作因果宣稱 |
| `#reviewer-path` | 審查閱讀終點 | 兩個真實站內 CTA；沒有公開聯絡資料 |

`immersive-memory-map` 不在上表。它的完整文字位於 `portfolio.hidden.js`，並標記 `submissionVisibility: hidden`；內部施工備註另在 `portfolio.internal.js`。submission alias 解析到空模組，bundle 與公開 `portfolio.js` dev response 都不含案例 ID／文案。該案例現在使用空 media state；13 個 `ph-after-*`／`mv-soft-*` placeholder 已從 public 與 generator 移除，舊 canonical dev URL 為 404。治理完整度中的 diagrams／media 群組限定為 `submission-visible`，因此此 hidden 案例會標示「不適用」，不再產生假性待補警告。

## 案例共同結構

每件公開案例依序可包含：header／metadata、reading map 與證據快覽、draft notes（僅 draft）、問題、對象、證明、目標、可選互動原型、設計流程、技術、成果、擴充章節、圖解、媒體、工具／角色、testing、反思、研究所主題、credits、前後案例導覽。研究所主題會把已有作品證據與未來研究方向分組顯示，不把延伸想法偽裝成現有證據。結構化長頁案例可選用 workflow、Prompt decisions、可展開的 Prompt template、storyboard、media layers、deliverables、evidence boundary、outcomes、planned evaluation、next steps 與 CTA；空資料區塊不渲染。旗艦 Web Audio 原型和部分大區段另有 error boundary。

## 使用者可見狀態

- **載入：** Hero 3D 有純色 Suspense fallback；Web Audio prototype 有「互動聲響原型載入中。」；圖片使用 lazy loading，首張索引 cover eager。
- **音訊：** `尚未啟用`、`聲音啟用中`、`聲音播放中`、`聲音已停止`、`瀏覽器不支援`、`聲音啟用失敗`，透過 busy 區外的 atomic `role="status"`／polite live region 宣告；啟用中只把按鈕控制群組設為 `aria-busy`，停止／Escape／離屏／cleanup 均可取消 pending start。
- **錯誤：** Hero 的選配 3D scene 有局部 fallback，不會移除標題／介紹／CTA；旗艦案例、支持案例及聲響 demo 另有區段級 fallback；React 根也有可重新載入的全站 recovery boundary。
- **測試：** 公開狀態分 `尚未驗證`、`探索中`、`已驗證`；目前沒有案例為 `validated`。
- **Restricted：** Power BI 只顯示不可公開原因；restricted item 不得含公開 href/src/embed URL。
- **Draft：** draft build 有黏性治理 banner、內容完整度、待補資料與風險；完整度會先判斷群組是否適用於 submission-visible 案例。submission 以 Vite alias 將整層替成空元件。
- **外部影片：** 一件資料視覺化案例使用 `youtube-nocookie.com` iframe；repo 沒有其他第三方 runtime service。
- **目前本機效能證據：** current source fingerprint 的 submission Lighthouse 已封存 immutable artifact、raw JSON、CLI transcript、artifact／source manifests 與 profile／environment fingerprints。Mobile 為 Performance 95、Accessibility 100、LCP 2557 ms、TBT 35 ms、transfer 452708 bytes；desktop 為 Performance 100、Accessibility 100、LCP 554 ms、TBT 0、transfer 436379 bytes。LCP node 仍是 `#hero-title`；這是 localhost simulated lab 證據，不是 production field data。
- **目前瀏覽器回歸：** submission preview 在 320 px 與 1440 px 皆為 0 global horizontal overflow，Prompt template 展開後不溢位；先離開 Hero 再等待延遲載入時 canvas 維持 0，回到 Hero 後才載入為非 0，console warning／error 均為 0。

## 已確認的 submission 邊界

- Scanner core 可注入任意 output directory，CLI fail closed；36 個 fixtures 實際斷言 bad output exit 1、clean output exit 0，diagnostics 不回印敏感內容；VTT、Web Manifest 與 source map 也納入文字掃描。
- Fresh submission `dist/` 由 48 個 text rules 與 6 個 inventory rules 檢查，另保留不同方法的獨立文字搜尋與檔名盤點。
- `audit:evidence` 核對 Hamlet 三份直接交付檔的 bytes／SHA-256、60 份衍生圖像的 inventory SHA-256／實際 dimensions、16 個 WebVTT cues 與 63 個 public Hamlet files；`check:publication` 同時要求頂層核准、完整 applicant attestation、逐項 rights checks 與 evidence refs，目前正確地被擋下。
- Submission dev middleware 對 13 個舊 hidden media URL 與 `/dist/*` 回傳 404，避免 Vite SPA fallback 偽裝成 200；有效 public media 仍為 200。Filesystem deny 對 restricted media、internal／hidden modules 與歷史 report copy 回傳 403。
- `llms.txt`、favicon、social preview、index／JSON-LD 與案例 SEO title 使用 RU / YUAN，`llms.txt` 只列實際存在的 Navbar anchors。
- 內容 validator 與 submission gate 的通過不代表授權、使用者研究、screen reader、實機或 production hosting 已完整。

## 外部系統與缺席功能

沒有 CMS、API request、backend、database、authentication、storage、analytics、contact form、search、filter、modal、carousel 或獨立 404 route。已配置 manual-only GitHub Pages workflow、相對 base path 與 build audit；GitHub repository 與本機／`origin` refs 已確認，但本任務沒有重新查詢 PR、remote checks／workflow runs，也沒有正式部署、Pages URL 或 domain。
