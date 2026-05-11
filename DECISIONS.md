# Registro de Decisiones Técnicas — NutriAI Landing

---

## D-001: Next.js App Router vs Pages Router

**Decisión:** App Router (`app/` directory)

**Alternativas descartadas:**
- Pages Router (`pages/` directory) — más maduro pero deprecado en Next.js 16

**Razón:** El proyecto se inició con `create-next-app@latest` que por defecto usa App Router. Es el futuro del framework, tiene mejor soporte para layouts anidados, server components por defecto, y mejor integración con React 19.

**Tradeoff:** Los server components requieren marcar explícitamente con `"use client"` los componentes que necesitan interactividad. Mayor carga cognitiva inicial, pero mejor rendimiento por defecto.

---

## D-002: Tailwind CSS v4 con @theme inline vs tailwind.config.ts

**Decisión:** Tailwind v4 con design tokens en `app/globals.css` usando `@theme inline`

**Alternativas descartadas:**
- `tailwind.config.ts` — archivo separado, compatible con v3 pero obsoleto en v4

**Razón:** Tailwind v4 cambia el paradigma: los tokens se definen en CSS nativo con `@theme`. No hay archivo de configuración separado. Esto alinea estilos con el estándar CSS y elimina la duplicación entre config y CSS.

**Tradeoff:** IDE plugins como Tailwind CSS IntelliSense pueden no soportar completamente la sintaxis v4 todavía. Las clases autogeneradas no se autocompletan tan bien.

**Problema encontrado:** Al migrar, se intentó usar `tailwind.config.ts` pero Tailwind v4 lo ignora. Todos los tokens están en `globals.css:3-37`.

---

## D-003: clsx sin tailwind-merge

**Decisión:** `cn()` implementada solo con `clsx`

**Alternativas descartadas:**
- `clsx` + `tailwind-merge` — combina clases y resuelve conflictos
- `cva` (class-variance-authority) — para componentes con variantes complejas

**Razón:** El proyecto no combina clases Tailwind conflictivas (no hay colisiones), por lo que `tailwind-merge` añadiría peso innecesario (~6KB). `Button.tsx` usa variantes manuales sin necesidad de `cva`.

**Tradeoff:** Si en el futuro se usan clases condicionales que puedan colisionar, será necesario añadir `tailwind-merge`.

---

## D-004: Framer Motion vs CSS Animations

**Decisión:** Framer Motion 12.38.0 para animaciones complejas, CSS `@keyframes` para animaciones simples

**Alternativas descartadas:**
- Solo CSS `@keyframes` + Intersection Observer — más ligero pero menos expresivo
- `react-spring` — más performante pero menos integrado con React
- `GSAP` — más potente pero licencia comercial y bundle grande (~30KB)

**Razón:** Framer Motion es el estándar en ecosistema Next.js, tiene excelente integración con React 19, soporta scroll-linked animations (`useScroll`, `useTransform`), AnimatePresence para animaciones de salida, y respeta `prefers-reduced-motion` automáticamente.

**Tradeoff:** Peso en bundle (~35KB gzipped). Para animaciones simples como `float` y `pulse2` se usó CSS `@keyframes` para evitar overhead.

**Uso real:**
- `HeroSection.tsx:22` — `useScroll` + `useTransform` para parallax del mockup
- `FeaturesGrid.tsx:8-15` — `containerVariants`/`itemVariants` con `staggerChildren`
- `Testimonials.tsx:55-64` — `AnimatePresence` para transiciones de carrusel
- `MobileDrawer.tsx:41-53` — `motion.div` para slide-in del panel

---

## D-005: Lucide React vs Heroicons vs Phosphor

**Decisión:** Lucide React 1.14.0

**Alternativas descartadas:**
- Heroicons — menos variedad, actualizaciones poco frecuentes
- Phosphor React — excelente calidad pero menor adopción en el ecosistema Next.js

**Razón:** Lucide es el fork comunitario de Feather Icons. Tiene >1000 iconos, estilo outline consistente, es tree-shakeable, y tiene buena integración con TypeScript (tipo `LucideIcon`).

**Impacto real:** Los iconos se importan individualmente (tree-shaking nativo de ES modules). Ejemplo en `data/features.ts` se importan 6 iconos de ~30 líneas cada uno.

---

## D-006: Datos en archivos TS vs CMS o markdown

**Decisión:** Contenido estático en archivos TypeScript tipados (`data/`)

**Alternativas descartadas:**
- Markdown files con frontmatter — más verboso, sin type-safety nativo
- CMS headless (Sanity, Contentful) — overkill para una landing estática
- JSON files — sin type-safety, sin autocompletado

**Razón:** El contenido es pequeño (~4 archivos, ~100 líneas total). TypeScript da type-safety y autocompletado. Separar datos de presentación permite cambiar todo el copy sin tocar componentes.

**Efecto colateral positivo:** `TransformBlock.tsx` no sigue este patrón (tiene datos hardcodeados en `lines 6-19`) — es deuda técnica identificada.

---

## D-007: Hooks custom vs librería de terceros (useInView, useCountUp)

**Decisión:** Hooks propios en `hooks/`

**Alternativas descartadas:**
- `react-intersection-observer` — wrapper para IntersectionObserver
- `react-countup` — librería específica para contadores animados
- `framer-motion` `useInView` — Framer Motion 12 incluye `useInView` nativo

**Razón:** Los hooks son pequeños (<40 líneas cada uno) y no justifican una dependencia externa. El `useInView.ts` es un wrapper simple de IntersectionObserver API. `useCountUp.ts` usa `requestAnimationFrame` con cubic ease-out.

**Uso real:**
```ts
// hooks/useInView.ts:11-39 — IntersectionObserver con triggerOnce
// hooks/useCountUp.ts:11-34 — requestAnimationFrame con easeOut cubic
// hooks/useScrolled.ts:5-19 — scroll listener pasivo con threshold configurable
```

---

## D-008: Sin next/image para la imagen del hero

**Decisión:** `<img>` nativo en `HeroSection.tsx` en lugar de `<Image>` de Next.js

**Razón original:** Rapidez de desarrollo durante el bootcamp.

**Consecuencia:** La imagen no tiene lazy loading automático, no tiene optimización de formato (WebP/AVIF), no tiene sizing responsive, y contribuye potencialmente a un LCP más alto. Es deuda técnica prioritaria.

**Archivo afectado:** `HeroSection.tsx:96-100`

---

## D-009: Sin soporte prefers-reduced-motion

**Decisión:** No implementado actualmente

**Razón:** El spec (`docs/landing-nutriai-spec-v4.md`) lo lista como requisito P0 (AC-02-08, AC-03-02, AC-12-03), pero no está implementado.

**Impacto:** Usuarios con preferencia de movimiento reducido experimentan todas las animaciones (parallax, float, pulse, fade-up, stagger). Framer Motion respeta `prefers-reduced-motion` automáticamente en algunos casos, pero no en scroll-linked animations como el parallax del hero.

---

## D-010: SEO — solo metadata básica

**Decisión:** Metadata definida en `layout.tsx` sin sitemap, robots.txt, ni JSON-LD

**Razón:** Proyecto en fase temprana. La metadata básica (title, description, OpenGraph) está presente.

**Pendiente:**
- `sitemap.xml` para crawling de buscadores
- `robots.txt` para control de indexing
- Schema.org JSON-LD para rich results (tipo `SoftwareApplication`)
- `next/sitemap` para generación automática

---

## D-011: ESLint Flat Config

**Decisión:** `eslint.config.mjs` con el nuevo flat config system de ESLint 9

**Alternativas descartadas:**
- `.eslintrc.json` — deprecated en ESLint 9

**Razón:** `create-next-app` genera el flat config por defecto. Usa `eslint-config-next` con `core-web-vitals` y reglas TypeScript.

**Archivo:** `eslint.config.mjs:1-18`

---

## D-012: Sin tests automatizados

**Decisión:** No hay tests unitarios, de integración, ni e2e

**Razón:** Proyecto bootcamp/vibe coding sin requisitos de testing.

**Riesgo:** Cualquier cambio debe verificarse manualmente. No hay red de seguridad para regresiones. Especialmente crítico: los IDs de anclas, las importaciones de iconos, y los breakpoints responsive.
