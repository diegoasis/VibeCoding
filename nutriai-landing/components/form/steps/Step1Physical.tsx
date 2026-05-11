"use client";

import { useForm } from "@/context/FormContext";
import { User, Scale, Ruler } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Step1Physical() {
  const { formData, updateFormData } = useForm();

  const calculateBMI = () => {
    const heightM = formData.height / 100;
    const bmi = formData.weight / (heightM * heightM);
    return bmi.toFixed(1);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return "Bajo peso";
    if (bmi < 25) return "Peso saludable";
    if (bmi < 30) return "Sobrepeso";
    return "Obesidad";
  };

  const bmi = parseFloat(calculateBMI());

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl font-bold text-text-primary">
          Empecemos por lo básico
        </h2>
        <p className="mt-2 text-text-secondary">
          Estos datos nos ayudan a calcular tus necesidades calóricas exactas.
        </p>
      </div>

      {/* Sexo */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-3">
          Sexo biológico
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => updateFormData({ sex: "hombre" })}
            className={cn(
              "p-4 rounded-2xl border-2 transition-all duration-200",
              formData.sex === "hombre"
                ? "border-brand bg-brand-pale"
                : "border-gray-200 hover:border-brand/50"
            )}
          >
            <User className="w-8 h-8 mx-auto mb-2 text-brand" />
            <span className="font-medium">Hombre</span>
          </button>
          <button
            type="button"
            onClick={() => updateFormData({ sex: "mujer" })}
            className={cn(
              "p-4 rounded-2xl border-2 transition-all duration-200",
              formData.sex === "mujer"
                ? "border-brand bg-brand-pale"
                : "border-gray-200 hover:border-brand/50"
            )}
          >
            <User className="w-8 h-8 mx-auto mb-2 text-brand" />
            <span className="font-medium">Mujer</span>
          </button>
        </div>
        <p className="mt-2 text-xs text-text-secondary">
          Usamos este dato solo para calcular tu metabolismo basal.
        </p>
      </div>

      {/* Edad */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-3">
          Edad
        </label>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => updateFormData({ age: Math.max(16, formData.age - 1) })}
            className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-xl font-bold hover:border-brand transition-colors"
          >
            −
          </button>
          <span className="text-2xl font-bold text-text-primary w-16 text-center">
            {formData.age}
          </span>
          <button
            type="button"
            onClick={() => updateFormData({ age: Math.min(90, formData.age + 1) })}
            className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-xl font-bold hover:border-brand transition-colors"
          >
            +
          </button>
          <span className="text-text-secondary">años</span>
        </div>
      </div>

      {/* Peso */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-3">
          <Scale className="inline w-4 h-4 mr-1" />
          Peso
        </label>
        <input
          type="range"
          min="40"
          max="200"
          step="0.5"
          value={formData.weight}
          onChange={(e) => updateFormData({ weight: parseFloat(e.target.value) })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand"
        />
        <div className="mt-2 text-center">
          <span className="text-2xl font-bold text-brand">{formData.weight}</span>
          <span className="text-text-secondary ml-1">kg</span>
        </div>
      </div>

      {/* Altura */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-3">
          <Ruler className="inline w-4 h-4 mr-1" />
          Altura
        </label>
        <input
          type="range"
          min="140"
          max="220"
          step="1"
          value={formData.height}
          onChange={(e) => updateFormData({ height: parseInt(e.target.value) })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand"
        />
        <div className="mt-2 text-center">
          <span className="text-2xl font-bold text-brand">{formData.height}</span>
          <span className="text-text-secondary ml-1">cm</span>
        </div>
      </div>

      {/* IMC */}
      <div className="p-4 bg-gray-50 rounded-xl">
        <p className="text-sm text-text-secondary">
          Tu IMC: <span className="font-bold text-text-primary">{bmi}</span> —{" "}
          <span className="font-medium">{getBMICategory(bmi)}</span>
        </p>
      </div>
    </div>
  );
}