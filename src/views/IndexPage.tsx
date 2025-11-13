import { useSelector, useDispatch } from "react-redux";
import { useCallback, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../store";
import CardsGrid from "../components/cards-grid/CardsGrid";
import TendersSearchForm from "../components/tenders-search-form/TendersSearchForm";
import Pagination from "../components/pagination/Pagination";
import { getTendersCardsData, saveAlert } from "../services/tenders/tendersService";
import { setTendersData } from "../store/slices/tenderSlice";
import { toast } from "react-toastify";

function IndexPage() {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();
  const { tenders, totalResults, page, pageSize, filters } = useSelector((state: RootState) => state.tender);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchTenders = useCallback(
    async (
      filtersToUse: { invoicing: number; place: string; activity: string; cpv_list?: string[]; exact_place?: boolean },
      pageToUse: number
    ) => {
      setLoading(true);
      try {
        const data = await getTendersCardsData({
          ...filtersToUse,
          page: pageToUse,
          page_size: pageSize,
          cpv_list: filtersToUse.cpv_list || [],
          exact_place: !!filtersToUse.exact_place,
        });
        dispatch(
          setTendersData({
            tenders: data.tenders,
            totalResults: data.totalResults,
            page: pageToUse,
            pageSize: data.pageSize,
            filters: filtersToUse,
          })
        );
      } catch (error: any) {
        console.error("fetchTenders failed", { error, filters: filtersToUse, page: pageToUse });
        toast.error(error?.message || "No se pudieron obtener las licitaciones.");
      } finally {
        setLoading(false);
      }
    },
    [dispatch, pageSize]
  );

  // parse query params / restored state and trigger search automatically
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const hasParams = Array.from(q.keys()).length > 0;
    const restoredFromState = (location.state as any)?.restoredSearch;

    if (!hasParams && !restoredFromState) return;

    const parseCpvList = (val?: string | null) => {
      if (!val) return [];
      try {
        return JSON.parse(decodeURIComponent(val));
      } catch {
        // fallback: comma separated
        return decodeURIComponent(val).split(",").map(s => s.trim()).filter(Boolean);
      }
    };

    const restoredFilters = {
      invoicing: Number(q.get("invoicing") ?? restoredFromState?.invoicing ?? 0),
      place: q.get("place") ?? restoredFromState?.place ?? "",
      activity: q.get("activity") ?? restoredFromState?.activity ?? "",
      cpv_list: parseCpvList(q.get("cpv_list") ?? undefined) as string[],
      exact_place: (q.get("exact_place") ?? String(restoredFromState?.exact_place ?? "false")) === "true",
    };

    const pageParam = Number(q.get("page") ?? 1);

    // trigger the search
    fetchTenders(restoredFilters, pageParam);

    // cleanup: remove query string so it doesn't re-trigger on navigation/back
    // replace current history entry without search
    navigate(location.pathname, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, location.state, fetchTenders, navigate]);

  const handleSearch = useCallback(
    async (newFilters: { invoicing: number; place: string; activity: string; cpv_list: string[]; exact_place?: boolean }) => {
      await fetchTenders(newFilters, 1);
      toast.success("Licitaciones actualizadas.");
    },
    [fetchTenders]
  );

  const handlePageChange = useCallback(
    async (newPage: number) => {
      await fetchTenders(filters, newPage);
    },
    [fetchTenders, filters]
  );

  const totalPages = Math.ceil((totalResults || 0) / pageSize);

  // Only allow saving if a search has been performed and there is at least one result (or filters exist)
  const canSaveSearch = !!filters && Object.keys(filters).length > 0 && (tenders?.length > 0 || totalResults > 0);

  const handleSaveSearch = useCallback(async () => {
    if (!canSaveSearch) {
      toast.info("Realiza una búsqueda antes de guardarla.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        invoicing: (filters as any).invoicing ?? 0,
        place: (filters as any).place ?? "",
        activity: (filters as any).activity ?? "",
        page: page,
        page_size: pageSize,
        cpv_list: (filters as any).cpv_list ?? [],
        exact_place: !!(filters as any).exact_place,
      };

      const res = await saveAlert(payload);
      if (res.status === 200) {
        toast.success("Búsqueda guardada correctamente.");
      } else if (res.status === 422) {
        // try to format validation error message
        const firstErr = res.errors?.detail?.[0] ?? res.errors;
        toast.error("Error de validación al guardar la búsqueda.");
        console.warn("saveSearch validation errors:", res.errors, firstErr);
      } else {
        toast.error(`Error al guardar la búsqueda (status ${res.status}).`);
        console.error("saveSearch error", res);
      }
    } catch (err: any) {
      console.error("saveSearch exception", err);
      toast.error("Error inesperado al guardar la búsqueda.");
    } finally {
      setSaving(false);
    }
  }, [canSaveSearch, filters, page, pageSize]);

  return (
    <main className="flex flex-col">
      <TendersSearchForm onSearch={handleSearch} loading={loading} />

      <div className="flex items-center justify-between mb-4 px-2">
        <div />
        <button
          type="button"
          onClick={handleSaveSearch}
          disabled={!canSaveSearch || saving}
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 disabled:opacity-50"
        >
          {saving ? "Guardando..." : "Guardar búsqueda"}
        </button>
      </div>

      <CardsGrid cardData={tenders} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
}

export default IndexPage;