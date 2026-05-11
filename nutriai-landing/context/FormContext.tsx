"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { FormData, initialFormData } from "@/types/form";

interface FormContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  canGoNext: () => boolean;
  isValidStep: (step: number) => boolean;
  isEditing: boolean;
  startEditing: () => void;
  saveAndReturn: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isEditing, setIsEditing] = useState(false);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < 7) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const saveAndReturn = () => {
    setIsEditing(false);
    setCurrentStep(7);
  };

  const isValidStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.sex !== null;
      case 2:
        return formData.activityLevel !== null;
      case 3:
        return formData.goals.length > 0;
      case 4:
        return true;
      case 5:
        return true;
      case 6:
        return formData.mealsPerDay >= 2;
      case 7:
        return true;
      default:
        return false;
    }
  };

  const canGoNext = () => isValidStep(currentStep);

  return (
    <FormContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        formData,
        updateFormData,
        nextStep,
        prevStep,
        canGoNext,
        isValidStep,
        isEditing,
        startEditing,
        saveAndReturn,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
}