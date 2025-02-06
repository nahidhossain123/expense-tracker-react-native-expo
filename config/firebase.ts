// Import the functions you need from the SDKs you need
import { getFirestore } from "@firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {initializeAuth,getReactNativePersistence} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVcKw4wNeS1iRNr-9KbjIsPoBifsV3Z3g",
  authDomain: "expense-tracker-7055e.firebaseapp.com",
  projectId: "expense-tracker-7055e",
  storageBucket: "expense-tracker-7055e.firebasestorage.app",
  messagingSenderId: "878133157899",
  appId: "1:878133157899:web:3266aa0f176142587f670e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth
export const auth = initializeAuth(app,{
    persistence:getReactNativePersistence(AsyncStorage)
})

export const firestore = getFirestore(app)