import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAW6A-d0RbqdqAFa-oRIrQ7m3GFhgzVxeU",
  authDomain: "react-firebase-app-a05a4.firebaseapp.com",
  databaseURL: "https://react-firebase-app-a05a4.firebaseio.com",
  projectId: "react-firebase-app-a05a4",
  storageBucket: "react-firebase-app-a05a4.appspot.com",
  messagingSenderId: "857620419922",
  appId: "1:857620419922:web:a188d33eebf6bad759168b",
  measurementId: "G-CBYJMGYKXE"
};

firebase.initializeApp(firebaseConfig);

// will remove later
window.firebase = firebase;

export const createUserProfileDoc = async (user, data) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const createdAt = new Date();
    const {displayName, email, photoURL} = user;
    try {
      await userRef.set({displayName, email, photoURL, createdAt, ...data})
    } catch (err) {
      console.warn(err);
    }
  }

  return getUserDoc(user.uid);
}

export const getUserDoc = async uid => {
  if (!uid) return null;

  try {
    return firestore.collection('users').doc(uid);
  } catch (err) {
    console.warn(err);
  }
}

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const storage = firebase.storage();

export const googleSignIn = () => auth.signInWithPopup(provider).catch(console.warn);
export const signOut = () => auth.signOut();

export default firebase;
