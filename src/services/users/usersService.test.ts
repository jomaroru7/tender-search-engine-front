import { describe, it, expect, vi, beforeEach, afterAll } from "vitest";
import { setUser } from "./usersService";

const OLD_ENV = { ...import.meta.env };
const API_URL = "http://fake-api/set-user";

describe("setUser", () => {
  beforeEach(() => {
    // @ts-ignore
    import.meta.env.VITE_SET_USER_URL = API_URL;
    vi.resetAllMocks();
  });

  afterAll(() => {
    // @ts-ignore
    import.meta.env = OLD_ENV;
  });

  it("devuelve la respuesta esperada en caso de éxito", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true, email: "test@email.com" }),
    } as any);

    const response = await setUser({ email: "test@email.com" });
    expect(response).toEqual({ success: true, email: "test@email.com" });
    expect(fetch).toHaveBeenCalledWith(
      API_URL,
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "test@email.com" }),
      })
    );
  });

  it("lanza un error si el servidor responde con error", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve({}),
    } as any);

    await expect(setUser({ email: "fail@email.com" }))
      .rejects.toThrow("Server error: 500");
  });

  it("lanza un error si fetch falla", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

    await expect(setUser({ email: "fail@email.com" }))
      .rejects.toThrow("Network error");
  });
});