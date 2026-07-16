import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");

const forbiddenTerms = [
  "待補",
  "可替換",
  "範例",
  "正式送審前",
  "placeholder",
  "sample",
  "required",
  "recommended",
  "Content Readiness",
  "Internal Build Notes",
  "INTERNAL_TODO",
  "INTERNAL_SAMPLE",
  "INTERNAL_REPLACE",
  "PRE_SUBMISSION_CHECK",
  "HIDE_FROM_SUBMISSION",
  "時間待確認",
  "沉浸式記憶地圖",
  "work-02-powerbi-screenshot",
  "AI 協作備註",
  "風險提醒",
  "這裡保留",
  "未來可放入",
  "審查者",
  "評審可以",
  ".pbix",
  ".xlsx",
  ".xls",
  ".csv",
  "C:\\",
  "/Users/",
  "youtu.be/",
];
// Codex-Fix: Submission output scanner encodes no-leak vocabulary, including private data exports and local paths, in one auditable place.

const scannedExtensions = new Set([".html", ".js", ".css", ".json", ".txt", ".svg", ".xml"]);
const ignoredBundlePattern = /dist[\\/]assets[\\/](?:react|motion|three|scroll|rolldown-runtime)-/;
const findings = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (!scannedExtensions.has(path.extname(entry))) continue;
    const relative = path.relative(root, fullPath);
    if (ignoredBundlePattern.test(relative)) continue;
    // Codex-Fix: Ignore third-party/runtime chunks where generic technical strings such as sample/required are library internals, not portfolio content.

    const text = readFileSync(fullPath, "utf8");

    for (const term of forbiddenTerms) {
      const haystack = /[a-z]/i.test(term) ? text.toLowerCase() : text;
      const needle = /[a-z]/i.test(term) ? term.toLowerCase() : term;
      const index = haystack.indexOf(needle);
      if (index !== -1) {
        const snippet = text.slice(Math.max(0, index - 36), index + term.length + 36).replace(/\s+/g, " ");
        if (term === "placeholder" && path.extname(entry) === ".css" && snippet.includes("::placeholder")) continue;
        // Codex-Fix: Allow the standards-defined ::placeholder selector while still flagging portfolio copy that says placeholder.
        findings.push(`${relative}: "${term}" near "${snippet}"`);
      }
    }
  }
}

if (!existsSync(distDir)) {
  console.error("Submission scan failed: dist does not exist. Run pnpm run build:submission first.");
  process.exit(1);
}

walk(distDir);

if (findings.length) {
  console.error("Submission scan failed: forbidden construction terms were found in built output.");
  for (const finding of findings) console.error(`- ${finding}`);
  process.exit(1);
}

console.log(`Submission scan passed: ${forbiddenTerms.length} forbidden terms absent from dist output.`);
