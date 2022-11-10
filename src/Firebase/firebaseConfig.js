// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBl5y7XDAsI3Pxkr1bCF6gNv6GBjhPUh14",
  authDomain: "test-firebase-auth-ec.firebaseapp.com",
  projectId: "test-firebase-auth-ec",
  storageBucket: "test-firebase-auth-ec.appspot.com",
  messagingSenderId: "184531030082",
  appId: "1:184531030082:web:093b3387d828c712f01ddb",
  measurementId: "G-7QSYD9ZQ7S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const dataBase = getFirestore(app);
