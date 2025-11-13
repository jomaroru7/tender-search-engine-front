
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

  return (
    <div className="p-3 border rounded bg-white">
      <div className="flex justify-between items-start">
        <div className="text-sm text-slate-700">
          <div>
            <strong>Facturación:</strong> {String(invoicing)}
          </div>
          <div>
            <strong>Ámbito geográfico:</strong> {String(place)}
          </div>
          <div>
            <strong>Actividad de la empresa:</strong> {String(activity)}
          </div>
        </div>

        <div className="ml-4">
          <button
            type="button"
            className="text-sm px-2 py-1 border rounded"
            onClick={() => {
              if (onRestore) {
                onRestore(search);
              } else {
                // eslint-disable-next-line no-console
                console.log("Restore saved search (not implemented).", search);
                alert("Restaurar búsqueda guardada no implementado aún.");
              }
            }}
          >
            Restaurar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;