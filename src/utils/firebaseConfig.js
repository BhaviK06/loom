import { initializeApp, getApps } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

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


let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Auth with AsyncStorage for React Native
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getDatabase(app);

export { auth, db };
export default app;
