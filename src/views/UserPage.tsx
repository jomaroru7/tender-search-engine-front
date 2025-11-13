import { useEffect, useState, useCallback } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSavedSearches } from "../services/tenders/alertsService";
import SearchCard from "../components/search-card/SearchCard";
import type { SavedSearch } from "../components/search-card/SearchCard";
import { setTendersData } from "../store/slices/tenderSlice";
import type { AppDispatch } from "../store";

// add import for reusable modal
import ConfirmationModal from "../components/confirmation-modal/ConfirmationModal";

const UserPage = () => {
  const { user, signOut } = useAuthenticator((ctx) => [ctx.user, ctx.signOut]);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState<SavedSearch[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false);

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

  const handleRestore = useCallback(
    (s: SavedSearch) => {
      const invoicing = s.invoicing ?? s.filters?.invoicing ?? 0;
      const place = s.place ?? s.filters?.place ?? "";
      const activity = s.activity ?? s.filters?.activity ?? "";
      const exact_place = typeof s.exact_place !== "undefined" ? s.exact_place : s.filters?.exact_place ?? false;
      const cpv_list = s.cpv_list ?? s.filters?.cpv_list ?? [];

      // prepare filters object for the store
      const restoredFilters = {
        invoicing,
        place,
        activity,
        cpv_list,
        exact_place,
      };

      // populate redux so IndexPage can read filters immediately
      dispatch(
        setTendersData({
          tenders: [],
          totalResults: 0,
          page: 1,
          pageSize: 10,
          filters: restoredFilters,
        })
      );

      // navigate to search page with query params so IndexPage triggers fetch logic
      const params = new URLSearchParams();
      if (invoicing) params.set("invoicing", String(invoicing));
      if (place) params.set("place", String(place));
      if (activity) params.set("activity", String(activity));
      params.set("exact_place", String(Boolean(exact_place)));
      if (Array.isArray(cpv_list) && cpv_list.length > 0) {
        params.set("cpv_list", encodeURIComponent(JSON.stringify(cpv_list)));
      }
      params.set("page", "1");

      navigate({
        pathname: "/",
        search: `?${params.toString()}`,
      });
    },
    [dispatch, navigate]
  );

  // handler passed to modal
  const handleConfirmLogout = async () => {
    // close modal first (modal UI will show processing)
    setConfirmLogoutOpen(false);
    try {
      await signOut();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("signOut failed", err);
    } finally {
      navigate("/login");
    }
  };

  return (
    <main className="p-6">
      <section className="mb-6">
        <h2 className="text-lg font-semibold">Usuario</h2>
        <p className="text-sm text-slate-600">
          {email
            ? `Sesión iniciada como ${email}`
            : user
              ? `Sesión iniciada como ${(user as any).attributes?.email ?? "unknown"}`
              : "No ha iniciado sesión"}
        </p>
        <div className="mt-3">
          <div className="flex gap-3">
            <button
              type="button"
              className="bg-slate-700 text-white px-3 py-1 rounded disabled:opacity-50 border border-slate-600 hover:bg-slate-800"
              onClick={() => setConfirmLogoutOpen(true)}
              aria-haspopup="dialog"
            >
              Cerrar sesión
            </button>
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
        </div>
      </section>

      <ConfirmationModal
        open={confirmLogoutOpen}
        title="Cerrar sesión"
        description="¿Estás seguro de que quieres cerrar la sesión? Serás redirigido a la pantalla de inicio de sesión."
        confirmLabel="Cerrar sesión"
        cancelLabel="Cancelar"
        onConfirm={handleConfirmLogout}
        onCancel={() => setConfirmLogoutOpen(false)}
      />

      <section>
        <h2 className="text-lg font-semibold mb-2">Búsquedas guardadas</h2>

        {loading && <div>Cargando búsquedas guardadas...</div>}
        {error && <div className="text-red-600">Error: {error}</div>}

        {!loading && !error && (!saved || saved.length === 0) && (
          <div className="text-slate-600">No se han encontrado búsquedas guardadas.</div>
        )}

        {!loading && saved && saved.length > 0 && (
          <div className="relative">
            <div className="bg-white/60 border border-slate-200 rounded-lg shadow-sm p-2">
              <div className="overflow-x-auto pr-2">
                <ul className="space-y-3 flex flex-row gap-2">
                  {saved.map((s, idx) => {
                    const key = s.timestamp ?? s.ttl ?? idx;
                    return (
                      <li key={key}>
                        <SearchCard
                          search={s}
                          onRestore={handleRestore}
                          onDeleted={(deleted) =>
                            setSaved((prev) =>
                              prev ? prev.filter((x) => (x.timestamp ?? x.ttl) !== (deleted.timestamp ?? deleted.ttl)) : null
                            )
                          }
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default UserPage;