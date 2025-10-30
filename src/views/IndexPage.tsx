import { useSelector, useDispatch } from "react-redux";
import { useCallback, useState } from "react";
import type { RootState, AppDispatch } from "../store";
import CardsGrid from "../components/cards-grid/CardsGrid";
import TendersSearchForm from "../components/tenders-search-form/TendersSearchForm";
import Pagination from "../components/pagination/Pagination";
import { getTendersCardsData } from "../services/tenders/tendersService";
import { setTendersData } from "../store/slices/tenderSlice";
import { toast } from "react-toastify";

function IndexPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { tenders, totalResults, page, pageSize, filters } = useSelector((state: RootState) => state.tender);

  const [loading, setLoading] = useState(false);

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

  return (
    <main className="flex flex-col">
      <TendersSearchForm onSearch={handleSearch} loading={loading} />
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