import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { connect } from 'react-redux';
import InsertRegistersModal from './InsertRegistersModal';
import * as actions from '../actions/';
import * as utils from '../utils';
import Signature from './Signature';

class Registers extends Component {
  static propTypes = {
    initRegistrations: PropTypes.array,
    initDataStudentClasses: PropTypes.array,
    initDataStudents: PropTypes.array,
    deleteRegisters: PropTypes.func,
    createRegisters: PropTypes.func,
    filteredStudentClassesWithLinks: PropTypes.array,
  }

  constructor (props) {
    super(props);
    this.state = {
      ...props,
    };
  }

  onAfterDeleteRow (rowKeys) {
    alert(`The rowkey you drop: ${rowKeys}`);
    this.props.deleteRegisters(rowKeys);
  }

  createInsertRegistersModal (onModalClose, onSave, columns, validateState, ignoreEditable) {
    const { createRegisters, initDataStudentClasses, initRegistrations, initDataStudents } = this.props;
    const availableClasses = utils.preprocessStudentClasses(initDataStudentClasses);

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
    this.props.updateRegisters(row);
    // this.props.createRegisters(row);
  }

  render () {
    const { initRegistrations, filteredStudentClassesWithLinks } = this.props;
    const terminalClasses = utils.processFilteredStudentClassesWithLinks(filteredStudentClassesWithLinks);
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
            dataField="classDescription"
            editable={{ type: 'select', options: { values: terminalClasses } }} >Class
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="dateOfRegistration"
            dataAlign="left"
            dataSort={false}
            editable={{ type: 'datetime' }}> Date Of Registration
          </TableHeaderColumn>
        </BootstrapTable>
        <div className="flex-wrap-container">
          <Signature />
        </div>
      </div>
    );
  }
}

export default connect(state => state, actions)(Registers);
