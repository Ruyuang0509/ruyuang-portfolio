import { useEffect } from "react";
import EditorialHeading from "./EditorialHeading.jsx";
import PortfolioDraftLayer from "#portfolio-draft";
import "./LearningDashboardProjectDetail.css";

function DashboardChipList({ items = [], accent = false, label = "標籤" }) {
  if (!items.length) return null;

  return (
    <ul className="flex flex-wrap gap-2" aria-label={label}>
      {items.map((item) => (
        <li
          key={item}
          className={accent
            ? "inverted-pill chip-text rounded-full px-3.5 py-1.5 text-sm font-extrabold"
            : "chip-text rounded-full border border-[color:var(--theme-line)] px-3.5 py-1.5 text-sm font-semibold text-[color:var(--theme-muted)]"}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function SectionHeading({ id, number, title, introduction }) {
  return (
    <div className="learning-dashboard-case__section-heading">
      <p className="meta-label text-[var(--theme-accent)]">{number}</p>
      <div className="grid gap-3">
        <h3 id={`${id}-title`} className="zh-heading learning-dashboard-case__section-title">{title}</h3>
        {introduction ? (
          <p className="zh-copy-wide text-[color:var(--theme-muted)]">{introduction}</p>
        ) : null}
      </div>
    </div>
  );
}

export default function LearningDashboardProjectDetail({ project, previousProject, nextProject }) {
  const content = project.learningDashboardCase;

  useEffect(() => {
    const targetId = window.location.hash;
    if (targetId === `#${project.id}` || targetId.startsWith(`#${project.id}-`)) {
      window.dispatchEvent(new CustomEvent("portfolio:hash-navigation", {
        detail: { targetId, delay: 0 },
      }));
    }
  }, [project.id]);

  const navigation = [
    { number: "01", label: "專案摘要", id: "summary" },
    { number: "02", label: "分析問題", id: "problem" },
    { number: "03", label: "資料來源與欄位", id: "data" },
    { number: "04", label: "分析流程", id: "process" },
    { number: "05", label: "儀表板概覽", id: "overview" },
    { number: "06", label: "圖表判讀", id: "charts" },
    { number: "07", label: "互動操作", id: "media" },
    { number: "08", label: "倫理與限制", id: "ethics" },
    { number: "09", label: "反思與改善", id: "reflection" },
  ];
  const metadata = [
    { label: "製作期間", value: project.productionDate },
    { label: "專案形式", value: project.source },
    { label: "作品狀態", value: project.testing.metrics[0].value },
    { label: "推論界線", value: project.testing.metrics[1].value },
  ];
  const chartEyebrows = ["Scatter / 散佈圖組", "Donut chart / 圓環圖", "Bar chart / 直條圖"];
  const processLayers = [
    {
      label: "資料理解",
      steps: content.process.steps.slice(0, 3),
      description: "先確認資料來源、欄位用途與公開邊界，再進入清理與建模。",
    },
    {
      label: "分析建模",
      steps: content.process.steps.slice(3, 6),
      description: "把格式、缺漏、度量與模型關係整理成可供圖表使用的分析層。",
    },
    {
      label: "視覺化呈現",
      steps: content.process.steps.slice(6),
      description: "以圖表、篩選與限制說明組成可被逐步閱讀的儀表板。",
    },
  ];
  const heroFacts = [
    { label: "個人角色", value: project.roles.join(" / ") },
    { label: "工具", value: project.tools.join(" / ") },
    { label: "資料類型", value: "教學用線上學習互動、影片觀看與學科成績資料" },
    { label: "公開範圍", value: "分析方法、互動邏輯與圖表判讀邊界" },
  ];

  return (
    <article
      id={project.id}
      className="case-study-detail learning-dashboard-case scroll-mt-28 py-24 md:py-32"
      aria-labelledby={`${project.id}-title`}
      data-layout-variant={project.layoutVariant}
    >
      <div className="learning-dashboard-case__shell">
        <header
          id={`${project.id}-summary`}
          className="case-anchor learning-dashboard-case__grid learning-dashboard-case__hero"
        >
          <div className="learning-dashboard-case__span-5 grid content-start gap-6">
            <p className="meta-label text-[var(--theme-accent)]">01｜專案摘要</p>
            <EditorialHeading
              as="h2"
              id={`${project.id}-title`}
              className="case-title learning-dashboard-case__title editorial-heading editorial-heading--display zh-display"
              lines={project.titleLines}
            >
              {project.title}
            </EditorialHeading>
            <p className="zh-lead text-[var(--theme-text)]">{project.summary}</p>
            <dl id={`${project.id}-tools`} className="learning-dashboard-case__hero-facts">
              {heroFacts.map((item) => (
                <div key={item.label}>
                  <dt className="zh-label text-[var(--theme-accent)]">{item.label}</dt>
                  <dd className="zh-caption mt-2 text-[color:var(--theme-muted)]">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <aside
            className="learning-dashboard-case__span-7 evidence-panel learning-dashboard-case__hero-evidence rounded-[var(--radius-lg)] p-6 md:p-8"
            aria-label="專案摘要與判讀重點"
          >
            <div className="grid content-start gap-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="meta-label text-[var(--theme-accent)]">Dashboard reading / 儀表板閱讀</p>
                <span className="chip-text rounded-full border border-[color:var(--theme-line)] px-3 py-1.5 text-xs font-extrabold text-[color:var(--theme-muted)]">
                  Reading frame
                </span>
              </div>
              <h3 className="zh-heading learning-dashboard-case__hero-evidence-title">從互動分布走向可檢驗的資料問題</h3>
              <p className="zh-copy-wide text-[color:var(--theme-muted)]">{project.technologyAndMedia}</p>
            </div>
            <dl className="learning-dashboard-case__scope-list">
              {[
                ["分析焦點", "互動分布與成績比較"],
                ["互動方式", "年級篩選、圖表聯動與滑鼠提示"],
                ["判讀原則", "探索關聯，不作因果宣稱"],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="zh-label text-[var(--theme-accent)]">{label}</dt>
                  <dd className="zh-caption mt-2 font-bold text-[var(--theme-text)]">{value}</dd>
                </div>
              ))}
            </dl>
          </aside>

          <dl className="learning-dashboard-case__metadata learning-dashboard-case__span-12">
            {metadata.map((item) => (
              <div key={item.label} className="soft-panel rounded-[var(--radius-sm)] p-4">
                <dt className="zh-label text-[var(--theme-accent)]">{item.label}</dt>
                <dd className="zh-caption mt-2 font-semibold text-[var(--theme-text)]">{item.value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <aside className="case-reading-map learning-dashboard-case__reading-map soft-panel rounded-[var(--radius-md)] p-5" aria-label={`${project.title} 九章閱讀路徑`}>
          <div className="learning-dashboard-case__reading-map-heading">
            <p className="meta-label text-[var(--theme-accent)]">Case map / 九章閱讀路徑</p>
            <p className="zh-caption text-[color:var(--theme-muted)]">依專案、問題、資料、流程、成果、互動、限制與反思逐段閱讀。</p>
          </div>
          <nav aria-label={`${project.title} 案例章節`}>
            <ol className="learning-dashboard-case__nav-list">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a className="learning-dashboard-case__nav-link interactive-link" href={`#${project.id}-${item.id}`}>
                    <span className="meta-label text-[var(--theme-accent)]">{item.number}</span>
                    <span className="chip-text text-sm font-extrabold text-[var(--theme-text)]">{item.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <PortfolioDraftLayer projectId={project.id} />

        <section
          id={`${project.id}-problem`}
          className="case-anchor learning-dashboard-case__section"
          aria-labelledby={`${project.id}-problem-title`}
        >
          <SectionHeading
            id={`${project.id}-problem`}
            number="02"
            title="分析問題"
            introduction="先把儀表板要回答的問題縮減為三項，再決定需要的圖表、篩選與判讀順序。"
          />
          <ol className="learning-dashboard-case__grid">
            {content.questions.map((question, index) => (
              <li key={question} className="learning-dashboard-case__span-4 soft-panel grid content-start gap-5 rounded-[var(--radius-md)] p-5 md:p-6">
                <p className="meta-label text-[var(--theme-accent)]">Q{index + 1}</p>
                <h4 className="zh-heading text-[clamp(1.25rem,2vw,1.75rem)]">{question}</h4>
              </li>
            ))}
          </ol>
          <aside className="evidence-panel learning-dashboard-case__method-boundary rounded-[var(--radius-md)] p-5 md:p-6" aria-label="分析方法邊界">
            <p className="meta-label text-[var(--theme-accent)]">Method boundary / 方法邊界</p>
            <p className="zh-lead text-[var(--theme-text)]">{content.methodBoundary}</p>
          </aside>
        </section>

        <section
          id={`${project.id}-data`}
          className="case-anchor learning-dashboard-case__section"
          aria-labelledby={`${project.id}-data-title`}
        >
          <SectionHeading
            id={`${project.id}-data`}
            number="03"
            title="資料來源與欄位"
            introduction="只列出目前專案紀錄能支持的資料範圍與計數定義，不補寫未核對的欄位名稱、筆數或分析值。"
          />
          <div className="learning-dashboard-case__grid">
            <article className="learning-dashboard-case__span-5 paper-panel grid content-start gap-5 rounded-[var(--radius-lg)] p-6 md:p-8">
              <p className="meta-label opacity-70">Data source / 資料來源</p>
              <h4 className="zh-heading learning-dashboard-case__data-source-title">{content.dataSource.title}</h4>
              <p className="zh-copy-wide text-[var(--theme-inverse-text)]">{content.dataSource.description}</p>
              <p className="zh-caption border-t border-[color:rgba(255,255,255,0.22)] pt-4 text-[var(--theme-inverse-text)]">
                資料提供：教育大數據分析計畫辦公室
              </p>
            </article>
            <div className="learning-dashboard-case__span-7 learning-dashboard-case__field-grid">
              {content.fieldGroups.map((group) => (
                <article key={group.label} className="soft-panel grid content-start gap-3 rounded-[var(--radius-md)] p-5">
                  <h4 className="zh-heading learning-dashboard-case__field-title">{group.label}</h4>
                  <p className="zh-caption text-[color:var(--theme-muted)]">{group.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id={`${project.id}-process`}
          className="case-anchor learning-dashboard-case__section"
          aria-labelledby={`${project.id}-process-title`}
        >
          <SectionHeading
            id={`${project.id}-process`}
            number="04"
            title="資料處理與分析流程"
            introduction="從資料理解開始，依序處理公開邊界、格式與缺漏、度量、模型及圖表互動。"
          />
          <div className="learning-dashboard-case__grid">
            <ol className="learning-dashboard-case__span-7 learning-dashboard-case__process-list">
              {content.process.steps.map((step, index) => (
                <li key={step.title} className="soft-panel learning-dashboard-case__process-step rounded-[var(--radius-md)] p-5">
                  <p className="meta-label text-[var(--theme-accent)]">{String(index + 1).padStart(2, "0")}</p>
                  <div className="grid gap-2">
                    <h4 className="zh-heading text-[clamp(1.15rem,1.7vw,1.5rem)]">{step.title}</h4>
                  </div>
                  <span className="chip-text w-fit rounded-full border border-[color:var(--theme-line)] px-3 py-1.5 text-xs font-extrabold text-[color:var(--theme-muted)]">
                    {step.tool}
                  </span>
                </li>
              ))}
            </ol>
            <aside className="learning-dashboard-case__span-5 evidence-panel grid content-start gap-6 rounded-[var(--radius-lg)] p-6 md:p-8" aria-label="分析流程層級">
              <div className="grid gap-3">
                <p className="meta-label text-[var(--theme-accent)]">Process layers / 流程層級</p>
                <h4 className="zh-heading learning-dashboard-case__process-summary-title">由資料理解走到可判讀的互動儀表板</h4>
                <p className="zh-copy text-[color:var(--theme-muted)]">流程以資料理解、分析建模與視覺化呈現三層組織，對應七個實作步驟。</p>
              </div>
              <ol className="grid gap-4">
                {processLayers.map((layer, index) => (
                  <li key={layer.label} className="rounded-[var(--radius-sm)] bg-[color:var(--theme-surface)] p-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <h5 className="zh-heading learning-dashboard-case__layer-title">{layer.label}</h5>
                      <span className="meta-label text-[var(--theme-accent)]">L{index + 1}</span>
                    </div>
                    <p className="zh-caption mt-2 font-bold text-[var(--theme-text)]">
                      {layer.steps.map((step) => step.title).join(" → ")}
                    </p>
                    <p className="zh-caption mt-3 text-[color:var(--theme-muted)]">{layer.description}</p>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </section>

        <section
          id={`${project.id}-overview`}
          className="case-anchor learning-dashboard-case__section"
          aria-labelledby={`${project.id}-overview-title`}
        >
          <SectionHeading
            id={`${project.id}-overview`}
            number="05"
            title="完整儀表板概覽"
            introduction="先確認範圍、再比較分布、最後回到限制，建立完整儀表板的閱讀順序。"
          />
          <div className="learning-dashboard-case__grid">
            <ol className="learning-dashboard-case__span-8 learning-dashboard-case__overview-list">
              {content.overview.regions.map((region, index) => (
                <li key={region} className="soft-panel rounded-[var(--radius-md)] p-5">
                  <p className="meta-label text-[var(--theme-accent)]">{String(index + 1).padStart(2, "0")}</p>
                  <div className="grid gap-2">
                    <h4 className="zh-heading text-[clamp(1.15rem,1.7vw,1.5rem)]">{region}</h4>
                  </div>
                </li>
              ))}
            </ol>
            <aside className="learning-dashboard-case__span-4 evidence-panel grid content-start gap-5 rounded-[var(--radius-lg)] p-6" aria-label="完整儀表板閱讀結構">
              <p className="meta-label text-[var(--theme-accent)]">Dashboard structure / 儀表板結構</p>
              <h4 className="zh-heading learning-dashboard-case__overview-title">以五個區域建立判讀順序</h4>
              <p className="zh-copy text-[color:var(--theme-muted)]">
                篩選狀態、互動分布、成績比較、觀看分群與限制提示，共同構成從操作到解讀的完整路徑。
              </p>
              <a className="interactive-link chip-text w-fit font-extrabold underline decoration-[var(--theme-accent)] decoration-2 underline-offset-4" href={`#${project.id}-ethics`}>
                前往第 08 節查看資料倫理與分析限制
              </a>
            </aside>
          </div>
        </section>

        <section
          id={`${project.id}-charts`}
          className="case-anchor learning-dashboard-case__section"
          aria-labelledby={`${project.id}-charts-title`}
        >
          <SectionHeading
            id={`${project.id}-charts`}
            number="06"
            title="各圖表設計與判讀"
            introduction="每張圖表以同一組問題整理：回答什麼、為何使用、可以觀察什麼，以及不能據此推論什麼。"
          />
          <div className="learning-dashboard-case__grid">
            {content.charts.map((chart, index) => (
              <article key={chart.title} className="learning-dashboard-case__span-4 evidence-panel learning-dashboard-case__chart-card rounded-[var(--radius-lg)] p-5 md:p-6">
                <div className="grid gap-3">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="meta-label text-[var(--theme-accent)]">{chartEyebrows[index]}</p>
                    <span className="meta-label text-[color:var(--theme-muted)]">0{index + 1}</span>
                  </div>
                  <h4 className="zh-heading learning-dashboard-case__chart-title">{chart.title}</h4>
                </div>
                <dl className="grid gap-4">
                  {[
                    ["圖表回答什麼問題", chart.question],
                    ["為何選擇此圖表", chart.rationale],
                    ["可以觀察到什麼", chart.observation],
                    ["不能據此推論什麼", chart.limitation],
                  ].map(([label, value]) => (
                    <div key={label} className="border-t border-[color:var(--theme-line)] pt-4">
                      <dt className="zh-label text-[var(--theme-accent)]">{label}</dt>
                      <dd className="zh-caption mt-2 text-[color:var(--theme-muted)]">{value}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section
          id={`${project.id}-media`}
          className="case-anchor learning-dashboard-case__section"
          aria-labelledby={`${project.id}-media-title`}
        >
          <SectionHeading
            id={`${project.id}-media`}
            number="07"
            title="年級篩選與互動操作"
            introduction="把年級篩選、圖表聯動、滑鼠提示與教學呈現整合在同一閱讀序列。"
          />
          <div className="learning-dashboard-case__grid">
            <div className="learning-dashboard-case__span-7 media-frame learning-dashboard-case__interaction-media rounded-[var(--radius-lg)] p-6 md:p-8">
              <div className="grid gap-4">
                <p className="meta-label text-[var(--theme-accent)]">Interaction sequence / 操作序列</p>
                <h4 className="zh-heading learning-dashboard-case__interaction-title">四個節點組成互動判讀流程</h4>
                <p className="zh-copy-wide text-[color:var(--theme-muted)]">依序理解篩選、聯動、提示與教學呈現如何共同支援資訊判讀。</p>
              </div>
              <ol className="learning-dashboard-case__interaction-sequence">
                {content.interaction.features.map((feature, index) => (
                  <li key={feature.title}>
                    <span className="meta-label text-[var(--theme-accent)]">{String(index + 1).padStart(2, "0")}</span>
                    <span className="zh-heading learning-dashboard-case__interaction-step-title">{feature.title}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="learning-dashboard-case__span-5 grid content-start gap-4">
              {content.interaction.features.map((feature) => (
                <article key={feature.title} className="soft-panel rounded-[var(--radius-md)] p-5">
                  <h4 className="zh-heading learning-dashboard-case__interaction-card-title">{feature.title}</h4>
                  <p className="zh-caption mt-2 text-[color:var(--theme-muted)]">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id={`${project.id}-ethics`}
          className="case-anchor learning-dashboard-case__section"
          aria-labelledby={`${project.id}-ethics-title`}
        >
          <SectionHeading
            id={`${project.id}-ethics`}
            number="08"
            title="資料倫理與分析限制"
            introduction="將資料、分析與公開範圍集中說明，避免在每張圖表或媒體下重複相同聲明。"
          />
          <div className="learning-dashboard-case__grid">
            {content.ethics.map((item, index) => (
              <article key={item.title} className="learning-dashboard-case__span-4 soft-panel grid content-start gap-4 rounded-[var(--radius-md)] p-6">
                <p className="meta-label text-[var(--theme-accent)]">0{index + 1}</p>
                <h4 className="zh-heading text-[clamp(1.3rem,2vw,1.85rem)]">{item.title}</h4>
                <p className="zh-copy text-[color:var(--theme-muted)]">{item.description}</p>
              </article>
            ))}
          </div>
          <aside className="evidence-panel learning-dashboard-case__testing-note rounded-[var(--radius-md)] p-5 md:p-6" aria-label="目前分析狀態">
            <div className="grid content-start gap-3">
              <p className="meta-label text-[var(--theme-accent)]">Analysis status / 分析狀態</p>
              <p className="zh-lead text-[var(--theme-text)]">{project.testing.status}</p>
            </div>
            <ul className="grid gap-3">
              {project.testing.insights.map((insight) => (
                <li key={insight} className="zh-caption rounded-[var(--radius-sm)] bg-[color:var(--theme-surface)] p-4 text-[color:var(--theme-muted)]">{insight}</li>
              ))}
            </ul>
          </aside>
        </section>

        <section
          id={`${project.id}-reflection`}
          className="case-anchor learning-dashboard-case__section"
          aria-labelledby={`${project.id}-reflection-title`}
        >
          <SectionHeading
            id={`${project.id}-reflection`}
            number="09"
            title="反思與後續改善"
            introduction="把圖表設計、研究誠信與後續驗證放在同一個收束段落，讓案例從成果展示回到可改進的方法。"
          />
          <div className="learning-dashboard-case__grid">
            <article className="learning-dashboard-case__span-7 paper-panel grid content-start gap-6 rounded-[var(--radius-lg)] p-6 md:p-8">
              <h4 className="zh-heading learning-dashboard-case__reflection-title">{content.reflection.title}</h4>
              <p className="zh-copy-wide text-[var(--theme-inverse-text)]">{content.reflection.description}</p>
              <ul className="grid gap-3 border-t border-[color:rgba(255,255,255,0.22)] pt-5">
                {content.reflection.principles.map((principle) => (
                  <li key={principle} className="zh-copy text-[var(--theme-inverse-text)]">
                    <span className="mr-2 opacity-70">•</span>{principle}
                  </li>
                ))}
              </ul>
            </article>
            <aside className="learning-dashboard-case__span-5 evidence-panel grid content-start gap-5 rounded-[var(--radius-lg)] p-6" aria-label="後續改善">
              <p className="meta-label text-[var(--theme-accent)]">Next improvements / 後續改善</p>
              <ol className="grid gap-3">
                {content.reflection.nextSteps.map((step, index) => (
                  <li key={step} className="rounded-[var(--radius-sm)] bg-[color:var(--theme-surface)] p-4">
                    <span className="meta-label text-[var(--theme-accent)]">{String(index + 1).padStart(2, "0")}</span>
                    <p className="zh-caption mt-2 text-[color:var(--theme-muted)]">{step}</p>
                  </li>
                ))}
              </ol>
            </aside>
          </div>

          <div id={`${project.id}-themes`} className="learning-dashboard-case__themes evidence-panel rounded-[var(--radius-md)] p-5 md:p-6">
            <div className="grid content-start gap-4">
              <p className="meta-label text-[var(--theme-accent)]">Research connections / 研究連結</p>
              <DashboardChipList items={project.instituteConnections} accent label={`${project.title} 的研究連結`} />
            </div>
            <dl className="learning-dashboard-case__theme-grid">
              {project.instituteConnections.map((theme) => (
                <div key={theme} className="rounded-[var(--radius-sm)] bg-[color:var(--theme-surface)] p-4">
                  <dt className="zh-label text-[var(--theme-accent)]">
                    {theme} · {project.themeEvidenceStatus?.[theme] === "demonstrated" ? "已有作品證據" : "未來研究方向"}
                  </dt>
                  <dd className="zh-caption mt-2 text-[color:var(--theme-muted)]">{project.themeRationales?.[theme]}</dd>
                </div>
              ))}
            </dl>
          </div>

          <p className="zh-caption border-t border-[color:var(--theme-line)] pt-5 text-[color:var(--theme-muted)]">
            {project.credits}
          </p>
        </section>

        <nav className="grid gap-4 border-t border-[color:var(--theme-line)] pt-8 md:grid-cols-2" aria-label={`${project.title} 作品導覽`}>
          {previousProject ? (
            <a className="evidence-panel interactive-link rounded-[var(--radius-md)] p-5" href={`#${previousProject.id}`}>
              <span className="meta-label block text-[var(--theme-accent)]">Previous</span>
              <span className="zh-heading mt-2 block text-xl">{previousProject.title}</span>
            </a>
          ) : (
            <a className="evidence-panel interactive-link rounded-[var(--radius-md)] p-5" href="#project-index-title">
              <span className="meta-label block text-[var(--theme-accent)]">Back</span>
              <span className="zh-heading mt-2 block text-xl">Project index</span>
            </a>
          )}
          {nextProject ? (
            <a className="evidence-panel interactive-link rounded-[var(--radius-md)] p-5 md:text-right" href={`#${nextProject.id}`}>
              <span className="meta-label block text-[var(--theme-accent)]">Next</span>
              <span className="zh-heading mt-2 block text-xl">{nextProject.title}</span>
            </a>
          ) : (
            <a className="evidence-panel interactive-link rounded-[var(--radius-md)] p-5 md:text-right" href="#reviewer-path">
              <span className="meta-label block text-[var(--theme-accent)]">Finish</span>
              <span className="zh-heading mt-2 block text-xl">Reviewer path</span>
            </a>
          )}
        </nav>
      </div>
    </article>
  );
}
