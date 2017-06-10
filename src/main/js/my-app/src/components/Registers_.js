import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { connect } from 'react-redux';
import * as actions from '../actions/';

parent.studentIndexWithRegistrations = [];

function onAfterDeleteRow (rowKeys) {
  this.props.deleteRegisters(rowKeys[0]);
}

// If you want to enable deleteRow, you must enable row selection also.
const selectRowProp = {
  mode: 'checkbox',
};
const paymentTypes = ['true', 'false'];

function formatSelectOptionregisters () {
  let html = '';
  // get parent.StudentClasses and return html string to render it in return function
  // html += `<select className="form-control">`;
  // </select>
  for (let i = 0; i < parent.studentClasses.length; i++) {
    // debugger;
    html += `<option value="${parent.studentClasses[i].description}">${parent.studentClasses[i].description}</option>`;
  }
  // html += `</select>`;
  return { __html: html };
}

class InsertRegistersModal extends React.Component {

  handleSaveBtnClick = () => {
    const {
      columns,
      onSave,
      addRegisters,
    } = this.props;
    const newRow = {};
    columns.forEach(column => {
      newRow[column.field] = this.refs[column.field].value;
    }, this);
    // You should call onSave function and give the new row
    addRegisters(newRow);
    // onSave(newRow);
  }
  render () {
    const {
      onModalClose,
      onSave,
      columns,
      validateState,
      ignoreEditable,
      addStudent,
    } = this.props;
    return (
      <div style={{ backgroundColor: '#4c2727' }} className="modal-content">
        <h2 style={{ color: '#fff', marginLeft: '10px' }}>Προσθήκη εγγραφής</h2>
        <div className="container-fluid">
          {
            columns.map((column) => {
              const {
                field,
                hiddenOnInsert,
              } = column;

              if (hiddenOnInsert) {
                // when you want same auto generate value
                // and not allow edit, for example ID field
                return null;
              }
              // debugger;
              console.log('log:', column);
              const error = validateState[field] ? (<span className="help-block bg-danger">{ validateState[field] }</span>) : null;
              // debugger;
              if (field === 'index') {
                return (
                  <div className="form-group col-xs-6" key={field}>
                    <label>ID</label>
                    <input
                      ref={field}
                      className="form-control"
                      defaultValue={parent.registers.length + 1} />
                    { error }
                  </div>);
              } else if (field === 'fname') {
                return (
                  <div className="form-group col-xs-6" key={field}>
                    <label>Όνομα</label>
                    <select ref={field} className="form-control">
                      {
                      parent.students.map((el, i) => <option key={i} value={el.fname}>{el.fname}</option>)
                    }
                    </select>
                    { error }
                  </div>);
              } else if (field === 'lname') {
                return (
                  <div className="form-group col-xs-6" key={field}>
                    <label >Επίθετο</label>
                    <select ref={field} className="form-control">
                      {
                      parent.students.map((el, i) => <option key={i} value={el.lname}>{el.lname}</option>)
                    }
                    </select>
                    { error }
                  </div>);
              } else if (field === 'email') {
                return (
                  <div className="form-group col-xs-6" key={field}>
                    <label >Email</label>
                    <input
                      ref={field}
                      className="form-control"
                      type="email"
                      defaultValue={''} />
                    { error }
                  </div>);
              } else if (field === 'class') {
                return (
                  <div className="form-group col-xs-6" key={field}>
                    <label >Τάξη</label>
                    <select ref={field} className="form-control">
                      {
                      parent.studentClasses.map((el, i) => {
                        if (el.description !== 'No subclass') {
                          return <option key={i} value={el.description}>{el.description}</option>;
                        }
                      })
                    }
                    </select>
                    { error }
                  </div>);
              } else if (field === 'dateOfRegistration') {
                return (
                  <div className="form-group col-xs-6" key={field}>
                    <label >Ημερομηνία εγγραφής</label>
                    <input
                      ref={field}
                      className="form-control"
                      type="date"
                      defaultValue={''} />
                    { error }
                  </div>);
              }
            })
          }
        </div>
        <div>
          <button
            style={{ marginLeft: '30px' }}
            className="btn btn-danger"
            onClick={onModalClose}>Έξοδος
          </button>
          <button
            style={{ marginLeft: '15px' }}
            className="btn btn-danger"
            onClick={() => this.handleSaveBtnClick(columns, onSave)}>Αποθήκευση
          </button>
        </div>
      </div>
    );
  }
}

class Registers extends Component {

  constructor (props) {
    super(props);
    this.state = {
      ...props,
    };
    // debugger;
  }

  componentWillMount () {
    //const students = this.props.saved_student;
    this.props.dataRegisters();
    // debugger;
  }
  afterSaveRegistersCell (row) {
    let studentHasRegistrations = false;
  // get index of row
  // check if row.index has a registration already. If it has then action is update. Otherwise action is update
    for (let jj = 0; jj < parent.studentIndexWithRegistrations.length; jj++) {
      if (parent.studentIndexWithRegistrations[jj] === row.index) {
        studentHasRegistrations = true;
      }
    }
    if (!studentHasRegistrations) {
      if (row.dateOfRegistration !== 'No date of registration' && row.class === 'No registered classes') {
        alert('Please give class input');
      } else if (row.dateOfRegistration === 'No date of registration' && row.class !== 'No registered classes') {
        alert('Please give date of registration input');
      } else {
        alert('create registers........');
        this.props.createRegisters(row);
      }
    } else {
      alert('Update registrations');
      this.props.updateRegisters(row);
    }
  }

  // anon(data, refreshIntervalId){
  // anon (data) {
  //   if (typeof data == 'undefined' || data.length == 0) {
  //     console.log('waiting for registers data');
  //   } else if (data.length > 0) {
  //     if (!this.props.loadingHandlingCommplete) {this.props.loadingHandling(1);}
  //   }
  // }
  createInsertRegistersModal (onModalClose, onSave, columns, validateState, ignoreEditable) {
    const addRegisters = this.props.addRegisters;
    const attr = {
      onModalClose, onSave, columns, validateState, ignoreEditable, addRegisters,
    };
    return (
      <InsertRegistersModal {... attr} />
    );
  }

  render () {
    //debugger;
    parent.loadedReg = true;
    const cellEditProp = {
      mode: 'click',
      afterSaveCell: this.afterSaveRegistersCell.bind(this),
    };

    const options = {
      noDataText: 'There are no data loaded yet',
      afterDeleteRow: onAfterDeleteRow.bind(this),  // A hook for after droping rows.
    };

    const availableClasses = [];
 /*   for (let i = 0; i < this.props.saved_studentClasses.length; i++) {
      availableClasses.push(this.props.saved_studentClasses[i].description);
    }
*/
    if (1) {
	    return (
  <div id="registers">
    <div className="loader registers" />
    <BootstrapTable
      cellEdit={cellEditProp}
      data={this.props.dataRegistersLoaded}
      hover
      deleteRow
      selectRow={selectRowProp}
      exportCSV
      search
      options={options}
      tableHeaderClass="payments-registers-header-class"
      tableBodyClass="payments-registers-body-class">
      <TableHeaderColumn
        dataField="index"
        editable={false}
        isKey dataSort>id
      </TableHeaderColumn>
      <TableHeaderColumn
        dataField="fname"
        editable={false}
        dataSort pagination>Name
      </TableHeaderColumn>
      <TableHeaderColumn
        dataField="lname"
        editable={false} >Last Name
      </TableHeaderColumn>
      <TableHeaderColumn
        dataField="email"
        editable={false} >E-mail
      </TableHeaderColumn>
      <TableHeaderColumn
        dataField="class"
        editable={{ type: 'select', options: { values: availableClasses } }} >Class
      </TableHeaderColumn>
      <TableHeaderColumn
        dataField="dateOfRegistration"
        dataAlign="left"
        dataSort={false}
        editable={{ type: 'datetime' }}> Date Of Registration
      </TableHeaderColumn>
    </BootstrapTable>
  </div>);
    }
  }
}

export default connect(state => state, actions)(Registers);
