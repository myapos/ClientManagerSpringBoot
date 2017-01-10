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

parent.students = {};
parent.studentClasses = {};
parent.registers = {};
parent.payeds = {};


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
.then (res => res.json())
.then(res => { 
    console.log("students from server: ",res);
    //debugger;
    parent.students = res._embedded.students;
    //return classes;

  //inner fetch 1
  const fetch2 = fetch(url2, { 
     method: 'get', 
     mode: 'cors',
     cache: 'default',
     headers: {
       'Authorization': 'Basic '+btoa('myapos:Apostolakis1981'), 
       'Content-Type': 'application/json'
     }
     })
   .then (res => res.json())
   .then(res => { 
    console.log("studentClasses from server: ",res);
    //debugger;
    parent.studentClasses = res._embedded.studentClasses;
    //return classes;
      //inner fetch 2
      const fetch3 = fetch(url3, { 
       method: 'get', 
       mode: 'cors',
       cache: 'default',
       headers: {
         'Authorization': 'Basic '+btoa('myapos:Apostolakis1981'), 
         'Content-Type': 'application/json'
       }
       })
    .then (res => res.json())
    .then(res => { 
        console.log("registers from server: ",res);
        //debugger;
        parent.registers = res._embedded.registers;
        //return registerss;
          //inner fetch 3
          const fetch4 = fetch(url4, { 
           method: 'get', 
           mode: 'cors',
           cache: 'default',
           headers: {
             'Authorization': 'Basic '+btoa('myapos:Apostolakis1981'), 
             'Content-Type': 'application/json'
           }
           })  
          .then (res => res.json())
          .then(res => { 
              console.log("payeds from server: ",res);
              //debugger;
              parent.payeds = res._embedded.payeds;
              //return classes;
                 const placeholder = document.getElementById('react');
                 //debugger;
                  // const initialState = {
                  //   saved_student:parent.students,
                  //   saved_studentClasses:parent.studentClasses,
                  //   saved_registers:parent.registers,
                  //   saved_payeds:parent.payeds
                  // };
                  
                  const initialState = {
                    saved_student:parent.students,
                    saved_studentClasses:parent.studentClasses,
                    saved_registers:parent.registers,
                    saved_payeds:parent.payeds
                  };

                      ReactDOM.render(
                        <Provider store={configureStore(initialState)}>
                          <App />
                        </Provider>,
                      placeholder)

            });

      });
  });

});

// var original = Promise.resolve(true);
// var cast = Promise.resolve(original);
// cast.then(function(v) {
//   console.log(v); // true
// });


// Create the XHR object.
// function createCORSRequest(method, url){
//     var xhr = new XMLHttpRequest();


//     if ("withCredentials" in xhr){
//         xhr.open(method, url, true);
//         xhr.setRequestHeader("Authorization", 'Basic '+btoa('myapos:Apostolakis1981'));
//         xhr.contentType = "application/json";
//     } else if (typeof XDomainRequest != "undefined"){
//         xhr = new XDomainRequest();
//         xhr.open(method, url);
//         //xhr.setRequestHeader("Authorization", 'Basic '+btoa('myapos:Apostolakis1981'));
//     } else {
//         xhr = null;
//     }
//     return xhr;
// };

// var request = createCORSRequest("get", url1);
// //request.withCredentials = true;
// if (request){
//     request.onload = function(){
//         //do something with request.responseText
//         console.log("response for students:",JSON.parse(request.responseText));
//         parent.students = JSON.parse(request.responseText);


//         var request2 = createCORSRequest("get", url2);
//         if (request2){
//           request2.onload = function(){
//             debugger;
//             parent.classes = JSON.parse(request2.responseText);
//           }
//         }
//         request2.send();


//         //debugger;
//     };
//     request.send();
// }

//console.log("students object from XMLHttpRequest", students);

// cast.then(function(v) {
//   console.log(v); // true
// });

// Promise.all([fetch1, fetch2, fetch3, fetch4]).then(values => { 
//   //debugger;
//   console.log(values);  


//   const initialState = {
//     saved_student:values[0]._embedded.students,
//     saved_studentClasses:values[1]._embedded.studentClasses,
//     saved_registers:values[2]._embedded.registers,
//     saved_payeds:values[3]._embedded.payeds
//   };

//    const store = configureStore(initialState);    
//     // Create an enhanced history that syncs navigation events with the store
//     //const history = syncHistoryWithStore(browserHistory, store);      

//})


  };


init();
//debugger;


