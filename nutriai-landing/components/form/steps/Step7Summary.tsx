"use client";

import { LucideIcon } from "lucide-react";
import { useForm } from "@/context/FormContext";
import { User, Activity, Target, Ban, Utensils, Home, Edit2, Edit2Icon } from "lucide-react";

const activityLabels: Record<string, string> = {
  sedentario: "Sedentario",
  ligeramente_activo: "Ligeramente activo",
  moderadamente_activo: "Moderadamente activo",
  muy_activo: "Muy activo",
  extremadamente_activo: "Extremadamente activo",
};

const dietLabels: Record<string, string> = {
  omnivoro: "Omnívoro",
  vegetariano: "Vegetariano",
  vegano: "Vegano",
  pescatario: "Pescatariano",
  flexitario: "Flexitariano",
  carnivoro: "Carnívoro",
};

interface SummaryItemProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  onEdit?: () => void;
}

function SummaryItem({ icon: Icon, title, children, onEdit }: SummaryItemProps) {
  return (
    <div className="p-4 bg-gray-50 rounded-2xl">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-brand" />
          <span className="font-semibold text-text-primary text-sm">{title}</span>
        </div>
        {onEdit && (
          <button onClick={onEdit} className="text-text-secondary hover:text-brand" type="button">
            <Edit2Icon className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="text-sm text-text-secondary">{children}</div>
    </div>
  );
}

export default function Step7Summary() {
  const { formData, setCurrentStep, startEditing } = useForm();

  const handleEdit = (step: number) => {
    startEditing();
    setCurrentStep(step);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl font-bold text-text-primary">
          Todo listo. Revisa tu perfil nutricional.
        </h2>
        <p className="mt-2 text-text-secondary">
          Comprueba que todo es correcto antes de generar tu plan.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <SummaryItem icon={User} title="Perfil físico" onEdit={() => handleEdit(1)}>
          {formData.sex === "hombre" ? "Hombre" : "Mujer"} · {formData.age} años<br />
          {formData.weight} kg · {formData.height} cm
        </SummaryItem>

        <SummaryItem icon={Activity} title="Actividad" onEdit={() => handleEdit(2)}>
          {activityLabels[formData.activityLevel || "ligeramente_activo"]}
          {formData.exerciseTypes.length > 0 && ` · ${formData.exerciseTypes.join(", ")}`}
        </SummaryItem>

        <SummaryItem icon={Target} title="Objetivos" onEdit={() => handleEdit(3)}>
          {formData.goals.map(g => g.replace("_", " ")).join(", ")}
          {formData.goals.includes("perder_peso") && ` (${formData.goalSpeed})`}
        </SummaryItem>

        <SummaryItem icon={Ban} title="Restricciones" onEdit={() => handleEdit(4)}>
          {dietLabels[formData.dietType]}
          {formData.allergies.length > 0 && <><br />Sin: {formData.allergies.join(", ")}</>}
          {formData.dislikedFoods.length > 0 && <><br />No come: {formData.dislikedFoods.join(", ")}</>}
        </SummaryItem>

        <SummaryItem icon={Utensils} title="Gustos" onEdit={() => handleEdit(5)}>
          {formData.cuisines.join(", ")}<br />
          Picante: {formData.spiceLevel.replace("_", " ")}
        </SummaryItem>

        <SummaryItem icon={Home} title="Hábitos" onEdit={() => handleEdit(6)}>
          {formData.mealsPerDay} comidas/día · {formData.budget}<br />
          Cocina: {formData.cookAtHome === "si" ? "Sí" : formData.cookAtHome === "a_veces" ? "A veces" : "No"}
        </SummaryItem>
      </div>

      
    </div>
  );
}