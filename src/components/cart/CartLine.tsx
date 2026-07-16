
import { Trash2 } from "lucide-react";
import type { CartItem } from "../../types";
import { useStore } from "../../context/CartContext";
import { formatPrice } from "../../utils/format";
import QuantitySelector from "../common/QuantitySelector";

export default function CartLine({ item }: { item: CartItem }) {
  const { updateQty, removeFromCart } = useStore();
  return (
    <div className="flex items-center gap-4 bg-blue-900 rounded-2xl border border-slate-200 p-4">
      <img src={item.product.image} alt={item.product.name} className="w-20 h-20 rounded-xl object-cover" />
      <div className="flex-1 min-w-0">
        <p className="font-bold text-slate-950 truncate">{item.product.name}</p>
        <p className="text-xs text-slate-100 mb-2">{item.product.brand}</p>
        <p className="font-bold text-indigo-400">{formatPrice(item.product.price)}</p>
      </div>
      <QuantitySelector
        qty={item.qty}
        max={item.product.stock}
        onInc={() => updateQty(item.product.id, item.qty + 1)}
        onDec={() => (item.qty > 1 ? updateQty(item.product.id, item.qty - 1) : removeFromCart(item.product.id))}
      />
      <p className="w-20 text-right font-bold text-black hidden sm:block">{formatPrice(item.product.price * item.qty)}</p>
      <button onClick={() => removeFromCart(item.product.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors" aria-label="Remove">
        <Trash2 size={18} />
      </button>
    </div>
  );
}