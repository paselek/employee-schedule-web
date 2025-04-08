// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA-N44DM-Ed3BMZwHk5rmuygudeYfuplcQ",
    authDomain: "employeemanagementsystem-132ea.firebaseapp.com",
    projectId: "employeemanagementsystem-132ea",
    storageBucket: "employeemanagementsystem-132ea.firebasestorage.app",
    messagingSenderId: "435325002355",
    appId: "1:435325002355:web:eb2b1c7c51eeec5fc6c006",
    measurementId: "G-488QV10R7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);