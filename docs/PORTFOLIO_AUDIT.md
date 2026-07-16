# 作品集稽核紀錄

更新日期：2026-07-16。這份文件記錄可由原始碼、建置輸出與本機 rendered behavior 證明的結果；內容或學術決策不足時，不以推測代替申請者證據。

## 判讀方式

- 嚴重度使用 `Critical`、`High`、`Medium`、`Low`。
- 「是否確認」區分為程式碼／rendered behavior 已確認、依賴使用者素材、依賴學術／內容決策，或僅能部分確認。
- 「已完成」只表示本輪工程修正與本機驗證完成，不代表正式使用者研究、輔具測試、GitHub 遠端執行或學校審查已完成。

## 稽核矩陣

| ID | 類別 | 頁面／元件 | 證據 | 對評審或使用者的影響 | 嚴重度 | 是否確認 | 修正方式 | 本輪狀態 | 驗證 |
|---|---|---|---|---|---|---|---|---|---|
| PA-001 | ADMISSION_NARRATIVE | Hero、Research Positioning、案例順序 | `portfolio.js` 與 `App.jsx` 將聲響研究命題、旗艦 Web Audio、學習歷程置於支持案例之前 | 評審可先理解申請方向，再判讀證據強弱 | High | 程式碼與 rendered behavior 已確認 | 保留「聲音 × 互動 × 數位學習」主線，AI 方法置於旗艦證據之後 | 已完成 | submission 頁面與 6 組 viewport smoke test |
| PA-002 | CONTENT | 旗艦 Web Audio 案例 | 公開狀態仍為 `notValidated`，只有 planned methods | 不應把可操作原型誤讀為已證明學習成效 | High | 依賴使用者素材 | 執行形成性任務並補匿名觀察、錯誤、口述理解與限制 | 待申請者補證據 | `content:check` 保留未驗證狀態 |
| PA-003 | CONTENT | Learning Trail | Pure Data／REAPER 明列「學習中」，沒有 patch、session 或聲音輸出 | 敘事誠實，但聲響製作證據仍偏薄 | High | 依賴使用者素材 | 先選一個最小可公開 artifact，附 signal flow、輸出與反思 | 未完成 | rendered copy 與 submission scan 已確認未誇大 |
| PA-004 | FUNCTION | Navbar 桌面／行動 anchor | 原本只有行動連結把焦點移入內容；桌面鍵盤 Enter 會留在 fixed nav | 鍵盤使用者可能重複巡覽導覽列，無法直接從剛選擇的內容續讀 | High | rendered behavior 已確認 | 桌面鍵盤 Enter 與行動選單聚焦目標 heading；桌面滑鼠保留 link focus；Escape 還焦 trigger | 已完成 | 1440×900：六個桌面連結及 Logo 的 hash／active heading 全數正確；375×812 行動 focus／Escape 回歸通過 |
| PA-005 | VISUAL | 暖紙主題文字與 accent | 舊 accent 在淺色表面對比不足；研究卡內的 meta／muted copy 也曾錯誤繼承深色區亮色 | 連結、標籤與說明文字在暖紙表面可能難以辨識 | High | 程式碼、Lighthouse 與 rendered behavior 已確認 | 調深 light-theme accent；paper panel 的 contextual copy 明確使用 inverse ink text | 已完成 | `#405016` 對 `#d8cfbd` 5.71:1；Lighthouse color-contrast 通過；browser computed style／screenshot |
| PA-006 | RESPONSIVE | Research Positioning、Learning Trail display headings | 320px 時兩個片語單位曾超出 viewport；頁面整體沒有水平捲動 | 最窄手機可能出現局部文字被切邊 | High | rendered behavior 已確認 | 重新拆分繁中 phrase units，不縮小整體字級 | 已完成 | 320×568 retest：0 個越界 heading、0 global overflow |
| PA-007 | COPY_UX | 聲音狀態與 Reviewer Path | 聲音狀態可讀；Reviewer Path 明示目前沒有公開聯絡資料；live status 曾位於 busy ancestor 內 | 不用假 CTA、含糊錯誤或被延後的啟用中回饋誤導使用者 | Medium | 程式碼與 rendered behavior 已確認 | 新增「聲音啟用中」與可理解失敗文案；`role="status"` 移出 busy 控制群組；維持真實站內 CTA | 已完成 | 啟用後 status 立即顯示「聲音啟用中」且不在 `[aria-busy]` 內；逾時後其他內容仍可用 |
| PA-008 | ACCESSIBILITY | SoundInteractionPrototype | 原型原有三個鍵盤 range；速度／濾波亮度只能靠 pointer movement 表達；pointer pad 的 `aria-label` 曾放在無有效 role 的 `div` | 只用鍵盤者無法操作全部四個 mapping，輔具也可能忽略 pad 說明 | High | 程式碼、Lighthouse 與 rendered behavior 已確認 | 新增「濾波亮度」range、readout、描述關聯與節流 live announcement；pad 以具完整說明的 `role="img"` 呈現，鍵盤操作仍由 ranges 提供 | 已完成 | 4 個 range；pad accessible name 正確；Lighthouse `aria-prohibited-attr` 通過 |
| PA-009 | ACCESSIBILITY | 全站 | 真實 screen reader、200% browser zoom、reduced-motion 模擬與實機觸控尚未完成 | source-level 規則不能替代輔具與實機驗收 | High | 部分確認 | 由申請者或測試者以 NVDA／VoiceOver、真實 zoom、真機補矩陣 | 未完成 | 本輪只完成鍵盤、focus、contrast、viewport 與 source-level reduced-motion 檢查 |
| PA-010 | AUDIO_MEDIA | Web Audio controller 與聲音原型 | AudioContext `resume()` 可能 pending，stop fade 曾在斷線後失效，context interruption 也可能留下假 `running` | 控制項可能卡住、停止產生突兀切斷，或使用者離開後才延遲啟動 | High | 程式碼、Node tests 與 rendered behavior 已確認 | 抽出可測 controller；加入 cancellable resume、graceful release、hidden immediate cleanup、statechange、建圖失敗與 destroy cleanup；React 停止／Escape／離屏也取消 pending start | 已完成 | 13 個 lifecycle tests；rendered starting 期間停止按鈕可用並回到「聲音已停止」；0 runtime console error |
| PA-011 | AUDIO_MEDIA | 影像、影片、Power BI | 公開媒體為本機 AVIF/WebP/MP4 與概念 SVG；Power BI 原圖隔離；YouTube 字幕品質未人工確認 | 避免敏感素材外洩，但影片快速審查與聽覺可及性仍有缺口 | High | 部分依賴使用者素材／授權 | 維持隔離；人工核對字幕與 transcript；確認資料授權後才決定原圖 | 進行中 | `audit:media` 與 submission scan 通過；字幕／授權未宣稱完成 |
| PA-012 | PERFORMANCE | Hero R3F chunk 與 Hero copy | Three 約 851 kB minified／224 kB transfer；全頁／主標隱藏式進場曾使 LCP 落在 nav，Three 約 0.29 s 請求也會與首屏競爭 | 分數可能未代表主要內容；弱網裝置會提早下載較大漸進增強 | Medium | immutable submission artifact、15 個成功 archive runs、最新逐檔 artifact／source manifests、completion markers 與 rendered behavior 已確認 | 主標／介紹首幀可見；Three 延遲後重新檢查目前幾何與頁面可見性，且 Hero 仍在 240 px preload window 內才首次下載；局部 scene boundary 保留核心文案；維持裝置／Save-Data gating | 本機量測完成；真機待辦 | 延後前 archive：mobile 87／LCP 3.463 s；最新同 artifact／source content／profile 3 次：mobile 96–97、LCP 2.258–2.407 s、TBT 23–34 ms；desktop 100、LCP 0.504–0.505 s、TBT 0；LCP 皆為 `#hero-title`、CLS 0、Accessibility 100 |
| PA-013 | RELIABILITY | React root | 原本只有 section boundaries，Navbar 等根層錯誤可能讓整站空白 | 單一未捕捉錯誤可能中斷審查 | High | 程式碼已確認 | 在 `main.jsx` 外層加入可重新載入的 `RootErrorBoundary` | 已完成 | submission build 成功；fallback source 已檢查 |
| PA-014 | GITHUB_PAGES | Vite、public assets、`dist/` | 原本 `base: /` 與 `/media/...` 會破壞 project-site 子路徑 | 部署到 `user.github.io/repository/` 時資產 404 | Critical | 建置輸出已確認 | 預設相對 base、以 `BASE_URL` 組 public assets、加入 `audit:pages` | 已完成（本機） | `check:submission` 的 Pages audit 通過 |
| PA-015 | GITHUB_PAGES | Actions workflow | 原本沒有部署流程；Windows-only `.ps1` scripts 不適用 Ubuntu build job | Pages 建置無法重現或直接失敗 | High | 設定檔、本機 build 與 Draft PR 內容已確認；遠端執行未確認 | 新增 manual-only、`windows-latest` build、Node 22／pnpm 11.7、Pages artifact deploy | 已完成（未部署） | YAML 與本機命令已檢查；workflow 已在 Draft PR #1 head，但 connector 可見 workflow runs 為 0，本輪未執行或部署 |
| PA-016 | RELIABILITY | Repository metadata | 先前工作區曾只有空 `.git`，無法證明 branch/history/remote；目前已連接 GitHub 既有歷史 | 錯認 repository 狀態會造成重複初始化、錯誤 push 或重複 PR | Critical | 本機 Git 與 GitHub connector 已確認 | 保留 `main` 只讀，所有續作留在 `feat/portfolio-admission-foundation`，更新既有 Draft PR #1 | 已完成 | top-level 路徑正確；`main`/`origin/main`=`aea1c29`；本輪開始前 feature/local/remote=`3fb913f`；PR #1 open、draft、未 merge |
| PA-017 | AI_DISCLOSURE | `#ai-workflow` 與 `docs/ai-workflow/` | 原本沒有公開、可追溯的人機責任與 prompt 演進入口 | 評審無法分辨 AI 協助、作者決策與不可代填邊界 | Medium | 程式碼、文件與 rendered behavior 已確認 | 新增低比重方法區段、Prompt v1/v2、兩個真實失敗案例、完整 prompt 文件 | 已完成 | 1440×900 rendered section；submission build 含公開揭露 |
| PA-018 | TESTING | scripts、sound controller 與 browser matrix | 原本只有 5 個 mapping tests，AudioContext race／cleanup 及桌面 nav focus 無可重跑證據 | 回歸可能直到瀏覽器操作或送審才被看見 | High | 本機已確認 | `test:sound` 擴充至 18 tests；browser 補桌面全部 anchor、Logo、滑鼠、行動 menu 與聲音 fallback | 已完成（本機） | 18/18 tests；桌面／行動 focus assertions；1024×768 fallback；`doctor` 通過 |
| PA-019 | ACCESSIBILITY | 全站長頁 scrollbar 與 320 px reflow | 全域 CSS 曾隱藏 Firefox、WebKit 與舊 Edge scrollbar；恢復 15 px 平台 scrollbar 後，硬編碼 `body min-width: 320px` 會在 320 px viewport 產生 15 px 水平溢位 | 評審缺少長頁位置與可捲動 affordance；最窄 viewport 可能橫向捲動 | Medium | 程式碼與 rendered behavior 已確認 | 恢復平台 scrollbar，使用 theme token 配色；`body` 最小寬度不得超過可用寬度 | 已完成 | 1440×900 scrollbar computed `auto` 且深／暖紙兩端配色正確；1440×900、375×812、320×568 均 0 global horizontal overflow，滑輪捲動有效，console error／warning 0 |

## 仍需人工完成的驗收

- NVDA 或 VoiceOver 的 heading、landmark、live region 與 menu 閱讀順序。
- 瀏覽器真實 200% zoom、reduced-motion 系統偏好、iOS／Android 觸控與不同 Web Audio 實作。
- YouTube captions／transcript 的內容品質、Power BI 授權與資料去識別化。
- 真實 GitHub repository 上的 workflow 執行、Pages URL 與 project-site 路徑。
- 旗艦聲響原型及 AI 介面的真實形成性使用者測試。
