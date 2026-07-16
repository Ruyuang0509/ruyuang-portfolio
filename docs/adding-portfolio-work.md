# Adding A Portfolio Work

Use this guide when adding a real graduate-portfolio project to `如願個人網站`.

## 1. Where Things Live

- Project data: `src/data/portfolio.js`
- Internal build notes: `src/data/portfolio.internal.js`
- Case-study layout: `src/components/CaseStudyShowcase.jsx`
- Local media: `public/media/portfolio`
- Research rationale: `docs/portfolio-display-research.md`
- Data visualization guardrails: `docs/data-visualization-series.md`
- Workspace guardrails: `AGENTS.md` and `docs/workspace-consolidation.md`

## 2. Add A New Project Entry

Add a new object to `projectCaseStudies` in `src/data/portfolio.js`.

Required identity fields:

- `id`: stable anchor, lowercase English, hyphenated
- `slug`: usually same as `id`
- `title`: work title
- `year`: production year
- `source`: course, studio, independent project, client, research, or collaboration source
- `category`: work type, such as `Interactive Learning`, `AI / UI System`, `Immersive Media`
- `statusKey`: `completed`, `prototype`, `inProgress`, or `researchProposal`
- `status`: use the public-safe label from `publicStatusLabels`
- `submissionVisibility`: `public` or `hidden`
- `priority`: numeric editorial ordering. Lower number appears earlier
- `featured`: `true` for strategically important works
- `trackIds`: one or more IDs from the research-track system
- `summary`: public-facing project summary
- `valueProposition`: one-sentence reason the work matters
- `whatThisProves`: one sentence explaining what ability this work proves

Required narrative fields:

- `problemAwareness`: why this work exists
- `audience`: target users, audiences, learners, participants, or stakeholders
- `designGoal`: what the user/audience should do, understand, feel, or feed back
- `designProcess`: demand analysis, references, prototype, testing, iteration
- `technologyAndMedia`: how code, AI, sound, video, sensors, data, or media serve the concept
- `outcomeShowcase`: public-safe evidence summary
- `tools`: structured list of software, hardware, AI tools, languages, or production tools
- `roles`: structured list of personal responsibilities
- `reflection.strengths`
- `reflection.limitations`
- `reflection.graduateDirection`
- `instituteConnections`
- `themeRationales`

Recommended evidence fields:

- `diagrams`: interaction flow, system architecture, information architecture
- `media.visualDrafts`
- `media.screenshots`
- `media.videos`
- `media.audio`
- `media.demos`
- `testing.metrics`
- `testing.insights`
- `testing.learningOutcomes`

Optional fields:

- `links`: Figma, GitHub, demo, video, publication, exhibition archive
- `credits`: collaborators, instructor, course team, field site, or data/source acknowledgements
- `seo`: project-specific title and description

Internal authoring fields belong in `src/data/portfolio.internal.js`, not in the public project object:

- missing materials
- replaceable assets
- sample copy reminders
- pre-submission checklist
- AI collaboration notes
- risk reminders
- hidden-from-submission reason

## 3. Case Study Order

Use this order unless the project has a stronger reason to change it:

1. What it is: title, year, source, type, value proposition
2. Why it exists: problem awareness
3. Who it is for: audience and use context
4. How it works: interaction flow, system architecture, information architecture
5. What evidence exists: drafts, screenshots, video, audio, demo
6. What you did: tools and personal role
7. What you learned: testing, observations, learning outcomes
8. What comes next: strengths, limitations, graduate-study deepening
9. Why it fits the target institute: theme rationale

Keep annotations short. Use captions to explain what the reviewer should notice, not to repeat the title.

## 4. Research Tracks

Use research tracks as evidence lenses, not course folders.

Available `trackIds`:

- `ai-interactive-learning-creation`: AI 與互動式創作
- `interactive-media-ux`: 互動媒體與使用者經驗
- `multimedia-video-sound`: 影音聲響敘事
- `edtech-digital-content`: 數位內容與學習設計
- `user-research-outcomes-process`: 使用者研究與成效資料

Choose tracks by evidence, not by wishful positioning. If a project only has future potential for a theme, explain that in `themeRationales` instead of overstating it.

## 5. Priority Rules

Order works by admissions strategy:

1. AI / generative AI works
2. Interactive systems and interface works
3. Sound, video, multimedia, and immersive works
4. Works with user research, feedback, or learning-outcome evidence
5. Complete digital learning systems or undergraduate foundation works
6. Pure graphics, slides, or class exercises only when they strongly support a research track
7. Concept-only works last, and clearly label them as research concepts

## 6. Terminology Translation

When writing descriptions, translate education-technology language into art/intelligent-application language:

- 教學設計 -> 互動體驗設計
- 教材架構 -> 資訊架構 / IA
- 學習活動 -> 互動腳本 / User Flow
- 學習成效 -> 使用者測試 / Outcome Evidence
- 影片教材 -> 影音敘事 / Motion & Sound
- 跨域專題 -> 跨域創生 / Creative Technology

## 7. Media Rules

Images:

- Prefer local AVIF/WebP variants.
- Recommended sizes:
  - `slug-420.avif`
  - `slug-640.avif`
  - `slug-1200.avif`
  - `slug-420.webp`
  - `slug-640.webp`
  - `slug-1200.webp`
- Keep `width` and `height` in the media metadata to prevent layout shift.
- Informative images need meaningful `alt`.
- Complex diagrams should include `caption` and `description`.

Videos:

- Use local MP4/WebM where practical.
- Provide a poster image.
- Use `preload="none"` unless the video becomes the true hero/LCP media.
- Add `captionsSrc` when a WebVTT file exists.
- Add a short transcript summary even before full captions are ready.

Audio:

- Use local MP3/OGG/WAV when needed.
- Do not autoplay.
- Add a transcript hook or listening guide.

Interactive demos:

- Prefer a preview and launch button.
- Use `href` for direct links.
- Use `embedUrl` only when iframe embedding is safe.
- iframe demos are loaded only after the user clicks.
- Provide an iframe `title`, sandbox, and referrer policy.

## 8. Institute Theme Mapping

Allowed themes:

- AI
- 互動媒體
- 聲響
- 沉浸式體驗
- 數位孿生
- 跨域創生

Only add a theme if the project can explain it. Add the explanation to `themeRationales`.

Example:

```js
themeRationales: {
  AI: "研究核心是生成式 AI 在創作流程中的角色與限制。",
  互動媒體: "介面必須處理輸入、回饋、比較與修正等互動狀態。",
}
```

## 9. Verification

Run these from `如願個人網站` after editing:

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

If performance evidence is needed:

```powershell
pnpm run audit:lighthouse
```

`content:check` fails on missing required fields, missing local assets, missing theme rationales, missing diagram text equivalents, construction-stage wording in public project entries, or possible mojibake/corrupted text inside project entries. `audit:text` scans source and documentation text more broadly.

Run `pnpm run check:submission` before formal sharing. It builds with `VITE_PORTFOLIO_MODE=submission` and scans `dist/` for forbidden construction terms.
## Interactive prototype schema extension

An interactive case may add `interactivePrototype` metadata consumed by a dedicated renderer. Narrative and mapping metadata remain data-driven in `portfolio.js`; audio lifecycle belongs in a component or hook. Do not place oscillators, timers, `AudioContext`, or construction TODO text directly in case data. Submission-hidden cases must use the build-time mode boundary, never CSS-only hiding.
