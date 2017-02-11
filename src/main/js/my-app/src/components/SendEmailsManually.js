import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import { Link } from 'react-router';
import '../css/App.css';
import {Table, Column, Cell} from 'fixed-data-table';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as api from '../api';
import DisplayClassesForSendingEmailManually from './DisplayClassesForSendingEmailManually';

class SendEmailsManually extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
    //call action
  }
  
  handleClick() {
    alert('An essay was submitted');
  }

  render () {
    //debugger;
    
    //send emails to students who payed for classes .............

    //steps

    //1. display available classess

   
    //2. find students who have payed for the selected class

    //3. send email

        return (
                <div id="sendEmailTestsManually" >
                    <div><DisplayClassesForSendingEmailManually/></div>

                    <div className="form-group">
                      <label for="comment">Message:</label>
                      <textarea value={this.state.value} onChange={this.handleChange} 
                      className="form-control" rows="10" cols="100" id="message"></textarea>
                    </div>
                   <button type="button" onClick={this.handleSubmit} className="btn btn-default">Submit</button>
                </div>
        );
      }
}
export default connect(state => state, actions)(SendEmailsManually);
