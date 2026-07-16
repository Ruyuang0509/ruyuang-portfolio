# Failure Cases

本文件只記錄可公開的症狀、診斷、修正決策與證據，不包含隱藏推理過程。

## 1. GitHub Pages project path 失效

- 症狀：submission build 的 HTML 與 JavaScript 仍包含 `/assets/`、`/media/`、favicon 與 social preview 的網域根路徑。
- 影響：部署到 `https://user.github.io/repository/` 時，瀏覽器會從錯誤位置載入程式與媒體。
- 診斷：Vite 沒有設定可攜式 base；作品資料也直接建立根路徑字串。
- 修正：使用相對 base，將 public media 路徑集中經由 `publicAssetUrl()` 產生，並加入 `audit:pages`。
- 驗證：`pnpm run check:submission` 必須同時通過 submission scan 與 Pages path audit。

## 2. Web Audio 不支援狀態顯示錯誤

- 症狀：不提供 `AudioContext` 的瀏覽器顯示「聲音已停止」，沒有顯示真正的不支援原因。
- 影響：使用者可能誤以為按鈕可以啟動，只是目前靜音。
- 診斷：支援能力在 effect 才寫入 state，React StrictMode 的清理流程可能以 `stopped` 覆寫初始結果。
- 修正：由支援能力直接建立初始 status 與訊息，且 cleanup 不覆寫 `unsupported`。
- 驗證：在無 `AudioContext` 的瀏覽器重載，狀態、說明與控制項必須一致呈現 unavailable state。

## 3. 鍵盤少了一個核心聲音映射

- 症狀：指標操作能改變 filter brightness，鍵盤只有水平、垂直與大小三個控制項。
- 影響：鍵盤使用者無法體驗公開敘事中的第四個 mapping。
- 診斷：速度只由 pointer move 計算，range handler 固定把 speed 設為零。
- 修正：新增可聚焦的音色明亮度控制，並讓參數摘要可被輔助科技理解。
- 驗證：只使用 Tab 與方向鍵即可改變 Pan、Pitch、Filter 與受控音量。

## 4. 窄視窗的滑鼠游標消失

- 症狀：窄於 768px、但具 fine pointer 的裝置會隱藏原生游標；自訂游標層同時因響應式 class 不顯示。
- 影響：縮窄桌面視窗或外接滑鼠平板沒有可見指標。
- 診斷：啟用條件只檢查 pointer precision，沒有和自訂游標的顯示 breakpoint 對齊。
- 修正：只有 fine pointer 且至少 768px 時才啟用自訂游標。
- 驗證：700px fine-pointer 環境保留原生游標，768px 以上才啟用自訂層。
