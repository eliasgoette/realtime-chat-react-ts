import { User } from "firebase/auth";
import { auth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "./firebase";

const googleSignIn = () => signInWithPopup(auth, new GoogleAuthProvider());
const getAuthState = (callback: (user: User | null) => void) => onAuthStateChanged(auth, callback);
const firebaseSignOut = () => signOut(auth);

export { googleSignIn, getAuthState, firebaseSignOut };