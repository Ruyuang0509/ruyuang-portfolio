# Visual System Notes

Updated: 2026-07-26

This site should feel like a calm, personal research portfolio, not a flashing demo reel. The document root stays warm ink; supporting case studies, collaboration, learning roadmap, AI／authorship and contact use section-scoped paper tokens, while a dedicated fixed viewport field carries the scroll-linked passage between dark and paper states. PR #5 changed public copy, labels, ARIA text and metadata; PR #6 added the 11-section admission IA, lazy evidence boundaries and Pure Data media. Neither change authorizes removing or flattening the approved motion system.

## 2026-07-26 Theme Reading-Surface Update

- `DataVisualizationSeries` keeps `theme-transition-source` only as the field trigger. All foreground copy, media and cards sit inside an opaque `.theme-reading-surface.theme-reading-surface--dark`, so text never inherits the mist or paper midpoint behind it.
- `.theme-reading-surface--dark` owns the complete semantic token set: background, text, muted text, lines, control boundaries, accent, surfaces, panels and inverse colors. Component markup does not scatter hard-coded black／white fixes.
- `useThemeInversion` applies one `THEME_ENDPOINT_THRESHOLD` through the central `applyThemeState` path. ScrollTrigger `onUpdate`／`onRefresh`, navigation chrome and the reduced endpoint therefore share the same dark／paper decision.
- `App.jsx` observes `#main-content` with `ResizeObserver`; lazy sections or media that change document height trigger a bounded hash resettle instead of requiring a manual scroll nudge.
- Browser checks covered 1280／768／390／320 with 0 overflow, 0 broken hash, 0 duplicate ID, 0 broken image and console 0. Four deep-link targets settled at 95–112 px; both theme endpoints and Menu Escape passed.
- Print resets the complete `.theme-reading-surface` semantic token set to the paper endpoint, then restores `overflow: visible` and removes the surface shadow so dark reading regions cannot clip or remain ink-colored in exported pages.
- The Draft admission audit is dynamically imported by `DraftModeEnabled`; it remains outside the raw entry, while submission mode still resolves the Draft boundary to the empty alias.
- The theme update does not change Hamlet's limited-use rights scope or its research status. The 2026-07-26 applicant attestation and approved publication gate remain authoritative, while `testing.statusKey: notValidated`, `usedForExistingVideo: false`, and the missing private-original limitations remain unchanged.

### 2026-07-26 final verification fingerprint

- `pnpm run doctor`: exit 0.
- Draft: 471 modules; entry 180733 B, CSS 44315 B, initial JS gzip 200889 B.
- Submission: 467 modules; entry 153704 B, CSS 44315 B, initial JS gzip 192936 B.
- Sound 18/18; rights 14/14; scanner 73/73.
- Scanner inventory: 132 dist files, 25 text files, 67 text rules and 9 inventory rules. `public/` inventory: 118 entries, 0 missing and 0 mismatch.
- `pnpm run check:publication`: exit 0, `verified / approved`, within the documented Hamlet limited-use scope only.

Screen-reader use, real browser zoom, system reduced-motion, physical devices and multi-browser audio were not checked. The YouTube links in the current Draft PR were opened successfully, but third-party rights and complete credits were not verified; the link check is not publication approval.

## Tone Strategy

- Prefer natural first-person Traditional Chinese when the applicant is the actor. State the action, artifact or method, current evidence, and limit directly; avoid abstract English template labels when a clear Chinese label exists.
- Keep verified results, `notValidated` outcomes, rights／publication limits, and future plans distinct. A deployed or playable asset must never be described as rights-cleared without the required evidence and attestation.
- Avoid pure black and pure white for major surfaces.
- Default dark tone: warm ink, used for the proposal entrance and research framing.
- Light tone: warm paper, scoped to the supporting gallery, collaboration, learning roadmap, AI／authorship and contact rather than applied to the document root. The early reviewer path and research proposal remain on the dark reading surface.
- Inverse elements use `--theme-inverse-bg` and `--theme-inverse-text`, not direct black/white.
- The deep-ink-to-paper passage uses the text-free, `aria-hidden`, `pointer-events: none` `ViewportThemeTransition` fixed layer. It covers the viewport without adding layout height.
- ScrollTrigger scrubs only that layer's paper/mist opacity and three low-contrast radial-field transforms. The natural bounds begin near `#data-visualization-series` bottom 70% and finish with `#project-index-title` top 25%; current DOM geometry then clamps the distance to 0.8–1.2 viewport heights. This keeps draft/submission layouts and resize recalculation consistent while fixed navigation chrome follows the same progress threshold.
- The fixed “作品索引” navigation target is the title/end-trigger itself, so a cross-theme jump traverses the same reversible field and settles on the complete paper endpoint rather than stopping in the warm-gray midpoint. Legacy `#project-index` links still map to the same active navigation item.
- Keep foreground and root tokens section-scoped. Do not interpolate text colors or rewrite document-root palette variables during scroll.

## Surface Rules

- Use `.portfolio-card` for major cards.
- Use `.evidence-panel` for structured evidence and navigation blocks.
- Use `.soft-panel` for compact notes, metrics, and rationales.
- Use `.paper-panel` only when the content needs deliberate emphasis.
- Use `.paper-surface` only for a complete local reading region whose descendants should inherit the paper tokens.
- Use `.media-frame` around images, diagrams, and videos so thumbnails do not float harshly on the page.
- Use `.cta-button` for primary action buttons.

## Typography And Rhythm

- Large headings can stay expressive, but they should sit on softened surfaces and have enough surrounding space.
- Traditional Chinese paragraphs should keep generous line-height and a readable max-width.
- Evidence sections should prefer a title, a short explanation, and then media or cards. Avoid stacking dense blocks without orientation text.
- Detailed Traditional Chinese typography rules live in `docs/chinese-visual-system.md`; use the `.zh-*` and `.chip-text` classes instead of raw English-template tracking utilities.

## Motion And Accessibility

- Motion should support comprehension, not create brightness flashes.
- Keep foreground palettes static and section-scoped; only the dedicated background field may pass through low-contrast intermediate colors, with no text placed on the transition itself.
- Respect `prefers-reduced-motion`; remove mist/radial motion and switch the fixed field directly between its dark and paper endpoints at the same geometric boundary.
- Keep focus rings visible on both warm dark and warm paper backgrounds.
- Keep navigation mostly opaque instead of relying on a large fixed backdrop blur. Do not reserve permanent `will-change` for the Hero canvas or magnetic targets; promote case media only during active hover/focus interaction.
- Treat narrative guidance, interaction feedback, and atmosphere／authorship motion as part of the approved identity. Profile before removal; first reduce paint area, prefer transform／opacity, gate or lower complexity on mobile／low-power devices, support reduced motion, and lower update frequency. Record any material removal with evidence and a replacement interaction.
- Overview cards may restore the original poster-first motion preview only when a project has a local featured MP4. Assign the video source after pointer or keyboard intent, crossfade after playback begins, reset on leave/blur, and keep the cover static for reduced motion or save-data sessions. Evidence players remain user-controlled.
- Print hides the fixed transition field, expands disclosure content, forces major sections and reading-surface tokens onto a paper-safe background, restores visible overflow, and removes reading-surface shadows.

## Future Edits

Before introducing a new section, check:

1. Does it use theme variables instead of hard-coded black/white?
2. Does it maintain accessible contrast?
3. Does it avoid a sudden full-screen luminance jump?
4. Does media have a stable `.media-frame` or explicit aspect ratio?
5. Does the section help admissions reviewers follow the evidence chain?
6. Is a paper treatment local, with the root palette and scrollbar left stable?
