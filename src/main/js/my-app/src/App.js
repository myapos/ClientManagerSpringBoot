import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actions from './actions/';
import Dashboard from './Dashboard';
import testReactRouter from './testReactRouter';
import AddUser from './AddUser';
import DeleteUser from './DeleteUser';
import ExportUsers from './ExportUsers';
import ImportUsers from './ImportUsers';
import UpdateUsers from './UpdateUsers';
import GetAllUsers from './GetAllUsers';
import Container from './Container';
import NotFound from './NotFound';

class App extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Container}>
          <IndexRoute component={Dashboard} />
          <Route path='/test' component={testReactRouter} />
          <Route path='/adduser' component={AddUser} />
          <Route path='/deleteuser' component={DeleteUser} />
          <Route path='/exportusers' component={ExportUsers} />
          <Route path='/importusers' component={ImportUsers} />
          <Route path='/updateusers' component={UpdateUsers} />
          <Route path='/getallusers' component={GetAllUsers} />
          <Route path='*' component={NotFound} />
        </Route>
      </Router>
    )
  }
}


export default connect(state => state, actions)(App);