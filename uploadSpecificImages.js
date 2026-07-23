import { initializeApp } from "firebase/app";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
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
  "p-1": "C:\\Users\\franc\\.gemini\\antigravity\\brain\\f5649a38-5c2f-4694-9f58-d6778c761914\\img_p_1_1784835135112.jpg",
  "p-10": "C:\\Users\\franc\\.gemini\\antigravity\\brain\\f5649a38-5c2f-4694-9f58-d6778c761914\\img_p_10_1784835142831.jpg",
  "p-11": "C:\\Users\\franc\\.gemini\\antigravity\\brain\\f5649a38-5c2f-4694-9f58-d6778c761914\\img_p_11_1784835151811.jpg",
  "p-12": "C:\\Users\\franc\\.gemini\\antigravity\\brain\\f5649a38-5c2f-4694-9f58-d6778c761914\\img_p_12_1784835160497.jpg",
  "p-13": "C:\\Users\\franc\\.gemini\\antigravity\\brain\\f5649a38-5c2f-4694-9f58-d6778c761914\\img_p_13_1784835168795.jpg",
  "p-14": "C:\\Users\\franc\\.gemini\\antigravity\\brain\\f5649a38-5c2f-4694-9f58-d6778c761914\\img_p_14_1784835176945.jpg",
  "p-15": "C:\\Users\\franc\\.gemini\\antigravity\\brain\\f5649a38-5c2f-4694-9f58-d6778c761914\\img_p_15_1784835185396.jpg",
  "p-16": "C:\\Users\\franc\\.gemini\\antigravity\\brain\\f5649a38-5c2f-4694-9f58-d6778c761914\\img_p_16_1784835193046.jpg"
};

async function uploadImage(id, filePath) {
  const imageRef = ref(storage, `products/${id}_${Date.now()}.jpg`);
  const buffer = fs.readFileSync(filePath);
  const uint8Array = new Uint8Array(buffer);
  
  await uploadBytes(imageRef, uint8Array, { contentType: "image/jpeg" });
  return await getDownloadURL(imageRef);
}

async function main() {
  console.log("Uploading specific images...");

  for (const [id, path] of Object.entries(imagePaths)) {
    console.log(`Uploading image for product ${id}...`);
    const url = await uploadImage(id, path);
    console.log(`Updating product ${id} with URL: ${url}`);
    await updateDoc(doc(db, "products", id), { imageUrl: url });
  }

  console.log(`Done! Updated ${Object.keys(imagePaths).length} products with their specific images.`);
  process.exit(0);
}

main().catch(console.error);
