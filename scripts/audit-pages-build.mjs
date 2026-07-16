import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const distRoot = path.join(root, "dist");
const textExtensions = new Set([".css", ".html", ".js", ".json", ".svg"]);
const rootRelativeAssetPattern = /(?<![A-Za-z0-9:/.])\/(?:assets|media)\/[A-Za-z0-9._~!$&'()*+,;=:@%/?#-]+|(?<![A-Za-z0-9:/.])\/(?:favicon|social-preview)\.[A-Za-z0-9]+/g;
const findings = [];

function walk(entry, files = []) {
  const stat = statSync(entry);
  if (stat.isDirectory()) {
    for (const child of readdirSync(entry)) walk(path.join(entry, child), files);
  } else if (stat.isFile() && textExtensions.has(path.extname(entry))) {
    files.push(entry);
  }
  return files;
}

if (!existsSync(path.join(distRoot, "index.html"))) {
  console.error("GitHub Pages audit failed: dist/index.html does not exist. Run a production build first.");
  process.exit(1);
}

for (const file of walk(distRoot)) {
  const content = readFileSync(file, "utf8");
  for (const match of content.matchAll(rootRelativeAssetPattern)) {
    findings.push(`${path.relative(root, file)} -> ${match[0]}`);
  }
}

if (findings.length) {
  console.error("GitHub Pages audit failed: root-relative local assets remain in the static build.");
  for (const finding of [...new Set(findings)].slice(0, 30)) console.error(`- ${finding}`);
  process.exit(1);
}

console.log("GitHub Pages audit passed: static assets are portable across project subpaths.");
