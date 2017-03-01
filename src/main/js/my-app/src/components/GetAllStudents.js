import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import { Link } from 'react-router';
import '../css/App.css';
import StudentDataTable from './StudentDataTable';

class GetAllStudents extends Component {

  render () {

      return (
        <div className="App" id="content">


          <div className="labelContainer">
            <StudentDataTable/>
          </div>
        </div>
      );

  }
}

export default connect(state => state, actions)(GetAllStudents);

