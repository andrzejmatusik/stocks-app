import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
    apiKey: "AIzaSyDt06SIuQX5ZhLrXQQ183maoqmHWwRQRNI",
    authDomain: "stocks-processing.firebaseapp.com",
    projectId: "stocks-processing",
    storageBucket: "stocks-processing.appspot.com",
    messagingSenderId: "809304784485",
    appId: "1:809304784485:web:4bd0ed4f76475e84a4108c"
};

firebase.initializeApp(firebaseConfig);

export default firebase;