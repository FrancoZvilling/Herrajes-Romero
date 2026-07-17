import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as doc, s as writeBatch } from "../_libs/@firebase/firestore+[...].mjs";
import "../_libs/firebase.mjs";
import { n as db } from "./firebase-BBCvycKQ.mjs";
import { P as ArrowRight, g as Percent, j as CircleCheck, w as LoaderCircle } from "../_libs/lucide-react.mjs";
import { r as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { i as useProducts, n as useCategories } from "./useCatalog-fdXhoxOt.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { n as Label, t as Input } from "./label-B7oQAA24.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.bulk-prices-ob0xgFcL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminBulkPrices() {
	const { data: categories = [] } = useCategories();
	const { data: products = [], isLoading: loadingProducts } = useProducts();
	const queryClient = useQueryClient();
	const [selectedCategories, setSelectedCategories] = (0, import_react.useState)([]);
	const [percentage, setPercentage] = (0, import_react.useState)("");
	const [isIncrease, setIsIncrease] = (0, import_react.useState)(true);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [success, setSuccess] = (0, import_react.useState)(null);
	const toggleCategory = (slug) => {
		setSelectedCategories((prev) => prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]);
	};
	const handleApply = async () => {
		if (selectedCategories.length === 0) {
			alert("Selecciona al menos una categoría.");
			return;
		}
		const val = parseFloat(percentage);
		if (isNaN(val) || val <= 0) {
			alert("Ingresa un porcentaje válido mayor a 0.");
			return;
		}
		if (!confirm(`¿Estás seguro de que deseas aplicar un ${isIncrease ? "aumento" : "descuento"} del ${val}% a las categorías seleccionadas?`)) return;
		setLoading(true);
		setSuccess(null);
		try {
			const batch = writeBatch(db);
			let updatedCount = 0;
			const multiplier = isIncrease ? 1 + val / 100 : 1 - val / 100;
			const targetProducts = products.filter((p) => selectedCategories.includes(p.category));
			for (const product of targetProducts) {
				const newPrice = Math.round(product.price * multiplier * 100) / 100;
				const ref = doc(db, "products", product.id);
				batch.update(ref, { price: newPrice });
				updatedCount++;
			}
			await batch.commit();
			queryClient.invalidateQueries({ queryKey: ["products"] });
			setSuccess(`Se actualizaron ${updatedCount} productos exitosamente.`);
			setPercentage("");
		} catch (error) {
			console.error(error);
			alert("Hubo un error al actualizar los precios.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-4xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mb-8 font-display text-3xl font-bold tracking-tight",
			children: "Actualización Masiva de Precios"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-8 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-4 font-display text-lg font-bold",
							children: "1. Seleccionar Categorías"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2 max-h-64 overflow-y-auto pr-2",
							children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 transition hover:bg-muted/30",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									className: "h-4 w-4 rounded border-border text-[var(--brand)] focus:ring-[var(--brand)]",
									checked: selectedCategories.includes(cat.slug),
									onChange: () => toggleCategory(cat.slug)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: cat.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-2 text-xs text-muted-foreground",
									children: [
										"(",
										products.filter((p) => p.category === cat.slug).length,
										" productos)"
									]
								})] })]
							}, cat.slug))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								onClick: () => setSelectedCategories(categories.map((c) => c.slug)),
								children: "Seleccionar Todas"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								onClick: () => setSelectedCategories([]),
								children: "Ninguna"
							})]
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-4 font-display text-lg font-bold",
							children: "2. Configurar Modificación"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-border p-3 transition hover:bg-muted/30 has-[:checked]:border-[var(--brand)] has-[:checked]:bg-[var(--brand)]/10",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "radio",
											name: "type",
											className: "sr-only",
											checked: isIncrease,
											onChange: () => setIsIncrease(true)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "-rotate-45 h-4 w-4 text-green-500" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: "Aumentar"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-border p-3 transition hover:bg-muted/30 has-[:checked]:border-[var(--brand)] has-[:checked]:bg-[var(--brand)]/10",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "radio",
											name: "type",
											className: "sr-only",
											checked: !isIncrease,
											onChange: () => setIsIncrease(false)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "rotate-45 h-4 w-4 text-red-500" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: "Descontar"
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Porcentaje (%)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Percent, { className: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										min: "0.1",
										step: "0.1",
										placeholder: "Ej: 15",
										className: "pl-9",
										value: percentage,
										onChange: (e) => setPercentage(e.target.value)
									})]
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "w-full bg-[var(--brand)] hover:bg-[var(--brand)]/90 h-12 text-base",
						disabled: loading || loadingProducts || selectedCategories.length === 0 || !percentage,
						onClick: handleApply,
						children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-5 w-5 animate-spin" }), " Aplicando cambios..."] }) : "Aplicar Modificación"
					}),
					success && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-lg bg-green-500/15 p-4 text-green-600 dark:text-green-400",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: success
						})]
					})
				]
			})]
		})]
	});
}
//#endregion
export { AdminBulkPrices as component };
