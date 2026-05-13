"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingModal from "@/components/results/LoadingModal";
import ResultsPage from "@/components/results/ResultsPage";
import { generateDietPlan, DietPlan } from "@/lib/ai/dietService";
function ResultadosContent() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [plan, setPlan] = useState<DietPlan | null>(null);

  const fromForm = searchParams.get("from") === "form";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nutriai-form-data");
      if (saved) {
        try {
          setFormData(JSON.parse(saved));
        } catch (e) {
          console.error("Error parsing form data:", e);
        }
      }
    }
  }, []);

  useEffect(() => {
    const generatePlan = async () => {
      if (fromForm && formData) {
        try {
          console.log("Generando plan con datos:", formData);
          const generatedPlan = await generateDietPlan(formData);
          setPlan(generatedPlan);
        } catch (error) {
          console.error("Error generating plan:", error);
        }
        
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
      } else if (!fromForm) {
        setIsLoading(false);
      }
    };

    generatePlan();
  }, [fromForm, formData]);

  const defaultPlan = {
    calories: 1850,
    macros: { protein: 140, carbs: 180, fat: 65 },
    days: Array.from({ length: 28 }, (_, i) => ({
      day: `Día ${i + 1}`,
      meals: [
        { name: "Desayuno", dish: "Avena con frutas (80g)", calories: 400, protein: 15, carbs: 50, fat: 8 },
        { name: "Almuerzo", dish: "Pollo con arroz (150g+100g)", calories: 550, protein: 40, carbs: 60, fat: 12 },
        { name: "Merienda", dish: "Yogur griego (150g)", calories: 150, protein: 12, carbs: 8, fat: 5 },
        { name: "Cena", dish: "Salmón con verduras (150g+100g)", calories: 450, protein: 35, carbs: 20, fat: 20 },
      ],
    })),
    shoppingList: [
      { category: "Proteínas", items: ["Pollo: 3000g", "Salmón: 2000g", "Huevos: 60u"] },
      { category: "Vegetales", items: ["Brócoli: 1500g", "Espinacas: 1000g"] },
      { category: "Frutas", items: ["Plátano: 20u", "Manzana: 15u"] },
      { category: "Lácteos", items: ["Yogur griego: 2000g"] },
      { category: "Legumbres", items: ["Arroz: 3000g", "Avena: 1000g"] },
    ],
  };

  return (
    <main className="min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingModal key="loading" isLoading={isLoading} />
        ) : (
          <ResultsPage key="results" plan={plan || defaultPlan} />
        )}
      </AnimatePresence>
    </main>
  );
}

export default function ResultadosPage() {
  return (
    <>
      <Navbar minimal />
      <Suspense fallback={<main className="min-h-screen flex items-center justify-center"><div className="text-center"><div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p>Cargando...</p></div></main>}>
        <ResultadosContent />
      </Suspense>
      <Footer />
    </>
  );
}