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
    initDataAllStudents: PropTypes.array,
    addStudent: PropTypes.func,
    deleteStudents: PropTypes.func,
    updateStudent: PropTypes.func,
    deleteRegisters: PropTypes.func,
    createRegisters: PropTypes.func,
    searchingStatus: PropTypes.bool,
    searching: PropTypes.func,
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
    this.props.deleteStudents(rowKeys);
    // const returned = rowKeys.map(key => this.props.deleteStudent(key));
    // const { deletedStatus, studentDeletedId } = this.props;
    // const { success } = this.props;
    // debugger;
    // console.log('success:', success);
    // if (success) {
    //   this.props.getAllStudents();
    // }
  }
  afterSaveStudentCell (row, cellName, cellValue) {
    // call action for update
    this.props.updateStudent(row, cellName, cellValue);
  }

  beforeSaveStudentCell (row, cellName, cellValue) {
    // call action for update
    this.props.updateStudent(row, cellName, cellValue);
  }

  createInsertStudentModal (onModalClose, onSave, columns, validateState, ignoreEditable) {
    const { addStudent, initDataStudents } = this.props;
    const attr
    = {
      onModalClose,
      onSave,
      columns,
      validateState,
      ignoreEditable,
      addStudent,
      initDataStudents,
    };
    return (
      <InsertStudentModal {... attr} />
    );
  }
  afterSearch(searchText, result){

    console.log('after search');
    if (searchText === null || searchText === '') {
      this.props.searching(false);
    } else {
      this.props.searching(true);
    }
  }
  render () {
    const { initDataStudents, searchingStatus, initDataAllStudents } = this.props;

    // console.log('success:', success);

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
      afterDeleteRow: this.onAfterDeleteRow.bind(this),   // A hook for after droping rows.
      afterSearch: this.afterSearch.bind(this),
    };

    return (
      <div id="students">
        <BootstrapTable
          cellEdit={cellEditProp}
          data={searchingStatus ? initDataAllStudents : initDataStudents}
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
            editable={false}
            width="55px"
            dataAlign="center"
            columnClassName="idStudent">id
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="fname"
            width="10%"
            dataAlign="left"
            dataSort
            pagination>Name
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="lname"
            width="10%"
            dataSort>Last Name
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="phone"
            width="10%"
            dataSort={false}>
            Mobile phone
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="dateOfBirth"
            dataAlign="left"
            width="10%"
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
