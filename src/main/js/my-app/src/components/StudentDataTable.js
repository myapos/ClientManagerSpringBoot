import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import { Link } from 'react-router';
import '../css/App.css';
import {Table, Column, Cell} from 'fixed-data-table';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.js';
const afterSearch = (searchText, result) =>{
  console.log('Your search text is ' + searchText);
  console.log('Result is:');
  for (let i = 0; i < result.length; i++) {
    console.log('Student: ' + result[i].index + ', ' + result[i].fname + ', ' + result[i].lname
      +', '+result[i].phone +', ',result[i].dateOfBirth+ ', ' + result[i].email + ', ' + result[i].facebook);
  }
}

const onAfterInsertRow = (row) =>{
  let newRowStr = '';

  for (const prop in row) {
    newRowStr += prop + ': ' + row[prop] + ' \n';
  }
  //debugger;
  alert('The new row is:\n ' + newRowStr);
  console.log("insert data from database");

}

const onAfterDeleteRow = (rowKeys) => {

  alert('The rowkey you drop: ' + rowKeys);
  console.log("delete data from database");
  //debugger;
}

const options = {
  afterSearch: afterSearch,  // define a after search hook
  afterInsertRow: onAfterInsertRow,   // A hook for after insert rows
  afterDeleteRow: onAfterDeleteRow  // A hook for after droping rows.
};

// If you want to enable deleteRow, you must enable row selection also.
const selectRowProp = {
  mode: 'checkbox'
};

class StudentDataTable extends Component {

  render () {
    const data = this.props.saved_student;
    //preprocess data
    data.map((obj, index)=>{
      //debugger;
      let date=new Date(obj.dateOfBirth);
      let formatedDate = date.toString().match(/... ... [0-9][0-9] [0-9][0-9][0-9][0-9](?!([0-9][0-9]:[0-9][0-9]:[0-9][0-9] GMT[+]0300 \(EEST\)))/g);
      obj.dateOfBirth = formatedDate;
      console.log("cur index:"+index);
      obj.index = (index+1);
    });
    //debugger;
    console.log(data);
    return (
      <div id="students">
        <BootstrapTable data={data} hover={true} insertRow={ true } selectRow={ selectRowProp } deleteRow={ true } exportCSV={true} search={ true } options={ options }>
          <TableHeaderColumn dataField="index" isKey={true} dataSort={true}>id</TableHeaderColumn>
          <TableHeaderColumn dataField="fname" dataAlign="center" dataSort={true} pagination>Name</TableHeaderColumn>
          <TableHeaderColumn dataField="lname" dataSort={true}>Last Name</TableHeaderColumn>
          <TableHeaderColumn dataField="phone" dataSort={false}>Mobile phone</TableHeaderColumn>
          <TableHeaderColumn 
            dataField="dateOfBirth" 
            dataAlign="left" 
            dataSort={false}
          >
            Date Of Birth
          </TableHeaderColumn>
          <TableHeaderColumn dataField="email" dataSort={false}>E-mail</TableHeaderColumn>
          <TableHeaderColumn dataField="facebook" dataSort={false}>Facebook</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default connect(state => state, actions)(StudentDataTable);
