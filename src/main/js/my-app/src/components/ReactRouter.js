import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/';

// class ReactRouter extends Component {
//   render() {
//     return (
//       <div> Hello from ReactRouter </div>
//     )
//   }
// }


// export default connect(state => state, actions)(ReactRouter);


const ReactRouter = (context) => (
	<div> Hello from ReactRouter </div>
);

ReactRouter.contextTypes = {
  router: React.PropTypes.object.isRequired,
}

export default ReactRouter;