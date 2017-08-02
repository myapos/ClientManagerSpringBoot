import send_email from './send_email';
import * as constants from '../constants';
import * as utils from '../utils';

export default async (msg, selectedClass) => {
  // steps
  // find students who have payed for the selected class ????
  const urlStudentClass = `${constants.searchStudentClassesByDescription}${selectedClass}`;
  const studentClassFound = await utils.ftch(urlStudentClass, 'get', 'cors');
  await studentClassFound;
  // get selected class from server
  const { _links: { self: { href: studentClassLink } } } = studentClassFound;

  // get registrations by student class
  const urlRegistrations = `${constants.searchRegistrationsByStudentClass}${studentClassLink}`;
  const registrationFound = await utils.ftch(urlRegistrations, 'get', 'cors');
  await registrationFound;
  const { _embedded: { registers: registration } } = registrationFound; // registration is array

  registration.map(async reg => {
    console.log('reg:', reg);
    // for all registrations get students who have payed for them and send emails
    const { _links: { self: { href: registrationLink } } } = reg;

    const { _links: { student: { href: studentLink } } } = reg;
    // get student
    const student = await utils.ftch(studentLink, 'get', 'cors');
    await student;

    const urlPayment = `${constants.searchPaymentByRegistration}${registrationLink}`;
    const paymentFound = await utils.ftch(urlPayment, 'get', 'cors');
    await paymentFound;
    const { _embedded: { payeds: payment } } = paymentFound; // registration is array
    payment.map(paym => {
      if (paym.payment) {
        // send email to student
        send_email(student.fname, student.lname, student.email, msg);
      } else {
        alert('Something bad happened');
      }
    });
  });
};
