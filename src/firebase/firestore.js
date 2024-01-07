import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { convertTimestampToDate } from "../utils/date.utils";

export async function addTasksToFirebase(firestore, uid, tasks, completedTask) {
  const jsonString = JSON.stringify(tasks);
  const userCollectionRef = collection(firestore, 'users');
  const userDocRef = doc(userCollectionRef, uid); // Use the UID as the document ID
  await setDoc(userDocRef, { tasks,  completedTask}); // Set the document data to { tasks }
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