type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function getPages(current: number, total: number) {
  const pages: (number | string)[] = [];
  if (total <= 5) {
    for (let i = 1; i <= total; i++) pages.push(i);
    return pages;
  }
  pages.push(1);
  if (current > 3) pages.push("...");
  if (current > 2) pages.push(current - 1);
  if (current !== 1 && current !== total) pages.push(current);
  if (current < total - 1) pages.push(current + 1);
  if (current < total - 2) pages.push("...");
  pages.push(total);
  return pages;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;
  const pages = getPages(currentPage, totalPages);

  return (
    <nav className="flex justify-center my-6" aria-label="Paginación">
      <ul className="inline-flex items-center gap-1">
        <li>
          <button
            className="px-3 py-1 rounded bg-slate-200 text-slate-700 hover:bg-slate-300"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Anterior"
          >
            &lt;
          </button>
        </li>
        {pages.map((page, idx) =>
          typeof page === "number" ? (
            <li key={page}>
              <button
                className={`px-3 py-1 rounded ${page === currentPage ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-700 hover:bg-slate-300"}`}
                onClick={() => onPageChange(page)}
                aria-current={page === currentPage ? "page" : undefined}
                data-testid={`pagination-page-${page}`}
              >
                {page}
              </button>
            </li>
          ) : (
            <li key={`ellipsis-${idx}`}>
              <span className="px-3 py-1 text-slate-400 select-none">…</span>
            </li>
          )
        )}
        <li>
          <button
            className="px-3 py-1 rounded bg-slate-200 text-slate-700 hover:bg-slate-300"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Siguiente"
          >
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;