// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
 
const firebaseConfig = {
  apiKey: "AIzaSyDjBIqZkHYAJCaEgCxIWChx_MuOWGWNBH4",
  authDomain: "fyp-artic-voting.firebaseapp.com",
  projectId: "fyp-artic-voting",
  storageBucket: "fyp-artic-voting.appspot.com",
  messagingSenderId: "36954753129",
  appId: "1:36954753129:web:1681f5c2dccccc2dd4faf8",
  measurementId: "G-EKLXSH4S25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export {auth}