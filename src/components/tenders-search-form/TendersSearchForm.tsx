import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import type { RootState, AppDispatch } from "../../store";
import { getTendersCardsData } from "../../services/tendersService";
import { setTenders } from "../../store/slices/tenderSlice";
import { toast } from "react-toastify";
import SpinnerOverlay from "../spinner-overlay/SpinnerOverlay";

const TendersSearchForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const company = useSelector((state: RootState) => state.company);
    const [invoicing, setInvoicing] = useState(company.budget);
    const [place, setPlace] = useState(company.location);
    const [description, setDescription] = useState(company.description);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const tenders = await getTendersCardsData({
                invoicing,
                place,
                activity: description,
            });
            console.log(tenders)
            dispatch(setTenders(tenders));
            toast.success("Licitaciones actualizadas.");
        } catch (err) {
            console.error(err)
            toast.error("No se pudieron obtener las licitaciones.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && (
                <SpinnerOverlay message="Estamos ejecutando la búsqueda de licitaciones con sus especificaciones. Esto puede llevar algunos minutos." />
            )}
            <form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-4 flex-wrap bg-white/80 backdrop-blur shadow-lg rounded-2xl px-8 py-10 border border-slate-200">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Presupuesto</label>
                        <input
                            type="number"
                            value={invoicing}
                            onChange={e => setInvoicing(Number(e.target.value))}
                            className="border border-slate-300 rounded-lg px-4 py-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Localización</label>
                        <input
                            type="text"
                            value={place}
                            onChange={e => setPlace(e.target.value)}
                            className="border border-slate-300 rounded-lg px-4 py-2 w-full"
                        />
                    </div>
                    <div className="min-w-[250px] flex-1">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Descripción de la actividad de la empresa</label>
                        <textarea
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