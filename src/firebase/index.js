import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkpoc9rtXVYWw-lsJXrKwJOnMVFzURjtU",
  authDomain: "wad-2-36634.firebaseapp.com",
  projectId: "wad-2-36634",
  storageBucket: "wad-2-36634.appspot.com",
  messagingSenderId: "892255239234",
  appId: "1:892255239234:web:0d77bf1cb49148daf181db",
  measurementId: "G-THMJEFRPVB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export {
    db, storage
}

