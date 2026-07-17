import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-Dvgv3E-F.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Ctx = (0, import_react.createContext)(null);
var STORAGE_KEY = "casa-romero-cart";
function CartProvider({ children }) {
	const [items, setItems] = (0, import_react.useState)([]);
	const [isOpen, setOpen] = (0, import_react.useState)(false);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
			if (raw) setItems(JSON.parse(raw));
		} catch {}
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
		} catch {}
	}, [items, hydrated]);
	const value = (0, import_react.useMemo)(() => {
		const variantKeyOf = (v) => Object.entries(v).map(([k, val]) => `${k}:${val}`).join("|");
		return {
			items,
			isOpen,
			setOpen,
			add: (product, variants, qty = 1) => {
				const key = variantKeyOf(variants);
				const label = Object.entries(variants).map(([k, v]) => `${k}: ${v}`).join(" · ");
				setItems((prev) => {
					const idx = prev.findIndex((i) => i.productId === product.id && i.variantKey === key);
					if (idx >= 0) {
						const next = [...prev];
						next[idx] = {
							...next[idx],
							qty: next[idx].qty + qty
						};
						return next;
					}
					return [...prev, {
						productId: product.id,
						name: product.name,
						price: product.price,
						qty,
						variantKey: key,
						variantLabel: label
					}];
				});
				setOpen(true);
			},
			remove: (productId, variantKey) => setItems((prev) => prev.filter((i) => !(i.productId === productId && i.variantKey === variantKey))),
			updateQty: (productId, variantKey, qty) => setItems((prev) => prev.map((i) => i.productId === productId && i.variantKey === variantKey ? {
				...i,
				qty: Math.max(1, qty)
			} : i)),
			clear: () => setItems([]),
			count: items.reduce((s, i) => s + i.qty, 0),
			total: items.reduce((s, i) => s + i.qty * i.price, 0)
		};
	}, [items, isOpen]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value,
		children
	});
}
function useCart() {
	const c = (0, import_react.useContext)(Ctx);
	if (!c) throw new Error("useCart must be used inside CartProvider");
	return c;
}
var formatARS = (n) => new Intl.NumberFormat("es-AR", {
	style: "currency",
	currency: "ARS",
	maximumFractionDigits: 0
}).format(n);
//#endregion
export { formatARS as n, useCart as r, CartProvider as t };
