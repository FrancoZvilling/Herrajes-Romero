import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Minus, Plus, ShieldCheck, ShoppingBag, Truck, Wrench } from "lucide-react";
import { useProductsByCategory, useCategories } from "@/hooks/useCatalog";
import { formatARS, useCart } from "@/context/cart";
import { ProductCard } from "@/components/site/ProductCard";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Product } from "@/data/catalog";

export const Route = createFileRoute("/producto/$id")({
  loader: async ({ params }) => {
    const docRef = doc(db, "products", params.id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) throw notFound();
    return { product: { id: snapshot.id, ...snapshot.data() } as Product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Casa Romero Herrajes` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: loaderData.product.name },
          { property: "og:description", content: loaderData.product.description },
        ]
      : [{ title: "Producto" }, { name: "robots", content: "noindex" }],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="container-x py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Producto no encontrado</h1>
      <Link to="/" className="mt-4 inline-block text-[var(--brand)]">Volver al inicio</Link>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { data: categories = [] } = useCategories();
  const cat = categories.find((c) => c.slug === product.category);
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [variants, setVariants] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    product.variants?.forEach((v) => (init[v.name] = v.options[0]?.value));
    return init;
  });

  const currentPrice = useMemo(() => {
    let price = product.price;
    if (product.variants) {
      for (const v of product.variants) {
        const selectedVal = variants[v.name];
        const opt = v.options.find(o => o.value === selectedVal);
        if (opt && opt.price !== undefined && opt.price !== null) {
          price = opt.price;
          break; // First one wins
        }
      }
    }
    return price;
  }, [product, variants]);

  const { data: categoryProducts = [] } = useProductsByCategory(product.category);
  const related = categoryProducts.filter((p) => p.id !== product.id).slice(0, 4);
  const initials = product.name.split(" ").slice(0, 2).map((w: string) => w[0]).join("").toUpperCase();

  return (
    <>
      <div className="border-b border-border bg-[var(--surface)]">
        <div className="container-x py-4">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Inicio</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            {cat && (
              <>
                <Link to="/categoria/$slug" params={{ slug: cat.slug }} className="hover:text-foreground">
                  {cat.name}
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
              </>
            )}
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      <section className="container-x grid gap-12 py-12 lg:grid-cols-2">
        {/* Media */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-[var(--surface-muted)] to-[var(--surface)]"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
            ) : (
              <span className="font-display text-[160px] font-bold text-foreground/10">{initials}</span>
            )}
          </div>
          {product.brand && (
            <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider shadow-sm">
              {product.brand}
            </span>
          )}
        </motion.div>

        {/* Info */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--brand)]">
            {product.subcategory ?? cat?.name}
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 text-muted-foreground">{product.description}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-4xl font-bold">{formatARS(currentPrice)}</span>
            <span className="text-sm text-muted-foreground">IVA incluido</span>
          </div>

          {product.variants && product.variants.length > 0 && (
            <div className="mt-8 space-y-5">
              {product.variants.map((v) => (
                <div key={v.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-widest text-foreground">
                      {v.name}
                    </label>
                    <span className="text-xs text-muted-foreground">
                      Seleccionado: <b className="text-foreground">{variants[v.name]}</b>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {v.options.map((opt) => {
                      const active = variants[v.name] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => setVariants((prev) => ({ ...prev, [v.name]: opt.value }))}
                          className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition ${
                            active
                              ? "border-[var(--brand)] bg-[var(--brand)] text-white shadow-[var(--shadow-brand)]"
                              : "border-border bg-background hover:border-foreground/40"
                          }`}
                        >
                          {opt.value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-stretch gap-3">
            <div className="inline-flex items-center rounded-lg border border-border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-12 w-12 items-center justify-center transition hover:bg-[var(--surface-muted)]">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-display text-lg font-semibold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="flex h-12 w-12 items-center justify-center transition hover:bg-[var(--surface-muted)]">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => add({ ...product, price: currentPrice }, variants, qty)}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-[var(--brand)] px-6 text-sm font-semibold text-white shadow-[var(--shadow-brand)] transition hover:brightness-110 active:scale-[0.98]"
            >
              <ShoppingBag className="h-4 w-4" />
              Agregar al carrito
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 border-t border-border pt-6">
            <Perk icon={<Truck className="h-4 w-4" />} label="Retiro y envío" />
            <Perk icon={<ShieldCheck className="h-4 w-4" />} label="Marca original" />
            <Perk icon={<Wrench className="h-4 w-4" />} label="Asesoramiento" />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-[var(--surface)] py-16">
          <div className="container-x">
            <h2 className="mb-8 font-display text-2xl font-bold">Productos relacionados</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function Perk({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand)]/10 text-[var(--brand)]">
        {icon}
      </div>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}
