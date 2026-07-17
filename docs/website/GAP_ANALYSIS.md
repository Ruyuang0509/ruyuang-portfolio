# 現況與目標差距

## 優先級

- **P0：** 可能造成敏感資料外洩、誤導送審或正式建置失敗。
- **P1：** 明顯削弱研究可信度、案例完整性或可及性。
- **P2：** production、維護性與體驗品質改善。

## 差距矩陣

| 優先級 | 現況 | 風險／目標 | 建議 |
| --- | --- | --- | --- |
| P0 | Power BI restricted screenshot 已移出 public；資料使用說明不支持公開分析結果，另行公開許可未取得，部分 measures 仍待核對 | 重新公開原圖或錯誤推論會造成隱私／研究誠信風險 | 維持 quarantine；只有另取得資料提供方明確許可後才重新評估，正式輸出必跑 submission scan |
| P1 | Web Audio 有可操作 prototype，但 `notValidated` | 旗艦證據仍無使用者理解／學習效果資料 | 執行 planned formative tasks，保留匿名紀錄、錯誤、口述理解與 limitation |
| P1 | Pure Data／REAPER 只有學習狀態 | 聲響研究敘事的工具面仍薄弱 | 補可公開 patch/project、signal flow、聲音輸出及反思；未完成前維持現有誠實 wording |
| P1 | AI 文學故事 MV 已有可播放《Hamlet》成片、雙語字幕、八幕實際畫面、可重跑 evidence manifest 與衍生 Prompt Template v1；形成性評估只完成 planned protocol | Template v1 明確不是原始生成對話，成片證據也不等於教學有效；原始 Prompt log、實測紀錄與素材權利／來源簽核仍缺，`check:publication` 應維持 blocked | 維持 `notValidated` 與 `usedForExistingVideo: false`；以另一文本試跑模板並保留版本紀錄，執行學生／教師任務後才寫結果，由申請者完成權利 checklist／attestation 後才開啟發布閘門 |
| P1 | 資料視覺化影片字幕／transcript 品質未人工確認 | 聽覺可及性與快速審查不足 | 檢查 YouTube captions，另提供同頁 transcript summary |
| P1 | 沒有公開聯絡／CV | Reviewer Path 只能站內循環，不能完成外部轉換 | 由 stakeholder 決定是否加入；沒有資料前維持明示「無公開聯絡」 |
| P1 | 已完成 6 組 viewport、桌面六個導覽連結與 Logo、行動 menu、focus、contrast 與 Web Audio timeout fallback；screen reader、真實 200% zoom、system reduced-motion 與實機仍未驗證 | 部分 rendered smoke test 不能替代輔具與實機驗收 | 以 VoiceOver／NVDA、真實 zoom、系統偏好、iOS／Android 及多瀏覽器補完矩陣 |
| P2 | 歷史 851 kB 單一 Three chunk 已改為 638232 raw／169223 gzip B 的完整 lazy 3D closure，最大 chunk 483687 B；initial preload 排除 3D，current-fingerprint mobile 為 Performance 94、LCP 2632 ms、TBT 56 ms | 本機 simulated profile 與 build budget 支持目前保留場景，但仍不能代表低階實機、GPU／耗電或 production network | 保留 visibility-aware lazy／device gating 與 closure budget；以低階 Android／iOS、Save-Data 與正式 Pages field evidence 再判斷是否簡化 shader scene |
| P2 | sound 自動測試已有 5 個 mapping 與 13 個 controller lifecycle tests；React controls、Escape、offscreen 與 live region 目前只有 rendered smoke evidence | 核心 AudioContext race／cleanup 可重跑，但 component UI regression 尚未自動化 | 若未來加入正式 browser test runner，再補 React interaction tests；不要依賴間接 Puppeteer dependency |
| P2 | 單頁 anchors | 獨立分享、case SEO、browser history 能力有限 | 只有確定有分享需求時再評估 router/static routes |
| P2 | 已有 manual-only Pages workflow 與 Draft PR，但沒有一般 PR CI、lint、formatter 或廣泛 tests；目前 connector 可見 checks／workflow runs 都是 0 | 品質仍依賴本機 `doctor` 與人工矩陣 | 評估加入不含部署權限的最小 Windows PR CI 與 a11y smoke tests；由使用者另行決定何時執行 manual Pages workflow |
| P2 | social preview 為 SVG，無 canonical hosting | 平台相容性與 SEO 未完成 | 部署前補 raster 1200×630、canonical URL、實際 domain |
| P2 | Current-fingerprint Lighthouse 已封存完整 artifact／source lineage；目前只有 localhost simulated lab，尚無正式 URL／field data | 本機分數可解釋目前 build 決策，但不能代表 production network 與真實裝置 | Runtime、build 或 audit script 改動後重跑；正式 hosting 決定後另保留 production 與 localhost 證據區分 |

## 已解決且應保留

- 聲響主線 Hero、旗艦 Web Audio prototype、Learning Trail 與支援作品順序。
- 行動版 section menu、Escape 關閉與 focus restore。
- 原型 start/stop、visibility/offscreen cleanup、不支援與錯誤 fallback。
- AudioContext resume cancel／timeout、graceful release、background immediate cleanup、context interruption 與 destroy 的可測 controller。
- 桌面六個固定導覽連結與 Logo 的鍵盤焦點交接；桌面滑鼠與行動 menu 行為皆回歸通過。
- `notValidated`／`exploratory` 明確測試狀態與 validator enforcement。
- Hamlet delivery 已建立 manifest、SHA-256／bytes、WebVTT／逐字稿與 63 個 public assets 的可重跑 `audit:evidence`；這些完整性證據與發布權利分開治理。
- Hamlet Prompt Template v1 已以 `processDerived` 發布，明載不曾用來生成現有成片；原始 Prompt log 仍保留為外部缺口。
- Hamlet 形成性評估已建立 planned protocol，但不含參與者人數、日期、結果或成效；rights checklist 未簽核前，`check:publication` 的失敗是預期閘門。
- hidden immersive case 文字由 `#portfolio-hidden` alias 隔離，media 保持空；13 個專用 placeholders、generator refs 與 captions 已移除，submission dev 舊 URL 404。
- submission-hidden case 的流程圖／媒體 completeness 項目已標為不適用並排除 `recommendedMissing`；這不改變空 media、alias 與 scanner 隔離。
- submission scanner 已拆成可注入 core／thin CLI，具 48 個 text rules、6 個 inventory rules、redacted diagnostics 與 36 個 Node regression tests；VTT、Web Manifest、source map 也納入文字掃描，並仍保留獨立 `dist/` audit。
- R3F 已改用 lean canvas 與精準 constructor extend；遞迴 built-import budget 覆蓋 initial／完整 lazy closure 與單一 chunk，851 kB 歷史 warning 已關閉。
- `llms.txt`、favicon、social preview、index／JSON-LD 與案例 SEO 已統一為 RU / YUAN，dead anchors 已移除；canonical URL／raster preview 仍待 hosting 決策。
- Power BI 實作日期已確認為 2026/06/11–06/12；實際資料與結果媒體移出 public，公開 conceptual SVG。
- draft/submission bundling boundary，而非 CSS 隱藏。
- mapping pure functions 與 Node tests。
- DOM-first Hero、R3F lazy/device gating/offscreen pause。
- GitHub Pages 相對 base、public asset `BASE_URL`、submission Pages audit 與 manual-only Windows build workflow；仍待使用者另行決定遠端執行與部署時機。
- 全站 `RootErrorBoundary`、首屏主要內容不再 mount-hide、行動 anchor 目標焦點與 fine-pointer custom cursor gating。
- Web Audio 第四個鍵盤控制、可讀 readout、starting／busy、3 秒 resume timeout 及 pending context cleanup。
- 320px 繁中 display heading 越界修正與暖紙主題 accent 對比 5.71:1。
- 長頁平台 scrollbar 已恢復並跟隨深色／暖紙 theme token；`body` 最小寬度不再超出 scrollbar 扣除後的可用寬度，320×568、375×812、1440×900 均 0 global horizontal overflow。
- 有效 Git history、`origin`、`main`／working branch 與既有 Draft PR #1 已確認；後續不得重複初始化或建立重複 PR。
- 生成式 AI 協作方法區段、Prompt v1／v2、兩個實際失敗案例及人類最終責任揭露。
- submission-only Lighthouse harness 的跨程序鎖、stale-lock dead-PID 驗證、archive completion marker、canonical rollback／summary-last、完整受測 `dist`／source manifests、CLI transcript、完整 profile／environment fingerprint、freshness／runtime 驗證與 mobile／desktop 分流；Hero LCP、current-geometry first-load、scene fallback、前一輪離散主題對比、theme-aware nav、sound-pad ARIA、busy/live-region 與 pending-start 取消問題已修正。本輪再以 fixed viewport field 恢復可逆、可停留的深墨→暖灰→暖紙 scrub，並補齊 disclosure 兩向高度動畫。

## 建議里程碑

1. **研究證據：** 先完成 Web Audio 形成性測試並修訂 mapping rationale／限制。
2. **聲音作品：** 選擇 Pure Data 或 REAPER 其中一項，產出一個可公開、可解釋的最小 artifact。
3. **支持案例：** 以另一部文學作品試跑 Hamlet Prompt Template v1 並保留失敗／修訂紀錄，執行學生／教師形成性任務；完成資料影片字幕。Power BI 只有另取得資料提供方明確許可後才重新評估真實結果展示。
4. **可及性：** 在已完成的鍵盤／viewport／contrast 基礎上，補 screen reader、真實 zoom、行動 touch、system reduced-motion 與多瀏覽器 Web Audio matrix。
5. **Submission hygiene：** 維持已完成的 hidden asset、scanner、metadata 與 dev filesystem 邊界；每次正式輸出仍執行 scanner 與獨立 `dist/` audit。
6. **Production：** 確認聯絡／CV、domain、遠端 Pages workflow、正式 URL／field evidence 與 submission artifact；current-fingerprint localhost Lighthouse 已完成，由使用者決定部署時機。

## 安全延伸點

- 公開文案只改 `portfolio.js`；hidden draft text 只改 `portfolio.hidden.js`；construction notes 只改 `portfolio.internal.js`。
- 新案例／媒體先讀 content authoring 與 adding-portfolio-work；不要直接新增 remote demo media。
- 新聲音 mapping 優先放純函式並加 tests；AudioContext 必須由 user gesture 啟動、具 stop/cleanup 與安全 gain。
- 不要把 Pure Data／REAPER 學習狀態描述成作品成果。
- 不要把 `notValidated` 填成假 metrics；有證據才升為 `exploratory`／`validated`。
- 不把衍生 Prompt Template 回填成原始 Prompt log；`processDerived`、`specificationOnly` 與 artifact evidence 必須維持不同狀態。
- Hamlet 媒體、字幕、逐字稿或 derivative inventory 改動後先跑 `audit:evidence`；正式發布前另跑 `check:publication`，不可用 submission build 通過取代申請者權利簽核。
- 不要把 `restricted-media/` 路徑或原始檔搬進 `public/`。
- 任何放入 `public/` 的檔案都視為可公開；hidden project 保持空 media state，直到真實證據取得公開核准。
- 不把 `scan:submission` exit 0 當作唯一送審證據；另查 built wording、metadata 與 binary assets。
- 改 palette／繁中排版／資訊架構前，遵循對應 docs guardrails。
- 保持 Three scene lazy/progressive，使 DOM 文字仍是 LCP。

## 本次無法確認

利害關係人簽核、當年度官方申請要求、真實使用者測試、Hamlet 原始 Prompt log／素材權利與來源簽核、Pure Data／REAPER 原始作品、Power BI 另行公開許可、production hosting/domain、analytics、screen reader、真實 200% zoom、system reduced-motion、實機／field performance 與遠端 workflow／Pages 執行均不在目前可驗證證據中。本機 Lighthouse 與內建瀏覽器 smoke test 已完成，但不能把 localhost simulated scores 或未支援的輔具／實機模擬宣稱為 production 通過。
