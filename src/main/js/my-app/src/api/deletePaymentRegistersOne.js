import * as constants from '../constants';
import * as utils from '../utils';
import extractId from '../utils/extractId';

export default async id => {
  const x = document.getElementById('PaymentRegisters');
  const rowByClassId = x.querySelectorAll('tr')[id];
  const fname = rowByClassId.childNodes[2].innerHTML;
  const lname = rowByClassId.childNodes[3].innerHTML;
  const notes = rowByClassId.childNodes[5].innerHTML;
  const subClassDescription = rowByClassId.childNodes[6].innerHTML;
  parent.paymentDate = rowByClassId.childNodes[7].innerHTML;

  // Steps for deletion --> I need registration id to delete payment
  // only if there is one payment.
  // 1.  in order to do that fetch payments first

  // const paymentsFound = await utils.ftch(constants.paymentsAPI, 'get', 'cors');
  // await paymentsFound;
  // 2.  find students by name and last name
  const urlSearchStudents = `${constants.searchStudentFindByFnameAndLname}${fname}&lname=${lname}`;
  const studentFound = await utils.ftch(urlSearchStudents, 'get', 'cors');
  await studentFound;
  const { _links: { self: { href: studentLink } } } = studentFound;
  // debugger;
  // 3.  find registrations by studentLink
  const urlSearchRegistrations = `${constants.searchRegistrationsByStudent}${studentLink}`;
  const registrationFound = await utils.ftch(urlSearchRegistrations, 'get', 'cors');
  await registrationFound;
  // debugger;

  const { _embedded: { registers: registrations } } = registrationFound;

  const r = await registrations.map(async reg => {
    console.log('reg:', reg);
    // 4.  for each registration find payment by registrationLink ????
    const { _links: { self: { href: registrationLink } } } = reg;
    const urlSearchPayments = `${constants.searchPaymentByRegistration}${registrationLink}`;
    const paymentFound = await utils.ftch(urlSearchPayments, 'get', 'cors');
    await paymentFound;
    const { _embedded: { payeds: payments } } = paymentFound;
    const p = await payments.map(async paym => {
      const { _links: { self: { href: paymentLink } } } = paym;
      // 5.  delete payment
      const deletedPaymentLink = await utils.ftchDelete(paymentLink, 'delete', 'cors');
      await deletedPaymentLink;
      console.log('deletedPaymentLink:', deletedPaymentLink);
      return deletedPaymentLink.status;
    });

    const deletedStatuses = await Promise.all(p).then(values => {
      const [val] = values;
      return val;
    });
    return deletedStatuses;
  });

  const statuses = await Promise.all(r).then(values => {
    const [val] = values;
    return val;
  });

  return ({
    status: statuses,
  });
};
