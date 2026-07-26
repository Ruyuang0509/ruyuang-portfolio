# 116 學年度申請作品集重構計畫

更新日期：2026-07-25

本文件記錄本輪實作前後的資訊架構、證據狀態與發布邊界。它不是招生簡章，也不驗證正式系所名稱、時程或繳件格式。

## 證據標籤

- **Confirmed**：可由本輪使用者事實、Repository source、真實檔案、命令或實際操作核對。
- **Inferred**：依申請目標與現有內容作出的編排判斷；不是新增作品事實。
- **Needs User Evidence**：主張可保留為待核對紀錄，但升級為作品證據前需要申請者提供真實檔案、來源或決策。
- **Must Not Publish**：目前不得放入 public、submission build 或 public Git history 的內容。

## 1. Pre-refactor baseline

重構前的實體順序：

1. Hero／申請定位
2. 研究定位
3. Web Audio 旗艦案例
4. Learning Trail
5. 資料視覺化系列
6. 其他公開案例
7. 申請階段研究構想
8. 五個研究軌道／術語轉譯／系所主題對照
9. AI／作者性
10. 頁尾閱讀出口

| 判讀 | 標籤 |
| --- | --- |
| Web Audio 已是第一件可操作聲音證據，聲音 lifecycle、鍵盤與停止行為均有 source／tests | Confirmed |
| Pure Data、REAPER 同置於 Learning Trail，無法承載影片、作者性與版本限制 | Confirmed |
| 研究定位、研究構想、研究軌道與頁尾出口重複說明同一論點 | Confirmed |
| 《畫本》與指定 MV 沒有出現在現有公開案例 | Confirmed |

## 2. Adopted current information architecture

PR #6 已採用並部署的 11 段送審順序：

1. `#top`：Hero／申請定位
2. `#sound-transition`：轉向聲音的問題意識
3. `#reviewer-path`：依證據強度安排的閱讀入口
4. `#interactive-sound-learning`：Web Audio 旗艦證據
5. `#pure-data-learning`：Pure Data 學習原型與影片
6. `#research-positioning`：四層申請階段研究構想；保留 `#research-proposal` 相容錨點
7. `#selected-work`：代表作品；先《畫本》，再其他可核對案例，最後指定 MV 二次創作
8. `#collaboration`：社團、團隊角色調整與工作適應
9. `#learning-roadmap`：已有證據／正在學習／尚未形成作品／研究所階段
10. `#ai-workflow`：AI 協助、申請者責任與失敗修正
11. `#contact`：研究方向與真實 Portfolio／GitHub 連結

| 判讀 | 標籤 |
| --- | --- |
| 11 個 ID 已對應實際 DOM；Navbar 與證據導覽負責不同層級 | Confirmed |
| 這個順序能在前段先回答「現在做得出什麼」，再回答「未來想研究什麼」 | Inferred |
| `#research-proposal` 只作舊連結相容，不再形成另一套主敘事 | Confirmed |

## 3. Duplicate or competing narratives

| 重複內容 | 收斂方式 | 標籤 |
| --- | --- | --- |
| Hero、研究定位與 Learning Trail 都重述 Web Audio／Pure Data／REAPER 狀態 | Hero 保留一句總結；Pure Data 專段給細節；Roadmap 只表時序 | Inferred |
| 研究定位、研究構想、五軌道與系所主題對照競爭同一研究論點 | 公開閱讀只保留四層研究構想；五軌道元件不再掛入首頁 | Confirmed |
| Navbar 與頁尾閱讀出口列出相同路徑 | Navbar 改為高階區段；早期證據導覽改以「最強證據／學習紀錄／研究構想」說明閱讀目的 | Confirmed |
| 資料視覺化系列與 project index 重複介紹支援作品 | 置於 `#selected-work` 內、《畫本》之後作延伸案例，不再搶在聲音主線前 | Inferred |

## 4. Current evidence gaps

| 缺口 | 目前處理 | 標籤 |
| --- | --- | --- |
| Pure Data v0.2.1 影片含本機路徑、`validated`、裁切標籤與未分段畫面 | 以原始功能紀錄公開，網站逐項揭露限制；另要求重錄作品集版 | Confirmed |
| v0.2.1 Patch／ZIP 沒有 AI 協作揭露與 LICENSE，validation 文案過強 | 原檔留在 private workbench，不搬入 public Git | Must Not Publish |
| v0.2.2 外層版本與內部 README／manifest／status 不一致 | 不在網站主張或發布 | Must Not Publish |
| 《畫本》缺成片、日期、完整 credit、活動紀錄與公開權利核對 | 網站只呈現申請者提供的角色、工具與參賽情境，不嵌入媒體 | Needs User Evidence |
| 《希望有羽毛和翅膀》MV 缺成片、課程紀錄、素材清單與公開權利 | 只保留文字角色與第三方權利聲明 | Needs User Evidence |
| REAPER 沒有 `.rpp`、路由、輸出或反思 | Roadmap 標示尚未形成作品 | Needs User Evidence |
| Web Audio 尚無形成性測試紀錄 | 保持可操作原型／尚待驗證 | Needs User Evidence |
| 正式研究計畫 DOCX 含未核對文獻、樣本、預算、倫理與舊 metadata | 只用網站四層摘要，不放下載連結 | Must Not Publish |
| 116 學年度正式系所名稱與繳件規格未由 current official source 核對 | 公開頁使用中性「研究所申請作品集」定位 | Needs User Evidence |

## 5. Sections to retain

| 區段／系統 | 理由 | 標籤 |
| --- | --- | --- |
| DOM-first Hero、R3F 漸進增強與既有入場 motion | 已是視覺作者性與 LCP 邊界的一部分 | Confirmed |
| Web Audio 原型、九段 signal flow、鍵盤、Escape、cleanup 與 fallback | 目前最強可操作聲音證據 | Confirmed |
| 現有支援案例與 CaseStudyShowcase | 可核對跨域能力，且已有資料與媒體治理 | Confirmed |
| AI／作者性與三個失敗修正案例 | 能說明 AI 協助不等於作者能力 | Confirmed |
| submission alias、scanner、Pages path audit 與 publication gate | 是送審與公開邊界的必要防線 | Confirmed |
| GSAP／Lenis、固定視口色場、Custom Cursor、reduced-motion | 本輪沒有證據支持移除 | Confirmed |

## 6. Sections to merge

| 原區段 | 併入 | 標籤 |
| --- | --- | --- |
| 研究定位的背景轉向 | `#sound-transition` | Inferred |
| Learning Trail 的 Pure Data 細節 | `#pure-data-learning` | Confirmed |
| Learning Trail 的 Web Audio／REAPER 狀態 | Hero 總結與 `#learning-roadmap` | Inferred |
| 研究定位／研究構想／未來問題 | `#research-positioning` 四層研究構想 | Confirmed |
| 頁尾閱讀出口 | 早期 `#reviewer-path` 與最終 `#contact` | Confirmed |

## 7. Sections to move

| 內容 | 新位置 | 原因 | 標籤 |
| --- | --- | --- | --- |
| Web Audio | 證據導覽後第一件長案例 | 先回答「做得出什麼」 | Inferred |
| Pure Data | Web Audio 後、研究構想前 | 顯示從 browser prototype 進入 patch 學習的連續性 | Inferred |
| 研究構想 | Pure Data 後 | 避免把未來系統誤讀成現有成果 | Inferred |
| 《畫本》與指定 MV | `#selected-work` 內以《畫本》開場、supporting cases 居中、指定 MV 收尾 | 原創短劇優先、二次創作後置 | Confirmed |
| 合作與領導 | 支援作品後 | 支持專案持續性，但不搶走聲音主線 | Inferred |
| AI／作者性 | Roadmap 後 | 保持可見但非視覺中心 | Inferred |

## 8. Sections to remove from submission mode

| 內容 | 處理 | 標籤 |
| --- | --- | --- |
| 五研究軌道、術語轉譯與系所主題對照整組首頁區段 | 元件與資料保留供維護，App 不再渲染 | Confirmed |
| 舊 `#learning-trail` 實體區段 | 改由 Pure Data 專段與 Roadmap 取代 | Confirmed |
| 舊頁尾 `#reviewer-path` | 移除，避免 duplicate ID；早期證據導覽接手 | Confirmed |
| 研究計畫原始 DOCX、Pure Data ZIP／`.pd`、REAPER 工程、原始測試資料 | 不放入 public／dist／public Git | Must Not Publish |
| 《畫本》與指定 MV 未確認權利的影像、音樂與成片 | 不嵌入 | Must Not Publish |

## 9. Known risks

1. **Pure Data 原始錄影公開風險 — Confirmed**  
   影片畫面會露出本機專案路徑、`validated` 與裁切標籤。網站已明示，仍應優先重錄。

2. **Public Repository 邊界 — Confirmed**  
   UI 未渲染不代表 tracked source 私密；`public/` 會被 Vite 全量複製到 `dist/`。

3. **Hamlet 權利閘門 — Confirmed**  
   `check:publication` 必須在申請者完成 rights evidence 與 attestation 前保持失敗；Pages workflow 目前沒有執行該 gate。

4. **使用者提供事實與 artifact 的差異 — Confirmed**  
   《畫本》、指定 MV、社團人數與工作經驗可依本輪事實敘述，但不能寫成已由第三方文件驗證的結果。

5. **研究方法過度具體 — Confirmed**  
   樣本、設備、渲染、量測、預算與倫理仍需課程、指導、場地與先導實驗修訂。

6. **Current-source browser／輔具覆蓋 — Needs User Evidence**  
   自動化與瀏覽器 smoke 不取代 NVDA／VoiceOver、真實 200% zoom、system reduced-motion、iOS／Android 與多瀏覽器聽感驗收。

## 10. Implementation order

1. **Confirmed**：盤點 branch、dirty worktree、既有 source／docs／scripts／tests，並執行 baseline doctor。
2. **Confirmed**：搜尋並檢查 `v0.2.1.mp4`、Pure Data Patch／ZIP、研究 DOCX、REAPER、畫本與指定 MV。
3. **Confirmed**：先修 Hero、聲音轉向與早期證據導覽。
4. **Confirmed**：保留 Web Audio，新增 Pure Data 影片與十項證據邊界。
5. **Confirmed**：把研究構想改為四層，保留完整可調整聲明。
6. **Confirmed**：加入《畫本》、其他可核對案例、二次創作權利聲明與合作證據。
7. **Confirmed**：新增四階段 Roadmap、AI 作者性與 final links。
8. **Confirmed**：同步 Navbar、anchors、SEO、`llms.txt`、social preview、validator 與 scanner fixtures。
9. **Inferred**：同步現有 handoff 文件，避免保留「沒有 Pure Data 影片／沒有畫本紀錄」等過期敘述。
10. **Needs User Evidence**：完成申請者擁有的權利、官方命名、成片、REAPER、使用者測試與正式研究計畫簽核後，再評估下一次公開升級。
