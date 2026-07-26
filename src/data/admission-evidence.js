const publicAssetBase = import.meta.env?.BASE_URL ?? "/";
const publicAssetUrl = (assetPath) => `${publicAssetBase}${assetPath.replace(/^\/+/, "")}`;

export const pureDataLearningEvidence = {
  id: "pure-data-learning",
  title: "Pure Data 跨模態參數映射原型",
  status: "學習中／可操作功能原型",
  version: "v0.2.1　本機功能測試",
  startedAt: "2026/07/24",
  purpose:
    "這是我開始學習 Pure Data 後整理的跨模態參數映射原型。影片記錄四組模擬控制值如何改變聲像、音高、濾波亮度與增益，也保留 Preset、Reset、Panic 與輸出監看。",
  description:
    "初版 Patch 曾使用 AI 協作；我正透過訊號路徑拆解與局部重建，逐步把「能運作」轉成「能理解、能說明、能修改」。",
  tools: ["Pure Data 0.56.2", "本機螢幕錄影", "生成式 AI 協作"],
  roles: ["功能操作與紀錄", "訊號路徑拆解", "局部模組重建"],
  media: {
    title: "v0.2.1 本機功能測試影片",
    src: publicAssetUrl("media/portfolio/pd-crossmodal-mapping-v0.2.1-operation-demo.mp4"),
    poster: publicAssetUrl("media/portfolio/pd-crossmodal-mapping-v0.2.1-operation-demo-poster.png"),
    mimeType: "video/mp4",
    width: 1276,
    height: 720,
    durationSeconds: 62.983,
    caption:
      "約 63 秒的操作紀錄依序呈現四組模擬參數、Preset、Reset、Panic 與輸出監看，影片包含合成聲音。",
    accessibilitySummary:
      "下方觀看指南逐項說明畫面動作與聲音變化；核心資訊不依賴自動播放，也不需要只靠聲音理解。",
    fallbackMessage:
      "若瀏覽器無法播放影片，仍可依觀看指南與原型說明理解這次功能測試。",
  },
  viewingGuide: [
    "觀察水平控制值如何改變左右聲道增益。",
    "比較垂直控制值造成的音高差異。",
    "注意速度控制值如何改變濾波器亮度。",
    "比較物件大小對輸出增益的影響。",
    "觀察 Panic 啟動後輸出是否回到靜音。",
  ],
  completed: [
    "四組模擬參數會回應控制值並改變聲音。",
    "介面保留 Preset、Reset、Panic 與輸出監看。",
    "功能測試影片已記錄實際操作流程。",
  ],
  authorshipNote:
    "初版 Patch 曾使用 AI 協作；我負責操作測試、訊號路徑拆解、功能說明與後續局部重建。",
  versionNote:
    "影片記錄 v0.2.1 的四組映射與安全控制；下一次整理會加入完整框取、分段提示，以及一條可逐物件說明的訊號路徑。",
  nextStep:
    "先獨立重建一條最小訊號路徑並逐物件說明，再把操作、畫面與聲音整理成更完整的作品集版本。",
  evidenceLinks: [
    {
      type: "video",
      label: "觀看 Pure Data 功能測試",
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
    context: "第 15 屆感動久久競賽參賽作品",
    summary:
      "《畫本》是我第一次完整面對故事構思、攝影與剪輯流程的短劇作品。從畫面取材、節奏安排到聲畫配合，我開始理解一段看似自然的影像，背後需要反覆選擇與修正。這次製作也讓我從觀看作品的人，逐步轉向拆解作品如何成立的創作者。",
    purpose: "以原創短劇練習把故事構思轉成可拍攝、可剪輯的聲畫敘事。",
    tools: ["Samsung S24 Ultra", "DaVinci Resolve"],
    roles: ["故事構思", "攝影", "剪輯"],
    highlights: ["原創影音敘事", "攝影取材", "剪輯節奏", "自主學習"],
    reflection:
      "這次製作讓我第一次從完成作品回看故事、鏡位與剪輯如何互相影響，也成為我後續整理影音敘事方法的起點。",
    materialsNote:
      "我負責故事構思、攝影與剪輯；其他演出、音樂與製作資訊以原始作品紀錄為準。",
    evidenceLinks: [
      {
        type: "video",
        label: "觀看完整作品",
        href: "https://www.youtube.com/watch?v=mJ9o_u1W2cY",
      },
    ],
    submissionVisibility: "public",
  },
  {
    id: "hope-feathers-wings-mv",
    title: "《希望有羽毛和翅膀》個人 MV 混剪",
    type: "非商業二次創作／課程練習",
    status: "已完成",
    summary:
      "這項課程練習聚焦選曲、畫面取材、素材篩選與剪輯節奏。由於使用既有角色、動畫影像與音樂，我也在製作過程中開始正視二次創作政策、素材來源與觀眾既有印象之間的界線。",
    purpose: "在既有角色、影像與音樂素材中，練習段落安排、取材判斷與聲畫節奏。",
    tools: [],
    roles: ["選曲", "素材研究", "畫面取材", "篩選與剪輯"],
    highlights: ["素材研究", "畫面取捨", "聲畫節奏", "二次創作邊界"],
    reflection:
      "這次練習讓我理解，剪輯選擇除了節奏與情緒，也必須同時考慮素材來源、作品脈絡與觀眾原有印象。",
    materialsNote:
      "本作為非商業課程練習。原始角色、動畫影像與音樂權利屬原權利人；我負責選曲、素材研究、畫面取材、篩選與剪輯。",
    evidenceLinks: [
      {
        type: "video",
        label: "觀看 MV 練習",
        href: "https://www.youtube.com/watch?v=9VznR4XSiM0",
      },
    ],
    submissionVisibility: "public",
  },
];

export const supportingEvidenceLinks = [
  {
    label: "影音與生成式 AI",
    title: "AI 文學故事 MV",
    description: "觀看 40 秒成片、雙語字幕與八幕敘事設計，並了解我如何分配生成與人工判斷。",
    target: "#generative-interface-study",
  },
  {
    label: "資料敘事",
    title: "資料視覺化案例",
    description: "從案例蒐集、內容選擇到影片編排，查看我如何整理資料故事的閱讀節奏。",
    target: "#data-visualization-cases",
  },
  {
    label: "學習資料探索",
    title: "Power BI 學習資料介面",
    description: "查看欄位整理、篩選方式與概念化介面；個人學習資料不直接呈現在公開頁面。",
    target: "#learning-dashboard-analysis",
  },
];

export const collaborationEvidence = [
  {
    title: "系統化",
    evidence: [
      "兩度擔任民雄動漫社社長，整理社團規章、Discord 遷移、雲端資料、帳號與交接資訊。",
      "第一任期的登記社員數由 6 人增至 17 人；我把它視為任期結果，不將變化歸因於單一措施。",
    ],
  },
  {
    title: "具韌性",
    evidence: [
      "在餐飲工作面對任務壓力與回饋後，我持續調整執行方式，逐步建立較穩定的工作節奏。",
      "在私人英語補習班與青年旅遊數位行銷工作中，我練習適應不同對象、任務節奏與溝通情境。",
    ],
  },
  {
    title: "能調整角色",
    evidence: [
      "畢業專題遇到創意卡關時，我主動說明限制並與組員協調角色。",
      "我轉向器材、製作協調與展出準備，讓團隊工作能繼續推進。",
    ],
  },
];

export const learningRoadmap = [
  {
    status: "已完成與可操作",
    items: ["Web Audio 可操作原型", "Pure Data v0.2.1 功能測試影片", "網站建置與內容整理", "影音與資料作品整理"],
  },
  {
    status: "正在學習",
    items: ["Pure Data 訊號流程", "模組重建", "聲音參數映射", "AI 協作內容的理解與重建"],
    note: "Pure Data 開始日期：2026/07/24。",
  },
  {
    status: "下一階段",
    items: ["REAPER 實作", "多聲道路由", "空間聲音製作", "聲學量測"],
  },
  {
    status: "研究所學習方向",
    items: ["心理聲學", "聲學專業", "空間音訊", "混合監聽", "實驗設計", "監聽轉譯"],
  },
];

export const finalPortfolioLinks = [
  {
    label: "線上作品集",
    href: "https://ruyuang0509.github.io/ruyuang-portfolio/",
    description: "查看聲響互動、Pure Data、影音與資料視覺化作品。",
  },
  {
    label: "GitHub Repository",
    href: "https://github.com/Ruyuang0509/ruyuang-portfolio",
    description: "查看網站原始碼、公開文件與版本紀錄。",
  },
];
