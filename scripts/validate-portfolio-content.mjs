import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import {
  dataVisualizationSeries,
  homepageNarrative,
  instituteEvidenceGroups,
  projectCaseStudies,
  researchTracks,
  instituteThemes,
  sortedProjectCaseStudies,
} from "../src/data/portfolio.js";
import { admissionResearchProposal } from "../src/data/admission-research.js";
import {
  collaborationEvidence,
  finalPortfolioLinks,
  learningRoadmap,
  pureDataLearningEvidence,
  representativeWorks,
  supportingEvidenceLinks,
} from "../src/data/admission-evidence.js";
import { admissionAuditRecords } from "../src/data/admission-evidence.audit.js";
import { aiWorkflow } from "../src/data/ai-workflow.js";
import { getProjectCompleteness } from "../src/data/portfolio.governance.js";
import { getProjectInternalNotes } from "../src/data/portfolio.internal.js";
import { siteIdentity, topLevelSections } from "../src/config/site.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];
const seenIds = new Set();
const validTrackIds = new Set(researchTracks.map((track) => track.id));
const validInstituteThemes = new Set(instituteThemes);
const validThemeEvidenceStatuses = new Set(["demonstrated", "researchDirection"]);
const validSubmissionVisibilities = new Set(["public", "hidden"]);
const validDiagramTypes = new Set(["interactionFlow", "systemArchitecture", "informationArchitecture"]);
const validTestingStatuses = new Set(["notValidated", "exploratory", "validated"]);
const validMetadataOmissions = new Set(["year"]);
const validDeliverableStatuses = new Set(["實際成果", "流程產出", "製作規格"]);
const validDeliverableStatusKeys = new Set(["artifactVerified", "artifactDerived", "processDerived", "specificationOnly"]);
const validAttributionSources = new Set(["deliveryPackage", "verifiedArtifact", "publishedCaseConstraints", "approvedBrief"]);
const validTrackKinds = new Set(["subtitles", "captions", "descriptions", "chapters", "metadata"]);
const validPromptTemplateOriginStatuses = new Set(["derived", "source-record"]);
const validPromptEvidenceStatuses = new Set(["artifactVerified", "processDerived", "specificationOnly"]);
const validProductionWorkflowTones = new Set(["ink", "violet", "accent"]);
const validAdmissionEvidenceStatuses = new Set(["已完成", "可操作原型", "學習中", "研究構想", "下一步：使用者觀察"]);
const validProjectStatuses = new Map([
  ["completed", new Set(["已完成"])],
  ["prototype", new Set(["原型中", "可操作原型"])],
  ["inProgress", new Set(["整理中"])],
  ["researchProposal", new Set(["研究構想"])],
]);
const expectedWebAudioSignalFlow = [
  "使用者輸入：滑鼠／觸控／鍵盤",
  "數值正規化",
  "聲音參數映射",
  "Oscillator：三角波振盪器",
  "Filter：低通濾波器",
  "Gain / Envelope：受控音量與啟停包絡",
  "Stereo Panner：左右聲像",
  "Compressor：動態範圍壓縮",
  "Master Output：主音量與裝置輸出",
];
const expectedFeaturedWorkIds = [
  "interactive-sound-learning",
  "generative-interface-study",
  "learning-dashboard-analysis",
  "data-visualization-cases",
];
const requiredProductionWorkflowIds = new Set(["data-visualization-cases"]);
const expectedProductionWorkflowNumbers = ["01", "02", "03", "04"];
const expectedLearningDashboardSectionIds = [
  "summary",
  "problem",
  "data",
  "process",
  "overview",
  "charts",
  "media",
  "ethics",
  "reflection",
];
const expectedIndexCopy = new Map([
  [
    "interactive-sound-learning",
    {
      title: "互動聲響學習原型",
      summary: "以 Web Audio 建立聲音參數與視覺回饋的互動原型，測試使用者能否辨識左右、高低、快慢與大小所造成的聲音變化。",
    },
  ],
  [
    "generative-interface-study",
    {
      title: "《Hamlet》生成式 AI 文學敘事短片",
      summary: "將《Hamlet》拆解為八個敘事段落，建立影像、字幕與配樂的生成及檢核流程，完成約 40 秒的文學敘事短片。",
    },
  ],
  [
    "learning-dashboard-analysis",
    {
      title: "線上學習互動與學科成績分析",
      summary: "以 Power BI 整理線上學習互動與學科成績資料，透過篩選與圖表比較，探索不同學習行為與成績表現的關係。",
    },
  ],
  [
    "data-visualization-cases",
    {
      title: "數位學習資料視覺化實務探討",
      summary: "拆解資料視覺化案例的分析流程與呈現策略，整理其在數位學習情境中的應用方式、限制與後續改善方向。",
    },
  ],
]);
const validIndexLinkTargets = new Map([
  ["interactive-sound-learning", new Set(["#interactive-sound-learning-demo"])],
  [
    "generative-interface-study",
    new Set([
      "#generative-interface-study-featured-media",
      "#generative-interface-study-workflow",
    ]),
  ],
  ["learning-dashboard-analysis", new Set()],
  ["data-visualization-cases", new Set(["#data-visualization-cases-media"])],
]);
const evidenceManifestPath = path.join(root, "docs", "evidence", "hamlet-media-manifest.json");
let evidenceManifest = { directCopies: [], derivativeGroups: [], processEvidence: [], rightsEvidence: [] };
try {
  evidenceManifest = JSON.parse(readFileSync(evidenceManifestPath, "utf8"));
} catch (error) {
  errors.push(`Unable to read Hamlet evidence manifest: ${error.message}`);
}
const validEvidenceRefs = new Set([
  ...evidenceManifest.directCopies,
  ...evidenceManifest.derivativeGroups,
  ...evidenceManifest.processEvidence,
  ...evidenceManifest.rightsEvidence,
].map((item) => item.id).filter(Boolean));

const publicPath = (assetPath) =>
  assetPath?.startsWith("/") ? path.join(root, "public", assetPath.slice(1)) : null;

const assertAsset = (project, label, assetPath) => {
  const resolved = publicPath(assetPath);
  if (resolved && !existsSync(resolved)) {
    errors.push(`${project.id}: missing ${label} asset ${assetPath}`);
  }
};

const collectImageAssets = (image) => {
  if (!image) return [];
  const srcSetAssets = `${image.avifSrcSet ?? ""}, ${image.webpSrcSet ?? ""}`
    .split(",")
    .map((candidate) => candidate.trim().split(/\s+/)[0])
    .filter(Boolean);

  return [image.src, ...srcSetAssets];
};

const assertImage = (project, label, image) => {
  if (!image) {
    errors.push(`${project.id}: missing ${label} image metadata`);
    return;
  }

  if (!image.alt?.trim()) {
    errors.push(`${project.id}: missing ${label} alt text`);
  }

  if (!Number.isFinite(image.width) || !Number.isFinite(image.height)) {
    errors.push(`${project.id}: missing ${label} intrinsic dimensions`);
  }

  for (const asset of collectImageAssets(image)) {
    assertAsset(project, label, asset);
  }
};

const assertIndexImage = (project, image) => {
  assertImage(project, "index cover", image);
  if (!image?.src?.trim()) {
    errors.push(`${project.id}: indexCover needs a fallback src`);
    return;
  }

  if (/\.svg(?:$|[?#])/i.test(image.src)) return;

  for (const field of ["avifSrcSet", "webpSrcSet"]) {
    const candidates = `${image[field] ?? ""}`
      .split(",")
      .map((candidate) => candidate.trim())
      .filter(Boolean);
    if (
      candidates.length < 2
      || candidates.some((candidate) => !/^\S+\s+\d+w$/.test(candidate))
    ) {
      errors.push(`${project.id}: raster indexCover needs at least two valid ${field} width candidates`);
    }
  }
};

const hasTextFields = (entry, fields) => fields.every((field) => entry?.[field]?.trim());

const publicConstructionPattern = /待補|可替換|範例|正式送審前|佔位|尚未提供|placeholder|sample|Content Readiness|Internal Build Notes|INTERNAL_|PRE_SUBMISSION_CHECK|HIDE_FROM_SUBMISSION|這裡保留|未來可放入|審查者|評審可以|目前不能延伸的主張|目前不能證明|申請者提供的紀錄支持|目前公開頁沒有成片|參賽不代表得獎|本頁不主張|可核對材料|本頁僅有申請者提供|原始紀錄未列出，不另行推測|未主張競賽結果|未確認公開授權|目前可公開內容限於|不取代|不解除各案自己的驗證或權利限制|未經發布決策確認|正式\s*GitHub Pages\s*專案網址|目前怎麼描述|原始影片限制/i;
const sensitivePublicPattern = /\.pbix|\.xlsx|\.xls|\.csv|C:\\|\/Users\/|youtu\.be\//i;
const mojibakePattern = /[�]|[-]|(?:敺|蝛|雿|銝|嚗|霅|瘚|鞈|憭|摨|餌|蝟|暸|踴|甇|鋆|瞍|蝝|靘|撟|銵|閬|蔣|慦|隞|賊|乓|繚|憟|唳|孵)/u;
// Fail fast on common mojibake sequences so corrupted Traditional Chinese copy cannot quietly ship again.

const publicAdmissionData = {
  dataVisualizationSeries,
  homepageNarrative,
  admissionResearchProposal,
  pureDataLearningEvidence,
  representativeWorks,
  supportingEvidenceLinks,
  collaborationEvidence,
  learningRoadmap,
  finalPortfolioLinks,
  aiWorkflow,
};
const publicAdmissionText = JSON.stringify(publicAdmissionData);
if (publicConstructionPattern.test(publicAdmissionText)) {
  errors.push("Public admission narrative contains construction-stage wording");
}
if (sensitivePublicPattern.test(publicAdmissionText)) {
  errors.push("Public admission narrative contains a sensitive path or restricted extension");
}
if (mojibakePattern.test(publicAdmissionText)) {
  errors.push("Public admission narrative contains possible mojibake/corrupted text");
}

const expectedHomepageHeadline = "從數位學習與視覺敘事出發，走向聲響互動與空間監聽研究。";
const expectedHomepageIntroduction =
  "我是蕭智仁，2026 年畢業於國立嘉義大學數位學習設計與管理學系。作品從視覺設計、影音剪輯、互動介面與學習內容整理出發，逐步延伸到 Web Audio 聲響互動；自 2026 年 7 月 24 日起，也開始拆解由 AI 協作產生的 Pure Data 初版 Patch，練習理解與重建訊號路徑。";
const expectedHomepageEvidenceSummary =
  "目前含 4 件數位作品（其中 1 件為可操作 Web Audio 原型）、1 件原創短劇與 Pure Data 學習紀錄。";
const topLevelSectionIds = new Set(topLevelSections.map((section) => section.id));
const homepageCtas = [homepageNarrative.primaryCta, homepageNarrative.secondaryCta];
if (
  !hasTextFields(homepageNarrative, [
    "eyebrow",
    "headline",
    "supportingLine",
    "introduction",
    "evidenceSummary",
    "currentEvidence",
    "researchStatement",
    "researchQuestion",
    "credibility",
    "argument",
  ])
  || homepageNarrative.eyebrow !== "116學年度研究所申請作品集｜聲響、互動與數位學習"
  || homepageNarrative.headline !== expectedHomepageHeadline
  || homepageNarrative.introduction !== expectedHomepageIntroduction
  || homepageNarrative.evidenceSummary !== expectedHomepageEvidenceSummary
  || homepageNarrative.primaryCta?.target !== "#interactive-sound-learning"
  || homepageNarrative.secondaryCta?.target !== "#learning-roadmap"
  || homepageCtas.some(
    (cta) => !hasTextFields(cta, ["label", "target"]) || !topLevelSectionIds.has(cta.target.slice(1)),
  )
) {
  errors.push("Homepage narrative needs the verified applicant framing and working sound prototype / roadmap calls to action");
}
if (
  !hasTextFields(homepageNarrative.soundTransition, ["turningPoint", "problem", "method"])
  || !homepageNarrative.soundTransition.turningPoint.includes("2020")
) {
  errors.push("Homepage sound transition needs the supported 2020 turning point, access problem, and transferable method");
}

const expectedProposalDisclaimer =
  "這是申請階段的研究構想。系統配置、渲染方法、樣本數、量測程序與技術細節，將依課程訓練、指導教授建議、場地設備與先導實驗結果調整。";
if (
  !hasTextFields(admissionResearchProposal, [
    "id",
    "status",
    "eyebrow",
    "title",
    "statement",
    "researchQuestion",
    "expectedContribution",
    "disclaimer",
  ])
  || admissionResearchProposal.id !== "research-proposal"
  || admissionResearchProposal.status !== "研究構想"
  || admissionResearchProposal.disclaimer !== expectedProposalDisclaimer
) {
  errors.push("Admission research proposal needs a complete, explicitly prospective identity");
}
const expectedProposalLayerIds = ["problem", "concept", "transferable-skills", "study-needs"];
const expectedProposalLayerLabels = ["1. 問題", "2. 初步構想", "3. 可帶入的能力", "4. 入學後的學習重點"];
if (
  admissionResearchProposal.layers?.length !== expectedProposalLayerIds.length
  || admissionResearchProposal.layers.some(
    (layer, index) =>
      layer.id !== expectedProposalLayerIds[index]
      || layer.label !== expectedProposalLayerLabels[index]
      || !hasTextFields(layer, ["id", "label", "summary"])
      || !Array.isArray(layer.items)
      || layer.items.length < 2
      || layer.items.some((item) => !item?.trim()),
  )
) {
  errors.push("Admission research proposal needs the four ordered problem, concept, transferable-skills, and study-needs layers");
}
if (
  admissionResearchProposal.proposedWorkflow?.length !== 5
  || admissionResearchProposal.proposedWorkflow.some((item) => !item?.trim())
) {
  errors.push("Admission research proposal needs a five-step, explicitly prospective workflow");
}

const expectedDataVisualizationCapabilities = [
  "先決定讀者需要看見的重點，再安排圖表、文字與動畫的閱讀順序。",
  "Power BI 專案整理互動紀錄、影片觀看與成績欄位，建立可篩選的資料探索介面。",
  "公開展示聚焦方法、介面與分析流程；涉及個人學習資料的內容不直接公開。",
  "後續希望進一步探索以聲音輔助資料閱讀與互動回饋。",
];
if (
  !hasTextFields(dataVisualizationSeries, [
    "id",
    "title",
    "subtitle",
    "kicker",
    "summary",
    "independenceNote",
    "reflection",
    "soundExtension",
  ])
  || dataVisualizationSeries.id !== "data-visualization-series"
  || dataVisualizationSeries.title !== "資料視覺化與數位學習應用"
  || dataVisualizationSeries.kicker !== "兩件獨立作品・資料敘事・Power BI"
  || dataVisualizationSeries.summary !== "這組案例包含兩件目的不同的作品：一件分析 Spotify Wrapped 等資料故事如何安排閱讀節奏，另一件以 Power BI 整理學習互動與成績資料。它們都關注資料如何被理解，但採用的素材、方法與呈現方式不同。"
  || dataVisualizationSeries.independenceNote !== "兩件作品分別處理資料敘事與學習資料探索，使用的資料、方法與目的不同。"
  || dataVisualizationSeries.reflection !== "這兩件作品讓我更在意圖表是否能被理解，而不只是形式是否吸引人。"
  || dataVisualizationSeries.soundExtension !== "下一步，我希望嘗試把互動節奏與資料變化轉成可聆聽的提示，作為聲響化研究的起點。"
  || JSON.stringify(dataVisualizationSeries.works) !== JSON.stringify(["data-visualization-cases", "learning-dashboard-analysis"])
  || JSON.stringify(dataVisualizationSeries.capabilities) !== JSON.stringify(expectedDataVisualizationCapabilities)
) {
  errors.push("Data visualization series needs the approved public title, two-work framing, capabilities, reflection, and sound extension");
}

const publicAuditOnlyFields = [
  "evidenceStatus",
  "validationStatus",
  "supportedClaims",
  "unsupportedClaims",
  "whatThisProves",
  "whatThisDoesNotProve",
  "authorship",
  "aiAssistance",
  "rights",
  "limitations",
  "evidenceRequests",
];

if (
  !hasTextFields(pureDataLearningEvidence, [
    "id",
    "title",
    "status",
    "version",
    "startedAt",
    "purpose",
    "description",
    "authorshipNote",
    "versionNote",
    "nextStep",
    "submissionVisibility",
  ])
  || pureDataLearningEvidence.id !== "pure-data-learning"
  || pureDataLearningEvidence.status !== "學習中／可操作功能原型"
  || pureDataLearningEvidence.version !== "v0.2.1　本機功能測試"
  || pureDataLearningEvidence.startedAt !== "2026/07/24"
  || pureDataLearningEvidence.submissionVisibility !== "public"
  || publicAuditOnlyFields.some((field) => Object.hasOwn(pureDataLearningEvidence, field))
  || !Array.isArray(pureDataLearningEvidence.tools)
  || pureDataLearningEvidence.tools.length < 3
  || pureDataLearningEvidence.tools.some((item) => !item?.trim())
  || !Array.isArray(pureDataLearningEvidence.roles)
  || pureDataLearningEvidence.roles.length < 3
  || pureDataLearningEvidence.roles.some((item) => !item?.trim())
) {
  errors.push("Pure Data public evidence needs the learning/prototype identity, local-test label, public authorship/version notes, and no audit-only fields");
}

const pureDataMedia = pureDataLearningEvidence.media;
if (
  !hasTextFields(pureDataMedia, [
    "title",
    "src",
    "poster",
    "mimeType",
    "caption",
    "accessibilitySummary",
    "fallbackMessage",
  ])
  || pureDataMedia.mimeType !== "video/mp4"
  || !Number.isFinite(pureDataMedia.width)
  || !Number.isFinite(pureDataMedia.height)
  || !Number.isFinite(pureDataMedia.durationSeconds)
  || pureDataMedia.durationSeconds <= 0
  || pureDataMedia.src.endsWith("/v0.2.1.mp4")
) {
  errors.push("Pure Data video needs a descriptive public filename, poster, intrinsic size, duration, caption, and accessible fallback");
} else {
  assertAsset(pureDataLearningEvidence, "Pure Data video", pureDataMedia.src);
  assertAsset(pureDataLearningEvidence, "Pure Data poster", pureDataMedia.poster);
}
for (const [field, minimumLength] of [["viewingGuide", 5], ["completed", 3]]) {
  if (
    !Array.isArray(pureDataLearningEvidence[field])
    || pureDataLearningEvidence[field].length < minimumLength
    || pureDataLearningEvidence[field].some((item) => !item?.trim())
  ) {
    errors.push(`Pure Data public evidence ${field} needs at least ${minimumLength} non-empty entries`);
  }
}
if (
  pureDataLearningEvidence.viewingGuide?.length !== 5
  || pureDataLearningEvidence.evidenceLinks?.length !== 1
  || !hasTextFields(pureDataLearningEvidence.evidenceLinks[0], ["type", "label", "href"])
  || pureDataLearningEvidence.evidenceLinks[0]?.href !== pureDataMedia?.src
) {
  errors.push("Pure Data public evidence needs the five-step viewing guide and one matching video link");
}

const expectedRepresentativeIds = ["huaben-short-film", "hope-feathers-wings-mv"];
const expectedRepresentativeLinks = new Map([
  ["huaben-short-film", "https://www.youtube.com/watch?v=mJ9o_u1W2cY"],
  ["hope-feathers-wings-mv", "https://www.youtube.com/watch?v=9VznR4XSiM0"],
]);
if (
  representativeWorks.length !== expectedRepresentativeIds.length
  || representativeWorks.some(
    (work, index) =>
      work.id !== expectedRepresentativeIds[index]
      || !hasTextFields(work, [
        "id",
        "title",
        "type",
        "status",
        "summary",
        "purpose",
        "reflection",
        "materialsNote",
        "submissionVisibility",
      ])
      || work.status !== "已完成"
      || work.submissionVisibility !== "public"
      || publicAuditOnlyFields.some((field) => Object.hasOwn(work, field))
      || !Array.isArray(work.roles)
      || work.roles.length < 3
      || work.roles.some((item) => !item?.trim())
      || !Array.isArray(work.tools)
      || work.tools.some((item) => !item?.trim())
      || !Array.isArray(work.highlights)
      || work.highlights.length < 3
      || work.highlights.some((item) => !item?.trim())
      || !Array.isArray(work.evidenceLinks)
      || work.evidenceLinks.length < 1
      || work.evidenceLinks.some(
        (link) =>
          !hasTextFields(link, ["type", "label", "href"])
          || !/^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}$/.test(link.href),
      )
      || work.evidenceLinks[0]?.href !== expectedRepresentativeLinks.get(work.id),
  )
) {
  errors.push("Representative works need ordered public cards with roles, optional tools, highlights, reflection, material notes, and canonical HTTPS YouTube links");
}
if (!representativeWorks[1]?.materialsNote.includes("原始角色、動畫影像與音樂權利屬原權利人")) {
  errors.push("The secondary-creation MV needs the explicit third-party rights statement");
}

const publicAdmissionRecords = [pureDataLearningEvidence, ...representativeWorks];
const publicAdmissionRecordsById = new Map(publicAdmissionRecords.map((record) => [record.id, record]));
const auditRecordEntries = Object.entries(admissionAuditRecords ?? {});
if (
  auditRecordEntries.length !== expectedRepresentativeIds.length + 1
  || auditRecordEntries.some(([recordId]) => !publicAdmissionRecordsById.has(recordId))
  || publicAdmissionRecords.some((record) => !Object.hasOwn(admissionAuditRecords, record.id))
) {
  errors.push("Admission audit records must align one-to-one with the stable IDs in public admission records");
}
for (const [recordId, auditRecord] of auditRecordEntries) {
  const publicRecord = publicAdmissionRecordsById.get(recordId);
  if (
    !publicRecord
    || !hasTextFields(auditRecord, [
      "id",
      "publicRecordId",
      "title",
      "evidenceStatus",
      "validationStatus",
      "authorship",
      "aiAssistance",
      "rights",
      "submissionVisibility",
    ])
    || auditRecord.id !== recordId
    || auditRecord.publicRecordId !== recordId
    || auditRecord.title !== publicRecord.title
    || auditRecord.submissionVisibility !== "draft-only"
  ) {
    errors.push(`Admission audit record ${recordId} needs a stable public ID plus complete evidence, validation, authorship, AI, and rights fields`);
  }
  for (const field of ["supportedClaims", "unsupportedClaims", "limitations", "evidenceRequests"]) {
    if (
      !Array.isArray(auditRecord?.[field])
      || auditRecord[field].length < 2
      || auditRecord[field].some((item) => !item?.trim())
    ) {
      errors.push(`Admission audit record ${recordId} ${field} needs at least two non-empty entries`);
    }
  }
}
if (
  supportingEvidenceLinks.length < 2
  || supportingEvidenceLinks.some((item) => !hasTextFields(item, ["label", "title", "description", "target"]))
) {
  errors.push("Representative works need non-empty links to other verifiable cases before the secondary-creation record");
}
if (
  collaborationEvidence.length !== 3
  || collaborationEvidence.some(
    (item) => !hasTextFields(item, ["title"]) || item.evidence?.length < 2 || item.evidence.some((entry) => !entry?.trim()),
  )
) {
  errors.push("Collaboration evidence needs exactly three event-backed traits");
}
const expectedRoadmapStatuses = ["已完成與可操作", "正在學習", "下一階段", "研究所學習方向"];
if (
  learningRoadmap.length !== expectedRoadmapStatuses.length
  || learningRoadmap.some(
    (stage, index) =>
      stage.status !== expectedRoadmapStatuses[index]
      || !Array.isArray(stage.items)
      || stage.items.length < 4
      || stage.items.some((item) => !item?.trim()),
  )
) {
  errors.push("Learning roadmap needs the four ordered evidence, learning, no-work-yet, and graduate-study stages");
}
const finalPortfolioHrefs = finalPortfolioLinks.map((link) => link.href);
const remoteFinalPortfolioLinks = finalPortfolioLinks.filter((link) => /^https?:\/\//i.test(link.href));
if (
  finalPortfolioLinks.length !== 3
  || finalPortfolioLinks.some((link) => !hasTextFields(link, ["label", "href", "description"]))
  || !siteIdentity.repositoryUrl.startsWith("https://")
  || finalPortfolioHrefs.filter((href) => href.startsWith("mailto:")).length !== 1
  || finalPortfolioHrefs.filter((href) => href === siteIdentity.repositoryUrl).length !== 1
  || finalPortfolioHrefs.filter((href) => href === "#project-index").length !== 1
  || remoteFinalPortfolioLinks.some((link) => link.href !== siteIdentity.repositoryUrl)
) {
  errors.push("Final portfolio links need the contact email, GitHub HTTPS repository, and the in-page project index link only");
}

const expectedResponsibilityGroups = ["AI 協助的部分", "決策與驗收", "正在補強的能力"];
const responsibilityGroups = Array.isArray(aiWorkflow.responsibilityGroups)
  ? aiWorkflow.responsibilityGroups
  : [];
if (
  !hasTextFields(aiWorkflow, ["id", "eyebrow", "title", "summary"])
  || aiWorkflow.id !== "ai-workflow"
  || responsibilityGroups.length !== expectedResponsibilityGroups.length
  || responsibilityGroups.some(
    (group, index) =>
      group.label !== expectedResponsibilityGroups[index]
      || !Array.isArray(group.items)
      || group.items.length < 3
      || group.items.some((item) => !item?.trim()),
  )
) {
  errors.push("AI workflow must keep assistance, applicant responsibility, and capability gaps separate");
}
if (Object.hasOwn(aiWorkflow, "evidencePaths")) {
  errors.push("AI workflow public data must not include internal evidence-document paths");
}
const failureCases = Array.isArray(aiWorkflow.failureCases) ? aiWorkflow.failureCases : [];
if (failureCases.length < 3) {
  errors.push("AI workflow needs the three documented failure cases");
}
for (const failure of failureCases) {
  if (!hasTextFields(failure, ["problem", "discovery", "diagnosis", "check", "correction", "learning"])) {
    errors.push(`AI workflow failure case ${failure.problem ?? "unknown"} needs the full discovery-to-learning chain`);
  }
}

for (const project of projectCaseStudies) {
  if (seenIds.has(project.id)) {
    errors.push(`Duplicate project id: ${project.id}`);
  }
  seenIds.add(project.id);

  const searchableText = JSON.stringify(project);
  if (mojibakePattern.test(searchableText)) {
    errors.push(`${project.id}: possible mojibake/corrupted text detected`);
  }

  if (project.titleLines?.length) {
    const visualTitle = project.titleLines.flat().join("").replace(/\s+/g, "");
    const accessibleTitle = project.title.replace(/\s+/g, "");
    if (visualTitle !== accessibleTitle) {
      errors.push(`${project.id}: titleLines must render the complete project title`);
    }
  }

  if (publicConstructionPattern.test(searchableText)) {
    errors.push(`${project.id}: public content contains construction-stage wording`);
  }

  if (sensitivePublicPattern.test(searchableText)) {
    errors.push(`${project.id}: public content contains sensitive local/export/media reference`);
  }
  // Block private data-file and local-path references from the public portfolio data model.

  if (!validSubmissionVisibilities.has(project.submissionVisibility)) {
    errors.push(`${project.id}: missing or invalid submissionVisibility`);
  }

  if (project.layoutVariant === "learning-dashboard-v2") {
    const dashboard = project.learningDashboardCase;
    const sectionIds = dashboard?.sections?.map((section) => section.id) ?? [];
    const processSteps = dashboard?.process?.layers?.flatMap((layer) => layer.steps ?? []) ?? [];
    const metricKeys = new Set(project.testing?.metrics?.map((metric) => metric.key).filter(Boolean));

    if (!dashboard) {
      errors.push(`${project.id}: learning-dashboard-v2 needs learningDashboardCase content`);
    } else {
      if (project.extendedSections) {
        errors.push(`${project.id}: dedicated dashboard renderer must not carry unreachable extendedSections`);
      }
      if (sectionIds.join(",") !== expectedLearningDashboardSectionIds.join(",")) {
        errors.push(`${project.id}: dashboard sections must preserve the nine published anchor suffixes in order`);
      }
      if (
        new Set(sectionIds).size !== expectedLearningDashboardSectionIds.length
        || dashboard.sections?.some((section, index) => (
          !hasTextFields(section, ["id", "number", "navLabel", "title"])
          || section.number !== String(index + 1).padStart(2, "0")
          || (section.id !== "summary" && !section.introduction?.trim())
        ))
      ) {
        errors.push(`${project.id}: dashboard sections need unique ids, ordered numbers, navigation labels, titles, and introductions`);
      }
      if (
        !dashboard.readingMapDescription?.trim()
        || dashboard.hero?.facts?.length !== 2
        || dashboard.hero.facts.some((fact) => !hasTextFields(fact, ["label", "value"]))
        || !dashboard.hero?.readingFrame?.title?.trim()
        || dashboard.hero.readingFrame.points?.length !== 3
        || dashboard.hero.readingFrame.points.some((point) => !hasTextFields(point, ["label", "value"]))
      ) {
        errors.push(`${project.id}: dashboard hero and reading map need complete data-backed copy`);
      }
      if (!hasTextFields(dashboard.dataSource, ["title", "description", "provider"])) {
        errors.push(`${project.id}: dashboard data source needs title, description, and provider`);
      }
      if (
        !hasTextFields(dashboard.process?.summary, ["title", "description"])
        || dashboard.process?.layers?.length !== 3
        || dashboard.process.layers.some((layer) => (
          !hasTextFields(layer, ["label", "description"])
          || !layer.steps?.length
          || layer.steps.some((step) => !hasTextFields(step, ["title", "tool"]))
        ))
        || processSteps.length !== 7
      ) {
        errors.push(`${project.id}: dashboard process needs three complete layers and exactly seven steps`);
      }
      if (
        dashboard.overview?.regions?.length !== 5
        || dashboard.overview.regions.some((region) => !region?.trim())
        || !hasTextFields(dashboard.overview?.summary, ["title", "description", "ethicsLinkLabel"])
      ) {
        errors.push(`${project.id}: dashboard overview needs five regions and complete summary copy`);
      }
      if (
        dashboard.charts?.length !== 3
        || dashboard.charts.some((chart) => !hasTextFields(
          chart,
          ["eyebrow", "title", "question", "rationale", "observation", "limitation"],
        ))
      ) {
        errors.push(`${project.id}: dashboard charts need three complete data-backed reading cards`);
      }
      if (
        !hasTextFields(dashboard.interaction?.summary, ["title", "description"])
        || dashboard.interaction?.features?.length !== 4
        || dashboard.interaction.features.some((feature) => !hasTextFields(feature, ["title", "description"]))
      ) {
        errors.push(`${project.id}: dashboard interaction needs complete summary copy and four features`);
      }
      if (!metricKeys.has("currentOutcome") || !metricKeys.has("readingPrinciple")) {
        errors.push(`${project.id}: dashboard metrics need stable currentOutcome and readingPrinciple keys`);
      }
    }
  }

  const completeness = getProjectCompleteness(project);
  if (!completeness.requiredComplete) {
    errors.push(`${project.id}: missing required groups ${completeness.requiredMissing.join(", ")}`);
  }

  if (!completeness.recommendedComplete) {
    warnings.push(`${project.id}: recommended groups still incomplete: ${completeness.recommendedMissing.join(", ")}`);
  }

  const internalNotes = getProjectInternalNotes(project.id);
  if (!internalNotes) {
    warnings.push(`${project.id}: no draft-only internal notes found`);
  }

  if (project.evidenceBoundary?.governanceRef === "hamlet-media-manifest") {
    if (!internalNotes?.evidenceReadiness || !internalNotes?.rightsReview) {
      errors.push(`${project.id}: evidenceBoundary needs draft-only evidenceReadiness and rightsReview`);
    } else {
      if (!existsSync(path.join(root, internalNotes.evidenceReadiness.manifestPath ?? ""))) {
        errors.push(`${project.id}: internal evidence manifest path is missing`);
      }
      for (const evidenceRef of [
        ...(internalNotes.evidenceReadiness.verifiedEvidenceRefs ?? []),
        ...(internalNotes.evidenceReadiness.derivedProcessRefs ?? []),
      ]) {
        if (!validEvidenceRefs.has(evidenceRef)) {
          errors.push(`${project.id}: internal readiness references unknown evidence ${evidenceRef}`);
        }
      }
      if (internalNotes.rightsReview.status !== evidenceManifest.rightsReview?.status) {
        errors.push(`${project.id}: internal rights status differs from evidence manifest`);
      }
      if (internalNotes.rightsReview.publicationGate !== evidenceManifest.rightsReview?.publicationGate) {
        errors.push(`${project.id}: internal publication gate differs from evidence manifest`);
      }
      if (
        internalNotes.rightsReview.applicantAttestation?.confirmed
        !== evidenceManifest.rightsReview?.applicantAttestation?.confirmed
      ) {
        errors.push(`${project.id}: internal applicant attestation differs from evidence manifest`);
      }
    }
  } else if (project.evidenceBoundary?.governanceRef) {
    errors.push(`${project.id}: unknown evidenceBoundary governanceRef ${project.evidenceBoundary.governanceRef}`);
  }

  if (typeof project.priority !== "number") {
    errors.push(`${project.id}: missing numeric priority for editorial ordering`);
  }

  if (!validProjectStatuses.get(project.statusKey)?.has(project.status)) {
    errors.push(`${project.id}: status does not match statusKey ${project.statusKey}`);
  }

  if (project.submissionVisibility === "public") {
    const expectedCopy = expectedIndexCopy.get(project.id);
    if (!expectedCopy) {
      errors.push(`${project.id}: public project is missing from the featured-work index contract`);
    } else {
      if (project.indexTitle !== expectedCopy.title) {
        errors.push(`${project.id}: indexTitle differs from the approved short title`);
      }
      if (project.indexSummary !== expectedCopy.summary) {
        errors.push(`${project.id}: indexSummary differs from the approved short summary`);
      }
    }

    assertIndexImage(project, project.indexCover);

    if (
      project.indexCoverPosition != null
      && (typeof project.indexCoverPosition !== "string" || !project.indexCoverPosition.trim())
    ) {
      errors.push(`${project.id}: indexCoverPosition must be a non-empty CSS object-position string when provided`);
    }

    const indexTags = project.indexTags ?? [];
    if (indexTags.length !== 3 || new Set(indexTags).size !== indexTags.length || indexTags.some((tag) => !tag?.trim())) {
      errors.push(`${project.id}: indexTags needs exactly three unique non-empty static keywords`);
    }

    if (!Array.isArray(project.indexLinks)) {
      errors.push(`${project.id}: indexLinks must be an array, including an empty array when no public result endpoint exists`);
    } else {
      const allowedTargets = validIndexLinkTargets.get(project.id) ?? new Set();
      const seenIndexTargets = new Set();
      for (const link of project.indexLinks) {
        if (!hasTextFields(link, ["label", "href"]) || link.href === "#" || /^javascript:/i.test(link.href)) {
          errors.push(`${project.id}: indexLinks entries need a non-empty label and safe href`);
        } else if (!allowedTargets.has(link.href)) {
          errors.push(`${project.id}: indexLinks target is not an approved rendered result endpoint ${link.href}`);
        }
        if (typeof link?.href === "string" && link.href) {
          if (seenIndexTargets.has(link.href)) {
            errors.push(`${project.id}: indexLinks contains duplicate target ${link.href}`);
          }
          seenIndexTargets.add(link.href);
        }
      }
    }
  }

  if (!project.trackIds?.length) {
    errors.push(`${project.id}: missing research track mapping`);
  } else {
    for (const trackId of project.trackIds) {
      if (!validTrackIds.has(trackId)) {
        errors.push(`${project.id}: unknown research track id ${trackId}`);
      }
    }
  }

  const connectedThemes = new Set(project.instituteConnections ?? []);
  const themeEvidenceStatus = project.themeEvidenceStatus;

  if (!project.instituteConnections?.length) {
    errors.push(`${project.id}: missing institute connection themes`);
  } else {
    for (const theme of project.instituteConnections) {
      if (!validInstituteThemes.has(theme)) {
        errors.push(`${project.id}: unknown institute theme ${theme}`);
      }
      if (!project.themeRationales?.[theme]?.trim()) {
        errors.push(`${project.id}: missing theme rationale for ${theme}`);
      }
      if (!Object.prototype.hasOwnProperty.call(themeEvidenceStatus ?? {}, theme)) {
        errors.push(`${project.id}: missing theme evidence status for ${theme}`);
      }
    }
  }

  for (const theme of Object.keys(project.themeRationales ?? {})) {
    if (!validInstituteThemes.has(theme)) {
      errors.push(`${project.id}: theme rationale uses unknown institute theme ${theme}`);
    } else if (!connectedThemes.has(theme)) {
      errors.push(`${project.id}: theme rationale is not declared in instituteConnections: ${theme}`);
    }
  }

  if (!themeEvidenceStatus || typeof themeEvidenceStatus !== "object" || Array.isArray(themeEvidenceStatus)) {
    errors.push(`${project.id}: project needs a themeEvidenceStatus mapping`);
  }

  for (const [theme, status] of Object.entries(themeEvidenceStatus ?? {})) {
    if (!validInstituteThemes.has(theme)) {
      errors.push(`${project.id}: theme evidence status uses unknown institute theme ${theme}`);
    } else if (!connectedThemes.has(theme)) {
      errors.push(`${project.id}: theme evidence status is not declared in instituteConnections: ${theme}`);
    }
    if (!validThemeEvidenceStatuses.has(status)) {
      errors.push(`${project.id}: unknown theme evidence status ${status} for ${theme}`);
    }
  }

  for (const omittedField of project.metadataOmissions ?? []) {
    if (!validMetadataOmissions.has(omittedField)) {
      errors.push(`${project.id}: unsupported metadata omission ${omittedField}`);
    }
    if (project[omittedField] != null && project[omittedField] !== "") {
      errors.push(`${project.id}: omitted metadata ${omittedField} must not carry a public value`);
    }
  }

  if (!validTestingStatuses.has(project.testing?.statusKey)) {
    errors.push(`${project.id}: missing or invalid testing statusKey`);
  } else if (project.testing.statusKey === "notValidated") {
    if (project.testing.metrics?.length || project.testing.insights?.length || project.testing.learningOutcomes?.length) {
      errors.push(`${project.id}: notValidated testing state must not include result evidence`);
    }
    if (!project.testing.plannedMethods?.length) {
      errors.push(`${project.id}: notValidated testing state needs plannedMethods`);
    }
  } else if (!project.testing.metrics?.length && !project.testing.insights?.length) {
    errors.push(`${project.id}: ${project.testing.statusKey} testing state needs actual evidence`);
  }

  if (project.tags) {
    const uniqueTags = new Set(project.tags);
    if (project.tags.length < 4 || project.tags.length > 6 || uniqueTags.size !== project.tags.length || project.tags.some((tag) => !tag?.trim())) {
      errors.push(`${project.id}: tags need 4-6 unique non-empty values`);
    }
  }

  if (project.projectInfo) {
    if (project.projectInfo.length < 4 || project.projectInfo.some((item) => !hasTextFields(item, ["label", "value"]))) {
      errors.push(`${project.id}: projectInfo needs at least four label/value entries`);
    }
  }

  if (project.challenge && !hasTextFields(project.challenge, ["title", "description"])) {
    errors.push(`${project.id}: challenge needs title and description`);
  }

  if (project.workflow) {
    if (!hasTextFields(project.workflow, ["title", "summary"]) || project.workflow.stages?.length !== 5) {
      errors.push(`${project.id}: workflow needs title, summary, and exactly five stages`);
    }
    for (const [index, stage] of (project.workflow.stages ?? []).entries()) {
      if (!hasTextFields(stage, ["title", "description", "tool", "input", "output", "constraint", "humanCheck"])) {
        errors.push(`${project.id}: workflow stage ${index + 1} needs tool, input, output, constraint, humanCheck, and complete copy`);
      }
    }
  }

  if (project.promptDecisions) {
    if (project.promptDecisions.length !== 4) {
      errors.push(`${project.id}: promptDecisions needs exactly four cards`);
    }
    for (const decision of project.promptDecisions) {
      if (
        !hasTextFields(decision, ["title", "evidenceStatus", "evidenceSource", "constraint", "rationale", "outputProblem", "humanCheck"])
        || !validPromptEvidenceStatuses.has(decision.evidenceStatus)
      ) {
        errors.push(`${project.id}: every prompt decision needs evidence provenance and complete decision copy`);
      }
      if (!Array.isArray(decision.artifactRefs)) {
        errors.push(`${project.id}: every prompt decision needs an artifactRefs array`);
      } else if (decision.evidenceStatus === "specificationOnly" && decision.artifactRefs.length) {
        errors.push(`${project.id}: specificationOnly prompt decisions must not claim artifact refs`);
      }
    }
  }

  if (project.promptTemplate) {
    const template = project.promptTemplate;
    if (
      !hasTextFields(template, ["originStatus", "evidenceRef", "eyebrow", "title", "provenance", "summary"])
      || !validPromptTemplateOriginStatuses.has(template.originStatus)
    ) {
      errors.push(`${project.id}: promptTemplate needs complete copy and a valid originStatus`);
    }
    if (!validEvidenceRefs.has(template.evidenceRef)) {
      errors.push(`${project.id}: promptTemplate references unknown evidence ${template.evidenceRef}`);
    }
    if (template.originStatus === "derived" && template.usedForExistingVideo !== false) {
      errors.push(`${project.id}: derived promptTemplate must declare usedForExistingVideo false`);
    }
    if (template.variables?.length < 4 || template.variables?.length > 8) {
      errors.push(`${project.id}: promptTemplate needs 4-8 variables`);
    }
    const variableTokens = new Set();
    for (const variable of template.variables ?? []) {
      if (!hasTextFields(variable, ["token", "label", "guidance"]) || !/^\{\{[a-z0-9_]+\}\}$/i.test(variable.token)) {
        errors.push(`${project.id}: promptTemplate variables need {{token}}, label, and guidance`);
      }
      variableTokens.add(variable.token);
    }
    if (variableTokens.size !== (template.variables?.length ?? 0)) {
      errors.push(`${project.id}: promptTemplate variable tokens must be unique`);
    }
    if (template.prompt?.length < 5 || template.prompt?.length > 10 || template.prompt.some((line) => !line?.trim())) {
      errors.push(`${project.id}: promptTemplate prompt needs 5-10 non-empty instruction blocks`);
    }
    const promptText = (template.prompt ?? []).join(" ");
    for (const token of variableTokens) {
      if (!promptText.includes(token)) {
        errors.push(`${project.id}: promptTemplate does not use variable ${token}`);
      }
    }
    if (
      template.reviewChecklist?.length < 3
      || template.reviewChecklist?.length > 6
      || template.reviewChecklist.some((item) => !item?.trim())
    ) {
      errors.push(`${project.id}: promptTemplate needs 3-6 human review checks`);
    }
  }

  if (project.storyboard) {
    if (!hasTextFields(project.storyboard, ["title", "summary"]) || project.storyboard.frames?.length < 2) {
      errors.push(`${project.id}: storyboard needs title, summary, and at least two frames`);
    }
    for (const [index, frame] of (project.storyboard.frames ?? []).entries()) {
      if (!hasTextFields(frame, ["title", "titleEn", "time", "subtitle", "description", "control"])) {
        errors.push(`${project.id}: storyboard frame ${index + 1} needs bilingual titles, time, subtitle, description, and control`);
      }
      if (!Number.isFinite(frame.seekSeconds) || frame.seekSeconds < 0) {
        errors.push(`${project.id}: storyboard frame ${index + 1} needs a non-negative seekSeconds value`);
      }
      assertImage(project, `storyboard frame ${index + 1}`, frame.image);
    }
  }

  if (project.featuredExample) {
    if (!hasTextFields(project.featuredExample, ["eyebrow", "title", "summary", "focusTitle", "focusDescription"]) || !project.featuredExample.themes?.length) {
      errors.push(`${project.id}: featuredExample needs narrative copy, focus copy, and themes`);
    }
  }

  if (project.mediaLayers) {
    if (project.mediaLayers.length !== 5 || project.mediaLayers.some((layer) => !hasTextFields(layer, ["label", "status", "role", "check"]))) {
      errors.push(`${project.id}: mediaLayers needs exactly five complete layers`);
    }
    if (project.id === "generative-interface-study") {
      const expectedLayerLabels = ["故事節點", "場景圖像", "英文字幕／情節文字", "情緒配樂", "Canva 剪輯與最終影片"];
      if (JSON.stringify(project.mediaLayers.map((layer) => layer.label)) !== JSON.stringify(expectedLayerLabels)) {
        errors.push(`${project.id}: mediaLayers must preserve the verified story-to-video sequence without an unproduced narration layer`);
      }
    }
  }

  if (project.deliverables) {
    if (project.deliverables.length < 5 || project.deliverables.length > 7) {
      errors.push(`${project.id}: deliverables needs 5-7 entries`);
    }
    const deliverableIds = new Set();
    const statusLabelsByKey = {
      artifactVerified: "實際成果",
      artifactDerived: "流程產出",
      processDerived: "流程產出",
      specificationOnly: "製作規格",
    };
    for (const item of project.deliverables) {
      if (
        !hasTextFields(item, ["id", "title", "statusKey", "status", "attributionSource", "description"])
        || !validDeliverableStatuses.has(item.status)
        || !validDeliverableStatusKeys.has(item.statusKey)
        || !validAttributionSources.has(item.attributionSource)
      ) {
        errors.push(`${project.id}: deliverable entries need id, provenance, description, and valid evidence statuses`);
      }
      if (deliverableIds.has(item.id)) errors.push(`${project.id}: duplicate deliverable id ${item.id}`);
      deliverableIds.add(item.id);
      if (statusLabelsByKey[item.statusKey] !== item.status) {
        errors.push(`${project.id}: deliverable ${item.id} status label does not match ${item.statusKey}`);
      }
      if (!Array.isArray(item.evidenceRefs)) {
        errors.push(`${project.id}: deliverable ${item.id} needs an evidenceRefs array`);
        continue;
      }
      if (item.statusKey === "specificationOnly" && item.evidenceRefs.length) {
        errors.push(`${project.id}: specificationOnly deliverable ${item.id} must not claim artifact refs`);
      }
      if (item.statusKey !== "specificationOnly" && !item.evidenceRefs.length) {
        errors.push(`${project.id}: deliverable ${item.id} needs at least one evidence ref`);
      }
      for (const evidenceRef of item.evidenceRefs) {
        if (!validEvidenceRefs.has(evidenceRef)) {
          errors.push(`${project.id}: deliverable ${item.id} references unknown evidence ${evidenceRef}`);
        }
      }
    }
  }

  if (project.evidenceBoundary) {
    if (!project.evidenceBoundary.title?.trim()) {
      errors.push(`${project.id}: evidenceBoundary needs a title`);
    }
    for (const field of ["verifiedArtifacts", "approvedSpecifications", "notIndependentlyVerified"]) {
      if (!project.evidenceBoundary[field]?.length || project.evidenceBoundary[field].some((item) => !item?.trim())) {
        errors.push(`${project.id}: evidenceBoundary ${field} needs non-empty entries`);
      }
    }
    if (
      project.evidenceBoundary.groupLabels
      && (
        project.evidenceBoundary.groupLabels.length !== 3
        || project.evidenceBoundary.groupLabels.some((item) => !item?.trim())
      )
    ) {
      errors.push(`${project.id}: evidenceBoundary groupLabels needs exactly three non-empty labels`);
    }
  }

  if (project.outcomes) {
    if (
      project.outcomes.length !== 3
      || project.outcomes.some((outcome) => !hasTextFields(outcome, ["kind", "title", "description"]) || outcome.kind !== "designValue")
    ) {
      errors.push(`${project.id}: outcomes needs exactly three designValue cards`);
    }
  }

  if (project.evaluationPlan) {
    const plan = project.evaluationPlan;
    if (!hasTextFields(plan, ["status", "title", "summary", "dataPolicy"]) || plan.status !== "planned") {
      errors.push(`${project.id}: evaluationPlan must remain explicitly planned until study evidence exists`);
    }
    if (plan.participantRoles?.length < 1 || plan.participantRoles.some((role) => !role?.trim())) {
      errors.push(`${project.id}: evaluationPlan needs planned participant roles`);
    }
    if (plan.tasks?.length < 2 || plan.tasks?.length > 5) {
      errors.push(`${project.id}: evaluationPlan needs 2-5 tasks`);
    }
    const taskIds = new Set();
    for (const task of plan.tasks ?? []) {
      if (
        !hasTextFields(task, ["id", "status", "task", "decisionUse"])
        || task.status !== "planned"
        || !task.evidenceToCollect?.length
        || task.evidenceToCollect.some((item) => !item?.trim())
      ) {
        errors.push(`${project.id}: evaluationPlan tasks need planned status, collection evidence, and decision use`);
      }
      if (taskIds.has(task.id)) errors.push(`${project.id}: duplicate evaluationPlan task id ${task.id}`);
      taskIds.add(task.id);
      if (task.participantCount != null || task.conductedAt != null || task.results != null) {
        errors.push(`${project.id}: planned evaluation tasks must not contain participant counts, dates, or results`);
      }
    }
  }

  if (project.nextSteps && (project.nextSteps.length < 2 || project.nextSteps.length > 3 || project.nextSteps.some((step) => !step?.trim()))) {
    errors.push(`${project.id}: nextSteps needs 2-3 non-empty future actions`);
  }

  if (project.ctas) {
    if (project.ctas.length < 2) errors.push(`${project.id}: ctas needs at least two working actions`);
    const localTargets = new Set([
      `#${project.id}`,
      project.media?.videos?.some((video) => video.featured) ? `#${project.id}-featured-media` : null,
      project.media?.videos?.some((video) => video.featured) ? `#${project.id}-featured-media-player` : null,
      project.workflow ? `#${project.id}-workflow` : null,
      project.promptDecisions?.length ? `#${project.id}-prompt-system` : null,
      project.storyboard ? `#${project.id}-storyboard` : null,
      project.outcomes?.length ? `#${project.id}-outcomes` : null,
      project.nextSteps?.length ? `#${project.id}-next-steps` : null,
    ].filter(Boolean));
    for (const cta of project.ctas) {
      if (!hasTextFields(cta, ["label", "href"]) || cta.href === "#" || /^javascript:/i.test(cta.href)) {
        errors.push(`${project.id}: CTA entries need a non-empty safe href`);
      } else if (cta.href.startsWith(`#${project.id}-`) && !localTargets.has(cta.href)) {
        errors.push(`${project.id}: CTA target is not rendered ${cta.href}`);
      }
      if (cta.focusTarget && (!cta.focusTarget.startsWith(`#${project.id}-`) || !localTargets.has(cta.focusTarget))) {
        errors.push(`${project.id}: CTA focusTarget is not rendered ${cta.focusTarget}`);
      }
    }
  }

  if (project.interactivePrototype?.type === "webAudioSpatialMapper") {
    const expectedMappingIds = new Set(["horizontal-pan", "vertical-pitch", "speed-brightness", "size-loudness"]);
    if (project.interactionMappings?.length !== expectedMappingIds.size) {
      errors.push(`${project.id}: Web Audio prototype needs four interaction mappings`);
    }
    for (const mapping of project.interactionMappings ?? []) {
      expectedMappingIds.delete(mapping.id);
      if (!mapping.input?.trim() || !mapping.parameter?.trim() || !mapping.rationale?.trim()) {
        errors.push(`${project.id}: mapping ${mapping.id} needs input, parameter, and rationale`);
      }
      if (mapping.inputRange?.length !== 2 || mapping.outputRange?.length !== 2) {
        errors.push(`${project.id}: mapping ${mapping.id} needs two-value input and output ranges`);
      }
    }
    if (expectedMappingIds.size) errors.push(`${project.id}: missing mappings ${[...expectedMappingIds].join(", ")}`);
    if (!project.signalFlow?.length || !project.listeningGuide?.length || !project.researchQuestion?.trim()) {
      errors.push(`${project.id}: Web Audio prototype needs researchQuestion, signalFlow, and listeningGuide`);
    }
    if (
      project.signalFlow?.length !== expectedWebAudioSignalFlow.length
      || project.signalFlow.some((step, index) => step !== expectedWebAudioSignalFlow[index])
    ) {
      errors.push(`${project.id}: Web Audio signalFlow must preserve input, normalization, mapping, DSP graph, and output order`);
    }
    const internalEvidenceBoundary = getProjectInternalNotes(project.id)?.evidenceBoundary;
    if (
      project.evidenceBoundary
      || internalEvidenceBoundary?.id !== "interactive-sound-learning-evidence-boundary"
      || internalEvidenceBoundary?.groupLabels?.[0] !== "目前可以證明"
      || ["verifiedArtifacts", "approvedSpecifications", "notIndependentlyVerified"].some(
        (field) =>
          !Array.isArray(internalEvidenceBoundary?.[field])
          || internalEvidenceBoundary[field].length < 2
          || internalEvidenceBoundary[field].some((item) => !item?.trim()),
      )
    ) {
      errors.push(`${project.id}: Web Audio evidence boundary must remain complete in draft-only internal notes and absent from public project data`);
    }
  }

  const hiddenMediaCollections = [
    project.diagrams,
    project.media?.visualDrafts,
    project.media?.screenshots,
    project.media?.videos,
    project.media?.audio,
    project.media?.demos,
  ];
  if (project.submissionVisibility === "hidden") {
    if (project.cover || hiddenMediaCollections.some((collection) => collection?.length)) {
      errors.push(`${project.id}: hidden project must use an empty media state until evidence is public-safe`);
    }
  } else {
    assertImage(project, "cover", project.cover);
  }

  if (requiredProductionWorkflowIds.has(project.id) && !project.productionWorkflow) {
    errors.push(`${project.id}: productionWorkflow is required for the rendered CaseProcessSection`);
  }

  if (project.productionWorkflow) {
    const flow = project.productionWorkflow;
    if (!hasTextFields(flow, ["eyebrow", "title", "introduction"]) || flow.stages?.length !== 4) {
      errors.push(`${project.id}: productionWorkflow needs eyebrow, title, introduction, and exactly four stages`);
    }
    for (const [index, stage] of (flow.stages ?? []).entries()) {
      if (!hasTextFields(stage, ["number", "title", "description", "tone"])) {
        errors.push(`${project.id}: productionWorkflow stage ${index + 1} needs number, title, description, and tone`);
      }
      if (stage.number !== expectedProductionWorkflowNumbers[index]) {
        errors.push(`${project.id}: productionWorkflow stage ${index + 1} must use ordered number ${expectedProductionWorkflowNumbers[index]}`);
      }
      if (!validProductionWorkflowTones.has(stage.tone)) {
        errors.push(`${project.id}: productionWorkflow stage ${index + 1} uses unsupported tone ${stage.tone}`);
      }
    }
    if (project.diagrams?.length) {
      errors.push(`${project.id}: productionWorkflow and diagrams cannot both populate the same CaseProcessSection`);
    }
  }

  for (const diagram of project.diagrams ?? []) {
    if (!validDiagramTypes.has(diagram.type)) {
      errors.push(`${project.id}: unknown diagram type ${diagram.type}`);
    }
    if (!diagram.caption?.trim() || (diagram.kind !== "visualStrategy" && !diagram.description?.trim())) {
      errors.push(`${project.id}: diagram ${diagram.title} needs caption and long description`);
    }
    assertImage(project, `diagram ${diagram.title}`, diagram.image);
  }

  for (const group of [project.media?.visualDrafts, project.media?.screenshots].filter(Boolean)) {
    for (const item of group) {
      if (!item.caption?.trim()) {
        errors.push(`${project.id}: image evidence ${item.title} needs caption`);
      }
      assertImage(project, `image ${item.title}`, item.image);
    }
  }

  for (const video of project.media?.videos ?? []) {
    if (video.youtubeId) {
      if (!/^[\w-]{11}$/.test(video.youtubeId)) {
        errors.push(`${project.id}: video ${video.title} has invalid YouTube id`);
      }
    } else {
      assertAsset(project, `video ${video.title}`, video.src);
    }
    assertImage(project, `video poster ${video.title}`, video.poster);
    if (!video.caption?.trim() || !video.transcript?.trim()) {
      warnings.push(`${project.id}: video ${video.title} should include caption and transcript summary`);
    }
    if (project.id === "generative-interface-study" && !hasTextFields(video, ["technicalSummary", "accessibilitySummary"])) {
      errors.push(`${project.id}: featured Hamlet video needs visible technical and subtitle/narration summaries`);
    }
    if (video.captionsSrc) assertAsset(project, `video captions ${video.title}`, video.captionsSrc);
    if (video.tracks?.length) {
      const defaultTracks = video.tracks.filter((track) => track.default);
      if (defaultTracks.length > 1) {
        errors.push(`${project.id}: video ${video.title} must not have more than one default track`);
      }
      for (const track of video.tracks) {
        if (!hasTextFields(track, ["src", "srcLang", "label"]) || !validTrackKinds.has(track.kind ?? "subtitles")) {
          errors.push(`${project.id}: video ${video.title} has incomplete or invalid track metadata`);
        }
        assertAsset(project, `video track ${video.title}`, track.src);
      }
    }
    if (video.transcriptCues?.length) {
      for (const cue of video.transcriptCues) {
        if (!hasTextFields(cue, ["time", "en", "zh"])) {
          errors.push(`${project.id}: video ${video.title} transcript cues need time, en, and zh text`);
        }
        if (project.id === "generative-interface-study" && !hasTextFields(cue, ["visualDescription", "musicMood"])) {
          errors.push(`${project.id}: video ${video.title} transcript cues need visualDescription and musicMood`);
        }
      }
    }
  }

  for (const restricted of project.media?.restricted ?? []) {
    if (restricted.href || restricted.src || restricted.embedUrl) {
      errors.push(`${project.id}: restricted media ${restricted.title} must not include public href/src/embedUrl`);
    }
    if (!restricted.reason?.trim() || !restricted.caption?.trim()) {
      errors.push(`${project.id}: restricted media ${restricted.title} needs caption and reason`);
    }
  }

  for (const audio of project.media?.audio ?? []) {
    if (audio.src) assertAsset(project, `audio ${audio.title}`, audio.src);
    if (!audio.caption?.trim() && !audio.transcript?.trim()) {
      warnings.push(`${project.id}: audio ${audio.title} should include caption or transcript summary`);
    }
  }

  for (const link of project.links ?? []) {
    if (!link.label?.trim() || !link.href?.trim()) {
      errors.push(`${project.id}: project link entries need label and href`);
    }
  }

  if (project.id === "generative-interface-study" && !hasTextFields(project, ["overviewFacts"])) {
    errors.push(`${project.id}: overviewFacts must preserve duration, scenes, subtitle languages, and validation boundary`);
  }

}

const expectedPublicProjects = [...projectCaseStudies]
  .filter((project) => project.submissionVisibility === "public")
  .sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99));
const expectedPublicProjectIds = expectedPublicProjects.map((project) => project.id);
const sortedPublicProjectIds = sortedProjectCaseStudies.map((project) => project.id);

if (JSON.stringify(sortedPublicProjectIds) !== JSON.stringify(expectedPublicProjectIds)) {
  errors.push("sortedProjectCaseStudies must contain only public projects in priority order");
}

if (JSON.stringify(sortedPublicProjectIds) !== JSON.stringify(expectedFeaturedWorkIds)) {
  errors.push(`featured-work index order must be ${expectedFeaturedWorkIds.join(", ")}`);
}

const expectedInstituteEvidenceGroups = instituteThemes
  .map((theme, themeIndex) => ({
    id: `institute-evidence-${themeIndex + 1}`,
    theme,
    projects: expectedPublicProjects
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

const publicProjectsById = new Map(expectedPublicProjects.map((project) => [project.id, project]));
const seenEvidenceThemes = new Set();

if (!Array.isArray(instituteEvidenceGroups)) {
  errors.push("instituteEvidenceGroups must be an array derived from public projects");
} else {
  for (const group of instituteEvidenceGroups) {
    if (!validInstituteThemes.has(group.theme)) {
      errors.push(`instituteEvidenceGroups: unknown institute theme ${group.theme}`);
    }
    if (seenEvidenceThemes.has(group.theme)) {
      errors.push(`instituteEvidenceGroups: duplicate theme ${group.theme}`);
    }
    seenEvidenceThemes.add(group.theme);

    if (!group.projects?.length) {
      errors.push(`instituteEvidenceGroups: ${group.theme} has no demonstrated public projects`);
      continue;
    }

    const seenGroupProjectIds = new Set();
    for (const evidenceProject of group.projects) {
      const sourceProject = publicProjectsById.get(evidenceProject.id);
      if (!sourceProject) {
        errors.push(`instituteEvidenceGroups: ${group.theme} references a non-public project`);
        continue;
      }
      if (seenGroupProjectIds.has(evidenceProject.id)) {
        errors.push(`instituteEvidenceGroups: duplicate ${evidenceProject.id} evidence for ${group.theme}`);
      }
      seenGroupProjectIds.add(evidenceProject.id);
      if (sourceProject.themeEvidenceStatus?.[group.theme] !== "demonstrated") {
        errors.push(`instituteEvidenceGroups: ${evidenceProject.id} ${group.theme} is not demonstrated evidence`);
      }
    }
  }

}

if (JSON.stringify(instituteEvidenceGroups) !== JSON.stringify(expectedInstituteEvidenceGroups)) {
  errors.push("instituteEvidenceGroups must exactly derive demonstrated relationships and metadata from public projects");
}

if (warnings.length) {
  console.warn("Portfolio content warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (errors.length) {
  console.error("Portfolio content validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Portfolio content validation passed: ${projectCaseStudies.length} project entries checked.`);
