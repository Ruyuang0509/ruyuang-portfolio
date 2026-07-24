export const aiWorkflow = {
  id: "ai-workflow",
  eyebrow: "生成式 AI 使用說明",
  title: "AI 協助整理與檢查，最後的選擇由我負責。",
  titleLines: [["AI 協助", "整理與檢查，"], ["最後的選擇", "由我負責。"]],
  summary:
    "這個網站的程式草稿、文件整理與部分稽核曾使用生成式 AI。我決定作品內容、研究主張與視覺方向，也逐項驗收修改結果。這些是開發紀錄，不代表我訓練或部署了大型語言模型。",
  responsibilityGroups: [
    {
      label: "AI 協助",
      items: [
        "程式草稿、Pure Data 初版協作與除錯線索",
        "文件架構、重複內容整理與部分文案候選",
        "建置、媒體、證據、公開邊界與可及性稽核項目整理",
      ],
    },
    {
      label: "申請者負責",
      items: [
        "作品事實、研究方向、研究主張與公開內容取捨",
        "視覺方向、媒體選擇、素材權利判斷與功能操作",
        "修改驗收、最終文字與設計判斷",
      ],
    },
    {
      label: "申請者尚需補強",
      items: [
        "Pure Data 模組的獨立重建與解釋",
        "REAPER 實際工程、路由與原創聲音輸出",
        "使用者測試、聲學量測與研究方法訓練",
      ],
    },
  ],
  versions: [
    {
      version: "提示詞 v1",
      title: "作品集主提示詞",
      change: "先訂出作品事實、公開媒體、GitHub Pages、可及性與驗收規則。",
    },
    {
      version: "提示詞 v2",
      title: "續作提示詞",
      change: "要求後續工作先讀交接文件與現有程式，再依可核對材料繼續。",
    },
    {
      version: "提示詞 v3",
      title: "送審證據補強",
      change: "把申請主線、聲音證據、工具學習、材料證據狀態與公開邊界分開處理。",
    },
  ],
  failureCases: [
    {
      problem: "GitHub Pages 找不到網站資源",
      discovery: "部署後檢查首頁與媒體網址時，發現資產從網域根目錄載入而回傳錯誤。",
      diagnosis: "建置檔與媒體使用網域根目錄，但 GitHub Pages 專案網站部署在儲存庫子路徑。",
      check: "比對 Vite base、建置後 HTML／JavaScript 路徑與 GitHub Pages project path。",
      correction: "改用符合專案子路徑的 base path，並在每次送審建置後檢查資源網址。",
      learning: "部署成功不代表路徑一定正確；送審輸出需要獨立的 Pages path audit。",
    },
    {
      problem: "不支援 Web Audio 時，狀態訊息顯示錯誤",
      discovery: "在沒有 AudioContext 的環境重載頁面時，介面顯示成一般停止狀態。",
      diagnosis: "無 Web Audio 的瀏覽器曾顯示為「聲音已停止」，沒有傳達真正原因。",
      check: "移除 AudioContext 支援後重載，核對初始狀態、說明文字與按鈕是否一致。",
      correction: "載入時先檢查瀏覽器支援狀態，再用實際操作確認訊息與控制項。",
      learning: "錯誤回饋必須說明真正限制，不能讓停止、失敗與不支援共用模糊狀態。",
    },
    {
      problem: "AI 產生的 Pure Data 結構超出當下理解能力",
      discovery: "逐一追查 Patch 物件與連線時，發現有些模組無法自行說明或重建。",
      diagnosis: "先取得較完整的 AI 草稿，卻沒有同步建立每個物件、訊號路徑與映射決策的理解紀錄。",
      check: "把 Patch 拆成輸入、處理與輸出模組，逐項標記能解釋、能重建與仍需學習的部分。",
      correction: "不把該 Patch 當成完成作品；改以逆向拆解、最小模組重建與版本差異紀錄作為學習方法。",
      learning: "程式或 Patch 可以執行，不等於申請者已能獨立掌握；公開能力主張必須回到可解釋與可重建的證據。",
    },
  ],
  evidencePaths: [
    "docs/ai-workflow/portfolio-master-prompt.md",
    "docs/ai-workflow/portfolio-continuation-prompt.md",
    "docs/ai-workflow/prompt-changelog.md",
    "docs/ai-workflow/failure-cases.md",
  ],
};
