import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    //apiKey: process.env.REACT_APP_APIKEY || 'AIzaSyB12C1F8sQJvtlPqftL7eGervnn2E83ZT4',
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: "dictionaries-auth.firebaseapp.com",
    databaseURL: "https://dictionaries-auth.firebaseio.com",
    projectId: "dictionaries-auth",
    storageBucket: "dictionaries-auth.appspot.com",
    messagingSenderId: "1054448498311",
    appId: "1:1054448498311:web:7a98c6e356c75a00"
};

firebase.initializeApp(config);
firebase.firestore();

export default firebase