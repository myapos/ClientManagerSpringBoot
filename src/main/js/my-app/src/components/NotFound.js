import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/';

// class NotFound extends Component {
//   render() {
//     return (
//       <div> Hello from NotFound </div>
//     )
//   }
// }



// export default connect(state => state, actions)(NotFound);

const NotFound = (context) => (
	<div> Hello from NotFound </div>
);

NotFound.contextTypes = {
  router: React.PropTypes.object.isRequired,
}

export default NotFound;

