"use client";

import { STEPS } from "@/types/form";
import { useForm } from "@/context/FormContext";
import { cn } from "@/lib/utils";

export default function ProgressBar() {
  const { currentStep } = useForm();
  const progress = (currentStep / 7) * 100;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-text-secondary">
          Paso {currentStep} de 7
        </span>
        <span className="text-sm text-text-secondary">
          {Math.round(progress)}%
        </span>
      </div>

      <div className="flex items-center gap-2">
        {STEPS.map((step, index) => (
          <div key={step.id} className="flex-1">
            <div
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index + 1 < currentStep
                  ? "bg-brand"
                  : index + 1 === currentStep
                  ? "bg-brand"
                  : "bg-gray-200"
              )}
              style={{
                width: index + 1 === currentStep ? "100%" : "100%",
              }}
            />
          </div>
        ))}
      </div>

      <div className="mt-2 text-xs text-text-secondary text-center">
        {STEPS[currentStep - 1]?.title}
      </div>
    </div>
  );
}