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
  let newRowStr = '';

  for (const prop in row) {
    newRowStr += prop + ': ' + row[prop] + ' \n';
  }
  alert('The new row is:\n ' + newRowStr);
  //debugger;
  console.log("insert data to database",this.props);
  this.props.saveNewClass(row);
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
          <BootstrapTable data={data} hover={true} deleteRow={ true } cellEdit={ cellEditProp } insertRow={ true } selectRow={ selectRowProp } options={ options }>
            <TableHeaderColumn dataField="index" isKey={true} dataSort={true}>id</TableHeaderColumn>
            <TableHeaderColumn dataField="description" dataAlign="center" dataSort={true} pagination>Description</TableHeaderColumn>
            <TableHeaderColumn dataField="subClassDescription" dataAlign="center" dataSort={true} pagination>Subclass</TableHeaderColumn>
          </BootstrapTable>
      </div>
    );
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

    //options.that = this;

    //wait for async calls to fill all parentPairs
    //while()
    // Get the size of an object
    //var size = Object.size(parent.classesPair);

    // while(size<data.length){
    //   console.log("Waiting for async calls......");
    //   size = Object.size(parent.classesPair);
    //   debugger;
    // }
    // console.log("All async calls ended");
    //debugger;


  }
}

export default connect(state => state, actions)(StudentClassesDataTable);