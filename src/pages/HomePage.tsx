
import { PRODUCTS } from "../data/products";
import { CATEGORIES } from "../data/categories";
import { TESTIMONIALS } from "../data/testimonials";

import HeroSection from "../components/home/HeroSection";
import CategoryCard from "../components/home/CategoryCard";
import TestimonialCard from "../components/home/TestimonialCard";
import NewsletterSection from "../components/home/NewsletterSection";
import ProductCard from "../components/products/ProductCard";
import SectionTitle from "../components/common/SectionTitle";

import {
  BadgeCheck,
  Truck,
  ShieldCheck,
  LifeBuoy,
} from "lucide-react";

export default function HomePage() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 8);
  const trending = PRODUCTS.filter((p) => p.trending || p.oldPrice).slice(0, 4);

  return (
    <main className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">

      {/* HERO */}
      <HeroSection />

      {/* CATEGORY */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <SectionTitle
          eyebrow="Browse"
          title="Shop by Category"
          subtitle="Find exactly what you're looking for across our electronics collection."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 mt-10">
          {CATEGORIES.map((c) => (
            <CategoryCard key={c.name} cat={c} />
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <SectionTitle
          eyebrow="Handpicked"
          title="Featured Products"
          subtitle="Top quality products selected for performance and value."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* TRENDING */}
      <section className="py-20 bg-slate-900/40 border-y border-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6">

          <SectionTitle
            eyebrow="Limited Time"
            title="Trending Deals"
            subtitle="Hot products with exclusive discounts — grab them before they're gone."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {trending.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="relative py-24">

        {/* background glow */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full"></div>

        <div className="relative max-w-7xl mx-auto px-6">

          <SectionTitle
            eyebrow="WHY CHOOSE US"
            title="Why ElectroMart?"
            subtitle="We combine trust, speed, and quality to give you the best shopping experience."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">

            {[
              {
                icon: BadgeCheck,
                title: "Genuine Products",
                desc: "100% authentic electronics from verified suppliers.",
                color: "from-indigo-500 to-blue-500",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                desc: "Fast and reliable shipping with live tracking.",
                color: "from-cyan-500 to-sky-500",
              },
              {
                icon: ShieldCheck,
                title: "Secure Payments",
                desc: "Your payments are fully encrypted and protected.",
                color: "from-emerald-500 to-green-500",
              },
              {
                icon: LifeBuoy,
                title: "24/7 Support",
                desc: "We are always ready to help you anytime.",
                color: "from-orange-500 to-amber-500",
              },
            ].map((item, i) => {
              const Icon = item.icon;

              return (
                <div
                  key={i}
                  className="
                    group relative
                    bg-white/5
                    border border-white/10
                    backdrop-blur-xl
                    rounded-3xl
                    p-8
                    hover:-translate-y-2
                    hover:border-indigo-500
                    transition-all duration-500
                  "
                >

                  <div
                    className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white group-hover:scale-110 transition`}
                  >
                    <Icon />
                  </div>

                  <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-400 transition">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-400">
                    {item.desc}
                  </p>

                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <SectionTitle
          eyebrow="Testimonials"
          title="What Our Customers Say"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <div className="bg-slate-900/40 border-t border-white/10">
        <NewsletterSection />
      </div>

    </main>
  );
}