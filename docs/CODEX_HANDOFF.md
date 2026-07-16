# Current State

- **Repository：** canonical local workspace 為 `C:\Users\911su\Documents\Codex\如願個人網站`。
- **Base branch：** 無法辨識；`.git` 是空目錄，不是有效 Git repository。
- **Working branch：** 無法建立或辨識；提示詞建議的 `feat/portfolio-admission-foundation` 尚不存在。
- **Last verified commit：** 無法取得；沒有可讀的 Git history。
- **Git status：** `git status`、`git rev-parse --show-toplevel` 與 `git log` 均回報 `fatal: not a git repository (or any of the parent directories): .git`；`.git` 內容為空。本環境也沒有可執行的 `gh` CLI。
- **Current site status：** Vite submission build、本機 Pages 路徑稽核、rendered smoke test 與 submission mobile／desktop Lighthouse lab audit 通過；沒有 production deploy、Pages URL、custom domain、field data 或已驗證 remote workflow run。

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
- 修正 Hero LCP：整頁與主標不再 opacity／transform 隱藏，介紹與標題首幀可讀；Three 從約 0.29 秒延後至 mobile 約 1.67 秒後請求。延遲完成後仍重新檢查目前幾何位置與頁面可見性，只有 Hero 在 240 px preload window 內才首次下載；首次載入後保持 mounted、離屏只暫停 frame loop。場景 lazy／WebGL 錯誤由 Hero 內局部 boundary 接住，不移除標題、介紹或 CTA。
- 主題改為深色／暖紙兩個已驗證端點的離散切換，不再插值低對比中間色；navbar 與行動選單 fallback 都使用 theme token。
- 已封存的對照 run（主要文字已靜態、Three 尚未延後）為 mobile Performance 87／LCP 3.463 s；最新同一 artifact、source content fingerprint 與 profile fingerprint 的三次 run 為 Performance 96–97、LCP 2.258–2.407 s、TBT 23–34 ms，LCP node 均是 `#hero-title`。
- 修正 Lighthouse 找到的兩項可及性問題：暖紙研究卡的 contextual text color，以及 sound pad 無角色卻使用 `aria-label`；pad 現為具說明的 `role="img"`，四個 range 仍是鍵盤操作入口。
- 將聲音 `role="status"`／live region 移出 `aria-busy` 控制群組，啟用中的 pending 期間仍可立即向輔具宣告；停止按鈕、Escape、離屏與 cleanup 都能取消 pending start，不會在使用者離開後才延遲啟動。

# Verification

## Commands and results

- `pnpm install --frozen-lockfile`：exit 0、lockfile 已是最新；pnpm 自動查詢自身更新時因受限網路出現 registry metadata fetch warning，不影響既有依賴安裝。
- `pnpm run doctor`：exit 0；依序完成下列全部本機門檻。
- `pnpm run workspace:check`：通過，確認 canonical workspace。
- `pnpm run audit:media`：通過，無遠端 demo media 或過時 preconnect。
- `pnpm run audit:text`：通過，未偵測疑似 mojibake。
- `pnpm run audit:cjk`：通過；320px 修正後 rendered heading 無越界。
- `pnpm run content:check`：通過 5 個資料項目；保留 `generative-interface-study` 缺建議媒體證據的非阻斷警告。
- `pnpm run test:sound`：18/18 通過；5 個 mapping tests、13 個 Web Audio controller lifecycle tests。
- `pnpm run build:draft`：通過。
- `pnpm run check:submission`：通過；31 個禁用詞未出現在 `dist/`，Pages root-relative asset audit 通過。
- `pnpm run build:submission`：變更後通過；Three lazy chunk 約 851 kB 的非阻斷 warning 仍存在。
- `pnpm run audit:lighthouse`：history 現有 15 個成功 archive；最新三次共用 artifact `f869c00c…`、source content `f3fd2a68…` 與 mobile profile `718e69b4…`。mobile Performance／Accessibility 96–97／100、LCP 2.258–2.407 s、TBT 23–34 ms、CLS 0；desktop 100／100、LCP 0.504–0.505 s、TBT 0、CLS 0。三次 benchmark 都逐筆保存，所以 environment／comparability fingerprint 會反映每次實測差異。這是 localhost simulated lab evidence，不是 production field data。
- 另做真實雙程序互動測試：持鎖 audit exit 0、競爭 audit 快速 exit 1、競爭期間既有 summary SHA-256 不變，完成後無 lock 殘留；此測試結果未另封存成 archive evidence。Lighthouse CLI 在目前 Windows 環境有時會在完成 JSON 後因 Chrome profile cleanup `EPERM` 回傳 1；harness 只有在 fresh report 通過全部驗證，且 stderr 精確符合該 run 專屬 Chrome temp 的已知 `rm`／`Launcher.destroyTmp` 簽章時才降為具名 warning並封存完整輸出。其他非零退出一律失敗。

## Browser viewports

- 320×568、375×812、768×1024、1024×768、1280×800、1440×900。
- 六組皆為 0 global horizontal overflow、0 broken image；fixed nav 與 sound controls 在 viewport 內。
- 375×812：行動 menu 可開啟、Escape 關閉並還焦；anchor 後焦點進入目標 heading。
- 1440×900：桌面六個 nav links 與 Logo 皆以 Enter 更新正確 hash 並聚焦目標 H1／H2；滑鼠點擊仍保留 link focus。
- 1024×768：聲音無 autoplay；啟用後顯示 busy，AudioContext 未恢復時逾時為可讀 error fallback。
- refactor 後 1024×768 再驗證 `尚未啟用 → 聲音啟用中 → 聲音啟用失敗`，`aria-busy` 回到 false、按鈕可重試，console error 為 0。
- 700px fine pointer 不啟用 custom cursor；800px fine pointer 才啟用。
- 412×823 與 1440×900 最終回歸：Hero 標題／介紹首幀 opacity 1、0 global horizontal overflow；暖紙 body、navbar 與行動選單皆為紙色底／墨色字且 transition 0 s；sound pad 為具名稱的 `img` role、4 個 slider 完整；pending start 可立即按停止並回到「聲音已停止」；console error／warning 皆為 0。
- 未能可靠模擬真實 200% zoom、系統 reduced-motion、screen reader 與實機觸控，不能視為已通過。

## Screenshots

- `reports/browser/2026-07-16-before-mobile-375x812.png`
- `reports/browser/2026-07-16-after-mobile-375x812.png`
- `reports/browser/2026-07-16-after-desktop-ai-workflow-1440x900.png`
- `reports/browser/2026-07-16-after-sound-fallback-1024x768.png`

# Content Still Needed From Applicant

- **作品文字：** 正式研究計畫、最終申請敘事簽核、各案例真正的測試觀察與限制。
- **圖片：** 生成式 AI 介面真實 prototype／版本比較；如要公開 Power BI 原圖，需先完成授權與去識別化。
- **音訊：** 可公開的 Pd 或 REAPER 輸出；旗艦原型若要加入錄製，也需申請者提供或確認。
- **影片：** 現有 YouTube captions／transcript 的人工核對；如有旗艦操作錄影與字幕可補。
- **Pd patch：** 真實 patch、signal flow、操作說明與反思；目前沒有。
- **REAPER evidence：** 真實 project/session 截圖、軌道／效果鏈與可公開輸出；目前沒有。
- **研究計畫：** 題目、問題、方法、對南藝大聲響科技研究所的官方資料核對與申請者最終決定。
- **履歷／聯絡：** 公開 Email、GitHub／社群、履歷 PDF 及公開範圍；目前 Reviewer Path 只提供站內 CTA。
- **授權／credit：** Power BI 資料、外部影片、團隊作品角色、媒體著作權與引用方式。

# Decisions And Constraints

- 保留 Vite + React 19、Motion、R3F、Tailwind v4、GSAP／Lenis 與資料驅動案例架構；本輪沒有框架遷移。
- Web Audio 是目前唯一可操作聲響證據；Pure Data／REAPER 必須維持「學習中」，直到真實 artifact 存在。
- 音訊不得 autoplay，只能由明確手勢啟動，且要能 stop、cleanup、unsupported／timeout fallback。
- R3F 保持 lazy／progressive，DOM `#hero-title` 是 LCP；Three 在 mobile 約 1.67 秒後、且 Hero 仍在 preload window／可見頁面內才請求。三次最終 mobile lab 為 Performance 96–97、LCP 約 2.26–2.41 s，因此不只為消除 851 kB warning 犧牲場景，後續以真機再決定。
- 公開文案只在 `portfolio.js`；施工備註只在 `portfolio.internal.js`；submission 隔離不可退回 CSS hiding。
- `restricted-media/` 不得移入 `public/`；不可重加 remote demo media、付費 GSAP plugin、假測試結果或假聯絡連結。
- AI 使用「生成式 AI」或「大型語言模型（LLM）協作」名稱；不得宣稱自研 LLM。作品事實、選件、視覺方向、取捨與驗收由申請者負責。
- GitHub Pages workflow 只有 `workflow_dispatch`；本輪不得 production deploy、merge 或 force push。
- 新增 dependencies：無。下載外部 assets：無。使用者提供的兩份 prompt 以 Markdown 原文保存，非 runtime dependency。

# Remaining Work

## P0

- 還原真正的 `.git` metadata 或從正確 remote 重新 clone，再確認 default branch、working branch、remote 與 history。不要用 `git init` 冒充既有演進。
- Git 恢復後使用可用的 GitHub connector 或安裝／提供 `gh` CLI，才能 push 與建立 Draft PR。
- Power BI 原始資料與截圖在授權／去識別化完成前維持隔離。

## P1

- 完成 Web Audio 形成性使用者測試與 AI 介面真實 prototype／任務／版本比較。
- 補一個可公開的 Pure Data 或 REAPER 最小 artifact。
- 以 NVDA／VoiceOver、真實 200% zoom、system reduced-motion、iOS／Android 與多瀏覽器 Web Audio 做人工矩陣。
- 人工核對 YouTube captions／transcript；決定履歷、聯絡資料與正式研究計畫。
- Git 恢復後 push 非預設 branch、執行 manual Pages workflow，檢查真正 project-site URL。

## P2

- Lighthouse archive 已支持目前保留約 851 kB（約 224 kB transfer）的延後 Three chunk；仍需低階 Android／iOS、Save-Data、耗電／GPU 與正式 Pages URL 的真機／field evidence 才決定是否進一步簡化。
- 若未來加入正式 browser test runner，補 React controls、Escape、IntersectionObserver 與 live-region 自動測試；AudioContext controller lifecycle 已有 13 個 Node tests。
- 正式 hosting 決定後補 canonical URL、1200×630 raster social preview、domain／privacy 決策。
- 確認後處理根目錄兩個既存零位元檔案 `[k`、`({id`；目前不擅自刪除。

## Risks and blockers

- 核心 blocker 是無效且空的 `.git`，加上本環境沒有 `gh` CLI，因此沒有可信 commit、push、PR 或 remote Pages 證據。
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

Git metadata 還原後先執行：

```powershell
git status
git log --oneline -n 10
git remote -v
```

# Next Codex Starting Instruction

先讀 `AGENTS.md`、`README.md`、`docs/CODEX_HANDOFF.md`、`docs/PORTFOLIO_AUDIT.md`、`docs/CONTENT_MATRIX.md`，再檢查 Git 是否已恢復與 `pnpm run doctor` 現況。若 Git 仍無效，先精確回報 blocker，從 handoff 中不依賴缺失素材的最高優先項續作；若 Git 已恢復，建立／切到非預設 working branch，保留既有 Vite／React 架構、draft/submission 邊界與無 autoplay 規則，完成後執行 browser matrix、更新 handoff，並只在有權限時 push 與更新 Draft PR，不得 merge 或 production deploy。
