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
//import {MyCustomBody} from './MyCustomBody';

parent.classesPair = {};
parent.loaded=0;
function afterSearch (searchText, result){
  console.log('Your search text is ' + searchText);
  console.log('Result is:');
  for (let i = 0; i < result.length; i++) {
    console.log('StudentClass: ' + result[i].index + ', ' + result[i].description);
  }
}

function onAfterInsertRow(row) {
  //debugger;
  let selectedSubClass = document.getElementById("mySelect").value;
  let newRowStr = '';

  for (const prop in row) {
    newRowStr += prop + ': ' + row[prop] + ' \n';
  }
 
  debugger;
  console.log("insert data to database",this.props);
  row.subClassDescription = selectedSubClass;
  this.props.saveNewClass(row);
   alert('The new row is:\n ' + row.description + " "+row.subClassDescription);
}

function onAfterDeleteRow(rowKeys) {
  alert('The rowkey you drop: ' + rowKeys);
  console.log("delete data from database",this.props);
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

const cellEditProp = {
  mode: 'click',
  blurToSave: true
};



class StudentClassesDataTable extends Component {

componentDidUpdate(){

  //this.checkInterval();
  //check if checkPeriodInMinutes has passed
  let el = document.getElementsByClassName('form-control editor edit-text')[0];

  let rows = document.querySelectorAll('tr');

  let id = rows.length;

  //el.setAttribute('placeholder', id);
  el.value = rows.length;
  console.log("modal editing:",el);
  
  let el2 = document.getElementsByClassName('form-group');
  let childs = el2[2].childNodes;
  
  el2[2].removeChild(childs[1])
  let input = el2[2];

  //Create array of options to be added
  //let arrayOfOptions = ["Volvo","Saab","Mercades","Audi"];

  //Create and append select list
  let selectList = document.createElement("select");
  selectList.id = "mySelect";
  selectList.className = "form-control";
  el2[2].appendChild(selectList);
  //childs[1] = selectList;
  // form-control editor edit-text
  //Create and append the options
  //debugger;
  for (let i = 0; i < this.props.saved_studentClasses.length; i++) {
      let option = document.createElement("option");
      option.value = this.props.saved_studentClasses[i].description;
      option.text = this.props.saved_studentClasses[i].description;
      selectList.appendChild(option);
  }
  //debugger;
};

getSubClass(url, parentDesc, obj) {
  const fetch1 = 
  fetch(url, { 
     method: 'get', 
     mode: 'cors',
     cache: 'default',
     headers: {
       'Authorization': 'Basic '+btoa('myapos:Apostolakis1981'), 
       'Content-Type': 'application/json'
     }
   })
  .then (res => res.json())
  .then(res => { 
    
    console.log("data from server: ",res);
    parent.classesPair[parentDesc] = res;

  });
 
}

render () {
  
    //debugger;
    const data = this.props.saved_studentClasses;
    console.log(data);
    // onAfterInsertRow.bind(this);
    // onAfterDeleteRow.bind(this);


    const options = {
      afterInsertRow: onAfterInsertRow.bind(this),   // A hook for after insert rows
      afterDeleteRow: onAfterDeleteRow.bind(this)  // A hook for after droping rows.
    };

    //preprocess data
    data.map((obj, index)=>{
      //debugger;
      console.log("cur index:"+index);
      obj.index = (index+1);
      //what is happening when there are more subclasses??? i need to parse all subclasses!!!!

      obj.ManyToOne=obj._links.studentClass[1].href;
      this.getSubClass(obj.ManyToOne, obj.description, obj);
      //obj.subClassDescription = response.description;
      //debugger;
      //get description of subclass-- this description lives in obj.ManyToOne

    });
    //check if async calls ended
    //wait for data to be retrieved from database
    //setTimeout(function(){ console.log("wait for a while"); }, 3000);  
    console.log("size of pairs:",Object.size(parent.classesPair));
    if(Object.size(parent.classesPair)>0){

      console.log("End of async calls");
      parent.loaded=1; 
      //obj.classesPair = parent.classesPair;
      for (let j=0; j<data.length; j++){ 
         for (var key in parent.classesPair) {
            if (parent.classesPair.hasOwnProperty(key)) {

              if(data[j].description == key) {
                //debugger;
                data[j].subClassDescription = parent.classesPair[key].description;
                console.log(key + " -> " + parent.classesPair[key]);
              }
            }
        }
      }
     return (
      <div>
          <BootstrapTable data={data} cellEdit={cellEditProp} selectRow={selectRowProp} hover={true} insertRow={true} deleteRow={true} options={options}>
            <TableHeaderColumn dataField="index" isKey={true} dataSort={true}>id</TableHeaderColumn>
            <TableHeaderColumn dataField="description" dataAlign="center" dataSort={true} pagination>Description</TableHeaderColumn>
            <TableHeaderColumn dataField="subClassDescription" dataAlign="center" dataSort={true} pagination>Subclass</TableHeaderColumn>
          </BootstrapTable>
      </div>
    );

    debugger;

    }

    //restrict to only one refresh of the page flag window.performance.navigation.type will be one if page is refreshed

    if ((Object.size(parent.classesPair)==0)&&(window.performance.navigation.type==0)){

      setTimeout(function(){ 
        console.log("waited for 5s. Page is reloading"); 
        //window.location.reload(true);
        //parent.loaded==1;
        console.log("size of pairs:", Object.size(parent.classesPair)); 
        if(Object.size(parent.classesPair)>0){
          window.location.reload(true);
        }
    }, 5000);  
  }
    //debugger;
    return (
      <div>
        <p> Please wait while getting data from database........ </p>
      </div>
    )
  }
}

export default connect(state => state, actions)(StudentClassesDataTable);