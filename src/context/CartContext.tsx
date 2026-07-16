import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Product, CartItem } from "../types";

interface StoreContextType {
  cart: CartItem[];
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clearCart: () => void;
  wishlist: Set<number>;
  toggleWishlist: (id: number) => void;
  cartCount: number;
  cartSubtotal: number;
  toast: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
};

const CART_KEY = "electromart_cart";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast((cur) => (cur === msg ? null : cur)), 2200);
  };

  const addToCart = (product: Product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) return prev.map((i) => (i.product.id === product.id ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { product, qty }];
    });
    showToast(`${product.name} added to cart`);
  };

  const removeFromCart = (id: number) => setCart((prev) => prev.filter((i) => i.product.id !== id));

  const updateQty = (id: number, qty: number) => {
    if (qty < 1) return;
    setCart((prev) => prev.map((i) => (i.product.id === id ? { ...i, qty } : i)));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartSubtotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);

  return (
    <StoreContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, clearCart, wishlist, toggleWishlist, cartCount, cartSubtotal, toast, showToast }}
    >
      {children}
    </StoreContext.Provider>
  );
}