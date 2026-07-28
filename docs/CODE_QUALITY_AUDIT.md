# 程式碼品質下降與生成式協作痕跡稽核

更新日期：2026-07-28

## 稽核結論

本輪完成 Repository 全域稽核與高信心修正，沒有重新設計網站、改框架、改公開路徑、弱化權利揭露或移除既有敘事動效。主要成果如下：

- 移除重複／不可達元件與內容分支，並以自動 gate 防止再次出現。
- 將網站 identity、11 段 IA、主要導覽與 Power BI 九章敘事收斂為可驗證的單一資料來源。
- 修正 `requestAnimationFrame`、hash target、影片 metadata／錯誤 listener 與 storyboard 鍵盤狀態的生命週期問題。
- 整理 CSS specificity、重複 selector、未使用 class 與一次性尺寸，新增少量真正共用的語意 token。
- 以兩條獨立引用證據鏈移除 21 個公開媒體孤兒，共 488,845 Windows working-tree bytes。
- 保留並強化 Hamlet limited-use、Suno credit、applicant attestation、`notValidated` 與 private-original 限制。
- 所有實際 dependency 都有使用；沒有為減少清單而移除必要套件。`@vitejs/plugin-react` 從浮動 `latest` 改為與 lockfile 現值一致的 `^6.0.3`，避免未審查的 major 漂移。

仍刻意保留的複雜處包括長篇案例 renderer、全畫面轉場、Web Audio 狀態機與 R3F progressive enhancement；它們有明確責任或使用者價值，不能只依檔案行數判定為冗餘。

## 執行前基線

- Canonical working tree：`如願個人網站`
- Branch：`main`
- `HEAD`／`origin/main`：`3cab18c5ec7bf7a76b5471edd8648b3afbbbb0a2`
- 執行前 `git status`：clean，沒有尚未提交的人工修改
- 執行前 `git diff`／`git diff --stat`：空
- 歷史檢查：已讀 `git log --oneline --decorate -n 30`，沒有 reset、clean、rebase、force push 或歷史改寫
- Stack：Vite 8、React 19、Motion、React Three Fiber／Three.js、Tailwind CSS v4、GSAP／ScrollTrigger、Lenis
- 部署：GitHub Actions 在 Windows／Node 22／pnpm 11.7 執行 submission 與 publication gates，再由 Ubuntu job 部署 GitHub Pages

重構前 `pnpm run build` exit 0：

| 指標 | 基線 |
| --- | ---: |
| transformed modules | 476 |
| draft entry raw | 184,302 B |
| CSS raw | 46,069 B |
| initial JS gzip | 202,604 B |
| lazy 3D closure | 638,680 raw / 169,383 gzip B |

所以本輪沒有把基線錯誤誤認為重構造成；相反地，第一次資料重構後 build 曾被現有 entry budget 正確攔截，詳見「Build budget 回歸」。

## 發現、證據與處理

### 1. 重複元件與不可達程式

高信心發現：

- `CaseStudyShowcase.jsx` 內另有一份 `ResponsiveImage`，和共用元件責任、fallback 與 props 重疊。
- 舊 `ProjectOverview*`、`DiagramGallery` 與 `LearningTrail.jsx` 已沒有可達 consumer。
- Power BI 專屬 renderer 在 generic `StructuredProjectSections` 前直接 return，因此該專案的 `extendedSections` 永遠不可達，內容又和 charts／ethics／reflection 重複。

處理：

- 案例 renderer 改用共用 `ResponsiveImage.jsx`。
- 移除上述不可達元件、helper、資料欄位與 `LearningTrail.jsx`。
- 只刪除 Power BI 的不可達 `extendedSections`；其他案例的 generic schema 保留。
- `audit:quality` 從 draft／submission 兩種 alias 入口建立 import graph，現有 43 個 source modules 全部可達。

### 2. 內容與網站契約單一來源

高信心發現：

- Navbar、`llms.txt`、metadata、JSON-LD、canonical URL 與最終連結各自持有相同網站事實。
- Power BI 九章標題、導覽、流程分組、chart eyebrow、Hero fact 與摘要寫死於 renderer，資料檔只持有另一半內容。
- `testing.metrics[0/1]` 依陣列位置取值，重新排序後會悄悄換義。

處理：

- 新增 `src/config/site.js`，集中 identity、11 段 IA、主要導覽與相容 anchor；Navbar 與公開連結直接讀取此設定。
- `audit:site` 交叉核對 HTML metadata、Open Graph、Twitter、JSON-LD、`llms.txt`、social preview、source IDs、navigation、alias 與 final links。
- Power BI 的 `sections`、Hero、reading frame、data provider、三層／七步流程、overview、chart eyebrow 與 interaction summary 全部由 `portfolio.js` 提供；renderer 只保留通用 UI 詞彙與 DOM 結構。
- 兩個 testing metric 新增穩定 `key`，renderer 不再依賴陣列位置。
- content validator 固定九個已發布 anchor suffix、三層七步、三張圖表、四項互動與必要敘事欄位。

### 3. JavaScript 與媒體生命週期

高信心發現：

- Custom cursor 的兩個 animation frame ID 在 cleanup 未完整取消／歸零，重新啟用時可能延續舊 frame。
- hash settle 在完成、中斷或 unmount 後可能留下 `data-hash-target-active`。
- Storyboard metadata seek 只等待成功事件；替換 seek 或失敗後可能殘留 listener。
- 桌機 storyboard 按 `End` 已到最右側，live region 卻顯示第 07／08 幕。

處理：

- cursor cleanup 取消並歸零 frame，清除 target／rect 並把視覺 cursor 移出畫面。
- hash settle 的完成、取消、使用者中斷與 unmount 全部移除 active marker。
- Storyboard 以單一 `clearPendingSeek` 清理 `loadedmetadata`／`error`／`abort`；新 seek 會先取消舊 seek，只在 `NETWORK_EMPTY` 時呼叫 `load()`。
- storyboard keyboard 改以目前 frame index 計算 Arrow／Home／End，再沿用既有 immediate scroll-snap；1440px 實測 `End → Home → ArrowRight → ArrowLeft` 為 `08 → 01 → 02 → 01`。
- Web Audio 18 個 mapping／engine tests 全數保留；Browser 實測可由「尚未啟用」進入「聲音播放中」，Escape 後回到「聲音已停止」。

### 4. CSS、responsive 與 token

高信心發現：

- 全域 `:focus-visible` 強制 radius，會把不應成為 pill 的控制項套成相同形狀。
- 同一 viewport field 以較高 specificity 和 `!important` 修正。
- 多個未使用 selector、重複 dashboard media rule、冗餘背景／overflow utility 與 800px 單點 breakpoint。
- 多個 layout gutter、控制最小尺寸與 inverse panel border 使用相同概念但沒有語意 token。

處理：

- 移除全域 focus radius，只保留可見 outline；元件自己的形狀不被覆寫。
- 用 `--viewport-field-inset` 消除兩個 `!important`。
- 移除 `.gallery-panel`、`.institute-jump-link`、`.institute-evidence-group`、冗餘 phrase rule、重複 dashboard nav rule與未使用 media promotion selector。
- 新增 `--page-gutter`、`--control-hit-size`、`--theme-inverse-line`，並套用到真正共享同一責任的位置。
- Project Index breakpoint 對齊現有 Tailwind `md` 768px；768px 實測兩欄，390／320px 單欄。
- 保留 R3F Hero、GSAP／Lenis、fixed viewport field、section reveal、card feedback、custom cursor、Web Audio 與 reduced-motion contract。

需要效能／可用性證據後才可再動的項目：

- Hero 640px progressive-loading 條件與全站 768px layout breakpoint 不同；這是低核心裝置 gate，不是已證實錯誤。
- `App` hash settle 與 `AnimatedDetails` 各自使用 ResizeObserver／WAAPI 處理不同高度責任；沒有 profiling 證據前不合併。

### 5. 媒體與產生器

刪除前逐項確認 source、CSS、Markdown、metadata、動態資料 URL、Git history 與 fresh build：

- `work-02-donut-public.svg`：1
- `gd-editorial-{420,640,1200}.{avif,webp}`：6
- `mv-fashion-{420,640,1200}.{avif,webp}` 與 preview MP4：7
- `ph-blue-{420,640,1200}.{avif,webp}`：6
- `mv-urban-preview.mp4`：1

共 21 檔、488,845 Windows working-tree bytes（canonical Git blobs 合計 488,835 bytes）。六個仍由案例封面使用的 `mv-urban` AVIF／WebP 保留。刪除檔都是 tracked 檔，未提交前可由 Git 還原。

`generate-local-media.py` 只保留目前實際使用的 `mv-urban` responsive 產生項目，不再重建孤兒 MP4。`audit:media` 改為精確 path 比對：

- 94 個剩餘 `public/media` 檔都有 runtime 或 metadata path。
- 任一引用檔不存在會 fail。
- 部分字串或偶然提到檔名不再被誤認為有效引用。

### 6. 權利與研究狀態

Manifest 原本同時宣告場景生成紀錄數為 0、未找到，卻使用 `generationRecordsReviewed: true`。這個 key 容易被解讀為已看過不存在的紀錄。

處理：

- 改為 `boundedSearchCompleted: true`，保留 `recordsNotLocated` 與 count 0。
- validator 明確拒絕舊的誤導 key；新增「0 筆紀錄不得標示已 reviewed」回歸測試。
- Hamlet rights tests 由 14 增為 15，全部通過。

沒有改變：

- Suno 特定 Song ID 的 limited non-commercial scope 與 public credit。
- 2026-07-26 applicant attestation。
- Canva、場景、現代文本、原始 EML／生成紀錄與 private originals 的既有限制。
- Hamlet `notValidated`、Power BI `exploratory`、未來研究方向與已完成成果的分界。

### 7. Build budget 回歸

第一次完成 Power BI 資料層搬移後，draft build 產生 187,902 B entry，超過 184,320 B 上限，`doctor` exit 1。沒有調高 budget。

修正方式是將非首屏、重度的 `CaseStudyShowcase` 改為 lazy module，並在 mount 時發出既有 deferred-ready 事件，使冷啟動深連結仍會重新 settle。最終：

- draft entry 129,578 B
- submission entry 100,968 B
- `#interactive-sound-learning-demo`、`#generative-interface-study-storyboard` 與 Power BI 子章 deep link 都落在 fixed nav 下 96–112px

## 最終驗證

命令均由 canonical root 實際執行：

| 命令／證據 | 結果 |
| --- | --- |
| `pnpm install --frozen-lockfile` | 最終 exit 0；212 packages 全由既有 store reuse、download 0。semver spec 更新後，第一次非互動 metadata rebuild 因無 TTY 中止，CI retry 又在重建目錄時逾時；最後一次重跑完成供應鏈檢查與完整還原 |
| `pnpm run doctor` | exit 0 |
| `pnpm run check:publication` | exit 0；`verified / approved`，只代表已記錄的 limited-use 範圍 |
| sound tests | 18/18 |
| Hamlet rights tests | 15/15 |
| submission scanner | 73/73 |
| content validation | 5 projects；Power BI 的流程圖／媒體證據仍為建議缺件，不用假素材補位 |
| evidence audit | 3 direct copies、60 derivatives、16 WebVTT cues、63 Hamlet public files |
| draft build | 477 modules；entry 129,578 B；CSS 45,757 B；initial JS gzip 192,963 B |
| submission build | 473 modules；entry 100,968 B；CSS 45,757 B；initial JS gzip 183,291 B |
| submission artifact | 119 files；32 text files；67 text rules／9 inventory rules |
| public → dist inventory | 98 public files、94 media；0 missing、0 SHA-256 mismatch |
| removed／stale artifact scan | 0 deleted asset、0 stale text reference、0 Draft audit chunk |
| GitHub Pages audit | exit 0；相對 asset path 可攜於 project subpath |

Browser 使用 submission production preview：

| Viewport／互動 | 實測 |
| --- | --- |
| 1440×1000 | global overflow 0；dead anchor 0；duplicate ID 0；broken image 0；Power BI 為 9／3／7／3／4／3 結構 |
| 768×900 | Project Index 2 欄、Power BI reading map 3 欄、desktop nav 生效、overflow 0 |
| 390×844 | Power BI reading map 1 欄、44px menu control、menu Escape 還焦、`#selected-work` top 96px |
| 320×720 | document overflow 0、dead anchor 0、duplicate ID 0、broken image 0、44px menu control |
| 深連結 | Power BI charts 96px、selected work／research alias 112px、Web Audio demo 112px、Hamlet storyboard 96px；contact 因頁尾到達 max scroll 而停在 224px |
| Storyboard | `End → Home → Right → Left` 顯示 `08 → 01 → 02 → 01`；連點第 08／04 幕後影片停在 15.0s、paused、status 指向第 04 幕 |
| Web Audio | user gesture 後顯示播放中；Escape 後 graph 停止，UI 回到已停止 |
| Console | warning／error 0 |

## 未驗證與後續限制

- 沒有 commit、push、merge 或 deploy；本機 gate 成功不等於目前 production 已含本輪變更。
- 未做 screen reader、真實 200% zoom、作業系統 reduced-motion、實機觸控、Safari／Firefox 音訊或 production field performance。
- 未重新執行 Lighthouse；本輪不是新的 performance field evidence。
- 兩個 YouTube 作品的第三方 rights／完整 credit、Hamlet private originals 與原始 EML／生成紀錄仍需依既有治理文件處理。
- Power BI 真實資料、PBIX／Excel、結果影像與操作錄影持續不公開；這是權限邊界，不是應以 placeholder 補齊的缺陷。
