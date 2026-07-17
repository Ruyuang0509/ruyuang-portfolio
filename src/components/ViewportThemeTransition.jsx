export default function ViewportThemeTransition() {
  return (
    <div className="viewport-theme-transition" aria-hidden="true">
      <div className="viewport-theme-transition__paper" data-theme-layer="paper" />
      <div className="viewport-theme-transition__mist" data-theme-layer="mist" />
      <div className="viewport-theme-transition__field viewport-theme-transition__field--a" data-theme-layer="field-a" />
      <div className="viewport-theme-transition__field viewport-theme-transition__field--b" data-theme-layer="field-b" />
      <div className="viewport-theme-transition__field viewport-theme-transition__field--c" data-theme-layer="field-c" />
    </div>
  );
}
