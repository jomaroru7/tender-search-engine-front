import type { setUserRequest, setUserResponse } from "../../models/UsersApi";
import { requestWithAuth, getAuthHeaders } from "../_http";

const ENV = import.meta.env;

/**
 * Actualiza la información del usuario en el backend.
 *
 * - Envía un `POST` a `VITE_SET_USER_URL` con los campos del formulario.
 * - Añade los encabezados de autenticación obtenidos desde `getAuthHeaders`.
 * - Lanza errores legibles para estados 401/503 y para respuestas no-ok.
 *
 * @param payload - Objeto con los datos del usuario y la empresa.
 * @returns La respuesta JSON del endpoint `setUser` (tipada como `setUserResponse`).
 * @throws Error con mensaje claro en caso de error de autenticación o error del servidor.
 */
export const setUser = async ({
  email,
  companyName,
  companyBudget,
  companyDescription,
  companyLocation,
}: setUserRequest): Promise<setUserResponse> => {
  const headers = await getAuthHeaders();

  return fetch(ENV.VITE_SET_USER_URL, {
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
 * Elimina la cuenta del usuario autenticado.
 *
 * - Llama a `DELETE /user/delete` utilizando el helper `requestWithAuth`
 *   (que ya añade la URL base y los encabezados de auth).
 * - Devuelve el JSON del backend cuando el servidor responde con 200,
 *   por ejemplo `{ message: string, deleted: true }`.
 * - Lanza errores claros para 401 y otros códigos de error.
 *
 * @returns Objeto con `message` y `deleted` si la eliminación fue correcta.
 * @throws Error si la petición no es autorizada o hay otro error del servidor.
 */
export const deleteUser = async (): Promise<{ message?: string; deleted?: boolean }> => {
  const res = await requestWithAuth<{ message?: string; deleted?: boolean }>("/user/delete", {
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