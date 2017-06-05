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
              res2._embedded.registers.map(el => {
                // use sync calls here!!
                const urlT = `${parent.BASE_URL}/api/payeds/search/findByRegister`
                         + `?register=${el._links.self.href}`;
                const requestT = new XMLHttpRequest();
                requestT.open('GET', urlT, false);  // `false` makes the request synchronous
                requestT.setRequestHeader('Authorization', `Basic ${btoa('myapos:Apostolakis1981')}`);
                requestT.setRequestHeader('Content-type', 'application/json');
                requestT.contentType = 'application/json';
                requestT.send(null);
                if (requestT.status === 200) {
                  const resObjT = JSON.parse(requestT.responseText);
                  if (resObjT._embedded.payeds.length > 0) {
                    parent.flagPaymentsExist = 1;
                                 // stop execution of function
                  }
                }
              });

              res2._embedded.registers.map(el => {
                // use sync calls here!!
                const url = `${parent.BASE_URL}/api/payeds/search/findByRegister`
                     + `?register=${el._links.self.href}`;
                const request = new XMLHttpRequest();
                request.open('GET', url, false);  // `false` makes the request synchronous
                request.setRequestHeader('Authorization', `Basic ${btoa('myapos:Apostolakis1981')}`);
                request.setRequestHeader('Content-type', 'application/json');
                request.contentType = 'application/json';
                request.send(null);
                if (request.status === 200) {
                  const resObj = JSON.parse(request.responseText);
                  // get student
                  if (!parent.flagPaymentsExist) {
                    alert(`No student have payed yet for class:${parent.classDescriptionForEmails}`);
                  } else {
                    resObj._embedded.payeds.map(p => {
                      const url2 = el._links.student.href;
                      const request2 = new XMLHttpRequest();
                      request2.open('GET', url2, false);  // `false` makes the request synchronous
                      request2.setRequestHeader('Authorization', `Basic ${btoa('myapos:Apostolakis1981')}`);
                      request2.setRequestHeader('Content-type', 'application/json');
                      request2.contentType = 'application/json';
                      request2.send(null);

                      if (request2.status === 200) {
                        const student = JSON.parse(request2.responseText);

                                    // send emails if payment is true
                                    // debugger;
                        console.log('log:', p);
                        if (p.payment) {
                                        // send email to student
                          send_email(student.fname, student.lname, student.email, parent.msgSubmitted);
                        }
                      } else {
                        alert('Something bad happened');
                      }
                    });
                  } // end of else
                }
              });
            });
        });
};
