import { existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import {
  projectCaseStudies,
  researchTracks,
  instituteThemes,
} from "../src/data/portfolio.js";
import { getProjectCompleteness } from "../src/data/portfolio.governance.js";
import { getProjectInternalNotes } from "../src/data/portfolio.internal.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];
const seenIds = new Set();
const validTrackIds = new Set(researchTracks.map((track) => track.id));
const validInstituteThemes = new Set(instituteThemes);
const validDiagramTypes = new Set(["interactionFlow", "systemArchitecture", "informationArchitecture"]);
const validTestingStatuses = new Set(["notValidated", "exploratory", "validated"]);
const validMetadataOmissions = new Set(["year"]);

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

const publicConstructionPattern = /待補|可替換|範例|正式送審前|placeholder|sample|Content Readiness|Internal Build Notes|INTERNAL_|PRE_SUBMISSION_CHECK|HIDE_FROM_SUBMISSION|這裡保留|未來可放入|審查者|評審可以/i;
const sensitivePublicPattern = /\.pbix|\.xlsx|\.xls|\.csv|C:\\|\/Users\/|youtu\.be\//i;
const mojibakePattern = /[�]|[-]|(?:敺|蝛|雿|銝|嚗|霅|瘚|鞈|憭|摨|餌|蝟|暸|踴|甇|鋆|瞍|蝝|靘|撟|銵|閬|蔣|慦|隞|賊|乓|繚|憟|唳|孵)/u;
// Codex-Fix: Fail fast on common mojibake sequences so corrupted Traditional Chinese copy cannot quietly ship again.

for (const project of projectCaseStudies) {
  if (seenIds.has(project.id)) {
    errors.push(`Duplicate project id: ${project.id}`);
  }
  seenIds.add(project.id);

  const searchableText = JSON.stringify(project);
  if (mojibakePattern.test(searchableText)) {
    errors.push(`${project.id}: possible mojibake/corrupted text detected`);
  }

  if (publicConstructionPattern.test(searchableText)) {
    errors.push(`${project.id}: public content contains construction-stage wording`);
  }

  if (sensitivePublicPattern.test(searchableText)) {
    errors.push(`${project.id}: public content contains sensitive local/export/media reference`);
  }
  // Codex-Fix: Block private data-file and local-path references from the public portfolio data model.

  const completeness = getProjectCompleteness(project);
  if (!completeness.requiredComplete) {
    errors.push(`${project.id}: missing required groups ${completeness.requiredMissing.join(", ")}`);
  }

  if (!completeness.recommendedComplete) {
    warnings.push(`${project.id}: recommended groups still incomplete: ${completeness.recommendedMissing.join(", ")}`);
  }

  if (!getProjectInternalNotes(project.id)) {
    warnings.push(`${project.id}: no draft-only internal notes found`);
  }

  if (typeof project.priority !== "number") {
    errors.push(`${project.id}: missing numeric priority for editorial ordering`);
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

  if (!project.instituteConnections?.length) {
    errors.push(`${project.id}: missing institute connection themes`);
  } else {
    for (const theme of project.instituteConnections) {
      if (!validInstituteThemes.has(theme)) {
        errors.push(`${project.id}: unknown institute theme ${theme}`);
      }
      if (!project.themeRationales?.[theme]) {
        errors.push(`${project.id}: missing theme rationale for ${theme}`);
      }
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
  }

  assertImage(project, "cover", project.cover);

  for (const diagram of project.diagrams ?? []) {
    if (!validDiagramTypes.has(diagram.type)) {
      errors.push(`${project.id}: unknown diagram type ${diagram.type}`);
    }
    if (!diagram.caption?.trim() || !diagram.description?.trim()) {
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
    if (video.captionsSrc) assertAsset(project, `video captions ${video.title}`, video.captionsSrc);
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
