import * as utils from '../utils';
import * as constants from '../constants';

export default async registerId => {
  const x = document.getElementById('registers');
  const rowByClassId = x.querySelectorAll('tr')[registerId];
  const fname = rowByClassId.childNodes[2].innerHTML;
  const lname = rowByClassId.childNodes[3].innerHTML;

  // step 1 find student
  const url = `${constants.searchStudentFindByFnameAndLname}${fname}&lname=${lname}`;
  const students = await utils.ftch(url, 'get', 'cors');
  await students;
  // find registrations of studentLink
  const studentLink = students._links.self.href;
  const registrationsOfStudentLinkUrl = `${constants.searchRegistrationsByStudent}${studentLink}`;
  const registrationsResp = await utils.ftch(registrationsOfStudentLinkUrl, 'get', 'cors');
  await registrationsResp;

  console.log('registrationsResp:', registrationsResp);
  const { _embedded: { registers } } = registrationsResp;
  // delete corresponding payment of registration
  const deletedStatus = registers.map(async reg => {
    console.log('reg:', reg);
    const { _links: { self: { href } } } = reg;
    // get payments
    const getPaymentUrl = `${constants.searchPaymentByRegistration}${href}`;
    // const payments = await utils.ftch(getPaymentUrl, 'get', 'cors');
    // await payments;
    // delete all payments first
    // const paymentLinks = payments._embedded.payeds; // use destruct here again
/*    debugger;
    for (let ww = 0; ww < paymentLinks.length; ww++) {
      console.log('deleting now paymentLink:', paymentLinks[ww]._links.payed.href);
      const paymentLink = paymentLinks[ww]._links.payed.href;
      const deletedPaymentLink = await utils.ftchDelete(paymentLink, 'delete', 'cors');
      await deletedPaymentLink;
      console.log(`deleted payment:${paymentLinks[ww]}`);
    }*/
    // delete registration after deleted payments
    const deletedRegistrationLink = await utils.ftchDelete(href, 'delete', 'cors');
    await deletedRegistrationLink;
    console.log('deletedRegistrationLink:', deletedRegistrationLink);
    return deletedRegistrationLink.status;
  });
  const statuses = await Promise.all(deletedStatus).then(values => {
    const [val] = values;
    return val;
  });

  return ({
    status: statuses,
  });
};
