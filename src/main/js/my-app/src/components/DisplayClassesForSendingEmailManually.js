import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as actions from '../actions/';
import * as constants from '../constants';
import * as utils from '../utils';

const DisplayClassesForSendingEmailManually = ({ filteredStudentClassesWithLinks }) => {
  const terminalClasses = utils.processFilteredStudentClassesWithLinks(filteredStudentClassesWithLinks);
  const options = {
    noDataText: 'There are no data',
  };
  const dummyClassesData = [{
    index: 1,
    description: 'Please select class',
  }];
  const cellEditProp = {
    mode: 'click',
  };

  return (
    <div id="dataDisplayClassesForSendingEmailManually">
      <div> {constants.txtMsg} </div>
      <BootstrapTable
        data={dummyClassesData}
        options={options}
        cellEdit={cellEditProp}
        hover>
        <TableHeaderColumn
          dataField="index"
          editable={false}
          isKey>id
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="description"
          columnClassName="availableClasses"
          editable={{ type: 'select', options: { values: terminalClasses } }} >Class
        </TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};

DisplayClassesForSendingEmailManually.propTypes = {
  initRegistrations: PropTypes.array,
  initDataStudentClasses: PropTypes.array,
  initDataStudents: PropTypes.array,
  studentClassesWithLinks: PropTypes.array,
  deleteRegisters: PropTypes.func,
  createRegisters: PropTypes.func,
  deleteClass: PropTypes.func,
  saveNewClass: PropTypes.func,
  updateClass: PropTypes.func,
  text: PropTypes.string,
  msgSubmitted: PropTypes.func,
  changeText: PropTypes.func,
  filteredStudentClassesWithLinks: PropTypes.array,
};

export default connect(state => state, actions)(DisplayClassesForSendingEmailManually);
