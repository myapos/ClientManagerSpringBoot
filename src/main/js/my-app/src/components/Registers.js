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
    // debugger;
    const sumAr = [];
    const test = initRegistrations.map(curAr => {
      
      // console.log('curAr:', curAr, 'l:', curAr.length);
      for (let i = 0; i < curAr.length; i++){
        if (typeof curAr[i] !== 'undefined'){
          console.log('item:', curAr[i], 'l:', curAr[i].length);

          if(curAr[i].length > 0) {
            //debugger;
            sumAr.push(curAr[i]);
          }
        }
      }
    });

    const initRegistrations_ = sumAr.map(value => value[0]);
    console.log('initRegistrations12:', initRegistrations_);
    //debugger;
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
