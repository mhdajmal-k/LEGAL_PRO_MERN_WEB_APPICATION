import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3gTk1RyH0pgu52o_DJGMV-ZRDWAUkyLg",
  authDomain: "legalpro-e248e.firebaseapp.com",
  projectId: "legalpro-e248e",
  storageBucket: "legalpro-e248e.appspot.com",
  messagingSenderId: "615886116974",
  appId: "1:615886116974:web:dd3520a8b9900458886e7f",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
