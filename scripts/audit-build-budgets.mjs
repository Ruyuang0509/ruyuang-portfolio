import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = path.join(root, "dist");
const assetsRoot = path.join(distRoot, "assets");
const errors = [];
const limits = {
  entryRawBytes: 180 * 1024,
  stylesheetRawBytes: 45 * 1024,
  initialJsGzipBytes: 210 * 1024,
  lazyThreeFamilyRawBytes: 700 * 1024,
  lazyThreeFamilyGzipBytes: 185 * 1024,
  maxLazyChunkRawBytes: 500_000,
};

const html = readFileSync(path.join(distRoot, "index.html"), "utf8");
const assetNames = readdirSync(assetsRoot);
const getAttribute = (tag, name) => {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "i"));
  return match?.[1] ?? match?.[2];
};
const getAssetName = (value, extension) =>
  value?.replaceAll("\\", "/").match(new RegExp(`^(?:\\./)?assets/([^?#]+\\.${extension})(?:[?#].*)?$`, "i"))?.[1];
const scriptTags = [...html.matchAll(/<script\b[^>]*>/gi)].map((match) => match[0]);
const linkTags = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => match[0]);
const entryName = scriptTags
  .filter((tag) => getAttribute(tag, "type")?.toLowerCase() === "module")
  .map((tag) => getAssetName(getAttribute(tag, "src"), "js"))
  .find(Boolean);
const stylesheetName = linkTags
  .filter((tag) => getAttribute(tag, "rel")?.toLowerCase() === "stylesheet")
  .map((tag) => getAssetName(getAttribute(tag, "href"), "css"))
  .find(Boolean);
const preloadNames = linkTags
  .filter((tag) => getAttribute(tag, "rel")?.toLowerCase() === "modulepreload")
  .map((tag) => getAssetName(getAttribute(tag, "href"), "js"))
  .filter(Boolean);
const threeFamilyNames = assetNames.filter((name) => /^(?:three|r3f)-.+\.js$/.test(name));
const heroSceneNames = assetNames.filter((name) => /^HeroScene-.+\.js$/.test(name));
const javascriptNames = new Set(assetNames.filter((name) => name.endsWith(".js")));

const fileSize = (name) => statSync(path.join(assetsRoot, name)).size;
const gzipSize = (name) => gzipSync(readFileSync(path.join(assetsRoot, name))).length;
const sum = (values) => values.reduce((total, value) => total + value, 0);
const assertAtMost = (label, actual, limit) => {
  if (actual > limit) errors.push(`${label} is ${actual} bytes; budget is ${limit}`);
};
const collectChunkClosure = (rootNames, { includeDynamic = true } = {}) => {
  const closure = new Set();
  const pending = rootNames.filter(Boolean);

  while (pending.length) {
    const name = pending.pop();
    if (!javascriptNames.has(name) || closure.has(name)) continue;
    closure.add(name);

    const source = readFileSync(path.join(assetsRoot, name), "utf8");
    const importPatterns = [
      /\bfrom\s*["']\.\/([^"'?#]+\.js)["']/g,
      /\bimport\s*["']\.\/([^"'?#]+\.js)["']/g,
    ];
    if (includeDynamic) importPatterns.push(/\bimport\s*\(\s*["']\.\/([^"'?#]+\.js)["']/g);
    for (const importPattern of importPatterns) {
      for (const match of source.matchAll(importPattern)) pending.push(match[1]);
    }
  }

  return [...closure];
};

if (!entryName) errors.push("unable to resolve the built entry script from dist/index.html");
if (!stylesheetName) errors.push("unable to resolve the built stylesheet from dist/index.html");
if (!preloadNames.length) errors.push("dist/index.html has no initial modulepreload dependencies");
if (!threeFamilyNames.length) errors.push("no Three/R3F chunk was emitted");
if (heroSceneNames.length !== 1) errors.push(`expected one lazy HeroScene chunk; found ${heroSceneNames.length}`);

if (entryName) assertAtMost("entry script raw size", fileSize(entryName), limits.entryRawBytes);
if (stylesheetName) assertAtMost("stylesheet raw size", fileSize(stylesheetName), limits.stylesheetRawBytes);

const initialJsNames = collectChunkClosure([entryName, ...preloadNames], { includeDynamic: false }).sort();
const initialJsGzipBytes = sum(initialJsNames.map(gzipSize));
assertAtMost("initial JavaScript gzip total", initialJsGzipBytes, limits.initialJsGzipBytes);

const initialJsSet = new Set(initialJsNames);
const heroChunkClosure = collectChunkClosure(heroSceneNames, { includeDynamic: true });
const lazyThreeNames = heroChunkClosure.filter((name) => !initialJsSet.has(name)).sort();
const lazyThreeFamilyRawBytes = sum(lazyThreeNames.map(fileSize));
const lazyThreeFamilyGzipBytes = sum(lazyThreeNames.map(gzipSize));
assertAtMost("lazy 3D raw total", lazyThreeFamilyRawBytes, limits.lazyThreeFamilyRawBytes);
assertAtMost("lazy 3D gzip total", lazyThreeFamilyGzipBytes, limits.lazyThreeFamilyGzipBytes);
for (const name of lazyThreeNames) {
  assertAtMost(`lazy 3D chunk ${name}`, fileSize(name), limits.maxLazyChunkRawBytes);
}

const forbiddenPreloads = preloadNames.filter((name) => /^(?:HeroScene|three|r3f)-/.test(name));
if (forbiddenPreloads.length) {
  errors.push(`lazy 3D code entered initial modulepreload: ${forbiddenPreloads.join(", ")}`);
}

if (errors.length) {
  console.error("Build budget audit failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Build budget audit passed: initial JS gzip ${initialJsGzipBytes} bytes; `
  + `lazy 3D closure ${lazyThreeFamilyRawBytes} raw / ${lazyThreeFamilyGzipBytes} gzip bytes `
  + `(${lazyThreeNames.join(", ")}); `
  + `entry ${fileSize(entryName)} bytes; CSS ${fileSize(stylesheetName)} bytes.`,
);
