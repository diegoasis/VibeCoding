# NutriAI — Documento Técnico · Landing Page v3.0

**Proyecto:** NutriAI — Generador de dietas personalizadas con IA  
**Tipo:** Landing page promocional  
**Contexto:** Bootcamp de vibe coding — ejercicio frontend  
**Versión:** 3.0 (revisión final — 20 bloques técnicos)

---

## 1. Propósito y Objetivos

Convertir visitantes en usuarios de NutriAI comunicando claramente qué es, para quién y por qué vale la pena probarlo.

- Explicar el producto en menos de 10 segundos.
- Generar confianza mostrando el proceso.
- Captar leads o redirigir al usuario a la app.
- Ser responsive y optimizada para móvil.

---

## 2. Público Objetivo

| Perfil | Descripción |
|---|---|
| Primario | 20–45 años, quieren mejorar su alimentación sin contratar un nutricionista. |
| Secundario | Usuarios fitness con objetivos de rendimiento o composición corporal. |
| Terciario | Personas con restricciones (celíacos, veganos, alergias) que necesitan planes adaptados. |

---

## 3. Transformación del Usuario

El copywriting de toda la landing gira en torno a esta transformación emocional:

| Antes ❌ | Después ✅ |
|---|---|
| Dietas genéricas | Claridad total |
| Confusión nutricional | Plan personalizado |
| Falta de tiempo | Sensación de control |
| Frustración y abandono | Alimentación sencilla |

> **Promesa:** NutriAI no vende una dieta, vende claridad, control y simplicidad.

---

## 4. Identidad Visual SaaS

Definir el "feeling" del producto frente a referencias del mercado:

| Referencia | Estilo | NutriAI toma de aquí |
|---|---|---|
| Headspace | Orgánico, wellness, cercano | Tono emocional, paleta natural |
| Linear | Oscuro, minimal, técnico | Precisión tipográfica, densidad de datos |
| Stripe | Ultra clean, corporativo | Confianza, tablas de datos limpias |
| Notion | Neutro, editorial | Espacios en blanco, jerarquía clara |
| MyFitnessPal | Fitness utilitario | Lo que NutriAI **NO** debe ser |

> **Conclusión:** NutriAI se posiciona entre Headspace y un SaaS wellness moderno. Inteligente y cercana, nunca clínica ni fitness agresiva.

### Personalidad de marca

| Dimensión | SÍ | NO |
|---|---|---|
| Tono | Cercano, directo, motivador | Clínico, técnico, frío |
| Estética | Wellness moderno, startup SaaS | Fitness agresivo, farmacia |
| Lenguaje | Sencillo, primera persona | Jerga médica, acrónimos |
| IA | Inteligente, personalizada | Robótica, impersonal |

---

## 5. Estructura de la Página (7 secciones)

### 5.1 Hero
- **H1:** *"Tu dieta perfecta, diseñada por IA en 2 minutos."*
- **H2** que amplía con contexto de la app.
- **CTA principal:** `Crear mi dieta gratis` / Secundario: *Ver cómo funciona ↓*
- **Microcopy IA:** "Motor inteligente" · "Generado en segundos" · "Aprende de tus preferencias"

### 5.2 Barra de confianza
- Badges visuales de indicadores de confianza (no logos ficticios).
- Contadores: +15.000 dietas generadas · 4.9/5 valoración media.

### 5.3 Problema / Solución
- **Bloque A — Problema:** dietas genéricas, nutricionistas caros, apps tediosas.
- **Bloque B — Solución:** cómo la IA resuelve cada punto de dolor.

### 5.4 Cómo funciona (3 pasos)
- Paso 1: Cuéntanos sobre ti — Paso 2: Define objetivos — Paso 3: Recibe tu plan.
- Numeración grande. Línea conectora en desktop. Apilado vertical en móvil.

### 5.5 Features (6 tarjetas)
- Personalización total · Plan semanal completo · Calorías calculadas
- Sin restricciones ignoradas · Lista de la compra · Gratis para empezar

### 5.6 Testimonios
- 3 tarjetas: avatar + cita + nombre + estrellas. Carrusel en móvil.

### 5.7 CTA Final
- **Titular:** *"Empieza hoy. Tu mejor versión te espera."*
- **Botón:** `Crear mi dieta personalizada →`
- Nota de confianza: Sin tarjeta de crédito · Datos seguros.

---

## 6. Hero — Arquitectura Visual

**Composición desktop (ratio 45/55):** izquierda texto + derecha mockup con overlay cards.

### Hero background
- Gradient radial verde oscuro → crema (centro → bordes).
- Noise texture muy sutil (opacity 0.03) para profundidad orgánica.
- Blobs orgánicos desenfocados en verde pálido como elemento decorativo.

### Overlay cards sobre el mockup

| Overlay card | Contenido |
|---|---|
| Calorías | 2.200 kcal / día calculadas |
| Macros | 140g proteína · 220g carbos · 60g grasa |
| Restricción | Dieta vegetariana |
| Objetivo | Perder grasa · -0.5 kg/semana |

**Composición mobile:** Texto arriba → CTA → Mockup debajo.

---

## 7. Wireframes de Referencia

### Hero — Desktop
```
┌─────────────────────────────────────────────────────────┐
│  NAVBAR                                           [CTA]  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   H1 + H2 + CTA        │   Mockup app                  │
│   (45%)                │   + overlay cards  (55%)      │
│                        │   [ 2200kcal ] [ Vegetariano ] │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  ★★★★★ 4.9/5  ·  +15.000 dietas  ·  Badges confianza  │
└─────────────────────────────────────────────────────────┘
```

### Features — Desktop (3 columnas)
```
┌─────────────────────────────────────────────────────────┐
│           Título sección + subtítulo                    │
├─────────────────┬───────────────────┬───────────────────┤
│  Feature card 1 │  Feature card 2   │  Feature card 3   │
│  [icono]        │  [icono]          │  [icono]          │
│  Título         │  Título           │  Título           │
│  Descripción    │  Descripción      │  Descripción      │
├─────────────────┼───────────────────┼───────────────────┤
│  Feature card 4 │  Feature card 5   │  Feature card 6   │
└─────────────────┴───────────────────┴───────────────────┘
```

### Hero — Mobile
```
┌─────────────────────┐
│  NAVBAR      [≡]    │
├─────────────────────┤
│                     │
│   H1 + H2           │
│                     │
│  [ Crear mi dieta ] │
│                     │
│   Mockup app        │
│                     │
└─────────────────────┘
[ Crear mi dieta → ]   ← sticky CTA inferior
```

---

## 8. Paleta de Colores

| Rol | Nombre | Hex |
|---|---|---|
| Principal (brand) | Verde esmeralda | `#1D9E75` |
| Principal oscuro | Verde bosque | `#0F6E56` |
| Acento | Verde menta | `#5DCAA5` |
| Fondo claro | Crema / off-white | `#F9F6F0` |
| Texto principal | Casi negro | `#1A1A1A` |
| Texto secundario | Gris medio | `#6B7280` |
| Superficie tarjeta | Blanco | `#FFFFFF` |

---

## 9. Tipografía e Iconografía

| Uso | Familia | Peso |
|---|---|---|
| Títulos H1/H2 | Fraunces (display) | Bold 700 |
| Subtítulos H3 | Plus Jakarta Sans | SemiBold 600 |
| Cuerpo | Plus Jakarta Sans | Regular 400 |
| Labels / badges | Plus Jakarta Sans | Medium 500 |

**Iconografía:** Lucide Icons — estilo Outline / Minimal / Rounded. Tamaño estándar 20px, decorativo 24px.

**Imágenes:** mockups minimalistas estilo wellness. Sin fotos de stock. Ilustraciones SVG limpias o capturas del producto con overlay de datos.

---

## 10. Grid System

| Breakpoint | Columnas | Gutter | Max-width |
|---|---|---|---|
| Desktop (>1024px) | 12 columnas | 24px | 1280px |
| Tablet (768–1024px) | 8 columnas | 20px | 960px |
| Mobile (<768px) | 4 columnas | 16px | 100% |

**Usos típicos:** Hero texto 5 cols / visual 7 cols. Features 4 cols c/u. Testimonios 4 cols c/u.

---

## 11. Sistema de Spacing y Sombras

### Spacing

| Propiedad | Valor |
|---|---|
| Container max-width | 1280px |
| Padding H mobile / tablet / desktop | 24px / 40px / 80px |
| Sección vertical desktop / mobile | 120px / 72px |
| Gap entre tarjetas | 24px |
| Border-radius tarjetas | 16px |

### Shadow system

| Elemento | CSS `box-shadow` |
|---|---|
| Card default | `0 4px 12px rgba(0,0,0,0.06)` |
| Card hover | `0 10px 24px rgba(0,0,0,0.10)` |
| Hero overlay cards | `0 20px 40px rgba(0,0,0,0.12)` |
| Navbar scroll | `0 2px 8px rgba(0,0,0,0.08)` |

---

## 12. Navegación Mobile

| Elemento | Comportamiento |
|---|---|
| Hamburger menu | Icono 3 líneas top-right. Animación a X al abrir. |
| Drawer | Fullscreen overlay. Links apilados, CTA al final. Cierra con X o tap fuera. |
| Sticky CTA mobile | Botón fijo en bottom: "Crear mi dieta gratis". Aparece tras pasar el hero. |
| Navbar scroll | Background blur + sombra sutil al hacer scroll. |

---

## 13. Estados UI y Microinteracciones

| Elemento | Estado | Comportamiento |
|---|---|---|
| Botón CTA | Hover | `scale(1.02)` + darken bg 5% |
| Botón CTA | Active | `scale(0.98)` |
| Botón CTA | Focus | Outline verde 2px accesible |
| Botón CTA | Loading | Spinner + "Generando..." |
| Botón CTA | Disabled | Opacity 0.4 + cursor not-allowed |
| Feature card | Hover | `translateY(-4px)` + sombra card hover |
| Testimonio | Hover | Border verde 1px + transición suave |
| Nav link | Active | Color verde + underline animado |

**Transition global:** `200ms ease` para todos los estados interactivos.

---

## 14. Empty States y Loading

| Estado | Elemento | Descripción |
|---|---|---|
| Loading | Skeleton loaders | Placeholders animados (shimmer) para cards y dashboard. |
| Loading | Placeholder dashboard | Versión grisada del mockup mientras carga la preview. |
| Disabled | CTA deshabilitado | Botón disabled hasta completar los campos del formulario. |
| Error | Toast de error | Mensaje inline si falla la generación de la dieta. |
| Éxito | Confirmation state | Animación de check + mensaje de confirmación al generar. |

---

## 15. Motion Design

| Efecto | Aplicación | Config |
|---|---|---|
| Fade-up on scroll | Todas las secciones al entrar en viewport | Intersection Observer, 60px offset |
| Floating animation | Overlay cards del mockup hero | `translateY(-8px)`, 3s infinite ease |
| Parallax sutil | Visual del hero al hacer scroll | `translateY(scrollY * 0.15)` |
| CTA pulse | Botón principal en idle | scale 1.0–1.03, 2s infinite ease |
| Stagger reveal | Features grid — cascada de cards | delay 100ms por tarjeta |
| Counter animation | Social proof (+15.000, 4.9/5) | countUp 1.5s ease-out |
| Smooth scrolling | Navegación por anclas | `scroll-behavior: smooth` |

**Librería:** Framer Motion (Next.js). Para HTML vanilla: CSS `@keyframes` + Intersection Observer API.

---

## 16. Accesibilidad Avanzada

| Categoría | Requisito | Implementación |
|---|---|---|
| Color | Contraste mínimo AA | 4.5:1 texto normal / 3:1 texto grande |
| Motion | `prefers-reduced-motion` | Desactivar parallax y animaciones si el usuario lo prefiere |
| Teclado | Visible keyboard focus | Focus ring verde visible en todos los elementos interactivos |
| Semántica | Semantic landmarks | `header`, `main`, `nav`, `section`, `footer` correctamente usados |
| Live regions | `aria-live` para loading | Anunciar cambios de estado al generar la dieta |
| Imágenes | Alt text descriptivo | Todas las imágenes con `alt` significativo o `alt=""` si decorativas |
| Formularios | Labels explícitos | Cada input asociado a su label con `for`/`id` |

---

## 17. Componentes UI Clave

| Componente | Descripción |
|---|---|
| `<HeroSection>` | Titular, subtítulo, CTA, background radial + blob, mockup y overlay cards. |
| `<SocialProofBar>` | Badges de confianza + contadores animados. |
| `<TransformBlock>` | Panel Antes/Después con estado emocional. |
| `<StepCard>` | Icono Lucide + número grande + título + descripción. |
| `<FeatureCard>` | Icono + título + descripción. Hover con sombra y elevación. |
| `<TestimonialCard>` | Avatar + cita + nombre + estrellas. |
| `<CTABanner>` | Bloque de conversión final con nota de confianza. |
| `<Navbar>` | Sticky con blur, logo y botón CTA. Hamburger en mobile. |
| `<MobileDrawer>` | Fullscreen overlay con links y CTA. Animación slide-in. |
| `<StickyMobileCTA>` | Botón fijo inferior en mobile. Aparece tras el hero. |
| `<SkeletonCard>` | Placeholder shimmer para estados de carga. |
| `<Footer>` | Links, mini CTA newsletter, badges de seguridad y copyright. |

---

## 18. Comportamiento Responsive

| Breakpoint | Layout |
|---|---|
| Mobile (<768px) | 1 col. Hero centrado. Steps apilados. Features 1 col. Drawer + sticky CTA. |
| Tablet (768–1024px) | 2 cols features. Steps en fila. Navbar completa. |
| Desktop (>1024px) | Layout completo. Steps con línea conectora. Features 3 cols. Hero 45/55. |

---

## 19. Stack Técnico Recomendado

| Capa | Tecnología | Por qué |
|---|---|---|
| Framework | Next.js 14 | SSR, SEO, routing, App Router moderno |
| Estilos | Tailwind CSS | Utility-first, rápido, responsive, profesional |
| Animaciones | Framer Motion | Motion design de nivel startup |
| Iconos | Lucide Icons | Outline, minimal, consistente con la marca |
| Fuentes | Google Fonts | Fraunces + Plus Jakarta Sans |
| Deploy | Vercel | 1-click deploy, preview URLs, gratis para portfolio |

---

## 20. Métricas de Éxito y Performance

### Conversión y engagement

| Métrica | Objetivo |
|---|---|
| Conversión CTA | > 5% de visitantes hacen clic en "Crear mi dieta" |
| Tiempo en página | > 60 segundos |
| Scroll depth | > 60% llegan a features |
| Bounce rate | < 55% |

### Performance (Lighthouse)

| Métrica | Objetivo | Descripción |
|---|---|---|
| Lighthouse score | > 90 | Performance general |
| LCP | < 2.5s | Largest Contentful Paint — carga del hero |
| CLS | < 0.1 | Cumulative Layout Shift — estabilidad visual |
| FID / INP | < 200ms | Interactividad y respuesta a inputs |
| Accesibilidad | > 95 | Contraste, aria-labels, teclado |

---

*Documento v3.0 — Generado para uso académico en bootcamp de desarrollo web.*

---

## 21. Visión Técnica

### Filosofía de desarrollo

NutriAI Landing se construye siguiendo tres principios técnicos no negociables:

1. **Performance-first:** cada decisión de implementación se evalúa contra los objetivos Lighthouse. Si una animación baja el score por debajo de 90, se simplifica o elimina.
2. **Component-driven:** toda la UI se construye como árbol de componentes reutilizables, con responsabilidad única y props bien tipadas. Ningún componente mezcla lógica de negocio con presentación.
3. **Accesibilidad como requisito, no como añadido:** los criterios WCAG AA se verifican desde el primer commit, no en la fase de QA final.

### Principios de arquitectura

- **Separación de capas:** datos / lógica / presentación completamente desacoplados.
- **Zero runtime CSS:** Tailwind purga clases no usadas en build. CSS bundle < 10kb en producción.
- **Islands of interactivity:** las secciones estáticas (hero, features, testimonios) se renderizan en servidor (SSR/SSG). Solo los componentes con estado real (drawer, formulario, contador animado) usan React client components.
- **Tipado estricto:** TypeScript en modo `strict`. Sin `any`. Interfaces para todas las props de componentes.
- **Sin dependencias innecesarias:** cada librería añadida al proyecto debe justificar su peso en bundle. Target: bundle JS < 120kb gzipped.

### Modelo mental del proyecto

```
Landing Page NutriAI
│
├── Capa de presentación        → Componentes React / Next.js
│   ├── Secciones (pages)       → app/page.tsx
│   └── UI components           → components/ui/
│
├── Capa de datos / contenido   → data/ (arrays de features, testimonios, pasos)
│   └── Tipado con TypeScript   → types/
│
├── Capa de estilos             → Tailwind CSS + CSS custom properties
│   └── Design tokens           → tailwind.config.ts
│
└── Capa de infraestructura     → Vercel (deploy) + GitHub (CI/CD)
```

---

## 22. Arquitectura del Proyecto

### Estructura de carpetas

```
nutriai-landing/
│
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fuentes, metadata global)
│   ├── page.tsx                  # Página principal (composición de secciones)
│   └── globals.css               # CSS base + custom properties
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Sticky navbar con blur
│   │   ├── MobileDrawer.tsx      # Fullscreen overlay mobile
│   │   ├── StickyMobileCTA.tsx   # Botón fijo inferior mobile
│   │   └── Footer.tsx            # Footer con links y newsletter
│   │
│   ├── sections/
│   │   ├── HeroSection.tsx       # Hero principal (45/55)
│   │   ├── SocialProofBar.tsx    # Barra de confianza con contadores
│   │   ├── TransformBlock.tsx    # Panel Antes/Después
│   │   ├── HowItWorks.tsx        # 3 pasos con línea conectora
│   │   ├── FeaturesGrid.tsx      # Grid de 6 feature cards
│   │   ├── Testimonials.tsx      # 3 testimonios / carrusel mobile
│   │   └── CTABanner.tsx         # CTA final de conversión
│   │
│   └── ui/
│       ├── Button.tsx            # Botón con variantes (primary, secondary, ghost)
│       ├── FeatureCard.tsx       # Tarjeta de feature reutilizable
│       ├── StepCard.tsx          # Tarjeta de paso numerado
│       ├── TestimonialCard.tsx   # Tarjeta de testimonio
│       ├── SkeletonCard.tsx      # Placeholder shimmer
│       ├── Badge.tsx             # Badge/pill de confianza
│       └── CounterNumber.tsx     # Número animado con countUp
│
├── data/
│   ├── features.ts               # Array de las 6 features
│   ├── steps.ts                  # Array de los 3 pasos
│   ├── testimonials.ts           # Array de los 3 testimonios
│   └── social-proof.ts           # Datos de badges y contadores
│
├── types/
│   ├── feature.ts                # Interface Feature
│   ├── step.ts                   # Interface Step
│   └── testimonial.ts            # Interface Testimonial
│
├── hooks/
│   ├── useScrolled.ts            # Detecta scroll para navbar
│   ├── useInView.ts              # Intersection Observer wrapper
│   └── useCountUp.ts             # Hook animación de contador
│
├── lib/
│   └── utils.ts                  # cn() helper, formatters
│
├── public/
│   ├── images/
│   │   ├── mockup-desktop.webp   # Mockup del dashboard
│   │   └── mockup-mobile.webp    # Mockup versión mobile
│   └── fonts/                    # Fuentes self-hosted (opcional)
│
├── tailwind.config.ts            # Design tokens personalizados
├── next.config.ts                # Configuración Next.js
└── tsconfig.json                 # TypeScript strict mode
```

### Convenciones de código

- **Naming:** componentes en `PascalCase`, hooks en `camelCase` con prefijo `use`, utilidades en `camelCase`.
- **Exports:** un componente por archivo. Export default para componentes, named exports para utils y tipos.
- **Props:** siempre tipadas con `interface`. No usar `type` para props de componentes.
- **Comentarios:** solo cuando el "por qué" no es obvio. El código se documenta solo con buenos nombres.
- **Tailwind:** clases ordenadas con `prettier-plugin-tailwindcss`. Variantes responsivas siempre al final.

### Flujo de datos

```
data/ (arrays estáticos tipados)
    ↓
page.tsx (importa datos, pasa como props)
    ↓
Section components (reciben datos, renderizan UI)
    ↓
UI components (presentación pura, sin lógica)
```

Los datos de contenido (features, testimonios, pasos) viven en `data/` como arrays tipados. Son la única fuente de verdad. Cambiar el contenido de la landing no requiere tocar ningún componente.

---

## 23. Stack Técnico — Detalle de Implementación

### Next.js 14 — App Router

```typescript
// app/layout.tsx
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['700'],
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NutriAI — Tu dieta personalizada con IA en 2 minutos',
  description: 'Genera un plan nutricional a medida basado en tus datos físicos, objetivos y preferencias. Gratis.',
  openGraph: {
    title: 'NutriAI — Dietas personalizadas con IA',
    description: 'Plan nutricional a medida en 2 minutos.',
    image: '/og-image.png',
  },
}
```

**Estrategia de rendering:**
- `page.tsx` → `generateStaticParams` → SSG (máxima performance, contenido estático).
- Componentes con estado (drawer, contador, animaciones) → `'use client'` explícito y aislado.
- Imágenes con `next/image` obligatorio: lazy loading, sizing automático, formato WebP/AVIF.

### Tailwind CSS — Design tokens

```typescript
// tailwind.config.ts
const config: Config = {
  content: ['./app/**/*.tsx', './components/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1D9E75',
          dark:    '#0F6E56',
          mint:    '#5DCAA5',
          pale:    '#E1F5EE',
        },
        cream: '#F9F6F0',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body:    ['var(--font-body)', 'sans-serif'],
      },
      maxWidth: {
        container: '1280px',
      },
      boxShadow: {
        card:        '0 4px 12px rgba(0,0,0,0.06)',
        'card-hover':'0 10px 24px rgba(0,0,0,0.10)',
        overlay:     '0 20px 40px rgba(0,0,0,0.12)',
        navbar:      '0 2px 8px rgba(0,0,0,0.08)',
      },
      animation: {
        float:  'float 3s ease-in-out infinite',
        pulse2: 'pulse2 2s ease-in-out infinite',
        shimmer:'shimmer 1.5s infinite',
      },
      keyframes: {
        float:   { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        pulse2:  { '0%,100%': { transform: 'scale(1)' },      '50%': { transform: 'scale(1.03)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' },   '100%': { backgroundPosition: '200% 0' } },
      },
    },
  },
}
```

### Framer Motion — Patrones de animación

```typescript
// Fade-up on scroll (patrón base para todas las secciones)
const fadeUpVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// Stagger para grids de cards
const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
}

// prefers-reduced-motion: Framer Motion lo respeta automáticamente
// con useReducedMotion() hook
```

### Estructura de un componente tipo

```typescript
// components/ui/FeatureCard.tsx
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <motion.article
      variants={fadeUpVariants}
      className="group rounded-2xl bg-white p-6 shadow-card
                 transition-shadow duration-200 hover:shadow-card-hover
                 hover:-translate-y-1"
    >
      <div className="mb-4 inline-flex rounded-xl bg-brand-pale p-3">
        <Icon className="h-5 w-5 text-brand-dark" aria-hidden="true" />
      </div>
      <h3 className="mb-2 font-body text-base font-semibold text-gray-900">{title}</h3>
      <p className="font-body text-sm leading-relaxed text-gray-500">{description}</p>
    </motion.article>
  )
}
```

---

## 24. Roadmap de Desarrollo

El proyecto se divide en **4 fases** con entregables claros. Cada fase es funcional y deployable de forma independiente.

### Fase 1 — Fundaciones (Días 1–2)

Objetivo: proyecto funcionando en Vercel con estructura de carpetas, design tokens y componentes base.

| Tarea | Descripción | Prioridad |
|---|---|---|
| Init proyecto | `npx create-next-app@latest` con TypeScript + Tailwind + App Router | P0 |
| Design tokens | Configurar colores, fuentes, sombras y animaciones en `tailwind.config.ts` | P0 |
| Fuentes | Integrar Fraunces + Plus Jakarta Sans con `next/font` | P0 |
| CSS base | Variables globales, reset, `globals.css` | P0 |
| Estructura carpetas | Crear árbol de directorios completo | P0 |
| Deploy inicial | Conectar repo GitHub → Vercel. Preview URL funcionando | P0 |
| Navbar | Componente sticky con blur. Solo desktop en esta fase | P1 |
| Footer | Estructura básica con links y copyright | P1 |

**Entregable:** URL pública en Vercel con navbar, footer y página en blanco.

---

### Fase 2 — Hero y Above the Fold (Días 3–4)

Objetivo: la primera pantalla completa, animada y con CTA funcional.

| Tarea | Descripción | Prioridad |
|---|---|---|
| HeroSection | Layout 45/55 desktop, apilado mobile | P0 |
| Hero background | Gradient radial + noise texture + blobs SVG | P0 |
| Mockup visual | Placeholder del dashboard con overlay cards flotantes | P0 |
| Overlay cards | Cards animadas (float) con datos de ejemplo | P0 |
| CTA Button | Componente `Button` con todos los estados (hover, focus, active) | P0 |
| SocialProofBar | Badges de confianza + contadores estáticos | P1 |
| CounterNumber | Hook `useCountUp` + animación al entrar en viewport | P1 |
| Responsive hero | Verificar layout en 375px, 768px, 1280px, 1440px | P0 |

**Entregable:** hero section completa y animada, visible y correcta en todos los breakpoints.

---

### Fase 3 — Secciones de Contenido (Días 5–7)

Objetivo: landing page completa de arriba abajo, con todas las secciones y animaciones de scroll.

| Tarea | Descripción | Prioridad |
|---|---|---|
| TransformBlock | Panel Antes/Después con animación de entrada | P1 |
| HowItWorks | 3 StepCards con línea conectora SVG en desktop | P0 |
| FeaturesGrid | Grid 3 cols con stagger reveal y hover states | P0 |
| Testimonials | 3 TestimonialCards desktop + carrusel mobile | P1 |
| CTABanner | Sección final con nota de confianza | P0 |
| Fade-up global | Intersection Observer / Framer Motion en todas las secciones | P1 |
| Parallax hero | `scrollY` parallax sutil en el visual del hero | P2 |
| CTA pulse | Animación idle en el botón principal | P2 |
| Smooth scroll | Anclas de navegación funcionando | P1 |

**Entregable:** landing page completa, navegable de arriba abajo.

---

### Fase 4 — Mobile, Accesibilidad y Optimización (Días 8–10)

Objetivo: producto pulido, accesible, performante y listo para presentar.

| Tarea | Descripción | Prioridad |
|---|---|---|
| MobileDrawer | Hamburger + fullscreen overlay con animación | P0 |
| StickyMobileCTA | Botón fijo inferior, aparece tras el hero | P1 |
| SkeletonCard | Shimmer placeholders para estados de carga | P2 |
| Empty states | Toast de error + confirmation state | P2 |
| `prefers-reduced-motion` | Desactivar animaciones si el usuario lo prefiere | P0 |
| Auditoría accesibilidad | Lighthouse Accessibility > 95, axe DevTools | P0 |
| Optimización imágenes | `next/image` en todas las imágenes, WebP, sizing correcto | P0 |
| SEO final | Meta tags, Open Graph, `robots.txt`, `sitemap.xml` | P1 |
| Lighthouse audit | Score > 90 en Performance, Accesibilidad, SEO | P0 |
| Cross-browser | Verificar en Chrome, Firefox, Safari, Edge | P1 |
| README | Instrucciones de instalación y deploy | P2 |

**Entregable:** landing page production-ready, Lighthouse > 90, desplegada en Vercel con dominio personalizado (opcional).

---

### Resumen visual del roadmap

```
Día 1-2     Día 3-4         Día 5-7              Día 8-10
────────    ──────────────  ───────────────────  ──────────────────────
Fase 1      Fase 2          Fase 3               Fase 4
Fundaciones Hero + ATF      Contenido completo   Mobile + QA + Deploy
│           │               │                    │
Init        HeroSection     TransformBlock       MobileDrawer
Tokens      Background      HowItWorks           StickyMobileCTA
Fuentes     Mockup          FeaturesGrid         Accesibilidad
Estructura  OverlayCards    Testimonials         Optimización
Deploy      SocialProof     CTABanner            Lighthouse audit
Navbar      CounterNum      Animaciones scroll   README + entrega
```

**Leyenda de prioridades:**
- `P0` — bloqueante, debe estar en el entregable de la fase
- `P1` — importante, entra en la fase si el tiempo lo permite
- `P2` — mejora, se añade si sobra tiempo o en iteración futura

---

## 25. Acceptance Criteria

Criterios que deben cumplirse para considerar cada sección/componente como **DONE**. Se verifica manualmente y con herramientas automatizadas antes de cada merge a `main`.

---

### AC-01 — Navbar

| ID | Criterio | Verificación |
|---|---|---|
| AC-01-01 | La navbar es sticky y permanece visible al hacer scroll | Manual |
| AC-01-02 | Al hacer scroll > 50px aparece background blur y sombra | Manual |
| AC-01-03 | El botón CTA de la navbar lleva al formulario de la app | Manual |
| AC-01-04 | En mobile (<768px) se ocultan los links y aparece el hamburger | DevTools responsive |
| AC-01-05 | El hamburger abre el MobileDrawer con animación slide-in | Manual |
| AC-01-06 | El logo es navegable por teclado y tiene `aria-label` | Teclado + axe |

---

### AC-02 — Hero Section

| ID | Criterio | Verificación |
|---|---|---|
| AC-02-01 | El H1 es legible sobre el fondo (contraste ≥ 4.5:1) | Colour Contrast Analyser |
| AC-02-02 | El CTA principal es el elemento de mayor contraste visual de la sección | Visual |
| AC-02-03 | Las overlay cards flotan con animación continua suave | Manual |
| AC-02-04 | En desktop el layout es 45/55 (texto/visual) | DevTools |
| AC-02-05 | En mobile el orden es: texto → CTA → mockup | DevTools 375px |
| AC-02-06 | El LCP (imagen del mockup) carga en < 2.5s en conexión 4G | Lighthouse |
| AC-02-07 | El CTA lleva al usuario a la app o al formulario | Manual |
| AC-02-08 | El parallax del hero se desactiva con `prefers-reduced-motion` | DevTools emulation |

---

### AC-03 — Barra de Confianza

| ID | Criterio | Verificación |
|---|---|---|
| AC-03-01 | Los contadores se animan (countUp) al entrar en viewport | Manual |
| AC-03-02 | La animación de contadores se desactiva con `prefers-reduced-motion` | DevTools emulation |
| AC-03-03 | Los badges de confianza son legibles en mobile | DevTools 375px |

---

### AC-04 — Sección Problema / Solución

| ID | Criterio | Verificación |
|---|---|---|
| AC-04-01 | El bloque Antes/Después es visualmente claro y diferenciado | Visual |
| AC-04-02 | El tono emocional del copy conecta con el dolor del usuario | Revisión editorial |
| AC-04-03 | La sección hace fade-up al entrar en viewport | Manual |

---

### AC-05 — Cómo Funciona

| ID | Criterio | Verificación |
|---|---|---|
| AC-05-01 | Los 3 pasos son visualmente claros con numeración grande | Visual |
| AC-05-02 | En desktop existe línea conectora entre pasos | DevTools ≥1024px |
| AC-05-03 | En mobile los pasos se apilan verticalmente sin línea | DevTools 375px |
| AC-05-04 | Los iconos de Lucide tienen `aria-hidden="true"` | axe DevTools |
| AC-05-05 | Cada paso hace stagger reveal al entrar en viewport | Manual |

---

### AC-06 — Features Grid

| ID | Criterio | Verificación |
|---|---|---|
| AC-06-01 | En desktop se muestran 3 columnas (2 filas de 3) | DevTools ≥1024px |
| AC-06-02 | En tablet se muestran 2 columnas | DevTools 768px |
| AC-06-03 | En mobile se muestra 1 columna | DevTools 375px |
| AC-06-04 | El hover de cada card eleva la tarjeta (`translateY(-4px)`) y aumenta sombra | Manual |
| AC-06-05 | Las cards hacen stagger reveal (100ms de delay entre cada una) | Manual |
| AC-06-06 | Cada card tiene un icono Lucide relevante y con `aria-hidden="true"` | Visual + axe |

---

### AC-07 — Testimonios

| ID | Criterio | Verificación |
|---|---|---|
| AC-07-01 | En desktop se muestran 3 testimonios en horizontal | DevTools ≥1024px |
| AC-07-02 | En mobile funciona como carrusel deslizable | Manual en móvil real o DevTools touch |
| AC-07-03 | Cada testimonio incluye nombre, ciudad y valoración en estrellas | Visual |
| AC-07-04 | Las estrellas tienen `aria-label="5 de 5 estrellas"` para lectores de pantalla | axe |

---

### AC-08 — CTA Final

| ID | Criterio | Verificación |
|---|---|---|
| AC-08-01 | El botón CTA es el único elemento con full background color en la sección | Visual |
| AC-08-02 | La nota de confianza ("Sin tarjeta de crédito · Datos seguros") es visible | Visual |
| AC-08-03 | El botón lleva al mismo destino que el CTA del hero | Manual |

---

### AC-09 — Mobile Drawer

| ID | Criterio | Verificación |
|---|---|---|
| AC-09-01 | El drawer cubre el 100% de la pantalla al abrirse | Manual mobile |
| AC-09-02 | El foco queda atrapado dentro del drawer mientras está abierto (focus trap) | Teclado |
| AC-09-03 | Cerrar con la X o con tap fuera cierra el drawer | Manual |
| AC-09-04 | Al cerrar el drawer, el foco vuelve al botón hamburger | Teclado |
| AC-09-05 | El drawer tiene `role="dialog"` y `aria-modal="true"` | axe |

---

### AC-10 — Sticky Mobile CTA

| ID | Criterio | Verificación |
|---|---|---|
| AC-10-01 | El botón sticky solo aparece en viewports < 768px | DevTools |
| AC-10-02 | Aparece con fade-in tras superar la altura del hero (scroll > 100vh) | Manual |
| AC-10-03 | No se superpone con el contenido importante en landscape mobile | Manual landscape |

---

### AC-11 — Performance y SEO

| ID | Criterio | Verificación |
|---|---|---|
| AC-11-01 | Lighthouse Performance ≥ 90 en mobile y desktop | Lighthouse CI |
| AC-11-02 | Lighthouse Accessibility ≥ 95 | Lighthouse CI |
| AC-11-03 | Lighthouse SEO = 100 | Lighthouse CI |
| AC-11-04 | LCP < 2.5s | Lighthouse |
| AC-11-05 | CLS < 0.1 | Lighthouse |
| AC-11-06 | FID / INP < 200ms | Lighthouse |
| AC-11-07 | `<title>` y `<meta description>` correctamente configurados | Manual + Lighthouse |
| AC-11-08 | Open Graph tags presentes (título, descripción, imagen) | Facebook Debugger / manual |
| AC-11-09 | Todas las imágenes usan `next/image` con `alt` y tamaños correctos | Code review |
| AC-11-10 | Bundle JS gzipped < 120kb | `next build` + `next/bundle-analyzer` |

---

### AC-12 — Accesibilidad Global

| ID | Criterio | Verificación |
|---|---|---|
| AC-12-01 | Toda la página es navegable con Tab y Shift+Tab | Manual teclado |
| AC-12-02 | Ningún elemento interactivo carece de `focus-visible` | Manual teclado |
| AC-12-03 | Las animaciones se desactivan con `prefers-reduced-motion: reduce` | DevTools > Rendering > Emulate |
| AC-12-04 | Los landmarks semánticos están correctamente usados (`header`, `main`, `nav`, `footer`) | axe DevTools |
| AC-12-05 | No hay errores en axe DevTools (zero violations) | axe DevTools |
| AC-12-06 | El contenido es legible con zoom al 200% | Manual browser zoom |

---

### Definición de Done (DoD) global

Un ticket o tarea se considera **DONE** cuando:

- [ ] El código está en `main` y el deploy de Vercel está verde.
- [ ] Todos los AC específicos de esa tarea están verificados.
- [ ] No hay errores de TypeScript (`tsc --noEmit` limpio).
- [ ] No hay errores de axe DevTools en la sección afectada.
- [ ] El componente se ve correctamente en 375px, 768px, 1280px y 1440px.
- [ ] Si tiene animaciones, funciona correctamente con `prefers-reduced-motion: reduce`.

---

*Documento v4.0 — Generado para uso académico en bootcamp de desarrollo web.*
