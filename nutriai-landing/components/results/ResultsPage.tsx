"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download, RefreshCw, ShoppingCart, Utensils, ChevronDown, ChevronUp } from "lucide-react";
import { generatePDF } from "@/lib/ai/pdfGenerator";

interface Meal {
  name: string;
  dish: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

interface Day {
  day: string;
  meals: Meal[];
}

interface DietPlan {
  calories: number;
  macros: { protein: number; carbs: number; fat: number };
  days: Day[];
  shoppingList: Array<{
    category: string;
    items: string[];
  }>;
}

interface ResultsPageProps {
  plan: DietPlan;
}

export default function ResultsPage({ plan }: ResultsPageProps) {
  const [activeTab, setActiveTab] = useState<"semana" | "lista">("semana");
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [currentWeek, setCurrentWeek] = useState(1);

  const startIndex = (currentWeek - 1) * 7;
  const daysPerWeek = plan.days.slice(startIndex, startIndex + 7);

  const avgCalories = Math.round(plan.days.reduce((sum, d) => sum + d.meals.reduce((mSum, m) => mSum + m.calories, 0), 0) / plan.days.length);
  const avgProtein = Math.round(plan.days.reduce((sum, d) => sum + d.meals.reduce((mSum, m) => mSum + (m.protein || 0), 0), 0) / plan.days.length);
  const avgCarbs = Math.round(plan.days.reduce((sum, d) => sum + d.meals.reduce((mSum, m) => mSum + (m.carbs || 0), 0), 0) / plan.days.length);

  const handleDownloadPDF = () => {
    generatePDF(plan);
  };

  const totalCalories = daysPerWeek[0]?.meals.reduce((a, m) => a + m.calories, 0) || 0;

  return (
    <div className="min-h-screen bg-cream">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-brand text-white pt-16 pb-12 text-center"
      >
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
          ✨ Tu Plan de 4 Semanas
        </h1>
        <p className="text-brand-pale text-base max-w-2xl mx-auto px-4">
          Plan personalizado basado en tu perfil
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 -mt-6">
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-4">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="py-2">
              <div className="text-2xl font-bold text-brand">{avgCalories}</div>
              <div className="text-xs text-text-secondary">kcal/día</div>
            </div>
            <div className="py-2 border-l border-r border-gray-100">
              <div className="text-2xl font-bold text-brand">{avgProtein}g</div>
              <div className="text-xs text-text-secondary">Proteína</div>
            </div>
            <div className="py-2">
              <div className="text-2xl font-bold text-brand">{avgCarbs}g</div>
              <div className="text-xs text-text-secondary">Carbs</div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-4 overflow-x-auto">
          {[1, 2, 3, 4].map(week => (
            <button
              key={week}
              onClick={() => setCurrentWeek(week)}
              className={`flex-1 py-2 px-3 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                currentWeek === week
                  ? "bg-brand text-white"
                  : "bg-white text-text-secondary"
              }`}
            >
              Semana {week}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab("semana")}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === "semana"
                ? "bg-brand text-white"
                : "bg-white text-text-secondary"
            }`}
          >
            <Utensils className="inline w-4 h-4 mr-1" />
            Plan Semanal
          </button>
          <button
            onClick={() => setActiveTab("lista")}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === "lista"
                ? "bg-brand text-white"
                : "bg-white text-text-secondary"
            }`}
          >
            <ShoppingCart className="inline w-4 h-4 mr-1" />
            Lista Compra
          </button>
        </div>

        {activeTab === "semana" && (
          <div className="space-y-3">
            {daysPerWeek.map((day, index) => (
              <motion.div
                key={`${day.day}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setExpandedDay(expandedDay === index ? null : index)}
                  className="w-full p-3 flex items-center justify-between text-left"
                >
                  <div>
                    <span className="font-semibold text-text-primary">{day.day}</span>
                    <span className="ml-2 text-xs text-text-secondary">
                      {day.meals.reduce((a, m) => a + m.calories, 0)} kcal
                    </span>
                  </div>
                  {expandedDay === index ? (
                    <ChevronUp className="w-5 h-5 text-text-secondary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-text-secondary" />
                  )}
                </button>
                
                {expandedDay === index && (
                  <div className="px-3 pb-3 space-y-2">
                    {day.meals.map((meal, mealIndex) => (
                      <div key={mealIndex} className="p-2 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-xs font-medium text-brand">{meal.name}</span>
                          <span className="text-xs text-text-secondary">{meal.calories} kcal</span>
                        </div>
                        <div className="text-sm text-text-primary mb-1">{meal.dish}</div>
                        {meal.protein && (
                          <div className="text-xs text-text-secondary">
                            P: {meal.protein}g | C: {meal.carbs}g | G: {meal.fat}g
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "lista" && (
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-text-primary mb-3">Lista de la Compra - Semana {currentWeek}</h3>
            {plan.shoppingList && plan.shoppingList.length > 0 ? (
              <div className="space-y-3">
                {typeof plan.shoppingList[0] === 'object' && 'semana1' in plan.shoppingList[0] ? (
                  // New format: { semana1: [...], semana2: [...] }
                  (() => {
                    const weeklyList = plan.shoppingList[0] as any;
                    const currentList = weeklyList[`semana${currentWeek}`] || weeklyList[`semana_${currentWeek}`] || [];
                    return currentList.map((section: any) => (
                      <div key={section.category}>
                        <h4 className="font-medium text-text-primary text-sm mb-2">{section.category}</h4>
                        <ul className="space-y-1">
                          {section.items.map((item: string) => (
                            <li key={item} className="flex items-center gap-2">
                              <input type="checkbox" className="rounded text-brand" />
                              <span className="text-sm text-text-secondary">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ));
                  })()
                ) : (
                  // Old format: single list for all weeks
                  plan.shoppingList.map((section) => (
                    <div key={section.category}>
                      <h4 className="font-medium text-text-primary text-sm mb-2">{section.category}</h4>
                      <ul className="space-y-1">
                        {section.items.map((item) => (
                          <li key={item} className="flex items-center gap-2">
                            <input type="checkbox" className="rounded text-brand" />
                            <span className="text-sm text-text-secondary">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <p className="text-text-secondary text-sm">No hay lista de compra disponible. Genera el plan desde el formulario.</p>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mt-6 mb-12">
          <button 
            onClick={handleDownloadPDF}
            className="flex-1 py-3 bg-brand text-white rounded-full font-medium hover:bg-brand-dark transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Descargar PDF
          </button>
          <Link
            href="/crear-dieta"
            className="flex-1 py-3 bg-white border-2 border-gray-200 text-text-primary rounded-full font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Nueva dieta
          </Link>
        </div>
      </div>
    </div>
  );
}