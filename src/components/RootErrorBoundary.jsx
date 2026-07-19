import { Component } from "react";

export default class RootErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    if (import.meta.env.DEV) console.error("Portfolio root render failed", error);
  }

  reload = () => window.location.reload();

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="page-shell grid min-h-screen place-items-center px-5 py-20 text-[var(--theme-text)]" role="alert" aria-labelledby="root-error-title">
        <section className="evidence-panel grid max-w-2xl gap-5 rounded-[var(--radius-lg)] p-6 md:p-10">
          <p className="meta-label text-[var(--theme-accent)]">頁面載入錯誤</p>
          <h1 id="root-error-title" className="zh-heading text-[clamp(2rem,5vw,4rem)]">網站暫時無法完整顯示</h1>
          <p className="zh-copy text-[color:var(--theme-muted)]">請重新載入頁面。如果仍無法顯示，請稍後再試。</p>
          <button className="cta-button chip-text w-fit rounded-full px-6 py-3 text-sm font-extrabold" type="button" onClick={this.reload}>重新載入網站</button>
        </section>
      </main>
    );
  }
}
