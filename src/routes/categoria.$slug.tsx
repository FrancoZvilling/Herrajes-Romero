import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronRight, SlidersHorizontal, X } from "lucide-react";
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

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const { data: all = [] } = useProductsByCategory(category.slug);
  const { data: categories = [] } = useCategories();

  const [subFilter, setSubFilter] = useState<string | null>(null);
  const [brandFilter, setBrandFilter] = useState<string | null>(null);
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc" | "name">("featured");
  const [showMobile, setShowMobile] = useState(false);

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

  const Sidebar = (
    <aside className="space-y-6">
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
            <span className="text-foreground">{category.name}</span>
          </nav>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {category.name}
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">{category.description}</p>
          <p className="mt-4 text-xs font-medium uppercase tracking-widest text-[var(--brand)]">
            {filtered.length} productos
          </p>
        </div>
      </section>

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
