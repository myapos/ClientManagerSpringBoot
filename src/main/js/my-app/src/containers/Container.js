import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/';

class Container extends Component {
  test () {}
  render () {
    return (
      <div> {this.props.children}</div>
    );
  }
}

export default connect(state => state, actions)(Container);
