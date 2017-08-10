import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './containers/App';
import './index.css';

const init = () => {
  const placeholder = document.getElementById('react');

  const initialState = {
    initRegistrations: [[]],
    initDataStudentClasses: [[]],
    initDataStudents: [],
    initPayments: [],
    displayInitialMsg: true,
    seconds: 0,
    timer: null,
    setNonTerminalClasses: false,
    filteredStudentClassesWithLinks: [[]],
    lname: '',
    activePage: 0,
  };

  ReactDOM.render(<Provider
    store={configureStore(initialState)}>
    <App />
  </Provider>, placeholder);
};

init();
