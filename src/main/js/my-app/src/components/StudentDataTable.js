import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import { Link } from 'react-router';
import '../css/App.css';
import {Table, Column, Cell} from 'fixed-data-table';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../../../../../node_modules/react-loading-spinner/src/css/index.css';
import '../../../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../css/App.css';
import Spinner from 'react-spinner-children';

const waitForData = 7000; //msecs

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
}

componentDidUpdate(){

  let x = document.getElementById("students");
  
  if (x!= null) {
      let rows = x.querySelectorAll('tr');
      let el = rows[1];

      let id = rows.length;

      el.setAttribute('placeholder', id);
      //set id for classes in modal window
      x.getElementsByClassName('form-control editor edit-text')[0].value = rows.length;
      //add date element in modal window
      x.getElementsByClassName('form-control editor edit-text')[3].type="number";
      x.getElementsByClassName('form-control editor edit-text')[3].min="6900000000";
      x.getElementsByClassName('form-control editor edit-text')[4].type="date";
      x.getElementsByClassName('form-control editor edit-text')[5].type="email";
  }


}
beforeSaveStudentCell(row, cellName, cellValue) {

}

afterSaveStudentCell(row, cellName, cellValue) {
  // do your stuff...
  //call action for update
  this.props.updateStudent(row);

}

//anonymoys function to use in setInterval

anon(data, refreshIntervalId){

     if (typeof data == 'undefined' || data.length == 0 ){

      console.log("waiting for student data");

     } else if (data.length > 0 ){
       clearInterval(refreshIntervalId);

       //rerender
       this.props.loadingHandling(1);
     }
};

render () {

    const data = this.props.saved_student;
    //const data = this.props.initDataStudents;
    //preprocess data
    

    const cellEditProp = {
      mode: 'click',
      beforeSaveCell: this.beforeSaveStudentCell.bind(this),
      afterSaveCell: this.afterSaveStudentCell.bind(this)
    };

    const options = {
      afterInsertRow: onAfterInsertRow.bind(this),   // A hook for after insert rows
      afterDeleteRow: onAfterDeleteRow.bind(this)  // A hook for after droping rows.
    };


      let refreshIntervalId = setInterval( ()=> { 
          this.anon(data, refreshIntervalId)

      } , waitForData);
      //debugger;
      if((typeof this.props.selectedTab === 'undefined' || this.props.selectedTab == "tab3")
        && typeof data !== 'undefined'
        && data.length > 0){  

        data.map((obj, index)=>{

          let date=new Date(obj.dateOfBirth);
          let formatedDate = date.toString().match(/... ... [0-9][0-9] [0-9][0-9][0-9][0-9](?!([0-9][0-9]:[0-9][0-9]:[0-9][0-9] GMT[+]0300 \(EEST\)))/g);
          obj.dateOfBirth = formatedDate;

          obj.index = (index+1);
        });

        return (
            <div id="students">
              <BootstrapTable 
              cellEdit={cellEditProp} 
              data={data} 
              hover={true} 
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
            {<p id="loadingTextStudents" className="loadingText"> Please wait while getting data from database <span id="dotsStudents"></span> </p>}
            <div className="loader"></div>
        </div>
      )
    }
  }
}

export default connect(state => state, actions)(StudentDataTable);
