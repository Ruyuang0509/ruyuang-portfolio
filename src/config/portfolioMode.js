const requestedMode = import.meta.env.VITE_PORTFOLIO_MODE;

export const PORTFOLIO_MODE = requestedMode === "submission" ? "submission" : "draft";
// Centralize draft/submission mode so portfolio governance is explicit and not implemented through CSS hiding.
