"use client";

import { useState } from "react";
import { useForm } from "@/context/FormContext";
import { X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const dietTypes = [
  { id: "omnivoro", label: "Omnívoro" },
  { id: "vegetariano", label: "Vegetariano" },
  { id: "vegano", label: "Vegano" },
  { id: "pescatario", label: "Pescatariano" },
  { id: "flexitario", label: "Flexitariano" },
] as const;

const restrictions = [
  "Halal", "Kosher", "Sin cerdo", "Sin ternera", "Ayuno intermitente"
] as const;

const allergies = [
  "Gluten", "Lactosa", "Frutos secos", "Cacahuetes", "Mariscos", 
  "Pescado", "Huevo", "Soja", "Sésamo", "Mostaza"
] as const;

const foodSuggestions = [
  "Brócoli", "Hígado", "Berenjenas", "Coles de Bruselas", "Sardinas", "Remolacha"
];

export default function Step4Restrictions() {
  const { formData, updateFormData } = useForm();
  const [newFood, setNewFood] = useState("");

  const addFood = () => {
    if (newFood.trim() && formData.dislikedFoods.length < 15) {
      updateFormData({ dislikedFoods: [...formData.dislikedFoods, newFood.trim()] });
      setNewFood("");
    }
  };

  const removeFood = (food: string) => {
    updateFormData({ dislikedFoods: formData.dislikedFoods.filter(f => f !== food) });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl font-bold text-text-primary">
          ¿Hay algo que no puedas o no quieras comer?
        </h2>
        <p className="mt-2 text-text-secondary">
          Esta información es crítica para tu seguridad.
        </p>
      </div>

      {/* Tipo de dieta */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-3">
          Tipo de dieta
        </label>
        <div className="flex flex-wrap gap-2">
          {dietTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => updateFormData({ dietType: type.id as typeof formData.dietType })}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                formData.dietType === type.id
                  ? "bg-brand text-white"
                  : "bg-gray-100 text-text-secondary hover:bg-gray-200"
              )}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Alergias e intolerancias */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-3">
          Alergias e intolerancias
        </label>
        <p className="text-xs text-text-secondary mb-3">
          Las alergias marcadas aquí nunca aparecerán en tu plan, sin excepciones.
        </p>
        <div className="flex flex-wrap gap-2">
          {allergies.map((allergy) => (
            <button
              key={allergy}
              type="button"
              onClick={() => {
                const current = formData.allergies;
                if (current.includes(allergy)) {
                  updateFormData({ allergies: current.filter(a => a !== allergy) });
                } else {
                  updateFormData({ allergies: [...current, allergy] });
                }
              }}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                formData.allergies.includes(allergy)
                  ? "bg-red-100 text-red-700 border-2 border-red-300"
                  : "bg-gray-100 text-text-secondary hover:bg-gray-200"
              )}
            >
              {allergy}
            </button>
          ))}
        </div>
      </div>

      {/* Restricciones adicionales */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-3">
          Restricciones (opcional)
        </label>
        <div className="flex flex-wrap gap-2">
          {restrictions.map((restriction) => (
            <button
              key={restriction}
              type="button"
              onClick={() => {
                const current = formData.restrictions;
                if (current.includes(restriction)) {
                  updateFormData({ restrictions: current.filter(r => r !== restriction) });
                } else {
                  updateFormData({ restrictions: [...current, restriction] });
                }
              }}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                formData.restrictions.includes(restriction)
                  ? "bg-brand text-white"
                  : "bg-gray-100 text-text-secondary hover:bg-gray-200"
              )}
            >
              {restriction}
            </button>
          ))}
        </div>
      </div>

      {/* Alimentos que detesta */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-3">
          Alimentos que detestas (opcional)
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newFood}
            onChange={(e) => setNewFood(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addFood()}
            placeholder="Ej: brócoli, hígado..."
            className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-full text-sm focus:border-brand focus:outline-none"
          />
          <button
            type="button"
            onClick={addFood}
            className="px-4 py-2 bg-brand text-white rounded-full hover:bg-brand-dark transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {formData.dislikedFoods.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {formData.dislikedFoods.map((food) => (
              <span
                key={food}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {food}
                <button
                  type="button"
                  onClick={() => removeFood(food)}
                  className="text-text-secondary hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-3">
          {foodSuggestions.filter(f => !formData.dislikedFoods.includes(f)).map((food) => (
            <button
              key={food}
              type="button"
              onClick={() => {
                if (formData.dislikedFoods.length < 15) {
                  updateFormData({ dislikedFoods: [...formData.dislikedFoods, food] });
                }
              }}
              className="px-3 py-1 text-xs text-text-secondary bg-gray-50 rounded-full hover:bg-gray-100"
            >
              + {food}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}