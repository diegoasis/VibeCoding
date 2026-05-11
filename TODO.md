# TODO — NutriAI Landing

> Roadmap, bugs, mejoras, refactors y prioridades.

---

## P0 — Bloqueante (debe hacerse antes de producción real)

- [ ] **Migrar imagen hero a `next/image`**
  Archivo: `components/sections/HeroSection.tsx:96-100`
  Reemplazar `<img>` con `<Image>` de Next.js para lazy loading, WebP/AVIF, y sizing automático.

- [ ] **Añadir `next/font` con carga local**
  Fraunces y Plus Jakarta Sans se cargan desde Google Fonts. Para producción, descargar y servir localmente para eliminar dependencia externa y mejorar Lighthouse.

- [ ] **Implementar SSG/static export**
  `next.config.ts` debería tener `output: 'export'` (o `generateStaticParams`) ya que no hay datos dinámicos. La metadata está hardcodeada en `layout.tsx`.

- [ ] **Soporte `prefers-reduced-motion`**
  Especificado en `docs/landing-nutriai-spec-v4.md` como requisito (AC-02-08, AC-03-02, AC-12-03). Desactivar parallax, float, pulse, y fade-up animations cuando el usuario tiene `prefers-reduced-motion: reduce`.

---

## P1 — Importante

- [ ] **Mover datos de TransformBlock a `data/`**
  Archivo: `components/sections/TransformBlock.tsx:6-19`
  Los arrays `before` y `after` están hardcodeados en el componente. Deberían moverse a `data/transforms.ts` con su tipo correspondiente para mantener la consistencia del proyecto.

- [ ] **Conectar CTAs a destino real**
  Todos los botones "Crear mi dieta gratis" y "Crear mi dieta personalizada" usan `onClick` sin handler o `<button>` sin `href`. Deberían apuntar a la app real de NutriAI o al formulario de registro.

- [ ] **Añadir sitemap.xml y robots.txt**
  Usar `app/sitemap.ts` (Next.js built-in sitemap generation) y `public/robots.txt`.

- [ ] **Esquema JSON-LD para SEO**
  Añadir `application/ld+json` con schema.org `SoftwareApplication` para que Google muestre rich results.

- [ ] **Añadir tests básicos**
  Como mínimo: tests de renderizado para los UI components (Button, FeatureCard, StepCard, TestimonialCard) con Vitest + React Testing Library.

---

## P2 — Mejora

- [ ] **Añadir variante `outline` al Button**
  `Button.tsx` tiene `primary`, `secondary`, y `ghost`. Añadir `outline` (sin fondo, solo borde) para cubrir más casos de uso.

- [ ] **Focus trap en MobileDrawer**
  El drawer (`MobileDrawer.tsx`) no implementa focus trap. Al abrirse, el foco puede escaparse del drawer. Implementar con `tabindex` management o librería `focus-trap-react`.

- [ ] **Optimización de animaciones**
  Algunas animaciones usan `animate={{ y: [0, -8, 0] }}` con `repeat: Infinity` en `HeroSection.tsx`. Evaluar si afectan rendimiento en dispositivos de gama baja y considerar `will-change: transform`.

- [ ] **Añadir `aria-current` a nav links**
  En `Navbar.tsx`, los links de navegación no marcan la página actual. Añadir `aria-current="page"` basado en la sección visible en viewport.

- [ ] **CSS `@container` queries para componentes**
  FeatureCard y StepCard podrían usar Container Queries en lugar de media queries para adaptarse a su contenedor en lugar del viewport.

---

## P3 — Futuro / Ideas

- [ ] **Modo oscuro**
  Añadir tema dark. Los tokens de color en `globals.css` permitirían un `@media (prefers-color-scheme: dark)` relativamente limpio.

- [ ] **Internacionalización (i18n)**
  Actualmente solo español. Si se quiere expandir a inglés u otros idiomas, estructura de archivos `data/` facilitaría la migración con `next-intl` o similar.

- [ ] **A/B testing de CTAs**
  Si hay tráfico real, añadir variantes de texto/botón para optimizar conversión.

- [ ] **Analytics**
  Integrar evento de clic en CTA. PostHog, Plausible o Google Analytics.

- [ ] **Formulario de lead capture**
  Añadir un formulario embebido (email + nombre) en la sección CTA o como popup para capturar leads incluso sin redirigir a la app.

- [ ] **Video demo en Hero**
  Reemplazar imagen estática del mockup con un video corto (autoplay, muted, loop) mostrando el flujo de la app.

- [ ] **Animación de scroll progress indicator**
  Barra delgada en el top que avanza con el scroll, similar a Medium.

- [ ] **Tooltips interactivos**
  En features, tooltips con ejemplos concretos de cómo funciona cada feature.

---

## Bugs conocidos

- [ ] **StickyMobileCTA visible momentáneamente en SSR**
  `StickyMobileCTA.tsx` no llama `handleScroll()` en el `useEffect` inicial. Si el servidor renderiza con estado incorrecto, el CTA puede aparecer un frame antes de ocultarse.

- [ ] **Navbar sin estado inicial consistente**
  `useScrolled(50)` inicia en `false`, pero no verifica la posición actual del scroll hasta que el evento scroll se dispara. En páginas con hash URL, el estado podría ser incorrecto.

- [ ] **Imagen hero sin alt descriptivo real**
  `HeroSection.tsx:98` tiene `alt="Plato de comida saludable"` que es genérico. Debería describir la imagen específica.

- [ ] **Carrusel de testimonios sin swipe táctil**
  `Testimonials.tsx` implementa navegación con botones prev/next y dots, pero no soporta swipe gesture en móviles táctiles.

---

## Prioridades sugeridas para próxima sesión

1. P0: Migrar `<img>` a `<Image>` en HeroSection (crítico para performance)
2. P0: Implementar `prefers-reduced-motion` (requisito de accesibilidad)
3. P1: Mover datos hardcodeados de TransformBlock a `data/` (consistencia)
4. P1: Conectar CTAs a destinos reales (funcionalidad)
5. P0: SSG/static export (rendimiento en build)
6. P1: Tests básicos (calidad)
7. P2: Focus trap en MobileDrawer (accesibilidad)
