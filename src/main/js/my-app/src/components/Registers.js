import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { connect } from 'react-redux';
import * as actions from '../actions/';

const products = [];

function addProducts(quantity) {
  const startId = products.length;
  for (let i = 0; i < quantity; i++) {
    const id = startId + i;
    products.push({
      id: id,
      name: 'Item name ' + id,
      price: 2100 + i
    });
  }
}

addProducts(5);

class Registers extends Component {
  static propTypes = {
    initRegistrations: PropTypes.array,
  }

  constructor (props) {
    super(props);
    this.state = {
      ...props,
    };
    // debugger;
  }

  render () {
    //debugger; 
    const { initRegistrations } = this.props;
    return (
      <div id="registers">
        <BootstrapTable data={initRegistrations}>
          <TableHeaderColumn dataField="dateOfRegistration" isKey>Product ID</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default connect(state => state, actions)(Registers);
