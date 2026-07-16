# Current State

- **Repository：** canonical local workspace 為 `C:\Users\911su\Documents\Codex\如願個人網站`；`origin` 為 `https://github.com/Ruyuang0509/ruyuang-portfolio.git`。
- **Base branch：** `main`，本機與 `origin/main` 均指向 `aea1c29`；唯讀檢查期間曾偵測外部 checkout 到 `main`，已立即回到 feature，沒有在 `main` 產生 tracked 修改、commit 或 push。
- **Working branch：** `feat/portfolio-admission-foundation`，追蹤同名遠端分支。
- **Last verified commit：** `43e610f`（`fix: restore long-page scroll affordance`）；開始本次文件更新前，本機與遠端 feature SHA 一致。
- **Git status：** 2026-07-17 closure sprint 開始時已有 12 份未提交 Markdown 修改，已原樣保留並在其上做可分離更新；本輪另有 source、tests、metadata 與 13 個 asset deletions，未 commit、push 或 stash。既有 [Draft PR #1](https://github.com/Ruyuang0509/ruyuang-portfolio/pull/1) 為 open、draft、未 merge，base=`main`、head=`feat/portfolio-admission-foundation`。目前沒有本輪重新確認的 PR checks、workflow runs、reviews 或 production deploy 證據。
- **Current site status：** 已知 hidden asset、built construction wording、scanner 假陰性與 metadata drift 已在本機 closure；submission dev/build 與 4 件公開案例邊界一致。Power BI 實作日期已確認，資料使用說明不支持公開分析結果；正式使用者研究、另行公開許可、輔具／實機、current-fingerprint Lighthouse 與 production hosting 仍未完成。

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
- 修正 Hero LCP：整頁與主標不再 opacity／transform 隱藏，介紹與標題首幀可讀；Three 從約 0.29 秒延後至 mobile 約 1.67 秒後請求。延遲完成後仍重新檢查目前幾何位置與頁面可見性，只有 Hero 在 240 px preload window 內才首次下載；首次載入後保持 mounted、離屏只暫停 frame loop。場景 lazy／WebGL 錯誤由 Hero 內局部 boundary 接住，不移除標題、介紹或 CTA。
- 主題改為深色／暖紙兩個已驗證端點的離散切換，不再插值低對比中間色；navbar 與行動選單 fallback 都使用 theme token。
- 已封存的對照 run（主要文字已靜態、Three 尚未延後）為 mobile Performance 87／LCP 3.463 s；最新同一 artifact、source content fingerprint 與 profile fingerprint 的三次 run 為 Performance 96–97、LCP 2.258–2.407 s、TBT 23–34 ms，LCP node 均是 `#hero-title`。
- 修正 Lighthouse 找到的兩項可及性問題：暖紙研究卡的 contextual text color，以及 sound pad 無角色卻使用 `aria-label`；pad 現為具說明的 `role="img"`，四個 range 仍是鍵盤操作入口。
- 將聲音 `role="status"`／live region 移出 `aria-busy` 控制群組，啟用中的 pending 期間仍可立即向輔具宣告；停止按鈕、Escape、離屏與 cleanup 都能取消 pending start，不會在使用者離開後才延遲啟動。
- 恢復長頁的平台 scrollbar，使用已驗證的深色／暖紙 theme token 呈現；移除 Firefox、WebKit 與舊 Edge 的全域隱藏規則。
- 將 `body` 最小寬度改為不超過實際可用寬度，避免 320 px viewport 加上 15 px 平台 scrollbar 後產生水平溢位。
- 即時核對有效 Git history、`origin` 與既有 Draft PR #1；更新 handoff、audit 與 content matrix 中已失效的「空 `.git`」敘述，沒有建立重複 PR、merge 或 deploy。
- 完成 submission boundary closure：hidden case 移至 draft-only data alias 與空 media state，移除 13 個孤立 `ph-after-*`／`mv-soft-*` placeholders 及 generator refs；submission-only middleware 讓舊 media／`dist` URL 明確回 404且有效媒體維持 200，filesystem deny 讓 restricted／internal／hidden／historical paths 回 403。
- Scanner 拆成 injectable core 與 thin CLI，加入 46 個 text rules、6 個 inventory rules、fail-closed／redacted diagnostics 及 32 個 Node fixtures；bad output exit 1、clean output exit 0。
- 對齊 `llms.txt`、favicon、social preview、index／JSON-LD、案例 SEO 與可及性 label 的 RU / YUAN／Sound, Interaction & Learning 品牌；不新增未知 URL、聯絡或社群資料。

# Verification

## Commands and results

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
- `pnpm run content:check`：通過 5 個資料項目；保留 `generative-interface-study` 缺建議媒體證據，以及 draft-only `immersive-memory-map` 刻意空 media／diagrams 的非阻斷警告。
- `pnpm run test:sound`：18/18 通過；5 個 mapping tests、13 個 Web Audio controller lifecycle tests。
- `pnpm run build:draft`：通過。
- `pnpm run check:submission`：通過；32 個 scanner regression fixtures、46 個 text rules、6 個 inventory rules 與 Pages root-relative asset audit 通過。
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
- 本輪 scrollbar 回歸：1440×900 的平台 scrollbar 實際佔 15 px，`scrollbar-width` computed value 為 `auto`，深色端為 `rgb(203, 232, 107) / rgb(17, 16, 13)`，暖紙端為 `rgb(64, 80, 22) / rgb(216, 207, 189)`；1440×900、375×812 與修正後 320×568 均為 0 global horizontal overflow，broken image 0，滑輪捲動有效，桌面 Logo 的 Enter 導覽回到 `#top` 並把焦點交給 `#hero-title`，console error／warning 0。
- 未能可靠模擬真實 200% zoom、系統 reduced-motion、screen reader 與實機觸控，不能視為已通過。

## Screenshots

- `reports/browser/2026-07-16-before-mobile-375x812.png`
- `reports/browser/2026-07-16-after-mobile-375x812.png`
- `reports/browser/2026-07-16-after-desktop-ai-workflow-1440x900.png`
- `reports/browser/2026-07-16-after-sound-fallback-1024x768.png`

# Content Still Needed From Applicant

- **作品文字：** 正式研究計畫、最終申請敘事簽核、各案例真正的測試觀察與限制。
- **圖片：** 生成式 AI 介面真實 prototype／版本比較；Power BI 真實結果影像預設不公開，只有另取得資料提供方明確許可後才重新評估。
- **音訊：** 可公開的 Pd 或 REAPER 輸出；旗艦原型若要加入錄製，也需申請者提供或確認。
- **影片：** 現有 YouTube captions／transcript 的人工核對；如有旗艦操作錄影與字幕可補。
- **Pd patch：** 真實 patch、signal flow、操作說明與反思；目前沒有。
- **REAPER evidence：** 真實 project/session 截圖、軌道／效果鏈與可公開輸出；目前沒有。
- **研究計畫：** 題目、問題、方法、對南藝大聲響科技研究所的官方資料核對與申請者最終決定。
- **履歷／聯絡：** 公開 Email、GitHub／社群、履歷 PDF 及公開範圍；目前 Reviewer Path 只提供站內 CTA。
- **授權／credit：** Power BI 資料來源已補 credit，真實結果另行公開許可仍未取得；外部影片、團隊作品角色、媒體著作權與引用方式仍待核對。

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

- Power BI 原始資料、清洗檔、儀表板實作檔、實際截圖與含真實結果的操作紀錄維持隔離；只有另取得資料提供方明確許可後才重新評估。

## P1

- 完成 Web Audio 形成性使用者測試與 AI 介面真實 prototype／任務／版本比較。
- 補一個可公開的 Pure Data 或 REAPER 最小 artifact。
- 以 NVDA／VoiceOver、真實 200% zoom、system reduced-motion、iOS／Android 與多瀏覽器 Web Audio 做人工矩陣。
- 人工核對 YouTube captions／transcript；決定履歷、聯絡資料與正式研究計畫。
- Draft PR #1 完成內容與人工驗收後，再由使用者決定何時執行 manual Pages workflow 並檢查真正 project-site URL；本輪不得部署。

## P2

- Lighthouse archive 已支持目前保留約 851 kB（約 224 kB transfer）的延後 Three chunk；仍需低階 Android／iOS、Save-Data、耗電／GPU 與正式 Pages URL 的真機／field evidence 才決定是否進一步簡化。
- 若未來加入正式 browser test runner，補 React controls、Escape、IntersectionObserver 與 live-region 自動測試；AudioContext controller lifecycle 已有 13 個 Node tests。
- 評估加入不含部署權限的 PR-only Windows CI，使 `pnpm run doctor` 不只依賴本機執行；目前 PR 沒有 connector 可見的 checks 或 workflow runs。
- 正式 hosting 決定後補 canonical URL、1200×630 raster social preview、domain／privacy 決策。

## Risks and blockers

- Git repository、remote branch 與 Draft PR 已確認，但目前沒有 connector 可見的 remote checks、workflow runs 或 production Pages 證據。
- Scanner 已攔截目前已知 text／inventory regressions，但仍以獨立 `dist/` 搜尋避免循環自證；新 leak 類型需要新增 rule 與 fixture。
- 歷史 Lighthouse 分數有完整 archive，但 source manifest 與目前 build inputs 已 drift，需修正 submission 邊界後重跑。
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
