import { FormData } from "@/types/form";

export interface DietPlan {
  calories: number;
  macros: { protein: number; carbs: number; fat: number };
  days: Array<{
    day: string;
    meals: Array<{
      name: string;
      dish: string;
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
    }>;
  }>;
  shoppingList: Array<{
    category: string;
    items: string[];
  }>;
}

const API_KEY = "";

export async function generateDietPlan(formData: FormData): Promise<DietPlan> {

  const userMealsPerDay = formData.mealsPerDay || 3;
  const isOpenToChange = formData.openToChangeMeals || false;
  
  // Calculate target calories for reference
  const targetCalories = calculateTargetCalories(formData);
  const targetProtein = Math.round(targetCalories * 0.3 / 4);
  const targetCarbs = Math.round(targetCalories * 0.4 / 4);
  const targetFat = Math.round(targetCalories * 0.3 / 9);

  const prompt = `Genera un plan de dieta de 28 días (4 semanas) personalizado en JSON.

La estructura debe ser exactamente:
{
  "calories": NUMERO,
  "macros": { "protein": NUMERO, "carbs": NUMERO, "fat": NUMERO },
  "days": [
    {
      "day": "Lunes Semana 1",
      "meals": [
        { "name": "Desayuno", "dish": "NOMBRE CON INGREDIENTES Y GRAMOS", "calories": NUMERO, "protein": NUMERO, "carbs": NUMERO, "fat": NUMERO },
        { "name": "Almuerzo", "dish": "NOMBRE CON INGREDIENTES Y GRAMOS", "calories": NUMERO, "protein": NUMERO, "carbs": NUMERO, "fat": NUMERO },
        { "name": "Merienda", "dish": "NOMBRE CON INGREDIENTES Y GRAMOS", "calories": NUMERO, "protein": NUMERO, "carbs": "NUMERO", "fat": NUMERO },
        { "name": "Cena", "dish": "NOMBRE CON INGREDIENTES Y GRAMOS", "calories": NUMERO, "protein": NUMERO, "carbs": NUMERO, "fat": NUMERO }
      ]
    }
    // Repetir para Martes Semana 1, Miércoles Semana 1, Jueves Semana 1, Viernes Semana 1, Sábado Semana 1, Domingo Semana 1
    // Luego Martes Semana 2... hasta completar 28 días (4 semanas)
  ],
  "shoppingList": [
    { "category": "NOMBRE CATEGORÍA", "items": ["ITEM1 (g)", "ITEM2 (g)", ...] }
  ]
}

Datos del usuario:
- Sexo: ${formData.sex === "hombre" ? "Hombre" : "Mujer"}
- Edad: ${formData.age} años
- Peso: ${formData.weight} kg
- Altura: ${formData.height} cm
- Nivel de actividad física: ${formData.activityLevel?.replace("_", " ")}
- Objetivos: ${formData.goals.join(", ")}
- Tipo de dieta: ${formData.dietType?.replace("_", " ")}
- Restricciones: ${formData.restrictions.join(", ") || "Ninguna"}
- Alergias: ${formData.allergies.join(", ") || "Ninguna"}
- No le gusta: ${formData.dislikedFoods.join(", ") || "Ninguno"}
- Cocinas preferidas: ${formData.cuisines.join(", ") || "Sin preferencia"}
- Comidas actuales al día: ${userMealsPerDay}
- Usuario abierto a cambiar número de comidas: ${isOpenToChange ? "SÍ" : "NO"}

REGLAS OBLIGATORIAS:

1. **Número de comidas**: ${isOpenToChange 
  ? "Determina el número ÓPTIMO de comidas por día según el objetivo del usuario. Para perder peso usa 4-5 comidas, para ganar músculo usa 4-5 comidas, para mantener usa 3-4 comidas. Incluye el número de comidas en cada día del JSON." 
  : `Usa EXACTAMENTE ${userMealsPerDay} comidas por día como el usuario ha indicado.`}

2. **Distribución calórica**: Las kcal totales del día deben sumar aproximadamente ${targetCalories} kcal

3. **macros por comida**: Cada comida debe tener protein/carbs/fat en gramos. Distribución típica:
   - Desayuno: 25% de kcal diarias
   - Almuerzo: 35% de kcal diarias
   - Merienda (si hay): 10% de kcal diarias
   - Cena: 30% de kcal diarias

4. **gramos de ingredientes**: Cada plato debe incluir los ingredientes con sus gramos exactos en formato "150g ingrediente". Ejemplo: "150g pechuga de pollo + 100g arroz + 100g brócoli". USA ESTE FORMATO EXACTO - es necesario para calcular la lista de la compra automáticamente.

5. **28 días**: El plan debe tener exactamente 28 entradas (4 semanas x 7 días), cada día puede tener diferente número de comidas

6. **Sin alimentos prohibidos**: No usar ningún ingrediente de allergies o dislikedFoods

7. **Tipo de dieta**: Adaptar recetas al tipo de dieta (${formData.dietType?.replace("_", " ")})



  9. **Desayunos normales**: Los desayunos deben ser platos típicos de desayuno que la gente come normalmente. Ejemplos: avena con leche y frutas, tostadas con aguacate y huevo, tortilla francesa, yogurt con granola y frutas, smoothie de frutas, pan con mermelada y queso, bizcocho casero, cafe con leche y gallintegras, etc. NUNCA pongas pollo, carne o pescado en el desayuno - eso es poco realista.

  10. **Semanas VARIADAS**: Cada semana debe tener comidas DIFERENTES. Semana 1: desayunos tipo europeo. Semana 2: desayunos tipo americano. Semana 3: desayunos con smoothie/smoothie bowl. Semana 4: desayunos salados diferentes. Igual con almuerzos y cenas - variety es la clave. NO repitas la misma semana 4 veces.

  11. **Shopping list realista**: Las cantidades deben ser para 4 semanas. Calcula: cantidad por comida × número de comidas × 28 días. Ejemplo: si usas 150g pollo en almuerzo, 4 semanas = 150 × 1 × 28 = 4200g = 4.2kg.

  12. Devuelve SOLO el JSON válido, sin texto antes ni después`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        response_format: { type: "json_object" },
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }
    
    const data = await response.json();
    const responseText = data.choices[0]?.message?.content || "";
    
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      
      // Normalize days to have exactly 28 days with correct names
      const weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
      const normalizedDays = [];
      
      if (parsed.days) {
        // Take first 28 days or fill if needed
        for (let i = 0; i < 28; i++) {
          const day = parsed.days[i] || parsed.days[i % parsed.days.length];
          normalizedDays.push({
            ...day,
            day: `${weekDays[i % 7]} Semana ${Math.floor(i / 7) + 1}`
          });
        }
      }
      parsed.days = normalizedDays;
      
      // Always calculate shopping list from the actual dishes generated
      parsed.shoppingList = generateShoppingListFromDays(parsed.days, formData);
      
      return parsed;
    }
    throw new Error("No se pudo parsear la respuesta");
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return generateMockPlan(formData);
  }
}

function generateShoppingListFromDays(days: any[], formData: FormData): Array<{category: string, items: string[]}> {
  const ingredients = new Set<string>();
  
  const normalizeIngredient = (name: string): string => {
    const cleaned = name.toLowerCase().trim();
    const mappings: Record<string, string> = {
      "pechuga de pollo": "pollo", "muslo de pollo": "pollo", "pollo": "pollo",
      "carne molida": "carne", "carne de res": "carne", "ternera": "carne", "carne": "carne",
      "salmón fresco": "salmón", "salmón": "salmón", "salmón ahumado": "salmón",
      "atún fresco": "atún", "atún": "atún", "atún en lata": "atún",
      "huevo": "huevos", "huevos": "huevos", "clara de huevo": "clara de huevo",
      "pavo": "pavo", "pechuga de pavo": "pavo",
      "merluza": "merluza", "bacalao": "bacalao", "caballa": "caballa",
      "brócoli": "brócoli", "brocoli": "brócoli", "espinacas": "espinacas",
      "lechuga": "lechuga", "lechuga romana": "lechuga",
      "tomate": "tomate", "tomates cherry": "tomates",
      "pimiento": "pimiento", "pimiento verde": "pimiento", "pimiento rojo": "pimiento",
      "cebolla": "cebolla", "cebolla blanca": "cebolla",
      "zanahoria": "zanahoria", "zanahorias": "zanahoria",
      "calabacín": "calabacín", "calabacin": "calabacín",
      "judías verdes": "judías verdes", "judias": "judías",
      "guisantes": "guisantes",
      "arroz": "arroz", "arroz integral": "arroz integral", "arroz blanco": "arroz",
      "pasta": "pasta", "espaguetis": "pasta", "macarrones": "pasta",
      "quinoa": "quinoa",
      "patata": "patata", "patatas": "patata",
      "plátano": "plátano", "platano": "plátano",
      "manzana": "manzana", "manzanas": "manzana",
      "fresas": "fresas", "fresa": "fresas",
      "arándanos": "arándanos", "arandanos": "arándanos",
      "naranja": "naranja", "naranjas": "naranja",
      "kiwi": "kiwi", "kiwis": "kiwi",
      "mango": "mango", "mangos": "mango",
      "uva": "uva", "uvas": "uva",
      "leche": "leche", "leche de avena": "leche de avena", "leche de almendra": "leche de almendra",
      "yogur": "yogur", "yogur griego": "yogur griego",
      "queso": "queso", "queso fresco": "queso fresco",
      "pan": "pan", "pan integral": "pan integral", "tostadas": "pan",
      "avena": "avena", "copos de avena": "avena",
      "aceite": "aceite", "aceite de oliva": "aceite de oliva", "aceite de oliva virgen": "aceite de oliva",
      "almendras": "almendras", "almendra": "almendras",
      "nueces": "nueces", "nuez": "nueces",
      "mermelada": "mermelada", "miel": "miel",
      "granola": "granola",
      "cacao": "cacao", "cacao puro": "cacao",
      "canela": "canela",
    };
    return mappings[cleaned] || cleaned;
  };
  
  // Process first 7 days (one week)
  const oneWeek = days.slice(0, 7);
  
  for (const day of oneWeek) {
    for (const meal of day.meals || []) {
      const dish = meal.dish || "";
      
      // Find all ingredient-like words (simple approach)
      // Look for known ingredients in the dish string
      const knownIngredients = [
        "pollo", "carne", "salmón", "atún", "huevos", "huevo", "pavo", "merluza", "bacalao", "caballa", "pescado",
        "brócoli", "brocoli", "espinacas", "lechuga", "tomate", "tomates", "pimiento", "cebolla", "zanahoria", "calabacín", "calabacin", "judías", "guisantes", "verduras", "hortalizas",
        "plátano", "platano", "manzana", "fresas", "arándanos", "arandanos", "naranja", "kiwi", "mango", "uva",
        "arroz", "pasta", "quinoa", "patata", "pan", "avena", "tostadas",
        "leche", "yogur", "queso", "nata",
        "aceite", "almendras", "nueces", "mermelada", "miel", "granola", "aguacate", "cacao", "canela"
      ];
      
      const dishLower = dish.toLowerCase();
      for (const ingredient of knownIngredients) {
        if (dishLower.includes(ingredient)) {
          ingredients.add(normalizeIngredient(ingredient));
        }
      }
    }
  }
  
  // Categorize
  const proteins = ["pollo", "carne", "salmón", "atún", "huevos", "pavo", "merluza", "bacalao", "caballa", "pescado"];
  const veggies = ["brócoli", "espinacas", "lechuga", "tomate", "tomates", "pimiento", "cebolla", "zanahoria", "calabacín", "judías", "guisantes", "verduras", "hortalizas"];
  const fruits = ["plátano", "manzana", "fresas", "arándanos", "naranja", "kiwi", "mango", "uva"];
  const carbs = ["arroz", "pasta", "quinoa", "patata", "pan", "avena", "tostadas"];
  const dairy = ["leche", "yogur", "queso", "nata"];
  const others = ["aceite", "almendras", "nueces", "mermelada", "miel", "granola", "aguacate", "cacao", "canela"];
  
  const categorized = {
    proteins: Array.from(ingredients).filter(i => proteins.some(p => i.includes(p))),
    veggies: Array.from(ingredients).filter(i => veggies.some(p => i.includes(p))),
    fruits: Array.from(ingredients).filter(i => fruits.some(p => i.includes(p))),
    carbs: Array.from(ingredients).filter(i => carbs.some(p => i.includes(p))),
    dairy: Array.from(ingredients).filter(i => dairy.some(p => i.includes(p))),
    others: Array.from(ingredients).filter(i => others.some(p => i.includes(p))),
  };
  
  const result = [
    { category: "Proteínas", items: [...new Set(categorized.proteins)].sort() },
    { category: "Verduras", items: [...new Set(categorized.veggies)].sort() },
    { category: "Frutas", items: [...new Set(categorized.fruits)].sort() },
    { category: "Carbohidratos", items: [...new Set(categorized.carbs)].sort() },
    { category: "Lácteos", items: [...new Set(categorized.dairy)].sort() },
    { category: "Otros", items: [...new Set(categorized.others)].sort() },
  ].filter(s => s.items.length > 0);
  
  return result;
}

function calculateTargetCalories(formData: FormData): number {
  const heightM = formData.height / 100;
  let bmr = formData.sex === "hombre"
    ? 88.362 + (13.397 * formData.weight) + (4.799 * formData.height) - (5.677 * formData.age)
    : 447.593 + (9.247 * formData.weight) + (3.098 * formData.height) - (4.330 * formData.age);

  const activityFactors: Record<string, number> = {
    sedentario: 1.2,
    ligeramente_activo: 1.375,
    moderadamente_activo: 1.55,
    muy_activo: 1.725,
    extremadamente_activo: 1.9,
  };

  const tdee = bmr * (activityFactors[formData.activityLevel || "ligeramente_activo"] || 1.375);

  let targetCalories = tdee;
  if (formData.goals.includes("perder_peso")) {
    targetCalories -= formData.goalSpeed === "suave" ? 125 : formData.goalSpeed === "agresivo" ? 375 : 250;
  } else if (formData.goals.includes("ganar_musculo")) {
    targetCalories += formData.goalSpeed === "suave" ? 125 : formData.goalSpeed === "agresivo" ? 375 : 250;
  }

  return Math.round(targetCalories);
}

function generateMockPlan(formData: FormData): DietPlan {
  const targetCalories = calculateTargetCalories(formData);
  const targetProtein = Math.round(targetCalories * 0.3 / 4);
  const targetCarbs = Math.round(targetCalories * 0.4 / 4);
  const targetFat = Math.round(targetCalories * 0.3 / 9);

  const mealsPerDay = formData.mealsPerDay || 3;
  const mealCalorie = Math.round(targetCalories / mealsPerDay);
  const mealProtein = Math.round(targetProtein / mealsPerDay);
  const mealCarbs = Math.round(targetCarbs / mealsPerDay);
  const mealFat = Math.round(targetFat / mealsPerDay);

  const allMeals = [
    { name: "Desayuno", dish: "Avena 80g + Fruits reds 100g + Almonds 15g" },
    { name: "Almuerzo", dish: "Chicken breast 150g + Rice 100g + Broccoli 100g" },
    { name: "Merienda", dish: "Greek yogurt 150g + Honey 10g" },
    { name: "Cena", dish: "Salmon 150g + Potato 150g + Salad 80g" },
    { name: "Media mañana", dish: "Apple 1u + Walnuts 20g" },
    { name: "Recena", dish: "Cottage cheese 100g" },
  ];

  const mealsForUser = allMeals.slice(0, mealsPerDay);

  const weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const days = [];
  
  for (let week = 1; week <= 4; week++) {
    for (const dayName of weekDays) {
      days.push({
        day: `${dayName} Semana ${week}`,
        meals: mealsForUser.map(meal => ({
          name: meal.name,
          dish: meal.dish,
          calories: mealCalorie,
          protein: mealProtein,
          carbs: mealCarbs,
          fat: mealFat,
        })),
      });
    }
  }

  const shoppingList = [
    { category: "Proteínas", items: ["Chicken breast: 3000g", "Salmon: 1500g", "Eggs: 60u", "Turkey breast: 1000g"] },
    { category: "Vegetales", items: ["Broccoli: 1200g", "Spinach: 800g", "Salad mix: 1000g", "Potato: 2000g"] },
    { category: "Frutas", items: ["Apple: 20u", "Banana: 20u", "Fruits reds: 1000g"] },
    { category: "Lácteos", items: ["Greek yogurt: 1500g", "Cottage cheese: 1000g", "Milk: 2000ml"] },
    { category: "Legumbres/Carbs", items: ["Rice: 2000g", "Oats: 1000g", "Bread integral: 1000g"] },
    { category: "Otros", items: ["Almonds: 300g", "Walnuts: 300g", "Honey: 500g", "Olive oil: 1000ml"] },
  ];

  return {
    calories: targetCalories,
    macros: { protein: targetProtein, carbs: targetCarbs, fat: targetFat },
    days: days as DietPlan['days'],
    shoppingList,
  };
}