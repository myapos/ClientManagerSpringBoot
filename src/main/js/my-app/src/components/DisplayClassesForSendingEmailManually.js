import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import { Link } from 'react-router';
import '../css/App.css';
import {Table, Column, Cell} from 'fixed-data-table';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

let dataDisplayClassesForSendingEmailManually = [];

function afterSearch (searchText, result){
  console.log('Your search text is ' + searchText);
  console.log('Result is:');
  for (let i = 0; i < result.length; i++) {
    console.log('PaymentRegisters: ' + result[i].index + ', ' + result[i].fname + ', ' + result[i].lname
      +', '+result[i].phone +', ',result[i].dateOfBirth+ ', ' + result[i].email + ', ' + result[i].facebook);
  }
}

function onAfterInsertRow (row) {
  //debugger;
  console.log("insert data to database");
  debugger;
  this.props.addPaymentRegisters(row);

}

function onAfterDeleteRow (rowKeys) {

  //alert('The rowkey you drop: ' + rowKeys);
  // console.log("delete data from database");
  // this.props.deletePaymentRegisters(rowKeys);

}

// If you want to enable deleteRow, you must enable row selection also.
const selectRowProp = {
  mode: 'checkbox'
};


class DisplayClassesForSendingEmailManually extends Component {

componentWillUpdate(){

}

componentDidUpdate(){
  //debugger;
}

beforeSavePaymentRegistersCell(row, cellName, cellValue) {
  // do your stuff
}

afterSavePaymentRegistersCell(row, cellName, cellValue) {
  // do your stuff...
  //debugger;
}

render () {

    const cellEditProp = {
      mode: 'click',
      beforeSaveCell: this.beforeSavePaymentRegistersCell.bind(this),
      afterSaveCell: this.afterSavePaymentRegistersCell.bind(this)
    };

    const options = {
      afterSearch: afterSearch,           // define a after search hook
      afterInsertRow: onAfterInsertRow.bind(this),   // A hook for after insert rows
      afterDeleteRow: onAfterDeleteRow.bind(this)  // A hook for after droping rows.
    };

    // const paymentTypes = ["true", "false"];

    // const fnames = [];
    // const lnames = [];
    // //debugger;
    // for (let i=0;i<this.props.saved_student.length;i++){
    //     fnames.push(this.props.saved_student[i].fname);
    //     lnames.push(this.props.saved_student[i].lname);       
    // }
    //debugger;

    const availableClasses = [];
    for (let i=0;i<this.props.saved_studentClasses.length;i++){
        availableClasses.push(this.props.saved_studentClasses[i].description)
    }
    console.log("dataDisplayClassesForSendingEmailManually:",dataDisplayClassesForSendingEmailManually);
    //check if data has loaded
    //debugger;
    if(availableClasses.length>0){
      var dataDisplayClassesForSendingEmailManually = [{
            index: 1,
            classes: availableClasses,
            firstclass: availableClasses[0]
        }];
      }
    else{
        var dataDisplayClassesForSendingEmailManually = [{
            index: 1,
            classes: availableClasses,
            firstclass: "There are no classes saved yet!"
        }];
      } 
    
    return (
      <div id="dataDisplayClassesForSendingEmailManually">
        Please select class, write your message and press enter
        <BootstrapTable 
          cellEdit={cellEditProp} 
          data={dataDisplayClassesForSendingEmailManually} 
          hover={true} 
          selectRow={ selectRowProp }
          options={ options }
          >
          <TableHeaderColumn dataField="index" editable={ false } isKey={true} dataSort={true}>id</TableHeaderColumn>
          <TableHeaderColumn dataField="firstclass" editable={ { type: 'select', options: { values: availableClasses } } }>Select class</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default connect(state => state, actions)(DisplayClassesForSendingEmailManually);
