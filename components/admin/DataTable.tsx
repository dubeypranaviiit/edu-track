"use client";

import React, { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Search,
  ArrowUpDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Column<T> {
  header: string;
  accessorKey?: keyof T | string;
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  searchKey?: keyof T;
  serverSide?: boolean;
  totalItems?: number;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onSearchChange?: (search: string) => void;
  isLoading?: boolean;
}

export function DataTable<T>({
  data,
  columns,
  searchPlaceholder = "Search...",
  searchKey,
  serverSide = false,
  totalItems,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onSearchChange,
  isLoading = false,
}: DataTableProps<T>) {
  const [localSearch, setLocalSearch] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalSearch(val);
    if (serverSide && onSearchChange) {
      onSearchChange(val);
    }
  };

  const getFilteredData = () => {
    if (serverSide || !searchKey) return data;
    return data.filter((item) => {
      const val = item[searchKey];
      if (typeof val === "string") {
        return val.toLowerCase().includes(localSearch.toLowerCase());
      }
      return false;
    });
  };

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = (items: T[]) => {
    if (serverSide || !sortConfig) return items;
    const { key, direction } = sortConfig;
    return [...items].sort((a: any, b: any) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const processedData = getSortedData(getFilteredData());

  return (
    <div className="space-y-4">
      {/* Search Input */}
      {(searchKey || onSearchChange) && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
          <Input
            value={localSearch}
            onChange={handleSearch}
            placeholder={searchPlaceholder}
            className="pl-9 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
          />
        </div>
      )}

      {/* Table Card */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-semibold">
                {columns.map((col, idx) => (
                  <th key={idx} className="p-4 select-none">
                    {col.sortable && col.accessorKey ? (
                      <button
                        onClick={() => handleSort(col.accessorKey as string)}
                        className="flex items-center gap-1 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
                      >
                        {col.header}
                        <ArrowUpDown className="size-3" />
                      </button>
                    ) : (
                      col.header
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length} className="p-8 text-center text-slate-400">
                    <div className="flex items-center justify-center gap-2">
                      <span className="size-4 rounded-full border-2 border-t-transparent border-blue-500 animate-spin" />
                      Loading...
                    </div>
                  </td>
                </tr>
              ) : processedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="p-8 text-center text-slate-400">
                    No data found.
                  </td>
                </tr>
              ) : (
                processedData.map((item, rowIdx) => (
                  <tr 
                    key={rowIdx} 
                    className="hover:bg-slate-50/55 dark:hover:bg-slate-700/20 transition-colors duration-150 text-slate-700 dark:text-slate-300"
                  >
                    {columns.map((col, colIdx) => {
                      const cellContent = col.cell 
                        ? col.cell(item) 
                        : col.accessorKey 
                          ? (item[col.accessorKey as keyof T] as any) 
                          : null;
                      return (
                        <td key={colIdx} className="p-4">
                          {cellContent}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {serverSide && totalPages > 1 && onPageChange && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}
                className="h-8 px-2.5"
              >
                <ChevronLeft className="size-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages || isLoading}
                className="h-8 px-2.5"
              >
                Next
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
