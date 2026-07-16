

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionTitle({ eyebrow, title, subtitle, center = true }: Props) {
  return (
    <div className={`mb-10 ${center ? "text-center" : ""}`}>
      {eyebrow && <p className="text-sm font-bold uppercase tracking-wider text-indigo-600 mb-2">{eyebrow}</p>}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-white">{title}</h2>
      {subtitle && <p className={`mt-3 text-slate-500 ${center ? "max-w-2xl mx-auto" : ""}`}>{subtitle}</p>}
    </div>
  );
}