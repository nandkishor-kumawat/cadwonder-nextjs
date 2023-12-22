import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import 'firebase/auth';
import 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD9vltFxfAqbdHVZZKJQFp_4-D5iXAtWos",
  authDomain: "cadwonder-c86e5.firebaseapp.com",
  projectId: "cadwonder-c86e5",
  storageBucket: "cadwonder-c86e5.appspot.com",
  messagingSenderId: "337066003181",
  appId: "1:337066003181:web:c81870f1795b4082521ae4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth()
const rdb = getDatabase();
const storage = getStorage(app);
export { app, auth, db, rdb, storage }



