"use client";

import { useForm } from "@/context/FormContext";
import Button from "@/components/ui/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function StepNavigation() {
  const { currentStep, nextStep, prevStep, canGoNext } = useForm();

  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
      <div>
        {currentStep > 1 && (
          <Button
            variant="ghost"
            onClick={prevStep}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Anterior
          </Button>
        )}
      </div>

      <div>
        {currentStep < 7 ? (
          <Button
            onClick={nextStep}
            disabled={!canGoNext()}
            className="flex items-center gap-2"
          >
            Siguiente
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            className="px-8 py-4 text-lg font-medium rounded-full bg-brand text-white hover:bg-brand-dark transition-all duration-200"
          >
            ✨ Generar mi plan de dieta personalizado
          </Button>
        )}
      </div>
    </div>
  );
}