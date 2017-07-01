//import hideLoader from './hideLoader';
import * as constants from '../constants';

export default saved_student => {
  let fetch1;
  const dataPaymentRegisters = [];
  const students = saved_student;
  const studentPromises = students.map(student => {
    const url1 = `${constants.searchRegistrationsByStudent}${student._links.self.href}`;
    fetch1 = fetch(url1, {
      method: 'get',
      mode: 'cors',
      cache: 'default',
      headers: {
        'Authorization': `Basic ${btoa('myapos:Apostolakis1981')}`,
        'Content-Type': 'application/json',
      },
    })
    .then(res1 => res1.json())
    .then(res1 => {
      parent.isloading = 0;

      const registrations = res1;

      if (registrations._embedded.registers.length > 0) {
        // get payments of those students . if there aren't any then you can set them
            // debugger;
        for (let jw = 0; jw < registrations._embedded.registers.length; jw++) {
          const url2 = `${constants.searchPaymentByRegistration}${registrations._embedded.registers[jw]._links.self.href}`;
          fetch(url2, {
            method: 'get',
            mode: 'cors',
            cache: 'default',
            headers: {
              'Authorization': `Basic ${btoa('myapos:Apostolakis1981')}`,
              'Content-Type': 'application/json',
            },
          })
              .then(res2 => res2.json())
              .then(res2 => {
                const payments = res2;

                const tempData = {};
                tempData.fname = student.fname;
                tempData.lname = student.lname;
                tempData.email = student.email;

                if (typeof payments._embedded.payeds !== 'undefined') {
                    // get classes of registered students
                  const url3 = registrations._embedded.registers[jw]._links.studentClass.href;
                  fetch(url3, {
                    method: 'get',
                    mode: 'cors',
                    cache: 'default',
                    headers: {
                      'Authorization': `Basic ${btoa('myapos:Apostolakis1981')}`,
                      'Content-Type': 'application/json',
                    },
                  })
                    .then(res3 => res3.json())
                    .then(res3 => {
                      const studentClasses = res3;// JSON.parse(request3.responseText);
                      const tempData_ = {};
                      if (typeof payments._embedded.payeds[0] !== 'undefined') {
                        tempData_.fname = student.fname;
                        tempData_.lname = student.lname;
                        tempData_.email = student.email;
                        tempData_.class = studentClasses.description;

                        tempData_.payment = payments._embedded.payeds[0].payment;
                        tempData_.notes = payments._embedded.payeds[0].notes;
                        const date = new Date(payments._embedded.payeds[0].dateOfPayment);
                        const formatedDate = date.toString().match(/... ... [0-9][0-9] [0-9][0-9][0-9][0-9](?!([0-9][0-9]:[0-9][0-9]:[0-9][0-9] GMT[+]0300 \(EEST\)))/g)[0];
                        tempData_.dateOfPayment = formatedDate;
                        tempData_.index = dataPaymentRegisters.length + 1;
                        dataPaymentRegisters.push(tempData_);
                        return dataPaymentRegisters;
                      }
                    });
                } else {
                  const url4 = registrations._embedded.registers[jw]._links.studentClass.href;
                  fetch(url4, {
                    method: 'get',
                    mode: 'cors',
                    cache: 'default',
                    headers: {
                      'Authorization': `Basic ${btoa('myapos:Apostolakis1981')}`,
                      'Content-Type': 'application/json',
                    },
                  })
                    .then(res4 => res4.json())
                    .then(res4 => {
                      const studentClasses = res4;
                      const tempData__ = {};
                      tempData__.fname = student.fname;
                      tempData__.lname = student.lname;
                      tempData__.email = student.email;
                      tempData__.class = studentClasses.description;
                      tempData__.payment = false;
                      tempData__.notes = 'No payment yet';
                      const dateOfPayment = new Date('Sun Feb 01 1970 00:00:00 GMT+0200 (EET)'); // for none payments
                      const formatedDate = dateOfPayment.toString().match(/... ... [0-9][0-9] [0-9][0-9][0-9][0-9](?!([0-9][0-9]:[0-9][0-9]:[0-9][0-9] GMT[+]0300 \(EEST\)))/g)[0];
                      tempData__.dateOfPayment = formatedDate;
                      tempData__.index = dataPaymentRegisters.length + 1;
                      dataPaymentRegisters.push(tempData__);
                      return dataPaymentRegisters;
                    });
                }
              });
        }
      }
    });
    return fetch1;
  });

  // Promise.all(studentPromises)
  //     .then(() => {
  //       console.log('All studentPromises from getDataPayments are done!!!');
  //     });
    // debugger;
  return dataPaymentRegisters;
};