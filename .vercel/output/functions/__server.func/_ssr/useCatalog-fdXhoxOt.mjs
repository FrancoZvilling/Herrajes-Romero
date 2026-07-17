import { c as collection, i as getDocs, l as doc, r as getDoc } from "../_libs/@firebase/firestore+[...].mjs";
import "../_libs/firebase.mjs";
import { n as db } from "./firebase-BBCvycKQ.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useCatalog-fdXhoxOt.js
function useProducts() {
	return useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			return (await getDocs(collection(db, "products"))).docs.map((doc) => ({
				id: doc.id,
				...doc.data()
			}));
		}
	});
}
function useProductsByCategory(slug) {
	return useQuery({
		queryKey: [
			"products",
			"category",
			slug
		],
		queryFn: async () => {
			return (await getDocs(collection(db, "products"))).docs.map((doc) => ({
				id: doc.id,
				...doc.data()
			})).filter((p) => p.category === slug);
		}
	});
}
function useCategories() {
	return useQuery({
		queryKey: ["categories"],
		queryFn: async () => {
			return (await getDocs(collection(db, "categories"))).docs.map((doc) => doc.data());
		}
	});
}
function useBrands() {
	return useQuery({
		queryKey: ["brands"],
		queryFn: async () => {
			const d = await getDoc(doc(db, "settings", "catalog"));
			if (d.exists()) return d.data().brands;
			return [];
		}
	});
}
function useOrders() {
	return useQuery({
		queryKey: ["orders"],
		queryFn: async () => {
			return (await getDocs(collection(db, "orders"))).docs.map((doc) => ({
				id: doc.id,
				...doc.data()
			}));
		}
	});
}
//#endregion
export { useProductsByCategory as a, useProducts as i, useCategories as n, useOrders as r, useBrands as t };
