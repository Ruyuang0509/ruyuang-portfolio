const EXPECTED_VIDEO_SHA256 = "7E50B6EB01E646FB822D6384D73C9C01A08DC9DF8D5D22A3102B777A460D2312";
const EXPECTED_SUNO_SONG_ID = "06373cc4-76b9-45c0-a0c0-586882f55829";
const EXPECTED_SUNO_SHA256 = "8efadea341df3b12c6f8649dabfab941712ffef3b226d7348d832479bb33040e";
const EXPECTED_SUNO_EXCERPT = "00:00–00:40";
const EXPECTED_SUNO_URL = `https://suno.com/song/${EXPECTED_SUNO_SONG_ID}`;
const EXPECTED_APPLICANT = "蕭智仁";
const EXPECTED_ATTESTATION_DATE = "2026-07-26";
const EXPECTED_ATTESTATION_PATH = "docs/evidence/hamlet-applicant-attestation.md";
const EXPECTED_ATTESTATION_VERSION = "1.0";

export const HAMLET_RIGHTS_REQUIRED_CHECKS = {
  "scene-images": [
    "boundedSearchCompleted",
    "applicantDirectedGenerationConfirmed",
    "textPromptGenerationConfirmed",
    "thirdPartyReferenceImagesAbsent",
    "specificFilmOrActorCopyingAbsent",
    "publicPortfolioUseConfirmed",
  ],
  music: [
    "providerAndSongIdentified",
    "planAtGenerationRecorded",
    "officialSupportConfirmationPresent",
    "permittedUseScopeRecorded",
    "attributionPublished",
    "nonMonetizedUseConfirmed",
  ],
  "literary-source": [
    "literaryBasisRecorded",
    "aiAssistedRewriteConfirmed",
    "applicantReviewConfirmed",
    "modernTranslationNotCopied",
    "filmSubtitleNotCopied",
    "publicPortfolioUseConfirmed",
  ],
  "canva-project": [
    "editingOnlyConfirmed",
    "applicantUploadedAssetInventoryRecorded",
    "canvaStockImageAbsent",
    "canvaStockVideoAbsent",
    "canvaStockAudioAbsent",
    "unreviewedTemplateMediaAbsent",
    "publicPortfolioUseConfirmed",
  ],
};

const REQUIRED_RIGHTS_EVIDENCE = [
  "hamlet-scene-generation-records",
  "hamlet-suno-support-confirmation",
  "hamlet-literary-rewrite-attestation",
  "hamlet-canva-editing-only-attestation",
  "hamlet-applicant-attestation-v1",
];

const REQUIRED_ITEM_EVIDENCE_REFS = {
  "scene-images": ["hamlet-scene-generation-records", "hamlet-applicant-attestation-v1"],
  music: ["hamlet-suno-support-confirmation", "hamlet-applicant-attestation-v1"],
  "literary-source": ["hamlet-literary-rewrite-attestation", "hamlet-applicant-attestation-v1"],
  "canva-project": ["hamlet-canva-editing-only-attestation", "hamlet-applicant-attestation-v1"],
};

const REQUIRED_EVIDENCE_KINDS = {
  "hamlet-scene-generation-records": "applicantEvidenceSummary",
  "hamlet-suno-support-confirmation": "officialSupportConfirmation",
  "hamlet-literary-rewrite-attestation": "applicantAttestationComponent",
  "hamlet-canva-editing-only-attestation": "applicantAttestationComponent",
  "hamlet-applicant-attestation-v1": "applicantAttestation",
};

const APPLICANT_CONFIRMED_EVIDENCE = [
  "hamlet-scene-generation-records",
  "hamlet-literary-rewrite-attestation",
  "hamlet-canva-editing-only-attestation",
];

const REQUIRED_TOP_LEVEL_CONDITIONS = {
  nonCommercialOnly: true,
  commercialUsePermitted: false,
  attributionRequired: true,
  adsPermitted: false,
  paywallPermitted: false,
  affiliateRevenuePermitted: false,
};

const REQUIRED_MUSIC_CONDITIONS = {
  nonCommercialOnly: true,
  commercialUsePermitted: false,
  ownershipClaimedByApplicant: false,
  ownershipRetainedByProvider: true,
  attributionRequired: true,
  adsPermitted: false,
  paywallPermitted: false,
  affiliateRevenuePermitted: false,
  commercialAdvertisingPermitted: false,
  musicReleasePermitted: false,
  excerpt: EXPECTED_SUNO_EXCERPT,
  authorizationReceivedAt: "2026-07-25",
};

const normalizePath = (value) => String(value ?? "").replaceAll("\\", "/").toLowerCase();

const isPrivateEvidencePath = (value) => {
  const normalized = normalizePath(value);
  return normalized.endsWith(".eml")
    || normalized.includes("/.private-evidence/")
    || normalized.startsWith(".private-evidence/")
    || normalized.includes("/rights-evidence-private/")
    || normalized.startsWith("rights-evidence-private/")
    || normalized.includes("/docs/evidence/private/")
    || normalized.startsWith("docs/evidence/private/")
    || /(?:authorization|support-reply)-original\.[^/]+$/u.test(normalized);
};

const checkExactConditions = (errors, label, actual, expected) => {
  for (const [key, expectedValue] of Object.entries(expected)) {
    if (actual?.[key] !== expectedValue) {
      errors.push(`${label}.${key} must be ${JSON.stringify(expectedValue)}`);
    }
  }
};

const collectEvidenceIds = (manifest, errors) => {
  const evidenceIds = new Set();
  for (const evidence of manifest.rightsEvidence ?? []) {
    if (!evidence?.id) {
      errors.push("rightsEvidence entry is missing an id");
      continue;
    }
    if (evidenceIds.has(evidence.id)) {
      errors.push(`duplicate rightsEvidence id: ${evidence.id}`);
      continue;
    }
    evidenceIds.add(evidence.id);
    const expectedKind = REQUIRED_EVIDENCE_KINDS[evidence.id];
    if (expectedKind && evidence.kind !== expectedKind) {
      errors.push(`${evidence.id}.kind must be ${expectedKind}`);
    }
  }
  for (const expectedId of REQUIRED_RIGHTS_EVIDENCE) {
    if (!evidenceIds.has(expectedId)) errors.push(`missing rightsEvidence id: ${expectedId}`);
  }
  return evidenceIds;
};

const validatePublicDisclosure = ({
  errors,
  publicSource,
  publicDisclosure,
  rendererSource,
  attestation,
}) => {
  const requiredNarrativeFragments = [
    "原始配樂方向",
    "instrumental / no lyrics",
    "實際",
    "英語歌詞與人聲",
  ];
  for (const fragment of requiredNarrativeFragments) {
    if (!publicSource.includes(fragment)) {
      errors.push(`public Hamlet source is missing required disclosure: ${fragment}`);
    }
  }

  const musicCredit = publicDisclosure?.musicCredit ?? {};
  const exactMusicCredit = {
    attribution: "Music generated by Suno (suno.com)",
    song: "Song: “Blinds-Soft Lament”",
    href: EXPECTED_SUNO_URL,
  };
  for (const [field, expectedValue] of Object.entries(exactMusicCredit)) {
    if (musicCredit[field] !== expectedValue) {
      errors.push(`public Hamlet disclosure musicCredit.${field} must be ${JSON.stringify(expectedValue)}`);
    }
  }
  for (const fragment of ["00:00–00:40", "音樂、歌詞與人聲均由 Suno 生成"]) {
    if (!musicCredit.excerpt?.includes(fragment)) {
      errors.push(`public Hamlet disclosure musicCredit.excerpt is missing: ${fragment}`);
    }
  }
  for (const fragment of ["無廣告", "無付費牆", "無聯盟收益", "非營利研究所申請作品集", "商業廣告", "音樂發行"]) {
    if (!musicCredit.scope?.includes(fragment)) {
      errors.push(`public Hamlet disclosure musicCredit.scope is missing: ${fragment}`);
    }
  }

  const sourceRows = new Map((publicDisclosure?.sources ?? []).map((source) => [source?.label, source?.value ?? ""]));
  const requiredSourceRows = {
    場景圖像: ["ChatGPT／OpenAI 生成"],
    文學基礎: ["Literary basis: William Shakespeare, Hamlet"],
    故事改寫與字幕核對: ["Story adaptation and subtitle review: 蕭智仁 with ChatGPT assistance"],
    "音樂、歌詞與人聲": ["Suno"],
    剪輯與輸出: ["Canva"],
    公開範圍: ["非營利研究所作品集"],
  };
  for (const [label, fragments] of Object.entries(requiredSourceRows)) {
    const value = sourceRows.get(label);
    if (!value) {
      errors.push(`public Hamlet disclosure is missing source row: ${label}`);
      continue;
    }
    for (const fragment of fragments) {
      if (!value.includes(fragment)) {
        errors.push(`public Hamlet disclosure source row ${label} is missing: ${fragment}`);
      }
    }
  }

  const expectedAttestationStatus = attestation.confirmed === true ? "confirmed" : "pendingApplicantConfirmation";
  if (publicDisclosure?.attestation?.statusKey !== expectedAttestationStatus) {
    errors.push(`public Hamlet disclosure attestation statusKey must be ${expectedAttestationStatus}`);
  }
  if (attestation.confirmed === true) {
    for (const fragment of [attestation.confirmedBy, attestation.confirmedAt]) {
      if (!fragment || !publicDisclosure?.attestation?.value?.includes(fragment)) {
        errors.push(`public Hamlet disclosure confirmed attestation is missing: ${fragment || "confirmed identity/date"}`);
      }
    }
  } else {
    for (const fragment of ["待本人確認", "confirmed = false"]) {
      if (!publicDisclosure?.attestation?.value?.includes(fragment)) {
        errors.push(`public Hamlet disclosure pending attestation is missing: ${fragment}`);
      }
    }
  }

  const rendererChecks = [
    ["component", /function FeaturedMediaDisclosure\s*\(\{\s*disclosure\s*\}\)/u],
    ["featured-media wiring", /<FeaturedMediaDisclosure\s+disclosure=\{project\.featuredMediaDisclosure\}\s*\/>/u],
    ["visible evidence panel", /<aside[^>]+className="[^"]*evidence-panel/u],
    ["attribution field", /\{disclosure\.musicCredit\.attribution\}/u],
    ["canonical link field", /href=\{disclosure\.musicCredit\.href\}/u],
    ["song field", /\{disclosure\.musicCredit\.song\}/u],
    ["source rows", /disclosure\.sources\.map/u],
    ["attestation field", /\{disclosure\.attestation\.value\}/u],
  ];
  for (const [label, pattern] of rendererChecks) {
    if (!pattern.test(rendererSource)) {
      errors.push(`public Hamlet disclosure renderer is missing ${label}`);
    }
  }

  const prohibitedClaims = [
    /本人作曲/u,
    /本人作詞/u,
    /本人演唱/u,
    /我(?:負責)?作曲/u,
    /我(?:負責)?作詞/u,
    /我(?:負責)?演唱/u,
    /申請者擁有歌曲完整著作權/u,
    /商業授權歌曲/u,
  ];
  for (const pattern of prohibitedClaims) {
    if (pattern.test(publicSource)) errors.push(`public Hamlet source contains prohibited authorship or ownership claim: ${pattern}`);
  }

  const falseActualOutputClaims = [
    "Suno 製作無歌詞配樂",
    "Suno 生成無歌詞配樂",
    "Suno 製作的無歌詞配樂",
    "服務神祕、悲傷與高潮轉折的無歌詞配樂",
    "八幕場景圖、40 秒節奏規格與無歌詞配樂",
    "無歌詞配樂用較慢的變化",
    "無歌詞配樂／無旁白",
    "全片持續播放無歌詞音樂",
    "本片使用無歌詞配樂",
    "成片使用無歌詞配樂",
  ];
  for (const claim of falseActualOutputClaims) {
    if (publicSource.includes(claim)) {
      errors.push(`public Hamlet source misstates the actual Suno output as lyric-free: ${claim}`);
    }
  }
};

const validateAttestationDocument = ({
  errors,
  attestationDocument,
  attestationEvidence,
}) => {
  if (attestationEvidence?.publicDocumentPath !== EXPECTED_ATTESTATION_PATH) {
    errors.push(`publication gate blocked: applicant attestation publicDocumentPath must be ${EXPECTED_ATTESTATION_PATH}`);
  }

  if (typeof attestationDocument !== "string" || !attestationDocument.trim()) {
    errors.push("publication gate blocked: applicant attestation document is missing or unreadable");
    return;
  }

  const normalizedDocument = attestationDocument.replace(/\r\n?/gu, "\n");
  const requiredMetadata = [
    "狀態：`confirmed`",
    `申請者：${EXPECTED_APPLICANT}`,
    `確認日期：${EXPECTED_ATTESTATION_DATE}`,
    `影片 SHA-256：\`${EXPECTED_VIDEO_SHA256}\``,
    `Attestation version：\`${EXPECTED_ATTESTATION_VERSION}\``,
  ];
  const requiredDeclarations = [
    "生成過程完全使用文字提示，且未上傳第三方參考圖片。",
    "生成過程未要求重製特定電影版本、特定演員外貌或其他創作者的具體受保護畫面。",
    "由 GPT 依 William Shakespeare《Hamlet》的原始劇情重新摘要與改寫，再由我選擇、修訂與核對。",
    "未直接複製現代出版譯本、電影字幕、舞台字幕或網路摘要。",
    "Canva 僅用於時間編排、剪輯、字幕、轉場、音量調整與 MP4 匯出。",
    "成片沒有使用 Canva stock image、stock video、stock audio，或未列入本權利清單的 template media。",
    "本網站與本影片沒有廣告、付費牆、與影片相關的聯盟收益，也不作音樂發行或商業廣告使用。",
  ];
  for (const fragment of requiredMetadata) {
    if (!normalizedDocument.includes(fragment)) {
      errors.push(`publication gate blocked: applicant attestation document is missing required metadata: ${fragment}`);
    }
  }
  for (const fragment of requiredDeclarations) {
    if (!normalizedDocument.includes(fragment)) {
      errors.push(`publication gate blocked: applicant attestation document is missing required declaration: ${fragment}`);
    }
  }

  const prohibitedMarkers = [
    "[待本人確認]",
    "pendingApplicantConfirmation",
    "1.0-draft",
    "申請者：________________",
    "確認日期：________________",
  ];
  for (const marker of prohibitedMarkers) {
    if (normalizedDocument.includes(marker)) {
      errors.push(`publication gate blocked: applicant attestation document contains pending marker: ${marker}`);
    }
  }
};

export function validateHamletRights({
  manifest,
  publicSource = "",
  publicDisclosure,
  rendererSource = "",
  attestationDocument = "",
  trackedFiles = [],
  buildInventory = [],
  publicationMode = false,
} = {}) {
  const errors = [];

  if (!manifest || typeof manifest !== "object") return ["Hamlet rights manifest is missing"];
  if (manifest.schemaVersion !== 2) errors.push("Hamlet rights schemaVersion must be 2");
  if (manifest.projectId !== "generative-interface-study") errors.push("Hamlet rights projectId is invalid");
  if (manifest.sourcePackage?.rightsManifestPresent !== true) {
    errors.push("sourcePackage.rightsManifestPresent must be true after the rights registry is created");
  }

  const evidenceIds = collectEvidenceIds(manifest, errors);
  const evidenceById = new Map((manifest.rightsEvidence ?? []).map((evidence) => [evidence?.id, evidence]));
  const rightsReview = manifest.rightsReview ?? {};
  const items = new Map((rightsReview.items ?? []).map((item) => [item?.id, item]));

  for (const [itemId, requiredChecks] of Object.entries(HAMLET_RIGHTS_REQUIRED_CHECKS)) {
    const item = items.get(itemId);
    if (!item) {
      errors.push(`missing rights item: ${itemId}`);
      continue;
    }
    if (!item.status?.trim()) errors.push(`${itemId}.status is missing`);
    if (!item.conditions || typeof item.conditions !== "object" || Array.isArray(item.conditions)) {
      errors.push(`${itemId}.conditions must be an object`);
    }
    if (!Array.isArray(item.limitations) || item.limitations.length === 0) {
      errors.push(`${itemId}.limitations must contain at least one limitation`);
    }
    if (!item.requiredChecks || typeof item.requiredChecks !== "object" || Array.isArray(item.requiredChecks)) {
      errors.push(`${itemId}.requiredChecks must be an object`);
    } else {
      for (const check of requiredChecks) {
        if (typeof item.requiredChecks[check] !== "boolean") {
          errors.push(`${itemId}.requiredChecks.${check} must be an explicit boolean`);
        }
      }
    }
    if (!Array.isArray(item.evidenceRefs) || item.evidenceRefs.length === 0) {
      errors.push(`${itemId}.evidenceRefs must not be empty`);
    } else {
      for (const reference of item.evidenceRefs) {
        if (!reference?.trim()) {
          errors.push(`${itemId}.evidenceRefs contains an empty reference`);
        } else if (!evidenceIds.has(reference)) {
          errors.push(`${itemId}.evidenceRefs contains unknown reference: ${reference}`);
        }
      }
      for (const requiredReference of REQUIRED_ITEM_EVIDENCE_REFS[itemId]) {
        if (!item.evidenceRefs.includes(requiredReference)) {
          errors.push(`${itemId}.evidenceRefs is missing required reference: ${requiredReference}`);
        }
      }
    }
  }

  checkExactConditions(errors, "rightsReview.conditions", rightsReview.conditions, REQUIRED_TOP_LEVEL_CONDITIONS);
  checkExactConditions(errors, "music.conditions", items.get("music")?.conditions, REQUIRED_MUSIC_CONDITIONS);

  const sceneEvidence = evidenceById.get("hamlet-scene-generation-records");
  const sceneItem = items.get("scene-images");
  if (sceneEvidence?.localVerificationStatus !== "recordsNotLocated") {
    errors.push("scene generation evidence localVerificationStatus must remain recordsNotLocated until records are reviewed");
  }
  if (sceneEvidence?.generationRecordCountReviewed !== 0) {
    errors.push("scene generation evidence generationRecordCountReviewed must match the bounded review count of 0");
  }
  if (Object.hasOwn(sceneItem?.requiredChecks ?? {}, "generationRecordsReviewed")) {
    errors.push("scene-images.requiredChecks.generationRecordsReviewed is misleading when zero records were located; use boundedSearchCompleted");
  }

  const supportEvidence = evidenceById.get("hamlet-suno-support-confirmation");
  if (supportEvidence?.status !== "suppliedConfirmationRecorded") {
    errors.push("Suno support evidence status must be suppliedConfirmationRecorded");
  }
  if (supportEvidence?.provider !== "Suno") errors.push("Suno support provider must be Suno");
  if (supportEvidence?.songId !== EXPECTED_SUNO_SONG_ID) errors.push("Suno Song ID does not match the authorized song");
  if (supportEvidence?.sha256 !== EXPECTED_SUNO_SHA256) errors.push("Suno authorization SHA-256 does not match the supplied digest");
  if (supportEvidence?.excerpt !== EXPECTED_SUNO_EXCERPT) errors.push("Suno excerpt must be 00:00–00:40");
  if (supportEvidence?.canonicalUrl !== EXPECTED_SUNO_URL) errors.push("Suno canonical URL does not match the authorized song");

  const cleanVideo = (manifest.directCopies ?? []).find((entry) => entry.id === "hamlet-clean-video");
  if (cleanVideo?.sha256 !== EXPECTED_VIDEO_SHA256) errors.push("Hamlet clean-video SHA-256 differs from the approved manifest value");

  const attestation = rightsReview.applicantAttestation ?? {};
  if (!attestation.evidenceRef?.trim()) {
    errors.push("applicant attestation evidenceRef is missing");
  } else if (!evidenceIds.has(attestation.evidenceRef)) {
    errors.push(`applicant attestation evidenceRef is unknown: ${attestation.evidenceRef}`);
  }
  if (attestation.videoSha256 !== cleanVideo?.sha256 || attestation.videoSha256 !== EXPECTED_VIDEO_SHA256) {
    errors.push("applicant attestation video SHA-256 must match hamlet-clean-video");
  }
  const attestationEvidence = evidenceById.get(attestation.evidenceRef);
  if (attestationEvidence?.videoSha256 !== cleanVideo?.sha256) {
    errors.push("applicant attestation registry video SHA-256 must match hamlet-clean-video");
  }

  validatePublicDisclosure({
    errors,
    publicSource,
    publicDisclosure,
    rendererSource,
    attestation,
  });

  for (const trackedFile of trackedFiles) {
    if (isPrivateEvidencePath(trackedFile)) errors.push(`private evidence is tracked by Git: ${trackedFile}`);
  }
  for (const buildFile of buildInventory) {
    if (isPrivateEvidencePath(buildFile)) errors.push(`private evidence is present in the build inventory: ${buildFile}`);
  }

  if (publicationMode) {
    validateAttestationDocument({
      errors,
      attestationDocument,
      attestationEvidence,
    });
    if (rightsReview.status !== "verified") {
      errors.push(`publication gate blocked: rightsReview is ${rightsReview.status ?? "missing"}`);
    }
    if (rightsReview.publicationGate !== "approved") {
      errors.push(`publication gate blocked: publicationGate is ${rightsReview.publicationGate ?? "missing"}`);
    }
    if (
      attestation.confirmed !== true
      || attestation.confirmedBy !== EXPECTED_APPLICANT
      || attestation.confirmedAt !== EXPECTED_ATTESTATION_DATE
    ) {
      errors.push("publication gate blocked: applicant attestation is incomplete");
    }
    if (attestationEvidence?.status !== "confirmed") {
      errors.push(`publication gate blocked: applicant attestation registry is ${attestationEvidence?.status ?? "missing"}`);
    } else if (
      attestationEvidence.confirmedBy !== attestation.confirmedBy
      || attestationEvidence.confirmedAt !== attestation.confirmedAt
    ) {
      errors.push("publication gate blocked: applicant attestation registry identity/date does not match the signed attestation");
    }
    for (const evidenceId of APPLICANT_CONFIRMED_EVIDENCE) {
      const evidence = evidenceById.get(evidenceId);
      if (evidence?.status !== "confirmedByApplicant") {
        errors.push(`publication gate blocked: ${evidenceId} is ${evidence?.status ?? "missing"}`);
      } else if (
        evidence.confirmedBy !== attestation.confirmedBy
        || evidence.confirmedAt !== attestation.confirmedAt
      ) {
        errors.push(`publication gate blocked: ${evidenceId} identity/date does not match the signed attestation`);
      }
    }
    for (const [itemId, requiredChecks] of Object.entries(HAMLET_RIGHTS_REQUIRED_CHECKS)) {
      const item = items.get(itemId);
      if (!item) continue;
      if (item.status !== "verified") {
        errors.push(`publication gate blocked: ${itemId} status is ${item.status ?? "missing"}`);
      }
      for (const check of requiredChecks) {
        if (item.requiredChecks?.[check] !== true) {
          errors.push(`publication gate blocked: ${itemId}.${check} is not confirmed`);
        }
      }
    }
  }

  return errors;
}

export const HAMLET_RIGHTS_EXPECTED_VALUES = Object.freeze({
  videoSha256: EXPECTED_VIDEO_SHA256,
  sunoSongId: EXPECTED_SUNO_SONG_ID,
  sunoSha256: EXPECTED_SUNO_SHA256,
  sunoExcerpt: EXPECTED_SUNO_EXCERPT,
  sunoUrl: EXPECTED_SUNO_URL,
  applicant: EXPECTED_APPLICANT,
  attestationDate: EXPECTED_ATTESTATION_DATE,
  attestationPath: EXPECTED_ATTESTATION_PATH,
  attestationVersion: EXPECTED_ATTESTATION_VERSION,
});
