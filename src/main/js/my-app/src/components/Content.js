
import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import Dashboard from '../components/Dashboard';
import GetAllStudents from '../components/GetAllStudents';
import StudentClassDashboard from '../components/StudentClassDashboard';
import NotFound from '../components/NotFound';
import Container from '../containers/Container';
import '../css/App.css';

class Content extends Component {

  constructor() {
    super();
  }

  render() {
    if(!this.props.loadedContent) {
      return null;
    } else {
      return (
          <Router history={hashHistory}>
            <Route path='/' component={Container}>
              <IndexRoute component={Dashboard} />
              <Route path='/studentclassdashboard' component={StudentClassDashboard} />
              <Route path='*' component={NotFound} />
            </Route>
          </Router>
        )

    }
  }
}

export default connect(state => state, actions)(Content);
