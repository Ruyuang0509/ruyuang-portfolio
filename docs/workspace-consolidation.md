# Workspace Consolidation

## Canonical Folder

`如願個人網站` is the canonical active project.

Older folders such as `portfolio-nextgen`, `personal-portfolio-nextgen`, and the original Codex task folder may still exist on the machine, but they are previous duplicate/scattered locations. Treat them as read-only comparison material unless the user explicitly asks otherwise.

## Why Consolidation Was Needed

Project files were previously spread across Codex default workspace folders and similarly named portfolio folders. Each new session had to rediscover which folder contained the latest media, Lighthouse scripts, performance work, and portfolio case-study structure. This folder now contains the durable source of truth plus scripts and documentation for future sessions.

## What Was Preserved

- Source code under `src`
- Local static assets under `public`
- Optimized media under `public/media/portfolio`
- Project scripts under `scripts`
- Documentation under `docs`
- Package/config/lock files
- `AGENTS.md`, `.gitignore`, `.project-identity.json`
- `scripts/run-node.ps1`, which keeps package scripts working in Windows/Codex shells where `node` is not exposed globally

## What Should Stay Out

- `node_modules`
- `dist`
- `.tmp`
- generated Lighthouse JSON reports
- unrelated Codex task folders
- stale remote-media code from old duplicate folders

## First Verification Sequence

Run these from `如願個人網站`:

```powershell
pnpm install
pnpm run workspace:check
pnpm run audit:media
pnpm run content:check
pnpm run build
```

Run Lighthouse only when a fresh performance report is needed:

```powershell
pnpm run audit:lighthouse
```

## Migration Policy

Use `portfolio-nextgen` or `personal-portfolio-nextgen` only as targeted comparison sources. Do not overwrite `如願個人網站` with them. Migrate individual improvements only after confirming they do not reintroduce remote media, stale dependencies, corrupted text, or lost performance work.
