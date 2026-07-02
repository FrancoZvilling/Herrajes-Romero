import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart, formatARS } from "@/context/cart";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CartDrawer() {
  const { isOpen, setOpen, items, remove, updateQty, total, clear } = useCart();

  const waMsg = encodeURIComponent(
    "Hola Casa Romero! Me interesa este pedido:\n\n" +
      items.map((i) => `• ${i.name} (${i.variantLabel || "-"}) x${i.qty} — ${formatARS(i.price * i.qty)}`).join("\n") +
      `\n\nTotal: ${formatARS(total)}`,
  );

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 sm:max-w-md">
        <SheetHeader className="border-b border-border">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-[var(--brand)]" />
            Tu carrito
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--surface-muted)]">
                <ShoppingBag className="h-7 w-7 text-muted-foreground" />
              </div>
              <p className="font-display text-lg font-semibold">Tu carrito está vacío</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Explorá el catálogo y sumá productos.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {items.map((i) => (
                  <motion.div
                    key={i.productId + i.variantKey}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="rounded-lg border border-border bg-card p-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-foreground">{i.name}</p>
                        {i.variantLabel && (
                          <p className="mt-0.5 text-xs text-muted-foreground">{i.variantLabel}</p>
                        )}
                        <p className="mt-1 text-sm font-bold text-[var(--brand)]">
                          {formatARS(i.price * i.qty)}
                        </p>
                      </div>
                      <button
                        onClick={() => remove(i.productId, i.variantKey)}
                        className="rounded p-1 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                        aria-label="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-2 inline-flex items-center rounded-md border border-border">
                      <button
                        onClick={() => updateQty(i.productId, i.variantKey, i.qty - 1)}
                        className="flex h-8 w-8 items-center justify-center transition hover:bg-[var(--surface-muted)]"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{i.qty}</span>
                      <button
                        onClick={() => updateQty(i.productId, i.variantKey, i.qty + 1)}
                        className="flex h-8 w-8 items-center justify-center transition hover:bg-[var(--surface-muted)]"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border bg-[var(--surface)] p-4">
            <div className="mb-3 flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Total estimado</span>
              <span className="font-display text-2xl font-bold text-foreground">
                {formatARS(total)}
              </span>
            </div>
            <Button asChild className="h-11 w-full bg-[var(--brand)] text-white hover:bg-[var(--brand)]/90">
              <a href={`https://wa.me/5493517010095?text=${waMsg}`} target="_blank" rel="noreferrer">
                Consultar por WhatsApp
              </a>
            </Button>
            <button
              onClick={clear}
              className="mt-2 w-full text-center text-xs text-muted-foreground hover:text-destructive"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
