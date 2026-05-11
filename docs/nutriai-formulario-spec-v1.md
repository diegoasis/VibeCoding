# NutriAI — Documento Técnico · Página de Formulario v1.0

**Proyecto:** NutriAI — Generador de dietas personalizadas con IA  
**Tipo:** Página de formulario multi-paso (onboarding flow)  
**Ruta:** `/crear-dieta`  
**Acceso:** CTA "Crear mi dieta gratis" desde la landing page  
**Contexto:** Bootcamp de vibe coding — ejercicio frontend  
**Versión:** 1.0 (documento técnico completo — 25 bloques)

---

## Índice

1. Propósito y Objetivos
2. Principios de Diseño del Formulario
3. Transformación del Usuario en el Flujo
4. Arquitectura del Formulario (pasos)
5. Paso 1 — Datos Físicos
6. Paso 2 — Nivel de Actividad
7. Paso 3 — Objetivos y Motivación
8. Paso 4 — Restricciones y Alergias
9. Paso 5 — Preferencias Culinarias
10. Paso 6 — Hábitos y Estilo de Vida
11. Paso 7 — Resumen y Confirmación
12. Wireframes de Referencia
13. Identidad Visual y Consistencia con la Landing
14. Paleta de Colores y Tipografía
15. Grid System y Spacing
16. Componentes UI Clave
17. Estados UI y Microinteracciones
18. Empty States, Validación y Errores
19. Motion Design
20. Accesibilidad Avanzada
21. Visión Técnica
22. Arquitectura del Proyecto
23. Stack Técnico — Detalle de Implementación
24. Roadmap de Desarrollo
25. Acceptance Criteria

---

## 1. Propósito y Objetivos

La página de formulario es el **núcleo funcional de NutriAI**. Su misión es recopilar los datos necesarios para que la IA genere una dieta verdaderamente personalizada, sin que el usuario sienta que está rellenando un formulario médico.

El equilibrio fundamental que debe resolver es:

> **Máxima calidad de datos para la IA · Mínima fricción para el usuario**

### Objetivos concretos

- Recopilar datos físicos, de hábitos, objetivos y preferencias en un flujo guiado de 7 pasos.
- Mantener la tasa de finalización del formulario por encima del 70%.
- Que cada paso se sienta como una conversación, no como un interrogatorio.
- Conectar visualmente de forma fluida con la landing (mismo sistema de diseño).
- Generar suficiente contexto para que la IA produzca un plan nutricional de calidad profesional.
- Ser completamente usable en móvil con una sola mano.

### Lo que este formulario NO es

- No es un cuestionario médico. El tono es cercano y motivador, no clínico.
- No es una pantalla de registro con campos obligatorios interminables.
- No es un formulario de una sola página con scroll infinito.

---

## 2. Principios de Diseño del Formulario

### 2.1 Un paso, una decisión

Cada pantalla del formulario tiene una única pregunta principal o un grupo temáticamente relacionado de preguntas simples. El usuario nunca se enfrenta a más de 4 inputs a la vez.

### 2.2 Progreso visible en todo momento

Una barra de progreso con indicador numérico ("Paso 2 de 7") está siempre visible. El usuario sabe exactamente dónde está y cuánto le queda.

### 2.3 Selección visual sobre input de texto

Siempre que sea posible, se usan **chips seleccionables**, **cards clicables** o **sliders** en lugar de campos de texto libre. Escribir en móvil es fricción; tocar una opción no.

### 2.4 Valores por defecto inteligentes

Cada input tiene un valor por defecto razonable preseleccionado. El usuario que acepta los defaults puede completar el formulario en menos de 90 segundos. El usuario que quiere personalizar al máximo puede hacerlo.

### 2.5 Feedback inmediato

Cada selección produce una respuesta visual instantánea: el chip se marca, el slider actualiza el valor, la card se activa. El usuario siempre sabe que su acción ha sido registrada.

### 2.6 Tono conversacional

Los títulos de cada paso usan la segunda persona y un lenguaje cercano:
- ✅ *"¿Cuánto pesas actualmente?"*
- ❌ *"Introduce tu peso corporal en kilogramos"*

### 2.7 Recuperabilidad

El usuario puede volver a cualquier paso anterior sin perder datos. El botón "Anterior" siempre está visible. Los datos se persisten en estado local durante la sesión.

---

## 3. Transformación del Usuario en el Flujo

El formulario no es solo una recogida de datos. Es el primer momento en que el usuario experimenta el producto. Cada paso debe reforzar la promesa de la landing.

| Momento | Estado emocional del usuario | Qué hace el diseño |
|---|---|---|
| Llegada (paso 1) | Curiosidad + ligera incertidumbre | Bienvenida cálida, barra de progreso tranquilizadora, primer paso fácil |
| Pasos 2–4 | Concentración, implicación | Feedback visual inmediato, microcopy motivador bajo cada pregunta |
| Paso 5–6 | Personalización, ilusión | Las opciones se sienten como "esto es para mí", no genéricas |
| Paso 7 (resumen) | Anticipación, confianza | Resumen visual de sus elecciones + CTA que genera la dieta |
| Resultado | Sorpresa positiva | Transición animada hacia la página de resultados |

> **Regla de oro:** en ningún momento el usuario debe sentirse juzgado por sus respuestas. Ningún texto implica que ciertos valores son "malos" o que el usuario debería ser diferente.

---

## 4. Arquitectura del Formulario (pasos)

El formulario se divide en **7 pasos** organizados de menor a mayor profundidad de personalización. Los primeros pasos son los más objetivos (datos físicos). Los últimos son los más subjetivos (gustos y estilo de vida).

```
Paso 1          Paso 2          Paso 3          Paso 4
────────────    ────────────    ────────────    ────────────
Datos físicos   Actividad       Objetivos       Restricciones
Edad, sexo,     Nivel, tipo,    Qué quiere      Alergias,
peso, altura    frecuencia      conseguir       intolerancias
                                                dietas especiales

Paso 5          Paso 6          Paso 7
────────────    ────────────    ────────────
Preferencias    Hábitos y       Resumen y
culinarias      estilo de vida  confirmación
Cocinas,        Horarios,       Revisa tus
alimentos,      presupuesto,    datos → genera
gustos          cocina propia   tu dieta
```

### Barra de progreso

```
[●●●●●○○]  Paso 5 de 7 — Preferencias culinarias
```

- Puntos rellenos = pasos completados
- Punto activo = paso actual (ligeramente más grande)
- Puntos vacíos = pasos pendientes
- Porcentaje alternativo: barra lineal con fill animado
- Tiempo estimado restante: *"~1 minuto para terminar"* (actualizado dinámicamente)

### Navegación entre pasos

- **Botón "Siguiente":** avanza al siguiente paso. Deshabilitado hasta que los campos obligatorios del paso están completos.
- **Botón "Anterior":** vuelve al paso anterior. Siempre visible y habilitado desde el paso 2 en adelante.
- **Navegación directa:** en el resumen (paso 7) cada sección tiene un botón de edición que lleva directamente al paso correspondiente.
- **Atajos de teclado:** `Enter` avanza al siguiente paso cuando el foco está en el último input del paso.

---

## 5. Paso 1 — Datos Físicos

**Título:** *"Empecemos por lo básico"*  
**Subtítulo:** *"Estos datos nos ayudan a calcular tus necesidades calóricas exactas."*  
**Campos obligatorios:** todos  
**Tiempo estimado:** 30 segundos

### Campos

#### Sexo biológico
- Tipo: selector de cards (2 opciones)
- Opciones: `Hombre` / `Mujer`
- Nota UX: se usa "sexo biológico" (no "género") porque es el dato relevante para el cálculo metabólico. Se incluye una nota discreta: *"Usamos este dato solo para calcular tu metabolismo basal."*
- Valor por defecto: ninguno (campo obligatorio explícito)

#### Edad
- Tipo: input numérico + stepper (+/-)
- Rango válido: 16–90 años
- Valor por defecto: 30
- Validación: entero positivo dentro del rango

#### Peso
- Tipo: slider horizontal + input numérico editable
- Unidad: kg (con toggle opcional a libras para mercado anglosajón)
- Rango: 40–200 kg
- Step: 0.5 kg
- Valor por defecto: 70 kg
- Feedback inmediato: muestra el valor actualizado en tiempo real

#### Altura
- Tipo: slider horizontal + input numérico editable
- Unidad: cm (con toggle opcional a ft/in)
- Rango: 140–220 cm
- Step: 1 cm
- Valor por defecto: 170 cm

#### IMC calculado (output, no input)
- Se calcula automáticamente y se muestra de forma discreta bajo los campos de peso y altura.
- Formato: *"Tu IMC: 24.2 — Peso saludable"*
- Categorías: Bajo peso / Peso saludable / Sobrepeso / Obesidad
- Tono: informativo, nunca valorativo. Sin colores de alerta agresivos.
- El IMC no bloquea el avance ni cambia el flujo.

### Wireframe Paso 1

```
┌─────────────────────────────────────────────────────────┐
│  ← NutriAI                          Paso 1 de 7  ●○○○○○○│
│  ████████░░░░░░░░░░░░░░░░  14%                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Empecemos por lo básico                                │
│  Estos datos nos ayudan a calcular tus                  │
│  necesidades calóricas exactas.                         │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐                    │
│  │   Hombre     │  │    Mujer     │                    │
│  │   [icono]    │  │   [icono]    │                    │
│  └──────────────┘  └──────────────┘                    │
│                                                         │
│  Edad                                                   │
│  [ − ]  [ 30 ]  [ + ]                                   │
│                                                         │
│  Peso                                                   │
│  ●━━━━━━━━━━━━━━━━━━━━━━  70 kg                        │
│                                                         │
│  Altura                                                 │
│  ●━━━━━━━━━━━━━━━━━━━━━━  170 cm                       │
│                                                         │
│  Tu IMC: 24.2 — Peso saludable ℹ️                      │
│                                                         │
│                          [ Siguiente → ]               │
└─────────────────────────────────────────────────────────┘
```

---

## 6. Paso 2 — Nivel de Actividad

**Título:** *"¿Cómo de activo/a eres en el día a día?"*  
**Subtítulo:** *"Sé honesto/a, no hay respuesta incorrecta. Esto ajusta tus calorías diarias."*  
**Campos obligatorios:** nivel de actividad  
**Tiempo estimado:** 15 segundos

### Campos

#### Nivel de actividad física
- Tipo: cards verticales seleccionables (una sola opción)
- 5 opciones con icono + título + descripción corta:

| Opción | Icono | Descripción |
|---|---|---|
| Sedentario | 🪑 | Trabajo de oficina, poco o nada de ejercicio |
| Ligeramente activo | 🚶 | Ejercicio ligero 1–3 días a la semana |
| Moderadamente activo | 🚴 | Ejercicio moderado 3–5 días a la semana |
| Muy activo | 🏋️ | Ejercicio intenso 6–7 días a la semana |
| Extremadamente activo | 🔥 | Atleta o trabajo físico muy exigente |

- Valor por defecto: Ligeramente activo
- La card seleccionada muestra borde verde + fondo verde pálido

#### Tipo de ejercicio preferido *(opcional)*
- Tipo: chips multi-selección
- Opciones: Cardio · Musculación · Yoga / Pilates · Deportes de equipo · Natación · Ciclismo · Running · HIIT · Caminata · Ninguno por ahora
- Máximo seleccionable: ilimitado
- Microcopy: *"Opcional — nos ayuda a ajustar los macronutrientes"*

### Wireframe Paso 2

```
┌─────────────────────────────────────────────────────────┐
│  ← NutriAI                          Paso 2 de 7  ●●○○○○○│
│  ████████████████░░░░░░░░  28%                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ¿Cómo de activo/a eres en el día a día?                │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 🪑  Sedentario                                  │   │
│  │     Trabajo de oficina, poco ejercicio          │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 🚶  Ligeramente activo          ← seleccionado  │   │ ← borde verde
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 🚴  Moderadamente activo                        │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  Tipo de ejercicio (opcional)                           │
│  [Cardio] [Musculación] [Yoga] [Running] [HIIT] ...    │
│                                                         │
│  [ ← Anterior ]                  [ Siguiente → ]       │
└─────────────────────────────────────────────────────────┘
```

---

## 7. Paso 3 — Objetivos y Motivación

**Título:** *"¿Qué quieres conseguir?"*  
**Subtítulo:** *"Puedes tener más de un objetivo. Priorizaremos el primero."*  
**Campos obligatorios:** al menos un objetivo principal  
**Tiempo estimado:** 20 segundos

### Campos

#### Objetivo principal
- Tipo: cards seleccionables con descripción (selección múltiple, máximo 3)
- La primera card seleccionada se marca como "Principal" automáticamente

| Opción | Icono | Descripción |
|---|---|---|
| Perder peso | ⚖️ | Reducir grasa corporal de forma sostenible |
| Ganar músculo | 💪 | Aumentar masa muscular con suficiente proteína |
| Mantener peso | 🎯 | Comer bien sin cambiar tu composición actual |
| Mejorar energía | ⚡ | Nutrición para sentirte más activo/a y concentrado/a |
| Salud digestiva | 🫁 | Dieta que cuide tu microbiota y digestión |
| Rendimiento deportivo | 🏅 | Alimentación orientada al entrenamiento |
| Control de glucemia | 🩸 | Dieta estable en azúcar, apta para diabéticos o prediabéticos |
| Salud general | 🌿 | Comer equilibrado sin un objetivo específico |

#### Velocidad del objetivo *(solo si el objetivo incluye perder/ganar peso)*
- Tipo: selector de 3 opciones con descripción
- Opciones:
  - **Suave** — *"−0.25 kg/semana. Cambios duraderos, cero sacrificio."*
  - **Moderado** — *"−0.5 kg/semana. El ritmo recomendado por la mayoría de nutricionistas."* ← recomendado
  - **Agresivo** — *"−0.75 kg/semana. Requiere más disciplina y seguimiento."*
- Valor por defecto: Moderado
- Microcopy bajo la opción agresiva: *"No recomendamos déficits superiores a 750 kcal/día."*

### Wireframe Paso 3

```
┌─────────────────────────────────────────────────────────┐
│  ← NutriAI                          Paso 3 de 7  ●●●○○○○│
│  ████████████████████████  42%                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ¿Qué quieres conseguir?                                │
│  Puedes elegir hasta 3 objetivos.                       │
│                                                         │
│  ┌───────────────────┐  ┌───────────────────┐          │
│  │ ⚖️ Perder peso    │  │ 💪 Ganar músculo  │          │
│  │ [Principal] ✓     │  │                   │          │
│  └───────────────────┘  └───────────────────┘          │
│  ┌───────────────────┐  ┌───────────────────┐          │
│  │ 🎯 Mantener       │  │ ⚡ Más energía    │          │
│  └───────────────────┘  └───────────────────┘          │
│                                                         │
│  ¿A qué ritmo quieres perder peso?                      │
│  ○ Suave   ● Moderado (recomendado)   ○ Agresivo        │
│                                                         │
│  [ ← Anterior ]                  [ Siguiente → ]       │
└─────────────────────────────────────────────────────────┘
```

---

## 8. Paso 4 — Restricciones y Alergias

**Título:** *"¿Hay algo que no puedas o no quieras comer?"*  
**Subtítulo:** *"Esta información es crítica para tu seguridad. Sé lo más preciso/a posible."*  
**Campos obligatorios:** ninguno (el usuario puede no tener restricciones)  
**Tiempo estimado:** 20 segundos

### Campos

#### Tipo de dieta
- Tipo: chips de selección única (radio group visual)
- Opciones: Omnívoro · Vegetariano · Vegano · Pescatariano · Flexitariano · Carnívoro
- Valor por defecto: Omnívoro

#### Restricciones religiosas / culturales *(opcional)*
- Tipo: chips multi-selección
- Opciones: Halal · Kosher · Sin cerdo · Sin ternera · Ayuno intermitente

#### Alergias e intolerancias
- Tipo: chips multi-selección con distinción visual (alergias en rojo pálido, intolerancias en amarillo pálido)
- Opciones de alergia: Gluten · Lactosa · Frutos secos · Cacahuetes · Mariscos · Pescado · Huevo · Soja · Sésamo · Mostaza
- Microcopy: *"Las alergias marcadas aquí nunca aparecerán en tu plan, sin excepciones."*

#### Alimentos que detestas *(opcional, texto libre + sugerencias)*
- Tipo: input de texto con autocompletado + chips eliminables
- Placeholder: *"Ej: brócoli, hígado, anchoas..."*
- El usuario escribe un alimento, pulsa Enter y se añade como chip eliminable
- Sugerencias rápidas predefinidas: Brócoli · Hígado · Berenjenas · Coles de Bruselas · Sardinas · Remolacha
- Límite: 15 alimentos

### Wireframe Paso 4

```
┌─────────────────────────────────────────────────────────┐
│  ← NutriAI                          Paso 4 de 7  ●●●●○○○│
│  ██████████████████████████████  57%                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ¿Hay algo que no puedas o no quieras comer?            │
│                                                         │
│  Tipo de dieta                                          │
│  [Omnívoro ✓] [Vegetariano] [Vegano] [Pescatariano]... │
│                                                         │
│  Alergias e intolerancias                               │
│  ⚠️ [Gluten] [Lactosa] [Frutos secos] [Mariscos]...    │
│                                                         │
│  Restricciones (opcional)                               │
│  [Halal] [Kosher] [Sin cerdo] [Sin ternera]             │
│                                                         │
│  Alimentos que detestas (opcional)                      │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Escribe un alimento...                   [+ Add] │  │
│  └──────────────────────────────────────────────────┘  │
│  [brócoli ×] [hígado ×]                                │
│                                                         │
│  [ ← Anterior ]                  [ Siguiente → ]       │
└─────────────────────────────────────────────────────────┘
```

---

## 9. Paso 5 — Preferencias Culinarias

**Título:** *"¿Qué tipo de comida te gusta?"*  
**Subtítulo:** *"Cuanto más nos cuentes, más sabrosa será tu dieta."*  
**Campos obligatorios:** ninguno  
**Tiempo estimado:** 25 segundos

### Campos

#### Cocinas favoritas
- Tipo: grid de cards con imagen/emoji + nombre (multi-selección, mínimo 1 recomendado)
- Opciones (12 cocinas):

| Cocina | Emoji |
|---|---|
| Mediterránea | 🫒 |
| Española | 🥘 |
| Italiana | 🍝 |
| Asiática | 🥢 |
| Japonesa | 🍱 |
| Mexicana | 🌮 |
| Árabe / Libanesa | 🧆 |
| India | 🍛 |
| Americana | 🥪 |
| Francesa | 🥐 |
| Griega | 🫙 |
| Sin preferencia | 🌍 |

#### Nivel de picante tolerado
- Tipo: slider de 4 posiciones con etiquetas
- Opciones: Sin picante · Suave · Medio · Fuerte
- Valor por defecto: Sin picante

#### Preferencia de sabores dominantes *(opcional)*
- Tipo: chips multi-selección
- Opciones: Dulce · Salado · Ácido · Amargo · Umami · Especiado

#### Textura y consistencia *(opcional)*
- Tipo: chips multi-selección
- Opciones: Crujiente · Cremoso · Caldoso · Asado · Al vapor · Crudo / Raw

### Wireframe Paso 5

```
┌─────────────────────────────────────────────────────────┐
│  ← NutriAI                          Paso 5 de 7  ●●●●●○○│
│  ████████████████████████████████████████  71%          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ¿Qué tipo de comida te gusta?                          │
│                                                         │
│  Cocinas favoritas                                      │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                  │
│  │  🫒  │ │  🥘  │ │  🍝  │ │  🥢  │                  │
│  │ Med. │ │ Esp. │ │ Ita. │ │ Asia │                  │
│  └──────┘ └──────┘ └──────┘ └──────┘                  │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                  │
│  │  🍱  │ │  🌮  │ │  🧆  │ │  🍛  │                  │
│  └──────┘ └──────┘ └──────┘ └──────┘                  │
│                                                         │
│  Nivel de picante                                       │
│  Sin picante ●━━━━━━━━━━━━━━━━━━━━ Fuerte              │
│                                                         │
│  Sabores preferidos (opcional)                          │
│  [Dulce] [Salado] [Ácido] [Umami] [Especiado]          │
│                                                         │
│  [ ← Anterior ]                  [ Siguiente → ]       │
└─────────────────────────────────────────────────────────┘
```

---

## 10. Paso 6 — Hábitos y Estilo de Vida

**Título:** *"Cuéntanos cómo es tu día a día"*  
**Subtítulo:** *"Adaptamos el plan a tu ritmo de vida real, no al ideal."*  
**Campos obligatorios:** número de comidas al día  
**Tiempo estimado:** 30 segundos

### Campos

#### Número de comidas al día
- Tipo: stepper visual con descripción contextual
- Rango: 2–6 comidas
- Valor por defecto: 3
- Descripción contextual que cambia según la selección:
  - 2 comidas: *"Ayuno intermitente 16/8 o similar"*
  - 3 comidas: *"El patrón más habitual: desayuno, comida y cena"*
  - 4 comidas: *"Con merienda incluida"*
  - 5 comidas: *"Con snack de media mañana y merienda"*
  - 6 comidas: *"Patrón frecuente en dietas de volumen o rendimiento"*

#### Horario aproximado de comidas *(opcional)*
- Tipo: conjunto de time-pickers simplificados (solo hora, sin minutos)
- Se muestran tantos selectores como comidas seleccionadas en el campo anterior
- Etiquetas automáticas: Desayuno / Media mañana / Almuerzo / Merienda / Cena / Recena
- Valor por defecto: 8h / 10:30h / 14h / 17h / 21h

#### Presupuesto semanal en alimentación
- Tipo: cards de selección única con rango orientativo
- Opciones:
  - **Ajustado** — *"~30–50€/semana. Recetas económicas y accesibles."*
  - **Moderado** — *"~50–80€/semana. Equilibrio entre variedad y coste."* ← recomendado
  - **Sin límite** — *"Priorizamos calidad y variedad por encima del precio."*

#### ¿Cocinas en casa habitualmente?
- Tipo: toggle + condicional
- Opciones: Sí, casi siempre · A veces · Rara vez / Nunca
- Si la respuesta es "Rara vez / Nunca": aparece un campo adicional con opciones de adaptación:
  - *"Incluir recetas de menos de 15 minutos"*
  - *"Priorizar opciones ready-to-eat o meal prep semanal"*
  - *"Incluir opciones de restaurante / delivery saludable"*

#### ¿Cuánta agua bebes al día? *(opcional)*
- Tipo: slider de 5 posiciones
- Opciones: Muy poco (<1L) · Poco (1–1.5L) · Normal (1.5–2L) · Bastante (2–2.5L) · Mucho (>2.5L)
- El plan incluirá recomendaciones de hidratación según este dato.

#### Suplementación actual *(opcional)*
- Tipo: chips multi-selección
- Opciones: Proteína en polvo · Creatina · Omega-3 · Vitamina D · Magnesio · Multivitamínico · Ninguno
- Microcopy: *"Tendremos en cuenta tus suplementos para no duplicar nutrientes."*

### Wireframe Paso 6

```
┌─────────────────────────────────────────────────────────┐
│  ← NutriAI                          Paso 6 de 7  ●●●●●●○│
│  ██████████████████████████████████████████████  85%    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Cuéntanos cómo es tu día a día                         │
│                                                         │
│  ¿Cuántas veces comes al día?                           │
│  [ − ]  [ 3 ]  [ + ]                                    │
│  El patrón más habitual: desayuno, comida y cena        │
│                                                         │
│  Horarios aproximados (opcional)                        │
│  Desayuno [8:00]  Almuerzo [14:00]  Cena [21:00]        │
│                                                         │
│  Presupuesto semanal                                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │ Ajustado │  │ Moderado │  │Sin límite│              │
│  │ ~30-50€  │  │ ~50-80€  │  │   🍽️    │              │
│  └──────────┘  └──────────┘  └──────────┘              │
│                                                         │
│  ¿Cocinas en casa?                                      │
│  ○ Sí, casi siempre  ● A veces  ○ Rara vez              │
│                                                         │
│  Suplementos actuales (opcional)                        │
│  [Proteína] [Creatina] [Omega-3] [Ninguno]              │
│                                                         │
│  [ ← Anterior ]                  [ Siguiente → ]       │
└─────────────────────────────────────────────────────────┘
```

---

## 11. Paso 7 — Resumen y Confirmación

**Título:** *"Todo listo. Revisa tu perfil nutricional."*  
**Subtítulo:** *"Comprueba que todo es correcto antes de generar tu plan."*  
**Campos obligatorios:** —  
**Tiempo estimado:** 15 segundos

### Contenido

#### Resumen visual de datos introducidos

El paso 7 muestra un resumen estructurado en cards editables. Cada card corresponde a un paso y tiene un botón de edición (icono lápiz) que lleva directamente a ese paso.

```
┌─────────────────────┐  ┌─────────────────────┐
│ 👤 Perfil físico  ✏️│  │ 🏃 Actividad       ✏️│
│ Mujer · 28 años     │  │ Moderadamente activo │
│ 65 kg · 167 cm      │  │ Running · HIIT       │
│ IMC 23.3            │  │                      │
└─────────────────────┘  └─────────────────────┘
┌─────────────────────┐  ┌─────────────────────┐
│ 🎯 Objetivos      ✏️│  │ 🚫 Restricciones   ✏️│
│ Perder peso (mod.)  │  │ Sin lactosa          │
│ + Más energía       │  │ Sin gluten           │
│                     │  │ Detesta: brócoli     │
└─────────────────────┘  └─────────────────────┘
┌─────────────────────┐  ┌─────────────────────┐
│ 🍝 Gustos         ✏️│  │ 🏠 Hábitos         ✏️│
│ Mediterránea        │  │ 3 comidas · ~14€/día │
│ Italiana · Japonesa │  │ Cocina a veces       │
│ Sin picante         │  │ Toma Omega-3         │
└─────────────────────┘  └─────────────────────┘
```

#### Estimación de calorías (output informativo)

Antes de generar la dieta, se muestra una estimación de las calorías diarias objetivo calculadas en tiempo real (fórmula Harris-Benedict + factor de actividad + ajuste por objetivo):

```
┌────────────────────────────────────────────────────────┐
│  📊 Tu objetivo calórico estimado                      │
│                                                        │
│  Metabolismo basal (BMR):          1.482 kcal          │
│  Factor de actividad (×1.55):      2.297 kcal          │
│  Ajuste objetivo (-500 kcal):    − 500 kcal            │
│  ─────────────────────────────────────────────         │
│  Calorías diarias objetivo:        1.797 kcal          │
│                                                        │
│  Distribución de macros estimada:                      │
│  Proteína 30% · Carbohidratos 40% · Grasas 30%         │
└────────────────────────────────────────────────────────┘
```

- Microcopy bajo el recuadro: *"Estos valores se ajustarán en función de tu evolución."*

#### CTA final

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│     ✨ Generar mi plan de dieta personalizado          │  ← Botón primario grande
│                                                        │
│  La IA analizará tu perfil y creará un menú            │
│  semanal adaptado a ti. Listo en segundos.             │
│                                                        │
└────────────────────────────────────────────────────────┘
```

---

## 12. Wireframes de Referencia

### Layout global del formulario — Desktop

```
┌─────────────────────────────────────────────────────────────────┐
│  NAVBAR (sticky, mismo que landing)                       [CTA]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Progress bar  ●●●○○○○  Paso 3 de 7  (~2 min)           │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │                                                         │   │
│  │  [Panel izquierdo — 55%]   [Panel derecho — 45%]        │   │
│  │                                                         │   │
│  │  Título del paso           Preview / ilustración        │   │
│  │  Subtítulo                 contextual del paso          │   │
│  │                            (cambia en cada paso)        │   │
│  │  Campos del formulario                                  │   │
│  │                                                         │   │
│  │  [ ← Anterior ]  [ Siguiente → ]                        │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Layout global — Mobile

```
┌─────────────────────┐
│  NAVBAR      [≡]    │
├─────────────────────┤
│ ●●●○○○○  Paso 3/7  │
│ ████████░░░░  42%   │
├─────────────────────┤
│                     │
│  Título del paso    │
│  Subtítulo          │
│                     │
│  [Campos / inputs]  │
│                     │
│                     │
│                     │
├─────────────────────┤
│ [← Ant] [Sig. →]   │ ← sticky footer de navegación
└─────────────────────┘
```

### Transición entre pasos

```
Paso actual                    Paso siguiente
─────────────────────          ─────────────────────
[Contenido visible]    →       [Slide-in desde derecha]
                       ←       [Slide-out hacia izquierda]
```

La animación de transición entre pasos es un slide horizontal suave (300ms ease-out). Al volver atrás, la dirección se invierte.

---

## 13. Identidad Visual y Consistencia con la Landing

La página del formulario es una **extensión del mismo sistema de diseño** de la landing. El usuario no debe percibir un salto visual entre las dos páginas.

### Elementos compartidos con la landing

- Navbar idéntica (sticky, blur en scroll, mismo logo y botón CTA).
- Footer idéntico.
- Paleta de colores exactamente igual.
- Tipografía: Fraunces para títulos de paso, Plus Jakarta Sans para labels e inputs.
- Border-radius de 16px en tarjetas y chips.
- Sistema de sombras idéntico (`shadow-card`, `shadow-card-hover`).
- Iconografía Lucide Icons en el mismo estilo.

### Diferencias intencionales

| Elemento | Landing | Formulario |
|---|---|---|
| Fondo | Crema `#F9F6F0` | Blanco `#FFFFFF` + sidebar gris pálido opcional |
| Density | Espaciado generoso, mucho blanco | Más compacto, orientado a la tarea |
| Animaciones | Parallax, floats, reveals on scroll | Transiciones entre pasos, feedback de inputs |
| Hero visual | Mockup ilustrativo | Panel lateral con ilustración contextual por paso |

### Panel lateral contextual (desktop)

En desktop, el 45% derecho de la pantalla muestra una ilustración o animación que cambia según el paso actual. Esto hace que la pantalla no parezca un formulario puro:

| Paso | Contenido del panel lateral |
|---|---|
| 1 — Datos físicos | Silueta humana con indicadores de IMC |
| 2 — Actividad | Ilustración de la actividad seleccionada |
| 3 — Objetivos | Gráfico de progreso animado hacia el objetivo |
| 4 — Restricciones | Tabla de ingredientes con checks y cruces |
| 5 — Gustos | Grid de platos de las cocinas seleccionadas |
| 6 — Hábitos | Timeline del día con las comidas configuradas |
| 7 — Resumen | Mini-preview del plan de dieta que se va a generar |

---

## 14. Paleta de Colores y Tipografía

Idéntica a la landing. Se añaden tokens específicos del formulario:

### Tokens adicionales del formulario

| Token | Valor | Uso |
|---|---|---|
| `--color-input-border` | `#E5E7EB` | Borde de inputs en reposo |
| `--color-input-focus` | `#1D9E75` | Borde de inputs en foco |
| `--color-chip-default` | `#F3F4F6` | Fondo de chip no seleccionado |
| `--color-chip-selected-bg` | `#E1F5EE` | Fondo de chip seleccionado |
| `--color-chip-selected-border` | `#5DCAA5` | Borde de chip seleccionado |
| `--color-chip-selected-text` | `#0F6E56` | Texto de chip seleccionado |
| `--color-error` | `#DC2626` | Mensajes de error de validación |
| `--color-warning` | `#D97706` | Advertencias (ej: déficit calórico alto) |
| `--color-success` | `#16A34A` | Confirmación de campo completado |
| `--color-allergy` | `#FEF2F2` | Fondo chips de alergia |
| `--color-allergy-border`| `#FCA5A5` | Borde chips de alergia |

### Jerarquía tipográfica del formulario

| Elemento | Familia | Tamaño | Peso |
|---|---|---|---|
| Título de paso (H1) | Fraunces | 28px / 24px mobile | Bold 700 |
| Subtítulo de paso | Plus Jakarta Sans | 15px | Regular 400 |
| Label de campo | Plus Jakarta Sans | 13px | SemiBold 600 |
| Input / texto | Plus Jakarta Sans | 15px | Regular 400 |
| Microcopy / hint | Plus Jakarta Sans | 12px | Regular 400, color gris |
| Chip / badge | Plus Jakarta Sans | 13px | Medium 500 |
| Error message | Plus Jakarta Sans | 12px | Medium 500, color rojo |

---

## 15. Grid System y Spacing

### Grid del formulario

El formulario vive dentro del mismo grid de la landing pero con ajustes propios:

| Breakpoint | Layout del formulario |
|---|---|
| Mobile (<768px) | 1 columna. Panel lateral oculto. Navegación sticky en footer. |
| Tablet (768–1024px) | 1 columna centrada (max-width 600px). Sin panel lateral. |
| Desktop (>1024px) | 2 columnas: formulario 55% + panel contextual 45%. |

### Spacing interno del formulario

| Elemento | Valor |
|---|---|
| Padding del card/step container | 40px desktop / 24px mobile |
| Separación entre campos | 24px |
| Separación entre label y campo | 8px |
| Separación entre chips | 8px |
| Altura mínima de botón | 48px (accesibilidad táctil) |
| Altura mínima de chip | 40px mobile / 36px desktop |
| Padding interno de chip | 10px 16px |
| Padding interno de card seleccionable | 16px |

---

## 16. Componentes UI Clave

| Componente | Descripción | Variantes |
|---|---|---|
| `<ProgressBar>` | Barra de progreso con dots y porcentaje | Linear / Dots |
| `<StepContainer>` | Wrapper de cada paso con título, subtítulo y navegación | — |
| `<SelectCard>` | Card clicable con icono + título + descripción. Estado selected | Single / Multi |
| `<ChipSelector>` | Chip seleccionable. Toggle on/off. | Default / Selected / Allergy / Disabled |
| `<RangeSlider>` | Slider con valor en tiempo real + input numérico editable | Continuous / Steps |
| `<Stepper>` | Input +/- con valor central | — |
| `<TimePicker>` | Selector de hora simplificado (solo HH) | — |
| `<TagInput>` | Input de texto con autocompletado + chips eliminables | — |
| `<SummaryCard>` | Card de resumen con botón de edición | — |
| `<CalorieEstimator>` | Cálculo en tiempo real de BMR y objetivo calórico | — |
| `<StepNavigation>` | Botones Anterior / Siguiente sticky en mobile | — |
| `<ContextualPanel>` | Panel lateral desktop con ilustración dinámica por paso | — |

---

## 17. Estados UI y Microinteracciones

### Inputs y campos

| Elemento | Estado | Comportamiento |
|---|---|---|
| Input numérico | Default | Borde `#E5E7EB`, fondo blanco |
| Input numérico | Focus | Borde verde `#1D9E75`, glow sutil `0 0 0 3px rgba(29,158,117,0.15)` |
| Input numérico | Filled | Check icon verde a la derecha |
| Input numérico | Error | Borde rojo `#DC2626`, mensaje de error inline |
| Chip | Default | Fondo gris pálido, borde transparente |
| Chip | Hover | Borde verde, cursor pointer |
| Chip | Selected | Fondo verde pálido, borde verde menta, texto verde oscuro, check icon |
| Chip de alergia | Selected | Fondo rojo pálido, borde rojo, icono de alerta |
| SelectCard | Default | Sombra `shadow-card`, borde gris |
| SelectCard | Hover | `translateY(-2px)` + `shadow-card-hover` |
| SelectCard | Selected | Borde verde 2px, fondo verde pálido, check en esquina superior derecha |
| RangeSlider | Drag | Thumb escala a 1.2×, tooltip con valor encima |
| Stepper | Click | Animación de rebote sutil en el número central |

### Transiciones entre pasos

| Acción | Animación |
|---|---|
| Avanzar al siguiente paso | Slide-out izquierda + slide-in derecha (300ms ease-out) |
| Volver al paso anterior | Slide-out derecha + slide-in izquierda (300ms ease-out) |
| Llegada al paso 7 (resumen) | Fade-in + scale desde 0.97 (celebración sutil) |
| Click en "Generar dieta" | Botón → estado loading → transición a página de resultados |

### Botón "Siguiente"

| Estado | Comportamiento |
|---|---|
| Disabled (campos incompletos) | Opacity 0.4, cursor not-allowed, tooltip: *"Completa los campos obligatorios"* |
| Enabled | Verde sólido, hover `scale(1.02)` |
| Loading (solo en paso 7) | Spinner + texto *"Generando tu plan..."*, progreso animado |

---

## 18. Empty States, Validación y Errores

### Validaciones por campo

| Campo | Regla | Mensaje de error |
|---|---|---|
| Edad | Entero entre 16 y 90 | *"Introduce una edad válida (16–90 años)"* |
| Peso | Decimal entre 40 y 200 | *"El peso debe estar entre 40 y 200 kg"* |
| Altura | Entero entre 140 y 220 | *"La altura debe estar entre 140 y 220 cm"* |
| Sexo biológico | Selección obligatoria | *"Selecciona una opción para calcular tu metabolismo"* |
| Objetivo | Al menos 1 seleccionado | *"Selecciona al menos un objetivo"* |
| Comidas/día | Entero entre 2 y 6 | Bloqueado por el stepper, no puede salir del rango |

### Estrategia de validación

- **Validación on blur** (no on change): los errores aparecen cuando el usuario sale del campo, no mientras escribe.
- **Validación on submit** del paso: si el usuario pulsa "Siguiente" con campos inválidos, se muestran todos los errores del paso a la vez y el scroll sube al primer error.
- **Corrección instantánea**: en cuanto el usuario corrige un campo con error, el mensaje desaparece de inmediato (on change).

### Estado de carga al generar la dieta

Cuando el usuario pulsa "Generar mi plan" en el paso 7, la UI entra en un estado de carga que dura entre 3 y 8 segundos (tiempo real de respuesta de la IA):

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│          ✨ Estamos creando tu plan...                  │
│                                                        │
│   [████████████████████░░░░░░░░░░░░░]  65%             │
│                                                        │
│   ✓ Analizando tu perfil nutricional                   │
│   ✓ Calculando tus macros personalizados               │
│   ⟳ Generando menú para los 7 días...                  │
│   ○ Preparando lista de la compra                      │
│                                                        │
└────────────────────────────────────────────────────────┘
```

- Los pasos completados muestran ✓ en verde.
- El paso en curso muestra ⟳ animado.
- Los pasos pendientes muestran ○ en gris.
- La barra de progreso avanza de forma pseudo-aleatoria pero nunca llega al 100% hasta que la IA responde.

---

## 19. Motion Design

| Efecto | Aplicación | Config |
|---|---|---|
| Slide horizontal | Transición entre pasos | `x: ±60px → 0`, 300ms ease-out |
| Fade-in de campos | Al aparecer campos condicionales | `opacity: 0→1, y: 10→0`, 200ms |
| Chip bounce | Al seleccionar un chip | `scale: 1→1.08→1`, 150ms spring |
| Stepper count | Al cambiar valor con +/- | Número hace flip vertical suave |
| Progress bar fill | Al avanzar entre pasos | `width` con transición 400ms ease |
| Dot progress | Al completar un paso | Dot rellena con `scale: 0→1` + color |
| SelectCard select | Al seleccionar una card | `scale: 0.98→1` + border color transition |
| Loading bar | En paso 7 durante generación | Indeterminate shimmer + progreso incremental |
| Resultado reveal | Al llegar a la página de resultados | Full page fade-in desde blanco |
| Panel lateral | Cambio entre pasos | Cross-fade del contenido contextual |
| `prefers-reduced-motion` | Global | Todas las animaciones se reducen a fade simple |

---

## 20. Accesibilidad Avanzada

| Categoría | Requisito | Implementación |
|---|---|---|
| Teclado | Formulario navegable sin ratón | Tab order lógico, Enter avanza en último campo |
| ARIA | Roles en elementos custom | `role="group"` en chip groups, `role="radiogroup"` en SelectCards |
| ARIA | Paso actual anunciado | `aria-live="polite"` en el título del paso al cambiar |
| ARIA | Errores vinculados | `aria-describedby` apunta al mensaje de error del campo |
| ARIA | Progreso | `<progress>` nativo o `role="progressbar"` con `aria-valuenow` |
| ARIA | Drawer mobile | `role="dialog"`, `aria-modal="true"`, focus trap |
| Focus | Gestión de foco entre pasos | Al avanzar, el foco va al H1 del nuevo paso |
| Focus | Focus visible siempre | Focus ring verde 2px en todos los elementos |
| Motion | Animaciones reducidas | `prefers-reduced-motion: reduce` desactiva slides, conserva fades |
| Contraste | Textos de inputs | ≥ 4.5:1 sobre fondo blanco |
| Contraste | Placeholder texts | ≥ 3:1 (WCAG AA para placeholders) |
| Táctil | Tamaño mínimo de targets | 48×48px para todos los elementos táctiles |
| Semántica | Estructura correcta | `<form>`, `<fieldset>`, `<legend>` donde aplica |
| Idioma | Atributo lang | `<html lang="es">` |

---

## 21. Visión Técnica

### Filosofía de desarrollo del formulario

El formulario es el componente más complejo de NutriAI desde el punto de vista de estado y UX. La filosofía de implementación se asienta sobre tres pilares:

**1. Estado centralizado y tipado:**
Todo el estado del formulario vive en un único objeto tipado (`FormData`). No hay estado disperso entre componentes. Cada campo actualiza una slice del estado central. Esto permite serializar y deserializar el formulario completo en cualquier momento (para guardar progreso, para debug, para enviarlo a la IA).

**2. Componentes desacoplados del estado:**
Los componentes UI (`<ChipSelector>`, `<RangeSlider>`, etc.) son componentes puros que reciben `value` y `onChange`. No conocen el estado global. Esto los hace completamente reutilizables y testables en aislamiento.

**3. Lógica de negocio en hooks:**
Los cálculos (BMR, TDEE, ajuste por objetivo) viven en hooks (`useCalorieCalculator`), no en componentes. Los componentes solo presentan el resultado.

### Modelo de datos del formulario

```typescript
interface FormData {
  // Paso 1 — Datos físicos
  sex:    'male' | 'female' | null
  age:    number           // 16–90
  weight: number           // kg, 40–200
  height: number           // cm, 140–220

  // Paso 2 — Actividad
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active' | null
  exerciseTypes: ExerciseType[]

  // Paso 3 — Objetivos
  goals:         Goal[]           // max 3, primero = principal
  goalSpeed:     'gentle' | 'moderate' | 'aggressive' | null

  // Paso 4 — Restricciones
  dietType:      DietType
  religiousRestrictions: ReligiousRestriction[]
  allergies:     Allergy[]
  dislikedFoods: string[]         // max 15

  // Paso 5 — Preferencias culinarias
  favoriteCuisines:   Cuisine[]
  spiceLevel:         0 | 1 | 2 | 3  // sin picante → fuerte
  flavorPreferences:  FlavorProfile[]
  texturePreferences: TextureProfile[]

  // Paso 6 — Hábitos
  mealsPerDay:   number           // 2–6
  mealTimes:     string[]         // ISO time strings, length = mealsPerDay
  budget:        'tight' | 'moderate' | 'unlimited'
  cookingHabits: 'always' | 'sometimes' | 'rarely'
  cookingAdaptations: CookingAdaptation[]
  waterIntake:   0 | 1 | 2 | 3 | 4
  supplements:   Supplement[]
}
```

### Flujo de datos → IA

El `FormData` se transforma en un prompt estructurado antes de enviarse a la API de Claude:

```
FormData (objeto tipado)
    ↓
promptBuilder(formData: FormData): string
    ↓
Prompt estructurado en lenguaje natural + datos específicos
    ↓
API Claude (streaming)
    ↓
Plan de dieta en markdown estructurado
    ↓
Página de resultados
```

---

## 22. Arquitectura del Proyecto

### Estructura de carpetas (formulario)

```
nutriai-landing/
│
├── app/
│   ├── crear-dieta/
│   │   ├── page.tsx                  # Página principal del formulario
│   │   └── layout.tsx                # Layout específico (sin footer pesado)
│   └── resultados/
│       └── page.tsx                  # Página de resultados de la dieta
│
├── components/
│   ├── form/
│   │   ├── FormWizard.tsx            # Orchestrator: gestiona paso actual y navegación
│   │   ├── ProgressBar.tsx           # Barra de progreso visual
│   │   ├── StepContainer.tsx         # Wrapper de cada paso
│   │   ├── StepNavigation.tsx        # Botones Anterior / Siguiente
│   │   ├── ContextualPanel.tsx       # Panel lateral desktop (ilustración dinámica)
│   │   │
│   │   ├── steps/
│   │   │   ├── Step1Physical.tsx     # Datos físicos
│   │   │   ├── Step2Activity.tsx     # Nivel de actividad
│   │   │   ├── Step3Goals.tsx        # Objetivos
│   │   │   ├── Step4Restrictions.tsx # Restricciones y alergias
│   │   │   ├── Step5Preferences.tsx  # Preferencias culinarias
│   │   │   ├── Step6Habits.tsx       # Hábitos y estilo de vida
│   │   │   └── Step7Summary.tsx      # Resumen y confirmación
│   │   │
│   │   └── inputs/
│   │       ├── SelectCard.tsx        # Card clicable seleccionable
│   │       ├── ChipSelector.tsx      # Chip multi-selección
│   │       ├── RangeSlider.tsx       # Slider con valor en tiempo real
│   │       ├── Stepper.tsx           # Input +/-
│   │       ├── TimePicker.tsx        # Selector de hora
│   │       ├── TagInput.tsx          # Input + chips eliminables
│   │       └── CalorieEstimator.tsx  # Output de cálculo calórico
│   │
│   └── results/
│       ├── DietPlan.tsx              # Renderiza el plan generado
│       ├── GeneratingState.tsx       # Estado de carga con pasos animados
│       └── WeeklyMenu.tsx            # Vista semanal del menú
│
├── hooks/
│   ├── useFormWizard.ts              # Estado central del formulario + navegación
│   ├── useCalorieCalculator.ts       # BMR + TDEE + ajuste objetivo
│   ├── useFormValidation.ts          # Validaciones por paso
│   └── useDietGenerator.ts           # Llamada a la API + streaming
│
├── lib/
│   ├── promptBuilder.ts              # FormData → prompt para Claude
│   ├── validators.ts                 # Funciones de validación puras
│   └── calorieCalculator.ts          # Fórmula Harris-Benedict
│
└── types/
    ├── form.ts                       # Interface FormData + todos los enums
    └── diet.ts                       # Tipos del plan de dieta generado
```

### Hook central: `useFormWizard`

```typescript
// hooks/useFormWizard.ts

interface UseFormWizardReturn {
  currentStep:    number                    // 1–7
  totalSteps:     number                    // 7
  formData:       FormData
  progress:       number                    // 0–100
  canAdvance:     boolean                   // campos obligatorios completados
  updateField:    (field: keyof FormData, value: unknown) => void
  nextStep:       () => void
  prevStep:       () => void
  goToStep:       (step: number) => void    // para edición desde resumen
  submitForm:     () => Promise<void>       // llama a la IA
  direction:      'forward' | 'backward'   // para animación de transición
}
```

---

## 23. Stack Técnico — Detalle de Implementación

Idéntico al de la landing (Next.js 14, Tailwind CSS, Framer Motion, Lucide Icons). Se añaden las siguientes piezas específicas del formulario:

### Gestión de estado del formulario

```typescript
// hooks/useFormWizard.ts — implementación simplificada
import { useState, useCallback } from 'react'
import { FormData, INITIAL_FORM_DATA } from '@/types/form'
import { validateStep } from '@/lib/validators'

export function useFormWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')

  const updateField = useCallback(
    (field: keyof FormData, value: unknown) =>
      setFormData(prev => ({ ...prev, [field]: value })),
    []
  )

  const nextStep = useCallback(() => {
    if (!validateStep(currentStep, formData)) return
    setDirection('forward')
    setCurrentStep(s => Math.min(s + 1, 7))
  }, [currentStep, formData])

  const prevStep = useCallback(() => {
    setDirection('backward')
    setCurrentStep(s => Math.max(s - 1, 1))
  }, [])

  return { currentStep, formData, updateField, nextStep, prevStep,
           direction, canAdvance: validateStep(currentStep, formData),
           progress: ((currentStep - 1) / 6) * 100 }
}
```

### Animación de transición entre pasos (Framer Motion)

```typescript
// components/form/StepContainer.tsx
const variants = {
  enter:  (dir: 'forward' | 'backward') => ({
    x: dir === 'forward' ? 60 : -60,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit:   (dir: 'forward' | 'backward') => ({
    x: dir === 'forward' ? -60 : 60,
    opacity: 0,
  }),
}

<AnimatePresence mode="wait" custom={direction}>
  <motion.div
    key={currentStep}
    custom={direction}
    variants={variants}
    initial="enter"
    animate="center"
    exit="exit"
    transition={{ duration: 0.3, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

### Cálculo calórico en tiempo real

```typescript
// lib/calorieCalculator.ts
export function calculateBMR(sex: 'male'|'female', weight: number,
                              height: number, age: number): number {
  return sex === 'male'
    ? 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
    : 447.593 + 9.247 * weight + 3.098 * height - 4.330 * age
}

const ACTIVITY_FACTORS = {
  sedentary: 1.2, light: 1.375, moderate: 1.55,
  active: 1.725, very_active: 1.9,
}

const GOAL_ADJUSTMENTS = {
  lose_weight: { gentle: -250, moderate: -500, aggressive: -750 },
  gain_muscle: { gentle: 250, moderate: 400, aggressive: 500 },
  maintain: { gentle: 0, moderate: 0, aggressive: 0 },
}

export function calculateTDEE(bmr: number, activityLevel: string): number {
  return bmr * (ACTIVITY_FACTORS[activityLevel] ?? 1.375)
}
```

### Constructor de prompt para la IA

```typescript
// lib/promptBuilder.ts
export function buildDietPrompt(data: FormData): string {
  return `Eres un nutricionista profesional certificado. Genera un plan de dieta
semanal completo y detallado basado en este perfil:

DATOS FÍSICOS:
- Sexo: ${data.sex === 'male' ? 'Hombre' : 'Mujer'} | Edad: ${data.age} años
- Peso: ${data.weight} kg | Altura: ${data.height} cm
- IMC: ${calculateIMC(data.weight, data.height)}

ACTIVIDAD:
- Nivel: ${data.activityLevel}
- Ejercicio: ${data.exerciseTypes.join(', ') || 'No especificado'}

OBJETIVOS:
- Principal: ${data.goals[0]}
- Ritmo: ${data.goalSpeed}
- Calorías objetivo: ${calculateTargetCalories(data)} kcal/día

RESTRICCIONES (CRÍTICO — nunca incluir):
- Tipo de dieta: ${data.dietType}
- Alergias: ${data.allergies.join(', ') || 'Ninguna'}
- Intolerancias: (incluidas en alergias)
- Alimentos que detesta: ${data.dislikedFoods.join(', ') || 'Ninguno'}
- Restricciones religiosas: ${data.religiousRestrictions.join(', ') || 'Ninguna'}

PREFERENCIAS CULINARIAS:
- Cocinas favoritas: ${data.favoriteCuisines.join(', ')}
- Nivel de picante: ${['Sin picante','Suave','Medio','Fuerte'][data.spiceLevel]}

HÁBITOS:
- Comidas al día: ${data.mealsPerDay}
- Presupuesto: ${data.budget}
- Cocina en casa: ${data.cookingHabits}
- Suplementos: ${data.supplements.join(', ') || 'Ninguno'}

INSTRUCCIONES:
1. Genera un menú para los 7 días con ${data.mealsPerDay} comidas cada día.
2. Incluye cantidades en gramos para cada alimento.
3. Añade macros (proteína/carbos/grasas) por día.
4. Incluye una lista de la compra semanal agrupada por categoría.
5. Añade 3 consejos personalizados basados en los objetivos.
6. Usa recetas acordes a las cocinas favoritas indicadas.
Responde en español, formato markdown estructurado.`
}
```

---

## 24. Roadmap de Desarrollo

El formulario se desarrolla en **3 fases** adicionales al roadmap de la landing.

### Fase 5 — Infraestructura del formulario (Días 11–12)

Objetivo: estructura base del wizard con navegación funcional entre pasos.

| Tarea | Descripción | Prioridad |
|---|---|---|
| Ruta `/crear-dieta` | Crear página en App Router | P0 |
| `useFormWizard` | Hook central con estado y navegación | P0 |
| `FormWizard.tsx` | Orchestrator con AnimatePresence | P0 |
| `ProgressBar.tsx` | Barra con dots + porcentaje animado | P0 |
| `StepContainer.tsx` | Wrapper con animación slide | P0 |
| `StepNavigation.tsx` | Botones Anterior/Siguiente sticky mobile | P0 |
| `types/form.ts` | Interface FormData + enums completos | P0 |
| `INITIAL_FORM_DATA` | Valores por defecto de todos los campos | P1 |

**Entregable:** wizard navegable entre 7 pasos vacíos con animación de transición.

---

### Fase 6 — Componentes de input y pasos (Días 13–16)

Objetivo: todos los pasos funcionales con sus inputs y validaciones.

| Tarea | Descripción | Prioridad |
|---|---|---|
| `SelectCard.tsx` | Card seleccionable single/multi | P0 |
| `ChipSelector.tsx` | Chip con toggle y variante alergia | P0 |
| `RangeSlider.tsx` | Slider + input numérico editable | P0 |
| `Stepper.tsx` | Input +/- con animación | P0 |
| `TagInput.tsx` | Input + chips eliminables + autocompletado | P1 |
| `TimePicker.tsx` | Selector de hora simplificado | P2 |
| Step 1 completo | Todos los campos + validación + IMC calculado | P0 |
| Step 2 completo | Cards de actividad + chips de ejercicio | P0 |
| Step 3 completo | Cards de objetivo + selector de ritmo condicional | P0 |
| Step 4 completo | Tipo de dieta + alergias + tag input | P0 |
| Step 5 completo | Grid de cocinas + slider picante + chips sabores | P0 |
| Step 6 completo | Stepper comidas + time pickers + presupuesto + hábitos | P0 |
| `useFormValidation` | Validaciones por paso | P0 |
| `useCalorieCalculator` | BMR + TDEE en tiempo real | P1 |
| `CalorieEstimator.tsx` | Output visual del cálculo | P1 |

**Entregable:** formulario completo y funcional. El usuario puede completar los 7 pasos con sus datos reales.

---

### Fase 7 — Resumen, IA y resultados (Días 17–20)

Objetivo: paso 7 completo + integración con Claude + página de resultados.

| Tarea | Descripción | Prioridad |
|---|---|---|
| Step 7 (resumen) | SummaryCards editables + CalorieEstimator | P0 |
| `promptBuilder.ts` | FormData → prompt estructurado | P0 |
| `useDietGenerator` | Llamada a API + streaming de respuesta | P0 |
| `GeneratingState.tsx` | UI de carga con pasos animados | P0 |
| Ruta `/resultados` | Página de resultados | P0 |
| `DietPlan.tsx` | Renderiza el markdown del plan | P0 |
| `WeeklyMenu.tsx` | Vista semanal del menú generado | P1 |
| Panel lateral desktop | `ContextualPanel.tsx` con contenido por paso | P2 |
| `SkeletonCard.tsx` | Placeholders de carga en resultados | P2 |
| Auditoría accesibilidad formulario | axe DevTools, focus management | P0 |
| Lighthouse audit formulario | Score > 90 | P0 |

**Entregable:** flujo completo funcionando end-to-end: formulario → IA → plan de dieta.

---

### Resumen visual del roadmap completo

```
Día 1-2      Día 3-4      Día 5-7      Día 8-10
──────────   ──────────   ──────────   ──────────
Fase 1       Fase 2       Fase 3       Fase 4
Landing      Hero+ATF     Contenido    QA+Mobile
fundaciones              completo     landing

Día 11-12    Día 13-16    Día 17-20
──────────   ──────────   ──────────
Fase 5       Fase 6       Fase 7
Form         Inputs       Resumen
infraest.    + Pasos      + IA
                          + Results
```

---

## 25. Acceptance Criteria

### AC-F01 — Progreso y Navegación

| ID | Criterio | Verificación |
|---|---|---|
| AC-F01-01 | La barra de progreso refleja el paso actual en todo momento | Manual |
| AC-F01-02 | El porcentaje de progreso se actualiza al avanzar y retroceder | Manual |
| AC-F01-03 | El botón "Siguiente" está deshabilitado hasta completar campos obligatorios | Manual |
| AC-F01-04 | El botón "Anterior" siempre está visible y habilitado desde el paso 2 | Manual |
| AC-F01-05 | Al avanzar, la animación es slide desde la derecha | Manual |
| AC-F01-06 | Al retroceder, la animación es slide desde la izquierda | Manual |
| AC-F01-07 | Los datos se conservan al volver a un paso anterior | Manual |
| AC-F01-08 | En el paso 7, los botones de edición llevan al paso correcto | Manual |
| AC-F01-09 | `Enter` en el último input del paso avanza al siguiente | Manual teclado |

---

### AC-F02 — Paso 1 (Datos físicos)

| ID | Criterio | Verificación |
|---|---|---|
| AC-F02-01 | El IMC se calcula y muestra en tiempo real al cambiar peso o altura | Manual |
| AC-F02-02 | El IMC nunca muestra lenguaje valorativo negativo | Revisión editorial |
| AC-F02-03 | Los sliders actualizan el valor numérico en tiempo real | Manual |
| AC-F02-04 | El input numérico de edad acepta solo enteros entre 16 y 90 | Manual |
| AC-F02-05 | Seleccionar sexo biológico actualiza el estado del formulario | Manual + DevTools |
| AC-F02-06 | Sin sexo seleccionado, el botón "Siguiente" está deshabilitado | Manual |

---

### AC-F03 — Paso 2 (Actividad)

| ID | Criterio | Verificación |
|---|---|---|
| AC-F03-01 | Solo se puede seleccionar una card de nivel de actividad a la vez | Manual |
| AC-F03-02 | La card seleccionada muestra borde verde y fondo verde pálido | Visual |
| AC-F03-03 | Los chips de tipo de ejercicio son multi-selección independiente | Manual |
| AC-F03-04 | El campo de tipo de ejercicio es claramente marcado como opcional | Visual |

---

### AC-F04 — Paso 3 (Objetivos)

| ID | Criterio | Verificación |
|---|---|---|
| AC-F04-01 | Se pueden seleccionar hasta 3 objetivos | Manual |
| AC-F04-02 | El primer objetivo seleccionado se marca como "Principal" | Visual |
| AC-F04-03 | El selector de ritmo solo aparece si el objetivo incluye perder/ganar peso | Manual |
| AC-F04-04 | Sin ningún objetivo seleccionado, "Siguiente" está deshabilitado | Manual |

---

### AC-F05 — Paso 4 (Restricciones)

| ID | Criterio | Verificación |
|---|---|---|
| AC-F05-01 | Los chips de alergia tienen estilo visual diferenciado (rojo pálido) | Visual |
| AC-F05-02 | El TagInput añade alimentos con Enter y los elimina con × | Manual |
| AC-F05-03 | El TagInput no acepta más de 15 alimentos | Manual |
| AC-F05-04 | Las alergias seleccionadas se transmiten correctamente al prompt de la IA | Code review + test |
| AC-F05-05 | El paso puede completarse sin seleccionar nada (usuario sin restricciones) | Manual |

---

### AC-F06 — Paso 5 (Preferencias)

| ID | Criterio | Verificación |
|---|---|---|
| AC-F06-01 | El grid de cocinas muestra las 12 opciones correctamente | Visual |
| AC-F06-02 | El slider de picante tiene 4 posiciones con etiquetas legibles | Visual |
| AC-F06-03 | Las cocinas seleccionadas muestran estado selected claramente | Visual |
| AC-F06-04 | El paso puede completarse sin seleccionar cocinas (campo no obligatorio) | Manual |

---

### AC-F07 — Paso 6 (Hábitos)

| ID | Criterio | Verificación |
|---|---|---|
| AC-F07-01 | El stepper de comidas muestra descripción contextual actualizada | Manual |
| AC-F07-02 | El número de time pickers se ajusta al número de comidas seleccionado | Manual |
| AC-F07-03 | Las opciones de adaptación de cocina aparecen solo cuando se selecciona "Rara vez" | Manual |
| AC-F07-04 | Al menos una opción de presupuesto siempre está seleccionada (default) | Manual |

---

### AC-F08 — Paso 7 (Resumen)

| ID | Criterio | Verificación |
|---|---|---|
| AC-F08-01 | Todos los datos introducidos aparecen en el resumen | Manual |
| AC-F08-02 | El cálculo calórico estimado es correcto (fórmula Harris-Benedict) | Unit test |
| AC-F08-03 | Cada SummaryCard tiene botón de edición funcional | Manual |
| AC-F08-04 | El botón "Generar" muestra estado loading hasta recibir respuesta de la IA | Manual |
| AC-F08-05 | El estado de carga muestra los pasos de progreso animados | Visual |
| AC-F08-06 | Si la IA falla, se muestra un mensaje de error con opción de reintentar | Manual (mock error) |

---

### AC-F09 — Validación y Errores

| ID | Criterio | Verificación |
|---|---|---|
| AC-F09-01 | Los errores aparecen on blur, no on change | Manual |
| AC-F09-02 | Al pulsar "Siguiente" con errores, el scroll sube al primer error | Manual |
| AC-F09-03 | Los errores desaparecen en cuanto el campo se corrige | Manual |
| AC-F09-04 | Los mensajes de error son descriptivos y en español | Revisión editorial |
| AC-F09-05 | Ningún mensaje de error es técnico o intimidante | Revisión editorial |

---

### AC-F10 — Mobile

| ID | Criterio | Verificación |
|---|---|---|
| AC-F10-01 | El formulario es completamente usable en viewport de 375px | DevTools + manual mobile |
| AC-F10-02 | Los botones Anterior/Siguiente son sticky en el footer en mobile | Manual |
| AC-F10-03 | Los chips y cards tienen altura mínima de 48px (target táctil) | DevTools |
| AC-F10-04 | El teclado virtual no oculta el input activo (scroll automático) | Manual iOS + Android |
| AC-F10-05 | El panel lateral contextual no se muestra en viewports < 1024px | DevTools |

---

### AC-F11 — Accesibilidad

| ID | Criterio | Verificación |
|---|---|---|
| AC-F11-01 | El formulario es completamente navegable con Tab | Manual teclado |
| AC-F11-02 | Al cambiar de paso, el foco va al H1 del nuevo paso | Manual teclado |
| AC-F11-03 | Los chip groups tienen `role="group"` con `aria-label` descriptivo | axe |
| AC-F11-04 | La barra de progreso tiene `role="progressbar"` con `aria-valuenow` | axe |
| AC-F11-05 | Los errores de campo están vinculados con `aria-describedby` | axe |
| AC-F11-06 | Las animaciones se desactivan con `prefers-reduced-motion` | DevTools emulation |
| AC-F11-07 | No hay errores en axe DevTools (zero violations) | axe DevTools |

---

### AC-F12 — Performance y Calidad del Prompt

| ID | Criterio | Verificación |
|---|---|---|
| AC-F12-01 | Lighthouse Performance ≥ 90 en la ruta `/crear-dieta` | Lighthouse CI |
| AC-F12-02 | El prompt generado incluye todos los campos del formulario | Code review |
| AC-F12-03 | Las alergias aparecen siempre en el prompt, nunca se omiten | Unit test |
| AC-F12-04 | El plan generado respeta el número de comidas seleccionado | Manual + test |
| AC-F12-05 | El plan generado no incluye ningún alimento marcado como alergia | Manual + test |
| AC-F12-06 | El plan generado no incluye alimentos de la lista de "detesta" | Manual |

---

### Definición de Done (DoD) del formulario

Un paso o componente del formulario se considera **DONE** cuando:

- [ ] El código está en `main` y el deploy de Vercel está verde.
- [ ] Todos los AC específicos del paso/componente están verificados.
- [ ] No hay errores de TypeScript (`tsc --noEmit` limpio).
- [ ] No hay errores de axe DevTools en el componente.
- [ ] El componente funciona correctamente en 375px, 768px y 1280px.
- [ ] Los campos obligatorios bloquean "Siguiente" si están vacíos.
- [ ] Los datos del paso se conservan al navegar atrás y volver.
- [ ] Si tiene animaciones, funciona con `prefers-reduced-motion: reduce`.
- [ ] El valor del campo se refleja correctamente en el resumen del paso 7.

---

*Documento v1.0 — Generado para uso académico en bootcamp de desarrollo web.*
