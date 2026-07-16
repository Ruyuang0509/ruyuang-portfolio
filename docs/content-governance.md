# Content Governance

This project uses one portfolio content system with two controlled output modes:

- `draft`: authoring mode. It can show internal build notes, readiness panels, replacement reminders, risk notes, and pre-submission checks.
- `submission`: formal review mode. It renders only public portfolio content and scans the generated output for construction-stage wording.

## Why This Architecture

The site should not be split into two unrelated websites because that would create content drift. It should also not rely on CSS hiding, because hidden text can still ship in HTML or JavaScript. Instead:

1. Public portfolio content lives in `src/data/portfolio.js`.
2. Hidden case text lives in `src/data/portfolio.hidden.js`; submission mode resolves `#portfolio-hidden` to an empty module.
3. Internal build notes live in `src/data/portfolio.internal.js`.
4. Draft-only rendering lives in `src/draft/DraftModeEnabled.jsx`.
5. Submission builds resolve `#portfolio-draft` to `src/draft/DraftModeDisabled.jsx`, so internal panels are not imported.
6. `scripts/submission-output-scanner.mjs` independently scans supported text files and the complete `dist/` inventory; the CLI and regression fixtures share that core.

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
- 佔位／佔位圖
- 尚未提供
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

It also rejects legacy branding and dead anchors, hidden case IDs and filenames,
restricted-media paths, local absolute paths, known sensitive source filenames,
and raw `.pbix` / spreadsheet / CSV / TSV exports. Binary media is checked by
relative path and filename only; it is never decoded as UTF-8 text.

Hidden cases must use an empty media state until real evidence is approved.
Do not keep placeholder binaries in `public/`: Vite publishes that directory in
both dev and build regardless of whether React references a file.
Submission dev uses a dedicated boundary middleware so missing
`/media/portfolio/*` files and all `/dist/*` dev URLs return 404 instead of the
SPA HTML fallback. Filesystem deny rules return 403 for restricted media,
reports, internal data, and the real hidden-case module.

If a project cannot be made public-safe, mark it as an internal note or hide it from submission instead of polishing around the issue.

