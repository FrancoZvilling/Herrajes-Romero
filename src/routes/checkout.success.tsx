import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { formatARS } from "@/context/cart";

export const Route = createFileRoute("/checkout/success")({
  component: CheckoutSuccessPage,
});

function CheckoutSuccessPage() {
  const search = useSearch({ from: "/checkout/success" }) as any;
  const paymentId = search.payment_id;
  const status = search.status;
  const orderId = search.external_reference;

  const [whatsappLink, setWhatsappLink] = useState("");

  const shortOrderId = orderId ? `#${orderId.substring(0, 6).toUpperCase()}` : '';

  useEffect(() => {
    async function processSuccess() {
      if (!orderId) return;

      if (status === "approved") {
        updateDoc(doc(db, "orders", orderId), {
          status: "approved",
          paymentId: paymentId
        }).catch(err => console.error("Error actualizando orden:", err));
      }

      try {
        const orderSnap = await getDoc(doc(db, "orders", orderId));
        if (orderSnap.exists()) {
          const data = orderSnap.data();
          const methodMap: Record<string, string> = {
            acordar: "Acordar con el vendedor (Retiro en local)",
            andreani: "Andreani",
            viacargo: "Vía Cargo",
            uber: "Uber Entregas"
          };

          let msg = `*¡Hola Casa Romero! Acabo de pagar un pedido por Mercado Pago.*\n`;
          msg += `*ID del Pedido:* #${orderId.substring(0, 6).toUpperCase()}\n\n`;
          
          msg += `*📦 DETALLE DEL PEDIDO*\n`;
          data.items.forEach((i: any) => {
            msg += `- ${i.qty}x ${i.name}\n`;
            if (i.variantLabel) {
              msg += `  _${i.variantLabel}_\n`;
            }
            if (i.observation) {
              msg += `  *Nota:* ${i.observation}\n`;
            }
          });
          msg += `\n*TOTAL:* ${formatARS(data.total)}\n\n`;
          
          msg += `*👤 DATOS DEL CLIENTE*\n`;
          msg += `- Nombre: ${data.customer.nombre} ${data.customer.apellido}\n`;
          msg += `- DNI/CUIT: ${data.customer.dni}\n`;
          
          msg += `\n*🚚 DATOS DE ENTREGA*\n`;
          msg += `- Método: ${methodMap[data.customer.metodoEnvio] || data.customer.metodoEnvio}\n`;
          if (data.customer.metodoEnvio !== "acordar") {
            msg += `- Dirección: ${data.customer.direccion}\n`;
            msg += `- Ciudad: ${data.customer.ciudad}, ${data.customer.provincia}\n`;
          }
          
          msg += `\n_¡Ya está pago y listo para despachar!_`;
          
          setWhatsappLink(`https://wa.me/5493513468100?text=${encodeURIComponent(msg)}`);
        }
      } catch (err) {
        console.error("Error fetching order:", err);
      }
    }

    processSuccess();
  }, [orderId, status, paymentId]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center pb-12">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-600 mt-12">
        <CheckCircle2 className="h-14 w-14" />
      </div>
      <h1 className="font-display text-4xl font-bold text-foreground">¡Pago Exitoso!</h1>
      
      {shortOrderId && (
        <div className="mt-6 rounded-lg bg-muted/50 px-6 py-4">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Número de Pedido</p>
          <p className="text-3xl font-bold text-[var(--brand)]">{shortOrderId}</p>
        </div>
      )}

      <p className="mt-6 max-w-lg text-lg text-muted-foreground">
        Tu pago ha sido procesado correctamente y tu pedido ya está registrado en nuestro sistema.
      </p>

      {whatsappLink && (
        <div className="mt-8 rounded-xl border-2 border-green-500/20 bg-green-50/50 p-6 max-w-lg w-full">
          <h3 className="mb-2 font-display text-xl font-bold text-green-900">¡Acelerá tu despacho!</h3>
          <p className="mb-6 text-sm text-green-800">
            Enviá tu comprobante y el detalle del pedido directamente a nuestro WhatsApp para procesarlo más rápido.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-lg bg-[#25D366] px-8 text-lg font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#20bd5a]"
          >
            <MessageCircle className="h-6 w-6" />
            Enviar orden por WhatsApp
          </a>
        </div>
      )}

      <div className="mt-12 flex gap-4">
        <Link
          to="/"
          className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 font-semibold text-foreground transition-colors hover:bg-muted"
        >
          Volver al catálogo
        </Link>
      </div>
    </div>
  );
}
