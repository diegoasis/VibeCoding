# NutriAI — Documento Técnico · Página de Resultados v1.0

**Proyecto:** NutriAI — Generador de dietas personalizadas con IA  
**Tipo:** Página de resultados + generación de PDF descargable  
**Ruta:** `/resultados`  
**Acceso:** CTA "Generar mi plan de dieta personalizado" desde el paso 7 del formulario  
**Contexto:** Bootcamp de vibe coding — ejercicio frontend  
**Versión:** 1.0 (documento técnico completo — 25 bloques)

---

## Índice

1. Propósito y Objetivos
2. Flujo completo del usuario (end-to-end)
3. IA seleccionada y justificación
4. Arquitectura de la integración con IA
5. Construcción del prompt
6. Estructura del plan de 4 semanas
7. Modal de carga — Loading Experience
8. Página de resultados — Layout y contenido
9. Sistema de generación de PDF
10. Diseño del PDF — Identidad visual
11. Estructura interna del PDF
12. Wireframes de referencia
13. Identidad visual y consistencia
14. Paleta de colores y tipografía
15. Grid system y spacing
16. Componentes UI clave
17. Estados UI y microinteracciones
18. Empty states, errores y edge cases
19. Motion design
20. Accesibilidad avanzada
21. Visión técnica
22. Arquitectura del proyecto
23. Stack técnico — detalle de implementación
24. Roadmap de desarrollo
25. Acceptance Criteria

---

## 1. Propósito y Objetivos

La página de resultados es el **momento de mayor valor** del producto. Es donde la promesa de la landing se materializa. El usuario ha invertido tiempo en el formulario y ahora recibe su recompensa: un plan de dieta de 4 semanas completamente personalizado, generado por IA y descargable en PDF.

### Objetivos concretos

- Generar un plan de dieta de 4 semanas mediante IA de forma gratuita y fiable.
- Mantener al usuario informado y entretenido durante el tiempo de generación (8–20 segundos).
- Presentar el plan de forma clara, legible y visualmente atractiva en pantalla.
- Permitir la descarga del plan en PDF con diseño elegante y de calidad profesional.
- Garantizar que el PDF es fiel al plan mostrado en pantalla.
- Que toda la experiencia sea fluida y sin errores percibidos por el usuario.

### KPIs de esta página

| Métrica | Objetivo |
|---|---|
| Tasa de descarga del PDF | > 60% de usuarios que llegan a resultados |
| Tasa de error de la IA | < 2% de las generaciones |
| Tiempo de generación percibido | "Rápido" o "Aceptable" en > 85% de usuarios |
| NPS de la experiencia completa | > 8/10 |

---

## 2. Flujo Completo del Usuario (end-to-end)

```
Landing page
    │
    │  Click "Crear mi dieta gratis"
    ▼
Formulario (7 pasos)
    │
    │  Click "Generar mi plan de dieta personalizado"
    ▼
Modal de carga (spinner + textos dinámicos)
    │                           │
    │  Éxito (~8–20s)           │  Error (timeout / fallo API)
    ▼                           ▼
Página de resultados        Modal de error con reintento
    │
    │  Navegación y lectura del plan
    │
    ├──► Click "Descargar PDF"
    │        │
    │        ▼
    │    Generación del PDF en cliente
    │        │
    │        ▼
    │    Descarga automática del archivo
    │
    └──► Click "Generar nueva dieta"
             │
             ▼
         Formulario (paso 1, datos limpios)
```

---

## 3. IA Seleccionada y Justificación

### Recomendación: Google Gemini API — modelo `gemini-2.0-flash`

| Criterio | Gemini 2.0 Flash | Groq (Llama 3) | Claude API | GPT-4o |
|---|---|---|---|---|
| Coste | **Gratuito** (1.500 req/día) | **Gratuito** (límites generosos) | De pago | De pago |
| Velocidad | Muy rápido (~8–15s para texto largo) | Extremadamente rápido (<5s) | Rápido | Medio |
| Calidad texto largo | **Excelente** | Buena | **Excelente** | Excelente |
| Límite de tokens salida | 8.192 tokens | 8.000 tokens | 8.096 tokens | 4.096 tokens |
| Soporte streaming | ✅ Sí | ✅ Sí | ✅ Sí | ✅ Sí |
| Facilidad de setup | **Muy fácil** | Fácil | Fácil | Fácil |
| Adecuado para producción | ✅ | ✅ | ✅ | ✅ |
| SDK JavaScript oficial | ✅ `@google/generative-ai` | ✅ SDK compatible | ✅ | ✅ |

**Conclusión:** Gemini 2.0 Flash es la elección óptima para este proyecto. Gratuito, rápido, con salida de alta calidad para textos largos y estructurados como planes nutricionales, y con SDK oficial para JavaScript/TypeScript. El plan de 4 semanas puede superar los 3.000 tokens, por lo que la ventana de salida amplia es determinante.

**Segunda opción:** Groq con `llama-3.3-70b-versatile` si se necesita velocidad máxima (el tiempo de respuesta puede bajar a 3–5 segundos). La calidad es ligeramente inferior a Gemini en textos muy estructurados.

### Configuración de la API key

```bash
# .env.local (nunca subir al repositorio)
GEMINI_API_KEY=tu_api_key_aqui
```

La API key se obtiene gratuitamente en [aistudio.google.com](https://aistudio.google.com) en menos de 2 minutos.

> ⚠️ **Importante:** la API key NUNCA se expone al cliente. Toda comunicación con la IA se hace a través de un API Route de Next.js (`/api/generate-diet`) que actúa como proxy seguro.

---

## 4. Arquitectura de la Integración con IA

### Diagrama de flujo técnico

```
Cliente (browser)
    │
    │  POST /api/generate-diet
    │  Body: { formData: FormData }
    │
    ▼
Next.js API Route
/app/api/generate-diet/route.ts
    │
    │  1. Valida el body recibido
    │  2. Construye el prompt con promptBuilder()
    │  3. Llama a Gemini API con streaming
    │  4. Hace pipe del stream al cliente
    │
    ▼
Gemini 2.0 Flash API
(Google AI Studio — gratuito)
    │
    │  Responde con stream de texto
    │  (markdown estructurado del plan)
    │
    ▼
Cliente recibe stream
    │
    │  Parsea markdown en tiempo real
    │  Actualiza el estado con los chunks
    │
    ▼
Página de resultados
(se renderiza progresivamente)
```

### Por qué streaming y no respuesta completa

El plan de 4 semanas puede generar entre 3.000 y 5.000 tokens. Sin streaming, el usuario esperaría 15–25 segundos mirando un spinner sin ningún feedback de avance real. Con streaming:

- El texto empieza a aparecer en 1–3 segundos.
- El usuario ve que "algo está pasando".
- La percepción de velocidad mejora radicalmente.
- El modal de carga puede transicionar a resultados parciales de forma suave.

### API Route — Next.js

```typescript
// app/api/generate-diet/route.ts
import { GoogleGenerativeAI } from '@google/generative-ai'
import { buildDietPrompt } from '@/lib/promptBuilder'
import { FormData } from '@/types/form'

export async function POST(request: Request) {
  const { formData }: { formData: FormData } = await request.json()

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

  const prompt = buildDietPrompt(formData)

  const result = await model.generateContentStream(prompt)

  // Convertir el stream de Gemini a un ReadableStream estándar
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of result.stream) {
        const text = chunk.text()
        controller.enqueue(new TextEncoder().encode(text))
      }
      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
    },
  })
}
```

---

## 5. Construcción del Prompt

El prompt es la pieza más crítica del sistema. Un prompt mal construido produce planes genéricos e inutilizables. Un prompt bien construido produce planes de calidad profesional.

### Principios del prompt

1. **Rol explícito:** se define a la IA como nutricionista certificado con experiencia clínica.
2. **Restricciones como prioridad absoluta:** las alergias y restricciones se marcan como `CRÍTICO — NUNCA INCLUIR`.
3. **Estructura de salida definida:** se especifica exactamente el formato markdown esperado.
4. **Datos concretos, no aproximados:** se pasan calorías calculadas, no rangos.
5. **Instrucciones de calidad:** variedad de recetas, rotación semanal, coherencia entre semanas.

### Prompt completo

````typescript
// lib/promptBuilder.ts
export function buildDietPrompt(data: FormData): string {
  const bmr = calculateBMR(data.sex!, data.weight, data.height, data.age)
  const tdee = calculateTDEE(bmr, data.activityLevel!)
  const targetCalories = calculateTargetCalories(tdee, data.goals, data.goalSpeed)
  const macros = calculateMacros(targetCalories, data.goals)

  return `
Eres un nutricionista deportivo certificado con 15 años de experiencia clínica.
Tu tarea es crear un plan de alimentación de 4 SEMANAS completo, detallado y personalizado.

═══════════════════════════════════════════════════════
PERFIL DEL USUARIO
═══════════════════════════════════════════════════════
Sexo biológico: ${data.sex === 'male' ? 'Hombre' : 'Mujer'}
Edad: ${data.age} años
Peso actual: ${data.weight} kg
Altura: ${data.height} cm
IMC: ${calculateIMC(data.weight, data.height)} (${getIMCCategory(data.weight, data.height)})

═══════════════════════════════════════════════════════
ACTIVIDAD FÍSICA
═══════════════════════════════════════════════════════
Nivel de actividad: ${ACTIVITY_LABELS[data.activityLevel!]}
Tipos de ejercicio: ${data.exerciseTypes.join(', ') || 'No especificado'}

═══════════════════════════════════════════════════════
OBJETIVOS
═══════════════════════════════════════════════════════
Objetivo principal: ${data.goals[0]}
Objetivos secundarios: ${data.goals.slice(1).join(', ') || 'Ninguno'}
Ritmo del objetivo: ${data.goalSpeed}

═══════════════════════════════════════════════════════
PARÁMETROS CALÓRICOS (CALCULADOS)
═══════════════════════════════════════════════════════
Metabolismo basal (BMR): ${Math.round(bmr)} kcal
Gasto energético total (TDEE): ${Math.round(tdee)} kcal
Objetivo calórico diario: ${Math.round(targetCalories)} kcal
Proteína objetivo: ${macros.protein}g/día (${macros.proteinPct}%)
Carbohidratos objetivo: ${macros.carbs}g/día (${macros.carbsPct}%)
Grasas objetivo: ${macros.fat}g/día (${macros.fatPct}%)

═══════════════════════════════════════════════════════
⚠️  RESTRICCIONES ABSOLUTAS — NUNCA INCLUIR ESTOS ALIMENTOS
═══════════════════════════════════════════════════════
Tipo de dieta: ${data.dietType}
Alergias (CRÍTICO): ${data.allergies.join(', ') || 'Ninguna'}
Restricciones religiosas: ${data.religiousRestrictions.join(', ') || 'Ninguna'}
Alimentos detestados: ${data.dislikedFoods.join(', ') || 'Ninguno'}

═══════════════════════════════════════════════════════
PREFERENCIAS CULINARIAS
═══════════════════════════════════════════════════════
Cocinas favoritas: ${data.favoriteCuisines.join(', ') || 'Variada'}
Nivel de picante: ${['Sin picante', 'Suave', 'Medio', 'Fuerte'][data.spiceLevel]}
Preferencias de sabor: ${data.flavorPreferences.join(', ') || 'Sin preferencia'}

═══════════════════════════════════════════════════════
HÁBITOS Y LOGÍSTICA
═══════════════════════════════════════════════════════
Comidas al día: ${data.mealsPerDay}
Presupuesto semanal: ${BUDGET_LABELS[data.budget]}
Cocina en casa: ${COOKING_LABELS[data.cookingHabits]}
Suplementos actuales: ${data.supplements.join(', ') || 'Ninguno'}

═══════════════════════════════════════════════════════
INSTRUCCIONES DE FORMATO — SEGUIR EXACTAMENTE
═══════════════════════════════════════════════════════

Genera el plan con EXACTAMENTE esta estructura markdown:

# Plan de Alimentación Personalizado — 4 Semanas

## Resumen del Plan
[Párrafo de 3-4 líneas resumiendo el enfoque nutricional, el objetivo y las características principales del plan]

## Objetivos Calóricos y Macros
- **Calorías diarias:** ${Math.round(targetCalories)} kcal
- **Proteína:** ${macros.protein}g (${macros.proteinPct}%)
- **Carbohidratos:** ${macros.carbs}g (${macros.carbsPct}%)
- **Grasas:** ${macros.fat}g (${macros.fatPct}%)

---

## SEMANA 1

### Lunes
**Desayuno** (~XXX kcal)
- [Alimento]: [cantidad en gramos o medida casera]
- [Alimento]: [cantidad]
...

**Almuerzo** (~XXX kcal)
...

[Repetir para cada comida del día según mealsPerDay: ${data.mealsPerDay}]

### Martes
...
[Repetir para los 7 días]

---

## SEMANA 2
[Ídem, con variedad diferente a semana 1]

---

## SEMANA 3
[Ídem, con variedad diferente a semanas 1 y 2]

---

## SEMANA 4
[Ídem, con variedad diferente a semanas anteriores. Puede repetir algunas recetas favoritas de semana 1]

---

## Lista de la Compra — Semana 1
### Proteínas
- [alimento] — [cantidad total para la semana]
### Verduras y Hortalizas
- ...
### Frutas
- ...
### Cereales y Legumbres
- ...
### Lácteos y Huevos
- ...
### Grasas saludables
- ...
### Otros
- ...

---

## Lista de la Compra — Semanas 2, 3 y 4
[Ídem para el resto de semanas, agrupando si hay coincidencias]

---

## Consejos Personalizados
1. **[Título del consejo]:** [Explicación de 2-3 líneas adaptada al perfil específico]
2. **[Título del consejo]:** [Explicación]
3. **[Título del consejo]:** [Explicación]
4. **[Título del consejo]:** [Explicación]
5. **[Título del consejo]:** [Explicación]

---

## Notas Importantes
- [Nota sobre suplementación si aplica]
- [Nota sobre hidratación]
- [Recordatorio de que este plan es orientativo y no sustituye consulta médica]

REGLAS DE CALIDAD (seguir obligatoriamente):
1. Cada semana debe tener recetas DIFERENTES. Máximo 2 repeticiones de platos entre semanas.
2. Incluir SIEMPRE las cantidades en gramos o medidas caseras precisas.
3. Las calorías de cada comida deben sumar aproximadamente ${Math.round(targetCalories)} kcal/día.
4. Respetar ABSOLUTAMENTE las alergias y restricciones indicadas arriba.
5. Adaptar las recetas a las cocinas favoritas indicadas.
6. Si el usuario no cocina habitualmente, priorizar recetas de menos de 20 minutos.
7. Incluir variedad de colores, texturas y métodos de cocción.
8. Los consejos deben ser específicos para este perfil, no genéricos.
Responde únicamente con el plan en markdown, sin texto introductorio ni cierre.
`
}
````

---

## 6. Estructura del Plan de 4 Semanas

### Por qué 4 semanas y no 1

Un plan de 1 semana es lo que ofrece cualquier app genérica. Un plan de 4 semanas:

- Demuestra la capacidad real de la IA para generar contenido extenso y variado.
- Aporta valor percibido muy superior al usuario.
- Justifica la descarga del PDF (28 días de menú es un documento que merece guardarse).
- Permite progresión nutricional entre semanas (ej: aumentar proteína gradualmente en objetivos de ganancia muscular).

### Estructura semanal del plan

Cada semana contiene:

```
Semana N
├── 7 días (Lunes → Domingo)
│   └── Cada día:
│       ├── N comidas (según configuración del usuario: 2–6)
│       │   ├── Nombre de la comida + calorías aproximadas
│       │   └── Lista de alimentos con cantidades
│       └── Total kcal del día
├── Lista de la compra de la semana (7 categorías)
└── [Semana 4: incluye notas de progreso]
```

### Rotación de recetas entre semanas

| Semana | Características |
|---|---|
| 1 | Recetas familiares, fáciles, para establecer el hábito |
| 2 | Introduce variedad, nuevas preparaciones de las cocinas favoritas |
| 3 | Mayor diversidad, recetas ligeramente más elaboradas |
| 4 | Mix de favoritas de semanas anteriores + nuevas propuestas |

---

## 7. Modal de Carga — Loading Experience

El modal de carga es el puente entre el formulario y los resultados. Su objetivo es **convertir la espera en anticipación**, no en frustración.

### Comportamiento general

- Aparece inmediatamente al hacer click en "Generar mi plan".
- Es un overlay modal que bloquea la interacción con el fondo.
- No tiene botón de cierre (el proceso no se puede cancelar una vez iniciado).
- Desaparece automáticamente cuando el contenido está listo para mostrarse.
- En caso de error, el modal muta a un estado de error con opción de reintento.

### Spinner

El spinner no es un círculo girando genérico. Está diseñado con la identidad de NutriAI:

- **Forma:** anillo circular con trazo de `#1D9E75` sobre fondo `#E1F5EE`
- **Animación:** rotación continua + ligero pulso de escala (scale 1.0 → 1.05 → 1.0)
- **Centro del anillo:** icono de hoja o plato (Lucide) que también pulsa suavemente
- **Tamaño:** 72px desktop / 60px mobile

```css
/* Spinner CSS */
.spinner-ring {
  width: 72px;
  height: 72px;
  border: 4px solid #E1F5EE;
  border-top-color: #1D9E75;
  border-radius: 50%;
  animation: spin 1s linear infinite, pulse 2s ease-in-out infinite;
}

@keyframes spin  { to { transform: rotate(360deg); } }
@keyframes pulse { 0%,100% { transform: rotate(0deg) scale(1); }
                   50%      { transform: rotate(180deg) scale(1.05); } }
```

### Textos dinámicos

Los textos rotan cada 3 segundos con una transición de fade. Hay 10 textos en la secuencia, diseñados para generar anticipación y reforzar el valor del producto:

```typescript
const LOADING_MESSAGES = [
  "Analizando tu perfil nutricional...",
  "Calculando tus necesidades calóricas exactas...",
  "Diseñando tu menú de la semana 1...",
  "Seleccionando recetas de tu cocina favorita...",
  "Ajustando macronutrientes a tus objetivos...",
  "Comprobando que no hay ningún alimento que no te guste...",
  "Creando tu menú de la semana 2...",
  "Equilibrando proteínas, carbohidratos y grasas...",
  "Preparando las semanas 3 y 4...",
  "Generando tu lista de la compra...",
  "Añadiendo consejos personalizados...",
  "¡Casi listo! Últimos retoques...",
]
```

### Barra de progreso pseudo-real

La barra de progreso avanza de forma pseudo-aleatoria sincronizada con los mensajes:

- 0–10%: instantáneo al abrir el modal
- 10–85%: avanza ~7% cada vez que cambia el mensaje (cada 3s)
- 85–99%: avanza muy lentamente, generando tensión positiva
- 99→100%: salta al 100% solo cuando llega la respuesta real de la IA
- La barra NUNCA llega al 100% antes de tener la respuesta

```typescript
// Progreso simulado
const PROGRESS_STEPS = [10, 18, 26, 35, 44, 53, 61, 70, 78, 85, 91, 96]
// Índice sincronizado con LOADING_MESSAGES
```

### Wireframe del modal de carga

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│                                                     │
│              ╭─────────────────────╮               │
│              │                     │               │
│              │     [  🌿  ]        │               │
│              │   ◌ spinner ◌       │               │
│              │                     │               │
│              │  Calculando tus     │               │
│              │  necesidades        │               │
│              │  calóricas...       │               │
│              │                     │               │
│              │  ████████░░░░░ 53%  │               │
│              │                     │               │
│              │  ✓ Perfil analizado │               │
│              │  ✓ Macros ajustados │               │
│              │  ⟳ Diseñando menús  │               │
│              │  ○ Lista de compra  │               │
│              │                     │               │
│              ╰─────────────────────╯               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Estados del modal

| Estado | Descripción | Duración |
|---|---|---|
| `generating` | Spinner activo, textos rotativos, barra avanzando | 8–20s |
| `success` | Barra llega al 100%, check animado, fade-out del modal | 0.8s |
| `error` | Spinner muta a icono de error, aparece mensaje + botón reintento | Indefinido hasta acción |
| `timeout` | Si la respuesta tarda > 30s, pasa a estado error automáticamente | — |

---

## 8. Página de Resultados — Layout y Contenido

### Estructura de la página

```
┌─────────────────────────────────────────────────────────────────┐
│  NAVBAR (sticky, mismo que landing)                       [CTA]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  HEADER DE RESULTADOS                                     │  │
│  │  "Tu plan de dieta personalizado está listo ✨"           │  │
│  │  Resumen: María · 28 años · Objetivo: Perder peso        │  │
│  │  [ Descargar PDF ↓ ]  [ Generar nueva dieta ]            │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────────────────────┐    │
│  │  PANEL LATERAL   │  │  CONTENIDO PRINCIPAL             │    │
│  │  (sticky)        │  │                                  │    │
│  │                  │  │  ## Resumen del Plan             │    │
│  │  Navegación:     │  │  [párrafo introductorio]         │    │
│  │  · Resumen       │  │                                  │    │
│  │  · Semana 1      │  │  ## Objetivos Calóricos          │    │
│  │  · Semana 2      │  │  [tabla de macros]               │    │
│  │  · Semana 3      │  │                                  │    │
│  │  · Semana 4      │  │  ## SEMANA 1                     │    │
│  │  · Lista compra  │  │  [días y comidas]                │    │
│  │  · Consejos      │  │                                  │    │
│  │                  │  │  ## SEMANA 2                     │    │
│  │  Macros resumen: │  │  ...                             │    │
│  │  🥩 140g prot.   │  │                                  │    │
│  │  🍞 180g carbs   │  │                                  │    │
│  │  🫒  60g grasa   │  │                                  │    │
│  └──────────────────┘  └──────────────────────────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Header de resultados

- Título: *"Tu plan de 4 semanas está listo ✨"*
- Subtítulo personalizado: *"Hemos diseñado [X] comidas al día adaptadas a tu objetivo de [objetivo], respetando tus [N] restricciones alimentarias."*
- Dos CTAs:
  - **Primario:** `↓ Descargar PDF` (verde sólido, icono de descarga)
  - **Secundario:** `Generar nueva dieta` (outlined, icono de refresh)

### Panel lateral sticky (desktop)

- Navegación por anclas a cada sección del plan.
- Resumen visual de macros diarios (3 pills con kcal, proteína, carbos, grasa).
- Se oculta en mobile (la navegación pasa a ser un selector horizontal scroll).

### Renderizado del markdown

El contenido generado por la IA llega en markdown. Se renderiza con `react-markdown` + `remark-gfm` aplicando los estilos de Tailwind Typography (`@tailwindcss/typography`) con overrides de la identidad de NutriAI:

- H2 (`## SEMANA 1`): verde oscuro, Fraunces, con línea decorativa inferior
- H3 (`### Lunes`): verde, Plus Jakarta Sans SemiBold
- H4 (`**Desayuno**`): gris oscuro, SemiBold
- Listas: bullets personalizados con punto verde
- Texto en negrita: verde oscuro

### Vista semanal con tabs

Encima del contenido del plan se añade una navegación por tabs para las 4 semanas:

```
[ Semana 1 ] [ Semana 2 ] [ Semana 3 ] [ Semana 4 ]
```

Al seleccionar una semana, el scroll salta a esa sección con `scrollIntoView({ behavior: 'smooth' })`.

---

## 9. Sistema de Generación de PDF

### Estrategia de generación: cliente vs servidor

La generación del PDF se hace **en el cliente** (browser) por las siguientes razones:

- No requiere servidor adicional ni coste de compute.
- El usuario ya tiene el contenido en memoria (no hay que hacer una segunda llamada a la IA).
- Las librerías modernas de PDF en cliente (`jsPDF` + `html2canvas` o `@react-pdf/renderer`) producen resultados de calidad profesional.
- Vercel Free Tier tiene límites de tiempo de ejecución en serverless functions (10s) que serían insuficientes para renderizar un PDF de 28 páginas.

### Librería recomendada: `@react-pdf/renderer`

| Librería | Pros | Contras |
|---|---|---|
| `@react-pdf/renderer` | **Diseño declarativo con React, tipografía perfecta, SVG support** | Bundle más pesado |
| `jsPDF` + `html2canvas` | Fácil de implementar | Calidad inferior, pixelado |
| `puppeteer` (servidor) | Máxima fidelidad HTML→PDF | Requiere servidor, lento, costoso |
| `pdfmake` | Ligero, maduro | API menos intuitiva |

**Elección: `@react-pdf/renderer`**

Permite definir el PDF con componentes React (`<Document>`, `<Page>`, `<Text>`, `<View>`) con estilos CSS-like. El resultado es un PDF vectorial limpio, con tipografía perfecta y sin pixelado. Ideal para el diseño elegante que requiere NutriAI.

### Flujo de generación del PDF

```
Click "Descargar PDF"
    │
    ▼
Botón entra en estado loading
("Preparando tu PDF...")
    │
    ▼
pdf/DietPDFDocument.tsx
(componente @react-pdf/renderer)
se instancia con el dietPlan actual
    │
    ▼
pdf() → genera el blob del PDF
(proceso síncrono en el browser, ~1-3s)
    │
    ▼
saveAs(blob, 'mi-dieta-nutriai.pdf')
(descarga automática)
    │
    ▼
Botón vuelve a estado normal
("↓ Descargar PDF")
```

---

## 10. Diseño del PDF — Identidad Visual

El PDF es una extensión del sistema de diseño de NutriAI. No es un documento de texto genérico: es un producto visual que el usuario querrá guardar y compartir.

### Principios de diseño del PDF

1. **Limpio y legible:** márgenes generosos, tipografía grande, mucho espacio en blanco.
2. **Branded:** paleta de NutriAI presente en headers, separadores y acentos.
3. **Navegable:** tabla de contenidos en la primera página, numeración de páginas.
4. **Imprimible:** diseño que funciona igual en pantalla que impreso en papel.
5. **Profesional:** aspecto de informe nutricional de consulta privada, no de app de dietas.

### Paleta de colores del PDF

| Elemento | Color |
|---|---|
| Header de portada (fondo) | `#0F6E56` (verde bosque) |
| Títulos de sección (H1 PDF) | `#0F6E56` |
| Subtítulos (H2 PDF) | `#1D9E75` |
| Líneas decorativas / separadores | `#5DCAA5` |
| Fondo de filas de tabla (alt) | `#E1F5EE` |
| Texto principal | `#1A1A1A` |
| Texto secundario | `#6B7280` |
| Fondo de portada secundario | `#F9F6F0` |
| Badges / pills de macro | `#E1F5EE` con texto `#0F6E56` |

### Tipografía del PDF

`@react-pdf/renderer` requiere fuentes registradas explícitamente. Se registran las siguientes:

```typescript
Font.register({
  family: 'PlusJakartaSans',
  fonts: [
    { src: '/fonts/PlusJakartaSans-Regular.ttf', fontWeight: 400 },
    { src: '/fonts/PlusJakartaSans-Medium.ttf',  fontWeight: 500 },
    { src: '/fonts/PlusJakartaSans-SemiBold.ttf',fontWeight: 600 },
    { src: '/fonts/PlusJakartaSans-Bold.ttf',    fontWeight: 700 },
  ],
})
// Nota: Fraunces no se incluye para mantener el bundle ligero.
// Los títulos del PDF usan PlusJakartaSans Bold como alternativa.
```

---

## 11. Estructura Interna del PDF

### Página 1 — Portada

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  [Fondo verde bosque #0F6E56]                       │
│                                                     │
│  NutriAI                         [logo/wordmark]    │
│  ─────────────────────────────────────────────      │
│                                                     │
│  Tu Plan de Alimentación                            │
│  Personalizado                                      │
│                                                     │
│  4 Semanas · 28 días de menú                        │
│                                                     │
│  [Franja verde menta — separador]                   │
│                                                     │
│  [Fondo crema #F9F6F0]                              │
│                                                     │
│  Perfil:    María G. / Mujer / 28 años              │
│  Objetivo:  Perder peso — ritmo moderado            │
│  Calorías:  1.750 kcal/día                          │
│  Generado:  12 de enero de 2025                     │
│                                                     │
│  ─────────────────────────────────────────────      │
│  Este plan ha sido generado con IA nutricional      │
│  y es orientativo. Consulta a un profesional        │
│  para seguimiento médico personalizado.             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Página 2 — Resumen nutricional

```
┌─────────────────────────────────────────────────────┐
│  RESUMEN DE TU PLAN NUTRICIONAL                     │
│  ──────────────────────────────                     │
│                                                     │
│  [Párrafo introductorio generado por la IA]         │
│                                                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │
│  │ 1.750    │ │ 140g     │ │ 180g     │ │ 60g    │ │
│  │ kcal/día │ │ Proteína │ │ Carbos   │ │ Grasa  │ │
│  └──────────┘ └──────────┘ └──────────┘ └────────┘ │
│                                                     │
│  TUS DATOS                     TU OBJETIVO          │
│  ─────────────────────────     ────────────         │
│  Peso: 65 kg                   Perder peso          │
│  Altura: 167 cm                Ritmo moderado       │
│  IMC: 23.3                     −0.5 kg/semana       │
│  Actividad: Moderada           Calorías: 1.750/día  │
│                                                     │
│  RESTRICCIONES APLICADAS                            │
│  ─────────────────────────                          │
│  ✓ Sin lactosa   ✓ Sin gluten   ✓ Cocina italiana  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Páginas 3–N — Plan semanal (Semanas 1–4)

Cada semana ocupa entre 4 y 7 páginas dependiendo del número de comidas:

```
┌─────────────────────────────────────────────────────┐
│  [Header de sección verde]  SEMANA 1  ──────────── │
├─────────────────────────────────────────────────────┤
│                                                     │
│  LUNES                              ~1.748 kcal    │
│  ─────────────────────────────────────────────      │
│                                                     │
│  Desayuno (~420 kcal)                               │
│  • Avena con leche de almendras: 80g               │
│  • Plátano: 1 unidad (120g)                        │
│  • Nueces: 15g                                     │
│                                                     │
│  Almuerzo (~580 kcal)                               │
│  • Pechuga de pollo a la plancha: 180g             │
│  • Arroz integral: 70g (en seco)                   │
│  • Brócoli al vapor: 200g                          │
│  • Aceite de oliva: 10ml                           │
│                                                     │
│  Cena (~520 kcal)                                   │
│  • Salmón al horno: 150g                           │
│  • Patata asada: 150g                              │
│  • Ensalada variada: 100g                          │
│                                                     │
│  [Separador verde menta]                            │
│                                                     │
│  MARTES                             ~1.752 kcal    │
│  ...                                               │
└─────────────────────────────────────────────────────┘
```

### Páginas finales — Listas de la compra y Consejos

```
┌─────────────────────────────────────────────────────┐
│  [Header verde]  LISTA DE LA COMPRA — SEMANA 1      │
├─────────────────────────────────────────────────────┤
│                                                     │
│  PROTEÍNAS              VERDURAS Y HORTALIZAS       │
│  ─────────────          ─────────────────────       │
│  • Pechuga pollo 800g   • Brócoli 400g              │
│  • Salmón 450g          • Espinacas 300g            │
│  • Huevos 1 docena      • Tomates 500g              │
│  • Atún lata x4         • Pimiento 300g             │
│                                                     │
│  CEREALES               FRUTAS                      │
│  ─────────              ──────                      │
│  • Avena 500g           • Plátanos x6               │
│  • Arroz integral 500g  • Manzanas x4               │
│  • Pan integral 400g    • Frutos rojos 300g         │
│                                                     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  [Header verde]  CONSEJOS PERSONALIZADOS            │
├─────────────────────────────────────────────────────┤
│                                                     │
│  1. TIMING DE PROTEÍNAS                             │
│     [Texto de consejo personalizado 2-3 líneas]     │
│                                                     │
│  2. HIDRATACIÓN                                     │
│     [Texto de consejo]                              │
│  ...                                                │
└─────────────────────────────────────────────────────┘
```

### Página final — Footer de documento

```
┌─────────────────────────────────────────────────────┐
│  [Franja verde menta]                               │
│                                                     │
│  NutriAI — nutriai.app                              │
│  Plan generado el 12 de enero de 2025               │
│                                                     │
│  Este plan nutricional ha sido generado por         │
│  inteligencia artificial y tiene carácter           │
│  orientativo. No sustituye el asesoramiento         │
│  de un nutricionista o médico certificado.          │
│                                                     │
│                                              Pág. N │
└─────────────────────────────────────────────────────┘
```

---

## 12. Wireframes de Referencia

### Modal de carga — Mobile

```
┌─────────────────────┐
│                     │
│    ╭───────────╮    │
│    │           │    │
│    │   🌿 ◌   │    │
│    │  spinner  │    │
│    │           │    │
│    │ Diseñando │    │
│    │ tu menú   │    │
│    │           │    │
│    │ ████░ 65% │    │
│    │           │    │
│    │ ✓ Perfil  │    │
│    │ ⟳ Menús   │    │
│    │ ○ Compra  │    │
│    ╰───────────╯    │
│                     │
└─────────────────────┘
```

### Página de resultados — Mobile

```
┌─────────────────────┐
│  NAVBAR      [≡]    │
├─────────────────────┤
│ ✨ Tu plan está     │
│ listo               │
│                     │
│ [ ↓ Descargar PDF ] │
│                     │
│ [ S1 ][ S2 ][ S3 ][ S4 ] ← tabs semanas
├─────────────────────┤
│                     │
│ ## SEMANA 1         │
│                     │
│ ### Lunes           │
│ **Desayuno**        │
│ • Avena 80g         │
│ • Plátano 120g      │
│ ...                 │
│                     │
└─────────────────────┘
[ ↓ Descargar PDF ]   ← sticky CTA
```

---

## 13. Identidad Visual y Consistencia

La página de resultados mantiene el mismo sistema de diseño de la landing y el formulario:

- Navbar y footer idénticos.
- Misma paleta de colores, tipografía e iconografía.
- Border-radius 16px en cards.
- Sistema de sombras idéntico.

### Diferencias intencionales

| Elemento | Landing/Formulario | Resultados |
|---|---|---|
| Tono visual | Aspiracional / proceso | Celebración / logro |
| Animaciones | Reveal on scroll | Confetti sutil al cargar, fade-in del contenido |
| Densidad | Media | Alta (mucho contenido estructurado) |
| Fondo | Crema | Blanco puro (más legibilidad para texto largo) |

---

## 14. Paleta de Colores y Tipografía

Idéntica a la landing y el formulario. Sin tokens adicionales específicos de resultados.

Los tokens del formulario (`--color-chip-*`, `--color-input-*`) se reutilizan para los badges de macros y las pills del panel lateral.

---

## 15. Grid System y Spacing

| Breakpoint | Layout de resultados |
|---|---|
| Mobile (<768px) | 1 columna. Panel lateral oculto. Tabs de semanas en scroll horizontal. |
| Tablet (768–1024px) | 1 columna centrada (max-width 720px). Sin panel lateral. |
| Desktop (>1024px) | 2 columnas: panel lateral sticky 260px + contenido principal flex-1. |

**Spacing específico de resultados:**

| Elemento | Valor |
|---|---|
| Gap entre días del menú | 32px |
| Gap entre comidas dentro de un día | 16px |
| Separador visual entre semanas | `<hr>` verde menta, margin 48px |
| Padding del panel lateral sticky | 24px |
| Top del panel lateral sticky | 88px (altura navbar + 16px) |

---

## 16. Componentes UI Clave

| Componente | Descripción |
|---|---|
| `<LoadingModal>` | Modal overlay con spinner, textos dinámicos y barra de progreso |
| `<Spinner>` | Anillo animado con icono central pulsante |
| `<LoadingMessage>` | Texto rotativo con transición fade |
| `<LoadingProgressBar>` | Barra con avance pseudo-real sincronizado |
| `<LoadingStepList>` | Lista de pasos con iconos ✓ / ⟳ / ○ |
| `<ResultsHeader>` | Título, subtítulo personalizado y dos CTAs |
| `<MacrosSummary>` | Pills con kcal, proteína, carbos, grasa |
| `<WeekTabs>` | Navegación por tabs entre semanas 1–4 |
| `<DietPlanContent>` | Renderizado del markdown con estilos NutriAI |
| `<SidebarNav>` | Panel lateral sticky con anclas de navegación |
| `<DownloadButton>` | Botón de descarga con estados loading/success |
| `<DietPDFDocument>` | Componente `@react-pdf/renderer` con el PDF completo |
| `<PDFCover>` | Portada del PDF |
| `<PDFSummaryPage>` | Página de resumen nutricional del PDF |
| `<PDFWeekSection>` | Sección semanal del PDF (reutilizable × 4) |
| `<PDFShoppingList>` | Lista de la compra en el PDF |
| `<PDFAdvicePage>` | Página de consejos personalizados en el PDF |
| `<ErrorModal>` | Estado de error con mensaje y botón de reintento |

---

## 17. Estados UI y Microinteracciones

### Botón "Descargar PDF"

| Estado | Comportamiento |
|---|---|
| Default | Verde sólido, icono de descarga, `↓ Descargar PDF` |
| Hover | `scale(1.02)` + darken 5% |
| Loading | Spinner pequeño + `"Preparando tu PDF..."` |
| Success | Check animado + `"¡Descargado!"` durante 2s |
| Error | Icono de error + `"Error. Reintentar"` |

### Modal de carga

| Transición | Animación |
|---|---|
| Apertura del modal | Fade-in del overlay + scale del card (0.95→1, 250ms) |
| Cambio de texto | Fade-out (150ms) + fade-in (150ms) del nuevo texto |
| Avance de barra | Width transition 400ms ease-out |
| Cierre al éxito | Barra llega a 100% → check verde → fade-out del modal (600ms) |
| Aparición de resultados | Fade-in de la página + confetti sutil (opcional) |

### Contenido generado (streaming)

- El texto aparece de forma progresiva (streaming de la IA).
- El cursor parpadeante (`▋`) indica que la generación está en curso.
- Una vez completo, el cursor desaparece con un fade.

---

## 18. Empty States, Errores y Edge Cases

### Error de la API de IA

**Causa:** fallo de red, límite de rate de Gemini alcanzado, timeout.

**Comportamiento:**
```
┌──────────────────────────────────────┐
│                                      │
│      ⚠️  Algo ha ido mal             │
│                                      │
│  No hemos podido generar tu plan     │
│  en este momento. Tus datos están    │
│  guardados.                          │
│                                      │
│  [ Reintentar ]  [ Volver al form ]  │
│                                      │
└──────────────────────────────────────┘
```

- Los datos del formulario se conservan en estado para no perder el trabajo del usuario.
- El reintento hace exactamente la misma llamada sin que el usuario tenga que rellenar nada.

### Plan incompleto (truncado por límite de tokens)

Si la respuesta se trunca antes de completarse (poco probable con Gemini 2.0 Flash, pero posible):

- Se muestra el contenido disponible.
- Aparece un banner amarillo: *"El plan se ha generado parcialmente. Puedes descargarlo o intentar regenerar."*
- El PDF se genera con el contenido disponible.

### PDF demasiado grande

Si el plan de 4 semanas genera un PDF > 10MB (improbable con texto puro):

- Se genera el PDF por semanas separadas (4 archivos).
- O se ofrece versión simplificada sin portada ilustrada.

### Sin conexión a internet

- Si el usuario pierde conexión durante la generación: estado de error con mensaje específico.
- Si pierde conexión al descargar el PDF: el PDF se genera en cliente con los datos ya en memoria, sin necesidad de internet.

---

## 19. Motion Design

| Efecto | Aplicación | Config |
|---|---|---|
| Modal open | Apertura del modal de carga | `scale: 0.95→1, opacity: 0→1`, 250ms ease-out |
| Text rotation | Cambio de mensaje en el modal | `opacity: 1→0→1`, 150ms cada dirección |
| Progress fill | Barra de progreso avanzando | `width` transition 400ms ease-out por step |
| Spinner rotation | Anillo del spinner | `rotate` 1s linear infinite |
| Spinner pulse | Escala del spinner | `scale: 1→1.05→1` 2s ease-in-out infinite |
| Modal close | Cierre al completar | `opacity: 1→0`, 400ms ease-in |
| Page reveal | Aparición de la página de resultados | Fade-in 500ms + `y: 20→0` |
| Confetti | Celebración al cargar resultados | Partículas verdes, 2s, solo una vez |
| Streaming cursor | Cursor parpadeante mientras genera | `opacity: 1→0` 0.8s step-end infinite |
| Scroll to section | Click en tab de semana | `scrollIntoView({ behavior: 'smooth' })` |
| PDF button success | Tras descarga exitosa | Check icon con `scale: 0→1` spring |
| `prefers-reduced-motion` | Global | Desactiva confetti, spinners → fade simple |

---

## 20. Accesibilidad Avanzada

| Categoría | Requisito | Implementación |
|---|---|---|
| Modal | Focus trap en modal de carga | Focus queda dentro del modal mientras está abierto |
| Modal | `role="dialog"`, `aria-modal="true"` | Aplicado al modal de carga |
| Modal | `aria-label="Generando tu plan de dieta"` | Descripción del propósito del modal |
| Live | Mensajes del modal anunciados | `aria-live="polite"` en el contenedor de texto rotativo |
| Progress | Barra de progreso accesible | `role="progressbar"`, `aria-valuenow`, `aria-valuemax` |
| Contenido | Estructura semántica del plan | Headings correctamente anidados H2→H3→H4 |
| PDF | Botón de descarga descriptivo | `aria-label="Descargar plan de dieta en PDF"` |
| Teclado | Descarga con teclado | Botón de descarga activable con Enter y Space |
| Tabs | Navegación por semanas | `role="tablist"`, `role="tab"`, `aria-selected` |
| Contraste | Todo el contenido | ≥ 4.5:1 sobre blanco |
| Motion | Confetti y animaciones | Se desactivan con `prefers-reduced-motion: reduce` |

---

## 21. Visión Técnica

### Filosofía de desarrollo de esta página

Esta página integra tres sistemas complejos que deben funcionar de forma coordinada: la llamada a la IA con streaming, el estado de carga con UX cuidado, y la generación del PDF en cliente. La filosofía de implementación se asienta sobre:

**1. Separación de responsabilidades clara:**

```
useDietGenerator     → gestiona la llamada a la IA, el streaming y el estado
useLoadingExperience → gestiona el modal de carga (textos, progreso, steps)
usePDFGenerator      → gestiona la generación y descarga del PDF
```

Ningún componente mezcla lógica de la IA con lógica del PDF ni con lógica del modal.

**2. Streaming first:**
El contenido se muestra progresivamente mientras la IA genera. No se espera a que el 100% del plan esté listo. Esto mejora radicalmente la UX y el tiempo de carga percibido.

**3. El PDF se genera a partir del estado, no de la respuesta bruta:**
El markdown generado por la IA se parsea y almacena en estado estructurado. El PDF se genera a partir de ese estado estructurado, no concatenando texto. Esto permite control total sobre el diseño del PDF.

### Modelo de estado de la página

```typescript
interface ResultsPageState {
  status:    'idle' | 'generating' | 'success' | 'error'
  rawMarkdown:  string          // texto completo generado por la IA
  isStreaming:  boolean         // true mientras llegan chunks
  error:        string | null
  pdfStatus:    'idle' | 'generating' | 'success' | 'error'
}
```

---

## 22. Arquitectura del Proyecto

### Nuevas rutas y carpetas

```
nutriai-landing/
│
├── app/
│   ├── resultados/
│   │   └── page.tsx                    # Página de resultados
│   └── api/
│       └── generate-diet/
│           └── route.ts                # API Route → Gemini
│
├── components/
│   ├── loading/
│   │   ├── LoadingModal.tsx            # Modal overlay completo
│   │   ├── Spinner.tsx                 # Anillo animado con icono
│   │   ├── LoadingMessage.tsx          # Texto rotativo con fade
│   │   ├── LoadingProgressBar.tsx      # Barra pseudo-real
│   │   └── LoadingStepList.tsx         # Lista de pasos ✓/⟳/○
│   │
│   ├── results/
│   │   ├── ResultsHeader.tsx           # Título + CTAs
│   │   ├── MacrosSummary.tsx           # Pills de macros
│   │   ├── WeekTabs.tsx                # Tabs de semanas
│   │   ├── DietPlanContent.tsx         # Markdown renderizado
│   │   ├── SidebarNav.tsx              # Panel lateral sticky
│   │   ├── DownloadButton.tsx          # Botón con estados
│   │   └── ErrorModal.tsx              # Modal de error
│   │
│   └── pdf/
│       ├── DietPDFDocument.tsx         # Root del PDF
│       ├── PDFCover.tsx                # Portada
│       ├── PDFSummaryPage.tsx          # Resumen nutricional
│       ├── PDFWeekSection.tsx          # Semana (×4)
│       ├── PDFShoppingList.tsx         # Lista de la compra
│       ├── PDFAdvicePage.tsx           # Consejos
│       └── PDFStyles.ts               # StyleSheet compartido
│
├── hooks/
│   ├── useDietGenerator.ts             # Streaming desde la IA
│   ├── useLoadingExperience.ts         # Lógica del modal de carga
│   └── usePDFGenerator.ts             # Generación y descarga del PDF
│
└── lib/
    ├── promptBuilder.ts                # FormData → prompt
    └── markdownParser.ts              # Markdown → estructura de datos
```

---

## 23. Stack Técnico — Detalle de Implementación

### Dependencias nuevas

```bash
npm install @google/generative-ai      # SDK oficial de Gemini
npm install @react-pdf/renderer        # Generación de PDF en React
npm install react-markdown             # Renderizado de markdown
npm install remark-gfm                 # GitHub Flavored Markdown
npm install @tailwindcss/typography    # Estilos Tailwind para texto
npm install file-saver                 # Descarga de archivos en browser
```

### Hook: `useDietGenerator`

```typescript
// hooks/useDietGenerator.ts
export function useDietGenerator() {
  const [status, setStatus]           = useState<Status>('idle')
  const [rawMarkdown, setRawMarkdown] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError]             = useState<string | null>(null)

  const generate = useCallback(async (formData: FormData) => {
    setStatus('generating')
    setIsStreaming(true)
    setRawMarkdown('')
    setError(null)

    try {
      const response = await fetch('/api/generate-diet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData }),
      })

      if (!response.ok) throw new Error('API error')
      if (!response.body) throw new Error('No stream')

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        setRawMarkdown(prev => prev + chunk)
      }

      setStatus('success')
    } catch (err) {
      setError('No hemos podido generar tu plan. Tus datos están guardados.')
      setStatus('error')
    } finally {
      setIsStreaming(false)
    }
  }, [])

  return { status, rawMarkdown, isStreaming, error, generate }
}
```

### Hook: `useLoadingExperience`

```typescript
// hooks/useLoadingExperience.ts
const MESSAGES = [
  "Analizando tu perfil nutricional...",
  "Calculando tus necesidades calóricas exactas...",
  "Diseñando tu menú de la semana 1...",
  "Seleccionando recetas de tu cocina favorita...",
  "Ajustando macronutrientes a tus objetivos...",
  "Verificando restricciones alimentarias...",
  "Creando tu menú de la semana 2...",
  "Equilibrando proteínas, carbohidratos y grasas...",
  "Preparando las semanas 3 y 4...",
  "Generando tu lista de la compra...",
  "Añadiendo consejos personalizados...",
  "¡Casi listo! Últimos retoques...",
]
const PROGRESS_STEPS = [8, 16, 25, 34, 43, 52, 61, 70, 79, 86, 93, 97]

export function useLoadingExperience(isGenerating: boolean) {
  const [msgIndex, setMsgIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isGenerating) return
    const interval = setInterval(() => {
      setMsgIndex(i => {
        const next = Math.min(i + 1, MESSAGES.length - 1)
        setProgress(PROGRESS_STEPS[next])
        return next
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [isGenerating])

  return {
    message:  MESSAGES[msgIndex],
    progress,
    steps: [
      { label: 'Perfil analizado',    done: msgIndex >= 1  },
      { label: 'Macros calculados',   done: msgIndex >= 4  },
      { label: 'Menús diseñados',     done: msgIndex >= 8  },
      { label: 'Lista de la compra',  done: msgIndex >= 9  },
      { label: 'Consejos añadidos',   done: msgIndex >= 10 },
    ],
  }
}
```

### Componente PDF: `DietPDFDocument`

```typescript
// components/pdf/DietPDFDocument.tsx
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { PDFCover }        from './PDFCover'
import { PDFSummaryPage }  from './PDFSummaryPage'
import { PDFWeekSection }  from './PDFWeekSection'
import { PDFShoppingList } from './PDFShoppingList'
import { PDFAdvicePage }   from './PDFAdvicePage'
import { ParsedDietPlan }  from '@/types/diet'

interface Props {
  plan:      ParsedDietPlan
  formData:  FormData
  generatedAt: string
}

export function DietPDFDocument({ plan, formData, generatedAt }: Props) {
  return (
    <Document
      title="Mi Plan de Dieta — NutriAI"
      author="NutriAI"
      subject="Plan nutricional personalizado de 4 semanas"
    >
      <PDFCover      formData={formData} generatedAt={generatedAt} />
      <PDFSummaryPage plan={plan} formData={formData} />
      {plan.weeks.map((week, i) => (
        <PDFWeekSection key={i} week={week} weekNumber={i + 1} />
      ))}
      <PDFShoppingList shoppingLists={plan.shoppingLists} />
      <PDFAdvicePage   advice={plan.advice} />
    </Document>
  )
}
```

### Hook: `usePDFGenerator`

```typescript
// hooks/usePDFGenerator.ts
import { pdf } from '@react-pdf/renderer'
import { saveAs } from 'file-saver'
import { DietPDFDocument } from '@/components/pdf/DietPDFDocument'

export function usePDFGenerator() {
  const [pdfStatus, setPdfStatus] = useState<'idle'|'generating'|'success'|'error'>('idle')

  const downloadPDF = useCallback(async (plan: ParsedDietPlan, formData: FormData) => {
    setPdfStatus('generating')
    try {
      const doc = <DietPDFDocument
        plan={plan}
        formData={formData}
        generatedAt={new Date().toLocaleDateString('es-ES', {
          day: 'numeric', month: 'long', year: 'numeric'
        })}
      />
      const blob = await pdf(doc).toBlob()
      saveAs(blob, `mi-dieta-nutriai-${Date.now()}.pdf`)
      setPdfStatus('success')
      setTimeout(() => setPdfStatus('idle'), 2000)
    } catch {
      setPdfStatus('error')
    }
  }, [])

  return { pdfStatus, downloadPDF }
}
```

---

## 24. Roadmap de Desarrollo

### Fase 8 — API Route e integración con Gemini (Días 21–22)

Objetivo: llamada a la IA funcionando con streaming real.

| Tarea | Descripción | Prioridad |
|---|---|---|
| `.env.local` | Configurar `GEMINI_API_KEY` | P0 |
| `npm install @google/generative-ai` | SDK de Gemini | P0 |
| `app/api/generate-diet/route.ts` | API Route con streaming | P0 |
| `promptBuilder.ts` | Prompt completo con todos los campos | P0 |
| `calorieCalculator.ts` | BMR, TDEE, target calories, macros | P0 |
| Test de la API | Verificar respuesta en Postman / Thunder Client | P0 |
| Rate limiting básico | Evitar abuso de la API key | P1 |

**Entregable:** `POST /api/generate-diet` devuelve el plan en streaming correctamente.

---

### Fase 9 — Modal de carga y página de resultados (Días 23–25)

Objetivo: experiencia de carga pulida y resultados renderizados en pantalla.

| Tarea | Descripción | Prioridad |
|---|---|---|
| `useDietGenerator` | Hook de streaming con estados | P0 |
| `useLoadingExperience` | Textos, progreso y steps del modal | P0 |
| `LoadingModal.tsx` | Modal completo con spinner y barra | P0 |
| `Spinner.tsx` | Anillo animado con icono central | P0 |
| `LoadingMessage.tsx` | Texto con transición fade | P0 |
| `LoadingProgressBar.tsx` | Barra pseudo-real | P0 |
| `LoadingStepList.tsx` | Lista ✓/⟳/○ | P1 |
| Ruta `/resultados` | Página con layout | P0 |
| `ResultsHeader.tsx` | Título y CTAs | P0 |
| `DietPlanContent.tsx` | Markdown renderizado con estilos | P0 |
| `react-markdown` + typography | Setup y estilos personalizados | P0 |
| `WeekTabs.tsx` | Navegación entre semanas | P1 |
| `MacrosSummary.tsx` | Pills de macros | P1 |
| `SidebarNav.tsx` | Panel lateral sticky desktop | P2 |
| `ErrorModal.tsx` | Estado de error con reintento | P0 |

**Entregable:** flujo completo formulario → carga → resultados renderizados en pantalla.

---

### Fase 10 — Generación y descarga del PDF (Días 26–28)

Objetivo: PDF con diseño NutriAI descargable desde el browser.

| Tarea | Descripción | Prioridad |
|---|---|---|
| `npm install @react-pdf/renderer file-saver` | Dependencias | P0 |
| Fuentes para PDF | Descargar y registrar Plus Jakarta Sans TTF | P0 |
| `PDFStyles.ts` | StyleSheet compartido con tokens de NutriAI | P0 |
| `PDFCover.tsx` | Portada con datos del usuario | P0 |
| `PDFSummaryPage.tsx` | Página de resumen nutricional | P0 |
| `PDFWeekSection.tsx` | Sección semanal reutilizable | P0 |
| `PDFShoppingList.tsx` | Lista de la compra | P1 |
| `PDFAdvicePage.tsx` | Página de consejos | P1 |
| `DietPDFDocument.tsx` | Composición del documento completo | P0 |
| `usePDFGenerator` | Hook de generación y descarga | P0 |
| `DownloadButton.tsx` | Botón con todos sus estados | P0 |
| `markdownParser.ts` | Markdown raw → estructura tipada para PDF | P0 |
| Sticky mobile CTA descarga | Botón fijo en bottom en mobile | P1 |
| Test de PDF | Verificar en Chrome, Safari, Firefox | P0 |
| Optimización bundle PDF | Lazy load de `@react-pdf/renderer` | P1 |

**Entregable:** descarga de PDF funcionando con diseño NutriAI completo.

---

### Resumen visual del roadmap completo (todas las fases)

```
Días 1-2    Días 3-4    Días 5-7    Días 8-10
──────────  ──────────  ──────────  ──────────
Fase 1      Fase 2      Fase 3      Fase 4
Landing     Hero+ATF    Contenido   QA+Mobile
fundacion              landing     landing

Días 11-12  Días 13-16  Días 17-20
──────────  ──────────  ──────────
Fase 5      Fase 6      Fase 7
Form base   Form steps  Resumen+IA
                        prompt

Días 21-22  Días 23-25  Días 26-28
──────────  ──────────  ──────────
Fase 8      Fase 9      Fase 10
Gemini API  Loading     PDF
+ streaming + Results   Generator
```

**Total: 28 días de desarrollo (4 semanas), equivalente a un sprint de bootcamp intensivo.**

---

## 25. Acceptance Criteria

### AC-R01 — Integración con IA (Gemini)

| ID | Criterio | Verificación |
|---|---|---|
| AC-R01-01 | La API key de Gemini nunca se expone al cliente (solo en variables de entorno servidor) | Code review + DevTools Network |
| AC-R01-02 | La llamada a `/api/generate-diet` devuelve un stream de texto | DevTools Network → Response streaming |
| AC-R01-03 | El plan generado cubre exactamente 4 semanas (28 días) | Manual + test |
| AC-R01-04 | El plan generado respeta el número de comidas configurado por el usuario | Manual |
| AC-R01-05 | Ningún alimento marcado como alergia aparece en el plan | Manual + test con alergias marcadas |
| AC-R01-06 | Las calorías diarias del plan están dentro del ±10% del objetivo calculado | Manual (revisar varios días) |
| AC-R01-07 | El plan incluye cantidades en gramos o medidas caseras en todos los alimentos | Manual |
| AC-R01-08 | El plan incluye lista de la compra semanal con categorías | Manual |
| AC-R01-09 | El plan incluye al menos 5 consejos personalizados | Manual |
| AC-R01-10 | Si la API falla, se devuelve un error con código HTTP apropiado (500/503) | Test con API key inválida |

---

### AC-R02 — Modal de Carga

| ID | Criterio | Verificación |
|---|---|---|
| AC-R02-01 | El modal aparece inmediatamente al click en "Generar mi plan" | Manual |
| AC-R02-02 | El spinner rota de forma continua y suave | Visual |
| AC-R02-03 | Los textos rotan cada ~3 segundos con transición fade | Manual + cronómetro |
| AC-R02-04 | La barra de progreso nunca llega al 100% antes de recibir la respuesta | Manual |
| AC-R02-05 | La barra salta al 100% solo cuando el streaming completa | Manual |
| AC-R02-06 | El modal se cierra con animación suave al completarse la generación | Visual |
| AC-R02-07 | Si la generación dura > 30s, el modal pasa a estado de error | Manual (mock timeout) |
| AC-R02-08 | El foco queda atrapado en el modal mientras está abierto | Manual teclado |
| AC-R02-09 | El modal tiene `role="dialog"` y `aria-modal="true"` | axe DevTools |
| AC-R02-10 | Las animaciones del modal se reducen con `prefers-reduced-motion` | DevTools emulation |

---

### AC-R03 — Página de Resultados

| ID | Criterio | Verificación |
|---|---|---|
| AC-R03-01 | El contenido del plan se muestra progresivamente durante el streaming | Manual |
| AC-R03-02 | El cursor de streaming (▋) es visible mientras genera y desaparece al terminar | Visual |
| AC-R03-03 | Las 4 semanas son navegables mediante los tabs | Manual |
| AC-R03-04 | El click en un tab hace scroll suave a esa sección | Manual |
| AC-R03-05 | El panel lateral sticky es visible y funcional en desktop (>1024px) | DevTools |
| AC-R03-06 | El panel lateral no se muestra en mobile (<1024px) | DevTools |
| AC-R03-07 | Los headings del plan tienen jerarquía correcta (H2→H3→H4) | axe DevTools |
| AC-R03-08 | El botón "Generar nueva dieta" limpia el estado y vuelve al formulario | Manual |

---

### AC-R04 — Generación del PDF

| ID | Criterio | Verificación |
|---|---|---|
| AC-R04-01 | El PDF se genera completamente en el cliente (sin llamada adicional al servidor) | DevTools Network |
| AC-R04-02 | La descarga comienza automáticamente al completarse la generación | Manual |
| AC-R04-03 | El nombre del archivo es `mi-dieta-nutriai-[timestamp].pdf` | Manual |
| AC-R04-04 | El PDF contiene portada, resumen, 4 semanas, listas de la compra y consejos | Manual (abrir PDF) |
| AC-R04-05 | La portada muestra el nombre/perfil del usuario y la fecha de generación | Manual |
| AC-R04-06 | La tipografía del PDF es legible y consistente en todas las páginas | Visual (PDF abierto) |
| AC-R04-07 | Los colores del PDF siguen la paleta de NutriAI | Visual |
| AC-R04-08 | El PDF incluye numeración de páginas en el footer | Manual |
| AC-R04-09 | Ningún alérgeno del usuario aparece en el PDF | Manual |
| AC-R04-10 | El PDF se genera correctamente en Chrome, Firefox y Safari | Cross-browser |
| AC-R04-11 | El botón "Descargar PDF" muestra estado loading durante la generación | Manual |
| AC-R04-12 | Si la generación del PDF falla, se muestra mensaje de error y opción de reintentar | Manual (mock error) |

---

### AC-R05 — Performance

| ID | Criterio | Verificación |
|---|---|---|
| AC-R05-01 | Lighthouse Performance ≥ 90 en `/resultados` | Lighthouse CI |
| AC-R05-02 | `@react-pdf/renderer` se carga con lazy import (no penaliza el bundle inicial) | `next/bundle-analyzer` |
| AC-R05-03 | El tiempo desde click "Generar" hasta primer texto visible es < 5s | Manual + Network tab |
| AC-R05-04 | La generación del PDF en cliente tarda < 5s para un plan de 4 semanas | Manual + `console.time` |

---

### AC-R06 — Accesibilidad

| ID | Criterio | Verificación |
|---|---|---|
| AC-R06-01 | El modal de carga tiene focus trap correcto | Manual teclado |
| AC-R06-02 | Los tabs de semanas tienen `role="tablist"`, `role="tab"`, `aria-selected` | axe DevTools |
| AC-R06-03 | El botón de descarga tiene `aria-label` descriptivo | axe DevTools |
| AC-R06-04 | Los mensajes del modal se anuncian con `aria-live="polite"` | Screen reader |
| AC-R06-05 | No hay errores en axe DevTools en ninguna parte de la página | axe DevTools |
| AC-R06-06 | Las animaciones de carga se desactivan con `prefers-reduced-motion` | DevTools emulation |

---

### Definición de Done (DoD) de la página de resultados

Una funcionalidad se considera **DONE** cuando:

- [ ] El código está en `main` y el deploy de Vercel está verde.
- [ ] Todos los AC específicos están verificados y documentados.
- [ ] No hay errores de TypeScript (`tsc --noEmit` limpio).
- [ ] No hay errores de axe DevTools en la sección afectada.
- [ ] Funciona correctamente en 375px, 768px, 1280px y 1440px.
- [ ] Si tiene animaciones, funciona con `prefers-reduced-motion: reduce`.
- [ ] El PDF generado se abre correctamente en Chrome, Firefox y Safari.
- [ ] La API key de Gemini no está expuesta en ningún bundle de cliente.
- [ ] Los datos de alergias del usuario nunca aparecen en el plan generado ni en el PDF.

---

*Documento v1.0 — Generado para uso académico en bootcamp de desarrollo web.*
