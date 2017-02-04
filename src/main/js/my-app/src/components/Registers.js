import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import { Link } from 'react-router';
// import logo from '../logo.svg';
import '../css/App.css';
import '../css/App.css';
import {Table, Column, Cell} from 'fixed-data-table';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const dataRegisters = [];

function afterSearch (searchText, result){
  // console.log('Your search text is ' + searchText);
  // console.log('Result is:');
  // for (let i = 0; i < result.length; i++) {
  //   console.log('Registers: ' + result[i].index + ', ' + result[i].fname + ', ' + result[i].lname
  //     +', '+result[i].phone +', ',result[i].dateOfBirth+ ', ' + result[i].email + ', ' + result[i].facebook);
  // }
}

function onAfterInsertRow (row) {
  // let newRowStr = '';
  // let payment = document.getElementById("mySelectPaymentRegisters").value;
  // let classReg = document.getElementById("mySelectClassesPaymentRegisters").value;

  // row.payment = payment;
  // row.class = classReg;
  // for (const prop in row) {
  //   //debugger;
  //   newRowStr += prop + ': ' + row[prop] + ' \n';
  // }
  // //debugger;
  // alert('The new row is:\n ' + newRowStr);
  // console.log("insert data to database");
  // debugger;
  // this.props.addPaymentRegisters(row);

}

function onAfterDeleteRow (rowKeys) {

  // alert('The rowkey you drop: ' + rowKeys);
  // console.log("delete data from database");
  // this.props.deletePaymentRegisters(rowKeys);

}

// If you want to enable deleteRow, you must enable row selection also.
const selectRowProp = {
  mode: 'checkbox'
};


class Registers extends Component {

componentDidMount(){

}

componentDidUpdate(){

  let el = document.getElementById("dotsPaymentRegisters");
  if (el !== null) {
    // do stuff
    console.log(el);
    setInterval(function () {el.innerHTML = el.innerHTML + ".";  }, 75);
  }

  const registers = this.props.saved_registers;

  debugger;

  for(let jj=0; jj<registers.length;jj++){
  	//synchronous calls.......... 
    //get data of registered students

      let url = registers[jj]._links.student.href;
      //debugger;
      //Get id for register
      let ar = url.split("/");
      let s = ar.length;
      let id = ar[s - 2];
      let request1 = new XMLHttpRequest();
      request1.open('GET', url, false);  // `false` makes the request synchronous
      request1.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
      request1.setRequestHeader("Content-type", "application/json");
      request1.contentType = "application/json"
      request1.send(null);

      if (request1.status === 200) {
        //debugger;
        console.log(JSON.parse(request1.responseText));
    }


  }
}

afterSaveRegistersCell(row, cellName, cellValue) {

}

beforeSaveRegistersCell(row, cellName, cellValue) {

  // do your stuff...
  //call action for update
  //this.props.updateClass(row, cellValue);

  // let x = document.getElementById("PaymentRegisters");
  // let el = x.getElementsByClassName('form-group');

  
  //this.props.updatePaymentRegisters(row, cellValue,descBefore);
  //debugger;

}


render () {


 const cellEditProp = {
      mode: 'click',
      beforeSaveCell: this.beforeSaveRegistersCell.bind(this),
      afterSaveCell: this.afterSaveRegistersCell.bind(this)
    };

    const options = {
      afterSearch: afterSearch,           // define a after search hook
      afterInsertRow: onAfterInsertRow,   // A hook for after insert rows
      afterDeleteRow: onAfterDeleteRow  // A hook for after droping rows.
    };

    const paymentTypes = ["true", "false"];
    //debugger;

    const availableClasses = [];
    for (let i=0;i<this.props.saved_studentClasses.length;i++){
        availableClasses.push(this.props.saved_studentClasses[i].description)
    }
    console.log("dataRegisters:");

    //debugger;
    return (
      <div id="registers">
      </div>
     )

    // return (
    //   <div>
    //         <p className="loadingText"> Please wait while getting data from database <span id="dotRegisters"></span> </p>
    //   </div>
    // )
    
  }
}

export default connect(state => state, actions)(Registers);