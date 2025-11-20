'use client';

import { useState, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

type CpvPillProps = {
  cpvCode: string;
};

const CpvPill = ({ cpvCode }: CpvPillProps) => {
  const description = useSelector((state: RootState) => state.cpv.cpvs[cpvCode]);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);
  const [pos, setPos] = useState<{ left: number; top: number; width: number } | null>(null);

  useLayoutEffect(() => {
    if (!visible || !ref.current) return;

    const update = () => {
      const rect = ref.current!.getBoundingClientRect();
      setPos({
        left: rect.left + rect.width / 2,
        top: rect.top,
        width: rect.width,
      });
    };

    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [visible]);

  return (
    <>
      <span
        ref={ref}
        className="relative inline-block"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        data-testid={`cpv-pill-${cpvCode}`}
        tabIndex={0}
      >
        <span className="bg-slate-200 text-slate-700 p-1 rounded text-xs font-mono cursor-pointer select-none">
          {cpvCode}
        </span>
      </span>

      {description && visible && pos &&
        createPortal(
          <div
            role="tooltip"
            className="fixed z-50 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-pre-line shadow-lg"
            style={{
              left: Math.max(8, pos.left - 8),
              top: Math.max(8, pos.top - 8),
              transform: "translate(-50%, -100%)",
              maxWidth: 320,
            }}
          >
            {description}
          </div>,
          document.body
        )}
    </>
  );
};

export default CpvPill;