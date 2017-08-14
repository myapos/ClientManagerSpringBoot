import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/';
import DisplayClassesForSendingEmailManually from './DisplayClassesForSendingEmailManually';
import Signature from './Signature';
import * as constants from '../constants';

class SendEmailsManually extends Component {
  static propTypes = {
    initRegistrations: PropTypes.array,
    initDataStudentClasses: PropTypes.array,
    initDataStudents: PropTypes.array,
    studentClassesWithLinks: PropTypes.array,
    deleteRegisters: PropTypes.func,
    createRegisters: PropTypes.func,
    deleteClass: PropTypes.func,
    saveNewClass: PropTypes.func,
    updateClass: PropTypes.func,
    text: PropTypes.string,
    msgSubmitted: PropTypes.func,
    changeText: PropTypes.func,
    displayInitialMsg: PropTypes.bool,
    displayInitialMessage: PropTypes.func,
  }

  setText = str => {
    this.props.displayInitialMessage(false);
    this.props.changeText(str);
  }
  handleChange (event) {
    // console.log('changed textarea', event);
    // set displayInitialMsg to false

    if (this.props.displayInitialMsg) {
      this.props.displayInitialMessage(false);
      this.setText('');
    } else {
      this.setText(event.target.value);
    }
  }

  handleSubmit (text) {

    console.log('Sending message:', text);

    // get selected class
    const selClass = document.getElementById('dataDisplayClassesForSendingEmailManually');
    const tableSelected = selClass.getElementsByClassName('react-bs-container-body');
    const selectElement = tableSelected[0].querySelectorAll('.availableClasses')[1];
    const selectedClass = selectElement.innerHTML;

    if (text && selectElement && selectedClass !== 'Please select class') {
      this.props.msgSubmitted(text, selectedClass);
    }
  }

  render () {
    const { initDataStudentClasses, text, studentClassesWithLinks, displayInitialMsg } = this.props;
    return (
      <div id="sendEmailTestsManually" >
        <div><DisplayClassesForSendingEmailManually
          initDataStudentClasses={initDataStudentClasses}
          studentClassesWithLinks={studentClassesWithLinks} />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Μύνημα:</label>
          <textarea
            onChange={this.handleChange.bind(this)}
            className="form-control"
            rows="10"
            cols="100"
            id="message"
            value={displayInitialMsg ? constants.giveMessage : text} />
        </div>
        <button
          type="button"
          onClick={() => this.handleSubmit(text)}
          className="btn btn-default">Αποστολή
        </button>
        <button
          type="button"
          onClick={() => this.setText('')}
          className="btn btn-default">Καθαρισμός
        </button>
        <div className="flex-wrap-container">
          <Signature />
        </div>
      </div>);
  }
}
export default connect(state => state, actions)(SendEmailsManually);
