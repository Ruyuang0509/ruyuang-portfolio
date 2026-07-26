import { hiddenProjectCaseStudies } from "#portfolio-hidden";

const publicAssetBase = import.meta.env?.BASE_URL ?? "/";
const publicAssetUrl = (assetPath) => `${publicAssetBase}${assetPath.replace(/^\/+/, "")}`;

const responsivePortfolioImage = (slug, width, height, alt) => ({
  src: publicAssetUrl(`media/portfolio/${slug}-1200.webp`),
  avifSrcSet: `${publicAssetUrl(`media/portfolio/${slug}-420.avif`)} 420w, ${publicAssetUrl(`media/portfolio/${slug}-640.avif`)} 640w, ${publicAssetUrl(`media/portfolio/${slug}-1200.avif`)} 1200w`,
  webpSrcSet: `${publicAssetUrl(`media/portfolio/${slug}-420.webp`)} 420w, ${publicAssetUrl(`media/portfolio/${slug}-640.webp`)} 640w, ${publicAssetUrl(`media/portfolio/${slug}-1200.webp`)} 1200w`,
  width,
  height,
  alt,
});

const mediaAsset = (slug, alt) => responsivePortfolioImage(slug, 1200, 1500, alt);
// Codex-Fix: Keep public media metadata local, responsive, and free from remote demo CDNs.

const svgAsset = (slug, width, height, alt) => ({
  src: publicAssetUrl(`media/data-visualization/${slug}.svg`),
  width,
  height,
  alt,
});
// Codex-Fix: Use public-safe local SVG evidence placeholders for data-visualization works without exposing private datasets.

const evidenceImage = (slug, title, caption, alt) => ({
  type: "image",
  title,
  caption,
  image: mediaAsset(slug, alt),
});

const svgEvidence = (slug, title, caption, alt, width = 1200, height = 900) => ({
  type: "image",
  title,
  caption,
  image: svgAsset(slug, width, height, alt),
});
// Codex-Fix: Let case studies reference lightweight local SVG diagrams through the same public media shape.

const diagramEvidence = (slug, diagramType, title, caption, alt) => ({
  type: diagramType,
  title,
  caption,
  description: caption,
  image: mediaAsset(slug, alt),
});

export const instituteThemes = ["AI", "互動媒體", "聲響", "沉浸式體驗", "數位孿生", "跨域創生"];

export const publicStatusLabels = {
  completed: "已完成",
  prototype: "原型中",
  inProgress: "整理中",
  researchProposal: "研究構想",
};
// Codex-Fix: Public-safe statuses are separated from internal readiness labels.

export const homepageNarrative = {
  eyebrow: "116學年度研究所申請作品集｜聲響、互動與數位學習",
  headline: "從數位學習與視覺敘事出發，走向聲響互動與空間監聽研究。",
  headlineLines: [
    ["從數位學習與", "視覺敘事", "出發，"],
    ["走向", "聲響互動與", "空間監聽", "研究。"],
  ],
  supportingLine:
    "讓視覺成為聲音的入口，也讓抽象的聽覺差異成為可以理解、操作與討論的經驗。",
  introduction:
    "我是蕭智仁，現就讀國立嘉義大學數位學習設計與管理學系，預計 2026 年畢業。我的作品從視覺設計、影音剪輯、互動介面與學習內容整理出發，逐步延伸到 Web Audio 聲響互動；自 2026/07/24 起，我也開始拆解由 AI 協作產生的 Pure Data 初版 Patch，練習理解與重建訊號路徑。",
  currentEvidence:
    "現在可以直接體驗的是 Web Audio 跨模態映射原型；Pure Data 則記錄我如何從 AI 協作的初版 Patch 出發，逐步拆解、理解與重建訊號流程。",
  researchStatement:
    "我希望將視覺化、資訊架構與使用者理解方法帶入聲響研究，探討精簡揚聲器與開放式耳機能否組成較低門檻的混合多聲道監聽方式。",
  primaryCta: { label: "體驗聲響互動原型", target: "#interactive-sound-learning-demo" },
  secondaryCta: { label: "查看學習與研究路線", target: "#learning-roadmap" },
  thesis:
    "我希望將視覺化、資訊架構與使用者理解方法，帶入精簡揚聲器與開放式耳機混合監聽系統的研究。",
  researchQuestion:
    "如何以視覺化校準介面，協助小型創作者理解、建置與操作混合多聲道監聽系統？",
  credibility:
    "作品集以可操作的 Web Audio 原型為核心，也呈現 Pure Data 學習紀錄、影音與資料作品；混合多聲道監聽仍是我準備在研究所階段深入探索的方向。",
  argument:
    "網站依序整理我轉向聲音的問題意識、Web Audio 原型、Pure Data 學習紀錄、代表作品與申請階段研究構想，讓每一段經驗都能回到我實際做過的選擇與方法。",
  soundTransition: {
    turningPoint:
      "2020 年的一次聆聽經驗，讓我開始注意同一段聲音在不同播放方式下會呈現不同的距離、位置與細節，也讓我想追問這些差異如何被理解。",
    problem:
      "當時我能找到的說明多半依賴器材玩家熟悉的術語。對剛進入聲音領域的人而言，聽見差異並不等於能描述差異，更不等於知道如何操作與比較。",
    method:
      "數位學習訓練讓我習慣拆解抽象概念、安排理解順序；視覺敘事與資訊架構則讓我能把關係轉成可見的介面。這些方法成為我進入聲響互動與空間監聽研究的起點。",
  },
  logicChain: ["數位學習與視覺敘事", "聲音描述門檻", "Web Audio 與 Pure Data 實作", "混合監聽研究構想"],
  reviewerPaths: [
    {
      label: "先從操作開始",
      title: "Web Audio 跨模態映射",
      description: "直接操作四組聲音參數，感受位置、速度與大小如何改變聲音。",
      target: "#interactive-sound-learning",
    },
    {
      label: "聲音工具學習",
      title: "Pure Data v0.2.1",
      description: "觀看功能測試，了解我如何從 AI 協作的初版 Patch 開始拆解與重建。",
      target: "#pure-data-learning",
    },
    {
      label: "影音敘事",
      title: "《畫本》與代表作品",
      description: "從原創短劇的故事、攝影與剪輯出發，認識我的影音製作方法。",
      target: "#selected-work",
    },
    {
      label: "研究方向",
      title: "混合監聽研究構想",
      description: "閱讀我關注的問題、初步構想，以及準備帶入研究所的能力與學習重點。",
      target: "#research-positioning",
    },
    {
      label: "學習路線",
      title: "聲音學習與研究路線",
      description: "從已完成的原型、正在學習的工具，一路看到研究所階段想探索的方向。",
      target: "#learning-roadmap",
    },
    {
      label: "AI 協作方式",
      title: "AI 如何參與網站製作",
      description: "了解 AI 協助了哪些工作、我做了哪些決定，以及我如何從錯誤中修正做法。",
      target: "#ai-workflow",
    },
  ],
};
// Codex-Fix: Public homepage copy now describes the portfolio strategy without construction-stage reminders.

export const dataVisualizationSeries = {
  id: "data-visualization-series",
  title: "資料視覺化與數位學習應用",
  subtitle: "Data Visualization in Digital Learning",
  kicker: "兩件獨立作品・資料敘事・Power BI",
  summary:
    "這組案例包含兩件目的不同的作品：一件分析 Spotify Wrapped 等資料故事如何安排閱讀節奏，另一件以 Power BI 整理學習互動與成績資料。它們都關注資料如何被理解，但採用的素材、方法與呈現方式不同。",
  independenceNote:
    "兩件作品分別處理資料敘事與學習資料探索，使用的資料、方法與目的不同。",
  cover: svgAsset(
    "series-cover",
    1200,
    900,
    "資料視覺化與數位學習應用系列封面，以節點、折線與介面卡片呈現。",
  ),
  works: ["data-visualization-cases", "learning-dashboard-analysis"],
  capabilities: [
    "我先決定讀者需要看見的重點，再安排圖表、文字與動畫的閱讀順序。",
    "在 Power BI 專案中，我整理互動紀錄、影片觀看與成績欄位，建立可篩選的資料探索介面。",
    "公開展示聚焦方法、介面與分析流程；涉及個人學習資料的內容不直接公開。",
    "後續希望進一步探索以聲音輔助資料閱讀與互動回饋。",
  ],
  reflection:
    "這兩件作品讓我更在意圖表是否能被理解，而不只是形式是否吸引人。",
  soundExtension:
    "下一步，我希望嘗試把互動節奏與資料變化轉成可聆聽的提示，作為聲響化研究的起點。",
};
// Codex-Fix: Add a public-safe data-visualization series model while explicitly preserving work independence.

export const researchTracks = [
  {
    id: "ai-interactive-learning-creation",
    title: "AI 與互動式創作",
    purpose: "我用生成式 AI 整理內容與製作草稿；作品取捨、事實核對與最後驗收由我負責。",
    includes: ["生成式 AI 工具", "提示詞設計流程", "AI 輔助介面", "人機協作"],
    instituteAlignment: ["AI", "互動媒體", "跨域創生"],
  },
  {
    id: "interactive-media-ux",
    title: "互動媒體與使用者經驗",
    purpose: "我從使用者要做的動作、收到的回饋與可能卡住的地方，安排介面和互動流程。",
    includes: ["互動流程", "UX／UI", "原型測試", "感測或回饋機制"],
    instituteAlignment: ["互動媒體", "沉浸式體驗"],
  },
  {
    id: "multimedia-video-sound",
    title: "影音聲響敘事",
    purpose: "我用剪輯、聲音與畫面節奏說明故事，也想測試它們是否會影響互動時的注意力。",
    includes: ["影片剪輯", "聲音設計", "動態影像", "情緒節奏"],
    instituteAlignment: ["聲響", "沉浸式體驗", "跨域創生"],
  },
  {
    id: "edtech-digital-content",
    title: "數位內容與學習設計",
    purpose: "我把學習目標與內容順序寫成資訊架構、互動腳本和清楚的操作提示。",
    includes: ["內容架構", "學習流程", "互動腳本", "成效評估"],
    instituteAlignment: ["互動媒體", "跨域創生"],
  },
  {
    id: "user-research-outcomes-process",
    title: "使用者研究與成效資料",
    purpose: "我想用任務觀察、訪談與學習成效資料，了解使用者如何理解設計，再把觀察帶回下一輪調整。",
    includes: ["使用者測試", "學習成效", "質性觀察", "迭代紀錄"],
    instituteAlignment: ["AI", "數位孿生", "跨域創生"],
  },
];

export const learningTrail = [
  {
    id: "web-audio",
    title: "Web Audio",
    status: "可操作原型",
    validationStatus: "下一步：使用者觀察",
    evidence: "我已用瀏覽器原生 Web Audio API，把位置、速度與大小連到聲像、音高、濾波亮度與音量，做成可直接操作的四組映射。",
  },
  {
    id: "pure-data",
    title: "Pure Data",
    status: "學習中",
    startedAt: "2026/07/24",
    evidence: "v0.2.1 功能測試影片記錄四組參數映射、Preset、Reset、Panic 與輸出監看。",
    aiAssistance: "初版 Patch 曾使用生成式 AI 協作；我正透過訊號路徑拆解與局部重建，逐步練習解釋與修改每個模組。",
  },
  {
    id: "reaper",
    title: "REAPER",
    status: "學習中",
    evidence: "我已完成軟體安裝，下一步會從路由、效果鏈與基礎混音練習開始累積作品。",
  },
];

export const terminologyMap = [
  ["教學設計", "互動體驗設計", "我先寫清楚學習目標與任務，再決定使用者要做什麼、會收到什麼回饋。"],
  ["教材架構", "資訊架構／IA", "我整理內容層級、導覽節點與閱讀順序，讓使用者知道下一步在哪裡。"],
  ["學習活動", "互動腳本／User Flow", "我把活動拆成觸發、選擇、回饋與完成條件，再做成可操作流程。"],
  ["學習成效", "學習成效評估", "我先定義要觀察的學習表現，再用任務結果、問卷或訪談檢查。"],
  ["影片教材", "影音敘事／Motion & Sound", "我用剪輯、聲音、節奏與構圖安排觀看順序和情緒。"],
  ["跨域專題", "跨域創生／Creative Technology", "一件跨域作品會同時用到設計、程式、影音與研究方法；我會交代各部分做了什麼，以及目前的限制。"],
];

export const projectCaseStudies = [
  {
    id: "interactive-sound-learning",
    slug: "interactive-sound-learning",
    title: "互動聲響學習原型",
    titleLines: [["互動聲響"], ["學習原型"]],
    year: "2026",
    category: "互動學習",
    source: "課程專題／研究整理",
    statusKey: "prototype",
    status: "可操作原型",
    submissionVisibility: "public",
    featured: true,
    priority: 1,
    summary:
      "我把畫面中的水平位置、垂直位置、移動速度和物件大小，分別連到聲像、音高、濾波亮度與音量。使用者拖動控制點時，可以直接聽見參數改變。",
    valueProposition: "下一輪要測的是：使用者能否辨認左右、高低、快慢與大小所造成的聲音變化。",
    whatThisProves: "我用 React 與 Web Audio 完成可操作原型，設計四組視聽映射，並加入鍵盤控制、停止功能與不支援時的替代提示。",
    designGoal: "讓使用者拖動控制點時，立即聽見左右聲像、音高、音色與音量的改變。",
    designProcess:
      "我先拆解學習任務，再決定四組視聽對應，最後用 React 和 Web Audio API 做成原型。使用者觀察尚未開始。",
    technologyAndMedia:
      "我用 React、HTML／CSS／JavaScript 與瀏覽器原生 Web Audio API 合成聲音，控制聲像、音高、濾波亮度與音量；原型不載入遠端音訊。",
    outcomeShowcase:
      "目前版本先確認互動、聲音映射與操作流程是否能穩定運作；映射是否容易理解，仍需要後續使用者觀察。",
    researchQuestion: "使用者是否能從聲像、音高、濾波亮度與音量的變化，聽懂畫面中的位置、速度與大小？",
    interactionMappings: [
      { id: "horizontal-pan", input: "水平位置", parameter: "左右聲像", rationale: "我把控制點的水平位置連到左右聲像，畫面往哪邊移，聲音就往哪邊移。", inputRange: [0, 1], outputRange: [-0.85, 0.85] },
      { id: "vertical-pitch", input: "垂直位置", parameter: "音高", rationale: "控制點越高，音高越高；控制點越低，音高越低。", inputRange: [0, 1], outputRange: [660, 110] },
      { id: "speed-brightness", input: "移動速度／亮度滑桿", parameter: "濾波亮度", rationale: "拖動越快，音色越亮；使用滑桿時，也可以直接調整亮度。節奏密度不在這一版的範圍內。", inputRange: [0, 1], outputRange: [700, 5000] },
      { id: "size-loudness", input: "物件大小", parameter: "音量", rationale: "物件變大時，音量會在受控範圍內提高。這是設計映射，不是正式響度測量。", inputRange: [0, 1], outputRange: [0.04, 0.12] },
    ],
    signalFlow: [
      "使用者輸入：滑鼠／觸控／鍵盤",
      "數值正規化",
      "聲音參數映射",
      "Oscillator：三角波振盪器",
      "Filter：低通濾波器",
      "Gain / Envelope：受控音量與啟停包絡",
      "Stereo Panner：左右聲像",
      "Compressor：動態範圍壓縮",
      "Master Output：主音量與裝置輸出",
    ],
    listeningGuide: [
      "先把控制點左右移動，聽聲音是否跟著換邊。",
      "再比較控制點位於上方與下方時的音高。",
      "快速移動時留意音色變亮；放慢後，音色會回到較柔和的狀態。",
      "調整物件大小，聽音量如何在受控範圍內改變；這不是正式響度測量。",
    ],
    interactivePrototype: {
      type: "webAudioSpatialMapper",
      status: "prototype",
      instructions: {
        pointer: "拖曳控制點改變左右聲像、音高與濾波亮度。",
        keyboard: "使用四個滑桿調整水平、垂直、大小與濾波亮度；Escape 可停止聲音。",
      },
    },
    trackIds: ["interactive-media-ux", "multimedia-video-sound", "edtech-digital-content", "user-research-outcomes-process"],
    cover: mediaAsset("mv-urban", "深綠、亮綠與米白幾何圖形組成的直式封面，可見「URBAN RHYTHM」字樣。"),
    problemAwareness:
      "只靠文字說明時，位置、速度與大小的變化不一定容易被注意。我想試著用聲音補上即時回饋。",
    audience: "這個原型預設給需要透過操作理解抽象關係的學習者，也可供想把影音內容做成互動教材的創作者參考。",
    diagrams: [
      diagramEvidence(
        "gd-kinetic",
        "interactionFlow",
        "互動原型的視覺方向",
        "流程由文字與站內原型說明；配圖只呈現深綠、亮綠與米白的視覺方向，不是流程圖。",
        "深綠、亮綠與米白抽象圖形，可見「KINETIC CAMPAIGN」字樣；僅供視覺方向參考。",
      ),
      diagramEvidence(
        "ph-geometry",
        "systemArchitecture",
        "聲響主題的視覺方向",
        "聲音處理順序列在下方；配圖只是綠、亮綠與灰色的視覺參考，不是技術架構圖。",
        "綠、亮綠與灰色抽象圖形，可見「QUIET GEOMETRY」字樣；僅供視覺方向參考。",
      ),
      diagramEvidence(
        "gd-analog",
        "informationArchitecture",
        "介面風格的視覺方向",
        "任務、操作與回饋的層級由站內介面呈現；配圖只表示淡紫、米白與藍綠的視覺方向。",
        "淡紫、米白與藍綠抽象圖形，可見「ANALOG TYPE」字樣；僅供視覺方向參考。",
      ),
    ],
    media: { visualDrafts: [], screenshots: [], videos: [], audio: [], demos: [] },
    tools: ["React", "Web Audio API", "HTML/CSS/JS", "Figma"],
    roles: ["企劃", "教學設計", "UX", "介面設計", "程式", "聲音設計"],
    testing: {
      statusKey: "notValidated",
      status: "下一步將進行使用者觀察，確認四組映射是否容易辨認與操作。",
      metrics: [], insights: [], learningOutcomes: [],
      plannedMethods: ["先不提供說明，觀察使用者能否辨識左右聲像與高低音的對應。", "安排短任務，記錄完成情形、操作錯誤與口述理解。", "比較減少動態效果模式與不同輸入方式下的操作理解情形。"],
    },
    reflection: {
      strengths: "我已把位置、速度與大小連到四個可操作的聲音參數，並完成瀏覽器原型。",
      limitations: "下一輪會補上操作觀察與口述紀錄，了解使用者如何理解四組映射。",
      graduateDirection: "進入研究所後，我想先測試四組映射是否容易理解，再評估加入空間聲音、感測器或 AI 回饋。",
    },
    instituteConnections: ["互動媒體", "聲響", "沉浸式體驗", "跨域創生"],
    themeEvidenceStatus: {
      互動媒體: "demonstrated",
      聲響: "demonstrated",
      沉浸式體驗: "researchDirection",
      跨域創生: "demonstrated",
    },
    themeRationales: {
      互動媒體: "使用者可以拖動控制點或操作滑桿，立即看到並聽到參數改變。",
      聲響: "位置、速度與大小都會改變聲音；聲音不是背景素材。",
      沉浸式體驗: "空間聲音、感測器與場域應用仍是未來研究方向。",
      跨域創生: "這個原型需要我安排學習任務、寫互動程式、設計聲音映射，也處理視覺介面。",
    },
    links: [],
    credits: "我規劃問題、四組映射、UX、介面方向與公開內容，並逐項驗收原型功能。生成式 AI 曾協助程式草稿與除錯；我負責決定映射邏輯、互動流程與最後呈現。",
    seo: {
      title: "互動聲響學習原型 | RU / YUAN",
      description: "用 Web Audio 把位置、速度與大小連到聲像、音高、濾波亮度與音量的互動原型。",
    },
  },
  {
    id: "generative-interface-study",
    slug: "generative-interface-study",
    eyebrow: "文學 × AI",
    title: "AI 文學故事 MV",
    titleLines: [["AI 文學"], ["故事 MV"]],
    englishTitle: "AI Literature Story MV — A 40-Second Hamlet Video",
    metadataOmissions: ["year"],
    category: "生成式 AI 內容設計／數位學習案例",
    source: "內容設計／流程實作",
    statusKey: "prototype",
    status: publicStatusLabels.prototype,
    submissionVisibility: "public",
    featured: true,
    priority: 2,
    summary:
      "我先拆解《Hamlet》的情節，再用生成式 AI 製作八幕場景圖與故事字幕，最後整合 Suno 歌曲並在 Canva 完成 40 秒影片。歌曲實際包含英語歌詞與人聲。",
    tags: ["文學教育", "生成式 AI", "提示詞設計", "視覺敘事", "聲音情緒設計"],
    valueProposition: "我把《Hamlet》拆成八幕，為字幕、圖像和配樂各自訂下檢查條件，再整合成 40 秒影片。",
    overviewFacts: "40 秒、8 幕；英文與繁中字幕；下一階段將進行課堂觀看觀察",
    whatThisProves: "我完成情節拆解、提示詞設計、八幕視覺與字幕規格、配樂方向和影片整合。",
    designGoal:
      "我把製作分成文本理解、分鏡、圖像與字幕、配樂、剪輯五個階段，讓每次輸出都能先核對再往下做。",
    designProcess:
      "我先核對故事情節，再用 ChatGPT 整理八幕分鏡與 B1 字幕規格。八幕圖像由 ChatGPT／OpenAI 生成；原始配樂方向要求 instrumental / no lyrics，但最後採用的 Suno 輸出包含英語歌詞與人聲。我在 Canva 對齊畫面與歌曲，WebVTT 故事字幕則由網站播放器另外載入。",
    technologyAndMedia:
      "我用 ChatGPT 整理故事、分鏡、字幕與圖像提示，場景圖由 ChatGPT／OpenAI 生成；Suno 提供包含音樂、英語歌詞與人聲的完整歌曲輸出，Canva 只用於時間編排、剪輯、字幕、轉場、音量與 MP4 匯出。",
    outcomeShowcase:
      "我完成 40 秒、8 幕《Hamlet》故事 MV、雙語 WebVTT 與逐字稿，並在製作後整理提示詞模板 v1。場景圖、Suno 歌曲與 Canva 的工具分工已公開說明；目前非營利作品集使用範圍也已由蕭智仁於 2026-07-26 完成 applicant attestation，並通過 publication gate。八幕原始生成紀錄、Suno 原始 EML 與可編輯 Canva 專案仍未在本輪找到，學生與教師的學習成效也尚未驗證。",
    trackIds: ["ai-interactive-learning-creation", "multimedia-video-sound", "edtech-digital-content"],
    cover: mediaAsset("hamlet-story-mv-cover", "《Hamlet》故事 MV 封面裁切，哈姆雷特在月夜城牆上面對父親的鬼魂。"),
    problemAwareness:
      "我要把《Hamlet》的閱讀理解轉成一支英文故事影片。情節、字幕、圖像和配樂由不同工具處理，如果沒有先訂規格，很容易前後不一致。",
    audience: "我把使用情境設定為大學通識英語課的文學故事影音任務，下一步會從字幕可讀性與故事理解開始進行課堂觀察。",
    projectInfo: [
      { label: "專案類型", value: "生成式 AI 內容設計／數位學習案例" },
      { label: "我的角色", value: "內容拆解、提示詞限制與跨工具流程安排" },
      { label: "核心工具", value: "ChatGPT、生成式圖像工具、Suno、Canva" },
      { label: "主要產出", value: "40 秒、8 幕故事 MV 與雙語字幕" },
      { label: "使用情境", value: "大學通識英語課文學故事影音任務" },
      { label: "下一步", value: "觀察字幕可讀性、故事理解與課堂適用性" },
    ],
    challenge: {
      title: "在 40 秒內說清楚故事，並讓八幕保持一致",
      description:
        "我需要在 40 秒內保留主要情節，讓以 B1 為目標的英文字幕來得及閱讀，也要維持角色、光線與配樂方向。這支成片沒有旁白，因此畫面與字幕必須獨立把故事說清楚。",
    },
    workflow: {
      title: "我如何完成 40 秒、8 幕影片",
      summary: "我依現有成片與專案規格，把製作方法整理成五個階段，方便下一次實作時保留更完整的版本紀錄。",
      stages: [
        {
          title: "文本理解",
          description: "我先核對故事背景、主要衝突與結局，避免後面的分鏡偏離原作。",
          tool: "人工判讀／原作文本",
          input: "《Hamlet》原作情節與這次 40 秒任務的範圍",
          output: "背景、人物關係、核心衝突與結局的敘事骨架",
          constraint: "保留開頭、衝突、結尾與關鍵人物關係",
          humanCheck: "逐項核對人物、事件因果與結局是否能由原作支持。",
        },
        {
          title: "分鏡拆解",
          description: "我用 ChatGPT 把長篇情節切成八個場景，再逐幕檢查事件順序。",
          tool: "ChatGPT",
          input: "已核對的敘事骨架與 40 秒時長",
          output: "八個五秒場景節點、每幕事件與字幕草稿",
          constraint: "製作規格容許 8–10 幕；本片採 8 幕，每幕只放一個關鍵事件",
          humanCheck: "確認八幕順序、人物與事件因果沒有跳躍或重複。",
        },
        {
          title: "圖像與字幕",
          description: "我為每幕寫場景圖規格與英文字幕，確認畫面和文字說的是同一件事。",
          tool: "ChatGPT／生成式圖像工具",
          input: "八幕節點、B1 語言目標與 Gothic 視覺方向",
          output: "16:9 場景圖、英文畫面文字與繁中對照",
          constraint: "以 B1 為目標；每句 12–18 個英文單字；一至兩行；圖內無文字",
          humanCheck: "核對字幕字數、換行、情節正確性與跨幕角色／光線一致性。",
        },
        {
          title: "情緒配樂",
          description: "我用 Suno 產生歌曲並逐段確認神祕、悲傷與緊張的變化；實際採用版本包含英語歌詞與人聲。",
          tool: "Suno",
          input: "八幕情緒弧線與 40 秒節奏",
          output: "〈Blinds-Soft Lament〉00:00–00:40；音樂、歌詞與人聲均由 Suno 生成",
          constraint: "原始配樂方向：instrumental / mysterious / sad / slow build / no lyrics；實際輸出包含英語歌詞與人聲",
          humanCheck: "逐段聆聽情緒轉折，核對歌詞與人聲是否和故事字幕競爭，並公開揭露規格與實際輸出的差異。",
        },
        {
          title: "剪輯輸出",
          description: "我在 Canva 對齊圖像與音樂並輸出影片；WebVTT 由網站播放器另外載入。",
          tool: "Canva",
          input: "八幕場景圖、40 秒節奏規格與包含英語歌詞及人聲的 Suno 歌曲",
          output: "40 秒、16:9 MP4",
          constraint: "16:9；本片每幕 5 秒；若未來加入旁白，先降低背景音樂",
          humanCheck: "逐幕核對畫面、音樂與結尾，再用網站播放器檢查 WebVTT 時間碼。",
        },
      ],
    },
    promptDecisions: [
      {
        title: "每幕只講一個事件",
        evidenceStatus: "specificationOnly",
        evidenceSource: "approvedBrief",
        artifactRefs: [],
        constraint: "8–10 幕；每張圖片只放一個關鍵情節。",
        rationale: "一幕只處理一個事件，比較容易檢查故事因果與前後順序。",
        outputProblem: "避免情節跳躍、單張畫面資訊過多或剪輯節奏不穩。",
        humanCheck: "逐幕確認人物、事件因果與前後銜接。",
      },
      {
        title: "讓字幕在播放時讀得完",
        evidenceStatus: "specificationOnly",
        evidenceSource: "approvedBrief",
        artifactRefs: [],
        constraint: "以 B1 為目標；每句 12–18 個英文單字；字幕不超過兩行。",
        rationale: "我用較清楚的現代英文保留情節重點，避免播放時來不及理解。",
        outputProblem: "避免字幕過長、詞彙難度失控與播放時來不及讀完。",
        humanCheck: "核對字數、句意、情節正確性與換行位置。",
      },
      {
        title: "固定八幕的視覺規則",
        evidenceStatus: "specificationOnly",
        evidenceSource: "approvedBrief",
        artifactRefs: [],
        constraint: "dark Gothic / candlelight / cinematic / 16:9；圖片內不生成文字。",
        rationale: "固定光線、時代氣氛與畫幅，讓八幕看起來屬於同一個故事。",
        outputProblem: "避免角色與色調漂移、畫幅不一，以及生成文字破壞後製。",
        humanCheck: "比較人物外觀、光源、構圖與情緒是否連續。",
      },
      {
        title: "揭露配樂規格與實際輸出的差異",
        evidenceStatus: "specificationOnly",
        evidenceSource: "approvedBrief",
        artifactRefs: [],
        constraint: "原始配樂方向為 instrumental / slow build / no lyrics；實際採用的 Suno 輸出包含英語歌詞與人聲。",
        rationale: "保留原始規格能呈現製作決策，但公開敘事必須以實際聲軌為準，不能把提示方向誤寫成完成結果。",
        outputProblem: "避免把 no lyrics 規格誤寫成成片事實，也避免歌曲人聲和故事字幕的資訊層級失衡。",
        humanCheck: "逐段聆聽歌曲與故事字幕的關係，核對 Suno credit、非營利範圍與可及性限制是否可見。",
      },
    ],
    promptTemplate: {
      originStatus: "derived",
      evidenceRef: "hamlet-prompt-template-v1",
      usedForExistingVideo: false,
      eyebrow: "事後整理的模板",
      title: "文學故事 MV 提示詞模板 v1",
      provenance: "這份模板在 2026/07/17 依案例的四項決策整理，供下一次製作沿用與調整。",
      summary: "使用時要先替換五個變數，再要求模型分開輸出故事事實、逐幕規格與檢查欄。使用這份模板的人仍須核對原作、語言與媒體是否一致。",
      variables: [
        { token: "{{literary_work}}", label: "文學作品", guidance: "作品名稱與採用版本；作者需另行確認原作事實。" },
        { token: "{{learner_level}}", label: "語言程度", guidance: "目標學習者的語言級別，例如 B1。" },
        { token: "{{scene_count}}", label: "場景數量", guidance: "依影片長度設定可逐幕核對的節點數。" },
        { token: "{{visual_direction}}", label: "視覺方向", guidance: "畫幅、光線、時代感、色調與禁止條件。" },
        { token: "{{music_direction}}", label: "音樂方向", guidance: "情緒弧線、速度、是否有歌詞與混音優先序。" },
      ],
      prompt: [
        "你是文學教學內容設計與跨媒體敘事助手。請以 {{literary_work}} 為基礎，為 {{learner_level}} 學習者規劃 {{scene_count}} 幕、16:9 的故事 MV。",
        "先列出可由原作核對的背景、人物、核心衝突與結局；不確定的情節必須標示，不能自行補成事實。",
        "每幕只處理一個關鍵事件，輸出：敘事功能、人物與動作、英文字幕、繁中對照、圖像生成規格與人工核對點。",
        "英文字幕使用 {{learner_level}} 程度，每句 12–18 個英文單字、最多兩行；保留完整因果，不大量引用原文。",
        "所有圖像規格沿用 {{visual_direction}}，角色、光源與構圖需前後一致，圖片內不生成文字。",
        "配樂沿用 {{music_direction}}；若加入旁白或對話，語音清晰度優先於背景音樂。",
        "最後輸出逐幕一致性檢查表，分開檢查原作事實、字幕可讀性、視覺連續性、音樂情緒與剪輯節奏。",
      ],
      reviewChecklist: [
        "逐幕核對原作事實、人物關係與事件因果。",
        "檢查字幕字數、程度、換行與播放時間是否符合學習情境。",
        "比較各幕的角色、光源、畫幅與情緒方向是否連續。",
        "確認音樂與剪輯服務故事，不遮蔽字幕、旁白或對話。",
      ],
    },
    storyboard: {
      title: "《Hamlet》八幕分鏡",
      summary: "這八張圖都擷取自 40 秒成片。每張對應 5 秒片段，並保留影片實際使用的英文字幕；不是另外製作的展示圖。",
      frames: [
        { title: "幽靈揭露真相", titleEn: "The Ghost Reveals the Truth", time: "00:00–00:05", seekSeconds: 0, subtitle: "On a cold night, Hamlet sees his father's ghost and learns a terrible secret.", description: "父親的幽靈揭露秘密，故事衝突從這裡開始。", control: "這幕只處理秘密揭露；人物關係與復仇動機必須能由原作核對。", image: responsivePortfolioImage("hamlet-story-mv-scene-01", 1200, 675, "月夜城牆上，哈姆雷特與父親的幽靈相對而立。") },
        { title: "悲傷與遲疑", titleEn: "Grief and Doubt", time: "00:05–00:10", seekSeconds: 5, subtitle: "Hamlet feels deep grief and doubt, and he cannot decide how to act.", description: "哈姆雷特因悲傷與懷疑而遲遲無法行動。", control: "用一個決策困境推進故事；字幕維持 12–18 個英文單字。", image: responsivePortfolioImage("hamlet-story-mv-scene-02", 1200, 675, "哈姆雷特獨自低頭，神情悲傷而猶豫。") },
        { title: "假裝瘋狂並暗中觀察", titleEn: "Feigned Madness", time: "00:10–00:15", seekSeconds: 10, subtitle: "Hamlet pretends to be mad while he watches the king for signs of guilt.", description: "哈姆雷特假裝瘋癲，暗中觀察國王的反應。", control: "畫面只呈現觀察行動，不把尚未證實的罪行寫成已確認事實。", image: responsivePortfolioImage("hamlet-story-mv-scene-03", 1200, 675, "哈姆雷特假裝瘋癲，暗中觀察國王的反應。") },
        { title: "戲中戲暴露罪惡", titleEn: "The Play Exposes Guilt", time: "00:15–00:20", seekSeconds: 15, subtitle: "A play at court mirrors the murder, and Claudius reacts with sudden fear.", description: "戲中戲重現謀殺，克勞狄斯的恐懼讓真相浮現。", control: "以克勞狄斯的反應作為畫面重點，保留前後事件因果。", image: responsivePortfolioImage("hamlet-story-mv-scene-04", 1200, 675, "宮廷上演重現謀殺的戲劇，克勞狄斯露出恐懼。") },
        { title: "奧菲莉亞的絕望", titleEn: "Ophelia's Despair", time: "00:20–00:25", seekSeconds: 20, subtitle: "Rejected and heartbroken, Ophelia loses her peace and slowly falls into despair.", description: "故事在這一幕轉向奧菲莉亞的心碎與絕望。", control: "不把複雜因果簡化為單一責任；字幕只描述這幕的情節。", image: responsivePortfolioImage("hamlet-story-mv-scene-05", 1200, 675, "奧菲莉亞獨自站在昏暗場景中，逐漸陷入絕望。") },
        { title: "墓園中的生死反思", titleEn: "Graveyard Reflection", time: "00:25–00:30", seekSeconds: 25, subtitle: "In the graveyard, Hamlet holds a skull and thinks about death and time.", description: "墓園與頭骨把焦點帶到死亡與時間。", control: "用頭骨與墓園集中呈現死亡反思，不在圖內生成文字。", image: responsivePortfolioImage("hamlet-story-mv-scene-06", 1200, 675, "哈姆雷特在墓園手持頭骨，思索死亡與時間。") },
        { title: "決鬥與復仇", titleEn: "The Final Duel", time: "00:30–00:35", seekSeconds: 30, subtitle: "The final duel begins, but poison and revenge soon destroy the royal court.", description: "決鬥、毒藥與復仇把故事推到高潮。", control: "讓三項事件在同一高潮節點匯合，並維持 16:9 構圖。", image: responsivePortfolioImage("hamlet-story-mv-scene-07", 1200, 675, "王室決鬥中，毒藥與復仇把衝突推向高潮。") },
        { title: "悲劇性的結局", titleEn: "Tragic Aftermath", time: "00:35–00:40", seekSeconds: 35, subtitle: "After great loss and silence, Hamlet dies, and Denmark faces a tragic end.", description: "最後一幕以失落與沉默收束悲劇。", control: "交代哈姆雷特死亡，並以單一畫面結束；影片不循環。", image: responsivePortfolioImage("hamlet-story-mv-scene-08", 1200, 675, "哈姆雷特倒下，丹麥王室在失落與沉默中收場。") },
      ],
    },
    featuredExample: {
      eyebrow: "Literary spotlight / 代表案例",
      title: "40 秒版本仍保留開頭、衝突與結局",
      summary:
        "影片從父親的幽靈揭露秘密開始，接著帶到哈姆雷特的猶豫、戲中戲、奧菲莉亞、墓園與決鬥，最後保留悲劇結局。英文字幕改寫成較直接的現代英文，沒有大量引用原文。",
      themes: ["復仇", "真相", "背叛", "遲疑", "行動", "道德"],
      focusTitle: "為什麼從父親的幽靈開始？",
      focusDescription: "第一幕同時交代父子關係、秘密與復仇動機，也建立後續八幕的陰鬱視覺方向。",
    },
    mediaLayers: [
      { label: "故事節點", status: "已實作", role: "我先用八個事件排出開頭、衝突、轉折與悲劇結局。", check: "人物、事件因果與前後順序是否能由原作支持。" },
      { label: "場景圖像", status: "已實作", role: "每幕只畫一個事件，並盡量維持相同的角色與場景方向。", check: "人物、光源、構圖與前後情緒是否連續。" },
      { label: "英文字幕／情節文字", status: "已實作", role: "我把每幕事件改寫成以 B1 為目標的英文，每句維持 12–18 個英文單字與一至兩行。", check: "字數、換行、可讀時間與情節正確性。" },
      { label: "情緒配樂", status: "已實作", role: "實際歌曲包含 Suno 生成的音樂、英語歌詞與人聲，00:00–00:40 配合八幕的神祕、悲傷與緊張。", check: "情緒轉折、歌曲人聲與故事字幕的資訊層級是否清楚。" },
      { label: "Canva 剪輯與最終影片", status: "已實作", role: "我把八幕畫面與音樂剪成 40 秒、16:9 的影片；網站播放器另外載入 WebVTT 字幕。", check: "每幕節奏與結尾是否完整；WebVTT 時間碼則在播放器中另行檢查。" },
    ],
    deliverables: [
      { id: "clean-video", title: "40 秒、8 幕故事 MV", statusKey: "artifactVerified", status: "實際成果", evidenceRefs: ["hamlet-clean-video"], attributionSource: "deliveryPackage", description: "MP4 已核對為 H.264 影像、AAC 音訊與 16:9 畫幅。" },
      { id: "bilingual-captions", title: "雙語字幕與逐字稿", statusKey: "artifactVerified", status: "實際成果", evidenceRefs: ["hamlet-en-vtt", "hamlet-zh-vtt"], attributionSource: "deliveryPackage", description: "英文與繁中 WebVTT 各有八段連續時間碼，並附中英畫面文字紀錄。" },
      { id: "scene-breakdown", title: "場景拆解", statusKey: "artifactDerived", status: "流程產出", evidenceRefs: ["hamlet-storyboard-responsive"], attributionSource: "verifiedArtifact", description: "我從成片整理出八個關鍵情節與每幕功能，用來檢查故事是否連續。" },
      { id: "prompt-template-v1", title: "跨工具提示詞模板 v1", statusKey: "processDerived", status: "流程產出", evidenceRefs: ["hamlet-prompt-template-v1"], attributionSource: "publishedCaseConstraints", description: "這份模板於 2026/07/17 事後整理，沒有用於現有影片，也不是原始提示詞紀錄。" },
      { id: "caption-specification", title: "英文字幕目標規格", statusKey: "specificationOnly", status: "製作規格", evidenceRefs: [], attributionSource: "approvedBrief", description: "以 B1 為目標，搭配每句 12–18 個英文單字、一至兩行控制語言難度與播放可讀性。" },
      { id: "music-specification", title: "Suno 配樂提示詞", statusKey: "specificationOnly", status: "製作規格", evidenceRefs: [], attributionSource: "approvedBrief", description: "原始提示方向以 instrumental、mysterious、sad、slow build、no lyrics 定義情緒；實際成片採用的輸出則包含英語歌詞與人聲。" },
      { id: "integrated-video-output", title: "整合影片輸出", statusKey: "artifactVerified", status: "實際成果", evidenceRefs: ["hamlet-clean-video"], attributionSource: "approvedBrief", description: "目前只有輸出的 MP4 可以核對；尚未取得可編輯 Canva 專案或工具執行紀錄。" },
    ],
    outcomes: [
      { kind: "designValue", title: "五階段製作規格", description: "五個階段列出輸入、輸出與人工檢查；是否能套用到第二部作品，仍需實際試跑。" },
      { kind: "designValue", title: "每幕都有檢查欄位", description: "故事事件、字幕目標與原作情節可以分開檢查，下一步再加入學生與教師的觀看回饋。" },
      { kind: "designValue", title: "各層都依八幕排列", description: "圖像、字幕、配樂與剪輯使用同一組故事節點；是否能降低跨工具不一致，仍需下一次實作比較。" },
    ],
    evaluationPlan: {
      status: "planned",
      title: "形成性評估計畫",
      summary: "下一步會請學生依序重述故事、閱讀字幕，也請教師檢視原作正確性與課堂適用性；觀察結果會用來調整每幕資訊、字幕與教學引導。",
      participantRoles: ["大學通識英文學習者", "授課教師或教學助理"],
      tasks: [
        { id: "story-retell", status: "planned", task: "依八幕順序重述背景、衝突與結局。", evidenceToCollect: ["順序錯置", "人物或情節誤解"], decisionUse: "調整每幕資訊量與事件因果提示。" },
        { id: "caption-readability", status: "planned", task: "在一般播放速度下閱讀字幕並說明每幕事件。", evidenceToCollect: ["未讀完的字幕", "詞彙或換行問題"], decisionUse: "調整字幕字數、目標難度與停留時間。" },
        { id: "teacher-review", status: "planned", task: "檢視原作正確性、是否適合課堂使用，以及媒體主次。", evidenceToCollect: ["事實修正", "教學引導與評量建議"], decisionUse: "修訂提示詞檢查點與教師／學生指南。" },
      ],
      dataPolicy: "測試前先取得同意，只記錄必要內容，並把個人資料與公開作品材料分開保存。",
    },
    keyInsight:
      "這次我學到，工具越多，越需要先決定每一步要交付什麼、誰來檢查。把故事拆成八幕後，我才能逐項修正字幕、圖像與配樂，而不是在最後才發現它們彼此不合。",
    nextSteps: [
      "維持 applicant attestation、Suno 非營利限制與公開 credit；若網站用途、營利模式或素材組成改變，重新執行權利核對與 publication gate。",
      "用另一部文學作品首次實際使用提示詞模板 v1，保留提示詞紀錄、失敗輸出與人工修改。",
      "安排學生與教師的形成性測試，再依誤解、字幕可讀性與課堂適用性修改。",
    ],
    ctas: [
      { label: "播放案例影片", href: "#generative-interface-study-featured-media", focusTarget: "#generative-interface-study-featured-media-player" },
      { label: "查看八幕分鏡", href: "#generative-interface-study-storyboard" },
      { label: "閱讀提示詞設計", href: "#generative-interface-study-prompt-system" },
    ],
    diagrams: [],
    featuredMediaIntro:
      "影片共八幕，每幕 5 秒，故事字幕可切換英文與繁中。場景圖與音樂由生成式工具協作完成，背景歌曲含英語歌詞與人聲；Suno 特定非營利使用條件、公開 credit 與蕭智仁於 2026-07-26 完成的 applicant attestation 均已揭露。",
    featuredMediaDisclosure: {
      title: "素材來源與公開範圍",
      musicCredit: {
        attribution: "Music generated by Suno (suno.com)",
        song: "Song: “Blinds-Soft Lament”",
        href: "https://suno.com/song/06373cc4-76b9-45c0-a0c0-586882f55829",
        excerpt: "本片使用 00:00–00:40。歌曲中的音樂、歌詞與人聲均由 Suno 生成。",
        scope: "Suno 官方客服書面摘要確認此片段可用於目前無廣告、無付費牆、無聯盟收益的非營利研究所申請作品集；不得作商業廣告或音樂發行。",
      },
      sources: [
        { label: "場景圖像", value: "ChatGPT／OpenAI 生成（完全使用文字提示）；蕭智仁於 2026-07-26 確認未使用第三方 reference image 或要求重製特定電影／演員畫面" },
        { label: "文學基礎", value: "Literary basis: William Shakespeare, Hamlet" },
        { label: "故事改寫與字幕核對", value: "Story adaptation and subtitle review: 蕭智仁 with ChatGPT assistance" },
        { label: "音樂、歌詞與人聲", value: "Suno；申請者不主張歌曲創作、演唱或完整著作權" },
        { label: "剪輯與輸出", value: "Canva；只用於時間編排、剪輯、字幕、轉場、音量與 MP4 匯出" },
        { label: "公開範圍", value: "限目前無廣告、無付費牆、無相關聯盟收益的非營利研究所作品集" },
      ],
      attestation: {
        label: "Applicant attestation",
        value: "已由 蕭智仁 於 2026-07-26 確認",
        statusKey: "confirmed",
      },
    },
    media: {
      visualDrafts: [],
      screenshots: [],
      videos: [
        {
          title: "《Hamlet》AI 文學故事 MV",
          src: publicAssetUrl("media/portfolio/hamlet-story-mv-clean-web-1080p.mp4"),
          poster: responsivePortfolioImage("hamlet-story-mv-poster", 1200, 675, "《Hamlet》故事 MV 首圖，哈姆雷特在月夜城牆上面對父親的鬼魂。"),
          caption: "40 秒、8 幕的成片；每幕 5 秒，提供英文與繁中 WebVTT 字幕，影片不會自動播放。",
          technicalSummary: "00:40 · 8 幕 · 16:9 · 英文／繁中故事字幕 · 背景歌曲含英語歌詞與人聲 · 無旁白",
          accessibilitySummary: "故事字幕：English／繁中（非歌曲逐字歌詞字幕） · 全片無旁白 · 背景歌曲含英語歌詞與人聲",
          transcript: "影片由 Ghost 揭密開始，依序經過 Hamlet 的遲疑、戲中戲、Ophelia、墓園、決鬥與悲劇結局；背景歌曲含英語歌詞與人聲，沒有旁白。",
          transcriptNote: "背景歌曲含英語歌詞與人聲；下列 WebVTT 與逐字稿記錄故事敘事，不是歌曲逐字歌詞字幕，也不是語音辨識結果。",
          transcriptCues: [
            { time: "00:00–00:05", en: "On a cold night, Hamlet sees his father's ghost and learns a terrible secret.", zh: "在寒冷的夜晚，哈姆雷特見到父親的鬼魂，並得知一個可怕的秘密。", visualDescription: "月夜城牆上，Hamlet 與父親 Ghost 對望。", musicMood: "神祕、低沉，建立秘密揭露的起點。" },
            { time: "00:05–00:10", en: "Hamlet feels deep grief and doubt, and he cannot decide how to act.", zh: "哈姆雷特深陷悲痛與疑惑，無法決定自己該如何行動。", visualDescription: "Hamlet 獨處，畫面集中在悲傷與猶豫。", musicMood: "悲傷而遲疑，維持緩慢推進。" },
            { time: "00:10–00:15", en: "Hamlet pretends to be mad while he watches the king for signs of guilt.", zh: "哈姆雷特假裝瘋癲，同時觀察國王是否露出罪惡的跡象。", visualDescription: "Hamlet 以假裝瘋癲掩護觀察行動。", musicMood: "不安逐步增加，但尚未進入高潮。" },
            { time: "00:15–00:20", en: "A play at court mirrors the murder, and Claudius reacts with sudden fear.", zh: "宮廷中的一齣戲重現了謀殺情節，克勞狄斯突然流露出恐懼。", visualDescription: "宮廷戲劇重現謀殺，Claudius 顯露恐懼。", musicMood: "緊張升高，對應真相浮現。" },
            { time: "00:20–00:25", en: "Rejected and heartbroken, Ophelia loses her peace and slowly falls into despair.", zh: "遭到拒絕又心碎的奧菲莉亞失去平靜，逐漸陷入絕望。", visualDescription: "Ophelia 在孤立畫面中逐漸陷入絕望。", musicMood: "悲傷下沉，暫時離開衝突高潮。" },
            { time: "00:25–00:30", en: "In the graveyard, Hamlet holds a skull and thinks about death and time.", zh: "在墓園裡，哈姆雷特手持頭骨，思索死亡與時間。", visualDescription: "Hamlet 在墓園手持頭骨，思考死亡與時間。", musicMood: "低沉、反思，保留敘事空間。" },
            { time: "00:30–00:35", en: "The final duel begins, but poison and revenge soon destroy the royal court.", zh: "最後的決鬥開始，但毒藥與復仇很快摧毀了王室。", visualDescription: "最後決鬥、毒藥與復仇匯入同一高潮。", musicMood: "緊張達到高點，推向悲劇結果。" },
            { time: "00:35–00:40", en: "After great loss and silence, Hamlet dies, and Denmark faces a tragic end.", zh: "在巨大的失落與沉默之後，哈姆雷特死去，丹麥迎來悲劇性的結局。", visualDescription: "Hamlet 死去，丹麥以失落與沉默收束。", musicMood: "悲劇性收束，不循環回到開場。" },
          ],
          tracks: [
            { src: publicAssetUrl("media/portfolio/hamlet-story-mv.en.vtt"), srcLang: "en", label: "English", kind: "subtitles", default: true },
            { src: publicAssetUrl("media/portfolio/hamlet-story-mv.zh-TW.vtt"), srcLang: "zh-TW", label: "繁體中文", kind: "subtitles" },
          ],
          featured: true,
        },
      ],
      audio: [],
      demos: [],
    },
    tools: ["ChatGPT", "生成式圖像工具", "Suno", "Canva"],
    roles: ["提示詞限制與工具流程安排", "內容拆解", "影音敘事規格"],
    testing: {
      statusKey: "notValidated",
      status: "成片、字幕與逐字稿已完成；下一步會邀請學生與教師觀看，了解故事理解、字幕可讀性與課堂使用感受。",
      metrics: [],
      insights: [],
      learningOutcomes: [],
      plannedMethods: [
        "觀察學生能否依八幕順序重述故事背景、衝突與結局。",
        "檢查以 B1 為目標的字幕，在課堂播放速度下是否能被讀完並正確理解。",
        "蒐集教師對文學正確性、畫面一致性與是否適合課堂使用的回饋。",
      ],
    },
    reflection: {
      strengths: "我已完成 40 秒成片、八幕實際畫面與雙語字幕，也寫下每個工具要處理的內容與限制。",
      limitations: "目前沒有學生測試、教師評閱、原始提示詞紀錄、原始場景檔或可編輯 Canva 專案；Suno 原始 EML 也未在本輪找到，下一次製作會同步保留這些私人原始資料。Applicant attestation 已完成並只涵蓋目前列明的非營利公開範圍，且本人聲明不等於原始證據的獨立查驗。",
      graduateDirection: "下一步會在維持非營利權利邊界的前提下，測試字幕、故事理解與含歌詞／人聲歌曲是否適合課堂任務。",
    },
    instituteConnections: ["AI", "聲響", "跨域創生"],
    themeEvidenceStatus: {
      AI: "demonstrated",
      聲響: "demonstrated",
      跨域創生: "demonstrated",
    },
    themeRationales: {
      AI: "我先限制各工具的輸出，再逐幕核對文學情節、字幕與工具交接。",
      聲響: "原始配樂方向要求 instrumental / no lyrics，但實際 Suno 輸出包含英語歌詞與人聲；本片沒有旁白，WebVTT 是故事字幕。",
      跨域創生: "我把《Hamlet》情節、英文字幕、生成圖像、配樂與剪輯整理成 40 秒成片。",
    },
    links: [],
    credits: "我負責原作情節拆解、場景設定、提示方向、輸出篩選、畫面排序、故事字幕核對與影片整合。場景圖由 ChatGPT／OpenAI 生成；音樂、歌詞與人聲由 Suno 生成；Canva 只用於剪輯與輸出。",
    seo: {
      title: "AI 文學故事 MV | RU / YUAN",
      description: "《Hamlet》40 秒、8 幕故事 MV，呈現我如何運用 ChatGPT／OpenAI、Suno 與 Canva 安排故事、字幕、畫面與配樂，並揭露生成素材分工、Suno 非營利使用限制與尚未驗證的學習成效。",
    },
  },
  ...hiddenProjectCaseStudies,
  {
    id: "data-visualization-cases",
    slug: "data-visualization-cases",
    title: "資料視覺化實際案例與數位學習應用探討",
    titleLines: [["資料視覺化"], ["實際案例與", "數位學習"], ["應用探討"]],
    year: "2026",
    productionDate: "2026/04/23",
    category: "資料視覺化／動態影像",
    source: "數位學習相關課程成果",
    statusKey: "completed",
    status: publicStatusLabels.completed,
    submissionVisibility: "public",
    featured: true,
    priority: 4,
    summary:
      "我以 Spotify Wrapped（年度個人化回顧）等案例為素材，拆解資料層級、畫面節奏與個人化回饋的安排。影片最後把這些觀察帶回數位學習情境，下一步再發展成可操作的學習回顧介面。",
    valueProposition: "我把案例拆解後的觀察整理成影片，並提出它們在學習歷程摘要與個人化回饋中的可能用法。",
    whatThisProves: "我自行完成案例篩選、視覺分析、論述編排與影片製作，並整理出下一階段介面原型的設計方向。",
    designGoal: "我想找出個人化資料如何安排資訊層級、閱讀節奏與視覺提示，再思考這些做法能否用在學習歷程回饋。",
    designProcess:
      "我先用 Gemini 與 ChatGPT 找案例線索，再自行篩選案例、拆解視覺策略、安排論述順序，最後完成動態簡報與影片。",
    technologyAndMedia:
      "我使用 Power BI、Excel 與 Canva 完成資料整理、視覺分析與影片製作。Gemini 和 ChatGPT 只協助找案例線索；案例選擇與論述由我完成。",
    outcomeShowcase:
      "這一階段完成分析影片；下一步會把其中一種回饋任務做成可操作介面，再觀察讀者如何理解內容。",
    trackIds: ["edtech-digital-content", "multimedia-video-sound", "interactive-media-ux", "user-research-outcomes-process"],
    cover: svgAsset(
      "work-01-cover",
      1200,
      900,
      "資料視覺化案例分析作品封面，以節點、圖表與動態軌跡呈現。",
    ),
    problemAwareness:
      "我想處理的問題是：學習平台雖然留下許多行為資料，表格和單一指標卻不一定能說明完整歷程。這件作品因此比較案例如何安排資料層級、閱讀順序與回饋提示。",
    audience: "這支影片預設給數位學習設計者、對個人化學習回饋感興趣的學生，以及想理解資料敘事的創作者觀看。",
    diagrams: [
      {
        type: "interactionFlow",
        title: "案例分析到影片的製作流程",
        caption: "我先蒐集案例，拆解資料來源與視覺層級，再安排動態腳本並輸出影片。",
        description: "流程分為案例蒐整、資訊拆解、動態腳本與影片輸出四步。",
        image: svgAsset("work-01-process", 1200, 900, "四步流程圖：案例蒐整、資訊拆解、動態腳本與影片輸出。"),
      },
    ],
    media: {
      visualDrafts: [],
      screenshots: [],
      videos: [
        {
          title: "公開分析影片",
          youtubeId: "NrmK31F2S-M",
          poster: svgAsset("work-01-cover", 1200, 900, "公開分析影片封面。"),
          caption: "影片說明我如何拆解資料敘事、個人化回饋與畫面節奏，再把觀察帶回數位學習情境。",
          transcript:
            "影片摘要：我先比較資料如何被分層、排序與動畫化，再提出學習歷程摘要與個人化回饋的設計方向；影片沒有呈現使用者測試或學習成效。",
        },
      ],
      audio: [],
      demos: [],
      restricted: [],
    },
    extendedSections: [
      {
        title: "01｜我怎麼分析",
        summary: "AI 協助找線索，案例選擇、分析與影片論述由我完成。",
        bullets: [
          "用 Gemini 與 ChatGPT 找到可延伸閱讀的案例線索。",
          "自行選擇案例，拆解資料來源、視覺層級與敘事節奏。",
          "把觀察整理成影片，再提出可能的學習應用，不宣稱已有教學成效。",
        ],
      },
      {
        title: "02｜下一步",
        summary: "下一步是把影片中的觀察做成可操作、可測試的學習回顧介面。",
        paragraphs: [
          "我會先選一種學習回顧任務做成可操作介面，安排使用者觀察；資料聲響化則留作後續研究方向。",
        ],
      },
    ],
    tools: ["Power BI", "Excel", "Canva", "Gemini", "ChatGPT"],
    roles: ["企劃", "資料蒐整", "案例分析", "學習應用整理", "視覺敘事", "影片製作"],
    testing: {
      statusKey: "exploratory",
      status: "案例分析影片已完成；下一步會以可操作介面觀察讀者如何理解個人化回饋。",
      metrics: [
        { label: "目前作品", value: "案例分析影片" },
        { label: "下一步", value: "學習回顧原型" },
      ],
      insights: [],
      learningOutcomes: [],
      plannedMethods: ["原型完成後，我會用實際學習任務觀察讀者能否理解指標並回看自己的歷程。"],
    },
    reflection: {
      strengths: "我完成了案例篩選、視覺分析、論述順序與影片製作，並把學習應用和既有成果分開說明。",
      limitations: "這一版聚焦案例分析影片；互動介面與學習者觀察會在下一輪加入。",
      graduateDirection:
        "若繼續發展，我會先做一個學習歷程回顧原型，確認指標定義與閱讀任務，再測試個人化回饋是否容易理解。",
    },
    instituteConnections: ["AI", "互動媒體", "聲響", "跨域創生"],
    themeEvidenceStatus: {
      AI: "demonstrated",
      互動媒體: "researchDirection",
      聲響: "researchDirection",
      跨域創生: "demonstrated",
    },
    themeRationales: {
      AI: "我用 Gemini 與 ChatGPT 找案例線索，案例篩選、分析與論述由我完成。",
      互動媒體: "案例分析先以影片呈現，下一步會延伸成可操作的學習回顧介面。",
      聲響: "資料聲響化是後續希望探索的研究方向。",
      跨域創生: "我先分析資料案例，再把觀察寫成學習應用論述並製作影片。",
    },
    links: [],
    credits: "我負責案例蒐整與篩選、視覺分析、學習應用整理、論述編排與影片製作。",
    seo: {
      title: "資料視覺化實際案例與數位學習應用探討 | RU / YUAN",
      description: "我以 Spotify Wrapped 等案例拆解資料敘事、個人化回饋與畫面節奏，再提出數位學習回顧介面的設計方向。",
    },
  },
  {
    id: "learning-dashboard-analysis",
    slug: "learning-dashboard-analysis",
    title: "線上學習互動行為與學科成績之資料視覺化分析",
    titleLines: [["線上學習", "互動行為與"], ["學科成績之", "資料視覺化"], ["分析"]],
    year: "2026",
    productionDate: "2026/06/11–2026/06/12",
    category: "學習分析／Power BI",
    source: "課程期末專題（一人一組）",
    statusKey: "prototype",
    status: publicStatusLabels.prototype,
    submissionVisibility: "public",
    featured: true,
    priority: 5,
    summary:
      "我用 Power BI 整理互動紀錄、影片觀看欄位與學科成績，做成供探索資料分布的儀表板。圖表呈現關聯線索，後續仍需透過資料品質檢查與正式分析回答研究問題。",
    valueProposition: "我在概念圖旁標出欄位計數方式與閱讀提醒，讓讀者先理解圖表再解讀形狀。",
    whatThisProves: "我完成初步資料整理、Power BI 儀表板、圖表定義與閱讀說明；網站以概念圖呈現，不放原始資料、真實數值或實作檔。",
    designGoal: "我希望教師或研究者先查看資料分布，再把值得追問的現象交給資料品質檢查與正式分析。",
    designProcess:
      "我先盤點欄位與缺漏，再用 Power Query 整理資料，在 Power BI 建立模型、度量、圖表與篩選器，最後記下計算方式與下一步需要確認的欄位定義。",
    technologyAndMedia:
      "我用 Excel 與 Power Query 整理欄位，在 Power BI Desktop 建立模型、DAX 度量、圖表與篩選器。DAX 是 Power BI 的計算公式語言。公開頁只放概念圖，不含真實數值。",
    outcomeShowcase:
      "公開頁只說明儀表板的閱讀順序、資料處理步驟與圖表定義。圓環圖計算 sn 欄位的筆數，不把欄位值相加；觀看相關直條圖只比較不同數學成績分群中的非空紀錄筆數。",
    trackIds: ["edtech-digital-content", "user-research-outcomes-process", "interactive-media-ux"],
    cover: svgAsset(
      "work-02-dashboard-public",
      1280,
      720,
      "線上學習互動行為與學科成績資料視覺化分析作品封面，以概念化儀表板卡片與圖表呈現。",
    ),
    problemAwareness:
      "線上學習平台留下互動、影片與成績資料，但欄位名稱、計算方式與缺漏如果沒有說清楚，圖表很容易被誤讀為因果或學習成效結論。",
    audience: "這個儀表板預設供課程教師、數位學習研究者與教學助理探索資料分布；正式研究分析會再加入資料品質檢查、統計方法與研究設計。",
    diagrams: [
      {
        type: "interactionFlow",
        title: "儀表板版面概念",
        caption: "這張圖只示意卡片與圖表的位置，不是操作流程圖，也不含真實資料。",
        description: "實際探索順序由文字說明；這張配圖只呈現卡片與圖表的版面關係。",
        image: svgAsset("work-02-dashboard-public", 1280, 720, "Power BI 儀表板版面概念圖，以卡片、圓環圖與長條圖區塊呈現。"),
      },
      {
        type: "systemArchitecture",
        title: "資料使用範圍",
        caption: "這張版面概念圖聚焦介面結構；資料處理步驟由文字說明，原始資料、Power BI 實作檔與真實數值不會放入網站。",
        description: "資料整理流程由文字說明，配圖只呈現儀表板的介面結構。",
        image: svgAsset("work-02-dashboard-public", 1280, 720, "Power BI 儀表板版面概念圖，不含原始資料或資料處理流程。"),
      },
      {
        type: "informationArchitecture",
        title: "圓環圖計算提醒",
        caption: "圓環圖計算欄位筆數；公開概念圖不呈現真實比例或分析結果。",
        description: "現有資料不足以在公開頁解釋 sn 的實際意義，因此只保留計數方式。",
        image: svgAsset("work-02-donut-public", 900, 900, "圓環圖概念示意，提醒讀者計算欄位筆數；不含真實比例。"),
      },
    ],
    media: {
      visualDrafts: [
        svgEvidence(
          "work-02-dashboard-public",
          "公開版儀表板概念圖",
          "只用卡片與圖表區塊說明儀表板結構，不含原始資料、真實數值或分析結果。",
          "Power BI 儀表板版面示意，以卡片與圖表區塊呈現。",
          1280,
          720,
        ),
      ],
      screenshots: [
        svgEvidence(
          "work-02-donut-public",
          "圓環圖計算方式",
          "圓環圖計算 sn 欄位的筆數，不把欄位值相加；公開圖中的比例只是版面示意。",
          "圓環圖概念圖，提醒讀者這裡計算的是欄位筆數。",
          900,
          900,
        ),
      ],
      videos: [],
      audio: [],
      demos: [],
      restricted: [
        {
          title: "課堂資料與原始儀表板",
          status: "課程使用範圍",
          caption: "網站只以概念圖說明結構，不載入或連結原始資料、清洗檔、Power BI 實作檔與真實分析結果。",
          reason: "教材說明將資料限定於課堂教學與練習，因此網站只呈現方法與介面概念。",
        },
      ],
    },
    extendedSections: [
      {
        title: "01｜資料與圖表定義",
        summary: "每張圖都要附上計算方式，否則形狀很容易被當成結論。",
        bullets: [
          "圓環圖計算 sn 欄位的筆數，不把欄位值相加；現有資料不足以在公開頁解釋 sn 的實際意義。",
          "觀看相關直條圖只比較不同數學成績分群中的非空紀錄筆數，不稱為觀看時數比較。",
          "圖上的關聯作為探索線索，後續會透過資料品質檢查與正式分析回答研究問題。",
        ],
      },
      {
        title: "02｜資料使用範圍",
        summary: "網站用概念圖說明方法與介面，不呈現課堂資料或真實分析結果。",
        paragraphs: [
          "原始資料、清洗檔、Power BI 實作檔與含真實結果的操作紀錄，會依教材的課堂使用範圍保存與檢視。",
        ],
      },
      {
        title: "03｜下一步",
        summary: "下一步不是增加圖表，而是先確認資料與計算是否可靠。",
        bullets: [
          "核對觀看欄位與其他度量的實際定義。",
          "建立資料品質檢查，再決定可用的統計方法。",
          "在權限允許的環境中設計形成性任務，觀察教師能否正確解讀圖表。",
        ],
      },
    ],
    tools: ["Microsoft Power BI Desktop", "Microsoft Excel", "Power Query", "DAX"],
    roles: ["資料整理", "資料視覺化", "儀表板設計", "圖表定義", "閱讀說明", "專案管理"],
    testing: {
      statusKey: "exploratory",
      status: "探索型儀表板已完成；下一步會先核對資料品質與度量，再安排讀圖觀察。",
      metrics: [
        { label: "目前成果", value: "探索型儀表板" },
        { label: "閱讀原則", value: "不把關聯當作因果" },
      ],
      insights: ["概念圖把計算方式與閱讀提醒放在圖像旁，讓讀者先理解資料範圍再看圖形。"],
      learningOutcomes: [],
      plannedMethods: ["先核對欄位與度量，再設計形成性任務，觀察使用者能否正確讀圖並說明資料範圍。"],
    },
    reflection: {
      strengths: "我完成初步資料整理、互動儀表板與公開版說明，也把計算方式、資料範圍與閱讀提醒放在圖表旁。",
      limitations: "下一步會先核對部分度量與清洗規則；網站則持續以不含真實結果的概念圖說明方法。",
      graduateDirection:
        "若繼續研究，我會先完成資料品質與度量檢查，再測試教師能否正確解讀儀表板。數位孿生、AI 回饋與資料聲響化都尚未實作。",
    },
    instituteConnections: ["互動媒體", "數位孿生", "聲響", "跨域創生"],
    themeEvidenceStatus: {
      互動媒體: "demonstrated",
      數位孿生: "researchDirection",
      聲響: "researchDirection",
      跨域創生: "demonstrated",
    },
    themeRationales: {
      互動媒體: "我在 Power BI 中建立篩選器與圖表，讓使用者探索資料分布。",
      數位孿生: "完成資料品質檢查後，我想再規劃可持續更新的學習者模型。",
      聲響: "資料聲響提示是後續希望探索的方向。",
      跨域創生: "我同時整理教育資料、設計儀表板互動，也把資料範圍與推論條件寫清楚。",
    },
    links: [],
    credits: "資料來源為教育大數據分析計畫辦公室提供的「2025 年教育大數據微學程教學用開放資料第二版」。我負責資料整理、Power BI 視覺化、圖表定義、閱讀說明與網站版本整理。",
    seo: {
      title: "線上學習互動行為與學科成績之資料視覺化分析 | RU / YUAN",
      description: "我用 Power BI 整理線上學習互動、影片觀看與學科成績欄位，並呈現計算方式、資料範圍與閱讀方法。",
    },
  },
];

export const sortedProjectCaseStudies = [...projectCaseStudies]
  .filter((project) => project.submissionVisibility === "public")
  .sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99));

export const instituteEvidenceGroups = instituteThemes
  .map((theme, themeIndex) => ({
    id: `institute-evidence-${themeIndex + 1}`,
    theme,
    projects: sortedProjectCaseStudies
      .filter((project) => project.themeEvidenceStatus?.[theme] === "demonstrated")
      .map((project) => ({
        id: project.id,
        title: project.title,
        status: project.status,
        roles: [...(project.roles ?? [])],
        tools: [...(project.tools ?? [])],
        rationale: project.themeRationales[theme],
        href: `#${project.id}`,
      })),
  }))
  .filter((group) => group.projects.length > 0);

export const getTrackProjects = (trackId) =>
  sortedProjectCaseStudies.filter((project) => project.trackIds?.includes(trackId));
// Codex-Fix: Public portfolio data now contains only submission-safe content; internal construction notes live in a separate draft-only module.
