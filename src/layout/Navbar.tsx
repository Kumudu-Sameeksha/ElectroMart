import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  Zap,
  User,
} from "lucide-react";
import { useStore } from "../context/CartContext";

export default function Navbar() {
  const { cartCount } = useStore();

  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const links = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();

    navigate(`/products?search=${encodeURIComponent(searchVal)}`);

    setSearchOpen(false);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-white/10 shadow-lg">

      <div className="max-w-7xl mx-auto px-6">

        {/* NAVBAR */}

        <div className="flex items-center justify-between h-20">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:rotate-12 transition duration-300">
              <Zap size={22} className="text-white" />
            </div>

            <div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight">
                ElectroMart
              </h1>

              <p className="text-xs text-slate-400 -mt-1">
                Smart Electronics
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}

          <nav className="hidden lg:flex items-center gap-2">

            {links.map((link) => {

              const active = location.pathname === link.to;

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300

                  ${
                    active
                      ? "bg-indigo-500 text-white shadow-lg"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

          </nav>

          {/* Right Side */}

          <div className="flex items-center gap-3">

            
            {/* Login */}

            <div className="flex items-center gap-2">
  {/* Search icon */}
  <button
    onClick={() => setSearchOpen((s) => !s)}
    className="p-2.5 rounded-lg hover:bg-slate-900 text-white"
    aria-label="Search"
  >
    <Search size={20} />
  </button>

  {/* Login & Signup buttons — desktop only */}
  <div className="hidden md:flex items-center gap-2">
    <Link
      to="/login"
      className="px-4 py-2 rounded-xl text-sm font-semibold text-white border border-slate-200 hover:bg-slate-900 transition-colors"
    >
      Log In
    </Link>
    <Link
      to="/signup"
      className="px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-slate-900 transition-colors shadow-md"
    >
      Sign Up
    </Link>
  </div>

  {/* Profile icon — always visible */}
  <Link
    to="/profile"
    className="p-2.5 rounded-lg hover:bg-slate-900 text-white"
    aria-label="Profile"
  >
    <User size={20} />
  </Link>

  {/* Cart icon — always visible */}
  <Link
    to="/cart"
    className="relative p-2.5 rounded-lg hover:bg-slate-900 text-white"
    aria-label="Cart"
  >
    <ShoppingCart size={20} />
    {cartCount > 0 && (
      <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
        {cartCount}
      </span>
    )}
  </Link>

  {/* Hamburger — mobile only */}
  <button
    onClick={() => setMobileOpen((s) => !s)}
    className="md:hidden p-2.5 rounded-lg hover:bg-slate-100 text-white"
    aria-label="Menu"
  >
    {mobileOpen ? <X size={20} /> : <Menu size={20} />}
  </button>
</div>

            {/* Mobile */}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white"
            >
              {mobileOpen ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}
            </button>

          </div>

        </div>

        {/* SEARCH */}

        {searchOpen && (

          <form
            onSubmit={submitSearch}
            className="pb-6 animate-fadeIn"
          >
            <div className="flex items-center bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4">

              <Search
                size={20}
                className="text-slate-400"
              />

              <input
                autoFocus
                value={searchVal}
                onChange={(e) =>
                  setSearchVal(e.target.value)
                }
                placeholder="Search smartphones, laptops, headphones..."
                className="bg-transparent outline-none w-full ml-4 text-white placeholder:text-slate-500"
              />

            </div>
          </form>

        )}

        {/* MOBILE MENU */}

        {mobileOpen && (

          <div className="lg:hidden pb-6 animate-fadeIn">

            <div className="bg-slate-900 rounded-3xl border border-slate-700 overflow-hidden">

              {links.map((link) => {

                const active =
                  location.pathname === link.to;

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-6 py-4 text-sm font-semibold transition

                    ${
                      active
                        ? "bg-indigo-500 text-white"
                        : "text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

            </div>

          </div>

        )}

      </div>

    </header>
  );
}