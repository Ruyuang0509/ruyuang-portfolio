import { memo } from "react";
import { useLenisGsap } from "./hooks/useLenisGsap.js";
import { useThemeInversion } from "./hooks/useThemeInversion.js";
import CustomCursor from "./components/CustomCursor.jsx";
import CaseStudyShowcase from "./components/CaseStudyShowcase.jsx";
import DataVisualizationSeries from "./components/DataVisualizationSeries.jsx";
import ImmersiveHero from "./components/ImmersiveHero.jsx";
import LearningTrail from "./components/LearningTrail.jsx";
import AiWorkflowSection from "./components/AiWorkflowSection.jsx";
import Navbar from "./components/Navbar.jsx";
import ResearchPositioning from "./components/ResearchPositioning.jsx";
import EditorialHeading from "./components/EditorialHeading.jsx";
import SectionErrorBoundary from "./components/SectionErrorBoundary.jsx";
import PortfolioDraftLayer from "#portfolio-draft";

const ReviewerPathSection = memo(function ReviewerPathSection() {
  return (
    <footer id="reviewer-path" className="relative bg-[var(--theme-bg)] px-[clamp(1.25rem,6vw,10vw)] py-28 text-[var(--theme-text)] md:py-36" aria-labelledby="reviewer-path-title">
      <div className="mx-auto grid max-w-7xl gap-12 border-t border-[color:var(--theme-line)] pt-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
        <p className="meta-label text-[var(--theme-accent)]">Reviewer path / 審查路徑</p>
        <div className="grid gap-8">
          <EditorialHeading as="h2" id="reviewer-path-title" className="editorial-heading editorial-heading--display zh-display text-[length:var(--font-size-fluid-case)]" lines={[["沿著", "證據鏈"], ["繼續閱讀。"]]}>沿著證據鏈繼續閱讀。</EditorialHeading>
          <p className="zh-lead text-[color:var(--theme-muted)]">目前沒有公開聯絡資料；這個區段只提供真實可執行的站內閱讀路徑。</p>
          <div className="flex flex-wrap gap-3">
            <a className="cta-button interactive-link chip-text w-fit rounded-full px-7 py-4 text-sm font-extrabold" href="#interactive-sound-learning" data-magnetic data-cursor-variant="media" data-cursor-label="SOUND">回到聲響原型</a>
            <a className="interactive-link chip-text w-fit rounded-full border border-[color:var(--theme-line)] px-7 py-4 text-sm font-extrabold" href="#project-index">閱讀作品索引</a>
          </div>
        </div>
      </div>
    </footer>
  );
});

const HomePage = memo(function HomePage() {
  return (
    <main id="main-content" aria-label="如願聲響科技研究型作品集" className="page-shell min-h-screen overflow-hidden bg-[var(--theme-bg)] text-[var(--theme-text)]">
      <SectionErrorBoundary sectionName="首頁主張"><ImmersiveHero /></SectionErrorBoundary>
      <ResearchPositioning />
      <SectionErrorBoundary sectionName="互動聲響旗艦案例"><CaseStudyShowcase scope="flagship" showIndex={false} /></SectionErrorBoundary>
      <LearningTrail />
      <AiWorkflowSection />
      <DataVisualizationSeries />
      <SectionErrorBoundary sectionName="支持作品案例"><CaseStudyShowcase scope="supporting" showIndex /></SectionErrorBoundary>
      <ReviewerPathSection />
    </main>
  );
});

export default function App() {
  useLenisGsap();
  useThemeInversion();

  return (
    <>
      <a className="skip-link" href="#main-content">跳到主要內容</a>
      <CustomCursor />
      <Navbar />
      <PortfolioDraftLayer placement="banner" />
      <HomePage />
    </>
  );
}
