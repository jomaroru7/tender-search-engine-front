import type { getTenderRequest, getTenderResponse, getTendersRequest, getTendersResponse, saveSearchRequest as saveAlertRequest } from "../../models/TendersApi";
import type { CardData, TenderDetailData } from "../../models/TendersFront";
import { fetchAuthSession } from 'aws-amplify/auth';

const ENV = import.meta.env;

/**
 * Get authentication headers for requests.
 * Tries to retrieve the Amplify session (Cognito) and extract the idToken.
 * Returns an object with "Content-Type: application/json" and, if available,
 * "Authorization: Bearer <token>".
 *
 * NOTE: errors are caught and, on failure, only Content-Type is returned.
 */
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

/**
 * Execute tenders search against the /search endpoint.
 *
 * Parameters:
 *  - object matching getTendersRequest (invoicing, place, activity, page, page_size, cpv_list, exact_place)
 *
 * Behavior:
 *  - Builds headers via getAuthHeaders.
 *  - POSTs to ENV.VITE_GET_TENDERS_URL + "/search" with JSON body.
 *  - Handles specific HTTP statuses:
 *      - 401 -> throws authentication error
 *      - 503 -> throws service unavailable error
 *      - any other !response.ok -> tries to parse JSON error and throws with detail
 *  - On success returns parsed response.json() typed as getTendersResponse.
 *
 * Throws:
 *  - Error for 401/503/other non-OK statuses.
 */
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

/**
 * Convenience function to obtain the UI-friendly cards data.
 *
 * Parameters:
 *  - object matching getTendersRequest (page and page_size optional)
 *
 * Behavior:
 *  - Calls getTenders with the provided params and transforms the response
 *    to the structure used by the UI: CardData[], page, pageSize, totalResults.
 *  - Does not catch errors; lets the caller handle them.
 */
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

/**
 * Fetch detailed tender data from /get-tender.
 *
 * Parameters:
 *  - { ID } as defined in getTenderRequest
 *
 * Behavior:
 *  - Builds headers with getAuthHeaders().
 *  - POSTs to ENV.VITE_GET_TENDERS_URL + "/get-tender" with { ID }.
 *  - Handles 401, 503 and other non-OK statuses similarly to getTenders by throwing Error.
 *  - Returns parsed response JSON typed as getTenderResponse.
 */
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

/**
 * Convenience that transforms the getTender response into TenderDetailData
 * used by the UI.
 *
 * Parameters:
 *  - { ID } same as getTender
 *
 * Behavior:
 *  - Calls getTender and maps the returned object into TenderDetailData using tenderResponseToTenderDetailData.
 */
export const getTenderDetailData = ({ ID }: getTenderRequest): Promise<TenderDetailData> => {
    return getTender({ ID })
        .then(id => tenderResponseToTenderDetailData(id));
};

/**
 * Map the API response (getTendersResponse) to an array of CardData
 * consumable by the UI components (cards grid).
 *
 * Note: assumes tenders.results exists and has the expected shape.
 */
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

/**
 * Map an individual tender response to TenderDetailData.
 * Renames fields from the payload to the format used by the UI.
 *
 * Warning: some fields may be missing in the payload; this implementation
 * assumes the API returns the exact mapped names.
 */
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

/**
 * Save a user's search filters on the backend as alert.
 * Returns an object describing result:
 *  - { status: 200, data } on success
 *  - { status: 422, errors } on validation error
 *  - { status: <code>, errors } for other server errors
 *  - { status: 0, errors } for network/unexpected errors
 *
 * Implementation:
 *  - Uses getAuthHeaders() for headers (same behavior as getTenders).
 *  - POSTs to ENV.VITE_GET_TENDERS_URL + "/user/search" with JSON body.
 *  - Attempts to parse response.json() and logs to console for debugging.
 *  - Returns objects with status and data/errors instead of throwing exceptions,
 *    allowing callers to handle results without try/catch if desired.
 */
export const saveAlert = async (search: saveAlertRequest): Promise<{ status: number; data?: any; errors?: any }> => {
    const headers = await getAuthHeaders();
    const url = ENV.VITE_GET_TENDERS_URL + "/user/search";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify({
                invoicing: search.invoicing,
                place: search.place,
                activity: search.activity,
                page: search.page,
                page_size: search.page_size,
                cpv_list: search.cpv_list,
                exact_place: !!search.exact_place,
            }),
        });

        const parsed = await response.json().catch(() => null);
        // eslint-disable-next-line no-console
        console.log("saveSearch - response.json:", parsed, "status:", response.status, "url:", url);

        if (response.status === 200) {
            return { status: 200, data: parsed };
        }

        if (response.status === 422) {
            return { status: 422, errors: parsed };
        }

        if (!response.ok) {
            return { status: response.status, errors: parsed || `Server error: ${response.status}` };
        }

        return { status: response.status, data: parsed };
    } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error("saveSearch exception", err);
        return { status: 0, errors: String(err?.message || err) };
    }
};

/**
 * Retrieve the authenticated user's saved alerts.
 *
 * Returns an object describing result:
 *  - { status: 200, data } on success
 *  - { status: 422, errors } on validation error (if applicable)
 *  - { status: <code>, errors } for other server errors
 *  - { status: 0, errors } for network/unexpected errors
 *
 * Implementation:
 *  - Uses getAuthHeaders() for headers (same behavior as saveSearch/getTenders).
 *  - GET to ENV.VITE_GET_TENDERS_URL + "/user/search".
 *  - Attempts to parse response body as JSON (falls back to text) and logs for debugging.
 */
export const getSavedAlerts = async (): Promise<{ status: number; data?: any; errors?: any }> => {
    const headers = await getAuthHeaders();
    const url = ENV.VITE_GET_TENDERS_URL + "/user/search";

    try {
        const response = await fetch(url, {
            method: "GET",
            headers,
        });

        // robust parsing: try json, fallback to text
        const rawText = await response.text().catch(() => "");
        let parsed: any = null;
        try {
            parsed = rawText ? JSON.parse(rawText) : null;
        } catch {
            parsed = rawText;
        }

        // eslint-disable-next-line no-console
        console.log("getSavedSearches - response:", { url, status: response.status, parsed });

        if (response.status === 200) {
            return { status: 200, data: parsed };
        }

        if (response.status === 422) {
            return { status: 422, errors: parsed };
        }

        if (!response.ok) {
            return { status: response.status, errors: parsed || `Server error: ${response.status}` };
        }

        return { status: response.status, data: parsed };
    } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error("getSavedSearches exception", err);
        return { status: 0, errors: String(err?.message || err) };
    }
};

/**
 * Delete a saved user search (alert) on the backend.
 *
 * Returns an object describing result:
 *  - { status: 200, data } on success
 *  - { status: 422, errors } on validation error
 *  - { status: <code>, errors } for other server errors
 *  - { status: 0, errors } for network/unexpected errors
 *
 * Implementation notes:
 *  - Uses getAuthHeaders() for headers (same as saveSearch/getSavedSearches).
 *  - Sends DELETE to ENV.VITE_GET_TENDERS_URL + "/user/search" with the search payload in the body.
 *  - Parses response body robustly (JSON preferred, fallback to text) and logs for debugging.
 */
export const deleteAlert = async (search: saveAlertRequest): Promise<{ status: number; data?: any; errors?: any }> => {
    const headers = await getAuthHeaders();
    const url = ENV.VITE_GET_TENDERS_URL + "/user/search";

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers,
            body: JSON.stringify({
                invoicing: search.invoicing,
                place: search.place,
                activity: search.activity,
                page: search.page,
                page_size: search.page_size,
                cpv_list: search.cpv_list,
                exact_place: !!search.exact_place,
            }),
        });

        // robust parsing: try json, fallback to text
        const rawText = await response.text().catch(() => "");
        let parsed: any = null;
        try {
            parsed = rawText ? JSON.parse(rawText) : null;
        } catch {
            parsed = rawText;
        }

        // eslint-disable-next-line no-console
        console.log("deleteSearch - response:", { url, status: response.status, parsed });

        if (response.status === 200) {
            return { status: 200, data: parsed };
        }

        if (response.status === 422) {
            return { status: 422, errors: parsed };
        }

        if (!response.ok) {
            return { status: response.status, errors: parsed || `Failed to delete search: server returned ${response.status}` };
        }

        return { status: response.status, data: parsed };
    } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error("deleteSearch exception", err);
        return { status: 0, errors: String(err?.message || err) };
    }
};
