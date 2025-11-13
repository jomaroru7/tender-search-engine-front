import { requestWithAuth } from "../_http";

/**
 * Get recent search history: GET /search/history?limit=...
 */
export const getSearchHistory = (limit?: number) => {
  const query = typeof limit === "number" ? `?limit=${encodeURIComponent(String(limit))}` : "";
  return requestWithAuth(`/search/history${query}`, { method: "GET" });
};