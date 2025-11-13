import { describe, it, expect, vi, beforeEach } from "vitest";
import { saveAlert, getSavedAlerts, deleteAlert, saveSearch, getSavedSearches, deleteSearch } from "./alertsService";
import { requestWithAuth } from "../_http";

vi.mock("../_http", () => ({ requestWithAuth: vi.fn() }));
const mockedRequest = requestWithAuth as unknown as ReturnType<typeof vi.fn>;

beforeEach(() => {
  mockedRequest.mockReset();
});

describe("alertsService", () => {
  const sample = { invoicing: 0, place: "P", activity: "A", page: 1, page_size: 10, cpv_list: [], exact_place: false };

  it("saveAlert calls requestWithAuth and returns result", async () => {
    mockedRequest.mockResolvedValue({ status: 200, data: { ok: true } });
    const res = await saveAlert(sample as any);
    expect(res).toEqual({ status: 200, data: { ok: true } });
    expect(mockedRequest).toHaveBeenCalledWith("/user/search", expect.objectContaining({ method: "POST" }));
  });

  it("getSavedAlerts calls requestWithAuth and returns result", async () => {
    mockedRequest.mockResolvedValue({ status: 200, data: [{ place: "x" }] });
    const res = await getSavedAlerts();
    expect(res).toEqual({ status: 200, data: [{ place: "x" }] });
    expect(mockedRequest).toHaveBeenCalledWith("/user/search", expect.objectContaining({ method: "GET" }));
  });

  it("deleteAlert calls requestWithAuth and returns result", async () => {
    mockedRequest.mockResolvedValue({ status: 200, data: { ok: true } });
    const res = await deleteAlert(sample as any);
    expect(res).toEqual({ status: 200, data: { ok: true } });
    expect(mockedRequest).toHaveBeenCalledWith("/user/search", expect.objectContaining({ method: "DELETE" }));
  });

  it("aliases (saveSearch/getSavedSearches/deleteSearch) point to same behavior", async () => {
    mockedRequest.mockResolvedValue({ status: 200, data: { ok: true } });
    expect(await saveSearch(sample as any)).toEqual({ status: 200, data: { ok: true } });
    expect(await getSavedSearches()).toEqual({ status: 200, data: { ok: true } });
    expect(await deleteSearch(sample as any)).toEqual({ status: 200, data: { ok: true } });
  });
});