import firebase from "firebase/compat/app";
//import {initializeApp} from "firebase/app";
import 'firebase/compat/auth';
import 'firebase/compat/database';

const config = {
    apiKey: "AIzaSyB2BD1quNVTZpBWFiAyTGBOv53LpQ8iLLA",
    authDomain: "chat-dbf56.firebaseapp.com",
    projectId: "chat-dbf56",
    storageBucket: "chat-dbf56.appspot.com",
    messagingSenderId: "135983132398",
    appId: "1:135983132398:web:3535dfd7787a882724cdff"
};

const firebaseApp = firebase.initializeApp(config);
export const auth = firebaseApp.auth();
export const db = firebaseApp.database();
