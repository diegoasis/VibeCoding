"use client";

import { motion } from "framer-motion";
import { steps } from "@/data/steps";
import { useInView } from "@/hooks/useInView";
import StepCard from "@/components/ui/StepCard";
import { cn } from "@/lib/utils";

export default function HowItWorks() {
  const { ref, isInView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section id="como-funciona" className="py-20 md:py-28 bg-white">
      <div ref={ref} className="mx-auto max-w-container px-6 md:px-10 lg:px-20">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
            Cómo funciona
          </h2>
          <p className="mt-4 font-body text-lg text-text-secondary">
            En 3 simples pasos tienes tu plan nutricional personalizado
          </p>
        </motion.div>

        <div className="relative">
          {/* Connector line - desktop only */}
          <div className="absolute top-32 left-1/2 hidden h-1 w-full -translate-x-1/2 md:block lg:top-40">
            <div className="h-full w-full rounded-full bg-gradient-to-r from-brand-pale via-brand to-brand-pale" />
          </div>

          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              >
                <StepCard
                  number={step.number}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  className={cn(
                    "md:hover:scale-105 transition-transform duration-300",
                    index === 1 && "md:translate-y-8 lg:translate-y-12"
                  )}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}