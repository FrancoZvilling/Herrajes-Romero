import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/producto._id-CiaMn0WY.js
var import_jsx_runtime = require_jsx_runtime();
var SplitNotFoundComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "container-x py-24 text-center",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "font-display text-3xl font-bold",
		children: "Producto no encontrado"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/",
		className: "mt-4 inline-block text-[var(--brand)]",
		children: "Volver al inicio"
	})]
});
//#endregion
export { SplitNotFoundComponent as notFoundComponent };
