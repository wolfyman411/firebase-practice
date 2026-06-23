// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrYh26o5RBXhYKf8OdrOeDc7eUew6rCUs",
  authDomain: "fir-practice-b0193.firebaseapp.com",
  projectId: "fir-practice-b0193",
  storageBucket: "fir-practice-b0193.firebasestorage.app",
  messagingSenderId: "79539042890",
  appId: "1:79539042890:web:daf34cf2d8d5ba29b584b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()