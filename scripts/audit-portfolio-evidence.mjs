import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { projectCaseStudies } from "../src/data/portfolio.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(root, "docs", "evidence", "hamlet-media-manifest.json");
const publicMediaRoot = path.join(root, "public", "media", "portfolio");
const publicationMode = process.argv.includes("--publication");
const errors = [];

const fail = (message) => errors.push(message);
const normalizeText = (value) => value.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
const normalizeLanguageText = (value, language) =>
  language.startsWith("zh") ? normalizeText(value).replace(/\s+/g, "") : normalizeText(value);
const sha256 = (filePath) => createHash("sha256").update(readFileSync(filePath)).digest("hex").toUpperCase();
const sha256Text = (value) => createHash("sha256").update(value, "utf8").digest("hex").toUpperCase();

const readWebpDimensions = (buffer) => {
  if (buffer.toString("ascii", 0, 4) !== "RIFF" || buffer.toString("ascii", 8, 12) !== "WEBP") return null;

  let offset = 12;
  while (offset + 8 <= buffer.length) {
    const type = buffer.toString("ascii", offset, offset + 4);
    const size = buffer.readUInt32LE(offset + 4);
    const dataOffset = offset + 8;
    if (dataOffset + size > buffer.length) return null;

    if (type === "VP8X" && size >= 10) {
      return {
        width: buffer.readUIntLE(dataOffset + 4, 3) + 1,
        height: buffer.readUIntLE(dataOffset + 7, 3) + 1,
      };
    }
    if (type === "VP8 " && size >= 10 && buffer.subarray(dataOffset + 3, dataOffset + 6).equals(Buffer.from([0x9d, 0x01, 0x2a]))) {
      return {
        width: buffer.readUInt16LE(dataOffset + 6) & 0x3fff,
        height: buffer.readUInt16LE(dataOffset + 8) & 0x3fff,
      };
    }
    if (type === "VP8L" && size >= 5 && buffer[dataOffset] === 0x2f) {
      const bits = buffer.readUInt32LE(dataOffset + 1);
      return {
        width: (bits & 0x3fff) + 1,
        height: ((bits >>> 14) & 0x3fff) + 1,
      };
    }

    offset = dataOffset + size + (size % 2);
  }
  return null;
};

const readAvifDimensions = (buffer) => {
  let typeOffset = buffer.indexOf("ispe", 0, "ascii");
  while (typeOffset >= 0) {
    if (typeOffset >= 4 && typeOffset + 16 <= buffer.length) {
      const boxSize = buffer.readUInt32BE(typeOffset - 4);
      const width = buffer.readUInt32BE(typeOffset + 8);
      const height = buffer.readUInt32BE(typeOffset + 12);
      if (boxSize >= 20 && width > 0 && height > 0) return { width, height };
    }
    typeOffset = buffer.indexOf("ispe", typeOffset + 4, "ascii");
  }
  return null;
};

const readImageDimensions = (filePath) => {
  const buffer = readFileSync(filePath);
  return path.extname(filePath).toLowerCase() === ".webp"
    ? readWebpDimensions(buffer)
    : path.extname(filePath).toLowerCase() === ".avif"
      ? readAvifDimensions(buffer)
      : null;
};

const parseTimestamp = (value) => {
  const match = value.match(/^(?:(\d{2}):)?(\d{2}):(\d{2})\.(\d{3})$/);
  if (!match) return Number.NaN;
  return (Number(match[1] ?? 0) * 3600) + (Number(match[2]) * 60) + Number(match[3]) + (Number(match[4]) / 1000);
};

const parseVtt = (filePath) => {
  const source = readFileSync(filePath, "utf8").replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n").trim();
  if (!source.startsWith("WEBVTT")) {
    fail(`${path.basename(filePath)}: missing WEBVTT header`);
    return [];
  }

  return source
    .split(/\n{2,}/)
    .map((block) => block.split("\n").map((line) => line.trim()).filter(Boolean))
    .filter((lines) => lines.some((line) => line.includes("-->")))
    .map((lines, index) => {
      const timingIndex = lines.findIndex((line) => line.includes("-->"));
      const timing = lines[timingIndex].match(/^(\S+)\s+-->\s+(\S+)/);
      if (!timing) {
        fail(`${path.basename(filePath)}: cue ${index + 1} has invalid timing`);
        return { start: Number.NaN, end: Number.NaN, text: "" };
      }
      return {
        start: parseTimestamp(timing[1]),
        end: parseTimestamp(timing[2]),
        text: normalizeText(lines.slice(timingIndex + 1).join(" ")),
      };
    });
};

if (!existsSync(manifestPath)) {
  fail("missing Hamlet evidence manifest");
}

const manifest = existsSync(manifestPath)
  ? JSON.parse(readFileSync(manifestPath, "utf8"))
  : { directCopies: [], derivativeGroups: [], processEvidence: [], rightsReview: {} };

if (manifest.schemaVersion !== 1 || manifest.projectId !== "generative-interface-study") {
  fail("Hamlet evidence manifest has an unsupported schema or project id");
}

const evidenceIds = new Set();
for (const item of [...manifest.directCopies, ...manifest.derivativeGroups, ...manifest.processEvidence]) {
  if (!item.id || evidenceIds.has(item.id)) fail(`duplicate or missing evidence id ${item.id ?? "(empty)"}`);
  evidenceIds.add(item.id);
}

for (const item of manifest.directCopies) {
  const filePath = path.resolve(root, item.publicPath);
  if (!filePath.startsWith(`${publicMediaRoot}${path.sep}`)) {
    fail(`${item.id}: publicPath must stay inside public/media/portfolio`);
    continue;
  }
  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    fail(`${item.id}: missing public artifact ${item.publicPath}`);
    continue;
  }
  if (statSync(filePath).size !== item.bytes) fail(`${item.id}: byte length differs from manifest`);
  if (sha256(filePath) !== item.sha256) fail(`${item.id}: SHA-256 differs from manifest`);
}

const expectedDerivativeNames = [];
for (const group of manifest.derivativeGroups) {
  if (!evidenceIds.has(group.sourceEvidenceRef)) fail(`${group.id}: unknown sourceEvidenceRef ${group.sourceEvidenceRef}`);
  const stems = group.stem
    ? [group.stem]
    : Array.from({ length: group.scenes ?? 0 }, (_, index) =>
        group.stemTemplate.replace("{scene}", String(index + 1).padStart(2, "0")));
  const names = stems.flatMap((stem) =>
    group.widths.flatMap((width) => group.formats.map((format) => `${stem}-${width}.${format}`)));
  if (names.length !== group.expectedCount) fail(`${group.id}: expectedCount does not match its expansion`);
  const [ratioWidth, ratioHeight] = String(group.aspectRatio).split(":").map(Number);
  if (!(ratioWidth > 0) || !(ratioHeight > 0)) fail(`${group.id}: invalid aspectRatio`);
  const inventoryLines = [];
  for (const name of names) {
    expectedDerivativeNames.push(name);
    const filePath = path.join(publicMediaRoot, name);
    if (!existsSync(filePath) || !statSync(filePath).isFile()) {
      fail(`${group.id}: missing derivative ${name}`);
      continue;
    }
    const bytes = statSync(filePath).size;
    const digest = sha256(filePath);
    const dimensions = readImageDimensions(filePath);
    const width = Number(name.match(/-(\d+)\.(?:avif|webp)$/i)?.[1]);
    const heightAlignment = group.heightAlignment ?? 1;
    const expectedHeight = Math.round((width * ratioHeight / ratioWidth) / heightAlignment) * heightAlignment;
    if (!dimensions) {
      fail(`${group.id}: unable to decode dimensions for ${name}`);
    } else if (dimensions.width !== width || dimensions.height !== expectedHeight) {
      fail(`${group.id}: ${name} is ${dimensions.width}x${dimensions.height}; expected ${width}x${expectedHeight}`);
    }
    inventoryLines.push(`${name}\t${bytes}\t${digest}`);
  }
  const inventoryDigest = sha256Text(`${inventoryLines.sort().join("\n")}\n`);
  if (inventoryDigest !== group.inventorySha256) fail(`${group.id}: derivative inventory SHA-256 differs from manifest`);
}

const publicFiles = readdirSync(publicMediaRoot, { withFileTypes: true })
  .filter((entry) => entry.isFile())
  .map((entry) => entry.name);
const hamletFiles = publicFiles.filter((name) => name.startsWith("hamlet-"));
const expectedHamletCount = manifest.directCopies.length + expectedDerivativeNames.length;
if (hamletFiles.length !== expectedHamletCount) {
  fail(`Hamlet public inventory has ${hamletFiles.length} files; expected ${expectedHamletCount}`);
}

const exactGlobalExclusions = new Set(["readme.txt", "verification.txt"]);
for (const name of publicFiles) {
  const lowerName = name.toLowerCase();
  const matchesExclusion = exactGlobalExclusions.has(lowerName)
    || (lowerName.startsWith("hamlet-") && manifest.publicExclusions.some((token) => lowerName.includes(token.toLowerCase())));
  if (matchesExclusion) fail(`delivery-only file must not be public: ${name}`);
}

const project = projectCaseStudies.find((entry) => entry.id === manifest.projectId);
const video = project?.media?.videos?.find((entry) => entry.featured);
if (!video || video.transcriptCues?.length !== 8) {
  fail("public Hamlet case must provide one featured video and eight transcript cues");
} else {
  const languageTracks = [
    { lang: "en", expected: video.transcriptCues.map((cue) => cue.en) },
    { lang: "zh-TW", expected: video.transcriptCues.map((cue) => cue.zh) },
  ];
  for (const language of languageTracks) {
    const track = video.tracks.find((entry) => entry.srcLang === language.lang);
    if (!track) {
      fail(`missing ${language.lang} track metadata`);
      continue;
    }
    const relativeTrackPath = track.src.replace(/^(?:\.\/|\/)/, "");
    const cues = parseVtt(path.join(root, "public", relativeTrackPath));
    if (cues.length !== 8) fail(`${language.lang} VTT must contain exactly eight cues`);
    if (cues.length) {
      if (cues[0].start !== 0 || cues.at(-1).end !== 40) fail(`${language.lang} VTT must cover 0-40 seconds`);
      cues.forEach((cue, index) => {
        if (index > 0 && cue.start !== cues[index - 1].end) fail(`${language.lang} VTT cue ${index + 1} is not contiguous`);
        if (cue.end <= cue.start) fail(`${language.lang} VTT cue ${index + 1} has a non-positive duration`);
        if (normalizeLanguageText(language.expected[index] ?? "", language.lang) !== normalizeLanguageText(cue.text, language.lang)) {
          fail(`${language.lang} VTT cue ${index + 1} differs from transcriptCues`);
        }
      });
    }
  }
}

for (const item of manifest.processEvidence) {
  if (item.kind === "processDerived" && item.usedForExistingVideo !== false) {
    fail(`${item.id}: derived process evidence must not be presented as an original production record`);
  }
}

if (publicationMode) {
  const rightsReview = manifest.rightsReview ?? {};
  if (rightsReview.status !== "verified") {
    fail(`publication gate blocked: rightsReview is ${rightsReview.status ?? "missing"}`);
  }
  if (rightsReview.publicationGate !== "approved") {
    fail(`publication gate blocked: publicationGate is ${rightsReview.publicationGate ?? "missing"}`);
  }
  const attestation = rightsReview.applicantAttestation ?? {};
  if (
    attestation.confirmed !== true
    || !attestation.confirmedBy?.trim()
    || !/^\d{4}-\d{2}-\d{2}$/.test(attestation.confirmedAt ?? "")
    || !attestation.evidenceRef?.trim()
  ) {
    fail("publication gate blocked: applicant attestation is incomplete");
  }
  for (const item of rightsReview.items ?? []) {
    const booleanChecks = Object.entries(item).filter(([, value]) => typeof value === "boolean");
    if (!booleanChecks.length || booleanChecks.some(([, value]) => value !== true)) {
      fail(`publication gate blocked: ${item.id ?? "unknown rights item"} review is incomplete`);
    }
    if (!item.evidenceRefs?.length || item.evidenceRefs.some((reference) => !reference?.trim())) {
      fail(`publication gate blocked: ${item.id ?? "unknown rights item"} has no evidence reference`);
    }
  }
}

if (errors.length) {
  console.error(`Portfolio evidence audit failed${publicationMode ? " (publication mode)" : ""}:`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Portfolio evidence audit passed: ${manifest.directCopies.length} direct copies, `
  + `${expectedDerivativeNames.length} derivatives, 16 WebVTT cues, ${hamletFiles.length} Hamlet public files.`,
);
console.log(`Publication rights gate: ${manifest.rightsReview.status} / ${manifest.rightsReview.publicationGate}.`);
