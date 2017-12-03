import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import registerServiceWorker from './registerServiceWorker';

  let config = {
    apiKey: "AIzaSyB9LZS3RpqkPnwTyfPfy8fcZuGHYmw8YNE",
    authDomain: "corevalhack.firebaseapp.com",
    databaseURL: "https://corevalhack.firebaseio.com",
    projectId: "corevalhack",
    storageBucket: "corevalhack.appspot.com",
    messagingSenderId: "140276705656"
  };
  firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

