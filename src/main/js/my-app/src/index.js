import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
/*import App from './containers/App';*/
import App from './App';
import './index.css';
import when from 'when';
import client from './client';
import follow from './follow'; // function to hop multiple links by "rel"
import stompClient from './websocket-listener';

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
   	console.log("tttt",res);
   	let saved_data= res._embedded;

   	const placeholder = document.getElementById('react');

   	 const initialState = {
	            	// data: {sites, advertisers},
	            	// selected: all_selected_rows
	            	// 			//{id: 618, sites:[795,833]},
              //         //{id: 481, sites:[795,833]}
	            	// ,
                 saved_data: saved_data

	      };

	ReactDOM.render(
		<Provider store={configureStore(initialState)}>
		<App />
		</Provider>,
	placeholder)}

	)};


init();

