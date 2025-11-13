import { describe, it, expect, vi, beforeEach, afterAll } from "vitest";
import {
  getTendersCardsData,
  getTender,
  getTenderDetailData,
  saveAlert,
} from "./tendersService";

const mockUrl = "https://mock-tenders-endpoint.com/api";
const OLD_ENV = { ...import.meta.env };

describe("tendersService extra", () => {
  beforeEach(() => {
    // @ts-ignore
    import.meta.env.VITE_GET_TENDERS_URL = mockUrl;
    vi.resetAllMocks();
  });

  afterAll(() => {
    // @ts-ignore
    import.meta.env = OLD_ENV;
  });

  it("getTendersCardsData transforms API response to CardData shape", async () => {
    const apiResponse = {
      results: [
        {
          ID: "1",
          Contratacion: "Name",
          Plazo_limite: "2025-01-01",
          Importe_estimado: 100,
          Titulo: "Titulo",
          Lugar_Ejecucion: "Lugar",
          Codigo_CPV: ["123"],
          score: 2,
        },
      ],
      page: 2,
      page_size: 10,
      total_results: 100,
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(apiResponse),
    } as any);

    const result = await getTendersCardsData({
      invoicing: 0,
      place: "ES",
      activity: "act",
    });

    expect(result.tenders).toHaveLength(1);
    expect(result.tenders[0]).toMatchObject({
      id: "1",
      tenderName: "Name",
      endDate: "2025-01-01",
      budget: 100,
      resume: "Titulo",
      location: "Lugar",
      CPVCodes: ["123"],
      score: 2,
    });
    expect(result.page).toBe(2);
    expect(result.pageSize).toBe(10);
    expect(result.totalResults).toBe(100);

    expect(fetch).toHaveBeenCalledWith(
      mockUrl + "/search",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    );
  });

  it("getTender returns parsed detail on success", async () => {
    const tenderDetail = {
      ID: "42",
      Fecha_publicacion: "2024-01-01",
      Contratacion: "Tender name",
      Plazo_limite: "2024-02-01",
      Importe_estimado: 5000,
      Titulo: "Resumen",
      Lugar_Ejecucion: "Madrid",
      Codigo_CPV: ["111"],
      URL: "http://example",
      Presupuesto_sin_IVA: 4000,
      Importe_total: 5000,
      Expediente: "EXP-1",
      Fecha_inicio: "2024-03-01",
      Tipo_contrato: "Type A",
      Tipo_procedimiento: "Proc",
      "Número_lotes": 1,
      Tipo_garantia: "None",
      Pliego_admvo: "doc1",
      Pliego_prescripciones: "doc2",
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(tenderDetail),
    } as any);

    const res = await getTender({ ID: "42" });
    expect(res).toEqual(tenderDetail);
    expect(fetch).toHaveBeenCalledWith(
      mockUrl + "/get-tender",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    );
  });

  it("getTender throws Server error for non-ok responses", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve({}),
    } as any);

    await expect(getTender({ ID: "1" })).rejects.toThrow("Server error: 500");
  });

  it("getTenderDetailData maps fields to TenderDetailData", async () => {
    const apiTender = {
      ID: "7",
      Fecha_publicacion: "2020-01-01",
      Contratacion: "Contract",
      Plazo_limite: "2020-02-01",
      Importe_estimado: 123,
      Titulo: "Title",
      Lugar_Ejecucion: "City",
      Codigo_CPV: ["999"],
      URL: "u",
      Presupuesto_sin_IVA: 100,
      Importe_total: 123,
      Expediente: "E1",
      Fecha_inicio: "2020-03-01",
      Tipo_contrato: "C",
      Tipo_procedimiento: "P",
      "Número_lotes": 2,
      Tipo_garantia: "G",
      Pliego_admvo: "A",
      Pliego_prescripciones: "B",
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(apiTender),
    } as any);

    const detail = await getTenderDetailData({ ID: "7" });
    expect(detail).toMatchObject({
      id: "7",
      publicationDate: "2020-01-01",
      tenderName: "Contract",
      endDate: "2020-02-01",
      budget: 123,
      resume: "Title",
      location: "City",
      CPVCodes: ["999"],
      url: "u",
      budgetNoIva: 100,
      budgetTotal: 123,
      record: "E1",
      startDate: "2020-03-01",
      contractType: "C",
      procedureType: "P",
      lotsNumber: 2,
      warrantyType: "G",
      administrativeDocumexnt: "A",
      specificationsSheet: "B",
    });
  });

  describe("saveSearch", () => {
    it("returns data when server responds 200", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        status: 200,
        ok: true,
        json: () => Promise.resolve("string"),
      } as any);

      const res = await saveAlert({
        invoicing: 0,
        place: "x",
        activity: "a",
        page: 1,
        page_size: 10,
        cpv_list: [],
        exact_place: false,
      });

      expect(res).toEqual({ status: 200, data: "string" });
      expect(fetch).toHaveBeenCalledWith(
        mockUrl + "/user/search",
        expect.objectContaining({ method: "POST" })
      );
    });

    it("returns errors when server responds 422", async () => {
      const errorBody = { detail: [{ loc: ["body", "place"], msg: "required", type: "value_error" }] };
      global.fetch = vi.fn().mockResolvedValue({
        status: 422,
        ok: false,
        json: () => Promise.resolve(errorBody),
      } as any);

      const res = await saveAlert({
        invoicing: 0,
        place: "",
        activity: "a",
        page: 1,
        page_size: 10,
        cpv_list: [],
        exact_place: false,
      });

      expect(res).toEqual({ status: 422, errors: errorBody });
    });

    it("returns status 0 on network error", async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error("Network failure"));

      const res = await saveAlert({
        invoicing: 0,
        place: "x",
        activity: "a",
        page: 1,
        page_size: 10,
        cpv_list: [],
        exact_place: false,
      });

      expect(res.status).toBe(0);
      expect(typeof res.errors).toBe("string");
    });
  });
});