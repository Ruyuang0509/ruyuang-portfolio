# 公開邊界稽核

更新日期：2026-07-26

## Executive verdict

目前 submission alias、content validator、scanner 與 Pages path audit 可以排除已知施工文字和 hidden bundle，但不能把公開 Git 原始碼變私密，也不能替素材權利作決定：

- Repository `Ruyuang0509/ruyuang-portfolio` 目前是 public。
- `submissionVisibility: hidden`、draft-only、不渲染與 Vite alias 只控制 runtime bundle。
- `src/data/admission-evidence.js` 與 `src/data/admission-evidence.audit.js` 已分開：前者供公開作品頁使用，後者以相同 stable ID 保存完整稽核紀錄；submission alias 排除 audit module，但 source 仍位於 public Repository。
- Vite 會把 `public/` 全量複製到 `dist/`，無論 React 是否引用。
- Pages workflow 執行 `check:submission`，不執行 `check:publication`。
- Hamlet publication gate 仍為 `unverified／requiresApplicantAttestation`。
- PR #6 已將 admission source、`docs/admission/*` 與 Pure Data binaries commit／push、合併到 public `main` 並由 Pages run `30087568225` 部署；Repository 仍為 public，HTTPS enforced。這次文件更新不再把它們描述為只在本機。
- Hamlet attestation／rights status沒有改變；`check:publication` 仍以 11 個 blockers exit 1，workflow仍未執行此 gate。

## Public and intended／公開且預期

- `src/data/portfolio.js`：Hero、聲音轉向、Web Audio 與既有公開案例資料。
- `src/data/admission-research.js`：四層申請階段研究構想。
- `src/data/admission-evidence.js`：Pure Data 公開學習敘事、代表作品、合作證據、Roadmap 與真實外部連結；不包含完整 supported／unsupported claims、rights、limitations 或 evidence requests。
- `src/data/ai-workflow.js`：AI 協助、申請者責任與失敗修正摘要。
- Web Audio 原型 source、聲音 mapping、鍵盤／Escape／cleanup 與 fallback。
- `index.html`、`public/llms.txt`、favicon、social preview 與 canonical URL。
- 不含第三方媒體的公開安全圖像與案例方法文字。

## Public but requires review／公開但需要複核

### Pure Data v0.2.1 原始功能紀錄

- `public/media/portfolio/pd-crossmodal-mapping-v0.2.1-operation-demo.mp4`
- `public/media/portfolio/pd-crossmodal-mapping-v0.2.1-operation-demo-poster.png`

申請者本輪明確要求找到後整合，因此檔案是本次預期輸出；仍有下列可見限制：

- 標題列顯示本機 D 槽專案路徑。
- 介面與狀態文字持續使用 `validated／locally validated`。
- 部分 Preset 標籤與下方 Patch 超出畫面。
- 沒有作品集版分段標題、字幕或旁白。

網站已逐項揭露，並將狀態統一改為「本機功能測試／尚待驗證」。正式送審前最高價值修正仍是重錄公開安全版。

### Hamlet media

- 影片、poster、雙語 WebVTT 與八幕 responsive derivatives 都在 `public/` 並已部署。
- `audit:evidence` 可核對 hash、尺寸、字幕與 derivative 關係。
- 權利、來源與 applicant attestation 未完成；`check:publication` 必須保持阻擋。

### 代表作品與外部連結

- 《畫本》與《希望有羽毛和翅膀》MV 的名稱、角色、工具／情境來自申請者本輪事實。
- 2026-07-26 已在瀏覽器核對兩個 canonical YouTube URL 可開啟且作品名稱相符：
  - 《畫本》：`https://www.youtube.com/watch?v=mJ9o_u1W2cY`
  - 《希望有羽毛和翅膀》個人 MV 混剪：`https://www.youtube.com/watch?v=9VznR4XSiM0`
- 兩個 YouTube 頁面均顯示為「不公開」，但 direct URL 可觀看。公開頁以新分頁外部連結呈現，不下載、不重製、不把影片複製到 `public/`。
- Direct URL 可開啟只支持連結與作品對應，不取代完整 credit、活動／課程紀錄、rights ledger、第三方素材權利或長期可用性核對。

## Present in source only／只出現在原始碼

- `src/data/portfolio.hidden.js`：submission-hidden 沉浸式研究構想。
- `src/data/portfolio.internal.js`：施工、權利、媒體與風險備註。
- `src/data/admission-evidence.audit.js`：以 `pure-data-learning`、`huaben-short-film`、`hope-feathers-wings-mv` 三個 stable ID 保存證據狀態、不能延伸的主張、作者性、AI 協作、權利、限制與補件需求。
- `docs/ai-workflow/portfolio-master-prompt.md`
- `docs/ai-workflow/portfolio-continuation-prompt.md`
- `docs/admission/*`（不進網站 bundle，但已在 public Git）

這些檔案不進網站 bundle，但均已 tracked／push 到 public Repository，可由 GitHub 讀取。Source-only 不是 private。

## Included in submission build／會進入 submission build

- 11 段首頁 DOM 與對應公開 data modules。
- Web Audio controller、prototype 與公開案例 renderer。
- Pure Data v0.2.1 MP4、poster 與頁面文字。
- 《畫本》與指定 MV 的 canonical YouTube 外部連結、公開角色敘事與素材說明；外部影片本身不會被打包。
- 全部 `public/**`，包含未被 React 引用的檔案。
- 公開 metadata、SVG、TXT、VTT、AVIF、WebP 與 MP4。
- AI／作者性摘要；完整外部任務附件不會被自動複製。

## Excluded from submission build／不會進入 submission build

- `src/data/portfolio.hidden.js`
- `src/data/portfolio.internal.js`
- `src/data/admission-evidence.audit.js`
- `src/draft/DraftModeEnabled.jsx`
- `docs/**`
- `.tmp/**`
- `reports/**`
- `restricted-media/**`

上述 source 檔若 tracked 仍屬 public Git source；只有 bundle 被排除。特別是 `admission-evidence.audit.js` 含具體 claim、rights、limitations 與 evidence requests，不應因 alias 排除而被描述成私密資料。

## Should move to private workbench／應移入私人工作區

- Pure Data AI 原始對話、v0.2.1 Patch／ZIP、v0.2.2 不一致版本與獨立重建過程。
- REAPER 原始錄音、`.rpp`、路由、效果鏈與 A/B 輸出。
- Web Audio 使用者測試同意、原始觀察、未匿名紀錄與聲音輸出。
- 《畫本》原始工程、演出／音樂／場地權利資料與 master。
- 指定 MV 的完整第三方素材、cue sheet、課程紀錄與 rights ledger。
- 完整研究計畫 DOCX、文獻核對、樣本、預算、倫理、設備與指導討論。
- 瀏覽器 profile、未逐檔檢查的 browser／Lighthouse reports。

## Requires applicant decision／需要申請者決定

1. 是否用新版錄影取代含本機路徑與 `validated` 的 Pure Data 原始功能紀錄。
2. 完成 Hamlet rights evidence／attestation，或在核准前撤下該媒體。
3. 是否維持 public Repository，及完整 prompts／hidden／internal／admission docs 的公開範圍。
4. 是否長期保留《畫本》與指定 MV 的外部入口；目前 direct URL 可觀看，但仍需確認 credit、人物、音樂、第三方素材與活動／課程公開範圍，連結狀態變更時也需重驗。
5. 是否把完整研究計畫整理成公開 review copy；目前網站只放摘要。
6. 是否加入公開 Email、履歷或社群；目前只使用已確認的 Portfolio 與 GitHub URL。
7. 是否處理 Git history 中已刪除但可取回的歷史資產；本輪禁止自動 history rewrite。

## Must not publish／不可發布

- v0.2.2 外層版本與內部 README／manifest／status 不一致的 Patch。
- 未核對且過度使用 `validated／confirmed by user`、沒有 AI disclosure／LICENSE 的 Pure Data 原始 Patch／ZIP。
- 未簽核的完整研究 DOCX 草案、未核對文獻、樣本、預算與倫理資料。
- REAPER 不存在的工程、聲音輸出、A/B 或熟練度主張。
- 《畫本》虛構獎項、排名、觀看數、評語或未確認人物／音樂／場地權利。
- 指定 MV 的第三方角色、動畫影像與音樂原檔，除非取得適合公開送審的權利。
- 任何把 YouTube direct URL 可開啟解讀為可下載、重製、再授權，或把「不公開」連結解讀為完全公開授權的說法。
- Power BI 原始資料、PBIX、真實結果與受限媒體。
- 未匿名的使用者研究、錄音、Email、電話、地址、登入資料或其他個資。
- 任何把 CSS 隱藏、draft-only、source-only 或 submission alias 當成隱私保護的說法。

## Gate 判讀

- `pnpm run check:submission`：檢查 evidence integrity、scanner fixtures、submission build、已知文字／檔名與 Pages 路徑。
- `pnpm run check:publication`：Hamlet 權利與 applicant attestation gate。
- `check:submission` 通過、Pages deployment success、HTTP 200 或媒體可播放，都不能替代 publication approval。

### Prior baseline：2026-07-25

- `pnpm install --frozen-lockfile`、`pnpm run doctor`：exit 0；scanner fixtures 57/57、text／inventory rules 54／7，draft／submission分別完成 470／467 modules；submission initial JS gzip／entry／CSS為 192733／152769／43138 B。
- submission `dist/`：132 files／25 text files；118 個 `public/` files 為 0 missing、0 hash mismatch。
- `pnpm run check:publication`：exit 1；共 11 個 Hamlet rights／applicant-attestation blockers，屬預期阻擋，未被降級或繞過。
- Current Browser已覆蓋 1280／375／320 基本渲染、anchors／IDs、menu、overflow、video metadata與 console；Web Audio發聲、reduced-motion、Save-Data、失敗媒體、screen reader、實機與完整四 viewport未驗。
- PR #6／run `30087568225` 已部署；Pages API public／`built`／HTTPS enforced，current bundle、admission chunks與代表資產production 200。

以上數字是本輪改版前的 prior baseline，不可當成 2026-07-26 改版後結果。

### Current final：2026-07-26

- 公開 admission module 與 Draft audit module 已依 stable ID 分層，代表作品已加入兩個 browser 核對過的 canonical YouTube 連結。
- `pnpm run doctor`：exit 0。
- Submission build：467 modules；initial JS gzip 191397 B、entry 148553 B、CSS 44122 B。
- Submission scanner 已新增 13 條高訊號公開稽核／施工語句規則；nested lazy admission chunk 與自然文案 fixtures 最終為 72/72 通過。輸出掃描涵蓋 132 files、25 text files、67 text rules 與 7 inventory rules。
- 公開 bundle 另以本輪指定的施工／稽核字串獨立掃描，結果為 0 hits。
- `pnpm run check:publication`：exit 1；11 個 Hamlet rights／applicant-attestation blockers 維持阻擋，沒有被改寫、降級或繞過。
- 延後載入段落會在 `portfolio:deferred-ready`／`portfolio:hash-settled` 後同步 refresh Lenis 與 ScrollTrigger；瀏覽器深層錨點實測確認內容載入後可重新定位至目標段落。
