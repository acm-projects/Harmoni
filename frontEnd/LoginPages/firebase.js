import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAWEtEppFLU8bAXwxHao5pWRPzhTTiIUsg",
    authDomain: "kartik-harmoni.firebaseapp.com",
    projectId: "kartik-harmoni",
    storageBucket: "kartik-harmoni.appspot.com",
    messagingSenderId: "671566332772",
    appId: "1:671566332772:web:df558c44d7c60dbc8cf071",
    measurementId: "G-HZERMD0NC9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app); // Initialize Firestore

export { auth, firestore };

