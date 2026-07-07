import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCupjj5NFFHMaoFalqg7UwKJ9ca91FUajc",
  authDomain: "vinilia-store-01.firebaseapp.com",
  projectId: "vinilia-store-01",
  storageBucket: "vinilia-store-01.firebasestorage.app",
  messagingSenderId: "430181173784",
  appId: "1:430181173784:web:63249a2572debc2017516d"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);