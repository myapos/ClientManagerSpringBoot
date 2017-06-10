import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './containers/App';
import './index.css';

parent.BASE_URL = document.location.origin.match(/3000/) ? 'http://localhost:8181' : document.location.origin;
const url1 = `${parent.BASE_URL}/api/students`;
const url2 = `${parent.BASE_URL}/api/studentClasses/`;
const url3 = `${parent.BASE_URL}/api/registers/`;
const url4 = `${parent.BASE_URL}/api/payeds/`;
parent.request1 = {};
parent.rowDescription = {};
parent.students = {};
parent.studentClasses = {};
parent.registers = {};
parent.payeds = {};

const init = () => {
//   parent.students = {};
//   parent.studentClasses = {};
//   parent.registers = {};
//   parent.payeds = {};
//   // parent.loaded = 0;
//   parent.loadedStudents = 0;
//   fetch(url1, {
//     method: 'get',
//     mode: 'cors',
//     cache: 'default',
//     headers: {
//       'Authorization': `Basic ${btoa('myapos:Apostolakis1981')}`,
//       'Content-Type': 'application/json',
//     },
//   })
// .then(res2 => res2.json())
// .then(res3 => {
//   parent.students = res3._embedded.students;
//   // return classes;
//   // inner fetch 1
//   fetch(url2, {
//     method: 'get',
//     mode: 'cors',
//     cache: 'default',
//     headers: {
//       'Authorization': `Basic ${btoa('myapos:Apostolakis1981')}`,
//       'Content-Type': 'application/json',
//     },
//   })
//     .then(res4 => res4.json())
//     .then(res5 => {
//       parent.studentClasses = res5._embedded.studentClasses;
//       // inner fetch 2
//       fetch(url3, {
//         method: 'get',
//         mode: 'cors',
//         cache: 'default',
//         headers: {
//           'Authorization': `Basic ${btoa('myapos:Apostolakis1981')}`,
//           'Content-Type': 'application/json',
//         },
//       })
//     .then(res6 => res6.json())
//     .then(res7 => {
//       // debugger;
//       parent.registers = res7._embedded.registers;
//       // return registers;
//       // inner fetch 3
//       fetch(url4, {
//         method: 'get',
//         mode: 'cors',
//         cache: 'default',
//         headers: {
//           'Authorization': `Basic ${btoa('myapos:Apostolakis1981')}`,
//           'Content-Type': 'application/json',
//         },
//       })
//     .then(res8 => res8.json())
//     .then(res9 => {
//       parent.payeds = res9._embedded.payeds;
//       // return classes;
//       const placeholder = document.getElementById('react');
//       const initialState = {
//         saved_student: parent.students,
//         saved_studentClasses: parent.studentClasses,
//         saved_registers: parent.registers,
//         saved_payeds: parent.payeds,
//       };
//       ReactDOM.render(<Provider
//         store={configureStore(initialState)}>
//         <App />
//       </Provider>, placeholder);
//     });
//     });
//     });
// });
  const placeholder = document.getElementById('react');
  const initialState = {};
  ReactDOM.render(<Provider
    store={configureStore(initialState)}>
    <App />
  </Provider>, placeholder);
};

init();
