
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import type { Product } from "../../types";
import { useStore } from "../../context/CartContext";
import { formatPrice, getDiscountPct, stockInfo } from "../../utils/format";
import RatingStars from "../common/RatingStars";
import Button from "../common/Button";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const navigate = useNavigate();

  const discount = getDiscountPct(product);
  const liked = wishlist.has(product.id);
  const sInfo = stockInfo(product.stock);

  return (
    <div
      className="
        group relative
        bg-white/80 backdrop-blur-xl
        border border-slate-200
        rounded-3xl
        overflow-hidden
        flex flex-col
        shadow-sm
        hover:shadow-2xl
        hover:-translate-y-2
        transition-all duration-500
      "
    >

      {/* IMAGE SECTION */}
      <div
        className="relative cursor-pointer overflow-hidden"
        onClick={() => navigate(`/products/${product.slug}`)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="
            w-full aspect-square object-cover
            group-hover:scale-110
            transition duration-700
          "
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition"></div>

        {/* Discount Badge */}
        {discount > 0 && (
          <span className="
            absolute top-3 left-3
            bg-gradient-to-r from-red-500 to-pink-500
            text-white text-xs font-bold
            px-3 py-1 rounded-full shadow-lg
          ">
            -{discount}%
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="
            absolute top-3 right-3
            w-10 h-10
            rounded-full
            bg-white/90 backdrop-blur
            flex items-center justify-center
            shadow-md
            hover:scale-110
            transition
          "
        >
          <Heart
            size={16}
            className={
              liked ? "fill-red-500 text-red-500" : "text-slate-600"
            }
          />
        </button>

        {/* Quick View Button (hover only) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/products/${product.slug}`);
          }}
          className="
            absolute bottom-3 left-1/2 -translate-x-1/2
            bg-white/90 backdrop-blur
            text-slate-800
            px-4 py-2
            rounded-full
            text-xs font-semibold
            opacity-0 group-hover:opacity-100
            translate-y-3 group-hover:translate-y-0
            transition-all duration-300
          "
        >
          Quick View
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col flex-1">

        {/* Brand */}
        <p className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">
          {product.brand} · {product.category}
        </p>

        {/* Title */}
        <h3
          onClick={() => navigate(`/products/${product.slug}`)}
          className="
            font-bold text-slate-900 mt-1
            cursor-pointer
            hover:text-indigo-600
            transition
            line-clamp-1
          "
        >
          {product.name}
        </h3>

        {/* Rating */}
        <div className="mt-2">
          <RatingStars
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
        </div>

        {/* Description */}
        <p className="text-sm text-slate-500 mt-2 line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Price */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xl font-extrabold text-slate-900">
            {formatPrice(product.price)}
          </span>

          {product.oldPrice && (
            <span className="text-sm text-slate-400 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        {/* Stock */}
        <span
          className={`
            mt-2 inline-block text-[11px] font-semibold px-2 py-1 rounded-full w-fit
            ${sInfo.cls}
          `}
        >
          {sInfo.text}
        </span>

        {/* BUTTONS */}
        <div className="mt-5 flex gap-2">

          <Button
            variant="primary"
            className="
              flex-1 py-2.5 text-xs
              hover:scale-[1.02]
              active:scale-95
              transition
              shadow-md
            "
            disabled={product.stock === 0}
            onClick={() => addToCart(product, 1)}
          >
            <ShoppingCart size={14} />
            Add to Cart
          </Button>

          <Button
            variant="ghost"
            className="
              px-3 py-2.5
              border border-slate-200
              hover:bg-slate-50
              transition
            "
            onClick={() => navigate(`/products/${product.slug}`)}
          >
            <Eye size={16} />
          </Button>

        </div>
      </div>
    </div>
  );
}