"use client";

import { useForm } from "@/context/FormContext";
import { cn } from "@/lib/utils";

const cuisines = [
  { id: "mediterranea", emoji: "🫒", label: "Mediterránea" },
  { id: "española", emoji: "🥘", label: "Española" },
  { id: "italiana", emoji: "🍝", label: "Italiana" },
  { id: "asiatica", emoji: "🥢", label: "Asiática" },
  { id: "japonesa", emoji: "🍱", label: "Japonesa" },
  { id: "mexicana", emoji: "🌮", label: "Mexicana" },
  { id: "arabe", emoji: "🧆", label: "Árabe" },
  { id: "india", emoji: "🍛", label: "India" },
  { id: "americana", emoji: "🥪", label: "Americana" },
  { id: "francesa", emoji: "🥐", label: "Francesa" },
  { id: "griega", emoji: "🫙", label: "Griega" },
  { id: "sin_preferencia", emoji: "🌍", label: "Sin preferencia" },
] as const;

const flavors = ["Dulce", "Salado", "Ácido", "Amargo", "Umami", "Especiado"];
const textures = ["Crujiente", "Cremoso", "Caldoso", "Asado", "Al vapor"];

const spiceLevels = [
  { id: "sin_picante", label: "Sin picante" },
  { id: "suave", label: "Suave" },
  { id: "medio", label: "Medio" },
  { id: "fuerte", label: "Fuerte" },
] as const;

export default function Step5Cuisine() {
  const { formData, updateFormData } = useForm();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl font-bold text-text-primary">
          ¿Qué tipo de comida te gusta?
        </h2>
        <p className="mt-2 text-text-secondary">
          Cuanto más nos cuentes, más sabrosa será tu dieta.
        </p>
      </div>

      {/* Cocinas */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-3">
          Cocinas favoritas
        </label>
        <div className="grid grid-cols-3 gap-3">
          {cuisines.map((cuisine) => (
            <button
              key={cuisine.id}
              type="button"
              onClick={() => {
                const current = formData.cuisines;
                if (cuisine.id === "sin_preferencia") {
                  updateFormData({ cuisines: ["sin_preferencia"] });
                } else {
                  if (current.includes("sin_preferencia")) {
                    updateFormData({ cuisines: [cuisine.id] });
                  } else if (current.includes(cuisine.id)) {
                    updateFormData({ cuisines: current.filter(c => c !== cuisine.id) });
                  } else {
                    updateFormData({ cuisines: [...current, cuisine.id] });
                  }
                }
              }}
              className={cn(
                "p-3 rounded-2xl border-2 transition-all duration-200",
                formData.cuisines.includes(cuisine.id)
                  ? "border-brand bg-brand-pale"
                  : "border-gray-200 hover:border-brand/50"
              )}
            >
              <span className="block text-2xl mb-1">{cuisine.emoji}</span>
              <span className="text-xs font-medium text-text-primary">{cuisine.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Nivel de picante */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-3">
          Nivel de picante
        </label>
        <div className="flex gap-2">
          {spiceLevels.map((level) => (
            <button
              key={level.id}
              type="button"
              onClick={() => updateFormData({ spiceLevel: level.id as typeof formData.spiceLevel })}
              className={cn(
                "flex-1 py-3 rounded-full text-sm font-medium transition-all duration-200",
                formData.spiceLevel === level.id
                  ? "bg-brand text-white"
                  : "bg-gray-100 text-text-secondary hover:bg-gray-200"
              )}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sabores */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-3">
          Sabores preferidos (opcional)
        </label>
        <div className="flex flex-wrap gap-2">
          {flavors.map((flavor) => (
            <button
              key={flavor}
              type="button"
              onClick={() => {
                const current = formData.flavors;
                if (current.includes(flavor)) {
                  updateFormData({ flavors: current.filter(f => f !== flavor) });
                } else {
                  updateFormData({ flavors: [...current, flavor] });
                }
              }}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                formData.flavors.includes(flavor)
                  ? "bg-brand text-white"
                  : "bg-gray-100 text-text-secondary hover:bg-gray-200"
              )}
            >
              {flavor}
            </button>
          ))}
        </div>
      </div>

      {/* Texturas */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-3">
          Textura (opcional)
        </label>
        <div className="flex flex-wrap gap-2">
          {textures.map((texture) => (
            <button
              key={texture}
              type="button"
              onClick={() => {
                const current = formData.textures;
                if (current.includes(texture)) {
                  updateFormData({ textures: current.filter(t => t !== texture) });
                } else {
                  updateFormData({ textures: [...current, texture] });
                }
              }}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                formData.textures.includes(texture)
                  ? "bg-brand text-white"
                  : "bg-gray-100 text-text-secondary hover:bg-gray-200"
              )}
            >
              {texture}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}