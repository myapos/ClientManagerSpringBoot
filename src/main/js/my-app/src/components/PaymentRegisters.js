import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import { Link } from 'react-router';

import '../css/App.css';
import {Table, Column, Cell} from 'fixed-data-table';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

//debugger;
let dataPaymentRegisters = [];
const waitForData = 7000; //msecs


function onAfterInsertRow (row) {
  //console.log("insert data to database");
  this.props.addPaymentRegisters(row);

}

function onAfterDeleteRow (rowKeys) {


  //console.log("delete data from database");
  this.props.deletePaymentRegisters(rowKeys);

}

// If you want to enable deleteRow, you must enable row selection also.
const selectRowProp = {
  mode: 'checkbox',
  columnWidth: '30px'
};


class PaymentRegisters extends Component {

componentWillMount(){
  //debugger;

  
  const students = this.props.saved_student;

  this.props.dataPaymentsRegisters(students);  

}

componentDidMount(){
  //debugger;
  //parent.loadedPaymReg = false;
  let x = document.getElementById("PaymentRegisters");
  
  if (x!= null) {
    let rows = x.querySelectorAll('tr');
    let el2 = x.getElementsByClassName('form-group');
    //set id for classes in modal window

    el2[1].childNodes[1].value = rows.length-1;

    
    //add date element in modal window
    el2[7].childNodes[1].type="date";
  }

  dataPaymentRegisters = []; //reset
  const data = this.props.saved_payeds;
 
  
}

beforeSavePaymentRegistersCell(row, cellName, cellValue) {

  // do your stuff...
  //call action for update
}

afterSavePaymentRegistersCell(row, cellName, cellValue) {
  // do your stuff...

  let x = document.getElementById("PaymentRegisters");
  let y = x.getElementsByClassName("react-bs-container-body");
  let updateMode = "";
 
  let el;
  let cellIndex;
  if (y[0].querySelector("select") != null){

    el = y[0].querySelector("select")[0];
    cellIndex  = el.parentElement.parentElement.cellIndex;
  }
  else if (y[0].getElementsByClassName("form-control editor edit-text")[0] != null){
    
    el = y[0].getElementsByClassName("form-control editor edit-text")[0];
    cellIndex = el.parentElement.cellIndex;
  }
  else if (y[0].getElementsByClassName("form-control editor edit-datetime")[0] != null){
    el = y[0].getElementsByClassName("form-control editor edit-datetime")[0];
    cellIndex = el.parentElement.cellIndex;
  }
  //console.log(el);


  if (cellIndex == 4){
    updateMode = "paymentUpdate";
  } 
  else if (cellIndex == 5){

    updateMode = "paymentNotesUpdate";
  } 
  else if (cellIndex == 6){

    updateMode = "classUpdate";

  } 
  else if (cellIndex == 7){

    updateMode = "updateDateOfPayment";

  } 
  
  let descBefore = el.getAttribute("value");
  this.props.updatePaymentRegisters(row,updateMode);

}

afterTabChanged() {
/*    this.refs.table1.forceUpdate();
    this.refs.table2.forceUpdate();*/
}

//anonymoys function to use in setInterval

anon(data, refreshIntervalId){

     if (typeof data == 'undefined' || data.length == 0 ){

      console.log("waiting for payments registers data");

     } else if (data.length > 0 ){
       clearInterval(refreshIntervalId);
       //rerender
       this.props.loadingHandling(1);
     }
};

render () {

    const cellEditProp = {
      mode: 'click',
      beforeSaveCell: this.beforeSavePaymentRegistersCell.bind(this),
      afterSaveCell: this.afterSavePaymentRegistersCell.bind(this)
    };

    const options = {
      afterInsertRow: onAfterInsertRow.bind(this),   // A hook for after insert rows
      afterDeleteRow: onAfterDeleteRow.bind(this)  // A hook for after droping rows.
    };

    
    //console.log("log paym registers:",this.props.dataPaymentsRegistersLoaded);
    //if(dataPaymentRegisters.length>0){
    let count = 0;

    let refreshIntervalId = setInterval( ()=> { 
        //debugger;
        this.anon(this.props.dataPaymentsRegistersLoaded, refreshIntervalId)

    } , waitForData);


    if((typeof this.props.selectedTab === 'undefined' || this.props.selectedTab == "tab1") 
        && typeof this.props.dataPaymentsRegistersLoaded !== 'undefined'
        && this.props.dataPaymentsRegistersLoaded.length > 0){
    //debugger;
    const paymentTypes = ["true", "false"];

    const fnames = [];
    const lnames = [];
    for (let i=0;i<this.props.saved_student.length;i++){
        fnames.push(this.props.saved_student[i].fname);
        lnames.push(this.props.saved_student[i].lname);       
    }


    const availableClasses = [];
    for (let i=0;i<this.props.saved_studentClasses.length;i++){
        availableClasses.push(this.props.saved_studentClasses[i].description)
    }

    //check if data has loaded
    // i can set hidden={true} in one cell in order to hide it. it can be useful if i don't
    //want increasing number to be displayd. For now it is not used
    //debugger;
    return (
      <div id="PaymentRegisters">
        <BootstrapTable
          cellEdit={cellEditProp} 
          data={this.props.dataPaymentsRegistersLoaded} 
          hover={true} 
          insertRow={true}
          deleteRow={true} 
          selectRow={selectRowProp}
          exportCSV={true}
          search={true}
          options={options}
          tableHeaderClass='payments-registers-header-class'
          tableBodyClass='payments-registers-body-class'
          condensed
          >
          <TableHeaderColumn dataField="index" editable={false} isKey={true} width='5%'>id</TableHeaderColumn>
          <TableHeaderColumn dataField="fname" editable={false}  width='20%' dataSort={true}>Name</TableHeaderColumn>
          <TableHeaderColumn dataField="lname" editable={false}  width='20%' dataSort={true}>Last Name</TableHeaderColumn>
          <TableHeaderColumn dataField="payment" editable={ { type: 'select', options: { values: paymentTypes } } }>Payment</TableHeaderColumn>
          <TableHeaderColumn  dataField="notes" >Notes</TableHeaderColumn>
          <TableHeaderColumn dataField="class" width='15%' editable={ { type: 'select', options: { values: availableClasses } } }>Class</TableHeaderColumn>
          <TableHeaderColumn 
            dataField="dateOfPayment" 
            dataAlign="left" 
            dataSort={false}
            editable={ { type: 'datetime' } }
            width='20%'
          >
            Date Of Payment
          </TableHeaderColumn>

        </BootstrapTable>
      </div>

    );
  }
    else{
      return (
        <div>
          <div className="loader"></div>
      </div>

      )
    }
  }
}

export default connect(state => state, actions)(PaymentRegisters);