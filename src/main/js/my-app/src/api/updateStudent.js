import * as constants from '../constants';
import * as utils from '../utils';

export default async (rowUpdate, cellName, cellValue)=> {
  // fetch call for update
  // curl -v -u myapos:Apostolakis1981 -X PATCH -H "Content-Type:application/json" -d '{ "description": "TEST_UPDATE", "studentClass":"http://localhost:8181/api/studentClasses/74" }' http://localhost:8181/api/students/74
  // let bodyData = {};

  const str = rowUpdate.email;
  if (str.indexOf('@') > 0) {
    let { [cellName]: newVar, _links, dateOfBirth, ...bodyData } = rowUpdate;
    bodyData[cellName] = cellValue;
    bodyData.manager = constants.searchByManager;
    const date = new Date(dateOfBirth[0]);
    bodyData.dateOfBirth = date;
    bodyData = JSON.stringify(bodyData);
    // find student by fname and lname and then perform update
    const url = `${constants.searchStudentFindByFnameAndLname}${rowUpdate.fname}&lname=${rowUpdate.lname}`;
    const studentFound = await utils.ftch(url, 'get', 'cors');
    await studentFound;
    const updateStudent = await utils.ftchUpdate(studentFound._links.self.href, 'PATCH', 'cors', bodyData);
    await updateStudent;
    if (updateStudent.status === 200) {
      alert('Student is updated succsesfully.');
    }
  } else {
    alert('Please check email input and try again. It has to be of email type. Example test@test.com');
  }
};
