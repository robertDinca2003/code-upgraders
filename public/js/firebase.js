// Import the functions you need from the SDKs you need
// initializeApp = require("https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyAolrIGpjssBlhPoYtIIv1tKu5od6o-MaA",
  authDomain: "codeupgraders.firebaseapp.com",
  projectId: "codeupgraders",
  storageBucket: "codeupgraders.appspot.com",
  messagingSenderId: "334001488642",
  appId: "1:334001488642:web:710ed245d8883b9726b81b",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
let auth = firebase.auth();

const logoutUser = () => {
  auth.signOut();
  location.reload();
};
