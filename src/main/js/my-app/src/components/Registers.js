import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import { Link } from 'react-router';
// import logo from '../logo.svg';
import '../css/App.css';
import '../css/App.css';
import {Table, Column, Cell} from 'fixed-data-table';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const dataRegisters = [];
parent.studentIndexWithRegistrations = [];

function afterSearch (searchText, result){
  // console.log('Your search text is ' + searchText);
  // console.log('Result is:');
  // for (let i = 0; i < result.length; i++) {
  //   console.log('Registers: ' + result[i].index + ', ' + result[i].fname + ', ' + result[i].lname
  //     +', '+result[i].phone +', ',result[i].dateOfBirth+ ', ' + result[i].email + ', ' + result[i].facebook);
  // }
}

function onAfterInsertRow (row) {
  // let newRowStr = '';
  // let payment = document.getElementById("mySelectPaymentRegisters").value;
  // let classReg = document.getElementById("mySelectClassesPaymentRegisters").value;

  // row.payment = payment;
  // row.class = classReg;
  // for (const prop in row) {
  //   //debugger;
  //   newRowStr += prop + ': ' + row[prop] + ' \n';
  // }
  // //debugger;
  // alert('The new row is:\n ' + newRowStr);
  // console.log("insert data to database");
  // debugger;
  // this.props.addPaymentRegisters(row);

}

function onAfterDeleteRow (rowKeys) {

  // alert('The rowkey you drop: ' + rowKeys);
  // console.log("delete data from database");
  // this.props.deletePaymentRegisters(rowKeys);

}

// If you want to enable deleteRow, you must enable row selection also.
const selectRowProp = {
  mode: 'checkbox'
};


class Registers extends Component {

componentDidUpdate(){

}

componentDidMount(){

  let el = document.getElementById("dotsRegisters");
  if (el !== null) {
    // do stuff
    console.log(el);
    setInterval(function () {el.innerHTML = el.innerHTML + ".";  }, 75);
  }

  //const registers = this.props.saved_registers;
  const students = this.props.saved_student;
  //debugger;

  for(let jj=0; jj<students.length;jj++){
  	//synchronous calls.......... 
    //get data of registered students

      let url = students[jj]._links.student.href;
      //debugger;
      //Get id for register
      let ar = url.split("/");
      let s = ar.length;
      let id = ar[s - 1];
      let request1 = new XMLHttpRequest();
      request1.open('GET', url, false);  // `false` makes the request synchronous
      request1.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
      request1.setRequestHeader("Content-type", "application/json");
      request1.contentType = "application/json"
      request1.send(null);

      if (request1.status === 200) {

        console.log(JSON.parse(request1.responseText));

     	//2nd sync call
    	//get registrations of all students
    	//let url2 = students[jj]._links.self.href;
    	let url2 = parent.BASE_URL +"/api/registers/search/findByStudent?student="+students[jj]._links.self.href;
    	//debugger;

    	//http://localhost:8181/api/registers/search/findByStudent?student=http://localhost:8181/api/students/136
        let request2 = new XMLHttpRequest();
        request2.open('GET', url2, false);  // `false` makes the request synchronous
        request2.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
        request2.setRequestHeader("Content-type", "application/json");
        request2.contentType = "application/json"
        request2.send(null);

        if (request2.status === 200) {
            //debugger;
            console.log("sync call 2:",JSON.parse(request2.responseText));
            let registrations = JSON.parse(request2.responseText);

            //if student has registers get the classes of registers
            if (registrations._embedded.registers.length > 0) {

            	console.log("student has registrations");
            	//for every registration get registered classes
            	for (let ww=0; ww<registrations._embedded.registers.length; ww++){
            	
            	let url3 = registrations._embedded.registers[ww]._links.studentClass.href;
            	//debugger;
            	//let url3 = parent.BASE_URL +"/api/registers/search/findByStudent?student="+students[jj]._links.self.href;

          		let request3 = new XMLHttpRequest();
  		        request3.open('GET', url3, false);  // 'false' makes the request synchronous
  		        request3.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
  		        request3.setRequestHeader("Content-type", "application/json");
  		        request3.contentType = "application/json"
  		        request3.send(null);

  		        if (request3.status === 200) {

  		        	 console.log("sync call 3:",JSON.parse(request3.responseText));
  		        	

  		        	 //save tempData

  		        	 let tempData ={};
                 tempData.fname = JSON.parse(request1.responseText).fname;
                 tempData.lname = JSON.parse(request1.responseText).lname;
                 tempData.email = JSON.parse(request1.responseText).email;
                 tempData.class = JSON.parse(request3.responseText).description;

                 let dateOfRegistration = new Date(registrations._embedded.registers[ww].dateOfRegistration);
                 //debugger;
                 let formatedDate = dateOfRegistration.toString().match(/... ... [0-9][0-9] [0-9][0-9][0-9][0-9](?!([0-9][0-9]:[0-9][0-9]:[0-9][0-9] GMT[+]0300 \(EEST\)))/g)[0];                 
                 tempData.dateOfRegistration = formatedDate;
                 tempData.index = dataRegisters.length+1;
                 dataRegisters.push(tempData);
                 //debugger;		
                 parent.studentIndexWithRegistrations.push(tempData.index); //save index of students with registrations

  		        }

            	}

            }
            else {

            	console.log("no registrations");

            	//save tempData

	        	  let tempData ={};
	            tempData.fname = JSON.parse(request1.responseText).fname;
	            tempData.lname = JSON.parse(request1.responseText).lname;
	            tempData.email = JSON.parse(request1.responseText).email;
	            tempData.class = "No registered classes";

	            //let dateOfRegistration = new Date(registrations._embedded.registers[ww].dateOfRegistration);
	            //debugger;
	            //let formatedDate = dateOfRegistration.toString().match(/... ... [0-9][0-9] [0-9][0-9][0-9][0-9](?!([0-9][0-9]:[0-9][0-9]:[0-9][0-9] GMT[+]0300 \(EEST\)))/g)[0];                 
	            tempData.dateOfRegistration = "No date of registration";
	            tempData.index = dataRegisters.length+1;
	            dataRegisters.push(tempData);
            	
            }

        }
    }


  }

  //debugger;
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

//debugger;

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

  // do your stuff...
  //call action for update
  //this.props.updateClass(row, cellValue);

  // let x = document.getElementById("PaymentRegisters");
  // let el = x.getElementsByClassName('form-group');

  
  //this.props.updatePaymentRegisters(row, cellValue,descBefore);
  //debugger;

}


render () {


 const cellEditProp = {
      mode: 'click',
      beforeSaveCell: this.beforeSaveRegistersCell.bind(this),
      afterSaveCell: this.afterSaveRegistersCell.bind(this)
    };

    const options = {
      afterSearch: afterSearch,           // define a after search hook
      afterInsertRow: onAfterInsertRow,   // A hook for after insert rows
      afterDeleteRow: onAfterDeleteRow  // A hook for after droping rows.
    };

    const paymentTypes = ["true", "false"];
    //debugger;

    const availableClasses = [];
    for (let i=0;i<this.props.saved_studentClasses.length;i++){
        availableClasses.push(this.props.saved_studentClasses[i].description)
    }
    console.log("dataRegisters:",dataRegisters);


    /*

		        tempData.fname = JSON.parse(request1.responseText).fname;
	            tempData.lname = JSON.parse(request1.responseText).lname;
	            tempData.email = JSON.parse(request1.responseText).email;
	            tempData.class = "no registrations";
	            //let dateOfRegistration = new Date(registrations._embedded.registers[ww].dateOfRegistration);
	            //debugger;
	            //let formatedDate = dateOfRegistration.toString().match(/... ... [0-9][0-9] [0-9][0-9][0-9][0-9](?!([0-9][0-9]:[0-9][0-9]:[0-9][0-9] GMT[+]0300 \(EEST\)))/g)[0];                 
	            tempData.dateOfRegistration = "no registrations";
	            tempData.index = dataRegisters.length+1;


    */
    //debugger;
    if(dataRegisters.length>0){
    	//debugger;
	    return (
	      <div id="registers">
		      <BootstrapTable
	          cellEdit={cellEditProp} 
	          data={dataRegisters} 
	          hover={true} 

	          selectRow={ selectRowProp }
	          exportCSV={true}
	          search={ true }
	          options={ options }
	          tableHeaderClass='payments-registers-header-class'
	          tableBodyClass='payments-registers-body-class'
	          >
	          <TableHeaderColumn dataField="index" editable={ false } isKey={true} dataSort={true}>id</TableHeaderColumn>
	          <TableHeaderColumn dataField="fname" editable={ false } dataAlign="center" dataSort={true} pagination>Name</TableHeaderColumn>
	          <TableHeaderColumn dataField="lname" editable={ false } >Last Name</TableHeaderColumn>
	          <TableHeaderColumn dataField="email" editable={ false } >E-mail</TableHeaderColumn>
	          <TableHeaderColumn dataField="class" editable={ { type: 'select', options: { values: availableClasses } } } >Class</TableHeaderColumn>
	          <TableHeaderColumn 
	            dataField="dateOfRegistration" 
	            dataAlign="left" 
	            dataSort={false}
	            editable={ { type: 'datetime' } }
	          />
	        </BootstrapTable>
	      </div>
	     )
	} else{
	    return (
	      <div>
	            <p className="loadingText"> Please wait while getting data from database <span id="dotsRegisters"></span> </p>
	      </div>
	    )
    }
  }
}

export default connect(state => state, actions)(Registers);