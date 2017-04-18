import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import Dashboard from '../components/Dashboard';
/*import AddUser from '../components/AddUser';
import DeleteUser from '../components/DeleteUser';
import ExportUsers from '../components/ExportUsers';
import ImportUsers from '../components/ImportUsers';
import UpdateUsers from '../components/UpdateUsers';*/
import GetAllStudents from '../components/GetAllStudents';
import StudentClassDashboard from '../components/StudentClassDashboard';
import Container from './Container';
import NotFound from '../components/NotFound';
import '../../../../../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../../../../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../../../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../css/App.css';

// fixes warning with change of routes in every render --> you cannot change router routes it will be ignored
// https://github.com/reactjs/react-router-redux/issues/179
const routes = (
  <Route path="/" component={Container}>
    <IndexRoute component={Dashboard} />
    <Route path="/studentclassdashboard" component={StudentClassDashboard} />
    <Route path="*" component={NotFound} />
  </Route>
);

class App extends Component {
 
constructor (props) {
    super(props);

    this.state = {
      ...props
    }
  }
  componentWillMount() {

  }

  render() {

    return (
      <Router history={hashHistory}>
        {routes}
      </Router>
    )
  }
}


export default connect(state => state, actions)(App);