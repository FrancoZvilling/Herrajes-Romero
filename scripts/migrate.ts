import { initializeApp } from "firebase/app";
import { getFirestore, collection, writeBatch, doc } from "firebase/firestore";
import * as dotenv from "dotenv";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Initialize dotenv manually since import.meta.env isn't available in node script
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, "../.env") });

import { categories, products, brands } from "../src/data/catalog.ts";

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
  console.log("Starting migration...");

  try {
    const batch = writeBatch(db);

    // 1. Migrate Categories
    console.log(`Migrating ${categories.length} categories...`);
    categories.forEach(cat => {
      const ref = doc(collection(db, "categories"), cat.slug);
      batch.set(ref, cat);
    });

    // 2. Migrate Products
    console.log(`Migrating ${products.length} products...`);
    products.forEach(prod => {
      const ref = doc(collection(db, "products"), prod.id);
      batch.set(ref, {
        ...prod,
        variants: prod.variants || [],
        tags: prod.tags || []
      });
    });

    // 3. Migrate Brands
    console.log(`Migrating ${brands.length} brands...`);
    const brandsRef = doc(collection(db, "settings"), "catalog");
    batch.set(brandsRef, { brands });

    console.log("Committing to Firestore...");
    await batch.commit();
    console.log("Migration completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

migrate();
