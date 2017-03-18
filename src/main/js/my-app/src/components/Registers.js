import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import { Link } from 'react-router';

import '../css/App.css';
import '../css/App.css';
import {Table, Column, Cell} from 'fixed-data-table';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Spinner from 'react-spinner-children';
var flagRMount = false;

const dataRegisters = [];
parent.studentIndexWithRegistrations = [];

function afterSearch (searchText, result){

}

function onAfterInsertRow (row) {


}

function onAfterDeleteRow (rowKeys) {

  //console.log("delete data from database");

  this.props.deleteRegisters(rowKeys[0]);

}

// If you want to enable deleteRow, you must enable row selection also.
const selectRowProp = {
  mode: 'checkbox'
};


class Registers extends Component {

constructor(props) {
    super(props);
    this.state = {
      ...props
    }
}


componentWillMount(){
  //debugger;
  //parent.loadedReg = 0;
  //const data = this.props.saved_registers;
  const students = this.props.saved_student;
  this.props.dataRegisters(students);
}


componentDidMount(){
// debugger;
// console.log("log:", this.props.dataRegistersLoaded);

// if(typeof this.props.dataRegistersLoaded === 'undefined' || this.props.dataRegistersLoaded.length == 0){
//     const students = this.props.saved_student;
//     this.props.dataRegisters(students);
// }

}

componentDidUpdate(){

//debugger;
// console.log("log:", this.props.dataRegistersLoaded);

// if(typeof this.props.dataRegistersLoaded === 'undefined' || this.props.dataRegistersLoaded.length == 0){
//     const students = this.props.saved_student;
//     this.props.dataRegisters(students);
// }


}

afterSaveRegistersCell(row, cellName, cellValue) {



let studentHasRegistrations = false;
//get index of row

//check if row.index has a registration already. If it has then action is update. Otherwise action is update

for (let jj=0; jj<parent.studentIndexWithRegistrations.length; jj++){

  if (parent.studentIndexWithRegistrations[jj] == row.index) {

    studentHasRegistrations = true;

  }
}



if (!studentHasRegistrations) {
 
    if (row.dateOfRegistration !="No date of registration" && row.class == "No registered classes"){

      alert("Please give class input");

    } else if (row.dateOfRegistration =="No date of registration" && row.class != "No registered classes"){

      alert("Please give date of registration input");

    }  else{

      alert("create registers........");
      this.props.createRegisters(row);
    }
}

else {

      alert("Update registrations");
      this.props.updateRegisters(row);

}
  


}

beforeSaveRegistersCell(row, cellName, cellValue) {

}


render () {
parent.loadedReg = true;
    const isLoaded = false;
    const customSpinConfig = {
      lines: 10,
    };

 const cellEditProp = {
      mode: 'click',
      beforeSaveCell: this.beforeSaveRegistersCell.bind(this),
      afterSaveCell: this.afterSaveRegistersCell.bind(this)
    };

    const options = {
      afterSearch: afterSearch,           // define a after search hook
      afterInsertRow: onAfterInsertRow,   // A hook for after insert rows
      afterDeleteRow: onAfterDeleteRow.bind(this)  // A hook for after droping rows.
    };

    const paymentTypes = ["true", "false"];


    const availableClasses = [];
    for (let i=0;i<this.props.saved_studentClasses.length;i++){
        availableClasses.push(this.props.saved_studentClasses[i].description)
    }
    //console.log("dataRegisters:",dataRegisters);
    //debugger;
    console.log("log registers:",this.props.dataRegistersLoaded);
    // if(dataRegisters.length>0){
    //debugger;
    if((typeof this.props.selectedTab === 'undefined' || this.props.selectedTab == "tab4") 
        && typeof this.props.dataRegistersLoaded !== 'undefined'
        && this.props.dataRegistersLoaded.length > 0){
      //debugger;
      //this.props.loadingHandling(1);
	    return (
	      <div id="registers">
		      <BootstrapTable
	          cellEdit={cellEditProp} 
	          data={this.props.dataRegistersLoaded} 
	          hover={true} 
            deleteRow={true} 
	          selectRow={ selectRowProp }
	          exportCSV={true}
	          search={ true }
	          options={ options }
	          tableHeaderClass='payments-registers-header-class'
	          tableBodyClass='payments-registers-body-class'
	          >
	          <TableHeaderColumn dataField="index" editable={ false } isKey={true} dataSort={true}>id</TableHeaderColumn>
	          <TableHeaderColumn dataField="fname" editable={ false } dataSort={true} pagination>Name</TableHeaderColumn>
	          <TableHeaderColumn dataField="lname" editable={ false } >Last Name</TableHeaderColumn>
	          <TableHeaderColumn dataField="email" editable={ false } >E-mail</TableHeaderColumn>
	          <TableHeaderColumn dataField="class" editable={ { type: 'select', options: { values: availableClasses } } } >Class</TableHeaderColumn>
	          <TableHeaderColumn 
	            dataField="dateOfRegistration" 
	            dataAlign="left" 
	            dataSort={false}
	            editable={ { type: 'datetime' } }
	          > Date Of Registration
             </TableHeaderColumn>
	        </BootstrapTable>
	      </div>
      
	     )
	} 
  else{
    //this.props.loadingHandling(0);
	    return (
	      <div>
	          <div className="loader"></div>
	      </div>
	    )
    }
  }
}

export default connect(state => state, actions)(Registers);