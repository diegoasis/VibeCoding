export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white py-12 border-t border-gray-100">
      <div className="mx-auto max-w-container px-6 md:px-10 lg:px-20">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <span className="font-display text-xl font-bold text-brand">
              Nutri<span className="text-brand-dark">AI</span>
            </span>
            <p className="mt-3 max-w-sm font-body text-sm text-text-secondary">
              Tu dieta personalizada con IA en 2 minutos. Sin compromiso, sin tarjeta de crédito.
            </p>
          </div>

          <div>
            <h4 className="font-body font-semibold text-text-primary mb-4">Producto</h4>
            <ul className="space-y-2 font-body text-sm text-text-secondary">
              <li><a href="#" className="hover:text-brand transition-colors">Cómo funciona</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">Precios</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">Testimonios</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-body font-semibold text-text-primary mb-4">Legal</h4>
            <ul className="space-y-2 font-body text-sm text-text-secondary">
              <li><a href="#" className="hover:text-brand transition-colors">Privacidad</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">Términos</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-8 md:flex-row">
          <p className="font-body text-sm text-text-secondary">
            © {currentYear} NutriAI. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}