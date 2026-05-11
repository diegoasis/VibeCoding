"use client";

import { useRouter } from "next/navigation";
import { useForm } from "@/context/FormContext";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StepNavigation() {
  const router = useRouter();
  const { currentStep, nextStep, prevStep, canGoNext, isEditing, saveAndReturn } = useForm();

  const canSave = () => canGoNext();

  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
      <div>
        {currentStep > 1 && (
          <button
            type="button"
            onClick={prevStep}
            className="flex items-center gap-2 px-4 py-2 text-text-secondary hover:text-brand transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Anterior
          </button>
        )}
      </div>

      <div>
        {currentStep < 7 ? (
          isEditing ? (
            <button
              type="button"
              onClick={saveAndReturn}
              disabled={!canSave()}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all",
                canSave()
                  ? "bg-brand text-white hover:bg-brand-dark"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              )}
            >
              <Save className="h-4 w-4" />
              Guardar y volver
            </button>
          ) : (
            <button
              type="button"
              onClick={nextStep}
              disabled={!canGoNext()}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all",
                canGoNext()
                  ? "bg-brand text-white hover:bg-brand-dark"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              )}
            >
              Siguiente
              <ArrowRight className="h-4 w-4" />
            </button>
          )
        ) : (
          <button
            type="button"
            onClick={() => router.push("/resultados?from=form")}
            className="px-8 py-4 text-lg font-medium rounded-full bg-brand text-white hover:bg-brand-dark transition-all duration-200"
          >
            ✨ Generar mi plan de dieta personalizado
          </button>
        )}
      </div>
    </div>
  );
}