import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const cwd = process.cwd();
const folderName = path.basename(cwd);
const pathSegments = cwd.split(path.sep);
const packagePath = path.join(cwd, "package.json");
const identityPath = path.join(cwd, ".project-identity.json");
const expectedFolder = "如願個人網站";
const expectedPackageName = "ruyuan-personal-website";
const errors = [];
const warnings = [];

function readJson(filePath) {
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch (error) {
    errors.push(`Cannot read ${path.relative(cwd, filePath)}: ${error.message}`);
    return null;
  }
}

function requirePath(relativePath) {
  if (!existsSync(path.join(cwd, relativePath))) {
    errors.push(`Missing expected canonical-project marker: ${relativePath}`);
  }
}

const packageJson = readJson(packagePath);
const identity = readJson(identityPath);

for (const deprecatedFolder of ["portfolio-nextgen", "personal-portfolio-nextgen", "role-expertise-gsap-three-js-react"]) {
  if (folderName === deprecatedFolder || pathSegments.includes(deprecatedFolder)) {
    errors.push(`This appears to be the deprecated/scattered folder "${deprecatedFolder}". Use ${expectedFolder} instead.`);
  }
}

if (!pathSegments.includes(expectedFolder)) {
  warnings.push(`Current path does not visibly include "${expectedFolder}". If Codex path mapping is active, identity markers will be used as the source of truth.`);
}

if (identity) {
  if (identity.canonicalFolder !== expectedFolder) {
    errors.push(`.project-identity.json canonicalFolder is "${identity.canonicalFolder}", expected "${expectedFolder}".`);
  }

  if (identity.packageName !== expectedPackageName) {
    errors.push(`.project-identity.json packageName is "${identity.packageName}", expected "${expectedPackageName}".`);
  }
}

if (packageJson) {
  if (packageJson.name !== expectedPackageName) {
    errors.push(`package.json name is "${packageJson.name}", expected "${expectedPackageName}".`);
  }

  const allDeps = {
    ...(packageJson.dependencies ?? {}),
    ...(packageJson.devDependencies ?? {}),
  };

  if ("react-router-dom" in allDeps) {
    errors.push("react-router-dom is present even though this canonical SPA no longer needs it.");
  }

  for (const scriptName of ["workspace:check", "audit:media", "content:check", "build", "preview", "audit:lighthouse"]) {
    if (!packageJson.scripts?.[scriptName]) {
      errors.push(`Missing package script: ${scriptName}`);
    }
  }
}

[
  ".project-identity.json",
  "AGENTS.md",
  "docs/workspace-consolidation.md",
  "docs/content-authoring.md",
  "docs/adding-portfolio-work.md",
  "docs/portfolio-display-research.md",
  "index.html",
  "vite.config.js",
  "src/App.jsx",
  "src/components/ResearchPositioning.jsx",
  "src/data/portfolio.js",
  "public/media/portfolio",
  "scripts/run-node.ps1",
  "scripts/run-lighthouse.mjs",
  "scripts/audit-media.mjs",
  "scripts/validate-portfolio-content.mjs",
].forEach(requirePath);

if (warnings.length) {
  console.warn("Workspace warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (errors.length) {
  console.error("Workspace check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Workspace check passed: ${expectedFolder} is the canonical active project.`);
