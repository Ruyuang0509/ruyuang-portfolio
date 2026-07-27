import { useState } from "react";

export default function ResponsiveImage({
  image,
  className = "",
  sizes = "100vw",
  loading = "lazy",
  fetchPriority = "auto",
  style,
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`${className} grid place-items-center bg-[color:var(--theme-surface)] p-4 text-center`}
        role="img"
        aria-label={`影像載入失敗：${image.alt}`}
        style={style}
      >
        <span className="zh-caption max-w-[24rem] text-[color:var(--theme-muted)]">
          影像暫時無法顯示；請參考同一卡片的標題與說明。
        </span>
      </div>
    );
  }

  return (
    <picture>
      {image.avifSrcSet ? <source type="image/avif" srcSet={image.avifSrcSet} sizes={sizes} /> : null}
      {image.webpSrcSet ? <source type="image/webp" srcSet={image.webpSrcSet} sizes={sizes} /> : null}
      <img
        className={className}
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        style={style}
        onError={() => setHasError(true)}
      />
    </picture>
  );
}
// Codex-Fix: Share one responsive image and readable failure fallback across index and case-study chunks.
