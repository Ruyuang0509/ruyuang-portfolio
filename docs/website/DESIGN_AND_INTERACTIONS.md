# 視覺、互動、響應式與可及性

## 視覺概念（已驗證）

目前方向是「聲響科技研究檔案 × 編輯式作品集」：深墨背景、暖紙反轉、酸綠重點、大型繁中標題、長篇證據卡與一個可操作的聲音座標場。設計避免純黑白與英文海報式字距，並要求效果不能壓過研究可信度。規範見 [`../visual-system.md`](../visual-system.md) 與 [`../chinese-visual-system.md`](../chinese-visual-system.md)。

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
| display | 約 3–6rem；案例約 2.45–6.35rem；Hero 18vw/12vw |
| reading measure | 34em／42em |
| motion | 160/360/700ms；主要 easing `.22,1,.36,1` |

## Layout 與 breakpoints

- 最小寬 320px，主內容通常 `max-w-7xl`，外距 `clamp(1.25rem,6vw,10vw)`。
- 主要 breakpoint 使用 Tailwind `md` 768px、`lg`、`2xl`；繁中 display 另有 520px 規則。
- Hero 由單欄轉 1.15/0.85 雙欄；長文 section 多由單欄轉 0.32/0.68；索引在 lg 為 3 欄。
- 桌面顯示完整導覽；行動顯示 menu trigger 和浮出選單，不再隱藏閱讀路徑。
- `100svh` 可用時取代 `100vh`；`body` 以 `min(320px, 100%)` 配合 `overflow-x:hidden` 避免最窄 viewport 產生全頁水平捲動。
- 平台 scrollbar 保持可見，`scrollbar-gutter: stable` 預留空間，並以目前深色／暖紙 theme accent 和 background 配色；不再用全域規則隱藏 Firefox／WebKit scrollbar。
- sound pad 高度為 `clamp(18rem,48vw,32rem)`，pointer/touch 使用 `touch-action:none`；右側 range controls 在 lg 與 pad 並排。

## 主要互動與 motion

- **Hero：** 主標與研究介紹首幀即可讀，不再以 opacity／transform 隱藏主要內容；兩個 CTA 保留低比重進場並直達 demo 與 learning trail。
- **3D：** shader sphere 以波形與 fresnel 混色回應 pointer，粒子場緩慢旋轉；延遲完成後仍會重新檢查目前幾何位置與頁面可見性，只有 Hero 位於 preload window 才首次載入；首次載入後保持 mounted，offscreen 只暫停 frame loop。場景錯誤只由 Hero 內的局部 boundary 接住，不會移除標題、介紹或 CTA。
- **捲動：** Lenis 與 GSAP 共用 RAF；在作品 index 附近由 ScrollTrigger 於已驗證的深色／暖紙端點間離散切換，不插值前景與背景色，避免經過低對比中間色。
- **Custom cursor：** fine pointer 且非 reduced-motion 時顯示；`data-magnetic` 元素有吸附與 label variants；以 MotionValue、spring、rAF batching 避免每次 pointermove 觸發 React render。
- **卡片：** hover y -8、scale .99、媒體輕微放大；reduced-motion 時不執行 Motion hover。
- **圖解：** `<details>/<summary>` 可展開文字等價敘述。
- **影片／demo：** YouTube iframe 採 privacy-enhanced URL；一般 demo renderer 需按鈕同意後才 mount iframe。
- **區段錯誤：** 可在原位重試，不使整頁消失。

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
- 圖像有 alt 和 dimensions；圖解有 caption／長描述；video 結構支援 transcript。
- sound controls 有 labels、live status、busy／disabled states、明確 start/stop、四個鍵盤 range 與可讀參數 readout；pointer pad 以具說明的 `role="img"` 呈現，不要求 microphone。
- custom cursor `aria-hidden` 且 pointer-events none。
- `prefers-reduced-motion` 在 JS 停用 Lenis、cursor、R3F，在 CSS 取消 animation/transition；主題本來就沒有 tween，仍只在兩個合格端點間瞬時切換。
- print 隱藏 nav、skip、draft banner、cursor，切換暖紙背景。
- section error fallback 使用 `role="alert"`。

## Accessibility 與視覺缺口

- 已完成桌面六個導覽連結、Logo、行動導覽與四個 sound range 的 rendered keyboard/focus smoke test，也確認淺色 accent 對比 5.71:1；Lighthouse accessibility 為 100，但尚未完成 screen reader、touch target 或完整 WCAG 人工 audit。
- sound pad 的 pointer 操作區本身不是 keyboard widget；它以圖像語意說明映射，鍵盤使用者改用四個 range controls，仍需真實使用者研究確認是否足夠易懂。
- visible readout 由四個 range 的 `aria-describedby` 關聯，另以節流 `aria-live` 宣告參數；仍需 screen reader 實測確認訊息頻率。
- 行動 menu 沒有 focus trap；它是非 modal nav，但仍應做實際 tab-order 測試。
- 平台 scrollbar 已恢復，仍需在 Windows、macOS overlay scrollbar、觸控裝置與高對比模式確認可見性與不溢位。
- YouTube iframe、字幕與 transcript 的最終品質需人工確認。
- section boundaries 沒有涵蓋每一區，但全站根已有可重新載入的 recovery boundary。

## Performance 現況

DOM `#hero-title` 是預期 LCP；Three 與 sound prototype lazy 分 chunk，Three 排除 initial modulepreload，並在窄螢幕延後 1.4 秒後再等 idle；callback 重新檢查目前幾何與頁面可見性，只有 Hero 仍在 240 px preload window 內才首次下載。本機圖片 responsive 且有 intrinsic size。submission harness 會驗證 mode、submission／Pages boundary、逐檔 artifact／source manifests、report freshness／URL／完整 resolved profiles／runtime／metrics，以跨程序鎖保護 build 到 atomic publish，並封存 raw reports、CLI transcript、conditions 與完整受測 `dist`；archive completion marker 與 canonical summary 都最後原子提交。

歷史封存的延後前對照為 mobile Performance 87、LCP 3.463 s；同一歷史 artifact／source content／profile 的三次 run 為 Performance 96–97、LCP 2.258–2.407 s、TBT 23–34 ms、CLS 0、Accessibility 100，desktop 為 Performance 100、LCP 0.504–0.505 s、TBT 0。其 source manifest 已與目前 build inputs 發生 hash drift，所以這些分數只作設計決策歷史，不是目前 HEAD 的 fresh Lighthouse 結果。Fresh doctor build 確認 Three 仍約 851.22 kB／gzip 225.76 kB；應以低階真機與 production field data 再決定是否簡化。
