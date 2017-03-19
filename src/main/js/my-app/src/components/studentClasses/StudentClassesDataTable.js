import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/';
import { Link } from 'react-router';
import '../../css/App.css';
import {Table, Column, Cell} from 'fixed-data-table';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as api from '../../api';
import MDSpinner from "react-md-spinner";

const waitForData = 7000; //msecs
parent.classesPair = {};

function onAfterInsertRow(row) {

  let selectedSubClass = document.getElementById("mySelect").value;
  let newRowStr = '';

  for (const prop in row) {
    newRowStr += prop + ': ' + row[prop] + ' \n';
  }
 
  //console.log("insert data to database",this.props);
  row.subClassDescription = selectedSubClass;
  this.props.saveNewClass(row);
   alert('The new row is:\n ' + row.description + " "+row.subClassDescription);
}

function onAfterDeleteRow(rowKeys) {
  alert('The rowkey you drop: ' + rowKeys);
  //console.log("delete data from database",this.props);
  this.props.deleteClass(rowKeys);
}

Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

// If you want to enable deleteRow, you must enable row selection also.
const selectRowProp = {
  mode: 'checkbox'
};




class StudentClassesDataTable extends Component {

componentWillMount(){
  const data = this.props.saved_studentClasses;
  data.map((obj, index)=>{

    //console.log("cur index:"+index);
    obj.index = (index+1);
    //what is happening when there are more subclasses??? i need to parse all subclasses!!!!

    obj.ManyToOne=obj._links.studentClass[1].href;
    this.props.getSubClass(obj.ManyToOne, obj.description, obj);
  });



}
componentDidMount() {

}

componentWillUpdate(){

}

componentDidUpdate(){
  //debugger;
  // parent.loadedPaymReg  = 0;
  // parent.loadedReg = 0;
  //check if checkPeriodInMinutes has passed

  let x = document.getElementById("studentClasses");

  if (x!= null) {
    let rows = x.querySelectorAll('tr');
    let el = rows[1];


    let id = rows.length;

    el.setAttribute('placeholder', id);
    //set id for classes in modal window
    x.getElementsByClassName('form-control editor edit-text')[0].value = rows.length;
    //console.log("modal editing:",el);

    let el2 = x.getElementsByClassName('form-group');
    let childs = el2[2].childNodes;
    
    el2[2].removeChild(childs[1])
    let input = el2[2];

    //Create array of options to be added
    //let arrayOfOptions = ["Volvo","Saab","Mercades","Audi"];

    //Create and append select list
    let selectList = document.createElement("select");
    selectList.id = "mySelectStudentClasses";
    selectList.className = "form-control";
    el2[2].appendChild(selectList);

    for (let i = 0; i < this.props.saved_studentClasses.length; i++) {
        let option = document.createElement("option");
        option.value = this.props.saved_studentClasses[i].description;
        option.text = this.props.saved_studentClasses[i].description;
        selectList.appendChild(option);
    }

} //end if

};


beforeSaveStudentClassCell(row, cellName, cellValue) {
  // do your stuff...
  //call action for update

  let x = document.getElementById("studentClasses");
  let el = x.getElementsByClassName(" form-control editor edit-text")[2];
  let descBefore = el.getAttribute("value");
  this.props.updateClass(row, cellValue,descBefore);

}

afterSaveSaveStudentClassCell(row, cellName, cellValue) {
  // do your stuff...
}

//anonymoys function to use in setInterval

anon(data, refreshIntervalId){

     if (typeof data == 'undefined' || data.length == 0 ){

      console.log("waiting for classes data");

     } else if (data.length > 0 ){
       clearInterval(refreshIntervalId);
       //debugger;
       //rerender
       this.props.loadingHandling(1);
     }
};

render () {
    

    const data = this.props.saved_studentClasses;
    //console.log(data);


    const cellEditProp = {
      mode: 'click',
      beforeSaveCell: this.beforeSaveStudentClassCell.bind(this),
      afterSaveCell: this.afterSaveSaveStudentClassCell.bind(this)
    };
    const options = {
      afterInsertRow: onAfterInsertRow.bind(this),   // A hook for after insert rows
      afterDeleteRow: onAfterDeleteRow.bind(this)  // A hook for after droping rows.
    };

    //wait for data to be retrieved from fdatabase

    let refreshIntervalId = setInterval( ()=> { 
        this.anon(this.props.saved_studentClasses, refreshIntervalId)

    } , waitForData);
    //debugger;

    for (let j=0; j<data.length; j++){ 
       for (var key in this.props.classesPair) {
          if (this.props.classesPair.hasOwnProperty(key)) {

            if(data[j].description == key) {
              
              data[j].subClassDescription = this.props.classesPair[key].description;
              //console.log(key + " -> " + parent.classesPair[key]);
            }
          }
      }
    }
    if((typeof this.props.selectedTab === 'undefined' || this.props.selectedTab == "tab2") 
      && typeof data !== 'undefined'
      && data.length > 0){  
      //this.props.loadingHandlingCommplete = 0;
      //console.log("End of async calls");
      //debugger;

     return (
      <div id="studentClasses" >
          <BootstrapTable  data={data} cellEdit={cellEditProp} selectRow={selectRowProp} hover={true} insertRow={true} deleteRow={true} options={options}>
            <TableHeaderColumn dataField="index" isKey={true} dataSort={true} editable={false} >id</TableHeaderColumn>
            <TableHeaderColumn dataField="description" dataAlign="center" dataSort={true} pagination>Description</TableHeaderColumn>
            <TableHeaderColumn dataField="subClassDescription" dataAlign="center" dataSort={true} pagination>Subclass</TableHeaderColumn>
          </BootstrapTable>
      </div>
    );

    }

  else {
      //loadedPaymReg = 0; //reset
      return (

        <div>
            <div className="loader"></div>
        </div>
      )

  }

  }
}

export default connect(state => state, actions)(StudentClassesDataTable);