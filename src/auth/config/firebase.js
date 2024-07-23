// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMOu1nlI_KYHIPEpdua0eBpjJiKhoKz_0",
  authDomain: "bowyer-s-den.firebaseapp.com",
  projectId: "bowyer-s-den",
  storageBucket: "bowyer-s-den.appspot.com",
  messagingSenderId: "570289447279",
  appId: "1:570289447279:web:f7220ead3179d2d2e3089a",
  measurementId: "G-HZQJBB29MN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };