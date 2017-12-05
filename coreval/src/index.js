import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import registerServiceWorker from './registerServiceWorker';
import config from "./config";
firebase.initializeApp(config);
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


