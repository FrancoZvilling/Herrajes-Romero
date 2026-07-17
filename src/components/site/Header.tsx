import { Link } from "@tanstack/react-router";
import { Menu, Phone, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { useCart } from "@/context/cart";
import { useCategories } from "@/hooks/useCatalog";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

export function Header() {
  const { count, setOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const { data: categories = [] } = useCategories();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/85 backdrop-blur-xl">
      {/* Top strip */}
      <div className="hidden bg-[var(--ink)] text-white lg:block">
        <div className="container-x flex h-9 items-center justify-between text-[12px]">
          <span className="flex items-center gap-2 text-white/80">
            <Phone className="h-3.5 w-3.5 text-[var(--brand)]" />
            351-4216433 · WhatsApp 3517010095
          </span>
          <span className="text-white/70">
            Rivadavia 426 · Córdoba · Lun-Vie 9-17 · Sáb 9-13
          </span>
        </div>
      </div>

      <div className="container-x flex h-16 items-center gap-4 lg:h-20">
        <Logo />

        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setCatOpen(true)}
            onMouseLeave={() => setCatOpen(false)}
          >
            <button className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition hover:bg-[var(--surface-muted)] hover:text-foreground">
              Catálogo
              <span className="ml-1 rounded bg-[var(--brand)]/10 px-1.5 py-0.5 text-[10px] font-semibold text-[var(--brand)]">
                {categories.length}
              </span>
            </button>
            <AnimatePresence>
              {catOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full z-50 w-[720px] pt-2"
                >
                  <div className="grid grid-cols-3 gap-1 rounded-xl border border-border bg-popover p-3 shadow-[var(--shadow-card-hover)]">
                    {categories.map((c) => (
                      <Link
                        key={c.slug}
                        to="/categoria/$slug"
                        params={{ slug: c.slug }}
                        className="group flex flex-col rounded-lg px-3 py-2 transition hover:bg-[var(--surface-muted)]"
                      >
                        <span className="text-sm font-semibold text-foreground group-hover:text-[var(--brand)]">
                          {c.name}
                        </span>
                        <span className="line-clamp-1 text-xs text-muted-foreground">
                          {c.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink to="/marcas">Marcas</NavLink>
          <NavLink to="/nosotros">Nosotros</NavLink>
          <NavLink to="/contacto">Contacto</NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <button
            aria-label="Buscar"
            className="hidden h-10 w-10 items-center justify-center rounded-md text-foreground/70 transition hover:bg-[var(--surface-muted)] hover:text-foreground md:inline-flex"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            onClick={() => setOpen(true)}
            aria-label="Carrito"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground/80 transition hover:bg-[var(--surface-muted)] hover:text-foreground"
          >
            <ShoppingBag className="h-5 w-5" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--brand)] px-1 text-[11px] font-bold text-white shadow-[var(--shadow-brand)]"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <Button asChild size="sm" className="ml-1 hidden bg-[var(--brand)] text-white hover:bg-[var(--brand)]/90 lg:inline-flex">
            <a href="https://wa.me/5493517010095" target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </Button>
          <button
            className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground/80 hover:bg-[var(--surface-muted)] lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menú"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-background lg:hidden"
          >
            <div className="container-x flex flex-col gap-1 py-3">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  to="/categoria/$slug"
                  params={{ slug: c.slug }}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-[var(--surface-muted)]"
                >
                  {c.name}
                </Link>
              ))}
              <div className="my-2 h-px bg-border" />
              <Link to="/nosotros" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm">Nosotros</Link>
              <Link to="/marcas" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm">Marcas</Link>
              <Link to="/contacto" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm">Contacto</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      activeProps={{ className: "text-foreground bg-[var(--surface-muted)]" }}
      className="rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition hover:bg-[var(--surface-muted)] hover:text-foreground"
    >
      {children}
    </Link>
  );
}
