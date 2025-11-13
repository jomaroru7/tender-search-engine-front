import { describe, it, expect, vi, beforeEach } from "vitest";
import { getTenders, getTendersCardsData } from "./searchService";
import { requestWithAuth } from "../_http";

vi.mock("../_http", () => ({ requestWithAuth: vi.fn() }));

// typed as a Vitest mock
const mockedRequest = requestWithAuth as unknown as ReturnType<typeof vi.fn>;

beforeEach(() => {
  vi.resetAllMocks();
});

describe("searchService", () => {
  it("getTenders returns API data when status 200", async () => {
    const apiResp = {
      page: 1,
      page_size: 10,
      total_results: 1,
      results: [
        {
          ID: "1",
          Contratacion: "Nombre",
          Plazo_limite: "2025-12-01",
          Importe_estimado: 12345,
          Titulo: "Titulo",
          Lugar_Ejecucion: "Ciudad",
          Codigo_CPV: ["111"],
          score: 4.2,
        },
      ],
    };
    mockedRequest.mockResolvedValue({ status: 200, data: apiResp });

    const res = await getTenders({ invoicing: 0, place: "", activity: "", page: 1, page_size: 10, cpv_list: [] });
    expect(res).toEqual(apiResp);
    expect(mockedRequest).toHaveBeenCalledWith("/search", expect.objectContaining({ method: "POST" }));
  });

  it("getTenders throws when non-200", async () => {
    mockedRequest.mockResolvedValue({ status: 422, errors: { detail: ["err"] } });
    await expect(
      getTenders({ invoicing: 0, place: "", activity: "", page: 1, page_size: 10, cpv_list: [] })
    ).rejects.toThrow();
  });

  it("getTendersCardsData maps API response to CardData shape and pagination", async () => {
    const apiResp = {
      page: 2,
      page_size: 5,
      total_results: 42,
      results: [
        {
          ID: "abc",
          Contratacion: "C",
          Plazo_limite: "2025-12-01",
          Importe_estimado: 1000,
          Titulo: "T",
          Lugar_Ejecucion: "L",
          Codigo_CPV: ["A"],
          score: 3.5,
        },
      ],
    };
    mockedRequest.mockResolvedValue({ status: 200, data: apiResp });

    const out = await getTendersCardsData({
      invoicing: 0,
      place: "",
      activity: "",
      page: 2,
      page_size: 5,
      cpv_list: [],
    });

    expect(out.page).toBe(2);
    expect(out.pageSize).toBe(5);
    expect(out.totalResults).toBe(42);
    expect(out.tenders[0].id).toBe("abc");
    expect(mockedRequest).toHaveBeenCalled();
  });
});