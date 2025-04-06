# Firebase Setup for Productivity App

This document outlines how to set up Firebase for the Productivity App.

## Prerequisites

- A Firebase account (create one at [firebase.google.com](https://firebase.google.com/) if you don't have one)
- Node.js and npm installed on your machine

## Firebase Project Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the steps to create a new Firebase project
3. Once your project is created, click on the web icon (</>) to add a web app to your project
4. Register your app with a nickname and click "Register app"
5. Firebase will provide you with configuration details similar to this:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id",
};
```

## Environment Variables Setup

1. Copy the `.env.example` file from the project root to a new file named `.env.local`
2. Fill in the Firebase configuration values in your `.env.local` file:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

3. Restart your Next.js development server if it's running

## Firebase Authentication Setup

1. In the Firebase Console, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Enable the "Email/Password" sign-in method
4. Optional: Enable other authentication methods like Google, Facebook, etc.

## Firestore Database Setup

1. In the Firebase Console, go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in production mode" or "Start in test mode" (for development)
4. Select a location for your Firestore database
5. Click "Enable"

## Security Rules

If you started in production mode, you'll need to update the Firestore security rules to allow your app to read and write data. Here are some basic rules to get started:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;

      match /{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

These rules allow authenticated users to read and write only their own data.

## Using Firebase in Your App

The app has been configured to use Firebase. The environment variables are automatically loaded by Next.js, and the Firebase initialization code in `src/firebase/firebase.js` creates and exports the Firebase services that your app needs.

You can import and use these services in your components like this:

```javascript
import { auth, db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

// Example: Getting documents from a collection
const getDocuments = async () => {
  const querySnapshot = await getDocs(collection(db, "collection-name"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
};
```

## Troubleshooting

- If Firebase initialization fails, check that all environment variables are correctly set in `.env.local`
- If authentication isn't working, verify that the Email/Password provider is enabled in Firebase Console
- For Firestore errors, check your security rules to ensure they allow the operations your app is trying to perform
