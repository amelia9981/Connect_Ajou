import * as firebase from "firebase";
import "firebase/firestore";

class Firebase {
  constructor() {
    this.init();
    this.checkAuth();
  }

  init = () => {
    if (firebase.apps.length == 0) {
      firebase.initializeApp({
        apiKey: "AIzaSyDgvSvamqGrYsWCyQxF5LLsFMOGKfTMh60",
        authDomain: "connect-ajou.firebaseapp.com",
        projectId: "connect-ajou",
        storageBucket: "connect-ajou.appspot.com",
        messagingSenderId: "539079466240",
        appId: "1:539079466240:web:c3af807763a44a3e96a7e5",
      });
    }
  };

  checkAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        try {
          firebase.auth().signInAnonymously();
        } catch ({ message }) {
          alert(message);
        }
      }
    });
  };

  get ref() {
    return firebase.database().ref("chats/");
  }

  on = (callback) =>
    this.ref
      .limitToLast(20)
      .on("child_added", (snapshot) => callback(this.parse(snapshot)));

  parse = (snapshot) => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;

    const timestamp = new Date(numberStamp);

    const message = {
      _id,
      timestamp,
      text,
      user,
    };

    return message;
  };

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  send = (messages) => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };
  append = (message) => this.ref.push(message);

  off() {
    this.ref.off();
  }
}

Firebase.shared = new Firebase();
export default Firebase;
