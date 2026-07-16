import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const allowedExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".jsx",
  ".json",
  ".md",
  ".mjs",
  ".ps1",
  ".svg",
  ".txt",
]);
const ignoredDirectories = new Set([
  ".git",
  ".tmp",
  "dist",
  "node_modules",
  "reports",
]);
const mojibakePattern =
  /[�]|[\uE400-\uEFFF]|(?:敺|蝛|雿|銝|嚗|霅|瘚|鞈|憭|摨|餌|蝟|暸|踴|甇|鋆|瞍|蝝|靘|撟|銵|閬|蔣|慦|隞|賊|乓|繚|憟|唳|孵)/u;
// Codex-Fix: Audit source/docs text globally so corrupted Traditional Chinese does not slip past content-only checks.

const findings = [];

const shouldSkipLine = (relativeFile, line) =>
  relativeFile.startsWith("scripts/") &&
  (line.includes("mojibakePattern") || line.includes("\\uE400") || line.includes("[�]"));

const scanFile = (filePath) => {
  const relativeFile = path.relative(root, filePath).replaceAll(path.sep, "/");
  const text = readFileSync(filePath, "utf8");

  text.split(/\r?\n/).forEach((line, index) => {
    if (shouldSkipLine(relativeFile, line)) return;

    if (mojibakePattern.test(line)) {
      findings.push(`${relativeFile}:${index + 1}: possible mojibake/corrupted text`);
    }
  });
};

const walk = (directory) => {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (ignoredDirectories.has(entry.name)) continue;
      walk(path.join(directory, entry.name));
      continue;
    }

    if (!entry.isFile()) continue;
    const extension = path.extname(entry.name).toLowerCase();
    if (!allowedExtensions.has(extension)) continue;
    scanFile(path.join(directory, entry.name));
  }
};

walk(root);

if (findings.length) {
  console.error("Source text audit failed:");
  for (const finding of findings) console.error(`- ${finding}`);
  process.exit(1);
}

console.log("Source text audit passed: no likely mojibake patterns found.");
