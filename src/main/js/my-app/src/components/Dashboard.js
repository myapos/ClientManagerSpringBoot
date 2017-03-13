import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import { Link } from 'react-router';

/*import AddUser from './AddUser';
import DeleteUser from './DeleteUser';
import ExportUsers from './ExportUsers';
import ImportUsers from './ImportUsers';
import UpdateUsers from './UpdateUsers'*/;
import GetAllStudents from './GetAllStudents';
import StudentClassDashboard from './StudentClassDashboard';
import PaymentRegisters from './PaymentRegisters';
import Registers from './Registers';
import SendEmailsManually from './SendEmailsManually';
import { browserHistory } from 'react-router';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';
import '../css/App.css';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

const styles = {
    tabs: {

        marginRight: '30px',
        verticalAlign: 'top'
    },
    links: {
        margin: 0,
        padding: 0
    },
    tabLink: {
        height: '30px',
        lineHeight: '30px',
        cursor: 'pointer',
        borderBottom: '2px solid transparent'
    },
    activeLinkStyle: {
        borderBottom: '2px solid #333'
    },
    visibleTabStyle: {

    }
};

class Dashboard extends Component {

  render () {
    return (
      <div className="App" id="content">
          <h2>Καλωσήρθατε στην διαχείριση πελατών του Ferrum Gym </h2>
        <div className="labelContainer">
          <legend><span>Πίνακας Ελέγχου</span></legend>
        </div>
 
            <Tabs
            name="selectedTab"
            handleSelect={this.props.changeSelectedTab}
            selectedTab={this.props.selectedTab}
            activeLinkStyle={styles.activeLinkStyle}
            visibleTabStyle={styles.visibleTabStyle}
            style={styles.tabs}
            id="tabs"
            >

            <div style={styles.links}>
                <TabLink to="tab1" style={styles.tabLink}>Διαχείριση Πελατών</TabLink>
                <TabLink to="tab2" default style={styles.tabLink}>Διαχείριση Τμημάτων</TabLink>
                <TabLink to="tab3" style={styles.tabLink}>Διαχείριση Πληρωμών</TabLink>
                <TabLink to="tab4" style={styles.tabLink}>Διαχείριση Εγγραφών</TabLink>
                <TabLink to="tab5" style={styles.tabLink}>Επικοινωνία Τμημάτων</TabLink>
            </div>
            <div style={styles.content}>
                <TabContent for="tab1">
                    <div><GetAllStudents 
                    activeGetAllStudents = {true}
                    activeStudentClassDashboard = {false}
                    activePaymentRegisters = {false}
                    activeRegisters = {false}
                    activeSendEmailsManually = {false}
                    /></div>
                </TabContent>
                <TabContent for="tab2">
                    <div><StudentClassDashboard 
                    activeGetAllStudents = {false} 
                    activeStudentClassDashboard = {true}
                    activePaymentRegisters = {false}
                    activeRegisters = {false}
                    activeSendEmailsManually = {false}
                    /></div>
                </TabContent>
                <TabContent for="tab3">
                    <div><PaymentRegisters
                    activeGetAllStudents = {false} 
                    activeStudentClassDashboard = {false}
                    activePaymentRegisters = {true}
                    activeRegisters = {false}
                    activeSendEmailsManually = {false}
                    /></div>
                </TabContent>
                <TabContent for="tab4">
                    <div><Registers 
                    activeGetAllStudents = {false} 
                    activeStudentClassDashboard = {false}
                    activePaymentRegisters = {false}
                    activeRegisters = {true}
                    activeSendEmailsManually = {false}
                    /></div>
                </TabContent>
                <TabContent  for="tab5">
                    <div><SendEmailsManually 
                    activeGetAllStudents = {false} 
                    activeStudentClassDashboard = {false}
                    activePaymentRegisters = {false}
                    activeRegisters = {false}
                    activeSendEmailsManually = {true}
                    /></div>
                </TabContent>
            </div>
        </Tabs>
      </div>

    );
  }
}

export default connect(state => state, actions)(Dashboard);
