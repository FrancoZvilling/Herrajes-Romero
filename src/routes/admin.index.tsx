import { createFileRoute } from "@tanstack/react-router";
import { useOrders, useProducts } from "@/hooks/useCatalog";
import { DollarSign, Package, TrendingUp, TrendingDown } from "lucide-react";
import { formatARS } from "@/context/cart";
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

    let ingresosMes = 0;
    const salesByProduct: Record<string, { name: string; quantity: number }> = {};

    orders.forEach((order: any) => {
      // Only count approved orders for dashboard metrics
      if (order.status !== "approved") return;

      // Assuming order has createdAt (Timestamp) or date string
      // Let's fallback to current month if not properly set (just for mockup if no date)
      const date = order.createdAt?.toDate ? order.createdAt.toDate() : new Date(order.createdAt || Date.now());
      if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
        ingresosMes += order.total || 0;
      }

      // Track product sales
      order.items?.forEach((item: any) => {
        if (!salesByProduct[item.productId]) {
          salesByProduct[item.productId] = { name: item.name, quantity: 0 };
        }
        salesByProduct[item.productId].quantity += item.qty;
      });
    });

    const sortedSales = Object.values(salesByProduct).sort((a, b) => b.quantity - a.quantity);
    const topProduct = sortedSales.length > 0 ? sortedSales[0] : null;
    const bottomProduct = sortedSales.length > 0 ? sortedSales[sortedSales.length - 1] : null;

    return { ingresosMes, topProduct, bottomProduct };
  }, [orders]);

  if (isLoadingOrders || isLoadingProducts) {
    return <div className="text-muted-foreground">Calculando métricas...</div>;
  }

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl font-bold tracking-tight">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Ingresos del mes */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-sm font-medium">Ingresos del Mes</span>
            <DollarSign className="h-5 w-5 text-[var(--brand)]" />
          </div>
          <div className="mt-4 font-display text-3xl font-bold text-foreground">
            {formatARS(metrics.ingresosMes)}
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

        {/* Producto más vendido */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-sm font-medium">Más Vendido</span>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="mt-4">
            <div className="line-clamp-1 font-display text-xl font-bold text-foreground">
              {metrics.topProduct ? metrics.topProduct.name : "Sin datos"}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              {metrics.topProduct ? `${metrics.topProduct.quantity} unidades vendidas` : "-"}
            </div>
          </div>
        </div>

        {/* Producto menos vendido */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-sm font-medium">Menos Vendido</span>
            <TrendingDown className="h-5 w-5 text-red-500" />
          </div>
          <div className="mt-4">
            <div className="line-clamp-1 font-display text-xl font-bold text-foreground">
              {metrics.bottomProduct ? metrics.bottomProduct.name : "Sin datos"}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              {metrics.bottomProduct ? `${metrics.bottomProduct.quantity} unidades vendidas` : "-"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
