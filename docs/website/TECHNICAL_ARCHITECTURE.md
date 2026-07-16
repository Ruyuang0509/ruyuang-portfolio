# 技術架構

## 技術清單

| 技術 | 實際用途 | 地位／影響 |
| --- | --- | --- |
| JavaScript ES modules + JSX | 全部應用、資料與自訂驗證腳本 | 核心；沒有 TypeScript |
| React 19 / React DOM 19 | SPA 元件樹、hooks、lazy/Suspense、class error boundary | 核心 |
| Vite 8.1.x（目前安裝 8.1.3） | dev/build、模式 alias、Tailwind plugin、chunk 拆分 | 核心 |
| pnpm 11.7 package contract | lockfile 與全部 scripts；本機實際 CLI 可更高但 lock/packageManager 以 11.7 為可重現基準 | 核心 |
| Tailwind CSS 4.3 | JSX utility layout；Vite plugin 零 runtime | 核心 |
| 自訂 CSS tokens/primitives | 繁中排版、surface、sound pad、reduced-motion、print | 核心 |
| Motion for React 12 | Hero CTA、卡片、custom cursor、reduced-motion | 核心 |
| GSAP 3.13 + ScrollTrigger | Lenis ticker 與 gallery 主題反轉 | 核心 |
| Lenis 1.3 | 平滑 wheel／anchor scroll | 核心；reduced-motion 停用 |
| Three.js 0.179 + React Three Fiber 9 | Hero shader orb 與粒子 | 選配、lazy 漸進增強 |
| Web Audio API | 旗艦案例合成聲音、pan/pitch/filter/gain | 核心產品證據；瀏覽器原生、無額外依賴 |
| Node test runner | `soundMapping.js` 純函式與 `webAudioEngineCore.js` lifecycle 測試 | 已使用；18 tests，不需 DOM 或真實聲卡 |
| Submission scanner core | Text rules、binary inventory、redacted diagnostics 與 isolated CLI fixtures | 已使用；33 tests，不需網路或正式 `dist/` |
| Lighthouse 13.4 | submission mobile／desktop lab audit、freshness 與 lineage summary | 開發工具；非 runtime |
| Python | 本機媒體產生腳本 | 開發工具 |

沒有 router、state library、form library、data-fetching layer、CMS、backend、database、auth、analytics、formatter 或正式 lint/type-check。自訂 audit／validator 是主要靜態品質門檻。

## 入口、渲染與資料流

```mermaid
flowchart LR
  A["index.html"] --> B["src/main.jsx"]
  B --> C["React StrictMode / RootErrorBoundary / App"]
  C --> D["Lenis + ScrollTrigger hooks"]
  C --> E["Navbar + CustomCursor + Draft alias"]
  C --> F["HomePage sections"]
  F --> G["portfolio.js public data"]
  F -. lazy .-> H["HeroScene / R3F"]
  F -. lazy .-> I["SoundInteractionPrototype"]
  I --> J["soundMapping pure functions"]
  I --> K["useWebAudioEngine"]
  K --> L["webAudioEngineCore controller"]
  L --> M["Web Audio graph"]
```

`main.jsx` 註冊 ScrollTrigger，透過 `RootErrorBoundary` 將 `App` 掛到 `#root`。內容無 server render；元件直接 import `portfolio.js`，透過 props 傳給共用 renderer。沒有 context/store 或 network state。

## 頁面與元件責任

- [`../../src/App.jsx`](../../src/App.jsx)：頁面順序、旗艦／支持案例拆分、AI 方法、Reviewer Path 與頂層區段 error boundaries；`main` 首幀直接可見。
- [`../../src/components/Navbar.jsx`](../../src/components/Navbar.jsx)：桌面／行動 anchor 導覽、reduced-motion scroll、目標 heading focus、focus restore、hash 更新。
- [`../../src/components/ImmersiveHero.jsx`](../../src/components/ImmersiveHero.jsx)：資料驅動 Hero、首幀可讀標題／介紹、CTA Motion、延後 3D progressive loading。
- [`../../src/components/LeanR3FCanvas.jsx`](../../src/components/LeanR3FCanvas.jsx)：以 R3F public `createRoot`／`events` 建立 Hero 專用 canvas，只註冊實際使用的 8 個 Three constructors；同步尺寸、DPR 與 frameloop，並以可取消 disposal 避免 StrictMode replay 的舊清理銷毀新 root。
- [`../../src/components/ResearchPositioning.jsx`](../../src/components/ResearchPositioning.jsx)：定位、軌道、術語轉譯與本所連結。
- [`../../src/components/CaseStudyShowcase.jsx`](../../src/components/CaseStudyShowcase.jsx)：索引、長篇案例、16:9／多字幕影片、workflow、Prompt 決策、storyboard、媒體分層、證據分類、testing、credits 與 lazy flagship demo。
- [`../../src/components/SoundInteractionPrototype.jsx`](../../src/components/SoundInteractionPrototype.jsx)：具圖像語意的 pointer pad、touch／四個 range input、readout、節流 live announcement、聲音生命週期、mapping 說明。
- [`../../src/hooks/useWebAudioEngine.js`](../../src/hooks/useWebAudioEngine.js)：React state、StrictMode-safe controller lifecycle 與 `visibilitychange` 即時清理。
- [`../../src/audio/webAudioEngineCore.js`](../../src/audio/webAudioEngineCore.js)：可注入／可測試的 AudioContext controller，負責 resume cancel／timeout、graph、release、context interruption、參數與 destroy。
- [`../../src/audio/soundMapping.js`](../../src/audio/soundMapping.js)：可測試的 clamp、linear/log mapping 與參數安全範圍。
- [`../../src/components/LearningTrail.jsx`](../../src/components/LearningTrail.jsx)：學習中工具及證據邊界。
- [`../../src/components/AiWorkflowSection.jsx`](../../src/components/AiWorkflowSection.jsx)：生成式 AI／LLM 協作責任、Prompt 版本、失敗案例與文件證據入口。
- [`../../src/components/DataVisualizationSeries.jsx`](../../src/components/DataVisualizationSeries.jsx)：兩件資料作品的系列策展入口。
- [`../../src/components/SectionErrorBoundary.jsx`](../../src/components/SectionErrorBoundary.jsx)：區段失敗隔離與 reset。
- [`../../src/components/RootErrorBoundary.jsx`](../../src/components/RootErrorBoundary.jsx)：未捕捉 root error 的可閱讀 recovery 與重新載入操作。
- [`../../src/components/EditorialHeading.jsx`](../../src/components/EditorialHeading.jsx)：繁中片語分行與完整 accessible name。

## Web Audio 架構

```mermaid
flowchart LR
  A["Pointer / touch / range"] --> B["Normalized x, y, speed, size"]
  B --> C["soundMapping.js"]
  C --> D["Triangle Oscillator"]
  D --> E["Low-pass Filter"]
  E --> F["Voice Gain"]
  F --> G["Envelope"]
  G --> H["Stereo Panner"]
  H --> I["Compressor"]
  I --> J["Master Gain 0.62"]
  J --> K["Audio destination"]
```

- x 0→1 映射 pan -0.85→0.85。
- y 0→1 以對數映射 660→110 Hz，畫面上方較高音。
- pointer speed 0→1.2 px/ms 正規化後映射 filter 700→5000 Hz；鍵盤亦可透過第四個「濾波亮度」range 直接控制同一正規化參數。
- size 0→1 映射 voice gain 0.04→0.12；後方另有 compressor 和 master gain。
- 參數以 `setTargetAtTime` 平滑更新；音訊只在使用者按下「啟用聲音」後建立。
- Escape、離開 prototype viewport、頁面 hidden 或 unmount 會停止並關閉 context。
- 一般 stop 先執行 35 ms envelope release，再於 50 ms 關閉 graph；頁面 hidden、destroy、restart 與 context interruption 使用立即清理，避免 background timer throttling。
- 不支援 AudioContext／StereoPanner 或啟動失敗都有可讀錯誤訊息；`resume()` 超過 3 秒會關閉 pending context 並轉為 error，stop／destroy／較新 start 會立即取消 pending resume。
- controller 監聽 active context 的 suspended／interrupted／closed 狀態，避免 UI 停留在錯誤的 `running`。

[`../../tests/sound-mapping.test.mjs`](../../tests/sound-mapping.test.mjs) 有 5 個純 mapping tests；[`../../tests/web-audio-engine.test.mjs`](../../tests/web-audio-engine.test.mjs) 有 13 個 controller lifecycle tests，涵蓋支援偵測、建圖、參數、release、即時清理、reject／timeout／cancel、連續 start、context interruption、建圖失敗與 destroy。React UI 仍以 rendered smoke test 驗證；沒有 audible-output 自動測試。

## Draft／Submission 邊界

`VITE_PORTFOLIO_MODE=submission` 時，Vite alias `#portfolio-draft` 指向空元件，`#portfolio-hidden` 指向空資料模組；draft mode 則分別解析治理 UI 與 `portfolio.hidden.js`。這些是 build/dev module boundaries，不依賴 CSS 隱藏。

Hidden case 使用空 media state；原有 13 個 `ph-after-*`／`mv-soft-*` placeholders、generator entries、captions 與 references 已移除。Submission dev 另保留 Vite 預設 deny，並封鎖 `.tmp`、`dist`、`reports`、`restricted-media`、internal／hidden modules 等根目錄直連；submission-only middleware 讓缺少的 `/media/portfolio/*` 與所有 `/dist/*` dev URL 明確回 404，而不是落入 SPA HTML fallback，有效 public media 仍照常服務。`submission-output-scanner.mjs` 對 HTML／JS／CSS／JSON／source map／TXT／SVG／VTT／Web Manifest／XML 套用 46 個 text rules，並對所有相對路徑套用 6 個 inventory rules；binary 不作 UTF-8 掃描。33 個 isolated CLI fixtures 驗證 bad output exit 1、clean fixture exit 0、separator／case normalization、新增文字格式、中文佔位語句與 redacted diagnostics。

## Styling 與 motion lifecycle

Tailwind utility 負責局部 grid/spacing；[`../../src/styles.css`](../../src/styles.css) 負責語意 tokens、繁中排版、mobile menu、surface、focus、sound pad、reduced-motion 與 print。`useLenisGsap` 讓 Lenis 與 GSAP 共用 ticker；`useThemeInversion` 以 `#gallery` 為 trigger 將深墨主題捲動轉成暖紙主題。Motion 與 R3F 各自讀取 reduced-motion 或裝置能力。

## 資產與 build pipeline

- `public/` 靜態資產原樣提供；案例圖使用 AVIF/WebP `srcset` 與固定 dimensions。Hamlet clean MP4 使用外掛英文／繁中 WebVTT，renderer 不自動播放並以同頁逐字稿補足。任何放入 public 的檔案都應視為可公開，即使 submission React tree 沒有引用。
- R3F 與 Web Audio UI 都以 `React.lazy` 分 chunk；Three 不進 initial modulepreload。Hero section 作為 R3F `eventSource`，pointer 以 section 的 `clientX/Y` 換算；離開 preload window 後改為 `frameloop="demand"`。
- Vite manual chunks：`react`、`three-core`、`motion`、`scroll`、`vendor`；R3F 自然留在 lazy `HeroScene`，避免強制打包整個 Three namespace。
- 2026-07-17 fresh submission build 的 lazy 3D closure 為 `HeroScene` 151272 B、`three-core` 483687 B、`vendor` 3273 B，合計 638232 raw／169223 gzip B；initial JS closure 為 187397 gzip B。`audit-build-budgets.mjs` 以 attribute-order-independent HTML 解析和 built import closure 計算 initial／lazy 成本，並逐檔限制 500000 raw B，因此沒有 >500 kB warning。
- `audit-portfolio-evidence.mjs` 核對 Hamlet direct-copy bytes／SHA-256、衍生 AVIF/WebP inventory SHA-256、實際 dimensions、VTT timing／逐字稿及 public inventory。Publication mode 另外要求頂層核准狀態、逐項 rights checks／evidence refs 與完整 applicant attestation；只改一個 status 不能解除 gate。
- `run-lighthouse.mjs` 明確建置 submission／相對 base並先跑 submission／Pages scan；以完整 path／size／SHA-256 manifest 複製 immutable artifact，再由動態 port preview。它動態納入根目錄 Vite `.env*`，在 audit 前後核對 build-input path set／manifest，並驗證 mtime、fetchTime、URL、完整 resolved mobile／desktop config、runtime、categories、metrics 與 diagnostics；profile fingerprint 保存完整設定，environment／comparability fingerprint 另納入 benchmark、OS 與穩定 CPU identity，繼承環境只保存名稱與值雜湊。
- 每次 Lighthouse run 從 build 前至發布完成持有跨程序獨占鎖，只有 metadata 完整且 PID 回報 `ESRCH` 的 stale lock 可用 token quarantine 回收。唯一 archive 先寫入 raw reports、conditions、CLI stdout／stderr transcript、artifact／source manifests 與完整受測 `dist`，重驗所有雜湊後最後原子建立 `archive-complete.json`；沒有 marker 的孤兒目錄不算成功。canonical reports／history 以 sibling temp＋rename 更新並可整組 rollback，latest summary 最後 atomic replace 作權威指標；失敗 run 保留上一份成功 summary。最近 20 次索引在 `reports/lighthouse-history.json`。只有 fresh report 通過全部驗證，且非零輸出精確指向該 run Chrome temp 的已知 cleanup `EPERM` 簽章時才降為具名 warning並封存原始輸出。
- Current-fingerprint Lighthouse：mobile Performance 95／Accessibility 97／LCP 2558 ms／TBT 37 ms／transfer 452016 B；desktop 100／100／552 ms／0 ms／435687 B。此為 localhost simulated lab，不是 production field evidence。
- `restricted-media/` 在 `public/` 外，不會被 Vite 複製；submission dev 也以 filesystem deny 阻擋直接 URL。
- 外部 runtime 只有資料案例的 YouTube privacy-enhanced iframe；沒有 fetch/API。
- `index.html`、JSON-LD、`public/llms.txt`、favicon、social preview 與案例 SEO title 已同步為 RU / YUAN／Sound, Interaction & Learning；canonical URL 與 raster preview 仍等待 hosting 決策。

## 環境、部署與失敗邊界

- 唯一應用 mode 值是 `VITE_PORTFOLIO_MODE`; 非 `submission` 一律視為 draft。
- PowerShell wrappers 優先使用 PATH Node，否則回退 Codex bundled Node，顯示主要開發環境為 Windows／PowerShell。
- Vite 預設使用相對 `base`，也可由 `VITE_BASE_PATH` 覆寫；public assets 以 `BASE_URL` 組路徑。應用沒有 client routes，因此不需要獨立 application 404 頁；submission dev 仍針對媒體／`dist` 邊界阻止 Vite 的通用 SPA fallback。
- `check:submission` 先跑 scanner regression suite，再 build、掃描 text／inventory，最後執行 `audit:pages` 拒絕 GitHub Pages-breaking root-relative assets。
- `.github/workflows/deploy-pages.yml` 是 manual-only：Windows build job 使用 Node 22／pnpm 11.7 驗證 submission，再交給 Pages deploy job。workflow 已存在於追蹤遠端的 feature branch／Draft PR；尚無可確認的遠端執行、production deploy、Pages URL 或 domain。
- Hero、旗艦、支持案例及聲音 demo 有 section error boundaries；React 根另有共同 recovery boundary。

## 開發與驗證命令

```powershell
pnpm install
pnpm run workspace:check
pnpm run audit:media
pnpm run audit:text
pnpm run audit:cjk
pnpm run audit:evidence
pnpm run content:check
pnpm run test:sound
pnpm run test:submission-scanner
pnpm run build:draft
pnpm run check:submission
pnpm run doctor
```

開發：`pnpm run dev:draft`；正式內容預覽：`pnpm run dev:submission`。需要效能證據時才執行 `pnpm run audit:lighthouse`；它產生 fresh mobile／desktop JSON 與 `reports/lighthouse-summary.json`，仍應把 localhost lab 與 production field evidence 分開解讀。Hamlet 正式公開前另執行 `pnpm run check:publication`；目前因權利與 applicant attestation 未完成而預期失敗。

正式提交驗證需在 `check:submission` 之後再做獨立檢查：

1. 搜尋 built JS／HTML／TXT／SVG 中的「施工模式」、舊品牌與失效 anchors。
2. 盤點 `dist/media/portfolio`，確認 hidden-only 檔名不存在。
3. 比對 `public/llms.txt`、favicon、robots、social preview 與 `index.html` 的品牌／URL。
4. 確認 `restricted-media` 檔名、local path、原始資料副檔名與敏感素材沒有進入 `dist/`。
5. 只有在 current source fingerprint 與 audited artifact 對得上時，才引用 Lighthouse 分數。

## Development continuation guide

### 每輪開始

1. 確認 `git rev-parse --show-toplevel` 指向 canonical root。
2. 檢查 branch／remote／dirty state；只在 `feat/portfolio-admission-foundation` 或使用者指定的新 `codex/` branch 工作，不直接修改 `main`。
3. 先讀本索引、`CODEX_HANDOFF.md`、`PORTFOLIO_AUDIT.md`、`CONTENT_MATRIX.md` 與本次要改動領域的 guardrail 文件。
4. 執行 `pnpm run workspace:check`，再依改動範圍選擇 content、sound、build、submission 或 Lighthouse 驗證。

### 重要目錄與安全延伸點

| 位置 | 責任／延伸規則 |
| --- | --- |
| `src/data/portfolio.js` | 公開敘事、案例順序、測試狀態與公開 media metadata；不可放施工待辦 |
| `src/data/portfolio.hidden.js` | Draft-only hidden case 文字；保持空 media state，submission alias 解析為空模組 |
| `src/data/portfolio.internal.js` | Draft-only 施工／風險備註；submission UI 由 alias 整層移除 |
| `src/components/CaseStudyShowcase.jsx` | 共用案例 renderer；新增欄位前先更新 authoring schema／validator |
| `src/audio/` | Mapping pure functions 與可測 controller；新 mapping 應先維持安全輸出範圍並補 Node tests |
| `src/styles.css` | 語意 tokens、繁中排版、theme、scrollbar、reduced-motion、print；改色彩／字級前讀 visual guardrails |
| `public/` | 所有檔案都會公開複製；只放正式可發布資產與 metadata |
| `restricted-media/` | 不可公開原始資料；不得由 component、public URL 或 build script 引用 |
| `scripts/` | Windows／Codex validation wrappers 與 audits；scanner 改動需要以已知漏網案例做 regression |

### Fragile areas

- Hidden data、internal UI／notes、public assets 與 dev root serving 是不同邊界，修一層不能假設另外幾層安全。
- Web Audio 必須維持 user gesture、pending cancel、stop／destroy、hidden cleanup、unsupported／timeout fallback。
- Hero DOM 文字必須保持首幀 LCP；Three 不可重新進 initial modulepreload 或在 Save-Data／reduced-motion 強制載入。
- Navbar 的滑鼠、桌面鍵盤、行動 focus restore 與 hash 更新是不同路徑，改導覽時要分別回歸。
- Power BI 原圖、測試結果、聯絡資料、研究成果與 credits 都需要 stakeholder 證據，不能由工程端推測補齊。

### 建議續作順序

Submission hygiene（hidden media、scanner、metadata）與 current-fingerprint Lighthouse 已完成本機 closure；AI 文學故事 MV 已有公開媒體證據，下一步補 Web Audio／AI 學習者證據、Hamlet 申請者權利聲明與 Pure Data／REAPER artifact，其後完成人工 accessibility／device matrix，最後才執行遠端 Pages workflow 與 production hosting 決策。
