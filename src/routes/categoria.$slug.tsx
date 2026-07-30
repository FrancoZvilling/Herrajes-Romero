import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { ChevronRight, SlidersHorizontal, X, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useProductsByCategory, useCategories } from "@/hooks/useCatalog";
import { ProductCard } from "@/components/site/ProductCard";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Category } from "@/data/catalog";

export const Route = createFileRoute("/categoria/$slug")({
  loader: async ({ params }) => {
    const docRef = doc(db, "categories", params.slug);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) throw notFound();
    return { category: snapshot.data() as Category };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.category.name} — Casa Romero Herrajes` },
          { name: "description", content: loaderData.category.description },
          { property: "og:title", content: `${loaderData.category.name} — Casa Romero` },
          { property: "og:description", content: loaderData.category.description },
        ]
      : [{ title: "Categoría — Casa Romero" }, { name: "robots", content: "noindex" }],
  }),
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="container-x py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Categoría no encontrada</h1>
      <Link to="/" className="mt-4 inline-block text-[var(--brand)]">Volver al inicio</Link>
    </div>
  ),
});

// Imágenes de fantasía/abstractas para las subcategorías (arquitectura, texturas, herramientas)
const FANTASY_IMAGES = [
  "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
];

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const { data: all = [] } = useProductsByCategory(category.slug);
  const { data: categories = [] } = useCategories();

  const [subFilter, setSubFilter] = useState<string | null>(null);
  const [brandFilter, setBrandFilter] = useState<string | null>(null);
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc" | "name">("featured");
  const [showMobile, setShowMobile] = useState(false);

  // Limpiar filtros al cambiar de categoría
  useEffect(() => {
    setSubFilter(null);
    setBrandFilter(null);
  }, [category.slug]);

  const filtered = useMemo(() => {
    let list = all;
    if (subFilter) list = list.filter((p) => p.subcategory === subFilter);
    if (brandFilter) list = list.filter((p) => p.brand === brandFilter);
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "name": list = [...list].sort((a, b) => a.name.localeCompare(b.name)); break;
      default: list = [...list].sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
    }
    return list;
  }, [all, subFilter, brandFilter, sort]);

  const availableBrands = useMemo(
    () => Array.from(new Set(all.map((p) => p.brand).filter(Boolean))) as string[],
    [all],
  );

  const hasSubcategories = category.subcategories && category.subcategories.length > 0;
  const showSubcategoriesGrid = !subFilter && hasSubcategories;

  const Sidebar = (
    <aside className="space-y-6">
      {hasSubcategories && (
        <div className="mb-6 border-b border-border pb-6">
          <button
            onClick={() => setSubFilter(null)}
            className="group flex w-full items-center gap-2 rounded-lg bg-[var(--surface-muted)] px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-[var(--brand)] hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Volver a subcategorías
          </button>
        </div>
      )}

      <FilterGroup title="Subcategoría">
        <FilterPill active={!subFilter} onClick={() => setSubFilter(null)}>Todas</FilterPill>
        {category.subcategories?.map((s: string) => (
          <FilterPill key={s} active={subFilter === s} onClick={() => setSubFilter(s)}>
            {s}
          </FilterPill>
        ))}
      </FilterGroup>

      {availableBrands.length > 0 && (
        <FilterGroup title="Marca">
          <FilterPill active={!brandFilter} onClick={() => setBrandFilter(null)}>Todas</FilterPill>
          {availableBrands.map((b) => (
            <FilterPill key={b} active={brandFilter === b} onClick={() => setBrandFilter(b)}>
              {b}
            </FilterPill>
          ))}
        </FilterGroup>
      )}

      <FilterGroup title="Otras categorías">
        <div className="flex flex-col gap-1">
          {categories.filter((c) => c.slug !== category.slug).slice(0, 11).map((c) => (
            <Link
              key={c.slug}
              to="/categoria/$slug" params={{ slug: c.slug }}
              className="rounded px-2 py-1.5 text-sm text-muted-foreground transition hover:bg-[var(--surface-muted)] hover:text-foreground"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </FilterGroup>
    </aside>
  );

  return (
    <>
      {/* Header */}
      <section className="border-b border-border bg-[var(--surface)]">
        <div className="container-x py-10">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Inicio</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            {subFilter ? (
              <>
                <button onClick={() => setSubFilter(null)} className="hover:text-foreground transition-colors">
                  {category.name}
                </button>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="text-foreground">{subFilter}</span>
              </>
            ) : (
              <span className="text-foreground">{category.name}</span>
            )}
          </nav>
          <motion.h1 
            key={subFilter || "cat"}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl"
          >
            {subFilter || category.name}
          </motion.h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {subFilter ? `Explorá todos nuestros productos de la subcategoría ${subFilter}.` : category.description}
          </p>
          {!showSubcategoriesGrid && (
            <p className="mt-4 text-xs font-medium uppercase tracking-widest text-[var(--brand)]">
              {filtered.length} productos
            </p>
          )}
        </div>
      </section>

      {showSubcategoriesGrid ? (
        // VISTA: GRILLA DE SUBCATEGORÍAS
        <section className="bg-background py-16">
          <div className="container-x">
            <div className="mb-10 flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold">¿Qué estás buscando?</h2>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {category.subcategories?.map((s: string, i: number) => {
                const imgIndex = i % FANTASY_IMAGES.length;
                return (
                  <motion.button
                    key={s}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    onClick={() => setSubFilter(s)}
                    className="group relative flex aspect-[4/3] w-full cursor-pointer flex-col justify-end overflow-hidden rounded-2xl bg-[var(--surface-muted)] text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--brand)]/20"
                  >
                    <div 
                      className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${FANTASY_IMAGES[imgIndex]})` }}
                    />
                    <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-300 group-hover:opacity-95" />
                    <div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:bg-[var(--brand)]/20 group-hover:opacity-100 mix-blend-overlay" />
                    
                    <div className="pointer-events-none relative z-10 p-6 w-full">
                      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[var(--brand)] group-hover:border-[var(--brand)]">
                        <ChevronRight className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-white drop-shadow-md">
                        {s}
                      </h3>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>
      ) : (
        // VISTA: PRODUCTOS Y FILTROS
        <section className="container-x grid gap-8 py-10 lg:grid-cols-[240px_1fr]">
          <div className="hidden lg:block">{Sidebar}</div>

          <div>
            <div className="mb-6 flex items-center justify-between gap-3">
              <button
                onClick={() => setShowMobile(true)}
                className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" /> Filtros
              </button>
              <div className="ml-auto flex items-center gap-2 text-sm">
                <label className="text-muted-foreground">Ordenar:</label>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as typeof sort)}
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm font-medium focus:border-[var(--brand)] focus:outline-none"
                >
                  <option value="featured">Destacados</option>
                  <option value="price-asc">Precio: menor a mayor</option>
                  <option value="price-desc">Precio: mayor a menor</option>
                  <option value="name">Nombre A-Z</option>
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-16 text-center">
                <p className="font-display text-lg font-semibold">No hay productos con estos filtros</p>
                <button
                  onClick={() => { setSubFilter(null); setBrandFilter(null); }}
                  className="mt-3 text-sm font-semibold text-[var(--brand)]"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Mobile filter drawer */}
      {showMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobile(false)} />
          <div className="absolute inset-y-0 left-0 w-full max-w-xs overflow-y-auto bg-background p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-display text-lg font-bold">Filtros</span>
              <button onClick={() => setShowMobile(false)}><X className="h-5 w-5" /></button>
            </div>
            {Sidebar}
          </div>
        </div>
      )}
    </>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-foreground">
        {title}
      </h3>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function FilterPill({
  active, onClick, children,
}: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md border px-2.5 py-1.5 text-xs font-medium transition ${
        active
          ? "border-[var(--brand)] bg-[var(--brand)] text-white"
          : "border-border bg-background text-foreground/70 hover:border-foreground/40"
      }`}
    >
      {children}
    </button>
  );
}
