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
    deleteStudent: PropTypes.func,
    updateStudent: PropTypes.func,
    deleteRegisters: PropTypes.func,
    createRegisters: PropTypes.func,
  }

  constructor (props) {
    super(props);
    this.state = {
      ...props,
    };
  }

  onAfterInsertRow (row) {
    let newRowStr = '';
    for (const prop in row) {
      newRowStr += `${prop}: ${row[prop]} \n`;
    }
    alert(`The new row is:\n ${newRowStr}`);
    this.props.addStudent(row);
  }

  onAfterDeleteRow (rowKeys) {
    alert(`The rowkey you drop: ${rowKeys}`);
    //  delete multiple rows
    rowKeys.map(key => {
      this.props.deleteStudent(key);
    });
  }
  afterSaveStudentCell (row, cellName, cellValue) {
    // call action for update
    // debugger;
    this.props.updateStudent(row, cellName, cellValue);
  }

  beforeSaveStudentCell (row, cellName, cellValue) {
    // call action for update
    this.props.updateStudent(row, cellName, cellValue);
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
    // const initDataStudents_ = preprocessStudents(initDataStudents);
    // If you want to enable deleteRow, you must enable row selection also.
    const selectRowProp = {
      mode: 'checkbox',
    };
    const cellEditProp = {
      mode: 'click',
      // afterSaveCell: this.afterSaveStudentCell.bind(this),
      beforeSaveCell: this.beforeSaveStudentCell.bind(this),
    };

    const options = {
      noDataText: 'There are no data',
      insertModal: this.createInsertStudentModal.bind(this),
      afterInsertRow: this.onAfterInsertRow.bind(this),   // A hook for after insert rows
      afterDeleteRow: this.onAfterDeleteRow.bind(this),  // A hook for after droping rows.
    };

    return (
      <div id="students">
        <BootstrapTable
          cellEdit={cellEditProp}
          data={initDataStudents}
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
