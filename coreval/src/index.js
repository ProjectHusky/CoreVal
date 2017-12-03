import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import registerServiceWorker from './registerServiceWorker';

var config = {
  apiKey: "AIzaSyA8vhTFhNOOzpevUohNqCEiswCvadjXGBg",
  authDomain: "corevalhack-89a84.firebaseapp.com",
  databaseURL: "https://corevalhack-89a84.firebaseio.com",
  projectId: "corevalhack-89a84",
  storageBucket: "",
  messagingSenderId: "492980149757"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


