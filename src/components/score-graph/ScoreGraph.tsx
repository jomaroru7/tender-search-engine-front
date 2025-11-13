import React from "react";

type ScoreGraphProps = {
  score: number;
  max?: number;
};

const ScoreGraph = ({ score, max = 5 }: ScoreGraphProps) => {
  const normalizedScore = Math.round(score * max * 100) / 100;

  const GREEN_CLASS = "bg-green-500";
  const YELLOW_CLASS = "bg-amber-400";
  const RED_CLASS = "bg-red-500";
  const GRAY_CLASS = "bg-gray-300";

  const GREEN_HEX = "#22c55e";
  const YELLOW_HEX = "#f59e0b";
  const RED_HEX = "#ef4444";
  const GRAY_HEX = "#d1d5db";

  const getColor = (totalScore: number) => {
    if (totalScore >= 3.8) return { cls: GREEN_CLASS, hex: GREEN_HEX };
    if (totalScore >= 2) return { cls: YELLOW_CLASS, hex: YELLOW_HEX };
    return { cls: RED_CLASS, hex: RED_HEX };
  };

  const filled = getColor(normalizedScore);

  return (
    <div className="flex items-end gap-1 mt-2" title={`Puntuación: ${normalizedScore}/${max}`}>
      {Array.from({ length: max }, (_, i) => {
        const n = i + 1;
        // default: empty bar - allow tailwind class to define color
        let className = `transition-all duration-200 rounded-sm ${GRAY_CLASS}`;
        let style: React.CSSProperties = {
          width: "6px",
          height: `${6 + n * 6}px`,
        };

        if (normalizedScore >= n) {
          // full bar: apply color class and inline background to match color
          className = `transition-all duration-200 rounded-sm ${filled.cls}`;
          style.background = filled.hex;
        } else if (normalizedScore > n - 1 && normalizedScore < n) {
          // partial bar: no color class, use gradient inline
          const percent = (normalizedScore - (n - 1)) * 100;
          className = "transition-all duration-200 rounded-sm";
          style.background = `linear-gradient(to top, ${filled.hex} ${percent}%, ${GRAY_HEX} ${percent}%)`;
        } else {
          // empty: keep GRAY_CLASS and no inline background so class is present
          style.background = undefined;
        }

        return (
          <div
            key={n}
            role="presentation"
            className={className}
            style={style}
          />
        );
      })}
      <span className="ml-2 text-xs text-slate-600">{normalizedScore}/{max}</span>
    </div>
  );
};

export default ScoreGraph;