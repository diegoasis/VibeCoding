"use client";

import { useForm } from "@/context/FormContext";
import { Scale, TrendingUp, Target, Zap, Wind, Trophy, Droplet, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

const goalOptions = [
  { id: "perder_peso", icon: Scale, title: "Perder peso", description: "Reducir grasa corporal de forma sostenible" },
  { id: "ganar_musculo", icon: TrendingUp, title: "Ganar músculo", description: "Aumentar masa muscular con suficiente proteína" },
  { id: "mantener_peso", icon: Target, title: "Mantener peso", description: "Comer bien sin cambiar tu composición actual" },
  { id: "mejorar_energia", icon: Zap, title: "Mejorar energía", description: "Nutrición para sentirte más activo/a y concentrado/a" },
  { id: "salud_digestiva", icon: Wind, title: "Salud digestiva", description: "Dieta que cuide tu microbiota y digestión" },
  { id: "rendimiento_deportivo", icon: Trophy, title: "Rendimiento deportivo", description: "Alimentación orientada al entrenamiento" },
  { id: "control_glucemia", icon: Droplet, title: "Control de glucemia", description: "Dieta estable en azúcar, apta para diabéticos" },
  { id: "salud_general", icon: Leaf, title: "Salud general", description: "Comer equilibrado sin un objetivo específico" },
] as const;

const speedOptions = [
  { id: "suave", label: "Suave", description: "−0.25 kg/semana. Cambios duraderos, cero sacrificio." },
  { id: "moderado", label: "Moderado", description: "−0.5 kg/semana. El ritmo recomendado." },
  { id: "agresivo", label: "Agresivo", description: "−0.75 kg/semana. Requiere más disciplina." },
] as const;

export default function Step3Goals() {
  const { formData, updateFormData } = useForm();

  const toggleGoal = (goalId: string) => {
    const current = formData.goals;
    if (current.includes(goalId)) {
      updateFormData({ goals: current.filter(g => g !== goalId) });
    } else {
      if (current.length < 3) {
        updateFormData({ goals: [...current, goalId] });
      }
    }
  };

  const showSpeedSelector = formData.goals.includes("perder_peso") || formData.goals.includes("ganar_musculo");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl font-bold text-text-primary">
          ¿Qué quieres conseguir?
        </h2>
        <p className="mt-2 text-text-secondary">
          Puedes elegir hasta 3 objetivos.
        </p>
      </div>

      {/* Objetivos */}
      <div className="grid grid-cols-2 gap-3">
        {goalOptions.map((goal) => (
          <button
            key={goal.id}
            type="button"
            onClick={() => toggleGoal(goal.id)}
            className={cn(
              "p-4 rounded-2xl border-2 text-left transition-all duration-200",
              formData.goals.includes(goal.id)
                ? "border-brand bg-brand-pale"
                : "border-gray-200 hover:border-brand/50"
            )}
          >
            <goal.icon className={cn(
              "w-5 h-5 mb-2",
              formData.goals.includes(goal.id) ? "text-brand" : "text-text-secondary"
            )} />
            <span className="block font-medium text-sm text-text-primary">{goal.title}</span>
            {formData.goals[0] === goal.id && formData.goals.length > 0 && (
              <span className="text-xs text-brand font-medium">Principal</span>
            )}
          </button>
        ))}
      </div>

      {/* Velocidad del objetivo */}
      {showSpeedSelector && (
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-text-primary">
            ¿A qué ritmo quieres {formData.goals.includes("perder_peso") ? "perder peso" : "ganar músculo"}?
          </label>
          <div className="space-y-2">
            {speedOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => updateFormData({ goalSpeed: option.id as typeof formData.goalSpeed })}
                className={cn(
                  "w-full p-4 rounded-2xl border-2 text-left transition-all duration-200",
                  formData.goalSpeed === option.id
                    ? "border-brand bg-brand-pale"
                    : "border-gray-200 hover:border-brand/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-4 h-4 rounded-full border-2",
                    formData.goalSpeed === option.id ? "border-brand bg-brand" : "border-gray-300"
                  )} />
                  <div>
                    <span className="font-medium text-text-primary">{option.label}</span>
                    {option.id === "moderado" && (
                      <span className="ml-2 text-xs text-brand">recomendado</span>
                    )}
                    <p className="text-xs text-text-secondary">{option.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <p className="text-xs text-text-secondary">
            No recomendamos déficits superiores a 750 kcal/día.
          </p>
        </div>
      )}
    </div>
  );
}