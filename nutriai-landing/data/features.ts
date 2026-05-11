import { Settings, Calendar, Calculator, Ban, ShoppingCart, Gift } from "lucide-react";
import { Feature } from "@/types/feature";

export const features: Feature[] = [
  {
    icon: Settings,
    title: "Personalización total",
    description: "Cada plan se adapta a tus preferencias, objetivos y estilo de vida.",
  },
  {
    icon: Calendar,
    title: "Plan semanal completo",
    description: "7 días de comidas equilibradas, nunca más preguntar qué comer.",
  },
  {
    icon: Calculator,
    title: "Calorías calculadas",
    description: "Tu metabolismo y objetivos reflejados en cada comida.",
  },
  {
    icon: Ban,
    title: "Sin restricciones ignoradas",
    description: "Vegetariano, vegano, celiaco o intolerante: tu dieta, tus reglas.",
  },
  {
    icon: ShoppingCart,
    title: "Lista de la compra",
    description: "Generada automáticamente, lista para ir al supermercado.",
  },
  {
    icon: Gift,
    title: "Gratis para empezar",
    description: "Tu primer plan sin costo. Sin tarjeta, sin compromiso.",
  },
];