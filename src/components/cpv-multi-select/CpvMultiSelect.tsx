import { useSelector } from "react-redux";
import { useState, useId } from "react";
import type { RootState } from "../../store";

type CpvMultiSelectProps = {
  selectedCpvs: string[];
  setSelectedCpvs: (cpvs: string[]) => void;
  label?: string;
  placeholder?: string;
};

const CpvMultiSelect = ({
  selectedCpvs,
  setSelectedCpvs,
  label = "CPVs",
  placeholder = "Buscar CPV por código o descripción...",
}: CpvMultiSelectProps) => {
  const cpvMap = useSelector((state: RootState) => state.cpv.cpvs);
  const cpvEntries = Object.entries(cpvMap);
  const [cpvSearch, setCpvSearch] = useState("");
  const inputId = useId();

  const filteredCpvs = cpvEntries.filter(
    ([code, desc]) =>
      code.toLowerCase().includes(cpvSearch.toLowerCase()) ||
      desc.toLowerCase().includes(cpvSearch.toLowerCase())
  );

  const handleCpvSelect = (code: string) => {
    if (!selectedCpvs.includes(code)) {
      setSelectedCpvs([...selectedCpvs, code]);
    }
    setCpvSearch("");
  };

  const handleCpvRemove = (code: string) => {
    setSelectedCpvs(selectedCpvs.filter(c => c !== code));
  };

  return (
    <div className="min-w-[250px] flex-1">
      <label htmlFor={inputId} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <input
        id={inputId}
        type="text"
        placeholder={placeholder}
        value={cpvSearch}
        onChange={e => setCpvSearch(e.target.value)}
        className="w-full border border-slate-300 rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-slate-400 transition"
      />
      {cpvSearch && (
        <div className="max-h-40 overflow-y-auto border border-slate-200 rounded-lg bg-white shadow mb-2 z-10 relative">
          {filteredCpvs.length === 0 && (
            <div className="p-2 text-slate-400">No hay resultados</div>
          )}
          {filteredCpvs.slice(0, 10).map(([code, desc]) => (
            <button
              type="button"
              key={code}
              onClick={() => handleCpvSelect(code)}
              className="block w-full text-left px-4 py-2 hover:bg-slate-100 transition"
            >
              <span className="font-mono text-blue-700">{code}</span> — <span>{desc}</span>
            </button>
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-2 mt-2">
        {selectedCpvs.map(code => (
          <span key={code} className="bg-slate-200 text-slate-700 px-3 py-1 rounded-full text-xs flex items-center">
            <span className="font-mono">{code}</span>
            <button
              type="button"
              onClick={() => handleCpvRemove(code)}
              className="ml-2 text-red-500 hover:text-red-700 font-bold"
              aria-label={`Quitar ${code}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default CpvMultiSelect;