const requestedMode = import.meta.env.VITE_PORTFOLIO_MODE;

export const PORTFOLIO_MODE = requestedMode === "submission" ? "submission" : "draft";
export const IS_DRAFT_MODE = PORTFOLIO_MODE === "draft";
export const IS_SUBMISSION_MODE = PORTFOLIO_MODE === "submission";
// Codex-Fix: Centralize draft/submission mode so portfolio governance is explicit and not implemented through CSS hiding.
