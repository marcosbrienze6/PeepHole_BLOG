import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB40e8yGowdOyVb9MHKbU8mB6fdTT8H9Qo",
  authDomain: "peephole-d0b2a.firebaseapp.com",
  projectId: "peephole-d0b2a",
  storageBucket: "peephole-d0b2a.appspot.com",
  messagingSenderId: "868760837391",
  appId: "1:868760837391:web:ddd6b56435b9d5d89ff27a",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
