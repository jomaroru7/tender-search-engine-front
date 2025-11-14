import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import type { RootState } from '../store';

const CpvListPage = () => {
  const cpvMap = useSelector((state: RootState) => state.cpv.cpvs);
  const cpvEntries = Object.entries(cpvMap);

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  const normalize = (str: string) =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  const filteredEntries = cpvEntries.filter(
    ([value, label]) =>
      normalize(value).includes(normalize(debouncedSearch)) ||
      normalize(label).includes(normalize(debouncedSearch))
  );

  return (
    <div className=''>
      <input
        type="text"
        placeholder="Búsqueda por código o descripción..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-6 p-2 border rounded w-full"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-110 overflow-y-scroll border border-slate-600 dark:border-slate-700 rounded-lg p-2">
        {filteredEntries.map(([value, label], idx) => (
          <div key={value + idx} className="flex flex-row gap-2 p-2 border-b">
            <span className="font-mono text-blue-700">{value}</span>
            <span className="text-slate-700">{label}</span>
          </div>
        ))}
        {filteredEntries.length === 0 && (
          <div className="col-span-2 text-center text-slate-400">
            No se han encontrado resultados.
          </div>
        )}
      </div>
    </div>
  );
};

export default CpvListPage;