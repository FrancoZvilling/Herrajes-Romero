import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Award, ShieldCheck, Truck, Wrench } from "lucide-react";
import { useProducts, useCategories, useBrands } from "@/hooks/useCatalog";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { data: products = [] } = useProducts();
  const { data: categories = [] } = useCategories();
  const { data: brands = [] } = useBrands();
  
  const featured = products.filter(p => p.featured).slice(0, 8);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--ink)] text-white min-h-[600px] lg:min-h-[700px] flex items-center">
        {/* Background Image (Right side) */}
        <div className="absolute inset-0 z-0 flex justify-end">
          <div className="relative h-full w-full lg:w-3/5">
            <img 
              src="/hero-bg.png" 
              alt="Ferretería Casa Romero" 
              className="h-full w-full object-cover object-[center_right] opacity-40 lg:opacity-100" 
            />
            {/* Gradient Overlay to fade the left edge seamlessly into the dark background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--ink)] via-[var(--ink)]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/80 via-transparent to-transparent lg:hidden" />
          </div>
        </div>

        {/* Lamparones naranjas */}
        <div className="pointer-events-none absolute inset-0 z-0 mix-blend-screen">
          <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-[var(--brand)] opacity-20 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-[var(--brand)] opacity-10 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="container-x relative z-10 w-full py-20 lg:py-28">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
              60 años ferreteando en Córdoba
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
            >
              Herrajes que
              <span className="block text-[var(--brand)]">sostienen tu obra.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-6 max-w-lg text-base text-white/70 sm:text-lg"
            >
              Encontrá miles de soluciones para cada proyecto. Productos de calidad, atención personalizada y el respaldo de una empresa familiar con más de 60 años de trayectoria.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                to="/categoria/$slug" params={{ slug: "linea-puerta" }}
                className="group inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-6 py-3.5 text-sm font-semibold text-white shadow-[var(--shadow-brand)] transition hover:brightness-110 active:scale-[0.98]"
              >
                Ver catálogo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                Hablar con un experto
              </Link>
            </motion.div>

            <div className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-6">
              <Stat n="60+" l="años" />
              <Stat n="10k+" l="productos" />
              <Stat n="11" l="marcas líderes" />
            </div>
          </div>
        </div>
      </section>

      {/* Value strip */}
      <section className="border-b border-border bg-[var(--surface)]">
        <div className="container-x grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
          <Value icon={<Award />} title="Primeras marcas" text="Fumaca, Prive, Kallay y más" />
          <Value icon={<ShieldCheck />} title="60 años" text="Trayectoria familiar" />
          <Value icon={<Truck />} title="Retiro y envío" text="Rivadavia 426, Córdoba" />
          <Value icon={<Wrench />} title="Asesoramiento" text="Te ayudamos a elegir" />
        </div>
      </section>

      {/* Categories */}
      <section className="container-x py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--brand)]">Explorá</p>
            <h2 className="mt-2 font-display text-4xl font-bold tracking-tight">
              Todas las categorías
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm text-muted-foreground md:block">
            Organizamos nuestro catálogo por línea para que encuentres al toque lo que buscás.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="h-full"
            >
              <Link
                to="/categoria/$slug" params={{ slug: c.slug }}
                className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 p-6 shadow-xl card-hover"
              >
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('/categories/${c.slug}.png')` }}
                />
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
                
                <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--brand)]/90 text-white backdrop-blur shadow-sm transition-colors group-hover:bg-[var(--brand)]">
                  <Wrench className="h-5 w-5" />
                </div>
                <h3 className="relative z-10 font-display text-lg font-semibold text-white drop-shadow-md">{c.name}</h3>
                <p className="relative z-10 mt-1 text-sm text-white/90 drop-shadow-md">{c.description}</p>
                <span className="relative z-10 mt-auto pt-4 inline-flex items-center gap-1 text-sm font-bold text-[var(--brand)] drop-shadow-sm brightness-125">
                  Ver productos
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-[var(--surface)] py-20">
        <div className="container-x">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--brand)]">Destacados</p>
            <h2 className="mt-2 font-display text-4xl font-bold tracking-tight">
              Los más pedidos
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="container-x py-20">
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--brand)]">Trabajamos con</p>
          <h2 className="mt-2 font-display text-3xl font-bold">Marcas de primer nivel</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {brands.map((b) => (
            <span
              key={b}
              className="rounded-lg border border-border bg-card px-5 py-3 font-display text-sm font-semibold text-foreground/70 transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
            >
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-x pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-[var(--ink)] px-8 py-16 text-white sm:px-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[var(--brand)] opacity-30 blur-3xl" />
          <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-display text-3xl font-bold sm:text-4xl">
                ¿No encontrás lo que buscás?
              </h3>
              <p className="mt-2 max-w-lg text-white/70">
                Escribinos por WhatsApp y un asesor te responde en minutos.
                Trabajamos a pedido y con envíos a todo el país.
              </p>
            </div>
            <a
              href="https://wa.me/5493517010095" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-6 py-3.5 font-semibold text-white shadow-[var(--shadow-brand)] transition hover:brightness-110"
            >
              Consultar ahora
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-bold text-white">{n}</div>
      <div className="mt-1 text-xs uppercase tracking-wider text-white/50">{l}</div>
    </div>
  );
}

function Value({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--brand)]/10 text-[var(--brand)]">
        {icon}
      </div>
      <div>
        <div className="text-sm font-semibold text-foreground">{title}</div>
        <div className="text-xs text-muted-foreground">{text}</div>
      </div>
    </div>
  );
}
