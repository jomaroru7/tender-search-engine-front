import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import type { RootState, AppDispatch } from "../../store";
import { getTendersCardsData } from "../../services/tendersService";
import { setTenders } from "../../store/slices/tenderSlice";
import { toast } from "react-toastify";
import CpvMultiSelect from "../cpv-multi-select/CpvMultiSelect";

const TendersSearchForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const company = useSelector((state: RootState) => state.company);
  const [invoicing, setInvoicing] = useState(company.budget);
  const [place, setPlace] = useState(company.location);
  const [selectedCpvs, setSelectedCpvs] = useState<string[]>(company.cpvs || []);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const tenders = await getTendersCardsData({
        invoicing,
        place,
        activity: selectedCpvs[0] || "",
      });
      dispatch(setTenders(tenders));
      toast.success("Licitaciones actualizadas.");
    } catch (err) {
      toast.error("No se pudieron obtener las licitaciones.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 flex flex-col md:flex-row gap-4 items-end flex-wrap">
      <div>
        <label className="block text-sm font-medium text-slate-700">Presupuesto</label>
        <input
          type="number"
          value={invoicing}
          onChange={e => setInvoicing(Number(e.target.value))}
          className="border border-slate-300 rounded-lg px-4 py-2 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Localización</label>
        <input
          type="text"
          value={place}
          onChange={e => setPlace(e.target.value)}
          className="border border-slate-300 rounded-lg px-4 py-2 w-full"
        />
      </div>
      <div className="min-w-[250px] flex-1">
        <CpvMultiSelect
          selectedCpvs={selectedCpvs}
          setSelectedCpvs={setSelectedCpvs}
          label="CPVs"
          placeholder="Buscar CPV por código o descripción..."
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-60"
      >
        {loading ? "Buscando..." : "Buscar licitaciones"}
      </button>
    </form>
  );
};

export default TendersSearchForm;