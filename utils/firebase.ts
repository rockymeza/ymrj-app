// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
  apiKey: "AIzaSyD5Xtr-E5fS_5iSlg5V-GVQqCUz2Hr1mVU",
  authDomain: "ymrj-app.firebaseapp.com",
  databaseURL: "https://ymrj-app.firebaseio.com",
  projectId: "ymrj-app",
  storageBucket: "ymrj-app.appspot.com",
  messagingSenderId: "639558517423",
  appId: "1:639558517423:web:8bf4fcc1419f1cf80d4a5a",
  measurementId: "G-BYTTJZ6MST"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
