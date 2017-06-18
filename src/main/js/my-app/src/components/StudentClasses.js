import React, { Component } from 'react';
import { connect } from 'react-redux';
import InsertStudentClassesModal from './InsertStudentClassesModal';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as actions from '../actions/';

class StudentClasses extends Component {

  beforeSaveStudentClassCell (row, cellName, cellValue) {
    // call action for update
    this.props.updateClass(row, cellValue);
  }

  createInsertStudentClassesModal (onModalClose, onSave, columns, validateState, ignoreEditable) {
    const saveNewClass = this.props.saveNewClass;
    const attr = {
      onModalClose, onSave, columns, validateState, ignoreEditable, saveNewClass,
    };
    return (
      <InsertStudentClassesModal {... attr} />
    );
  }

  onAfterDeleteRow (rowKeys) {
    alert(`The rowkey you drop: ${rowKeys}`);
    // console.log("delete data from database",this.props);
    this.props.deleteClass(rowKeys);
  }

  onAfterInsertRow (row) {
    const selectedSubClass = document.getElementById('mySelect').value;
    row.subClassDescription = selectedSubClass;
    this.props.saveNewClass(row);
    alert(`The new row is:\n ${row.description} ${row.subClassDescription}`);
  }

  render () {
    const { studentClassesWithLinks } = this.props;
    const cellEditProp = {
      mode: 'click',
      beforeSaveCell: this.beforeSaveStudentClassCell.bind(this),
    };
    const options = {
      noDataText: 'There are no data',
      insertModal: this.createInsertStudentClassesModal.bind(this),
      afterInsertRow: this.onAfterInsertRow.bind(this),   // A hook for after insert rows
      afterDeleteRow: this.onAfterDeleteRow.bind(this),  // A hook for after droping rows.
    };
    // If you want to enable deleteRow, you must enable row selection also.
    const selectRowProp = {
      mode: 'checkbox',
    };

    return (
      <div id="studentClasses" >
        <BootstrapTable
          data={studentClassesWithLinks}
          cellEdit={cellEditProp}
          selectRow={selectRowProp}
          hover
          insertRow
          deleteRow
          options={options}
          trClassName="studentClassesRows">
          <TableHeaderColumn
            dataField="index"
            isKey
            dataSort
            editable={false} >id
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="parentClass"
            dataAlign="center"
            dataSort
            pagination>Description
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="subClass"
            dataAlign="center"
            dataSort
            pagination>Subclass
          </TableHeaderColumn>
        </BootstrapTable>
      </div>);
  }
}

export default connect(state => state, actions)(StudentClasses);
