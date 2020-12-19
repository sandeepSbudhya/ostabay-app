import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyBTLJcB7M-gd7CwsVr3FKeU9zGTT02RHtw",
  authDomain: "ostabay-test.firebaseapp.com",
  projectId: "ostabay-test",
  storageBucket: "ostabay-test.appspot.com",
  messagingSenderId: "1009750639521",
  appId: "1:1009750639521:web:1168369aed0f1d07b9c1e0",
  measurementId: "G-CZ2TSS8M6T",
};
firebase.initializeApp(firebaseConfig);
// utils
const db = firebase.firestore();
const auth = firebase.auth();

// export utils/refs
export { db, auth };
