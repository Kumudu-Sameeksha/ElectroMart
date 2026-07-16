
import { Link } from "react-router-dom";
import { Globe, Phone, Mail, Zap } from "lucide-react";
import { CATEGORIES } from "../data/categories";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 font-extrabold text-xl text-white mb-4">
            <span className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center"><Zap size={20} /></span>
            ElectroMart
          </div>
          <p className="text-sm text-slate-400 mb-5">Your trusted destination for the latest electronics — genuine products, fast delivery, unbeatable prices.</p>
          <div className="flex gap-3">
            {[Globe, Mail].map((Icon, i) => (
              <span key={i} className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer">
                <Icon size={16} />
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[["Home", "/"], ["Products", "/products"], ["About Us", "/about"], ["Contact", "/contact"], ["Cart", "/cart"]].map(([label, to]) => (
              <li key={to}><Link to={to} className="hover:text-white transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Categories</h4>
          <ul className="space-y-2 text-sm">
            {CATEGORIES.slice(0, 5).map((c) => (
              <li key={c.name}>
                <Link to={`/products?category=${encodeURIComponent(c.name)}`} className="hover:text-white transition-colors">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Contact Info</h4>

<ul className="space-y-3 text-sm">

  <li className="flex items-center gap-3 hover:text-indigo-400 transition-colors">
    <Phone size={15} />
    +1 (555) 234-7890
  </li>

  <li className="flex items-center gap-3 hover:text-indigo-400 transition-colors">
    <Mail size={15} />
    support@electromart.com
  </li>

  

</ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} ElectroMart. All rights reserved.
      </div>
    </footer>
  );
}