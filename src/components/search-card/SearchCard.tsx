'use client';

import { useState } from "react";
import { toast } from "react-toastify";
import { deleteSearch } from "../../services/tenders/alertsService";
import ConfirmationModal from "../confirmation-modal/ConfirmationModal";

export type SavedSearch = {
  invoicing?: number;
  place?: string;
  activity?: string;
  filters?: Record<string, any>;
  timestamp?: string;
  ttl?: number;
  cpv_list?: any[];
  exact_place?: boolean;
  [key: string]: any;
};

type SearchCardProps = {
  search: SavedSearch;
  onRestore?: (s: SavedSearch) => void;
  onDeleted?: (s: SavedSearch) => void;
};

const SearchCard = ({ search, onRestore, onDeleted }: SearchCardProps) => {
  const [deleting, setDeleting] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const invoicing = search.invoicing ?? search.filters?.invoicing ?? "";
  const place = search.place ?? search.filters?.place ?? "";
  const activity = search.activity ?? search.filters?.activity ?? "";
  const ts = search.timestamp ? new Date(search.timestamp).toLocaleString() : null;

  const handleDeleteConfirm = async () => {
    setConfirmDeleteOpen(false);
    setDeleting(true);
    try {
      const payload = {
        invoicing: search.invoicing ?? 0,
        place: search.place ?? "",
        activity: search.activity ?? "",
        page: (search as any).page ?? 1,
        page_size: (search as any).page_size ?? 10,
        cpv_list: search.cpv_list ?? [],
        exact_place: !!search.exact_place,
        timestamp: search.timestamp ?? "",
      };
      const res = await deleteSearch(payload);
      if (res.status === 200) {
        toast.success("Búsqueda eliminada.");
        onDeleted?.(search);
      } else if (res.status === 422) {
        toast.error("Error de validación al eliminar la búsqueda.");
        console.warn("deleteSearch validation errors:", res.errors);
      } else {
        toast.error(`Error al eliminar (status ${res.status}).`);
        console.error("deleteSearch error:", res);
      }
    } catch (err: any) {
      console.error("deleteSearch exception", err);
      toast.error("Error inesperado al eliminar la búsqueda.");
    } finally {
      setDeleting(false);
    }
  };

  const commonBtn =
    "inline-flex items-center justify-center gap-2 w-28 px-3 py-1.5 text-sm font-semibold rounded-md shadow-sm focus:outline-none disabled:opacity-50";

  return (
    <>
      <div className="p-4 bg-white/60 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-150">
        <div className="flex justify-between items-start gap-4">
          <div className="text-sm text-slate-700 dark:text-slate-200 flex-1">
            <div className="mb-2">
              <div className="text-xs text-slate-400 uppercase tracking-wider">Facturación</div>
              <div className="mt-1 text-sm font-medium text-slate-800 dark:text-white">{String(invoicing)}</div>
            </div>

            <div className="mb-2">
              <div className="text-xs text-slate-400 uppercase tracking-wider">Ámbito geográfico</div>
              <div className="mt-1 text-sm font-medium text-slate-800 dark:text-white">{String(place)}</div>
            </div>

            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">Actividad</div>
              <div className="mt-1 text-sm font-medium text-slate-800 dark:text-white">{String(activity)}</div>
            </div>

            {ts && <div className="mt-3 text-xs text-slate-400">Guardada: <span className="text-slate-500 dark:text-slate-300">{ts}</span></div>}
          </div>

          <div className="flex flex-col items-end gap-2">
            <button
              type="button"
              data-testid="restore-button"
              onClick={() => onRestore?.(search)}
              className={`${commonBtn} bg-orange-500 hover:bg-orange-600 text-white focus:ring-2 focus:ring-orange-300`}
              aria-label="Restaurar búsqueda"
              disabled={deleting}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h4l3-8 3 8h4M12 14v7" />
              </svg>
              Repetir
            </button>

            <button
              type="button"
              onClick={() => setConfirmDeleteOpen(true)}
              className={`${commonBtn} bg-red-600 hover:bg-red-700 text-white focus:ring-2 focus:ring-red-300`}
              disabled={deleting}
              aria-label="Eliminar búsqueda"
            >
              {deleting ? "Eliminando..." : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Eliminar
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <ConfirmationModal
        open={confirmDeleteOpen}
        title="Eliminar búsqueda guardada"
        description="¿Estás seguro de que quieres eliminar esta búsqueda guardada? Esta acción no se puede deshacer."
        confirmLabel={deleting ? "Eliminando..." : "Eliminar"}
        cancelLabel="Cancelar"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirmDeleteOpen(false)}
      />
    </>
  );
};

export default SearchCard;