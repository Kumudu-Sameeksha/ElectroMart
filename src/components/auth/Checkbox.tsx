import type { ReactNode } from "react";

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
  align?: "center" | "start";
}

export default function Checkbox({ checked, onChange, children, align = "center" }: Props) {
  return (
    <label
      className={`flex ${
        align === "start" ? "items-start" : "items-center"
      } gap-2 text-sm text-slate-600 cursor-pointer select-none`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={`rounded accent-indigo-600 ${align === "start" ? "mt-0.5" : ""}`}
      />
      <span>{children}</span>
    </label>
  );
}