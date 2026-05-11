# 🧬 VibeCoding — NutriAI Landing

**Landing page promocional** para NutriAI, un generador de dietas personalizadas con IA. Construida como landing de alto impacto con rendimiento, accesibilidad y experiencia móvil como prioridades.

## Stack

| Capa | Tecnología | Versión |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.6 |
| Lenguaje | TypeScript | 5.x |
| Estilos | Tailwind CSS | 4.x |
| Animaciones | Framer Motion | 12.38.0 |
| Iconos | Lucide React | 1.14.0 |
| Utilidades | clsx | 2.1.1 |
| PostCSS | @tailwindcss/postcss | 4.x |
| Linter | ESLint (eslint-config-next) | 9.x |

## Setup

```bash
cd nutriai-landing
npm install
npm run dev      # http://localhost:3000
npm run build    # Producción estática
npm run lint     # ESLint
```

## Estructura del Proyecto

```
nutriai-landing/
├── app/               # App Router (layout, page, globals.css)
├── components/
│   ├── layout/        # Navbar, Footer, MobileDrawer, StickyMobileCTA
│   ├── sections/      # Hero, FeaturesGrid, Testimonials, etc.
│   └── ui/            # Button, FeatureCard, StepCard, Badge, etc.
├── data/              # Contenido estático tipado (features, steps, testimonials)
├── types/             # Interfaces TypeScript
├── hooks/             # useScrolled, useInView, useCountUp
├── lib/               # cn() utility
└── public/images/     # Assets estáticos
```

## Funcionalidades Principales

| Sección | Descripción |
|---|---|
| **Hero** | Titular + mockup con overlay cards flotantes y parallax |
| **SocialProofBar** | Valoración 4.9/5, contador +15.000 dietas, badges |
| **TransformBlock** | Panel Antes/Después emocional |
| **HowItWorks** | 3 pasos con línea conectora en desktop |
| **FeaturesGrid** | 6 tarjetas con stagger reveal |
| **Testimonials** | 3 columnas desktop / carrusel mobile |
| **CTABanner** | CTA final con señales de confianza |
| **MobileDrawer** | Fullscreen slide-in con framer-motion |
| **StickyMobileCTA** | Botón fijo inferior en mobile tras scroll |

## Convenciones Clave

- Componentes en `PascalCase`, hooks en `camelCase` con prefijo `use`
- Props siempre tipadas con `interface`, no `type`
- Un componente por archivo, export default
- `"use client"` solo donde hay interactividad (estado, eventos, animaciones)
- Contenido en `data/` como única fuente de verdad — cambiar copy no requiere tocar componentes
- Tailwind CSS v4 con `@theme inline` en `globals.css` (no hay `tailwind.config.ts`)

## Versiones

`Next.js 16.2.6` y `React 19.2.4` — revisar `node_modules/next/dist/docs/` antes de escribir código, ya que esta versión tiene breaking changes respecto a versiones anteriores.

## Licencia

MIT
