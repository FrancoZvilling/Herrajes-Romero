import { createFileRoute } from "@tanstack/react-router";
import { useOrders } from "@/hooks/useCatalog";
import { formatARS } from "@/context/cart";
import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Archive } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrders,
});

function AdminOrders() {
  const { data: orders = [], isLoading } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Solo mostrar órdenes aprobadas (con pago hecho) y que no estén archivadas
  const filteredOrders = [...orders]
    .filter((order) => order.status === "approved" && !order.archived)
    .sort((a, b) => {
      const dateA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt).getTime();
      const dateB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt).getTime();
      return dateB - dateA;
    });

  const handleArchive = async (id: string) => {
    if (confirm("¿Estás seguro de que deseas archivar esta orden? No se borrará del historial financiero, pero desaparecerá de esta lista.")) {
      try {
        await updateDoc(doc(db, "orders", id), {
          archived: true
        });
      } catch (error) {
        console.error("Error archivando orden:", error);
        alert("Hubo un error al archivar la orden.");
      }
    }
  };

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl font-bold tracking-tight">Órdenes de Venta</h1>

      {isLoading ? (
        <div className="text-muted-foreground">Cargando órdenes...</div>
      ) : (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-6 py-4 font-medium">Fecha</th>
                  <th className="px-6 py-4 font-medium">Cliente</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">Estado</th>
                  <th className="px-6 py-4 font-medium text-right">Total</th>
                  <th className="px-6 py-4 font-medium text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                      No hay órdenes registradas.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => {
                    const date = order.createdAt?.toDate ? order.createdAt.toDate() : new Date(order.createdAt);
                    return (
                      <tr key={order.id} className="transition-colors hover:bg-muted/30">
                        <td className="px-6 py-4">
                          {format(date, "dd MMM yyyy, HH:mm", { locale: es })}
                        </td>
                        <td className="px-6 py-4 font-medium text-foreground">
                          <div className="flex flex-col">
                            <span className="font-mono text-xs font-bold text-[var(--brand)]">#{order.id.substring(0, 6).toUpperCase()}</span>
                            <span>{order.customer?.nombre} {order.customer?.apellido}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">{order.customer?.email}</td>
                        <td className="px-6 py-4">
                          {order.status === "approved" ? (
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">Pagada</span>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">Pendiente</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right font-semibold text-[var(--brand)]">
                          {formatARS(order.total)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <button
                              onClick={() => handleArchive(order.id)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                              title="Archivar/Ocultar orden (ya enviada)"
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Detalle de Orden {selectedOrder ? `#${selectedOrder.id.substring(0, 6).toUpperCase()}` : ''}
            </DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="grid gap-6 py-4 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-widest text-[var(--brand)]">Datos del Cliente</h3>
                  <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm">
                    <p><strong>Nombre:</strong> {selectedOrder.customer.nombre} {selectedOrder.customer.apellido}</p>
                    <p><strong>Email:</strong> {selectedOrder.customer.email}</p>
                    <p><strong>Teléfono:</strong> {selectedOrder.customer.telefono}</p>
                    <p><strong>DNI/CUIL:</strong> {selectedOrder.customer.dni}</p>
                    <p className="mt-2 text-muted-foreground">Nota: {selectedOrder.customer.note || "Sin nota"}</p>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-widest text-[var(--brand)]">Datos de Envío</h3>
                  <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm">
                    <p><strong>Método:</strong> {
                      selectedOrder.customer.metodoEnvio === "acordar" ? "Acordar con el vendedor" :
                      selectedOrder.customer.metodoEnvio === "uber" ? "Uber Entregas" :
                      selectedOrder.customer.metodoEnvio === "andreani" ? "Andreani" :
                      selectedOrder.customer.metodoEnvio === "viacargo" ? "Vía Cargo" :
                      selectedOrder.customer.metodoEnvio || "No especificado"
                    }</p>
                    
                    {selectedOrder.customer.metodoEnvio !== "acordar" && selectedOrder.customer.direccion && (
                      <div className="mt-3 space-y-1 border-t border-border/50 pt-3">
                        <p><strong>Dirección:</strong> {selectedOrder.customer.direccion}</p>
                        <p><strong>Ciudad:</strong> {selectedOrder.customer.ciudad}</p>
                        <p><strong>Provincia:</strong> {selectedOrder.customer.provincia}</p>
                        <p><strong>C.P.:</strong> {selectedOrder.customer.codigoPostal}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-bold uppercase tracking-widest text-[var(--brand)]">Carrito de Compras</h3>
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <ul className="divide-y divide-border">
                    {selectedOrder.items.map((item: any, i: number) => (
                      <li key={i} className="flex justify-between py-3 text-sm first:pt-0 last:pb-0">
                        <div>
                          <p className="font-medium text-foreground">{item.name}</p>
                          {item.variantLabel && (
                            <p className="text-xs text-muted-foreground">
                              {item.variantLabel}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.qty} x {formatARS(item.price)}
                          </p>
                        </div>
                        <div className="font-semibold text-foreground">
                          {formatARS(item.price * item.qty)}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex justify-between border-t border-border pt-4 text-base font-bold text-[var(--brand)]">
                    <span>Total</span>
                    <span>{formatARS(selectedOrder.total)}</span>
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
