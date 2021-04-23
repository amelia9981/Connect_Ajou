import * as firebase from 'firebase';
import '@firebase/firestore'
import '@firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDgvSvamqGrYsWCyQxF5LLsFMOGKfTMh60",
  authDomain: "connect-ajou.firebaseapp.com",
  databaseURL: "https://connect-ajou-default-rtdb.firebaseio.com",
  projectId: "connect-ajou",
  storageBucket: "connect-ajou.appspot.com",
  messagingSenderId: "539079466240",
  appId: "1:539079466240:web:c3af807763a44a3e96a7e5"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export {firebase};