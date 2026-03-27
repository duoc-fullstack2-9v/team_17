import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {

    apiKey: "AIzaSyDtUm8wx_EBPpv5vFvuEQqrtWUg8uDnwAQ",

    authDomain: "huerto-hogar-app.firebaseapp.com",

    projectId: "huerto-hogar-app",

    storageBucket: "huerto-hogar-app.firebasestorage.app",

    messagingSenderId: "904781770564",

    appId: "1:904781770564:web:4d81aebc262792af33b111",

    measurementId: "G-HBHSCD5G1E"

};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();