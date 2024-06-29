import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA1hMvNob94ri7pf8YHqeGiYKW2WwPhPAg",
  authDomain: "realtime-chat-react-ts.firebaseapp.com",
  projectId: "realtime-chat-react-ts",
  storageBucket: "realtime-chat-react-ts.appspot.com",
  messagingSenderId: "854244581350",
  appId: "1:854244581350:web:47c45f35a33652aa5d0027",
  measurementId: "G-5BVN2BNFLR",
  databaseURL: "https://realtime-chat-react-ts-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

export default app;
export { analytics};
export { auth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut };
export { database, ref, set, onValue };