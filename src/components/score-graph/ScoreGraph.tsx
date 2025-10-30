type ScoreGraphProps = {
  score: number;
  max?: number;
};

const ScoreGraph = ({ score, max = 5 }: ScoreGraphProps) => {
  const normalizedScore = Math.round(score * max * 100) / 100;

  const GREEN_HEX = "#22c55e";
  const YELLOW_HEX = "#f59e0b";
  const RED_HEX = "#ef4444";
  const GRAY_HEX = "#d1d5db";

  const getColorHex = (totalScore: number) => {
    if (totalScore >= 3.8) return GREEN_HEX;
    if (totalScore >= 2) return YELLOW_HEX;
    return RED_HEX;
  };

  const filledHex = getColorHex(normalizedScore);

  return (
    <div className="flex items-end gap-1 mt-2" title={`Puntuación: ${normalizedScore}/${max}`}>
      {Array.from({ length: max }, (_, i) => {
        const n = i + 1;
        let style: React.CSSProperties = {
          width: "6px",
          height: `${6 + n * 6}px`,
          background: GRAY_HEX,
        };

        if (normalizedScore >= n) {
          style.background = filledHex;
        } else if (normalizedScore > n - 1 && normalizedScore < n) {
          const percent = (normalizedScore - (n - 1)) * 100;
          style.background = `linear-gradient(to top, ${filledHex} ${percent}%, ${GRAY_HEX} ${percent}%)`;
        }

        return (
          <div
            key={n}
            role="presentation"
            className="transition-all duration-200 rounded-sm"
            style={style}
          />
        );
      })}
      <span className="ml-2 text-xs text-slate-600">{normalizedScore}/{max}</span>
    </div>
  );
};

export default ScoreGraph;