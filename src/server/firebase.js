import firebase from "firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";
var firebaseConfig = {
  apiKey: "AIzaSyB2olW-jMEdAwe7iEiwHMVLAZ7_Ui8nfoI",
  authDomain: "slack-c9db4.firebaseapp.com",
  databaseURL: "https://slack-c9db4-default-rtdb.firebaseio.com",
  projectId: "slack-c9db4",
  storageBucket: "slack-c9db4.appspot.com",
  messagingSenderId: "543498629939",
  appId: "1:543498629939:web:1693e19d1ad01838c54446",
  measurementId: "771702120128",
};

firebase.initializeApp(firebaseConfig);

firebase.analytics();

export default firebase;
