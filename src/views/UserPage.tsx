import { useEffect, useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { getSavedSearches } from "../services/tenders/tendersService";

const UserPage = () => {
  const { user } = useAuthenticator((ctx) => [ctx.user]);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchSaved = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getSavedSearches();
        if (!mounted) return;
        if (res.status === 200) {
          // If backend returns the user object with alerts, use alerts array
          const data = res.data;
          if (data) {
            if (data.email) setEmail(String(data.email));
            if (Array.isArray(data.alerts)) {
              setSaved(data.alerts);
            } else if (Array.isArray(data)) {
              // fallback: if API returned array directly
              setSaved(data);
            } else {
              setSaved([]);
            }
          } else {
            setSaved([]);
          }
        } else {
          setError(`Error loading saved searches (status ${res.status})`);
          console.warn("getSavedSearches response", res);
        }
      } catch (err: any) {
        if (!mounted) return;
        setError(String(err?.message || err));
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchSaved();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Usuario</h1>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">Cuenta</h2>
        <p className="text-sm text-slate-600">
          {email
            ? `Sesión iniciada como ${email}`
            : user
            ? `Sesión iniciada como ${(user as any).attributes?.email ?? "unknown"}`
            : "No ha iniciado sesión"}
        </p>
        <div className="mt-3">
          <button
            type="button"
            className="bg-red-600 text-white px-3 py-1 rounded disabled:opacity-50"
            onClick={() => {
              // delete account action will be implemented later
              // eslint-disable-next-line no-console
              console.log("Delete account clicked (not implemented)");
              alert("Delete account functionality not implemented yet.");
            }}
          >
            Borrar cuenta
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Búsquedas guardadas</h2>

        {loading && <div>Cargando búsquedas guardadas...</div>}
        {error && <div className="text-red-600">Error: {error}</div>}

        {!loading && !error && (!saved || saved.length === 0) && (
          <div className="text-slate-600">No se han encontrado búsquedas guardadas.</div>
        )}

        {!loading && saved && saved.length > 0 && (
          <ul className="space-y-3">
            {saved.map((s, idx) => {
              const key = s.timestamp ?? s.ttl ?? idx;
              return (
                <li key={key} className="p-3 border rounded bg-white">
                  <div className="flex justify-between items-start">
                    <div className="text-sm text-slate-700">
                      <div>
                        <strong>Facturación:</strong>{" "}
                        {String(s.invoicing ?? (s.filters && s.filters.invoicing) ?? "")}
                      </div>
                      <div>
                        <strong>Ámbito geográfico:</strong>{" "}
                        {String(s.place ?? (s.filters && s.filters.place) ?? "")}
                      </div>
                      <div>
                        <strong>Actividad de la empresa:</strong>{" "}
                        {String(s.activity ?? (s.filters && s.filters.activity) ?? "")}
                      </div>
                      
                    </div>

                    <div className="ml-4">
                      <button
                        type="button"
                        className="text-sm px-2 py-1 border rounded"
                        onClick={() => {
                          // future: implement edit / restore search
                          // eslint-disable-next-line no-console
                          console.log("Restaurar búsqueda guardada (no implementado).", s);
                          alert("Restaurar búsqueda guardada no implementado aún.");
                        }}
                      >
                        Restaurar
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
};

export default UserPage;