import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import { Link } from 'react-router';
// import logo from '../logo.svg';
import AddUser from './AddUser';
import DeleteUser from './DeleteUser';
import ExportUsers from './ExportUsers';
import ImportUsers from './ImportUsers';
import UpdateUsers from './UpdateUsers';
import GetAllStudents from './GetAllStudents';
import StudentClassDashboard from './StudentClassDashboard';

import { browserHistory } from 'react-router';


import '../css/App.css';

class Dashboard extends Component {

    handleChange(event, myprops) {
        // do something with event.target.checked
        console.log("hey from handlechange ", event);
        if (event.data) {
            event.toggleState(event);
        }
        console.log("changed state succesfully");
    };

  cancelFunction(){
    console.log("hey form cancel function");
    //redirect to main dashboard page
    window.parent.location.href= "/";
   }

  render () {
    //console.log(this.props);
    //debugger;
    return (
      <div className="App" id="content">
          <h2>Καλωσήρθατε στην διαχείριση πελατών του Ferrum Gym </h2>
        <div className="labelContainer">
          <legend><span>Πίνακας Ελέγχου</span></legend>
        </div>
        <div className="rowContainer">
          <Link onClick={this.props.getAllStudents} className="buttonBoxes"  to="/getallstudents"> 
            Πελατολόγιο
          </Link>
          <Link onClick={this.props.addStudent} className="buttonBoxes"to="/adduser">
            Προσθήκη πελάτη
          </Link>
          <Link onClick={this.props.deleteStudent} className="buttonBoxes" to="/deleteuser">
            Διαγραφή πελάτη
          </Link>
          <Link onClick={this.props.updateStudent} className="buttonBoxes" to="/updateusers">
            Αναζήτηση - ενημέρωση πελάτη
          </Link>
          <Link onClick={this.props.importStudents} className="buttonBoxes" to="/importusers">
            Εισαγωγή πελατών
          </Link>
          <Link onClick={this.props.exportStudents} className="buttonBoxes" to="/exportusers">
            Εξαγωγή πελατών
          </Link>
          <Link onClick={this.props.studentClassDashboard} className="buttonBoxes" to="/studentclassdashboard">
            Διαχείριση τμημάτων
          </Link>
        </div>
      </div>

    );
  }
}

export default connect(state => state, actions)(Dashboard);
