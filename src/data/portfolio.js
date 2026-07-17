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
  description: `${title}以圖像方式補充流程、系統節點與資訊層級，協助讀者理解作品方法。`,
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
  eyebrow: "Graduate Portfolio / Sound, Interaction & Learning",
  headline: "讓視覺成為聲音的入口，讓聲音成為學習的回饋。",
  headlineLines: [["讓視覺成為", "聲音的入口，"], ["讓聲音成為", "學習的回饋。"]],
  introduction:
    "我從國立嘉義大學數位學習設計與管理、插畫、動畫與影像創作出發，正透過 Pure Data、REAPER 與 Web Audio，探索聲音、視覺與互動如何形成可測試的跨感官學習經驗。",
  primaryCta: { label: "體驗互動聲響原型", target: "#interactive-sound-learning-demo" },
  secondaryCta: { label: "查看研究與製作歷程", target: "#learning-trail" },
  thesis:
    "跨感官映射於數位學習回饋之設計研究：以視覺形態、聲音參數與互動行為為例。",
  researchQuestion:
    "視覺、聲音與互動如何形成可理解、可操作、可測試的跨感官回饋？",
  credibility:
    "我的基礎來自數位學習、視覺設計、動畫與影像製作；目前以原生 Web Audio 原型作為第一項可操作聲響證據，並誠實標示尚未完成的使用者驗證。",
  argument:
    "閱讀者可以先快速瀏覽研究軌道，再進入個別 case study。每件作品都以公開敘事呈現問題、對象、流程、媒體、工具、角色、反思與本所連結。",
  logicChain: ["問題意識", "互動流程", "媒體證據", "測試反思"],
  reviewerPaths: [
    { label: "研究問題", target: "#research-positioning" },
    { label: "聲響原型", target: "#interactive-sound-learning" },
    { label: "學習歷程", target: "#learning-trail" },
  ],
};
// Codex-Fix: Public homepage copy now describes the portfolio strategy without construction-stage reminders.

export const dataVisualizationSeries = {
  id: "data-visualization-series",
  title: "資料視覺化在數位學習應用",
  subtitle: "Data Visualization in Digital Learning",
  kicker: "數位學習設計・資料視覺化・跨媒介轉譯",
  summary:
    "這個系列把資料視覺化視為數位學習中的理解介面：一件作品從資料故事與動態敘事切入，另一件作品從 Power BI 儀表板與學習行為探索切入，兩者共同展示我如何把資料、媒體與教學情境轉化成可討論的設計證據。",
  independenceNote:
    "兩件作品同屬「資料視覺化與數位學習」主題，但資料來源、目的、製作流程與評估方式彼此獨立，不是同一研究的前後階段。",
  cover: svgAsset(
    "series-cover",
    1200,
    900,
    "資料視覺化在數位學習應用系列的抽象圖像，呈現節點、學習路徑與視覺分析介面。",
  ),
  works: ["data-visualization-cases", "learning-dashboard-analysis"],
  capabilities: [
    "將資料轉譯為學習者可理解的視覺敘事",
    "以儀表板協助觀察線上互動行為與成績分布",
    "把圖表限制、資料倫理與教學解讀邊界明確寫入作品脈絡",
    "為後續 AI、聲響化與沉浸式學習分析保留研究延伸方向",
  ],
  reflection:
    "系列頁的目的不是把兩件作品合併成單一研究，而是讓閱讀者快速看見我在資料視覺化、數位學習、互動媒體與跨域創作之間的共同問題意識。",
  soundExtension:
    "未來可把儀表板中的互動頻率、答題節奏或任務歷程轉化為聲響提示，讓資料不只被看見，也能成為可聆聽、可感知的學習回饋。",
};
// Codex-Fix: Add a public-safe data-visualization series model while explicitly preserving work independence.

export const researchTracks = [
  {
    id: "ai-interactive-learning-creation",
    title: "AI 與互動式創作",
    purpose: "把生成式 AI、提示設計與互動介面視為共同創作系統，而不是只把 AI 當作產圖工具。",
    includes: ["生成式 AI 工具", "Prompt workflow", "AI 輔助介面", "人機協作流程"],
    instituteAlignment: ["AI", "互動媒體", "跨域創生"],
  },
  {
    id: "interactive-media-ux",
    title: "互動媒體與使用者經驗",
    purpose: "關注使用者如何理解、操作與回饋，讓作品從視覺物件變成可被體驗的互動系統。",
    includes: ["互動流程", "UX / UI", "原型測試", "感測或回饋機制"],
    instituteAlignment: ["互動媒體", "沉浸式體驗"],
  },
  {
    id: "multimedia-video-sound",
    title: "影音聲響敘事",
    purpose: "整理影片、聲音、剪輯與視覺節奏，建立可支撐沉浸式或互動式經驗的媒體語言。",
    includes: ["影片剪輯", "聲音設計", "動態影像", "情緒節奏"],
    instituteAlignment: ["聲響", "沉浸式體驗", "跨域創生"],
  },
  {
    id: "edtech-digital-content",
    title: "數位內容與學習設計",
    purpose: "將教學設計與數位內容能力轉譯為互動敘事、資訊架構與使用者引導能力。",
    includes: ["內容架構", "學習流程", "互動腳本", "成效評估"],
    instituteAlignment: ["互動媒體", "跨域創生"],
  },
  {
    id: "user-research-outcomes-process",
    title: "使用者研究與成效資料",
    purpose: "用測試、觀察、訪談或學習成效資料支持設計判斷，讓作品具備可檢驗性。",
    includes: ["使用者測試", "學習成效", "質性觀察", "迭代紀錄"],
    instituteAlignment: ["AI", "數位孿生", "跨域創生"],
  },
];

export const learningTrail = [
  { id: "web-audio", title: "Web Audio", status: "已有可操作原型", evidence: "以瀏覽器原生 Web Audio API 建立位置、音高、濾波與受控音量的視聽映射。" },
  { id: "pure-data", title: "Pure Data", status: "學習中", evidence: "目前沒有可公開的 patch 或操作紀錄，因此只標示學習狀態。" },
  { id: "reaper", title: "REAPER", status: "學習中", evidence: "目前沒有可公開的 project 或聲音輸出，因此不加入媒體與成果連結。" },
];

export const aiWorkflow = {
  id: "ai-workflow",
  eyebrow: "AI-Assisted Development Workflow / 生成式 AI 協作流程",
  title: "讓 AI 留在方法裡，讓作品與判斷回到作者身上。",
  titleLines: [["讓 AI 留在", "方法裡，"], ["讓作品與判斷", "回到作者身上。"]],
  summary:
    "生成式 AI 協助程式架構、文字整理與錯誤檢查；作品事實、內容選擇、視覺方向、資訊架構、修改判斷與最終驗收由本人負責。",
  responsibilityGroups: [
    {
      label: "AI 協助",
      items: ["程式草稿與重複檢查", "文件結構與除錯線索", "建置、媒體與可及性稽核"],
    },
    {
      label: "作者決定",
      items: ["作品事實與選件", "研究主張與視覺方向", "修改取捨與最終驗收"],
    },
    {
      label: "明確排除",
      items: ["虛構作品或研究結果", "誇大技術熟練度", "以 AI 取代作者責任"],
    },
  ],
  versions: [
    {
      version: "Prompt v1",
      title: "作品集主提示詞",
      change: "建立真實性、GitHub Pages、媒體、無障礙與可驗證交付邊界。",
    },
    {
      version: "Prompt v2",
      title: "續作提示詞",
      change: "要求後續工作從 handoff 與實際證據續作，不重新發明既有架構。",
    },
  ],
  failureCases: [
    {
      problem: "部署路徑假設不成立",
      diagnosis: "建置檔仍使用網域根路徑，GitHub Pages project site 會找不到資源。",
      correction: "改用可攜式 base path，並新增正式建置稽核。",
    },
    {
      problem: "不支援狀態被生命週期覆寫",
      diagnosis: "無 Web Audio 的瀏覽器曾顯示為「聲音已停止」，沒有傳達真正原因。",
      correction: "把支援能力放進初始狀態，並以瀏覽器實測確認訊息與控制項。",
    },
  ],
  evidencePaths: [
    "docs/ai-workflow/portfolio-master-prompt.md",
    "docs/ai-workflow/portfolio-continuation-prompt.md",
    "docs/ai-workflow/prompt-changelog.md",
    "docs/ai-workflow/failure-cases.md",
  ],
};

export const terminologyMap = [
  ["教學設計", "互動體驗設計", "把學習目標、任務流程與回饋機制轉成可操作的互動經驗。"],
  ["教材架構", "資訊架構 / IA", "把內容層級、導覽節點與使用者路徑整理成清楚的系統。"],
  ["學習活動", "互動腳本 / User Flow", "把活動步驟轉換成觸發、回饋、選擇與完成條件。"],
  ["學習成效", "使用者測試 / Outcome Evidence", "用觀察、任務成功率、問卷或訪談支持設計判斷。"],
  ["影片教材", "影音敘事 / Motion & Sound", "把剪輯、聲音、節奏與視覺構圖當成沉浸式作品的核心語言。"],
  ["跨域專題", "跨域創生 / Creative Technology", "把設計、程式、影音、研究方法與 AI 工具整合成可展示的作品系統。"],
];

export const projectCaseStudies = [
  {
    id: "interactive-sound-learning",
    slug: "interactive-sound-learning",
    title: "互動聲響學習原型",
    titleLines: [["互動聲響"], ["學習原型"]],
    year: "2026",
    category: "Interactive Learning",
    source: "課程專題 / 研究整理",
    statusKey: "prototype",
    status: publicStatusLabels.prototype,
    submissionVisibility: "public",
    featured: true,
    priority: 1,
    summary:
      "一個把聲音回饋、互動操作與學習任務結合的原型，用來展示如何把抽象概念轉成可被感知的操作經驗。",
    valueProposition: "證明我能把教學設計轉譯為互動媒體，並規劃測試與迭代方法。",
    whatThisProves: "這件作品證明我能規劃互動流程、製作聲音與視覺回饋，並建立可供後續測試的原型。",
    designGoal: "讓使用者透過操作、聲音變化與即時回饋理解概念，而不是只閱讀靜態教材。",
    designProcess:
      "先拆解學習任務，再建立視聽映射與回饋節點，接著以 React 和 Web Audio API 製作原型；正式使用者觀察仍列為下一階段。",
    technologyAndMedia:
      "目前以 React、HTML/CSS/JS 與瀏覽器原生 Web Audio API 合成聲音並控制 pitch、pan、filter 與 gain，不使用遠端音訊。",
    outcomeShowcase:
      "目前以操作流程、聲響回饋邏輯與任務路徑作為展示核心，呈現互動媒體如何支援概念理解。",
    researchQuestion: "視覺位置、動態與量感如何被轉譯成可理解的聲音回饋？",
    interactionMappings: [
      { id: "horizontal-pan", input: "水平位置", parameter: "Stereo pan", rationale: "將畫面中的左右位置映射到聲像位置，建立一致的視聽空間。", inputRange: [0, 1], outputRange: [-0.85, 0.85] },
      { id: "vertical-pitch", input: "垂直位置", parameter: "Pitch", rationale: "以畫面上方對應高音、下方對應低音，運用高／低的空間隱喻。", inputRange: [0, 1], outputRange: [660, 110] },
      { id: "speed-brightness", input: "移動速度或持續操作", parameter: "Filter brightness", rationale: "讓動態強度轉為可聽的頻譜明亮度變化；節奏密度留待後續版本研究。", inputRange: [0, 1], outputRange: [700, 5000] },
      { id: "size-loudness", input: "物件大小", parameter: "Controlled loudness", rationale: "以受限的 gain 範圍探索視覺量感與聲音厚度的關係，避免把它寫成響度測量。", inputRange: [0, 1], outputRange: [0.04, 0.12] },
    ],
    signalFlow: ["Pointer／touch／keyboard input", "Triangle oscillator", "Low-pass filter", "Amplitude envelope", "Stereo panner", "Dynamics compressor", "Master gain"],
    listeningGuide: [
      "先將控制點左右移動，辨識聲像在雙聲道之間的位置變化。",
      "再比較控制點位於上方與下方時的音高差異。",
      "快速移動時留意音色變亮；放慢時音色回到較柔和狀態。",
      "調整物件大小，聆聽受控制的音量變化；此變化不代表正式響度測量。",
    ],
    interactivePrototype: { type: "webAudioSpatialMapper", status: "prototype", instructions: { pointer: "拖曳控制點改變左右位置與音高。", keyboard: "使用三個滑桿的方向鍵調整水平、垂直與大小；Escape 可停止聲音。" } },    trackIds: ["interactive-media-ux", "multimedia-video-sound", "edtech-digital-content", "user-research-outcomes-process"],
    cover: mediaAsset("mv-urban", "互動聲響學習原型的封面圖，使用藍綠色動態幾何視覺。"),
    problemAwareness:
      "許多學習內容只停留在閱讀或觀看，缺少可以操作、聽見與立即修正的回饋。本作品用聲響互動降低抽象概念的理解門檻。",
    audience: "目標對象為需要透過操作理解抽象概念的學習者，以及想把影音素材轉成互動教材的創作者。",
    diagrams: [
      diagramEvidence(
        "gd-kinetic",
        "interactionFlow",
        "互動流程圖",
        "標示使用者從進入、操作、聽見回饋到完成任務的路徑。",
        "互動流程圖，使用藍綠色幾何圖形表示節點與路徑。",
      ),
      diagramEvidence(
        "ph-geometry",
        "systemArchitecture",
        "系統架構圖",
        "拆解輸入、聲音處理、視覺回饋與資料紀錄的關係。",
        "系統架構圖，使用米色與藍色幾何形狀表示模組。",
      ),
      diagramEvidence(
        "gd-analog",
        "informationArchitecture",
        "資訊架構圖",
        "整理任務說明、操作區、回饋區與成果區的內容層級。",
        "資訊架構圖，使用粉色與綠色分層視覺。",
      ),
    ],
    media: { visualDrafts: [], screenshots: [], videos: [], audio: [], demos: [] },
    tools: ["React", "Web Audio API", "HTML/CSS/JS", "Figma"],
    roles: ["企劃", "教學設計", "UX", "介面設計", "程式", "聲音設計"],
    testing: {
      statusKey: "notValidated",
      status: "尚未進行正式使用者驗證；目前證據限於可操作原型與技術行為檢查。",
      metrics: [], insights: [], learningOutcomes: [],
      plannedMethods: ["觀察使用者能否不看說明辨識左右聲像與高低音映射。", "以短任務記錄操作完成情形、錯誤與口述理解。", "比較 reduced-motion 與不同輸入方式下的操作可理解性。"],
    },
    reflection: {
      strengths: "作品已把位置、速度與大小轉成可操作的聲音參數，形成互動媒體與學習設計的技術原型。",
      limitations: "目前仍需要真實使用者測試、聲音素材與更完整的互動紀錄來支撐成效。",
      graduateDirection: "進入研究所後可深化為聲響互動、AI 輔助學習回饋與沉浸式教育媒體研究。",
    },
    instituteConnections: ["互動媒體", "聲響", "沉浸式體驗", "跨域創生"],
    themeEvidenceStatus: {
      互動媒體: "demonstrated",
      聲響: "demonstrated",
      沉浸式體驗: "researchDirection",
      跨域創生: "demonstrated",
    },
    themeRationales: {
      互動媒體: "核心是使用者操作、即時回饋與互動流程。",
      聲響: "聲音不是背景素材，而是理解狀態與回饋的資訊層。",
      沉浸式體驗: "可延伸為空間聲音、感測器或場域式學習體驗。",
      跨域創生: "結合教學設計、程式、聲音與視覺敘事。",
    },
    links: [],
    credits: "個人角色聚焦於企劃、教學設計、UX、互動原型與聲音回饋規劃。",
    seo: {
      title: "互動聲響學習原型 | RU / YUAN",
      description: "以聲響、互動與學習任務構成的研究型作品案例。",
    },
  },
  {
    id: "generative-interface-study",
    slug: "generative-interface-study",
    eyebrow: "文學 × AI",
    title: "AI 文學故事 MV",
    titleLines: [["AI 文學"], ["故事 MV"]],
    englishTitle: "AI Literature Story MV — From Text to a Cross-Tool Narrative Workflow",
    metadataOmissions: ["year"],
    category: "生成式 AI 內容設計 / 數位學習案例",
    source: "內容設計 / 流程實作",
    statusKey: "prototype",
    status: publicStatusLabels.prototype,
    submissionVisibility: "public",
    featured: true,
    priority: 2,
    summary:
      "以文學教育為情境，讓 ChatGPT 拆解故事與字幕、Suno 設計情緒配樂、Canva 完成剪輯，建立可重複檢查的跨工具故事影音流程。",
    tags: ["文學教育", "生成式 AI", "Prompt Design", "視覺敘事", "聲音情緒設計"],
    valueProposition: "把教學需求轉譯成有明確工具分工、輸出限制與人工檢查點的生成式影音流程。",
    overviewFacts: "40 秒 / 8 幕 / EN + zh-TW 字幕 / 影音原型完成，學習成效未驗證",
    whatThisProves: "這件作品證明我能整合內容拆解、Prompt Design、視覺敘事、聲音情緒設計與跨工具製作。",
    designGoal:
      "把複雜影音製作拆成文本理解、分鏡拆解、圖像與字幕、情緒配樂、剪輯輸出五個階段，為每階段指定工具與檢查點，讓文學判讀能一路連到可播放成片。",
    designProcess:
      "先確認文學情節與學習語境，再用 ChatGPT 建立八幕分鏡與 B1 字幕規格，接著統一圖像方向、以 Suno 生成情緒配樂，最後在 Canva 對齊畫面、字幕與音樂。",
    technologyAndMedia:
      "ChatGPT 負責故事整理、分鏡、字幕與圖像提示；生成式圖像工具建立場景；Suno 提供無歌詞配樂；Canva 整合畫面、字幕、音樂並輸出影片。",
    outcomeShowcase:
      "目前可核對的成果是 40 秒、8 幕《Hamlet》故事 MV、雙語 WebVTT 字幕、逐字稿與依案例決策整理的衍生 Prompt Template v1；原始 Prompt log、旁白版本與教學成效仍屬後續工作。",
    trackIds: ["ai-interactive-learning-creation", "multimedia-video-sound", "edtech-digital-content"],
    cover: mediaAsset("hamlet-story-mv-cover", "《Hamlet》故事 MV 封面裁切，Hamlet 在月夜城牆上面對父親的 Ghost。"),
    problemAwareness:
      "傳統文學作業常停留在摘要或文字報告，閱讀理解、英文表達與影音製作也容易各自分離。本案例把生成式 AI 安排在故事拆解、語言調整、視覺規格與音樂情緒等不同階段，重點不在工具數量，而是建立能重複執行與逐步檢查的內容流程。",
    audience: "使用情境設定為大學通識英語課程的文學故事影音創作，服務需要把閱讀理解轉成英文與跨媒體敘事的學習任務。",
    projectInfo: [
      { label: "專案類型", value: "生成式 AI 內容設計 / 數位學習案例" },
      { label: "我的角色", value: "AI 工作流程與提示詞設計" },
      { label: "核心工具", value: "ChatGPT / 生成式圖像工具 / Suno / Canva" },
      { label: "主要產出", value: "40 秒、8 幕故事 MV 與雙語字幕" },
      { label: "使用情境", value: "大學通識英語課程之文學故事影音創作" },
      { label: "驗證狀態", value: "成片與字幕已核對；學習成效尚未驗證" },
    ],
    challenge: {
      title: "讓文學正確性與跨媒體敘事同時成立",
      description:
        "流程必須同時守住情節合理、以 B1 為目標的英文可讀性、AI 圖像風格一致，以及圖像、字幕、旁白與音樂共同指向同一段敘事；每個工具步驟都要被轉成可執行、可核對且保留人工判斷責任的製作條件。",
    },
    workflow: {
      title: "五階段跨工具工作流",
      summary: "每個階段都有指定工具、敘事任務與控制條件，讓輸出能在進入下一個工具前先被人工核對。",
      stages: [
        {
          title: "文本理解",
          description: "確認故事背景、主要衝突與結局，先建立不偏離原作的敘事骨架。",
          tool: "人工判讀 / 原作文本",
          input: "《Hamlet》原作情節與本案例的 40 秒任務範圍",
          output: "背景、人物關係、核心衝突與結局的敘事骨架",
          constraint: "保留開頭、衝突、結尾與關鍵人物關係",
          humanCheck: "逐項核對人物、事件因果與結局是否能由原作支持。",
        },
        {
          title: "分鏡拆解",
          description: "用 ChatGPT 將長篇情節切成可視覺化節點，安排每幕的敘事功能。",
          tool: "ChatGPT",
          input: "已核對的敘事骨架與 40 秒時長",
          output: "八個五秒場景節點、每幕事件與字幕草稿",
          constraint: "8–10 scenes；每張圖片一個關鍵情節",
          humanCheck: "確認八幕順序、人物與事件因果沒有跳躍或重複。",
        },
        {
          title: "圖像字幕",
          description: "同步產生場景圖規格與清楚英文字幕，讓畫面與語言描述同一事件。",
          tool: "ChatGPT / 生成式圖像工具",
          input: "八幕節點、B1 語言目標與 Gothic 視覺方向",
          output: "16:9 場景圖、英文畫面文字與繁中對照",
          constraint: "以 B1 為目標；每句 12–18 words；一至兩行；圖內無文字",
          humanCheck: "核對字幕字數、換行、情節正確性與跨幕角色／光線一致性。",
        },
        {
          title: "情緒配樂",
          description: "以 Suno 產生無歌詞配樂，讓悲傷、神祕與緊張在段落間漸進。",
          tool: "Suno",
          input: "八幕情緒弧線與 40 秒節奏",
          output: "服務神祕、悲傷與高潮轉折的無歌詞配樂",
          constraint: "instrumental / mysterious / sad / slow build / no lyrics",
          humanCheck: "逐段聆聽情緒轉折，確認音樂不與字幕閱讀競爭。",
        },
        {
          title: "剪輯輸出",
          description: "在 Canva 對齊圖像、字幕與音樂，檢查節奏後輸出影片。",
          tool: "Canva",
          input: "八幕場景圖、雙語字幕時間碼與無歌詞配樂",
          output: "40 秒 clean MP4、Poster 與 English／繁中 WebVTT",
          constraint: "16:9；每幕 5–8 秒；有旁白時降低背景音樂",
          humanCheck: "逐幕核對字幕同步、畫面完整、音樂主次與結尾收束。",
        },
      ],
    },
    promptDecisions: [
      {
        title: "敘事顆粒度",
        evidenceStatus: "specificationOnly",
        evidenceSource: "approvedBrief",
        artifactRefs: [],
        constraint: "8–10 scenes；每張圖片只承擔一個關鍵情節。",
        rationale: "避免單張畫面塞入多個事件，讓故事因果與分鏡順序能逐幕核對。",
        outputProblem: "修正情節跳躍、畫面資訊過載與剪輯節奏不穩。",
        humanCheck: "逐幕確認人物、事件因果與前後銜接。",
      },
      {
        title: "語言可讀性",
        evidenceStatus: "specificationOnly",
        evidenceSource: "approvedBrief",
        artifactRefs: [],
        constraint: "以 B1 為目標；每句 12–18 words；字幕不超過兩行。",
        rationale: "用清楚的現代英文保留情節重點，避免艱深原文壓過畫面閱讀。",
        outputProblem: "避免字幕過長、詞彙難度失控與播放時來不及讀完。",
        humanCheck: "核對字數、句意、情節正確性與換行位置。",
      },
      {
        title: "視覺一致性",
        evidenceStatus: "specificationOnly",
        evidenceSource: "approvedBrief",
        artifactRefs: [],
        constraint: "dark Gothic / candlelight / cinematic / 16:9；圖片內不生成文字。",
        rationale: "把場景的光線、時代氣氛與畫幅固定，讓八幕看起來屬於同一故事。",
        outputProblem: "避免角色與色調漂移、畫幅不一，以及生成文字破壞後製。",
        humanCheck: "比較人物外觀、光源、構圖與情緒是否連續。",
      },
      {
        title: "音樂與混音",
        evidenceStatus: "specificationOnly",
        evidenceSource: "approvedBrief",
        artifactRefs: [],
        constraint: "instrumental / slow build / no lyrics；有旁白時降低音樂音量。",
        rationale: "讓音樂建立情緒弧線但不與語言資訊競爭，保留敘事主次。",
        outputProblem: "避免歌詞干擾字幕、情緒突變或背景音樂遮蔽旁白。",
        humanCheck: "逐段聆聽情緒轉折與語音可懂度。",
      },
    ],
    promptTemplate: {
      originStatus: "derived",
      evidenceRef: "hamlet-prompt-template-v1",
      usedForExistingVideo: false,
      eyebrow: "Reusable artifact / 衍生模板",
      title: "文學故事 MV Prompt Template v1",
      provenance: "此版本於 2026/07/17 依公開案例的四項 Prompt 決策重新整理，屬後設衍生模板，不是原始生成對話紀錄。",
      summary: "先替換五個變數，再要求模型輸出故事事實、逐幕規格與自我檢查欄；每一項仍需由作者核對原作、語言與媒體一致性。",
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
        "每幕只承擔一個關鍵事件，輸出：敘事功能、人物與動作、英文字幕、繁中對照、圖像生成規格與人工核對點。",
        "英文字幕使用 {{learner_level}} 程度，每句 12–18 words、最多兩行；保留完整因果，不大量引用原文。",
        "所有圖像規格沿用 {{visual_direction}}，角色、光源與構圖需前後一致，圖片內不生成文字。",
        "配樂沿用 {{music_direction}}；若加入旁白或對話，語音清晰度優先於背景音樂。",
        "最後輸出逐幕一致性檢查表，分開檢查原作事實、字幕可讀性、視覺連續性、音樂情緒與剪輯節奏。",
      ],
      reviewChecklist: [
        "原作事實、人物關係與事件因果已由作者逐幕核對。",
        "字幕字數、程度、換行與播放時間符合學習情境。",
        "圖像角色、光源、畫幅與情緒方向在各幕保持連續。",
        "音樂與剪輯服務敘事，不遮蔽字幕、旁白或對話。",
      ],
    },
    storyboard: {
      title: "《Hamlet》八幕分鏡",
      summary: "以下畫面直接擷取自 40 秒 clean 成片；每幕對應一個 5 秒敘事節點與實際英文字幕，不是另製的示意圖。",
      frames: [
        { title: "幽靈揭露真相", titleEn: "The Ghost Reveals the Truth", time: "00:00–00:05", seekSeconds: 0, subtitle: "On a cold night, Hamlet sees his father's ghost and learns a terrible secret.", description: "Ghost 揭露秘密，建立故事衝突。", control: "一幕只承擔秘密揭露；人物關係與復仇動機需能由原作核對。", image: responsivePortfolioImage("hamlet-story-mv-scene-01", 1200, 675, "月夜城牆上，Hamlet 面對父親 Ghost 的第一幕。") },
        { title: "悲傷與遲疑", titleEn: "Grief and Doubt", time: "00:05–00:10", seekSeconds: 5, subtitle: "Hamlet feels deep grief and doubt, and he cannot decide how to act.", description: "悲傷與懷疑讓行動延宕。", control: "以一個決策困境推進情節；字幕維持 12–18 words。", image: responsivePortfolioImage("hamlet-story-mv-scene-02", 1200, 675, "Hamlet 獨處並陷入悲傷與遲疑的第二幕。") },
        { title: "假裝瘋狂並暗中觀察", titleEn: "Feigned Madness", time: "00:10–00:15", seekSeconds: 10, subtitle: "Hamlet pretends to be mad while he watches the king for signs of guilt.", description: "以假裝瘋癲觀察國王的罪惡反應。", control: "畫面只呈現觀察行動，不把尚未證實的罪惡寫成已揭露事實。", image: responsivePortfolioImage("hamlet-story-mv-scene-03", 1200, 675, "Hamlet 假裝瘋癲並觀察國王的第三幕。") },
        { title: "戲中戲暴露罪惡", titleEn: "The Play Exposes Guilt", time: "00:15–00:20", seekSeconds: 15, subtitle: "A play at court mirrors the murder, and Claudius reacts with sudden fear.", description: "戲中戲讓 truth 與 betrayal 浮現。", control: "以 Claudius 的反應作為單一視覺重點，保留事件因果。", image: responsivePortfolioImage("hamlet-story-mv-scene-04", 1200, 675, "宮廷戲劇重現謀殺並使 Claudius 恐懼的第四幕。") },
        { title: "Ophelia 的絕望", titleEn: "Ophelia's Despair", time: "00:20–00:25", seekSeconds: 20, subtitle: "Rejected and heartbroken, Ophelia loses her peace and slowly falls into despair.", description: "個人選擇的代價進入敘事。", control: "避免把複雜因果簡化為單一責任；字幕只描述此幕可見情節。", image: responsivePortfolioImage("hamlet-story-mv-scene-05", 1200, 675, "Ophelia 因拒絕與心碎陷入絕望的第五幕。") },
        { title: "墓園中的生死反思", titleEn: "Graveyard Reflection", time: "00:25–00:30", seekSeconds: 25, subtitle: "In the graveyard, Hamlet holds a skull and thinks about death and time.", description: "以墓園場景推進死亡與 morality 的思考。", control: "用頭骨與墓園聚焦死亡反思，不加入圖內生成文字。", image: responsivePortfolioImage("hamlet-story-mv-scene-06", 1200, 675, "Hamlet 在墓園手持頭骨思考死亡的第六幕。") },
        { title: "決鬥與復仇", titleEn: "The Final Duel", time: "00:30–00:35", seekSeconds: 30, subtitle: "The final duel begins, but poison and revenge soon destroy the royal court.", description: "action、毒藥與 revenge 匯入高潮。", control: "動作、毒藥與復仇在同一高潮節點匯合，仍維持 16:9 構圖。", image: responsivePortfolioImage("hamlet-story-mv-scene-07", 1200, 675, "最後決鬥以毒藥與復仇摧毀王室的第七幕。") },
        { title: "悲劇性的結局", titleEn: "Tragic Aftermath", time: "00:35–00:40", seekSeconds: 35, subtitle: "After great loss and silence, Hamlet dies, and Denmark faces a tragic end.", description: "以失落與沉默收束悲劇。", control: "保留完整結局並以單一收束畫面結束，不循環影片。", image: responsivePortfolioImage("hamlet-story-mv-scene-08", 1200, 675, "Hamlet 死去、丹麥迎向悲劇結局的第八幕。") },
      ],
    },
    featuredExample: {
      eyebrow: "Literary spotlight / 代表案例",
      title: "《Hamlet》：從 Ghost 相遇展開的敘事弧線",
      summary:
        "《Hamlet》被拆成八個可視覺化節點，從 Ghost 揭露秘密、Hamlet 在復仇與真相間遲疑，到背叛、道德選擇與悲劇結局。Hamlet 與 Ghost 相遇能同時交代人物關係、核心衝突與陰鬱氛圍，因此作為代表場景；字幕改用清楚的現代英文，不大量引用原文，讓文學線索與影音節奏都能被讀懂並保有完整結局。",
      themes: ["revenge", "truth", "betrayal", "hesitation", "action", "morality"],
      focusTitle: "為什麼從 Ghost 場景開始？",
      focusDescription: "這一幕同時提供角色關係、秘密、復仇動機與視覺情緒，是把抽象主題轉成可見衝突的最有效起點。",
    },
    mediaLayers: [
      { label: "故事節點", status: "已實作", role: "先用八個可核對事件建立開端、衝突、轉折與悲劇結局。", check: "人物、事件因果與前後順序是否能由原作支持。" },
      { label: "場景圖像", status: "已實作", role: "每幕聚焦一個事件，以一致場景風格承載文學情節。", check: "人物、光源、構圖與前後情緒是否連續。" },
      { label: "英文字幕／情節文字", status: "已實作", role: "以 B1 為目標濃縮事件，維持 12–18 words 與一至兩行。", check: "字數、換行、可讀時間與情節正確性。" },
      { label: "情緒配樂", status: "已實作", role: "無歌詞配樂以慢速堆疊悲傷、神祕與緊張。", check: "情緒轉折是否服務敘事且不搶走語言注意力。" },
      { label: "Canva 剪輯與最終影片", status: "已實作", role: "把八幕畫面、字幕時間碼與音樂整合為 40 秒 16:9 成片。", check: "每幕節奏、字幕同步與結尾收束。" },
    ],
    deliverables: [
      { id: "clean-video", title: "40 秒、8 幕故事 MV", statusKey: "artifactVerified", status: "實際成果", evidenceRefs: ["hamlet-clean-video"], attributionSource: "deliveryPackage", description: "clean 版本已具 H.264 影像、AAC 音訊、16:9 畫幅與可切換字幕。" },
      { id: "bilingual-captions", title: "雙語字幕與逐字稿", statusKey: "artifactVerified", status: "實際成果", evidenceRefs: ["hamlet-en-vtt", "hamlet-zh-vtt"], attributionSource: "deliveryPackage", description: "英文與繁中 WebVTT 各有八段連續時間碼，並附中英畫面文字紀錄。" },
      { id: "scene-breakdown", title: "場景拆解", statusKey: "artifactDerived", status: "流程產出", evidenceRefs: ["hamlet-storyboard-responsive"], attributionSource: "verifiedArtifact", description: "依成片整理八個關鍵情節與每幕敘事功能，作為故事連續性檢查依據。" },
      { id: "prompt-template-v1", title: "跨工具 Prompt Template v1", statusKey: "processDerived", status: "流程產出", evidenceRefs: ["hamlet-prompt-template-v1"], attributionSource: "publishedCaseConstraints", description: "依本案例四項決策整理的可重複模板；明確標示為後設衍生版本，不回填成原始 Prompt log。" },
      { id: "caption-specification", title: "英文字幕目標規格", statusKey: "specificationOnly", status: "製作規格", evidenceRefs: [], attributionSource: "approvedBrief", description: "以 B1 為目標，搭配每句 12–18 words、一至兩行控制語言難度與播放可讀性。" },
      { id: "music-specification", title: "Suno 配樂 Prompt", statusKey: "specificationOnly", status: "製作規格", evidenceRefs: [], attributionSource: "approvedBrief", description: "以 instrumental、mysterious、sad、slow build、no lyrics 定義情緒方向。" },
      { id: "integrated-video-output", title: "整合影片輸出", statusKey: "artifactVerified", status: "實際成果", evidenceRefs: ["hamlet-clean-video"], attributionSource: "approvedBrief", description: "目前可核對的是完成輸出的 MP4；工具歸因依核准專案說明記錄，不把可編輯 Canva 專案當成已取得證據。" },
    ],
    evidenceBoundary: {
      title: "把可核對成果、核准規格與外部門檻分開",
      verifiedArtifacts: ["clean MP4 與技術規格", "英文／繁中 WebVTT 與八段時間碼", "由成片衍生的 poster、封面與八幕畫面"],
      approvedSpecifications: ["五階段工具分工", "四項 Prompt 限制", "旁白與混音規則"],
      notIndependentlyVerified: ["原始 Prompt 執行紀錄", "八張原始場景檔與獨立音樂檔", "素材權利／來源清單", "課堂學習成效"],
    },
    outcomes: [
      { kind: "designValue", title: "流程可重複", description: "五階段把工具交接點與檢查條件寫清楚，下一部作品可沿用同一骨架再替換文本與情緒方向。" },
      { kind: "designValue", title: "內容可檢查", description: "故事節點、B1 目標字幕與文學情節分開核對，為後續課堂播放與學生任務建立可評量與修訂基礎。" },
      { kind: "designValue", title: "媒體同方向", description: "圖像、字幕、音樂與剪輯共享相同敘事目標，降低各工具各自生成、最後難以整合的風險。" },
    ],
    evaluationPlan: {
      status: "planned",
      title: "形成性評估計畫",
      summary: "此計畫只定義下一輪要蒐集的證據與修訂用途，不填入參與人數、執行日期或結果。",
      participantRoles: ["大學通識英文學習者", "授課教師或教學助理"],
      tasks: [
        { id: "story-retell", status: "planned", task: "依八幕順序重述背景、衝突與結局。", evidenceToCollect: ["順序錯置", "人物或情節誤解"], decisionUse: "修訂場景顆粒度與事件因果提示。" },
        { id: "caption-readability", status: "planned", task: "在一般播放速度下閱讀字幕並說明每幕事件。", evidenceToCollect: ["未讀完的字幕", "詞彙或換行問題"], decisionUse: "調整字幕字數、目標難度與停留時間。" },
        { id: "teacher-review", status: "planned", task: "檢視原作正確性、任務適配度與媒體主次。", evidenceToCollect: ["事實修正", "教學引導與評量建議"], decisionUse: "修訂 Prompt 檢查點與教師／學生指南。" },
      ],
      dataPolicy: "實施前先確認同意、最小化紀錄範圍，並將個人資料與公開作品證據分開保存。",
    },
    keyInsight:
      "這次最重要的不是同時使用多少生成工具，而是先把故事拆成可判斷的單位，再用限制條件、人工核對與明確工具分工守住內容方向。只有當每次輸出都能被檢查、修正與交接，生成流程才真正能被重複使用。",
    nextSteps: [
      "將流程擴充到其他文學作品，檢查不同敘事結構是否仍適用同一套場景顆粒度。",
      "以另一部文學作品試跑 Prompt Template v1，記錄變數、失敗輸出與人工修正，再形成可追溯的版本紀錄。",
      "加入學生測試、學習回饋與教師版 / 學生版指南，再評估課堂使用方式。",
    ],
    ctas: [
      { label: "播放案例影片", href: "#generative-interface-study-featured-media", focusTarget: "#generative-interface-study-featured-media-player" },
      { label: "查看八幕分鏡", href: "#generative-interface-study-storyboard" },
      { label: "閱讀 Prompt 設計", href: "#generative-interface-study-prompt-system" },
    ],
    diagrams: [],
    featuredMediaIntro: "這是可核對的 40 秒 clean 成片，不是流程示意或假播放器；可切換 English 與繁體中文字幕。",
    media: {
      visualDrafts: [],
      screenshots: [],
      videos: [
        {
          title: "《Hamlet》AI 文學故事 MV",
          src: publicAssetUrl("media/portfolio/hamlet-story-mv-clean-web-1080p.mp4"),
          poster: responsivePortfolioImage("hamlet-story-mv-poster", 1200, 675, "《Hamlet》故事 MV 首圖，Hamlet 在月夜城牆上面對父親的 Ghost。"),
          caption: "40 秒、8 幕的 clean 版本；每幕 5 秒，外掛英文與繁中 WebVTT 字幕，影片不自動播放。",
          technicalSummary: "00:40 · 8 scenes · 16:9 · EN / zh-TW subtitles · instrumental / no narration",
          accessibilitySummary: "字幕：English／繁體中文 · 全片無旁白",
          transcript: "影片由 Ghost 揭密開始，依序經過 Hamlet 的遲疑、戲中戲、Ophelia、墓園、決鬥與悲劇結局；全片持續播放無歌詞音樂，沒有旁白。",
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
    roles: ["AI 工作流程與提示詞設計", "內容拆解", "Prompt Design", "影音敘事規格"],
    testing: {
      statusKey: "notValidated",
      status: "影音原型已完成；尚未進行學習者測試與成效驗證。已核對 40 秒、8 幕影片、雙語字幕與逐字稿。",
      metrics: [],
      insights: [],
      learningOutcomes: [],
      plannedMethods: [
        "觀察學生能否依八幕順序重述故事背景、衝突與結局。",
        "檢查 B1 字幕在課堂播放速度下是否能被讀完並正確理解。",
        "蒐集教師對文學正確性、畫面一致性與課堂任務適配度的回饋。",
      ],
    },
    reflection: {
      strengths: "已有可播放成片、八幕實際畫面與雙語字幕，並把每個工具的敘事責任與限制條件明確分開。",
      limitations: "目前沒有學生測試、教師評閱、完整 Prompt log 或旁白版本，因此不主張學習成效或製作效率已被證明。",
      graduateDirection: "後續可深化生成式 AI 內容治理、聲音情緒設計與文學學習任務的形成性評估。",
    },
    instituteConnections: ["AI", "聲響", "跨域創生"],
    themeEvidenceStatus: {
      AI: "demonstrated",
      聲響: "demonstrated",
      跨域創生: "demonstrated",
    },
    themeRationales: {
      AI: "以限制條件、人工核對與工具交接建立可重複的 Prompt workflow。",
      聲響: "以無歌詞配樂、情緒弧線與未來旁白混音規則服務故事主次。",
      跨域創生: "整合文學理解、英文表達、視覺敘事、音樂與影片製作。",
    },
    links: [],
    credits: "個人角色聚焦於 AI 工作流程與提示詞設計、內容拆解與影音敘事規格。",
    seo: {
      title: "AI 文學故事 MV | RU / YUAN",
      description: "以《Hamlet》為代表案例，展示 ChatGPT、生成式圖像、Suno 與 Canva 如何形成可檢查的文學故事影音流程。",
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
    category: "Data Visualization / Motion",
    source: "數位學習相關課程成果",
    statusKey: "completed",
    status: publicStatusLabels.completed,
    submissionVisibility: "public",
    featured: true,
    priority: 4,
    summary:
      "以 Spotify Wrapped 等資料視覺化案例為起點，分析資料如何透過敘事節奏、視覺層級與情緒設計轉化為容易理解的個人化回饋，並延伸討論其在數位學習中的應用可能。",
    valueProposition: "展示我能把案例觀察、資料敘事與數位學習設計連接起來，而不是只停留在圖表形式介紹。",
    whatThisProves: "這件作品證明我能辨識資料視覺化背後的設計邏輯，並把它轉譯成學習回饋、個人化摘要與互動媒體的設計方向。",
    designGoal: "理解高品質資料視覺化案例如何把龐雜資料轉成可閱讀、可分享、可反思的經驗，並提出數位學習情境中的設計轉化。",
    designProcess:
      "前期以生成式 AI 輔助蒐集案例線索，再由人工篩選案例、整理視覺策略、建立論述架構，最後以動態簡報與影片形式呈現分析。",
    technologyAndMedia:
      "作品以案例研究、視覺分析、Power BI、Excel、Canva 動態簡報與影片製作為主要媒介；Gemini 與 ChatGPT 用於輔助蒐集案例線索，最終篩選、判斷與論述由本人完成。",
    outcomeShowcase:
      "公開成果以分析影片呈現，重點包含資料故事、個人化回饋、情緒設計、學習應用推論與後續互動化可能。",
    trackIds: ["edtech-digital-content", "multimedia-video-sound", "interactive-media-ux", "user-research-outcomes-process"],
    cover: svgAsset(
      "work-01-cover",
      1200,
      900,
      "資料視覺化實際案例與數位學習應用探討作品封面，以節點、圖表與動態軌跡呈現分析主題。",
    ),
    problemAwareness:
      "數位學習平台累積大量行為資料，但資料若只以表格或靜態指標呈現，往往難以促成理解與反思。本作品關注資料如何被設計成有敘事、有情緒、有行動線索的學習回饋。",
    audience: "目標觀眾包含數位學習設計者、對個人化學習回饋感興趣的學生，以及希望理解資料視覺化如何影響使用者感受的創作者。",
    diagrams: [
      {
        type: "interactionFlow",
        title: "資料故事轉譯流程",
        caption: "從案例蒐集、資料敘事拆解、學習情境轉化到影片呈現的工作流程。",
        description: "流程圖用於說明這件作品如何由案例研究轉化為數位學習應用觀點。",
        image: svgAsset("work-01-process", 1200, 900, "資料故事轉譯流程圖，呈現案例蒐集、分析、學習轉化與影音呈現。"),
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
          caption: "公開影片呈現資料視覺化案例分析與數位學習應用探討。",
          transcript:
            "影片摘要：從資料視覺化案例出發，說明資料敘事、個人化回饋與學習應用之間的關係。",
        },
      ],
      audio: [],
      demos: [],
      restricted: [],
    },
    extendedSections: [
      {
        title: "01｜作品定位",
        summary: "這不是單純介紹圖表，而是把資料視覺化視為數位學習中的溝通介面。",
        paragraphs: [
          "作品從知名資料視覺化案例切入，觀察資料如何被重新組織成使用者願意閱讀、理解與分享的敘事。",
          "在數位學習脈絡中，這種設計可延伸為學習歷程摘要、個人化回饋、階段成就視覺化與反思提示。",
        ],
      },
      {
        title: "02｜問題意識",
        summary: "學習資料若缺乏敘事與情境，容易變成難以行動的數字。",
        bullets: [
          "資料需要被設計成有層級、有節奏、有情緒的理解路徑。",
          "視覺化不應只追求好看，也應協助學習者知道自己目前的位置與下一步。",
          "個人化資料回饋必須避免過度簡化或誤導。",
        ],
      },
      {
        title: "03｜目標使用者與觀眾",
        summary: "作品面向數位學習設計者與希望理解資料回饋設計的創作者。",
        paragraphs: [
          "對學習者而言，資料視覺化可協助回看自己的學習歷程；對設計者而言，案例分析可提供資料回饋介面的設計參考。",
        ],
      },
      {
        title: "04｜案例分析方法",
        summary: "生成式 AI 用於輔助蒐集線索，最後判斷、篩選與論述仍由人工完成。",
        bullets: [
          "先蒐集具代表性的資料視覺化案例。",
          "再拆解資料來源、視覺層級、敘事節奏與情緒設計。",
          "最後轉譯成數位學習可能應用，而非直接宣稱案例具有教學成效。",
        ],
      },
      {
        title: "05｜與本所連結",
        summary: "作品可連接互動媒體、AI 輔助分析、聲響化資料與跨域創生。",
        paragraphs: [
          "未來若進入研究所，可將案例分析延伸成互動儀表板、學習資料聲響化、個人化回饋介面或沉浸式學習歷程展示。",
        ],
      },
    ],
    tools: ["Power BI", "Excel", "Canva", "Gemini", "ChatGPT"],
    roles: ["企劃", "資料蒐整", "案例分析", "教學設計轉譯", "視覺敘事", "影片製作"],
    testing: {
      statusKey: "exploratory",
      status: "本作品目前作為案例分析與應用探討，不宣稱已完成學習成效驗證。",
      metrics: [
        { label: "驗證狀態", value: "案例分析" },
        { label: "公開成果", value: "影片" },
      ],
      insights: [
        "可作為後續數位學習資料回饋原型的設計基礎。",
        "需要進一步以真實學習者任務驗證資料回饋是否提升理解或反思。",
      ],
      learningOutcomes: [],
      plannedMethods: ["以真實學習者任務檢查資料回饋是否支持理解與反思。"],
    },
    reflection: {
      strengths: "能把資料視覺化案例轉化為數位學習設計語言，並以影片形式建立清楚的敘事節奏。",
      limitations: "目前仍以案例分析與應用推論為主，尚未進入真實學習者測試或互動原型驗證。",
      graduateDirection:
        "進入研究所後可深化為學習歷程資料的互動視覺化、AI 輔助個人化回饋、聲響化資料提示與沉浸式學習分析介面。",
    },
    instituteConnections: ["AI", "互動媒體", "聲響", "跨域創生"],
    themeEvidenceStatus: {
      AI: "demonstrated",
      互動媒體: "researchDirection",
      聲響: "researchDirection",
      跨域創生: "demonstrated",
    },
    themeRationales: {
      AI: "生成式 AI 可作為案例蒐整與資料回饋構想的輔助工具，但最終論述需由人工判斷。",
      互動媒體: "資料視覺化可延伸為可操作、可探索的學習回饋介面。",
      聲響: "未來可把學習節奏、任務進度與反思提示轉成聲響化資料回饋。",
      跨域創生: "作品結合資料分析、教學設計、視覺敘事與影音製作。",
    },
    links: [],
    credits: "個人角色聚焦於案例蒐整、視覺分析、數位學習轉譯與影片敘事。",
    seo: {
      title: "資料視覺化實際案例與數位學習應用探討 | RU / YUAN",
      description: "以公開資料視覺化案例為基礎，探討資料敘事與數位學習回饋設計的作品案例。",
    },
  },
  {
    id: "learning-dashboard-analysis",
    slug: "learning-dashboard-analysis",
    title: "線上學習互動行為與學科成績之資料視覺化分析",
    titleLines: [["線上學習", "互動行為與"], ["學科成績之", "資料視覺化"], ["分析"]],
    year: "2026",
    productionDate: "2026/06/11–2026/06/12",
    category: "Learning Analytics / Power BI",
    source: "課程期末專題（一人一組）",
    statusKey: "prototype",
    status: publicStatusLabels.prototype,
    submissionVisibility: "public",
    featured: true,
    priority: 5,
    summary:
      "以 Power BI 建立線上學習互動行為與學科成績的探索型儀表板，觀察互動紀錄、影片觀看與成績欄位之間的分布關係，並明確標示資料限制與不可推論為因果。",
    valueProposition: "展示我能把學習平台資料整理成可閱讀的儀表板，同時保留資料倫理、圖表定義與推論邊界。",
    whatThisProves: "這件作品證明我能處理資料清理、視覺化設計、互動儀表板與研究限制說明，而不把視覺關聯誤寫成學習成效證明。",
    designGoal: "建立一個可供教學者或研究者探索學習互動分布的儀表板，協助提出後續可驗證的問題，而不是直接做因果判斷。",
    designProcess:
      "作品先進行資料欄位理解與清理，再在 Power BI 中建立資料模型、圖表頁面與互動篩選，最後整理圖表解讀限制與未來修正方向。",
    technologyAndMedia:
      "主要工具包含 Microsoft Power BI Desktop、Microsoft Excel、Power Query 與 DAX；公開頁面只呈現概念化且不含真實資料值的圖像與文字說明。",
    outcomeShowcase:
      "成果呈現互動儀表板的頁面邏輯、資料欄位關係、圖表定義與限制說明。圓環圖使用 sn 的計數；觀看相關直條圖公開標題採用「不同數學成績分群的學習者／紀錄數」，只描述非空紀錄筆數。",
    trackIds: ["edtech-digital-content", "user-research-outcomes-process", "interactive-media-ux"],
    cover: svgAsset(
      "work-02-dashboard-public",
      1280,
      720,
      "線上學習互動行為與學科成績資料視覺化分析作品封面，以概念化儀表板卡片與圖表呈現。",
    ),
    problemAwareness:
      "線上學習平台可記錄互動、影片與成績等資料，但若缺乏清楚的視覺化與限制說明，容易讓使用者誤把相關分布解讀成因果或學習成效證明。",
    audience: "目標使用者包含課程教師、數位學習研究者、教學助理，以及希望用資料探索學習互動現象的設計者。",
    diagrams: [
      {
        type: "interactionFlow",
        title: "儀表板探索流程",
        caption: "描述使用者從選擇欄位、觀察圖表、比較分布到形成後續問題的流程。",
        description: "此流程用於提醒儀表板只能協助探索與提出問題，不直接證明因果或學習成效。",
        image: svgAsset("work-02-dashboard-public", 1280, 720, "儀表板探索流程圖，呈現篩選、觀察與解讀限制。"),
      },
      {
        type: "systemArchitecture",
        title: "資料處理與視覺化架構",
        caption: "從資料清理、欄位整理、度量定義到 Power BI 視覺化頁面的架構。",
        description: "公開版本以概念圖表示，不放入原始資料或實際分析值。",
        image: svgAsset("work-02-dashboard-public", 1280, 720, "資料處理與 Power BI 視覺化架構圖。"),
      },
      {
        type: "informationArchitecture",
        title: "圖表資訊層級",
        caption: "整理總覽、分布、篩選與限制說明在儀表板中的閱讀順序。",
        description: "圖表資訊層級協助使用者知道哪些指標可看、哪些結論不可過度推論。",
        image: svgAsset("work-02-donut-public", 900, 900, "圖表資訊層級圖，包含圓環圖、長條圖與限制提示。"),
      },
    ],
    media: {
      visualDrafts: [
        svgEvidence(
          "work-02-dashboard-public",
          "儀表板架構示意",
          "公開頁使用概念化圖像說明儀表板架構，不含原始資料或實際分析值。",
          "Power BI 儀表板架構示意，以卡片與圖表區塊呈現。",
          1280,
          720,
        ),
      ],
      screenshots: [
        svgEvidence(
          "work-02-donut-public",
          "圓環圖定義提示",
          "圓環圖應解讀為 sn 的計數，不是序號加總。",
          "圓環圖定義提示圖，標示 sn 計數。",
          900,
          900,
        ),
      ],
      videos: [],
      audio: [],
      demos: [],
      restricted: [
        {
          title: "受限資料與原始儀表板",
          status: "不公開",
          caption: "原始資料、清洗檔、儀表板實作檔與任何含真實結果的操作紀錄均不在公開網站載入或連結。",
          reason: "資料使用說明限定課堂教學與練習，且明載分析結果不適合任何形式的公開發表。",
        },
      ],
    },
    extendedSections: [
      {
        title: "01｜作品定位",
        summary: "這是一件學習分析視覺化作品，目標是協助探索資料分布，而不是證明成效。",
        paragraphs: [
          "作品以 Power BI 建立儀表板，整理線上學習互動紀錄與學科成績欄位，使資料關係能被快速瀏覽與討論。",
          "公開頁面只呈現概念化示意圖與方法說明，不放入原始資料、清洗檔、儀表板實作檔或實際分析結果。",
        ],
      },
      {
        title: "02｜資料與圖表定義",
        summary: "所有圖表都必須先說清楚計算基礎，避免視覺化造成誤讀。",
        bullets: [
          "圓環圖是 sn 的計數，不是序號加總。",
          "觀看相關直條圖公開標題採用「不同數學成績分群的學習者／紀錄數」，只描述非空紀錄筆數，不稱為觀看時數比較。",
          "任何視覺關聯都只能作為探索線索，不宣稱為因果或學習成效證明。",
        ],
      },
      {
        title: "03｜目標使用者",
        summary: "儀表板面向需要理解學習互動分布的教學者與研究者。",
        paragraphs: [
          "使用者可透過儀表板快速觀察哪些欄位值得後續分析，並將視覺化結果轉化為更嚴謹的研究問題。",
        ],
      },
      {
        title: "04｜製作流程",
        summary: "由資料清理、模型建立、圖表設計到限制說明逐步完成。",
        bullets: [
          "理解欄位意義與資料缺漏。",
          "以 Power Query 整理資料結構。",
          "以 DAX 或欄位設定建立必要度量。",
          "建立圖表、篩選器與閱讀順序。",
          "補上圖表定義與推論限制。",
        ],
      },
      {
        title: "05｜隱私與公開限制",
        summary: "公開網站只保留必要方法說明，不放入可回推資料來源的檔案。",
        paragraphs: [
          "原始資料、清洗檔、儀表板實作檔與含真實結果的操作紀錄不進入公開 build。若需檢視，必須先取得資料提供方明確許可並採受控流程。",
        ],
      },
      {
        title: "06｜研究所深化方向",
        summary: "未來可從探索型儀表板延伸到可驗證的學習分析研究。",
        bullets: [
          "修正觀看資料的度量定義後，再進行更精確的行為比較。",
          "加入資料品質檢查與統計方法，避免誤讀視覺關係。",
          "延伸為教學者決策支援介面、聲響化學習回饋或數位孿生學習歷程模型。",
        ],
      },
    ],
    tools: ["Microsoft Power BI Desktop", "Microsoft Excel", "Power Query", "DAX"],
    roles: ["資料整理", "資料視覺化", "儀表板設計", "圖表定義", "限制說明", "專案管理"],
    testing: {
      statusKey: "exploratory",
      status: "目前為探索型視覺化作品，不宣稱已證明學習成效。",
      metrics: [
        { label: "儀表板狀態", value: "探索型原型" },
        { label: "推論邊界", value: "不作因果宣稱" },
      ],
      insights: [
        "視覺化可協助提出後續研究問題，但不能取代資料品質檢查與統計驗證。",
        "圖表標題、度量定義與限制說明必須與儀表板一起呈現。",
      ],
      learningOutcomes: [],
      plannedMethods: ["完成資料品質與度量檢查後，再設計形成性儀表板任務。"],
    },
    reflection: {
      strengths: "作品能把學習平台資料整理成可閱讀的互動儀表板，並清楚標示圖表定義與公開限制。",
      limitations: "目前仍需核對部分度量與清洗規則；除非另取得資料提供方明確公開許可，實際分析結果與衍生媒體維持隔離。",
      graduateDirection:
        "進入研究所後可深化為學習分析、數位孿生學習歷程、互動儀表板、AI 輔助回饋與聲響化資料提示研究。",
    },
    instituteConnections: ["互動媒體", "數位孿生", "聲響", "跨域創生"],
    themeEvidenceStatus: {
      互動媒體: "demonstrated",
      數位孿生: "researchDirection",
      聲響: "researchDirection",
      跨域創生: "demonstrated",
    },
    themeRationales: {
      互動媒體: "Power BI 儀表板讓使用者透過篩選與圖表互動探索資料分布。",
      數位孿生: "未來可把學習歷程資料轉成可觀察的數位模型，支援教學決策與反思。",
      聲響: "學習互動頻率或異常狀態可延伸為聲響提示，補足純視覺儀表板的限制。",
      跨域創生: "作品結合教育資料、視覺設計、資料倫理與互動介面。",
    },
    links: [],
    credits: "資料來源為教育大數據分析計畫辦公室提供的「2025 年教育大數據微學程教學用開放資料第二版」；個人角色聚焦於資料整理、Power BI 視覺化、圖表定義、限制說明與公開版本整理。",
    seo: {
      title: "線上學習互動行為與學科成績之資料視覺化分析 | RU / YUAN",
      description: "以 Power BI 探索線上學習互動資料與學科成績分布的資料視覺化作品案例。",
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
