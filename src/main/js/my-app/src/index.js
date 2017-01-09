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
const url3 = 'http://localhost:8181/api/registers/';
const url4 = 'http://localhost:8181/api/payeds/';

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
     'Content-Type': 'application/json'
   }
 })
.then (res => res.json());

const fetch2 = fetch(url2, { 
     method: 'get', 
     mode: 'cors',
     cache: 'default',
     headers: {
       'Authorization': 'Basic '+btoa('myapos:Apostolakis1981'), 
       'Content-Type': 'application/json'
     }
     })
     .then (res2 => res2.json());

const fetch3 = fetch(url3, { 
     method: 'get', 
     mode: 'cors',
     cache: 'default',
     headers: {
       'Authorization': 'Basic '+btoa('myapos:Apostolakis1981'), 
       'Content-Type': 'application/json'
     }
     })
     .then (res3 => res3.json());
 
const fetch4 = fetch(url4, { 
     method: 'get', 
     mode: 'cors',
     cache: 'default',
     headers: {
       'Authorization': 'Basic '+btoa('myapos:Apostolakis1981'), 
       'Content-Type': 'application/json'
     }
     })
     .then (res4 => res4.json())

Promise.all([fetch1, fetch2, fetch3, fetch4]).then(values => { 
  //debugger;
  console.log(values);  
  const placeholder = document.getElementById('react');

  const initialState = {
    saved_student:values[0]._embedded.students,
    saved_studentClasses:values[1]._embedded.studentClasses,
    saved_registers:values[2]._embedded.registers,
    saved_payeds:values[3]._embedded.payeds
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


