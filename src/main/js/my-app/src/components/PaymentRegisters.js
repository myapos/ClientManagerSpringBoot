import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import { Link } from 'react-router';

import '../css/App.css';
import '../css/App.css';
import {Table, Column, Cell} from 'fixed-data-table';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

//debugger;
let dataPaymentRegisters = [];
parent.count = 0;
function afterSearch (searchText, result){
  //console.log('Your search text is ' + searchText);
  //console.log('Result is:');
  for (let i = 0; i < result.length; i++) {
    //console.log('PaymentRegisters: ' + result[i].index + ', ' + result[i].fname + ', ' + result[i].lname
     // +', '+result[i].phone +', ',result[i].dateOfBirth+ ', ' + result[i].email + ', ' + result[i].facebook);
  }
}

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
  //parent.loadedPaymReg = 0;
  

  const registers = this.props.saved_registers;
  const students = this.props.saved_student;

  this.props.dataPaymentsRegisters(students);  

}
componentWillUpdate(){

  //parent.loadedPaymReg = false;
  //this.props.loadingHandling(0);
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
  //running dots functionality
  // let el = document.getElementById("dotsPaymentRegisters");
  // let d = new Date();
  // let startTime = d.getTime();
  // let endTime = d.getTime();
  // let diffTime = endTime - startTime;
  // let refreshIntervalId = "";
  // let timeThreshold = 15000 ; //ms
  // if (el !== null) {
  // do stuff
  
  // //anonymoys function to use in setInterval
  // let anon = function(data) {
  //     //debugger;
  //     el.innerHTML = el.innerHTML + ".";  
      
  //     if (el.innerHTML == ".................................."){

  //       el.innerHTML = "";
  //     }
  //     d = new Date();
  //     endTime = d.getTime();
  //     diffTime = endTime - startTime;

  //     if (diffTime > timeThreshold && data.length == 0 ){

  //       clearInterval(refreshIntervalId);
  //       let msg = document.getElementById("loadingTextPaymentRegisters");
  //       msg.innerHTML = "No payments are saved in database"; 
  //       el.innerHTML = ""; 

  //     } else if (diffTime > timeThreshold && data.length > 0 ){
  //       clearInterval(refreshIntervalId);
  //     }
  //   };


  // refreshIntervalId = setInterval( function() { anon(data)} , 100);

    
  // }
  
 
    // const registers = this.props.saved_registers;
    // const students = this.props.saved_student;
    
    // //debugger;
    // let request1 = {};
    // let url1 = "";
    // for(let jj=0; jj<students.length;jj++){

    //    //debugger;
       
    //     //get students who has registered already
    //     url1 = parent.BASE_URL +"/api/registers/search/findByStudent?student="+students[jj]._links.self.href;

    //   const fetch1 = fetch(url1, {
    //                 method: 'get',
    //                 mode: 'cors',
    //                 cache: 'default',
    //                 headers: {
    //                     'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
    //                     'Content-Type': 'application/json'
    //                 }
    //         })
    //   .then(res1 => res1.json())
    //   .then(res1 => {

    //       parent.isloading = 0;
    //       //console.log(JSON.parse(request1.responseText));
    //       //debugger;
    //       let registrations = res1;//JSON.parse(request1.responseText);
         

    //       if(registrations._embedded.registers.length>0) {
    //       //get payments of those students . if there aren't any then you can set them


    //           for(let jw=0; jw<registrations._embedded.registers.length;jw++){
                
    //             let url2 = parent.BASE_URL+"/api/payeds/search/findByRegister?register="+registrations._embedded.registers[jw]._links.self.href;
                
    //             const fetch2 = fetch(url2, {
    //                           method: 'get',
    //                           mode: 'cors',
    //                           cache: 'default',
    //                           headers: {
    //                               'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
    //                               'Content-Type': 'application/json'
    //                           }
    //                   })
    //             .then(res2 => {
    //               //debugger;
    //               return res2.json();
    //             })
    //             .then(res2 => {

    //               let payments = res2;//JSON.parse(request2.responseText);


    //               let tempData ={};
    //               tempData.fname = students[jj].fname;
    //               tempData.lname = students[jj].lname;
    //               tempData.email = students[jj].email;

    //               if(typeof payments._embedded.payeds !== 'undefined') {
    //                   //get classes of registered students
    //                   //debugger;
    //                   let url3 = registrations._embedded.registers[jw]._links.studentClass.href;
    //                   const fetch3 = fetch(url3, {
    //                                 method: 'get',
    //                                 mode: 'cors',
    //                                 cache: 'default',
    //                                 headers: {
    //                                     'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
    //                                     'Content-Type': 'application/json'
    //                                 }
    //                         })
    //                   .then(res3 => {
    //                     //debugger;
    //                     return res3.json();
    //                   })
    //                   .then(res3 => {

    //                       let studentClasses = res3;//JSON.parse(request3.responseText);
    //                       let tempData ={};
    //                       tempData.fname = students[jj].fname;
    //                       tempData.lname = students[jj].lname;
    //                       tempData.email = students[jj].email;
    //                       tempData.class = studentClasses.description;
    //                       tempData.payment = payments._embedded.payeds[0].payment;
    //                       tempData.notes = payments._embedded.payeds[0].notes;
    //                       let date = new Date(payments._embedded.payeds[0].dateOfPayment);
    //                       let formatedDate = date.toString().match(/... ... [0-9][0-9] [0-9][0-9][0-9][0-9](?!([0-9][0-9]:[0-9][0-9]:[0-9][0-9] GMT[+]0300 \(EEST\)))/g)[0];                 
    //                       tempData.dateOfPayment = formatedDate;
    //                       tempData.index = dataPaymentRegisters.length+1;
    //                       dataPaymentRegisters.push(tempData);
    //                       parent.loadedPaymReg = true;

    //                   })

    //               }
    //               else {
    //                   //debugger;
    //                   let url4 = registrations._embedded.registers[jw]._links.studentClass.href;

    //                   const fetch4 = fetch(url4, {
    //                                 method: 'get',
    //                                 mode: 'cors',
    //                                 cache: 'default',
    //                                 headers: {
    //                                     'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
    //                                     'Content-Type': 'application/json'
    //                                 }
    //                         })
    //                   .then(res4 => {
    //                     //debugger;
    //                     return res4.json();
    //                   })
    //                   .then(res4 => {

    //                       let studentClasses = res4;//JSON.parse(request3.responseText);
    //                       let tempData ={};
    //                       tempData.fname = students[jj].fname;
    //                       tempData.lname = students[jj].lname;
    //                       tempData.email = students[jj].email;
    //                       tempData.class = studentClasses.description;
    //                       tempData.payment = false;
    //                       tempData.notes = "No payment yet";
    //                       let dateOfPayment = new Date("Sun Feb 01 1970 00:00:00 GMT+0200 (EET)"); //for none payments
    //                       let formatedDate = dateOfPayment.toString().match(/... ... [0-9][0-9] [0-9][0-9][0-9][0-9](?!([0-9][0-9]:[0-9][0-9]:[0-9][0-9] GMT[+]0300 \(EEST\)))/g)[0];                 
    //                       tempData.dateOfPayment = formatedDate;
    //                       tempData.index = dataPaymentRegisters.length+1;
    //                       dataPaymentRegisters.push(tempData);
    //                       parent.loadedPaymReg = true;
                          
    //                       if(!this.props.loadingHandlingCommplete && parent.count==1) {
    //                         //this.props.loadingHandling(1);
    //                         parent.count++;
    //                         //parent.isloading = 1;
    //                       } else parent.count = 0;
    //                   })

    //               }
    //             })
    //           }

    //       }

    //     })
    // }

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
    for (let i=0;i<this.props.saved_student.length;i++){
        fnames.push(this.props.saved_student[i].fname);
        lnames.push(this.props.saved_student[i].lname);       
    }


    const availableClasses = [];
    for (let i=0;i<this.props.saved_studentClasses.length;i++){
        availableClasses.push(this.props.saved_studentClasses[i].description)
    }
    //console.log("dataPaymentRegisters:",dataPaymentRegisters);
    //check if data has loaded
    //debugger;
    console.log("log paym registers:",this.props.dataPaymentsRegistersLoaded);
    //if(dataPaymentRegisters.length>0){
    if((typeof this.props.selectedTab === 'undefined' || this.props.selectedTab == "tab3") 
        && typeof this.props.dataPaymentsRegistersLoaded !== 'undefined'
        && this.props.dataPaymentsRegistersLoaded.length > 0){
    //debugger;
    return (
      <div id="PaymentRegisters">
        <BootstrapTable
          cellEdit={cellEditProp} 
          data={this.props.dataPaymentsRegistersLoaded} 
          hover={true} 
          insertRow={ true }
          deleteRow={ true } 
          selectRow={ selectRowProp }
          exportCSV={true}
          search={ true }
          options={ options }
          tableHeaderClass='payments-registers-header-class'
          tableBodyClass='payments-registers-body-class'
          condensed
          >
          <TableHeaderColumn dataField="index" editable={ false } hidden={true} isKey={true} width='5%'>id</TableHeaderColumn>
          <TableHeaderColumn dataField="fname" width='20%' dataSort={true}>Name</TableHeaderColumn>
          <TableHeaderColumn dataField="lname" width='20%' dataSort={true}>Last Name</TableHeaderColumn>
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