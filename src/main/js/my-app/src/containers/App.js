import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import Dashboard from '../components/Dashboard';
import AddUser from '../components/AddUser';
import DeleteUser from '../components/DeleteUser';
import ExportUsers from '../components/ExportUsers';
import ImportUsers from '../components/ImportUsers';
import UpdateUsers from '../components/UpdateUsers';
import GetAllUsers from '../components/GetAllUsers';
import Container from './Container';
import NotFound from '../components/NotFound';

class App extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Container}>
          <IndexRoute component={Dashboard} />
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