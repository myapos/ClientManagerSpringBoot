import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

import App from './containers/App';
import './index.css';
import when from 'when';

import stompClient from './websocket-listener';

import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';


const url1 = 'http://localhost:8181/api/students';
const url2 = 'http://localhost:8181/api/studentClasses/';
const url3 = 'http://localhost:8181/api/registers/';
const url4 = 'http://localhost:8181/api/payeds/';

const pageSize = 1;
var that = this;
var save = {};
const init = () => {
    parent.students = {};
    parent.studentClasses = {};
    parent.registers = {};
    parent.payeds = {};
    //parent.loaded = 0;
    parent.loadedStudents = 0;
    //debugger;
    const fetch1 =
        fetch(url1, {
            method: 'get',
            mode: 'cors',
            cache: 'default',
            headers: {
                'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {


            parent.students = res._embedded.students;
            //return classes;

            //inner fetch 1
            const fetch2 = fetch(url2, {
                    method: 'get',
                    mode: 'cors',
                    cache: 'default',
                    headers: {
                        'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(res => {

                    parent.studentClasses = res._embedded.studentClasses;

                    //inner fetch 2
                    const fetch3 = fetch(url3, {
                            method: 'get',
                            mode: 'cors',
                            cache: 'default',
                            headers: {
                                'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(res => res.json())
                        .then(res => {
                            //debugger;
                            parent.registers = res._embedded.registers;
                            //return registers;
                            //inner fetch 3
                            const fetch4 = fetch(url4, {
                                    method: 'get',
                                    mode: 'cors',
                                    cache: 'default',
                                    headers: {
                                        'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                                        'Content-Type': 'application/json'
                                    }
                                })
                                .then(res => res.json())
                                .then(res => {

                                    parent.payeds = res._embedded.payeds;
                                    
                                    //return classes;
                                    const placeholder = document.getElementById('react');

                                    const initialState = {
                                        saved_student: parent.students,
                                        saved_studentClasses: parent.studentClasses,
                                        saved_registers: parent.registers,
                                        saved_payeds: parent.payeds,
                                    };

                                    ReactDOM.render(<Provider 
                                        store = {configureStore(initialState)}>
                                        <App/>
                                        </Provider>,
                                        placeholder)

                                });

                        });
                });

        });
};

const init2 = () => {

    const placeholder = document.getElementById('react');

    const initialState = {};

    ReactDOM.render(<Provider 
        store = {configureStore(initialState)}>
        <App/>
        </Provider>,
        placeholder)

}

//init2();
init();
