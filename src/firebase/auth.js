import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";

export async function registerWithEmailAndPassword(email, password) {
  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore();
  const auth = getAuth(firebaseApp);
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (res.user.uid) {
      const userRef = doc(db, "users", res.user.uid);
      setDoc(userRef, { creationDate: Date.now() }, { merge: true });
      return true;
    }
  } catch (error) {
    throw error.code;
  }
}

export async function loginUser(email, password) {
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return true;
  } catch (error) {
    throw error.code;
  }
}

export async function logOutUser() {
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  try {
    signOut(auth);
    return true;
  } catch (error) {
    console.error("Error logging out:", error);
    return false;
  }
}
