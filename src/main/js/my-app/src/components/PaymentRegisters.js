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

// import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
// import './toggler.css';
// import Toggle from 'react-toggle';
// react select
// import Advertiser from './Advertiser';

const dataPaymentRegisters = [];

function afterSearch (searchText, result){
  console.log('Your search text is ' + searchText);
  console.log('Result is:');
  for (let i = 0; i < result.length; i++) {
    console.log('PaymentRegisters: ' + result[i].index + ', ' + result[i].fname + ', ' + result[i].lname
      +', '+result[i].phone +', ',result[i].dateOfBirth+ ', ' + result[i].email + ', ' + result[i].facebook);
  }
}

function onAfterInsertRow (row) {
  let newRowStr = '';
  let payment = document.getElementById("mySelectPaymentRegisters").value;
  let classReg = document.getElementById("mySelectClassesPaymentRegisters").value;

  row.payment = payment;
  row.class = classReg;
  for (const prop in row) {
    //debugger;
    newRowStr += prop + ': ' + row[prop] + ' \n';
  }
  //debugger;
  alert('The new row is:\n ' + newRowStr);
  console.log("insert data to database");
  debugger;
  this.props.addPaymentRegisters(row);

}

function onAfterDeleteRow (rowKeys) {

  alert('The rowkey you drop: ' + rowKeys);
  console.log("delete data from database");
  this.props.deletePaymentRegisters(rowKeys);

}

// If you want to enable deleteRow, you must enable row selection also.
const selectRowProp = {
  mode: 'checkbox'
};


class PaymentRegisters extends Component {

componentDidMount(){
  //const data = this.props.saved_payeds;
  //running dots functionality
  //debugger;
  let el = document.getElementById("dotsPaymentRegisters");
  if (el !== null) {
    // do stuff
    console.log(el);
    setInterval(function () {el.innerHTML = el.innerHTML + ".";  }, 75);
  }


    const registers = this.props.saved_registers;

    for(let jj=0; jj<parent.registers.length;jj++){
     
      //synchronous calls.......... 
      //get registered students
      let url = parent.registers[jj]._links.student.href;
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
        
        console.log(JSON.parse(request1.responseText));
        
        //2nd sync call
        //get student classes for registered students

            let url2 = parent.registers[jj]._links.studentClass.href;
            let request2 = new XMLHttpRequest();
            request2.open('GET', url2, false);  // `false` makes the request synchronous
            request2.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
            request2.setRequestHeader("Content-type", "application/json");
            request2.contentType = "application/json"
            request2.send(null);

            if (request2.status === 200) {
                //debugger;
                console.log("sync call 2:",JSON.parse(request2.responseText));
                //debugger;
              
                //sync call 3 get payeds for registered students. 
                //http://localhost:8181/api/payeds/search/findByRegister_Id?id={id}

                let url3 = parent.BASE_URL+"/api/payeds/search/findByRegister_Id?id="+id;
                let request3 = new XMLHttpRequest();
                request3.open('GET', url3, false);  // `false` makes the request synchronous
                request3.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                request3.setRequestHeader("Content-type", "application/json");
                request3.contentType = "application/json"
                request3.send(null);

               if (request3.status === 200) {
                   
                   console.log("sync call 3:",JSON.parse(request3.responseText));
                   let payments = JSON.parse(request3.responseText)._embedded.payeds;
                   
                   for (let _j=0; _j<payments.length; _j++){
                     //build data to display on bootstrap table 
                     let tempData ={};
                     tempData.fname = JSON.parse(request1.responseText).fname;
                     tempData.lname = JSON.parse(request1.responseText).lname;
                     tempData.email = JSON.parse(request1.responseText).email;
                     tempData.class = JSON.parse(request2.responseText).description;
                     tempData.payment = payments[_j].payment;
                     tempData.notes = payments[_j].notes;
                     let date=new Date(payments[_j].dateOfPayment);
                     //debugger;
                     let formatedDate = date.toString().match(/... ... [0-9][0-9] [0-9][0-9][0-9][0-9](?!([0-9][0-9]:[0-9][0-9]:[0-9][0-9] GMT[+]0300 \(EEST\)))/g)[0];                 
                     tempData.dateOfPayment = formatedDate;
                     tempData.index = dataPaymentRegisters.length+1;
                     dataPaymentRegisters.push(tempData);
                     //debugger;
                   }
               }
            }
      }
    }  

}

componentDidUpdate(){
  //debugger;

  let x = document.getElementById("PaymentRegisters");
  let rows = x.querySelectorAll('tr');
  //let el = rows[1];

  //let id = rows.length;

  //el.setAttribute('placeholder', id);

  let el2 = x.getElementsByClassName('form-group');
  //set id for classes in modal window
  console.log("modal editing:",el2)
  //debugger;
  el2[1].childNodes[1].value = rows.length;

  let childs = el2[6].childNodes; 
  
  el2[6].removeChild(childs[1]);

  //Create and append select list
  let selectList = document.createElement("select");
  selectList.id = "mySelectClassesPaymentRegisters";
  selectList.className = "form-control";
  el2[6].appendChild(selectList);

  //Create and append the options
  //debugger;
  for (let i = 0; i < this.props.saved_studentClasses.length; i++) {
      let option = document.createElement("option");
      option.value = this.props.saved_studentClasses[i].description;
      option.text = this.props.saved_studentClasses[i].description;
      selectList.appendChild(option);
  }

  //create select list true and false for payment

  childs = el2[4].childNodes;
  
  el2[4].removeChild(childs[1]);

  //Create and append select list TRUE/FALSE options
  let selectPaymentList = document.createElement("select");
  selectPaymentList.id = "mySelectPaymentRegisters";
  selectPaymentList.className = "form-control";
  //debugger;
  el2[4].appendChild(selectPaymentList);

  //Create and append the options
  //debugger;
  //for (let i = 0; i < this.props.saved_studentClasses.length; i++) {
  let option = document.createElement("option");
  option.value = "TRUE";//this.props.saved_studentClasses[i].description;
  option.text = "TRUE";//this.props.saved_studentClasses[i].description;
  selectPaymentList.appendChild(option);
  option = document.createElement("option");
  option.value = "FALSE";//this.props.saved_studentClasses[i].description;
  option.text = "FALSE";//this.props.saved_studentClasses[i].description;
  selectPaymentList.appendChild(option);
  //} 

  //debugger;
  //add date element in modal window
  el2[7].childNodes[1].type="date";


}

beforeSavePaymentRegistersCell(row, cellName, cellValue) {

  // do your stuff...
  //call action for update
  //this.props.updateClass(row, cellValue);

  // let x = document.getElementById("PaymentRegisters");
  // let el = x.getElementsByClassName('form-group');

  let x = document.getElementById("PaymentRegisters");
  let y = x.getElementsByClassName("react-bs-container-body");
  let el = y[0].getElementsByClassName("form-control editor edit-text")[0];
  console.log(el);

  let cellIndex = el.parentElement.cellIndex;

  if (cellIndex == 4){
    debugger;
  } 
  else if (cellIndex == 6){

    debugger;

    // let childs = el.parentElement.childNodes; 
  
    // el.parentElement.removeChild(childs[0]);

    // //Create and append select list
    // let selectClassesList = document.createElement("select");
    // selectClassesList.id = "mySelectEditClassesPaymentRegisters";
    // selectClassesList.className = "form-control";
    // el.parentElement.appendChild(selectClassesList);

    // //Create and append the options
    // //debugger;
    // for (let i = 0; i < this.props.saved_studentClasses.length; i++) {
    //     let option = document.createElement("option");
    //     option.value = this.props.saved_studentClasses[i].description;
    //     option.text = this.props.saved_studentClasses[i].description;
    //     selectClassesList.appendChild(option);
    // }

  } 
  
  let descBefore = el.getAttribute("value");
  //this.props.updateStudent(row, cellValue,descBefore);
  //debugger;

}

afterSavePaymentRegistersCell(row, cellName, cellValue) {
  // do your stuff...
  //call action for update
  //get description before
  this.props.updatePaymentRegisters(row);
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

    const paymentTypes = ["TRUE", "FALSE"];
    debugger;

    const availableClasses = [];
    for (let i=0;i<this.props.saved_studentClasses.length;i++){
        availableClasses.push(this.props.saved_studentClasses[i].description)
    }
    console.log("dataPaymentRegisters:",dataPaymentRegisters);
    //check if data has loaded
    //debugger;
    if(dataPaymentRegisters.length>0){
    return (
      <div id="PaymentRegisters">
        <BootstrapTable
          cellEdit={cellEditProp} 
          data={dataPaymentRegisters} 
          hover={true} 
          insertRow={ true }
          selectRow={ selectRowProp }
          deleteRow={ true }
          exportCSV={true}
          search={ true }
          options={ options }
          tableHeaderClass='payments-registers-header-class'
          tableBodyClass='payments-registers-body-class'
          >
          <TableHeaderColumn dataField="index" isKey={true} dataSort={true}>id</TableHeaderColumn>
          <TableHeaderColumn dataField="fname" dataAlign="center" dataSort={true} pagination>Name</TableHeaderColumn>
          <TableHeaderColumn dataField="lname" >Last Name</TableHeaderColumn>
          <TableHeaderColumn dataField="payment" editable={ { type: 'select', options: { values: paymentTypes } } }>Payment</TableHeaderColumn>
          <TableHeaderColumn dataField="notes" >Notes</TableHeaderColumn>
          <TableHeaderColumn dataField="class" editable={ { type: 'select', options: { values: availableClasses } } }>Class</TableHeaderColumn>
          <TableHeaderColumn 
            dataField="dateOfPayment" 
            dataAlign="left" 
            dataSort={false}
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
            <p id="loadingText"> Please wait while getting data from database <span id="dotsPaymentRegisters"></span> </p>
        </div>
      )
    }
  }
}

export default connect(state => state, actions)(PaymentRegisters);