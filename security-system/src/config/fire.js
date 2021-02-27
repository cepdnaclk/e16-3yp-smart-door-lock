import firebase from 'firebase/app';
import 'firebase/database'; // If using Firebase database
import 'firebase/storage';
import 'firebase/auth'; 
/**import 'firebase/database';    // for realtime database
import 'firebase/firestore';   // for cloud firestore
import 'firebase/messaging';   // for cloud messaging
import 'firebase/functions';*/
var firebaseConfig = {
    apiKey: "AIzaSyCACFG8oKC5ezD1xL5_-86KnRrteYTI_VQ",
    authDomain: "doorlock-a0c00.firebaseapp.com",
    databaseURL: "https://doorlock-a0c00.firebaseio.com",
    projectId: "doorlock-a0c00",
    storageBucket: "doorlock-a0c00.appspot.com",
    messagingSenderId: "702401593997",
    appId: "1:702401593997:web:be4875fe06d95829f4d8c4",
   measurementId: "G-Y9R1MNVSB8"
  };
 //const fire =firebase.initializeApp(firebaseConfig);
 firebase.initializeApp(firebaseConfig);
  export default firebase;