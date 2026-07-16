# 如願個人網站

研究所導向的個人作品集網站。

這個資料夾是未來工作的唯一 canonical project root。舊資料夾 `portfolio-nextgen`、`personal-portfolio-nextgen`、以及原始 Codex 任務資料夾都只作為參考或封存，不應直接編輯。

## Start Here

```powershell
pnpm install
pnpm run workspace:check
pnpm run audit:media
pnpm run audit:text
pnpm run audit:cjk
pnpm run content:check
pnpm run test:sound
pnpm run build:draft
pnpm run check:submission
```

package scripts 會透過 `scripts/run-node.ps1` 執行，所以 Windows/Codex shell 沒有全域 `node` 時，也會回退到 Codex bundled Node runtime。

## Stack

- Vite
- React 19 + JSX
- Motion for React
- React Three Fiber / Three.js
- Tailwind CSS v4
- GSAP 3.13 + ScrollTrigger
- Lenis

## Project Notes

- Canonical folder: `如願個人網站`
- npm package name: `ruyuan-personal-website`
- Local optimized media: `public/media/portfolio`
- Workspace notes: `docs/workspace-consolidation.md`
- Case-study authoring guide: `docs/content-authoring.md`
- Full portfolio work guide: `docs/adding-portfolio-work.md`
- Content governance: `docs/content-governance.md`
- Pre-submission checklist: `docs/pre-submission-checklist.md`
- Research synthesis: `docs/portfolio-display-research.md`
- Visual system notes: `docs/visual-system.md`
- Traditional Chinese visual system: `docs/chinese-visual-system.md`
- Current implementation handoff: `docs/CODEX_HANDOFF.md`
- Portfolio audit: `docs/PORTFOLIO_AUDIT.md`
- Content matrix: `docs/CONTENT_MATRIX.md`
- Product and technical documentation index: `docs/website/README.md`
- AI-assisted workflow evidence: `docs/ai-workflow/README.md`

The modular handoff under `docs/website/` is the durable product, content,
design, architecture, target-state, and gap-analysis source of truth. The
handoff records verified facts separately from inferred goals and stakeholder
decisions.

## Content Direction

每件作品應該能說清楚：

- 作品名稱、年份、課程或專案來源
- 問題意識與目標使用者
- 互動流程、系統架構、資訊架構
- 視覺稿、截圖、影片、聲音、互動 demo
- 使用工具與個人角色
- 使用者測試或學習成效
- 反思、限制與研究所深化方向
- 與 AI、互動媒體、聲響、沉浸式體驗、數位孿生、跨域創生的連結

## Draft / Submission Mode

- `pnpm run dev:draft`: 施工模式，會顯示內部備註與內容完整度。
- `pnpm run dev:submission`: 送審模式預覽，只渲染公開內容。
- `pnpm run check:submission`: 建置 submission、執行內建禁用詞掃描與
  GitHub Pages 路徑檢查。這是必要門檻，不是完整的公開邊界證明。
- 正式送審前仍須獨立檢查 `dist/`：hidden-only 媒體、施工措辭、
  `public/llms.txt`、`public/favicon.svg`、失效 anchor 與 restricted
  檔名都必須納入。已知限制與目前狀態見
  `docs/website/GAP_ANALYSIS.md`。
