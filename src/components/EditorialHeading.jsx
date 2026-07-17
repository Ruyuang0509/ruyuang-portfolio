function lineToText(line) {
  return Array.isArray(line) ? line.map(String).join("") : String(line ?? "");
}

export default function EditorialHeading({
  as: Tag = "h2",
  id,
  className = "",
  lines,
  renderLine,
  children,
}) {
  const hasStructuredLines = Array.isArray(lines) && lines.length > 0;

  if (!hasStructuredLines) {
    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    );
  }

  const accessibleText = typeof children === "string" ? children : lines.map(lineToText).join("");

  return (
    <Tag id={id} className={className} aria-label={accessibleText}>
      {lines.map((line, lineIndex) => {
        const phrases = Array.isArray(line) ? line : [line];
        const visualText = lineToText(line);
        const phraseContent = phrases.map((phrase, phraseIndex) => (
          <span
            key={`${phraseIndex}-${phrase}`}
            className="phrase-unit"
          >
            {phrase}
          </span>
        ));

        return (
          <span
            key={`${lineIndex}-${visualText}`}
            className="phrase-line"
            aria-hidden="true"
          >
            {renderLine ? renderLine(phraseContent, lineIndex) : phraseContent}
          </span>
        );
      })}
    </Tag>
  );
}
// Codex-Fix: Centralize phrase-aware Traditional Chinese heading composition with an aria-label so manual visual breaks do not damage screen-reader text.

