import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { A as Clock, E as Instagram, O as Facebook, S as MapPin, b as MessageCircle, h as Phone } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contacto-CBbb_WDc.js
var import_jsx_runtime = require_jsx_runtime();
function Contact() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-b border-border bg-[var(--surface)] py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold uppercase tracking-widest text-[var(--brand)]",
					children: "Contacto"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-5xl font-bold tracking-tight",
					children: "Hablemos"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl text-muted-foreground",
					children: "Escribinos, llamanos o visitanos en nuestra sucursal. Estamos para asesorarte."
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "container-x grid gap-8 py-16 lg:grid-cols-[1fr_1.2fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {}),
					title: "Dirección",
					primary: "Rivadavia 426",
					secondary: "CP 5000 — Córdoba capital"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {}),
					title: "Teléfono",
					primary: "351-4216433",
					href: "tel:3514216433"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {}),
					title: "WhatsApp",
					primary: "3517010095",
					href: "https://wa.me/5493517010095"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {}),
					title: "Horarios",
					primary: "Lunes a Viernes 09:00 – 17:00",
					secondary: "Sábados 09:00 – 13:00"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://www.instagram.com/casaromeroherrajes",
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border transition hover:border-[var(--brand)] hover:bg-[var(--brand)] hover:text-white",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://www.facebook.com/share/14ffRKMyEjW/",
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border transition hover:border-[var(--brand)] hover:bg-[var(--brand)] hover:text-white",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Facebook, { className: "h-4 w-4" })
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-2xl border border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
				title: "Casa Romero Herrajes — Ubicación",
				src: "https://www.google.com/maps?q=Rivadavia+426,+C%C3%B3rdoba,+Argentina&output=embed",
				className: "h-full min-h-[420px] w-full",
				loading: "lazy"
			})
		})]
	})] });
}
function Card({ icon, title, primary, secondary, href }) {
	const content = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-4 rounded-xl border border-border bg-card p-5 card-hover",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--brand)]/10 text-[var(--brand)]",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs font-bold uppercase tracking-widest text-muted-foreground",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 font-display text-lg font-semibold text-foreground",
				children: primary
			}),
			secondary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm text-muted-foreground",
				children: secondary
			})
		] })]
	});
	return href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href,
		target: "_blank",
		rel: "noreferrer",
		className: "block",
		children: content
	}) : content;
}
//#endregion
export { Contact as component };
