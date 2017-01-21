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
import GetAllStudents from '../components/GetAllStudents';
import StudentClassDashboard from '../components/StudentClassDashboard';
import Container from './Container';
import NotFound from '../components/NotFound';


class App extends Component {
 
 constructor (props) {
    super(props);

    this.state = {
      ...props,
    }
  }
  componentWillMount() {
    // const script = document.createElement("script");

    // script.src = '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.js';
    // script.async = true;

    // document.head.appendChild(script);

    // var link  = document.createElement('link');
    // link.rel  = 'stylesheet';
    // link.type = 'text/css';
    // link.href = '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
    // document.head.appendChild(link);


  }

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
          <Route path='/getallstudents' component={GetAllStudents} />
          <Route path='/studentclassdashboard' component={StudentClassDashboard} />
          <Route path='*' component={NotFound} />
        </Route>
      </Router>
    )
  }
}


export default connect(state => state, actions)(App);