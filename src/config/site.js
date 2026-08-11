export const siteIdentity = {
  title: "蕭智仁｜聲響、互動與數位學習作品集",
  description: "收錄 Web Audio 聲響互動原型、Pure Data 學習紀錄、影音與資料視覺化作品，以及混合多聲道監聽研究構想。",
  authorName: "蕭智仁",
  canonicalUrl: "https://ruyuang0509.github.io/ruyuang-portfolio/",
  repositoryUrl: "https://github.com/Ruyuang0509/ruyuang-portfolio",
  language: "zh-Hant-TW",
  openGraphLocale: "zh_TW",
};

export const topLevelSections = [
  { id: "top", llmsLabel: "首頁" },
  { id: "interactive-sound-learning", llmsLabel: "聲響原型" },
  { id: "project-index", llmsLabel: "作品索引" },
  { id: "sound-transition", llmsLabel: "問題意識" },
  { id: "research-positioning", llmsLabel: "研究構想" },
  { id: "collaboration", llmsLabel: "專案與合作" },
  { id: "learning-roadmap", llmsLabel: "學習路線" },
  { id: "ai-workflow", llmsLabel: "AI／作者性" },
  { id: "contact", llmsLabel: "聯絡" },
];

export const primaryNavigationItems = [
  { label: "聲響原型", target: "#interactive-sound-learning" },
  { label: "作品索引", target: "#project-index" },
  { label: "問題意識", target: "#sound-transition" },
  { label: "研究構想", target: "#research-positioning" },
  { label: "學習路線", target: "#learning-roadmap" },
  { label: "AI／作者性", target: "#ai-workflow" },
  { label: "聯絡", target: "#contact" },
];

export const compatibilityAnchors = [
  { id: "research-proposal", parentId: "research-positioning" },
  { id: "selected-work", parentId: "project-index" },
  { id: "gallery", parentId: "project-index" },
  { id: "reviewer-path", parentId: "project-index" },
];

export const workViewSlugs = [
  "interactive-sound-learning",
  "generative-interface-study",
  "data-visualization-cases",
  "learning-dashboard-analysis",
  "huaben-short-film",
  "pure-data-learning",
];

export const legacyWorkAnchorRedirects = [
  { anchorPrefix: "secondary-creation", slug: "huaben-short-film" },
  { anchorPrefix: "interactive-sound-learning", slug: "interactive-sound-learning" },
  { anchorPrefix: "generative-interface-study", slug: "generative-interface-study" },
  { anchorPrefix: "data-visualization-cases", slug: "data-visualization-cases" },
  { anchorPrefix: "learning-dashboard-analysis", slug: "learning-dashboard-analysis" },
  { anchorPrefix: "huaben-short-film", slug: "huaben-short-film" },
  { anchorPrefix: "secondary-creation", slug: "huaben-short-film" },
  { anchorPrefix: "pure-data-learning", slug: "pure-data-learning" },
];

export const getLegacyWorkSlug = (hash) => {
  const rawAnchor = hash?.startsWith("#") ? hash.slice(1) : hash;
  if (!rawAnchor || rawAnchor.startsWith("/")) return null;

  let anchorId = rawAnchor;
  try {
    anchorId = decodeURIComponent(rawAnchor);
  } catch {
    // Keep the raw anchor when it contains malformed escape sequences.
  }

  return legacyWorkAnchorRedirects.find(({ anchorPrefix }) => (
    anchorId === anchorPrefix || anchorId.startsWith(`${anchorPrefix}-`)
  ))?.slug ?? null;
};
