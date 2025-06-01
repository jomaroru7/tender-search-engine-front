import type { getTendersRequest, getTendersResponse } from "../models/TendersApi";
import type { CardData } from "../models/TendersFront";

const ENV = import.meta.env;

export const getTenders = ({ invoicing, place, activity }: getTendersRequest): Promise<getTendersResponse[]> => {
    return fetch(ENV.VITE_GET_TENDERS_URL+"/search", {
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
        .then(tenders => tenderResponseToCardsData(tenders));
};

const tenderResponseToCardsData = (tenders: getTendersResponse[]): CardData[] => {
    return tenders.map(tender => ({
        tenderName: tender.Contratacion,
        endDate: tender.Plazo_limite,
        budget: tender.Importe_estimado,
        resume: tender.Titulo,
        location: tender.Lugar_Ejecucion,
        CPVCodes: tender.Codigo_CPV.map(String),
        score: tender.score
    }));
};