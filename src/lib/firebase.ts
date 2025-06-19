
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAM2uhuJ-0t3kWupCjBCKNvFYKqyM2EDic",
  authDomain: "booking-system-f5616.firebaseapp.com",
  projectId: "booking-system-f5616",
  storageBucket: "booking-system-f5616.firebasestorage.app",
  messagingSenderId: "734486653254",
  appId: "1:734486653254:web:e200617bcc5a8d40809d47",
  measurementId: "G-RVMPM5TV0V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export default app;
