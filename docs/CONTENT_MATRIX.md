# 作品集內容矩陣

更新日期：2026-07-16。公開內容的 source of truth 是 `src/data/portfolio.js`；施工與風險備註只放 `src/data/portfolio.internal.js`。此表不會把待補素材或 AI 推論直接曝光為完成內容。

| 模組 | 現有內容 | 真實來源 | 完整度 | 公開站處理 | 待補資料 | 不可由 AI 代填的內容 |
|---|---|---|---|---|---|---|
| Hero／申請定位 | 聲音 × 互動 × 數位學習命題、背景能力、兩個站內 CTA | 申請者背景與現行 `homepageNarrative` | 可公開 | 位於首屏；DOM 文字優先，3D 僅漸進增強 | 最終申請年度、截止日與是否加入校名專屬文案 | 學校適配承諾、學術能力結論、未經確認的經歷 |
| 研究定位／五軌道 | 研究問題、證據鏈、能力轉譯、六個主題 | 既有作品內容與提示詞指定目標 | 可公開但仍是申請敘事 | 以研究入口呈現，不宣稱已完成研究 | 正式研究計畫、指導方向、官方招生要求核對 | 最終研究題目、研究成果、系所官方認可 |
| 旗艦互動聲響原型 | React + 原生 Web Audio；pan、pitch、filter、gain 四個 mapping；3 張圖解 | repository 原始碼與本機 rendered prototype | 工程原型完整；研究證據不足 | `notValidated`，需手勢啟用且可停止／fallback | 形成性測試紀錄、可公開聲音錄製或操作影片、測試修訂 | 參與者人數、成功率、學習成效、測試結論 |
| Learning Trail | Web Audio 有 artifact；Pure Data、REAPER 為學習中 | repository 與申請者目前自述 | Web Audio 可公開；另兩項不足 | 明確區分已有證據與學習中 | Pd patch、REAPER session／截圖、聲音輸出、製作反思 | 技術熟練度、未存在的 patch/session、作品完成度 |
| AI 協作方法 | 正確稱為生成式 AI／LLM 協作；責任邊界、Prompt v1/v2、兩個失敗案例 | 兩份使用者提供 prompt、實際本輪除錯與文件 | 方法紀錄可公開 | 位於 Learning Trail 後、作品索引前；比重低於旗艦作品 | 真實 commit history、未來更多版本比較、若要公開的工具／模型版本 | 自研 LLM、AI 產出等同作者作品、未發生的決策或失敗案例 |
| 生成式 AI 介面研究 | 研究構想、流程／IA 圖、planned methods | `generative-interface-study` 公開資料 | 概念完整；媒體與實測不足 | 保留 `notValidated`，不當作已完成產品 | 真實任務、可操作 prototype、媒體、版本比較、形成性測試 | 使用者反應、研究結果、模型能力或成效數字 |
| 資料視覺化系列 | 兩件案例的共同策展入口、能力與聲響延伸 | 既有課程／專題內容與公開資料 | 可公開 | 在 AI 方法之後，作跨域支持證據 | 系列的最終選件與文字精簡決策 | 未做過的分析、聲響化成效 |
| 資料視覺化實際案例 | Spotify Wrapped 等資料敘事分析、流程圖、YouTube 影片 | 既有影片與案例文案 | `exploratory` | privacy-enhanced iframe、使用者意圖後載入；不宣稱成效 | 人工字幕／transcript 核對、影片 credit | 學習效果、觀看者研究結果、未確認字幕內容 |
| Power BI 學習資料探索 | 概念 SVG、互動／作業／成績探索、限制說明 | 既有分析與隔離素材 | 公開敘事可用；授權未完 | 年份省略；原始圖不進 public；不作因果宣稱 | 原始資料授權、年份、measure 定義、去識別化決策 | 年份、因果關係、授權狀態、學習成效 |
| About／履歷／聯絡 | Reviewer Path 明示沒有公開聯絡資料 | 現行 repository 無真實公開資料 | 未完成 | 不建立假連結或占位 CTA | 簡歷 PDF、Email、GitHub／社群、公開範圍決策 | 私人電話／住址、未授權帳號、虛構履歷或技能 |
| 媒體與 credit | 本機 AVIF/WebP/MP4、公開 SVG、YouTube privacy-enhanced embed | `public/media`、案例 metadata、既有影片 | 大多可公開；部分授權待核 | lazy、固定尺寸、poster、no autoplay；restricted media 隔離 | 各作品最終作者／團隊 credit、字幕、外部素材授權證明 | 著作權歸屬、授權聲明、未提供的 alt／transcript 事實 |
| Hidden immersive concept | `immersive-memory-map` 僅存 draft data | `portfolio.internal.js` | 不足 | submission data 排除，不靠 CSS 隱藏 | 真實場域、完整原型、影像／聲音與觀眾證據 | 場域成果、參與者回饋、技術完成度 |
| GitHub／部署證據 | 相對 base、Pages audit、manual workflow | 本輪原始碼與本機 build | 本機工程可用；遠端證據缺失 | 不在公開站宣稱已部署或已有 history | 還原 Git metadata、remote、Pages URL、workflow run | commit history、branch、PR、部署成功狀態 |
| 研究計畫與申請資訊 | 候選研究命題與能力轉譯 | 使用者提示詞與現行作品 | 候選方向 | 以問題與「可深化」語氣呈現 | 正式研究計畫、申請年度、官方課程／師資對應與申請者簽核 | 最終學術主張、官方要求、研究可行性結論 |

## 公開前資料規則

- 沒有證據的欄位保持省略、`notValidated` 或 draft-only，不使用看似完成的 placeholder。
- 可公開作品文字只進 `src/data/portfolio.js`；內部待辦與敏感路徑不複製到公開資料。
- Power BI 原始素材必須先完成授權、去識別化與 measure 核對；目前不得搬入 `public/`。
- 真實使用者資料只在取得適當同意、匿名化並由申請者確認後加入。

