import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Logo-BXzxn3NU.js
var import_jsx_runtime = require_jsx_runtime();
function Logo({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: `group inline-flex items-center gap-2.5 ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-md bg-[var(--brand)] shadow-[var(--shadow-brand)] transition-transform duration-300 group-hover:scale-105",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-lg font-bold text-white",
				children: "CR"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 to-transparent" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex flex-col leading-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-[15px] font-bold tracking-tight text-foreground",
				children: "Casa Romero"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground",
				children: "Herrajes · 60 años"
			})]
		})]
	});
}
//#endregion
export { Logo as t };
