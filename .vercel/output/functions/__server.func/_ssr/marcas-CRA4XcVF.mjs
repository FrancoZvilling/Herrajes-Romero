import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as useBrands } from "./useCatalog-fdXhoxOt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/marcas-CRA4XcVF.js
var import_jsx_runtime = require_jsx_runtime();
function Brands() {
	const { data: brands = [] } = useBrands();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "container-x py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-12 max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold uppercase tracking-widest text-[var(--brand)]",
					children: "Con quiénes trabajamos"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-5xl font-bold tracking-tight",
					children: "Marcas líderes"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-muted-foreground",
					children: "Elegimos cuidadosamente cada marca de nuestro catálogo. Priorizamos la calidad, la disponibilidad y el respaldo de fábrica."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
			children: brands.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "group flex aspect-[3/2] flex-col items-center justify-center rounded-xl border border-border bg-card p-6 card-hover",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-2xl font-bold text-foreground/80 transition-colors group-hover:text-[var(--brand)]",
					children: b
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 text-xs uppercase tracking-widest text-muted-foreground",
					children: "Marca oficial"
				})]
			}, b))
		})]
	});
}
//#endregion
export { Brands as component };
