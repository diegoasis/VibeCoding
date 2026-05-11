"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/lib/utils";

interface CounterNumberProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function CounterNumber({ end, suffix = "", prefix = "", duration = 1500, className }: CounterNumberProps) {
  const count = useCountUp({ end, duration, enabled: true });

  return (
    <span className={cn("font-display text-2xl font-bold text-brand-dark", className)}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}