import { memo } from "react";
import { homepageNarrative } from "../data/portfolio.js";
import EditorialHeading from "./EditorialHeading.jsx";

const SoundTransitionSection = memo(function SoundTransitionSection() {
  const transition = homepageNarrative.soundTransition;

  return (
    <section
      id="sound-transition"
      className="research-section px-[var(--page-gutter)] py-24 text-[var(--theme-text)] md:py-32"
      aria-labelledby="sound-transition-title"
    >
      <div className="mx-auto grid max-w-7xl gap-12">
        <header className="grid gap-5 md:grid-cols-[0.34fr_0.66fr] md:gap-16">
          <p className="meta-label text-[var(--theme-accent)]">轉向聲音的問題意識</p>
          <div className="grid gap-5">
            <EditorialHeading
              as="h2"
              id="sound-transition-title"
              className="editorial-heading zh-display text-[length:var(--font-size-fluid-section)]"
              lines={[["先聽見差異，"], ["再尋找能理解與", "討論差異的方法。"]]}
            >
              先聽見差異，再尋找能理解與討論差異的方法。
            </EditorialHeading>
            <p className="zh-lead text-[var(--theme-text)]">{homepageNarrative.researchStatement}</p>
          </div>
        </header>

        <ol className="grid gap-4 lg:grid-cols-3" aria-label="從聆聽經驗到研究方向的三個步驟">
          {[
            ["01｜開始注意", transition.turningPoint],
            ["02｜遇到門檻", transition.problem],
            ["03｜帶入方法", transition.method],
          ].map(([label, description]) => (
            <li key={label} className="evidence-panel grid content-start gap-4 rounded-[var(--radius-md)] p-5 md:p-6">
              <p className="meta-label text-[var(--theme-accent)]">{label}</p>
              <p className="zh-copy text-[color:var(--theme-muted)]">{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
});

export const ReviewerPathSection = memo(function ReviewerPathSection() {
  return (
    <section
      id="reviewer-path"
      className="research-section px-[var(--page-gutter)] py-24 text-[var(--theme-text)] md:py-32"
      aria-labelledby="reviewer-path-title"
    >
      <div className="mx-auto grid max-w-7xl gap-10">
        <header className="grid gap-5 md:grid-cols-[0.34fr_0.66fr] md:gap-16">
          <p className="meta-label text-[var(--theme-accent)]">閱讀路線</p>
          <div className="grid gap-5">
            <EditorialHeading
              as="h2"
              id="reviewer-path-title"
              className="editorial-heading zh-display text-[length:var(--font-size-fluid-section)]"
              lines={[["先從可操作", "原型開始，"], ["再依興趣深入", "作品與研究方向。"]]}
            >
              先從可操作原型開始，再依興趣深入作品與研究方向。
            </EditorialHeading>
            <p className="zh-copy-wide text-[color:var(--theme-muted)]">
              你可以先體驗 Web Audio，再依興趣前往 Pure Data 學習紀錄、影音與資料作品、研究構想或 AI 協作說明。
            </p>
          </div>
        </header>

        <nav aria-label="作品集閱讀路線">
          <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {homepageNarrative.reviewerPaths.map((path, index) => (
              <li key={path.target}>
                <a
                  className="portfolio-card interactive-link grid min-h-full content-between gap-7 rounded-[var(--radius-md)] p-5 md:p-6"
                  href={path.target}
                >
                  <div className="grid gap-3">
                    <p className="meta-label text-[var(--theme-accent)]">
                      {String(index + 1).padStart(2, "0")}｜{path.label}
                    </p>
                    <h3 className="zh-heading text-[clamp(1.3rem,2vw,1.85rem)]">{path.title}</h3>
                    <p className="zh-caption text-[color:var(--theme-muted)]">{path.description}</p>
                  </div>
                  <span className="zh-label text-[var(--theme-accent)]" aria-hidden="true">前往閱讀 ↘</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
});

export default SoundTransitionSection;
