import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import { Link } from 'react-router';

import '../css/App.css';
import '../css/App.css';
import {Table, Column, Cell} from 'fixed-data-table';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Spinner from 'react-spinner-children';
var flagRMount = false;

const dataRegisters = [];
parent.studentIndexWithRegistrations = [];

function afterSearch (searchText, result){

}

function onAfterInsertRow (row) {


}

function onAfterDeleteRow (rowKeys) {

  //console.log("delete data from database");

  this.props.deleteRegisters(rowKeys[0]);

}

// If you want to enable deleteRow, you must enable row selection also.
const selectRowProp = {
  mode: 'checkbox'
};


class Registers extends Component {

constructor(props) {
    super(props);
    this.state = {
      ...props
    }
}


componentWillMount(){
  //debugger;
  //parent.loadedReg = 0;

}


componentDidMount(){
  //parent.loadedReg = false;
  const data = this.props.saved_registers;
  let el = document.getElementById("dotsRegisters");
  let d = new Date();
  let startTime = d.getTime();
  let endTime = d.getTime();
  let diffTime = endTime - startTime;
  let refreshIntervalId = "";
  let timeThreshold = 15000 ; //ms
  if (el !== null) {
  // do stuff

  //anonymoys function to use in setInterval
  let anon = function(data) {

      el.innerHTML = el.innerHTML + ".";  
      
      if (el.innerHTML == ".................................."){
        el.innerHTML = "";
      }
      d = new Date();
      endTime = d.getTime();
      diffTime = endTime - startTime;

      if (diffTime > timeThreshold && data.length == 0 ){

        clearInterval(refreshIntervalId);
        let msg = document.getElementById("loadingTextRegisters");
        msg.innerHTML = "No payments are saved in database"; 
        el.innerHTML = ""; 
      } else if (diffTime > timeThreshold && data.length > 0 ){
        clearInterval(refreshIntervalId);
      }
    };

  refreshIntervalId = setInterval( function() { anon(data)} , 100);

  }
  //const registers = this.props.saved_registers;
  const students = this.props.saved_student;


  for(let jj=0; jj<students.length;jj++){
  	//synchronous calls.......... 
    //get data of registered students

      let url = students[jj]._links.student.href;

      //Get id for register
      let ar = url.split("/");
      let s = ar.length;
      let id = ar[s - 1];
      // let request1 = new XMLHttpRequest();
      // request1.open('GET', url, false);  // `false` makes the request synchronous
      // request1.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
      // request1.setRequestHeader("Content-type", "application/json");
      // request1.contentType = "application/json"
      // request1.send(null);
      const fetch1 = fetch(url, {
                    method: 'get',
                    mode: 'cors',
                    cache: 'default',
                    headers: {
                        'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                        'Content-Type': 'application/json'
                    }
            })
      .then(res1 => res1.json())
      .then(res1 => {
      //if (request1.status === 200) {

        //console.log(JSON.parse(request1.responseText));

     	//2nd sync call
    	//get registrations of all students

    	let url2 = parent.BASE_URL +"/api/registers/search/findByStudent?student="+students[jj]._links.self.href;


    	//http://localhost:8181/api/registers/search/findByStudent?student=http://localhost:8181/api/students/136
        // let request2 = new XMLHttpRequest();
        // request2.open('GET', url2, false);  // `false` makes the request synchronous
        // request2.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
        // request2.setRequestHeader("Content-type", "application/json");
        // request2.contentType = "application/json"
        // request2.send(null);

        // if (request2.status === 200) {
          const fetch2 = fetch(url2, {
                        method: 'get',
                        mode: 'cors',
                        cache: 'default',
                        headers: {
                            'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                            'Content-Type': 'application/json'
                        }
                })
          .then(res2 => res2.json())
          .then(res2 => {
            //console.log("sync call 2:",JSON.parse(request2.responseText));
            let registrations = res2;//JSON.parse(request2.responseText);

            //if student has registers get the classes of registers
            if (registrations._embedded.registers.length > 0) {

            	//console.log("student has registrations");
            	//for every registration get registered classes
            	for (let ww=0; ww<registrations._embedded.registers.length; ww++){
            	
            	let url3 = registrations._embedded.registers[ww]._links.studentClass.href;

            	//let url3 = parent.BASE_URL +"/api/registers/search/findByStudent?student="+students[jj]._links.self.href;

          		// let request3 = new XMLHttpRequest();
  		        // request3.open('GET', url3, false);  // 'false' makes the request synchronous
  		        // request3.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
  		        // request3.setRequestHeader("Content-type", "application/json");
  		        // request3.contentType = "application/json"
  		        // request3.send(null);

  		        // if (request3.status === 200) {
                const fetch23= fetch(url3, {
                              method: 'get',
                              mode: 'cors',
                              cache: 'default',
                              headers: {
                                  'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                                  'Content-Type': 'application/json'
                              }
                      })
                .then(res3 => res3.json())
                .then(res3 => {
  		        	 //console.log("sync call 3:",JSON.parse(request3.responseText));
  		        	
  		        	 //save tempData

  		        	 let tempData ={};
                 // tempData.fname = JSON.parse(request1.responseText).fname;
                 // tempData.lname = JSON.parse(request1.responseText).lname;
                 // tempData.email = JSON.parse(request1.responseText).email;
                 tempData.fname = res1.fname;
                 tempData.lname = res1.lname;
                 tempData.email = res1.email;

                 tempData.class = res3.description;//JSON.parse(request3.responseText).description;

                 let dateOfRegistration = new Date(registrations._embedded.registers[ww].dateOfRegistration);

                 let formatedDate = dateOfRegistration.toString().match(/... ... [0-9][0-9] [0-9][0-9][0-9][0-9](?!([0-9][0-9]:[0-9][0-9]:[0-9][0-9] GMT[+]0300 \(EEST\)))/g)[0];                 
                 tempData.dateOfRegistration = formatedDate;
                 tempData.index = dataRegisters.length+1;
                 dataRegisters.push(tempData);
                 parent.studentIndexWithRegistrations.push(tempData.index); //save index of students with registrations
                 //debugger;
                 parent.loadedReg = true;
  		        })

            	}

            }
            else {

            	//console.log("no registrations");

            	//save tempData

	        	  let tempData ={};
	            // tempData.fname = JSON.parse(request1.responseText).fname;
	            // tempData.lname = JSON.parse(request1.responseText).lname;
	            // tempData.email = JSON.parse(request1.responseText).email;
              tempData.fname = res1.fname;
              tempData.lname = res1.lname;
              tempData.email = res1.email;
	            tempData.class = "No registered classes";

	            //let formatedDate = dateOfRegistration.toString().match(/... ... [0-9][0-9] [0-9][0-9][0-9][0-9](?!([0-9][0-9]:[0-9][0-9]:[0-9][0-9] GMT[+]0300 \(EEST\)))/g)[0];                 
	            tempData.dateOfRegistration = "No date of registration";
	            tempData.index = dataRegisters.length+1;
	            dataRegisters.push(tempData);
            	
            }

        })
    })

  }
 //debugger;
   this.setState({
      flagRegisterMount:true
    });
}

afterSaveRegistersCell(row, cellName, cellValue) {



let studentHasRegistrations = false;
//get index of row

//check if row.index has a registration already. If it has then action is update. Otherwise action is update

for (let jj=0; jj<parent.studentIndexWithRegistrations.length; jj++){

  if (parent.studentIndexWithRegistrations[jj] == row.index) {

    studentHasRegistrations = true;

  }
}



if (!studentHasRegistrations) {
 
    if (row.dateOfRegistration !="No date of registration" && row.class == "No registered classes"){

      alert("Please give class input");

    } else if (row.dateOfRegistration =="No date of registration" && row.class != "No registered classes"){

      alert("Please give date of registration input");

    }  else{

      alert("create registers........");
      this.props.createRegisters(row);
    }
}

else {

      alert("Update registrations");
      this.props.updateRegisters(row);

}
  


}

beforeSaveRegistersCell(row, cellName, cellValue) {

}


render () {
parent.loadedReg = true;
    const isLoaded = false;
    const customSpinConfig = {
      lines: 10,
    };

 const cellEditProp = {
      mode: 'click',
      beforeSaveCell: this.beforeSaveRegistersCell.bind(this),
      afterSaveCell: this.afterSaveRegistersCell.bind(this)
    };

    const options = {
      afterSearch: afterSearch,           // define a after search hook
      afterInsertRow: onAfterInsertRow,   // A hook for after insert rows
      afterDeleteRow: onAfterDeleteRow.bind(this)  // A hook for after droping rows.
    };

    const paymentTypes = ["true", "false"];


    const availableClasses = [];
    for (let i=0;i<this.props.saved_studentClasses.length;i++){
        availableClasses.push(this.props.saved_studentClasses[i].description)
    }
    console.log("dataRegisters:",dataRegisters);
    //debugger;
    // if(dataRegisters.length>0){
    //
    if((typeof this.props.selectedTab === 'undefined' || this.props.selectedTab == "tab4")){
      //debugger;
      //this.props.loadingHandling(1);
	    return (
	      <div id="registers">
		      <BootstrapTable
	          cellEdit={cellEditProp} 
	          data={dataRegisters} 
	          hover={true} 
            deleteRow={true} 
	          selectRow={ selectRowProp }
	          exportCSV={true}
	          search={ true }
	          options={ options }
	          tableHeaderClass='payments-registers-header-class'
	          tableBodyClass='payments-registers-body-class'
	          >
	          <TableHeaderColumn dataField="index" editable={ false } isKey={true} dataSort={true}>id</TableHeaderColumn>
	          <TableHeaderColumn dataField="fname" editable={ false } dataSort={true} pagination>Name</TableHeaderColumn>
	          <TableHeaderColumn dataField="lname" editable={ false } >Last Name</TableHeaderColumn>
	          <TableHeaderColumn dataField="email" editable={ false } >E-mail</TableHeaderColumn>
	          <TableHeaderColumn dataField="class" editable={ { type: 'select', options: { values: availableClasses } } } >Class</TableHeaderColumn>
	          <TableHeaderColumn 
	            dataField="dateOfRegistration" 
	            dataAlign="left" 
	            dataSort={false}
	            editable={ { type: 'datetime' } }
	          > Date Of Registration
             </TableHeaderColumn>
	        </BootstrapTable>
	      </div>
      
	     )
	} 
  else{
    //this.props.loadingHandling(0);
	    return (
	      <div>
	          <div className="loader"></div>
	      </div>
	    )
    }
  }
}

export default connect(state => state, actions)(Registers);