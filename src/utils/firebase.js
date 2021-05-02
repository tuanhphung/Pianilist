import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAbJXcY0bKhL_sL1y5VNGNxhVmR3Y3DSd4",
  authDomain: "pianosheetlist.firebaseapp.com",
  databaseURL: "https://pianosheetlist-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pianosheetlist",
  storageBucket: "pianosheetlist.appspot.com",
  messagingSenderId: "161866656855",
  appId: "1:161866656855:web:031dd2dd5a064fc2f3c712",
  measurementId: "G-91MGJEHS8D",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
