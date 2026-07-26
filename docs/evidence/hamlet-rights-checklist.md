# AI 文學故事 MV：素材來源與公開權利檢查

## 目前狀態

- 更新日期：2026-07-26。
- `schemaVersion = 2`；四類素材使用具名 `requiredChecks`，不再把所有 boolean 一律要求為 true。
- `rightsReview.status = pendingApplicantConfirmation`。
- `publicationGate = requiresApplicantAttestation`。
- `applicantAttestation.confirmed = false`。
- 技術雜湊只能證明交付檔、public 檔與 build 檔一致，不能證明作者身分、工具條款或公開使用權。
- 已建立 public rights registry、刪節摘要與 attestation 草稿；原始生成對話與 EML 不進 Git。
- Suno 特定 Song ID 的非營利用途書面摘要與公開 credit 已記錄，但本輪沒有找到原始 EML 可重新計算 supplied digest。
- 因此本機 submission review 可以繼續，但 production publication 仍須等待申請者本人確認。

## 公開前必核對

| 項目 | 需要的證據 | 目前狀態 |
|---|---|---|
| 八幕場景圖 | 原始生成紀錄、文字提示、reference image、特定電影／演員複製與公開用途 | 找到 0 份原始生成紀錄；需本人確認 |
| Suno 音樂／歌詞／人聲 | Song ID、Basic／Free、00:00–00:40、官方非營利範圍、credit 與實際無營利使用 | 書面摘要與 supplied digest 已記錄；無營利使用仍需本人確認；原始 EML 本輪未找到 |
| 文學來源 | William Shakespeare, *Hamlet*、AI 協作改寫、申請者核對、現代譯本／電影字幕未複製 | 基礎與流程已記錄；排除現代來源需本人確認 |
| Canva 整合 | editing/export only、上傳素材清單、stock image／video／audio 與 template media | 工具角色已記錄；stock／template 缺席需本人確認 |
| 生成工具歸因 | ChatGPT、圖像工具、Suno 與 Canva 的流程敘述是否有原始紀錄支持 | 核准 brief 規格；無 execution log |

四類 evidence refs：

- `scene-images` → `hamlet-scene-generation-records`、`hamlet-applicant-attestation-v1`
- `music` → `hamlet-suno-support-confirmation`、`hamlet-applicant-attestation-v1`
- `literary-source` → `hamlet-literary-rewrite-attestation`、`hamlet-applicant-attestation-v1`
- `canva-project` → `hamlet-canva-editing-only-attestation`、`hamlet-applicant-attestation-v1`

## 申請者確認欄位

完成核對時，至少記錄：

- `applicantAttestation.confirmed = true`、確認人、ISO 日期與可追溯 evidence reference。
- 每項素材的來源、工具與適用條款證據路徑。
- 是否允許作品集、申請文件與公開網站展示。
- 需要顯示的 credit 或限制。
- 不能公開的原始檔與保存方式。

Manifest 內每個 rights item 的具名 `requiredChecks` 都必須明確為 `true`，`evidenceRefs` 必須解析至 `rightsEvidence[].id`；只把頂層 `status` 手動改成 `verified` 不會解除門檻。Suno 的 `commercialUsePermitted`、ads、paywall 與 affiliate revenue 條件必須維持 `false`。完成本人確認後才可把 `publicationGate` 改為 `approved`。

## 自動門檻

- `pnpm run audit:evidence`：驗證目前 repo 內的 direct-copy hashes、衍生 AVIF/WebP inventory hashes／dimensions、VTT 時間碼、逐字稿一致性與 public inventory；權利狀態只會被報告，不會假裝已完成。
- `pnpm run check:publication`：同時檢查 schema、rights evidence registry、reference 解析、Suno Song ID／digest／片段／非營利條件、公開署名、實際含歌詞／人聲敘事、Git／dist 私人證據邊界、影片 hash、完整 applicant attestation，以及每個具名 required check。只有申請者完成上述確認並更新證據紀錄後，才可解除 production publication gate。
- Pages workflow 的 publication check 位於 submission check 後、Configure Pages 與 artifact upload 前，且不得設定 `continue-on-error`。
