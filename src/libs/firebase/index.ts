import AsyncStorage from "@react-native-async-storage/async-storage";

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBGKNDDg1ycxb_aTJacYcpUwhA5yRCVVCQ",
    authDomain: "teach-cooking.firebaseapp.com",
    projectId: "teach-cooking",
    storageBucket: "teach-cooking.appspot.com",
    messagingSenderId: "340735487032",
    appId: "1:340735487032:web:0554fc460ae3cd5122cacd",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export { app, storage, db, auth };
