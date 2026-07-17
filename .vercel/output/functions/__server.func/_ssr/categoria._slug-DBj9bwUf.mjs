import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { M as ChevronRight, l as SlidersHorizontal, t as X } from "../_libs/lucide-react.mjs";
import { a as useProductsByCategory, n as useCategories } from "./useCatalog-fdXhoxOt.mjs";
import { t as Route } from "./categoria._slug-Dya--yJ1.mjs";
import { t as ProductCard } from "./ProductCard-CiiX8gmV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/categoria._slug-DBj9bwUf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CategoryPage() {
	const { category } = Route.useLoaderData();
	const { data: all = [] } = useProductsByCategory(category.slug);
	const { data: categories = [] } = useCategories();
	const [subFilter, setSubFilter] = (0, import_react.useState)(null);
	const [brandFilter, setBrandFilter] = (0, import_react.useState)(null);
	const [sort, setSort] = (0, import_react.useState)("featured");
	const [showMobile, setShowMobile] = (0, import_react.useState)(false);
	const filtered = (0, import_react.useMemo)(() => {
		let list = all;
		if (subFilter) list = list.filter((p) => p.subcategory === subFilter);
		if (brandFilter) list = list.filter((p) => p.brand === brandFilter);
		switch (sort) {
			case "price-asc":
				list = [...list].sort((a, b) => a.price - b.price);
				break;
			case "price-desc":
				list = [...list].sort((a, b) => b.price - a.price);
				break;
			case "name":
				list = [...list].sort((a, b) => a.name.localeCompare(b.name));
				break;
			default: list = [...list].sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
		}
		return list;
	}, [
		all,
		subFilter,
		brandFilter,
		sort
	]);
	const availableBrands = (0, import_react.useMemo)(() => Array.from(new Set(all.map((p) => p.brand).filter(Boolean))), [all]);
	const Sidebar = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FilterGroup, {
				title: "Subcategoría",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterPill, {
					active: !subFilter,
					onClick: () => setSubFilter(null),
					children: "Todas"
				}), category.subcategories?.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterPill, {
					active: subFilter === s,
					onClick: () => setSubFilter(s),
					children: s
				}, s))]
			}),
			availableBrands.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FilterGroup, {
				title: "Marca",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterPill, {
					active: !brandFilter,
					onClick: () => setBrandFilter(null),
					children: "Todas"
				}), availableBrands.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterPill, {
					active: brandFilter === b,
					onClick: () => setBrandFilter(b),
					children: b
				}, b))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterGroup, {
				title: "Otras categorías",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-1",
					children: categories.filter((c) => c.slug !== category.slug).slice(0, 11).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/categoria/$slug",
						params: { slug: c.slug },
						className: "rounded px-2 py-1.5 text-sm text-muted-foreground transition hover:bg-[var(--surface-muted)] hover:text-foreground",
						children: c.name
					}, c.slug))
				})
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-border bg-[var(--surface)]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x py-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex items-center gap-1.5 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "hover:text-foreground",
								children: "Inicio"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground",
								children: category.name
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl",
						children: category.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-muted-foreground",
						children: category.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-xs font-medium uppercase tracking-widest text-[var(--brand)]",
						children: [filtered.length, " productos"]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "container-x grid gap-8 py-10 lg:grid-cols-[240px_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden lg:block",
				children: Sidebar
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setShowMobile(true),
					className: "inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "h-4 w-4" }), " Filtros"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex items-center gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-muted-foreground",
						children: "Ordenar:"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: sort,
						onChange: (e) => setSort(e.target.value),
						className: "rounded-md border border-border bg-background px-3 py-2 text-sm font-medium focus:border-[var(--brand)] focus:outline-none",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "featured",
								children: "Destacados"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "price-asc",
								children: "Precio: menor a mayor"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "price-desc",
								children: "Precio: mayor a menor"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "name",
								children: "Nombre A-Z"
							})
						]
					})]
				})]
			}), filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-dashed border-border p-16 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg font-semibold",
					children: "No hay productos con estos filtros"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						setSubFilter(null);
						setBrandFilter(null);
					},
					className: "mt-3 text-sm font-semibold text-[var(--brand)]",
					children: "Limpiar filtros"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 sm:grid-cols-2 xl:grid-cols-3",
				children: filtered.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
			})] })]
		}),
		showMobile && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "fixed inset-0 z-50 lg:hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 bg-black/50",
				onClick: () => setShowMobile(false)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-y-0 left-0 w-full max-w-xs overflow-y-auto bg-background p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg font-bold",
						children: "Filtros"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setShowMobile(false),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
					})]
				}), Sidebar]
			})]
		})
	] });
}
function FilterGroup({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: "mb-3 text-[11px] font-bold uppercase tracking-widest text-foreground",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-1.5",
		children
	})] });
}
function FilterPill({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick,
		className: `rounded-md border px-2.5 py-1.5 text-xs font-medium transition ${active ? "border-[var(--brand)] bg-[var(--brand)] text-white" : "border-border bg-background text-foreground/70 hover:border-foreground/40"}`,
		children
	});
}
//#endregion
export { CategoryPage as component };
