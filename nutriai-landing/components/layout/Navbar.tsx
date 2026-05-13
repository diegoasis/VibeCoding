"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import MobileDrawer from "./MobileDrawer";

interface NavbarProps {
  minimal?: boolean;
}

export default function Navbar({ minimal = false }: NavbarProps) {
  const scrolled = useScrolled(50);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
          minimal ? "bg-brand" : scrolled ? "bg-white/80 backdrop-blur-md shadow-navbar" : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex max-w-container items-center justify-between px-6 py-4 md:px-10 lg:px-20">
          <Link href="/" className={cn("font-display text-xl font-bold", minimal ? "text-white" : "text-brand")}>
            <span className={minimal ? "text-white" : ""}>Nutri</span><span className="text-emerald-900">AI</span>
          </Link>

          {!minimal && (
            <div className="hidden items-center gap-8 md:flex">
              <Link href="/#como-funciona" className="font-body text-text-secondary hover:text-brand transition-colors">
                Cómo funciona
              </Link>
              <Link href="/#funciones" className="font-body text-text-secondary hover:text-brand transition-colors">
                Funciones
              </Link>
              <Link href="/#testimonios" className="font-body text-text-secondary hover:text-brand transition-colors">
                Testimonios
              </Link>
              <Link href="/crear-dieta" className="px-6 py-3 text-base font-medium text-white bg-brand rounded-full hover:bg-brand-dark transition-all">
                  Crear mi dieta gratis
                </Link>
            </div>
          )}

          {!minimal && (
            <button
              className="md:hidden p-2 text-text-primary"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Abrir menú"
              aria-expanded="false"
            >
              <Menu className="h-6 w-6" />
            </button>
          )}
        </nav>
      </header>

      <MobileDrawer open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}