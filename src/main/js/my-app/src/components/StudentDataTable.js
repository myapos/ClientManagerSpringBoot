import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { connect } from 'react-redux';
import InsertStudentModal from './InsertStudentModal';
import preprocessStudents from '../utils/preprocessStudents';
import * as actions from '../actions/';

class StudentDataTable extends Component {
  static propTypes = {
    initRegistrations: PropTypes.array,
    initDataStudentClasses: PropTypes.array,
    initDataStudents: PropTypes.array,
    addStudent: PropTypes.func,
    deleteRegisters: PropTypes.func,
    createRegisters: PropTypes.func,
  }

  constructor (props) {
    super(props);
    this.state = {
      ...props,
    };
  }
  createInsertStudentModal (onModalClose, onSave, columns, validateState, ignoreEditable) {
    const { addStudent, initDataStudents } = this.props;
    const attr = {
      onModalClose, onSave, columns, validateState, ignoreEditable, addStudent, initDataStudents,
    };
    return (
      <InsertStudentModal {... attr} />
    );
  }

  render () {
    const { initDataStudents } = this.props;
    // preprocess area
    const initDataStudents_ = preprocessStudents(initDataStudents);
    // If you want to enable deleteRow, you must enable row selection also.
    const selectRowProp = {
      mode: 'checkbox',
    };
    const cellEditProp = {
      mode: 'click',
      afterSaveCell: '', // this.afterSaveStudentCell.bind(this),
    };

    const options = {
      noDataText: 'There are no data',
      insertModal: this.createInsertStudentModal.bind(this),
      afterInsertRow: '', // onAfterInsertRow.bind(this),   // A hook for after insert rows
      afterDeleteRow: '', // onAfterDeleteRow.bind(this),  // A hook for after droping rows.
    };
    return (
      <div id="students">
        <BootstrapTable
          cellEdit={cellEditProp}
          data={initDataStudents_}
          hover
          insertRow
          selectRow={selectRowProp}
          deleteRow
          search
          options={options}>
          <TableHeaderColumn
            dataField="index"
            isKey
            dataSort
            editable={false} >id
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="fname"
            dataAlign="center"
            dataSort
            pagination>Name
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="lname"
            dataSort>Last Name
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="phone"
            dataSort={false}>
            Mobile phone
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="dateOfBirth"
            dataAlign="left"
            dataSort={false}>
            Date Of Birth
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="email"
            dataSort={false}>E-mail
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="facebook"
            dataSort={false}>Facebook
          </TableHeaderColumn>
        </BootstrapTable>
      </div>);
  }
}

export default connect(state => state, actions)(StudentDataTable);
