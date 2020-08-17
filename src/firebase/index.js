import * as firebase from "firebase";
  
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCyYTsDV6au8xJRB954qpy9w3_uGnT1mZw",
    authDomain: "akruthi-crm.firebaseapp.com",
    databaseURL: "https://akruthi-crm.firebaseio.com",
    projectId: "akruthi-crm",
    storageBucket: "akruthi-crm.appspot.com",
    messagingSenderId: "70375767371",
    appId: "1:70375767371:web:a8aaaffe04968bb5d5fcce",
    measurementId: "G-X33XX678LS"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firebaseAuth = firebase.auth();

export default firebaseAuth;
