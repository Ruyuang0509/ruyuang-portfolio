import { readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];

const readProjectFile = (relativePath) =>
  readFileSync(path.join(root, relativePath), "utf8");

const styles = readProjectFile("src/styles.css");
const indexHtml = readProjectFile("index.html");
const editorialHeading = readProjectFile("src/components/EditorialHeading.jsx");
const researchPositioning = readProjectFile("src/components/ResearchPositioning.jsx");
const portfolioData = readProjectFile("src/data/portfolio.js");

const assert = (condition, message) => {
  if (!condition) errors.push(message);
};

const warn = (condition, message) => {
  if (!condition) warnings.push(message);
};

assert(/<html\s+lang=["\']zh-Hant-TW["\']/i.test(indexHtml), "index.html must declare lang=\"zh-Hant-TW\" for Traditional Chinese layout and assistive tech.");
assert(!/word-break\s*:\s*break-all\b/i.test(styles), "Do not use global or broad word-break: break-all; it damages Traditional Chinese reading rhythm.");
assert(!/overflow-wrap\s*:\s*anywhere\b/i.test(styles), "Do not use overflow-wrap:anywhere in the shared CJK typography system; use break-word only for long Latin tokens.");
assert(/line-break\s*:\s*loose\b/i.test(styles), "CJK typography should keep line-break: loose for Traditional Chinese punctuation rhythm.");
assert(/\.phrase-unit\s*{[\s\S]*?white-space\s*:\s*nowrap/i.test(styles), "Phrase-aware headings need .phrase-unit with white-space: nowrap for short semantic compounds.");
assert(/\.translation-term[\s\S]*?word-break\s*:\s*keep-all/i.test(styles), "Translation terms need keep-all protection so Chinese terms are not sliced awkwardly.");
assert(/aria-label=\{accessibleText\}/.test(editorialHeading), "EditorialHeading must preserve screen-reader text through aria-label when visual phrase lines are used.");
assert(/aria-hidden=\"true\"/.test(editorialHeading), "EditorialHeading visual phrase lines should be aria-hidden so they are not read twice.");

const negativeLetterSpacing = [...styles.matchAll(/letter-spacing\s*:\s*(-?\d*\.?\d+)em/g)].map((match) => Number(match[1]));
const overlyTightTracking = negativeLetterSpacing.filter((value) => value < -0.04);
assert(overlyTightTracking.length === 0, "Chinese typography tracking is too tight: " + overlyTightTracking.join(", ") + "em. Keep display tracking subtle.");

const phraseLineMatches = [...researchPositioning.matchAll(/titleLines=\{\[([\s\S]*?)\]\}/g)];
warn(phraseLineMatches.length >= 4, "Research-positioning section headings should use structured titleLines for phrase-aware Chinese wrapping.");

const portfolioTitleLineMatches = [...portfolioData.matchAll(/titleLines:\s*\[\[/g)];
warn(portfolioTitleLineMatches.length >= 3, "Project case-study titles should use nested phrase arrays, e.g. titleLines: [[\"短詞\"], [\"短詞\"]].");

const longPhraseUnits = [];
const phraseLiteralPattern = /titleLines\s*[:=]\s*\{?\[([\s\S]*?)\]\}?/g;
const cjkCount = (text) => [...text].filter((char) => /[\u3400-\u9FFF\uF900-\uFAFF]/u.test(char)).length;
for (const source of [researchPositioning, portfolioData]) {
  for (const block of source.matchAll(phraseLiteralPattern)) {
    for (const phrase of block[1].matchAll(/["\']([^"\']+)["\']/g)) {
      const value = phrase[1];
      if (cjkCount(value) > 14) longPhraseUnits.push(value);
    }
  }
}
warn(longPhraseUnits.length === 0, "Some phrase units are long enough to risk mobile overflow: " + longPhraseUnits.slice(0, 5).join(" | "));

if (warnings.length) {
  console.warn("CJK typography audit warnings:");
  for (const warning of warnings) console.warn("- " + warning);
}

if (errors.length) {
  console.error("CJK typography audit failed:");
  for (const error of errors) console.error("- " + error);
  process.exit(1);
}

console.log("CJK typography audit passed: language metadata, wrapping rules, phrase headings, and unsafe tracking checks are valid.");
// Codex-Fix: Guard the Traditional Chinese visual system against regressions such as break-all wrapping, excessive tracking, and inaccessible phrase headings.
