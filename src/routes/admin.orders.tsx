import { createFileRoute } from "@tanstack/react-router";
import { useOrders } from "@/hooks/useCatalog";
import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Archive, MessageCircle } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrders,
});

function AdminOrders() {
  const { data: orders = [], isLoading } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Mostrar todos los pedidos que no estén archivados
  const filteredOrders = [...orders]
    .filter((order) => !order.archived)
    .sort((a, b) => {
      const dateA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt || 0).getTime();
      const dateB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt || 0).getTime();
      return dateB - dateA;
    });

  const handleArchive = async (id: string) => {
    if (confirm("¿Estás seguro de que deseas archivar este pedido? Desaparecerá de la lista activa.")) {
      try {
        await updateDoc(doc(db, "orders", id), {
          archived: true,
        });
      } catch (error) {
        console.error("Error archivando orden:", error);
        alert("Hubo un error al archivar la orden.");
      }
    }
  };

  const getCleanPhone = (phone?: string) => {
    if (!phone) return "";
    let clean = phone.replace(/\D/g, "");
    if (!clean.startsWith("54") && clean.length >= 10) {
      clean = "549" + clean;
    }
    return clean;
  };

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl font-bold tracking-tight">Pedidos y Cotizaciones</h1>

      {isLoading ? (
        <div className="text-muted-foreground">Cargando pedidos...</div>
      ) : (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-6 py-4 font-medium">Fecha</th>
                  <th className="px-6 py-4 font-medium">Cliente</th>
                  <th className="px-6 py-4 font-medium">Teléfono</th>
                  <th className="px-6 py-4 font-medium">Método de Entrega</th>
                  <th className="px-6 py-4 font-medium text-center">Artículos</th>
                  <th className="px-6 py-4 font-medium text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                      No hay pedidos ni cotizaciones registradas.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => {
                    const date = order.createdAt?.toDate ? order.createdAt.toDate() : new Date(order.createdAt || Date.now());
                    const phoneClean = getCleanPhone(order.customer?.telefono);
                    const totalQty = order.items?.reduce((s: number, i: any) => s + (i.qty || 1), 0) || 0;

                    return (
                      <tr key={order.id} className="transition-colors hover:bg-muted/30">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {format(date, "dd MMM yyyy, HH:mm", { locale: es })}
                        </td>
                        <td className="px-6 py-4 font-medium text-foreground">
                          <div className="flex flex-col">
                            <span className="font-mono text-xs font-bold text-[var(--brand)]">
                              #{order.id.substring(0, 6).toUpperCase()}
                            </span>
                            <span>{order.customer?.nombre} {order.customer?.apellido}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {order.customer?.telefono ? (
                            <a
                              href={`https://wa.me/${phoneClean}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 font-medium text-green-600 hover:underline"
                            >
                              <MessageCircle className="h-3.5 w-3.5" />
                              {order.customer.telefono}
                            </a>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
                            {order.customer?.metodoEnvio === "acordar"
                              ? "Retiro en local"
                              : order.customer?.metodoEnvio === "uber"
                              ? "Uber Entregas"
                              : order.customer?.metodoEnvio === "viacargo"
                              ? "Vía Cargo"
                              : order.customer?.metodoEnvio || "Acordar"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center font-semibold text-foreground">
                          {totalQty}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <button
                              onClick={() => handleArchive(order.id)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                              title="Archivar/Ocultar pedido"
                            >
                              <Archive className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="font-medium text-[var(--brand)] hover:underline"
                            >
                              Ver detalle
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Detalle del Pedido {selectedOrder ? `#${selectedOrder.id.substring(0, 6).toUpperCase()}` : ""}
            </DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="grid gap-6 py-4 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-widest text-[var(--brand)]">Datos del Cliente</h3>
                  <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm space-y-1">
                    <p><strong>Nombre:</strong> {selectedOrder.customer?.nombre} {selectedOrder.customer?.apellido}</p>
                    <p><strong>Teléfono:</strong> {selectedOrder.customer?.telefono}</p>
                    {selectedOrder.customer?.email && <p><strong>Email:</strong> {selectedOrder.customer.email}</p>}
                    {selectedOrder.customer?.dni && <p><strong>DNI/CUIT:</strong> {selectedOrder.customer.dni}</p>}
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-widest text-[var(--brand)]">Datos de Entrega</h3>
                  <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm">
                    <p><strong>Método:</strong> {
                      selectedOrder.customer?.metodoEnvio === "acordar" ? "Acordar con el vendedor (Retiro en local)" :
                      selectedOrder.customer?.metodoEnvio === "uber" ? "Uber Entregas (Solo Córdoba - Pago en destino)" :
                      selectedOrder.customer?.metodoEnvio === "viacargo" ? "Vía Cargo (Pago en destino)" :
                      selectedOrder.customer?.metodoEnvio || "No especificado"
                    }</p>

                    {selectedOrder.customer?.metodoEnvio !== "acordar" && selectedOrder.customer?.direccion && (
                      <div className="mt-3 space-y-1 border-t border-border/50 pt-3">
                        <p><strong>Dirección:</strong> {selectedOrder.customer.direccion}</p>
                        <p><strong>Ciudad:</strong> {selectedOrder.customer.ciudad}</p>
                        <p><strong>Provincia:</strong> {selectedOrder.customer.provincia}</p>
                        <p><strong>C.P.:</strong> {selectedOrder.customer.codigoPostal}</p>
                      </div>
                    )}
                  </div>
                </div>

                {selectedOrder.customer?.telefono && (
                  <Button
                    asChild
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white gap-2 font-semibold"
                  >
                    <a
                      href={`https://wa.me/${getCleanPhone(selectedOrder.customer.telefono)}?text=${encodeURIComponent(`¡Hola ${selectedOrder.customer.nombre}! Te escribo de Casa Romero Herrajes sobre tu pedido #${selectedOrder.id.substring(0, 6).toUpperCase()}.`)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Contactar cliente por WhatsApp
                    </a>
                  </Button>
                )}
              </div>

              <div>
                <h3 className="mb-2 text-sm font-bold uppercase tracking-widest text-[var(--brand)]">Artículos Solicitados</h3>
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <ul className="divide-y divide-border">
                    {selectedOrder.items?.map((item: any, i: number) => (
                      <li key={i} className="py-3 text-sm first:pt-0 last:pb-0">
                        <div className="flex justify-between font-medium">
                          <span className="text-foreground">{item.name}</span>
                          <span className="font-bold text-[var(--brand)]">x{item.qty}</span>
                        </div>
                        {item.variantLabel && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {item.variantLabel}
                          </p>
                        )}
                        {item.observation && (
                          <p className="mt-1 text-xs font-semibold text-[var(--brand)]">
                            Aclaración: {item.observation}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex justify-between border-t border-border pt-4 text-sm font-bold text-foreground">
                    <span>Total de unidades</span>
                    <span>{selectedOrder.items?.reduce((s: number, i: any) => s + (i.qty || 1), 0) || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
