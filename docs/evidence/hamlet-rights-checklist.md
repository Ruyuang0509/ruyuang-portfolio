# AI 文學故事 MV：素材來源與公開權利檢查

## 目前狀態

- `rightsReview.status = unverified`。
- 技術雜湊只能證明交付檔、public 檔與 build 檔一致，不能證明作者身分、工具條款或公開使用權。
- 交付包沒有八張原始場景檔、獨立音樂檔、工具執行紀錄或權利／credit manifest。
- 因此本機 submission review 可以繼續，但 production publication 必須先取得申請者確認。

## 公開前必核對

| 項目 | 需要的證據 | 目前狀態 |
|---|---|---|
| 八幕場景圖 | 產生者／工具、使用帳號或方案、適用條款、公開展示確認 | 未核對 |
| 音樂 | 產生者／工具、適用條款、下載或專案紀錄、公開展示確認 | 未核對 |
| 文學來源 | 使用的版本或翻譯來源、引用範圍、是否只使用自行改寫摘要 | 未核對 |
| Canva 整合 | 可編輯專案是否存在、分享權限與素材來源 | 未核對；目前只核對輸出 MP4 |
| 生成工具歸因 | ChatGPT、圖像工具、Suno 與 Canva 的流程敘述是否有原始紀錄支持 | 核准 brief 規格；無 execution log |

## 申請者確認欄位

完成核對時，至少記錄：

- `applicantAttestation.confirmed = true`、確認人、ISO 日期與可追溯 evidence reference。
- 每項素材的來源、工具與適用條款證據路徑。
- 是否允許作品集、申請文件與公開網站展示。
- 需要顯示的 credit 或限制。
- 不能公開的原始檔與保存方式。

Manifest 內每個 rights item 的布林檢查都必須完成，且 `evidenceRefs` 不得為空；只把頂層 `status` 手動改成 `verified` 不會解除門檻。完成後才可把 `publicationGate` 改為 `approved`。

## 自動門檻

- `pnpm run audit:evidence`：驗證目前 repo 內的 direct-copy hashes、衍生 AVIF/WebP inventory hashes／dimensions、VTT 時間碼、逐字稿一致性與 public inventory；權利狀態只會被報告，不會假裝已完成。
- `pnpm run check:publication`：同時檢查 `rightsReview.status`、`publicationGate`、完整 applicant attestation，以及每個 rights item 的布林核對與 evidence references。只有申請者完成上述確認並更新證據紀錄後，才可解除 production publication gate。
