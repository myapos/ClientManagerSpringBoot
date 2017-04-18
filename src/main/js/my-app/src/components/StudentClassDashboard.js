import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import StudentClassesDataTable from './studentClasses/StudentClassesDataTable';

class StudentClassDashboard extends Component {
  handleChange (event) {
    // do something with event.target.checked
    console.log('hey from handlechange ', event);
    if (event.data) {
      event.toggleState(event);
    }
  }
  cancelFunction () {
    // redirect to main dashboard page
    window.parent.location.href = '/';
  }
  render () {
    return (
      <div className="App" id="content">
        <div className="row">
          <div className="col-md-12">
            <div id="custom-search-input">
              <div className="input-group col-md-12">
                <StudentClassesDataTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => state, actions)(StudentClassDashboard);
