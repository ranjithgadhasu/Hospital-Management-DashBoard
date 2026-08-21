import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils/cn";

export function Table({ columns, data, rowKey, onRowClick }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-800">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400",
                  col.className
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {data.map((row) => (
            <tr
              key={rowKey(row)}
              onClick={() => onRowClick?.(row)}
              className={cn(
                "transition-colors",
                onRowClick && "cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50"
              )}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn("px-4 py-3.5 text-slate-700 dark:text-slate-200", col.className)}
                >
                  {col.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Pagination({ page, pageCount, total, onPageChange }) {
  if (pageCount <= 1) {
    return (
      <div className="flex items-center justify-between px-4 py-3 text-xs text-slate-500">
        <span>{total} total records</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-between gap-2 border-t border-slate-200 px-4 py-3 text-sm sm:flex-row dark:border-slate-800">
      <span className="text-xs text-slate-500 dark:text-slate-400">
        Showing page <span className="font-medium">{page}</span> of{" "}
        <span className="font-medium">{pageCount}</span> · {total} records
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={cn(
              "h-8 w-8 rounded-lg text-xs font-medium transition-colors",
              p === page
                ? "bg-brand-600 text-white"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            )}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= pageCount}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
