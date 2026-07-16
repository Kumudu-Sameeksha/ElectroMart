
import type { Testimonial } from "../../types";
import RatingStars from "../common/RatingStars";

export default function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition">

      <RatingStars rating={t.rating} />

      <p className="text-slate-600 text-sm mt-4 mb-5">
        "{t.text}"
      </p>

      <div className="flex items-center gap-3">

        <img
          src={`https://picsum.photos/seed/${t.avatarSeed}/100/100`}
          alt={t.name}
          className="w-11 h-11 rounded-full object-cover"
        />

        <div>
          {/* TITLE COLOR CHANGED TO BLACK */}
          <p className="font-bold text-black text-sm">
            {t.name}
          </p>

          <p className="text-xs text-slate-400">
            {t.role}
          </p>
        </div>

      </div>
    </div>
  );
}