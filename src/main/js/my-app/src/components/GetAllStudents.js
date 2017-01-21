import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import { Link } from 'react-router';
import '../css/App.css';
import StudentDataTable from './StudentDataTable';

class GetAllStudents extends Component {

  render () {
    //debugger;
      return (
        <div className="App" id="content">
          {/*<h2>Καλωσήρθατε στην διαχείριση πελατών του Ferrum Gym </h2>*/}

          <div className="labelContainer">
            {/*<legend><span>Προβολή πελατολογίου</span><Link className="back" to="/"> Πίσω </Link></legend>*/}
            <StudentDataTable/>
          </div>
        </div>
      );

  }
}

export default connect(state => state, actions)(GetAllStudents);

