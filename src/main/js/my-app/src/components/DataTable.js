import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import { Link } from 'react-router';
import '../css/App.css';
import {Table, Column, Cell} from 'fixed-data-table';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class DataTable extends Component {

  render () {
    const data = this.props.saved_data.students;
    data.map((obj)=>{
      //debugger;
      let date=new Date(obj.dateOfBirth);
      let formatedDate = date.toString().match(/... ... [0-9][0-9] [0-9][0-9][0-9][0-9](?!([0-9][0-9]:[0-9][0-9]:[0-9][0-9] GMT[+]0300 \(EEST\)))/g);
      obj.dateOfBirth = formatedDate;
    });

    return (
      <div>
          <BootstrapTable data={data} hover={true}>
          <TableHeaderColumn dataField="fname" dataAlign="center" dataSort={true} pagination>Name</TableHeaderColumn>
          <TableHeaderColumn dataField="lname" dataSort={true}>Last Name</TableHeaderColumn>
          <TableHeaderColumn dataField="phone" isKey={true} dataSort={false}>Mobile phone</TableHeaderColumn>
          <TableHeaderColumn 
            dataField="dateOfBirth" 
            dataAlign="left" 
            dataSort={false}
          >
            Date Of Birth
          </TableHeaderColumn>
          <TableHeaderColumn dataField="email" dataSort={false}>E-mail</TableHeaderColumn>
          <TableHeaderColumn dataField="facebook" dataSort={false}>Facebook</TableHeaderColumn>
      </BootstrapTable>
      </div>
    );
  }
}

export default connect(state => state, actions)(DataTable);
