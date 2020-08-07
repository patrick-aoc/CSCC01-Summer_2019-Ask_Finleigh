import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'

// remember to keep those in env... and make it all process.env.xxx
const firebaseConfig = {
  apiKey: "AIzaSyAAaU4sEbT4IBycV3c6rYcLeWqVynitsxM",
  authDomain: "c01summer.firebaseapp.com",
  databaseURL: "https://c01summer.firebaseio.com/",
  projectId: "c01summer",
  storageBucket: "",
  messagingSenderId: "661520710742",
  appId: "1:661520710742:web:e6655a5ff2a32908"
};


class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.database();
  }

  // remember to add support for google
  // *** Auth method ***
  doCreateUserWithEmailAndPassword = (email, password, firstName, lastName) => this.auth.createUserWithEmailAndPassword(email, password);
  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
  doSignOut = () => this.auth.signOut();
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
  getCurrentUser = () => this.auth.currentUser.uid;
  doAnonSignIn = () => this.auth.signInAnonymously();
}

export default Firebase;