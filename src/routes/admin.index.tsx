import { createFileRoute } from "@tanstack/react-router";
import { useOrders, useProducts } from "@/hooks/useCatalog";
import { ShoppingCart, Package, TrendingUp, Calendar } from "lucide-react";
import { useMemo } from "react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { data: orders = [], isLoading: isLoadingOrders } = useOrders();
  const { data: products = [], isLoading: isLoadingProducts } = useProducts();

  const metrics = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let pedidosMes = 0;
    const requestedByProduct: Record<string, { name: string; quantity: number }> = {};

    orders.forEach((order: any) => {
      // Don't count archived orders
      if (order.archived) return;

      const date = order.createdAt?.toDate ? order.createdAt.toDate() : new Date(order.createdAt || Date.now());
      if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
        pedidosMes++;
      }

      // Track product requests
      order.items?.forEach((item: any) => {
        if (!requestedByProduct[item.productId || item.name]) {
          requestedByProduct[item.productId || item.name] = { name: item.name, quantity: 0 };
        }
        requestedByProduct[item.productId || item.name].quantity += item.qty || 1;
      });
    });

    const sortedRequests = Object.values(requestedByProduct).sort((a, b) => b.quantity - a.quantity);
    const topProduct = sortedRequests.length > 0 ? sortedRequests[0] : null;

    return { pedidosMes, totalPedidos: orders.filter(o => !o.archived).length, topProduct };
  }, [orders]);

  if (isLoadingOrders || isLoadingProducts) {
    return <div className="text-muted-foreground">Calculando métricas...</div>;
  }

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl font-bold tracking-tight">Dashboard del Catálogo</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Pedidos del mes */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-sm font-medium">Pedidos este Mes</span>
            <Calendar className="h-5 w-5 text-[var(--brand)]" />
          </div>
          <div className="mt-4 font-display text-3xl font-bold text-foreground">
            {metrics.pedidosMes} <span className="text-base font-medium text-muted-foreground">solicitudes</span>
          </div>
        </div>

        {/* Total de productos */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-sm font-medium">Catálogo Activo</span>
            <Package className="h-5 w-5 text-blue-500" />
          </div>
          <div className="mt-4 font-display text-3xl font-bold text-foreground">
            {products.length} <span className="text-base font-medium text-muted-foreground">productos</span>
          </div>
        </div>

        {/* Producto más pedido */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-sm font-medium">Más Consultado</span>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="mt-4">
            <div className="line-clamp-1 font-display text-xl font-bold text-foreground">
              {metrics.topProduct ? metrics.topProduct.name : "Sin datos"}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              {metrics.topProduct ? `${metrics.topProduct.quantity} unidades pedidas` : "-"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
