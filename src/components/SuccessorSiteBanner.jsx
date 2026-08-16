import { successorSite } from "../config/site.js";

// 第一代站點的指路牌:任何從舊網址、舊 QR 或搜尋結果進來的人,第一眼就看得到第二代在哪裡。
// 走文件流而非固定定位——導覽列是 fixed 的浮動膠囊(top-4),固定橫幅會與它疊在一起;
// 上方留白讓開膠囊高度。配色只用既有 theme token,不新增顏色,維持已核准的視覺系統。
export default function SuccessorSiteBanner() {
  return (
    <aside
      className="px-[var(--page-gutter)] pt-24 pb-2 md:pt-28"
      aria-label="第二代作品集連結"
    >
      <a
        href={successorSite.url}
        className="successor-banner mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 rounded-2xl border border-[color:var(--theme-accent)] bg-[var(--theme-surface)] px-5 py-4 text-[var(--theme-text)] no-underline"
        data-cursor-variant="nav"
        data-cursor-label="新站"
      >
        <span className="text-sm leading-relaxed md:text-base">
          {successorSite.note}
          <span className="text-[var(--theme-muted)]">第二代已上線,作品與研究都更新在那裡。</span>
        </span>
        <span className="meta-label whitespace-nowrap rounded-full border border-[color:var(--theme-accent)] px-4 py-2 text-[var(--theme-accent)]">
          {successorSite.label} →
        </span>
      </a>
    </aside>
  );
}
