"use client";

import { motion } from "framer-motion";
import { features } from "@/data/features";
import { useInView } from "@/hooks/useInView";
import FeatureCard from "@/components/ui/FeatureCard";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function FeaturesGrid() {
  const { ref, isInView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="funciones" className="py-20 md:py-28 bg-cream">
      <div ref={ref} className="mx-auto max-w-container px-6 md:px-10 lg:px-20">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
            Todo lo que necesitas
          </h2>
          <p className="mt-4 font-body text-lg text-text-secondary">
            Un plan completo que se adapta a tu vida, no al revés
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}