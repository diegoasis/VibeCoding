"use client";

import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

const loadingSteps = [
  { id: 1, text: "Analizando tu perfil nutricional" },
  { id: 2, text: "Calculando tus necesidades calóricas" },
  { id: 3, text: "Generando menú para los 7 días" },
  { id: 4, text: "Creando lista de la compra" },
  { id: 5, text: "Preparando tu plan personalizado" },
];

interface LoadingModalProps {
  isLoading: boolean;
}

export default function LoadingModal({ isLoading }: LoadingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });

      setCurrentStep((prev) => {
        if (prev < loadingSteps.length - 1 && Math.random() > 0.7) {
          return prev + 1;
        }
        return prev;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
    >
      <div className="max-w-md w-full px-8 text-center">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="mb-8"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-brand-pale flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-brand animate-spin" />
          </div>
        </motion.div>

        <h2 className="font-display text-2xl font-bold text-text-primary mb-2">
          ✨ Estamos creando tu plan...
        </h2>
        <p className="text-text-secondary mb-8">
          Esto solo toma unos segundos
        </p>

        <div className="mb-8">
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-brand"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-sm text-text-secondary mt-2">
            {Math.round(progress)}%
          </p>
        </div>

        <div className="space-y-3 text-left">
          {loadingSteps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-3">
              {index < currentStep ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : index === currentStep ? (
                <Loader2 className="w-5 h-5 text-brand animate-spin" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-200" />
              )}
              <span
                className={`text-sm ${
                  index <= currentStep
                    ? "text-text-primary"
                    : "text-text-secondary"
                }`}
              >
                {step.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}