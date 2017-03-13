import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import { Link } from 'react-router';
import '../css/App.css';
import {Table, Column, Cell} from 'fixed-data-table';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../node_modules/react-loading-spinner/src/css/index.css';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../css/App.css';

function afterSearch (searchText, result){
  //console.log('Your search text is ' + searchText);
  //console.log('Result is:');
  for (let i = 0; i < result.length; i++) {
    //console.log('Student: ' + result[i].index + ', ' + result[i].fname + ', ' + result[i].lname
      //+', '+result[i].phone +', ',result[i].dateOfBirth+ ', ' + result[i].email + ', ' + result[i].facebook);
  }
}

function onAfterInsertRow (row) {
  let newRowStr = '';

  for (const prop in row) {
    newRowStr += prop + ': ' + row[prop] + ' \n';
  }

  alert('The new row is:\n ' + newRowStr);
  //console.log("insert data to database");
  ////debugger;
  this.props.addStudent(row);

}

function onAfterDeleteRow (rowKeys) {

  alert('The rowkey you drop: ' + rowKeys);
  //console.log("delete data from database");
  this.props.deleteStudent(rowKeys);

}


// If you want to enable deleteRow, you must enable row selection also.
const selectRowProp = {
  mode: 'checkbox'
};

class StudentDataTable extends Component {

componentDidMount() {
  const data = this.props.saved_students;
  ////debugger;
  let elSt = document.getElementById("dotsStudents");
  let d = new Date();
  let startTime = d.getTime();
  let endTime = d.getTime();
  let diffTime = endTime - startTime;
  let refreshIntervalId = "";
  let timeThreshold = 15000 ; //ms
  if (elSt !== null) {
  // do stuff
  
  //anonymoys function to use in setInterval
  let anon = function(data) {

      elSt.innerHTML = elSt.innerHTML + ".";  
      
      if (elSt.innerHTML == ".................................."){
        //reset dots

        elSt.innerHTML = "";
      }
      d = new Date();
      endTime = d.getTime();
      diffTime = endTime - startTime;
      //console.log("diffTime:",diffTime," startTime:",startTime," endTime:",endTime);
      //if waiting time is more than 30sec then display message

      if (diffTime > timeThreshold && data.length == 0 ){
        clearInterval(refreshIntervalId);
        let msg = document.getElementById("loadingTextStudents");
        msg.innerHTML = "No payments are saved in database"; 
        elSt.innerHTML = ""; 
      } else if (diffTime > timeThreshold && data.length > 0 ){
        clearInterval(refreshIntervalId);
      }
    };


  refreshIntervalId = setInterval( function() { anon(data)} , 100);

    
  }

}

componentDidUpdate(){


  let x = document.getElementById("students");
  
  if (x!= null) {
      let rows = x.querySelectorAll('tr');
      let el = rows[1];

      let id = rows.length;

      el.setAttribute('placeholder', id);
      //set id for classes in modal window
      //console.log("modal editing:",el);
      x.getElementsByClassName('form-control editor edit-text')[0].value = rows.length;
      //add date element in modal window
      x.getElementsByClassName('form-control editor edit-text')[3].type="number";
      x.getElementsByClassName('form-control editor edit-text')[3].min="6900000000";
      x.getElementsByClassName('form-control editor edit-text')[4].type="date";
      x.getElementsByClassName('form-control editor edit-text')[5].type="email";
  }

  ////debugger;


}
beforeSaveStudentCell(row, cellName, cellValue) {

}

afterSaveStudentCell(row, cellName, cellValue) {
  // do your stuff...
  //call action for update
  //get description before
  this.props.updateStudent(row);
  ////debugger;

}


render () {
    const data = this.props.saved_student;
    //preprocess data
    data.map((obj, index)=>{

      let date=new Date(obj.dateOfBirth);
      let formatedDate = date.toString().match(/... ... [0-9][0-9] [0-9][0-9][0-9][0-9](?!([0-9][0-9]:[0-9][0-9]:[0-9][0-9] GMT[+]0300 \(EEST\)))/g);
      obj.dateOfBirth = formatedDate;
      //console.log("cur index:"+index);
      obj.index = (index+1);
    });

    //console.log(data);

    const cellEditProp = {
      mode: 'click',
      beforeSaveCell: this.beforeSaveStudentCell.bind(this),
      afterSaveCell: this.afterSaveStudentCell.bind(this)
    };

    const options = {
      afterSearch: afterSearch,           // define a after search hook
      afterInsertRow: onAfterInsertRow.bind(this),   // A hook for after insert rows
      afterDeleteRow: onAfterDeleteRow.bind(this)  // A hook for after droping rows.
    };

      //if(data.length>0){
      if((typeof this.props.selectedTab === 'undefined' || this.props.selectedTab == "tab1") ){  
        //debugger;
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
              <TableHeaderColumn dataField="index" isKey={true} dataSort={true} editable={false} >id</TableHeaderColumn>
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
            {/*<p id="loadingTextStudents" className="loadingText"> Please wait while getting data from database <span id="dotsStudents"></span> </p>*/}
            <div className="loader"></div>
        </div>
      )
    }
  }
}

export default connect(state => state, actions)(StudentDataTable);
