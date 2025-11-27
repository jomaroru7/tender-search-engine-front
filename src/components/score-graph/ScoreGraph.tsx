import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

type ScoreGraphProps = {
  score: number;
  max?: number;
  scoreBreakdown?: {
    score_activity?: number;
    score_invoicing?: number;
    score_place?: number;
  };
};

const ScoreGraph = ({ score, max = 5, scoreBreakdown }: ScoreGraphProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
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

  // Cerrar tooltip al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (showTooltip) {
        setShowTooltip(false);
      }
    };

    if (showTooltip) {
      window.addEventListener('scroll', handleScroll, true);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [showTooltip]);

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!scoreBreakdown) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <>
      <div
        className="relative flex items-end gap-1 mt-2 cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {Array.from({ length: max }, (_, i) => {
          const n = i + 1;
          let className = `transition-all duration-200 rounded-sm ${GRAY_CLASS}`;
          let style: React.CSSProperties = {
            width: "6px",
            height: `${6 + n * 6}px`,
          };

          if (normalizedScore >= n) {
            className = `transition-all duration-200 rounded-sm ${filled.cls}`;
            style.background = filled.hex;
          } else if (normalizedScore > n - 1 && normalizedScore < n) {
            const percent = (normalizedScore - (n - 1)) * 100;
            className = "transition-all duration-200 rounded-sm";
            style.background = `linear-gradient(to top, ${filled.hex} ${percent}%, ${GRAY_HEX} ${percent}%)`;
          } else {
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

      {showTooltip && scoreBreakdown && typeof window !== 'undefined' && createPortal(
        <div
          className="fixed z-9999 bg-white border-2 border-red-500 rounded-lg shadow-xl p-3 min-w-[200px]"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-red-500 rotate-45"></div>
          
          <div className="text-xs font-semibold text-slate-700 mb-2">Desglose de puntuación</div>
          
          <div className="space-y-2">
            {scoreBreakdown.score_activity !== undefined && (
              <div className="flex items-end justify-between gap-3">
                <span className="text-xs text-slate-600 pb-0.5">Actividad:</span>
                <div className="flex items-center gap-1">
                  <ScoreGraph 
                    score={scoreBreakdown.score_activity} 
                    max={max}
                  />
                </div>
              </div>
            )}
            
            {scoreBreakdown.score_invoicing !== undefined && (
              <div className="flex items-end justify-between gap-3">
                <span className="text-xs text-slate-600 pb-0.5">Facturación:</span>
                <div className="flex items-center gap-1">
                  <ScoreGraph 
                    score={scoreBreakdown.score_invoicing} 
                    max={max}
                  />
                </div>
              </div>
            )}
            
            {scoreBreakdown.score_place !== undefined && (
              <div className="flex items-end justify-between gap-3">
                <span className="text-xs text-slate-600 pb-0.5">Ubicación:</span>
                <div className="flex items-center gap-1">
                  <ScoreGraph 
                    score={scoreBreakdown.score_place} 
                    max={max}
                  />
                </div>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default ScoreGraph;