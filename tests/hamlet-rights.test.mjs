import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  HAMLET_RIGHTS_REQUIRED_CHECKS,
  validateHamletRights,
} from "../scripts/validate-hamlet-rights.mjs";
import { projectCaseStudies } from "../src/data/portfolio.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceManifest = JSON.parse(readFileSync(path.join(root, "docs", "evidence", "hamlet-media-manifest.json"), "utf8"));
const hamletProject = projectCaseStudies.find((project) => project.id === "generative-interface-study");
const rendererSource = readFileSync(path.join(root, "src", "components", "CaseStudyShowcase.jsx"), "utf8");
const publicSource = [
  JSON.stringify(hamletProject),
  rendererSource,
].join("\n");
const clone = (value) => structuredClone(value);

const makeValidManifest = () => {
  const manifest = clone(sourceManifest);
  manifest.rightsReview.status = "verified";
  manifest.rightsReview.publicationGate = "approved";
  manifest.rightsReview.applicantAttestation = {
    ...manifest.rightsReview.applicantAttestation,
    confirmed: true,
    confirmedBy: "蕭智仁",
    confirmedAt: "2026-07-26",
  };
  const attestationEvidence = manifest.rightsEvidence.find((entry) => entry.id === "hamlet-applicant-attestation-v1");
  attestationEvidence.status = "confirmed";
  attestationEvidence.confirmedBy = "蕭智仁";
  attestationEvidence.confirmedAt = "2026-07-26";
  for (const evidenceId of [
    "hamlet-scene-generation-records",
    "hamlet-literary-rewrite-attestation",
    "hamlet-canva-editing-only-attestation",
  ]) {
    const evidence = manifest.rightsEvidence.find((entry) => entry.id === evidenceId);
    evidence.status = "confirmedByApplicant";
    evidence.confirmedBy = "蕭智仁";
    evidence.confirmedAt = "2026-07-26";
  }
  for (const item of manifest.rightsReview.items) {
    item.status = "verified";
    for (const check of HAMLET_RIGHTS_REQUIRED_CHECKS[item.id]) item.requiredChecks[check] = true;
  }
  return manifest;
};

const disclosureForManifest = (manifest) => {
  const disclosure = clone(hamletProject.featuredMediaDisclosure);
  const attestation = manifest.rightsReview.applicantAttestation;
  if (attestation.confirmed === true) {
    disclosure.attestation = {
      label: "Applicant attestation",
      value: `已由 ${attestation.confirmedBy} 於 ${attestation.confirmedAt} 確認`,
      statusKey: "confirmed",
    };
  }
  return disclosure;
};

const validateFixture = (manifest, overrides = {}) => validateHamletRights({
  manifest,
  publicSource,
  publicDisclosure: disclosureForManifest(manifest),
  rendererSource,
  trackedFiles: [],
  buildInventory: [],
  publicationMode: true,
  ...overrides,
});

test("complete explicit Hamlet rights manifest passes", () => {
  assert.deepEqual(validateFixture(makeValidManifest()), []);
});

test("applicant attestation false blocks publication", () => {
  const manifest = makeValidManifest();
  manifest.rightsReview.applicantAttestation.confirmed = false;
  assert.ok(validateFixture(manifest).some((error) => error.includes("applicant attestation is incomplete")));
});

test("unknown evidence reference fails closed", () => {
  const manifest = makeValidManifest();
  manifest.rightsReview.items[0].evidenceRefs = ["unknown-rights-evidence"];
  assert.ok(validateFixture(manifest).some((error) => error.includes("unknown reference")));
});

test("wrong Suno authorization hash fails", () => {
  const manifest = makeValidManifest();
  manifest.rightsEvidence.find((entry) => entry.id === "hamlet-suno-support-confirmation").sha256 = "0".repeat(64);
  assert.ok(validateFixture(manifest).some((error) => error.includes("Suno authorization SHA-256")));
});

test("commercialUsePermitted true fails even though it is a boolean", () => {
  const manifest = makeValidManifest();
  manifest.rightsReview.conditions.commercialUsePermitted = true;
  manifest.rightsReview.items.find((item) => item.id === "music").conditions.commercialUsePermitted = true;
  const errors = validateFixture(manifest);
  assert.ok(errors.some((error) => error.includes("rightsReview.conditions.commercialUsePermitted must be false")));
  assert.ok(errors.some((error) => error.includes("music.conditions.commercialUsePermitted must be false")));
});

test("missing public Suno attribution fails", () => {
  const manifest = makeValidManifest();
  const publicDisclosure = disclosureForManifest(manifest);
  publicDisclosure.musicCredit.attribution = "Suno";
  assert.ok(validateFixture(manifest, { publicDisclosure })
    .some((error) => error.includes("musicCredit.attribution")));
});

test("missing scene generation check fails", () => {
  const manifest = makeValidManifest();
  delete manifest.rightsReview.items
    .find((item) => item.id === "scene-images")
    .requiredChecks.generationRecordsReviewed;
  assert.ok(validateFixture(manifest)
    .some((error) => error.includes("scene-images.requiredChecks.generationRecordsReviewed")));
});

test("unconfirmed Canva stock review blocks publication", () => {
  const manifest = makeValidManifest();
  manifest.rightsReview.items
    .find((item) => item.id === "canva-project")
    .requiredChecks.canvaStockImageAbsent = false;
  assert.ok(validateFixture(manifest)
    .some((error) => error.includes("canva-project.canvaStockImageAbsent is not confirmed")));
});

test("unconfirmed modern literary source review blocks publication", () => {
  const manifest = makeValidManifest();
  manifest.rightsReview.items
    .find((item) => item.id === "literary-source")
    .requiredChecks.modernTranslationNotCopied = false;
  assert.ok(validateFixture(manifest)
    .some((error) => error.includes("literary-source.modernTranslationNotCopied is not confirmed")));
});

test("tracked or built EML and private evidence paths fail", () => {
  const errors = validateFixture(makeValidManifest(), {
    trackedFiles: ["docs/evidence/private/suno-support.eml"],
    buildInventory: ["rights-evidence-private/support-reply-original.eml"],
  });
  assert.ok(errors.some((error) => error.includes("tracked by Git")));
  assert.ok(errors.some((error) => error.includes("build inventory")));
});

test("applicant identity must be the named applicant", () => {
  const manifest = makeValidManifest();
  manifest.rightsReview.applicantAttestation.confirmedBy = "Applicant fixture";
  assert.ok(validateFixture(manifest)
    .some((error) => error.includes("applicant attestation is incomplete")));
});

test("pending evidence lifecycle cannot pass by flipping item statuses", () => {
  const manifest = makeValidManifest();
  const evidence = manifest.rightsEvidence.find((entry) => entry.id === "hamlet-literary-rewrite-attestation");
  evidence.status = "pendingApplicantConfirmation";
  evidence.confirmedBy = null;
  evidence.confirmedAt = null;
  assert.ok(validateFixture(manifest)
    .some((error) => error.includes("hamlet-literary-rewrite-attestation is pendingApplicantConfirmation")));
});

test("disclosure strings without featured-media renderer wiring fail", () => {
  const disconnectedRenderer = rendererSource.replace(
    "<FeaturedMediaDisclosure disclosure={project.featuredMediaDisclosure} />",
    "{null}",
  );
  assert.ok(validateFixture(makeValidManifest(), { rendererSource: disconnectedRenderer })
    .some((error) => error.includes("featured-media wiring")));
});
