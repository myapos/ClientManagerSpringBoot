import * as constants from '../constants';
import * as utils from '../utils';

export default async (updateMode, row, cellValue) => {

  if (updateMode === 'paymentUpdate' || updateMode === 'paymentNotesUpdate'
        || updateMode === 'updateDateOfPayment' || updateMode === 'addPayment' || updateMode === 'classUpdate') {
    // step 1 find student by student fname and lname
    const url = `${constants.searchStudentFindByFnameAndLname}${row.fname}&lname=${row.lname}`;
    const classToBeUpdated = row.classDescription; // save class to be updated from row

    console.log('cellValue:', cellValue);
    const student = await utils.ftch(url, 'get', 'cors');
    await student;
    const { _links: { self: { href: studentLink } } } = student;
    // step 2 find student class by description row.class "http://localhost:8181/api/studentClasses/search/findBydescription{?description}",

    const urlStudentClass = `${constants.searchStudentClassesByDescription}${classToBeUpdated}`;
    const studentClassFound = await utils.ftch(urlStudentClass, 'get', 'cors');
    await studentClassFound;
    let { _links: { self: { href: studentClassLinkfound } } } = studentClassFound;
    // find register by student class
    const urlRegister = `${constants.searchRegistrationsByStudentAndStudentClass}${studentLink}&studentClass=${studentClassLinkfound}`;

    const registerFound = await utils.ftch(urlRegister, 'get', 'cors');
    await registerFound;
    const { _embedded: { registers } } = registerFound; // registers is array

    if (updateMode === 'classUpdate') {
      // find new classLink value to be updated according to new cellValue
      const newUrlStudentClass = `${constants.searchStudentClassesByDescription}${cellValue}`;
      const newStudentClassFound = await utils.ftch(newUrlStudentClass, 'get', 'cors');
      await newStudentClassFound;
      const { _links: { self: { href: newStudentClassLinkfound } } } = newStudentClassFound;
      studentClassLinkfound = newStudentClassLinkfound;
    }

    registers.map(async reg => {
      // update registration for student

      const { _links: { self: { href: registrationLink } } } = reg;
      if (updateMode === 'classUpdate') {
        console.log('update classes');
        // update registration  with new selected class
        // data to be updated
        const date = new Date(reg.dateOfRegistration.substr(0, 10));

        const bodyData = JSON.stringify({
          'studentClass': studentClassLinkfound,
          'dateOfRegistration': date,
          'student': studentLink,
        });

        // update corresponding registration
        const updateRegistration = await utils.ftchUpdate(registrationLink, 'PATCH', 'cors', bodyData);
        await updateRegistration;
        if (updateRegistration.status === 200) {
          alert('Registration is updated succesfully');
        } else {
          alert('Something bad happened');
        }
      } else {
        console.log('other cases....:');
        // update only the selected payment
        // step 3 update payments
        // step 3.1 find payment id to update
        console.log('log:', registrationLink);
        const urlPayments = constants.searchPaymentByRegistration + registrationLink;
        const paymentsFound = await utils.ftch(urlPayments, 'get', 'cors');
        await paymentsFound;
        const { _embedded: { payeds } } = paymentsFound; // payments is array
        // data to be updated
        const date = new Date(row.dateOfPayment.substr(0, 10));
        const bodyData = JSON.stringify({
          'payment': row.payment,
          'dateOfPayment': date,
          'notes': row.notes,
          'register': registrationLink,
        });
        // ean den iparxei plirwmi tote dimiourgise ti alliws kane update
        if (payeds.length === 0) {
          const paymentLink = `${constants.paymentsAPI}`;
          // step 3.2 update payments
          const updatePayment = await utils.ftchUpdate(paymentLink, 'POST', 'cors', bodyData);
          await updatePayment;
          if (updatePayment.status === 201) {
            alert('Payment is created succesfully');
          } else {
            alert('Something bad happened');
          }
        } else {
          console.log('There are payments. preparing to update', payeds);
          payeds.map(async payment => {
            const { _links: { payed: { href: paymentLink } } } = payment;

            const updatePayment = await utils.ftchUpdate(paymentLink, 'PATCH', 'cors', bodyData);
            await updatePayment;
            if (updatePayment.status === 200) {
              alert('Payment is updated succesfully');
            } else {
              alert('Something bad happened');
            }
          });
        }
      }
    });
  }
};
