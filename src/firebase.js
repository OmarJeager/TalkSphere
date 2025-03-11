// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; 

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzrCgBQH916ldV9hqlZEQ9tRDKMwqy2eM",
  authDomain: "chat-app-db4b3.firebaseapp.com",
  projectId: "chat-app-db4b3",
  storageBucket: "chat-app-db4b3.firebasestorage.app",
  messagingSenderId: "1025187678167",
  appId: "1:1025187678167:web:1d5b89bee579c7bd98ed92",
  measurementId: "G-YSRBLFMHPD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize authentication
const auth = getAuth(app); // Get auth instance
// Now you can get Firebase services
const db = getDatabase(app);
// Export the services
export { auth, db };
