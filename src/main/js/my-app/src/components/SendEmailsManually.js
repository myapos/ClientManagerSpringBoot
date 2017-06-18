import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import DisplayClassesForSendingEmailManually from './DisplayClassesForSendingEmailManually';

class SendEmailsManually extends Component {

 render () {
   return (
     <div id="sendEmailTestsManually" > hey  </div>);
 }
}
export default connect(state => state, actions)(SendEmailsManually);
