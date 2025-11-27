import type { getTendersRequest, getTendersResponse } from "../../models/TendersApi";
import type { CardData } from "../../models/TendersFront";
import { requestWithAuth } from "../_http";

/**
 * Low-level call to /search
 */
export const getTenders = async ({
  invoicing,
  place,
  activity,
  page,
  page_size = 10,
  cpv_list,
  exact_place
}: getTendersRequest & { exact_place?: boolean }): Promise<getTendersResponse> => {
  const res = await requestWithAuth<getTendersResponse>("/search", {
    method: "POST",
    body: JSON.stringify({
      invoicing,
      place,
      activity,
      page,
      page_size,
      cpv_list,
      exact_place: !!exact_place,
    }),
  });

  if (res.status === 200) return res.data as getTendersResponse;
  throw new Error(res.errors ? JSON.stringify(res.errors) : `Server error: ${res.status}`);
};

/**
 * Convenience mapping for UI
 */
export const getTendersCardsData = async ({
  invoicing,
  place,
  activity,
  page = 1,
  page_size = 10,
  cpv_list,
  exact_place = false,
}: getTendersRequest & { exact_place?: boolean }): Promise<{
  tenders: CardData[];
  page: number;
  pageSize: number;
  totalResults: number;
}> => {
  const tendersResponse = await getTenders({ invoicing, place, activity, page, page_size, cpv_list, exact_place });
  return {
    tenders: tendersResponse.results.map((t) => ({
      id: t.ID,
      tenderName: t.Contratacion,
      endDate: t.Plazo_limite,
      budget: t.Importe_total,
      resume: t.Titulo,
      location: t.Lugar_Ejecucion,
      CPVCodes: t.Codigo_CPV,
      score: t.score,
    })) as CardData[],
    page: tendersResponse.page,
    pageSize: tendersResponse.page_size,
    totalResults: tendersResponse.total_results,
  };
};