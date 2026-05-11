"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const transforms = {
  before: [
    { label: "Dietas genéricas", icon: "❌" },
    { label: "Confusión nutricional", icon: "❌" },
    { label: "Falta de tiempo", icon: "❌" },
    { label: "Frustración y abandono", icon: "❌" },
  ],
  after: [
    { label: "Claridad total", icon: "✅" },
    { label: "Plan personalizado", icon: "✅" },
    { label: "Sensación de control", icon: "✅" },
    { label: "Alimentación sencilla", icon: "✅" },
  ],
};

export default function TransformBlock() {
  const { ref, isInView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-cream">
      <div className="mx-auto max-w-container px-6 md:px-10 lg:px-20">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
            De la confusión a la claridad
          </h2>
          <p className="mt-4 font-body text-lg text-text-secondary">
            NutriAI no vende una dieta, vende claridad, control y simplicidad.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Before */}
          <motion.div
            className="rounded-3xl bg-white p-8 shadow-card"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="mb-6 font-display text-xl font-bold text-gray-400">Antes ❌</h3>
            <ul className="space-y-4">
              {transforms.before.map((item, index) => (
                <motion.li
                  key={item.label}
                  className="flex items-center gap-3 font-body text-text-secondary"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* After */}
          <motion.div
            className="rounded-3xl bg-brand-pale p-8 border-2 border-brand"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="mb-6 font-display text-xl font-bold text-brand-dark">Después ✅</h3>
            <ul className="space-y-4">
              {transforms.after.map((item, index) => (
                <motion.li
                  key={item.label}
                  className="flex items-center gap-3 font-body text-text-primary font-medium"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}