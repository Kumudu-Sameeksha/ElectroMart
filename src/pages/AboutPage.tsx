import {
  BadgeCheck,
  Truck,
  ShieldCheck,
  LifeBuoy,
  Zap,
} from "lucide-react";
import SectionTitle from "../components/common/SectionTitle";


export default function AboutPage() {
  return (
    <main className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">

      {/* HERO */}
      <section className="relative overflow-hidden py-28 text-center">

        {/* glowing background */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/20 blur-[140px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/20 blur-[140px] rounded-full"></div>

        <div className="relative max-w-4xl mx-auto px-6">

          <span className="inline-block px-4 py-2 mb-6 text-sm rounded-full bg-white/5 border border-white/10 text-slate-300">
            About ElectroMart
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Built for the Future of{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Technology
            </span>
          </h1>

          <p className="text-slate-300 text-lg leading-8 max-w-2xl mx-auto">
            We deliver premium electronic devices with trust, speed, and quality.
            Our goal is to make technology accessible for everyone, everywhere.
          </p>

        </div>
      </section>

      {/* MISSION + VISION */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-8">

        <div className="group relative p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-indigo-500 transition duration-300 hover:-translate-y-2">

          <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-indigo-500 mb-6 group-hover:scale-110 transition">
            <BadgeCheck />
          </div>

          <h2 className="text-2xl font-bold mb-3">Our Mission</h2>

          <p className="text-slate-400 leading-7">
            Our mission is to provide customers with high-quality, genuine electronic products 
            at competitive prices while delivering exceptional customer service, 
            secure shopping experiences, and fast, reliable delivery. We strive to make the latest technology 
            accessible to everyone through innovation, trust, and excellence.
          </p>

        </div>

        <div className="group relative p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-cyan-500 transition duration-300 hover:-translate-y-2">

          <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-cyan-500 mb-6 group-hover:scale-110 transition">
            <Zap />
          </div>

          <h2 className="text-2xl font-bold mb-3">Our Vision</h2>

          <p className="text-slate-400 leading-7">
            Our vision is to become the most trusted and preferred online electronics 
            marketplace by empowering people with innovative technology, building lasting 
            customer relationships, and setting new standards for quality,
             reliability, and digital shopping experiences worldwide.
      
          </p>

        </div>

      </section>

      {/* FEATURES */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900 text-white">

        <div className="max-w-7xl mx-auto px-6">
          

          <SectionTitle
            eyebrow="WHY CHOOSE US"
            title="Why Customers Love ElectroMart"
            subtitle="We focus on trust, quality, and speed to deliver the best experience."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">

            {[
              {
                icon: BadgeCheck,
                title: "Genuine Products",
                desc: "100% authentic products from verified suppliers.",
                color: "from-indigo-500 to-blue-500",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                desc: "Quick shipping with real-time tracking updates.",
                color: "from-cyan-500 to-sky-500",
              },
              {
                icon: ShieldCheck,
                title: "Secure Payments",
                desc: "Your transactions are fully encrypted and safe.",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: LifeBuoy,
                title: "Support",
                desc: "24/7 customer support whenever you need help.",
                color: "from-orange-500 to-yellow-500",
              },
            ].map((item, i) => {
              const Icon = item.icon;

              return (
                <div
                  key={i}
                  className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-indigo-500 transition duration-300 hover:-translate-y-2"
                >
                  {/* icon */}
                  <div
                    className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition`}
                  >
                    <Icon />
                  </div>

                  <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-400 transition">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-400">
                    {item.desc}
                  </p>

                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-indigo-500 to-cyan-500 group-hover:w-full transition-all duration-500"></div>
                </div>
              );
            })}

          </div>

        </div>

      </section>

    </main>
  );
}