import { useState, ReactNode } from "react";
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

  return (
    <div className="rounded-xl border bg-surface overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-muted">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.accessor)}
                className={`px-4 py-3 font-medium ${
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

        <tbody>
          {paginatedData.map((row) => (
            <tr key={row.id} className="border-t hover:bg-slate-50 transition">
              {columns.map((col) => (
                <td
                  key={String(col.accessor)}
                  className={`px-4 py-3 ${col.alignRight ? "text-right" : ""}`}
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
                className="px-4 py-6 text-center text-muted"
              >
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end gap-2 p-4 border-t">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 text-sm border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm text-muted">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 text-sm border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
