import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/data/catalog";

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  qty: number;
  variantKey: string; // "Material:Bronce|Medida:30cm"
  variantLabel: string;
};

type CartCtx = {
  items: CartItem[];
  add: (product: Product, variants: Record<string, string>, qty?: number) => void;
  remove: (productId: string, variantKey: string) => void;
  updateQty: (productId: string, variantKey: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
  isOpen: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<CartCtx | null>(null);

const STORAGE_KEY = "casa-romero-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  const value = useMemo<CartCtx>(() => {
    const variantKeyOf = (v: Record<string, string>) =>
      Object.entries(v).map(([k, val]) => `${k}:${val}`).join("|");

    return {
      items,
      isOpen,
      setOpen,
      add: (product, variants, qty = 1) => {
        const key = variantKeyOf(variants);
        const label = Object.entries(variants).map(([k, v]) => `${k}: ${v}`).join(" · ");
        setItems((prev) => {
          const idx = prev.findIndex((i) => i.productId === product.id && i.variantKey === key);
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = { ...next[idx], qty: next[idx].qty + qty };
            return next;
          }
          return [
            ...prev,
            { productId: product.id, name: product.name, price: product.price, qty, variantKey: key, variantLabel: label },
          ];
        });
        setOpen(true);
      },
      remove: (productId, variantKey) =>
        setItems((prev) => prev.filter((i) => !(i.productId === productId && i.variantKey === variantKey))),
      updateQty: (productId, variantKey, qty) =>
        setItems((prev) =>
          prev.map((i) =>
            i.productId === productId && i.variantKey === variantKey ? { ...i, qty: Math.max(1, qty) } : i,
          ),
        ),
      clear: () => setItems([]),
      count: items.reduce((s, i) => s + i.qty, 0),
      total: items.reduce((s, i) => s + i.qty * i.price, 0),
    };
  }, [items, isOpen]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}

export const formatARS = (n: number) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);
