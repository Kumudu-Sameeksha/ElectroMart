import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Search } from "lucide-react";
import { PRODUCTS } from "../data/products";
import { CATEGORIES } from "../data/categories";
import type { FilterState } from "../types";
import { getDiscountPct } from "../utils/format";

import ProductCard from "../components/products/ProductCard";
import SearchBar from "../components/products/SearchBar";
import FilterPanel from "../components/products/FilterPanel";
import EmptyState from "../components/common/EmptyState";

export default function ProductsPage() {
  const [searchParams] = useSearchParams();

  const allBrands = useMemo(
    () => [...new Set(PRODUCTS.map((p) => p.brand))].sort(),
    []
  );

  const allCategories = CATEGORIES.map((c) => c.name);

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [filters, setFilters] = useState<FilterState>({
    categories: new Set(
      searchParams.get("category")
        ? [searchParams.get("category")!]
        : []
    ),
    brands: new Set(),
    maxPrice: 2500,
    minRating: 0,
  });

  const [sort, setSort] = useState(
    searchParams.get("sort") === "deals"
      ? "discount"
      : "featured"
  );

  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);

  const clearFilters = () => {
    setFilters({
      categories: new Set(),
      brands: new Set(),
      maxPrice: 2500,
      minRating: 0,
    });

    setSearch("");
    setSort("featured");
  };

  let results = PRODUCTS.filter((p) => {
    if (
      search &&
      !p.name.toLowerCase().includes(search.toLowerCase())
    )
      return false;

    if (
      filters.categories.size > 0 &&
      !filters.categories.has(p.category)
    )
      return false;

    if (
      filters.brands.size > 0 &&
      !filters.brands.has(p.brand)
    )
      return false;

    if (p.price > filters.maxPrice) return false;

    if (p.rating < filters.minRating) return false;

    return true;
  });

  if (sort === "price-asc")
    results = [...results].sort((a, b) => a.price - b.price);

  else if (sort === "price-desc")
    results = [...results].sort((a, b) => b.price - a.price);

  else if (sort === "rating")
    results = [...results].sort((a, b) => b.rating - a.rating);

  else if (sort === "newest")
    results = [...results].sort((a, b) => b.id - a.id);

  else if (sort === "discount")
    results = [...results].sort(
      (a, b) => getDiscountPct(b) - getDiscountPct(a)
    );

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">

      {/* Entire page centered */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">

        {/* Hero */}
        <section className="mb-12">

          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-5">
            ElectroMart Collection
          </span>

          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
            Discover Amazing Products
          </h1>

          <p className="mt-4 text-lg text-slate-400">
            Explore our premium collection of electronics with unbeatable prices.
          </p>

          <p className="mt-2 text-indigo-300 font-medium">
            {results.length} products available
          </p>

        </section>

        {/* Search */}
        <section className="mb-10">

          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-5 flex flex-col lg:flex-row gap-4 shadow-xl">

            <div className="flex-1">
              <SearchBar
                value={search}
                onChange={setSearch}
              />
            </div>

            <div className="flex gap-3">

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price Low → High</option>
                <option value="price-desc">Price High → Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>

              <button
                onClick={() =>
                  setMobileFiltersOpen((s) => !s)
                }
                className="lg:hidden flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
              >
                <SlidersHorizontal size={18} />
                Filters
              </button>

            </div>

          </div>

        </section>

        {/* Products Layout */}
        <section>

          <div className="grid lg:grid-cols-4 gap-10">

            {/* Sidebar */}

            <aside
              className={`${
                mobileFiltersOpen ? "block" : "hidden"
              } lg:block`}
            >
              <FilterPanel
                categories={allCategories}
                brands={allBrands}
                filters={filters}
                setFilters={setFilters}
                onClear={clearFilters}
              />
            </aside>

            {/* Products */}

            <div className="lg:col-span-3">

              {results.length === 0 ? (
                <EmptyState
                  icon={Search}
                  title="No products found"
                  message="Try adjusting your filters or search."
                  actionLabel="Clear Filters"
                  onAction={clearFilters}
                />
              ) : (

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">

                  {results.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}

                </div>

              )}

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}