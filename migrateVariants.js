import { initializeApp } from "firebase/app";
import { getFirestore, updateDoc, doc, collection, getDocs } from "firebase/firestore";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
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

async function main() {
  console.log("Migrating variants in Firestore...");

  const productsRef = collection(db, "products");
  const snapshot = await getDocs(productsRef);

  let migratedCount = 0;

  for (const productDoc of snapshot.docs) {
    const data = productDoc.data();
    let needsUpdate = false;
    let newVariants = [];

    if (data.variants && Array.isArray(data.variants)) {
      newVariants = data.variants.map((v) => {
        // Check if options is an array of strings
        if (v.options && v.options.length > 0 && typeof v.options[0] === 'string') {
          needsUpdate = true;
          return {
            ...v,
            options: v.options.map(opt => ({ value: opt }))
          };
        }
        return v;
      });
    }

    if (needsUpdate) {
      console.log(`Migrating variants for product ${productDoc.id}...`);
      await updateDoc(doc(db, "products", productDoc.id), { variants: newVariants });
      migratedCount++;
    }
  }

  console.log(`Done! Migrated variants for ${migratedCount} products.`);
  process.exit(0);
}

main().catch(console.error);
