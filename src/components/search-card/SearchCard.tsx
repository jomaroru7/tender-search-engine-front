
export type SavedSearch = {
  invoicing?: number;
  place?: string;
  activity?: string;
  filters?: Record<string, any>;
  timestamp?: string;
  ttl?: number;
  [key: string]: any;
};

type SearchCardProps = {
  search: SavedSearch;
  onRestore?: (s: SavedSearch) => void;
};

const SearchCard = ({ search, onRestore }: SearchCardProps) => {
  const invoicing = search.invoicing ?? search.filters?.invoicing ?? "";
  const place = search.place ?? search.filters?.place ?? "";
  const activity = search.activity ?? search.filters?.activity ?? "";
  const ts = search.timestamp ? new Date(search.timestamp).toLocaleString() : null;

  return (
    <div className="p-4 bg-white/60 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-150">
      <div className="flex justify-between items-start gap-4">
        <div className="text-sm text-slate-700 dark:text-slate-200 flex-1">
          <div className="mb-2">
            <div className="text-xs text-slate-400 uppercase tracking-wider">Facturación</div>
            <div className="mt-1 text-sm font-medium text-slate-800 dark:text-white">{String(invoicing)}</div>
          </div>

          <div className="mb-2">
            <div className="text-xs text-slate-400 uppercase tracking-wider">Ámbito geográfico</div>
            <div className="mt-1 text-sm font-medium text-slate-800 dark:text-white">{String(place)}</div>
          </div>

          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Actividad</div>
            <div className="mt-1 text-sm font-medium text-slate-800 dark:text-white">{String(activity)}</div>
          </div>

          {ts && <div className="mt-3 text-xs text-slate-400">Guardada: <span className="text-slate-500 dark:text-slate-300">{ts}</span></div>}
        </div>

        <div className="flex flex-col items-end gap-2">
          <button
            type="button"
            data-testid="restore-button"
            onClick={() => (onRestore ? onRestore(search) : (alert("Restaurar búsqueda no implementado aún.") as any))}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 disabled:opacity-50"
            aria-label="Restaurar búsqueda"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h4l3-8 3 8h4M12 14v7" />
            </svg>
            Restaurar
          </button>

          <button
            type="button"
            onClick={() => {
              // quick view raw payload
              // eslint-disable-next-line no-console
              console.log("Saved search raw:", search);
            }}
            className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-300"
          >
            Ver raw
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;