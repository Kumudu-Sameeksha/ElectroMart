import type { ReactNode } from "react";
import { Zap, ShieldCheck } from "lucide-react";

interface Props {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthShell({ children, title, subtitle }: Props) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-700 via-indigo-600 to-slate-900 text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute -left-16 bottom-0 w-72 h-72 bg-white/5 rounded-full" />
        <div className="flex items-center gap-2 font-extrabold text-xl relative z-10">
          <span className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center"><Zap size={20} /></span>
          ElectroMart
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold leading-tight mb-4">Your next favorite gadget is one click away.</h2>
          <p className="text-indigo-100 max-w-sm">Join thousands of customers shopping the latest smartphones, laptops, and audio gear at unbeatable prices.</p>
          <div className="flex items-center gap-2 mt-6 text-sm text-indigo-100">
            <ShieldCheck size={16} /> Secure checkout and genuine products
          </div>
        </div>
        <p className="text-xs text-indigo-200 relative z-10">© {new Date().getFullYear()} ElectroMart. All rights reserved.</p>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2 font-extrabold text-xl text-slate-900 mb-8 lg:hidden">
            <span className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white"><Zap size={20} /></span>
            ElectroMart
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-1.5">{title}</h1>
          <p className="text-sm text-slate-500 mb-7">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}