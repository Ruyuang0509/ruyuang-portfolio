import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { TextDecoder } from "node:util";

export const SCANNED_TEXT_EXTENSIONS = new Set([
  ".html",
  ".js",
  ".css",
  ".json",
  ".map",
  ".txt",
  ".svg",
  ".vtt",
  ".webmanifest",
  ".xml",
]);

const firstPartyOnly = "first-party";

export const TEXT_RULES = [
  { ruleId: "text.draft.missing-material", pattern: /待補/u },
  { ruleId: "text.draft.replaceable", pattern: /可替換/u },
  { ruleId: "text.draft.example", pattern: /範例/u },
  { ruleId: "text.draft.pre-submission", pattern: /正式送審前/u },
  { ruleId: "text.draft.construction-mode", pattern: /施工模式/u },
  { ruleId: "text.draft.under-construction", pattern: /施工中/u },
  { ruleId: "text.draft.placeholder-zh", pattern: /佔位/u },
  { ruleId: "text.draft.not-provided", pattern: /尚未提供/u },
  { ruleId: "text.draft.placeholder", pattern: /\bplaceholder\b/i, scope: firstPartyOnly },
  { ruleId: "text.draft.sample", pattern: /\bsample\b/i, scope: firstPartyOnly },
  { ruleId: "text.draft.required", pattern: /\brequired\b/i, scope: firstPartyOnly },
  { ruleId: "text.draft.recommended", pattern: /\brecommended\b/i, scope: firstPartyOnly },
  { ruleId: "text.draft.content-readiness", pattern: /Content Readiness/i },
  { ruleId: "text.draft.internal-build-notes", pattern: /Internal Build Notes/i },
  { ruleId: "text.draft.internal-todo", pattern: /INTERNAL_TODO/i },
  { ruleId: "text.draft.internal-sample", pattern: /INTERNAL_SAMPLE/i },
  { ruleId: "text.draft.internal-replace", pattern: /INTERNAL_REPLACE/i },
  { ruleId: "text.draft.pre-submission-check", pattern: /PRE_SUBMISSION_CHECK/i },
  { ruleId: "text.draft.hide-from-submission", pattern: /HIDE_FROM_SUBMISSION/i },
  { ruleId: "text.draft.time-unconfirmed", pattern: /時間待確認/u },
  { ruleId: "text.draft.ai-note", pattern: /AI 協作備註/u },
  { ruleId: "text.draft.risk-reminder", pattern: /風險提醒/u },
  { ruleId: "text.draft.reserved-here", pattern: /這裡保留/u },
  { ruleId: "text.draft.future-insertion", pattern: /未來可放入/u },
  { ruleId: "text.draft.reviewer", pattern: /審查者/u },
  { ruleId: "text.draft.reviewer-can", pattern: /評審可以/u },
  {
    ruleId: "text.editorial.priority-selection",
    pattern: /優先放入能展現 AI、互動媒體、聲響或沉浸式經驗的作品/u,
  },
  {
    ruleId: "text.editorial.case-evidence-checklist",
    pattern: /每件作品都要回答：為什麼做、給誰用、如何互動、證據在哪裡/u,
  },
  { ruleId: "text.brand.legacy-nextgen", pattern: /Nextgen Portfolio/i },
  { ruleId: "text.anchor.graphic", pattern: /#graphic\b/i },
  { ruleId: "text.anchor.video", pattern: /#video\b/i },
  { ruleId: "text.anchor.photo", pattern: /#photo\b/i },
  { ruleId: "text.anchor.contact", pattern: /#contact\b/i },
  { ruleId: "text.hidden.case-id", pattern: /immersive-memory-map/i },
  { ruleId: "text.hidden.case-title", pattern: /沉浸式記憶地圖/u },
  { ruleId: "text.hidden.ph-after-reference", pattern: /ph-after-/i },
  { ruleId: "text.hidden.mv-soft-reference", pattern: /mv-soft-/i },
  { ruleId: "text.restricted.directory", pattern: /restricted-media/i },
  { ruleId: "text.restricted.power-bi-source", pattern: /work-02-powerbi-screenshot/i },
  { ruleId: "text.restricted.pbix", pattern: /\.pbix\b/i },
  { ruleId: "text.restricted.xlsx", pattern: /\.xlsx\b/i },
  { ruleId: "text.restricted.xls", pattern: /\.xls\b/i },
  { ruleId: "text.restricted.csv", pattern: /\.csv\b/i },
  { ruleId: "text.restricted.tsv", pattern: /\.tsv\b/i },
  { ruleId: "text.local-path.windows", pattern: /\b[A-Za-z]:[\\/]/ },
  { ruleId: "text.local-path.macos", pattern: /\/Users\/[^\s"'<>]+/i },
  { ruleId: "text.local-path.linux-home", pattern: /\/(?:home|root)\/[^\s"'<>]+/i },
  { ruleId: "text.media.short-youtube-url", pattern: /youtu\.be\//i },
];

export const INVENTORY_RULES = [
  {
    ruleId: "inventory.hidden.mv-soft-preview",
    matches: ({ basename }) => basename === "mv-soft-preview.mp4",
  },
  {
    ruleId: "inventory.hidden.mv-soft",
    matches: ({ basename }) => basename.startsWith("mv-soft-") && basename !== "mv-soft-preview.mp4",
  },
  {
    ruleId: "inventory.hidden.ph-after",
    matches: ({ basename }) => basename.startsWith("ph-after-"),
  },
  {
    ruleId: "inventory.restricted.directory",
    matches: ({ segments }) => segments.includes("restricted-media"),
  },
  {
    ruleId: "inventory.restricted.power-bi-source",
    matches: ({ basename }) => basename.startsWith("work-02-powerbi-screenshot"),
  },
  {
    ruleId: "inventory.restricted.raw-data",
    matches: ({ basename }) => /\.(?:pbix|xlsx|xls|csv|tsv)$/i.test(basename),
  },
];

const dependencyBundlePattern = /^assets\/(?:react|motion|three|scroll|vendor|rolldown-runtime)-[^/]+\.(?:js|css)$/i;
const utf8Decoder = new TextDecoder("utf-8", { fatal: true });

export function normalizeRelativePath(relativePath) {
  return String(relativePath).replaceAll("\\", "/").replace(/^\.\//, "").normalize("NFC");
}

export function matchInventoryRules(relativePath) {
  const normalizedPath = normalizeRelativePath(relativePath);
  const matchKey = normalizedPath.toLowerCase();
  const segments = matchKey.split("/").filter(Boolean);
  const basename = segments.at(-1) ?? "";

  return INVENTORY_RULES
    .filter((rule) => rule.matches({ normalizedPath, matchKey, segments, basename }))
    .map((rule) => ({ ruleId: rule.ruleId, relativePath: normalizedPath }));
}

function getTextMatch(rule, text, extension) {
  let searchableText = text;
  if (rule.ruleId === "text.draft.placeholder" && extension === ".css") {
    searchableText = text.replace(/::placeholder\b/gi, (match) => " ".repeat(match.length));
  }
  return rule.pattern.exec(searchableText);
}

function getLineAndColumn(text, index) {
  const prefix = text.slice(0, index);
  const lines = prefix.split(/\r?\n/);
  return { line: lines.length, column: (lines.at(-1)?.length ?? 0) + 1 };
}

function sortAndDedupeFindings(findings) {
  const unique = new Map();
  for (const finding of findings) {
    const key = [finding.relativePath, finding.kind, finding.ruleId, finding.line ?? "", finding.column ?? ""].join("|");
    if (!unique.has(key)) unique.set(key, finding);
  }
  return [...unique.values()].sort((left, right) =>
    left.relativePath.localeCompare(right.relativePath) ||
    left.kind.localeCompare(right.kind) ||
    left.ruleId.localeCompare(right.ruleId) ||
    (left.line ?? 0) - (right.line ?? 0) ||
    (left.column ?? 0) - (right.column ?? 0),
  );
}

export function scanSubmissionOutput({ outputDir }) {
  const findings = [];
  const counts = { inventoriedFiles: 0, scannedTextFiles: 0 };

  if (!existsSync(outputDir)) {
    return {
      ok: false,
      counts,
      findings: [{ kind: "scan", ruleId: "scan.root-missing", relativePath: "." }],
    };
  }

  let rootStats;
  try {
    rootStats = statSync(outputDir);
  } catch (error) {
    return {
      ok: false,
      counts,
      findings: [{ kind: "scan", ruleId: "scan.root-stat-error", relativePath: ".", errorCode: error.code }],
    };
  }

  if (!rootStats.isDirectory()) {
    return {
      ok: false,
      counts,
      findings: [{ kind: "scan", ruleId: "scan.root-not-directory", relativePath: "." }],
    };
  }

  const walk = (directory, relativeDirectory = "") => {
    let entries;
    try {
      entries = readdirSync(directory, { withFileTypes: true })
        .sort((left, right) => left.name.localeCompare(right.name));
    } catch (error) {
      findings.push({
        kind: "scan",
        ruleId: "scan.directory-read-error",
        relativePath: normalizeRelativePath(relativeDirectory || "."),
        errorCode: error.code,
      });
      return;
    }

    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      const relativePath = normalizeRelativePath(path.join(relativeDirectory, entry.name));

      for (const match of matchInventoryRules(relativePath)) {
        findings.push({ kind: "inventory", ...match });
      }

      if (entry.isDirectory()) {
        walk(fullPath, relativePath);
        continue;
      }

      if (!entry.isFile()) {
        findings.push({ kind: "scan", ruleId: "scan.unsupported-entry", relativePath });
        continue;
      }

      counts.inventoriedFiles += 1;
      const extension = path.extname(entry.name).toLowerCase();
      if (!SCANNED_TEXT_EXTENSIONS.has(extension)) continue;

      let text;
      try {
        text = utf8Decoder.decode(readFileSync(fullPath));
      } catch (error) {
        findings.push({
          kind: "scan",
          ruleId: error instanceof TypeError ? "scan.text-decode-error" : "scan.file-read-error",
          relativePath,
          errorCode: error.code,
        });
        continue;
      }

      counts.scannedTextFiles += 1;
      const isDependencyBundle = dependencyBundlePattern.test(relativePath);

      for (const rule of TEXT_RULES) {
        if (rule.scope === firstPartyOnly && isDependencyBundle) continue;
        const match = getTextMatch(rule, text, extension);
        if (!match) continue;
        const location = getLineAndColumn(text, match.index);
        findings.push({ kind: "text", ruleId: rule.ruleId, relativePath, ...location });
      }
    }
  };

  walk(outputDir);
  const normalizedFindings = sortAndDedupeFindings(findings);
  return { ok: normalizedFindings.length === 0, counts, findings: normalizedFindings };
}
