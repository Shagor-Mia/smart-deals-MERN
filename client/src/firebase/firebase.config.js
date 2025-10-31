// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWw0ZIQP6MVTjIUUDen4PsjPH6W325MeY",
  authDomain: "smart-deals-1903e.firebaseapp.com",
  projectId: "smart-deals-1903e",
  storageBucket: "smart-deals-1903e.firebasestorage.app",
  messagingSenderId: "512118418325",
  appId: "1:512118418325:web:0335f3c2bf318e908c649c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
