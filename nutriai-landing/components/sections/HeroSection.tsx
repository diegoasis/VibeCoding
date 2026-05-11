"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Flame, Leaf, Clock } from "lucide-react";
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
              <Button variant="ghost" size="lg" className="hidden sm:inline-flex">
                Ver cómo funciona <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
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
              {/* Mockup placeholder */}
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-brand-pale to-white shadow-overlay overflow-hidden border border-gray-100">
                <div className="p-6 h-full flex flex-col">
                  {/* Fake app UI */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-brand/20" />
                    <div className="space-y-1">
                      <div className="w-24 h-3 bg-gray-200 rounded" />
                      <div className="w-16 h-2 bg-gray-100 rounded" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 flex-1">
                    <div className="bg-white rounded-2xl p-4 shadow-card">
                      <div className="w-8 h-8 rounded-lg bg-brand/10 mb-2" />
                      <div className="w-16 h-4 bg-gray-200 rounded mb-1" />
                      <div className="w-12 h-2 bg-gray-100 rounded" />
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-card">
                      <div className="w-8 h-8 rounded-lg bg-brand/10 mb-2" />
                      <div className="w-16 h-4 bg-gray-200 rounded mb-1" />
                      <div className="w-12 h-2 bg-gray-100 rounded" />
                    </div>
                    <div className="col-span-2 bg-white rounded-2xl p-4 shadow-card">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-20 h-4 bg-gray-200 rounded" />
                        <div className="w-8 h-8 rounded-full bg-brand/10" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-100 rounded w-full" />
                        <div className="h-2 bg-gray-100 rounded w-full" />
                        <div className="h-2 bg-gray-100 rounded w-2/3" />
                      </div>
                    </div>
                  </div>
                </div>
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