import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import DisplayClassesForSendingEmailManually from './DisplayClassesForSendingEmailManually';

class SendEmailsManually extends Component {

  componentWillMount () {
    this.props.changeText('Please write your message');
  }

  handleChange (event) {
    console.log('changed textarea', event);
    this.props.changeText(event.target.value);
  }

  handleSubmit () {
    // get message
    const msg = document.getElementById('message').value;
    console.log('message to submit:', msg);
    // get selected class
    const selClass = document.getElementById('dataDisplayClassesForSendingEmailManually');
    const tableSelected = selClass.getElementsByClassName('react-bs-container-body');
    const selectElement = tableSelected[0].querySelectorAll('select')[0];

    if (selectElement !== null) {
      const selectedClass = selectElement.options[selectElement.selectedIndex].value;
      this.props.msgSubmitted(msg, selectedClass);
    } else {
      const selectedClass = tableSelected[0].querySelectorAll('tr')[0].childNodes[2].innerHTML;
      this.props.msgSubmitted(msg, selectedClass);
    }
    // call action
    console.log(tableSelected[0]);
  }

  clearText () {
    this.props.changeText('');
  }

  render () {
    // send emails to students who payed for classes .............
    // steps
    // display available classess
    const availableClasses = [];
    for (let i = 0; i < this.props.saved_studentClasses.length; i++) {
      availableClasses.push(this.props.saved_studentClasses[i].description);
    }
    // console.log("dataRegisters:",dataRegisters);

    if ((typeof this.props.selectedTab === 'undefined' || this.props.selectedTab === 'tab5')
      && availableClasses.length > 0) {
      return (
        <div id="sendEmailTestsManually" >
          <div><DisplayClassesForSendingEmailManually /></div>

          <div className="form-group">
            <label htmlFor="comment">Message:</label>
            <textarea
              onChange={this.handleChange.bind(this)}
              className="form-control"
              rows="10"
              cols="100"
              id="message"
              value={this.props.text} />
          </div>
          <button
            type="button"
            onClick={this.handleSubmit.bind(this)}
            className="btn btn-default">Αποστολή
          </button>
          <button
            type="button"
            onClick={this.clearText.bind(this)}
            className="btn btn-default">Καθαρισμός
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <div className="loader" />
        </div>
      );
    }
  }
}
export default connect(state => state, actions)(SendEmailsManually);
