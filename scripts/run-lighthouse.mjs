import { createHash, randomUUID } from "node:crypto";
import {
  cp,
  copyFile,
  lstat,
  mkdir,
  mkdtemp,
  open,
  readFile,
  readdir,
  rename,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import {
  cpus,
  release as osRelease,
  tmpdir,
  type as osType,
  version as osVersion,
} from "node:os";
import process from "node:process";
import { setTimeout as delay } from "node:timers/promises";
import { preview } from "vite";

const HOST = "127.0.0.1";
const REPORT_DIR = "reports";
const SUMMARY_PATH = path.join(REPORT_DIR, "lighthouse-summary.json");
const HISTORY_PATH = path.join(REPORT_DIR, "lighthouse-history.json");
const ARCHIVE_ROOT = path.join(REPORT_DIR, "lighthouse-runs");
const LOCK_PATH = path.join(REPORT_DIR, ".lighthouse-audit.lock");
const LIGHTHOUSE_TMP_ROOT = path.join(tmpdir(), "ruyuan-portfolio-lighthouse");
const SOURCE_INPUT_BASE_PATHS = [
  "index.html",
  "package.json",
  "pnpm-lock.yaml",
  "vite.config.js",
  "public",
  "scripts",
  "src",
];
const BUILD_RELEVANT_ENV_NAMES = [
  "BROWSERSLIST",
  "BROWSERSLIST_CONFIG",
  "BROWSERSLIST_ENV",
  "LANG",
  "LC_ALL",
  "NODE_ENV",
  "SOURCE_DATE_EPOCH",
  "TZ",
];
const BUILD_ENV = {
  VITE_PORTFOLIO_MODE: "submission",
  VITE_BASE_PATH: "./",
};
const CHROME_FLAGS = ["--headless=new", "--no-sandbox"];
const LIGHTHOUSE_COMMON_ARGS = ["--output=json", "--quiet"];
const LIGHTHOUSE_COMMON_CONFIG = {
  output: ["json"],
  maxWaitForFcp: 30000,
  maxWaitForLoad: 45000,
  pauseAfterFcpMs: 1000,
  pauseAfterLoadMs: 1000,
  networkQuietThresholdMs: 1000,
  cpuQuietThresholdMs: 1000,
  throttlingMethod: "simulate",
  auditMode: false,
  gatherMode: false,
  clearStorageTypes: ["file_systems", "shader_cache", "service_workers", "cache_storage"],
  disableStorageReset: false,
  debugNavigation: false,
  channel: "cli",
  usePassiveGathering: false,
  disableFullPageScreenshot: false,
  skipAboutBlank: false,
  blankPage: "about:blank",
  ignoreStatusCode: false,
  locale: "en-US",
  blockedUrlPatterns: null,
  additionalTraceCategories: null,
  extraHeaders: null,
  precomputedLanternData: null,
  onlyAudits: null,
  onlyCategories: null,
  skipAudits: null,
};
const AUDITS = [
  {
    id: "mobile",
    latestReportPath: path.join(REPORT_DIR, "lighthouse.json"),
    archiveFileName: "lighthouse.mobile.json",
    cliArgs: ["--form-factor=mobile"],
    expectedProfile: {
      formFactor: "mobile",
      throttlingMethod: "simulate",
      screenEmulation: {
        mobile: true,
        width: 412,
        height: 823,
        deviceScaleFactor: 1.75,
        disabled: false,
      },
      throttling: {
        rttMs: 150,
        throughputKbps: 1638.4,
        requestLatencyMs: 562.5,
        downloadThroughputKbps: 1474.5600000000002,
        uploadThroughputKbps: 675,
        cpuSlowdownMultiplier: 4,
      },
    },
    expectedConfig: {
      ...LIGHTHOUSE_COMMON_CONFIG,
      formFactor: "mobile",
      throttling: {
        rttMs: 150,
        throughputKbps: 1638.4,
        requestLatencyMs: 562.5,
        downloadThroughputKbps: 1474.5600000000002,
        uploadThroughputKbps: 675,
        cpuSlowdownMultiplier: 4,
      },
      screenEmulation: {
        mobile: true,
        width: 412,
        height: 823,
        deviceScaleFactor: 1.75,
        disabled: false,
      },
      emulatedUserAgent: "Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Mobile Safari/537.36",
    },
  },
  {
    id: "desktop",
    latestReportPath: path.join(REPORT_DIR, "lighthouse.desktop.json"),
    archiveFileName: "lighthouse.desktop.json",
    cliArgs: ["--preset=desktop"],
    expectedProfile: {
      formFactor: "desktop",
      throttlingMethod: "simulate",
      screenEmulation: {
        mobile: false,
        width: 1350,
        height: 940,
        deviceScaleFactor: 1,
        disabled: false,
      },
      throttling: {
        rttMs: 40,
        throughputKbps: 10240,
        requestLatencyMs: 0,
        downloadThroughputKbps: 0,
        uploadThroughputKbps: 0,
        cpuSlowdownMultiplier: 1,
      },
    },
    expectedConfig: {
      ...LIGHTHOUSE_COMMON_CONFIG,
      formFactor: "desktop",
      throttling: {
        rttMs: 40,
        throughputKbps: 10240,
        requestLatencyMs: 0,
        downloadThroughputKbps: 0,
        uploadThroughputKbps: 0,
        cpuSlowdownMultiplier: 1,
      },
      screenEmulation: {
        mobile: false,
        width: 1350,
        height: 940,
        deviceScaleFactor: 1,
        disabled: false,
      },
      emulatedUserAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
    },
  },
];

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function compareText(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map((item) => stableStringify(item)).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort(compareText)
      .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

function formatJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function toPortablePath(value) {
  return value.replaceAll("\\", "/");
}

function getStableHostIdentity() {
  const logicalCpusByModel = new Map();
  for (const cpu of cpus()) {
    const model = cpu.model.trim().replace(/\s+/g, " ") || "unknown";
    logicalCpusByModel.set(model, (logicalCpusByModel.get(model) ?? 0) + 1);
  }

  return {
    osType: osType(),
    osRelease: osRelease(),
    osVersion: osVersion(),
    architecture: process.arch,
    cpuModels: [...logicalCpusByModel.entries()]
      .sort(([left], [right]) => compareText(left, right))
      .map(([model, logicalCpuCount]) => ({ model, logicalCpuCount })),
  };
}

const STABLE_HOST_IDENTITY = getStableHostIdentity();

function captureBuildRelevantInheritedEnvironment() {
  const names = new Set(BUILD_RELEVANT_ENV_NAMES);
  for (const name of Object.keys(process.env)) {
    if (name.startsWith("VITE_")) names.add(name);
  }

  const values = [...names]
    .sort(compareText)
    .filter((name) => Object.hasOwn(process.env, name) && !(name in BUILD_ENV))
    .map((name) => ({
      name,
      valueSha256: sha256(process.env[name] ?? ""),
    }));

  return {
    selection: {
      exactNames: BUILD_RELEVANT_ENV_NAMES,
      prefixes: ["VITE_"],
      harnessOverridesExcluded: Object.keys(BUILD_ENV).sort(compareText),
    },
    values,
    fingerprint: sha256(stableStringify(values)),
  };
}

async function discoverSourceInputPaths(root = ".") {
  const rootEntries = await readdir(root, { withFileTypes: true });
  const viteEnvironmentFiles = [];

  for (const entry of rootEntries) {
    if (!/^\.env(?:\.|$)/.test(entry.name)) continue;
    if (!entry.isFile()) {
      throw new Error(`unsupported Vite environment input: ${entry.name}`);
    }
    viteEnvironmentFiles.push(entry.name);
  }

  return [...new Set([...SOURCE_INPUT_BASE_PATHS, ...viteEnvironmentFiles])].sort(compareText);
}

function assertSamePathSet(beforePaths, afterPaths) {
  if (stableStringify(beforePaths) !== stableStringify(afterPaths)) {
    throw new Error(
      "build input path set changed during the Lighthouse run; no reports were published: "
      + `${stableStringify(beforePaths)} -> ${stableStringify(afterPaths)}`,
    );
  }
}

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const captureOutput = options.captureOutput === true;
    const child = spawn(command, args, {
      stdio: captureOutput ? ["ignore", "pipe", "pipe"] : (options.stdio ?? "inherit"),
      shell: false,
      env: { ...process.env, CI: "true", ...options.env },
    });
    let stdout = "";
    let stderr = "";
    const stdoutChunks = [];
    const stderrChunks = [];
    let settled = false;
    let spawnError;

    const settle = (callback, value) => {
      if (settled) return;
      settled = true;
      callback(value);
    };

    if (captureOutput) {
      child.stdout.on("data", (chunk) => { stdoutChunks.push(Buffer.from(chunk)); });
      child.stderr.on("data", (chunk) => { stderrChunks.push(Buffer.from(chunk)); });
    }

    child.once("error", (error) => { spawnError = error; });
    child.once("close", (code, signal) => {
      if (captureOutput) {
        stdout = Buffer.concat(stdoutChunks).toString("utf8");
        stderr = Buffer.concat(stderrChunks).toString("utf8");
      }
      if (spawnError) {
        spawnError.exitCode = code;
        spawnError.signal = signal;
        spawnError.stdout = stdout;
        spawnError.stderr = stderr;
        settle(reject, spawnError);
        return;
      }
      if (code === 0 && signal === null) {
        settle(resolve, { exitCode: 0, signal: null, stdout, stderr });
        return;
      }

      const termination = code === null ? `signal ${signal ?? "unknown"}` : `code ${code}`;
      const error = new Error(`${command} ${args.join(" ")} exited with ${termination}`);
      error.exitCode = code;
      error.signal = signal;
      error.stdout = stdout;
      error.stderr = stderr;
      settle(reject, error);
    });
  });
}

async function getGitProvenance() {
  try {
    const [commitResult, statusResult] = await Promise.all([
      run("git", ["rev-parse", "HEAD"], { captureOutput: true }),
      run("git", ["status", "--porcelain"], { captureOutput: true }),
    ]);
    return {
      available: true,
      commit: commitResult.stdout.trim(),
      dirty: Boolean(statusResult.stdout.trim()),
      reason: null,
    };
  } catch (error) {
    const reason = error.stderr?.trim().split(/\r?\n/).slice(-1)[0] ?? error.message;
    return {
      available: false,
      commit: null,
      dirty: null,
      reason,
    };
  }
}

function buildManifest(entries) {
  return {
    algorithm: "sha256",
    sha256: sha256(JSON.stringify(entries)),
    fileCount: entries.length,
    totalBytes: entries.reduce((total, entry) => total + entry.size, 0),
    entries,
  };
}

async function hashPaths(root, relativePaths) {
  const entries = [];

  async function visit(relativePath) {
    const absolutePath = path.join(root, relativePath);
    const pathStats = await lstat(absolutePath);

    if (pathStats.isDirectory()) {
      const directoryEntries = await readdir(absolutePath, { withFileTypes: true });
      directoryEntries.sort((left, right) => compareText(left.name, right.name));
      for (const entry of directoryEntries) {
        await visit(path.join(relativePath, entry.name));
      }
      return;
    }
    if (!pathStats.isFile()) throw new Error(`unsupported manifest entry: ${relativePath}`);

    const contents = await readFile(absolutePath);
    entries.push({
      path: toPortablePath(relativePath),
      size: contents.byteLength,
      sha256: sha256(contents),
    });
  }

  for (const relativePath of [...relativePaths].sort(compareText)) {
    await visit(relativePath);
  }
  entries.sort((left, right) => compareText(left.path, right.path));
  return buildManifest(entries);
}

async function hashDirectory(root) {
  const directoryEntries = await readdir(root, { withFileTypes: true });
  const relativePaths = directoryEntries.map((entry) => entry.name);
  return hashPaths(root, relativePaths);
}

function summarizeManifest(manifest, manifestPath, manifestSha256) {
  return {
    algorithm: manifest.algorithm,
    sha256: manifest.sha256,
    fileCount: manifest.fileCount,
    totalBytes: manifest.totalBytes,
    manifestPath: toPortablePath(manifestPath),
    manifestSha256,
  };
}

function assertSameManifest(expected, actual, label) {
  if (
    expected.sha256 !== actual.sha256
    || expected.fileCount !== actual.fileCount
    || expected.totalBytes !== actual.totalBytes
    || stableStringify(expected.entries) !== stableStringify(actual.entries)
  ) {
    throw new Error(`${label} manifest does not match the audited artifact`);
  }
}

async function waitForCurrentBuild(url, expectedHtmlHash) {
  const deadline = Date.now() + 15_000;
  let lastError;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const servedHtmlHash = sha256(await response.text());
      if (servedHtmlHash !== expectedHtmlHash) {
        throw new Error("preview HTML does not match the immutable audit build");
      }

      return;
    } catch (error) {
      lastError = error;
    }
    await delay(250);
  }

  throw new Error(`Preview server did not serve the current build at ${url}: ${lastError?.message ?? "unknown error"}`);
}

function assertFiniteNumber(value, label, { min = -Infinity, max = Infinity } = {}) {
  if (!Number.isFinite(value) || value < min || value > max) {
    throw new Error(`invalid Lighthouse value for ${label}`);
  }
  return value;
}

function assertFiniteMetric(report, auditId) {
  return assertFiniteNumber(report.audits?.[auditId]?.numericValue, auditId);
}

function getEffectiveProfile(report) {
  const settings = report.configSettings ?? {};
  const screenEmulation = settings.screenEmulation ?? {};
  const throttling = settings.throttling ?? {};

  return {
    formFactor: settings.formFactor,
    throttlingMethod: settings.throttlingMethod,
    screenEmulation: {
      mobile: screenEmulation.mobile,
      width: screenEmulation.width,
      height: screenEmulation.height,
      deviceScaleFactor: screenEmulation.deviceScaleFactor,
      disabled: screenEmulation.disabled,
    },
    throttling: {
      rttMs: throttling.rttMs,
      throughputKbps: throttling.throughputKbps,
      requestLatencyMs: throttling.requestLatencyMs,
      downloadThroughputKbps: throttling.downloadThroughputKbps,
      uploadThroughputKbps: throttling.uploadThroughputKbps,
      cpuSlowdownMultiplier: throttling.cpuSlowdownMultiplier,
    },
  };
}

function assertExpectedProfile(profile, audit, reportPath) {
  for (const key of ["width", "height", "deviceScaleFactor"]) {
    assertFiniteNumber(profile.screenEmulation[key], `screenEmulation.${key}`, { min: 0 });
  }
  for (const [key, value] of Object.entries(profile.throttling)) {
    assertFiniteNumber(value, `throttling.${key}`, { min: 0 });
  }

  if (JSON.stringify(profile) !== JSON.stringify(audit.expectedProfile)) {
    throw new Error(
      `${reportPath} used an unexpected Lighthouse profile: `
      + `${JSON.stringify(profile)}; expected ${JSON.stringify(audit.expectedProfile)}`,
    );
  }
}

function assertReportShape(report, audit, reportPath) {
  for (const categoryId of ["performance", "accessibility", "best-practices", "seo"]) {
    assertFiniteNumber(report.categories?.[categoryId]?.score, `${categoryId} score`, { min: 0, max: 1 });
  }

  for (const auditId of [
    "first-contentful-paint",
    "largest-contentful-paint",
    "speed-index",
    "total-blocking-time",
    "cumulative-layout-shift",
  ]) {
    assertFiniteMetric(report, auditId);
  }

  const effectiveProfile = getEffectiveProfile(report);
  assertExpectedProfile(effectiveProfile, audit, reportPath);
  if (stableStringify(report.configSettings) !== stableStringify(audit.expectedConfig)) {
    throw new Error(`${reportPath} resolved to an unexpected complete Lighthouse config`);
  }
  if (typeof report.lighthouseVersion !== "string" || !report.lighthouseVersion) throw new Error(`${reportPath} has no Lighthouse version`);
  if (typeof report.environment?.hostUserAgent !== "string" || !report.environment.hostUserAgent) throw new Error(`${reportPath} has no Chrome user agent`);
  if (typeof report.environment?.networkUserAgent !== "string" || !report.environment.networkUserAgent) throw new Error(`${reportPath} has no network user agent`);
  assertFiniteNumber(report.environment?.benchmarkIndex, "benchmarkIndex", { min: 0 });

  const diagnostics = report.audits?.diagnostics?.details?.items?.[0];
  if (!diagnostics) throw new Error(`${reportPath} has no diagnostics`);
  for (const key of ["numRequests", "totalByteWeight", "totalTaskTime", "numTasksOver50ms"]) {
    assertFiniteNumber(diagnostics[key], `diagnostics.${key}`, { min: 0 });
  }
  if (!Array.isArray(report.audits?.["network-requests"]?.details?.items)) throw new Error(`${reportPath} has no network request table`);
  return effectiveProfile;
}

async function readFreshReport(reportPath, startedAt, url, audit) {
  const [rawReport, reportStats] = await Promise.all([
    readFile(reportPath, "utf8"),
    stat(reportPath),
  ]);
  const report = JSON.parse(rawReport);
  const fetchTime = Date.parse(report.fetchTime);

  if (reportStats.mtimeMs + 1_000 < startedAt) throw new Error(`${reportPath} was not written by this audit run`);
  if (!Number.isFinite(fetchTime) || fetchTime + 1_000 < startedAt) throw new Error(`${reportPath} has a stale or invalid fetchTime`);
  if (report.requestedUrl !== url || report.finalUrl !== url) throw new Error(`${reportPath} audited an unexpected URL`);
  if (report.runtimeError) throw new Error(`${reportPath} contains a Lighthouse runtime error: ${report.runtimeError.message ?? "unknown error"}`);
  const effectiveProfile = assertReportShape(report, audit, reportPath);

  return {
    report,
    reportSha256: sha256(rawReport),
    effectiveProfile,
  };
}

function classifyKnownChromeProfileCleanupError(error, chromeTempDir) {
  const stderr = error?.stderr ?? "";
  if (error?.exitCode !== 1 || error?.signal) return null;

  const legacyCleanupMatches = [
    ...stderr.matchAll(/\bEPERM:\s*operation not permitted,\s*rm\s+['"]([^'"\r\n]+)['"]/gi),
  ];
  const permissionRuntimeMatches = [
    ...stderr.matchAll(/^Runtime error encountered:\s*EPERM,\s*Permission denied:\s*(.+?)\s+'([^'\r\n]+)'\s*$/gim),
  ];
  const permissionErrorMatches = [
    ...stderr.matchAll(/^Error:\s*EPERM,\s*Permission denied:\s*(.+?)\s+'([^'\r\n]+)'\s*$/gim),
  ];
  const inspectedCodeMatches = [
    ...stderr.matchAll(/^\s*code:\s*['"]EPERM['"],?\s*$/gim),
  ];
  const inspectedPathMatches = [
    ...stderr.matchAll(/^\s*path:\s*'((?:\\\\|\\'|[^'])+)',?\s*$/gim),
  ];
  const inspectedSyscallMatches = [
    ...stderr.matchAll(/^\s*syscall:\s*['"]rm['"],?\s*$/gim),
  ];

  let rawCleanupTarget;
  let signature;
  if (
    legacyCleanupMatches.length === 1
    && /Launcher\.destroyTmp/.test(stderr)
  ) {
    rawCleanupTarget = legacyCleanupMatches[0][1];
    signature = "launcher-destroy-tmp";
  } else if (
    legacyCleanupMatches.length === 0
    && permissionRuntimeMatches.length === 1
    && permissionErrorMatches.length === 1
    && permissionRuntimeMatches[0][1] === permissionRuntimeMatches[0][2]
    && permissionErrorMatches[0][1] === permissionErrorMatches[0][2]
    && permissionRuntimeMatches[0][1] === permissionErrorMatches[0][1]
    && /^\s*at rmSync \(node:fs:\d+:\d+\)\s*$/im.test(stderr)
    && /Launcher\.destroyTmp/.test(stderr)
    && /Launcher\.kill/.test(stderr)
    && /runLighthouse/.test(stderr)
    && /lighthouse[\\/]cli[\\/]index\.js:\d+:\d+/i.test(stderr)
  ) {
    rawCleanupTarget = permissionRuntimeMatches[0][1];
    signature = "launcher-destroy-tmp-permission-denied";
  } else if (
    legacyCleanupMatches.length === 0
    && inspectedCodeMatches.length === 1
    && inspectedPathMatches.length === 1
    && inspectedSyscallMatches.length === 1
    && /lighthouse[\\/]cli[\\/]index\.js:\d+:\d+/i.test(stderr)
  ) {
    rawCleanupTarget = inspectedPathMatches[0][1]
      .replace(/\\\\/g, "\\")
      .replace(/\\'/g, "'");
    signature = "node-inspect-cli-cleanup";
  } else {
    return null;
  }

  const allowedEpermLinePatterns = [
    /^\s*code:\s*['"]EPERM['"],?\s*$/i,
    /^Runtime error encountered:\s*EPERM,\s*Permission denied:/i,
    /^Error:\s*EPERM,\s*Permission denied:/i,
    /\bEPERM:\s*operation not permitted,\s*rm\s+['"]/i,
  ];
  const epermLines = stderr.split(/\r?\n/).filter((line) => /\bEPERM\b/i.test(line));
  if (
    epermLines.length === 0
    || epermLines.some((line) => !allowedEpermLinePatterns.some((pattern) => pattern.test(line)))
  ) {
    return null;
  }

  const normalizedCleanupTarget = rawCleanupTarget.startsWith("\\\\?\\")
    ? rawCleanupTarget.slice(4)
    : rawCleanupTarget;
  const cleanupTarget = path.resolve(normalizedCleanupTarget);
  const relativeTarget = path.relative(path.resolve(chromeTempDir), cleanupTarget);
  if (!/^lighthouse\.\d+$/i.test(relativeTarget)) return null;

  return {
    code: "chrome-profile-cleanup-eperm-rm",
    signature,
    syscall: "rm",
    targetRelativeToRunProfileRoot: toPortablePath(relativeTarget),
  };
}

function getLcpNode(report) {
  const items = report.audits?.["lcp-breakdown-insight"]?.details?.items ?? [];
  const node = items.find((item) => item.type === "node");
  return node ? { selector: node.selector, nodeLabel: node.nodeLabel } : null;
}

function getProfileConditions(audit, report) {
  return {
    cliArgs: audit.cliArgs,
    commonCliArgs: LIGHTHOUSE_COMMON_ARGS,
    chromeFlags: CHROME_FLAGS,
    resolvedConfig: report.configSettings,
  };
}

function summarizeAudit({
  audit,
  archiveReportPath,
  archiveConditionPath,
  report,
  reportSha256,
  effectiveProfile,
  cliExitCode,
  harnessWarnings,
  acceptedNonzeroEvidence,
}) {
  const diagnostics = report.audits.diagnostics.details.items[0];
  const requests = report.audits["network-requests"].details.items;
  const threeRequest = requests.find((request) => /\/assets\/three-[^/]+\.js(?:\?|$)/.test(request.url));
  const profileConditions = getProfileConditions(audit, report);
  const profileFingerprint = sha256(stableStringify(profileConditions));
  const environmentIdentity = {
    nodeVersion: process.version,
    host: STABLE_HOST_IDENTITY,
    lighthouseVersion: report.lighthouseVersion,
    chromeUserAgent: report.environment.hostUserAgent,
    networkUserAgent: report.environment.networkUserAgent,
    benchmarkIndex: report.environment.benchmarkIndex,
  };
  const environmentFingerprint = sha256(stableStringify(environmentIdentity));
  const comparabilityFingerprint = sha256(stableStringify({
    profileFingerprint,
    environmentFingerprint,
  }));

  return {
    id: audit.id,
    sampleCount: 1,
    latestReportPath: toPortablePath(audit.latestReportPath),
    archiveReportPath: toPortablePath(archiveReportPath),
    archiveConditionPath: toPortablePath(archiveConditionPath),
    reportSha256,
    fetchTime: report.fetchTime,
    lighthouseVersion: report.lighthouseVersion,
    chromeUserAgent: report.environment.hostUserAgent,
    benchmarkIndex: report.environment.benchmarkIndex,
    formFactor: report.configSettings.formFactor,
    throttlingMethod: report.configSettings.throttlingMethod,
    throttling: report.configSettings.throttling,
    screenEmulation: report.configSettings.screenEmulation,
    effectiveProfile,
    profileFingerprint,
    environmentFingerprint,
    comparabilityFingerprint,
    cliExitCode,
    cli: {
      exitCode: cliExitCode,
      signal: acceptedNonzeroEvidence?.signal ?? null,
      acceptedNonzero: Boolean(acceptedNonzeroEvidence),
      transcriptPath: acceptedNonzeroEvidence?.transcriptPath ?? null,
      transcriptSha256: acceptedNonzeroEvidence?.transcriptSha256 ?? null,
      stdoutSha256: acceptedNonzeroEvidence?.stdoutSha256 ?? null,
      stderrSha256: acceptedNonzeroEvidence?.stderrSha256 ?? null,
      classification: acceptedNonzeroEvidence?.classification ?? null,
    },
    harnessWarnings,
    scores: {
      performance: Math.round(report.categories.performance.score * 100),
      accessibility: Math.round(report.categories.accessibility.score * 100),
      bestPractices: Math.round(report.categories["best-practices"].score * 100),
      seo: Math.round(report.categories.seo.score * 100),
    },
    metrics: {
      fcpMs: assertFiniteMetric(report, "first-contentful-paint"),
      lcpMs: assertFiniteMetric(report, "largest-contentful-paint"),
      speedIndexMs: assertFiniteMetric(report, "speed-index"),
      tbtMs: assertFiniteMetric(report, "total-blocking-time"),
      cls: assertFiniteMetric(report, "cumulative-layout-shift"),
    },
    lcpNode: getLcpNode(report),
    diagnostics: {
      requestCount: diagnostics.numRequests,
      totalTransferBytes: diagnostics.totalByteWeight,
      mainThreadTaskTimeMs: diagnostics.totalTaskTime,
      tasksOver50Ms: diagnostics.numTasksOver50ms,
      threeRequested: Boolean(threeRequest),
      threeTransferBytes: threeRequest?.transferSize ?? 0,
      threeResourceBytes: threeRequest?.resourceSize ?? 0,
    },
    runWarnings: report.runWarnings ?? [],
  };
}

async function runAudit(audit, { archiveDir, runRoot, stagingReportDir, url }) {
  const chromeTempDir = path.join(runRoot, `chrome-${audit.id}`);
  const stagedReportPath = path.join(stagingReportDir, audit.archiveFileName);
  const archiveReportPath = path.join(archiveDir, audit.archiveFileName);
  const archiveConditionPath = path.join(archiveDir, `conditions.${audit.id}.json`);
  const archiveCliTranscriptPath = path.join(archiveDir, `cli.${audit.id}.json`);
  await mkdir(chromeTempDir, { recursive: true });

  const startedAt = Date.now();
  const cliArgs = [
    "./node_modules/lighthouse/cli/index.js",
    url,
    ...audit.cliArgs,
    `--chrome-flags=${CHROME_FLAGS.join(" ")}`,
    `--output-path=${stagedReportPath}`,
    ...LIGHTHOUSE_COMMON_ARGS,
  ];
  let cliError;
  let cliResult;

  try {
    cliResult = await run(process.execPath, cliArgs, {
      captureOutput: true,
      env: {
        TEMP: chromeTempDir,
        TMP: chromeTempDir,
        TMPDIR: chromeTempDir,
      },
    });
  } catch (error) {
    cliError = error;
  }

  let validatedReport;
  try {
    validatedReport = await readFreshReport(stagedReportPath, startedAt, url, audit);
  } catch (validationError) {
    if (cliError) {
      const diagnostic = cliError.stderr?.trim().split(/\r?\n/).slice(-8).join("\n");
      throw new Error(
        `${cliError.message}; no valid fresh report was produced: ${validationError.message}`
        + (diagnostic ? `\n${diagnostic}` : ""),
      );
    }
    throw validationError;
  }

  const harnessWarnings = [];
  let cliTranscript;
  let acceptedNonzeroEvidence;
  if (cliError) {
    const classification = classifyKnownChromeProfileCleanupError(cliError, chromeTempDir);
    if (!classification) {
      const diagnostic = cliError.stderr?.trim().split(/\r?\n/).slice(-8).join("\n");
      throw new Error(`${cliError.message}\n${diagnostic ?? "unexpected Lighthouse CLI failure"}`);
    }
    const stdout = cliError.stdout ?? "";
    const stderr = cliError.stderr ?? "";
    cliTranscript = {
      schemaVersion: 1,
      id: audit.id,
      command: process.execPath,
      args: cliArgs,
      exitCode: cliError.exitCode,
      signal: cliError.signal ?? null,
      acceptedClassification: classification,
      stdout,
      stderr,
      stdoutSha256: sha256(stdout),
      stderrSha256: sha256(stderr),
    };
    const cliTranscriptSha256 = sha256(formatJson(cliTranscript));
    acceptedNonzeroEvidence = {
      signal: cliTranscript.signal,
      transcriptPath: toPortablePath(archiveCliTranscriptPath),
      transcriptSha256: cliTranscriptSha256,
      stdoutSha256: cliTranscript.stdoutSha256,
      stderrSha256: cliTranscript.stderrSha256,
      classification,
    };
    harnessWarnings.push("Chrome profile cleanup returned EPERM after a fresh, runtime-error-free report was written.");
    console.warn(`Lighthouse ${audit.id}: validated report retained after known Chrome profile cleanup EPERM.`);
  }

  console.log(`Lighthouse ${audit.id} staged at ${stagedReportPath}`);
  const summary = summarizeAudit({
    audit,
    archiveReportPath,
    archiveConditionPath,
    ...validatedReport,
    cliExitCode: cliError?.exitCode ?? cliResult.exitCode,
    harnessWarnings,
    acceptedNonzeroEvidence,
  });
  const conditions = {
    schemaVersion: 1,
    id: audit.id,
    profile: getProfileConditions(audit, validatedReport.report),
    environment: {
      nodeVersion: process.version,
      platform: process.platform,
      architecture: process.arch,
      stableHostIdentity: STABLE_HOST_IDENTITY,
      lighthouseVersion: validatedReport.report.lighthouseVersion,
      hostUserAgent: validatedReport.report.environment.hostUserAgent,
      networkUserAgent: validatedReport.report.environment.networkUserAgent,
      benchmarkIndex: validatedReport.report.environment.benchmarkIndex,
      credits: validatedReport.report.environment.credits ?? {},
    },
    profileFingerprint: summary.profileFingerprint,
    environmentFingerprint: summary.environmentFingerprint,
    comparabilityFingerprint: summary.comparabilityFingerprint,
  };
  summary.conditionSha256 = sha256(formatJson(conditions));

  return {
    stagedReportPath,
    summary,
    conditions,
    cliTranscript,
  };
}

function parseAuditLockOwner(raw, lockPath = LOCK_PATH) {
  let owner;
  try {
    owner = JSON.parse(raw);
  } catch {
    throw new Error(`${lockPath} contains malformed owner metadata and remains blocking`);
  }

  const validToken = typeof owner?.token === "string"
    && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(owner.token);
  const validPid = Number.isSafeInteger(owner?.pid) && owner.pid > 0 && owner.pid <= 2_147_483_647;
  const validRunId = typeof owner?.runId === "string"
    && /^\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}-\d{3}Z$/.test(owner.runId);
  const validStartedAt = typeof owner?.startedAt === "string"
    && Number.isFinite(Date.parse(owner.startedAt))
    && new Date(owner.startedAt).toISOString() === owner.startedAt;
  if (!validToken || !validPid || !validRunId || !validStartedAt) {
    throw new Error(`${lockPath} contains unknown owner metadata and remains blocking`);
  }
  return owner;
}

async function readAuditLockOwner(lockPath = LOCK_PATH) {
  const raw = await readFile(lockPath, "utf8");
  return { raw, owner: parseAuditLockOwner(raw, lockPath) };
}

function inspectPidLiveness(pid) {
  try {
    process.kill(pid, 0);
    return { state: "alive", reason: null };
  } catch (error) {
    if (error.code === "ESRCH") return { state: "dead", reason: "ESRCH" };
    return { state: "unknown", reason: error.code ?? error.message };
  }
}

async function restoreQuarantinedLock(quarantinePath, raw) {
  let handle;
  try {
    handle = await open(LOCK_PATH, "wx");
  } catch (error) {
    if (error.code === "EEXIST") {
      throw new Error(`Could not restore ${quarantinePath}: ${LOCK_PATH} is owned by another audit`);
    }
    throw error;
  }

  try {
    await handle.writeFile(raw, "utf8");
    await handle.sync();
  } finally {
    await handle.close().catch(() => {});
  }
  await rmWithRetry(quarantinePath, { force: true });
}

async function quarantineLockForToken(expectedToken, reason) {
  const quarantinePath = `${LOCK_PATH}.${reason}-${expectedToken}-${randomUUID()}`;
  try {
    await renameWithRetry(LOCK_PATH, quarantinePath);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }

  const raw = await readFile(quarantinePath, "utf8");
  let quarantinedOwner;
  try {
    quarantinedOwner = parseAuditLockOwner(raw, quarantinePath);
  } catch (metadataError) {
    try {
      await restoreQuarantinedLock(quarantinePath, raw);
    } catch (restoreError) {
      throw new AggregateError([metadataError, restoreError], "Lock quarantine metadata changed and restoration failed");
    }
    throw metadataError;
  }

  if (quarantinedOwner.token !== expectedToken) {
    const ownershipError = new Error(
      `Lock ownership changed during quarantine; expected ${expectedToken}, found ${quarantinedOwner.token}`,
    );
    try {
      await restoreQuarantinedLock(quarantinePath, raw);
    } catch (restoreError) {
      throw new AggregateError([ownershipError, restoreError], "Lock ownership changed and restoration failed");
    }
    throw ownershipError;
  }

  return { path: quarantinePath, raw, owner: quarantinedOwner };
}

async function acquireAuditLock(runId) {
  const owner = {
    token: randomUUID(),
    pid: process.pid,
    runId,
    startedAt: new Date().toISOString(),
  };
  let handle;

  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      handle = await open(LOCK_PATH, "wx");
      break;
    } catch (error) {
      if (error.code !== "EEXIST") throw error;

      let existing;
      try {
        existing = await readAuditLockOwner();
      } catch (ownerError) {
        if (ownerError.code === "ENOENT") {
          await delay(25 * (attempt + 1));
          continue;
        }
        throw ownerError;
      }

      const liveness = inspectPidLiveness(existing.owner.pid);
      if (liveness.state !== "dead") {
        const livenessDetail = liveness.state === "unknown" ? `; PID state unknown: ${liveness.reason}` : "";
        throw new Error(
          `Another Lighthouse audit holds ${LOCK_PATH}: ${JSON.stringify(existing.owner)}${livenessDetail}`,
        );
      }

      const quarantined = await quarantineLockForToken(existing.owner.token, "stale");
      if (!quarantined) {
        await delay(25 * (attempt + 1));
        continue;
      }
      try {
        await rmWithRetry(quarantined.path, { force: true });
      } catch (cleanupError) {
        try {
          await restoreQuarantinedLock(quarantined.path, quarantined.raw);
        } catch (restoreError) {
          throw new AggregateError(
            [cleanupError, restoreError],
            "Dead Lighthouse lock cleanup and safe restoration both failed",
          );
        }
        throw cleanupError;
      }
      console.warn(`Recovered dead Lighthouse audit lock for PID ${existing.owner.pid}.`);
    }
  }

  if (!handle) throw new Error(`Could not acquire ${LOCK_PATH} after bounded stale-lock recovery attempts`);

  try {
    await handle.writeFile(`${JSON.stringify(owner, null, 2)}\n`, "utf8");
    await handle.sync();
    return { handle, owner };
  } catch (error) {
    await handle.close().catch(() => {});
    try {
      const existing = await readAuditLockOwner();
      if (existing.owner.token === owner.token) {
        const quarantined = await quarantineLockForToken(owner.token, "failed-acquire");
        if (quarantined) await rmWithRetry(quarantined.path, { force: true });
      }
    } catch {
      // Unknown or malformed owner metadata stays blocking rather than risking another owner's lock.
    }
    throw error;
  }
}

async function releaseAuditLock(lock) {
  if (!lock) return;
  await lock.handle.close().catch(() => {});

  try {
    const quarantined = await quarantineLockForToken(lock.owner.token, "released");
    if (quarantined) await rmWithRetry(quarantined.path, { force: true });
  } catch (error) {
    if (error.code !== "ENOENT") console.warn(`Lighthouse lock cleanup failed: ${error.message}`);
  }
}

function siblingTempPath(targetPath) {
  return path.join(
    path.dirname(targetPath),
    `.${path.basename(targetPath)}.${process.pid}.${randomUUID()}.tmp`,
  );
}

async function renameWithRetry(sourcePath, targetPath) {
  for (let attempt = 0; ; attempt += 1) {
    try {
      await rename(sourcePath, targetPath);
      return;
    } catch (error) {
      if (attempt >= 8 || !["EPERM", "EACCES", "EBUSY"].includes(error.code)) throw error;
      await delay(50 * (2 ** attempt));
    }
  }
}

async function rmWithRetry(targetPath, options = {}, maxAttempts = 6) {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    try {
      await rm(targetPath, options);
      return;
    } catch (error) {
      if (error.code === "ENOENT") return;
      const retryable = ["EPERM", "EACCES", "EBUSY", "ENOTEMPTY"].includes(error.code);
      if (!retryable || attempt === maxAttempts - 1) throw error;
      await delay(50 * (2 ** attempt));
    }
  }
}

async function atomicWriteFile(targetPath, contents) {
  const temporaryPath = siblingTempPath(targetPath);
  try {
    const handle = await open(temporaryPath, "wx");
    try {
      await handle.writeFile(contents);
      await handle.sync();
    } finally {
      await handle.close();
    }
    await renameWithRetry(temporaryPath, targetPath);
  } finally {
    await rm(temporaryPath, { force: true }).catch(() => {});
  }
}

async function snapshotCanonicalFile(targetPath) {
  try {
    const contents = await readFile(targetPath);
    return {
      targetPath,
      existed: true,
      contents,
      sha256: sha256(contents),
    };
  } catch (error) {
    if (error.code === "ENOENT") {
      return { targetPath, existed: false, contents: null, sha256: null };
    }
    throw error;
  }
}

async function restoreCanonicalSnapshots(snapshots) {
  const summarySnapshot = snapshots.find((snapshot) => snapshot.targetPath === SUMMARY_PATH);
  const restoreOrder = [
    ...snapshots.filter((snapshot) => snapshot.targetPath !== SUMMARY_PATH),
    ...(summarySnapshot ? [summarySnapshot] : []),
  ];

  for (const snapshot of restoreOrder) {
    if (!snapshot.existed) {
      await rmWithRetry(snapshot.targetPath, { force: true });
      continue;
    }

    await atomicWriteFile(snapshot.targetPath, snapshot.contents);
    const restoredSha256 = sha256(await readFile(snapshot.targetPath));
    if (restoredSha256 !== snapshot.sha256) {
      throw new Error(`rollback hash mismatch for ${snapshot.targetPath}`);
    }
  }
}

async function atomicCopyFile(sourcePath, targetPath, expectedSha256) {
  const temporaryPath = siblingTempPath(targetPath);
  try {
    await copyFile(sourcePath, temporaryPath);
    const copiedSha256 = sha256(await readFile(temporaryPath));
    if (copiedSha256 !== expectedSha256) {
      throw new Error(`copied Lighthouse report hash mismatch for ${targetPath}`);
    }
    await renameWithRetry(temporaryPath, targetPath);
  } finally {
    await rm(temporaryPath, { force: true }).catch(() => {});
  }
}

async function readHistory() {
  try {
    const history = JSON.parse(await readFile(HISTORY_PATH, "utf8"));
    if (!Array.isArray(history)) throw new Error(`${HISTORY_PATH} must contain an array`);
    return history;
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function publishRun({
  archiveDir,
  auditResults,
  summary,
  artifactManifest,
  sourceManifest,
  immutableDist,
}) {
  const archiveCommitPath = path.join(archiveDir, "archive-complete.json");
  let archiveCreated = false;
  let canonicalCommitted = false;
  let canonicalMutationStarted = false;
  let canonicalSnapshots;

  try {
    await mkdir(archiveDir);
    archiveCreated = true;

    for (const result of auditResults) {
      const audit = AUDITS.find((candidate) => candidate.id === result.summary.id);
      const stagedArchiveReport = path.join(archiveDir, audit.archiveFileName);
      await copyFile(result.stagedReportPath, stagedArchiveReport);
      const archiveReportSha256 = sha256(await readFile(stagedArchiveReport));
      if (archiveReportSha256 !== result.summary.reportSha256) {
        throw new Error(`archive report hash mismatch for ${audit.id}`);
      }
      const conditionsText = formatJson(result.conditions);
      if (sha256(conditionsText) !== result.summary.conditionSha256) {
        throw new Error(`condition manifest hash mismatch for ${audit.id}`);
      }
      await writeFile(
        path.join(archiveDir, `conditions.${audit.id}.json`),
        conditionsText,
        "utf8",
      );

      if (result.summary.cli.acceptedNonzero !== Boolean(result.cliTranscript)) {
        throw new Error(`accepted nonzero CLI evidence mismatch for ${audit.id}`);
      }
      if (result.cliTranscript) {
        const cliTranscriptText = formatJson(result.cliTranscript);
        if (sha256(cliTranscriptText) !== result.summary.cli.transcriptSha256) {
          throw new Error(`CLI transcript hash mismatch for ${audit.id}`);
        }
        if (
          sha256(result.cliTranscript.stdout) !== result.summary.cli.stdoutSha256
          || sha256(result.cliTranscript.stderr) !== result.summary.cli.stderrSha256
        ) {
          throw new Error(`CLI stream hash mismatch for ${audit.id}`);
        }
        await writeFile(
          path.join(archiveDir, `cli.${audit.id}.json`),
          cliTranscriptText,
          "utf8",
        );
      }
    }

    const stagedArtifactDir = path.join(archiveDir, "dist");
    await cp(immutableDist, stagedArtifactDir, { recursive: true, force: false, errorOnExist: true });
    const stagedArtifactManifest = await hashDirectory(stagedArtifactDir);
    assertSameManifest(artifactManifest, stagedArtifactManifest, "staged immutable dist");

    const artifactManifestText = formatJson(artifactManifest);
    const sourceManifestText = formatJson(sourceManifest);
    if (sha256(artifactManifestText) !== summary.artifact.manifestSha256) {
      throw new Error("artifact manifest hash mismatch before publication");
    }
    if (sha256(sourceManifestText) !== summary.source.manifestSha256) {
      throw new Error("source manifest hash mismatch before publication");
    }
    const archiveCommit = {
      schemaVersion: 1,
      runId: summary.runId,
      generatedAt: summary.generatedAt,
      artifactSha256: summary.artifact.sha256,
      sourceSha256: summary.source.sha256,
      audits: auditResults.map((result) => ({
        id: result.summary.id,
        reportSha256: result.summary.reportSha256,
        conditionSha256: result.summary.conditionSha256,
        cliTranscriptSha256: result.summary.cli.transcriptSha256,
      })),
    };
    const archiveCommitText = formatJson(archiveCommit);
    summary.archiveCommit = {
      path: toPortablePath(archiveCommitPath),
      sha256: sha256(archiveCommitText),
    };
    await Promise.all([
      writeFile(path.join(archiveDir, "artifact-manifest.json"), artifactManifestText, "utf8"),
      writeFile(path.join(archiveDir, "source-manifest.json"), sourceManifestText, "utf8"),
      writeFile(path.join(archiveDir, "summary.json"), formatJson(summary), "utf8"),
    ]);

    // Windows can refuse directory renames while newly copied artifacts are scanned.
    // The unique run directory becomes valid only when this final atomic marker exists.
    await atomicWriteFile(archiveCommitPath, archiveCommitText);
    const publishedCommitSha256 = sha256(await readFile(archiveCommitPath));
    if (publishedCommitSha256 !== summary.archiveCommit.sha256) {
      throw new Error("archive completion marker hash mismatch");
    }
    const archivedArtifactManifest = await hashDirectory(path.join(archiveDir, "dist"));
    assertSameManifest(artifactManifest, archivedArtifactManifest, "archived immutable dist");
    for (const result of auditResults) {
      const audit = AUDITS.find((candidate) => candidate.id === result.summary.id);
      const archivedReportSha256 = sha256(await readFile(path.join(archiveDir, audit.archiveFileName)));
      if (archivedReportSha256 !== result.summary.reportSha256) {
        throw new Error(`published archive report hash mismatch for ${audit.id}`);
      }
      const archivedConditionSha256 = sha256(
        await readFile(path.join(archiveDir, `conditions.${audit.id}.json`)),
      );
      if (archivedConditionSha256 !== result.summary.conditionSha256) {
        throw new Error(`published condition hash mismatch for ${audit.id}`);
      }
      if (result.cliTranscript) {
        const archivedTranscriptSha256 = sha256(
          await readFile(path.join(archiveDir, `cli.${audit.id}.json`)),
        );
        if (archivedTranscriptSha256 !== result.summary.cli.transcriptSha256) {
          throw new Error(`published CLI transcript hash mismatch for ${audit.id}`);
        }
      }
    }

    const canonicalPaths = [
      ...AUDITS.map((audit) => audit.latestReportPath),
      HISTORY_PATH,
      SUMMARY_PATH,
    ];
    canonicalSnapshots = await Promise.all(canonicalPaths.map(snapshotCanonicalFile));
    const history = await readHistory();
    history.push(summary);

    canonicalMutationStarted = true;
    for (const result of auditResults) {
      const audit = AUDITS.find((candidate) => candidate.id === result.summary.id);
      await atomicCopyFile(
        path.join(archiveDir, audit.archiveFileName),
        audit.latestReportPath,
        result.summary.reportSha256,
      );
    }

    await atomicWriteFile(HISTORY_PATH, formatJson(history.slice(-20)));

    // This single atomic pointer is authoritative. Canonical mirrors and history are restored if it cannot commit.
    await atomicWriteFile(SUMMARY_PATH, formatJson(summary));
    canonicalCommitted = true;
  } catch (error) {
    const failures = [error];
    if (canonicalSnapshots && canonicalMutationStarted && !canonicalCommitted) {
      try {
        await restoreCanonicalSnapshots(canonicalSnapshots);
      } catch (rollbackError) {
        failures.push(rollbackError);
      }
    }
    if (archiveCreated && !canonicalCommitted) {
      try {
        await rmWithRetry(archiveDir, { recursive: true, force: true });
      } catch (archiveCleanupError) {
        failures.push(archiveCleanupError);
      }
    }
    if (failures.length > 1) {
      throw new AggregateError(failures, "Lighthouse publication failed and rollback was incomplete");
    }
    throw error;
  }
}

async function main() {
  await Promise.all([
    mkdir(REPORT_DIR, { recursive: true }),
    mkdir(ARCHIVE_ROOT, { recursive: true }),
    mkdir(LIGHTHOUSE_TMP_ROOT, { recursive: true }),
  ]);

  const runStartedAt = new Date();
  const runId = runStartedAt.toISOString().replace(/[:.]/g, "-");
  const archiveDir = path.join(ARCHIVE_ROOT, runId);
  const buildRelevantInheritedEnvironment = captureBuildRelevantInheritedEnvironment();
  let auditLock;
  let runRoot;
  let previewServer;

  try {
    auditLock = await acquireAuditLock(runId);
    runRoot = await mkdtemp(path.join(LIGHTHOUSE_TMP_ROOT, "run-"));
    const immutableDist = path.join(runRoot, "dist");
    const stagingReportDir = path.join(runRoot, "reports");
    const sourceInputPathsBefore = await discoverSourceInputPaths();
    const [sourceBeforeBuild, gitProvenance, packageJsonRaw] = await Promise.all([
      hashPaths(".", sourceInputPathsBefore),
      getGitProvenance(),
      readFile("package.json", "utf8"),
    ]);
    const packageMetadata = JSON.parse(packageJsonRaw);

    await mkdir(stagingReportDir, { recursive: true });
    await run(process.execPath, ["./node_modules/vite/bin/vite.js", "build"], { env: BUILD_ENV });
    await run(process.execPath, ["scripts/scan-submission-output.mjs"]);
    await run(process.execPath, ["scripts/audit-pages-build.mjs"]);

    const distBeforeCopy = await hashDirectory("dist");
    await cp("dist", immutableDist, { recursive: true, force: true });
    const [distAfterCopy, immutableArtifactBeforeAudits] = await Promise.all([
      hashDirectory("dist"),
      hashDirectory(immutableDist),
    ]);
    if (
      distBeforeCopy.sha256 !== distAfterCopy.sha256
      || distAfterCopy.sha256 !== immutableArtifactBeforeAudits.sha256
    ) {
      throw new Error("dist changed while the immutable Lighthouse artifact was being captured");
    }

    Object.assign(process.env, BUILD_ENV);
    previewServer = await preview({
      logLevel: "warn",
      build: { outDir: immutableDist },
      preview: {
        host: HOST,
        port: 0,
        strictPort: false,
      },
    });
    const address = previewServer.httpServer.address();
    if (!address || typeof address === "string") throw new Error("Vite preview did not expose a TCP port");

    const url = `http://${HOST}:${address.port}/`;
    const immutableHtmlHash = sha256(await readFile(path.join(immutableDist, "index.html")));
    await waitForCurrentBuild(url, immutableHtmlHash);

    const auditResults = [];
    for (const audit of AUDITS) {
      auditResults.push(await runAudit(audit, { archiveDir, runRoot, stagingReportDir, url }));
    }

    await previewServer.close();
    previewServer = undefined;

    const sourceInputPathsAfter = await discoverSourceInputPaths();
    assertSamePathSet(sourceInputPathsBefore, sourceInputPathsAfter);
    const [sourceAfterAudit, immutableArtifactAfterAudits] = await Promise.all([
      hashPaths(".", sourceInputPathsAfter),
      hashDirectory(immutableDist),
    ]);
    if (sourceBeforeBuild.sha256 !== sourceAfterAudit.sha256) {
      throw new Error("build inputs changed during the Lighthouse run; no reports were published");
    }
    assertSameManifest(
      immutableArtifactBeforeAudits,
      immutableArtifactAfterAudits,
      "immutable dist after both Lighthouse audits",
    );

    const generatedAt = new Date().toISOString();
    const artifactManifestPath = path.join(archiveDir, "artifact-manifest.json");
    const archivedArtifactPath = path.join(archiveDir, "dist");
    const sourceManifestPath = path.join(archiveDir, "source-manifest.json");
    const artifactManifest = {
      schemaVersion: 1,
      kind: "submission-dist",
      runId,
      capturedBeforeAuditsAt: runStartedAt.toISOString(),
      verifiedAfterAuditsAt: generatedAt,
      archiveArtifactPath: toPortablePath(archivedArtifactPath),
      ...immutableArtifactAfterAudits,
    };
    const sourceManifest = {
      schemaVersion: 1,
      kind: "vite-build-inputs",
      runId,
      capturedBeforeBuildAt: runStartedAt.toISOString(),
      verifiedAfterAuditAt: generatedAt,
      inputPaths: sourceInputPathsBefore,
      buildEnvironment: BUILD_ENV,
      buildRelevantInheritedEnvironment,
      harnessInjectedEnvironment: {
        CI: { valueSha256: sha256("true") },
      },
      git: gitProvenance,
      toolchain: {
        nodeVersion: process.version,
        platform: process.platform,
        architecture: process.arch,
        stableHostIdentity: STABLE_HOST_IDENTITY,
        packageManager: packageMetadata.packageManager ?? null,
        packageJsonSha256: sourceBeforeBuild.entries.find((entry) => entry.path === "package.json")?.sha256 ?? null,
        lockfileSha256: sourceBeforeBuild.entries.find((entry) => entry.path === "pnpm-lock.yaml")?.sha256 ?? null,
      },
      ...sourceBeforeBuild,
    };
    const summary = {
      generatedAt,
      runId,
      sampleCountPerProfile: 1,
      buildMode: BUILD_ENV.VITE_PORTFOLIO_MODE,
      basePath: BUILD_ENV.VITE_BASE_PATH,
      nodeVersion: process.version,
      artifact: {
        ...summarizeManifest(
          immutableArtifactAfterAudits,
          artifactManifestPath,
          sha256(formatJson(artifactManifest)),
        ),
        archiveArtifactPath: toPortablePath(archivedArtifactPath),
      },
      source: summarizeManifest(
        sourceBeforeBuild,
        sourceManifestPath,
        sha256(formatJson(sourceManifest)),
      ),
      archivePath: toPortablePath(archiveDir),
      auditedUrl: url,
      publication: {
        authoritativePointerPath: toPortablePath(SUMMARY_PATH),
        canonicalMirrorsAreDerived: true,
        protocol: "unique-archive-with-atomic-completion-marker, canonical-mirrors-with-rollback, atomic-summary-last",
      },
      audits: auditResults.map((result) => result.summary),
    };
    await publishRun({
      archiveDir,
      auditResults,
      summary,
      artifactManifest,
      sourceManifest,
      immutableDist,
    });

    for (const audit of summary.audits) {
      console.log(
        `${audit.id}: performance ${audit.scores.performance}, accessibility ${audit.scores.accessibility}, `
        + `LCP ${Math.round(audit.metrics.lcpMs)} ms, TBT ${Math.round(audit.metrics.tbtMs)} ms, `
        + `transfer ${audit.diagnostics.totalTransferBytes} bytes`,
      );
    }
    console.log(`Lighthouse lineage summary written to ${SUMMARY_PATH}`);
    console.log(`Lighthouse raw run archived at ${archiveDir}`);
  } finally {
    try {
      if (previewServer) await previewServer.close();
    } catch (previewCleanupError) {
      console.warn(`Temporary Lighthouse preview could not be closed cleanly: ${previewCleanupError.message}`);
    }
    try {
      if (runRoot) await rmWithRetry(runRoot, { recursive: true, force: true });
    } catch (runCleanupError) {
      console.warn(`Temporary Lighthouse run directory could not be fully removed: ${runCleanupError.message}`);
    } finally {
      await releaseAuditLock(auditLock);
    }
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
