import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import {
  dataVisualizationSeries,
  projectCaseStudies,
} from "../src/data/portfolio.js";

const cwd = process.cwd();
const scanRoots = ["index.html", "package.json", "vite.config.js", "src", "public"];
const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".jsx",
  ".json",
  ".mjs",
  ".svg",
  ".txt",
]);
const ignoredDirs = new Set(["node_modules", "dist", ".tmp", "reports", ".git"]);
const runtimeReferenceRoots = [
  "index.html",
  "src",
  "public/llms.txt",
  "public/social-preview.svg",
];
const mediaPathPattern = /(?:^|["'`(\s,])\/?(media\/[A-Za-z0-9_./-]+\.(?:avif|gif|jpe?g|mp3|mp4|png|svg|vtt|wav|webm|webp))(?=$|["'`)\s,])/gimu;
const blockedPatterns = [
  { label: "remote Unsplash image CDN", pattern: /images\.unsplash\.com/i },
  { label: "remote MDN demo video CDN", pattern: /interactive-examples\.mdn\.mozilla\.net/i },
  { label: "MDN demo URL", pattern: /developer\.mozilla\.org/i },
  { label: "legacy MDN flower demo video", pattern: /flower\.mp4/i },
  { label: "removed router dependency", pattern: /react-router-dom/i },
  { label: "remote demo preconnect", pattern: /rel=["']preconnect["'][^>]+(?:images\.unsplash|interactive-examples\.mdn)/i },
];

function walk(entry, files = []) {
  const absolute = path.join(cwd, entry);
  if (!statExists(absolute)) return files;
  const stat = statSync(absolute);

  if (stat.isDirectory()) {
    if (ignoredDirs.has(path.basename(absolute))) return files;
    for (const child of readdirSync(absolute)) {
      walk(path.join(entry, child), files);
    }
    return files;
  }

  if (stat.isFile() && textExtensions.has(path.extname(absolute))) {
    files.push(absolute);
  }
  return files;
}

function statExists(filePath) {
  try {
    statSync(filePath);
    return true;
  } catch {
    return false;
  }
}

function walkAllFiles(entry, files = []) {
  const absolute = path.join(cwd, entry);
  if (!statExists(absolute)) return files;
  const stat = statSync(absolute);

  if (stat.isDirectory()) {
    for (const child of readdirSync(absolute)) {
      walkAllFiles(path.join(entry, child), files);
    }
    return files;
  }

  if (stat.isFile()) files.push(absolute);
  return files;
}

const findings = [];
const files = scanRoots.flatMap((root) => walk(root));

for (const file of files) {
  const relative = path.relative(cwd, file);
  const content = readFileSync(file, "utf8");
  const lines = content.split(/\r?\n/);

  lines.forEach((line, index) => {
    for (const blocked of blockedPatterns) {
      if (blocked.pattern.test(line)) {
        findings.push(`${relative}:${index + 1} -> ${blocked.label}`);
      }
    }
  });
}

const runtimeReferenceFiles = runtimeReferenceRoots
  .flatMap((root) => walk(root))
  .map((file) => readFileSync(file, "utf8"));
const referencedMediaPaths = new Set();

function collectMediaPaths(value, seen = new Set()) {
  if (typeof value === "string") {
    for (const match of value.matchAll(mediaPathPattern)) {
      referencedMediaPaths.add(match[1].replaceAll("/", path.sep));
    }
    return;
  }
  if (!value || typeof value !== "object" || seen.has(value)) return;

  seen.add(value);
  for (const child of Array.isArray(value) ? value : Object.values(value)) {
    collectMediaPaths(child, seen);
  }
}

for (const content of runtimeReferenceFiles) collectMediaPaths(content);
collectMediaPaths(projectCaseStudies);
collectMediaPaths(dataVisualizationSeries);

const mediaFiles = walkAllFiles("public/media");
const existingMediaPaths = new Set(
  mediaFiles.map((file) => path.relative(path.join(cwd, "public"), file)),
);

for (const file of mediaFiles) {
  const relativeMediaPath = path.relative(path.join(cwd, "public"), file);
  if (!referencedMediaPaths.has(relativeMediaPath)) {
    findings.push(`${path.relative(cwd, file)} -> public media has no runtime or metadata reference`);
  }
}

for (const referencedPath of referencedMediaPaths) {
  if (!existingMediaPaths.has(referencedPath)) {
    findings.push(`${path.join("public", referencedPath)} -> referenced public media is missing`);
  }
}

if (findings.length) {
  console.error("Media/workspace audit failed:");
  for (const finding of findings) console.error(`- ${finding}`);
  process.exit(1);
}

console.log(`Media audit passed: ${mediaFiles.length} public media files have exact runtime or metadata paths, with no missing references, remote demo media, stale preconnects, or removed router dependency.`);

