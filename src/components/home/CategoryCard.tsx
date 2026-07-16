
import { useNavigate } from "react-router-dom";
import type { Category } from "../../types";

export default function CategoryCard({ cat }: { cat: Category }) {
  const navigate = useNavigate();
  const Icon = cat.icon;

  return (
    <button
      onClick={() =>
        navigate(`/products?category=${encodeURIComponent(cat.name)}`)
      }
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border border-slate-200
        bg-gradient-to-br from-white via-slate-50 to-indigo-50
        p-6
        flex flex-col
        items-center
        gap-4
        shadow-sm
        hover:shadow-2xl
        hover:shadow-indigo-200/50
        hover:-translate-y-2
        hover:border-indigo-300
        transition-all
        duration-300
      "
    >
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-indigo-100/40 to-cyan-100/30"></div>

      {/* Icon */}
      <div
        className="
          relative
          w-16
          h-16
          rounded-2xl
          bg-gradient-to-br
          from-indigo-500
          to-cyan-500
          text-white
          flex
          items-center
          justify-center
          shadow-lg
          group-hover:scale-110
          group-hover:rotate-6
          transition-all
          duration-300
        "
      >
        <Icon size={30} />
      </div>

      {/* Category Name */}
      <h3 className="relative text-base font-bold text-slate-800 group-hover:text-indigo-600 transition">
        {cat.name}
      </h3>

      {/* Small Text */}
      <p className="relative text-sm text-slate-500 text-center">
        Explore the latest {cat.name.toLowerCase()} collection
      </p>

      {/* Bottom Line Animation */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-indigo-500 to-cyan-500 group-hover:w-full transition-all duration-300"></div>
    </button>
  );
}