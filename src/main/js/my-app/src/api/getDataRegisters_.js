import * as constants from '../constants';

export default saved_student => {
  const students = saved_student;
  const dataRegisters = [];
  const studentPromises = students.map(student => {
    const url = student._links.student.href;
    const fetch1 = fetch(url, {
      method: 'get',
      mode: 'cors',
      cache: 'default',
      headers: {
        'Authorization': localStorage.getItem('jwt-token'), 
        'Content-Type': 'application/json',
      },
    })
          .then(res1 => res1.json())
          .then(res1 => {
            // 2nd async call
            // get registrations of all students

            const url2 = `${constants.searchRegistrationsByStudent}${student._links.self.href}`;

            const fetch2 = fetch(url2, {
              method: 'get',
              mode: 'cors',
              cache: 'default',
              headers: {
                'Authorization': localStorage.getItem('jwt-token'), 
                'Content-Type': 'application/json',
              },
            })
              .then(res2 => res2.json())
              .then(res2 => {
                const registrations = res2;

                // if student has registers get the classes of registers
                if (registrations._embedded.registers.length > 0) {
                    // for every registration get registered classes
                  for (let ww = 0; ww < registrations._embedded.registers.length; ww++) {
                    const url3 = registrations._embedded.registers[ww]._links.studentClass.href;

                    fetch(url3, {
                      method: 'get',
                      mode: 'cors',
                      cache: 'default',
                      headers: {
                        'Authorization': localStorage.getItem('jwt-token'), 
                        'Content-Type': 'application/json',
                      },
                    })
                    .then(res3 => res3.json())
                    .then(res3 => {
                      // save tempData
                      const tempData = {};
                      tempData.fname = res1.fname;
                      tempData.lname = res1.lname;
                      tempData.email = res1.email;
                      tempData.class = res3.description;
                      const dateOfRegistration = new Date(registrations._embedded.registers[ww].dateOfRegistration);
                      const formatedDate = dateOfRegistration.toString().match(/... ... [0-9][0-9] [0-9][0-9][0-9][0-9](?!([0-9][0-9]:[0-9][0-9]:[0-9][0-9] GMT[+]0300 \(EEST\)))/g)[0];
                      tempData.dateOfRegistration = formatedDate;
                      tempData.index = dataRegisters.length + 1;
                      dataRegisters.push(tempData);
                      return dataRegisters;
                    });
                  }
                } else {
                  // save tempData
                  const tempData = {};
                  tempData.fname = res1.fname;
                  tempData.lname = res1.lname;
                  tempData.email = res1.email;
                  tempData.class = 'No registered classes';
                  tempData.dateOfRegistration = 'No date of registration';
                  tempData.index = dataRegisters.length + 1;
                  dataRegisters.push(tempData);
                  return dataRegisters;
                }
              });
            return fetch2;
          });
    return fetch1;
  });
  const finishedPomises = Promise.all(studentPromises)
      .then(() => {
        // debugger;
        console.log('All studentPromises from getDataRegisters are done!!!');
        hideLoader('loader registers');
      });
  return finishedPomises;
};