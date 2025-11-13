// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFQlG28siuJ59QqEwqBa2TBWllYSpuDlE",
  authDomain: "techzone-f17f8.firebaseapp.com",
  projectId: "techzone-f17f8",
  storageBucket: "techzone-f17f8.firebasestorage.app",
  messagingSenderId: "553594976084",
  appId: "1:553594976084:web:7a5f9fd65290ae7a213ac1",
  measurementId: "G-NT4JPXN20Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);