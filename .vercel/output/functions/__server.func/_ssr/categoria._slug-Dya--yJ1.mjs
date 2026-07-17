import { N as notFound, f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as doc, r as getDoc } from "../_libs/@firebase/firestore+[...].mjs";
import "../_libs/firebase.mjs";
import { n as db } from "./firebase-BBCvycKQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/categoria._slug-Dya--yJ1.js
var $$splitNotFoundComponentImporter = () => import("./categoria._slug-CHfvvuqx.mjs");
var $$splitComponentImporter = () => import("./categoria._slug-DBj9bwUf.mjs");
var Route = createFileRoute("/categoria/$slug")({
	loader: async ({ params }) => {
		const snapshot = await getDoc(doc(db, "categories", params.slug));
		if (!snapshot.exists()) throw notFound();
		return { category: snapshot.data() };
	},
	head: ({ loaderData }) => ({ meta: loaderData ? [
		{ title: `${loaderData.category.name} — Casa Romero Herrajes` },
		{
			name: "description",
			content: loaderData.category.description
		},
		{
			property: "og:title",
			content: `${loaderData.category.name} — Casa Romero`
		},
		{
			property: "og:description",
			content: loaderData.category.description
		}
	] : [{ title: "Categoría — Casa Romero" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
export { Route as t };
