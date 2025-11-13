import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import SpinnerOverlay from "../spinner-overlay/SpinnerOverlay";
import CpvMultiSelect from "../cpv-multi-select/CpvMultiSelect";

type Props = {
  onSearch: (filters: { invoicing: number; place: string; activity: string; cpv_list: string[]; exact_place?: boolean }) => void;
  loading?: boolean;
};

const TendersSearchForm = ({ onSearch, loading }: Props) => {
  const company = useSelector((state: RootState) => state.company);
  const [invoicing, setInvoicing] = useState<number>(Number(company.budget) || 0);
  const [place, setPlace] = useState<string>(company.location || "");
  const [description, setDescription] = useState<string>(company.description || "");
  const [selectedCpvs, setSelectedCpvs] = useState<string[]>([]);
  const [exactPlace, setExactPlace] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSearch({ invoicing, place, activity: description, cpv_list: selectedCpvs, exact_place: exactPlace });
  };

  return (
    <>
      {loading && (
        <SpinnerOverlay message="Estamos ejecutando la búsqueda de licitaciones con sus especificaciones. Esto puede llevar algunos minutos." />
      )}
      <form onSubmit={handleSubmit} className="mb-8 text-white flex flex-col gap-4 flex-wrap bg-slate-800 backdrop-blur shadow-lg rounded-2xl px-8 py-10 border border-slate-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div>
            <label htmlFor="input-budget" className="block text-sm font-medium mb-1 min-h-[40px]">Mayor facturación anual en los últimos tres años (€)</label>
            <input
              id="input-budget"
              data-testid="input-budget"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={invoicing === 0 ? "" : String(invoicing)}
              onChange={e => {
                const val = e.target.value.replace(/\D/g, "");
                setInvoicing(val ? Number(val) : 0);
              }}
              className="border border-slate-300 rounded-lg px-4 py-2 w-full"
              placeholder="Ej: 450000"
              required
            />
          </div>
          <div>
            <label htmlFor="input-location" className="block text-sm font-medium mb-1 min-h-[40px]">Ámbito geográfico de actuación</label>
            <input
              id="input-location"
              data-testid="input-location"
              type="text"
              value={place}
              onChange={e => setPlace(e.target.value)}
              className="border border-slate-300 rounded-lg px-4 py-2 w-full"
              placeholder="Provincia donde presta sus servicios"
              required
            />

            <label className="inline-flex items-center gap-2 mt-2 text-sm text-slate-200">
              <input
                type="checkbox"
                data-testid="checkbox-exact-place"
                checked={exactPlace}
                onChange={e => setExactPlace(e.target.checked)}
                className="rounded"
              />
              <span>Búsqueda exacta</span>
            </label>
          </div>
          <CpvMultiSelect
            selectedCpvs={selectedCpvs}
            setSelectedCpvs={setSelectedCpvs}
            label="CPVs"
            placeholder="Buscar CPV por código o descripción..."
          />
          <div className="min-w-[250px] flex-1">
            <label className="block text-sm font-medium mb-1 min-h-[40px]">Descripción de la actividad de la empresa</label>
            <textarea
              data-testid="textarea-description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Cuéntanos brevemente a qué se dedica tu empresa. Esta información nos permitirá recomendarte licitaciones ajustadas a tu perfil."
              className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400 transition w-full min-h-[80px]"
            />
          </div>
        </div>
        <div className="flex lg:justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 flex-1 lg:flex-none text-white px-6 py-2 max-h-12 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Buscando..." : "Buscar licitaciones"}
          </button>
        </div>
      </form>
    </>
  );
};

export default TendersSearchForm;