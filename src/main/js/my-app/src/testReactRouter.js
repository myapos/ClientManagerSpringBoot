import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actions from './actions/';
import './App.css';

class testReactRouter extends Component {
  render() {
    return (
      <div> Hello from testReactRouter </div>
    )
  }
}



export default connect(state => state, actions)(testReactRouter);


