import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as useSearch, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as doc, o as updateDoc } from "../_libs/@firebase/firestore+[...].mjs";
import "../_libs/firebase.mjs";
import { n as db } from "./firebase-BBCvycKQ.mjs";
import { j as CircleCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout.success-DNhJU3Pz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CheckoutSuccessPage() {
	const search = useSearch({ from: "/checkout/success" });
	const paymentId = search.payment_id;
	const status = search.status;
	const orderId = search.external_reference;
	(0, import_react.useEffect)(() => {
		if (orderId && status === "approved") updateDoc(doc(db, "orders", orderId), {
			status: "paid",
			paymentId
		}).catch((err) => console.error("Error actualizando orden:", err));
	}, [
		orderId,
		status,
		paymentId
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-[70vh] flex-col items-center justify-center px-4 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-600",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-14 w-14" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl font-bold text-foreground",
				children: "¡Pago Exitoso!"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-lg text-lg text-muted-foreground",
				children: "Tu pago ha sido procesado correctamente y tu pedido ya está registrado en nuestro sistema. En breve nos comunicaremos con vos para coordinar los detalles de entrega."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 flex gap-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "inline-flex h-11 items-center justify-center rounded-md bg-[var(--brand)] px-8 font-semibold text-white transition-colors hover:bg-[var(--brand)]/90",
					children: "Volver a la tienda"
				})
			})
		]
	});
}
//#endregion
export { CheckoutSuccessPage as component };
