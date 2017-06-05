export default (msg, selectedClass) => {
  // debugger;
  parent.msgSubmitted = msg;
  // steps
  // find students who have payed for the selected class
  // get selected classes from server
  fetch(`${parent.BASE_URL}/api/studentClasses/search/findBydescription`
            + `?description=${selectedClass}`, {
              method: 'get',
              mode: 'cors',
              cache: 'default',
              headers: {
                'Authorization': `Basic ${btoa('myapos:Apostolakis1981')}`,
                'Content-Type': 'application/json',
              },
            })
        .then(res => res.json())
        .then(res => {
          parent.classDescriptionForEmails = res.description;
          // get registrations by student class
          fetch(`${parent.BASE_URL}/api/registers/search/findByStudentClass`
            + `?studentClass=${res._links.self.href}`, {
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
             // for all registrations get students who have payed for them and send emails
             // so in this step get payments by registrations
             // first search to set a flag if payments exist. This is useful in order to display messages to the user
              parent.flagPaymentsExist = 0;
              const flagPaymentsExistAr = [];
              const checkNumOfRegisters = res2._embedded.registers.length;
              res2._embedded.registers.map((el, count) => {
                const urlT = `${parent.BASE_URL}/api/payeds/search/findByRegister`
                         + `?register=${el._links.self.href}`;
                const requestT = new XMLHttpRequest();
                requestT.open('GET', urlT, true);  // `false` makes the request synchronous
                requestT.setRequestHeader('Authorization', `Basic ${btoa('myapos:Apostolakis1981')}`);
                requestT.setRequestHeader('Content-type', 'application/json');
                requestT.contentType = 'application/json';
                requestT.count = count;
                requestT.onload = function () {
                  if (requestT.readyState === 4) {
                    if (requestT.status === 200) {
                      const resObjT = JSON.parse(requestT.responseText);
                      if (resObjT._embedded.payeds.length > 0) {
                        flagPaymentsExistAr.push(1);
                        resObjT._embedded.payeds.map(p => {
                          const url2 = el._links.student.href;
                          const request2 = new XMLHttpRequest();
                          request2.open('GET', url2, true);  // `false` makes the request synchronous
                          request2.setRequestHeader('Authorization', `Basic ${btoa('myapos:Apostolakis1981')}`);
                          request2.setRequestHeader('Content-type', 'application/json');
                          request2.contentType = 'application/json';
                          request2.onload = function () {
                            if (request2.readyState === 4) {
                              if (request2.status === 200) {
                                const student = JSON.parse(request2.responseText);
                                // send emails if payment is true
                                if (p.payment) {
                                  // send email to student
                                  send_email(student.fname, student.lname, student.email, parent.msgSubmitted);
                                }
                              } else {
                                alert('Something bad happened');
                              }
                            }
                          };
                          request2.send(null);
                        });
                      } else {
                        flagPaymentsExistAr.push(0);
                      }
                     // ean teleiwsan ta requests kai to a8roisma olwn twn el tou flagPaymentsExistAr einai 0
                     // tote den iparxoun plirwmes
                      const sum = flagPaymentsExistAr.reduce((total, el2) => total + el2);
                      if (!sum && (this.count + 1) === checkNumOfRegisters) {
                        alert('No student have payed yet for the selected class');
                      } else if ((this.count + 1) === checkNumOfRegisters) {
                        alert('All emails where send succesfully');
                      }
                    }
                  }
                };
                requestT.send(null);
              });
            });
        });
};
