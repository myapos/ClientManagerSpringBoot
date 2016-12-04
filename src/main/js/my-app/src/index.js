import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import when from 'when';
import client from './client';
import follow from './follow'; // function to hop multiple links by "rel"
import stompClient from './websocket-listener';

const root = 'http://localhost:8181/api/employees';
const pageSize = 1;

const init = () => {
	
fetch(root, { 
   method: 'get', 
   mode: 'cors',
   cache: 'default',
   headers: {
     'Authorization': 'Basic '+btoa('greg:turnquist'), 
     'Content-Type': 'application/json'//,
	  //"Content-Length": content.length.toString(),
	  //"X-Custom-Header": "ProcessThisImmediately"
   }
 }).then (res => res.json())
   .then(res => {
   	debugger;
   	console.log("tttt",res);
   	return res;
   });

  const placeholder = document.getElementById('react');
 
  ReactDOM.render(
	  <App />,
	  placeholder
	)
};


init();

