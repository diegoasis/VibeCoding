import { User, Target, CheckCircle } from "lucide-react";
import { Step } from "@/types/step";

export const steps: Step[] = [
  {
    number: 1,
    icon: User,
    title: "Cuéntanos sobre ti",
    description: "Tu edad, peso, altura y preferencias alimentarias.",
  },
  {
    number: 2,
    icon: Target,
    title: "Define objetivos",
    description: "Perder peso, ganar músculo o mantenerte en forma.",
  },
  {
    number: 3,
    icon: CheckCircle,
    title: "Recibe tu plan",
    description: "En menos de 2 minutos tienes tu dieta personalizada.",
  },
];