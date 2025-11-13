import { describe, it, expect, vi, beforeEach } from "vitest";
import { getTender, getTenderDetailData } from "./tenderService";
import { requestWithAuth } from "../_http";

vi.mock("../_http", () => ({ requestWithAuth: vi.fn() }));

// typed mock for convenience
const mockedRequest = requestWithAuth as unknown as ReturnType<typeof vi.fn>;

beforeEach(() => {
  vi.resetAllMocks();
});

describe("tenderService", () => {
  it("getTender returns API data on status 200", async () => {
    const apiTender = {
      ID: "1",
      Fecha_publicacion: "2025-01-01",
      Contratacion: "Name",
      Plazo_limite: "2025-12-01",
      Importe_estimado: 1000,
      Titulo: "Titulo",
      Lugar_Ejecucion: "Lugar",
      Codigo_CPV: ["111"],
      URL: "http://example",
      Presupuesto_sin_IVA: 900,
      Importe_total: 1100,
      Expediente: "EXP",
      Fecha_inicio: "2025-01-02",
      Tipo_contrato: "Tipo",
      Tipo_procedimiento: "Proc",
      Número_lotes: 1,
      Tipo_garantia: "G",
      Pliego_admvo: "adm",
      Pliego_prescripciones: "spec",
    };

    mockedRequest.mockResolvedValue({ status: 200, data: apiTender });

    const res = await getTender({ ID: "1" });
    expect(res).toEqual(apiTender);
    expect(mockedRequest).toHaveBeenCalledWith("/get-tender", expect.objectContaining({ method: "POST" }));
  });

  it("getTender throws on non-200 response", async () => {
    mockedRequest.mockResolvedValue({ status: 503, errors: "service down" });

    await expect(getTender({ ID: "1" })).rejects.toThrow();
  });

  it("getTenderDetailData maps API response to TenderDetailData shape", async () => {
    const apiTender = {
      ID: "abc",
      Fecha_publicacion: "2025-06-01",
      Contratacion: "Contratación X",
      Plazo_limite: "2025-07-01",
      Importe_estimado: 5000,
      Titulo: "Título X",
      Lugar_Ejecucion: "Sevilla",
      Codigo_CPV: ["0001"],
      URL: "https://example.com",
      Presupuesto_sin_IVA: 4500,
      Importe_total: 5500,
      Expediente: "EXP-ABC",
      Fecha_inicio: "2025-05-01",
      Tipo_contrato: "Suministro",
      Tipo_procedimiento: "Abierto",
      Número_lotes: 2,
      Tipo_garantia: "Definitiva",
      Pliego_admvo: "adm.pdf",
      Pliego_prescripciones: "spec.pdf",
    };

    mockedRequest.mockResolvedValue({ status: 200, data: apiTender });

    const detail = await getTenderDetailData({ ID: "abc" });
    expect(detail.id).toBe(apiTender.ID);
    expect(detail.tenderName).toBe(apiTender.Contratacion);
    expect(detail.location).toBe(apiTender.Lugar_Ejecucion);
    expect(detail.budgetNoIva).toBe(apiTender.Presupuesto_sin_IVA);
    expect(detail.specificationsSheet).toBe(apiTender.Pliego_prescripciones);
    expect(mockedRequest).toHaveBeenCalled();
  });
});