# Traditional Chinese Visual System

Updated: 2026-07-12

This portfolio is written primarily in Traditional Chinese, so typography cannot be treated as an English template with translated text. The visual system should support Chinese reading rhythm, mixed Chinese/English tool names, evidence-heavy captions, and long case-study paragraphs.

## Sources Reviewed

- W3C Chinese Layout Requirements / CLREQ: https://www.w3.org/TR/clreq/
- MDN `word-break`: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/word-break
- MDN `line-break`: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/line-break
- MDN `text-wrap`: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-wrap
- WAI / WCAG 2.2 Contrast Minimum: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html

## Applied Rules

1. Use a Traditional Chinese system font stack first.
   - Primary stack: PingFang TC, Noto Sans TC, Microsoft JhengHei, Heiti TC, Source Han Sans TC, Segoe UI, system-ui, sans-serif.
   - This avoids shipping heavy CJK webfont payloads and reduces layout-shift risk.

2. Do not apply English poster typography to Chinese paragraphs.
   - Avoid global uppercase patterns on Chinese UI text.
   - Avoid extreme negative letter spacing on Han-character headings.
   - Avoid ultra-tight line-height for multi-line Chinese headings.

3. Keep Chinese paragraphs readable.
   - Body copy uses generous line-height around 1.76.
   - Long paragraphs use max-width tokens instead of stretching across the viewport.
   - Case-study text should use `.zh-copy` or `.zh-copy-wide`, not raw large Tailwind text classes.

4. Handle CJK line breaking deliberately.
   - Use `line-break: loose` for Traditional Chinese text.
   - Do not add global `word-break: break-all`.
   - Use `overflow-wrap` only as protection for long Latin tokens, URLs, filenames, and tool names.
   - Use `text-wrap: balance` for short display headings and `text-wrap: pretty` for paragraphs where supported.

5. Treat Chinese/English mixed text as a first-class layout problem.
   - Tools such as Figma, Unity, p5.js, HTML/CSS/JS, Python, Premiere, After Effects, Audition, Arduino, and AI tools should sit in chips or metadata rows.
   - Chips use `.chip-text` with softer letter spacing and enough vertical padding.
   - Slash-separated tool lists should be short; detailed tool lists belong in chip groups.

6. Captions are part of the evidence chain.
   - Media captions should use `.zh-caption`.
   - Captions should explain what the viewer is seeing and why it matters.
   - Diagram captions should have a visible short label and an optional longer text equivalent.

7. Contrast must remain accessible.
   - Softer ink and paper tones are allowed, but body text must remain readable.
   - Do not use glow, blur, or low-contrast decorative effects behind Chinese paragraphs.
   - Focus states must remain visible on both dark and paper surfaces.

## Project Classes

- `.zh-display`: large Traditional Chinese display headings.
- `.zh-heading`: section/card headings with restrained letter spacing.
- `.zh-lead`: short thesis or summary copy.
- `.zh-copy`: normal long-form Chinese body copy.
- `.zh-copy-wide`: wider but still controlled case-study copy.
- `.zh-caption`: media captions, table explanations, compact evidence notes.
- `.zh-label`: compact Chinese labels.
- `.meta-label`: small bilingual metadata labels.
- `.chip-text`: tool, role, theme, and status chips.

## Phrase-Aware Heading Rules

大型中文標題不能只交給瀏覽器任意斷字，尤其是「媒體證據」「研究能力」「作品集語言」這類語意單位。專案現在使用 `EditorialHeading` 與 `.phrase-line` / `.phrase-unit` 來管理展示型標題：

- Hero、section title、case-study title 可提供 `titleLines`，由內容資料決定語意斷行。
- `titleLines` 可以是一行文字，也可以是短詞組陣列。優先使用短詞組陣列，讓瀏覽器只能在詞組之間換行。
- `.phrase-unit` 只保護短詞組，避免把整句都設成不可換行造成手機溢出。
- 手機窄版仍保護短詞組；因此每個 phrase unit 應保持在 2 到 8 個中文字左右，避免使用整句。
- 視覺斷行使用 `aria-label` 保留連續文字，避免螢幕閱讀器讀到破碎行。
- 不要在一般段落中手動塞入大量 `<br>`；長文仍交給 CJK `line-break`、`text-wrap: pretty` 與合適欄寬處理。

### Good / Bad Examples

Bad:

```jsx
titleLines={["把學習與媒體經驗轉譯成研究能力。"]}
```

這會讓瀏覽器在容器不足時切到「轉／譯」或「研究／能力」之間。

Good:

```jsx
titleLines={[
  ["把原本的", "學習與媒體經驗，"],
  ["轉譯成", "研究能力。"],
]}
```

這種寫法把「學習與媒體經驗」「轉譯成」「研究能力」當成可重排的語意單位。桌面可以維持編輯式斷行，平板或手機可在詞組之間換行，但不拆壞詞義。

### CSS Rules For This Project

- `.zh-display` 使用 `text-wrap: balance` 作為漸進增強，但真正的語意保護來自 `EditorialHeading` 的 phrase units。
- `.phrase-unit` 使用 `white-space: nowrap`，只應包短詞組。
- `.chip-text` 使用 `word-break: keep-all` 與 `overflow-wrap: break-word`，避免中文標籤被拆成單字，同時允許長英文工具名必要時換行。
- `.translation-term` 用於術語對照表，避免「資訊架構」「互動體驗設計」這類術語被切成難讀片段。
- 避免在中文 display headings 使用過大的負字距；目前大型標題控制在約 `-0.012em` 到 `-0.014em`。

## What Future Edits Should Avoid

- Do not use `tracking-[-0.08em]` or `leading-[0.82]` on Chinese headings.
- Do not make Chinese body paragraphs `font-black`.
- Do not put every label in `uppercase tracking-[0.24em]`.
- Do not use `word-break: break-all` globally.
- Do not add heavy remote CJK fonts without a measured reason.
- Do not let long Chinese paragraphs span the full page width.
- Do not use pure black/white blocks as a shortcut for contrast; follow `docs/visual-system.md`.

## Deferred

- Self-hosted Noto Sans TC or Source Han Sans TC was not added. The current system stack is faster and safer for this portfolio stage.
- Vertical Chinese layout was not implemented because this site is a horizontal-scrolling/readable admissions portfolio, not a publication-style experiment.

## Automated Guardrail

Run this before visual or content handoff:

```powershell
pnpm run audit:cjk
```

The script checks the project for unsafe Traditional Chinese typography regressions: broad `word-break: break-all`, shared `overflow-wrap:anywhere`, missing `zh-Hant-TW` language metadata, missing phrase-aware heading primitives, excessive negative tracking, and inaccessible phrase-line rendering. Treat warnings about long phrase units as editorial review prompts rather than automatic failures.

<!-- Codex-Fix: Document the automated CJK typography audit so future edits preserve Traditional Chinese readability. -->
