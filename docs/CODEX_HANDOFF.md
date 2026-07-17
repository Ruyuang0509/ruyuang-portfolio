# Current State

## 2026-07-18 初代動態鑑識復原

- 初代原始碼與錄影只證實 Hero 片語 line-mask stagger 與整個 viewport 的捲動色場轉換；本輪因此只復原 Hero 片語由 `y:112%`、交錯 `±3deg` 進入的節奏。研究介紹首幀維持部分可見，沒有恢復整頁 mount opacity／translate，也沒有新增證據不足的通用 section reveal 或卡片 opacity stagger。
- 現行 fixed viewport field 優於初代 document-root 色彩插值，予以保留；進度依實際 section 幾何維持約 0.8–1.2 viewport 的可停留、可逆範圍。Hero canvas 的永久 `will-change` 已移除。
- `AnimatedDetails` 現在支援 `defaultOpen`、共用 live reduced-motion media query、快速反轉、ResizeObserver 高度 retarget、偏好在動畫中途切換時立即完成，以及完成／unmount 後取消 WAAPI effect。Lenis 也會在 reduced-motion 執行期間變更時即時建立／銷毀。
- 深層 fragment 導覽改為 double-rAF layout settle 與最多兩次 fixed-nav offset 校正；wheel、touch、pointer 或 scroll key 會取消尚未完成的校正，避免先前的長 rAF settle 與使用者輸入競爭。
- 1440×900、2048×767、390×844 rendered matrix 已覆蓋 Hero、轉場 0／25／50／75／100%、正反向與中段停留；轉場 range 分別是 0.914／0.953／0.870 viewport，三組皆 0 horizontal overflow。長逐字稿的 resize-during-open、六次快速反轉、Enter／Space，行動選單 Escape／focus restore 與 fresh console 0 warning／error 均通過。

## 2026-07-17 全畫面捲動漸變與折疊動畫修正

- 只處理兩個指定問題：以 fixed full-viewport field 取代作品索引前的靜態 gradient bridge；以共用 `AnimatedDetails` 與既有 Motion 讓所有實際 disclosure／行動選單具備可逆高度動畫。沒有重設 palette、typography、navigation IA、cards、SEO、responsive system 或其他全站 motion，也沒有新增 dependency。
- 轉場分類為 `narrative guidance` + `atmosphere / authorship`；`#data-visualization-series` bottom 85% → `#project-index-title` top 15% 之間只 scrub 專用 paper／mist／radial layer 的 opacity／transform。Document root、前景 tokens、內容 blur 與 layout 高度不參與。
- Disclosure 分類為 `interaction feedback`：Prompt Template、7 個圖解長描述與中英逐字稿保留 `<details>/<summary>`，實際高度展開 360 ms／收合 300 ms；行動選單沿用 Motion 以相同節奏動畫 height／opacity。Enter、Space、Escape、focus restore、`aria-expanded`、`aria-hidden` 與 `inert` 均保留。
- 移除的 motion／互動：沒有。只移除上一輪非動畫、佔 layout 高度的靜態 bridge，並取代原生瞬間 disclosure toggle；當時的 Hero、R3F、cards、Custom Cursor 與 sound feedback 均未變更。Repository 與初代證據都沒有可確認的通用 section reveal 系統。
- Rendered evidence：1440×900 的 scroll range 約 823 px／0.914 viewport，375×812 約 712 px／0.877 viewport；中段四角與中央同時進入暖灰場域、停止後狀態不漂移、反向捲動可逆、fixed layer 不攔截 pointer，兩種 viewport 均 0 horizontal overflow。375 px 長逐字稿可由約 70 px 展開到 2056 px 再收回；滑鼠、快速反轉、Enter、Space、mobile Escape／focus restore 與 console 0 warning／error 通過。

## 2026-07-17 全站觀看體驗優化

- 本輪採保守式優化：保留既有深墨／暖紙視覺、Hero R3F、GSAP／Lenis、Custom Cursor、卡片與 Web Audio 動效，沒有移除動畫、改寫全域主題、加入 runtime dependency 或變更部署設定。
- Hero 主標改用共用 `EditorialHeading` 的完整語意與受控換行，並收斂行動／桌面字級；320×568、375×812、768×1024、1024×768、1440×900、1920×1080 均可在第一屏看見研究介紹與 CTA，沒有全頁水平溢位。
- Navbar 依目前 hash／可見區段提供 `aria-current="location"` 與明確 active 樣式；桌面、行動與首頁入口的主要點擊目標至少 44 px，行動選單仍保留 Escape 關閉與 trigger 還焦。
- 深層 fragment 導覽會暫時讓目標長案例退出 `content-visibility:auto`，在既有 Lenis range 重算後以有界重試定位；直接載入與從作品索引點擊最後一件案例都落在 fixed nav 下約 96 px。
- 兩件資料視覺化案例的 `titleLines` 已補回完整標題；內容 validator 會把視覺分行攤平後與 `title` 比對，避免窄螢幕只顯示部分標題。
- Reading map 只渲染實際存在的媒體區段連結；移除旗艦聲響案例原本指向不存在 `#interactive-sound-learning-media` 的空連結。Fresh submission preview 共 83 個站內連結，0 broken target、0 duplicate ID、0 broken image、0 console warning／error。

## 2026-07-17 AI 文學故事 MV 觀看體驗續作

- 保留 `generative-interface-study`、共用案例 renderer、深墨／暖紙端點與既有 Hero／R3F／Custom Cursor／卡片／Navbar／Web Audio 動效；本輪沒有移除或改寫全站動畫，也沒有新增全域 RAF、scroll listener 或 runtime dependency。
- AI 案例索引新增 `40 秒 / 8 幕 / EN + zh-TW 字幕 / 影音原型完成，學習成效未驗證` 快覽；header CTA 改為影片、八幕分鏡與 Prompt 設計三個真實同頁 anchor。
- Featured video 使用 `preload="metadata"`，Save-Data 為 true 時降為 `none`；保持 paused、native controls、`playsInline`、16:9 intrinsic size、`object-fit: contain`、English 預設與 `zh-TW` 繁中 subtitle track。影片摘要另揭露 00:40、8 scenes、instrumental／no narration。
- 完整版規格補齊五階段的工具／輸入／產出／控制條件／人工檢查點；媒體層改為故事節點 → 場景圖像 → 英文字幕／情節文字 → 情緒配樂 → Canva 剪輯與最終影片，不再把未存在的旁白列為媒體層。
- 共用圖片 renderer 在載入失敗時保留固定比例、alt 語意與同卡文字；本機影片具 loading／ready／error 狀態，runtime error 仍顯示 Poster、直接 MP4 連結、Storyboard 與逐字稿，subtitle error 會導向同頁雙語逐字稿。
- 「播放案例影片」在同頁 anchor 完成後把焦點交給 native video；初始深層 hash 會只展開 fragment 所屬長案例、重算既有 Lenis scroll range 再定位，修正 `content-visibility` placeholder 把深層目標夾在舊上限的實際問題。
- 八幕 storyboard 現在含中英標題、時間、數值 `seekSeconds`、英文畫面文字、情節、控制條件與每幕「跳至此幕」按鈕；Scene 01／04／08 實際定位到 0／15／35 秒且不自動播放。手機另有上一幕／下一幕與目前幕數，鍵盤支援左右／Home／End。
- 第一輪 browser 回歸發現 smooth rail navigation 在快速 End → Home → ArrowRight 時會讓視覺位置與目前幕數短暫不同步；只將新加入的 storyboard rail 鍵盤／上一下一幕改為立即 snap，保留 Scene → video 的低幅度平滑導引。既有品牌動畫未變更。
- 中英畫面文字逐字稿維持八段，新增每幕畫面描述與配樂情緒（設計意圖），並明示「無歌詞配樂、沒有旁白或對話、不是語音辨識結果」。
- 外部證據檢查：Canva 短網址可在未登入狀態讀到正確 40 秒 Hamlet 專案，但導向可編輯介面；四個 ChatGPT share URL 只能讀到標題，對話內容顯示登入牆。因分享權限、內容可讀性與權利 gate 未完成，兩者都維持不進 submission UI，結果記於 `portfolio.internal.js`。
- Fresh browser matrix：320×568、375×812、768×1024、1024×768、1276×720、1440×900、1920×1080、2560×1080 均為 0 global/case overflow、0 broken image；8 frames、8 seek buttons、2 prev/next controls、2 text tracks 與 3 個有效 CTA 全部存在。375×812 行動選單 Escape 關閉並還焦，Storyboard CTA 落在 fixed nav 下約 120 px；VTT／MP4／AVIF／WebP preview endpoints 均 200 且 MIME 正確。
- Browser 能確認 English track 初始 `showing`、繁中 track `disabled`、影片 paused／duration 40／兩軌、CTA／hash／transcript／seek；目前工具無法穿透 native video shadow controls 可靠操作字幕選單與音量，也無法模擬 Save-Data、system reduced-motion 或真實 browser 200% zoom。這些仍列為人工／實機限制，不以原始碼檢查冒充互動通過。
- Motion-forensics 直接前後 Lighthouse：修正前 archive `2026-07-17T16-21-04-610Z` 為 mobile Performance／Accessibility 94／100、LCP 2634 ms、TBT 75 ms、transfer 459090 B，desktop 100／100、LCP 555 ms、TBT 0 ms、transfer 442761 B。最終原始碼兩次 run 都維持 mobile 94、desktop 100；最新 archive `2026-07-17T17-31-33-225Z` 為 mobile LCP 2651 ms、TBT 90 ms、transfer 460502 B，desktop LCP 560 ms、TBT 0 ms、transfer 444173 B，另一 run 的波動上界為 mobile 2654／98 ms、desktop 602／38 ms。Accessibility／Best Practices／SEO 100、CLS 0；這仍是 localhost lab，不是 production field data。
- 375px 實際 404 模擬：移開 built MP4 後保留 Poster、直接連結、8 幕 Storyboard、8 cue 逐字稿與 0 overflow；移開 Scene 01 六個 responsive files 後卡片仍高 556 px，時間碼與跳轉控制保留。English VTT 的 4180 media cache 未重新觸發 error event，因此 subtitle-error UI 沒有被冒充為已模擬通過；正常兩軌與 transcript fallback 已驗證。

- **Repository：** canonical local workspace 為 `C:\Users\911su\Documents\Codex\如願個人網站`；`origin` 為 `https://github.com/Ruyuang0509/ruyuang-portfolio.git`。
- **Base branch：** `main`，本機與 `origin/main` 目前均指向 `6b6e689`；本輪全程留在既有 feature branch，沒有切換、merge 或改寫 `main`。
- **Working branch：** `feat/portfolio-admission-foundation`，追蹤同名遠端分支。
- **Last verified commit：** 本機 HEAD `8c0c04d`，`origin/feat/portfolio-admission-foundation` 為 `12710dc`；本機分支 ahead 1／behind 0。
- **Git status：** 本任務開始時只有使用者前一項工作留下的 `AGENTS.md` 修改；本輪保留該檔並新增 AI MV runtime／validator／文件修改，全部仍未 stage、commit、push 或 stash。本任務沒有 merge 或 production deploy。
- **Current site status：** 已知 hidden asset、built construction wording、scanner 假陰性、metadata drift、hidden completeness 假警告與 Three 超大 lazy chunk 均已在本機 closure。`generative-interface-study` 已重構為 AI 文學故事 MV，含成片、雙語字幕、八幕實際畫面、衍生 Prompt Template 與 planned evaluation，但維持 `notValidated`；權利 publication gate 仍刻意 blocked。正式使用者研究、權利簽核、輔具／實機與 production hosting 仍未完成。

# Documentation Package Refresh

- 沿用 `docs/website/` 七份模組化文件；沒有新增重複的單一總檔。
- 重新核對 repository、Git、routes、content data、components、styles、Web Audio、public assets、scanner、Pages workflow、既有 `dist/` 與 Lighthouse lineage。
- 修正「沒有 Git repository」、「workflow 尚未 push」、「scrollbar 被隱藏」、「hidden case 僅在 internal data」等失效敘述。
- 明確區分 hidden React data、submission bundle content 與 Vite public asset copying。
- 將 stale metadata、scanner 假陰性、hidden-only media 與 performance evidence freshness 納入 GAP、audit、content matrix 與 pre-submission checklist。
- 2026-07-16 文件包整理本身未修改 runtime；2026-07-17 closure sprint 的實作變更另列於下方。

# Completed This Round

- 修正 GitHub Pages project-site 路徑：`vite.config.js` 使用可攜式 base，`portfolio.js` 透過 `BASE_URL` 組 public assets，`index.html` 使用 `%BASE_URL%`。
- 新增 `scripts/audit-pages-build.mjs` 並串入 `check:submission`；加入 manual-only `.github/workflows/deploy-pages.yml`，但沒有 push 或部署。
- 新增公開但低比重的 `#ai-workflow`：`AiWorkflowSection.jsx`、`portfolio.js`、Learning Trail 導引；保存 Prompt v1/v2、changelog 與兩個實際失敗案例於 `docs/ai-workflow/`。
- 強化聲音原型：加入第四個鍵盤 range「濾波亮度」、數值 readout、starting／busy 狀態、3 秒 AudioContext resume timeout、pending context cleanup 與可讀 fallback。
- 強化導覽與 reduced motion：anchor 後聚焦目標標題、行動 Escape focus restore；最終移除整頁 mount opacity／translate，讓主要內容從首幀可讀。
- 修正 320px 繁中 display heading 越界、暖紙主題 accent 對比、fine-pointer custom cursor 啟用條件。
- 新增 `RootErrorBoundary.jsx` 並在 `main.jsx` 包住應用根節點。
- 建立 `docs/PORTFOLIO_AUDIT.md`、`docs/CONTENT_MATRIX.md` 與本 handoff；同步現況、架構、差距及提交檢查文件。
- 續作修正桌面鍵盤 anchor：六個固定導覽連結與 Logo 的 Enter 會把焦點交給目標 heading；桌面滑鼠不強制搬移，行動 focus／Escape 行為保持。
- 將 Web Audio 非 React 邏輯抽成 `src/audio/webAudioEngineCore.js`，新增 cancellable resume、35 ms release／50 ms cleanup、頁面隱藏即時清理、context interruption、重疊 start 與建圖失敗 cleanup。
- 新增 `tests/web-audio-engine.test.mjs`；`test:sound` 從 5 個 mapping tests 擴充至 18 個 mapping＋lifecycle tests，未新增依賴。
- 重建 `scripts/run-lighthouse.mjs` 的證據鏈：固定 submission mode／相對 base、submission／Pages scan、動態 preview port、完整 `dist` 與 build-input（含動態 `.env*`）逐檔 manifest、受測 artifact 重驗與保留、完整 resolved profile／benchmark／OS／CPU 環境指紋、freshness／URL／runtime／metrics 驗證、精確 cleanup-error 白名單與 run-specific temp。
- harness 現在從 build 前到發布完成持有跨程序獨占鎖；只回收 metadata 完整且 PID 明確不存在的 stale lock。每個唯一 archive 先寫齊 raw reports、conditions、CLI transcript、manifests 與完整受測 `dist`，最後原子建立 `archive-complete.json`；沒有 completion marker 的目錄不算成功。canonical reports／history 具 rollback，latest summary 最後 atomic replace 作權威指標。
- 每次 audit 保留 mobile／desktop raw JSON、CLI stdout／stderr 與雜湊、latest summary、最近 20 次 history 與 timestamp archive；latest summary 最後才發布，失敗時保留上一份成功證據。
- 2026-07-17 曾修正 Hero LCP：移除整頁 mount opacity／translate，讓介紹與標題首幀可讀；Three 從約 0.29 秒延後至 mobile 約 1.67 秒後請求。2026-07-18 只在片語內層復原 line-mask transform，介紹仍由部分可見狀態進場，沒有恢復整頁隱藏。延遲完成後仍重新檢查目前幾何位置與頁面可見性，只有 Hero 在 240 px preload window 內才首次下載；首次載入後保持 mounted、離屏只暫停 frame loop。場景 lazy／WebGL 錯誤由 Hero 內局部 boundary 接住，不移除標題、介紹或 CTA。
- 移除 document root 的捲動主題切換；支持作品 gallery 與 Reviewer Path 維持局部 `paper-surface` tokens。本輪再把當時加入的無文字靜態 bridge 替換為 fixed full-viewport 場域；ScrollTrigger 只控制專用背景層與 fixed nav chrome，不修改內容或 root palette。
- 已封存的對照 run（主要文字已靜態、Three 尚未延後）為 mobile Performance 87／LCP 3.463 s；其後同一 artifact、source content fingerprint 與 profile fingerprint 的三次 run 為 Performance 96–97、LCP 2.258–2.407 s、TBT 23–34 ms，LCP node 均是 `#hero-title`。
- 修正 Lighthouse 找到的兩項可及性問題：暖紙研究卡的 contextual text color，以及 sound pad 無角色卻使用 `aria-label`；pad 現為具說明的 `role="img"`，四個 range 仍是鍵盤操作入口。
- 將聲音 `role="status"`／live region 移出 `aria-busy` 控制群組，啟用中的 pending 期間仍可立即向輔具宣告；停止按鈕、Escape、離屏與 cleanup 都能取消 pending start，不會在使用者離開後才延遲啟動。
- 恢復長頁的平台 scrollbar 後，本輪進一步讓它穩定繼承 root 深色 tokens；局部暖紙 section 不再造成整頁 scrollbar 變色。
- 將 `body` 最小寬度改為不超過實際可用寬度，避免 320 px viewport 加上 15 px 平台 scrollbar 後產生水平溢位。
- 即時核對有效 Git history、`origin` 與既有 Draft PR #1；更新 handoff、audit 與 content matrix 中已失效的「空 `.git`」敘述，沒有建立重複 PR、merge 或 deploy。
- 完成 submission boundary closure：hidden case 移至 draft-only data alias 與空 media state，移除 13 個孤立 `ph-after-*`／`mv-soft-*` placeholders 及 generator refs；submission-only middleware 讓舊 media／`dist` URL 明確回 404且有效媒體維持 200，filesystem deny 讓 restricted／internal／hidden／historical paths 回 403。
- Scanner 拆成 injectable core 與 thin CLI，目前共有 48 個 text rules、6 個 inventory rules、fail-closed／redacted diagnostics 及 36 個 Node fixtures；bad output exit 1、clean output exit 0。
- 對齊 `llms.txt`、favicon、social preview、index／JSON-LD、案例 SEO 與可及性 label 的 RU / YUAN／Sound, Interaction & Learning 品牌；不新增未知 URL、聯絡或社群資料。
- 保留 `generative-interface-study` anchor，將案例重構為「AI 文學故事 MV」：匯入 40 秒／8 幕 clean MP4、英文／繁中 WebVTT，從實際成片衍生 responsive poster、4:5 索引封面與八幕 storyboard；共用 renderer 新增可選 workflow、Prompt 決策、媒體分層、證據分類、價值卡、next steps、CTA、多字幕與完整逐字稿，沒有新增 runtime dependency。
- 補齊案例行動可及性：CTA 明確維持至少 44 px 高；八幕 storyboard 可聚焦，支援左右方向鍵、Home 與 End，並提供螢幕閱讀器操作說明；reduced-motion 下取消平滑捲動。
- 新增 Hamlet evidence manifest／形成性計畫／權利 checklist；`audit:evidence` 驗證 direct-copy hashes、60 份 derivative inventory hashes／dimensions、VTT／逐字稿與 63-file public inventory。`check:publication` 需要 applicant attestation 與每一 rights item 的完成狀態／evidence refs，不能只改頂層 status。
- 以 `LeanR3FCanvas` 取代通用 `<Canvas>` namespace extension，只註冊 8 個 Three constructors；Hero section 接收 pointer events，StrictMode cleanup 可取消，離屏使用 demand frameloop。Vite 3D lazy closure 降為 638232 raw／169223 gzip B，最大單檔 483687 B，並由遞迴 built-import budget audit 防回歸。
- Submission scanner 新增 VTT、Web Manifest 與 source map 文字掃描；本輪加入編輯框架 regression 後共有 36 個 fixtures。
- 將編輯用 `portfolioPriorityRules` 移至 draft-only `portfolio.internal.js`；submission scanner 另對其中兩個已知編輯框架句建立 fail-closed regression，避免它們回流公開 bundle。
- 公開案例以 `themeEvidenceStatus` 把本所連結分為 `demonstrated` 與 `researchDirection`；`instituteEvidenceGroups` 只從正確公開案例的 demonstrated 關係派生。公開對齊摘要因此不列尚無直接作品證據的「沉浸式體驗」與「數位孿生」；案例內頁仍可保留，但必須明標為未來研究方向。
- navbar 移除高成本的固定 backdrop blur，改用較不透明表面；Hero canvas 的永久 `will-change` 也已移除，案例媒體只在 hover／focus-within 時暫時晉升。Reduced motion 將 fixed field 改為離散端點並立即切換 disclosure；Lenis 與 disclosure 會回應執行期間的偏好變更。Print 隱藏場域、展開 disclosure 並強制紙色可列印表面。

# Verification

## Commands and results

- **2026-07-17 全畫面漸變／折疊動畫重驗：** `pnpm run doctor` exit 0；workspace、media、text、CJK、evidence、5 件 content validation、18/18 sound tests、draft/submission builds、36/36 scanner fixtures、48 個 text rules、6 個 inventory rules與 Pages audit 全部通過。Submission 為 463 modules、initial JS 193157 gzip B、entry 157531 B、CSS 43103 B，lazy 3D closure 維持 638232 raw／169223 gzip B。In-app Browser 在 1440×900 與 375×812 驗證 fixed viewport、可停留／可逆 scroll scrub、兩向 details animation、Enter／Space、mobile menu Escape／focus restore、0 horizontal overflow 與 0 console warning／error。`pnpm run audit:lighthouse` exit 0；archive `2026-07-17T10-53-04-160Z`，mobile 94／100、LCP 2632 ms、TBT 56 ms，desktop 100／100、LCP 548 ms、TBT 0 ms，兩者 CLS 0。

- **2026-07-17 全站觀看體驗最終重驗：** `pnpm run doctor` exit 0；workspace、media、text、CJK、evidence、5 件 content validation、18/18 sound tests、draft/submission builds、36/36 scanner fixtures、48 個 text rules、6 個 inventory rules與 Pages audit全部通過。Submission build initial JS 191708 gzip B、entry 152360 B、CSS 41283 B；lazy 3D closure 維持 638232 raw／169223 gzip B，沒有新增 runtime dependency 或 Vite oversized warning。Fresh browser matrix 與 83 個站內連結稽核結果記於本文件最上方。

- **2026-07-17 institute alignment／theme boundary 前一輪基線：** 1276×720 submission preview 在同一段邊界往返三次的 Chrome trace，style recalculation 由修改前 614 次／68.56 ms 降至 7 次／1.25 ms；Paint 由 5022 次／487.12 ms 降至 7 次／4.39 ms；`#document` Paint 由 612 次／282.18 ms 降至 7 次／4.39 ms。前後都沒有大於 50 ms 的主執行緒長任務或 console issue。DrawFrame signal 未呈現改善：修改前 p95／max 為 13.97／48.10 ms，修改後為 20.99／48.87 ms，因此該輪只確認全域 repaint closure，不把 headless trace 解讀為 FPS 已提升。當時六個指定 viewport 都是 0 horizontal overflow、0 evidence-card overflow、0 loaded broken image，且仍使用 96–200 px 靜態 bridge；本輪已以 fixed viewport field 取代該基線。五條舊編輯規則均未出現在 submission `body.innerText`，四個 evidence group 與 10 個案例 links 全部可解析。

- **2026-07-17 known-gap optimization 最終重驗：** `pnpm run doctor` exit 0；workspace、media、text、CJK、evidence、5 件 content validation、18/18 sound tests、draft/submission builds、33/33 scanner fixtures、46 個 text rules、6 個 inventory rules與 Pages audit 全部通過。Submission scan 盤點 127 files／22 text files；initial JS 187397 gzip B，lazy 3D closure 638232 raw／169223 gzip B，三個 lazy chunks 均低於 500000 B，無 Vite oversized warning。獨立 `dist` 稽核確認 manifest／public／dist 各 63 個 Hamlet assets、public↔dist hash 差異 0，hidden／restricted／delivery-only／local paths／舊品牌與 dead anchors 全為 0。`check:publication` 預期 exit 1，逐項指出 rights、attestation 與 evidence refs 尚未完成。
- **2026-07-17 Power BI metadata closure 重驗：** Spotify Wrapped 製作日期依申請者更正為 `2026/04/23`；Power BI 實作日期依日期備註與申請者確認為 `2026/06/11–2026/06/12`。`pnpm run content:check`、`pnpm run test:submission-scanner`、`pnpm run build:draft`、`pnpm run check:submission`、`pnpm run doctor` 與 `git diff --check` 全為 exit 0；content 5 件、sound 18/18、scanner 32/32，submission 套用 46 個 text rules／6 個 inventory rules。獨立 `dist/` 盤點為 63 files／19 text files；兩個日期各出現 1 次，4 個公開案例 ID 存在，hidden ID、中文佔位語句、受限／raw data、local paths 與敏感檔名皆為 0。未執行 Lighthouse、deployment 或 Git delivery。
- **2026-07-17 submission closure 最終重驗：** `pnpm run doctor` exit 0；workspace、media、text、CJK、5 件 content validation、18/18 sound tests、draft build、31/31 scanner fixtures、submission build、44 個 text rules、6 個 inventory rules 與 Pages audit 全部通過。獨立 final `dist/` 盤點為 63 files／19 text files；construction、舊品牌、dead anchors、hidden case／assets、restricted／raw data、local paths 與 short YouTube 全為 0。乾淨啟動的 submission dev 對 13 個舊 media URL 與 `/dist/*` 回 404、有效 media 回 200，restricted／internal／hidden／report 回 403；公開 `portfolio.js` 回 200 且不含 hidden ID。未執行 Lighthouse。
- **2026-07-16 修正前文件包重驗：** `pnpm run doctor` exit 0；workspace、media、text、CJK、5 件 content validation、18/18 sound tests、draft build、submission build、當時的 31-term scanner 與 Pages audit 全部通過。`generative-interface-study` 仍只有「媒體證據」非阻斷警告；Three chunk 約 851.22 kB／gzip 225.76 kB，保留 >500 kB warning。
- **2026-07-16 修正前獨立 fresh `dist/` audit：** built bundle 當時仍有兩處「施工模式」；`dist/media/portfolio` 當時仍有 13 個 `ph-after-*`／`mv-soft-*`／MP4 hidden-only 檔；`llms.txt`／favicon 仍是 Nextgen Portfolio，並含 `#graphic`／`#photo`／`#contact`。`immersive-memory-map` ID／標題、`時間待確認`、Power BI restricted 檔名、local path 與敏感副檔名未找到。這是本次 closure 的修正前基線，不代表目前狀態。
- **2026-07-16 修正前文件 QA：** 當時更新文件的相對 links 全部可解析、Markdown fences 成對、`git diff --check` 通過；該輪 tracked diff 只有 Markdown。
- `pnpm install --frozen-lockfile`：exit 0、lockfile 已是最新；本機使用 pnpm 11.9.0。pnpm 自動查詢自身更新時因受限網路出現 registry metadata fetch warning，不影響既有依賴安裝。
- `pnpm run doctor`：exit 0；依序完成下列全部本機門檻。
- `pnpm run workspace:check`：通過，確認 canonical workspace。
- `pnpm run audit:media`：通過，無遠端 demo media 或過時 preconnect。
- `pnpm run audit:text`：通過，未偵測疑似 mojibake。
- `pnpm run audit:cjk`：通過；320px 修正後 rendered heading 無越界。
- `pnpm run content:check`：通過 5 個資料項目；AI 文學故事 MV 的 provenance／workflow／媒體／deliverables／evaluation plan 均通過，submission-hidden completeness 群組正確標為不適用，無 warning。
- `pnpm run test:sound`：18/18 通過；5 個 mapping tests、13 個 Web Audio controller lifecycle tests。
- `pnpm run build:draft`：通過。
- `pnpm run check:submission`：通過；36 個 scanner regression fixtures、48 個 text rules、6 個 inventory rules、22 個 built text files 與 Pages root-relative asset audit 通過。
- `pnpm run build:submission`：通過；463 modules、entry 160462 B、CSS 43286 B、initial JS 194195 gzip B；lazy `HeroScene` 151720 B、`three-core` 483687 B、`vendor` 3273 B，完整 closure 638680 raw／169383 gzip B，無 oversized warning。
- `pnpm run audit:lighthouse`：最終原始碼連跑兩次皆通過；最新 archive `2026-07-17T17-31-33-225Z` 為 mobile Performance／Accessibility 94／100、LCP 2651 ms、TBT 90 ms、transfer 460502 B，desktop 100／100、LCP 560 ms、TBT 0 ms、transfer 444173 B，兩者 CLS 0。直接修正前 archive `2026-07-17T16-21-04-610Z` 的對應值為 mobile 94／100、2634 ms、75 ms、459090 B，desktop 100／100、555 ms、0 ms、442761 B。Fresh 報告都通過 runtime／fingerprint／manifest 驗證；已具名的 Chrome profile cleanup `EPERM` 只在報告完成後出現並由 harness 驗證保留。這是 localhost simulated lab，不是 production field data。
- 另做真實雙程序互動測試：持鎖 audit exit 0、競爭 audit 快速 exit 1、競爭期間既有 summary SHA-256 不變，完成後無 lock 殘留；此測試結果未另封存成 archive evidence。Lighthouse CLI 在目前 Windows 環境有時會在完成 JSON 後因 Chrome profile cleanup `EPERM` 回傳 1；harness 只有在 fresh report 通過全部驗證，且 stderr 精確符合該 run 專屬 Chrome temp 的已知 `rm`／`Launcher.destroyTmp` 簽章時才降為具名 warning並封存完整輸出。其他非零退出一律失敗。

## Browser viewports

- AI 文學故事 MV 最終 submission preview 以 320×812、375×812、768×900、1024×900、1440×900 實測；五組實際 `innerWidth` 與要求一致，global horizontal overflow 皆為 0，案例內 broken image 皆為 0。
- 五組皆渲染 5 個 workflow 階段、4 張 Prompt 決策卡、8 幕 storyboard 與 3 張成果卡；三個 header CTA 目標存在，320 px 最小 CTA 高度實測 44 px。
- 歷史五組皆為 paused、無 `autoplay`、有 controls／`playsinline`；2026/07/17 續作後 featured video 改為一般 `preload="metadata"`／Save-Data `none`，English／`zh-TW` subtitle tracks 均存在，英文預設軌載入為 showing，兩個 VTT endpoint 回 `200 text/vtt`。
- 2026/07/17 續作在 375×812 實際點擊「查看八幕分鏡」後，目標停在 fixed header 下約 120 px；中英畫面文字逐字稿可展開並含 8 cues。320×568 storyboard 的 End／Home／ArrowRight／ArrowLeft 依序同步到 Scene 08／01／02／01；最終 preview console warning／error 為 0。
- 320×568、375×812、768×1024、1024×768、1280×800、1440×900。
- 六組皆為 0 global horizontal overflow、0 broken image；fixed nav 與 sound controls 在 viewport 內。
- 375×812：行動 menu 可開啟、Escape 關閉並還焦；anchor 後焦點進入目標 heading。
- 1440×900：桌面六個 nav links 與 Logo 皆以 Enter 更新正確 hash 並聚焦目標 H1／H2；滑鼠點擊仍保留 link focus。
- 1024×768：聲音無 autoplay；啟用後顯示 busy，AudioContext 未恢復時逾時為可讀 error fallback。
- refactor 後 1024×768 再驗證 `尚未啟用 → 聲音啟用中 → 聲音啟用失敗`，`aria-busy` 回到 false、按鈕可重試，console error 為 0。
- 700px fine pointer 不啟用 custom cursor；800px fine pointer 才啟用。
- 未能可靠模擬真實 200% zoom、系統 reduced-motion、screen reader 與實機觸控，不能視為已通過。

## Screenshots

- `reports/browser/2026-07-16-before-mobile-375x812.png`
- `reports/browser/2026-07-16-after-mobile-375x812.png`
- `reports/browser/2026-07-16-after-desktop-ai-workflow-1440x900.png`
- `reports/browser/2026-07-16-after-sound-fallback-1024x768.png`
- `reports/browser/2026-07-17-ai-mv-before-{index,case,boundary}-{375x812,1440x900}.png`
- `reports/browser/2026-07-17-ai-mv-after-{index,case,storyboard,boundary}-{375x812,1440x900}.png`
- `reports/browser/2026-07-17-ai-mv-full-before-{index,case,video,storyboard,boundary}-{375x812,1440x900}.png`
- `reports/browser/2026-07-17-ai-mv-full-after-{index,case,video,storyboard,boundary}-{375x812,1440x900}.png`
- `reports/browser/2026-07-17-ai-mv-full-pass4-workflow-{375x812,1440x900}.png`
- `reports/browser/2026-07-17-ai-mv-full-after-media-layers-final-1440x900.png`
- `reports/browser/2026-07-17-ai-mv-full-{video,image}-error-fallback-375x812.png`

# Content Still Needed From Applicant

- **作品文字：** 正式研究計畫、最終申請敘事簽核、各案例真正的測試觀察與限制。
- **圖片：** AI 文學故事 MV 已有八幕成片畫面；仍缺原始場景圖與完整 Prompt log。Power BI 真實結果影像預設不公開，只有另取得資料提供方明確許可後才重新評估。
- **音訊：** 可公開的 Pd 或 REAPER 輸出；旗艦原型若要加入錄製，也需申請者提供或確認。
- **影片：** Hamlet clean MP4、雙語 WebVTT 與逐字稿已核對；仍需實機／多瀏覽器字幕測試。既有 YouTube captions／transcript 仍待人工核對；如有旗艦操作錄影與字幕可補。
- **Pd patch：** 真實 patch、signal flow、操作說明與反思；目前沒有。
- **REAPER evidence：** 真實 project/session 截圖、軌道／效果鏈與可公開輸出；目前沒有。
- **研究計畫：** 題目、問題、方法、對南藝大聲響科技研究所的官方資料核對與申請者最終決定。
- **履歷／聯絡：** 公開 Email、GitHub／社群、履歷 PDF 及公開範圍；目前 Reviewer Path 只提供站內 CTA。
- **授權／credit：** Hamlet delivery 未附八張生成圖與音樂的權利／來源清單，不得宣稱已獨立驗證；Power BI 資料來源已補 credit，真實結果另行公開許可仍未取得；其他外部影片、團隊作品角色、媒體著作權與引用方式仍待核對。

# Decisions And Constraints

- 保留 Vite + React 19、Motion、R3F、Tailwind v4、GSAP／Lenis 與資料驅動案例架構；本輪沒有框架遷移。
- Web Audio 是目前唯一可操作聲響證據；Pure Data／REAPER 必須維持「學習中」，直到真實 artifact 存在。
- 音訊不得 autoplay，只能由明確手勢啟動，且要能 stop、cleanup、unsupported／timeout fallback。
- R3F 保持 lazy／progressive，DOM 首屏文字維持 LCP path；Three 在 mobile 延後、且 Hero 仍在 preload window／可見頁面內才請求。目前 lazy 3D closure 為 638680 raw／169383 gzip B，最大單一 chunk 483687 B；變更後 mobile lab 為 Performance 94、最新 LCP 2.651 s。2026-07-18 的 Hero line-mask 不重新隱藏整頁或介紹，仍須以低階真機決定是否再簡化。
- 公開文案只在 `portfolio.js`；施工備註只在 `portfolio.internal.js`；submission 隔離不可退回 CSS hiding。
- `restricted-media/` 不得移入 `public/`；不可重加 remote demo media、付費 GSAP plugin、假測試結果或假聯絡連結。
- AI 使用「生成式 AI」或「大型語言模型（LLM）協作」名稱；不得宣稱自研 LLM。作品事實、選件、視覺方向、取捨與驗收由申請者負責。
- GitHub Pages workflow 只有 `workflow_dispatch`；本輪不得 production deploy、merge 或 force push。
- 新增 dependencies：無。AI 文學故事 MV 使用使用者提供的本機交付資產，僅匯入 clean MP4、兩條 WebVTT 與從成片衍生的 responsive 圖像；沒有網路下載第三方素材。使用者提供的兩份網站 prompt 仍以 Markdown 原文保存，非 runtime dependency。

# Remaining Work

## P0

- 由申請者完成 Hamlet 場景圖、音樂、文學來源與 Canva 專案的具名日期權利聲明，並為每一項附 evidence refs；完成前 `check:publication` 應維持失敗。
- Power BI 原始資料、清洗檔、儀表板實作檔、實際截圖與含真實結果的操作紀錄維持隔離；只有另取得資料提供方明確許可後才重新評估。

## P1

- 完成 Web Audio 與 AI 文學故事 MV 的形成性使用者測試、任務觀察與版本比較；公開結果前保留原始紀錄與同意依據。
- 補一個可公開的 Pure Data 或 REAPER 最小 artifact。
- 以 NVDA／VoiceOver、真實 200% zoom、system reduced-motion、iOS／Android 與多瀏覽器 Web Audio 做人工矩陣。
- 人工核對 YouTube captions／transcript；決定履歷、聯絡資料與正式研究計畫。
- Draft PR #1 完成內容與人工驗收後，再由使用者決定何時執行 manual Pages workflow 並檢查真正 project-site URL；本輪不得部署。

## P2

- 最新 Lighthouse archive 支持目前 638680 raw／169383 gzip B 的延後 3D closure，且沒有單一 chunk 超過 500000 B；仍需低階 Android／iOS、Save-Data、耗電／GPU 與正式 Pages URL 的真機／field evidence 才決定是否進一步簡化。
- 若未來加入正式 browser test runner，補 React controls、Escape、IntersectionObserver 與 live-region 自動測試；AudioContext controller lifecycle 已有 13 個 Node tests。
- 評估加入不含部署權限的 PR-only Windows CI，使 `pnpm run doctor` 不只依賴本機執行；目前 PR 沒有 connector 可見的 checks 或 workflow runs。
- 正式 hosting 決定後補 canonical URL、1200×630 raster social preview、domain／privacy 決策。

## Risks and blockers

- Git repository、remote branch 與 Draft PR 已確認，但目前沒有 connector 可見的 remote checks、workflow runs 或 production Pages 證據。
- Scanner 已攔截目前已知 text／inventory regressions，但仍以獨立 `dist/` 搜尋避免循環自證；新 leak 類型需要新增 rule 與 fixture。
- 2026-07-18 runtime 對應的 Lighthouse fingerprint 已封存；後續任何 runtime、build 或 audit script 改動後仍必須重跑，不能沿用本輪分數。
- 真實使用者研究、聲音作品與授權資料不在 repository，工程端不能代填。
- In-app Browser 無法可靠模擬 screen reader、真實 zoom、reduced-motion 或實機音訊；這些仍需要人工測試。

# Exact Resume Commands

```powershell
pnpm install --frozen-lockfile
pnpm run dev:submission
pnpm run doctor
pnpm run build:submission
pnpm run preview:submission
```

需要效能證據時才執行：

```powershell
pnpm run audit:lighthouse
```

每輪開始先執行：

```powershell
git rev-parse --show-toplevel
git status --short --branch
git branch -vv
git remote -v
git log --oneline --decorate --graph --all -n 15
```

# Next Codex Starting Instruction

先讀 `AGENTS.md`、`README.md`、`docs/CODEX_HANDOFF.md`、`docs/PORTFOLIO_AUDIT.md`、`docs/CONTENT_MATRIX.md`，確認仍位於 `feat/portfolio-admission-foundation`、與 `origin` 的差異及 Draft PR #1 現況，再執行 `pnpm run doctor`。從 handoff 中不依賴缺失素材的最高優先項續作；保留既有 Vite／React 架構、draft/submission 邊界、可見平台 scrollbar 與無 autoplay 規則，完成後執行相稱的 browser matrix、更新 handoff，只 push working branch 並更新既有 Draft PR，不得修改／push `main`、建立重複 PR、merge 或 production deploy。
