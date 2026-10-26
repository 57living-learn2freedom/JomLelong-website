"use client";

import { type KeyboardEvent } from "react";
import { Search } from "lucide-react";
import {
  MALAYSIAN_STATES,
  PROPERTY_TYPES,
  PRICE_RANGES,
} from "@/lib/constants";
import type { FilterState } from "@/lib/filterState";

interface SearchFilterBarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onSearch: () => void;
  resultCount: number;
  variant?: "hero" | "page";
  idPrefix?: string;
}

export default function SearchFilterBar({
  filters,
  onFilterChange,
  onSearch,
  resultCount,
  variant = "page",
  idPrefix = "search",
}: SearchFilterBarProps) {
  function handleKeywordKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") onSearch();
  }

  const isHero = variant === "hero";

  return (
    <div
      className={
        isHero
          ? "rounded-2xl border border-white/20 bg-white/95 p-4 shadow-2xl backdrop-blur-md sm:p-6"
          : "rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6"
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <div className="sm:col-span-2 lg:col-span-2">
          <label
            htmlFor={`${idPrefix}-keyword`}
            className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-zinc-500"
          >
            Search by Keyword
          </label>
          <input
            id={`${idPrefix}-keyword`}
            type="text"
            value={filters.keyword}
            onChange={(e) => onFilterChange("keyword", e.target.value)}
            onKeyDown={handleKeywordKeyDown}
            placeholder="Location / City / Building name"
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20"
          />
        </div>

        <div className="lg:col-span-1">
          <label
            htmlFor={`${idPrefix}-state`}
            className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-zinc-500"
          >
            State
          </label>
          <select
            id={`${idPrefix}-state`}
            value={filters.state}
            onChange={(e) => onFilterChange("state", e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-800 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20"
          >
            {MALAYSIAN_STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-1">
          <label
            htmlFor={`${idPrefix}-type`}
            className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-zinc-500"
          >
            Property Type
          </label>
          <select
            id={`${idPrefix}-type`}
            value={filters.propertyType}
            onChange={(e) => onFilterChange("propertyType", e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-800 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20"
          >
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-1">
          <label
            htmlFor={`${idPrefix}-price`}
            className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-zinc-500"
          >
            Price Range
          </label>
          <select
            id={`${idPrefix}-price`}
            value={filters.priceRange}
            onChange={(e) => onFilterChange("priceRange", e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-800 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20"
          >
            {PRICE_RANGES.map((range) => (
              <option key={range.label} value={range.label}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end sm:col-span-2 lg:col-span-1">
          <button
            type="button"
            onClick={onSearch}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-800"
          >
            <Search className="h-4 w-4" />
            Search Now
          </button>
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-zinc-600">
        Showing{" "}
        <span className="font-semibold text-red-700">{resultCount}</span>{" "}
        properties matching your criteria
      </p>
    </div>
  );
}
