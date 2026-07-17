import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as useOrders } from "./useCatalog-fdXhoxOt.mjs";
import { i as DialogTitle, n as DialogContent, r as DialogHeader, t as Dialog } from "./dialog-B69u1cPq.mjs";
import { n as formatARS } from "./cart-Dvgv3E-F.mjs";
import { n as format, t as es } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.orders-BOA-VgAo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminOrders() {
	const { data: orders = [], isLoading } = useOrders();
	const [selectedOrder, setSelectedOrder] = (0, import_react.useState)(null);
	const sortedOrders = [...orders].sort((a, b) => {
		if (a.status === "approved" && b.status !== "approved") return -1;
		if (a.status !== "approved" && b.status === "approved") return 1;
		const dateA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt).getTime();
		return (b.createdAt?.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt).getTime()) - dateA;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mb-8 font-display text-3xl font-bold tracking-tight",
			children: "Órdenes de Venta"
		}),
		isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-muted-foreground",
			children: "Cargando órdenes..."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-xl border border-border bg-card overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-muted/50 text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 font-medium",
								children: "Fecha"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 font-medium",
								children: "Cliente"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 font-medium",
								children: "Email"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 font-medium",
								children: "Estado"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 font-medium text-right",
								children: "Total"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 font-medium text-right",
								children: "Acciones"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-border",
						children: sortedOrders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 6,
							className: "px-6 py-8 text-center text-muted-foreground",
							children: "No hay órdenes registradas."
						}) }) : sortedOrders.map((order) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "transition-colors hover:bg-muted/30",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-4",
										children: format(order.createdAt?.toDate ? order.createdAt.toDate() : new Date(order.createdAt), "dd MMM yyyy, HH:mm", { locale: es })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-6 py-4 font-medium text-foreground",
										children: [
											order.customer?.nombre,
											" ",
											order.customer?.apellido
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-4",
										children: order.customer?.email
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-4",
										children: order.status === "approved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800",
											children: "Pagada"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800",
											children: "Pendiente"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-4 text-right font-semibold text-[var(--brand)]",
										children: formatARS(order.total)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-4 text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setSelectedOrder(order),
											className: "text-[var(--brand)] hover:underline",
											children: "Ver detalle"
										})
									})
								]
							}, order.id);
						})
					})]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!selectedOrder,
			onOpenChange: (open) => !open && setSelectedOrder(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "max-w-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Detalle de Orden" }) }), selectedOrder && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 py-4 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-2 text-sm font-bold uppercase tracking-widest text-[var(--brand)]",
							children: "Datos del Cliente"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-muted/30 p-4 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Nombre:" }),
									" ",
									selectedOrder.customer.nombre,
									" ",
									selectedOrder.customer.apellido
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Email:" }),
									" ",
									selectedOrder.customer.email
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Teléfono:" }),
									" ",
									selectedOrder.customer.telefono
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "DNI/CUIL:" }),
									" ",
									selectedOrder.customer.dni
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-muted-foreground",
									children: ["Nota: ", selectedOrder.customer.note || "Sin nota"]
								})
							]
						})] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-2 text-sm font-bold uppercase tracking-widest text-[var(--brand)]",
						children: "Carrito de Compras"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-muted/30 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "divide-y divide-border",
							children: selectedOrder.items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex justify-between py-3 text-sm first:pt-0 last:pb-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium text-foreground",
										children: item.name
									}),
									item.variantLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: item.variantLabel
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground mt-1",
										children: [
											item.qty,
											" x ",
											formatARS(item.price)
										]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold text-foreground",
									children: formatARS(item.price * item.qty)
								})]
							}, i))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex justify-between border-t border-border pt-4 text-base font-bold text-[var(--brand)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatARS(selectedOrder.total) })]
						})]
					})] })]
				})]
			})
		})
	] });
}
//#endregion
export { AdminOrders as component };
