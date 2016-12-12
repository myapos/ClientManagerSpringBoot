import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actions from './actions/';
import Dashboard from './Dashboard';
import testReactRouter from './testReactRouter';
import Container from './Container';
import NotFound from './NotFound';

class App extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Container}>
          <IndexRoute component={Dashboard} />
          <Route path='/test' component={testReactRouter} />
          <Route path='*' component={NotFound} />
        </Route>
      </Router>
    )
  }
}


export default connect(state => state, actions)(App);