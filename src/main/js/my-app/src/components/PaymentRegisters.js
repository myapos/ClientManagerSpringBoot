import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as actions from '../actions/';

class PaymentRegisters extends Component {

render () {
  const { initPayments } = this.props;
  const paymentTypes = ['true', 'false'];
      const options = {
      noDataText: 'There are no data',
      insertModal: '', // this.createInsertPaymentRegistersModal.bind(this),
      beforeInsertRow: '', // onBeforeInsertRow.bind(this),   // A hook for after insert rows
      afterInsertRow: '', // onAfterInsertRow.bind(this),   // A hook for after insert rows
      afterDeleteRow: '', // onAfterDeleteRow.bind(this),  // A hook for after droping rows.
    };
    const cellEditProp = {
      mode: 'click',
      afterSaveCell: '', // this.afterSavePaymentRegistersCell.bind(this),
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
  }
}

export default connect(state => state, actions)(PaymentRegisters);
