"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingModal from "@/components/results/LoadingModal";
import ResultsPage from "@/components/results/ResultsPage";

function ResultadosContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const fromForm = searchParams.get("from") === "form";

  useEffect(() => {
    if (fromForm) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [fromForm]);

  return (
    <main className="min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingModal key="loading" isLoading={isLoading} />
        ) : (
          <ResultsPage key="results" />
        )}
      </AnimatePresence>
    </main>
  );
}

export default function ResultadosPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<main className="min-h-screen flex items-center justify-center"><div className="text-center"><div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p>Cargando...</p></div></main>}>
        <ResultadosContent />
      </Suspense>
      <Footer />
    </>
  );
}