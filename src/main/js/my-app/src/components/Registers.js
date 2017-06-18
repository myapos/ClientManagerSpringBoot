import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { connect } from 'react-redux';
import preprocessStudentClasses from '../utils/preprocessStudentClasses';
import InsertRegistersModal from './InsertRegistersModal';
import * as actions from '../actions/';

class Registers extends Component {
  static propTypes = {
    initRegistrations: PropTypes.array,
    initDataStudentClasses: PropTypes.array,
    initDataStudents: PropTypes.array,
    deleteRegisters: PropTypes.func,
    createRegisters: PropTypes.func,
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

  createInsertRegistersModal (onModalClose, onSave, columns, validateState, ignoreEditable) {
    const { createRegisters, initDataStudentClasses, initRegistrations, initDataStudents } = this.props;
    const availableClasses = preprocessStudentClasses(initDataStudentClasses);
    // const initRegistrations_ = preprocessRegistrations(initRegistrations);

    const attr = {
      onModalClose,
      onSave,
      columns,
      validateState,
      ignoreEditable,
      createRegisters,
      availableClasses,
      initRegistrations,
      initDataStudents,
    };
    return (<InsertRegistersModal {... attr} />);
  }

  afterSaveRegistersCell (row) {
    // update
    this.props.createRegisters(row);
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

    // const initRegistrations_ = preprocessRegistrations(initRegistrations);

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

    return (
      <div id="registers">
        <BootstrapTable
          cellEdit={cellEditProp}
          hover
          deleteRow
          insertRow
          selectRow={selectRowProp}
          search
          data={initRegistrations}
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
            editable={{ type: 'select', options: { values: initDataStudentClasses } }} >Class
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
