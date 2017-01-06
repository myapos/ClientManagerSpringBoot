import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import { Link } from 'react-router';
import '../css/App.css';
import {Table, Column, Cell} from 'fixed-data-table';
import SimpleTable from 'react-simple-table';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
var ReactBsTable = window.BootstrapTable;
var fruitColors = [{
  apple: 'Green',
  peach: 'Yellow',
  cherry: 'Red'
}];

const rows = [
  ['a1', 'b1', 'c1'],
  ['a2', 'b2', 'c2'],
  ['a3', 'b3', 'c3'],
  // .... and more
];
   // products will be presented by react-bootstrap-table 
const products = [{
      id: 1,
      name: "Item name 1",
      price: 100
  },{
      id: 2,
      name: "Item name 2",
      price: 100
  }];

class DataTable extends Component {

    handleChange(event, myprops) {
        // do something with event.target.checked
        console.log("hey from handlechange ", event);
        if (event.data) {
            event.toggleState(event);
        }
        console.log("changed state succesfully");
    };

  cancelFunction(){
    console.log("hey form cancel function");
    //redirect to main DeleteUser page
    window.parent.location.href= "/";
   }

// It's a data format example. 
priceFormatter(cell, row){
  return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
}

  render () {
    //debugger;
    return (
      <div>
          <BootstrapTable data={this.props.saved_data.students} striped={true} hover={true}>
          <TableHeaderColumn dataField="fname" isKey={true} dataAlign="center" dataSort={true}>Name</TableHeaderColumn>
          <TableHeaderColumn dataField="lname" dataSort={true}>Last Name</TableHeaderColumn>
          <TableHeaderColumn dataField="phone" dataSort={false}>Mobile phone</TableHeaderColumn>
          <TableHeaderColumn dataField="dateOfBirth" dataSort={false}>Date Of Birth</TableHeaderColumn>
          <TableHeaderColumn dataField="email" dataSort={false}>E-mail</TableHeaderColumn>
          <TableHeaderColumn dataField="facebook" dataSort={false}>Facebook</TableHeaderColumn>
      </BootstrapTable>
      </div>
    );
  }
}

export default connect(state => state, actions)(DataTable);
