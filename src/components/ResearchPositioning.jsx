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
            <p className="zh-lead text-[var(--theme-text)]">研究問題：{homepageNarrative.researchQuestion}</p>
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

        <a
          className="portfolio-card interactive-link grid gap-3 rounded-[var(--radius-md)] p-5 md:ml-[34%] md:p-6"
          href="#research-positioning"
        >
          <p className="meta-label text-[var(--theme-accent)]">延伸閱讀</p>
          <h3 className="zh-heading text-[clamp(1.3rem,2vw,1.85rem)]">從問題意識前往研究構想</h3>
          <p className="zh-caption text-[color:var(--theme-muted)]">閱讀混合多聲道監聽的研究問題、初步構想與目前能力邊界。</p>
          <span className="zh-label text-[var(--theme-accent)]" aria-hidden="true">閱讀研究構想 ↘</span>
        </a>
      </div>
    </section>
  );
});

export default SoundTransitionSection;
