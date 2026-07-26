# 公開展示文案稽核

更新日期：2026-07-26

## 稽核目的

本文件記錄本輪「公開展示版整備」如何把作品敘事與內部稽核資訊分層。公開頁保留作品、方法、角色、反思與下一步；權利狀態、不能延伸的主張、證據缺口與補件需求則留在 Draft 稽核層。

本輪紀錄以目前 source 實作與 2026-07-26 最終驗證為準。下方將 scanner、submission build、指定字串獨立掃描、publication gate 與瀏覽器回歸分開記錄；`check:submission`／`doctor` 通過不會取代權利核准。

## 公開資料與稽核資料的分層

| 層級 | 主要檔案 | 資料範圍 | Submission bundle 預期 |
| --- | --- | --- | --- |
| 公開作品資料 | `src/data/admission-evidence.js` | Pure Data 學習紀錄、代表作品、合作經驗、學習路線與公開連結 | 會進入 |
| Draft 稽核資料 | `src/data/admission-evidence.audit.js` | 支持／不支持主張、作者性、AI 協作、權利、限制與補件需求 | 不會進入 |
| Draft 呈現入口 | `src/draft/DraftModeEnabled.jsx` | 依 stable ID 以 dynamic import 讀取稽核紀錄，供本機 Draft 檢查；audit data 不併入 raw entry | Submission mode 透過 alias 排除 |
| Submission 空模組 | Vite submission alias 對應的 empty draft component | 取代 Draft UI，避免只靠 CSS 隱藏 | 會進入空替代模組，不含稽核內容 |

公開與稽核資料使用相同 stable ID 對齊：

- `pure-data-learning`
- `huaben-short-film`
- `hope-feathers-wings-mv`

Stable ID 讓 validator 能檢查公開紀錄與稽核紀錄是否一一對應；它不是存取控制。Repository 目前是 public，因此 `admission-evidence.audit.js` 即使不進 submission bundle，原始碼仍可由 GitHub 讀取。Draft-only、alias 與不渲染都不能視為私密機制。

## 主要文案處理紀錄

| 主要原句／原介面 | 檔案 | 公開展示問題 | 處理方式 | 新公開文案／介面 | 是否保留於 audit | Submission bundle 預期 |
| --- | --- | --- | --- | --- | --- | --- |
| 「目前可以證明／目前不能證明／作者性與 AI 協作／原始影片限制」四組固定面板 | `src/components/AdmissionEvidenceSections.jsx`、`src/data/admission-evidence.js` | 公開頁像稽核報告，作品敘事被證明／反證語氣切碎 | 公開頁改為完成內容、學習、反思與下一步；完整邊界移到 ID 對應稽核紀錄 | 「目前完成」「AI 協作與我的學習」「回顧與下一步」「版本說明」 | 是，完整保留於 `pure-data-learning` audit record | 公開新文案會進入；完整稽核欄位不進入 |
| 「目前怎麼描述」 | `src/components/AdmissionEvidenceSections.jsx` | 像內容編輯備註，不是作品標題 | 改成讀者可理解的作品層級名稱 | 「原型說明」 | 不需逐字保留；原型狀態另於 audit 記錄 | 舊句應被 scanner 阻擋 |
| 「原始影片限制」 | `src/components/AdmissionEvidenceSections.jsx` | 把本機路徑、畫面裁切與 `validated` 等稽核細節放在主要閱讀流 | 公開頁只留簡短版本脈絡；完整限制及重錄需求留 Draft | 「版本說明」與下一版整理方向 | 是，完整保留 | 舊標題與完整限制不進入 |
| 「目前不能延伸的主張」 | `src/components/AdmissionEvidenceSections.jsx` | 代表作品卡片採否定式查核語氣，削弱作品閱讀 | 改成能力、反思與下一步；不能延伸的主張移入作品 audit record | 「這件作品呈現的能力」「回顧與下一步」 | 是 | 舊句不進入 |
| 「申請者提供的紀錄支持……」 | `src/data/admission-evidence.js` | 第三人稱、鑑識式語氣，不符合個人作品集 | 公開頁改用第一人稱說明製作經驗；查核依據留 audit | 《畫本》摘要由「我第一次完整面對故事構思、攝影與剪輯流程」起筆 | 是 | 舊句不進入 |
| 「目前公開頁沒有成片」 | `src/data/admission-evidence.js`、`src/components/AdmissionEvidenceSections.jsx` | 現在已有申請者提供且可開啟的作品連結，原句已不符合現況 | 加入 canonical YouTube 外部連結，使用清楚 CTA；不嵌入或下載第三方平台影片 | 「觀看完整作品」「觀看 MV 練習」 | 歷史缺口不再作公開現況；連結與權利複核需求留 audit | CTA 與 canonical URL 會進入 |
| 「參賽不代表得獎；本頁不主張……」 | 原代表作品公開資料 | 正確但像法務聲明，且壓過作品本身 | 公開頁只陳述可確認的參賽情境，不寫名次；不得推論得獎的限制留 Draft | 「第 15 屆感動久久競賽參賽作品」 | 是 | 否定句不進入，參賽情境會進入 |
| 「原始紀錄未列出，不另行推測」 | `src/components/AdmissionEvidenceSections.jsx` | 空欄位以施工／稽核句補位 | 改為條件渲染；沒有工具資料時不顯示空欄位 | MV 卡片省略沒有內容的「使用工具」列 | 是，補件需求仍可在 audit 追蹤 | 舊句不進入 |
| 「本頁僅有申請者提供……」 | 原代表作品材料欄 | 把內部來源狀態直接暴露給一般讀者 | 以實際作品入口及第一人稱角色說明取代 | 「我的角色與素材說明」 | 是 | 舊句不進入 |
| 「可核對材料」 | 原代表作品 metadata | 以稽核目的命名公開互動 | 改為實際可執行動作 | 「觀看完整作品」「觀看 MV 練習」 | 連結核對紀錄保留 | 舊標籤不進入 |
| 「未經發布決策確認」 | 原聯絡／研究方向區段 | 屬內部發布決策提醒，不應出現在頁尾 | 從公開頁移除；發布決策留文件與 gate | 公開頁只保留線上作品集與 GitHub 入口 | 是，留於發布邊界文件 | 舊句不進入 |
| 「正式 GitHub Pages 專案網址」 | 原外部連結說明 | 像交付備註，不像讀者導向 | 改用一般讀者熟悉的名稱 | 「線上作品集」 | 不需保留 | 舊句不進入 |
| 「不以性格形容詞代替事件，改用三組行動證據」 | `src/components/AdmissionEvidenceSections.jsx` | 編輯規則直接出現在公開頁 | 保留事件內容，改為第一人稱合作敘事 | 「在不同任務裡整理系統、調整角色，也持續回應合作需要。」 | 稽核原則留文件 | 新文案會進入 |
| 「把已有證據、正在學習與未來訓練分開」 | `src/components/AdmissionEvidenceSections.jsx` | 像驗收規則，缺少學習動機 | 保留階段差異，改成發展路線 | 「從可操作作品出發，逐步補足聲音工具與研究方法。」 | 狀態真實性仍由 validator 檢查 | 新文案會進入 |
| 「公開頁會直接說明……不能推論的結論」 | `src/data/portfolio.js` | 資料視覺化段落以限制宣告取代方法與閱讀體驗 | 公開頁聚焦資料整理、閱讀順序與個資邊界 | 「公開展示聚焦方法、介面與分析流程；涉及個人學習資料的內容不直接公開。」 | 更細的資料限制留方法文件 | 新文案會進入 |
| 「AI 協助／申請者負責／失敗與修正稽核」 | `src/data/ai-workflow.js`、`src/components/AiWorkflowSection.jsx` | 第三人稱與稽核標籤讓作者性說明像內部報告 | 改用第一人稱，保留 AI 參與、本人決策與補強方向 | 「AI 協助的部分」「我負責的決策」「我正在補強的能力」 | 原始稽核路徑與細節留 Draft／docs | 公開摘要會進入，audit path 不進入 |

## 作品連結核對

2026-07-26 已在瀏覽器逐一開啟 canonical URL，確認連結可播放且頁面作品名稱相符：

| 作品 | Canonical URL | 瀏覽器核對結果 | 公開呈現 |
| --- | --- | --- | --- |
| 《畫本》 | `https://www.youtube.com/watch?v=mJ9o_u1W2cY` | 可開啟，標題為「畫本 - 《第15屆感動久久》」 | 「觀看完整作品」 |
| 《希望有羽毛和翅膀》個人 MV 混剪 | `https://www.youtube.com/watch?v=9VznR4XSiM0` | 可開啟，標題為「希望有羽毛和翅膀-個人MV混剪」 | 「觀看 MV 練習」 |

兩個 YouTube 頁面均顯示為「不公開」，但 direct URL 可觀看。這項核對只支持「連結目前可開啟且指向相符作品」，不等同公開授權、完整 credit、長期可用性或第三方素材權利已完成確認。連結目前只存在本 Draft PR，不構成 publication approval，也不授權 merge 或 deploy。公開頁候選資料使用 canonical `youtube.com/watch` URL，不改用 scanner 明確阻擋的 `youtu.be` 短網址。

## Scanner 防回歸

`scripts/submission-output-scanner.mjs` 已新增 13 條高訊號規則，對應下列公開稽核／施工語句：

1. `目前不能延伸的主張`
2. `目前不能證明`
3. `申請者提供的紀錄支持`
4. `目前公開頁沒有成片`
5. `參賽不代表得獎`
6. `本頁不主張`
7. `原始紀錄未列出，不另行推測`
8. `本頁僅有申請者提供`
9. `未經發布決策確認`
10. `可核對材料`
11. `目前怎麼描述`
12. `原始影片限制`
13. `正式 GitHub Pages 專案網址`

`tests/submission-scanner.test.mjs` 同步加入 nested lazy admission chunk 的逐條失敗 fixture，以及自然公開文案應通過的對照 fixture。2026-07-26 最終執行結果為 73/73 fixtures 通過；submission 掃描涵蓋 132 dist files、25 text files、67 text rules 與 9 inventory rules。

## 2026-07-26 最終驗證

- `pnpm run doctor`：exit 0。
- Draft build：471 modules；entry 180733 B、CSS 44315 B、initial JS gzip 200889 B。`DraftModeEnabled` 以 dynamic import 載入 audit data，保留 raw entry budget。
- Submission build：467 modules；entry 153704 B、CSS 44315 B、initial JS gzip 192936 B。
- Sound regression：18/18；rights checks：14/14；scanner fixtures：73/73。
- Submission scanner：132 dist files、25 text files、67 text rules、9 inventory rules；`public/` inventory 為 118 entries、0 missing、0 mismatch。
- 針對本文件列出的公開施工／稽核高訊號字串另做 bundle 獨立掃描，結果為 0 hits。
- `pnpm run check:publication`：exit 0；Hamlet 權利閘門為 `verified / approved`。核准範圍仍受限定用途與 evidence lifecycle 約束，且不會把 `notValidated`、`usedForExistingVideo: false` 或未取得的私人原始製作檔改寫成已驗證成果。
- REAPER 文案只保留已安裝狀態，沒有工程或輸出主張；print mode 已重設 reading-surface 色票、`overflow` 與 shadow。
- Browser smoke 覆蓋 1280／768／390／320：0 overflow、0 broken hash、0 duplicate ID、0 broken image、console 0；四個 deep links 為 95–112 px，theme 兩端點與 Menu Escape 通過。
- Screen reader、真實 zoom、system reduced-motion、實體裝置與多瀏覽器音訊尚未檢查，不列為已驗證。

## 發布判讀

- Public copy 通過作品敘事檢查，不代表作品權利已清除。
- Submission bundle 排除 audit module，不代表 public Repository 中的 audit source 是私密資料。
- YouTube direct URL 可播放，不代表取得下載、重製、嵌入、完整 credit 或第三方素材再授權；兩個連結目前只在 Draft PR，不能由本文件推論為發布核准。
- Hamlet media 的 publication gate 維持獨立判讀；本輪已核對為 `verified / approved`，任何後續非零結果仍必須阻擋發布。
