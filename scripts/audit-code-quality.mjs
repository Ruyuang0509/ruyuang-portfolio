import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(root, "src");
const errors = [];
const codeExtensions = new Set([".css", ".js", ".jsx"]);
const auditExtensions = new Set([".css", ".html", ".js", ".jsx", ".md", ".mjs"]);
const ignoredDirectories = new Set([".git", ".tmp", "dist", "node_modules", "reports"]);

const walk = (directory, extensions, files = []) => {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (ignoredDirectories.has(entry.name)) continue;
      walk(path.join(directory, entry.name), extensions, files);
      continue;
    }
    if (entry.isFile() && extensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(path.join(directory, entry.name));
    }
  }
  return files;
};

const relativePath = (filePath) =>
  path.relative(root, filePath).replaceAll(path.sep, "/");

const sourceFiles = walk(sourceRoot, codeExtensions);
const sourceFileSet = new Set(sourceFiles.map((filePath) => path.resolve(filePath)));
const allAuditFiles = walk(root, auditExtensions);

for (const filePath of allAuditFiles) {
  const text = readFileSync(filePath, "utf8");
  const lines = text.split(/\r?\n/);
  lines.forEach((line, index) => {
    if (/\b(?:Codex-Fix|AI-Fix|ChatGPT-Fix)\s*:/iu.test(line)) {
      errors.push(`${relativePath(filePath)}:${index + 1}: remove tool-provenance comment labels`);
    }
  });
}

for (const filePath of sourceFiles) {
  const relativeFile = relativePath(filePath);
  const text = readFileSync(filePath, "utf8");
  const stem = path.basename(filePath, path.extname(filePath));

  if (/(?:new|final|copy|v\d+|\d+)$/iu.test(stem)) {
    errors.push(`${relativeFile}: source filename uses a version/copy suffix`);
  }
  if (/\bconsole\.(?:log|debug|trace)\s*\(/u.test(text)) {
    errors.push(`${relativeFile}: runtime source contains debug console output`);
  }

  text.split(/\r?\n/).forEach((line, index) => {
    if (/^\s*(?:\/\/|\/\*+|\*)\s*(?:TODO|FIXME|HACK)\b/iu.test(line)) {
      errors.push(`${relativeFile}:${index + 1}: unresolved maintenance marker in runtime source`);
    }
  });
}

const componentDeclarations = new Map();
for (const filePath of sourceFiles.filter((candidate) =>
  relativePath(candidate).startsWith("src/components/") && path.extname(candidate) === ".jsx")) {
  const text = readFileSync(filePath, "utf8");
  for (const match of text.matchAll(/^(?:export\s+default\s+)?function\s+([A-Z][A-Za-z0-9]*)\s*\(/gmu)) {
    const declarations = componentDeclarations.get(match[1]) ?? [];
    declarations.push(relativePath(filePath));
    componentDeclarations.set(match[1], declarations);
  }
}
for (const [name, declarations] of componentDeclarations) {
  const uniqueFiles = [...new Set(declarations)];
  if (uniqueFiles.length > 1) {
    errors.push(`Component ${name} is declared in multiple files: ${uniqueFiles.join(", ")}`);
  }
}

const aliases = new Map([
  [
    "#portfolio-draft",
    [
      path.join(sourceRoot, "draft", "DraftModeEnabled.jsx"),
      path.join(sourceRoot, "draft", "DraftModeDisabled.jsx"),
    ],
  ],
  [
    "#portfolio-hidden",
    [
      path.join(sourceRoot, "data", "portfolio.hidden.js"),
      path.join(sourceRoot, "data", "portfolio.hidden.disabled.js"),
    ],
  ],
]);

const resolveRelativeImport = (fromFile, specifier) => {
  const unresolved = path.resolve(path.dirname(fromFile), specifier);
  const candidates = path.extname(unresolved)
    ? [unresolved]
    : [
        unresolved,
        `${unresolved}.js`,
        `${unresolved}.jsx`,
        `${unresolved}.css`,
        path.join(unresolved, "index.js"),
        path.join(unresolved, "index.jsx"),
      ];
  return candidates.find((candidate) => existsSync(candidate)) ?? null;
};

const readSourceDependencies = (filePath) => {
  const text = readFileSync(filePath, "utf8");
  const specifiers = new Set();
  const patterns = [
    /\b(?:import|export)\s+(?:[^"'`;]*?\s+from\s+)?["']([^"']+)["']/gmu,
    /\bimport\s*\(\s*["']([^"']+)["']\s*\)/gmu,
  ];
  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) specifiers.add(match[1]);
  }

  const dependencies = [];
  for (const specifier of specifiers) {
    if (aliases.has(specifier)) {
      dependencies.push(...aliases.get(specifier));
      continue;
    }
    if (!specifier.startsWith(".")) continue;
    const resolved = resolveRelativeImport(filePath, specifier);
    if (resolved && sourceFileSet.has(path.resolve(resolved))) dependencies.push(resolved);
  }
  return dependencies;
};

const reachable = new Set();
const pending = [path.join(sourceRoot, "main.jsx")];
while (pending.length) {
  const filePath = path.resolve(pending.pop());
  if (reachable.has(filePath) || !sourceFileSet.has(filePath)) continue;
  reachable.add(filePath);
  pending.push(...readSourceDependencies(filePath));
}

const unreachable = sourceFiles
  .map((filePath) => path.resolve(filePath))
  .filter((filePath) => !reachable.has(filePath))
  .map(relativePath)
  .sort();
for (const filePath of unreachable) {
  errors.push(`${filePath}: source module is unreachable from the draft/submission entry graphs`);
}

if (errors.length) {
  console.error("Code quality audit failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Code quality audit passed: ${sourceFiles.length} source modules are reachable with no versioned filenames, duplicate component declarations, debug output, maintenance markers, or tool-provenance labels.`);
