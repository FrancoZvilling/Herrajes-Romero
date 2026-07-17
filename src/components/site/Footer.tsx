import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { useCategories, useBrands } from "@/hooks/useCatalog";
import { Logo } from "./Logo";

export function Footer() {
  const { data: categories = [] } = useCategories();
  const { data: brands = [] } = useBrands();

  return (
    <footer className="mt-24 border-t border-border bg-[var(--ink)] text-white/85">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo className="[&_span]:!text-white [&_.text-muted-foreground]:!text-white/60" />
          <p className="mt-4 max-w-xs text-sm text-white/60">
            Más de 60 años de experiencia en herrajes. Calidad, asesoramiento y
            atención cercana en cada proyecto.
          </p>
          <div className="mt-5 flex gap-2">
            <a
              href="https://www.instagram.com/casaromeroherrajes"
              target="_blank" rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 transition hover:border-[var(--brand)] hover:bg-[var(--brand)] hover:text-white"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://www.facebook.com/share/14ffRKMyEjW/"
              target="_blank" rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 transition hover:border-[var(--brand)] hover:bg-[var(--brand)] hover:text-white"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://wa.me/5493517010095"
              target="_blank" rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 transition hover:border-[var(--brand)] hover:bg-[var(--brand)] hover:text-white"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-[var(--brand)]">
            Catálogo
          </h4>
          <ul className="space-y-2 text-sm">
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link to="/categoria/$slug" params={{ slug: c.slug }} className="text-white/70 transition hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-[var(--brand)]">
            Marcas
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {brands.map((b) => (
              <span key={b} className="rounded border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/70">
                {b}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-[var(--brand)]">
            Visitanos
          </h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand)]" />Rivadavia 426 · CP 5000 · Córdoba</li>
            <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand)]" />351-4216433</li>
            <li className="flex gap-3"><MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand)]" />WhatsApp 3517010095</li>
            <li className="flex gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand)]" />Lun-Vie 9-17 · Sáb 9-13</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/50 md:flex-row">
          <p>© {new Date().getFullYear()} Casa Romero Herrajes · Todos los derechos reservados.</p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-white/40">Aceptamos:</span>
            {["VISA", "MasterCard", "Naranja", "Mercado Pago"].map((m) => (
              <span key={m} className="rounded border border-white/10 bg-white/5 px-2 py-1 font-semibold text-white/70">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
