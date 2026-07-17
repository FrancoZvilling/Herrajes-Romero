import { o as initializeApp } from "../_libs/@firebase/app+[...].mjs";
import { u as getFirestore } from "../_libs/@firebase/firestore+[...].mjs";
import "../_libs/firebase.mjs";
import { t as getAuth } from "../_libs/firebase__auth.mjs";
import { t as getStorage } from "../_libs/firebase__storage.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/firebase-BBCvycKQ.js
var app = initializeApp({
	apiKey: "AIzaSyB7cmorsn3AOsx3APCyhtIWhD4x2Orvdmk",
	authDomain: "herrajes-romero.firebaseapp.com",
	projectId: "herrajes-romero",
	storageBucket: "herrajes-romero.firebasestorage.app",
	messagingSenderId: "868912799583",
	appId: "1:868912799583:web:40164060388c12fcb0a0ea"
});
var db = getFirestore(app);
var auth = getAuth(app);
getStorage(app);
//#endregion
export { db as n, auth as t };
