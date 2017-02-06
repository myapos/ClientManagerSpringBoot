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
  //debugger;
  // let newRowStr = '';
  // let payment = document.getElementsByClassName("mySelectPaymentRegisters").value;
  // let classReg = document.getElementById("mySelectClassesPaymentRegisters").value;

  // row.payment = payment;
  // row.class = classReg;
  // for (const prop in row) {
  //   //debugger;
  //   newRowStr += prop + ': ' + row[prop] + ' \n';
  // }
  // //debugger;
  // alert('The new row is:\n ' + newRowStr);
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
  const data = this.props.saved_payeds;
  //running dots functionality
  //debugger;
  let el = document.getElementById("dotsPaymentRegisters");
  let d = new Date();
  let startTime = d.getTime();
  let endTime = d.getTime();
  let diffTime = endTime - startTime;
  let refreshIntervalId = "";
  let timeThreshold = 15000 ; //ms
  if (el !== null) {
  // do stuff
  
  //anonymoys function to use in setInterval
  let anon = function(data) {
      //debugger;
      el.innerHTML = el.innerHTML + ".";  
      
      if (el.innerHTML == ".................................."){
        //reset dots
        //debugger;
        //clearInterval();
        el.innerHTML = "";
      }
      d = new Date();
      endTime = d.getTime();
      diffTime = endTime - startTime;
      console.log("diffTime:",diffTime," startTime:",startTime," endTime:",endTime);
      //if waiting time is more than 30sec then display message
      //debugger;
      if (diffTime > timeThreshold && data.length == 0 ){
        //debugger;
        //alert("time passed");
        clearInterval(refreshIntervalId);
        let msg = document.getElementById("loadingTextPaymentRegisters");
        msg.innerHTML = "No payments are saved in database"; 
        el.innerHTML = ""; 

      } else if (diffTime > timeThreshold && data.length > 0 ){
        clearInterval(refreshIntervalId);
      }
    };


  refreshIntervalId = setInterval( function() { anon(data)} , 100);

    
  }
  
 
    const registers = this.props.saved_registers;

    for(let jj=0; jj<parent.registers.length;jj++){
     
      //synchronous calls.......... 
      //get registered students
      let url = parent.registers[jj]._links.student.href;
      debugger;
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
                //debugger;
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
  let el2 = x.getElementsByClassName('form-group');
  //set id for classes in modal window

  el2[1].childNodes[1].value = rows.length-1;

  
  //add date element in modal window
  el2[7].childNodes[1].type="date";


}

beforeSavePaymentRegistersCell(row, cellName, cellValue) {

  // do your stuff...
  //call action for update
  //this.props.updateClass(row, cellValue);

  // let x = document.getElementById("PaymentRegisters");
  // let el = x.getElementsByClassName('form-group');

  
  //this.props.updatePaymentRegisters(row, cellValue,descBefore);
  //debugger;

}

afterSavePaymentRegistersCell(row, cellName, cellValue) {
  // do your stuff...
  //call action for update
  //get description before
  
  let x = document.getElementById("PaymentRegisters");
  let y = x.getElementsByClassName("react-bs-container-body");
  let updateMode = "";
  //let el = y[0].getElementsByClassName("form-control editor edit-text")[0];
 
  let el;
  let cellIndex;
  //debugger;
  if (y[0].querySelector("select") != null){

    el = y[0].querySelector("select")[0];
    cellIndex  = el.parentElement.parentElement.cellIndex;
  }
  else if (y[0].getElementsByClassName("form-control editor edit-text")[0] != null){
    
    el = y[0].getElementsByClassName("form-control editor edit-text")[0];
    cellIndex = el.parentElement.cellIndex;
  }
  else if (y[0].getElementsByClassName("form-control editor edit-datetime")[0] != null){
    //debugger;
    el = y[0].getElementsByClassName("form-control editor edit-datetime")[0];
    cellIndex = el.parentElement.cellIndex;
  }
  console.log(el);

  

  if (cellIndex == 4){
    //debugger;
    updateMode = "paymentUpdate";
  } 
  else if (cellIndex == 5){
    //debugger;
    updateMode = "paymentNotesUpdate";
  } 
  else if (cellIndex == 6){

    //debugger;
    updateMode = "classUpdate";

  } 
  else if (cellIndex == 7){

    //debugger;
    updateMode = "updateDateOfPayment";

  } 
  
  let descBefore = el.getAttribute("value");
  this.props.updatePaymentRegisters(row,updateMode);
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

    const paymentTypes = ["true", "false"];

    const fnames = [];
    const lnames = [];
    //debugger;
    for (let i=0;i<this.props.saved_student.length;i++){
        fnames.push(this.props.saved_student[i].fname);
        lnames.push(this.props.saved_student[i].lname);       
    }


    //debugger;

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
          exportCSV={true}
          search={ true }
          options={ options }
          tableHeaderClass='payments-registers-header-class'
          tableBodyClass='payments-registers-body-class'
          >
          <TableHeaderColumn dataField="index" editable={ false } isKey={true} dataSort={true}>id</TableHeaderColumn>
          <TableHeaderColumn dataField="fname" dataAlign="center" dataSort={true} pagination>Name</TableHeaderColumn>
          <TableHeaderColumn dataField="lname">Last Name</TableHeaderColumn>
          <TableHeaderColumn dataField="payment" editable={ { type: 'select', options: { values: paymentTypes } } }>Payment</TableHeaderColumn>
          <TableHeaderColumn dataField="notes" >Notes</TableHeaderColumn>
          <TableHeaderColumn dataField="class" editable={ { type: 'select', options: { values: availableClasses } } }>Class</TableHeaderColumn>
          <TableHeaderColumn 
            dataField="dateOfPayment" 
            dataAlign="left" 
            dataSort={false}
            editable={ { type: 'datetime' } }
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
          <div>
              <p id="loadingTextPaymentRegisters" className="loadingText"> Please wait while getting data from database <span id="dotsPaymentRegisters"></span> </p>
          </div>

          <div id="PaymentRegisters">
            <BootstrapTable
              cellEdit={cellEditProp} 
              data={dataPaymentRegisters} 
              hover={true} 
              insertRow={ true } 
              selectRow={ selectRowProp }
              exportCSV={true}
              search={ true }
              options={ options }
              tableHeaderClass='payments-registers-header-class'
              tableBodyClass='payments-registers-body-class'
              >
              <TableHeaderColumn dataField="index" editable={ false } isKey={true} dataSort={true}>id</TableHeaderColumn>
              <TableHeaderColumn className='mySelectPaymentRegisters' dataField="fname" dataAlign="center" editable={ { type: 'select', options: { values: fnames } } }dataSort={true} pagination>Name</TableHeaderColumn>
              <TableHeaderColumn dataField="lname" editable={ { type: 'select', options: { values: lnames } } }>Last Name</TableHeaderColumn>
              <TableHeaderColumn dataField="payment" editable={ { type: 'select', options: { values: paymentTypes } } }>Payment</TableHeaderColumn>
              <TableHeaderColumn dataField="notes" >Notes</TableHeaderColumn>
              <TableHeaderColumn dataField="class" editable={ { type: 'select', options: { values: availableClasses } } }>Class</TableHeaderColumn>
              <TableHeaderColumn 
                dataField="dateOfPayment" 
                dataAlign="left" 
                dataSort={false}
                editable={ { type: 'datetime' } }
              >
                Date Of Payment
              </TableHeaderColumn>

            </BootstrapTable>
          </div>
      </div>

      )
    }
  }
}

export default connect(state => state, actions)(PaymentRegisters);