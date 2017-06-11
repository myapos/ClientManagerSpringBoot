import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { connect } from 'react-redux';
import insertRegistersModal from './insertRegistersModal';
import * as actions from '../actions/';

class Registers extends Component {
  static propTypes = {
    initRegistrations: PropTypes.array,
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
    let studentHasRegistrations = false;
   // get index of row
   // check if row.index has a registration already. If it has then action is update. Otherwise action is update
    // for (let jj = 0; jj < parent.studentIndexWithRegistrations.length; jj++) {
    //   if (parent.studentIndexWithRegistrations[jj] === row.index) {
    //     studentHasRegistrations = true;
    //   }
    // }
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

    // data preprocess area
    const sumAr = [];
    initRegistrations.map(curAr => {
      console.log('curAr:', curAr, 'l:', curAr.length);
      for (let i = 0; i < curAr.length; i++) {
        if (typeof curAr[i] !== 'undefined') {
          // console.log('item:', curAr[i], 'l:', curAr[i].length);
          if (curAr[i].length > 0) {
            sumAr.push(curAr[i]);
          }
        }
      }
      return 1;
    });

    const initRegistrations_ = sumAr.map((value, index) => {
      value[0].index = index + 1;
      return value[0];
    });
    // console.log('initRegistrations_:', initRegistrations_);

    // If you want to enable deleteRow, you must enable row selection also.
    const selectRowProp = {
      mode: 'checkbox',
    };
    const cellEditProp = {
      mode: 'click',
      afterSaveCell: this.afterSaveRegistersCell.bind(this),
    };

    const options = {
      noDataText: 'There are no data loaded yet',
      afterDeleteRow: this.onAfterDeleteRow.bind(this),  // A hook for after droping rows.
    };
    const availableClasses = initDataStudentClasses;
    // preprocess area for availableClasses 

    debugger;
    return (
      <div id="registers">
        <BootstrapTable
          cellEdit={cellEditProp}
          hover
          deleteRow
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
            dataField="dateOfRegistration"
            dataAlign="left"
            dataSort={false}
            editable={{ type: 'datetime' }}> Date Of Registration
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="class"
            editable={{ type: 'select', options: { values: availableClasses } }} >Class
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default connect(state => state, actions)(Registers);
