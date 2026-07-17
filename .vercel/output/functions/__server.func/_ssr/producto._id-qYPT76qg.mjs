import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { M as ChevronRight, d as ShoppingBag, f as ShieldCheck, i as Truck, m as Plus, n as Wrench, y as Minus } from "../_libs/lucide-react.mjs";
import { a as useProductsByCategory, n as useCategories } from "./useCatalog-fdXhoxOt.mjs";
import { n as formatARS, r as useCart } from "./cart-Dvgv3E-F.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { t as ProductCard } from "./ProductCard-CiiX8gmV.mjs";
import { t as Route } from "./producto._id-Bm3olNw3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/producto._id-qYPT76qg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductPage() {
	const { product } = Route.useLoaderData();
	const { data: categories = [] } = useCategories();
	const cat = categories.find((c) => c.slug === product.category);
	const { add } = useCart();
	const [qty, setQty] = (0, import_react.useState)(1);
	const [variants, setVariants] = (0, import_react.useState)(() => {
		const init = {};
		product.variants?.forEach((v) => init[v.name] = v.options[0]);
		return init;
	});
	const { data: categoryProducts = [] } = useProductsByCategory(product.category);
	const related = categoryProducts.filter((p) => p.id !== product.id).slice(0, 4);
	const initials = product.name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-b border-border bg-[var(--surface)]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-x py-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex items-center gap-1.5 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "hover:text-foreground",
							children: "Inicio"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5" }),
						cat && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/categoria/$slug",
							params: { slug: cat.slug },
							className: "hover:text-foreground",
							children: cat.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground",
							children: product.name
						})
					]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "container-x grid gap-12 py-12 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					scale: .98
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				transition: { duration: .4 },
				className: "relative aspect-square overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-[var(--surface-muted)] to-[var(--surface)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 flex items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-[160px] font-bold text-foreground/10",
						children: initials
					})
				}), product.brand && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider shadow-sm",
					children: product.brand
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold uppercase tracking-widest text-[var(--brand)]",
					children: product.subcategory ?? cat?.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl",
					children: product.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-muted-foreground",
					children: product.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex items-baseline gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-4xl font-bold",
						children: formatARS(product.price)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted-foreground",
						children: "IVA incluido"
					})]
				}),
				product.variants && product.variants.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 space-y-5",
					children: product.variants.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-bold uppercase tracking-widest text-foreground",
							children: v.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted-foreground",
							children: ["Seleccionado: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
								className: "text-foreground",
								children: variants[v.name]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: v.options.map((opt) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setVariants((prev) => ({
									...prev,
									[v.name]: opt
								})),
								className: `rounded-lg border px-3.5 py-2 text-sm font-medium transition ${variants[v.name] === opt ? "border-[var(--brand)] bg-[var(--brand)] text-white shadow-[var(--shadow-brand)]" : "border-border bg-background hover:border-foreground/40"}`,
								children: opt
							}, opt);
						})
					})] }, v.name))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap items-stretch gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center rounded-lg border border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setQty((q) => Math.max(1, q - 1)),
								className: "flex h-12 w-12 items-center justify-center transition hover:bg-[var(--surface-muted)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-10 text-center font-display text-lg font-semibold",
								children: qty
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setQty((q) => q + 1),
								className: "flex h-12 w-12 items-center justify-center transition hover:bg-[var(--surface-muted)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => add(product, variants, qty),
						className: "inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-[var(--brand)] px-6 text-sm font-semibold text-white shadow-[var(--shadow-brand)] transition hover:brightness-110 active:scale-[0.98]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4" }), "Agregar al carrito"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid grid-cols-3 gap-3 border-t border-border pt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Perk, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-4 w-4" }),
							label: "Retiro y envío"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Perk, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" }),
							label: "Marca original"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Perk, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "h-4 w-4" }),
							label: "Asesoramiento"
						})
					]
				})
			] })]
		}),
		related.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-[var(--surface)] py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-8 font-display text-2xl font-bold",
					children: "Productos relacionados"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
					children: related.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
				})]
			})
		})
	] });
}
function Perk({ icon, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center gap-1 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand)]/10 text-[var(--brand)]",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs font-medium text-muted-foreground",
			children: label
		})]
	});
}
//#endregion
export { ProductPage as component };
