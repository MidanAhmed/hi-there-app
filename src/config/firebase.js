// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAokhibWk4lvwEEWW4hdVEDR_-p1S1ou5w",
    authDomain: "hi-there-chat-app.firebaseapp.com",
    projectId: "hi-there-chat-app",
    storageBucket: "hi-there-chat-app.appspot.com",
    messagingSenderId: "671690581672",
    appId: "1:671690581672:web:552d2f331caf35f0b3449d",
    measurementId: "G-N3M2DND19P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app); 


const analytics = getAnalytics(app);