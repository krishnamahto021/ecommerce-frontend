import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDElYJ_rOC0M5qFESE20z_v90C8fhV3naA",
  authDomain: "ecom-d84ac.firebaseapp.com",
  projectId: "ecom-d84ac",
  storageBucket: "ecom-d84ac.appspot.com",
  messagingSenderId: "6633900799",
  appId: "1:6633900799:web:e8a9b2afb4861dd74e9aca"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
