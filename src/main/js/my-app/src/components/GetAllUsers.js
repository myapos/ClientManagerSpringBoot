import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import { Link } from 'react-router';
import '../css/App.css';
import DataTable from './DataTable';

class GetAllUsers extends Component {

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
    console.log('saved_data:', this.props.saved_data);
    return (
      <div className="App" id="content">
        <h2>Καλωσήρθατε στην διαχείριση πελατών του Ferrum Gym </h2>
        <div className="labelContainer">
          <legend><span>Προβολή πελατολογίου</span><Link className="back" to="/"> Πίσω </Link></legend>
          <DataTable></DataTable>
        </div>
      </div>
    );
  }
}

export default connect(state => state, actions)(GetAllUsers);
