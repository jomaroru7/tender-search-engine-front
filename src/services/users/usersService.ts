import type { setUserRequest, setUserResponse } from "../../models/UsersApi";
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

export const setUser = async ({ email, companyName, companyBudget, companyDescription, companyLocation }: setUserRequest): Promise<setUserResponse> => {
    const headers = await getAuthHeaders();

    return fetch(ENV.VITE_SET_USER_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({
            email,
            companyName,
            companyBudget,
            companyDescription,
            companyLocation,
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