import type{ Product } from "../types";

export const formatPrice = (n: number) => `$${n.toLocaleString()}`;

export const getDiscountPct = (p: Product) =>
  p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;

export const stockInfo = (stock: number) => {
  if (stock === 0) return { text: "Out of Stock", cls: "text-red-600 bg-red-50" };
  if (stock < 10) return { text: `Only ${stock} left`, cls: "text-amber-600 bg-amber-50" };
  return { text: "In Stock", cls: "text-emerald-600 bg-emerald-50" };
};