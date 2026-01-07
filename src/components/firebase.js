// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from  'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKM4t0ViOEtAG4WyA2OEyYG1XsdbX00I8",
  authDomain: "reaff-ac8aa.firebaseapp.com",
  projectId: "reaff-ac8aa",
  storageBucket: "reaff-ac8aa.firebasestorage.app",
  messagingSenderId: "97882054972",
  appId: "1:97882054972:web:ff4a8c13f6e43b1a757e39",
  measurementId: "G-K1KXCXS940"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app; 