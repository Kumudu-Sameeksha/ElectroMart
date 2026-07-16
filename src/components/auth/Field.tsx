import React, { useState } from "react";

interface Props {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}

export default function Field({ icon: Icon, type = "text", placeholder, value, onChange, error }: Props) {
  const [show] = useState(false);
  const isPassword = type === "password";
  return (
    <div>
      <div className={`flex items-center gap-3 bg-slate-50 border rounded-xl px-4 py-3 transition-colors ${error ? "border-red-400" : "border-slate-200 focus-within:border-indigo-500"}`}>
        <Icon size={18} className="text-slate-400 shrink-0" />
        <input
          type={isPassword && show ? "text" : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required
          className="bg-transparent outline-none text-sm w-full text-slate-900 placeholder:text-slate-400"
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1.5 ml-1">{error}</p>}
    </div>
  );
}