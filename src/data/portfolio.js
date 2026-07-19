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
  eyebrow: "研究所作品集／聲響、互動與學習",
  headline: "讓視覺成為聲音的入口，讓聲音成為學習的回饋。",
  headlineLines: [["讓視覺成為", "聲音的入口，"], ["讓聲音成為", "學習的回饋。"]],
  introduction:
    "我在國立嘉義大學學習數位學習設計與管理，也做過插畫、動畫與影像。現在我用 Web Audio 做聲響互動原型。",
  primaryCta: { label: "體驗互動聲響原型", target: "#interactive-sound-learning-demo" },
  secondaryCta: { label: "查看學習與製作紀錄", target: "#learning-trail" },
  thesis:
    "我想研究視覺形態與互動行為如何對應聲音參數，並成為數位學習中的回饋。",
  researchQuestion:
    "當畫面中的位置、速度或大小被轉成聲音時，使用者是否能聽懂差異，並用它理解正在操作的內容？",
  credibility:
    "目前能在網站上操作的是原生 Web Audio 原型。其他案例則說明我如何處理學習內容、影像與資料。",
  argument:
    "網站先說明我關心的研究問題，再進入聲響原型與其他作品。每件案例都交代我為什麼做、實際負責什麼、目前有哪些材料，以及還不能下哪些結論。",
  logicChain: ["為什麼做", "怎麼操作", "目前做到什麼", "還沒證明什麼"],
  reviewerPaths: [
    { label: "研究問題", target: "#research-positioning" },
    { label: "聲響原型", target: "#interactive-sound-learning" },
    { label: "學習歷程", target: "#learning-trail" },
  ],
};
// Codex-Fix: Public homepage copy now describes the portfolio strategy without construction-stage reminders.

export const dataVisualizationSeries = {
  id: "data-visualization-series",
  title: "資料視覺化與數位學習應用",
  subtitle: "Data Visualization in Digital Learning",
  kicker: "兩件獨立作品・資料敘事・Power BI",
  summary:
    "一件作品分析 Spotify Wrapped 等資料故事，另一件用 Power BI 探索學習互動與成績分布。它們都處理資料如何被讀懂，但使用的資料、目的與方法不同。",
  independenceNote:
    "兩件作品不是同一研究的前後階段，請分開閱讀各自的方法與限制。",
  cover: svgAsset(
    "series-cover",
    1200,
    900,
    "資料視覺化與數位學習應用系列封面，以節點、折線與介面卡片呈現。",
  ),
  works: ["data-visualization-cases", "learning-dashboard-analysis"],
  capabilities: [
    "我比較資料先顯示哪些重點、何時補充細節，以及動畫如何帶領閱讀。",
    "我用 Power BI 整理互動紀錄、影片觀看與成績欄位的分布。",
    "公開頁會直接說明圖表定義、資料限制與不能推論的結論。",
    "AI、聲響化與沉浸式分析目前只列為後續方向，還不是這兩件作品的成果。",
  ],
  reflection:
    "整理這兩件作品後，我更在意的不是圖表形式，而是閱讀者能否看懂資料，又知道哪些結論不能下。",
  soundExtension:
    "聲響化目前只是下一步。我還沒有把互動頻率、答題節奏或任務歷程做成可聆聽的提示。",
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
    purpose: "我想用任務觀察、訪談與學習成效資料，檢查使用者是否理解設計；尚未進行的部分會直接標明。",
    includes: ["使用者測試", "學習成效", "質性觀察", "迭代紀錄"],
    instituteAlignment: ["AI", "數位孿生", "跨域創生"],
  },
];

export const learningTrail = [
  { id: "web-audio", title: "Web Audio", status: "已有可操作原型", evidence: "我已用瀏覽器原生 Web Audio API，把位置、速度與大小連到聲像、音高、濾波亮度與音量。" },
  { id: "pure-data", title: "Pure Data", status: "學習中", evidence: "目前沒有可公開的 Pure Data 補丁檔或操作紀錄，所以這裡只記錄學習進度。" },
  { id: "reaper", title: "REAPER", status: "學習中", evidence: "目前沒有可公開的 REAPER 工程檔或聲音輸出，不列為已完成作品。" },
];

export const aiWorkflow = {
  id: "ai-workflow",
  eyebrow: "生成式 AI 使用說明",
  title: "AI 協助整理與檢查，最後的選擇由我負責。",
  titleLines: [["AI 協助", "整理與檢查，"], ["最後的選擇", "由我負責。"]],
  summary:
    "這個網站的程式草稿、文件整理與部分稽核曾使用生成式 AI。我決定作品內容、研究主張與視覺方向，也逐項驗收修改結果。這些是開發紀錄，不代表我訓練或部署了大型語言模型。",
  responsibilityGroups: [
    {
      label: "AI 協助的工作",
      items: ["整理程式草稿，找出重複內容", "整理文件結構，提供除錯線索", "列出建置、媒體與可及性檢查項目"],
    },
    {
      label: "我負責的判斷",
      items: ["確認作品事實，決定哪些案例公開", "決定研究主張、資訊順序與視覺方向", "取捨修改內容，完成最後驗收"],
    },
    {
      label: "我不交給 AI 的事",
      items: ["不虛構作品、測試資料或研究結果", "不把學習中的技術寫成已熟練", "不把 AI 輸出當成已核對的成品"],
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
  ],
  failureCases: [
    {
      problem: "GitHub Pages 找不到網站資源",
      diagnosis: "建置檔與媒體使用網域根目錄，但 GitHub Pages 專案網站部署在儲存庫子路徑。",
      correction: "改用符合專案子路徑的 base path，並在每次送審建置後檢查資源網址。",
    },
    {
      problem: "不支援 Web Audio 時，狀態訊息顯示錯誤",
      diagnosis: "無 Web Audio 的瀏覽器曾顯示為「聲音已停止」，沒有傳達真正原因。",
      correction: "載入時先檢查瀏覽器支援狀態，再用實際操作確認訊息與控制項。",
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
    status: publicStatusLabels.prototype,
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
      "目前能核對的是操作流程、四組聲音映射與技術行為。這些材料還不能證明原型已幫助使用者理解概念。",
    researchQuestion: "使用者是否能從聲像、音高、濾波亮度與音量的變化，聽懂畫面中的位置、速度與大小？",
    interactionMappings: [
      { id: "horizontal-pan", input: "水平位置", parameter: "左右聲像", rationale: "我把控制點的水平位置連到左右聲像，畫面往哪邊移，聲音就往哪邊移。", inputRange: [0, 1], outputRange: [-0.85, 0.85] },
      { id: "vertical-pitch", input: "垂直位置", parameter: "音高", rationale: "控制點越高，音高越高；控制點越低，音高越低。", inputRange: [0, 1], outputRange: [660, 110] },
      { id: "speed-brightness", input: "移動速度／亮度滑桿", parameter: "濾波亮度", rationale: "拖動越快，音色越亮；使用滑桿時，也可以直接調整亮度。節奏密度不在這一版的範圍內。", inputRange: [0, 1], outputRange: [700, 5000] },
      { id: "size-loudness", input: "物件大小", parameter: "音量", rationale: "物件變大時，音量會在受控範圍內提高。這是設計映射，不是正式響度測量。", inputRange: [0, 1], outputRange: [0.04, 0.12] },
    ],
    signalFlow: ["滑鼠／觸控／鍵盤輸入", "三角波振盪器", "低通濾波器", "音量包絡", "立體聲聲像", "動態範圍壓縮器", "主音量"],
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
      status: "目前還沒有使用者測試結果。現有材料只有可操作原型與技術行為檢查。",
      metrics: [], insights: [], learningOutcomes: [],
      plannedMethods: ["先不提供說明，觀察使用者能否辨識左右聲像與高低音的對應。", "安排短任務，記錄完成情形、操作錯誤與口述理解。", "比較減少動態效果模式與不同輸入方式下的操作理解情形。"],
    },
    reflection: {
      strengths: "我已把位置、速度與大小連到四個可操作的聲音參數，並完成瀏覽器原型。",
      limitations: "我還沒有操作錄影、完整互動紀錄或使用者的口述資料，無法判斷他們怎麼理解四組映射。",
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
    credits: "我規劃學習任務、UX、介面與程式，也設計四組聲音回饋。",
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
      "我先拆解《Hamlet》的情節，再用生成式 AI 製作場景圖與字幕規格，最後加入配樂並完成剪輯。成片長 40 秒，共八幕。",
    tags: ["文學教育", "生成式 AI", "提示詞設計", "視覺敘事", "聲音情緒設計"],
    valueProposition: "我把《Hamlet》拆成八幕，為字幕、圖像和配樂各自訂下檢查條件，再整合成 40 秒影片。",
    overviewFacts: "40 秒、8 幕；英文與繁中字幕；影音原型已完成，學習成效尚未驗證",
    whatThisProves: "我完成情節拆解、提示詞設計、八幕視覺與字幕規格、配樂方向和影片整合。",
    designGoal:
      "我把製作分成文本理解、分鏡、圖像與字幕、配樂、剪輯五個階段，讓每次輸出都能先核對再往下做。",
    designProcess:
      "我先核對故事情節，再用 ChatGPT 整理八幕分鏡與 B1 字幕規格。圖像方向確定後，我用 Suno 製作無歌詞配樂，最後在 Canva 對齊畫面與音樂；WebVTT 字幕由網站播放器另外載入。",
    technologyAndMedia:
      "我用 ChatGPT 整理故事、分鏡、字幕與圖像提示，再用生成式圖像工具製作場景、Suno 製作無歌詞配樂，並在 Canva 完成剪輯。",
    outcomeShowcase:
      "目前能核對的是 40 秒、8 幕《Hamlet》故事 MV、雙語 WebVTT、逐字稿，以及後來整理的提示詞模板 v1。原始提示詞執行紀錄、學習成效、素材來源與公開使用權都尚未核對完成。",
    trackIds: ["ai-interactive-learning-creation", "multimedia-video-sound", "edtech-digital-content"],
    cover: mediaAsset("hamlet-story-mv-cover", "《Hamlet》故事 MV 封面裁切，哈姆雷特在月夜城牆上面對父親的鬼魂。"),
    problemAwareness:
      "我要把《Hamlet》的閱讀理解轉成一支英文故事影片。情節、字幕、圖像和配樂由不同工具處理，如果沒有先訂規格，很容易前後不一致。",
    audience: "我把使用情境設定為大學通識英語課的文學故事影音任務；目前尚未在課堂使用或測試。",
    projectInfo: [
      { label: "專案類型", value: "生成式 AI 內容設計／數位學習案例" },
      { label: "我的角色", value: "內容拆解、提示詞限制與跨工具流程安排" },
      { label: "核心工具", value: "ChatGPT、生成式圖像工具、Suno、Canva" },
      { label: "主要產出", value: "40 秒、8 幕故事 MV 與雙語字幕" },
      { label: "使用情境", value: "大學通識英語課文學故事影音任務；尚未課堂測試" },
      { label: "驗證狀態", value: "成片與字幕已核對；學習成效尚未驗證" },
    ],
    challenge: {
      title: "在 40 秒內說清楚故事，並讓八幕保持一致",
      description:
        "我需要在 40 秒內保留主要情節，讓以 B1 為目標的英文字幕來得及閱讀，也要維持角色、光線與配樂方向。這支成片沒有旁白，因此畫面與字幕必須獨立把故事說清楚。",
    },
    workflow: {
      title: "我如何完成 40 秒、8 幕影片",
      summary: "以下是依現有成片與專案規格整理的五個階段。原始執行紀錄未保留，因此不能核對每一步是否完全依照這個順序進行。",
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
          description: "我用 Suno 製作無歌詞配樂，並逐段確認神祕、悲傷與緊張的變化。",
          tool: "Suno",
          input: "八幕情緒弧線與 40 秒節奏",
          output: "服務神祕、悲傷與高潮轉折的無歌詞配樂",
          constraint: "instrumental / mysterious / sad / slow build / no lyrics",
          humanCheck: "逐段聆聽情緒轉折，確認音樂不與字幕閱讀競爭。",
        },
        {
          title: "剪輯輸出",
          description: "我在 Canva 對齊圖像與音樂並輸出影片；WebVTT 由網站播放器另外載入。",
          tool: "Canva",
          input: "八幕場景圖、40 秒節奏規格與無歌詞配樂",
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
        title: "讓配樂不蓋過語言",
        evidenceStatus: "specificationOnly",
        evidenceSource: "approvedBrief",
        artifactRefs: [],
        constraint: "instrumental / slow build / no lyrics；有旁白時降低音樂音量。",
        rationale: "音樂要推動情緒，但不能搶走字幕或未來旁白的注意力。",
        outputProblem: "避免歌詞干擾字幕、情緒突變或背景音樂遮蔽旁白。",
        humanCheck: "逐段聆聽情緒轉折與語音可懂度。",
      },
    ],
    promptTemplate: {
      originStatus: "derived",
      evidenceRef: "hamlet-prompt-template-v1",
      usedForExistingVideo: false,
      eyebrow: "事後整理的模板",
      title: "文學故事 MV 提示詞模板 v1",
      provenance: "這份模板在 2026/07/17 才依案例的四項決策整理。它沒有用來製作目前這支影片，也不是原始生成對話紀錄。",
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
      { label: "情緒配樂", status: "已實作", role: "無歌詞配樂用較慢的變化帶出神祕、悲傷與緊張。", check: "情緒轉折是否配合故事，又不搶走字幕的注意力。" },
      { label: "Canva 剪輯與最終影片", status: "已實作", role: "我把八幕畫面與音樂剪成 40 秒、16:9 的影片；網站播放器另外載入 WebVTT 字幕。", check: "每幕節奏與結尾是否完整；WebVTT 時間碼則在播放器中另行檢查。" },
    ],
    deliverables: [
      { id: "clean-video", title: "40 秒、8 幕故事 MV", statusKey: "artifactVerified", status: "實際成果", evidenceRefs: ["hamlet-clean-video"], attributionSource: "deliveryPackage", description: "MP4 已核對為 H.264 影像、AAC 音訊與 16:9 畫幅。" },
      { id: "bilingual-captions", title: "雙語字幕與逐字稿", statusKey: "artifactVerified", status: "實際成果", evidenceRefs: ["hamlet-en-vtt", "hamlet-zh-vtt"], attributionSource: "deliveryPackage", description: "英文與繁中 WebVTT 各有八段連續時間碼，並附中英畫面文字紀錄。" },
      { id: "scene-breakdown", title: "場景拆解", statusKey: "artifactDerived", status: "流程產出", evidenceRefs: ["hamlet-storyboard-responsive"], attributionSource: "verifiedArtifact", description: "我從成片整理出八個關鍵情節與每幕功能，用來檢查故事是否連續。" },
      { id: "prompt-template-v1", title: "跨工具提示詞模板 v1", statusKey: "processDerived", status: "流程產出", evidenceRefs: ["hamlet-prompt-template-v1"], attributionSource: "publishedCaseConstraints", description: "這份模板於 2026/07/17 事後整理，沒有用於現有影片，也不是原始提示詞紀錄。" },
      { id: "caption-specification", title: "英文字幕目標規格", statusKey: "specificationOnly", status: "製作規格", evidenceRefs: [], attributionSource: "approvedBrief", description: "以 B1 為目標，搭配每句 12–18 個英文單字、一至兩行控制語言難度與播放可讀性。" },
      { id: "music-specification", title: "Suno 配樂提示詞", statusKey: "specificationOnly", status: "製作規格", evidenceRefs: [], attributionSource: "approvedBrief", description: "以 instrumental、mysterious、sad、slow build、no lyrics 定義情緒方向。" },
      { id: "integrated-video-output", title: "整合影片輸出", statusKey: "artifactVerified", status: "實際成果", evidenceRefs: ["hamlet-clean-video"], attributionSource: "approvedBrief", description: "目前只有輸出的 MP4 可以核對；尚未取得可編輯 Canva 專案或工具執行紀錄。" },
    ],
    evidenceBoundary: {
      title: "成片可以核對，素材權利與學習成效仍未確認",
      verifiedArtifacts: ["MP4 與技術規格", "英文／繁中 WebVTT 與八段時間碼", "由成片衍生的影片封面、首頁封面與八幕畫面"],
      approvedSpecifications: ["五階段工具分工", "四項提示詞限制", "若未來加入旁白時的混音規則"],
      notIndependentlyVerified: [
        "原始提示詞執行紀錄，以及八張原始場景檔與獨立音樂檔",
        "場景圖、音樂、文學來源與 Canva 素材的作者、來源、工具條款及公開使用權尚未核對；目前不能視為已取得公開發布許可",
        "學生或教師的課堂測試與學習成效",
      ],
    },
    outcomes: [
      { kind: "designValue", title: "五階段製作規格", description: "五個階段列出輸入、輸出與人工檢查；是否能套用到第二部作品，仍需實際試跑。" },
      { kind: "designValue", title: "每幕都有檢查欄位", description: "故事事件、字幕目標與原作情節可以分開核對，但還沒有學生或教師的理解資料。" },
      { kind: "designValue", title: "各層都依八幕排列", description: "圖像、字幕、配樂與剪輯使用同一組故事節點；是否能降低跨工具不一致，仍需下一次實作比較。" },
    ],
    evaluationPlan: {
      status: "planned",
      title: "形成性評估計畫",
      summary: "目前還沒有學生或教師測試資料。這份計畫只列出未來要做的任務、要記錄的問題，以及資料會用來修改什麼。",
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
      "先確認場景圖、音樂、文學來源與 Canva 素材的來源、工具條款及公開使用權。",
      "用另一部文學作品首次實際使用提示詞模板 v1，保留提示詞紀錄、失敗輸出與人工修改。",
      "安排學生與教師的形成性測試，再依誤解、字幕可讀性與課堂適用性修改。",
    ],
    ctas: [
      { label: "播放案例影片", href: "#generative-interface-study-featured-media", focusTarget: "#generative-interface-study-featured-media-player" },
      { label: "查看八幕分鏡", href: "#generative-interface-study-storyboard" },
      { label: "閱讀提示詞設計", href: "#generative-interface-study-prompt-system" },
    ],
    diagrams: [],
    featuredMediaIntro: "影片共八幕，每幕 5 秒，字幕可切換英文與繁中。成片與字幕檔可以核對，但素材來源、條款與公開使用權尚未確認；網站能完成建置或播放，不代表已取得公開發布許可。",
    media: {
      visualDrafts: [],
      screenshots: [],
      videos: [
        {
          title: "《Hamlet》AI 文學故事 MV",
          src: publicAssetUrl("media/portfolio/hamlet-story-mv-clean-web-1080p.mp4"),
          poster: responsivePortfolioImage("hamlet-story-mv-poster", 1200, 675, "《Hamlet》故事 MV 首圖，哈姆雷特在月夜城牆上面對父親的鬼魂。"),
          caption: "40 秒、8 幕的成片；每幕 5 秒，提供英文與繁中 WebVTT 字幕，影片不會自動播放。",
          technicalSummary: "00:40 · 8 幕 · 16:9 · 英文／繁中字幕 · 無歌詞配樂／無旁白",
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
    roles: ["提示詞限制與工具流程安排", "內容拆解", "影音敘事規格"],
    testing: {
      statusKey: "notValidated",
      status: "目前還沒有學生或教師的測試結果。成片、字幕與逐字稿已核對，但這不能證明學習成效。",
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
      limitations: "目前沒有學生測試、教師評閱、原始提示詞紀錄、原始場景檔、獨立音樂檔或可編輯 Canva 專案；素材權利也仍待核對。",
      graduateDirection: "下一步會先完成權利核對，再測試字幕、故事理解與配樂是否適合課堂任務。",
    },
    instituteConnections: ["AI", "聲響", "跨域創生"],
    themeEvidenceStatus: {
      AI: "demonstrated",
      聲響: "demonstrated",
      跨域創生: "demonstrated",
    },
    themeRationales: {
      AI: "我先限制各工具的輸出，再逐幕核對文學情節、字幕與工具交接。",
      聲響: "成片使用無歌詞配樂配合八幕情緒變化；本片沒有旁白。",
      跨域創生: "我把《Hamlet》情節、英文字幕、生成圖像、配樂與剪輯整理成 40 秒成片。",
    },
    links: [],
    credits: "我負責內容拆解、提示詞限制、跨工具流程，以及影音敘事規格。",
    seo: {
      title: "AI 文學故事 MV | RU / YUAN",
      description: "《Hamlet》40 秒、8 幕故事 MV，說明 ChatGPT、生成式圖像、Suno 與 Canva 的製作分工；成片可核對，學習成效與素材公開權利尚未驗證。",
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
      "我以 Spotify Wrapped（年度個人化回顧）等案例為素材，拆解資料層級、畫面節奏與個人化回饋的安排。影片最後把這些觀察帶回數位學習情境；目前沒有使用者測試或學習成效資料。",
    valueProposition: "我把案例拆解後的觀察整理成影片，並提出它們在學習歷程摘要與個人化回饋中的可能用法。",
    whatThisProves: "我自行完成案例篩選、視覺分析、論述編排與影片製作；這件作品尚未做成可操作介面。",
    designGoal: "我想找出個人化資料如何安排資訊層級、閱讀節奏與視覺提示，再思考這些做法能否用在學習歷程回饋。",
    designProcess:
      "我先用 Gemini 與 ChatGPT 找案例線索，再自行篩選案例、拆解視覺策略、安排論述順序，最後完成動態簡報與影片。",
    technologyAndMedia:
      "我使用 Power BI、Excel 與 Canva 完成資料整理、視覺分析與影片製作。Gemini 和 ChatGPT 只協助找案例線索；案例選擇與論述由我完成。",
    outcomeShowcase:
      "目前可公開核對的是分析影片；互動介面與學習成效測試都尚未完成。",
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
          "用 Gemini 與 ChatGPT 找到可後續查核的案例線索。",
          "自行選擇案例，拆解資料來源、視覺層級與敘事節奏。",
          "把觀察整理成影片，再提出可能的學習應用，不宣稱已有教學成效。",
        ],
      },
      {
        title: "02｜下一步",
        summary: "下一步是把影片中的觀察做成可操作、可測試的學習回顧介面。",
        paragraphs: [
          "目前完成的是案例分析影片。互動儀表板、個人化回饋介面與資料聲響化都還沒有實作。如果繼續發展，我會先選一種回饋任務做原型與使用者測試。",
        ],
      },
    ],
    tools: ["Power BI", "Excel", "Canva", "Gemini", "ChatGPT"],
    roles: ["企劃", "資料蒐整", "案例分析", "學習應用整理", "視覺敘事", "影片製作"],
    testing: {
      statusKey: "exploratory",
      status: "目前完成的是案例分析影片；學習成效仍在探索階段，沒有使用者測試結果。",
      metrics: [
        { label: "驗證狀態", value: "探索中" },
        { label: "公開成果", value: "影片" },
      ],
      insights: [],
      learningOutcomes: [],
      plannedMethods: ["原型完成後，我會用實際學習任務觀察讀者能否理解指標並回看自己的歷程。"],
    },
    reflection: {
      strengths: "我完成了案例篩選、視覺分析、論述順序與影片製作，並把學習應用和既有成果分開說明。",
      limitations: "目前只有案例分析影片，還沒有互動原型或學習者測試。",
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
      互動媒體: "目前成果是影片；可操作的學習回顧介面仍是下一步。",
      聲響: "資料聲響化尚未實作，只保留為未來研究方向。",
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
      "我用 Power BI 整理互動紀錄、影片觀看欄位與學科成績，做成供探索資料分布的儀表板。圖表只顯示關聯線索，不能用來判斷因果或學習成效。",
    valueProposition: "我在公開概念圖旁標出欄位計數方式與推論限制，不呈現真實數值。",
    whatThisProves: "我完成初步資料整理、Power BI 儀表板、圖表定義與限制說明；公開頁不放原始資料、真實數值或實作檔。",
    designGoal: "我希望教師或研究者先查看資料分布，再把值得追問的現象交給資料品質檢查與正式分析。",
    designProcess:
      "我先盤點欄位與缺漏，再用 Power Query 整理資料，在 Power BI 建立模型、度量、圖表與篩選器，最後記下目前可確認的計算方式與仍待核對的項目。",
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
      "線上學習平台留下互動、影片與成績資料，但欄位名稱、計算方式與缺漏如果沒有說清楚，圖表很容易被誤讀成因果或成效證明。",
    audience: "這個儀表板預設供課程教師、數位學習研究者與教學助理探索資料分布，不能取代正式研究分析。",
    diagrams: [
      {
        type: "interactionFlow",
        title: "儀表板版面概念",
        caption: "這張圖只示意卡片與圖表的位置，不是操作流程圖，也不含真實資料。",
        description: "實際探索順序由文字說明；這張配圖不能用來核對篩選或互動行為。",
        image: svgAsset("work-02-dashboard-public", 1280, 720, "Power BI 儀表板版面概念圖，以卡片、圓環圖與長條圖區塊呈現。"),
      },
      {
        type: "systemArchitecture",
        title: "公開圖不呈現的內容",
        caption: "這張版面概念圖不含資料處理步驟、原始資料、Power BI 實作檔或真實數值。",
        description: "資料整理流程由文字說明，不能從這張配圖核對。",
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
          title: "受限資料與原始儀表板",
          status: "不公開",
          caption: "公開網站不載入或連結原始資料、清洗檔、Power BI 實作檔，以及任何含真實結果的操作紀錄。",
          reason: "資料使用說明限定課堂教學與練習，並明載分析結果不適合以任何形式公開發表。",
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
          "圖上的關聯只能作為探索線索，不能當成因果或學習成效證明。",
        ],
      },
      {
        title: "02｜公開限制",
        summary: "課堂資料與真實分析結果不進入公開網站。",
        paragraphs: [
          "原始資料、清洗檔、Power BI 實作檔與含真實結果的操作紀錄不進入公開建置。取得資料提供方明確許可後，也只在非公開環境中檢視。",
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
    roles: ["資料整理", "資料視覺化", "儀表板設計", "圖表定義", "限制說明", "專案管理"],
    testing: {
      statusKey: "exploratory",
      status: "目前只有探索型儀表板，還沒有完成資料品質驗證、使用者測試或學習成效分析。",
      metrics: [
        { label: "儀表板狀態", value: "探索型原型" },
        { label: "推論邊界", value: "不作因果宣稱" },
      ],
      insights: ["公開版把圖表定義與限制放在圖像旁，避免讀者只看圖形就下結論。"],
      learningOutcomes: [],
      plannedMethods: ["先核對欄位與度量，再設計形成性任務，觀察使用者能否正確讀圖並指出限制。"],
    },
    reflection: {
      strengths: "我完成初步資料整理、互動儀表板與公開版說明，也把計算方式、限制和不能公開的內容一起標出。",
      limitations: "部分度量與清洗規則仍待核對。除非資料提供方明確許可，我不會公開真實分析結果或由資料製作的媒體。",
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
      數位孿生: "數位孿生仍是未來方向，現有儀表板沒有建立可持續更新的學習者模型。",
      聲響: "資料聲響提示尚未實作。",
      跨域創生: "我同時整理教育資料、設計儀表板互動，也把不能公開的資料與不能推論的結論寫清楚。",
    },
    links: [],
    credits: "資料來源為教育大數據分析計畫辦公室提供的「2025 年教育大數據微學程教學用開放資料第二版」。我負責資料整理、Power BI 視覺化、圖表定義、限制說明與公開版本整理。",
    seo: {
      title: "線上學習互動行為與學科成績之資料視覺化分析 | RU / YUAN",
      description: "我用 Power BI 整理線上學習互動、影片觀看與學科成績欄位，並清楚標示計算方式、公開限制與不可推論的結論。",
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
