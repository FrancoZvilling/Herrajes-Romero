import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as TrendingUp, k as DollarSign, o as TrendingDown, v as Package } from "../_libs/lucide-react.mjs";
import { i as useProducts, r as useOrders } from "./useCatalog-fdXhoxOt.mjs";
import { n as formatARS } from "./cart-Dvgv3E-F.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-fn137Moe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminDashboard() {
	const { data: orders = [], isLoading: isLoadingOrders } = useOrders();
	const { data: products = [], isLoading: isLoadingProducts } = useProducts();
	const metrics = (0, import_react.useMemo)(() => {
		const now = /* @__PURE__ */ new Date();
		const currentMonth = now.getMonth();
		const currentYear = now.getFullYear();
		let ingresosMes = 0;
		const salesByProduct = {};
		orders.forEach((order) => {
			if (order.status !== "approved") return;
			const date = order.createdAt?.toDate ? order.createdAt.toDate() : new Date(order.createdAt || Date.now());
			if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) ingresosMes += order.total || 0;
			order.items?.forEach((item) => {
				if (!salesByProduct[item.productId]) salesByProduct[item.productId] = {
					name: item.name,
					quantity: 0
				};
				salesByProduct[item.productId].quantity += item.qty;
			});
		});
		const sortedSales = Object.values(salesByProduct).sort((a, b) => b.quantity - a.quantity);
		const topProduct = sortedSales.length > 0 ? sortedSales[0] : null;
		const bottomProduct = sortedSales.length > 0 ? sortedSales[sortedSales.length - 1] : null;
		return {
			ingresosMes,
			topProduct,
			bottomProduct
		};
	}, [orders]);
	if (isLoadingOrders || isLoadingProducts) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-muted-foreground",
		children: "Calculando métricas..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "mb-8 font-display text-3xl font-bold tracking-tight",
		children: "Dashboard"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 md:grid-cols-2 lg:grid-cols-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-6 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium",
						children: "Ingresos del Mes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-5 w-5 text-[var(--brand)]" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 font-display text-3xl font-bold text-foreground",
					children: formatARS(metrics.ingresosMes)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-6 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium",
						children: "Catálogo Activo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-5 w-5 text-blue-500" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 font-display text-3xl font-bold text-foreground",
					children: [
						products.length,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-base font-medium text-muted-foreground",
							children: "productos"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-6 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium",
						children: "Más Vendido"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-5 w-5 text-green-500" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "line-clamp-1 font-display text-xl font-bold text-foreground",
						children: metrics.topProduct ? metrics.topProduct.name : "Sin datos"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-sm text-muted-foreground",
						children: metrics.topProduct ? `${metrics.topProduct.quantity} unidades vendidas` : "-"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-6 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium",
						children: "Menos Vendido"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "h-5 w-5 text-red-500" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "line-clamp-1 font-display text-xl font-bold text-foreground",
						children: metrics.bottomProduct ? metrics.bottomProduct.name : "Sin datos"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-sm text-muted-foreground",
						children: metrics.bottomProduct ? `${metrics.bottomProduct.quantity} unidades vendidas` : "-"
					})]
				})]
			})
		]
	})] });
}
//#endregion
export { AdminDashboard as component };
