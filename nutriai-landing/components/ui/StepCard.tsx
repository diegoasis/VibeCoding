import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepCardProps {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export default function StepCard({ number, icon: Icon, title, description, className }: StepCardProps) {
  return (
    <article className={cn("flex flex-col items-center text-center", className)}>
      <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand text-white">
        <span className="font-display text-2xl font-bold">{number}</span>
      </div>
      <div className="mb-3 inline-flex rounded-xl bg-brand-pale p-3">
        <Icon className="h-6 w-6 text-brand-dark" aria-hidden="true" />
      </div>
      <h3 className="mb-2 font-body text-lg font-semibold text-text-primary">{title}</h3>
      <p className="font-body text-sm leading-relaxed text-text-secondary max-w-[240px]">{description}</p>
    </article>
  );
}