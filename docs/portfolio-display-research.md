# Portfolio Display Research

Updated: 2026-07-16

This document records the research-backed presentation decisions used for the graduate-school-oriented case-study system in `src/data/portfolio.js` and `src/components/CaseStudyShowcase.jsx`.

## Context And Assumptions

- The user-provided master prompt names the Graduate Institute of Sound Technology at Tainan National University of the Arts as the intended review audience. This document has not independently verified the current official admissions requirements, program naming, faculty, or application year.
- Current project entries are working public portfolio content, not disposable sample copy. Their explicit `notValidated`／`exploratory` states and listed omissions must remain until the applicant supplies real evidence.
- The site is a Vite SPA using React 19, Motion, R3F, Tailwind CSS v4, local AVIF/WebP images, local MP4 preview clips, and performance guardrails from previous optimization rounds.

## Sources Reviewed

### University of the Arts London: Portfolio advice

- URL: https://www.arts.ac.uk/study-at-ual/apply/portfolio-advice
- Why this source matters: UAL is a major art and design university, and this page directly addresses admissions portfolio preparation.
- Key takeaways:
  - A portfolio should show development over time, research, planning, process, experimentation, mistakes, and potential.
  - Applicants are encouraged to organize work by project and tell the story from concept to completed work.
  - UAL suggests showing variety and making group-work roles clear.
  - White space and short, clear annotations are treated as important presentation tools.
- Applied decisions:
  - The website now uses a project-by-project case-study sequence instead of a simple media grid.
  - Overview cards expose title, year, source, role, tools, institute tags, and evidence availability for fast review.
  - Detail sections follow problem -> audience -> process -> artifact -> evidence -> reflection -> institute connection.
  - Group/project credit and role fields are explicit.
- Rejected or deferred:
  - A fixed PDF-like page limit was not adopted because this is a responsive web portfolio, not a static upload packet.

### Carnegie Mellon MHCI Admissions

- URL: https://hcii.cmu.edu/academics/mhci/admissions
- Why this source matters: MHCI is a graduate HCI program; the admissions page frames portfolio links as optional but relevant and emphasizes concise statements of objective, background, preparation, and communication.
- Key takeaways:
  - Portfolio links can strengthen an application when relevant to the applicant's background.
  - Communication, goals, and preparation matter alongside artifacts.
- Applied decisions:
  - Each project includes problem awareness, audience, personal role, reflection, and graduate-study deepening direction.
  - The layout separates what was made from why it matters and how it prepares the applicant for study.
  - Media is evidence, not decoration; videos and demos are paired with captions/transcript hooks.
- Rejected or deferred:
  - A separate admissions video essay area was deferred because the current request is project-case-study structure, not personal statement packaging.

### W3C WAI: Making Audio and Video Media Accessible

- URL: https://www.w3.org/WAI/media/av/
- Why this source matters: W3C WAI is the authoritative accessibility source for web media.
- Key takeaways:
  - Audio/video planning should include captions, transcripts, descriptions, and accessible player behavior.
  - Descriptive transcripts are especially important when visual information is needed to understand media.
- Applied decisions:
  - Video blocks now support captions via `captionsSrc` and visible transcript hooks.
  - Audio blocks support transcript hooks.
  - Non-critical video uses `preload="none"` and controls; autoplay is avoided.
- Rejected or deferred:
  - Full caption files were not generated because the current video clips are placeholders and no real dialogue/audio transcript has been supplied.

### W3C WAI: Images Tutorial

- URL: https://www.w3.org/WAI/tutorials/images/
- Why this source matters: It gives practical guidance for informative, decorative, functional, and complex images.
- Key takeaways:
  - Informative images need short meaningful alt text.
  - Decorative images should use empty alt text.
  - Complex images such as diagrams need more complete text equivalents.
- Applied decisions:
  - Responsive image metadata includes alt text at the data level.
  - Diagram evidence includes both captions and a `description` field so future flow/system/IA diagrams can receive longer explanations.
  - Diagram captions are visible below each image to support reviewers who skim.
- Rejected or deferred:
  - Interactive SVG annotations were deferred to avoid introducing a diagram runtime before real diagrams exist.

### web.dev: Responsive image syntax

- URL: https://web.dev/learn/images/descriptive
- Why this source matters: web.dev documents browser-native `srcset` and `sizes` behavior for efficient responsive image delivery.
- Key takeaways:
  - `srcset` provides image candidates, while `sizes` describes intended rendered width early enough for the browser to choose efficiently.
- Applied decisions:
  - `ResponsiveImage` keeps AVIF/WebP `srcSet` plus `sizes`, explicit `width` and `height`, and lazy loading for below-the-fold media.
  - Project media uses local optimized assets instead of remote CDNs.
- Rejected or deferred:
  - A new image service or runtime image library was rejected because existing local AVIF/WebP assets are sufficient and cheaper.

### web.dev: Video performance

- URL: https://web.dev/learn/performance/video-performance
- Why this source matters: It gives concrete guidance for video preload, posters, and embed facades.
- Key takeaways:
  - User-initiated videos should usually use `preload="none"` or metadata only.
  - Poster images provide context and can be an LCP candidate if above the fold.
  - Third-party embeds can hurt main-thread performance; a facade/placeholder can defer the cost until interaction.
- Applied decisions:
  - Video evidence uses local poster images and `preload="none"`.
  - iframe demos now render as an explicit "Load interactive demo" button before loading the actual iframe.
  - Heavy demos are not auto-loaded on the overview or above the fold.
- Rejected or deferred:
  - Global video lazy-loading polyfills were rejected because native poster/preload behavior and explicit user initiation are adequate.

### web.dev: Optimize INP

- URL: https://web.dev/articles/optimize-inp
- Why this source matters: INP is the Core Web Vitals metric most directly affected by pointer, click, scroll, and iframe/demo interactions.
- Key takeaways:
  - Reduce unnecessary work in high-frequency interactions.
  - Avoid layout thrashing and long synchronous tasks during user input.
  - Defer non-critical work until after initial rendering or explicit user intent.
- Applied decisions:
  - The custom cursor keeps high-frequency pointer updates outside React state.
  - Interactive demo iframes remain behind a click-to-load facade.
  - Case-study media uses native controls and avoids autoplay.
  - Content validation is handled as a build-time/script concern rather than a runtime cost.

### MDN: iframe element

- URL: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe
- Why this source matters: Portfolio demos may eventually use iframes, and iframe configuration affects security, privacy, accessibility, and performance.
- Key takeaways:
  - iframes need meaningful `title` attributes.
  - sandboxing limits what embedded content can do.
  - `loading="lazy"` can defer offscreen iframe loading.
- Applied decisions:
  - Demo iframes include `title`, `sandbox`, `referrerPolicy`, and `loading="lazy"`.
  - Heavy demos are not inserted until the reviewer clicks a button.
  - Direct demo links are preferred when embedding is unnecessary.

### W3C WAI: Media transcripts and descriptions

- URL: https://www.w3.org/WAI/media/av/
- Why this source matters: Graduate portfolios often include video/audio evidence; reviewers may need text alternatives for quick scanning or accessibility.
- Key takeaways:
  - Captions, transcripts, and descriptions are part of responsible media publishing.
  - Text alternatives should explain meaningful visual or audio information, not merely duplicate a filename.
- Applied decisions:
  - Video and audio evidence now expose visible transcript hooks.
  - Video tracks include language metadata when caption files exist.
  - Diagram figures include expandable text equivalents for complex visual evidence.

### People + AI Guidebook case-study research

- URL: https://arxiv.org/abs/2301.12243
- Why this source matters: This study examines how practitioners use human-AI guidelines and notes the need for stronger early-stage ideation and problem formulation support.
- Key takeaways:
  - AI projects need clear problem formulation, cross-functional communication, and early-stage decision support.
  - Guidelines are useful not only for interface details but also for explaining design rationale.
- Applied decisions:
  - AI-related works require problem awareness and theme rationale, not just an "AI" tag.
  - Institute-connection tags now have visible explanations so reviewers can evaluate whether the mapping is credible.
- Rejected or deferred:
  - A full human-AI design checklist was deferred until real AI project content is available.

## Implementation Decisions

0. Treat the homepage as a research-proposal entrance.
   - Reason: the admissions objective is to prove research readiness, not project quantity.
   - Code: `src/components/ImmersiveHero.jsx`, `src/components/ResearchPositioning.jsx`
   - Applied structure: thesis -> credibility -> evidence logic chain -> research tracks -> translation map -> institute alignment.

1. Use one structured data model for all works.
   - Reason: future works should be added by editing data, not rewriting layout.
   - Code: `src/data/portfolio.js`

2. Support two reviewer modes.
   - Fast overview: cards show identity, value proposition, roles, tools, institute themes, and evidence availability.
   - Deep reading: each project has a complete case-study article.
   - Code: `src/components/CaseStudyShowcase.jsx`

3. Keep fields optional but visible.
   - Required groups are checked by `getProjectCompleteness()`.
   - Recommended evidence can be missing without breaking rendering.
   - Script: `scripts/validate-portfolio-content.mjs`
   - Source/docs text integrity is checked by `scripts/audit-source-text.mjs` so mojibake is caught outside project data too.

4. Treat diagrams as complex media.
   - Diagrams have image alt text, caption, and a longer description field.
   - Future formats can be SVG, Mermaid export, Figma export, Excalidraw export, or iframe only if performance and accessibility remain acceptable.

5. Use progressive media loading.
   - Local responsive images use AVIF/WebP and stable intrinsic dimensions.
   - Video uses poster and `preload="none"`.
   - Interactive demos load only after explicit user action.
   - The R3F hero is progressive enhancement: low-core compact devices or save-data sessions keep the CSS fallback instead of loading WebGL.

6. Make institute-theme mapping evidence-based.
   - Each project can include `themeRationales`, which explain why a theme applies.
   - This prevents decorative theme tagging and supports admissions review.

7. Prioritize works by strategic value.
   - AI, interactive systems, sound/media work, and research/evaluation evidence appear before static or concept-only work.
   - Code: `priority`, `featured`, `trackIds`, `sortedProjectCaseStudies`.

8. Translate digital-learning vocabulary into art/intelligent-application vocabulary.
   - Reason: the applicant's undergraduate foundation should read as transferable methodology, not as unrelated education coursework.
   - Code: `terminologyMap`.

## Deferred Decisions

- No CMS or MDX pipeline yet: static data is currently lighter and easier to verify.
- No Mermaid renderer yet: real diagrams are not available, and a runtime renderer would add weight before it is needed.
- No automatic caption generation: real video/audio content is not available.
- No unverified target-program-specific claims: the supplied prompt identifies the intended audience, but official current admissions requirements and institute alignment still require applicant-led verification before submission.

## 2026-07-12 autonomous implementation pass

### Sources reviewed

- W3C CLREQ, Requirements for Chinese Text Layout: https://www.w3.org/TR/clreq/
- web.dev Learn Images: https://web.dev/learn/images/
- MDN iframe element reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe
- W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/

### Implementation decisions applied

1. Long case studies need local reading maps, not only vertical scroll. Each case now exposes a compact section path and evidence snapshot before the deep-reading body.
2. Public media continues to use local responsive AVIF/WebP metadata and explicit dimensions; the first visible project card can be high-priority while deeper evidence remains lazy.
3. Demo embeds remain intent-gated with iframe sandboxing; this follows the principle that heavy external/runtime content should not load before a reader asks for it.
4. Traditional Chinese line breaking and phrase grouping remain CSS-level concerns; content should avoid manually forcing every line break unless it improves a display heading.
5. Admissions review often involves PDF or print capture, so print styles now remove navigation/cursor chrome and preserve readable paper/ink colors.
