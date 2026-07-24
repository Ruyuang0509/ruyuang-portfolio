const publicAssetBase = import.meta.env?.BASE_URL ?? "/";
const publicAssetUrl = (assetPath) => `${publicAssetBase}${assetPath.replace(/^\/+/, "")}`;

export const pureDataLearningEvidence = {
  id: "pure-data-learning",
  title: "Pure Data 跨模態參數映射原型",
  status: "學習中／可操作功能原型",
  evidenceStatus: "可操作原型",
  validationStatus: "尚待驗證",
  version: "v0.2.1　本機功能測試",
  startedAt: "2026/07/24",
  purpose:
    "我用這個控制面板拆解跨模態映射如何從輸入值走到聲音參數，並練習說明每個物件、訊號路徑與安全控制。",
  description:
    "這段影片記錄 Pure Data 跨模態參數映射面板 v0.2.1 的本機功能測試。四組模擬控制值分別驅動立體聲聲像、音高、濾波截止頻率與增益，介面也包含 Preset、Reset、Panic 與輸出監看。目前 Pure Data 仍處於 AI 協作後的拆解與重建階段，這項內容用來呈現功能是否運作，以及我如何理解陌生 Patch，而不是證明我已能獨立完成整套系統。",
  tools: ["Pure Data 0.56.2", "本機螢幕錄影", "生成式 AI 協作"],
  roles: ["功能操作與核對", "訊號路徑逆向拆解", "學習限制與公開邊界整理"],
  media: {
    title: "v0.2.1 本機功能測試影片",
    src: publicAssetUrl("media/portfolio/pd-crossmodal-mapping-v0.2.1-operation-demo.mp4"),
    poster: publicAssetUrl("media/portfolio/pd-crossmodal-mapping-v0.2.1-operation-demo-poster.png"),
    mimeType: "video/mp4",
    width: 1276,
    height: 720,
    durationSeconds: 62.983,
    codecSummary: "H.264 影片／AAC 立體聲音訊",
    caption:
      "約 63 秒的原始本機操作紀錄：畫面依序操作四組模擬參數、Preset、Reset、Panic 與輸出 meters；影片含合成聲音，沒有把介面文字中的 validated 視為學術驗證。",
    accessibilitySummary:
      "下方觀看指南逐項說明畫面動作與應注意的聲音變化；核心資訊不依賴自動播放，也不需要只靠聲音理解。",
    fallbackMessage:
      "若瀏覽器無法播放影片，仍可依下方觀看指南、可證明事項與目前限制理解這份紀錄。",
  },
  viewingGuide: [
    "觀察水平控制值如何改變左右聲道增益。",
    "比較垂直控制值造成的音高差異。",
    "注意速度控制值如何改變濾波器明亮度。",
    "比較物件大小對輸出增益的影響。",
    "觀察 Panic 啟動後輸出是否回到靜音。",
  ],
  whatThisProves: [
    "原型可在本機執行，四組參數映射會回應控制值。",
    "介面含安全控制與輸出監看，影片記錄了實際操作。",
    "申請者正以真實 Patch 作為逆向拆解與模組重建的學習材料。",
  ],
  whatThisDoesNotProve: [
    "不能證明申請者獨立完成整份 Patch。",
    "不能證明原型已完成使用者驗證，或四組映射客觀上最適合一般使用者。",
    "不能證明攝影機手勢辨識、物件追蹤或感測器輸入已完成；目前輸入是模擬視覺參數。",
    "不能把這份功能紀錄視為可直接進行學術實驗的正式系統。",
  ],
  authorship:
    "我負責操作核對、公開敘事、限制判斷與後續拆解；初版 Patch 並非由我獨立完成。",
  aiAssistance:
    "初版 Patch 曾使用 AI 協作；目前的學習重點是逆向拆解訊號路徑、理解物件功能、測試輸入與輸出，並逐步重新建立可由本人說明與修改的模組。",
  rights:
    "本輪由申請者提供影片作為作品集學習紀錄。Patch 原檔與版本資料未放入公開 Repository；影片呈現功能操作，不主張 Pure Data 軟體介面或 AI 草稿由申請者獨立創作。",
  limitations: [
    "原始錄影的視窗標題列會顯示本機 D 槽專案路徑；公開頁不重複該路徑，但影片畫面仍可看見。",
    "原始介面含 validated 字樣；本頁一律修正為「本機功能測試」，不將其解讀為使用者、學術或研究驗證。",
    "錄影中的部分右側 Preset 標籤與下方 Patch 區塊超出畫面邊界，不能當成完整介面導覽。",
    "目前影片是原始功能紀錄，尚未加入分段標題、放大訊號路徑或完整作品集版旁白。",
  ],
  nextStep:
    "先獨立重建一條最小訊號路徑並逐物件說明，再錄製一支完整框取、隱去本機路徑、改正 validated 用語且約 60–70 秒的作品集版本。",
  evidenceLinks: [
    {
      type: "video",
      label: "Pure Data v0.2.1 本機功能測試",
      href: publicAssetUrl("media/portfolio/pd-crossmodal-mapping-v0.2.1-operation-demo.mp4"),
    },
  ],
  submissionVisibility: "public",
};

export const representativeWorks = [
  {
    id: "huaben-short-film",
    title: "《畫本》",
    type: "影片短劇",
    status: "已完成",
    evidenceStatus: "申請者提供的完成作品紀錄",
    validationStatus: "未主張競賽結果",
    context: "參與第 15 屆感動久久競賽",
    summary:
      "《畫本》是我第一次完整面對故事構思、攝影與剪輯流程的短劇作品。實際投入後，我才理解一段看似自然的畫面，背後需要素材取捨、節奏安排、聲畫配合與反覆修正。這次經驗也成為我之後從「觀看作品」走向「拆解作品如何成立」的重要轉折。",
    purpose: "以原創短劇練習把故事構思轉成可拍攝、可剪輯的聲畫敘事。",
    tools: ["Samsung S24 Ultra", "DaVinci Resolve"],
    roles: ["故事構思", "攝影", "剪輯"],
    evidenceLinks: [],
    whatThisProves: [
      "申請者提供的紀錄支持其參與原創影音製作、故事發展、鏡位取捨與剪輯節奏。",
      "作品反思能說明如何透過線上學習補足拍攝與剪輯流程。",
    ],
    whatThisDoesNotProve: [
      "目前公開頁沒有成片或活動紀錄可供逐鏡核對。",
      "參賽不代表得獎；本頁不主張名次、評語、觀看數或其他競賽結果。",
    ],
    authorship: "本人負責故事構思、攝影與剪輯；其他演出、音樂、場地與協作 credit 仍需依原始紀錄核對。",
    aiAssistance: "目前沒有可核對的 AI 協作紀錄，本頁不作 AI 參與主張。",
    rights: "成片、人物影像、音樂、場地與競賽公開範圍尚未完成公開權利核對，因此本頁不嵌入影片。",
    limitations: "目前可公開內容限於申請者提供的作品名稱、角色、工具與參賽情境。",
    nextStep: "整理權利可公開的成片或節錄、完整 credit、作品日期與活動紀錄，再補上可核對連結。",
    submissionVisibility: "public",
  },
  {
    id: "hope-feathers-wings-mv",
    title: "《希望有羽毛和翅膀》個人 MV 混剪",
    type: "非商業二次創作／課程練習",
    status: "已完成",
    evidenceStatus: "申請者提供的完成作品紀錄",
    validationStatus: "未確認公開授權",
    summary:
      "這項練習聚焦選曲、媒體研究、畫面取材、素材篩選與剪輯節奏，也讓我正視二次創作政策、素材權利與粉絲觀感之間的界線。",
    purpose: "在既有角色、影像與音樂限制下，練習素材判斷、段落安排與聲畫節奏。",
    tools: [],
    roles: ["選曲", "畫面取材", "素材篩選", "剪輯"],
    evidenceLinks: [],
    whatThisProves: [
      "申請者提供的紀錄支持其進行素材研究、選擇判斷與剪輯節奏練習。",
      "本案可說明申請者知道二次創作必須揭露來源與權利邊界。",
    ],
    whatThisDoesNotProve: [
      "不能把原始角色、動畫影像或音樂列為申請者的原創成果。",
      "目前公開頁沒有成片、課程紀錄或授權資料可供核對。",
    ],
    authorship: "本人只主張選曲、素材研究、畫面取材、篩選與剪輯。",
    aiAssistance: "目前沒有可核對的 AI 協作紀錄，本頁不作 AI 參與主張。",
    rights:
      "本作為非商業課程練習。角色、原始動畫影像與音樂權利屬原權利人；本人負責選曲、素材研究、畫面取材、篩選與剪輯。",
    limitations: "第三方素材的公開展示權尚未確認，因此本頁只保留文字紀錄，不嵌入成片或原素材。",
    nextStep: "先完成素材來源與公開範圍清單；只有取得適合送審公開的版本後，才加入影片或連結。",
    submissionVisibility: "public",
  },
];

export const supportingEvidenceLinks = [
  {
    label: "可核對影音交付",
    title: "AI 文學故事 MV",
    description: "40 秒成片、雙語字幕與八幕畫面可核對；教學成效與素材發布權利仍未確認。",
    target: "#generative-interface-study",
  },
  {
    label: "可核對分析方法",
    title: "資料視覺化案例",
    description: "呈現案例蒐集、內容選擇與敘事分析；不把案例分析寫成使用者成效。",
    target: "#data-visualization-cases",
  },
  {
    label: "公開邊界案例",
    title: "Power BI 學習資料探索",
    description: "只公開方法與概念化版面，真實資料、結果與受限媒體維持隔離。",
    target: "#learning-dashboard-analysis",
  },
];

export const collaborationEvidence = [
  {
    title: "系統化",
    evidence: [
      "兩度擔任民雄動漫社社長，整理社團規章、Discord 遷移、雲端資料、帳號與交接資訊。",
      "申請者提供的任期紀錄顯示，第一任期登記社員由 6 人增加至 17 人；本頁不把成長原因簡化為單一措施。",
    ],
  },
  {
    title: "具韌性",
    evidence: [
      "在餐飲工作面對任務壓力與回饋後持續調整執行方式，建立較穩定的職場心態。",
      "在私人英語補習班與青年旅遊數位行銷工作中，持續適應不同對象、任務節奏與溝通情境。",
    ],
  },
  {
    title: "能調整角色",
    evidence: [
      "畢業專題遇到創意卡關時，主動說明限制並與組員協調角色。",
      "轉向器材、製作協調與展出準備，避免個人卡關中斷團隊進度。",
    ],
  },
];

export const learningRoadmap = [
  {
    status: "已有可核對證據",
    items: ["Web Audio 可操作原型", "Pure Data v0.2.1 功能測試影片", "網站建置與內容整理", "現有影音作品與案例資料"],
  },
  {
    status: "正在學習",
    items: ["Pure Data 訊號流程", "模組重建", "聲音參數映射", "AI 產出驗證"],
    note: "Pure Data 開始日期：2026/07/24。",
  },
  {
    status: "尚未形成作品",
    items: ["REAPER", "多聲道路由", "空間聲音製作", "聲學量測"],
  },
  {
    status: "研究所階段",
    items: ["心理聲學", "聲學專業", "空間音訊", "混合監聽", "實驗設計", "監聽轉譯"],
  },
];

export const finalPortfolioLinks = [
  {
    label: "目前作品集",
    href: "https://ruyuang0509.github.io/ruyuang-portfolio/",
    description: "本頁的正式 GitHub Pages 專案網址。",
  },
  {
    label: "GitHub Repository",
    href: "https://github.com/Ruyuang0509/ruyuang-portfolio",
    description: "可查看網站原始碼與公開文件；Repository 為公開範圍，不等同所有媒體權利已核准。",
  },
];
