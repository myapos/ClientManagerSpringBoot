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
const url1 = 'http://localhost:8181/api/students';
const url2 = 'http://localhost:8181/api/studentClasses/';
const pageSize = 1;
var that = this;
var save={};
const init = () => {
	
const fetch1 = 
fetch(url1, { 
   method: 'get', 
   mode: 'cors',
   cache: 'default',
   headers: {
     'Authorization': 'Basic '+btoa('myapos:Apostolakis1981'), 
     'Content-Type': 'application/json'//,
   //"Content-Length": content.length.toString(),
   //"X-Custom-Header": "ProcessThisImmediately"
   }
 })
.then (res => res.json())

const fetch2 = fetch(url2, { 
     method: 'get', 
     mode: 'cors',
     cache: 'default',
     headers: {
       'Authorization': 'Basic '+btoa('myapos:Apostolakis1981'), 
       'Content-Type': 'application/json'//,
      //"Content-Length": content.length.toString(),
      //"X-Custom-Header": "ProcessThisImmediately"
     }
     })
     .then (res2 => res2.json())
    //   .then(res2 =>{  
    //   console.log('Request succeeded with JSON response', res2);  
    //  });

Promise.all([fetch1, fetch2]).then(values => { 
  //debugger;
  console.log(values); // [3, 1337, "foo"] 
  const placeholder = document.getElementById('react');

  const initialState = {
    saved_student:values[0]._embedded.students,
    saved_studentClasses:values[1]._embedded.studentClasses
  };

   const store = configureStore(initialState);    
    // Create an enhanced history that syncs navigation events with the store
    //const history = syncHistoryWithStore(browserHistory, store);      
    ReactDOM.render(
      <Provider store={configureStore(initialState)}>
        <App />
      </Provider>,
    placeholder)
})


	};


init();
//debugger;


