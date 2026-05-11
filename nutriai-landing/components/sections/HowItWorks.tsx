"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
          <div className="grid gap-12 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-2 items-start">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <StepCard
                number={1}
                icon={steps[0].icon}
                title={steps[0].title}
                description={steps[0].description}
                className="md:hover:scale-105 transition-transform duration-300"
              />
            </motion.div>

            <div className="hidden md:flex md:items-center md:pt-8">
              <ArrowRight className="w-6 h-6 text-gray-300" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <StepCard
                number={2}
                icon={steps[1].icon}
                title={steps[1].title}
                description={steps[1].description}
                className="md:hover:scale-105 transition-transform duration-300"
              />
            </motion.div>

            <div className="hidden md:flex md:items-center md:pt-8">
              <ArrowRight className="w-6 h-6 text-brand" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <StepCard
                number={3}
                icon={steps[2].icon}
                title={steps[2].title}
                description={steps[2].description}
                className="md:hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}