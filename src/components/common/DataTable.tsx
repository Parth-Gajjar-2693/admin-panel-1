import { useState, ReactNode, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export type Column<T> = {
  header: string;
  accessor: keyof T;
  render?: (row: T) => ReactNode;
  sortable?: boolean;
  alignRight?: boolean;
};

type Props<T> = {
  data: T[];
  columns: Column<T>[];
  rowsPerPage?: number;
};

export default function DataTable<T extends { id: number }>({
  data,
  columns,
  rowsPerPage = 5,
}: Props<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;

    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  // Smart page range (max 5 buttons)
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };
  return (
    <div className="rounded-2xl bg-white shadow-md border border-slate-200">
      <div className="overflow-x-auto rounded-2xl">
        <table className="w-full text-sm">
          {/* Header */}
          <thead className="bg-white border-b border-slate-200">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.accessor)}
                  className={`px-6 py-4 text-slate-800 font-semibold tracking-tight ${
                    col.alignRight ? "text-right" : "text-left"
                  } ${col.sortable ? "cursor-pointer select-none" : ""}`}
                  onClick={() => col.sortable && handleSort(col.accessor)}
                >
                  <div className="flex items-center gap-1">
                    {col.header}
                    {col.sortable &&
                      sortKey === col.accessor &&
                      (sortDirection === "asc" ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      ))}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {paginatedData.map((row, index) => (
              <tr
                key={row.id}
                className={`
        border-b border-slate-100
        transition-all duration-150
        ${index % 2 === 0 ? "bg-white" : "bg-slate-50/90"}
        hover:bg-blue-50
      `}
              >
                {columns.map((col) => (
                  <td
                    key={String(col.accessor)}
                    className={`px-6 py-2 text-slate-700 ${
                      col.alignRight ? "text-right" : ""
                    }`}
                  >
                    {col.render
                      ? col.render(row)
                      : (row[col.accessor] as ReactNode)}
                  </td>
                ))}
              </tr>
            ))}

            {paginatedData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-slate-400"
                >
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-slate-200 bg-white">
          <span className="text-xs text-slate-500">
            Showing {(currentPage - 1) * rowsPerPage + 1}–
            {Math.min(currentPage * rowsPerPage, sortedData.length)} of{" "}
            {sortedData.length}
          </span>

          <div className="flex items-center gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1.5 text-xs border border-slate-200 rounded-md disabled:opacity-40 hover:bg-slate-100 transition"
            >
              Prev
            </button>

            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1.5 text-xs rounded-md transition ${
                  page === currentPage
                    ? "bg-blue-600 text-white shadow-sm"
                    : "border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1.5 text-xs border border-slate-200 rounded-md disabled:opacity-40 hover:bg-slate-100 transition"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
