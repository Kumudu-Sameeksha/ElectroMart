import { useNavigate } from "react-router-dom";
import { ShoppingCart, ArrowLeft, ArrowRight } from "lucide-react";
import { useStore } from "../context/CartContext";
import { formatPrice } from "../utils/format";
import CartLine from "../components/cart/CartLine";
import EmptyState from "../components/common/EmptyState";
import Button from "../components/common/Button";

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, cartSubtotal } = useStore();

  const deliveryFee =
    cart.length === 0 || cartSubtotal >= 500 ? 0 : 15;

  const grandTotal = cartSubtotal + deliveryFee;

  

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
        <EmptyState
          icon={ShoppingCart}
          title="Your cart is empty"
          message="Start exploring premium electronics and add items you love."
          actionLabel="Browse Products"
          onAction={() => navigate("/products")}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">

        {/* Title */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold">
            Shopping Cart
          </h1>
          <p className="text-slate-400 mt-2">
            Review your selected items before checkout
          </p>
        </div>

        {/* Layout */}
        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT - ITEMS */}
          <div className="lg:col-span-2 space-y-5">

            <div className="bg-gray-300 backdrop-blur-xl border border-white/10 rounded-3xl p-5 space-y-4">
              {cart.map((item) => (
                <CartLine
                  key={item.product.id}
                  item={item}
                />
              ))}
            </div>

            {/* Continue */}
            <button
              onClick={() => navigate("/products")}
              className="flex items-center gap-2 text-indigo-300 hover:text-indigo-200 text-sm font-semibold transition"
            >
              <ArrowLeft size={16} />
              Continue Shopping
            </button>

          </div>

          {/* RIGHT - SUMMARY */}
          <div className="lg:col-span-1">

            <div className="sticky top-24 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">

              <h2 className="text-xl font-bold mb-5">
                Order Summary
              </h2>

              <div className="space-y-4 text-sm text-slate-300">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-semibold">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="text-white font-semibold">
                    {deliveryFee === 0
                      ? "Free"
                      : formatPrice(deliveryFee)}
                  </span>
                </div>

                {deliveryFee > 0 && (
                  <p className="text-xs text-indigo-300">
                    Add {formatPrice(500 - cartSubtotal)} more for free delivery
                  </p>
                )}

                <div className="border-t border-white/10 pt-4 flex justify-between text-lg font-bold text-white">
                  <span>Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>

              </div>

              {/* Button */}
              <Button className="w-full mt-6" onClick={() => navigate("/checkout")}>
              Checkout <ArrowRight size={16} />
              </Button>
              {/* Extra note */}
              <p className="text-xs text-slate-400 mt-4 text-center">
                Secure checkout powered by ElectroMart
              </p>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}
