'use client';

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import SpinnerOverlay from "../spinner-overlay/SpinnerOverlay";
import CpvMultiSelect from "../cpv-multi-select/CpvMultiSelect";
import InfoTooltip from "../info-tooltip/InfoTooltip";

type Props = {
  onSearch: (filters: { invoicing: number; place: string; activity: string; cpv_list: string[]; exact_place?: boolean }) => void;
  loading?: boolean;
  loadingMessage?: string;
};

const formatNumberWithDots = (num: number) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const TendersSearchForm = ({ onSearch, loading, loadingMessage }: Props) => {
  const company = useSelector((state: RootState) => state.company);
  const savedFilters = useSelector((state: RootState) => state.tender.filters);
  
  // Usar los filtros guardados si existen, si no usar los datos de la empresa
  const [invoicing, setInvoicing] = useState<number>(
    savedFilters.invoicing > 0 ? savedFilters.invoicing : (Number(company.budget) || 0)
  );
  const [place, setPlace] = useState<string>(
    savedFilters.place || company.location || ""
  );
  const [description, setDescription] = useState<string>(
    savedFilters.activity || company.description || ""
  );
  const [selectedCpvs, setSelectedCpvs] = useState<string[]>(
    savedFilters.cpv_list || []
  );
  const [exactPlace, setExactPlace] = useState<boolean>(
    savedFilters.exact_place || false
  );

  // Sincronizar con los filtros guardados cuando cambien
  useEffect(() => {
    if (savedFilters.invoicing > 0) {
      setInvoicing(savedFilters.invoicing);
    }
    if (savedFilters.place) {
      setPlace(savedFilters.place);
    }
    if (savedFilters.activity) {
      setDescription(savedFilters.activity);
    }
    if (savedFilters.cpv_list && savedFilters.cpv_list.length > 0) {
      setSelectedCpvs(savedFilters.cpv_list);
    }
    setExactPlace(savedFilters.exact_place);
  }, [savedFilters]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSearch({ invoicing, place, activity: description, cpv_list: selectedCpvs, exact_place: exactPlace });
  };

  return (
    <>
      {loading && (
        <SpinnerOverlay message={loadingMessage} />
      )}
      <form onSubmit={handleSubmit} className="mb-8 text-white flex flex-col gap-4 flex-nowrap bg-slate-800 backdrop-blur shadow-lg rounded-2xl px-8 py-10 border border-slate-200">
        <div className="flex flex-col lg:flex-row gap-4 ">
          <div className="tour-step-budget flex-2/6">
            <div className="ml-1 flex flex-row min-h-10 items-baseline ">
              <label htmlFor="input-budget" className="block text-sm font-medium ">Mayor facturación anual en los últimos tres años (€)</label>
              <InfoTooltip
                text="Introduce la cifra más alta de facturación anual que ha tenido tu empresa en los últimos tres años."
                iconColor="text-orange-500"
                iconBgColor="fill-white"
                tooltipTextColor="text-black"
                tooltipBgColor="bg-white"
              />
            </div>
            <input
              id="input-budget"
              data-testid="input-budget"
              type="text"
              inputMode="numeric"
              pattern="[0-9.]*"
              value={invoicing === 0 ? "" : formatNumberWithDots(invoicing)}
              onChange={e => {
                const val = e.target.value.replace(/\D/g, "");
                setInvoicing(val ? Number(val) : 0);
              }}
              className="border border-slate-300 rounded-lg px-4 py-2 w-full"
              placeholder="Ej: 450000"
              required
            />
          </div>
          <div className="tour-step-location flex-2/6">
            <div className=" ml-1 flex flex-row min-h-10 items-baseline">
              <label htmlFor="input-location" className="block text-sm font-medium ">Ámbito geográfico de actuación</label>
              <InfoTooltip
                text="Introduce la provincia donde tu empresa presta sus servicios."
                iconColor="text-orange-500"
                iconBgColor="fill-white"
                tooltipTextColor="text-black"
                tooltipBgColor="bg-white"
              />
            </div>
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

            <label className="inline-flex items-center gap-2 mt-2 text-sm text-slate-200 tour-step-exact-place">
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
          <div className="tour-step-cpv flex-2/6">
            <CpvMultiSelect
              selectedCpvs={selectedCpvs}
              setSelectedCpvs={setSelectedCpvs}
              label="CPVs"
              placeholder="Buscar CPV por código o descripción..."
              infoTooltip={{
                text: "Códigos CPV de las actividades de tu empresa. IMPORTANTE: Seleccionar uno o varios CPVs hacen que la búsqueda sea exclusiva, haciendo que solo muestre licitaciones en las que aparezcan estos códigos.",
                iconColor: "text-orange-500",
                iconBgColor: "fill-white",
                tooltipTextColor: "text-black",
                tooltipBgColor: "bg-white",
              }}
            />
          </div>
        </div>
        <div className="min-w-[250px] flex-1 tour-step-description">
          <label className="block text-sm font-medium mb-1 min-h-10">Descripción de la actividad de la empresa</label>
          <textarea
            data-testid="textarea-description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Cuéntanos brevemente a qué se dedica tu empresa. Esta información nos permitirá recomendarte licitaciones ajustadas a tu perfil. Este será el campo más importante para identificar licitaciones relevantes."
            className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400 transition w-full min-h-20"
          />
        </div>
        <div className="flex lg:justify-end ">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 flex-1 lg:flex-none text-white px-6 py-2 max-h-12 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-60 tour-step-submit"
          >
            {loading ? "Buscando..." : "Buscar licitaciones"}
          </button>
        </div>
      </form>
    </>
  );
};

export default TendersSearchForm;