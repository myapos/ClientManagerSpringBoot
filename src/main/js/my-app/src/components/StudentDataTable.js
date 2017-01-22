import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import { Link } from 'react-router';
import '../css/App.css';
import {Table, Column, Cell} from 'fixed-data-table';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
//import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

function afterSearch (searchText, result){
  console.log('Your search text is ' + searchText);
  console.log('Result is:');
  for (let i = 0; i < result.length; i++) {
    console.log('Student: ' + result[i].index + ', ' + result[i].fname + ', ' + result[i].lname
      +', '+result[i].phone +', ',result[i].dateOfBirth+ ', ' + result[i].email + ', ' + result[i].facebook);
  }
}

function onAfterInsertRow (row) {
  let newRowStr = '';

  for (const prop in row) {
    newRowStr += prop + ': ' + row[prop] + ' \n';
  }
  //debugger;
  alert('The new row is:\n ' + newRowStr);
  console.log("insert data to database");
  debugger;
  this.props.addStudent(row);

}

function onAfterDeleteRow (rowKeys) {

  alert('The rowkey you drop: ' + rowKeys);
  console.log("delete data from database");
  //debugger;
}

// const options = {
//   afterSearch: afterSearch,           // define a after search hook
//   afterInsertRow: onAfterInsertRow,   // A hook for after insert rows
//   afterDeleteRow: onAfterDeleteRow    // A hook for after droping rows.
// };

// If you want to enable deleteRow, you must enable row selection also.
const selectRowProp = {
  mode: 'checkbox'
};

class StudentDataTable extends Component {

componentDidMount() {
  //debugger;
  let elSt = document.getElementById("dotsStudents");
  console.log(elSt);

  if (elSt !== null) {
    // do stuff
    console.log(elSt);
    setInterval(function () {elSt.innerHTML = elSt.innerHTML + ".";  }, 75);
  }

}

componentDidUpdate(){
  //debugger;

  let x = document.getElementById("students");
  let rows = x.querySelectorAll('tr');
  let el = rows[1];
  //let el = document.getElementsByClassName('form-control editor edit-text')[0];
  
  //let rows = document.querySelectorAll('tr');

  let id = rows.length;

  el.setAttribute('placeholder', id);
  //set id for classes in modal window
  console.log("modal editing:",el);
  x.getElementsByClassName('form-control editor edit-text')[0].value = rows.length;
  //add date element in modal window
  x.getElementsByClassName('form-control editor edit-text')[3].type="number";
  x.getElementsByClassName('form-control editor edit-text')[3].min="6900000000";
  x.getElementsByClassName('form-control editor edit-text')[4].type="date";
  x.getElementsByClassName('form-control editor edit-text')[5].type="email";


  //debugger;


}
beforeSaveCell(row, cellName, cellValue) {
  // do your stuff...
  //call action for update
  //this.props.updateClass(row, cellValue);
  //debugger;
  //let x = document.getElementById("students");
  //let el = x.getElementsByClassName(" form-control editor edit-text")[0];
  // let descBefore = el.getAttribute("value");
  // this.props.updateClass(row, cellValue,descBefore);
  //debugger;

}

afterSaveCell(row, cellName, cellValue) {
  // do your stuff...
  //call action for update
  //get description before
  //
 

}


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

    const cellEditProp = {
      mode: 'click',
      beforeSaveCell: this.beforeSaveCell.bind(this),
      afterSaveCell: this.afterSaveCell.bind(this)
    };

    const options = {
      afterSearch: afterSearch,           // define a after search hook
      afterInsertRow: onAfterInsertRow.bind(this),   // A hook for after insert rows
      afterDeleteRow: onAfterDeleteRow.bind(this)  // A hook for after droping rows.
    };

    //debugger;
      if(data.length>0){
        return (
          <div id="students">
            <BootstrapTable 
            cellEdit={cellEditProp} 
            data={data} hover={true} 
            insertRow={ true } 
            selectRow={ selectRowProp } 
            deleteRow={ true } 
            exportCSV={true} 
            search={ true } 
            options={ options }
            >
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
  else{
      return (
        <div>
            <p id="loadingText"> Please wait while getting data from database <span id="dotsStudents"></span> </p>
        </div>
      )
    }
  }
}

export default connect(state => state, actions)(StudentDataTable);
