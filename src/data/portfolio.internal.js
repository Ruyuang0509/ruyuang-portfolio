export const internalStatusLabels = {
  completed: "Completed / 已完成",
  prototype: "Prototype / 原型中",
  inProgress: "In Progress / 整理中",
  missingMaterials: "Missing Materials / 待補資料",
  researchProposal: "Research Proposal / 研究構想",
  hiddenFromSubmission: "Hidden from Submission / 不進入送審版",
};

export const authoringNotes = {
  status: "目前作品仍含可替換範例內容；請在正式送審前換成真實作品、真實媒體與真實測試資料。",
  requiredCore: ["title", "year", "source", "summary", "problemAwareness", "audience"],
  optionalEvidence: ["diagrams", "visualDrafts", "screenshots", "videos", "audio", "demos", "testing"],
  warning:
    "待補欄位、範例指標與 planned evidence slots 是刻意保留的作者提示，不應被誤認為真實成果。",
};

export const portfolioPriorityRules = [
  "優先放入能展現 AI、互動媒體、聲響或沉浸式經驗的作品。",
  "每件作品都要回答：為什麼做、給誰用、如何互動、證據在哪裡。",
  "只有平面或概念稿時，也要補足流程、角色、技術方法與可深化方向。",
  "若是團隊作品，要明確標出個人負責的企劃、UX、介面、程式、影音或分析工作。",
  "作品敘事以公開內容為主，內部準備事項不納入正式內容。",
];

export const projectInternalNotes = {
  "interactive-sound-learning": {
    status: internalStatusLabels.prototype,
    labels: ["INTERNAL_TODO", "INTERNAL_REPLACE", "PRE_SUBMISSION_CHECK"],
    missingMaterials: [
      "待補：真實操作錄影；目前公開證據為站內 Web Audio prototype。",
      "待補：若完成 Pure Data patch、REAPER project 或聲音輸出，再加入真實媒體與 listening context。",
      "待補：使用者測試人數、任務完成率、主要問題與學習成效資料。",
    ],
    replaceableAssets: [
      "INTERNAL_REPLACE：credits 仍需依真實課程與合作狀態確認；不得自行補值。",
      "INTERNAL_REPLACE：若新增操作錄影，必須附字幕或視聽內容摘要。",
    ],
    sampleCopy:
      "INTERNAL_SAMPLE：公開狀態已改為原型中；正式使用者驗證完成前不得改為已完成。",
    aiCollaborationNotes:
      "AI 協作備註：可用生成式 AI 協助整理聲音互動腳本，但送審版需標示人為設計決策與資料來源。",
    riskReminders: [
      "風險提醒：不要把尚未測試的學習成效寫成已驗證成果。",
      "風險提醒：若新增影片，字幕與無障礙摘要在送審前必須補齊。",
    ],
    preSubmissionChecklist: [
      "PRE_SUBMISSION_CHECK：確認 demo 可開啟且不阻塞手機瀏覽。",
      "PRE_SUBMISSION_CHECK：確認 media caption 不再包含待補、可替換、範例等施工字眼。",
      "PRE_SUBMISSION_CHECK：確認 testing 欄位為真實資料，否則保持 public-safe research proposal 語氣。",
    ],
  },
  "generative-interface-study": {
    status: internalStatusLabels.prototype,
    labels: ["INTERNAL_TODO", "PRE_SUBMISSION_CHECK"],
    missingMaterials: [
      "待補：原始生成 Prompt log 與版本紀錄；公開頁的 Prompt Template v1 是 2026/07/17 依案例決策整理的衍生模板，不得回填成歷史執行紀錄。",
      "待補：學生測試、教師評閱或學習回饋；目前不得主張學習成效。",
      "待補：若旁白或對話版本完成，再補音訊層、混音核對紀錄與相應逐字稿。",
    ],
    replaceableAssets: [
      "INTERNAL_REPLACE：2026/07/17 已確認 Canva 短網址可在未登入狀態讀到 40 秒 Hamlet 專案內容，但會導向可編輯介面；完成分享權限與權利來源核對前不加入 submission CTA。",
      "INTERNAL_REPLACE：四個 ChatGPT share URL 只能在未登入頁讀到標題，對話內容顯示登入牆；目前從 submission UI 省略。",
    ],
    sampleCopy:
      "INTERNAL_SAMPLE：實際成片完成不等於教學成效已驗證，testing 必須維持 notValidated 直到有真實資料。",
    aiCollaborationNotes:
      "AI 協作備註：公開案例已分開說明 ChatGPT、生成式圖像工具、Suno、Canva 與人工核對的責任。",
    riskReminders: [
      "風險提醒：交付包未附八張生成圖與音樂的權利或來源清單，不得宣稱素材權利已獨立驗證。",
      "風險提醒：場景拆解可由實際成片核對，但圖像 Prompt 與 Suno Prompt 目前只能列為製作規格。",
    ],
    evidenceReadiness: {
      manifestPath: "docs/evidence/hamlet-media-manifest.json",
      formativeTestPlanPath: "docs/evidence/hamlet-formative-test-plan.md",
      rightsChecklistPath: "docs/evidence/hamlet-rights-checklist.md",
      verifiedEvidenceRefs: ["hamlet-clean-video", "hamlet-en-vtt", "hamlet-zh-vtt", "hamlet-storyboard-responsive"],
      derivedProcessRefs: ["hamlet-prompt-template-v1"],
      openGates: ["original-prompt-log", "formative-study-records", "applicant-rights-attestation"],
    },
    rightsReview: {
      status: "unverified",
      publicationGate: "requiresApplicantAttestation",
      applicantAttestation: {
        confirmed: false,
        confirmedBy: null,
        confirmedAt: null,
        evidenceRef: null,
      },
      items: ["scene-images", "music", "literary-source", "canva-project"],
    },
    preSubmissionChecklist: [
      "PRE_SUBMISSION_CHECK：執行 audit:evidence，確認 hash、VTT、逐字稿與 63 個 Hamlet public assets 一致。",
      "PRE_SUBMISSION_CHECK：確認 clean MP4、poster、雙語 WebVTT 與八幕畫面皆可從 Pages base path 載入。",
      "PRE_SUBMISSION_CHECK：確認 320–1440px 下 storyboard 可觸控、鍵盤聚焦且不造成全頁水平溢出。",
      "PRE_SUBMISSION_CHECK：確認 public copy 沒有把 Prompt Template、旁白或教學成效寫成已完成。",
    ],
  },
  "immersive-memory-map": {
    status: internalStatusLabels.missingMaterials,
    labels: ["INTERNAL_TODO", "HIDE_FROM_SUBMISSION"],
    missingMaterials: [
      "待補：真實場域資料、照片/影片序列與環境聲音。",
      "待補：Unity WebGL、Three.js 或影片導覽 prototype。",
      "待補：觀眾停留節點、記憶點回想與沉浸感評分。",
    ],
    replaceableAssets: [],
    sampleCopy:
      "INTERNAL_SAMPLE：若真實場域資料不足，可在 submission mode 維持研究構想，不要假裝是已完成展演。",
    aiCollaborationNotes:
      "AI 協作備註：可用 AI 協助整理場域敘事與 storyboard，但公開內容需清楚標示實際採集資料。",
    riskReminders: [
      "風險提醒：若涉及他人影像、聲音或地方資料，送審前需確認授權與隱私。",
      "風險提醒：重型 WebGL demo 不應自動載入，需使用點擊後載入策略。",
    ],
    hiddenFromSubmissionReason:
      "HIDE_FROM_SUBMISSION：已決定在正式送審版隱藏；draft 保留研究構想與素材缺口。",
    preSubmissionChecklist: [
      "PRE_SUBMISSION_CHECK：確認影片、聲音、demo 都有 poster、caption、transcript 或替代文字。",
      "PRE_SUBMISSION_CHECK：確認風險提醒已處理，不把內部備註公開。",
      "PRE_SUBMISSION_CHECK：確認 final build 通過 scan:submission。",
    ],
  },
  "data-visualization-cases": {
    status: internalStatusLabels.missingMaterials,
    labels: ["PUBLIC_VIDEO_OK", "NO_CAPTIONS_YET", "PRE_SUBMISSION_CHECK"],
    missingMaterials: [
      "待補：課程名稱或專案來源的正式名稱。",
      "待補：使用者確認目前無 15–25 秒網站預告、poster、主視覺與製作過程截圖資料。",
      "待補：公開影片目前無字幕；若未來補字幕，需新增 WebVTT 或字幕狀態說明。",
      "待補：若後續有觀眾回饋，才能新增 testing 或 learning outcomes。",
    ],
    replaceableAssets: [
      "INTERNAL_REPLACE：目前系列圖、作品封面與流程圖為公開安全的本地 SVG 示意素材。",
    ],
    aiCollaborationNotes:
      "AI 協作備註：生成式 AI 僅可描述為案例蒐整輔助，不可寫成自動完成研究判斷。",
    riskReminders: [
      "風險提醒：不可把案例分析寫成已驗證的數位學習成效。",
      "風險提醒：若引用第三方案例畫面，正式版需確認授權或改用自製示意圖。",
    ],
    preSubmissionChecklist: [
      "PRE_SUBMISSION_CHECK：確認公開 YouTube 影片可正常播放。",
      "PRE_SUBMISSION_CHECK：確認課程或專案來源的正式名稱。",
      "PRE_SUBMISSION_CHECK：確認公開 copy 沒有把 AI 蒐整誤寫成 AI 研究結論。",
    ],
  },
  "learning-dashboard-analysis": {
    status: internalStatusLabels.missingMaterials,
    labels: ["PRIVACY_SENSITIVE", "POWER_BI_GUARDRAIL", "PRE_SUBMISSION_CHECK"],
    missingMaterials: [
      "待補：清洗規則、資料筆數差異與部分 measure 定義仍需核對；實際分析結果未取得另行公開許可。",
      "待補：若 measure 修正完成，再更新觀看相關圖表文字；目前公開文案使用「不同數學成績分群的學習者／紀錄數」。",
      "待補：若未來產生含真實結果的操作紀錄，仍需先確認資料提供方許可與受控交付條件。",
    ],
    replaceableAssets: [
      "INTERNAL_REPLACE：實際結果 PNG/WebP 維持隔離；公開頁僅保留不含資料值的概念化 SVG。"
    ],
    riskReminders: [
      "最高優先：兩件資料視覺化作品彼此獨立，不可寫成同一研究的前後階段。",
      "最高優先：Power BI 圓環圖是 sn 的計數，不可寫成序號加總。",
      "最高優先：目前觀看直條圖使用非空值計數，不可稱為觀看時數比較。",
      "最高優先：視覺關聯不可宣稱為因果或學習成效證明。",
      "最高優先：原始資料、清洗檔、儀表板實作檔、實際截圖與含真實結果的操作紀錄不得進入公開 build。",
    ],
    preSubmissionChecklist: [
      "PRE_SUBMISSION_CHECK：確認 dist 不含原始資料、清洗檔、儀表板實作檔、實際截圖、受限影片連結或本機絕對路徑。",
      "PRE_SUBMISSION_CHECK：確認公開頁只說探索、觀察與後續研究問題，不說因果。",
      "PRE_SUBMISSION_CHECK：確認 scan:submission 與 content:check 通過。",
    ],
  },
};

export const getProjectInternalNotes = (projectId) => projectInternalNotes[projectId] ?? null;
// Codex-Fix: Move construction-stage terms into a draft-only module so submission builds can exclude them from runtime bundles.
