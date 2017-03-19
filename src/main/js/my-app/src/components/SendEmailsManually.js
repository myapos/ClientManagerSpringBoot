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

var msg = "Please write your message";

class SendEmailsManually extends Component {
  
  componentWillMount(){
    this.props.changeText("Please write your message");
  }

  handleChange(event) {
    console.log("changed textarea",event);
    this.props.changeText(event.target.value);
  }

  handleSubmit(event) {

    //get message

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

    //call action
    console.log(tableSelected[0]);
  }
  


  render () {
    
    //send emails to students who payed for classes .............

    //steps

    // display available classess
    const availableClasses = [];
    for (let i=0;i<this.props.saved_studentClasses.length;i++){
        availableClasses.push(this.props.saved_studentClasses[i].description)
    }
    //console.log("dataRegisters:",dataRegisters);

    if((typeof this.props.selectedTab === 'undefined' || this.props.selectedTab == "tab5") &&availableClasses.length>0){
        return (
                <div id="sendEmailTestsManually" >
                    <div><DisplayClassesForSendingEmailManually/></div>

                    <div className="form-group">
                      <label htmlFor="comment">Message:</label>
                      <textarea onChange={this.handleChange.bind(this)} 
                      className="form-control" rows="10" cols="100" id="message" value={this.props.text}/>
                    </div>
                   <button type="button" onClick={this.handleSubmit.bind(this)} className="btn btn-default">Submit</button>
                </div>
        );
      }
      else{
          return (
            <div>
                {/*<p id="loadingTextStudents" className="loadingText"> Please wait while getting data from database <span id="dotsStudents"></span> </p>*/}
                <div className="loader"></div>
            </div>
          )
        }
    }
}
export default connect(state => state, actions)(SendEmailsManually);
