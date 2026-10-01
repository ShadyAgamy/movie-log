import { formatCount, formatRating } from "@/lib/format";

// "badge": compact pill overlaid on a poster.
// "inline": text row with vote count, for the detail page.
const Rating = ({
  average,
  count,
  variant = "inline",
  className = "",
}: {
  average: number;
  count: number;
  variant?: "badge" | "inline";
  className?: string;
}) => {
  if (count === 0) return null;

  const star = (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className={`text-amber-400 ${variant === "badge" ? "size-3" : "size-4"}`}
    >
      <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
    </svg>
  );

  if (variant === "badge") {
    return (
      <span
        className={`flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-xs font-semibold text-white backdrop-blur-sm ${className}`}
      >
        {star}
        <span className="sr-only">Rating:</span>
        {formatRating(average)}
      </span>
    );
  }

  return (
    <span className={`flex items-center gap-1.5 ${className}`}>
      {star}
      <span className="sr-only">Rating:</span>
      <span className="font-semibold">{formatRating(average)}</span>
      <span className="text-neutral-500">
        / 10 · {formatCount(count)} votes
      </span>
    </span>
  );
};

export default Rating;
