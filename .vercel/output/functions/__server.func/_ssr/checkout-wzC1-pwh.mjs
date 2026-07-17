import { o as __toESM } from "../_runtime.mjs";
import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-Dova13aH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-wzC1-pwh.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var createPreferenceFn_createServerFn_handler = createServerRpc({
	id: "2d004edce7ad7c7cf5a418fe9c731652ee988ecbf89fdba4fd187bb1e2a742c8",
	name: "createPreferenceFn",
	filename: "src/routes/checkout.tsx"
}, (opts) => createPreferenceFn.__executeServer(opts));
var createPreferenceFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createPreferenceFn_createServerFn_handler, async ({ data }) => {
	try {
		const { MercadoPagoConfig, Preference } = await import("../_libs/mercadopago.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()));
		const preference = new Preference(new MercadoPagoConfig({
			accessToken: process.env.MP_ACCESS_TOKEN || "",
			options: { timeout: 5e3 }
		}));
		const serverBaseUrl = process.env.VITE_SITE_URL || "http://localhost:8080";
		return { init_point: (await preference.create({ body: {
			items: data.items?.map((item) => ({
				id: item.productId,
				title: item.name,
				quantity: Number(item.qty),
				unit_price: Number(item.price),
				currency_id: "ARS"
			})) || [],
			payer: {
				name: data.customer?.nombre || "",
				surname: data.customer?.apellido || "",
				email: data.customer?.email || "test@test.com"
			},
			back_urls: {
				success: `${serverBaseUrl}/checkout/success`,
				pending: `${serverBaseUrl}/checkout/pending`,
				failure: `${serverBaseUrl}/checkout/failure`
			},
			auto_return: serverBaseUrl.includes("localhost") ? void 0 : "approved",
			external_reference: data.orderId || "0"
		} })).init_point };
	} catch (error) {
		console.error(error);
		throw new Error("No se pudo crear la preferencia de pago: " + error.message);
	}
});
//#endregion
export { createPreferenceFn_createServerFn_handler };
