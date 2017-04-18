import React from 'react';
import StudentDataTable from './StudentDataTable';

const GetAllStudents = () => (
  <div className="App" id="content">
    <div className="labelContainer">
      <StudentDataTable />
    </div>
  </div>
);

GetAllStudents.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default GetAllStudents;
