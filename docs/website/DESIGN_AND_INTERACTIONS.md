# 視覺、互動、響應式與可及性

## 2026-07-18 初代動態鑑識復原

- 以初代原始碼與錄影為行為證據，只復原能被確認的 Hero 片語 line-mask stagger；研究介紹首幀維持部分可見，避免把 DOM LCP 路徑重新藏起來。初代證據未顯示通用 section reveal 或卡片 opacity stagger，因此本輪沒有新增這兩類動畫。
- 深墨→暖紙仍使用現行 fixed viewport field，而不是退回初代的 document-root 色彩插值；ScrollTrigger 依實際 section 幾何維持約 0.8–1.2 viewport 的可停留、可逆 scrub 範圍。
- `AnimatedDetails`、Lenis 與深層 fragment settle 補齊動態偏好、尺寸變更、中斷與 cleanup 生命週期；Hero canvas 不再保留永久 `will-change`。

## 視覺概念（已驗證）

目前方向是「聲響科技研究檔案 × 編輯式作品集」：穩定深墨 root、局部暖紙閱讀表面、酸綠重點、大型繁中標題、長篇證據卡與一個可操作的聲音座標場。設計避免純黑白與英文海報式字距，並要求效果不能壓過研究可信度。規範見 [`../visual-system.md`](../visual-system.md) 與 [`../chinese-visual-system.md`](../chinese-visual-system.md)。

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
- Hero 由單欄轉 1.15/0.85 雙欄；長文 section 多由單欄轉 0.32/0.68；索引在 lg 為 3 欄。
- 桌面顯示完整導覽；行動顯示 menu trigger 和浮出選單，不再隱藏閱讀路徑。
- `100svh` 可用時取代 `100vh`；`body` 以 `min(320px, 100%)` 配合 `overflow-x:hidden` 避免最窄 viewport 產生全頁水平捲動。
- 平台 scrollbar 保持可見，`scrollbar-gutter: stable` 預留空間，並穩定繼承 root 深色 accent 與 background；局部暖紙 section 不改變整頁 scrollbar。不再用全域規則隱藏 Firefox／WebKit scrollbar。
- 支持作品 gallery 與 Reviewer Path 各自使用 `paper-surface` tokens。深墨→暖紙由 `aria-hidden`、`pointer-events:none` 的 fixed viewport field 呈現，不增加 section 高度，也不把 transition blur 套到內容。
- sound pad 高度為 `clamp(18rem,48vw,32rem)`，pointer/touch 使用 `touch-action:none`；右側 range controls 在 lg 與 pad 並排。
- 結構化案例的五階段 workflow 在手機單欄、`md` 兩欄、`xl` 五欄，每階段呈現工具、輸入、產出、控制條件與人工檢查；八幕 storyboard 使用可聚焦的水平 `scroll-snap`，不攔截整頁垂直捲動，鍵盤與上一／下一幕採立即 snap 以避免快速操作時狀態落後，並以每幕按鈕將 featured video 定位到對應時間；print 改為兩欄靜態網格。

## 主要互動與 motion

- **Hero：** 主標各片語以 overflow mask 從 `y:112%`、交錯 `±3deg` 進入，沿用初代 `.22,1,.36,1` easing 與逐行 stagger；研究介紹只由部分可見的 opacity 與 `y:28px` 收束到終態，不讓整個 main 或 LCP 文字從透明開始。兩個 CTA 保留低比重進場並直達 demo 與 learning trail。
- **3D：** shader sphere 以波形與 fresnel 混色回應 pointer，粒子場緩慢旋轉。精簡 R3F canvas 將整個 Hero section 作為 event source，以 `clientX`／`clientY` 相對 section 幾何計算 pointer；延遲完成後仍重新檢查頁面與 Hero 位置，首次載入前若已導航至 offscreen 就不 mount canvas，回到 preload window 才載入；已 mounted 的場景離屏後改用 demand frameloop。場景錯誤只由 Hero 內的局部 boundary 接住，不會移除標題、介紹或 CTA。
- **捲動：** Lenis 與 GSAP 共用 RAF，並會在 `prefers-reduced-motion` 執行期間變更時即時建立／銷毀 smooth-scroll runtime；ScrollTrigger 以 `#data-visualization-series` bottom 70% 與 `#project-index-title` top 25% 計算自然邊界，再把 range clamp 為 0.8–1.2 viewport，只控制固定 field 的 paper／mist／radial opacity 與 transform。使用者停止時保留中間狀態，反向捲動平順倒放，document root 與前景色 tokens 不參與插值。
- **Navbar：** 表面提高不透明度以維持兩種局部 palette 的對比，移除固定 `backdrop-blur-2xl`；依 fragment／可見區段提供 active state 與 `aria-current="location"`，桌面、行動及首頁入口的主要 target 至少 44 px。行動選單以 Motion 在開／關兩向動畫 height、opacity 與輕微 y 位移，仍保留 Escape、outside click、focus restore 與 closed-state `inert`。
- **Custom cursor：** fine pointer 且非 reduced-motion 時顯示；`data-magnetic` 元素有吸附與 label variants；以 MotionValue、spring、rAF batching 避免每次 pointermove 觸發 React render。
- **卡片：** hover y -8、scale .99、媒體輕微放大，focus-within 提供同等媒體回饋；reduced-motion 時不執行 Motion hover。Hero canvas、magnetic hit targets 與靜止媒體都不保留永久 `will-change`，圖像／影片只在 hover 或 focus-within 時暫時晉升。
- **折疊內容：** Prompt Template、7 個圖解文字等價敘述與雙語逐字稿共用 `AnimatedDetails`。保留 `<details>/<summary>`、`defaultOpen`、Enter／Space 與 `aria-expanded`；展開 360 ms、收合 300 ms，收合結束前保持內容 mounted，實際 height、箭頭、opacity 與位移同步。共用的 live reduced-motion media-query subscriber 可在動畫中途立即完成；ResizeObserver 會在內容或 viewport 改變時重設目標高度，快速反轉會取消前一序列，完成／unmount 後清除 WAAPI effect，最後再刷新 Lenis／ScrollTrigger layout。
- **影片／demo：** YouTube iframe 採 privacy-enhanced URL；本機 featured video 維持 16:9、controls、`playsInline`、一般 `preload="metadata"`／Save-Data `none`、多語 WebVTT 與同頁逐字稿；runtime 影片錯誤改顯示 Poster、可讀訊息與直接檔案連結，字幕錯誤保留逐字稿入口；一般 demo renderer 需按鈕同意後才 mount iframe。
- **深層連結：** fragment 位於 `content-visibility:auto` 長案例內時，只讓該案例維持完整 layout 並重算既有 Lenis range；初始載入、`hashchange` 與站內導覽先做 double-rAF layout settle，再最多校正兩次 fixed-nav offset。wheel、touch、pointer 或 scroll key 會取消尚未完成的校正，避免與使用者輸入競爭；其他離屏案例仍沿用 paint skip。Header 的「播放案例影片」在 anchor 完成後把焦點交給 native video。
- **區段錯誤：** 可在原位重試，不使整頁消失。

### 完整 motion preservation inventory

下表依 [`../../AGENTS.md`](../../AGENTS.md) 的五類要求盤點目前原始碼；一個效果可同時具有多種 UX 角色。`performance risk` 表示需要量測與回退，不等於應移除。

| 系統／效果 | 分類 | 目前實作與保存理由 | 風險／回退 |
| --- | --- | --- | --- |
| Hero 片語 line-mask stagger | narrative guidance；atmosphere／authorship | [`../../src/components/ImmersiveHero.jsx`](../../src/components/ImmersiveHero.jsx) 以 Motion 將片語由 `y:112%`、交錯旋轉帶入，建立主張的閱讀次序與初代辨識度 | DOM heading 保留完整 accessible name；reduced motion 直接到終態，且不把整個 Hero／LCP 文字設為透明 |
| Hero 介紹與 CTA 進場 | narrative guidance | 介紹只由部分可見狀態收束；CTA 低比重進場後提供聲響 demo／學習歷程下一步 | 不能恢復整頁 mount-hide；需維持首幀可讀與 CTA 可操作 |
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

變更紀錄：過去移除的是佔據 layout 高度、沒有動畫角色的靜態 gradient bridge，並以 fixed field 保存同一敘事功能；原生瞬間 disclosure 由可逆 WAAPI feedback 取代；Hero line-mask 只依初代證據復原。Hero canvas 的永久 `will-change` 被移除是資源提示調整，不是視覺動畫移除。本次 2026-07-18 Markdown 打包沒有修改或移除任何 runtime 動效。

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

- `html lang="zh-Hant-TW"`，使用 semantic `main/nav/section/article/footer` 與可讀 heading hierarchy。
- 鍵盤可見 focus outline、skip link、fixed-nav scroll margin。
- 行動 menu 有 expanded/control state、Escape 與 trigger focus restore。
- 桌面導覽與 Logo 的鍵盤 Enter 會把焦點送進目標 heading；滑鼠點擊不強制搬移焦點。
- `EditorialHeading` 把視覺片語標為 `aria-hidden`，在 heading 保留完整 `aria-label`。
- 圖像有 alt 和 dimensions；圖解有 caption／長描述；video 結構支援多語 track、摘要與可展開逐字稿；storyboard 容器可鍵盤聚焦並保留可見 focus，每幕另有原生 button、`aria-controls` 與 polite seek 狀態。
- sound controls 有 labels、live status、busy／disabled states、明確 start/stop、四個鍵盤 range 與可讀參數 readout；pointer pad 以具說明的 `role="img"` 呈現，不要求 microphone。
- custom cursor `aria-hidden` 且 pointer-events none。
- `prefers-reduced-motion` 在 JS 停用 Lenis、cursor、R3F；Lenis 與 `AnimatedDetails` 共用的 media-query 監聽都會回應執行期間的偏好變更，不只在 mount 時取樣。Viewport field 不移動 mist／radials，只在同一幾何邊界離散切換 dark／paper endpoint，disclosures 與行動選單立即開關。內容 palette 不依賴動畫完成才可讀。
- print 隱藏 nav、skip、draft banner、cursor 與 fixed viewport field，強制 disclosure 內容展開，並將主要 section 強制為紙色背景，保持 paper-safe 輸出。
- section error fallback 使用 `role="alert"`。

## Accessibility 與視覺缺口

- 已完成桌面六個導覽連結、Logo、行動導覽與四個 sound range 的 rendered keyboard/focus smoke test，也確認淺色 accent 對比 5.71:1；Navbar、Hero CTA、研究跳轉與 reading map 的 visible target 已達至少 44 px。2026-07-17 變更前基線的 Lighthouse accessibility 為 mobile／desktop 100／100，但尚未完成 screen reader、全站 touch target 或完整 WCAG 人工 audit。
- sound pad 的 pointer 操作區本身不是 keyboard widget；它以圖像語意說明映射，鍵盤使用者改用四個 range controls，仍需真實使用者研究確認是否足夠易懂。
- visible readout 由四個 range 的 `aria-describedby` 關聯，另以節流 `aria-live` 宣告參數；仍需 screen reader 實測確認訊息頻率。
- 行動 menu 沒有 focus trap；它是非 modal nav，但仍應做實際 tab-order 測試。
- 平台 scrollbar 已恢復，仍需在 Windows、macOS overlay scrollbar、觸控裝置與高對比模式確認可見性與不溢位。
- YouTube iframe 與既有資料案例字幕仍需人工確認；Hamlet 的兩條 WebVTT 與八段逐字稿已做結構檢查，仍需跨瀏覽器與 screen reader 實測。
- section boundaries 沒有涵蓋每一區，但全站根已有可重新載入的 recovery boundary。

## Performance 現況

DOM 首屏文字是預期且實測的 LCP path；本輪 mobile／desktop LCP 都是首幀部分可見的 Hero 研究介紹，line-mask 主標不會讓整個首屏一起透明。Three 與 sound prototype lazy 分 chunk，3D closure 不進 initial modulepreload，並在窄螢幕延後 1.4 秒後再等 idle；callback 重新檢查目前幾何與頁面可見性，只有 Hero 仍在 240 px preload window 內才首次下載。建置預算透過遞迴解析 built imports 稽核完整 lazy 3D closure；目前為 638680 raw／169383 gzip bytes，每個 lazy chunk 上限 500000 raw bytes。2026-07-18 fresh submission build 為 initial JS 195067 gzip B、entry 162901 B、CSS 43688 B。

Motion-forensics 的直接前後對照使用相同 submission harness。修正前 archive `2026-07-17T16-21-04-610Z`：mobile Performance 94、LCP 2634 ms、TBT 75 ms、transfer 459090 B；desktop 100、LCP 555 ms、TBT 0 ms、transfer 442761 B。最終原始碼連跑兩次仍為 mobile 94、desktop 100；最新 archive `2026-07-17T17-31-33-225Z` 為 mobile LCP 2651 ms、TBT 90 ms、transfer 460502 B，desktop LCP 560 ms、TBT 0 ms、transfer 444173 B。重跑範圍是 mobile LCP 2651–2654 ms／TBT 90–98 ms、desktop LCP 560–602 ms／TBT 0–38 ms；兩者 Accessibility／Best Practices／SEO 100、CLS 0。最新對直接基線只增加 mobile LCP 17 ms、TBT 15 ms、desktop LCP 5 ms 與 transfer 1412 B；這是 localhost simulated lab，不是正式 hosting field data。
