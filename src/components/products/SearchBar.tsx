
import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-4 py-3 w-full">
      <Search size={18} className="text-slate-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products..."
        className="bg-transparent outline-none text-sm w-full"
      />
    </div>
  );
}