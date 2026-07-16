
import { Star } from "lucide-react";

interface Props {
  rating: number;
  reviewCount?: number;
  size?: number;
}

export default function RatingStars({ rating, reviewCount, size = 14 }: Props) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star key={n} size={size} className={n <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-slate-300"} />
        ))}
      </div>
      <span className="text-xs text-slate-500">
        {rating}{reviewCount != null && ` (${reviewCount})`}
      </span>
    </div>
  );
}