import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { setUser } from "./usersService";

const API_URL = "http://fake-api/set-user";

describe("setUser", () => {
  let originalEnv: any;

  beforeEach(() => {
    // Guarda el valor original
    originalEnv = import.meta.env.VITE_SET_USER_URL;
    // @ts-ignore
    import.meta.env.VITE_SET_USER_URL = API_URL;
    vi.resetAllMocks();
  });

  afterEach(() => {
    // Restaura el valor original
    // @ts-ignore
    import.meta.env.VITE_SET_USER_URL = originalEnv;
  });

  it("devuelve la respuesta esperada en caso de éxito", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true, email: "test@email.com" }),
    } as any);

    const requestData = {
      email: "test@email.com",
      companyName: "Test Company",
      companyLocation: "Test Location",
      companyBudget: 1000,
      companyDescription: "Test Description"
    };

    const response = await setUser(requestData);
    expect(response).toEqual({ success: true, email: "test@email.com" });

    // Verifica que fetch fue llamado
    expect(fetch).toHaveBeenCalledTimes(1);

    // Extrae el body de la llamada a fetch y comprueba los campos
    const fetchCall = (fetch as any).mock.calls[0];
    const bodyObj = JSON.parse(fetchCall[1].body);

    expect(fetchCall[0]).toBe(API_URL);
    expect(bodyObj).toEqual(requestData);
    expect(fetchCall[1].method).toBe("POST");
    expect(fetchCall[1].headers).toEqual({ "Content-Type": "application/json" });
  });

  it("lanza un error si el servidor responde con error", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve({}),
    } as any);

    await expect(setUser({
      email: "fail@email.com",
      companyName: "Fail Company",
      companyLocation: "Nowhere",
      companyBudget: 0,
      companyDescription: "Fail"
    })).rejects.toThrow("Server error: 500");
  });

  it("lanza un error si fetch falla", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

    await expect(setUser({
      email: "fail@email.com",
      companyName: "Fail Company",
      companyLocation: "Nowhere",
      companyBudget: 0,
      companyDescription: "Fail"
    })).rejects.toThrow("Network error");
  });
});