import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './containers/App';
import './index.css';
import * as utils from './utils';

const init = async () => {
  const placeholder = document.getElementById('react');

  const initialState = {
    initRegistrations: [[]],
    initDataStudentClasses: [[]],
    initDataStudents: [],
    // initDataAllStudents_: [],
    initPayments: [],
    displayInitialMsg: true,
    seconds: 0,
    timer: null,
    setNonTerminalClasses: false,
    filteredStudentClassesWithLinks: [[]],
    lname: '',
    activePage: 0,
    searchingStatus: false,
  };

  ReactDOM.render(<Provider
    store={configureStore(initialState)}>
    <App />
  </Provider>, placeholder);
};

init();
