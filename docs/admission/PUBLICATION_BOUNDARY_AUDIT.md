# 公開邊界稽核

## 2026-07-26 current update

- Hamlet public rights registry 已建立；Suno 的特定非營利用途書面摘要可公開，原始 EML 與完整 ChatGPT／OpenAI 生成對話不可進 Git、public 或 dist。
- 本輪未找到原始 EML、八幕生成紀錄、reference image evidence 或 Canva stock／template inventory。未找到不等於已證明不存在；相關 required checks 保持 false。
- Applicant attestation 仍為 `confirmed = false`；publication audit 實測 exit 1，列出 25 個具名 blockers。其餘 Phase A 指定命令均 exit 0。不得以 submission build、HTTP 200 或 workflow success 推論 rights approval。
- Production workflow 已把 `check:publication` 放在 Configure Pages 與 upload 之前，沒有 `continue-on-error`。目前合入 main 會因 pending applicant checkpoint 而停止 deploy。
- Suno 條件只涵蓋目前無廣告、無付費牆、無 affiliate revenue 的非營利研究所作品集；rights verification 與 research validation 分層。
- Browser 四個 viewport 的公開 disclosure、影片控制、focus、11 anchors、overflow 與 console 已通過；rendered success 仍不等於 applicant attestation。

更新日期：2026-07-24

## Executive verdict

目前 submission alias、content validator、scanner 與 Pages path audit 可以排除已知施工文字和 hidden bundle，但不能把公開 Git 原始碼變私密，也不能替素材權利作決定：

- Repository `Ruyuang0509/ruyuang-portfolio` 目前是 public。
- `submissionVisibility: hidden`、draft-only、不渲染與 Vite alias 只控制 runtime bundle。
- Vite 會把 `public/` 全量複製到 `dist/`，無論 React 是否引用。
- Pages workflow 執行 `check:submission`，不執行 `check:publication`。
- Hamlet publication gate 仍為 `unverified／requiresApplicantAttestation`。
- 本輪沒有變更 Repository visibility、Git history、Pages、attestation、commit、push、PR 或 deployment。

## Public and intended／公開且預期

- `src/data/portfolio.js`：Hero、聲音轉向、Web Audio 與既有公開案例資料。
- `src/data/admission-research.js`：四層申請階段研究構想。
- `src/data/admission-evidence.js`：Pure Data 影片 metadata、代表作品文字、合作證據、Roadmap 與真實外部連結。
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

### 代表作品文字

- 《畫本》與《希望有羽毛和翅膀》MV 的名稱、角色、工具／情境來自申請者本輪事實。
- Repository 沒有成片、活動紀錄、課程紀錄或 rights ledger；公開頁只呈現文字與限制，不嵌入媒體。

## Present in source only／只出現在原始碼

- `src/data/portfolio.hidden.js`：submission-hidden 沉浸式研究構想。
- `src/data/portfolio.internal.js`：施工、權利、媒體與風險備註。
- `docs/ai-workflow/portfolio-master-prompt.md`
- `docs/ai-workflow/portfolio-continuation-prompt.md`
- `docs/admission/*`

這些檔案不進網站 bundle；但一旦 tracked 並 push 到 public Repository，就仍可由 GitHub 讀取。Source-only 不是 private。

## Included in submission build／會進入 submission build

- 11 段首頁 DOM 與對應公開 data modules。
- Web Audio controller、prototype 與公開案例 renderer。
- Pure Data v0.2.1 MP4、poster 與頁面文字。
- 全部 `public/**`，包含未被 React 引用的檔案。
- 公開 metadata、SVG、TXT、VTT、AVIF、WebP 與 MP4。
- AI／作者性摘要；完整外部任務附件不會被自動複製。

## Excluded from submission build／不會進入 submission build

- `src/data/portfolio.hidden.js`
- `src/data/portfolio.internal.js`
- `src/draft/DraftModeEnabled.jsx`
- `docs/**`
- `.tmp/**`
- `reports/**`
- `restricted-media/**`

前三類若 tracked 仍屬 public Git source；只有 bundle 被排除。

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
4. 是否發布《畫本》或指定 MV；發布前需確認成片、credit、人物、音樂、第三方素材與活動／課程範圍。
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
- Power BI 原始資料、PBIX、真實結果與受限媒體。
- 未匿名的使用者研究、錄音、Email、電話、地址、登入資料或其他個資。
- 任何把 CSS 隱藏、draft-only、source-only 或 submission alias 當成隱私保護的說法。

## Gate 判讀

- `pnpm run check:submission`：檢查 evidence integrity、scanner fixtures、submission build、已知文字／檔名與 Pages 路徑。
- `pnpm run check:publication`：Hamlet 權利與 applicant attestation gate。
- `check:submission` 通過、Pages deployment success、HTTP 200 或媒體可播放，都不能替代 publication approval。

2026-07-24 本輪 fresh 結果：

- `pnpm run doctor`：exit 0；scanner fixtures 57/57，draft／submission 分別完成 470／467 modules。
- submission `dist/`：132 files／25 text files；118 個 `public/` files 為 0 missing、0 hash mismatch。
- `pnpm run check:publication`：exit 1；共 11 個 Hamlet rights／applicant-attestation blockers，屬預期阻擋，未被降級或繞過。
- In-app Browser 因本機連線隔離，無法對 shell 已確認 HTTP 200 的 preview 執行 rendered matrix；此項是未能執行，不是通過。
