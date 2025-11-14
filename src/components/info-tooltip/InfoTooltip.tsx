import { useState } from "react";

export type InfoTooltipProps = {
  text: string;
  className?: string;
  iconColor?: string;
  iconBgColor?: string;
  tooltipTextColor?: string;
  tooltipBgColor?: string;
};

const InfoTooltip = ({ text, className = "", iconColor= "currentColor", iconBgColor = "bg-slate-800", tooltipTextColor = "text-white", tooltipBgColor = "bg-slate-800" }: InfoTooltipProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <span className={`relative inline-block ${className}`}>
      <button
        type="button"
        aria-label="Información"
        className="ml-2 text-slate-500 hover:text-blue-600 focus:outline-none"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        onClick={() => setVisible(v => !v)}
        tabIndex={0}
        style={{ verticalAlign: "middle" }}
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className={iconColor + " " + iconBgColor} xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" fill=""/>
          <text x="10" y="15" textAnchor="middle" fontSize="12" fill="currentColor" >i</text>
        </svg>
      </button>
      {visible && (
        <div
          className={`absolute left-1/2 -translate-x-1/2 mt-2 z-50 ${tooltipBgColor} ${tooltipTextColor} text-sm rounded px-3 py-2 shadow-lg whitespace-pre-line w-[150px] lg:w-auto lg:min-w-[220px] lg: max-w-[300px]`}
          role="tooltip"
        >
          {text}
        </div>
      )}
    </span>
  );
};

export default InfoTooltip;