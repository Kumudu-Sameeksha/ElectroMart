
import { Plus, Minus } from "lucide-react";

interface Props {
  qty: number;
  onInc: () => void;
  onDec: () => void;
  max?: number;
}

export default function QuantitySelector({ qty, onInc, onDec, max = 99 }: Props) {
  return (
    <div className="inline-flex items-center border border-slate-200 rounded-xl overflow-hidden">
      <button onClick={onDec} className="p-2.5 hover:bg-slate-100 transition-colors" aria-label="Decrease quantity">
        <Minus size={15} />
      </button>
      <span className="w-10 text-center font-semibold text-sm">{qty}</span>
      <button onClick={onInc} disabled={qty >= max} className="p-2.5 hover:bg-slate-100 transition-colors disabled:opacity-40" aria-label="Increase quantity">
        <Plus size={15} />
      </button>
    </div>
  );
}