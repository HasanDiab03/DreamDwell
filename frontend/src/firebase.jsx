// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "dreamdwell-estate.firebaseapp.com",
  projectId: "dreamdwell-estate",
  storageBucket: "dreamdwell-estate.appspot.com",
  messagingSenderId: "469048243607",
  appId: "1:469048243607:web:4fa24778161fc72f1e80d2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
