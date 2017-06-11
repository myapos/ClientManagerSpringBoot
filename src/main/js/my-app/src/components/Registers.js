import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { connect } from 'react-redux';
import preprocessRegistrations from '../utils/preprocessRegistrations';
import preprocessStudentClasses from '../utils/preprocessStudentClasses';
import insertRegistersModal from './insertRegistersModal';
import * as actions from '../actions/';

class Registers extends Component {
  static propTypes = {
    initRegistrations: PropTypes.array,
    initDataStudentClasses: PropTypes.array,
    deleteRegisters: PropTypes.func,
  }

  constructor (props) {
    super(props);
    this.state = {
      ...props,
    };
  }

  onAfterDeleteRow (rowKeys) {
    this.props.deleteRegisters(rowKeys[0]);
  }

  afterSaveRegistersCell (row) {
    // update
    this.props.updateRegisters(row);

    // let studentHasRegistrations = false;
   // get index of row
    // if (!studentHasRegistrations) {
    //   if (row.dateOfRegistration !== 'No date of registration' && row.class === 'No registered classes') {
    //     alert('Please give class input');
    //   } else if (row.dateOfRegistration === 'No date of registration' && row.class !== 'No registered classes') {
    //     alert('Please give date of registration input');
    //   } else {
    //     alert('create registers........');
    //     this.props.createRegisters(row);
    //   }
    // } else {
    //   alert('Update registrations');
    //   this.props.updateRegisters(row);
    // }
  }

  createInsertRegistersModal () {
    // const addRegisters = this.props.addRegisters;
    // const attr = {
    //   onModalClose, onSave, columns, validateState, ignoreEditable, addRegisters,
    // };
    return (
      <insertRegistersModal />
    );
  }

  render () {
    const { initRegistrations, initDataStudentClasses } = this.props;
    // alternative implementation with es6 functions
    // let initRegistrations__ = [];
    // for (let i = 0; i < initRegistrations.length; i++) {
    //   initRegistrations__.push(initRegistrations[i].filter(item_ => {
    //     return ((typeof item_ !== 'undefined') && item_.length > 0) ;
    //   }));
    // }
    // initRegistrations__ = initRegistrations__.filter(item => {
    //   return item.length > 0;
    // });

    // const initRegistrations_ = [];
    // for (let j = 0; j < initRegistrations__.length; j++) {
    //   [initRegistrations_[j]] = initRegistrations__[j][0];
    // }

    const initRegistrations_ = preprocessRegistrations(initRegistrations);

    // If you want to enable deleteRow, you must enable row selection also.
    const selectRowProp = {
      mode: 'checkbox',
    };
    const cellEditProp = {
      mode: 'click',
      afterSaveCell: this.afterSaveRegistersCell.bind(this),
    };

    const options = {
      noDataText: 'There are no data',
      insertModal: this.createInsertRegistersModal.bind(this),
      afterDeleteRow: this.onAfterDeleteRow.bind(this),  // A hook for after droping rows.
    };

    // preprocess area for availableClasses
    const availableClasses = preprocessStudentClasses(initDataStudentClasses);

    return (
      <div id="registers">
        <BootstrapTable
          cellEdit={cellEditProp}
          hover
          deleteRow
          insertRow
          selectRow={selectRowProp}
          exportCSV
          search
          data={initRegistrations_}
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
      </div>
    );
  }
}

export default connect(state => state, actions)(Registers);
