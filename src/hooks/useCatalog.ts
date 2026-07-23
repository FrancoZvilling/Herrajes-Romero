import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Product, Category } from "@/data/catalog";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const snapshot = await getDocs(collection(db, "products"));
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    }
  });
}

export function useProductsByCategory(slug: string) {
  return useQuery({
    queryKey: ["products", "category", slug],
    queryFn: async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const all = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      return all.filter(p => p.category === slug);
    }
  });
}

export function useProductById(id: string) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const docRef = doc(db, "products", id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data() } as Product;
      }
      return null;
    }
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const snapshot = await getDocs(collection(db, "categories"));
      return snapshot.docs.map(doc => doc.data() as Category);
    }
  });
}

export function useBrands() {
  return useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const d = await getDoc(doc(db, "settings", "catalog"));
      if (d.exists()) {
        return d.data().brands as string[];
      }
      return [];
    }
  });
}

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const snapshot = await getDocs(collection(db, "orders"));
      return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));
    }
  });
}
