import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import { Link } from 'react-router';
import '../css/App.css';
import {Table, Column, Cell} from 'fixed-data-table';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

let dataDisplayClassesForSendingEmailManually = [];

function onAfterInsertRow (row) {
  this.props.addPaymentRegisters(row);

}

// If you want to enable deleteRow, you must enable row selection also.
const selectRowProp = {
  mode: 'checkbox'
};


class DisplayClassesForSendingEmailManually extends Component {

componentWillUpdate(){

}

componentDidUpdate(){

}

beforeSavePaymentRegistersCell(row, cellName, cellValue) {
  // do your stuff
}

afterSavePaymentRegistersCell(row, cellName, cellValue) {
  // do your stuff...

}

render () {

    const cellEditProp = {
      mode: 'click',
      beforeSaveCell: this.beforeSavePaymentRegistersCell.bind(this),
      afterSaveCell: this.afterSavePaymentRegistersCell.bind(this)
    };

    const options = {
      afterInsertRow: onAfterInsertRow.bind(this),   // A hook for after insert rows
    };



    const availableClasses = [];
    for (let i=0;i<this.props.saved_studentClasses.length;i++){
        availableClasses.push(this.props.saved_studentClasses[i].description)
    }
    //check if data has loaded
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
