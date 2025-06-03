type ScoreGraphProps = {
  score: number;
  max?: number;
};

const ScoreGraph = ({ score, max = 5 }: ScoreGraphProps) => {
  const normalizedScore = Math.round(score * max * 100) / 100;

  return (
    <div className="flex items-end gap-1 mt-2" title={`Puntuación: ${normalizedScore}/${max}`}>
      {Array.from({ length: max }, (_, i) => {
        const n = i + 1;
        let fill = "bg-gray-300";
        let style: React.CSSProperties = {
          width: "6px",
          height: `${6 + n * 6}px`
        };

        if (normalizedScore >= n) {
          fill = "bg-green-500";
        } else if (normalizedScore > n - 1 && normalizedScore < n) {
          const percent = (normalizedScore - (n - 1)) * 100;
          fill = "";
          style.background = `linear-gradient(to top, #22c55e ${percent}%, #d1d5db ${percent}%)`;
        }

        return (
          <div
            key={n}
            role="presentation"
            className={`transition-all duration-200 rounded-sm ${fill}`}
            style={style}
          />
        );
      })}
      <span className="ml-2 text-xs text-slate-600">{normalizedScore}/{max}</span>
    </div>
  );
};

export default ScoreGraph;