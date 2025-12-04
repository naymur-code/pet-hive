import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5TubXS4lWB3OSrLVMIBGua_vl7MjNV6Q",
  authDomain: "pet-hive-99416.firebaseapp.com",
  projectId: "pet-hive-99416",
  storageBucket: "pet-hive-99416.firebasestorage.app",
  messagingSenderId: "998772836728",
  appId: "1:998772836728:web:d9cba77560d83997f1a08d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)