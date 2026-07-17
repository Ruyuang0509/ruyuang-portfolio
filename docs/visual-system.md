# Visual System Notes

Updated: 2026-07-17

This site should feel like a calm research dossier, not a flashing demo reel. The document root stays warm ink; supporting case studies and the reviewer endpoint use section-scoped paper surfaces, with a static tonal bridge between them.

## Tone Strategy

- Avoid pure black and pure white for major surfaces.
- Default dark tone: warm ink, used for the proposal entrance and research framing.
- Light tone: warm paper, scoped to the supporting gallery and Reviewer Path rather than applied to the document root.
- Inverse elements use `--theme-inverse-bg` and `--theme-inverse-text`, not direct black/white.
- Immediately before `#project-index`, use the text-free, `aria-hidden` static bridge at `clamp(96px, 14vw, 240px)`; do not place copy on transitional colors.
- ScrollTrigger may switch fixed navigation chrome at the gallery threshold, but must not swap the root or content palette.

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
- Keep content palettes static and section-scoped; never scrub or interpolate foreground and background colors through low-contrast intermediate states.
- Respect `prefers-reduced-motion`; remove decorative motion but keep the static bridge because it does not animate.
- Keep focus rings visible on both warm dark and warm paper backgrounds.
- Keep navigation mostly opaque instead of relying on a large fixed backdrop blur. Reserve permanent `will-change` for the Hero canvas; promote case media only during hover/focus interaction.
- Print hides the transition bridge and forces major sections onto a paper-safe background.

## Future Edits

Before introducing a new section, check:

1. Does it use theme variables instead of hard-coded black/white?
2. Does it maintain accessible contrast?
3. Does it avoid a sudden full-screen luminance jump?
4. Does media have a stable `.media-frame` or explicit aspect ratio?
5. Does the section help admissions reviewers follow the evidence chain?
6. Is a paper treatment local, with the root palette and scrollbar left stable?
