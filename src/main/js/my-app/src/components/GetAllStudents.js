import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import StudentDataTable from './StudentDataTable';

// class GetAllStudents extends Component {

//   render () {
//     return (
//       <div className="App" id="content">
//         <div className="labelContainer">
//           <StudentDataTable />
//         </div>
//       </div>
//     );
//   }
// }

// export default connect(state => state, actions)(GetAllStudents);

const GetAllStudents = (context) => (
	<div className="App" id="content">
	  <div className="labelContainer">
	    <StudentDataTable />
	  </div>
	</div>
);

GetAllStudents.contextTypes = {
  router: React.PropTypes.object.isRequired,
}

export default GetAllStudents;