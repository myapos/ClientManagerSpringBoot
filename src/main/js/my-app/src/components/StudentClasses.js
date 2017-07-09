import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import InsertStudentClassesModal from './InsertStudentClassesModal';
import * as actions from '../actions/';

class StudentClasses extends Component {
  static propTypes = {
    initRegistrations: PropTypes.array,
    initDataStudentClasses: PropTypes.array,
    initDataStudents: PropTypes.array,
    studentClassesWithLinks: PropTypes.array,
    filteredStudentClassesWithLinks: PropTypes.array,
    deleteRegisters: PropTypes.func,
    createRegisters: PropTypes.func,
    deleteClass: PropTypes.func,
    saveNewClass: PropTypes.func,
    updateClass: PropTypes.func,
    nonTerminalClasses: PropTypes.func,
    setNonTerminalClasses: PropTypes.bool,
    filterNonTerminalClasses: PropTypes.func,
  }

  onAfterDeleteRow (rowKeys) {
    alert(`The rowkey you drop: ${rowKeys}`);
    // console.log("delete data from database",this.props);
    rowKeys.map(key => {
      this.props.deleteClass(key);
    });
  }

  onAfterInsertRow (row) {
    const selectedSubClass = document.getElementById('mySelect').value;
    row.subClassDescription = selectedSubClass;
    this.props.saveNewClass(row);
    alert(`The new row is:\n ${row.description} ${row.subClassDescription}`);
  }

  beforeSaveStudentClassCell (row, cellName, cellValue) {
    const { studentClassesWithLinks } = this.props;
    const mode = {
      'parentClass': 'parentClass',
      'subClass': 'subClass',
    };

    if (cellName === 'parentClass') {
      // call action for update
      this.props.updateClass(row, cellValue, studentClassesWithLinks, mode.parentClass);
    } else if (cellName === 'subClass') {
      this.props.updateClass(row, cellValue, studentClassesWithLinks, mode.subClass);
    }
  }

  createInsertStudentClassesModal (onModalClose, onSave, columns, validateState, ignoreEditable) {
    const { saveNewClass, initDataStudentClasses } = this.props;
    const attr = {
      onModalClose, onSave, columns, validateState, ignoreEditable, saveNewClass, initDataStudentClasses,
    };
    return (
      <InsertStudentClassesModal {... attr} />
    );
  }
  trClassFormat (row, rowIndex) {
    // row is the current row data
    return `studentClassesRows${rowIndex}`;
  }
  myCustomClick (e) {
    const { setNonTerminalClasses } = this.props;
    console.log('custom onclick function');
    this.props.nonTerminalClasses(!setNonTerminalClasses);
    // call utility function for filtering data
    // this.props.filterNonTerminalClasses(studentClassesWithLinks);
  }
  handleShowSelectButtonClick = (onClick, e) => {
    // Custom your onClick event here,
    // it's not necessary to implement this function if you have no any process before onClick
    console.log('This is my custom function for ShowSelectedOnlyButton click event');
    // const res = onClick();
    this.myCustomClick(e);
  }

  createCustomShowSelectButton = (onClick, showSelected) => {
     const { setNonTerminalClasses } = this.props;
    return (
      <button
        className="btn btn-success"
        onClick={e => this.handleShowSelectButtonClick(onClick, e)}>
        { setNonTerminalClasses
          ? 'Show Terminal Classes'
          : 'Show Non Terminal Classes'
        }
      </button>);
  }

  render () {
    const {
            studentClassesWithLinks,
            initDataStudentClasses,
            setNonTerminalClasses,
            filteredStudentClassesWithLinks,
          } = this.props;
    const cellEditProp = {
      mode: 'click',
      beforeSaveCell: this.beforeSaveStudentClassCell.bind(this),
    };
    const options = {
      noDataText: 'There are no data',
      insertModal: this.createInsertStudentClassesModal.bind(this),
      afterInsertRow: this.onAfterInsertRow.bind(this),   // A hook for after insert rows
      afterDeleteRow: this.onAfterDeleteRow.bind(this),  // A hook for after droping rows
      showSelectedOnlyBtn: this.createCustomShowSelectButton.bind(this),
    };
    // If you want to enable deleteRow, you must enable row selection also.
    const selectRowProp = {
      mode: 'checkbox',
      showOnlySelected: true,
      showAllText: true,
      showOnlySelectText: true,
      btnContextual: true,
      onClick: true,
      className: 'test',
    };

    return (
      <div id="studentClasses" >
        { setNonTerminalClasses
          ? <BootstrapTable
            data={studentClassesWithLinks}
            cellEdit={cellEditProp}
            selectRow={selectRowProp}
            hover
            insertRow
            deleteRow
            options={options}
            trClassName={this.trClassFormat}>
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
              editable={{ type: 'select', options: { values: initDataStudentClasses } }}
              pagination>Subclass
            </TableHeaderColumn>
          </BootstrapTable>
          : <BootstrapTable
            data={filteredStudentClassesWithLinks}
            cellEdit={cellEditProp}
            selectRow={selectRowProp}
            hover
            insertRow
            deleteRow
            options={options}
            trClassName={this.trClassFormat}>
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
              editable={{ type: 'select', options: { values: initDataStudentClasses } }}
              pagination>Subclass
            </TableHeaderColumn>
          </BootstrapTable>
        }

      </div>);
  }
}

export default connect(state => state, actions)(StudentClasses);
