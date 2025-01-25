import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8qZpaqHlar-uYpozGdbXFt4K6e8s2Lms",
  authDomain: "auth-a6579.firebaseapp.com",
  projectId: "auth-a6579",
  storageBucket: "auth-a6579.firebasestorage.app",
  messagingSenderId: "581359482548",
  appId: "1:581359482548:web:63083375d64565819909e1",
  measurementId: "G-XPXWT1Z21H"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export { app, auth ,db};



export default firebaseConfig;
