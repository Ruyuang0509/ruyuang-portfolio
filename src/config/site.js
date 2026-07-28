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
  { id: "sound-transition", llmsLabel: "轉向聲音的問題意識" },
  { id: "reviewer-path", llmsLabel: "證據導覽" },
  { id: "interactive-sound-learning", llmsLabel: "Web Audio 聲響證據" },
  { id: "pure-data-learning", llmsLabel: "Pure Data 學習紀錄" },
  { id: "research-positioning", llmsLabel: "申請階段研究構想" },
  { id: "selected-work", llmsLabel: "代表作品" },
  { id: "collaboration", llmsLabel: "專案與合作" },
  { id: "learning-roadmap", llmsLabel: "學習路線" },
  { id: "ai-workflow", llmsLabel: "AI／作者性" },
  { id: "contact", llmsLabel: "研究方向與連結" },
];

export const primaryNavigationItems = [
  { label: "問題意識", target: "#sound-transition" },
  { label: "Web Audio", target: "#interactive-sound-learning" },
  { label: "Pure Data", target: "#pure-data-learning" },
  { label: "研究構想", target: "#research-positioning" },
  { label: "代表作品", target: "#selected-work" },
  { label: "學習路線", target: "#learning-roadmap" },
];

export const compatibilityAnchors = [
  { id: "research-proposal", parentId: "research-positioning" },
];
