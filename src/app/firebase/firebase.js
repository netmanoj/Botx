// src/app/firebase/firebase.js
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9sgA1QgvA0NfiQ1KB6VdYtk8_vQl1bRY",
  authDomain: "proz-b3de1.firebaseapp.com",
  projectId: "proz-b3de1",
  storageBucket: "proz-b3de1.firebasestorage.app",
  messagingSenderId: "1079767600002",
  appId: "1:1079767600002:web:7b27e4cae08876994c5d9b",
  measurementId: "G-87K8DTRYC8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);


export {
    app, // Export app for Firestore initialization
    auth,
    googleProvider,
    signInWithPopup,
    signInWithPhoneNumber,
    RecaptchaVerifier,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    db,
  };