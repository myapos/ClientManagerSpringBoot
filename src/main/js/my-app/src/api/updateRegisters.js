import * as constants from '../constants';
import * as utils from '../utils';

export default async row => {
// create call -- we need studentLink, classLink, dateOfRegistration
  const url = encodeURI(`${constants.searchStudentClassesByDescription}${row.class}`);

// 1. find classLink
  const classes = await utils.ftch(url, 'get', 'cors');
  await classes;
  const { _links: { self: { href: classLink } } } = classes;

  const url2 = encodeURI(`${constants.searchStudentFindByFnameAndLname}${row.fname}&lname=${row.lname}`);

// 2. find studentLink
  const students = await utils.ftch(url2, 'get', 'cors');
  await students;
  const { _links: { self: { href: studentLink } } } = students;

// 3. find student id to update. new registration call
  const url3 = encodeURI(`${constants.searchRegistrationsByStudent}${studentLink}`);
  const registration = await utils.ftch(url3, 'get', 'cors');
  await registration;
// 4. update registration for student
  const { _embedded: { registers } } = registration;

// 5.find registration to update from row.date
  const criteriaDate = new Date(row.dateOfRegistration);
  const registerToUpdate = registers.find(item => {
    const castToDate = new Date(item.dateOfRegistration);
    return criteriaDate.toDateString() === castToDate.toDateString();
  });
// 6. build data for registration update
  const bodyData = JSON.stringify({
    'studentClass': classLink,
    'dateOfRegistration': criteriaDate,
    'student': studentLink,
  });
  const { _links: { self: { href: registerToUpdateLink } } } = registerToUpdate;

// 7. update registration for student

  const updateRegistration = await utils.ftchUpdate(registerToUpdateLink, 'PATCH', 'cors', bodyData);
  await updateRegistration;

  if (updateRegistration.status === 200) {
    alert('Registration is updated succesfully');
  } else {
    alert('Something bad happened');
  }
};

