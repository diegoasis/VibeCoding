"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Zap, Target } from "lucide-react";


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
            <Link href="/crear-dieta" className="inline-block px-8 py-4 text-lg font-medium rounded-full bg-white text-gray-900 border-2 border-gray-200 hover:bg-brand-pale hover:border-brand-pale transition-all duration-200">
              Crear mi dieta personalizada →
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-brand-mint">
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              En 2 minutos
            </span>
            <span className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              100% personalizado
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}