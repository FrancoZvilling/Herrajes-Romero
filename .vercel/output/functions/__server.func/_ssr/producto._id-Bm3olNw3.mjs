import { N as notFound, f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as doc, r as getDoc } from "../_libs/@firebase/firestore+[...].mjs";
import "../_libs/firebase.mjs";
import { n as db } from "./firebase-BBCvycKQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/producto._id-Bm3olNw3.js
var $$splitNotFoundComponentImporter = () => import("./producto._id-CiaMn0WY.mjs");
var $$splitComponentImporter = () => import("./producto._id-qYPT76qg.mjs");
var Route = createFileRoute("/producto/$id")({
	loader: async ({ params }) => {
		const snapshot = await getDoc(doc(db, "products", params.id));
		if (!snapshot.exists()) throw notFound();
		return { product: {
			id: snapshot.id,
			...snapshot.data()
		} };
	},
	head: ({ loaderData }) => ({ meta: loaderData ? [
		{ title: `${loaderData.product.name} — Casa Romero Herrajes` },
		{
			name: "description",
			content: loaderData.product.description
		},
		{
			property: "og:title",
			content: loaderData.product.name
		},
		{
			property: "og:description",
			content: loaderData.product.description
		}
	] : [{ title: "Producto" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
export { Route as t };
