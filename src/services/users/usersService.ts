import type { setUserRequest, setUserResponse } from "../../models/UsersApi";
import { requestWithAuth, getAuthHeaders } from "../_http";

/**
 * Updates the user's information in the backend.
 *
 * - Sends a `POST` to the SET_USER_URL with the provided form fields.
 * - Adds authentication headers obtained from `getAuthHeaders`.
 * - Throws readable errors for 401/503 responses and for non-ok responses.
 *
 * @param payload - Object containing the user's and company's data.
 * @returns The JSON response from the `setUser` endpoint (typed as `setUserResponse`).
 * @throws Error with a clear message in case of authentication issues or server errors.
 */
export const setUser = async ({
  email,
  companyName,
  companyBudget,
  companyDescription,
  companyLocation,
}: setUserRequest): Promise<setUserResponse> => {
  const headers = await getAuthHeaders();

  return fetch(process.env.NEXT_PUBLIC_SET_USER_URL!, {
    method: "POST",
    headers,
    body: JSON.stringify({
      email,
      companyName,
      companyBudget,
      companyDescription,
      companyLocation,
    }),
  }).then(async (response) => {
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
 * Deletes the authenticated user's account.
 *
 * - Calls `DELETE /user/delete` using the `requestWithAuth` helper
 *   (which already adds the base URL and auth headers).
 * - Returns the backend JSON when the server responds with 200,
 *   for example `{ message: string, deleted: true }`.
 * - Throws clear errors for 401 and other server error codes.
 *
 * @returns Object containing `message` and `deleted` if the deletion succeeded.
 * @throws Error if the request is unauthorized or there is another server error.
 */
export const deleteUser = async (): Promise<{ message?: string; deleted?: boolean }> => {
  const res = await requestWithAuth<{ message?: string; deleted?: boolean }>("/user", {
    method: "DELETE",
  });

  if (res.status === 200) {
    return res.data as { message?: string; deleted?: boolean };
  }

  if (res.status === 401) {
    throw new Error("Authentication required. Please log in again.");
  }

  throw new Error(res.errors ? JSON.stringify(res.errors) : `Server error: ${res.status}`);
};