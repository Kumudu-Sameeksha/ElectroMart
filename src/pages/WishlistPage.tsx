import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart, ShoppingCart, Eye, Trash2, ArrowLeft,
  SlidersHorizontal, Check,
} from "lucide-react";
import { useStore } from "../context/CartContext";
import { PRODUCTS } from "../data/products";
import { formatPrice, getDiscountPct, stockInfo } from "../utils/format";
import RatingStars from "../components/common/RatingStars";
import EmptyState from "../components/common/EmptyState";
import SectionTitle from "../components/common/SectionTitle";

type SortOption = "default" | "price-asc" | "price-desc" | "rating" | "name";

export default function WishlistPage() {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist, addToCart,  } = useStore();
  const [sort, setSort] = useState<SortOption>("default");
  const [addedIds, setAddedIds] = useState<Set<number>>(new Set());
  const [removingIds, setRemovingIds] = useState<Set<number>>(new Set());

  // Get wishlisted products
  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.has(p.id));

  // Sort
  let sorted = [...wishlistedProducts];
  if (sort === "price-asc")  sorted.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
  if (sort === "rating")     sorted.sort((a, b) => b.rating - a.rating);
  if (sort === "name")       sorted.sort((a, b) => a.name.localeCompare(b.name));

  const handleAddToCart = (product: typeof PRODUCTS[0]) => {
    addToCart(product, 1);
    setAddedIds((prev) => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 2000);
  };

  const handleRemove = (id: number) => {
    setRemovingIds((prev) => new Set(prev).add(id));
    setTimeout(() => {
      toggleWishlist(id);
      setRemovingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 300);
  };

  const handleAddAll = () => {
    sorted.filter((p) => p.stock > 0).forEach((p) => addToCart(p, 1));
  };

  const handleClearAll = () => {
    wishlistedProducts.forEach((p) => toggleWishlist(p.id));
  };

  // Suggested products (not in wishlist, same categories)
  const wishlistCategories = new Set(wishlistedProducts.map((p) => p.category));
  const suggested = PRODUCTS
    .filter((p) => !wishlist.has(p.id) && wishlistCategories.has(p.category))
    .slice(0, 4);

  if (wishlist.size === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button
          onClick={() => navigate(-1 as any)}
          className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 mb-6 hover:underline"
        >
          <ArrowLeft size={15} /> Go Back
        </button>
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          message="Browse our products and tap the heart icon to save items you love. They'll all appear here."
          actionLabel="Browse Products"
          onAction={() => navigate("/products")}
        />

        {/* Show trending even when empty */}
        <div className="mt-10">
          <SectionTitle eyebrow="You Might Like" title="Trending Products" center={false} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRODUCTS.filter((p) => p.trending).slice(0, 4).map((p) => (
              <MiniCard key={p.id} product={p} navigate={navigate} onWishlist={toggleWishlist} wishlist={wishlist} onAddToCart={handleAddToCart} addedIds={addedIds} />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
   <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
  <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">

    {/* Back Button */}
    <button
      onClick={() => navigate(-1 as any)}
      className="group flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-indigo-400 transition mb-8"
    >
      <ArrowLeft
        size={16}
        className="group-hover:-translate-x-1 transition-transform"
      />
      Back to Shopping
    </button>

    {/* Header */}
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

      {/* Left */}
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1 text-sm font-semibold text-rose-400 mb-4">
          <Heart size={15} className="fill-rose-500" />
          Saved Items
        </span>

        <h1 className="text-5xl font-black tracking-tight text-white">
          My Wishlist
        </h1>

        <p className="mt-3 text-slate-400 text-lg">
          You have{" "}
          <span className="font-bold text-indigo-400">
            {wishlistedProducts.length}
          </span>{" "}
          saved item
          {wishlistedProducts.length !== 1 && "s"} waiting for you.
        </p>
      </div>

      {/* Right Controls */}
      <div className="flex flex-wrap items-center gap-4">

        {/* Product Count */}
        <div className="rounded-2xl border border-slate-700 bg-slate-800/70 backdrop-blur-xl px-5 py-3">
          <p className="text-xs uppercase tracking-wider text-slate-400">
            Total
          </p>
          <p className="text-xl font-bold text-white">
            {wishlistedProducts.length}
          </p>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-800/70 backdrop-blur-xl px-5 py-3 shadow-lg">

          <SlidersHorizontal
            size={18}
            className="text-indigo-400"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="bg-transparent text-sm font-medium text-white outline-none cursor-pointer"
          >
            <option className="bg-slate-900" value="default">
              Default
            </option>

            <option className="bg-slate-900" value="price-asc">
              Price: Low → High
            </option>

            <option className="bg-slate-900" value="price-desc">
              Price: High → Low
            </option>

            <option className="bg-slate-900" value="rating">
              Highest Rated
            </option>

            <option className="bg-slate-900" value="name">
              Name A–Z
            </option>
          </select>

        </div>

    

          {/* Add all to cart */}
          <button
            onClick={handleAddAll}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-md"
          >
            <ShoppingCart size={15} /> Add All to Cart
          </button>

          {/* Clear all */}
          <button
            onClick={handleClearAll}
            className="flex items-center gap-2 border border-red-200 text-red-500 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-red-50 transition-colors"
          >
            <Trash2 size={15} /> Clear All
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total items",    value: wishlistedProducts.length.toString() },
          { label: "Total value",    value: formatPrice(wishlistedProducts.reduce((s, p) => s + p.price, 0)) },
          { label: "In stock",       value: wishlistedProducts.filter((p) => p.stock > 0).length.toString() },
          { label: "On sale",        value: wishlistedProducts.filter((p) => p.oldPrice).length.toString() },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-200 p-4 text-center">
            <p className="text-2xl font-extrabold text-slate-900">{value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {sorted.map((product) => {
          const discount   = getDiscountPct(product);
          const sInfo      = stockInfo(product.stock);
          const isAdded    = addedIds.has(product.id);
          const isRemoving = removingIds.has(product.id);

          return (
            <div
              key={product.id}
              className={`group bg-gray-200 rounded-2xl border border-slate-200 overflow-hidden flex flex-col transition-all duration-300
                ${isRemoving ? "opacity-0 scale-95" : "hover:shadow-xl hover:-translate-y-1"}`}
            >
              {/* Image */}
              <div
                className="relative cursor-pointer overflow-hidden"
                onClick={() => navigate(`/products/${product.slug}`)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  {discount > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      -{discount}%
                    </span>
                  )}
                  {product.trending && (
                    <span className="bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      Trending
                    </span>
                  )}
                </div>

                {/* Remove from wishlist */}
                <button
                  onClick={(e) => { e.stopPropagation(); handleRemove(product.id); }}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow hover:scale-110 transition-transform"
                  aria-label="Remove from wishlist"
                >
                  <Heart size={16} className="fill-rose-500 text-rose-500" />
                </button>

                {/* Quick view overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/products/${product.slug}`); }}
                    className="flex items-center gap-1.5 bg-white text-slate-900 text-xs font-semibold px-3 py-2 rounded-xl shadow hover:bg-slate-50 transition-colors"
                  >
                    <Eye size={13} /> Quick View
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col flex-1">
                <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                  {product.brand} · {product.category}
                </p>
                <h3
                  onClick={() => navigate(`/products/${product.slug}`)}
                  className="font-bold text-slate-900 mt-1 cursor-pointer hover:text-indigo-600 transition-colors line-clamp-1 text-sm"
                >
                  {product.name}
                </h3>
                <div className="mt-1.5">
                  <RatingStars rating={product.rating} reviewCount={product.reviewCount} size={12} />
                </div>
                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">{product.shortDescription}</p>

                <div className="mt-3 flex items-center gap-2">
                  <span className="text-lg font-extrabold text-slate-900">{formatPrice(product.price)}</span>
                  {product.oldPrice && (
                    <span className="text-sm text-slate-400 line-through">{formatPrice(product.oldPrice)}</span>
                  )}
                </div>

                <span className={`mt-1 text-[11px] font-semibold px-2 py-0.5 rounded-full w-fit ${sInfo.cls}`}>
                  {sInfo.text}
                </span>

                {/* Actions */}
                <div className="mt-4 flex flex-col gap-2">
                  <button
                    disabled={product.stock === 0}
                    onClick={() => handleAddToCart(product)}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all
                      ${isAdded
                        ? "bg-emerald-500 text-white"
                        : product.stock === 0
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                          : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md"
                      }`}
                  >
                    {isAdded ? (
                      <><Check size={15} /> Added!</>
                    ) : (
                      <><ShoppingCart size={15} /> {product.stock === 0 ? "Out of Stock" : "Add to Cart"}</>
                    )}
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/products/${product.slug}`)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      <Eye size={13} /> View Details
                    </button>
                    <button
                      onClick={() => handleRemove(product.id)}
                      className="px-3 py-2 rounded-xl border border-slate-200 text-slate-400 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
                      aria-label="Remove"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* You may also like */}
      {suggested.length > 0 && (
        <div className="mt-16">
          <SectionTitle eyebrow="You May Also Like" title="Similar Products" subtitle="Based on items in your wishlist." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {suggested.map((p) => (
              <MiniCard
                key={p.id}
                product={p}
                navigate={navigate}
                onWishlist={toggleWishlist}
                wishlist={wishlist}
                onAddToCart={handleAddToCart}
                addedIds={addedIds}
              />
            ))}
          </div>
        </div>
      )}
    </div>
    </main>
  );
}

// ─── Mini card for suggestions ────────────────────────────────────────────────
function MiniCard({ product, navigate, onWishlist, wishlist, onAddToCart, addedIds }: {
  product: typeof PRODUCTS[0];
  navigate: (path: string) => void;
  onWishlist: (id: number) => void;
  wishlist: Set<number>;
  onAddToCart: (p: typeof PRODUCTS[0]) => void;
  addedIds: Set<number>;
}) {
  const isAdded = addedIds.has(product.id);
  const liked   = wishlist.has(product.id);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative cursor-pointer" onClick={() => navigate(`/products/${product.slug}`)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={(e) => { e.stopPropagation(); onWishlist(product.id); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow"
        >
          <Heart size={14} className={liked ? "fill-rose-500 text-rose-500" : "text-slate-400"} />
        </button>
      </div>
      <div className="p-4">
        <p className="text-xs font-semibold text-indigo-600">{product.brand}</p>
        <h4
          onClick={() => navigate(`/products/${product.slug}`)}
          className="text-sm font-bold text-slate-900 mt-0.5 cursor-pointer hover:text-indigo-600 line-clamp-1"
        >
          {product.name}
        </h4>
        <RatingStars rating={product.rating} size={12} />
        <div className="flex items-center justify-between mt-3">
          <span className="font-extrabold text-slate-900">{formatPrice(product.price)}</span>
          <button
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
            className={`p-2 rounded-xl transition-colors ${
              isAdded
                ? "bg-emerald-500 text-white"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {isAdded ? <Check size={14} /> : <ShoppingCart size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
}