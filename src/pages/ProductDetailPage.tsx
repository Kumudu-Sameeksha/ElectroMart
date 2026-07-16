import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ChevronRight,
  ArrowLeft,
  ShoppingCart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Search,
} from "lucide-react";

import { PRODUCTS } from "../data/products";
import { useStore } from "../context/CartContext";
import { formatPrice, getDiscountPct, stockInfo } from "../utils/format";
import RatingStars from "../components/common/RatingStars";
import QuantitySelector from "../components/common/QuantitySelector";
import Button from "../components/common/Button";
import SectionTitle from "../components/common/SectionTitle";
import ProductCard from "../components/products/ProductCard";
import EmptyState from "../components/common/EmptyState";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const product = PRODUCTS.find((p) => p.slug === slug);
  const { addToCart } = useStore();

  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [color, setColor] = useState(product?.colors?.[0]);

  if (!product) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-20">
        <EmptyState
          icon={Search}
          title="Product not found"
          message="This product may have been removed or the link is incorrect."
          actionLabel="Back to Products"
          onAction={() => navigate("/products")}
        />
      </main>
    );
  }

  const discount = getDiscountPct(product);
  const sInfo = stockInfo(product.stock);

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <main className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 min-h-screen text-white">

      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-6 pt-8 text-sm text-slate-400 flex items-center gap-2">
        <Link to="/" className="hover:text-indigo-400">Home</Link>
        <ChevronRight size={14} />
        <Link to="/products" className="hover:text-indigo-400">Products</Link>
        <ChevronRight size={14} />
        <span className="text-white font-medium">{product.name}</span>
      </div>

      {/* BACK */}
      <div className="max-w-7xl mx-auto px-6 mt-4">
        <button
          onClick={() => navigate("/products")}
          className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition"
        >
          <ArrowLeft size={16} />
          Back to Products
        </button>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-2 gap-12">

        {/* IMAGE SECTION */}
        <div className="space-y-4">

          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl">
            <img
              src={product.images[activeImg]}
              alt={product.name}
              className="w-full aspect-square object-cover hover:scale-105 transition duration-700"
            />

            {discount > 0 && (
              <span className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                -{discount}%
              </span>
            )}
          </div>

          {/* thumbnails */}
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                  activeImg === i
                    ? "border-indigo-500"
                    : "border-white/10"
                }`}
              >
                <img
                  src={img}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div className="space-y-5">

          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-wide">
            {product.brand} · {product.category}
          </p>

          <h1 className="text-4xl font-extrabold leading-tight">
            {product.name}
          </h1>

          <RatingStars
            rating={product.rating}
            reviewCount={product.reviewCount}
          />

          {/* PRICE */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold">
              {formatPrice(product.price)}
            </span>

            {product.oldPrice && (
              <span className="text-slate-400 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}

            {discount > 0 && (
              <span className="bg-red-500 text-xs px-2 py-1 rounded-full font-bold">
                -{discount}%
              </span>
            )}
          </div>

          {/* STOCK */}
          <span className={`inline-block text-xs px-3 py-1 rounded-full ${sInfo.cls}`}>
            {sInfo.text}
          </span>

          {/* DESCRIPTION */}
          <p className="text-slate-300 leading-7">
            {product.fullDescription}
          </p>

          {/* COLORS */}
          {product.colors && (
            <div>
              <p className="text-sm font-semibold mb-2">Color</p>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`px-3 py-1.5 rounded-lg text-sm border transition ${
                      color === c
                        ? "border-indigo-500 bg-indigo-500/10 text-indigo-300"
                        : "border-white/10 text-slate-300"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex gap-3 pt-4">
            <QuantitySelector
              qty={qty}
              max={product.stock}
              onInc={() => setQty((q) => Math.min(product.stock, q + 1))}
              onDec={() => setQty((q) => Math.max(1, q - 1))}
            />

            <Button
              variant="outline"
              className="flex-1"
              onClick={() => addToCart(product, qty)}
              disabled={product.stock === 0}
            >
              <ShoppingCart size={16} />
              Add to Cart
            </Button>

            <Button
              variant="primary"
              className="flex-1"
              onClick={() => {
                addToCart(product, qty);
                navigate("/cart");
              }}
              disabled={product.stock === 0}
            >
              Buy Now
            </Button>
          </div>

          {/* FEATURES */}
          <div className="grid grid-cols-3 gap-3 pt-6">
            {[
              { icon: Truck, text: "Fast Delivery" },
              { icon: ShieldCheck, text: "Secure Payment" },
              { icon: RotateCcw, text: "Easy Returns" },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-xl p-3 text-center"
                >
                  <Icon className="mx-auto text-indigo-400 mb-1" size={18} />
                  <p className="text-xs text-slate-300">{f.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SPECIFICATIONS */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-6">Specifications</h2>

        <div className="rounded-3xl border border-white/10 overflow-hidden bg-white/5 backdrop-blur-xl">
          {Object.entries(product.specifications).map(([k, v], i) => (
            <div
              key={k}
              className={`flex justify-between px-6 py-4 text-sm ${
                i % 2 === 0 ? "bg-white/5" : ""
              }`}
            >
              <span className="text-slate-300">{k}</span>
              <span className="text-white font-medium">{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <SectionTitle title="Related Products" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}