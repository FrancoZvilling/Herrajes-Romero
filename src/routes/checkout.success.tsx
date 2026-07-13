import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const Route = createFileRoute("/checkout/success")({
  component: CheckoutSuccessPage,
});

function CheckoutSuccessPage() {
  const search = useSearch({ from: "/checkout/success" }) as any;
  const paymentId = search.payment_id;
  const status = search.status;
  const orderId = search.external_reference;

  useEffect(() => {
    // Actualizamos Firebase directamente desde el frontend como alternativa al webhook
    // (Funciona bien para este MVP mientras no cerremos la pestaña)
    if (orderId && status === "approved") {
      updateDoc(doc(db, "orders", orderId), {
        status: "paid",
        paymentId: paymentId
      }).catch(err => console.error("Error actualizando orden:", err));
    }
  }, [orderId, status, paymentId]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-600">
        <CheckCircle2 className="h-14 w-14" />
      </div>
      <h1 className="font-display text-4xl font-bold text-foreground">¡Pago Exitoso!</h1>
      <p className="mt-4 max-w-lg text-lg text-muted-foreground">
        Tu pago ha sido procesado correctamente y tu pedido ya está registrado en nuestro sistema.
        En breve nos comunicaremos con vos para coordinar los detalles de entrega.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          to="/"
          className="inline-flex h-11 items-center justify-center rounded-md bg-[var(--brand)] px-8 font-semibold text-white transition-colors hover:bg-[var(--brand)]/90"
        >
          Volver a la tienda
        </Link>
      </div>
    </div>
  );
}
