import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './containers/App';
import './index.css';
import * as constants from './constants';
import * as api from './sagas.js';

const init = () => {
  console.log('constants:', constants);
  console.log('sagas:', api);
  const placeholder = document.getElementById('react');

  const initialState = {
    initRegistrations: [[]],
    initDataStudentClasses: [[]],
    initDataStudents: [],
  };

  ReactDOM.render(<Provider
    store={configureStore(initialState)}>
    <App />
  </Provider>, placeholder);
};

init();
