import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAi7uJRU1a_vt6x4x1lQdxGDAjLP45Vi-8",
    authDomain: "fir-auth-fd863.firebaseapp.com",
    projectId: "fir-auth-fd863",
    storageBucket: "fir-auth-fd863.appspot.com",
    messagingSenderId: "95298653648",
    appId: "1:95298653648:web:506bfb6386582fc2f17dd5"
  };

  export const app = initializeApp(firebaseConfig);  
  export const auth = getAuth(app); 