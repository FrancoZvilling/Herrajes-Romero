import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as ShoppingBag, v as Package } from "../_libs/lucide-react.mjs";
import { n as formatARS, r as useCart } from "./cart-Dvgv3E-F.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductCard-CiiX8gmV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductCard({ product }) {
	const { add } = useCart();
	const [variants, setVariants] = (0, import_react.useState)(() => {
		const init = {};
		product.variants?.forEach((v) => init[v.name] = v.options[0]);
		return init;
	});
	const initials = (0, import_react.useMemo)(() => product.name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase(), [product.name]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 12
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-40px"
		},
		transition: {
			duration: .35,
			ease: "easeOut"
		},
		className: "group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] card-hover",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/producto/$id",
			params: { id: product.id },
			className: "relative block aspect-square overflow-hidden bg-gradient-to-br from-[var(--surface-muted)] to-[var(--surface)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 flex items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-6xl font-bold text-foreground/10 transition-transform duration-500 group-hover:scale-110",
						children: initials
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--brand)_0%,transparent_60%)] opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-10" }),
				product.brand && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground shadow-sm backdrop-blur",
					children: product.brand
				}),
				product.featured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute right-3 top-3 rounded-full bg-[var(--brand)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-[var(--shadow-brand)]",
					children: "Destacado"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1 flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-3 w-3" }), product.subcategory ?? "General"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/producto/$id",
					params: { id: product.id },
					className: "font-display text-[15px] font-semibold leading-snug text-foreground transition-colors hover:text-[var(--brand)]",
					children: product.name
				}),
				product.variants && product.variants.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 space-y-2",
					children: product.variants.slice(0, 2).map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
						children: v.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-1",
						children: [v.options.slice(0, 4).map((opt) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setVariants((prev) => ({
									...prev,
									[v.name]: opt
								})),
								className: `rounded-md border px-2 py-1 text-[11px] font-medium transition ${variants[v.name] === opt ? "border-[var(--brand)] bg-[var(--brand)] text-white" : "border-border bg-background text-foreground/70 hover:border-foreground/40"}`,
								children: opt
							}, opt);
						}), v.options.length > 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/producto/$id",
							params: { id: product.id },
							className: "rounded-md border border-dashed border-border px-2 py-1 text-[11px] text-muted-foreground hover:border-foreground/40",
							children: ["+", v.options.length - 4]
						})]
					})] }, v.name))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto pt-4 flex items-end justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] font-medium uppercase tracking-wider text-muted-foreground",
						children: "Precio"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-xl font-bold text-foreground",
						children: formatARS(product.price)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => add(product, variants),
						className: "inline-flex h-10 items-center justify-center gap-1.5 rounded-md bg-foreground px-3 text-xs font-semibold text-background transition hover:bg-[var(--brand)] active:scale-95",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4" }), "Agregar"]
					})]
				})
			]
		})]
	});
}
//#endregion
export { ProductCard as t };
