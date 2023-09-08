import firebase from 'firebase';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCyfTAaKy9WGP7FTzh_e4Da5TQlWOsplAE",
    authDomain: "ai-saas-9f428.firebaseapp.com",
    projectId: "ai-saas-9f428",
    storageBucket: "ai-saas-9f428.appspot.com",
    messagingSenderId: "288126979455",
    appId: "1:288126979455:web:4018fc30dac3e12ae6de4a",
    measurementId: "G-991NLW5NYQ"
  };
  
  const firebaseSApp = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
   const db = firebaseSApp.firestore();
   const googleProvider = new firebase.auth.GoogleAuthProvider();
   const facebookProvider = new firebase.auth.FacebookAuthProvider();
   const TwitterProvider = new firebase.auth.TwitterAuthProvider();
   const GithubProvider = new firebase.auth.GithubAuthProvider();
   const storage = firebase.storage();
   export default {auth, db, storage};
  export  {db, googleProvider, facebookProvider, TwitterProvider,GithubProvider};
  export  {auth};
  export  {storage};