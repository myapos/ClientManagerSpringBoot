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

import Signature from './Signature';


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

defaultTab(tab){
    //debugger;
    //get last active tab from local storage
    //debugger;
    // Store
    let lastActiveTab = parseInt(localStorage.getItem("lastTabLoaded"));
    //extract last digit of tab
    let lastNum = parseInt(tab[tab.length-1]);
    //debugger;
    if (lastActiveTab === lastNum -1){
      return true;
    }
    else return false
};
render () {

window.onbeforeunload = () => {
    let el = document.getElementById('tabLinks');
    let nodeList = el.childNodes;
    let nodes = Array.from(nodeList); //convert to array from nodelist
    let positions = nodes.map( (item, key) => {
        
    if (item.className.includes('active')){
        return key;

    } else return -1;
    });

    console.log('positions:', positions); 
    const pos = positions.find((item) => {
      return item !== -1;
    });  
    //debugger;
    // Store
    localStorage.setItem("lastTabLoaded", pos);
    // return "Any string value here forces a dialog box to \n" + 
    //        "appear before closing the window.";
}
    // window.onload = function(e) {

    // //find position 

    // let el = document.getElementById('tabLinks');
    // let nodes = el.childNodes;
    // let positions = nodes.map( (item, key) => {
        
    // if (item.clasName.includes('active')){
    //     return key;
    // } else return 0;
    // });

    // debugger; 
    // console.log('positions:', positions); 
    // positions.reduce((total, num) =>{
    //     debugger;
    // })    


    // // var dialogText = 'Dialog text here';
    // // e.returnValue = dialogText;
    // // return dialogText; 
    // };

    return (
      <div className="App" id="content">
        <Signature/>
        <h2>Καλωσήρθατε στην διαχείριση πελατών ClientManager</h2>
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

                <div id='tabLinks' style={styles.links}>
                    <TabLink to="tab1" default={this.defaultTab('tab1')} style={styles.tabLink}>Διαχείριση Πελατών</TabLink>
                    <TabLink to="tab2" default={this.defaultTab('tab2')} style={styles.tabLink}>Διαχείριση Πληρωμών</TabLink>
                    <TabLink to="tab3" default={this.defaultTab('tab3')} style={styles.tabLink}>Διαχείριση Εγγραφών</TabLink>
                    <TabLink to="tab4" default={this.defaultTab('tab4')} style={styles.tabLink}>Διαχείριση Τμημάτων</TabLink>
                    <TabLink to="tab5" default={this.defaultTab('tab5')} style={styles.tabLink}>Επικοινωνία Τμημάτων</TabLink>
                </div>
                <div id='tabContent' style={styles.content}>
                    <TabContent for="tab1">
                        <div id = "tab1"><GetAllStudents/></div>
                    </TabContent>
                    <TabContent for="tab2">
                        <div id = "tab2"><PaymentRegisters/></div>
                    </TabContent>
                    <TabContent for="tab3">
                        <div id = "tab3"><Registers/></div>
                    </TabContent>
                    <TabContent for="tab4">
                        <div id = "tab4"><StudentClassDashboard/></div>
                    </TabContent>
                    <TabContent  for="tab5">
                        <div id = "tab5"><SendEmailsManually/></div>
                    </TabContent>
                </div>
            </Tabs>
            
      </div>

    );
  }
}

export default connect(state => state, actions)(Dashboard);
