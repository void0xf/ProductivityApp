import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { convertTimestampToDate } from "../utils/date.utils";

export async function addDataToFirebase(firestore, uid, tasks, completedTask, notes, lists) {
  const jsonString = JSON.stringify(tasks);
  const userCollectionRef = collection(firestore, 'users');
  const userDocRef = doc(userCollectionRef, uid); // Use the UID as the document ID
  await setDoc(userDocRef, { tasks,  completedTask, notes, lists }); // Set the document data to { tasks }
}

export async function getTasksByUID(firestore, uid) {
  const userDocRef = doc(firestore, 'users', uid); // Reference to the user's document
  const documentSnapshot = await getDoc(userDocRef); // Get the document

  if (documentSnapshot.exists()) {
    const userData = documentSnapshot.data(); // Get the data from the document
    if (userData && userData.tasks) {
      return userData.tasks.map((task) => convertTimestampToDate(task))
    } else {
      return []; // If 'tasks' field is missing or empty, return an empty array
    }
  } else {
    return null; // The document with the specified UID does not exist
  }
}

export async function getCompletedTasksByUID(firestore, uid) {
  const userDocRef = doc(firestore, 'users', uid); // Reference to the user's document
  const documentSnapshot = await getDoc(userDocRef); // Get the document

  if (documentSnapshot.exists()) {
    const userData = documentSnapshot.data(); // Get the data from the document
    if (userData && userData.completedTask) {
      return userData.completedTask.map((task) => convertTimestampToDate(task))
    } else {
      return []; // If 'tasks' field is missing or empty, return an empty array
    }
  } else {
    return null; // The document with the specified UID does not exist
  }
}

export async function getNotesbyUID(firestore, uid) {
  const userDocRef = doc(firestore, 'users', uid);
  const documentSnapshot = await getDoc(userDocRef); 
  if (documentSnapshot.exists()) {
    const userData = documentSnapshot.data(); // Get the data from the document
    if (userData && userData.notes) {
      return userData.notes
    } else {
      return []; // If 'tasks' field is missing or empty, return an empty array
    }
  } else {
    return null; // The document with the specified UID does not exist
  }
}

export async function getListsByUID(firestore, uid) {
  const userDocRef = doc(firestore, 'users', uid);
  const documentSnapshot = await getDoc(userDocRef); 
  if (documentSnapshot.exists()) {
    const userData = documentSnapshot.data(); // Get the data from the document
    if (userData && userData.lists) {
      return userData.lists
    } else {
      return []; // If 'tasks' field is missing or empty, return an empty array
    }
  } else {
    return null; // The document with the specified UID does not exist
  }
}