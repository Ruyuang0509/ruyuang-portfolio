# Visual System Notes

Updated: 2026-07-17

This site should feel like a calm research dossier, not a flashing demo reel. The document root stays warm ink; supporting case studies and the reviewer endpoint use section-scoped paper tokens, while a dedicated fixed viewport field carries the scroll-linked passage between the two states.

## Tone Strategy

- Avoid pure black and pure white for major surfaces.
- Default dark tone: warm ink, used for the proposal entrance and research framing.
- Light tone: warm paper, scoped to the supporting gallery and Reviewer Path rather than applied to the document root.
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
- Keep navigation mostly opaque instead of relying on a large fixed backdrop blur. Reserve permanent `will-change` for the Hero canvas; promote case media only during hover/focus interaction.
- Overview cards may restore the original poster-first motion preview only when a project has a local featured MP4. Assign the video source after pointer or keyboard intent, crossfade after playback begins, reset on leave/blur, and keep the cover static for reduced motion or save-data sessions. Evidence players remain user-controlled.
- Print hides the fixed transition field, expands disclosure content, and forces major sections onto a paper-safe background.

## Future Edits

Before introducing a new section, check:

1. Does it use theme variables instead of hard-coded black/white?
2. Does it maintain accessible contrast?
3. Does it avoid a sudden full-screen luminance jump?
4. Does media have a stable `.media-frame` or explicit aspect ratio?
5. Does the section help admissions reviewers follow the evidence chain?
6. Is a paper treatment local, with the root palette and scrollbar left stable?
