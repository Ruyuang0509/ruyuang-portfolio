import { memo } from "react";
import { dataVisualizationSeries, sortedProjectCaseStudies } from "../data/portfolio.js";
import EditorialHeading from "./EditorialHeading.jsx";

function SeriesImage({ image, className = "" }) {
  return (
    <img
      className={className}
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading="lazy"
      decoding="async"
    />
  );
}
// Codex-Fix: The series cover is a lightweight local SVG, so a semantic img is enough without adding runtime image logic.

const seriesWorks = dataVisualizationSeries.works
  .map((id) => sortedProjectCaseStudies.find((project) => project.id === id))
  .filter(Boolean);
// Codex-Fix: Resolve series entries from the canonical project data so cards and detail pages cannot drift apart.

const DataVisualizationSeries = memo(function DataVisualizationSeries() {
  return (
    <section
      id={dataVisualizationSeries.id}
      className="theme-transition-source relative bg-[var(--theme-bg)] px-[clamp(0.75rem,4vw,5rem)] py-20 text-[var(--theme-text)] md:py-28"
      aria-labelledby="data-visualization-series-title"
    >
      <div className="theme-reading-surface theme-reading-surface--dark mx-auto grid max-w-7xl min-w-0 gap-12 rounded-[var(--radius-lg)] p-[clamp(1rem,4vw,3.5rem)]">
        <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,0.56fr)_minmax(0,0.44fr)] lg:items-center">
          <div className="grid min-w-0 gap-6">
            <p className="meta-label text-[var(--theme-accent)]">
              {dataVisualizationSeries.kicker}
            </p>
            <EditorialHeading
              as="h2"
              id="data-visualization-series-title"
              className="data-series-title editorial-heading zh-display"
              lines={[
                ["資料視覺化與"],
                ["數位學習應用"],
              ]}
            >
              {dataVisualizationSeries.title}
            </EditorialHeading>
            <p className="zh-lead max-w-[42rem] text-[color:var(--theme-muted)]">
              {dataVisualizationSeries.summary}
            </p>
            <p className="zh-copy rounded-[var(--radius-md)] border border-[color:var(--theme-line)] bg-[color:var(--theme-surface)] p-5 font-bold text-[var(--theme-text)]">
              {dataVisualizationSeries.independenceNote}
            </p>
          </div>
          <figure className="media-frame min-w-0 overflow-hidden rounded-[var(--radius-lg)]">
            <SeriesImage
              image={dataVisualizationSeries.cover}
              className="aspect-[4/3] h-full w-full object-cover"
            />
          </figure>
        </div>

        <div className="grid min-w-0 gap-6 md:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)]">
          <div className="grid min-w-0 content-start gap-4">
            <p className="meta-label text-[var(--theme-accent)]">
              兩件作品的共同觀察
            </p>
            <p className="zh-copy text-[color:var(--theme-muted)]">
              {dataVisualizationSeries.reflection}
            </p>
            <p className="zh-caption rounded-[var(--radius-sm)] bg-[color:var(--theme-surface)] p-4 text-[color:var(--theme-muted)]">
              {dataVisualizationSeries.soundExtension}
            </p>
          </div>
          <ul className="grid min-w-0 gap-3">
            {dataVisualizationSeries.capabilities.map((capability) => (
              <li key={capability} className="zh-copy min-w-0 rounded-[var(--radius-sm)] border border-[color:var(--theme-line)] p-4">
                {capability}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {seriesWorks.map((work) => (
            <article key={work.id} className="portfolio-card grid min-w-0 gap-5 rounded-[var(--radius-lg)] p-5">
              <p className="meta-label text-[var(--theme-accent)]">
                {work.year ? `${work.year} / ` : ""}{work.source}
              </p>
              <h3 className="zh-heading text-[clamp(1.75rem,3.4vw,3.4rem)]">
                <a className="interactive-link" href={`#${work.id}`}>
                  {work.title}
                </a>
              </h3>
              <p className="zh-copy text-[color:var(--theme-muted)]">
                {work.valueProposition}
              </p>
              <div className="grid gap-3 rounded-[var(--radius-sm)] bg-[color:var(--theme-surface)] p-4">
                <p className="zh-caption font-bold text-[var(--theme-text)]">
                  {work.whatThisProves}
                </p>
                <p className="zh-caption text-[color:var(--theme-muted)]">
                  {work.tools.slice(0, 4).join(" / ")}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});
// Codex-Fix: Add a dedicated data-visualization series gateway before the full case-study index.

export default DataVisualizationSeries;
