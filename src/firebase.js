import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyBvyQUVIkpvibHenyXr8gB0KJNhrXEgf-k",
    authDomain: "preem-whatsapp-cloning-cd897.firebaseapp.com",
    projectId: "preem-whatsapp-cloning-cd897",
    storageBucket: "preem-whatsapp-cloning-cd897.appspot.com",
    messagingSenderId: "427444486585",
    appId: "1:427444486585:web:0fd2a68560c09eeec4f668"
  };
  
 const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);
  export const db = getFirestore(app);
  export const storage = getStorage(app);

  export default app;



  