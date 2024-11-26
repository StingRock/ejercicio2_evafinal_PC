import { initializeApp  } from "firebase/app";
import { getFirestore  } from "firebase/firestore";

import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDS4UrJ6eXMl7DjVXXl61XI1olkv2--88k",
    authDomain: "databasefinal-f1f29.firebaseapp.com",
    projectId: "databasefinal-f1f29",
    storageBucket: "databasefinal-f1f29.firebasestorage.app",
    messagingSenderId: "441093213223",
    appId: "1:441093213223:web:f8540eecc8a68d8cd8d202"
};

// Inicializar Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Exportar Auth y Firestore
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);