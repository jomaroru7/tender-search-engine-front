import { useSelector } from "react-redux";
import { useState } from "react";
import type { RootState } from "../../store";

type CompanyFormProps = {
  initialName?: string;
  initialLocation?: string;
  initialBudget?: number | string;
  initialCpvs?: string[];
  title: string;
  submitLabel: string;
  onSubmit: (data: { name: string; location: string; budget: number; cpvs: string[] }) => void;
};

const CompanyForm = ({
  initialName = "",
  initialLocation = "",
  initialBudget = "",
  initialCpvs = [],
  title,
  submitLabel,
  onSubmit,
}: CompanyFormProps) => {
  const cpvMap = useSelector((state: RootState) => state.cpv.cpvs);
  const cpvEntries = Object.entries(cpvMap);

  const [name, setName] = useState(initialName);
  const [location, setLocation] = useState(initialLocation);
  const [budget, setBudget] = useState(initialBudget.toString());
  const [cpvSearch, setCpvSearch] = useState("");
  const [selectedCpvs, setSelectedCpvs] = useState<string[]>(initialCpvs);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      location,
      budget: Number(budget),
      cpvs: selectedCpvs,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto mt-16 bg-white/80 backdrop-blur shadow-lg rounded-2xl px-8 py-10 border border-slate-200"
    >
      <h2 className="text-3xl font-bold mb-8 text-slate-800 text-center">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <label className="flex flex-col gap-2">
          <span className="font-semibold text-slate-700">Nombre de la empresa</span>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400 transition"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-semibold text-slate-700">Localización</span>
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            required
            className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400 transition"
          />
        </label>
        <label className="flex flex-col gap-2 md:col-span-2">
          <span className="font-semibold text-slate-700">Presupuesto (€)</span>
          <input
            type="number"
            value={budget}
            onChange={e => setBudget(e.target.value)}
            required
            min={0}
            className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400 transition"
          />
        </label>
        <div className="md:col-span-2">
          <span className="block font-semibold text-slate-700 mb-2">CPVs de la empresa</span>
          <input
            type="text"
            placeholder="Buscar CPV por código o descripción..."
            value={cpvSearch}
            onChange={e => setCpvSearch(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-slate-400 transition"
          />
          {cpvSearch && (
            <div className="max-h-40 overflow-y-auto border border-slate-200 rounded-lg bg-white shadow mb-2">
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
      </div>
      <button
        type="submit"
        className="mt-8 w-full bg-slate-800 text-white py-3 rounded-lg font-bold text-lg hover:bg-slate-700 transition"
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default CompanyForm;