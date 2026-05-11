"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-4 left-4 right-4 z-40 md:hidden"
        >
          <Link href="/crear-dieta" className="block w-full px-6 py-3 text-base font-medium text-center text-white bg-brand rounded-full shadow-overlay hover:bg-brand-dark transition-all">
            Crear mi dieta gratis
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}