"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download, RefreshCw, ChefHat, Calendar, ShoppingCart, Utensils } from "lucide-react";

const weeklyPlan = {
  calories: 1850,
  macros: { protein: 140, carbs: 180, fat: 65 },
  days: [
    {
      day: "Lunes",
      meals: [
        { name: "Desayuno", dish: "Avena con frutas rojas y nueces", calories: 450 },
        { name: "Almuerzo", dish: "Pechuga de pollo con quinoa y verduras", calories: 550 },
        { name: "Merienda", dish: "Yogur griego con miel", calories: 150 },
        { name: "Cena", dish: "Salmón al horno con batata", calories: 500 },
      ],
    },
    {
      day: "Martes",
      meals: [
        { name: "Desayuno", dish: "Huevos revueltos con aguacate", calories: 400 },
        { name: "Almuerzo", dish: "Ensalada de legumbres con tofu", calories: 520 },
        { name: "Merienda", dish: "Frutos secos mixtos", calories: 180 },
        { name: "Cena", dish: "Pasta integral con salsa de tomate y pollo", calories: 550 },
      ],
    },
    {
      day: "Miércoles",
      meals: [
        { name: "Desayuno", dish: "Tostada integral con hummus y pepino", calories: 380 },
        { name: "Almuerzo", dish: "Arroz con merluza y guisantes", calories: 580 },
        { name: "Merienda", dish: "Manzana con almendras", calories: 160 },
        { name: "Cena", dish: "Wrap de lechuga con pavo y verduras", calories: 450 },
      ],
    },
    {
      day: "Jueves",
      meals: [
        { name: "Desayuno", dish: "Smoothie de plátano y espinacas", calories: 420 },
        { name: "Almuerzo", dish: "Estofado de carne con verduras", calories: 600 },
        { name: "Merienda", dish: "Queso cottage con frutas", calories: 140 },
        { name: "Cena", dish: "Pisto con tortilla francesa", calories: 480 },
      ],
    },
    {
      day: "Viernes",
      meals: [
        { name: "Desayuno", dish: "Pan integral con tomate y aceite de oliva", calories: 390 },
        { name: "Almuerzo", dish: "Paella de verduras con marisco", calories: 550 },
        { name: "Merienda", dish: "Palitos de zanahoria con hummus", calories: 120 },
        { name: "Cena", dish: "Pollo a la plancha con ensalada", calories: 520 },
      ],
    },
    {
      day: "Sábado",
      meals: [
        { name: "Desayuno", dish: "Tortilla francesa con pan integral", calories: 450 },
        { name: "Almuerzo", dish: "Lasaña de carne con ensalada", calories: 650 },
        { name: "Merienda", dish: "Batido de proteínas", calories: 150 },
        { name: "Cena", dish: "Crema de verduras con tostada", calories: 400 },
      ],
    },
    {
      day: "Domingo",
      meals: [
        { name: "Desayuno", dish: "Tostadas con mermelada sin azúcar", calories: 400 },
        { name: "Almuerzo", dish: "Potaje de garbanzos con espinacas", calories: 580 },
        { name: "Merienda", dish: "Fruta variada", calories: 100 },
        { name: "Cena", dish: "Pechuga de pavo con verduras asadas", calories: 450 },
      ],
    },
  ],
};

const shoppingList = [
  { category: "Proteínas", items: ["Pechuga de pollo", "Salmón", "Merluza", "Huevos", "Pavo", "Carne molida"] },
  { category: "Vegetales", items: ["Espinacas", "Brócoli", "Zanahoria", "Pimiento", "Tomates", "Aguacate", "Verduras variadas"] },
  { category: "Frutas", items: ["Plátano", "Manzana", "Frutos rojos", "Naranja"] },
  { category: "Lácteos", items: ["Yogur griego", "Queso cottage", "Leche"] },
  { category: "Legumbres", items: ["Quinoa", "Garbanzos", "Lentejas", "Judías"] },
  { category: "Otros", items: ["Avena", "Pan integral", "Pasta integral", "Arroz", "Nueces", "Almendras"] },
];

export default function ResultsPage() {
  const [activeTab, setActiveTab] = useState<"semana" | "lista">("semana");

  const totalCalories = weeklyPlan.days.reduce((acc, day) => 
    acc + day.meals.reduce((m, meal) => m + meal.calories, 0), 0
  );

  return (
    <div className="min-h-screen bg-cream">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-brand text-white py-16 text-center"
      >
        <h1 className="font-display text-4xl font-bold mb-4">
          ✨ Tu plan personalizado está listo
        </h1>
        <p className="text-brand-pale text-lg max-w-2xl mx-auto">
          Basado en tu perfil: 28 años, mujer, 65 kg, objetivo perder peso
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 -mt-8">
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold text-brand">{weeklyPlan.calories}</div>
              <div className="text-sm text-text-secondary">kcal/día</div>
            </div>
            <div className="p-4 border-l border-r border-gray-100">
              <div className="text-3xl font-bold text-brand">{weeklyPlan.macros.protein}g</div>
              <div className="text-sm text-text-secondary">Proteína</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-brand">{weeklyPlan.macros.carbs}g</div>
              <div className="text-sm text-text-secondary">Carbohidratos</div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("semana")}
            className={`flex-1 py-3 rounded-full font-medium transition-all ${
              activeTab === "semana"
                ? "bg-brand text-white"
                : "bg-white text-text-secondary hover:bg-gray-50"
            }`}
          >
            <Utensils className="inline w-4 h-4 mr-2" />
            Plan Semanal
          </button>
          <button
            onClick={() => setActiveTab("lista")}
            className={`flex-1 py-3 rounded-full font-medium transition-all ${
              activeTab === "lista"
                ? "bg-brand text-white"
                : "bg-white text-text-secondary hover:bg-gray-50"
            }`}
          >
            <ShoppingCart className="inline w-4 h-4 mr-2" />
            Lista de la Compra
          </button>
        </div>

        {activeTab === "semana" && (
          <div className="space-y-6">
            {weeklyPlan.days.map((day, index) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-card"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-xl font-bold text-text-primary">{day.day}</h3>
                  <span className="text-sm text-text-secondary">
                    {day.meals.reduce((a, m) => a + m.calories, 0)} kcal
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {day.meals.map((meal) => (
                    <div key={meal.name} className="p-3 bg-gray-50 rounded-xl">
                      <div className="text-xs text-brand font-medium mb-1">{meal.name}</div>
                      <div className="text-sm text-text-primary">{meal.dish}</div>
                      <div className="text-xs text-text-secondary mt-1">{meal.calories} kcal</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "lista" && (
          <div className="bg-white rounded-2xl p-6 shadow-card">
            <h3 className="font-display text-xl font-bold text-text-primary mb-6">
              Lista de la Compra Semanal
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {shoppingList.map((section) => (
                <div key={section.category}>
                  <h4 className="font-semibold text-text-primary mb-3">{section.category}</h4>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-brand" />
                        <span className="text-sm text-text-secondary">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 mt-8 mb-16">
          <button className="flex-1 py-4 bg-brand text-white rounded-full font-medium hover:bg-brand-dark transition-all flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            Descargar PDF
          </button>
          <Link
            href="/crear-dieta"
            className="flex-1 py-4 bg-white border-2 border-gray-200 text-text-primary rounded-full font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Generar nueva dieta
          </Link>
        </div>
      </div>
    </div>
  );
}