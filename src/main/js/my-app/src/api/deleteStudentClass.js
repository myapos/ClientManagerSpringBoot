import * as constants from '../constants';
import * as utils from '../utils';
/* deletes selected class from table -- classId parameter is the id in front end table not in the database*/
export default async classId => {
  const x = document.getElementById('studentClasses');
  const rowByClassId = x.querySelectorAll('tr')[classId];
  const description = rowByClassId.childNodes[2].innerHTML;

  if (description === 'No subclass') {
    alert('You can not delete this class. It is used for declaring classes with no subclasses. Please choose a different one.');
  } else {
    const url = `${constants.searchStudentClassesByDescription}${description}`;
    const studentClassFound = await utils.ftch(url, 'get', 'cors');
    await studentClassFound;

    const ar = studentClassFound._links.self.href.split('/');
    const s = ar.length;
    const id = ar[s - 1];

    // delete student with id from database
    const deletedStudentClass = await utils.ftchDelete(`${constants.studentClassesAPI}${id}`, 'delete', 'cors');
    await deletedStudentClass;

    if (deletedStudentClass.status === 204) {
      alert('Student class is deleted succesfully');
    } else {
      alert('Something bad happened. Possible reasons:\n'
        + '1. The class you are trying to delete is subclass to another class.Please try to delete the parent class first.\n'
        + '2. The class is connected to some registration. Delete it first.');
    }
  }
};
