import * as constants from '../constants';

export default registerId => {
  const x = document.getElementById('registers');
  const rowByClassId = x.querySelectorAll('tr')[registerId];
  const fname = rowByClassId.childNodes[2].innerHTML;
  const lname = rowByClassId.childNodes[3].innerHTML;

    // step 1 find student
  const url = `${constants.searchStudentClassesByFnameAndLname}${fname}&lname=${lname}`;
  const requestFindStudent = new XMLHttpRequest();
  requestFindStudent.open('GET', url, true);  // `false` makes the request synchronous
  requestFindStudent.setRequestHeader('Authorization', `Basic ${btoa('myapos:Apostolakis1981')}`);
  requestFindStudent.setRequestHeader('Content-type', 'application/json');
  requestFindStudent.contentType = 'application/json';
  requestFindStudent.onload = function () {
    if (requestFindStudent.readyState === 4) {
      if (requestFindStudent.status === 200) {
        const res = JSON.parse(requestFindStudent.responseText);
        try {
          // get studentLink
          const studentLink = res._links.self.href;
          // find registrations of studentLink
          fetch(`${constants.searchRegistrationsByStudent}${studentLink}`,
            {
              method: 'get',
              mode: 'cors',
              cache: 'default',
              headers: {
                'Authorization': `Basic ${btoa('myapos:Apostolakis1981')}`,
                'Content-Type': 'application/json',
              },
            })
            .then(res1 => res1.json())
            .then(res2 => {
              if (res2._embedded.registers.length > 0) {
                const registerLink = res2._embedded.registers[0]._links.self.href;
                // delete corresponding payment of register
                // let register = resObj2._embedded.registers[x]._links.self.href; //has to be fixed for many
                // get payments
                const url2 = `${constants.searchPaymentByRegistration}${registerLink}`;
                const request = new XMLHttpRequest();
                request.open('GET', url2, true);  // `false` makes the request synchronous
                request.setRequestHeader('Authorization', `Basic ${btoa('myapos:Apostolakis1981')}`);
                request.setRequestHeader('Content-type', 'application/json');
                request.contentType = 'application/json';
                request.registerLink = registerLink;
                request.onload = function () {
                  if (request.readyState === 4) {
                    if (request.status === 200) {
                      const resObj = JSON.parse(request.responseText);
                      // console.log("sync call 1:", resObj);

                      const paymentLinks = resObj._embedded.payeds; // has to be fixed for many????
                      // delete all payments first
                      let url3 = '';
                      let request2 = '';
                      // no payments ???
                      if (paymentLinks.length > 0) {
                        for (let ww = 0; ww < paymentLinks.length; ww++) {
                          url3 = paymentLinks[ww]._links.payed.href;
                          request2 = new XMLHttpRequest();
                          request2.open('delete', url3, true);  // `false` makes the request synchronous
                          request2.setRequestHeader('Authorization', `Basic ${btoa('myapos:Apostolakis1981')}`);
                          request2.setRequestHeader('Content-type', 'application/json');
                          request2.contentType = 'application/json';
                          request2.registerLink = this.registerLink;
                          request2.onload = function () {
                            if (request2.readyState === 4) {
                              if (request2.status === 204) {
                                console.log(`deleted payment:${paymentLinks[ww]}`);
                                // delete registration after deleted payments
                                const url4 = this.registerLink;
                                const request3 = new XMLHttpRequest();
                                request3.open('delete', url4, true);  // `false` makes the request synchronous
                                request3.setRequestHeader('Authorization', `Basic ${btoa('myapos:Apostolakis1981')}`);
                                request3.setRequestHeader('Content-type', 'application/json');
                                request3.contentType = 'application/json';
                                request3.onload = function () {
                                  if (request3.readyState === 4) {
                                    if (request3.status === 204) {
                                      alert('Register is deleted succesfully');
                                      // window.location.reload(true);
                                    } else {
                                      alert('Something bad happened.Please try again!');
                                    }
                                  }
                                };
                                request3.send(null);
                              }
                            }
                          };
                          request2.send(null);
                        }
                      } else {
                        console.log('No payments are found!Deleting registration');
                        debugger;
                        const url4 = registerLink;
                        const request3 = new XMLHttpRequest();
                        request3.open('delete', url4, true);  // `false` makes the request synchronous
                        request3.setRequestHeader('Authorization', `Basic ${btoa('myapos:Apostolakis1981')}`);
                        request3.setRequestHeader('Content-type', 'application/json');
                        request3.contentType = 'application/json';
                        request3.onload = function () {
                          if (request3.readyState === 4) {
                            if (request3.status === 204) {
                              alert('Register is deleted succesfully');
                              // window.location.reload(true);
                            } else {
                              alert('Something bad happened.Please try again!');
                            }
                          }
                        };
                        request3.send(null);
                      }
                    }
                  }
                };
                request.send(null);
              } else {
                alert('Student has no registrations to delete');
                window.location.reload(true);
              }
            });
        } catch (e) {
          alert(`Something bad happened. Error: ${e.message}. Please try again`);
          window.location.reload(true);
        }
      }
    }
  };
  requestFindStudent.send(null);
};
