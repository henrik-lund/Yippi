import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

// Konfigurationen hämtas från miljövariabler i .env-filen
// så att API-nycklar inte ligger synliga i koden
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initierar Firebase-appen med konfigurationen ovan
const app = initializeApp(firebaseConfig);
// db används för att läsa och skriva data i Firestore-databasen
export const db = getFirestore(app)
// auth används för inloggning och utloggning
export const auth = getAuth(app)