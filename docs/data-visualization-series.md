# 資料視覺化系列新增規則

本文件記錄「資料視覺化在數位學習應用」系列新增到公開作品集時的內容邊界與維護規則。

## 已新增的公開入口

- 系列頁：`#data-visualization-series`
- 作品頁：`#data-visualization-cases`
- 作品頁：`#learning-dashboard-analysis`

## 內容定位

這兩件作品同屬「資料視覺化與數位學習」主題，但必須維持彼此獨立：

- 「資料視覺化實際案例與數位學習應用探討」是案例分析與動態敘事作品。
- 「線上學習互動行為與學科成績之資料視覺化分析」是 Power BI 學習分析儀表板作品。

不得把兩件作品寫成同一研究的前後階段，也不得互相借用資料或成果敘述。

## 作品一目前已確認資料

- 正式製作日期：2026/06/12。
- 實際使用工具：Power BI、Excel、Gemini、ChatGPT。
- 目前無 15–25 秒網站預告、poster、主視覺與製作過程截圖資料。
- 公開影片目前無字幕；公開頁以文字摘要補充基本可及性。

## Power BI 圖表敘述紅線

- 圓環圖是 `sn` 的計數，不是序號加總。
- 目前觀看直條圖使用非空值計數；在度量修正前，公開文案使用「不同數學成績分群的學習者／紀錄數」，不得稱為觀看時數比較。
- 視覺關聯只能描述為探索線索，不得宣稱因果關係或學習成效證明。
- 若未來修正度量或加入統計驗證，必須同步更新 `src/data/portfolio.js` 與本文件。

作品二的最終資料版本、總筆數與年級範圍已允許公開，但實際數值尚未提供，因此目前不寫入公開頁面。

## 公開素材邊界

下列素材不得進入公開 repository 或公開 build：

- 原始資料表。
- Power BI 原檔。
- 完整操作影片的私人連結或識別資訊。
- 本機絕對路徑。
- 任何可能回推出學生、課程、帳號或資料來源的欄位截圖。

目前公開頁面使用 `public/media/data-visualization/` 的本地 SVG 作為安全示意圖，不含真實資料。

## 維護位置

- 公開資料：`src/data/portfolio.js`
- Draft-only 風險提醒：`src/data/portfolio.internal.js`
- 系列入口元件：`src/components/DataVisualizationSeries.jsx`
- Case study 模板：`src/components/CaseStudyShowcase.jsx`

## 正式分享前檢查

```powershell
pnpm run workspace:check
pnpm run content:check
pnpm run build
pnpm run check:submission
```

`content:check` 與 `check:submission` 已加入資料視覺化系列的敏感資料掃描規則，用來防止私有資料、匯出檔、本機路徑或施工字眼進入公開內容。
