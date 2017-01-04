import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import '../css/App.css';

class Container extends Component {
  render() {
    return (
     <div> {this.props.children}</div>
    )
  }
}


export default connect(state => state, actions)(Container);


