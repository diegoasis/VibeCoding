import { NextResponse } from "next/server";
import { generateDietPlan, DietPlan } from "@/lib/ai/dietService";
import { FormData } from "@/types/form";

export async function POST(request: Request) {
  try {
    const formData: FormData = await request.json();

    if (!formData || !formData.weight || !formData.height || !formData.age) {
      return NextResponse.json(
        { error: "Datos de formulario inválidos" },
        { status: 400 }
      );
    }

    const plan = await generateDietPlan(formData);
    return NextResponse.json(plan);
  } catch (error) {
    console.error("Error generating diet plan:", error);
    return NextResponse.json(
      { error: "Error al generar el plan de dieta" },
      { status: 500 }
    );
  }
}