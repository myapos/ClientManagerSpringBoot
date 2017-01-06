import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
/*import App from './containers/App';*/
import App from './containers/App';
import './index.css';
import when from 'when';

import stompClient from './websocket-listener';
/*import { syncHistoryWithStore, routerReducer } from 'react-router-redux';*/
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
const root = 'http://localhost:8181/api/students';
const pageSize = 1;

const init = () => {
	
fetch(root, { 
   method: 'get', 
   mode: 'cors',
   cache: 'default',
   headers: {
     'Authorization': 'Basic '+btoa('myapos:Apostolakis1981'), 
     'Content-Type': 'application/json'//,
	  //"Content-Length": content.length.toString(),
	  //"X-Custom-Header": "ProcessThisImmediately"
   }
 }).then (res => res.json())
   .then(res => {
   	//debugger;
   	console.log("data from server: ",res);
   	let saved_data= res._embedded;

  const placeholder = document.getElementById('react');

  const initialState = {
    saved_data: saved_data
	};

/*  const store = configureStore(initialState); */     
  // Create an enhanced history that syncs navigation events with the store
  //const history = syncHistoryWithStore(browserHistory, store);      
	ReactDOM.render(
		<Provider store={configureStore(initialState)}>
		  <App />
		</Provider>,
	placeholder)}

	)};


init();

