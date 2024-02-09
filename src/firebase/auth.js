import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';


export async function registerWithEmailAndPassword(email, password) {
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);

  
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
  } catch(error) {
    console.error('Registration error:', error);
  }
}

export async function loginUser(email, password) {
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User logged in:', userCredential.user);
    return true;
  } catch (error) {
    console.error('Error logging in:', error.message);
    return false;
  }
}

export async function logOutUser() {
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  try {
    signOut(auth);
    return true
  } catch (error) {
    console.error('Error logging out:', error);
    return false
  }
}
