
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAboA2xgYRCZFUhWx5mmILYE0_05c6IGP8",
  authDomain: "zenblog-e48ca.firebaseapp.com",
  projectId: "zenblog-e48ca",
  storageBucket: "zenblog-e48ca.appspot.com",
  messagingSenderId: "1019240358627",
  appId: "1:1019240358627:web:70576bed039901e2e19bd6"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };