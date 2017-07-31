import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import InsertPaymentRegistersModal from './InsertPaymentRegistersModal';
import * as actions from '../actions/';
import * as utils from '../utils';

class PaymentRegisters extends Component {
  static propTypes = {
    initRegistrations: PropTypes.array,
    initDataStudentClasses: PropTypes.array,
    initPayments: PropTypes.array,
    initDataStudents: PropTypes.array,
    deleteRegisters: PropTypes.func,
    createRegisters: PropTypes.func,
    updatePaymentRegisters: PropTypes.func,
    deletePaymentRegisters: PropTypes.func,
  }

  createInsertPaymentRegistersModal (onModalClose, onSave, columns, validateState, ignoreEditable) {

    const { updatePaymentRegisters } = this.props;

    const attr = {
      onModalClose, onSave, columns, validateState, ignoreEditable, updatePaymentRegisters,
    };
    // debugger;
    return (
      <InsertPaymentRegistersModal {... attr} />
    );
  }
  beforeSavePaymentRegistersCell (row, cellName, cellValue) {
  // do your stuff...
    const x = document.getElementById('PaymentRegisters');
    const y = x.getElementsByClassName('react-bs-container-body');
    let updateMode = '';

    let el;
    let cellIndex;
    if (y[0].querySelector('select')) {
      el = y[0].querySelector('select')[0];
      cellIndex = el.parentElement.parentElement.cellIndex;
    } else if (y[0].getElementsByClassName('form-control editor edit-text')[0]) {
      el = y[0].getElementsByClassName('form-control editor edit-text')[0];
      cellIndex = el.parentElement.cellIndex;
    } else if (y[0].getElementsByClassName('form-control editor edit-datetime')[0]) {
      el = y[0].getElementsByClassName('form-control editor edit-datetime')[0];
      cellIndex = el.parentElement.cellIndex;
    }
    console.log('cellIndex', cellIndex);

    if (cellIndex === 4) {
      updateMode = 'paymentUpdate';
    } else if (cellIndex === 5) {
      updateMode = 'paymentNotesUpdate';
    } else if (cellIndex === 6) {
      updateMode = 'classUpdate';
    } else if (cellIndex === 7) {
      updateMode = 'updateDateOfPayment';
    }

    this.props.updatePaymentRegisters(row, updateMode, cellValue);
  }

  onAfterDeleteRow (keys) {
    this.props.deletePaymentRegisters(keys);
  }

  render () {
    const { initPayments, filteredStudentClassesWithLinks } = this.props;
    const terminalClasses = utils.processFilteredStudentClassesWithLinks(filteredStudentClassesWithLinks); 
    const paymentTypes = ['true', 'false'];
    const options = {
      noDataText: 'There are no data',
      insertModal: this.createInsertPaymentRegistersModal.bind(this),
      afterDeleteRow: this.onAfterDeleteRow.bind(this),  // A hook for after droping rows.
    };
    const cellEditProp = {
      mode: 'click',
      // afterSaveCell: this.afterSavePaymentRegistersCell.bind(this),
      beforeSaveCell: this.beforeSavePaymentRegistersCell.bind(this),
    };
    // If you want to enable deleteRow, you must enable row selection also.
    const selectRowProp = {
      mode: 'checkbox',
      columnWidth: '30px',
    };
    return (
      <div id="PaymentRegisters">
        <BootstrapTable
          cellEdit={cellEditProp}
          data={initPayments}
          hover
          deleteRow
          selectRow={selectRowProp}
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
            editable={{ type: 'select', options: { values: terminalClasses } }} >Class
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
  }
}

export default connect(state => state, actions)(PaymentRegisters);
