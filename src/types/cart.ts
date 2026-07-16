import type{ Product } from "./index";

export interface CartItem {
  product: Product;
  qty: number;
}

export interface CartState {
  items: CartItem[];
  cartCount: number;
  cartSubtotal: number;
}

export interface CartActions {
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clearCart: () => void;
}