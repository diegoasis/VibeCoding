import jsPDF from "jspdf";

interface Meal {
  name: string;
  dish: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

interface DietPlan {
  calories: number;
  macros: { protein: number; carbs: number; fat: number };
  days: Array<{
    day: string;
    meals: Meal[];
  }>;
  shoppingList: Array<{
    category: string;
    items: string[];
  }>;
}

export function generatePDF(plan: DietPlan): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  // Header
  doc.setFontSize(24);
  doc.setTextColor(29, 158, 117); // brand color
  doc.text("NutriAI", pageWidth / 2, y, { align: "center" });
  
  y += 10;
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.text("Tu Plan de Dieta Personalizado", pageWidth / 2, y, { align: "center" });
  
  y += 15;
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text(`Objetivo: ${plan.calories} kcal/día`, pageWidth / 2, y, { align: "center" });
  
  // Macros
  y += 10;
  doc.setFontSize(10);
  doc.text(`Proteína: ${plan.macros.protein}g  |  Carbohidratos: ${plan.macros.carbs}g  |  Grasas: ${plan.macros.fat}g`, pageWidth / 2, y, { align: "center" });
  
  y += 15;
  doc.setDrawColor(200, 200, 200);
  doc.line(20, y, pageWidth - 20, y);
  y += 10;

  // Weekly plan
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("Plan Semanal", 20, y);
  y += 10;

  plan.days.forEach((day) => {
    if (y > 260) {
      doc.addPage();
      y = 20;
    }
    
    doc.setFontSize(12);
    doc.setTextColor(29, 158, 117);
    doc.text(day.day, 20, y);
    
    y += 6;
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    
    day.meals.forEach((meal) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.text(`• ${meal.name}: ${meal.dish} (${meal.calories} kcal)`, 25, y);
      y += 4;
    });
    
    y += 6;
  });

  // Shopping list
  if (y > 200) {
    doc.addPage();
    y = 20;
  }
  
  y += 10;
  doc.setDrawColor(200, 200, 200);
  doc.line(20, y, pageWidth - 20, y);
  y += 10;
  
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("Lista de la Compra", 20, y);
  y += 10;

  if (!plan.shoppingList || plan.shoppingList.length === 0) {
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("No hay lista de compra disponible", 20, y);
    y += 10;
  } else {
    plan.shoppingList.forEach((section) => {
    if (y > 260) {
      doc.addPage();
      y = 20;
    }
    
    doc.setFontSize(11);
    doc.setTextColor(29, 158, 117);
    doc.text(section.category, 20, y);
    y += 6;
    
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    section.items.forEach((item) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.text(`☐ ${item}`, 25, y);
      y += 4;
    });
    
    y += 6;
    });
  }

  // Footer
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Generado por NutriAI - Página ${i} de ${totalPages}`, pageWidth / 2, 290, { align: "center" });
  }

  doc.save("NutriAI-Plan-de-Dieta.pdf");
}