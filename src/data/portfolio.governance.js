const getValueAtPath = (entry, path) =>
  path.split(".").reduce((value, key) => (value == null ? undefined : value[key]), entry);

const hasUsefulValue = (value) => {
  if (Array.isArray(value)) return value.length > 0;
  if (value && typeof value === "object") return Object.keys(value).length > 0;
  return typeof value === "string" ? value.trim().length > 0 : Boolean(value);
};

export const portfolioContentChecklist = [
  {
    group: "作品身份",
    level: "required",
    paths: ["title", "year", "source", "category", "summary", "valueProposition"],
  },
  {
    group: "問題與對象",
    level: "required",
    paths: ["problemAwareness", "audience", "whatThisProves", "designGoal"],
  },
  {
    group: "流程與技術",
    level: "recommended",
    paths: ["designProcess", "technologyAndMedia", "outcomeShowcase"],
  },
  {
    group: "流程圖與架構圖",
    level: "recommended",
    appliesTo: "submission-visible",
    mode: "any",
    paths: ["diagrams", "workflow"],
  },
  {
    group: "媒體證據",
    level: "recommended",
    appliesTo: "submission-visible",
    mode: "any",
    paths: ["media.visualDrafts", "media.screenshots", "media.videos", "media.audio", "media.demos", "interactivePrototype"],
  },
  {
    group: "工具與角色",
    level: "required",
    paths: ["tools", "roles"],
  },
  {
    group: "測試與成效",
    level: "recommended",
    mode: "testingState",
    paths: ["testing.statusKey", "testing.status", "testing.plannedMethods"],
  },
  {
    group: "反思與深化",
    level: "required",
    paths: ["reflection.strengths", "reflection.limitations", "reflection.graduateDirection"],
  },
  {
    group: "本所連結",
    level: "required",
    paths: ["instituteConnections", "themeRationales"],
  },
  {
    group: "連結與協作",
    level: "optional",
    paths: ["links", "credits"],
  },
];
// Codex-Fix: Keep readiness requirements in a governance module used by draft tools and validators, not public rendering.

export const getProjectCompleteness = (project) => {
  const groups = portfolioContentChecklist.map((item) => {
    const applicable = item.appliesTo !== "submission-visible" || project.submissionVisibility !== "hidden";
    const presentCount = item.paths.filter((path) =>
      hasUsefulValue(getValueAtPath(project, path)) || project.metadataOmissions?.includes(path),
    ).length;
    const complete = applicable && (
      item.mode === "any"
        ? presentCount > 0
        : item.mode === "testingState"
          ? hasUsefulValue(project.testing?.statusKey) &&
            hasUsefulValue(project.testing?.status) &&
            (project.testing.statusKey === "notValidated"
              ? hasUsefulValue(project.testing.plannedMethods)
              : hasUsefulValue(project.testing.metrics) || hasUsefulValue(project.testing.insights))
          : presentCount === item.paths.length
    );

    return {
      ...item,
      applicable,
      presentCount,
      totalCount: item.paths.length,
      complete,
    };
  });

  const required = groups.filter((item) => item.level === "required" && item.applicable);
  const recommended = groups.filter((item) => item.level === "recommended" && item.applicable);

  return {
    groups,
    requiredComplete: required.every((item) => item.complete),
    recommendedComplete: recommended.every((item) => item.complete),
    requiredMissing: required.filter((item) => !item.complete).map((item) => item.group),
    recommendedMissing: recommended.filter((item) => !item.complete).map((item) => item.group),
  };
};

export const getEvidenceAvailability = (project) => [
  { label: "流程圖 / 工作流", available: project.diagrams?.length > 0 || project.workflow?.stages?.length > 0 },
  { label: "分鏡", available: project.storyboard?.frames?.length > 0 },
  { label: "視覺稿", available: project.media?.visualDrafts?.length > 0 },
  { label: "截圖", available: project.media?.screenshots?.length > 0 },
  { label: "影片", available: project.media?.videos?.length > 0 },
  { label: "聲音", available: project.media?.audio?.length > 0 },
  { label: "Demo", available: project.media?.demos?.length > 0 },
  { label: "測試", available: Boolean(project.testing) },
];
// Codex-Fix: Evidence availability is now a draft/readiness concern and can be excluded from submission builds.
