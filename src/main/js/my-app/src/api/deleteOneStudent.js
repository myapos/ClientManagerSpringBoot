import * as constants from '../constants';
import * as utils from '../utils';
/* deletes selected student from table -- studentId parameter is the id in front end table not in the database*/

export default async studentId => {
  const x = document.getElementById('students');
  const rowByClassId = x.querySelectorAll('tr')[studentId];
  const fname = rowByClassId.childNodes[2].innerHTML;
  const lname = rowByClassId.childNodes[3].innerHTML;
  const url = `${constants.searchStudentFindByFnameAndLname}${fname}&lname=${lname}`;
  const studentFound = await utils.ftch(url, 'get', 'cors');
  await studentFound;
  const ar = studentFound._links.self.href.split('/');
  const s = ar.length;
  const id = ar[s - 1];

  // delete student with id from database
  const deletedStudent = await utils.ftchDelete(`${constants.studentsAPIID}/${id}`, 'delete', 'cors');
  await deletedStudent;
  if (deletedStudent.status === 204) {
    // alert('Student is deleted succesfully.');
    console.log('Student is deleted succesfully.');
    // window.location.reload(true);
  } else if (deletedStudent.status === 500) {
    alert('Something bad happened. Are there two users with the same name?');
  } else {
    alert('Something bad happened. Please try again');
  }
  return deletedStudent;
};
