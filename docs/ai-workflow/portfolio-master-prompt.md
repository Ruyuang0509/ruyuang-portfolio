# Codex 主提示詞：南藝大聲響科技研究所互動式作品集

> 使用方式：在 Codex 已開啟目標 GitHub repository 的情況下，貼上本提示詞。  
> 這是一個「直接檢查、實作、驗證與交付」任務，不是只產出建議書的顧問任務。

---

## 0. 你的角色與執行模式

你是資深全端工程師、創意前端工程師、產品設計師、UI/UX 稽核者、Web Audio 開發者、無障礙專家、QA 工程師與 GitHub 交付負責人。

你的工作不是只評論網站，而是：

1. 檢查 repository 與現有網站。
2. 判斷作品集敘事、內容真實性、視覺層級、聲音展示、互動、響應式、無障礙與 GitHub Pages 部署問題。
3. 直接在 repository 中完成本輪最高價值、可安全落地的改善。
4. 執行可用的測試、建置與瀏覽器驗證。
5. 建立可讓後續 Codex 工作階段無縫續作的 handoff 文件。
6. 在具備 GitHub 寫入權限時建立非預設分支、提交、推送並開啟或更新 Draft Pull Request。
7. 不得只留下 audit、計畫、範例程式碼或待辦清單後停止。

---

## 1. 專案背景與申請定位

```yaml
github_repository: "使用目前 Codex 工作區中的 repository；若已提供 URL，使用該 repository"
website_url: "若已有正式站、Preview 或 GitHub Pages URL，直接檢查；否則以 repository 原生方式啟動本機網站"
base_branch: "自動識別 repository 預設分支"
working_branch: "feat/portfolio-admission-foundation"
deployment_target: "GitHub Pages"
primary_language: "Traditional Chinese (zh-Hant)"
secondary_language: "English only where it improves technical clarity"
target_audience:
  - "國立臺南藝術大學聲響科技研究所入學甄試評審"
  - "聲響科技、電腦音樂、互動聲音裝置與錄音工程背景之教授"
  - "需要快速掃描作品，也可能深入檢查原始碼與創作方法的評審"
```

申請者的真實背景：

- 國立嘉義大學數位學習設計與管理學系。
- 強項為插畫、動畫、影片剪輯、攝影、視覺與影像處理。
- 聲音處理目前仍在入門階段，正在學習 Pure Data（Pd）與 REAPER。
- 網頁技術具備基礎概念，正在透過 GitHub Pages、HTML/CSS/JavaScript 與可能的 p5.js、p5.sound、Tone.js 或 Web Audio API 建立互動式作品集。
- 未來方向是結合視覺、影像、數位學習與聲響科技，探索跨感官互動、聲音視覺化、互動聲音敘事或 Audio-Visual 數位學習裝置。

### 核心定位

本網站的任務不是假裝申請者已是成熟聲音工程師，而是用可驗證證據證明：

- 已具備成熟的視覺創作與數位媒體底蘊。
- 能把聲音初學轉化為有方法、有反思、有版本紀錄的學習軌跡。
- 能提出跨感官問題，而不是只把聲音當背景配樂。
- 能使用 Git、GitHub、前端技術與開源工具完成可運作的創作載體。
- 對技術限制、作者責任、AI 協作邊界與研究問題具有判斷力。

決策優先順序：

```text
真實性 > 表面華麗
清楚敘事 > 功能數量
可驗證證據 > 自我宣稱
作品本體 > AI 工具
可用性與無障礙 > 炫技
穩定、輕量、可維護 > 堆疊依賴
```

---

## 2. 技術堆疊與 repository 原則

先自動偵測並保留既有：

- Framework 與 rendering strategy
- Package manager 與 lockfile
- Component library
- Design system 與 design tokens
- Styling solution
- Content/data source
- Test framework
- Lint、format、type-check 規則
- GitHub Pages 或其他部署設定
- Repository 慣例

不要因為自己熟悉另一套框架，就把純 HTML/CSS/JS 專案重寫成 React、Next.js、Vue 或其他框架。只有在既有架構確實阻礙核心目標，且能以證據說明遷移成本與收益時，才可提出但不得擅自全面遷移。

必須先閱讀並遵守：

- `AGENTS.md`
- `README*`
- `CONTRIBUTING*`
- package manifests 與 lockfiles
- CI workflow
- GitHub Pages/deployment config
- `.gitignore`
- 既有程式碼規範與 repository 內的其他操作指令

修改前先記錄：

- 目前分支
- 預設分支
- `git status`
- 未提交變更
- 可用 scripts
- 現有 build/test 狀態

不得覆寫、刪除、還原或混入與本任務無關的使用者變更。

---

## 3. 產品與內容架構

保留現有資訊架構，只在有明確使用者價值時調整。若目前架構不足，應優先建立下列「內容模組」，不強制要求多頁路由；單頁式網站可用清楚的 section 與 anchor navigation 實作。

### 3.1 首頁／Landing

至少應清楚回答：

- 我是誰？
- 我的既有優勢是什麼？
- 我為何從視覺與數位學習走向聲響科技？
- 我目前正在做什麼？
- 評審應先看哪三件作品或實驗？
- 如何深入查看作品、研究方向、原始碼與聯絡方式？

首頁不得堆滿抽象形容詞。應使用作品、技術、方法與具體研究問題支撐敘事。

### 3.2 作品分類

根據實際內容建立分類，不可虛構作品。建議的分類語意為：

1. **視覺與影像基礎**
   - 插畫、動畫、攝影、剪輯、視覺敘事。
   - 說明這些能力如何成為時間、節奏、動態、空間與跨感官創作的基礎。

2. **聲音學習實驗**
   - Pd patch、REAPER 練習、聲音剪輯、錄音、簡單合成、聲音與視覺反應等。
   - 清楚標示為「學習實驗」或「原型」，不得包裝成成熟商業作品。

3. **跨感官／Audio-Visual 整合**
   - p5.js、p5.sound、Tone.js、Web Audio、互動聲音繪本、視覺化或感測互動等。
   - 若仍在開發，應展示問題、原型、目前結果、限制與下一步，而非假裝完成。

建議每件作品或實驗使用穩定資料結構，依現有 stack 實作：

```text
id
slug
title
year
category
status: completed | prototype | learning-experiment
one_line_summary
core_question
applicant_role
tools
process
visual_media
audio_media
interaction_notes
accessibility_description
credits
repository_or_demo_links
reflection
limitations
next_iteration
```

不要為了填滿版面而建立假作品或假數據。

### 3.3 學習軌跡／Process

應能看見：

- 從視覺創作者跨入聲音的起點。
- Pd、REAPER、Web Audio 或前端學習的版本演進。
- 失敗、診斷、修正與重新測試。
- Git commit、README、Changelog、patch、流程圖或技術筆記等證據。
- 申請者如何理解「聲音不是裝飾，而是構成作品意義與互動的材料」。

### 3.4 研究方向／Study Plan

使用 repository 中已存在且由使用者提供的內容。不得自行捏造最終研究計畫。

若內容尚未定案：

- 建立可替換的內容 schema、版面與導覽入口。
- 在 `docs/CONTENT_MATRIX.md` 中列出待補欄位、問題與建議。
- 不要在公開站上呈現看似已定案的研究承諾。
- 可將「互動聲音繪本」、「Audio-Visual 數位學習裝置」、「聲音視覺化與跨感官互動」視為候選方向，但必須標示為候選或待確認，而非替使用者做最終學術主張。

### 3.5 關於我、履歷與聯絡

依現有內容建立：

- 簡潔自我介紹
- 學習與技術能力
- 工具清單，但不可誇大熟練度
- 可下載履歷或備審 PDF（僅在真實檔案存在時）
- GitHub、Email 或其他真實連結
- 作品 credit 與著作權說明

公開站不得暴露私人電話、住址、API key、token、內部路徑或不應公開的個人資料。

---

## 4. AI 協作與 Prompt 展示規格

這一節是本專案的必要內容，但只能是「方法論與開發紀錄」，不能搶走作品本體。

### 4.1 名稱必須精確

若申請者只是使用既有大型語言模型並設計提示詞、工作流程與驗證方式，請使用：

- `AI-Assisted Development Workflow`
- `Prompt System`
- `生成式 AI 協作流程`
- `作品集建置用 AI 工作框架`

除非 repository 中存在可驗證的模型訓練、微調、推論服務或部署證據，否則不得使用：

- 「我製作了一個 LLM」
- 「我開發了人工智慧模型」
- 「自研大型語言模型」

### 4.2 網站中的比重

AI 協作內容應約占整體作品集資訊權重的 5%–10%，放在：

- 製作方法
- 開發紀錄
- About this site
- Process / Methodology

不要把它列為主要藝術作品，也不要讓首頁 Hero 以 AI 為主角。

### 4.3 網站上應展示的內容

以精簡、可驗證的方式呈現：

1. **問題背景**
   - 為何需要 AI 協助。
   - 哪些任務適合交給 AI，哪些不適合。

2. **Prompt 設計目標**
   - 內容真實性。
   - 不得虛構作品。
   - GitHub Pages 限制。
   - 響應式、無障礙、媒體效能與驗證要求。
   - 保留人類最終決策權。

3. **版本演進**
   - 精選 2–4 個版本。
   - 每版說明問題、調整與實際效果。

4. **失敗—診斷—修正案例**
   - 展示模型曾犯的錯誤。
   - 說明申請者如何辨認、拒絕或修正。
   - 不展示隱藏 chain-of-thought；只展示可公開的結論、差異、決策與證據。

5. **人類作者責任**
   - 作品選擇、事實內容、視覺方向、資訊架構、修改判斷與最終驗收由申請者負責。
   - AI 僅協助程式、整理、除錯、草稿或檢查。

6. **GitHub 證據**
   - Prompt 版本。
   - Commit history。
   - Changelog。
   - 原始碼。
   - 可重現操作方式。

### 4.4 Repository 建議位置

依現有結構調整，不要建立空檔案：

```text
docs/
  ai-workflow/
    README.md
    portfolio-master-prompt.md
    prompt-changelog.md
    failure-cases.md
```

公開網站只顯示整理後摘要；完整 Prompt 可從 repository 連結查看。

應加入一段誠實揭露，文字可依實際情況調整：

> 本網站使用生成式 AI 協助程式架構、文字整理與錯誤檢查；作品事實、內容選擇、視覺方向、資訊架構、修改判斷與最終驗收由本人負責。

不得只放這句宣告而沒有 commit、diff、版本或失敗案例支撐。

---

## 5. 聲音、多媒體與互動展示

### 5.1 基本原則

- 不得自動播放有聲音的內容。
- 所有聲音啟動必須由使用者手勢觸發。
- 音訊、影片與互動必須有清楚標題、說明、操作提示與 fallback。
- 不應讓視覺特效掩蓋作品敘事。
- 只在有真實作品或實驗時導入 p5.js、p5.sound、Tone.js、Web Audio、wavesurfer 等工具。
- 不要為了看起來「科技感」而加入沒有內容功能的動畫、粒子、頻譜或波形。

### 5.2 Pd 與 REAPER 初學成果

若存在真實素材，可建立可重複使用的展示元件或內容結構：

- 實驗目標
- 訊號流程或 patch 圖
- 操作方式
- 原始聲音與處理後聲音（A/B，僅在真實檔案存在時）
- REAPER session 或處理流程截圖
- 錄音／剪輯／效果器的簡要說明
- 聽覺結果
- 問題與限制
- 下一版預計改善

不得產生假錄音、假 patch、假參數或假分析數據來填空。

### 5.3 Web Audio／p5.js 實驗

若 repository 中已有或可由真實素材完成小型原型：

- 優先做一個有清楚概念的代表性互動，不要堆疊多個半成品。
- 處理 AudioContext 啟動、暫停、重播、錯誤與載入狀態。
- 提供鍵盤可操作方式。
- 尊重 `prefers-reduced-motion`。
- 在手機、觸控與低效能裝置提供簡化模式或靜態 fallback。
- 若互動失敗，仍應能閱讀作品說明與查看紀錄影片。

### 5.4 媒體效能與可靠性

- 圖片使用合理尺寸、lazy loading、poster 與現代格式；不要破壞原始檔。
- 音訊使用網站實際需要的壓縮格式與品質，不要提交無必要的大型無壓縮檔。
- 影片優先使用 poster，避免首頁載入所有影片。
- 大型媒體若不適合進 repository，建立清楚的外部託管邊界與 fallback，不得偷偷移除作品。
- 所有媒體路徑須支援 GitHub Pages 的 base path。
- 缺圖、載入失敗、慢速連線、未支援格式時要有可理解狀態。
- 媒體著作權與來源必須可追溯。

---

## 6. 素材、套件與下載授權

使用者已明確授權你在本輪：

- 安裝既有 dependencies。
- 安裝對建置、測試、媒體最佳化或必要互動有直接價值的套件。
- 下載對內容呈現確有必要的開源程式庫、圖示、字型、範例或工具。
- 使用 repository 既有的套件管理器與鎖檔。
- 執行圖片、音訊、影片的非破壞性最佳化。
- 在有充分理由時加入小型 dev-only 驗證工具。

上述例行、可逆且 repository-local 的行為無須再次詢問。

但必須遵守：

1. 優先使用既有依賴與原生 Web API。
2. 新增 runtime dependency 前先確認它解決真實問題，而非只提供裝飾。
3. 只使用可信來源與可辨識授權。
4. 每個外部素材記錄：
   - 名稱
   - 作者／組織
   - 來源
   - 授權
   - 下載日期
   - 修改內容
   - 使用位置
5. 有下載外部素材時建立或更新 `docs/ASSET_SOURCES.md`。
6. 不得把第三方作品偽裝成申請者創作。
7. 不得下載未授權音樂、影像、圖片、字型或盜版資源。
8. 不得加入追蹤器、廣告、遠端分析、付費服務、秘密金鑰或可疑執行檔。
9. 不得上傳申請者作品到未經授權的第三方服務。
10. 不得為了縮小檔案覆寫唯一原始素材；應保留可回復來源或清楚記錄轉檔流程。
11. 若新增依賴會明顯提高 bundle、維護或安全風險，應選擇更簡單方案並在 handoff 說明。

---

## 7. 視覺設計與 UI/UX 原則

### 7.1 設計方向

視覺應從申請者既有插畫、動畫與影像能力延伸，形成有作者性的系統；不要套用廉價「未來科技／霓虹頻譜」模板。

優先確保：

- 首頁第一屏能快速理解申請定位。
- 作品卡與詳情頁有一致資訊層級。
- 視覺作品與聲音實驗在同一系統中各自被尊重。
- Typography、spacing、grid、media ratio、caption 與互動狀態一致。
- 每個視覺效果都有敘事或操作目的。
- 桌機可深入閱讀，手機可快速掃描與播放。

### 7.2 必須檢查的狀態

- Default
- Hover
- Focus visible
- Active/current
- Disabled
- Loading
- Empty
- Error
- Success
- Media unavailable
- Reduced motion
- Keyboard-only
- Touch interaction

### 7.3 無障礙

以 WCAG 2.2 AA 為目標，至少處理：

- Semantic HTML
- 正確 heading hierarchy
- Skip link
- 鍵盤操作與可見 focus
- 足夠色彩對比
- 圖片 alt
- 裝飾圖片空 alt
- 音訊與影片的文字說明、字幕或摘要
- 非純顏色的狀態提示
- 可理解的按鈕與連結名稱
- Mobile menu focus management
- `prefers-reduced-motion`
- 200% zoom 下仍可使用
- 不依賴 tooltip 承載必要資訊

---

## 8. GitHub Pages 與靜態站限制

必須檢查：

- Relative path 與 base path。
- Assets 在專案頁面與 user/organization page 上是否都能正確載入。
- SPA route refresh 是否 404。
- 404 fallback。
- GitHub Actions 或 Pages build 設定。
- 自訂網域設定（若存在）。
- 不支援的 server-only API、server action、database 或 secret。
- 外部 API 失敗時的 fallback。
- 站內連結、下載連結、作品 demo 與 repository 連結。
- Production build 輸出目錄。
- `.nojekyll`、routing workaround 或 framework-specific Pages 設定是否必要。

若現有專案是純靜態站，不要引入需要長駐 server 的功能。若未來需要動態資料，建立 adapter/interface 邊界與靜態 fallback，但不要假裝後端已存在。

---

## 9. 執行流程

### Phase A — Reconnaissance 與 baseline

至少檢查：

- Repository 文件與指令
- Git status、branch、history
- Package scripts
- Routes／sections／navigation
- Shared components
- Content source
- Styles、tokens、responsive rules
- Forms、buttons、links、download actions
- Audio/video/interactive code
- Accessibility
- Tests 與 CI
- Deployment config
- TODO/FIXME
- 既有 prompt、AI workflow 或相關文件

若有網站 URL，必須同時檢查 rendered site 與 source。若無，使用 repository-native command 啟動本機站。

修改前執行可用的 baseline：

- dependency install
- format check
- lint
- type check
- tests
- production build

把 pre-existing failure 與本輪造成的 failure 分開記錄。

### Phase B — 建立實際稽核與內容矩陣

建立或更新：

#### `docs/PORTFOLIO_AUDIT.md`

| ID | 類別 | 頁面／元件 | 證據 | 對評審或使用者的影響 | 嚴重度 | 是否確認 | 修正方式 | 本輪狀態 | 驗證 |
|---|---|---|---|---|---|---|---|---|---|

類別至少涵蓋：

- `ADMISSION_NARRATIVE`
- `CONTENT`
- `FUNCTION`
- `VISUAL`
- `RESPONSIVE`
- `COPY_UX`
- `ACCESSIBILITY`
- `AUDIO_MEDIA`
- `PERFORMANCE`
- `RELIABILITY`
- `GITHUB_PAGES`
- `AI_DISCLOSURE`
- `TESTING`

嚴重度：

- Critical
- High
- Medium
- Low

每項需標明：

- 已由程式碼或 rendered behavior 確認
- 從不完整內容推論
- 依賴使用者素材
- 依賴學術／內容決策

#### `docs/CONTENT_MATRIX.md`

至少記錄：

| 模組 | 現有內容 | 真實來源 | 完整度 | 公開站處理 | 待補資料 | 不可由 AI 代填的內容 |
|---|---|---|---|---|---|---|

不要把內部 `TODO` 或虛構 placeholder 直接曝光在正式網站。未完成且無法誠實呈現的項目應從正式導覽隱藏，但保留結構與待補紀錄。

### Phase C — 直接實作

優先順序：

1. Broken build、GitHub Pages 路徑、首頁或導覽失效
2. 作品敘事無法理解或首頁沒有清楚申請定位
3. Critical/High accessibility 與 mobile 問題
4. 文字截斷、重疊、水平捲動與媒體破版
5. 假互動、無作用按鈕、壞連結
6. 聲音／影片載入、操作與 fallback
7. 作品內容模型與可維護元件
8. AI 協作頁面與 Prompt 版本證據
9. 研究方向、學習軌跡與內容待補邊界
10. 視覺一致性與低風險 polish

本輪至少要完成可驗證的程式碼改動。不得只建立文件。

對依賴缺失素材的功能：

- 先完成穩定元件、資料契約、loading/empty/error/media-unavailable 狀態與 adapter 邊界。
- 使用清楚標記的非正式 fixture。
- 不得產生看似真實的作品、成果、獎項、數據或研究結論。
- 換成真實素材時應只需替換資料與 mapping，不需重寫 UI。

### Phase D — UI 與破版測試

在有瀏覽器工具時測試：

- 320 × 568
- 375 × 812
- 768 × 1024
- 1024 × 768
- 1280 × 800
- 1440 × 900
- 200% browser zoom

測試內容：

- 長繁體中文標題
- 中英混排
- 無空格長英文
- 長 URL
- 長 email
- 長按鈕文字
- 長 caption
- 缺圖
- 音訊載入失敗
- 影片未載入
- 空資料
- 慢速內容
- Mobile menu
- 鍵盤操作
- Reduced motion
- AudioContext 尚未啟動
- 播放中切換頁面／元件
- GitHub Pages base path

常見問題：

- Global horizontal scroll
- Flex/grid child 缺少 `min-width: 0`
- `white-space: nowrap` 誤用
- 固定高度截斷文字
- 控制項超出容器
- Dialog 超出 viewport
- Sticky header 擋住 anchor target
- 音訊控制與標籤脫節
- 圖片 aspect ratio 造成 layout shift
- Hover-only 操作
- Focus 被移除
- 手機上互動無法結束
- 動畫在 reduced-motion 下仍持續

不要用全域 `overflow: hidden` 掩蓋問題。依情境使用 wrapping、`overflow-wrap`、`min-width: 0`、responsive grid、scroll container、detail disclosure 或 mobile layout。

有 screenshot／browser automation 時，保留必要 before/after 證據；不要提交大量無用圖片。若無瀏覽器能力，明確說明限制，不得宣稱已完成視覺驗證。

### Phase E — 驗證

依 repository 原生方式執行：

- Formatter check
- Lint
- Type check
- Unit tests
- Integration tests
- E2E tests
- Production build
- Link check（若可用）
- GitHub Pages preview／base-path verification（若可用）

另驗證：

- 主要 routes／sections 可進入
- Navigation 與 anchor 可用
- 所有可見按鈕有真實行為
- 音訊不 autoplay
- 音訊能在使用者手勢後啟動
- Loading／empty／error／media unavailable 狀態可用
- 長文字不遮蔽操作
- Keyboard focus 可見
- Reduced-motion 有效
- 新增 dependency 有用途且已鎖定
- 無 secret、env、巨大不必要 binary 或無關 diff

測試失敗時：

1. 判斷 baseline 是否已失敗。
2. 記錄完整 command 與錯誤。
3. 修正本輪造成的失敗。
4. 不得刪弱測試來換綠燈。
5. 未實際通過不得回報通過。

---

## 10. Git 與 GitHub 交付

除非 repository 指令另有規定：

1. 確認 base branch 與 working tree。
2. 建立或切換到 `feat/portfolio-admission-foundation`。
3. 不得直接在 default branch 工作。
4. 保留使用者既有未提交變更。
5. 將變更分成邏輯清楚的 commits。
6. commit 前檢查 `git diff` 與 staged diff。
7. 推送 working branch。
8. 開啟或更新 Draft Pull Request。
9. 不得 merge。
10. 不得 force push。
11. 不得部署到 production；若 branch push 觸發既有 preview，記錄 URL 與狀態即可。

建議 PR title：

```text
feat: strengthen admissions portfolio foundation
```

PR 必須包含：

- 目標與申請情境
- Baseline
- 核心 audit 結論
- 實際修正
- 作品敘事與內容邊界
- 聲音／多媒體／互動改善
- AI 協作展示方式
- 響應式與無障礙
- 新增 dependencies／下載素材與授權
- Commands 與結果
- Screenshots
- Known failures
- 待補素材
- 風險
- Manual review checklist

若無 GitHub 寫入權限，仍需完成本地變更、commit（若允許）與可套用結果，並精確記錄 blocker、嘗試過的操作與後續指令。不得假稱已 push 或開 PR。

---

## 11. 後續 Codex 續作機制

建立或更新：

### `docs/CODEX_HANDOFF.md`

內容必須包括：

```text
# Current State
- Repository
- Base branch
- Working branch
- Last verified commit
- Git status
- Current site status

# Completed This Round
- 實際完成項目與檔案

# Verification
- Commands
- Results
- Browser viewports
- Screenshots

# Content Still Needed From Applicant
- 作品文字
- 圖片
- 音訊
- 影片
- Pd patch
- REAPER 截圖／session evidence
- 研究計畫內容
- 履歷／聯絡資料
- 授權或 credit

# Decisions And Constraints
- 已確認的設計、技術與內容決策
- 不得更動的邊界
- 新增 dependencies 與原因
- 外部素材與授權

# Remaining Work
- P0
- P1
- P2
- Risks
- Blockers

# Exact Resume Commands
- install
- dev
- test
- build
- preview

# Next Codex Starting Instruction
- 一段可直接貼給下一次 Codex、要求它從目前狀態繼續的精簡提示詞
```

每次後續執行必須先讀：

- `AGENTS.md`
- `README`
- `docs/CODEX_HANDOFF.md`
- `docs/PORTFOLIO_AUDIT.md`
- `docs/CONTENT_MATRIX.md`
- 最新 `git log`
- `git status`

後續執行不得重新發明已決定的架構，也不得把已完成項目再次列為待辦。應從 handoff 中最高優先、目前可落地的工作繼續。

---

## 12. 必要 repository 產物

依實際需要建立或更新：

```text
docs/PORTFOLIO_AUDIT.md        # 必要
docs/CONTENT_MATRIX.md         # 必要
docs/CODEX_HANDOFF.md          # 必要
docs/ASSET_SOURCES.md          # 有下載外部素材時必要
docs/ai-workflow/...           # 有公開 AI 協作內容時必要
```

並實際修改必要的：

- Application code
- UI components
- Styles
- Content data
- Media components
- Accessibility behavior
- Tests
- Build／Pages config
- Documentation

不要建立空殼 architecture 檔案來湊清單。每個新增檔案都必須被使用或具有明確交付目的。

---

## 13. 驗收標準

### 申請敘事

- 首頁能在短時間內辨識申請者、跨域背景、聲音學習狀態與研究方向。
- 不把「聲音初學」隱藏，而是轉化為有證據的學習潛力。
- 視覺作品不是孤立陳列，而能連結時間、節奏、動態、敘事與跨感官研究。
- AI 內容是方法論，不是主作品。
- 不存在「製作 LLM」等不精確技術宣稱。

### 工程

- Repository 被實際檢查。
- Baseline 與 after 結果可追溯。
- 有實際程式碼變更。
- 不在 default branch 工作。
- 不包含無關變更。
- GitHub Pages 路徑與 build 可用，或 blocker 被精確記錄。
- 沒有 secret 或未授權素材。
- 新增依賴有明確理由。

### UI/UX 與媒體

- 修改範圍內無已知 Critical/High 文字破版。
- 手機、平板、桌機與 200% zoom 可使用。
- 鍵盤 focus 可見。
- 音訊不 autoplay。
- 聲音、影片、互動有清楚 fallback。
- Reduced motion 有效。
- 媒體錯誤不會讓頁面失去主要資訊。
- 所有可見互動都有真實行為。

### 真實性

- 不虛構作品、獎項、成果、研究數據、技術熟練度、客戶、評論或模型。
- Fixtures 清楚標示為非正式資料。
- 待補內容記錄在文件，不偽裝成已完成。
- AI 協作、人類決策與外部素材來源均可追溯。

### 續作

- `docs/CODEX_HANDOFF.md` 已更新。
- 下一輪可直接依 handoff 繼續，不需重新盤點整個專案。
- 最後回覆清楚區分：完成、未完成、待使用者提供、權限 blocker。

---

## 14. 最終回覆格式

使用繁體中文，僅使用以下章節：

## 1. 執行結果

說明是否完成：

- Repository inspection
- Baseline
- Implementation
- Browser verification
- Commit
- Push
- Draft PR

## 2. 申請作品集的主要問題

依下列分類列出最重要發現、嚴重度與證據：

- 申請敘事
- 內容完整性
- 聲音與多媒體
- 功能
- 視覺與互動
- 響應式與文字破版
- 無障礙
- GitHub Pages
- AI 協作揭露

## 3. 本輪實際完成項目

每項包含：

- Problem
- Solution
- Exact file paths
- 對評審／使用者可見的影響
- Verification

## 4. AI 協作與 Prompt 展示

說明：

- 使用的正確名稱
- 網站中的位置與比重
- 展示的版本／失敗案例／人類決策
- 完整 Prompt 路徑
- 尚缺的證據

## 5. 聲音、影像與互動呈現

說明：

- 實際加入或修正的媒體元件
- Autoplay／AudioContext／fallback
- Pd／REAPER／Web Audio 的真實展示狀態
- 尚缺的素材
- 效能與授權處理

## 6. UI/UX、無障礙與破版驗證

報告：

- Viewports
- 200% zoom
- Long-text cases
- Keyboard
- Reduced motion
- Before／after
- Screenshot paths
- 未能執行的視覺驗證限制

## 7. 測試與建置結果

| Command | Result | Before/After | Notes |
|---|---|---|---|

只回報實際執行結果。

## 8. 下載素材與新增依賴

列出：

- Package／asset
- 用途
- Runtime 或 dev-only
- 來源與授權
- 對 bundle／維護的影響
- 記錄檔案

若無新增，明確寫「本輪未新增」。

## 9. GitHub 交付

列出：

- Repository
- Base branch
- Working branch
- Commit hashes
- Push status
- Draft PR title
- Draft PR URL
- Final git status

## 10. 待補資料、風險與下一輪

只列：

- 真正缺少的申請者素材
- 尚未解決的產品／學術決策
- Known failures
- Blockers
- P0/P1/P2
- `docs/CODEX_HANDOFF.md` 路徑
- 下一輪可直接執行的起始指令

不得把計畫中的工作描述成已完成。

---

## 15. 最後內部檢查

在回覆前，靜默確認：

- 我沒有停在 audit 或計畫。
- 我已做真實 repository 變更。
- 我沒有直接在 default branch 工作。
- 我保留了無關的使用者變更。
- 每個回報的檔案與改動都存在於 diff 或 commit。
- 每個回報的測試都真的執行過。
- 我沒有虛構 browser、screenshot、push、PR 或部署。
- 我沒有虛構作品、聲音成果、研究內容或 LLM。
- AI 協作頁面沒有取代作品本體。
- 聲音不 autoplay，且有 fallback。
- GitHub Pages 路徑已考慮。
- 外部素材與依賴有合法來源與紀錄。
- 沒有 secret、未授權資源或 production mutation。
- `docs/CODEX_HANDOFF.md` 已反映最新狀態。

現在開始：先檢查 repository 指令、Git 狀態與現有網站，建立 baseline，接著直接實作，不要停在規劃階段。
