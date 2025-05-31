import type { getTendersRequest, getTendersResponse } from "../models/Tenders";

const ENV = import.meta.env;

export const getTenders = async ({ invoicing, place, activity }: getTendersRequest): Promise<getTendersResponse> => {
    try {
        const response = await fetch(ENV.VITE_GET_TENDERS, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                invoicing,
                place,
                activity
            }),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        return Promise.reject(error);
    }
};