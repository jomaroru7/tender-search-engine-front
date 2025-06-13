import { describe, it, expect, vi } from "vitest";
import { getTenders } from "./tendersService";

const mockUrl = "https://mock-tenders-endpoint.com/api";
const OLD_ENV = { ...import.meta.env };

describe("getTenders", () => {
  beforeEach(() => {
    // @ts-ignore
    import.meta.env.VITE_GET_TENDERS_URL = mockUrl;
    vi.resetAllMocks();
  });

  afterAll(() => {
    // @ts-ignore
    import.meta.env = OLD_ENV;
  });

  it("returns data when fetch is successful", async () => {
    const mockResponse = [{ Contratacion: "Test", Plazo_limite: "2025-01-01", Importe_estimado: 1000, Titulo: "Titulo", Lugar_Ejecucion: "Lugar", Codigo_CPV: ["123"], score: 1 }];
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    } as any);

    const result = await getTenders({ invoicing: 1, place: "ES", activity: "1234" });
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      mockUrl + "/search",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    );
  });

  it("throws error when fetch response is not ok", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve({}),
    } as any);

    await expect(getTenders({ invoicing: 1, place: "ES", activity: "1234" }))
      .rejects.toThrow("Server error: 500");
  });

  it("throws error when fetch fails", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

    await expect(getTenders({ invoicing: 1, place: "ES", activity: "1234" }))
      .rejects.toThrow("Network error");
  });
});