import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import { Link } from 'react-router';
import '../css/App.css';
import {Table, Column, Cell} from 'fixed-data-table';

const rows = [
  ['a1', 'b1', 'c1'],
  ['a2', 'b2', 'c2'],
  ['a3', 'b3', 'c3'],
  // .... and more
];


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
  render () {
    return (
            <Table
              rowHeight={50}
              rowsCount={rows.length}
              width={5000}
              height={5000}
              headerHeight={50}>
              <Column
                header={<Cell>Col 1</Cell>}
                cell={<Cell>Column 1 static content</Cell>}
                width={2000}
              />
              <Column
                header={<Cell>Col 2</Cell>}
                cell={<Cell>Column 2 static content</Cell>}
                width={1000}
              />
              <Column
                header={<Cell>Col 3</Cell>}
                cell={<Cell>Column 3 static content</Cell>}
                width={2000}
              />
            </Table>
            );
  }
}

export default connect(state => state, actions)(DataTable);
