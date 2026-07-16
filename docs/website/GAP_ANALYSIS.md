# 現況與目標差距

## 優先級

- **P0：** 可能造成敏感資料外洩、誤導送審或正式建置失敗。
- **P1：** 明顯削弱研究可信度、案例完整性或可及性。
- **P2：** production、維護性與體驗品質改善。

## 差距矩陣

| 優先級 | 現況 | 風險／目標 | 建議 |
| --- | --- | --- | --- |
| P0 | Power BI restricted screenshot 已移出 public，但授權與 measures 仍未確認 | 重新公開原圖或錯誤推論會造成隱私／研究誠信風險 | 維持 quarantine；取得書面依據後再決定，正式輸出必跑 submission scan |
| P1 | Web Audio 有可操作 prototype，但 `notValidated` | 旗艦證據仍無使用者理解／學習效果資料 | 執行 planned formative tasks，保留匿名紀錄、錯誤、口述理解與 limitation |
| P1 | Pure Data／REAPER 只有學習狀態 | 聲響研究敘事的工具面仍薄弱 | 補可公開 patch/project、signal flow、聲音輸出及反思；未完成前維持現有誠實 wording |
| P1 | 生成式 AI 協作方法已有 Prompt v1／v2、責任揭露與失敗案例；但「生成式 AI 介面研究」作品仍只有圖解與構想 | 方法可追溯不等於作品已有操作與實測證據 | 完成真實 prompt task、prototype、版本比較與形成性測試；否則維持 `notValidated` 與目前較低策展比重 |
| P1 | 資料視覺化影片字幕／transcript 品質未人工確認 | 聽覺可及性與快速審查不足 | 檢查 YouTube captions，另提供同頁 transcript summary |
| P1 | 沒有公開聯絡／CV | Reviewer Path 只能站內循環，不能完成外部轉換 | 由 stakeholder 決定是否加入；沒有資料前維持明示「無公開聯絡」 |
| P1 | 已完成 6 組 viewport、桌面六個導覽連結與 Logo、行動 menu、focus、contrast 與 Web Audio timeout fallback；screen reader、真實 200% zoom、system reduced-motion 與實機仍未驗證 | 部分 rendered smoke test 不能替代輔具與實機驗收 | 以 VoiceOver／NVDA、真實 zoom、系統偏好、iOS／Android 及多瀏覽器補完矩陣 |
| P2 | Three lazy chunk 約 851 kB／224 kB transfer；延後、目前幾何／頁面可見性 first-load gate 與局部 scene fallback 完成後，同一 immutable artifact／source content／profile 的 3 次 mobile run 為 Performance 96–97、LCP 2.258–2.407 s、TBT 23–34 ms | 本機 simulated profile 支持目前保留場景，但仍不能代表低階實機、GPU／耗電或 production network | 保留 visibility-aware lazy／device gating；以低階 Android／iOS、Save-Data 與正式 Pages field evidence 再判斷是否簡化 shader scene |
| P2 | sound 自動測試已有 5 個 mapping 與 13 個 controller lifecycle tests；React controls、Escape、offscreen 與 live region 目前只有 rendered smoke evidence | 核心 AudioContext race／cleanup 可重跑，但 component UI regression 尚未自動化 | 若未來加入正式 browser test runner，再補 React interaction tests；不要依賴間接 Puppeteer dependency |
| P2 | 單頁 anchors | 獨立分享、case SEO、browser history 能力有限 | 只有確定有分享需求時再評估 router/static routes |
| P2 | 已有 manual-only Pages workflow 與 Draft PR，但沒有一般 PR CI、lint、formatter 或廣泛 tests；目前 connector 可見 checks／workflow runs 都是 0 | 品質仍依賴本機 `doctor` 與人工矩陣 | 評估加入不含部署權限的最小 Windows PR CI 與 a11y smoke tests；由使用者另行決定何時執行 manual Pages workflow |
| P2 | social preview 為 SVG，無 canonical hosting | 平台相容性與 SEO 未完成 | 部署前補 raster 1200×630、canonical URL、實際 domain |

## 已解決且應保留

- 聲響主線 Hero、旗艦 Web Audio prototype、Learning Trail 與支援作品順序。
- 行動版 section menu、Escape 關閉與 focus restore。
- 原型 start/stop、visibility/offscreen cleanup、不支援與錯誤 fallback。
- AudioContext resume cancel／timeout、graceful release、background immediate cleanup、context interruption 與 destroy 的可測 controller。
- 桌面六個固定導覽連結與 Logo 的鍵盤焦點交接；桌面滑鼠與行動 menu 行為皆回歸通過。
- `notValidated`／`exploratory` 明確測試狀態與 validator enforcement。
- hidden immersive case 在 submission data 中排除。
- Power BI 未知年份省略、restricted media 移出 public、公開 conceptual SVG。
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
- submission-only Lighthouse harness 的跨程序鎖、stale-lock dead-PID 驗證、archive completion marker、canonical rollback／summary-last、完整受測 `dist`／source manifests、CLI transcript、完整 profile／environment fingerprint、freshness／runtime 驗證與 mobile／desktop 分流；Hero LCP、current-geometry first-load、scene fallback、離散主題對比、theme-aware nav、sound-pad ARIA、busy/live-region 與 pending-start 取消問題已修正。

## 建議里程碑

1. **研究證據：** 先完成 Web Audio 形成性測試並修訂 mapping rationale／限制。
2. **聲音作品：** 選擇 Pure Data 或 REAPER 其中一項，產出一個可公開、可解釋的最小 artifact。
3. **支持案例：** 為 AI 介面補 prototype，完成資料影片字幕與 Power BI 授權決策。
4. **可及性：** 在已完成的鍵盤／viewport／contrast 基礎上，補 screen reader、真實 zoom、行動 touch、system reduced-motion 與多瀏覽器 Web Audio matrix。
5. **Production：** 確認聯絡／CV、domain、metadata、遠端 Pages workflow、正式 URL Lighthouse／field evidence 與 submission artifact；由使用者決定部署時機。

## 安全延伸點

- 公開文案只改 `portfolio.js`；construction notes 只改 `portfolio.internal.js`。
- 新案例／媒體先讀 content authoring 與 adding-portfolio-work；不要直接新增 remote demo media。
- 新聲音 mapping 優先放純函式並加 tests；AudioContext 必須由 user gesture 啟動、具 stop/cleanup 與安全 gain。
- 不要把 Pure Data／REAPER 學習狀態描述成作品成果。
- 不要把 `notValidated` 填成假 metrics；有證據才升為 `exploratory`／`validated`。
- 不要把 `restricted-media/` 路徑或原始檔搬進 `public/`。
- 改 palette／繁中排版／資訊架構前，遵循對應 docs guardrails。
- 保持 Three scene lazy/progressive，使 DOM 文字仍是 LCP。

## 本次無法確認

利害關係人簽核、當年度官方申請要求、真實使用者測試、Pure Data／REAPER 原始作品、Power BI 授權文件、production hosting/domain、analytics、screen reader、真實 200% zoom、system reduced-motion、實機／field performance 與遠端 workflow／Pages 執行均不在目前可驗證證據中。本機 Lighthouse 與內建瀏覽器 smoke test 已完成，但不能把 localhost simulated scores 或未支援的輔具／實機模擬宣稱為 production 通過。
