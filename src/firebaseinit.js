import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAclALcXgugj3GBn2RXEscGH5oLsrbPO_8",
  authDomain: "ecom-a00ce.firebaseapp.com",
  projectId: "ecom-a00ce",
  storageBucket: "ecom-a00ce.appspot.com",
  messagingSenderId: "434125758081",
  appId: "1:434125758081:web:b3ef9bd57d4b392bc27780"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
