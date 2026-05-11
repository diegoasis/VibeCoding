# AI_CONTEXT — NutriAI Landing

> Contexto optimizado para futuras sesiones de IA. Léelo completo antes de hacer cualquier modificación.

---

## 1. Cómo funciona el proyecto

### Propósito
Landing page de una sola página para NutriAI, un generador de dietas personalizadas con IA. Es **puramente promocional** — no hay backend, no hay autenticación, no hay generación real de dietas. Todo el contenido es simulado/mockup.

### Arquitectura en una línea
Landing estática, Next.js App Router, contenido tipado en `data/`, componentes desacoplados, animaciones con Framer Motion, estilos con Tailwind CSS v4.

### Estructura mental del proyecto

```
app/ (layout + page orchestrator)
  → components/sections/ (7 secciones + header + footer)
    → components/ui/ (7 componentes atómicos reutilizables)
      → data/ (contenido fuente de verdad)
      → hooks/ (lógica reutilizable)
      → types/ (contratos TypeScript)
```

### Flujo de modificación típico

1. **Cambiar texto:** solo tocar archivos en `data/` (features.ts, steps.ts, testimonials.ts, social-proof.ts)
2. **Cambiar estilos:** modificar `app/globals.css` (tokens `@theme inline`) o clases Tailwind directamente en componentes
3. **Añadir sección:** crear componente en `components/sections/`, importarlo en `app/page.tsx`
4. **Añadir UI component:** crear en `components/ui/`, tipar props con `interface`
5. **Añadir animación:** usar Framer Motion + `useInView` hook para scroll-triggered

---

## 2. Decisiones importantes

### Tailwind v4 — NO hay tailwind.config.ts
Tailwind CSS v4 configura los design tokens dentro de `app/globals.css:3-37` usando la directiva `@theme inline`. No existe ni debe crearse `tailwind.config.ts` ni `tailwind.config.js`. Las clases se escriben igual que en v3.

### App Router estricto
No hay `pages/` directory, no hay `_app.tsx`, no hay `_document.tsx`. Todo vive en `app/`. El layout es `app/layout.tsx` y la página es `app/page.tsx`.

### clsx sin tailwind-merge
La función `cn()` en `lib/utils.ts` usa solo `clsx`, no `tailwind-merge`. No hay conflictos de clases porque el proyecto no combina clases conflicting. Si se añade `tailwind-merge`, mantener la misma firma.

### "use client" solo donde es necesario
Los componentes sin estado, eventos, o animaciones NO llevan `"use client"`. Esto incluye `Footer.tsx`, `FeatureCard.tsx`, `StepCard.tsx`, `TestimonialCard.tsx`, `SkeletonCard.tsx`, `Badge.tsx`, `Button.tsx`.

### Sin imágenes next/image
La imagen del hero en `HeroSection.tsx:97` usa un `<img>` HTML nativo, no `<Image>` de Next.js. Esto es una deuda técnica — idealmente debería migrarse a `next/image` para optimización automática.

### SSG no implementado
Aunque el proyecto es 100% estático (sin fetching, sin API routes, sin datos dinámicos), no usa `generateStaticParams` ni `output: 'export'`. La metadata está hardcodeada en `layout.tsx:19-26`.

---

## 3. Partes delicadas

### ⚠️ AGENTS.md — Next.js 16 tiene breaking changes
`AGENTS.md` advierte que esta versión de Next.js (16.2.6) puede tener APIs y convenciones diferentes a versiones anteriores de tu training data. **No asumas nada.** Revisa `node_modules/next/dist/docs/` antes de escribir código nuevo.

### ⚠️ HeroSection — mockup image path hardcodeado
La imagen del mockup en `HeroSection.tsx:97` apunta a `"/images/ChatGPT Image May 11, 2026 at 10_05_56 PM.png"`. Este path es frágil: tiene espacios y es específico de ChatGPT. Si se reemplaza la imagen, actualizar ambas referencias (src + alt text).

### ⚠️ MobileDrawer — body scroll lock manual
`MobileDrawer.tsx:16-25` maneja el scroll lock del body modificando `document.body.style.overflow` directamente en un `useEffect`. Si se añade más de un drawer/modal al proyecto, este enfoque puede causar conflictos. Considerar usar un hook centralizado si la complejidad crece.

### ⚠️ TransformBlock — datos hardcodeados
A diferencia de otras secciones que leen de `data/`, `TransformBlock.tsx:6-18` tiene los arrays `before` y `after` hardcodeados dentro del componente. Si se necesita cambiar estos textos, hay que modificar el componente, no un archivo de datos.

### ⚠️ StickyMobileCTA — sin cleanup robusto
`StickyMobileCTA.tsx:10-16` añade un event listener scroll pero no llama a `handleScroll` inicialmente para establecer el estado correcto en SSR/hidratación. Podría mostrar el CTA momentáneamente si el servidor renderiza con un scrollY distinto.

### ⚠️ ESLint — config moderna con `eslint.config.mjs`
Usa el nuevo flat config system de ESLint 9 (`eslint.config.mjs`), no el tradicional `.eslintrc.*`. Las reglas se importan desde `eslint-config-next/core-web-vitals` y `eslint-config-next/typescript`.

---

## 4. Patrones del proyecto

### Patrón de sección con scroll animation
Todas las sections siguen este patrón exacto:
```tsx
"use client";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

export default function SectionName() {
  const { ref, isInView } = useInView({ threshold: 0.3, triggerOnce: true });
  return (
    <section ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {/* contenido */}
      </motion.div>
    </section>
  );
}
```

### Patrón de ui component
Todos los UI components siguen:
- Props tipadas con `interface`
- `className?: string` como prop opcional
- `cn()` para merging de clases
- Sin `"use client"` a menos que tengan estado o efectos
- Sin lógica de negocio — solo presentación

### Patrón de data
```ts
// data/features.ts
import { IconName } from "lucide-react";
import { Feature } from "@/types/feature";

export const features: Feature[] = [
  { icon: IconName, title: "...", description: "..." },
];
```

### Naming de anclas
Las secciones navegables usan `id` en el `<section>`: `#como-funciona`, `#funciones`, `#testimonios`. Estos IDs son referenciados por los links en Navbar y MobileDrawer.

---

## 5. Cómo continuar el desarrollo

### Prioridades (ver TODO.md para detalle)
1. **P0:** Migrar imagen a `next/image`, añadir `next/font` local, implementar SSG
2. **P1:** Centralizar datos de TransformBlock en `data/`, conectar CTA a app real
3. **P2:** SEO (sitemap, robots.txt), esquema JSON-LD, tests, CI/CD, prefer-reduced-motion

### Qué NO romper
- **NO** eliminar `"use client"` de componentes que usan hooks
- **NO** añadir `tailwind.config.ts` — los tokens están en `globals.css` en v4
- **NO** cambiar la firma de `cn()` — está importada en ~15 archivos
- **NO** modificar los IDs de sección sin actualizar los links en Navbar y MobileDrawer
- **NO** reemplazar framer-motion sin reescribir todas las animaciones
- **NO** añadir dependencias pesadas sin evaluar bundle impact (target: <120kb gzipped)

### Cómo verificar que todo funciona
```bash
cd nutriai-landing
npm run build     # Build completo + type checking
npm run lint      # ESLint
npm run dev       # Probar en localhost:3000
```

---

## 6. Flujo mental del proyecto

```
VISITANTE LLEGA
    │
    ▼
  HeroSection        → "¿Qué es esto?" (10s)
    │                    H1 + mockup + CTA
    ▼
  SocialProofBar     → "¿Esto es confiable?" (5s)
    │                    estrellas + contador + badges
    ▼
  TransformBlock     → "¿Realmente necesito esto?" (10s)
    │                    dolor vs beneficio emocional
    ▼
  HowItWorks         → "¿Cómo funciona?" (15s)
    │                    3 pasos simples
    ▼
  FeaturesGrid       → "¿Qué ofrece exactamente?" (20s)
    │                    6 tarjetas de features
    ▼
  Testimonials       → "¿A otras personas les funciona?" (15s)
    │                    casos reales (simulados)
    ▼
  CTABanner          → CONVERSIÓN: "Ok, lo quiero probar"
                        CTA + trust signals
```

---

## 7. Estado actual del proyecto

### Completado
- ✅ Estructura completa del proyecto
- ✅ 7 secciones + layout components implementadas
- ✅ Animaciones Framer Motion en todas las secciones
- ✅ Diseño responsive (mobile/tablet/desktop)
- ✅ Design tokens en Tailwind v4
- ✅ Tipado estricto TypeScript
- ✅ ESLint configurado

### Deuda técnica conocida
- Imagen hero usa `<img>` en vez de `next/image`
- Sin soporte `prefers-reduced-motion`
- Sin SSG/static export
- TransformBlock con datos hardcodeados
- Sin tests
- Sin sitemap/robots.txt
- Sin esquema JSON-LD para SEO
- CTA no conectado a ninguna app real (botones sin href funcional)

---

## 8. Contexto de negocio y producto

### Qué es NutriAI
Generador de dietas personalizadas con IA. El usuario responde un cuestionario (datos físicos, objetivos, preferencias, restricciones) y recibe un plan nutricional semanal completo con calorías calculadas y lista de la compra.

### Target
- **Primario:** 20-45 años, quieren mejorar su alimentación sin nutricionista
- **Secundario:** Fitness/rendimiento
- **Terciario:** Restricciones alimentarias (celíacos, veganos, alergias)

### Posicionamiento
Entre Headspace (wellness, cercano) y un SaaS moderno (precisión, confianza). NO clínico, NO fitness agresivo. "Inteligente y cercana."

### Promesa de marca
"NutriAI no vende una dieta, vende claridad, control y simplicidad."

### Copywriting clave
- H1: "Tu dieta perfecta, diseñada por IA en 2 minutos."
- CTA: "Crear mi dieta gratis"
- Cierre: "Empieza hoy. Tu mejor versión te espera."

### Nota importante
NutriAI es actualmente un **concepto/producto mockup**. No hay app funcionando detrás. La landing es un ejercicio de frontend/vibe coding. Esto puede cambiar en el futuro.
