import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export default function FeatureCard({ icon: Icon, title, description, className }: FeatureCardProps) {
  return (
    <article
      className={cn(
        "group rounded-2xl bg-white p-6 shadow-card transition-all duration-200",
        "hover:shadow-card-hover hover:-translate-y-1",
        className
      )}
    >
      <div className="mb-4 inline-flex rounded-xl bg-brand-pale p-3">
        <Icon className="h-5 w-5 text-brand-dark" aria-hidden="true" />
      </div>
      <h3 className="mb-2 font-body text-base font-semibold text-text-primary">{title}</h3>
      <p className="font-body text-sm leading-relaxed text-text-secondary">{description}</p>
    </article>
  );
}