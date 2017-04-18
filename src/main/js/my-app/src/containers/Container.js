import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/';

class Container extends Component {
	test() {
		
	}
  render() {
    return (
     <div> {this.props.children}</div>
    )
  }
}


export default connect(state => state, actions)(Container);


// const Container = (context) => (
// 	<div> {this.props.children} </div>
// );

// Container.contextTypes = {
//   router: React.PropTypes.object.isRequired,
// }

// export default Container;