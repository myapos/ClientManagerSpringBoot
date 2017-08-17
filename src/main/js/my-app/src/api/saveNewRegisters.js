import * as constants from '../constants';
import * as utils from '../utils';

export default async (row, onModalClose) => {
  // steps
  // find studentClass link
  const url = `${constants.searchStudentClassesByDescription}${row.classDescription}`;
  const studentClassFound = await utils.ftch(url, 'get', 'cors');
  await studentClassFound;
  const classLink = studentClassFound._links.self.href; // has to be fixed for many

  const url2 = `${constants.searchStudentFindByFnameAndLname}${row.fname}&lname=${row.lname}`;

  const res = await utils.ftch(url2, 'get', 'cors');
  await res;

  const studentLink = res._links.self.href; // has to be fixed for many

  // new registration call
  const date = new Date(row.dateOfRegistration.substr(0, 10));

  const bodyData = JSON.stringify({
    'studentClass': classLink,
    'dateOfRegistration': date,
    'student': studentLink,
  });

  // check if date is invalid
  const invalidDate = (date.toDateString() === 'Invalid Date');

  // before save check if registration already exists
  const exists = await utils.checkIfRegistrationExists(studentLink, classLink);
  if (!exists && !invalidDate) {
    const url3 = `${constants.registersAPI}`;
    const savedRegister = await utils.ftchUpdate(url3, 'POST', 'cors', bodyData);
    await savedRegister;
    if (savedRegister.status === 201) {
      alert('Register is created succesfully');
      onModalClose();
    } else {
      alert('Something bad happened');
    }
  } else if (exists) {
    alert('Registration already exists for this class');
    onModalClose();
  } else if (invalidDate) {
    alert('Provided invalid date');
    onModalClose();
  }
};
