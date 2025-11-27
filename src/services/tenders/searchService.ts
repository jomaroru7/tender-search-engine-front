import type {
  getTendersRequest,
  getTendersResponse,
} from "../../models/TendersApi";
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
      cpv_list: cpv_list || [],
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
  totalResults: number;
  pageSize: number;
}> => {
  const tendersResponse = await getTenders({ invoicing, place, activity, page, page_size, cpv_list, exact_place });
  const cards: CardData[] = tendersResponse.results.map((t) => ({
    id: t.ID,
    tenderName: t.Contratacion,
    endDate: t.Plazo_limite,
    budget: t.Presupuesto_sin_IVA,
    resume: t.Titulo,
    location: t.Lugar_Ejecucion,
    CPVCodes: t.Codigo_CPV,
    score: t.score,
    scoreBreakdown: {
      score_activity: t.score_activity,
      score_invoicing: t.score_invoicing,
      score_place: t.score_place,
    },
  })) as CardData[];

  return {
    tenders: cards,
    totalResults: tendersResponse.total_results || 0,
    pageSize: tendersResponse.page_size || 10,
  };
};