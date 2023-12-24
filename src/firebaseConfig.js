// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"
import {getAuth,GoogleAuthProvider} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyAJZmRlkH1IZh1D8T_F7FmLzKcGsgcm8m8",
  authDomain: "ftwh-db-80de9.firebaseapp.com",
  projectId: "ftwh-db-80de9",
  storageBucket: "ftwh-db-80de9.appspot.com",
  messagingSenderId: "943522557780",
  appId: "1:943522557780:web:24db63e52c79da9906a2c1",
  measurementId: "G-L3K0FP3CR6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


export {storage,db,auth,provider}
