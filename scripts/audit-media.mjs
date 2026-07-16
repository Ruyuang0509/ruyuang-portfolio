import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";

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

if (findings.length) {
  console.error("Media/workspace audit failed:");
  for (const finding of findings) console.error(`- ${finding}`);
  process.exit(1);
}

console.log("Media audit passed: no remote demo media, stale preconnects, or removed router dependency found in runtime sources.");

