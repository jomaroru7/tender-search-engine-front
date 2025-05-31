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
    <div>
      <input
        type="text"
        placeholder="Search by code or description..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-6 p-2 border rounded w-full"
      />
      <div className="grid grid-cols-2 gap-4">
        {filteredEntries.map(([value, label], idx) => (
          <div key={value + idx} className="flex flex-row gap-2 p-2 border-b">
            <span className="font-mono text-blue-700">{value}</span>
            <span className="text-slate-700">{label}</span>
          </div>
        ))}
        {filteredEntries.length === 0 && (
          <div className="col-span-2 text-center text-slate-400">
            No results found.
          </div>
        )}
      </div>
    </div>
  );
};

export default CpvListPage;