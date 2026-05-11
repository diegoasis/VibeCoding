"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { socialProof } from "@/data/social-proof";
import { useInView } from "@/hooks/useInView";
import CounterNumber from "@/components/ui/CounterNumber";
import { cn } from "@/lib/utils";

export default function SocialProofBar() {
  const { ref, isInView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section className="bg-white border-y border-gray-100 py-8">
      <div ref={ref} className="mx-auto max-w-container px-6 md:px-10 lg:px-20">
        <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-16">
          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-5 w-5",
                    i <= Math.floor(socialProof.rating)
                      ? "fill-brand text-brand"
                      : "fill-gray-200 text-gray-200"
                  )}
                />
              ))}
            </div>
            <span className="font-body font-semibold text-text-primary">
              {socialProof.rating}/5
            </span>
          </div>

          <div className="hidden h-8 w-px bg-gray-200 md:block" />

          {/* Diets generated counter */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="font-body text-sm text-text-secondary">
              Dietas generadas
            </p>
            <div className="flex items-center gap-1">
              {isInView ? (
                <CounterNumber end={socialProof.dietsGenerated} suffix="+" />
              ) : (
                <span className="font-display text-2xl font-bold text-brand-dark">
                  {socialProof.dietsGenerated.toLocaleString()}+
                </span>
              )}
            </div>
          </motion.div>

          <div className="hidden h-8 w-px bg-gray-200 md:block" />

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-4">
            {socialProof.badges.map((badge, index) => (
              <motion.div
                key={badge.label}
                className="flex items-center gap-2 text-sm text-text-secondary"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <span>{badge.icon}</span>
                <span className="hidden sm:inline">{badge.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}