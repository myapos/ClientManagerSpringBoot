import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as actions from '../actions/';

let dataDisplayClassesForSendingEmailManually = [];

function onAfterInsertRow (row) {
  this.props.addPaymentRegisters(row);
}

// If you want to enable deleteRow, you must enable row selection also.
const selectRowProp = {
  mode: 'checkbox',
};

class DisplayClassesForSendingEmailManually extends Component {

  deleteme () {
  // do your stuff
  }

  render () {
    const cellEditProp = {
      mode: 'click',
    };

    const options = {
      afterInsertRow: onAfterInsertRow.bind(this),   // A hook for after insert rows
    };

    const availableClasses = [];
    for (let i = 0; i < this.props.saved_studentClasses.length; i++) {
      availableClasses.push(this.props.saved_studentClasses[i].description);
    }
    // check if data has loaded
    /* let dataDisplayClassesForSendingEmailManually;*/
    if (availableClasses.length > 0) {
      dataDisplayClassesForSendingEmailManually = [{
        index: 1,
        classes: availableClasses,
        firstclass: availableClasses[0],
      }];
    } else {
      dataDisplayClassesForSendingEmailManually = [{
        index: 1,
        classes: availableClasses,
        firstclass: 'There are no classes saved yet!',
      }];
    }

    return (
      <div id="dataDisplayClassesForSendingEmailManually">
        Please select class, write your message and press enter.
        The message will be send only to those students that has registerd to classes and has payed
        <BootstrapTable
          cellEdit={cellEditProp}
          data={[]}
          hover
          selectRow={selectRowProp}
          options={options}>
          <TableHeaderColumn
            dataField="index"
            editable={false}
            isKey
            dataSort>id
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="firstclass"
            editable={{ type: 'select', options: { values: availableClasses } }}>Select class
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default connect(state => state, actions)(DisplayClassesForSendingEmailManually);
