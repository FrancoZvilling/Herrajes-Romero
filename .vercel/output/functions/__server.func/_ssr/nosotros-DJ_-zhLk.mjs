import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { D as Heart, N as Award, r as Users } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/nosotros-DJ_-zhLk.js
var import_jsx_runtime = require_jsx_runtime();
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden bg-[var(--ink)] py-24 text-white",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-32 top-0 h-96 w-96 rounded-full bg-[var(--brand)] opacity-20 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-bold uppercase tracking-widest text-[var(--brand)]",
				children: "Nuestra historia"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mt-3 max-w-3xl font-display text-5xl font-bold tracking-tight sm:text-6xl",
				children: [
					"60 años haciendo lo que",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[var(--brand)]",
						children: " más nos gusta"
					}),
					"."
				]
			})]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "container-x grid gap-12 py-20 lg:grid-cols-[1.3fr_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6 text-lg leading-relaxed text-foreground/80",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Somos un ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "negocio familiar con más de 60 años de trayectoria" }),
				" en el rubro de herrajes. Desde nuestros comienzos, nos distingue el compromiso con la calidad, el asesoramiento y, sobre todo, la buena atención a cada cliente."
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Trabajamos con productos de primeras marcas y ponemos nuestra experiencia al servicio de quienes nos eligen, brindando un ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "trato cercano, confianza y soluciones para cada proyecto" }),
				"."
			] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pillar, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {}),
					title: "Familiares",
					text: "Tres generaciones detrás del mostrador."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pillar, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, {}),
					title: "Primeras marcas",
					text: "Solo productos que probamos y respaldamos."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pillar, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}),
					title: "Cerca del cliente",
					text: "Cada consulta merece una respuesta real."
				})
			]
		})]
	})] });
}
function Pillar({ icon, title, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex gap-4 rounded-xl border border-border bg-card p-5 card-hover",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--brand)]/10 text-[var(--brand)]",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-display font-semibold",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: text
		})] })]
	});
}
//#endregion
export { About as component };
