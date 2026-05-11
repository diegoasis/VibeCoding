"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import Button from "@/components/ui/Button";
import { Shield, CreditCard } from "lucide-react";

export default function CTABanner() {
  const { ref, isInView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section className="py-20 md:py-28 bg-brand-dark relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-mint/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div ref={ref} className="mx-auto max-w-container px-6 md:px-10 lg:px-20 relative">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Empieza hoy. Tu mejor versión te espera.
          </h2>
          <p className="mt-6 font-body text-lg text-brand-pale max-w-2xl mx-auto">
            Genera tu plan nutricional personalizado en menos de 2 minutos.
            Sin compromiso, sin tarjeta de crédito.
          </p>

          <div className="mt-10">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              Crear mi dieta personalizada →
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-brand-mint">
            <span className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Sin tarjeta de crédito
            </span>
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Datos seguros
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}