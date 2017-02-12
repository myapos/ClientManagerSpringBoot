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
    
  handleChange(event) {
    //debugger;
    //this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    //alert('A message was submitted');
    //get message
    //debugger;
    let msg = document.getElementById("message").value;
    console.log("message to submit:",msg);
    //get selected class
    let selClass = document.getElementById("dataDisplayClassesForSendingEmailManually");
    let tableSelected = selClass.getElementsByClassName("react-bs-container-body");
    let selectElement = tableSelected[0].querySelectorAll("select")[0];
    if(selectElement != null){
       let selectedClass = selectElement.options[selectElement.selectedIndex].value;
       this.props.msgSubmitted(msg, selectedClass);
    }
    else {
    
    let selectedClass = tableSelected[0].querySelectorAll("tr")[0].childNodes[2].innerHTML;
    this.props.msgSubmitted(msg, selectedClass);
    }

    // event.preventDefault();
    //call action
    console.log(tableSelected[0]);
  }
  
  // handleClick() {
  //   alert('Button clicked');
  // }

  render () {
    //debugger;
    
    //send emails to students who payed for classes .............

    //steps

    // display available classess

   


        return (
                <div id="sendEmailTestsManually" >
                    <div><DisplayClassesForSendingEmailManually/></div>

                    <div className="form-group">
                      <label htmlFor="comment">Message:</label>
                      <textarea onChange={this.handleChange} 
                      className="form-control" rows="10" cols="100" id="message">Please write your message</textarea>
                    </div>
                   <button type="button" onClick={this.handleSubmit.bind(this)} className="btn btn-default">Submit</button>
                </div>
        );
      }
}
export default connect(state => state, actions)(SendEmailsManually);
