import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import { Link } from 'react-router';
// import logo from '../logo.svg';
import AddUser from './AddUser';
import DeleteUser from './DeleteUser';
import ExportUsers from './ExportUsers';
import ImportUsers from './ImportUsers';
import UpdateUsers from './UpdateUsers';
import GetAllStudents from './GetAllStudents';
import StudentClassDashboard from './StudentClassDashboard';
import PaymentRegisters from './PaymentRegisters';
import { browserHistory } from 'react-router';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';
import '../css/App.css';
const styles = {
    tabs: {
        /*width: '400px',*/
        display: 'inline-block',
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
        padding: '0 15px',
        cursor: 'pointer',
        borderBottom: '2px solid transparent',
        display: 'inline-block'
    },
    activeLinkStyle: {
        borderBottom: '2px solid #333'
    },
    visibleTabStyle: {
        display: 'inline-block'
    },
    content: {
        padding: '0 15px'
    }
};

class Dashboard extends Component {

  render () {
    //console.log(this.props);
    //debugger;
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
            >

            <div style={styles.links}>
                <TabLink to="tab1" style={styles.tabLink}>Διαχείριση Πελατών</TabLink>
                <TabLink to="tab2" style={styles.tabLink}>Διαχείριση Τμημάτων</TabLink>
                <TabLink to="tab3" default style={styles.tabLink}>Διαχείριση Πληρωμών-Εγγραφών</TabLink>
            </div>
            <div style={styles.content}>
                <TabContent for="tab1">
                    {/*<h2>GetAllStudents</h2>*/}
                    <div><GetAllStudents/></div>
                </TabContent>
                <TabContent for="tab2">
                   {/*<h2>StudentClassDashboard</h2>*/}
                    <div><StudentClassDashboard/></div>
                </TabContent>
                <TabContent for="tab3">
                    <div><PaymentRegisters/></div>
                </TabContent>
            </div>
        </Tabs>
 
       
{/*        <div className="rowContainer">
          <Link onClick={this.props.getAllStudents} className="buttonBoxes"  to="/getallstudents"> 
            Διαχείριση Πελατών
          </Link>
          <Link onClick={this.props.studentClassDashboard} className="buttonBoxes" to="/studentclassdashboard">
            Διαχείριση Τμημάτων
          </Link>
        </div>*/}
      </div>

    );
  }
}

export default connect(state => state, actions)(Dashboard);
