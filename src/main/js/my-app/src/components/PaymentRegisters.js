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
// If you want to enable deleteRow, you must enable row selection also.
const selectRowProp = {
  mode: 'checkbox'
};

const options = {
  // afterSearch: afterSearch,  // define a after search hook
  // afterInsertRow: onAfterInsertRow,   // A hook for after insert rows
  // afterDeleteRow: onAfterDeleteRow  // A hook for after droping rows.
};
class PaymentRegisters extends Component {

componentDidMount(){
  //const data = this.props.saved_payeds;
  //running dots functionality
  //debugger;
  let el = document.getElementById("dotsPaymentRegisters");
  if (typeof el !== undefined) {
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
                     tempData.desc = JSON.parse(request2.responseText).description;
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

render () {
    console.log("dataPaymentRegisters:",dataPaymentRegisters);
    //check if data has loaded
    //debugger;
    if(dataPaymentRegisters.length>0){
    return (
      <div id="PaymentRegisters">
        <BootstrapTable
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
          <TableHeaderColumn dataField="payment" >Payment</TableHeaderColumn>
          <TableHeaderColumn dataField="notes" >Notes</TableHeaderColumn>
          <TableHeaderColumn dataField="desc" >Description</TableHeaderColumn>
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
