import AnimatedDetails from "./AnimatedDetails.jsx";

const diagramLabels = {
  interactionFlow: "互動流程",
  systemArchitecture: "系統架構",
  informationArchitecture: "資訊架構",
};

function ProductionWorkflowSection({ id, workflow }) {
  if (!workflow?.stages?.length) return null;

  return (
    <section
      id={id}
      className="production-workflow grid gap-8 border-t border-[color:var(--theme-line)] pt-8"
      aria-labelledby={`${id}-title`}
    >
      <header className="production-workflow__header grid min-w-0 gap-5 md:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] md:gap-12">
        <div className="min-w-0">
          <p className="meta-label text-[var(--theme-accent)]">{workflow.eyebrow}</p>
          <h3
            id={`${id}-title`}
            className="zh-heading mt-3 max-w-[18em] text-[clamp(1.9rem,3.6vw,3.7rem)]"
          >
            {workflow.title}
          </h3>
        </div>
        <p className="zh-copy min-w-0 max-w-[42rem] text-[color:var(--theme-muted)]">
          {workflow.introduction}
        </p>
      </header>

      <ol className="m-0 grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-4 lg:gap-4" aria-label={`${workflow.title}的四個階段`}>
        {workflow.stages.map((stage) => (
          <li
            key={stage.number}
            className={`production-workflow__step production-workflow__step--${stage.tone ?? "ink"}`}
            data-workflow-step={stage.number}
          >
            <article
              className="production-workflow__card soft-panel grid h-full min-w-0 content-start gap-5 rounded-[var(--radius-md)] p-5"
              aria-labelledby={`${id}-step-${stage.number}`}
            >
              <div className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
                <span className="production-workflow__number inline-grid min-h-12 min-w-12 place-items-center rounded-[var(--radius-xl)] border text-sm font-black tracking-[0.08em]">
                  <span className="sr-only">步驟 </span>
                  {stage.number}
                </span>
                <h3
                  id={`${id}-step-${stage.number}`}
                  className="zh-heading min-w-0 text-[clamp(1.2rem,1.7vw,1.55rem)]"
                >
                  {stage.title}
                </h3>
              </div>
              <p className="zh-copy text-[color:var(--theme-muted)]">{stage.description}</p>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}

function DiagramGallery({ id, diagrams = [], introduction, ImageComponent }) {
  if (!diagrams.length) return null;

  const isVisualStrategy = diagrams[0]?.kind === "visualStrategy";

  return (
    <section id={id} className="grid gap-8 border-t border-[color:var(--theme-line)] pt-8">
      <div className="grid gap-3 md:grid-cols-[0.32fr_0.68fr] md:gap-12">
        <h3 className="meta-label text-[var(--theme-accent)]">
          {isVisualStrategy ? "視覺方向" : "流程與架構"}
        </h3>
        <p className="zh-copy text-[color:var(--theme-muted)]">
          {introduction ?? "互動流程圖、系統架構圖與資訊架構圖用來補充作品方法，讓媒體成果背後的流程與系統關係更容易被理解。"}
        </p>
      </div>
      <div className={isVisualStrategy ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3" : "grid gap-6 md:grid-cols-3"}>
        {diagrams.map((diagram) => (
          <figure key={`${diagram.type}-${diagram.title}`} className="grid gap-4">
            <div className="media-frame overflow-hidden rounded-[var(--radius-md)]">
              <ImageComponent
                image={diagram.image}
                className="aspect-[4/5] h-full w-full object-cover"
                sizes="(min-width: 1024px) 28vw, (min-width: 768px) 42vw, 92vw"
              />
            </div>
            <figcaption className="grid content-start gap-2">
              <p className="zh-label text-[var(--theme-accent)]">
                {diagram.kind === "visualStrategy" ? "視覺策略" : diagramLabels[diagram.type] ?? "Diagram"}
              </p>
              <h4 className="zh-heading text-[clamp(1.15rem,1.7vw,1.55rem)]">{diagram.title}</h4>
              <p className="zh-caption text-[color:var(--theme-muted)]">
                {diagram.caption}
              </p>
              {diagram.description ? (
                <AnimatedDetails
                  className="zh-caption text-[color:var(--theme-muted)]"
                  summary={diagram.detailsLabel ?? "閱讀圖解說明"}
                  summaryClassName="interactive-link cursor-pointer font-extrabold text-[var(--theme-text)]"
                >
                  <p className="mt-2">{diagram.description}</p>
                </AnimatedDetails>
              ) : null}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default function CaseProcessSection({
  id,
  productionWorkflow,
  diagrams,
  introduction,
  ImageComponent,
}) {
  if (productionWorkflow) {
    return <ProductionWorkflowSection id={id} workflow={productionWorkflow} />;
  }

  return (
    <DiagramGallery
      id={id}
      diagrams={diagrams}
      introduction={introduction}
      ImageComponent={ImageComponent}
    />
  );
}
