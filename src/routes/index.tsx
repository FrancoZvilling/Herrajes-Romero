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
      <section className="relative overflow-hidden bg-[#0a0a0a] text-white py-24 border-y border-white/5">
        {/* UNIQUE BACKGROUND TEXTURE & ANIMATION */}
        <div className="absolute inset-0 z-0">
          {/* Tech/Hardware pattern texture in orange */}
          <div 
            className="absolute inset-0 opacity-[0.25]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ea580c' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Vignette mask to fade out the edges */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,#0a0a0a_90%)]" />

          {/* Cinematic scanning light (moves vertically) */}
          <motion.div
            animate={{ top: ['-20%', '120%'] }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[300px] w-full"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(234, 88, 12, 0.25), transparent)'
            }}
          />
        </div>

        <div className="container-x relative z-10">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--brand)]">Explorá</p>
              <h2 className="mt-2 font-display text-4xl font-bold tracking-tight text-white">
                Todas las categorías
              </h2>
            </div>
            <p className="max-w-sm text-sm text-white/70">
              Organizamos nuestro catálogo por línea para que encuentres al toque lo que buscás.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 p-6 shadow-2xl transition hover:border-[var(--brand)]/50"
                >
                  <div 
                    className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('/categories/${c.slug}.png')` }}
                  />
                  <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/95 via-black/70 to-black/30 transition-opacity duration-500 group-hover:opacity-90" />
                  
                  <div className="relative z-10 mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--brand)] text-white backdrop-blur shadow-[var(--shadow-brand)]">
                    <Wrench className="h-5 w-5" />
                  </div>
                  <h3 className="relative z-10 font-display text-xl font-semibold text-white drop-shadow-md">{c.name}</h3>
                  <p className="relative z-10 mt-2 text-sm text-white/80 drop-shadow-md">{c.description}</p>
                  <span className="relative z-10 mt-auto pt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--brand)] brightness-125">
                    Ver productos
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="relative overflow-hidden bg-[#c2410c] py-24 border-y border-black/10">
        {/* UNIQUE BACKGROUND TEXTURE & ANIMATION (Inverse) */}
        <div className="absolute inset-0 z-0">
          {/* Tech/Hardware pattern texture in black */}
          <div 
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Vignette mask to fade out the edges with a darker brown/orange */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#7c2d12_100%)] opacity-80" />

          {/* Cinematic scanning light (moves vertically, black shadow) */}
          <motion.div
            animate={{ top: ['-20%', '120%'] }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 3.5 }}
            className="absolute left-0 right-0 h-[300px] w-full"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.15), transparent)'
            }}
          />
        </div>

        <div className="container-x relative z-10">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-white/80 drop-shadow-md">Destacados</p>
              <h2 className="mt-2 font-display text-4xl font-bold tracking-tight text-white drop-shadow-md">
                Los más pedidos
              </h2>
            </div>
            <p className="hidden max-w-sm text-sm font-medium text-white/90 drop-shadow-md md:block">
              Estos son los productos que más eligen nuestros clientes. Calidad y precio garantizados.
            </p>
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
