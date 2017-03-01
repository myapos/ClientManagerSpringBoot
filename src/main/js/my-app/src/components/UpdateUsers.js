import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/';;
import { Link } from 'react-router';

import '../css/App.css';

class UpdateUsers extends Component {

    handleChange(event, myprops) {
        // do something with event.target.checked
        //console.log("hey from handlechange ", event);
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
        <h2>Καλωσήρθατε στην διαχείριση πελατών του Ferrum Gym </h2>
          <div className="labelContainer">

          <legend><span>Ενημέρωση πελάτη - Συμπληρώστε τη φόρμα αναζήτησης </span><Link className="back" to="/"> Πίσω </Link></legend>
          <div className="row">
                <div className="col-md-6">
                    <div id="custom-search-input">
                        <div className="input-group col-md-12">
                            <input type="text" className="deleteform form-control" placeholder="Aναζήτηση χρήστη" />
                            <span className="input-group-btn">
                                <button className="btn btn-info" type="button">
                                    <i className="search glyphicon glyphicon-search"></i>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
          </div>
        </div>
      </div>

    );
  }
}

export default connect(state => state, actions)(UpdateUsers);
