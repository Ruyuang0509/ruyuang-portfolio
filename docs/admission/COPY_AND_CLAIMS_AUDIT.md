# 送審文案與主張稽核

更新日期：2026-07-26

## 稽核方式

目前執行環境沒有可呼叫的 `@浮士德` 代理。確認工具不可用後，本輪依相同的 UX Writing 與 claim-boundary 標準完成兩個 checkpoint 的內部自稽；沒有把未執行的外部代理審查寫成已完成：

1. 實作前檢查主敘事、區段功能、能力誇大與招生簡章式空話。
2. 實作後逐段檢查 Pure Data 作者性、REAPER 狀態、研究構想邊界、繁體中文一致性、作品連結與證據分層。

稽核只使用申請者提供事實、Repository source、找到的真實媒體／文件與實際驗證；沒有用 AI 補造結果。

## Checkpoint A：Copy architecture

### 保留

- 以數位學習、視覺敘事、資訊架構與互動介面作為可轉用方法。
- Web Audio 是目前最完整、可直接操作的聲音技術證據。
- Pure Data 從 2026/07/24 開始學習，初版有 AI 協作，現正逆向拆解。
- REAPER 已安裝但沒有工程或聲音輸出。
- 精簡揚聲器、開放式耳機與視覺化校準屬申請階段研究構想。
- 已完成、可操作原型、學習中、研究構想與尚待驗證分開呈現。

### 修改

| 原問題 | 修正版方向 | 理由 |
| --- | --- | --- |
| 「2026 年畢業於」把預計畢業寫成已完成 | 「現就讀……，預計 2026 年畢業」 | 對齊申請者事實 |
| Hero 只說聲音互動與空間監聽，未說明轉向原因 | 增加 2020 聆聽轉折、術語門檻與數位學習方法 | 讓背景、問題與方法形成因果鏈 |
| Pure Data 只是一張「學習中」卡片 | 獨立為影片、觀看指南、目前完成、AI 協作與學習、回顧與下一步；完整限制移入 Draft audit | 讓真實 learning artifact 可被閱讀，同時避免公開頁變成稽核報告 |
| 影片與 Patch 大量使用 `validated` | 網站統一寫「v0.2.1 本機功能測試」 | 單機可執行不等於使用者或研究驗證 |
| 介面寫 `visual gesture parameters` | 網站改稱「模擬視覺參數／跨模態參數映射／控制面板原型」 | 現況沒有攝影機、追蹤或感測輸入 |
| 研究構想以 current evidence cards 重複前文 | 改為問題／初步構想／可帶入能力／入學後需補強四層 | 避免把現有 prototype 與未來研究混在一起 |
| 《畫本》與指定 MV 完全缺席 | 依申請者事實加入作品案例與 canonical YouTube 入口；角色、反思與素材說明留在卡片，完整權利複核留 Draft audit | 讓讀者能實際觀看作品，同時不把 direct URL 可播放誤寫成權利已清除 |
| 人格描述容易落入「認真、熱情、負責」 | 改用社團重整、6→17、專題角色調整與工作適應事件 | 讓特質回到具體行動 |
| 頁尾只有站內循環 | 加入線上作品集與 GitHub；研究計畫不放假下載連結 | 提供真實出口並保持發布邊界 |

### 刪除

- 移除首頁中的五研究軌道、術語轉譯與系所主題對照，避免與研究構想競爭。
- 移除舊 `#learning-trail` 實體段落，改由 Pure Data 專段與四階段 Roadmap 承接。
- 移除頁尾重複的 `#reviewer-path`，保留前段依證據強度安排的閱讀入口。
- 移除公開頁原本用來呈現「支持／不支持主張、作者性與原始影片限制」的四組稽核面板；這些資料改以 stable ID 存於 `admission-evidence.audit.js`，由 Draft 入口讀取。
- 不使用「精通、熟練、完整掌握、成功證明、已驗證有效、提升學習成效、已完成心理聲學研究、已完成多聲道監聽系統、業界標準、專業級」。

## Checkpoint B：Final claims

| 公開主張 | 支持來源 | 邊界 | 判定 |
| --- | --- | --- | --- |
| 蕭智仁現就讀國立嘉義大學數位學習設計與管理學系，預計 2026 年畢業 | 申請者本輪事實 | 不推論成已取得學位 | 保留 |
| Web Audio 將水平、垂直、速度、大小映射到聲像、音高、濾波、增益 | `portfolio.js`、`soundMapping.js`、實際 prototype、18 個 sound tests | 不主張學習成效或直覺性 | 保留 |
| Web Audio graph 有輸入、正規化、映射、Oscillator、Filter、Gain／Envelope、Stereo Panner、Compressor、Master | source 與 validator | 不是混合多聲道監聽系統 | 保留 |
| Pure Data v0.2.1 在本機可操作 | 62.983 秒 MP4、抽幀與音訊檢查 | 影片含本機路徑、`validated` 與裁切標籤；公開頁只稱本機功能測試，完整限制留 Draft audit | 修改後保留 |
| Pure Data 四組 mapping、Preset、Reset、Panic 與 meters 存在 | 影片抽幀與 Patch inventory | 不代表申請者獨立完成或可進行學術實驗 | 保留 |
| Pure Data 初版有 AI 協作、申請者正逆向拆解 | 申請者本輪事實 | Patch／ZIP 本身缺 AI disclosure，不把其 metadata 當作者性證明 | 保留 |
| REAPER 是已完成技能 | 只有軟體已下載，沒有 `.rpp` 或輸出 | 不得發布為技能或作品 | 刪除 |
| 《畫本》是原創短劇，角色為故事構思、攝影、剪輯 | 申請者本輪事實與已核對可開啟的 canonical YouTube 連結 | 連結不取代日期、完整 credit、活動紀錄與人物／音樂／場地權利核對 | 限定後保留 |
| 《畫本》獲獎或有特定排名 | 沒有證據 | 不得推論 | 刪除 |
| 指定 MV 呈現選曲、素材研究、取材、篩選與剪輯 | 申請者本輪事實與已核對可開啟的 canonical YouTube 連結 | 原始角色、動畫影像與音樂權利屬原權利人；連結可看不等於另有公開授權 | 限定後保留 |
| 指定 MV 是申請者原創動畫／音樂 | 第三方角色、影像、音樂 | 不得把第三方素材列為個人原創成果 | 刪除 |
| 社團第一任期登記人數 6→17 | 申請者本輪事實 | 不把成長歸因於單一措施，不寫成外部驗證成效 | 限定後保留 |
| 混合監聽能降低門檻 | 目前只有研究構想 | 改為「探討能否」；配置、渲染、樣本與量測均可調整 | 修改後保留 |
| 研究計畫已有完成研究方法與樣本 | 外部 DOCX 是完整草案，但未簽核文獻、設備、樣本、倫理與 metadata | 不公開原檔，不把草案當完成研究 | 刪除 |
| AI 參與等於申請者獨立技術能力 | 不成立 | 分開 AI 協助、申請者負責與仍需補強 | 刪除 |

## 繁體中文與術語一致性

- 一般聆聽經驗使用「聲音」。
- 創作與研究領域使用「聲響」。
- 訊號、路由、codec 與 Web Audio graph 使用「音訊」。
- 可量測的科學領域才使用「聲學」。
- Pure Data 輸入統一寫「模擬視覺參數」，不寫成已完成手勢辨識。
- `validated` 只保留在 Draft 稽核對原始介面的說明；公開頁狀態使用「本機功能測試」與後續學習語氣。
- 研究構想使用「想研究、探討、評估、預定、需補強」，不使用完成式成果語氣。

## 採用與拒絕的稽核建議

### 已採用

- Web Audio 前置，Pure Data 緊接其後。
- Research proposal 改為四層並保留完整 scope statement。
- 《畫本》優先於指定 MV；兩件作品加入已核對的 canonical YouTube 入口，MV 保留清楚的第三方權利歸屬與個人角色。
- AI disclosure 可見但後置，改用「AI 協助的部分／我負責的決策／我正在補強的能力」呈現。
- 領導與人格以事件代替抽象形容詞。
- Hero 改成在學／預計畢業，CTA 分別指向實作與 Roadmap。
- 公開作品模組只保留讀者需要的敘事；完整 claim、rights、limitations 與 evidence requests 以 stable ID 留在 Draft audit。
- 對資料視覺化、閱讀路線與合作經驗採第一人稱、方法導向文案，不把內容治理規則直接寫給一般讀者。

### 因證據不足而未採用

- 不把找到的 v0.2.2 Patch 寫成新版成果，因版本 metadata 自相矛盾且未重驗。
- 不加入 REAPER project、routing、A/B 音訊或 waveform。
- 不下載、重製或嵌入《畫本》與指定 MV；只使用申請者提供且在瀏覽器核對可開啟、作品相符的 canonical YouTube 連結。
- 不加入未確認的年份、獎項、排名、觀看數、完整 credit 或授權結論。
- 不公開研究計畫 DOCX，也不建立下載連結。
- 不把社團人數成長寫成制度重整造成的已驗證因果。
- 不把 current Pure Data video 的 `validated` 當成學術或使用者驗證。
- 不自行更新未由 current official source 核對的正式系所名稱、招生要求或師資對照。

## 2026-07-26 連結與分層補充

- 《畫本》使用 `https://www.youtube.com/watch?v=mJ9o_u1W2cY`；瀏覽器顯示作品標題「畫本 - 《第15屆感動久久》」，direct URL 可觀看。
- 《希望有羽毛和翅膀》個人 MV 混剪使用 `https://www.youtube.com/watch?v=9VznR4XSiM0`；瀏覽器顯示相符作品標題，direct URL 可觀看。
- 兩個頁面均顯示「不公開」。這項核對不等同第三方素材權利、完整 credit、競賽公開範圍或長期連結可用性已確認；連結目前只存在本 Draft PR，不構成 publication approval 或 merge／deploy 授權。
- `admission-evidence.js` 與 `admission-evidence.audit.js` 以三個 stable ID 對齊；`DraftModeEnabled` 以 dynamic import 載入 audit module，submission alias 另行排除它。Repository 是 public，source-only 仍不是 private。
- 13 條高訊號 scanner rules 與 nested bundle fixtures 已加入 source；最終為 73/73 fixtures 通過，submission 掃描涵蓋 132 dist files、25 text files、67 text rules 與 9 inventory rules。

## 2026-07-26 最終驗證補記

- `pnpm run doctor`：exit 0。
- Draft build：471 modules；entry 180733 B、CSS 44315 B、initial JS gzip 200889 B。Admission audit data 由 `DraftModeEnabled` 動態載入，不回灌 raw entry。
- Submission build：467 modules；entry 153704 B、CSS 44315 B、initial JS gzip 192936 B。
- Sound regression：18/18；rights checks：14/14；scanner fixtures：73/73。
- Submission scanner：132 dist files、25 text files、67 text rules、9 inventory rules；`public/` inventory 為 118 entries、0 missing、0 mismatch。
- 公開 bundle 的指定施工／稽核字串獨立掃描為 0 hits。
- `pnpm run check:publication`：exit 0；Hamlet 權利閘門為 `verified / approved`。這項核准只涵蓋目前清單與限定用途，不會把 `notValidated`、`usedForExistingVideo: false` 或未取得的私人原始製作檔升級為已驗證成果。
- REAPER 公開文案只保留已安裝狀態；print mode 已重設 reading-surface 色票、`overflow` 與 shadow。
- Browser smoke 覆蓋 1280／768／390／320：0 overflow、0 broken hash、0 duplicate ID、0 broken image、console 0；四個 deep links 為 95–112 px，theme 兩端點與 Menu Escape 通過。
- Screen reader、真實 zoom、system reduced-motion、實體裝置與多瀏覽器音訊尚未檢查，不列為已驗證。
