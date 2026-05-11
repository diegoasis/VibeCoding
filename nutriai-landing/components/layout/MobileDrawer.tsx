"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={onClose}
          />
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-sm bg-cream p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="font-display text-xl font-bold text-brand">
                Nutri<span className="text-brand-dark">AI</span>
              </span>
              <button
                onClick={onClose}
                className="p-2 text-text-primary hover:text-brand transition-colors"
                aria-label="Cerrar menú"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-4">
              <Link
                href="/#como-funciona"
                className="font-body text-lg text-text-primary py-3 border-b border-gray-200"
                onClick={onClose}
              >
                Cómo funciona
              </Link>
              <Link
                href="/#funciones"
                className="font-body text-lg text-text-primary py-3 border-b border-gray-200"
                onClick={onClose}
              >
                Funciones
              </Link>
              <Link
                href="/#testimonios"
                className="font-body text-lg text-text-primary py-3 border-b border-gray-200"
                onClick={onClose}
              >
                Testimonios
              </Link>
            </nav>

            <div className="mt-8">
              <Link href="/crear-dieta" className="block w-full px-6 py-3 text-base font-medium text-center text-white bg-brand rounded-full hover:bg-brand-dark transition-all">
                Crear mi dieta gratis
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}