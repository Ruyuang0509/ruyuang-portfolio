import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import {
  instituteEvidenceGroups,
  projectCaseStudies,
  researchTracks,
  instituteThemes,
  sortedProjectCaseStudies,
} from "../src/data/portfolio.js";
import { getProjectCompleteness } from "../src/data/portfolio.governance.js";
import { getProjectInternalNotes } from "../src/data/portfolio.internal.js";

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
const evidenceManifestPath = path.join(root, "docs", "evidence", "hamlet-media-manifest.json");
let evidenceManifest = { directCopies: [], derivativeGroups: [], processEvidence: [] };
try {
  evidenceManifest = JSON.parse(readFileSync(evidenceManifestPath, "utf8"));
} catch (error) {
  errors.push(`Unable to read Hamlet evidence manifest: ${error.message}`);
}
const validEvidenceRefs = new Set([
  ...evidenceManifest.directCopies,
  ...evidenceManifest.derivativeGroups,
  ...evidenceManifest.processEvidence,
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

const hasTextFields = (entry, fields) => fields.every((field) => entry?.[field]?.trim());

const publicConstructionPattern = /待補|可替換|範例|正式送審前|佔位|尚未提供|placeholder|sample|Content Readiness|Internal Build Notes|INTERNAL_|PRE_SUBMISSION_CHECK|HIDE_FROM_SUBMISSION|這裡保留|未來可放入|審查者|評審可以/i;
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

  if (!validSubmissionVisibilities.has(project.submissionVisibility)) {
    errors.push(`${project.id}: missing or invalid submissionVisibility`);
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

  if (project.evidenceBoundary) {
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
      if (!hasTextFields(stage, ["title", "description", "tool", "constraint"])) {
        errors.push(`${project.id}: workflow stage ${index + 1} needs title, description, tool, and constraint`);
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
      if (!hasTextFields(frame, ["title", "time", "subtitle", "description"])) {
        errors.push(`${project.id}: storyboard frame ${index + 1} needs title, time, subtitle, and description`);
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
}

const expectedPublicProjects = [...projectCaseStudies]
  .filter((project) => project.submissionVisibility === "public")
  .sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99));
const expectedPublicProjectIds = expectedPublicProjects.map((project) => project.id);
const sortedPublicProjectIds = sortedProjectCaseStudies.map((project) => project.id);

if (JSON.stringify(sortedPublicProjectIds) !== JSON.stringify(expectedPublicProjectIds)) {
  errors.push("sortedProjectCaseStudies must contain only public projects in priority order");
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
