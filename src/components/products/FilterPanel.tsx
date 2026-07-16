import React from "react";
import { RotateCcw } from "lucide-react";
import type { FilterState } from "../../types";
import { formatPrice } from "../../utils/format";

interface Props {
  categories: string[];
  brands: string[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onClear: () => void;
}

export default function FilterPanel({
  categories,
  brands,
  filters,
  setFilters,
  onClear,
}: Props) {
  const toggleSet = (key: "categories" | "brands", value: string) => {
    setFilters((f) => {
      const next = new Set(f[key]);
      next.has(value) ? next.delete(value) : next.add(value);
      return { ...f, [key]: next };
    });
  };

  return (
    <div
      className="
        sticky top-24
        bg-slate-900/70
        backdrop-blur-2xl
        border border-slate-700
        rounded-3xl
        p-6
        shadow-2xl
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-white">
          Filters
        </h3>

        <button
          onClick={onClear}
          className="
            flex items-center gap-2
            text-indigo-400
            hover:text-indigo-300
            text-sm
            font-semibold
            transition
          "
        >
          <RotateCcw size={16} />
          Clear
        </button>
      </div>

      {/* CATEGORY */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
          Categories
        </h4>

        <div className="space-y-3">
          {categories.map((c) => (
            <label
              key={c}
              className="
                flex items-center gap-3
                cursor-pointer
                text-slate-300
                hover:text-white
                transition
              "
            >
              <input
                type="checkbox"
                checked={filters.categories.has(c)}
                onChange={() => toggleSet("categories", c)}
                className="w-4 h-4 accent-indigo-500"
              />
              <span>{c}</span>
            </label>
          ))}
        </div>
      </div>

      {/* BRAND */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
          Brands
        </h4>

        <div className="space-y-3 max-h-52 overflow-y-auto pr-2">
          {brands.map((b) => (
            <label
              key={b}
              className="
                flex items-center gap-3
                cursor-pointer
                text-slate-300
                hover:text-white
                transition
              "
            >
              <input
                type="checkbox"
                checked={filters.brands.has(b)}
                onChange={() => toggleSet("brands", b)}
                className="w-4 h-4 accent-indigo-500"
              />
              <span>{b}</span>
            </label>
          ))}
        </div>
      </div>

      {/* PRICE */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
            Max Price
          </h4>

          <span className="text-indigo-400 font-bold">
            {formatPrice(filters.maxPrice)}
          </span>
        </div>

        <input
          type="range"
          min={50}
          max={2500}
          step={50}
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              maxPrice: Number(e.target.value),
            }))
          }
          className="w-full accent-indigo-500 cursor-pointer"
        />
      </div>

      {/* RATING */}
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
          Rating
        </h4>

        <div className="space-y-3">
          {[0, 4, 4.5].map((r) => (
            <label
              key={r}
              className="
                flex items-center gap-3
                cursor-pointer
                text-slate-300
                hover:text-white
                transition
              "
            >
              <input
                type="radio"
                name="rating"
                checked={filters.minRating === r}
                onChange={() =>
                  setFilters((f) => ({
                    ...f,
                    minRating: r,
                  }))
                }
                className="w-4 h-4 accent-indigo-500"
              />

              <span>
                {r === 0 ? "All Ratings" : `${r}+ Stars`}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}