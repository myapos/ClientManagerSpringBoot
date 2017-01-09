import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/';
import { Link } from 'react-router';
import '../../css/App.css';
import {Table, Column, Cell} from 'fixed-data-table';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import * as api from '../../api';

function afterSearch (searchText, result){
  console.log('Your search text is ' + searchText);
  console.log('Result is:');
  for (let i = 0; i < result.length; i++) {
    console.log('StudentClass: ' + result[i].index + ', ' + result[i].description);
  }
}

function onAfterInsertRow(row, obj) {
  let newRowStr = '';

  for (const prop in row) {
    newRowStr += prop + ': ' + row[prop] + ' \n';
  }
  alert('The new row is:\n ' + newRowStr);
  debugger;
  console.log("insert data to database",this.props);
  this.props.saveNewClass();

}

const onAfterDeleteRow = (rowKeys) => {
  alert('The rowkey you drop: ' + rowKeys);
  console.log("delete data from database");
}

// If you want to enable deleteRow, you must enable row selection also.
const selectRowProp = {
  mode: 'checkbox'
};

class StudentClassesDataTable extends Component {
  // constructor (props) {
  //   super(props);

  //   this.state = {
  //     ...props,
  //   }
  // }

  render () {
    //debugger;
    const data = this.props.saved_studentClasses;
    console.log(data);
    onAfterInsertRow.bind(this);
    const options = {
      afterInsertRow: onAfterInsertRow.bind(this),   // A hook for after insert rows
      afterDeleteRow: onAfterDeleteRow  // A hook for after droping rows.
    };
    //preprocess data
    data.map((obj, index)=>{
      console.log("cur index:"+index);
      obj.index = (index+1);
    });
    //debugger;
    //options.that = this;
    //debugger;
    return (
      <div>
          <BootstrapTable data={data} hover={true} deleteRow={ true } insertRow={ true } selectRow={ selectRowProp } options={ options }>
            <TableHeaderColumn dataField="index" isKey={true} dataSort={true}>id</TableHeaderColumn>
            <TableHeaderColumn dataField="description" dataAlign="center" dataSort={true} pagination>Description</TableHeaderColumn>
          </BootstrapTable>
      </div>
    );
  }
}

export default connect(state => state, actions)(StudentClassesDataTable);
