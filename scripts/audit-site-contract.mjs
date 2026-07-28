import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import {
  compatibilityAnchors,
  primaryNavigationItems,
  siteIdentity,
  topLevelSections,
} from "../src/config/site.js";
import { finalPortfolioLinks } from "../src/data/admission-evidence.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

const readText = (relativePath) =>
  readFileSync(path.join(root, relativePath), "utf8");

const escapeRegExp = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const readMetaContent = (html, attribute, value) => {
  const tag = html.match(
    new RegExp(`<meta\\s+[^>]*${attribute}=["']${escapeRegExp(value)}["'][^>]*>`, "iu"),
  )?.[0];
  return tag?.match(/\bcontent=["']([^"']*)["']/iu)?.[1] ?? null;
};

const readLinkHref = (html, rel) => {
  const tag = html.match(
    new RegExp(`<link\\s+[^>]*rel=["']${escapeRegExp(rel)}["'][^>]*>`, "iu"),
  )?.[0];
  return tag?.match(/\bhref=["']([^"']*)["']/iu)?.[1] ?? null;
};

const assertEqual = (label, actual, expected) => {
  if (actual !== expected) {
    errors.push(`${label} is ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)}`);
  }
};

const html = readText("index.html");
const llms = readText("public/llms.txt");
const socialPreview = readText("public/social-preview.svg");
const sourceText = [
  readText("src/App.jsx"),
  readText("src/components/ImmersiveHero.jsx"),
  readText("src/components/ResearchPositioning.jsx"),
  readText("src/data/portfolio.js"),
].join("\n");

assertEqual(
  "HTML language",
  html.match(/<html\s+[^>]*lang=["']([^"']+)["']/iu)?.[1] ?? null,
  siteIdentity.language,
);
assertEqual(
  "document title",
  html.match(/<title>([^<]+)<\/title>/iu)?.[1]?.trim() ?? null,
  siteIdentity.title,
);
assertEqual("description", readMetaContent(html, "name", "description"), siteIdentity.description);
assertEqual("author", readMetaContent(html, "name", "author"), siteIdentity.authorName);
assertEqual("canonical URL", readLinkHref(html, "canonical"), siteIdentity.canonicalUrl);
assertEqual("Open Graph locale", readMetaContent(html, "property", "og:locale"), siteIdentity.openGraphLocale);
assertEqual("Open Graph URL", readMetaContent(html, "property", "og:url"), siteIdentity.canonicalUrl);
assertEqual("Open Graph title", readMetaContent(html, "property", "og:title"), siteIdentity.title);
assertEqual("Open Graph description", readMetaContent(html, "property", "og:description"), siteIdentity.description);
assertEqual("Twitter title", readMetaContent(html, "name", "twitter:title"), siteIdentity.title);
assertEqual("Twitter description", readMetaContent(html, "name", "twitter:description"), siteIdentity.description);

const jsonLdSource = html.match(
  /<script\s+type=["']application\/ld\+json["']\s*>([\s\S]*?)<\/script>/iu,
)?.[1];
if (!jsonLdSource) {
  errors.push("index.html is missing JSON-LD");
} else {
  try {
    const jsonLd = JSON.parse(jsonLdSource);
    assertEqual("JSON-LD name", jsonLd.name, siteIdentity.title);
    assertEqual("JSON-LD URL", jsonLd.url, siteIdentity.canonicalUrl);
    assertEqual("JSON-LD description", jsonLd.description, siteIdentity.description);
    assertEqual("JSON-LD author", jsonLd.author?.name, siteIdentity.authorName);
    assertEqual("JSON-LD language", jsonLd.inLanguage, siteIdentity.language);
  } catch (error) {
    errors.push(`index.html JSON-LD is invalid: ${error.message}`);
  }
}

assertEqual(
  "llms.txt title",
  llms.match(/^#\s+(.+)$/mu)?.[1]?.trim() ?? null,
  siteIdentity.title,
);
const llmsLinks = [...llms.matchAll(/^- \[([^\]]+)\]\(\.\/#([^)]+)\)$/gmu)]
  .map((match) => ({ llmsLabel: match[1], id: match[2] }));
assertEqual("llms.txt section count", llmsLinks.length, topLevelSections.length);
topLevelSections.forEach((section, index) => {
  assertEqual(`llms.txt section ${index + 1} ID`, llmsLinks[index]?.id ?? null, section.id);
  assertEqual(`llms.txt section ${index + 1} label`, llmsLinks[index]?.llmsLabel ?? null, section.llmsLabel);
});

assertEqual(
  "social preview title",
  socialPreview.match(/<title(?:\s+[^>]*)?>([^<]+)<\/title>/iu)?.[1]?.trim() ?? null,
  siteIdentity.title,
);
assertEqual(
  "social preview width",
  socialPreview.match(/<svg\s+[^>]*width=["']([^"']+)["']/iu)?.[1] ?? null,
  "1200",
);
assertEqual(
  "social preview height",
  socialPreview.match(/<svg\s+[^>]*height=["']([^"']+)["']/iu)?.[1] ?? null,
  "630",
);

const sectionIds = new Set(topLevelSections.map((section) => section.id));
if (sectionIds.size !== topLevelSections.length) {
  errors.push("topLevelSections contains duplicate IDs");
}
for (const section of topLevelSections) {
  if (!new RegExp(`["']#?${escapeRegExp(section.id)}["']`, "u").test(sourceText)) {
    errors.push(`Top-level section #${section.id} is not represented in the render/data source`);
  }
}

const navigationTargets = primaryNavigationItems.map((item) => item.target);
if (new Set(navigationTargets).size !== navigationTargets.length) {
  errors.push("primaryNavigationItems contains duplicate targets");
}
for (const item of primaryNavigationItems) {
  if (!sectionIds.has(item.target.replace(/^#/, ""))) {
    errors.push(`Primary navigation target ${item.target} is not a top-level section`);
  }
}

for (const alias of compatibilityAnchors) {
  if (sectionIds.has(alias.id)) {
    errors.push(`Compatibility anchor #${alias.id} must not be counted as a top-level section`);
  }
  if (!sectionIds.has(alias.parentId)) {
    errors.push(`Compatibility anchor #${alias.id} has unknown parent #${alias.parentId}`);
  }
  if (!sourceText.includes(`"${alias.id}"`)) {
    errors.push(`Compatibility anchor #${alias.id} is missing from the render source`);
  }
}

assertEqual("portfolio contact URL", finalPortfolioLinks[0]?.href ?? null, siteIdentity.canonicalUrl);
assertEqual("repository contact URL", finalPortfolioLinks[1]?.href ?? null, siteIdentity.repositoryUrl);

for (const relativePath of ["public/favicon.svg", "public/social-preview.svg", "public/llms.txt", "public/robots.txt"]) {
  if (!existsSync(path.join(root, relativePath))) {
    errors.push(`Missing site identity asset: ${relativePath}`);
  }
}

if (errors.length) {
  console.error("Site contract audit failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Site contract audit passed: identity, canonical URLs, metadata, navigation, aliases, and 11-section IA are synchronized.");
