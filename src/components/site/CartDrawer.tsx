import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/context/cart";
import { Minus, Plus, ShoppingBag, Trash2, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function CartDrawer() {
  const { isOpen, setOpen, items, remove, updateQty, clear } = useCart();

  const waMsg = encodeURIComponent(
    "¡Hola Casa Romero! Quiero solicitar cotización por el siguiente pedido:\n\n" +
      items
        .map((i) => {
          let line = `• ${i.qty}x ${i.name}`;
          if (i.variantLabel) line += ` (${i.variantLabel})`;
          if (i.observation) line += `\n  Aclaración: ${i.observation}`;
          return line;
        })
        .join("\n") +
      "\n\n¿Me confirmarían cotización y disponibilidad? ¡Muchas gracias!"
  );

  const whatsappUrl = `https://wa.me/5493517010095?text=${waMsg}`;

  const handleSendWhatsApp = () => {
    // Registrar consulta en Firestore para el panel de administración
    try {
      addDoc(collection(db, "orders"), {
        customer: {
          nombre: "Consulta directa por WhatsApp",
          apellido: "",
          metodoEnvio: "A coordinar por WhatsApp",
        },
        items: items,
        status: "pendiente",
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.error("Error registrando pedido:", e);
    }
    setOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 sm:max-w-md">
        <SheetHeader className="border-b border-border">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-[var(--brand)]" />
            Tu Pedido ({items.reduce((s, i) => s + i.qty, 0)} productos)
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--surface-muted)]">
                <ShoppingBag className="h-7 w-7 text-muted-foreground" />
              </div>
              <p className="font-display text-lg font-semibold">Tu pedido está vacío</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Explorá el catálogo y sumá los productos que necesitás cotizar.
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
                        {i.observation && (
                          <p className="mt-1 text-xs font-medium text-[var(--brand)]">
                            Obs: {i.observation}
                          </p>
                        )}
                        <p className="mt-1 text-xs font-semibold text-muted-foreground">
                          Cantidad: <span className="text-foreground">{i.qty}</span>
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
                    <div className="mt-3 inline-flex items-center rounded-md border border-border">
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
          <div className="border-t border-border bg-[var(--surface)] p-4 space-y-3">
            <div className="rounded-lg border border-[var(--brand)]/20 bg-[var(--brand)]/5 p-3 text-xs text-muted-foreground">
              💬 <strong>Cotización directa:</strong> Al tocar el botón se abrirá WhatsApp con la lista de productos para coordinar precio, disponibilidad y entrega.
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={handleSendWhatsApp}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] text-sm font-bold text-white shadow-md transition hover:bg-[#20bd5a] hover:scale-[1.01] active:scale-[0.99]"
            >
              <MessageCircle className="h-5 w-5" />
              Enviar Pedido por WhatsApp
            </a>

            <button
              onClick={clear}
              className="mt-1 w-full text-center text-xs text-muted-foreground hover:text-destructive"
            >
              Vaciar pedido
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
