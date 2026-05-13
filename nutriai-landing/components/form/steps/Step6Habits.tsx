"use client";

import { useForm } from "@/context/FormContext";
import { cn } from "@/lib/utils";

const budgetOptions = [
  { id: "ajustado", label: "Ajustado", description: "~30–50€/semana. Recetas económicas." },
  { id: "moderado", label: "Moderado", description: "~50–80€/semana. Equilibrio." },
  { id: "sin_limite", label: "Sin límite", description: "Priorizamos calidad y variedad." },
] as const;

const cookOptions = [
  { id: "si", label: "Sí, casi siempre" },
  { id: "a_veces", label: "A veces" },
  { id: "nunca", label: "Rara vez / Nunca" },
] as const;

const waterOptions = [
  { id: "muy_poco", label: "Muy poco", sub: "<1L" },
  { id: "poco", label: "Poco", sub: "1–1.5L" },
  { id: "normal", label: "Normal", sub: "1.5–2L" },
  { id: "bastante", label: "Bastante", sub: "2–2.5L" },
  { id: "mucho", label: "Mucho", sub: ">2.5L" },
] as const;

const supplements = [
  "Proteína", "Creatina", "Omega-3", "Vitamina D", "Magnesio", "Multivitamínico", "Ninguno"
];

const mealDescriptions: Record<number, string> = {
  2: "Ayuno intermitente 16/8 o similar",
  3: "El patrón más habitual: desayuno, comida y cena",
  4: "Con merienda incluida",
  5: "Con snack de media mañana y merienda",
  6: "Patrón frecuente en dietas de volumen",
};

export default function Step6Habits() {
  const { formData, updateFormData } = useForm();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl font-bold text-text-primary">
          Cuéntanos cómo es tu día a día
        </h2>
        <p className="mt-2 text-text-secondary">
          Adaptamos el plan a tu ritmo de vida real.
        </p>
      </div>

      {/* Comidas al día */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-3">
          ¿Cuántas veces comes al día?
        </label>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => updateFormData({ mealsPerDay: Math.max(2, formData.mealsPerDay - 1) })}
            className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-xl font-bold hover:border-brand transition-colors"
          >
            −
          </button>
          <span className="text-3xl font-bold text-brand w-16 text-center">
            {formData.mealsPerDay}
          </span>
          <button
            type="button"
            onClick={() => updateFormData({ mealsPerDay: Math.min(6, formData.mealsPerDay + 1) })}
            className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-xl font-bold hover:border-brand transition-colors"
          >
            +
          </button>
        </div>
        <p className="mt-2 text-sm text-text-secondary">
          {mealDescriptions[formData.mealsPerDay]}
        </p>
      </div>

      {/* Abierto a cambiar */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-3">
          ¿Estás dispuesto/a a ajustar este número para optimizar tu objetivo?
        </label>
        <p className="text-xs text-text-secondary mb-3">
          {formData.goals.includes("perder_peso") && "Para perder peso, 4-5 comidas suelen funcionar mejor."}
          {formData.goals.includes("ganar_musculo") && "Para ganar músculo, 4-5 comidas con más proteína suelen funcionar mejor."}
          {!formData.goals.includes("perder_peso") && !formData.goals.includes("ganar_musculo") && "Según tu objetivo, esto puede optimizarse."}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => updateFormData({ openToChangeMeals: false })}
            className={`flex-1 py-3 rounded-full text-sm font-medium transition-all ${
              !formData.openToChangeMeals
                ? "bg-brand text-white"
                : "bg-gray-100 text-text-secondary hover:bg-gray-200"
            }`}
          >
            No, prefiero mantener mi ritmo
          </button>
          <button
            type="button"
            onClick={() => updateFormData({ openToChangeMeals: true })}
            className={`flex-1 py-3 rounded-full text-sm font-medium transition-all ${
              formData.openToChangeMeals
                ? "bg-brand text-white"
                : "bg-gray-100 text-text-secondary hover:bg-gray-200"
            }`}
          >
            Sí, estoy abierto/a a cambiar
          </button>
        </div>
      </div>

      {/* Presupuesto */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-3">
          Presupuesto semanal
        </label>
        <div className="grid grid-cols-3 gap-3">
          {budgetOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => updateFormData({ budget: option.id as typeof formData.budget })}
              className={cn(
                "p-4 rounded-2xl border-2 text-left transition-all duration-200",
                formData.budget === option.id
                  ? "border-brand bg-brand-pale"
                  : "border-gray-200 hover:border-brand/50"
              )}
            >
              <span className="block font-semibold text-text-primary">{option.label}</span>
              <span className="text-xs text-text-secondary">{option.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cocinas en casa */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-3">
          ¿Cocinas en casa habitualmente?
        </label>
        <div className="flex gap-2">
          {cookOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => updateFormData({ cookAtHome: option.id as typeof formData.cookAtHome })}
              className={cn(
                "flex-1 py-3 rounded-full text-sm font-medium transition-all duration-200",
                formData.cookAtHome === option.id
                  ? "bg-brand text-white"
                  : "bg-gray-100 text-text-secondary hover:bg-gray-200"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
        {formData.cookAtHome === "nunca" && (
          <div className="mt-4 p-4 bg-gray-50 rounded-xl space-y-2">
            <p className="text-sm font-medium text-text-primary">Te adaptaremos:</p>
            <label className="flex items-center gap-2 text-sm text-text-secondary">
              <input type="checkbox" className="rounded text-brand" />
              Incluir recetas de menos de 15 minutos
            </label>
            <label className="flex items-center gap-2 text-sm text-text-secondary">
              <input type="checkbox" className="rounded text-brand" />
              Priorizar opciones ready-to-eat
            </label>
            <label className="flex items-center gap-2 text-sm text-text-secondary">
              <input type="checkbox" className="rounded text-brand" />
              Incluir opciones de restaurante / delivery saludable
            </label>
          </div>
        )}
      </div>

      {/* Agua */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-3">
          ¿Cuánta agua bebes al día? (opcional)
        </label>
        <div className="flex gap-2">
          {waterOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => updateFormData({ waterIntake: option.id as typeof formData.waterIntake })}
              className={cn(
                "flex-1 py-2 rounded-full text-xs font-medium transition-all duration-200",
                formData.waterIntake === option.id
                  ? "bg-brand text-white"
                  : "bg-gray-100 text-text-secondary hover:bg-gray-200"
              )}
            >
              <span className="block">{option.label}</span>
              <span className="opacity-70">{option.sub}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Suplementos */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-3">
          Suplementación actual (opcional)
        </label>
        <p className="text-xs text-text-secondary mb-3">
          Tendremos en cuenta tus suplementos para no duplicar nutrientes.
        </p>
        <div className="flex flex-wrap gap-2">
          {supplements.map((supp) => (
            <button
              key={supp}
              type="button"
              onClick={() => {
                if (supp === "Ninguno") {
                  updateFormData({ supplements: [] });
                } else {
                  const current = formData.supplements;
                  if (current.includes(supp)) {
                    updateFormData({ supplements: current.filter(s => s !== supp) });
                  } else {
                    updateFormData({ supplements: [...current.filter(s => s !== "Ninguno"), supp] });
                  }
                }
              }}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                formData.supplements.includes(supp)
                  ? "bg-brand text-white"
                  : "bg-gray-100 text-text-secondary hover:bg-gray-200"
              )}
            >
              {supp}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}