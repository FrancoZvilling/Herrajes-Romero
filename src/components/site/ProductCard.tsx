import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ShoppingBag, Package } from "lucide-react";
import { useMemo, useState } from "react";
import type { Product } from "@/data/catalog";
import { useCart, formatARS } from "@/context/cart";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [variants, setVariants] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    product.variants?.forEach((v) => (init[v.name] = v.options[0]?.value));
    return init;
  });

  const currentPrice = useMemo(() => {
    let price = product.price;
    // Find if any selected variant option has a specific price
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

  const initials = useMemo(
    () => product.name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase(),
    [product.name],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] card-hover"
    >
      <Link
        to="/producto/$id"
        params={{ id: product.id }}
        className="relative block aspect-square overflow-hidden bg-gradient-to-br from-[var(--surface-muted)] to-[var(--surface)]"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
          ) : (
            <span className="font-display text-6xl font-bold text-foreground/10 transition-transform duration-500 group-hover:scale-110">
              {initials}
            </span>
          )}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--brand)_0%,transparent_60%)] opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-10" />
        {product.brand && (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground shadow-sm backdrop-blur">
            {product.brand}
          </span>
        )}
        {product.featured && (
          <span className="absolute right-3 top-3 rounded-full bg-[var(--brand)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-[var(--shadow-brand)]">
            Destacado
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          <Package className="h-3 w-3" />
          {product.subcategory ?? "General"}
        </div>
        <Link
          to="/producto/$id"
          params={{ id: product.id }}
          className="font-display text-[15px] font-semibold leading-snug text-foreground transition-colors hover:text-[var(--brand)]"
        >
          {product.name}
        </Link>

        {product.variants && product.variants.length > 0 && (
          <div className="mt-3 space-y-2">
            {product.variants.slice(0, 2).map((v) => (
              <div key={v.name}>
                <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {v.name}
                </div>
                <div className="flex flex-wrap gap-1">
                  {v.options.slice(0, 4).map((opt) => {
                    const active = variants[v.name] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setVariants((prev) => ({ ...prev, [v.name]: opt.value }))}
                        className={`rounded-md border px-2 py-1 text-[11px] font-medium transition ${
                          active
                            ? "border-[var(--brand)] bg-[var(--brand)] text-white"
                            : "border-border bg-background text-foreground/70 hover:border-foreground/40"
                        }`}
                      >
                        {opt.value}
                      </button>
                    );
                  })}
                  {v.options.length > 4 && (
                    <Link
                      to="/producto/$id" params={{ id: product.id }}
                      className="rounded-md border border-dashed border-border px-2 py-1 text-[11px] text-muted-foreground hover:border-foreground/40"
                    >
                      +{v.options.length - 4}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto pt-4 flex items-end justify-between gap-2">
          <div>
            <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Precio
            </div>
            <div className="font-display text-xl font-bold text-foreground">
              {formatARS(currentPrice)}
            </div>
          </div>
          <button
            onClick={() => add({ ...product, price: currentPrice }, variants)}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-md bg-foreground px-3 text-xs font-semibold text-background transition hover:bg-[var(--brand)] active:scale-95"
          >
            <ShoppingBag className="h-4 w-4" />
            Agregar
          </button>
        </div>
      </div>
    </motion.div>
  );
}
