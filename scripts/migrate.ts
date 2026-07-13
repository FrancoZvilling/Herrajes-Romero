import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { categories, products } from "../src/data/catalog";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migrate() {
  console.log("Iniciando migración a Firebase...");

  console.log("\n1. Subiendo Categorías...");
  for (const cat of categories) {
    try {
      await setDoc(doc(collection(db, "categories"), cat.slug), cat);
      console.log(`✅ Categoría migrada: ${cat.name}`);
    } catch (e: any) {
      console.error(`❌ Error en categoría ${cat.name}:`, e.message);
    }
  }

  console.log("\n2. Subiendo Productos...");
  for (const prod of products) {
    try {
      await setDoc(doc(collection(db, "products"), prod.id), prod);
      console.log(`✅ Producto migrado: ${prod.name}`);
    } catch (e: any) {
      console.error(`❌ Error en producto ${prod.name}:`, e.message);
    }
  }
  
  console.log("\n🚀 ¡Migración completada con éxito!");
  process.exit(0);
}

migrate().catch(console.error);
