import * as constants from '../constants';
import * as utils from '../utils';

export default async row => {
// create call -- we need student id, studentClass id, dateOfRegistration
  const url = encodeURI(`${constants.searchStudentClassesByDescription}${row.class}`);

// 1. find studentClass id
  const students = await utils.ftch(url, 'get', 'cors');
  await students;
  const { _links: { self: { href } } } = students;

  const studentLink = href;
// 2. find student id to update. new registration call
  const url3 = encodeURI(`${constants.searchRegistrationsByStudent}${studentLink}`);
  const registration = await utils.ftch(url3, 'get', 'cors');
  await registration;
// 3. update registration for student
  const { _embedded: { registers } } = registration;
  debugger;

  registers.map(reg => {
// 4. update registration for student
    debugger;
  });

};

