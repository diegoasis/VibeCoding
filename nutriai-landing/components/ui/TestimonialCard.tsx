import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  name: string;
  location: string;
  avatar: string;
  rating: number;
  quote: string;
  className?: string;
}

export default function TestimonialCard({
  name,
  location,
  avatar,
  rating,
  quote,
  className,
}: TestimonialCardProps) {
  return (
    <article
      className={cn(
        "rounded-2xl bg-white p-6 shadow-card transition-all duration-200 hover:border hover:border-brand",
        className
      )}
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-pale text-2xl">
          {avatar}
        </span>
        <div>
          <p className="font-body font-semibold text-text-primary">{name}</p>
          <p className="font-body text-sm text-text-secondary">{location}</p>
        </div>
      </div>
      <div className="mb-3 flex" aria-label={`${rating} de 5 estrellas`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn("h-4 w-4", i < rating ? "fill-brand text-brand" : "fill-gray-200 text-gray-200")}
          />
        ))}
      </div>
      <blockquote className="font-body text-text-secondary italic">&ldquo;{quote}&rdquo;</blockquote>
    </article>
  );
}