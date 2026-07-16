# Content Governance

This project uses one portfolio content system with two controlled output modes:

- `draft`: authoring mode. It can show internal build notes, readiness panels, replacement reminders, risk notes, and pre-submission checks.
- `submission`: formal review mode. It renders only public portfolio content and scans the generated output for construction-stage wording.

## Why This Architecture

The site should not be split into two unrelated websites because that would create content drift. It should also not rely on CSS hiding, because hidden text can still ship in HTML or JavaScript. Instead:

1. Public portfolio content lives in `src/data/portfolio.js`.
2. Internal build notes live in `src/data/portfolio.internal.js`.
3. Draft-only rendering lives in `src/draft/DraftModeEnabled.jsx`.
4. Submission builds resolve `#portfolio-draft` to `src/draft/DraftModeDisabled.jsx`, so internal panels are not imported.
5. `scripts/scan-submission-output.mjs` scans `dist/` after a submission build.

## Public Content Fields

Use `src/data/portfolio.js` for content that may appear in formal review:

- title, year, source, category, public status
- summary and value proposition
- problem awareness and target audience
- design goal, design process, technology and media
- outcome showcase
- diagrams, public media, captions, transcripts
- tools, roles, reflection, institute connections
- public links, credits, SEO title and description

Public content must not include authoring reminders or construction wording.

## Internal Build Notes

Use `src/data/portfolio.internal.js` for preparation material:

- missing materials
- replaceable assets
- sample copy reminders
- pre-submission checklist
- AI collaboration notes
- risk reminders
- hidden-from-submission reason
- content readiness notes

These notes are visible only in Draft Mode.

## Status Labels

Public-safe statuses:

- Completed / 已完成
- Prototype / 原型中
- In Progress / 整理中
- Research Proposal / 研究構想

Internal-only statuses:

- Missing Materials / 待補資料
- Hidden from Submission / 不進入送審版

## Commands

```powershell
pnpm run dev:draft
pnpm run build:draft
pnpm run dev:submission
pnpm run build:submission
pnpm run scan:submission
pnpm run check:submission
```

Use `pnpm run check:submission` before any formal review export.

## Forbidden Formal Output Terms

The submission scan fails if generated output contains construction-stage wording such as:

- 待補
- 可替換
- 範例
- 正式送審前
- placeholder / sample
- Content Readiness
- Internal Build Notes
- INTERNAL_TODO / INTERNAL_SAMPLE / INTERNAL_REPLACE
- PRE_SUBMISSION_CHECK / HIDE_FROM_SUBMISSION
- AI 協作備註
- 風險提醒
- 這裡保留
- 未來可放入
- 審查者
- 評審可以

If a project cannot be made public-safe, mark it as an internal note or hide it from submission instead of polishing around the issue.

