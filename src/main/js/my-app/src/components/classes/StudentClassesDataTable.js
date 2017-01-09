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

const onAfterInsertRow = (row) => {
  let newRowStr = '';

  for (const prop in row) {
    newRowStr += prop + ': ' + row[prop] + ' \n';
  }
  alert('The new row is:\n ' + newRowStr);
  debugger;
  console.log("insert data to database");


  // this.props.studentClassById();

  //   var json = {
  //     json: JSON.stringify({
  //         description: "Women's corner",
  //         studentClass: api.getStudentClassesById(1)
  //     }),
  //     delay: 3
  //   };

  //   fetch('http://localhost:8181/api/studentClasses/', { 
  //      method: 'post', 
  //      mode: 'cors',
  //      cache: 'default',
  //      headers: {
  //        'Authorization': 'Basic '+btoa('myapos:Apostolakis1981'), 
  //        'Content-Type': 'application/json'
  //      },
  //       body: 'json=' + encodeURI(JSON.stringify(json.json)) + '&delay=' + json.delay
  //   })
  //   .then(function (response) {
  //     debugger;
  //     return response.json();
  //   })
  //   .then(function (result) {
  //       alert(result);
  //   })
  //   .catch (function (error) {
  //       console.log('Request failed', error);
  //   });
}

const onAfterDeleteRow = (rowKeys) => {
  alert('The rowkey you drop: ' + rowKeys);
  console.log("delete data from database");
}

const options = {
  afterInsertRow: onAfterInsertRow,   // A hook for after insert rows
  afterDeleteRow: onAfterDeleteRow  // A hook for after droping rows.
};

// If you want to enable deleteRow, you must enable row selection also.
const selectRowProp = {
  mode: 'checkbox'
};

class StudentClassesDataTable extends Component {

  render () {
    debugger;
    const data = this.props.saved_studentClasses;
    console.log(data);
    
    //preprocess data
    data.map((obj, index)=>{
      console.log("cur index:"+index);
      obj.index = (index+1);
    });
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
