import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as dotenv from "dotenv";
import fs from "fs";

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
const storage = getStorage(app);

const imagePaths = {
  door_handle: "C:\\Users\\franc\\.gemini\\antigravity\\brain\\f5649a38-5c2f-4694-9f58-d6778c761914\\door_handle_1784834502981.jpg",
  door_lock: "C:\\Users\\franc\\.gemini\\antigravity\\brain\\f5649a38-5c2f-4694-9f58-d6778c761914\\door_lock_1784834510846.jpg",
  screws_tools: "C:\\Users\\franc\\.gemini\\antigravity\\brain\\f5649a38-5c2f-4694-9f58-d6778c761914\\screws_tools_1784834521610.jpg",
  electric_plug: "C:\\Users\\franc\\.gemini\\antigravity\\brain\\f5649a38-5c2f-4694-9f58-d6778c761914\\electric_plug_1784834529122.jpg",
  cabinet_hinge: "C:\\Users\\franc\\.gemini\\antigravity\\brain\\f5649a38-5c2f-4694-9f58-d6778c761914\\cabinet_hinge_1784834537246.jpg",
};

function getCategoryImage(category) {
  if (["linea-seguridad"].includes(category)) return "door_lock";
  if (["pegamentos", "tornilleria"].includes(category)) return "screws_tools";
  if (["electricidad"].includes(category)) return "electric_plug";
  if (["linea-puerta", "linea-porton"].includes(category)) return "door_handle";
  return "cabinet_hinge"; // default fallback for furniture, hooks, windows, etc
}

async function uploadImage(name, filePath) {
  const imageRef = ref(storage, `products/ai_placeholder_${name}.jpg`);
  const buffer = fs.readFileSync(filePath);
  const uint8Array = new Uint8Array(buffer);
  
  await uploadBytes(imageRef, uint8Array, { contentType: "image/jpeg" });
  return await getDownloadURL(imageRef);
}

async function main() {
  console.log("Uploading base images...");
  const urls = {};
  for (const [name, path] of Object.entries(imagePaths)) {
    console.log(`Uploading ${name}...`);
    urls[name] = await uploadImage(name, path);
    console.log(`URL for ${name}: ${urls[name]}`);
  }

  console.log("Fetching products...");
  const querySnapshot = await getDocs(collection(db, "products"));
  let updatedCount = 0;

  for (const docSnap of querySnapshot.docs) {
    const data = docSnap.data();
    if (!data.imageUrl) {
      const imgKey = getCategoryImage(data.category);
      const url = urls[imgKey];
      
      console.log(`Updating product ${data.name} with ${imgKey} image...`);
      await updateDoc(doc(db, "products", docSnap.id), { imageUrl: url });
      updatedCount++;
    }
  }

  console.log(`Done! Updated ${updatedCount} products.`);
  process.exit(0);
}

main().catch(console.error);
