export interface FormData {
  // Step 1 - Datos físicos
  sex: "hombre" | "mujer" | null;
  age: number;
  weight: number;
  height: number;

  // Step 2 - Actividad
  activityLevel: "sedentario" | "ligeramente_activo" | "moderadamente_activo" | "muy_activo" | "extremadamente_activo" | null;
  exerciseTypes: string[];

  // Step 3 - Objetivos
  goals: string[];
  goalSpeed: "suave" | "moderado" | "agresivo";

  // Step 4 - Restricciones
  dietType: "omnivoro" | "vegetariano" | "vegano" | "pescatario" | "flexitario" | "carnivoro";
  restrictions: string[];
  allergies: string[];
  dislikedFoods: string[];

  // Step 5 - Preferencias
  cuisines: string[];
  spiceLevel: "sin_picante" | "suave" | "medio" | "fuerte";
  flavors: string[];
  textures: string[];

  // Step 6 - Hábitos
  mealsPerDay: number;
  mealTimes: string[];
  budget: "ajustado" | "moderado" | "sin_limite";
  cookAtHome: "si" | "a_veces" | "nunca";
  cookingPreferences: string[];
  waterIntake: "muy_poco" | "poco" | "normal" | "bastante" | "mucho";
  supplements: string[];
}

export const initialFormData: FormData = {
  sex: null,
  age: 30,
  weight: 70,
  height: 170,
  activityLevel: "ligeramente_activo",
  exerciseTypes: [],
  goals: [],
  goalSpeed: "moderado",
  dietType: "omnivoro",
  restrictions: [],
  allergies: [],
  dislikedFoods: [],
  cuisines: [],
  spiceLevel: "sin_picante",
  flavors: [],
  textures: [],
  mealsPerDay: 3,
  mealTimes: ["08:00", "14:00", "21:00"],
  budget: "moderado",
  cookAtHome: "a_veces",
  cookingPreferences: [],
  waterIntake: "normal",
  supplements: [],
};

export const STEPS = [
  { id: 1, title: "Datos físicos" },
  { id: 2, title: "Actividad" },
  { id: 3, title: "Objetivos" },
  { id: 4, title: "Restricciones" },
  { id: 5, title: "Gustos" },
  { id: 6, title: "Hábitos" },
  { id: 7, title: "Resumen" },
] as const;