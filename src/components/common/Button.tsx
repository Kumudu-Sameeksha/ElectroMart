import type { ButtonHTMLAttributes } from "react";

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark" | "danger";
}

export default function Button({ children, variant = "primary", className = "", ...props }: BtnProps) {
  const base = "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 px-6 py-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5",
    secondary: "bg-white text-indigo-600 hover:bg-slate-50 shadow-lg",
    outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white",
    ghost: "text-slate-700 hover:bg-slate-100",
    dark: "bg-slate-900 text-white hover:bg-slate-800",
    danger: "text-red-600 hover:bg-red-50",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}