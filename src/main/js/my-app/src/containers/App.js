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
//import ContentApp from '../components/ContentApp';
import '../../../../../../node_modules/react-loading-spinner/src/css/index.css';
import '../../../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../css/App.css';

class App extends Component {
 
constructor (props) {
    super(props);

    this.state = {
      ...props,
    }
  }
  componentWillMount() {

  }

  render() {

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


export default connect(state => state, actions)(App);