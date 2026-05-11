"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Flame, Leaf, Clock } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const overlayCards = [
  { icon: Flame, label: "Calories", value: "2.200 kcal" },
  { icon: Leaf, label: "Diet", value: "Vegetarian" },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen pt-24 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#E1F5EE]_via-[#F9F6F0]_to-[#F9F6F0] -z-10" />

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.03] -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ0cmFuc3BhcmVudCIvPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==')]" />

      {/* Blob decorations */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-brand-mint/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-brand-pale rounded-full blur-3xl -z-10" />

      <div className="mx-auto max-w-container px-6 md:px-10 lg:px-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 lg:items-center">
          {/* Left: Text content */}
          <motion.div
            className="lg:col-span-5 lg:py-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="font-display text-4xl font-bold leading-tight text-text-primary md:text-5xl lg:text-6xl">
              Tu dieta perfecta,{" "}
              <span className="text-brand">diseñada por IA</span>{" "}
              en 2 minutos.
            </h1>
            <p className="mt-6 font-body text-lg text-text-secondary md:text-xl">
              Genera un plan nutricional 100% personalizado basado en tus datos,
              objetivos y preferencias. Sin nutricionistas caros, sin apps tediosas.
            </p>

            {/* Microcopy IA */}
<div className="mt-4 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary">
                <span className="w-2 h-2 rounded-full bg-brand" /> Motor inteligente
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary">
                <Clock className="w-4 h-4 text-brand" /> Generado en segundos
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary">
                <Leaf className="w-4 h-4 text-brand" /> Aprende de tus preferencias
              </span>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="animate-pulse2">
                Crear mi dieta gratis
              </Button>
              <Link href="#como-funciona" className="hidden sm:inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 text-text-secondary hover:text-brand hover:bg-brand-pale px-6 py-3 text-base">
                Ver cómo funciona
              </Link>
            </div>
          </motion.div>

          {/* Right: Mockup with overlay cards */}
          <motion.div
            className="lg:col-span-7 relative"
            style={{ y }}
          >
            <motion.div
              className="relative"
              style={{ opacity }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              {/* Food image */}
              <div className="aspect-[4/3] rounded-3xl shadow-overlay overflow-hidden border border-gray-100">
                <img
                  src="/images/ChatGPT Image May 11, 2026 at 10_05_56 PM.png"
                  alt="Plato de comida saludable"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay cards */}
              {overlayCards.map((card, index) => (
                <motion.div
                  key={card.label}
                  className={cn(
                    "absolute bg-white rounded-2xl shadow-overlay p-4",
                    index === 0 ? "top-1/4 -left-6" : "bottom-1/4 -right-6"
                  )}
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-pale">
                      <card.icon className="h-5 w-5 text-brand" />
                    </div>
                    <div>
                      <p className="font-body text-xs text-text-secondary">{card.label}</p>
                      <p className="font-body font-semibold text-text-primary">{card.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}