import type { saveSearchRequest } from "../../models/TendersApi";
import { requestWithAuth } from "../_http";

/**
 * Save / list / delete user alerts (saved searches).
 * Export both old and new names for compatibility.
 */
export const saveAlert = (search: saveSearchRequest) =>
  requestWithAuth("/user/search", {
    method: "POST",
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

export const getSavedAlerts = () =>
  requestWithAuth("/user/search", { method: "GET" });

export const deleteAlert = (search: saveSearchRequest) =>
  requestWithAuth("/user/search/delete", {
    method: "POST",
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

/* Backwards-compatible aliases */
export const saveSearch = saveAlert;
export const getSavedSearches = getSavedAlerts;
export const deleteSearch = deleteAlert;