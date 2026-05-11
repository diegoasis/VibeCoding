"use client";

import { useForm } from "@/context/FormContext";
import { Armchair, Zap, Bike, Dumbbell, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

const activityOptions = [
  {
    id: "sedentario",
    icon: Armchair,
    title: "Sedentario",
    description: "Trabajo de oficina, poco o nada de ejercicio",
  },
  {
    id: "ligeramente_activo",
    icon: Zap,
    title: "Ligeramente activo",
    description: "Ejercicio ligero 1–3 días a la semana",
  },
  {
    id: "moderadamente_activo",
    icon: Bike,
    title: "Moderadamente activo",
    description: "Ejercicio moderado 3–5 días a la semana",
  },
  {
    id: "muy_activo",
    icon: Dumbbell,
    title: "Muy activo",
    description: "Ejercicio intenso 6–7 días a la semana",
  },
  {
    id: "extremadamente_activo",
    icon: Flame,
    title: "Extremadamente activo",
    description: "Atleta o trabajo físico muy exigente",
  },
] as const;

const exerciseTypes = [
  "Cardio", "Musculación", "Yoga", "Pilates", "Deportes de equipo",
  "Natación", "Ciclismo", "Running", "HIIT", "Caminata"
];

export default function Step2Activity() {
  const { formData, updateFormData } = useForm();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl font-bold text-text-primary">
          ¿Cómo de activo/a eres en el día a día?
        </h2>
        <p className="mt-2 text-text-secondary">
          Sé honesto/a, no hay respuesta incorrecta. Esto ajusta tus calorías diarias.
        </p>
      </div>

      {/* Nivel de actividad */}
      <div className="space-y-3">
        {activityOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => updateFormData({ activityLevel: option.id as typeof formData.activityLevel })}
            className={cn(
              "w-full p-4 rounded-2xl border-2 text-left transition-all duration-200",
              formData.activityLevel === option.id
                ? "border-brand bg-brand-pale"
                : "border-gray-200 hover:border-brand/50"
            )}
          >
            <div className="flex items-center gap-4">
              <option.icon className={cn(
                "w-6 h-6",
                formData.activityLevel === option.id ? "text-brand" : "text-text-secondary"
              )} />
              <div>
                <span className="font-semibold text-text-primary">{option.title}</span>
                <p className="text-sm text-text-secondary">{option.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Ejercicio preferido (opcional) */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-3">
          Tipo de ejercicio (opcional)
        </label>
        <p className="text-xs text-text-secondary mb-3">
          Nos ayuda a ajustar los macronutrientes
        </p>
        <div className="flex flex-wrap gap-2">
          {exerciseTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                const current = formData.exerciseTypes;
                if (current.includes(type)) {
                  updateFormData({ exerciseTypes: current.filter(t => t !== type) });
                } else {
                  updateFormData({ exerciseTypes: [...current, type] });
                }
              }}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                formData.exerciseTypes.includes(type)
                  ? "bg-brand text-white"
                  : "bg-gray-100 text-text-secondary hover:bg-gray-200"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}