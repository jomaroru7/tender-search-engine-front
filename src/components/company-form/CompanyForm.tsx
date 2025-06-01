import { useState } from "react";
import CpvMultiSelect from "../cpv-multi-select/CpvMultiSelect";

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
  const [name, setName] = useState(initialName);
  const [location, setLocation] = useState(initialLocation);
  const [budget, setBudget] = useState(initialBudget.toString());
  const [selectedCpvs, setSelectedCpvs] = useState<string[]>(initialCpvs);

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
          <CpvMultiSelect
            selectedCpvs={selectedCpvs}
            setSelectedCpvs={setSelectedCpvs}
            label=""
            placeholder="Buscar CPV por código o descripción..."
          />
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