import type { getTenderRequest, getTenderResponse, getTendersRequest, getTendersResponse } from "../../models/TendersApi";
import type { CardData, TenderDetailData } from "../../models/TendersFront";
import { fetchAuthSession } from 'aws-amplify/auth';

const ENV = import.meta.env;

async function getAuthHeaders() {
    try {
        const session = await fetchAuthSession();
        const token = session.tokens?.idToken?.toString();

        return {
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` })
        };
    } catch {
        return {
            "Content-Type": "application/json"
        };
    }
}

export const getTenders = async ({ invoicing, place, activity, page, page_size = 10, cpv_list, exact_place }: getTendersRequest & { exact_place?: boolean }): Promise<getTendersResponse> => {
    const headers = await getAuthHeaders();

    return fetch(ENV.VITE_GET_TENDERS_URL + "/search", {
        method: "POST",
        headers,
        body: JSON.stringify({
            invoicing,
            place,
            activity,
            page,
            page_size,
            cpv_list,
            exact_place: !!exact_place,
        }),
    })
        .then(async response => {
            if (response.status === 401) {
                throw new Error("Authentication required. Please log in again.");
            }

            if (response.status === 503) {
                throw new Error("Authentication service temporarily unavailable. Please try again.");
            }

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || `Server error: ${response.status}`);
            }

            return response.json();
        });
};

export const getTendersCardsData = ({
    invoicing,
    place,
    activity,
    page = 1,
    page_size = 10,
    cpv_list,
    exact_place = false
}: getTendersRequest ): Promise<{
    tenders: CardData[],
    page: number,
    pageSize: number,
    totalResults: number
}> => {
    return getTenders({ invoicing, place, activity, page, page_size, cpv_list, exact_place })
        .then(tendersResponse => ({
            tenders: tendersResponseToCardsData(tendersResponse),
            page: tendersResponse.page,
            pageSize: tendersResponse.page_size,
            totalResults: tendersResponse.total_results
        }));
};

export const getTender = async ({ ID }: getTenderRequest): Promise<getTenderResponse> => {
    const headers = await getAuthHeaders();

    return fetch(ENV.VITE_GET_TENDERS_URL + "/get-tender", {
        method: "POST",
        headers,
        body: JSON.stringify({
            ID
        }),
    })
        .then(async response => {
            if (response.status === 401) {
                throw new Error("Authentication required. Please log in again.");
            }

            if (response.status === 503) {
                throw new Error("Authentication service temporarily unavailable. Please try again.");
            }

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || `Server error: ${response.status}`);
            }

            return response.json();
        });
};

export const getTenderDetailData = ({ ID }: getTenderRequest): Promise<TenderDetailData> => {
    return getTender({ ID })
        .then(id => tenderResponseToTenderDetailData(id));
};

const tendersResponseToCardsData = (tenders: getTendersResponse): CardData[] => {
    return tenders.results.map(tender => ({
        id: tender.ID,
        tenderName: tender.Contratacion,
        endDate: tender.Plazo_limite,
        budget: tender.Importe_estimado,
        resume: tender.Titulo,
        location: tender.Lugar_Ejecucion,
        CPVCodes: tender.Codigo_CPV,
        score: tender.score
    }));
};

const tenderResponseToTenderDetailData = (tender: getTenderResponse): TenderDetailData => {
    return {
        id: tender.ID,
        publicationDate: tender.Fecha_publicacion,
        tenderName: tender.Contratacion,
        endDate: tender.Plazo_limite,
        budget: tender.Importe_estimado,
        resume: tender.Titulo,
        location: tender.Lugar_Ejecucion,
        CPVCodes: tender.Codigo_CPV,
        url: tender.URL,
        budgetNoIva: tender.Presupuesto_sin_IVA,
        budgetTotal: tender.Importe_total,
        record: tender.Expediente,
        startDate: tender.Fecha_inicio,
        contractType: tender.Tipo_contrato,
        procedureType: tender.Tipo_procedimiento,
        lotsNumber: tender.Número_lotes,
        warrantyType: tender.Tipo_garantia,
        administrativeDocumexnt: tender.Pliego_admvo,
        specificationsSheet: tender.Pliego_prescripciones
    };
};
