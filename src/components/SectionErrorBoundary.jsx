import { Component } from "react";

export default class SectionErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    if (import.meta.env.DEV) console.error("Section render failed", error);
  }

  reset = () => this.setState({ hasError: false });

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <section className="px-[clamp(1.25rem,6vw,10vw)] py-20 text-[var(--theme-text)]" role="alert">
        <div className="mx-auto grid max-w-3xl gap-5 rounded-[var(--radius-md)] border border-[color:var(--theme-line)] p-6">
          <p className="meta-label text-[var(--theme-accent)]">區段載入錯誤</p>
          <h2 className="zh-heading text-2xl">{this.props.sectionName ?? "這個區段"}暫時無法顯示</h2>
          <p className="zh-copy text-[color:var(--theme-muted)]">其他作品內容仍可繼續閱讀；你可以重試此區段或返回作品索引。</p>
          <div className="flex flex-wrap gap-3">
            <button className="cta-button chip-text rounded-full px-5 py-3 text-sm font-extrabold" type="button" onClick={this.reset}>重新嘗試</button>
            <a className="interactive-link chip-text rounded-full border border-[color:var(--theme-line)] px-5 py-3 text-sm font-extrabold" href="#project-index-title">返回作品索引</a>
          </div>
        </div>
      </section>
    );
  }
}
