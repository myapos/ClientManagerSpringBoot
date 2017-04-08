import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/';
import { Link } from 'react-router';
//import '../../css/App.css';
import {Table, Column, Cell} from 'fixed-data-table';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as api from '../../api';
//import MDSpinner from "react-md-spinner";

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

class InsertStudentClassesModal extends React.Component {

  handleSaveBtnClick = () => {
    const { columns, onSave, saveNewClass } = this.props;
    const newRow = {};
    columns.forEach((column, i) => {
      newRow[column.field] = this.refs[column.field].value;
    }, this);
    // You should call onSave function and give the new row
    saveNewClass(newRow);
    //onSave(newRow);
  }

  render() {

    const {
      onModalClose,
      onSave,
      columns,
      validateState,
      ignoreEditable,
      addStudent
    } = this.props;
    return (
      <div style={ { backgroundColor: '#4c2727' } } className='modal-content'>
        <h2 style={ { color: '#fff', marginLeft:'10px' } }>Προσθήκη Τάξης</h2>
        <div className='container-fluid'>
           {
            columns.map((column, i) => {
              const {
                editable,
                format,
                field,
                name,
                hiddenOnInsert
              } = column;

              if (hiddenOnInsert) {
                // when you want same auto generate value
                // and not allow edit, for example ID field
                return null;
              }
              console.log("log:", column);
              const error = validateState[field] ? (<span className='help-block bg-danger'>{ validateState[field] }</span>) : null;
              if(field === 'index'){
                return( 
                  <div className='form-group col-xs-6' key={ field }>
                    <label>ID</label>
                    <input ref={ field } className='form-control' defaultValue={ parent.studentClasses.length+1 } />
                    { error }
                   </div>);
               
              } else if(field === 'description'){
                  return( 
                    <div className='form-group col-xs-6' key={ field }>
                       <label>Τάξη</label>
                       <input ref={ field } className='form-control' defaultValue={ '' } />
                      { error }
                     </div>);
                 
              }  
              else if(field === 'subClassDescription'){
                  return( 
                    <div className='form-group col-xs-6' key={ field }>
                      <label>Υποτμήμα</label>

                      <select ref={ field } className="form-control"> 
                        <option value="No subclass">No subclass</option>
                       {
                         parent.studentClasses.map( (el, i) => {
                           return <option key={i} value={el.description}>{el.description}</option>
                         })
                       } 
                      </select>
                      { error }
                     </div>);
              }                         
            })
           }
        </div>
        <div>
          <button style={ { marginLeft:'30px' } } className='btn btn-danger' onClick={ onModalClose }>Έξοδος</button>
          <button style={ { marginLeft:'15px' } } className='btn btn-danger' onClick={ () => this.handleSaveBtnClick(columns, onSave) }>Αποθήκευση</button>
        </div>
      </div>
    );
  }
}
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

componentDidUpdate(){
  let x = document.getElementById("studentClasses");

  if (x!= null) {
    let rows = x.querySelectorAll('tr');
    let el = rows[1];
    let id = rows.length;
} //end if

};


beforeSaveStudentClassCell(row, cellName, cellValue) {
  // do your stuff...
  //call action for update

  let x = document.getElementById("studentClasses");
  //get the value before
  // let el = x.getElementsByClassName(" form-control editor edit-text")[2];
  // let descBefore = el.getAttribute("value");
   this.props.updateClass(row, cellValue);

}

//anonymoys function to use in setInterval

anon(data, refreshIntervalId){

     if (typeof data == 'undefined' || data.length == 0 ){

      console.log("waiting for classes data");

     } else if (data.length > 0 ){
       clearInterval(refreshIntervalId);
       //debugger;
       //rerender
       //this.props.loadingHandling(0);
     }
};
createInsertStudentClassesModal (onModalClose, onSave, columns, validateState, ignoreEditable) {
    const saveNewClass = this.props.saveNewClass;
    const attr = {
      onModalClose, onSave, columns, validateState, ignoreEditable, saveNewClass
    };
    return (
      <InsertStudentClassesModal { ... attr } />
    );
}

render () {
    

    const data = this.props.saved_studentClasses;
    //console.log(data);
    const cellEditProp = {
      mode: 'click',
      beforeSaveCell: this.beforeSaveStudentClassCell.bind(this),
      nonEditableRows: function() {
            // if product id less than 3, will cause the whole row noneditable
            // this function should return an array of row keys
            return data.filter(el => el.description === "No subclass").map(el => el.index);
          }
    };
    const options = {
      insertModal: this.createInsertStudentClassesModal.bind(this),
      afterInsertRow: onAfterInsertRow.bind(this),   // A hook for after insert rows
      afterDeleteRow: onAfterDeleteRow.bind(this)  // A hook for after droping rows.
    };

    //wait for data to be retrieved from fdatabase

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
    if((typeof this.props.selectedTab === 'undefined' || this.props.selectedTab == "tab4") 
      && typeof data !== 'undefined'
      && data.length > 0){  
      //this.props.loadingHandlingCommplete = 0;
      //console.log("End of async calls");
      //debugger;

     return (
      <div id="studentClasses" >
          <BootstrapTable  
          data={data} 
          cellEdit={cellEditProp} 
          selectRow={selectRowProp} 
          hover={true} 
          insertRow={true} 
          deleteRow={true} 
          options={options}
          trClassName="studentClassesRows">
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