
import { useNavigate } from "react-router-dom";
import { ArrowRight, Star, ShieldCheck, Truck } from "lucide-react";
import Button from "../common/Button";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50 to-cyan-50">

      {/* Background Blur */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-300/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/30 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-14 items-center">

        {/* Left Content */}

        <div>

          <span className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
            ⭐ New Arrivals Every Week
          </span>

          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900 mb-6">
            Upgrade Your
            <span className="block bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Digital Lifestyle
            </span>
          </h1>

          <p className="text-slate-600 text-lg leading-8 max-w-xl mb-8">
            Discover premium smartphones, laptops, gaming gear,
            headphones, smart watches, and accessories from the world's
            top brands at unbeatable prices.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">

            <Button
              onClick={() => navigate("/products")}
              className="px-8 py-3"
            >
              Shop Now
              <ArrowRight size={18} />
            </Button>

            <Button
              variant="outline"
              className="border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white px-8 py-3"
              onClick={() => navigate("/products?sort=deals")}
            >
              Explore Deals
            </Button>

          </div>

          {/* Features */}

          <div className="flex flex-wrap gap-8">

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center">
                <Truck className="text-indigo-600" size={22} />
              </div>

              <div>
                <p className="font-semibold text-slate-800">
                  Free Delivery
                </p>

                <p className="text-sm text-slate-500">
                  On orders over $100
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-cyan-100 flex items-center justify-center">
                <ShieldCheck className="text-cyan-600" size={22} />
              </div>

              <div>

                <p className="font-semibold text-slate-800">
                  Secure Payment
                </p>

                <p className="text-sm text-slate-500">
                  100% Protected
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-yellow-100 flex items-center justify-center">
                <Star className="text-yellow-500" size={22} />
              </div>

              <div>

                <p className="font-semibold text-slate-800">
                  5★ Reviews
                </p>

                <p className="text-sm text-slate-500">
                  Trusted by thousands
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Right Image */}

        <div className="relative">

          <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-indigo-500 to-cyan-500 blur-3xl opacity-20"></div>

          <img
            src="hero.jpg"
            alt="Electronics"
            className="relative rounded-[40px] shadow-2xl border border-white/60 object-cover w-full hover:scale-105 transition duration-500"
          />

          {/* Floating Card */}

          <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl px-6 py-4">

            <h3 className="font-bold text-slate-900 text-lg">
              5000+
            </h3>

            <p className="text-slate-500 text-sm">
              Happy Customers
            </p>

          </div>

          <div className="absolute top-6 -right-6 bg-white rounded-2xl shadow-xl px-6 py-4">

            <h3 className="font-bold text-indigo-600 text-lg">
              100%
            </h3>

            <p className="text-slate-500 text-sm">
              Genuine Products
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}