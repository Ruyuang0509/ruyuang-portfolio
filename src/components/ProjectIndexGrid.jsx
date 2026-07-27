import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import ResponsiveImage from "./ResponsiveImage.jsx";

const cardSpring = {
  type: "spring",
  stiffness: 150,
  damping: 15,
};

const getOverviewPreview = (project) => project.media?.videos?.find(
  (video) => video.featured && video.src && !video.youtubeId,
);

const resetOverviewPreview = (video) => {
  if (!video) return;
  video.pause();
  if (video.readyState > 0) video.currentTime = 0;
};

function StaticKeywordList({ items, label }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label={label}>
      {items.map((item) => (
        <li
          key={item}
          className="chip-text inline-flex items-center rounded-[var(--radius-sm)] border border-[color:var(--theme-line)] bg-[color:var(--theme-surface)] px-3 py-1.5 text-sm font-bold text-[var(--theme-text)]"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function ProjectOverviewMedia({ project, reduceMotion }) {
  const mediaRef = useRef(null);
  const previewRef = useRef(null);
  const [previewReady, setPreviewReady] = useState(false);
  const preview = getOverviewPreview(project);
  const image = project.indexCover ?? project.cover;

  const playPreview = (event) => {
    const video = previewRef.current;
    const saveData = navigator.connection?.saveData === true;
    if (!preview || !video || reduceMotion || saveData || event?.pointerType === "touch") return;
    if (video.dataset.loaded && !video.paused) return;

    if (!video.dataset.loaded) {
      video.src = preview.src;
      video.dataset.loaded = "true";
      video.load();
    }

    video.play().catch(() => setPreviewReady(false));
  };

  const pausePreview = () => {
    const video = previewRef.current;
    if (!video) return;
    resetOverviewPreview(video);
    setPreviewReady(false);
  };

  useEffect(() => () => resetOverviewPreview(previewRef.current), []);

  useEffect(() => {
    if (!reduceMotion || !previewRef.current) return;
    resetOverviewPreview(previewRef.current);
    setPreviewReady(false);
  }, [reduceMotion]);

  useEffect(() => {
    if (!preview || !mediaRef.current || !("IntersectionObserver" in window)) return undefined;

    const stopWhenInactive = () => {
      const video = previewRef.current;
      if (!video || video.paused) return;
      resetOverviewPreview(video);
      setPreviewReady(false);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) stopWhenInactive();
    }, { threshold: 0.05 });
    const handleVisibilityChange = () => {
      if (document.hidden) stopWhenInactive();
    };

    observer.observe(mediaRef.current);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [preview]);

  useEffect(() => {
    if (!previewReady) return undefined;

    const stopPreview = () => {
      const video = previewRef.current;
      if (!video || video.paused) return;
      resetOverviewPreview(video);
      setPreviewReady(false);
    };
    const handlePointerMove = (event) => {
      if (event.pointerType === "touch" || mediaRef.current?.contains(event.target)) return;
      stopPreview();
    };
    const handleScroll = () => {
      const media = mediaRef.current;
      if (media?.matches(":hover") || media?.contains(document.activeElement)) return;
      stopPreview();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [previewReady]);

  return (
    <div
      ref={mediaRef}
      className="relative h-full overflow-hidden"
      data-overview-preview={preview ? "intent-gated" : undefined}
      onPointerEnter={playPreview}
      onPointerMove={playPreview}
      onPointerLeave={pausePreview}
      onPointerCancel={pausePreview}
      onFocusCapture={playPreview}
      onBlurCapture={pausePreview}
      onClickCapture={pausePreview}
    >
      <ResponsiveImage
        image={image}
        className="aspect-[16/10] h-full w-full object-cover"
        sizes="(min-width: 800px) 44vw, 92vw"
        loading="lazy"
        fetchPriority="auto"
        style={{ objectPosition: project.indexCoverPosition ?? "50% 50%" }}
      />
      {preview ? (
        <video
          ref={previewRef}
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 ease-out ${previewReady ? "group-hover:opacity-100 group-focus-within:opacity-100" : ""}`}
          muted
          playsInline
          loop
          preload="none"
          tabIndex={-1}
          aria-hidden="true"
          onPlaying={() => setPreviewReady(true)}
          onError={() => setPreviewReady(false)}
        />
      ) : null}
    </div>
  );
}

function ProjectOverviewCard({ project, index }) {
  const reduceMotion = useReducedMotion();
  const metadata = [project.year, project.category, project.status].filter(Boolean);
  const title = project.indexTitle ?? project.title;
  const summary = project.indexSummary ?? project.valueProposition;
  const links = project.indexLinks ?? [];
  const tags = project.indexTags ?? project.instituteConnections.slice(0, 3);

  return (
    <motion.article
      className="portfolio-card featured-work-card group flex h-full min-w-0 flex-col gap-5 rounded-[var(--radius-lg)] p-4"
      whileHover={reduceMotion ? undefined : { y: -3, scale: 1.005 }}
      transition={cardSpring}
      style={{ boxShadow: "0 0.55rem 1.8rem rgba(18, 16, 12, 0.085)" }}
    >
      <a
        className="media-frame block overflow-hidden rounded-[var(--radius-md)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--theme-accent)]"
        href={`#${project.id}`}
        aria-label={`閱讀作品案例：${title}`}
        data-magnetic
        data-cursor-variant="media"
        data-cursor-label="CASE"
        style={{ boxShadow: "0 0.35rem 1.1rem rgba(18, 16, 12, 0.08)" }}
      >
        <ProjectOverviewMedia project={project} reduceMotion={reduceMotion} />
      </a>
      <div className="flex flex-1 flex-col gap-5 border-t border-[color:var(--theme-line)] pt-5">
        <div className="grid grid-cols-[1fr_auto] gap-4">
          <div>
            <p className="meta-label mb-3 text-[var(--theme-accent)]">
              {metadata.join(" / ")}
            </p>
            <h3 className="zh-heading text-[length:var(--font-size-fluid-card-title)]">
              <a className="interactive-link" href={`#${project.id}`}>{title}</a>
            </h3>
          </div>
          <span className="text-sm font-extrabold text-[color:var(--theme-muted)]" aria-hidden="true">
            0{index + 1}
          </span>
        </div>
        <p className="zh-caption text-[color:var(--theme-muted)]">{summary}</p>
        <dl className="grid gap-3 border-y border-[color:var(--theme-line)] py-4">
          <div className="grid gap-1 sm:grid-cols-[5.5rem_1fr] sm:gap-4">
            <dt className="zh-label font-extrabold text-[var(--theme-accent)]">負責項目</dt>
            <dd className="zh-caption m-0 text-[var(--theme-text)]">{project.roles.slice(0, 4).join(" / ")}</dd>
          </div>
          <div className="grid gap-1 sm:grid-cols-[5.5rem_1fr] sm:gap-4">
            <dt className="zh-label font-extrabold text-[var(--theme-accent)]">關鍵工具</dt>
            <dd className="zh-caption mixed-token m-0 text-[var(--theme-text)]">{project.tools.slice(0, 4).join(" / ")}</dd>
          </div>
        </dl>
        {links.length ? (
          <nav aria-label={`${title} 的成果入口`}>
            <ul className="flex flex-wrap gap-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    className="interactive-link inline-flex min-h-11 items-center justify-center rounded-[var(--radius-sm)] border border-[color:var(--theme-line)] bg-[color:var(--theme-surface)] px-3.5 py-2 text-sm font-extrabold underline underline-offset-4"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
        <StaticKeywordList items={tags} label={`${title} 的作品標籤`} />
        <a
          className="cta-button interactive-link mt-auto inline-flex min-h-11 w-full items-center justify-between gap-4 rounded-[var(--radius-sm)] px-4 py-3 text-sm font-extrabold"
          href={`#${project.id}`}
          data-magnetic
          data-cursor-variant="link"
          data-cursor-label="OPEN"
        >
          <span>查看案例</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </motion.article>
  );
}

export default function ProjectIndexGrid({ projects }) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {projects.map((project, index) => (
        <ProjectOverviewCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
}
// Codex-Fix: Keep the below-fold featured-work cards in their own lazy chunk while preserving real anchors and media previews.
