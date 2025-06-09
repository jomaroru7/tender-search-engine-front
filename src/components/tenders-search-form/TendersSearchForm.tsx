import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import SpinnerOverlay from "../spinner-overlay/SpinnerOverlay";

type Props = {
  onSearch: (filters: { invoicing: number; place: string; activity: string }) => void;
  loading?: boolean;
};

const TendersSearchForm = ({ onSearch, loading }: Props) => {
  const company = useSelector((state: RootState) => state.company);
  const [invoicing, setInvoicing] = useState(company.budget);
  const [place, setPlace] = useState(company.location);
  const [description, setDescription] = useState(company.description);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSearch({ invoicing, place, activity: description });
  };

  return (
    <>
      {loading && (
        <SpinnerOverlay message="Estamos ejecutando la búsqueda de licitaciones con sus especificaciones. Esto puede llevar algunos minutos." />
      )}
      <form onSubmit={handleSubmit} className="mb-8 text-white flex flex-col gap-4 flex-wrap bg-slate-800 backdrop-blur shadow-lg rounded-2xl px-8 py-10 border border-slate-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div>
            <label className="block text-sm font-medium  mb-1">Facturación anual</label>
            <input
              data-testid="input-budget"
              type="number"
              value={invoicing}
              onChange={e => setInvoicing(Number(e.target.value))}
              className="border border-slate-300 rounded-lg px-4 py-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Localización</label>
            <input
              data-testid="input-location"
              type="text"
              value={place}
              onChange={e => setPlace(e.target.value)}
              className="border border-slate-300 rounded-lg px-4 py-2 w-full"
            />
          </div>
          <div className="min-w-[250px] flex-1">
            <label className="block text-sm font-medium mb-1">Descripción de la actividad de la empresa</label>
            <textarea
              data-testid="textarea-description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Escriba la descripción de su empresa aquí, esta será utilizada para buscar las licitaciones mas adecuadas para usted"
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