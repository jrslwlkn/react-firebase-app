import firebase from 'firebase/app';
import 'firebase/firestore';

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
firebase.analytics();

// will remove later
window.firebase = firebase;

export const firestore = firebase.firestore();
export default firebase;
