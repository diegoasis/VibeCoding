"use client";

import { useState, useEffect } from "react";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  enabled?: boolean;
}

export function useCountUp({ end, duration = 1500, enabled = true }: UseCountUpOptions) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(startValue + (end - startValue) * easeOut));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, enabled]);

  return count;
}