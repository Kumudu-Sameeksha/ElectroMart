
import { Check } from "lucide-react";
import { useStore } from "../../context/CartContext";

export default function Toast() {
  const { toast } = useStore();
  if (!toast) return null;
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-2 rounded-xl bg-slate-900 text-white px-5 py-3 shadow-2xl">
      <Check size={18} className="text-emerald-400" />
      <span className="text-sm font-medium">{toast}</span>
    </div>
  );
}