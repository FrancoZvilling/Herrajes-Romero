import { createFileRoute } from "@tanstack/react-router";
import { useOrders } from "@/hooks/useCatalog";
import { formatARS } from "@/context/cart";
import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
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

  // Sort orders by status (approved first), then date descending
  const sortedOrders = [...orders].sort((a, b) => {
    if (a.status === "approved" && b.status !== "approved") return -1;
    if (a.status !== "approved" && b.status === "approved") return 1;
    const dateA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt).getTime();
    const dateB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt).getTime();
    return dateB - dateA;
  });

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
                {sortedOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                      No hay órdenes registradas.
                    </td>
                  </tr>
                ) : (
                  sortedOrders.map((order) => {
                    const date = order.createdAt?.toDate ? order.createdAt.toDate() : new Date(order.createdAt);
                    return (
                      <tr key={order.id} className="transition-colors hover:bg-muted/30">
                        <td className="px-6 py-4">
                          {format(date, "dd MMM yyyy, HH:mm", { locale: es })}
                        </td>
                        <td className="px-6 py-4 font-medium text-foreground">
                          {order.customer?.nombre} {order.customer?.apellido}
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
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="text-[var(--brand)] hover:underline"
                          >
                            Ver detalle
                          </button>
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
            <DialogTitle>Detalle de Orden</DialogTitle>
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
