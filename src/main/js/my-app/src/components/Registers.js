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
    const { initRegistrations } = this.props;
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

    // debugger;
    const sumAr = [];
    initRegistrations.map(curAr => {
      // console.log('curAr:', curAr, 'l:', curAr.length);
      for (let i = 0; i < curAr.length; i++) {
        if (typeof curAr[i] !== 'undefined') {
          console.log('item:', curAr[i], 'l:', curAr[i].length);
          if (curAr[i].length > 0) {
            sumAr.push(curAr[i]);
          }
        }
      }
      return 1;
    });

    const initRegistrations_ = sumAr.map(value => value[0]);
    console.log('initRegistrations_:', initRegistrations_);
    // const initRegistrations__ = [{}];
    return (
      <div id="registers">
        <BootstrapTable data={initRegistrations_}>
          <TableHeaderColumn
            dataField="index"
            editable={false}
            isKey dataSort>id
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="fname"
            emailditable={false}
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
            dataField="class">Class
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default connect(state => state, actions)(Registers);
