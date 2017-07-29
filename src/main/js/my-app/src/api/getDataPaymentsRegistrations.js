// import hideLoader from './hideLoader';
import * as constants from '../constants';
import * as utils from '../utils';

export default async saved_student => {
  const dataPaymentRegisters = [];
  const students = saved_student;
  // steps get data payments registration

  // 1. for each student get registrations
  await students.map(async st => {
    console.log('st:', st);

    const { _links: { self: { href: selfSt } } } = st;

    // fetch registrations
    const urlReg = `${constants.searchRegistrationsByStudent}${selfSt}`;
    // find registrations of studentLink
    const registrationsObject = await utils.ftch(urlReg, 'get', 'cors');
    await registrationsObject;
    const { _embedded: { registers } } = registrationsObject;
    // for each registration get payments //registers is array

    registers.map(async reg => {
      const { _links: { self: { href: registrationLink } } } = reg;
      // fetch payments
      const urlPaym = `${constants.searchPaymentByRegistration}${registrationLink}`;
      const paymentsObj = await utils.ftch(urlPaym, 'get', 'cors');
      await paymentsObj;
      const { _embedded: { payeds } } = paymentsObj;

      // if there are payments then get classes description
      const { _links: { studentClass: { href: studentClassLink } } } = reg;
      const studentClass = await utils.ftch(studentClassLink, 'get', 'cors');
      await studentClass;
      if (payeds.length) {
        console.log('there are payments');
        payeds.map(p => {
          const tempData_ = {};
          tempData_.fname = st.fname;
          tempData_.lname = st.lname;
          tempData_.email = st.email;
          tempData_.class = studentClass.description;
          // for each payment push it in payment register
          tempData_.payment = p.payment;
          tempData_.notes = p.notes;
          const date = new Date(p.dateOfPayment);
          const formatedDate = date.toString().match(/... ... [0-9][0-9] [0-9][0-9][0-9][0-9](?!([0-9][0-9]:[0-9][0-9]:[0-9][0-9] GMT[+]0300 \(EEST\)))/g)[0];
          tempData_.dateOfPayment = formatedDate;
          tempData_.index = dataPaymentRegisters.length + 1;
          dataPaymentRegisters.push(tempData_);
          return dataPaymentRegisters;
        });
      } else {
        console.log('No payments');
        const tempData__ = {};
        tempData__.fname = st.fname;
        tempData__.lname = st.lname;
        tempData__.email = st.email;
        tempData__.class = studentClass.description;
        tempData__.payment = false;
        tempData__.notes = 'No payment yet';
        const dateOfPayment = new Date('Sun Feb 01 1970 00:00:00 GMT+0200 (EET)'); // for none payments
        const formatedDate = dateOfPayment.toString().match(/... ... [0-9][0-9] [0-9][0-9][0-9][0-9](?!([0-9][0-9]:[0-9][0-9]:[0-9][0-9] GMT[+]0300 \(EEST\)))/g)[0];
        tempData__.dateOfPayment = formatedDate;
        tempData__.index = dataPaymentRegisters.length + 1;
        dataPaymentRegisters.push(tempData__);
        return dataPaymentRegisters;
      }
    });
  });
  console.log('dataPaymentRegisters:', dataPaymentRegisters);
  return dataPaymentRegisters;
};
