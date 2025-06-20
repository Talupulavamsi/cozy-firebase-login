
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyA_VUYuRdB54XDO8Uw-j2ox9sb37Lf4bCk",
  authDomain: "booking-8483f.firebaseapp.com",
  projectId: "booking-8483f",
  storageBucket: "booking-8483f.firebasestorage.app",
  messagingSenderId: "474480335344",
  appId: "1:474480335344:web:b0b5b4ec742021a1d16535",
  measurementId: "G-PXYBP1YM91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export default app;
