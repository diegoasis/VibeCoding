"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FormProvider, useForm } from "@/context/FormContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProgressBar from "@/components/form/ProgressBar";
import StepNavigation from "@/components/form/StepNavigation";
import Step1Physical from "@/components/form/steps/Step1Physical";
import Step2Activity from "@/components/form/steps/Step2Activity";
import Step3Goals from "@/components/form/steps/Step3Goals";
import Step4Restrictions from "@/components/form/steps/Step4Restrictions";
import Step5Cuisine from "@/components/form/steps/Step5Cuisine";
import Step6Habits from "@/components/form/steps/Step6Habits";
import Step7Summary from "@/components/form/steps/Step7Summary";

const steps = [
  Step1Physical,
  Step2Activity,
  Step3Goals,
  Step4Restrictions,
  Step5Cuisine,
  Step6Habits,
  Step7Summary,
];

function FormContent() {
  const { currentStep } = useForm();
  const CurrentStepComponent = steps[currentStep - 1];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="mx-auto max-w-2xl px-6">
          <div className="mb-8">
            <Link href="/" className="text-brand hover:text-brand-dark text-sm font-medium">
              ← Volver a la landing
            </Link>
          </div>

          <div className="mb-8">
            <ProgressBar />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentStepComponent />
            </motion.div>
          </AnimatePresence>

          <StepNavigation />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function CrearDietaPage() {
  return (
    <FormProvider>
      <FormContent />
    </FormProvider>
  );
}