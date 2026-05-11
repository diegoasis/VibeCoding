# Arquitectura — NutriAI Landing

## Visión General

Landing page **estática** de una sola página (SPA-like con navegación por anclas). Sin backend, sin API routes, sin base de datos. Todo el contenido es estático y vive en archivos TypeScript tipados.

## Flujo de Datos

```
data/ (arrays estáticos tipados)
    │
    ▼
page.tsx (server component — composición de secciones)
    │
    ▼
Section components (client components con animaciones)
    │
    ▼
UI components (presentación pura, sin lógica de negocio)
```

**Regla fundamental:** los datos de contenido (features, steps, testimonials, social-proof) son la única fuente de verdad. Cambiar cualquier texto de la landing requiere modificar solo archivos en `data/`, ningún componente.

## Estructura de Carpetas

```
nutriai-landing/
│
├── app/                           # Next.js App Router
│   ├── layout.tsx                 # Root layout server component
│   │                               # - Fuentes: Fraunces (700) + Plus Jakarta Sans (400,500,600)
│   │                               # - Metadata: title, description, OpenGraph
│   │                               # - CSS variables: --font-fraunces, --font-jakarta
│   │                               # - html: lang="es", scroll-smooth, antialiased
│   │                               # - body: min-h-full, flex flex-col
│   ├── page.tsx                   # Página principal (server component)
│   │                               # - Compone: Navbar + HeroSection + SocialProofBar +
│   │                               #   TransformBlock + HowItWorks + FeaturesGrid +
│   │                               #   Testimonials + CTABanner + Footer + StickyMobileCTA
│   └── globals.css                # Tailwind v4 @import + @theme inline tokens
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx             # Sticky header con backdrop-blur al scrollear >50px
│   │   │                           # - Logo "NutriAI" con brand/brand-dark
│   │   │                           # - Desktop: 3 nav links + Button CTA
│   │   │                           # - Mobile: hamburger (Menu icon) → MobileDrawer
│   │   │                           # - "use client" por useState + useScrolled
│   │   │
│   │   ├── MobileDrawer.tsx       # Fullscreen slide-in drawer (framer-motion)
│   │   │                           # - Backdrop overlay bg-black/50
│   │   │                           # - Panel: max-w-sm, bg-cream
│   │   │                           # - Cierra con X, Escape, o backdrop click
│   │   │                           # - Body scroll lock cuando abierto
│   │   │                           # - ARIA: role="dialog", aria-modal="true"
│   │   │
│   │   ├── Footer.tsx             # Server component
│   │   │                           # - Grid 4 cols: logo+description, Product, Legal
│   │   │                           # - Bottom bar: copyright + badges seguridad
│   │   │
│   │   └── StickyMobileCTA.tsx    # Fixed bottom CTA (solo md:hidden)
│   │                               # - Aparece tras scroll > viewport height
│   │                               # - framer-motion slide-up animation
│   │
│   ├── sections/
│   │   ├── HeroSection.tsx        # Sección principal (full viewport)
│   │   │                           # - Background: radial gradient + noise SVG (0.03 opacity) + blurs
│   │   │                           # - Layout: 45/55 text/mockup (desktop), apilado (mobile)
│   │   │                           # - H1 + subtitle + microcopy (Motor inteligente, etc.)
│   │   │                           # - CTA primary (pulse animation) + secondary link
│   │   │                           # - Mockup image con parallax (useScroll + useTransform)
│   │   │                           # - 2 overlay cards flotantes: Calories 2200 kcal, Diet Vegetarian
│   │   │
│   │   ├── SocialProofBar.tsx     # Barra de confianza
│   │   │                           # - Star rating 4.9/5 con estrellas Lucide
│   │   │                           # - Contador animado +15.000 dietas (CounterNumber)
│   │   │                           # - 3 badges: 100% Gratis, Sin registro, En 2 minutos
│   │   │
│   │   ├── TransformBlock.tsx     # Panel Antes/Después
│   │   │                           # - 4 pain points (❌) vs 4 beneficios (✅)
│   │   │                           # - After panel con border-brand + bg-brand-pale
│   │   │                           # - Animación de entrada desde left/right
│   │   │
│   │   ├── HowItWorks.tsx         # 3 pasos
│   │   │                           # - StepCards con ArrowRight connectors (desktop only)
│   │   │                           # - stagger reveal (delay: 0.2, 0.35, 0.5)
│   │   │                           # - Section id: #como-funciona
│   │   │
│   │   ├── FeaturesGrid.tsx       # Grid de features
│   │   │                           # - 6 FeatureCards en grid responsive (3/2/1 cols)
│   │   │                           # - Stagger children (100ms delay) con framer-motion variants
│   │   │                           # - Section id: #funciones
│   │   │
│   │   ├── Testimonials.tsx       # Testimonios
│   │   │                           # - Desktop: 3 columnas grid
│   │   │                           # - Mobile: carrusel con AnimatePresence + botones prev/next + dots
│   │   │                           # - Section id: #testimonios
│   │   │
│   │   └── CTABanner.tsx          # CTA final de conversión
│   │                               # - bg-brand-dark con decorative blurs
│   │                               # - CTA button blanco con trust signals
│   │
│   └── ui/
│       ├── Button.tsx             # forwardRef component
│       │                           # - Variants: primary (bg-brand), secondary (white+border), ghost
│       │                           # - Sizes: sm, md, lg
│       │                           # - Loading state: spinner SVG + "Generando..."
│       │                           # - Disabled, focus-visible ring
│       │
│       ├── FeatureCard.tsx        # LucideIcon + title + description
│       │                           # - shadow-card, hover:shadow-card-hover + -translate-y-1
│       │
│       ├── StepCard.tsx           # Número grande + icono + title + description
│       │                           # - Número en badge bg-brand, icono en bg-brand-pale
│       │
│       ├── TestimonialCard.tsx    # Avatar + name + location + rating + quote
│       │                           # - Hover: border-brand highlight
│       │
│       ├── SkeletonCard.tsx       # Placeholder shimmer (animate-shimmer)
│       │
│       ├── Badge.tsx              # Pill con bg-brand-pale + text-brand-dark
│       │
│       └── CounterNumber.tsx      # Número animado con useCountUp hook
│
├── data/                          # Contenido estático (única fuente de verdad)
│   ├── features.ts                # 6 features con iconos Lucide
│   ├── steps.ts                   # 3 pasos del proceso
│   ├── testimonials.ts            # 3 testimonios
│   └── social-proof.ts            # Rating, contador, badges
│
├── types/                         # Interfaces compartidas
│   ├── feature.ts                 # Feature { icon: LucideIcon; title; description }
│   ├── step.ts                    # Step { number; icon: LucideIcon; title; description }
│   └── testimonial.ts             # Testimonial { id; name; location; avatar; rating; quote }
│
├── hooks/                         # Custom hooks reutilizables
│   ├── useScrolled.ts             # Detección de scroll pasivo (threshold default 50px)
│   ├── useInView.ts               # IntersectionObserver con triggerOnce
│   └── useCountUp.ts              # requestAnimationFrame + cubic ease-out
│
├── lib/
│   └── utils.ts                   # cn() → clsx wrapper
│
├── public/
│   └── images/
│       └── ChatGPT Image May 11, 2026 at 10_05_56 PM.png  # Hero mockup
│
└── docs/
    └── landing-nutriai-spec-v4.md  # Especificación técnica completa (915 líneas)
```

## Clasificación de Componentes

| Tipo | Archivos | Características |
|---|---|---|
| **Server** | `app/layout.tsx`, `app/page.tsx`, `Footer.tsx`, `FeatureCard.tsx`, `StepCard.tsx`, `TestimonialCard.tsx`, `SkeletonCard.tsx`, `Badge.tsx`, `Button.tsx` | Sin `"use client"`. Renderizado en servidor. Sin hooks de estado/efecto. |
| **Client** | `Navbar.tsx`, `MobileDrawer.tsx`, `StickyMobileCTA.tsx`, `HeroSection.tsx`, `SocialProofBar.tsx`, `TransformBlock.tsx`, `HowItWorks.tsx`, `FeaturesGrid.tsx`, `Testimonials.tsx`, `CTABanner.tsx`, `CounterNumber.tsx` | `"use client"`. Usan hooks (useState, useEffect, IntersectionObserver, framer-motion). |

## Design Tokens (Tailwind CSS v4)

Definidos en `app/globals.css:3-37` mediante `@theme inline`:

```
Colores:    brand (#1D9E75), brand-dark, brand-mint, brand-pale, cream,
            text-primary (#1A1A1A), text-secondary (#6B7280)
Fuentes:    display (Fraunces, serif), body (Plus Jakarta Sans, sans-serif)
Sombras:    card (0 4px 12px rgba(0,0,0,0.06)), card-hover, overlay (0 20px 40px), navbar
Animaciones: float (3s), pulse2 (2s), shimmer (1.5s)
Container:  1280px (clase .max-w-container)
```

Tailwind v4 usa `@theme inline` en lugar del tradicional `tailwind.config.ts`. No existe archivo `tailwind.config.*`.

## Estrategia de Animación

| Patrón | Ubicación | Mecanismo |
|---|---|---|
| Fade-up on scroll | Todas las sections | `useInView` hook + framer-motion `initial`/`animate` |
| Parallax | HeroSection mockup | `useScroll` + `useTransform` (y: 0→150px) |
| Stagger reveal | FeaturesGrid | `containerVariants`/`itemVariants` con staggerChildren 0.1 |
| Floating | Hero overlay cards | `animate` con y: [0, -8, 0], repeat: Infinity |
| Pulse | CTA hero | CSS `animate-pulse2` |
| Count-up | SocialProofBar | `useCountUp` hook con requestAnimationFrame |
| Slide-in | MobileDrawer | framer-motion x: "100%" → 0 |
| Slide-up | StickyMobileCTA | framer-motion y: 100 → 0 |

## Relaciones Internas Clave

- `page.tsx` importa todas las sections y layout components — es el único orquestador
- `Navbar.tsx` → `MobileDrawer.tsx` (comunicación via prop `open`/`onClose`)
- `SocialProofBar.tsx` → `CounterNumber.tsx` → `useCountUp.ts`
- `FeaturesGrid.tsx` → `FeatureCard.tsx` (recibe datos de `data/features.ts`)
- `HowItWorks.tsx` → `StepCard.tsx` (recibe datos de `data/steps.ts`)
- `Testimonials.tsx` → `TestimonialCard.tsx` (recibe datos de `data/testimonials.ts`)
- Todos los UI components usan `cn()` de `lib/utils.ts` para merging de clases

## Configuración y Build

- **PostCSS:** `postcss.config.mjs` → solo plugin `@tailwindcss/postcss`
- **ESLint:** `eslint.config.mjs` → `eslint-config-next/core-web-vitals` + `typescript`. Ignora `.next/`, `out/`, `build/`, `next-env.d.ts`
- **TypeScript:** `tsconfig.json` → strict mode, ES2017 target, `@/*` path alias, bundler module resolution
- **Next:** `next.config.ts` → configuración vacía (sin opciones custom)
- **No env vars:** el proyecto no usa variables de entorno

## Estrategia de Renderizado

Actualmente toda la página es SSR. Potencialmente migrable a SSG (static export) ya que no hay fetching de datos dinámico ni API routes. La metadata de SEO se define estáticamente en `layout.tsx`.

## Responsive Breakpoints

| Breakpoint | Comportamiento |
|---|---|
| <768px | 1 columna. Hero apilado. Drawer + sticky CTA. Carrusel testimonios. |
| 768-1024px | 2 columnas features. Steps en fila sin connectors. |
| >1024px | Layout completo. 3 columnas features. Hero 45/55. Steps con ArrowRight. |
