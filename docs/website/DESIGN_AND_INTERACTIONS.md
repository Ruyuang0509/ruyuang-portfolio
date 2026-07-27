# 視覺、互動、響應式與可及性

## 2026-07-27 最新響應式檢查

- 1440×1000：作品索引 4 卡為 2×2，各約 875×611 px；資料視覺化流程為 4 欄，各約 301×209 px。
- 390×844：作品索引為單欄，卡片寬 330 px；流程為單欄，四卡各約 330×199 px。Hamlet 與 Hero、Web Audio、研究構想、Power BI、AI、contact 的 page／section overflow 均為 0。
- 兩個 viewport 均為 0 dead anchors、0 console warning／error；行動選單的「開啟區段選單／關閉區段選單」狀態與「代表作品」落點通過。沒有移除 Hero、卡片、游標、聲音、段落揭露、GSAP／Lenis 或 R3F 動態。
- 本輪是 targeted Browser smoke，不等於完整 WCAG、screen reader、真實 200% zoom、system reduced-motion、實機或多瀏覽器音訊驗證。

## 2026-07-26 rights 與公開展示版設計整合

- 資料視覺化的根因不是單一文字色，而是透明 `.theme-transition-source` 讓深色前景直接疊在 mist／paper field。現在標題、摘要、媒體與卡片固定在不透明深色 semantic reading surface；動畫只在周邊保留，主標以兩個繁中 phrase lines 呈現。
- `useThemeInversion` 以 central theme endpoint 同步 nav 與 fixed field，`onUpdate`／`onRefresh` 使用同一 threshold；`App` 的 `ResizeObserver` 在 lazy section／媒體改變高度時觸發 deep-link resettle。
- Hamlet 播放器後方保留 compact「素材來源與公開範圍」面板、confirmed attestation、Suno credit／focus link、實際含英語歌詞與人聲的更正，以及 keyboard-operable 八幕 storyboard；沒有為 rights disclosure 新增 Navbar 或大型 IA section。
- 2026-07-26 Browser 基線覆蓋 1280×800、768×900、390×844、320×720：0 horizontal overflow、0 broken hashes、0 duplicate IDs、0 broken images，console 0 warning／0 error。Pure Data、Hamlet、`#selected-work`、`#contact` deep links 落在 fixed nav 下約 95–112 px。
- Dark／paper endpoints、資料視覺化不透明深色 reading surface、行動 menu Escape／focus restore 都通過。Print CSS 另將 `.theme-reading-surface` 與 dark variant 重設為紙色 tokens、visible overflow、無 shadow，避免列印沿用螢幕深色面。
- 2026-07-26 install／`doctor` exit 0，sound 18/18、rights 14/14、scanner 73/73，`check:publication` exit 0／`verified / approved`。這些數字是整合前基線；Draft PR 仍不等於 deploy 或 production publication approval。
- Screen reader、真實 200% zoom、system reduced-motion、實機與多瀏覽器音訊仍未驗證；保留為人工驗收項目，不由 source-level fallback 推論通過。

## 延續的設計與互動狀態

- 本輪改的是文案層級、11 段 IA、AdmissionEvidence 區段與研究構想呈現；既有 palette、字體、spacing、R3F Hero、GSAP／Lenis、fixed viewport transition、Custom Cursor、卡片回饋、聲音操作與 reduced-motion 行為均保留。
- Hero 兩個 CTA 現在直達 Web Audio demo 與學習／研究路線；paper surface 承接支持案例 gallery、專案與合作、學習路線、AI／作者性及研究方向／連結。研究構想本身位於深色 `#research-positioning` wrapper。
- `ResearchPositioning.jsx` 現只負責 `SoundTransitionSection` 與 `ReviewerPathSection`；四層研究構想由獨立 `ResearchProposalSection` 呈現。舊 `LearningTrail` 不在 `App.jsx` 主 IA，現行四階段學習路線由 `AdmissionEvidenceSections` 提供。
- 2026-07-26 draft build 基線為 471 modules、entry 180733 B、CSS 44315 B、initial JS gzip 200889 B；submission build 為 467 modules、entry 153704 B、CSS 44315 B、initial JS gzip 192936 B。Fresh `dist` 為 132 files／25 text files，118 個 public files 為 0 missing／0 SHA-256 mismatch。
- 同一基線的四個 viewport 已完成 target／ID、overflow、broken images、行動 menu、fresh deep links、dark／paper endpoints與console 回歸；sound 18/18 是 mapping／lifecycle 自動測試，不等於多瀏覽器可聽輸出實測。2026-07-27 組合另依本文件首節完成 targeted Browser smoke。
- System reduced-motion、screen reader、真實 200% zoom、實機與多瀏覽器音訊仍不得由 source fallback 或單一 Browser 矩陣推論通過。
- 2026-07-17／07-18 的 viewport matrix、2026-07-24 整合前 1440×900／375×812 結果與 Lighthouse 數據只保留為舊 IA／舊 source 的歷史證據，不擴張成目前工作樹、真機、輔具或 field 結論。

## 2026-07-23 公開文案更新

- PR #5 的改動把公開敘事、導覽／介面標籤與 metadata 改為更自然、第一人稱的繁體中文，並更直接說明「我做了什麼、使用什麼方法、目前有什麼證據、還沒證明什麼」。
- 這次改寫沒有改動 layout、design tokens、responsive rules、runtime 互動、動效、影音或 dependencies。下列 motion preservation inventory 仍是現行行為。
- 2026-07-23 fresh build：draft initial JS 199833 gzip B／entry 181592 B／CSS 43688 B；submission initial JS 193737 gzip B／entry 160908 B／CSS 43688 B；lazy 3D closure 638680 raw／169383 gzip B。

## 2026-07-27 正式作品索引

- 索引以暖紙表面、細邊框與低陰影呈現 2×2 編輯式網格，不再使用 3＋1 商品卡排列；四張圖片固定 16:10，卡片內容可自然增高，CTA 以 flex 靠近底部而不塞入大量空白。
- 作品關鍵字與卡片標籤均為不可聚焦的 `<ul><li>` 靜態內容，沿用小型邊框語言但取消 pill／button 暗示；成果入口與「查看案例」才使用可聚焦 `<a>` 與至少 44 px 高度。
- 索引卡 Motion 僅在允許動態時使用 y -3／scale 1.005；圖片沒有 hover zoom。整卡不帶 click 或 `CASE` cursor，磁吸／cursor label 只附著於真正的圖片或 CTA link。

## 2026-07-27 作者視角與案例視覺

- 公開敘事依作者行動、可核對 artifact／方法與限制三層整合；沒有因此改變 palette、layout tokens、R3F、GSAP／Lenis、Custom Cursor、聲音 feedback、section transition 或 reduced-motion contract。
- Web Audio 以 N1／N2／N3 三張正式視覺策略卡呈現感知、材質與介面語彙，使用 561／1122 AVIF/WebP；移除舊配圖、重複 disclosure、裝飾箭頭與假互動暗示。圖片固定比例，alt 與 visible caption 各自服務非重複目的。
- 資料視覺化 `productionWorkflow` 不再以大畫布 SVG 呈現，改由 lazy `CaseProcessSection` 輸出四階段語意 HTML／CSS；連線只是 `aria-hidden` 裝飾，文字閱讀不依賴圖片、顏色或箭頭。
- Hamlet 視覺與面板維持 `verified / approved` 的限定非營利用途，不能把素材可見、responsive pass 或 applicant attestation 擴張為 commercial clearance、private-original 查驗或學習成效。

## 2026-07-18 初代動態鑑識復原

- 以初代原始碼與錄影為行為證據，只復原能被確認的 Hero 片語 line-mask stagger；研究介紹首幀維持部分可見，避免把 DOM LCP 路徑重新藏起來。初代證據未顯示通用 section reveal 或卡片 opacity stagger，因此本輪沒有新增這兩類動畫。
- 深墨→暖紙仍使用現行 fixed viewport field，而不是退回初代的 document-root 色彩插值；ScrollTrigger 依實際 section 幾何維持約 0.8–1.2 viewport 的可停留、可逆 scrub 範圍。
- `AnimatedDetails`、Lenis 與深層 fragment settle 補齊動態偏好、尺寸變更、中斷與 cleanup 生命週期；Hero canvas 不再保留永久 `will-change`。

## 視覺概念（source-defined）

目前方向是「聲響科技研究檔案 × 編輯式作品集」：穩定深墨 root、局部暖紙閱讀表面、酸綠重點、大型繁中標題、長篇證據卡與一個可操作的聲音座標場。公開文案以自然、第一人稱的繁體中文承接這套視覺，明確標示作者角色、使用方法、已有證據與限制；設計避免純黑白、英文海報式字距與模板化術語，並要求效果不能壓過研究可信度。規範見 [`../visual-system.md`](../visual-system.md) 與 [`../chinese-visual-system.md`](../chinese-visual-system.md)。

## Verified design tokens

| 類型 | 現值／策略 |
| --- | --- |
| 深色背景／文字 | `#11100d` / `#efe9dc` |
| muted | `rgba(239,233,220,.66)` |
| accent | `#cbe86b` |
| 暖紙／墨字 | `#d8cfbd` / `#1a1711` |
| radius | `.75rem`, `1.25rem`, `2rem`, pill |
| spacing | 5 個 fluid `clamp()` tokens |
| 字體 | PingFang TC、Noto Sans TC、Microsoft JhengHei、Heiti TC、Source Han Sans TC、system fallback；沒有 remote webfont |
| body | 約 1–1.125rem，行高 1.76 |
| display | 約 3–6rem；案例約 2.45–6.35rem；Hero mobile `clamp(2.8rem, 14vw, 4.6rem)`、desktop `clamp(4.5rem, 7.25vw, 8.5rem)` |
| reading measure | 34em／42em |
| motion | 160/360/700ms；主要 easing `.22,1,.36,1` |

## Layout 與 breakpoints

- 最小寬 320px，主內容通常 `max-w-7xl`，外距 `clamp(1.25rem,6vw,10vw)`。
- 主要 breakpoint 使用 Tailwind `md` 768px、`lg`、`2xl`；繁中 display 另有 520px 規則。
- Hero 由單欄轉 1.15/0.85 雙欄；長文 section 多由單欄轉 0.32/0.68；作品索引在 `md` 起固定兩欄、較窄 viewport 單欄，不使用 3＋1 或 masonry。
- 桌面顯示完整導覽；行動顯示「閱讀選單」trigger 和浮出選單，不再隱藏閱讀路徑。
- `100svh` 可用時取代 `100vh`；`body` 以 `min(320px, 100%)` 配合 `overflow-x:hidden` 避免最窄 viewport 產生全頁水平捲動。
- 平台 scrollbar 保持可見，`scrollbar-gutter: stable` 預留空間，並穩定繼承 root 深色 accent 與 background；局部暖紙 section 不改變整頁 scrollbar。不再用全域規則隱藏 Firefox／WebKit scrollbar。
- 支持作品 gallery、專案與合作、學習路線、AI／作者性與研究方向／連結使用 `paper-surface` tokens；四層研究構想保留在深色 `#research-positioning` wrapper。深墨→暖紙由 `aria-hidden`、`pointer-events:none` 的 fixed viewport field 呈現，不增加 section 高度，也不把 transition blur 套到內容。
- sound pad 高度為 `clamp(18rem,48vw,32rem)`，pointer/touch 使用 `touch-action:none`；右側 range controls 在 lg 與 pad 並排。
- 結構化案例的五階段 workflow 在手機單欄、`md` 兩欄、`xl` 五欄，每階段呈現工具、輸入、產出、控制條件與人工檢查；八幕 storyboard 使用可聚焦的水平 `scroll-snap`，不攔截整頁垂直捲動，鍵盤與上一／下一幕採立即 snap 以避免快速操作時狀態落後，並以每幕按鈕將 featured video 定位到對應時間；print 改為兩欄靜態網格。
- 資料視覺化案例的 `productionWorkflow` 使用 `ol > li`：手機為單欄垂直連線、`md` 為兩欄且隱藏連線、`lg` 為四欄水平連線；文字不依賴圖片、箭頭或顏色，連線為 `aria-hidden` 裝飾，print 固定兩欄。

## 主要互動與 motion

- **Hero：** 主標各片語以 overflow mask 從 `y:112%`、交錯 `±3deg` 進入，沿用初代 `.22,1,.36,1` easing 與逐行 stagger；研究介紹只由部分可見的 opacity 與 `y:28px` 收束到終態，不讓整個 main 或 LCP 文字從透明開始。兩個 CTA 保留低比重進場並直達 Web Audio demo 與 `#learning-roadmap`。
- **3D：** shader sphere 以波形與 fresnel 混色回應 pointer，粒子場緩慢旋轉。精簡 R3F canvas 將整個 Hero section 作為 event source，以 `clientX`／`clientY` 相對 section 幾何計算 pointer；延遲完成後仍重新檢查頁面與 Hero 位置，首次載入前若已導航至 offscreen 就不 mount canvas，回到 preload window 才載入；已 mounted 的場景離屏後改用 demand frameloop。場景錯誤只由 Hero 內的局部 boundary 接住，不會移除標題、介紹或 CTA。
- **捲動：** Lenis 與 GSAP 共用 RAF，並會在 `prefers-reduced-motion` 執行期間變更時即時建立／銷毀 smooth-scroll runtime；ScrollTrigger 以 `#data-visualization-series` bottom 70% 與 `#project-index-title` top 25% 計算自然邊界，再把 range clamp 為 0.8–1.2 viewport，只控制固定 field 的 paper／mist／radial opacity 與 transform。使用者停止時保留中間狀態，反向捲動平順倒放，document root 與前景色 tokens 不參與插值。
- **Navbar：** 表面提高不透明度以維持兩種局部 palette 的對比，移除固定 `backdrop-blur-2xl`；依 fragment／可見區段提供 active state 與 `aria-current="location"`，桌面、行動及首頁入口的主要 target 至少 44 px。行動選單以 Motion 在開／關兩向動畫 height、opacity 與輕微 y 位移，仍保留 Escape、outside click、focus restore 與 closed-state `inert`。
- **Custom cursor：** fine pointer 且非 reduced-motion 時顯示；`data-magnetic` 元素有吸附與 label variants；以 MotionValue、spring、rAF batching 避免每次 pointermove 觸發 React render。
- **作品索引卡：** hover 最多 y -3、scale 1.005，索引圖不另行放大；reduced-motion 時不執行 Motion hover。整張 article 沒有假 click 或磁吸提示，`data-magnetic` 只放在真實圖片／CTA anchor；Hamlet 影片 preview 仍是 intent-gated 且不預載 MP4。Hero canvas、magnetic hit targets 與靜止媒體都不保留永久 `will-change`。
- **折疊內容：** Prompt Template、7 個圖解文字等價敘述與雙語逐字稿共用 `AnimatedDetails`。保留 `<details>/<summary>`、`defaultOpen`、Enter／Space 與 `aria-expanded`；展開 360 ms、收合 300 ms，收合結束前保持內容 mounted，實際 height、箭頭、opacity 與位移同步。共用的 live reduced-motion media-query subscriber 可在動畫中途立即完成；ResizeObserver 會在內容或 viewport 改變時重設目標高度，快速反轉會取消前一序列，完成／unmount 後清除 WAAPI effect，最後再刷新 Lenis／ScrollTrigger layout。
- **影片／demo：** YouTube iframe 採 privacy-enhanced URL；Hamlet featured video 維持 16:9、controls、`playsInline`、一般 `preload="metadata"`／Save-Data `none`、多語 WebVTT 與同頁逐字稿，錯誤時保留 poster、可讀訊息與直接檔案連結。Pure Data 影片同樣使用 controls、`playsInline`、metadata preload 與 1276×720 poster，並以觀看指南、可證明／不能證明和 error fallback 補足非自動播放情境；本輪 Browser 讀到 Pure Data 1276×720／62.983 秒及 Hamlet 1920×1080／40 秒 metadata 且無 media error，但未實際播放、切換字幕、Save-Data 或模擬失敗。
- **深層連結：** fragment 位於 `content-visibility:auto` 長案例內時，只讓該案例維持完整 layout 並重算既有 Lenis range；初始載入、`hashchange` 與站內導覽先做 double-rAF layout settle，再最多校正兩次 fixed-nav offset。wheel、touch、pointer 或 scroll key 會取消尚未完成的校正，避免與使用者輸入競爭；其他離屏案例仍沿用 paint skip。Header 的「播放案例影片」在 anchor 完成後把焦點交給 native video。
- **區段錯誤：** 可在原位重試，不使整頁消失。

### 完整 motion preservation inventory

下表依 [`../../AGENTS.md`](../../AGENTS.md) 的五類要求盤點目前原始碼；一個效果可同時具有多種 UX 角色。`performance risk` 表示需要量測與回退，不等於應移除。

| 系統／效果 | 分類 | 目前實作與保存理由 | 風險／回退 |
| --- | --- | --- | --- |
| Hero 片語 line-mask stagger | narrative guidance；atmosphere／authorship | [`../../src/components/ImmersiveHero.jsx`](../../src/components/ImmersiveHero.jsx) 以 Motion 將片語由 `y:112%`、交錯旋轉帶入，建立主張的閱讀次序與初代辨識度 | DOM heading 保留完整 accessible name；reduced motion 直接到終態，且不把整個 Hero／LCP 文字設為透明 |
| Hero 介紹與 CTA 進場 | narrative guidance | 介紹只由部分可見狀態收束；CTA 低比重進場後提供 Web Audio demo／學習與研究路線 | 不能恢復整頁 mount-hide；需維持首幀可讀與 CTA 可操作 |
| Hero shader orb／粒子 | atmosphere／authorship；performance risk | [`../../src/components/HeroScene.jsx`](../../src/components/HeroScene.jsx) 與 `LeanR3FCanvas` 提供聲音／互動視覺語彙，是漸進增強而非內容來源 | lazy、visibility／device gate、低 DPR／segments、離屏 demand frameloop；Save-Data、reduced-motion 與弱裝置不載入 |
| 深墨→暖灰→暖紙 fixed viewport field | narrative guidance；atmosphere／authorship；performance risk | [`../../src/hooks/useThemeInversion.js`](../../src/hooks/useThemeInversion.js) 用 ScrollTrigger 將研究證據帶入作品閱讀面，支援停留與反向 scrub | 只動 opacity／transform；不改 root／前景 tokens、不 blur 內容；reduced motion 使用同邊界離散端點 |
| Lenis smooth scroll／anchor 定位 | narrative guidance；performance risk | [`../../src/hooks/useLenisGsap.js`](../../src/hooks/useLenisGsap.js) 與 Navbar 維持長頁閱讀節奏；deep-link double-rAF settle 避免案例落點錯位 | reduced motion 即時銷毀；使用者 wheel／touch／pointer／scroll-key 取消未完成校正；不允許無界 rAF loop |
| Navbar active state／行動選單 | interaction feedback | [`../../src/components/Navbar.jsx`](../../src/components/Navbar.jsx) 以 Motion 呈現選單高度、opacity、位移，並同步 `aria-current`、Escape、outside click、focus restore | reduced motion 立即完成；closed state 保持 `inert`／`aria-hidden`；不改成視覺-only drawer |
| `AnimatedDetails` disclosures | interaction feedback；performance risk | Prompt Template、7 個長描述與雙語逐字稿以 WAAPI 同步實際高度、箭頭、opacity、位移與 native details state | 快速反轉取消前序列、ResizeObserver retarget、完成後清 effect；reduced motion 立即切換並刷新 Lenis／ScrollTrigger |
| 作品卡 hover／focus-within | interaction feedback；decorative | [`../../src/components/CaseStudyShowcase.jsx`](../../src/components/CaseStudyShowcase.jsx) 與 CSS 提供小幅 y／scale／媒體放大，focus-within 保留同等回饋 | 只在 active hover／focus 暫時 compositor promotion；coarse pointer／reduced motion 不依賴此效果 |
| Custom Cursor／magnetic targets | interaction feedback；atmosphere／authorship；performance risk | [`../../src/components/CustomCursor.jsx`](../../src/components/CustomCursor.jsx) 以 label variant 與吸附強化個人風格及可點狀態 | 只在 ≥768px fine pointer 且非 reduced motion 啟用；MotionValue／spring／rAF batching，原生焦點與游標以外的操作仍完整 |
| Sound pad 位置點 breathing／live readout | interaction feedback；decorative | [`../../src/components/SoundInteractionPrototype.jsx`](../../src/components/SoundInteractionPrototype.jsx) 與 CSS 讓映射位置、狀態及聲音參數可見 | breathing 在 reduced motion 停用；真正操作仍由 pointer／touch／四個 range 與文字狀態提供 |
| Storyboard scroll-snap／seek feedback | interaction feedback | 水平 scene cards、前後／每幕按鈕、影片 seek 與 polite status 讓八幕選擇結果可確認 | 不攔截垂直捲動；鍵盤使用立即 snap；print 改靜態網格 |

保存決策：narrative guidance、interaction feedback 與 atmosphere／authorship 預設保留。若 profiling 顯示問題，依序縮小 paint area、改用 transform／opacity、延後或 intersection 啟用、降低 mobile／low-power 複雜度、提供 reduced-motion、降低更新頻率；只有具體效能、可及性或可用性證據才移除，並記錄替代互動。

變更紀錄：過去移除的是佔據 layout 高度、沒有動畫角色的靜態 gradient bridge，並以 fixed field 保存同一敘事功能；原生瞬間 disclosure 由可逆 WAAPI feedback 取代；Hero line-mask 只依初代證據復原。Hero canvas 的永久 `will-change` 被移除是資源提示調整，不是視覺動畫移除。2026-07-23 公開文案打包只同步 copy／labels／metadata，沒有修改或移除任何 runtime 動效。

## Web Audio 互動

- 使用者必須先按「啟用聲音」；按鈕狀態防止重複 start，停止按鈕只有在未播放且沒有 pending start 時 disabled。
- pointer/touch 在 pad 內拖曳位置；水平控制 pan、垂直控制 pitch，速度控制濾波、大小 slider 控制 gain。
- range inputs 提供鍵盤可操作替代；操作數值 readout 為視覺輔助，音訊狀態透過 busy 區外的 atomic `role="status"`／`aria-live="polite"` 宣告。
- 位置點有 breathing animation；reduced-motion 停用 breathing，但聲音 mapping 本身仍可操作。
- Escape、停止按鈕、離開 viewport、切換分頁或 component cleanup 都會取消 pending start 或停止既有聲音，避免延遲的 `resume()` 在使用者離開後才啟動。
- `AudioContext`／StereoPanner 不支援或 permission/start 失敗時，顯示文字 fallback，研究內容仍可讀。
- 聲音為 triangle oscillator 合成，並經 low-pass、gain、envelope、stereo panner、compressor 與 master gain；沒有遠端音訊或 microphone permission。

## Touch 與低效能回退

主要動作都有文字 link/button，不依賴 hover 或 custom cursor。Save-Data 或窄螢幕低核心裝置不載入 3D；較弱裝置降低 DPR、particle count、sphere segments 與 antialias。Web Audio 不自動播放，需明確 gesture。長篇案例在支援瀏覽器以 `content-visibility:auto` 跳過 offscreen paint。

## Accessibility 已實作

- `html lang="zh-Hant-TW"`，使用 semantic `main/nav/section/article` 與可讀 heading hierarchy；目前沒有獨立 `<footer>`，`#contact` 是主內容中的 `<section>`。
- 鍵盤可見 focus outline、skip link、fixed-nav scroll margin。
- 行動 menu 有 expanded/control state、Escape 與 trigger focus restore。
- 桌面導覽與 Logo 的鍵盤 Enter 會把焦點送進目標 heading；`#research-proposal`／`#ai-workflow` 等 lazy 區段改聚焦永久 section wrapper；滑鼠點擊不強制搬移焦點。
- `EditorialHeading` 把視覺片語標為 `aria-hidden`，在 heading 保留完整 `aria-label`。
- 圖像有 alt 和 dimensions；圖解有 caption／長描述；video 結構支援多語 track、摘要與可展開逐字稿；storyboard 容器可鍵盤聚焦並保留可見 focus，每幕另有原生 button、`aria-controls` 與 polite seek 狀態。
- sound controls 有 labels、live status、busy／disabled states、明確 start/stop、四個鍵盤 range 與可讀參數 readout；pointer pad 以具說明的 `role="img"` 呈現，不要求 microphone。
- custom cursor `aria-hidden` 且 pointer-events none。
- `prefers-reduced-motion` 在 JS 停用 Lenis、cursor、R3F；Lenis 與 `AnimatedDetails` 共用的 media-query 監聽都會回應執行期間的偏好變更，不只在 mount 時取樣。Viewport field 不移動 mist／radials，只在同一幾何邊界離散切換 dark／paper endpoint，disclosures 與行動選單立即開關。內容 palette 不依賴動畫完成才可讀。
- print 隱藏 nav、skip、draft banner、cursor 與 fixed viewport field，強制 disclosure 內容展開；`.theme-reading-surface`／dark variant 連同主要 section 重設為紙色 tokens、visible overflow 與無 shadow，保持 paper-safe 閱讀。真實印表機／PDF 輸出仍需人工檢查。
- section error fallback 使用 `role="alert"`。

## Accessibility 與視覺缺口

- 2026-07-26 整合基線曾在四個 viewport 通過 hash targets、duplicate IDs、overflow、broken images、deep-link offset、theme endpoints、行動 menu Escape／還焦與console smoke；2026-07-27 最新組合另完成 1440×1000 與 390×844 targeted smoke。這仍不涵蓋 screen reader、真實 200% zoom、system reduced-motion、實機、多瀏覽器音訊或完整 WCAG 人工 audit；2026-07-17 Lighthouse accessibility 也只作歷史資料。
- sound pad 的 pointer 操作區本身不是 keyboard widget；它以圖像語意說明映射，鍵盤使用者改用四個 range controls，仍需真實使用者研究確認是否足夠易懂。
- visible readout 由四個 range 的 `aria-describedby` 關聯，另以節流 `aria-live` 宣告參數；仍需 screen reader 實測確認訊息頻率。
- 行動 menu 沒有 focus trap；它是非 modal nav，但仍應做實際 tab-order 測試。
- 平台 scrollbar 已恢復，仍需在 Windows、macOS overlay scrollbar、觸控裝置與高對比模式確認可見性與不溢位。
- YouTube iframe 與既有資料案例字幕仍需人工確認；Hamlet 的兩條 WebVTT 與八段逐字稿已做結構檢查，仍需跨瀏覽器與 screen reader 實測。
- section boundaries 沒有涵蓋每一區，但全站根已有可重新載入的 recovery boundary。

## Performance 現況

DOM 首屏文字是預期且在 2026-07-17 歷史量測中確認的 LCP path；line-mask 主標不會讓整個首屏一起透明。Three 與 sound prototype lazy 分 chunk，3D closure 不進 initial modulepreload，並在窄螢幕延後 1.4 秒後再等 idle；callback 重新檢查目前幾何與頁面可見性，只有 Hero 仍在 240 px preload window 內才首次下載。2026-07-26 draft build 基線為 471 modules、initial JS gzip 200889 B、entry 180733 B、CSS 44315 B；submission 為 467 modules、initial JS gzip 192936 B、entry 153704 B、CSS 44315 B。這些不是 2026-07-27 組合、Lighthouse 或 production field performance；2026-07-17 Lighthouse 仍只代表歷史 source fingerprint。

Motion-forensics 的直接前後對照使用相同 submission harness。修正前 archive `2026-07-17T16-21-04-610Z`：mobile Performance 94、LCP 2634 ms、TBT 75 ms、transfer 459090 B；desktop 100、LCP 555 ms、TBT 0 ms、transfer 442761 B。該輪最終 archive `2026-07-17T17-31-33-225Z` 為 mobile Performance 94、LCP 2651 ms、TBT 90 ms、transfer 460502 B，desktop Performance 100、LCP 560 ms、TBT 0 ms、transfer 444173 B；兩者 Accessibility／Best Practices／SEO 100、CLS 0。這組數字只證明當時 motion 修復相對基線的成本，屬文案改寫前的 localhost simulated lab；2026-07-19 後 source fingerprint 已漂移，不能當作目前 production 或 current-source 效能結論。
