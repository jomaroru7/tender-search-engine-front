import type { getTenderRequest, getTenderResponse, getTendersRequest, getTendersResponse } from "../models/TendersApi";
import type { CardData, TenderDetailData } from "../models/TendersFront";

const ENV = import.meta.env;

export const getTenders = ({ invoicing, place, activity }: getTendersRequest): Promise<getTendersResponse[]> => {
    return fetch(ENV.VITE_GET_TENDERS_URL + "/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            invoicing,
            place,
            activity
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

export const getTendersCardsData = ({ invoicing, place, activity }: getTendersRequest): Promise<CardData[]> => {
    return getTenders({ invoicing, place, activity })
        .then(tenders => tendersResponseToCardsData(tenders));
};

export const getTender = ({ ID }: getTenderRequest): Promise<getTenderResponse> => {
    return fetch(ENV.VITE_GET_TENDERS_URL + "/get-tender", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ID
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

export const getTenderDetailData = ({ ID }: getTenderRequest): Promise<TenderDetailData> => {
    return getTender({ ID })
        .then(id => tenderResponseToTenderDetailData(id));
};

const tendersResponseToCardsData = (tenders: getTendersResponse[]): CardData[] => {
    return tenders.map(tender => ({
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