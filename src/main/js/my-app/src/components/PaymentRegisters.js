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
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.js';
// import './toggler.css';
// import Toggle from 'react-toggle';
// react select

// import Advertiser from './Advertiser';


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




  render () {
    const data = this.props.saved_payeds;
    const registers = this.props.saved_registers;
    //debugger;
    //preprocess data
    // data.map((obj, index)=>{
    //   //debugger;
    //   let date=new Date(obj.dateOfBirth);
    //   let formatedDate = date.toString().match(/... ... [0-9][0-9] [0-9][0-9][0-9][0-9](?!([0-9][0-9]:[0-9][0-9]:[0-9][0-9] GMT[+]0300 \(EEST\)))/g);
    //   obj.dateOfBirth = formatedDate;
    //   console.log("cur index:"+index);
    //   obj.index = (index+1);
    // });
    //debugger;
    data.map((obj, index)=>{
      //debugger;
      let date=new Date(obj.dateOfPayment);
      let formatedDate = date.toString().match(/... ... [0-9][0-9] [0-9][0-9][0-9][0-9](?!([0-9][0-9]:[0-9][0-9]:[0-9][0-9] GMT[+]0300 \(EEST\)))/g);
      obj.dateOfPayment = formatedDate;
      console.log("cur index:"+index);
      obj.index = (index+1);
    });
    console.log(data);
    //add regitster in payeds array of objects

    // for (let c=0; c<registers.length; c++){
    //   data.push(registers[c]);
    // }
    //const data = payeds.push(registers);

    console.log(data);


    return (
      <div id="PaymentRegisters">
        <BootstrapTable data={data} hover={true} insertRow={ true } selectRow={ selectRowProp } deleteRow={ true } exportCSV={true} search={ true } options={ options }>
          <TableHeaderColumn dataField="index" isKey={true} dataSort={true}>id</TableHeaderColumn>
          <TableHeaderColumn width={80} dataField="payment" dataAlign="center" dataSort={true} pagination>Payment</TableHeaderColumn>
          <TableHeaderColumn
          dataField="dateOfPayment" 
          dataSort={true}
          dataAlign="center"
          width={200}>
            Date Of Payment
          </TableHeaderColumn>
        </BootstrapTable>
      </div>

    );
  }
}

export default connect(state => state, actions)(PaymentRegisters);
