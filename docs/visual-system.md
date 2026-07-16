# Visual System Notes

Updated: 2026-07-09

This site should feel like a calm research dossier, not a flashing demo reel. The visual system now uses warm ink and paper tones to reduce the brightness jump between the immersive hero and the case-study evidence sections.

## Tone Strategy

- Avoid pure black and pure white for major surfaces.
- Default dark tone: warm ink, used for the proposal entrance and research framing.
- Light tone: warm paper, used for portfolio evidence and long reading.
- Inverse elements use `--theme-inverse-bg` and `--theme-inverse-text`, not direct black/white.
- Scroll theme changes should cover a generous viewport range so the viewer feels a tonal ramp instead of a sudden flash.

## Surface Rules

- Use `.portfolio-card` for major cards.
- Use `.evidence-panel` for structured evidence and navigation blocks.
- Use `.soft-panel` for compact notes, metrics, and rationales.
- Use `.paper-panel` only when the content needs deliberate emphasis.
- Use `.media-frame` around images, diagrams, and videos so thumbnails do not float harshly on the page.
- Use `.cta-button` for primary action buttons.

## Typography And Rhythm

- Large headings can stay expressive, but they should sit on softened surfaces and have enough surrounding space.
- Traditional Chinese paragraphs should keep generous line-height and a readable max-width.
- Evidence sections should prefer a title, a short explanation, and then media or cards. Avoid stacking dense blocks without orientation text.
- Detailed Traditional Chinese typography rules live in `docs/chinese-visual-system.md`; use the `.zh-*` and `.chip-text` classes instead of raw English-template tracking utilities.

## Motion And Accessibility

- Motion should support comprehension, not create brightness flashes.
- Switch themes only between verified dark and paper endpoints; never scrub or interpolate foreground and background colors through low-contrast intermediate states.
- Respect `prefers-reduced-motion`; theme changes remain discrete while decorative motion is removed.
- Keep focus rings visible on both warm dark and warm paper backgrounds.

## Future Edits

Before introducing a new section, check:

1. Does it use theme variables instead of hard-coded black/white?
2. Does it maintain accessible contrast?
3. Does it avoid a sudden full-screen luminance jump?
4. Does media have a stable `.media-frame` or explicit aspect ratio?
5. Does the section help admissions reviewers follow the evidence chain?
