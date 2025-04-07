import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
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

// Google Authentication
export async function signInWithGoogle() {
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const db = getFirestore();
  const googleProvider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Store user info in Firestore
    if (user.uid) {
      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        {
          creationDate: Date.now(),
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          authProvider: "google",
        },
        { merge: true }
      );
    }

    return true;
  } catch (error) {
    throw error.code;
  }
}

// GitHub Authentication
export async function signInWithGithub() {
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const db = getFirestore();
  const githubProvider = new GithubAuthProvider();

  try {
    const result = await signInWithPopup(auth, githubProvider);
    const user = result.user;

    // Store user info in Firestore
    if (user.uid) {
      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        {
          creationDate: Date.now(),
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          authProvider: "github",
        },
        { merge: true }
      );
    }

    return true;
  } catch (error) {
    throw error.code;
  }
}
