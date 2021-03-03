import firebase from 'firebase/app';
import 'firebase/database'; // If using Firebase database
import 'firebase/storage';
import 'firebase/auth'; 
/**import 'firebase/database';    // for realtime database
import 'firebase/firestore';   // for cloud firestore
import 'firebase/messaging';   // for cloud messaging
import 'firebase/functions';*/
var firebaseConfig = {
    apiKey: "AIzaSyBPx8ge4zHYBiBucZceZ4JG8Uek3OS8rEY",
    authDomain: "smart-door-lock-2.firebaseapp.com",
    projectId: "smart-door-lock-2",
    storageBucket: "smart-door-lock-2.appspot.com",
    messagingSenderId: "683245489574",
    appId: "1:683245489574:web:ed1092f2679bf708465367",
    measurementId: "G-VZRR948RMF"

  };
 //const fire =firebase.initializeApp(firebaseConfig);
 firebase.initializeApp(firebaseConfig);
  export default firebase;