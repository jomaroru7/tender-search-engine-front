import { useEffect, useState, useCallback } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { getSavedSearches } from "../services/tenders/tendersService";
import SearchCard from "../components/search-card/SearchCard";
import type { SavedSearch } from "../components/search-card/SearchCard";

const UserPage = () => {
  const { user } = useAuthenticator((ctx) => [ctx.user]);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState<SavedSearch[] | null>(null);
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
          const data = res.data;
          if (data) {
            if (data.email) setEmail(String(data.email));
            if (Array.isArray(data.alerts)) {
              setSaved(data.alerts);
            } else if (Array.isArray(data)) {
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

  const handleRestore = useCallback((s: SavedSearch) => {
    // future: implement restore behaviour (apply filters and fetch)
    // eslint-disable-next-line no-console
    console.log("Restore saved search (not implemented).", s);
    alert("Restaurar búsqueda guardada no implementado aún.");
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
                <li key={key}>
                  <SearchCard search={s} onRestore={handleRestore} />
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