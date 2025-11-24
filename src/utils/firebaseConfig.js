import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC38cv1qqRcbn85uvvrfZdr11v13Eek4KQ",
  authDomain: "loom-4c033.firebaseapp.com",
  projectId: "loom-4c033",
  storageBucket: "loom-4c033.firebasestorage.app",
  messagingSenderId: "91136004859",
  appId: "1:91136004859:web:bd93cd3c85ca1abcb6165e",
  measurementId: "G-NRV3NKD4KC",
  databaseURL: "https://loom-4c033-default-rtdb.firebaseio.com"
};

// ✅ Initialize Firebase app safely
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export default app;
