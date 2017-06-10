import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as actions from '../actions/';

const waitForData = 7000; // msecs
const paymentTypes = ['true', 'false'];

function onAfterInsertRow (row) {
  // this.props.addPaymentRegisters("addPayment", row);
}
function onBeforeInsertRow (row) {
  document.getElementsByClassName('modal fade bs-table-modal-sm8 in')[0].style.display = 'block';
  // this.props.addPaymentRegisters(row);
}
function onAfterDeleteRow (rowKeys) {
  this.props.deletePaymentRegisters(rowKeys);
}

// If you want to enable deleteRow, you must enable row selection also.
const selectRowProp = {
  mode: 'checkbox',
  columnWidth: '30px',
};

function formatSelectOptionClasses () {
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

class InsertPaymentRegistersModal extends React.Component {

  handleSaveBtnClick = () => {
    const { columns, onSave, updatePaymentRegisters } = this.props;
    const newRow = {};
    columns.forEach((column) => {
      newRow[column.field] = this.refs[column.field].value;
    }, this);
    // You should call onSave function and give the new row
    updatePaymentRegisters(newRow, 'addPayment');
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
        <h2 style={{ color: '#fff', marginLeft: '10px' }}>Προσθήκη πληρωμής</h2>
        <div className="container-fluid">
          {
            columns.map((column, i) => {
              const {
                field,
                name,
                hiddenOnInsert,
              } = column;

              if (hiddenOnInsert) {
                // when you want same auto generate value
                // and not allow edit, for example ID field
                return null;
              }
              // debugger;
              // console.log("log:", column);
              const error = validateState[field] ? (<span className="help-block bg-danger">{ validateState[field] }</span>) : null;
              // debugger;
              if (field === 'fname') {
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
                    <label>Επίθετο</label>
                    <select ref={field} className="form-control">
                      {
                         parent.students.map((el, i) => <option key={i} value={el.lname}>{el.lname}</option>)
                       }
                    </select>
                    { error }
                  </div>);
              } else if (field === 'payment') {
                return (
                  <div className="form-group col-xs-6" key={field}>
                    <label>Πληρωμή</label>
                    <select ref={field} className="form-control">
                      {
                         paymentTypes.map((el, i) =>
                          // debugger;
                           <option key={i} value={el}>{el}</option>)
                       }
                    </select>
                    { error }
                  </div>);
              } else if (field === 'notes') {
                return (
                  <div className="form-group col-xs-6" key={field}>
                    <label >Σημειώσεις</label>
                    <input ref={field} className="form-control" type="text" defaultValue={''} />
                    { error }
                  </div>);
              } else if (field === 'class') {
                const html_ = formatSelectOptionClasses();
                return (
                  <div className="form-group col-xs-6" key={field}>
                    <label>Τάξη</label>
                    <select ref={field} className="form-control">
                      {
                          parent.studentClasses.map((el, i) => <option key={i} value={el.description}>{el.description}</option>)
                        }
                    </select>
                    { error }
                  </div>);
              } else if (field === 'dateOfPayment') {
                return (
                  <div className="form-group col-xs-6" key={field}>
                    <label>Ημερομηνία πληρωμής</label>
                    <input ref={field} className="form-control" type="date" defaultValue={''} />
                    { error }
                  </div>);
              } else {
                return (
                  <div className="form-group col-xs-6" key={field}>
                    <label>{ name }</label>
                    <input ref={field} className="form-control" defaultValue={parent.payeds.length + 1} />
                    { error }
                  </div>);
              }
            })
          }
        </div>
        <div>
          <button style={{ marginLeft: '30px' }} className="btn btn-danger" onClick={onModalClose}>Έξοδος</button>
          <button style={{ marginLeft: '15px' }} className="btn btn-danger" onClick={() => this.handleSaveBtnClick(columns, onSave)}>Αποθήκευση</button>
        </div>
      </div>
    );
  }
}

class PaymentRegisters extends Component {

  componentWillMount () {
    const students = this.props.saved_student;
    this.props.dataPaymentsRegisters(students);
  }

  componentDidMount () {
  // debugger;
  // parent.loadedPaymReg = false;
    const x = document.getElementById('PaymentRegisters');

  // if (x!= null) {
  //   let rows = x.querySelectorAll('tr');
  //   let el2 = x.getElementsByClassName('form-group');
  //   //set id for classes in modal window

  //   el2[1].childNodes[1].value = rows.length-1;

  //   //add date element in modal window
  //   el2[7].childNodes[1].type="date";
  // }
    const data = this.props.saved_payeds;
  }
  afterSavePaymentRegistersCell (row, cellName, cellValue) {
  // do your stuff...

    const x = document.getElementById('PaymentRegisters');
    const y = x.getElementsByClassName('react-bs-container-body');
    let updateMode = '';

    let el;
    let cellIndex;
    if (y[0].querySelector('select') !== null) {
      el = y[0].querySelector('select')[0];
      cellIndex = el.parentElement.parentElement.cellIndex;
    } else if (y[0].getElementsByClassName('form-control editor edit-text')[0] !== null) {
      el = y[0].getElementsByClassName('form-control editor edit-text')[0];
      cellIndex = el.parentElement.cellIndex;
    } else if (y[0].getElementsByClassName('form-control editor edit-datetime')[0] !== null) {
      el = y[0].getElementsByClassName('form-control editor edit-datetime')[0];
      cellIndex = el.parentElement.cellIndex;
    }
  // console.log(el);

    if (cellIndex === 4) {
      updateMode = 'paymentUpdate';
    } else if (cellIndex === 5) {
      updateMode = 'paymentNotesUpdate';
    } else if (cellIndex === 6) {
      updateMode = 'classUpdate';
    } else if (cellIndex === 7) {
      updateMode = 'updateDateOfPayment';
    }
    const descBefore = el.getAttribute('value');
    this.props.updatePaymentRegisters(row, updateMode);
  }

// anon(data, refreshIntervalId){
  anon (data) {
    if (typeof data == 'undefined' || data.length == 0) {
      console.log('waiting for payments registers data');
    } else if (data.length > 0) {
       // debugger;
       // clearInterval(refreshIntervalId);
       // rerender
      if (!this.props.loadingHandlingCommplete) {this.props.loadingHandling(1);}
    }
  }

  createInsertPaymentRegistersModal (onModalClose, onSave, columns, validateState, ignoreEditable) {
    const updatePaymentRegisters = this.props.updatePaymentRegisters;
    const attr = {
      onModalClose, onSave, columns, validateState, ignoreEditable, updatePaymentRegisters,
    };
    return (
      <InsertPaymentRegistersModal {... attr} />
    );
  }

  render () {
    const cellEditProp = {
      mode: 'click',
      afterSaveCell: this.afterSavePaymentRegistersCell.bind(this),
    };

    const options = {
      noDataText: 'There are no data loaded yet',
      insertModal: this.createInsertPaymentRegistersModal.bind(this),
      beforeInsertRow: onBeforeInsertRow.bind(this),   // A hook for after insert rows
      afterInsertRow: onAfterInsertRow.bind(this),   // A hook for after insert rows
      afterDeleteRow: onAfterDeleteRow.bind(this),  // A hook for after droping rows.
    };

    // console.log("log paym registers:",this.props.dataPaymentsRegistersLoaded);
    // if(dataPaymentRegisters.length>0){
    // let refreshIntervalId = setInterval( ()=> {
    if ((typeof this.props.selectedTab === 'undefined' || this.props.selectedTab == 'tab1')) {
      setTimeout(() => {
        this.anon(this.props.dataPaymentsRegistersLoaded);
      }, waitForData);
    }

    if (1 || (typeof this.props.selectedTab === 'undefined' || this.props.selectedTab == 'tab1')
        && typeof this.props.dataPaymentsRegistersLoaded !== 'undefined'
        && this.props.dataPaymentsRegistersLoaded.length > 0) {
      const fnames = [];
      const lnames = [];
      for (let i = 0; i < this.props.saved_student.length; i++) {
        fnames.push(this.props.saved_student[i].fname);
        lnames.push(this.props.saved_student[i].lname);
      }

      const availableClasses = [];
      for (let i = 0; i < this.props.saved_studentClasses.length; i++) {
        availableClasses.push(this.props.saved_studentClasses[i].description);
      }

    // check if data has loaded
    // i can set hidden={true} in one cell in order to hide it. it can be useful if i don't
    // want increasing number to be displayed. For now it is not used
    // debugger;
      return (
        <div id="PaymentRegisters">
          <div className="loader payments" />
          <BootstrapTable
            cellEdit={cellEditProp}
            data={this.props.dataPaymentsRegistersLoaded}
            hover
            deleteRow
            selectRow={selectRowProp}
            insertRow
            exportCSV
            search
            options={options}
            tableHeaderClass="payments-registers-header-class"
            tableBodyClass="payments-registers-body-class"
            condensed>
            <TableHeaderColumn
              dataField="index"
              editable={false}
              isKey width="5%">id
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="fname"
              editable={false}
              width="20%"
              dataSort>Name
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="lname"
              editable={false}
              width="20%"
              dataSort>Last Name
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="payment"
              editable={{ type: 'select', options: { values: paymentTypes } }}>Payment
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="notes" >Notes
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="class"
              width="15%"
              editable={false} >Class
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="dateOfPayment"
              dataAlign="left"
              dataSort={false}
              editable={{ type: 'datetime' }}
              width="20%">
            Date Of Payment
          </TableHeaderColumn>
          </BootstrapTable>
        </div>
      );
    } else {
      return (
        <div>
          <div className="loader" />
        </div>

      );
    }
  }
}

export default connect(state => state, actions)(PaymentRegisters);
