import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCBMutBOG-CqNnbxcmjNpoGhzghp4WQwkM",
  authDomain: "note-share-f3edf.firebaseapp.com",
  projectId: "note-share-f3edf",
  storageBucket: "note-share-f3edf.firebasestorage.app",
  messagingSenderId: "41815155240",
  appId: "1:41815155240:web:59d78462d6ca23f0fc8b1d",
  databaseURL: "https://note-share-f3edf-default-rtdb.firebaseio.com/"
};

// Initialize
const app = initializeApp(firebaseConfig);

// Exports (Inhe App.jsx mein use karenge)
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;