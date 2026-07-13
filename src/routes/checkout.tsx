import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart, formatARS } from "@/context/cart";
import { Button } from "@/components/ui/button";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { createServerFn } from "@tanstack/react-start";

const createPreferenceFn = createServerFn({ method: "POST" })
  .validator((data: any) => data)
  .handler(async ({ data }) => {
    try {
      const { MercadoPagoConfig, Preference } = await import('mercadopago');
      const client = new MercadoPagoConfig({
        accessToken: process.env.MP_ACCESS_TOKEN || '',
        options: { timeout: 5000 }
      });
      const preference = new Preference(client);

      const serverBaseUrl = process.env.VITE_SITE_URL || 'http://localhost:8080';
      const response = await preference.create({
        body: {
          items: data.items?.map((item: any) => ({
            id: item.productId,
            title: item.name,
            quantity: Number(item.qty),
            unit_price: Number(item.price),
            currency_id: 'ARS',
          })) || [],
          payer: {
            name: data.customer?.nombre || '',
            surname: data.customer?.apellido || '',
            email: data.customer?.email || 'test@test.com',
          },
          back_urls: {
            success: `${serverBaseUrl}/checkout/success`,
            pending: `${serverBaseUrl}/checkout/pending`,
            failure: `${serverBaseUrl}/checkout/failure`,
          },
          auto_return: serverBaseUrl.includes('localhost') ? undefined : "approved",
          external_reference: data.orderId || '0',
        }
      });
      
      return { init_point: response.init_point };
    } catch (error: any) {
      console.error(error);
      throw new Error("No se pudo crear la preferencia de pago: " + error.message);
    }
  });

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, total, clear } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    dni: "",
    metodoEnvio: "acordar", // acordar, andreani, viacargo, uber
    direccion: "",
    ciudad: "",
    provincia: "",
    codigoPostal: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setLoading(true);
    try {
      // 1. Crear documento de orden en Firestore
      const orderRef = await addDoc(collection(db, "orders"), {
        customer: formData,
        items: items,
        subtotal: total,
        shippingCost: 0, // Por ahora 0, luego se integrará API de envíos
        total: total,
        status: "pending", // pendiente de pago
        createdAt: serverTimestamp(),
      });

      // 2. Limpiar carrito local
      clear();
      
      // 3. Crear preferencia de pago de Mercado Pago
      const baseUrl = window.location.origin;
      const { init_point } = await createPreferenceFn({
        data: {
          orderId: orderRef.id,
          customer: formData,
          items: items,
          baseUrl
        }
      });

      if (init_point) {
        window.location.href = init_point;
      } else {
        throw new Error("No se recibió el init_point de Mercado Pago");
      }
      
    } catch (error) {
      console.error("Error al procesar el pedido:", error);
      alert("Hubo un error al procesar tu pedido. Por favor, intentá de nuevo.");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-display text-4xl font-bold text-foreground">¡Orden creada con éxito!</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Hemos registrado tu pedido correctamente. En breve nos contactaremos para coordinar el pago y envío.
        </p>
        <div className="mt-8">
          <Button asChild className="bg-[var(--brand)]">
            <a href="/">Volver a la tienda</a>
          </Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="font-display text-3xl font-bold">Tu carrito está vacío</h1>
        <p className="mt-4 text-muted-foreground">Agregá productos para poder realizar la compra.</p>
        <Button onClick={() => navigate({ to: "/" })} className="mt-6 bg-[var(--brand)]">
          Volver al catálogo
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 font-display text-3xl font-bold text-foreground">Finalizar Compra</h1>
      
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Formulario */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Datos Personales */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="mb-4 font-display text-xl font-semibold">1. Datos Personales</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">Nombre</label>
                  <input required type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none focus:ring-1 focus:ring-[var(--brand)]" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Apellido</label>
                  <input required type="text" name="apellido" value={formData.apellido} onChange={handleChange} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none focus:ring-1 focus:ring-[var(--brand)]" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Email</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none focus:ring-1 focus:ring-[var(--brand)]" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Teléfono (WhatsApp)</label>
                  <input required type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none focus:ring-1 focus:ring-[var(--brand)]" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium">DNI / CUIT</label>
                  <input required type="text" name="dni" value={formData.dni} onChange={handleChange} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none focus:ring-1 focus:ring-[var(--brand)]" />
                </div>
              </div>
            </div>

            {/* Opciones de Envío */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="mb-4 font-display text-xl font-semibold">2. Entrega</h2>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">Método de Envío / Retiro</label>
                <select name="metodoEnvio" value={formData.metodoEnvio} onChange={handleChange} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none focus:ring-1 focus:ring-[var(--brand)]">
                  <option value="acordar">Acordar con el vendedor (Retiro en local)</option>
                  <option value="andreani">Andreani (Próximamente)</option>
                  <option value="viacargo">Vía Cargo (Próximamente)</option>
                  <option value="uber">Uber Entregas (Solo Córdoba)</option>
                </select>
              </div>

              {formData.metodoEnvio !== "acordar" && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-sm font-medium">Dirección</label>
                    <input required type="text" name="direccion" value={formData.direccion} onChange={handleChange} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none focus:ring-1 focus:ring-[var(--brand)]" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Ciudad</label>
                    <input required type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none focus:ring-1 focus:ring-[var(--brand)]" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Provincia</label>
                    <input required type="text" name="provincia" value={formData.provincia} onChange={handleChange} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none focus:ring-1 focus:ring-[var(--brand)]" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-sm font-medium">Código Postal</label>
                    <input required type="text" name="codigoPostal" value={formData.codigoPostal} onChange={handleChange} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none focus:ring-1 focus:ring-[var(--brand)]" />
                  </div>
                </div>
              )}
            </div>

            <Button type="submit" disabled={loading} className="h-12 w-full bg-[var(--brand)] text-base font-semibold hover:bg-[var(--brand)]/90">
              {loading ? "Procesando..." : "Confirmar Pedido"}
            </Button>
          </form>
        </div>

        {/* Resumen */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 rounded-xl border border-border bg-[var(--surface-muted)] p-6">
            <h2 className="mb-4 font-display text-xl font-semibold">Resumen del Pedido</h2>
            <div className="mb-4 max-h-[40vh] overflow-y-auto space-y-4 pr-2">
              {items.map((i) => (
                <div key={i.productId + i.variantKey} className="flex justify-between text-sm">
                  <div>
                    <span className="font-semibold">{i.qty}x</span> {i.name}
                    {i.variantLabel && <p className="text-xs text-muted-foreground">{i.variantLabel}</p>}
                  </div>
                  <span className="font-medium">{formatARS(i.price * i.qty)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4">
              <div className="flex justify-between font-display text-xl font-bold text-[var(--brand)]">
                <span>Total</span>
                <span>{formatARS(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
