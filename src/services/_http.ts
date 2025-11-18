export type ApiResult<T> = { status: number; data?: T; errors?: any };

import { fetchAuthSession } from 'aws-amplify/auth';

const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Get authentication headers for requests.
 * Tries to retrieve the Amplify session (Cognito) and extract the idToken.
 * Returns an object with "Content-Type: application/json" and, if available,
 * "Authorization: Bearer <token>".
 *
 * NOTE: errors are caught and, on failure, only Content-Type is returned.
 */
export async function getAuthHeaders(): Promise<Record<string, string>> {
    try {
        const session: any = await fetchAuthSession();
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
 * Perform an authenticated fetch to the API, parse body (JSON or text) and normalize errors.
 *
 * Generic type T describes expected success data shape.
 * Returns ApiResult<T>.
 */
export async function requestWithAuth<T = any>(path: string, init: RequestInit): Promise<ApiResult<T>> {
    try {
        const headers = await getAuthHeaders();
        init.headers = {
            ...(init.headers as Record<string, string> || {}),
            ...headers,
        };

        const url = process.env.NEXT_PUBLIC_GET_TENDERS_URL + path;
        const response = await fetch(url, init);

        const rawText = await response.text().catch(() => "");
        let parsed: any = null;
        try {
            parsed = rawText ? JSON.parse(rawText) : null;
        } catch {
            parsed = rawText;
        }

        if (isDevelopment) {
            console.log("requestWithAuth", { url, method: init.method, status: response.status, parsed });
        }

        if (response.status === 200) {
            return { status: 200, data: parsed as T };
        }

        if (response.status === 422) {
            return { status: 422, errors: parsed };
        }

        if (!response.ok) {
            return { status: response.status, errors: parsed || `Server error: ${response.status}` };
        }

        return { status: response.status, data: parsed as T };
    } catch (err: any) {
        console.error("requestWithAuth exception", err);
        return { status: 0, errors: String(err?.message || err) };
    }
}