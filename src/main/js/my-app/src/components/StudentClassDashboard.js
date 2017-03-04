import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import { Link } from 'react-router';
// import logo from '../logo.svg';
/*import AddUser from './AddUser';
import DeleteUser from './DeleteUser';
import ExportUsers from './ExportUsers';
import ImportUsers from './ImportUsers';
import UpdateUsers from './UpdateUsers';
import GetAllStudents from './GetAllStudents';*/

import '../css/App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import $ from "jquery";
import StudentClassesDataTable from './studentClasses/StudentClassesDataTable';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';


class StudentClassDashboard extends Component {

    handleChange(event, myprops) {
        // do something with event.target.checked
        console.log("hey from handlechange ", event);
        if (event.data) {
            event.toggleState(event);
        }
        //console.log("changed state succesfully");
    };

  cancelFunction(){
    //console.log("hey form cancel function");
    //redirect to main dashboard page
    window.parent.location.href= "/";
   }
  render () {
    return (
      <div className="App" id="content">

          <div className="row">
                <div className="col-md-12">
                    <div id="custom-search-input">
                        <div className="input-group col-md-12">
                          <StudentClassesDataTable/>   
                        </div>
                    </div>
                </div>
          </div>
        </div>


    );
  }
}

export default connect(state => state, actions)(StudentClassDashboard);
