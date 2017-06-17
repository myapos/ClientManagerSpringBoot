import * as constants from '../constants';

export default (updateMode, row) => {
  if (updateMode === 'paymentUpdate' || updateMode === 'paymentNotesUpdate'
        || updateMode === 'updateDateOfPayment' || updateMode === 'addPayment' || updateMode === 'classUpdate') {
    // step 1 find student by student fname and lname
    const url = `${constants.searchStudentFindByFnameAndLname}${row.fname}&lname=${row.lname}`;
    const request = new XMLHttpRequest();
    request.open('GET', url, true);  // `false` makes the request synchronous
    request.setRequestHeader('Authorization', `Basic ${btoa('myapos:Apostolakis1981')}`);
    request.setRequestHeader('Content-type', 'application/json');
    request.contentType = 'application/json';
    request.row = row; // pass row in object
    request.updateMode = updateMode; // pass updateMode in object
    request.onload = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          console.log(request.responseText);

          const resObj = JSON.parse(request.responseText);
          const student = resObj._links.self.href;

          // step 2 find student class by description row.class "http://localhost:8181/api/studentClasses/search/findBydescription{?description}",
          const url2St = `${constants.searchStudentClassesByDescription}${this.row.class}`;
          const request2St = new XMLHttpRequest();
          request2St.open('GET', url2St, true);  // `false` makes the request synchronous
          request2St.setRequestHeader('Authorization', `Basic ${btoa('myapos:Apostolakis1981')}`);
          request2St.setRequestHeader('Content-type', 'application/json');
          request2St.contentType = 'application/json';
          request2St.row = this.row; // pass row in object
          request2St.student = student; // pass student in object
          request2St.updateMode = this.updateMode; // pass updateMode in object
          request2St.onload = function () {
            if (request2St.readyState === 4) {
              if (request2St.status === 200) {
                const resObj2St = JSON.parse(request2St.responseText);
                // step 2.1 find register by student class

                const url21 = `${constants.searchRegistrationsByStudentAndStudentClass}${student}&studentClass=${resObj2St._links.self.href}`;

                const request21 = new XMLHttpRequest();
                request21.open('GET', url21, true);  // `false` makes the request synchronous
                request21.setRequestHeader('Authorization', `Basic ${btoa('myapos:Apostolakis1981')}`);
                request21.setRequestHeader('Content-type', 'application/json');
                request21.contentType = 'application/json';
                request21.row = this.row; // pass row in object
                request21.updateMode = this.updateMode; // pass updateMode in object
                request21.class = resObj2St; // pass class in object
                request21.student = this.student; // pass student in object
                request21.onload = function () {
                  if (request21.readyState === 4) {
                    if (request21.status === 200) {
                      const resObj21 = JSON.parse(request21.responseText);
                      // has to be fixed for many
                      const register = resObj21._embedded.registers[0]._links.self.href; // has to be fixed for many
                      if (this.updateMode === 'classUpdate') {
                        console.log('update classes');
                        // update registration  with new selected class
                        // const resObj3 = JSON.parse(request3.responseText);
                        const date = new Date(resObj21._embedded.registers[0].dateOfRegistration.substr(0, 10));

                        const bodyData = JSON.stringify({
                          'studentClass': this.class._links.self.href,
                          'dateOfRegistration': date,
                          'student': this.student,
                        });

                        // update registration for student
                        // const url4 = resObj3._embedded.registers[0]._links.self.href;
                        const request6 = new XMLHttpRequest();
                        request6.open('PATCH', register, true);  // `false` makes the request synchronous
                        request6.setRequestHeader('Authorization', `Basic ${btoa('myapos:Apostolakis1981')}`);
                        request6.setRequestHeader('Content-type', 'application/json');
                        request6.contentType = 'application/json';
                        request6.onload = function () {
                          if (request6.readyState === 4) {
                            if (request6.status === 200) {
                              if (request6.status === 200) {
                                alert('Registration has been updated in database.');
                                // window.location.reload(true);
                              } else {
                                alert('Something bad has happened. Please try again');
                              }
                            }
                          }
                        };

                        request6.send(bodyData);



                      } else {
                        console.log('other cases....:');
                        // update only the selected payment
                        // step 3 update payments
                        // step 3.1 find payment id to update
                        console.log('log:', register);
                        const url3 = constants.searchPaymentByRegistration + register;
                        const request3 = new XMLHttpRequest();
                        request3.open('GET', url3, true);  // `false` makes the request synchronous
                        request3.setRequestHeader('Authorization', `Basic ${btoa('myapos:Apostolakis1981')}`);
                        request3.setRequestHeader('Content-type', 'application/json');
                        request3.contentType = 'application/json';
                        request3.row = this.row;
                        request3.updateMode = this.updateMode; // pass updateMode in object
                        request3.onload = function () {
                          if (request3.readyState === 4) {
                            if (request3.status === 200) {
                              const resObj3 = JSON.parse(request3.responseText);
                              // ean den iparxei plirwmi tote dimiourgise ti alliws kane update
                              if (resObj3._embedded.payeds.length === 0) {
                                const payment = `${constants.paymentsAPI}`;
                                // step 3.2 update payments
                                const date = new Date(row.dateOfPayment.substr(0, 10));
                                const bodyData = JSON.stringify({
                                  'payment': row.payment,
                                  'dateOfPayment': date,
                                  'notes': row.notes,
                                  register,
                                });
                                const request5 = new XMLHttpRequest();
                                request5.open('POST', payment, true);  // `false` makes the request synchronous
                                request5.setRequestHeader('Authorization', `Basic ${btoa('myapos:Apostolakis1981')}`);
                                request5.setRequestHeader('Content-type', 'application/json');
                                request5.contentType = 'application/json';
                                request5.row = this.row;
                                request5.updateMode = this.updateMode; // pass updateMode in object
                                request5.onload = function () {
                                  if (request5.readyState === 4) {
                                    if (request5.status === 201) {
                                      alert('Payment has been updated in database. Page is reloading');
                                      window.location.reload(true);
                                    } else {
                                      alert('Something bad has happened. Please try again');
                                    }
                                  }
                                };
                                request5.send(bodyData);
                              } else {
                                for (let s = 0; s < resObj3._embedded.payeds.length; s++) { // for 2
                                  const payment = resObj3._embedded.payeds[s]._links.payed.href; // has to be fixed for many
                                  debugger;
                                  // step 3.2 update payments
                                  const date = new Date(row.dateOfPayment.substr(0, 10));

                                  const bodyData = JSON.stringify({
                                    'payment': row.payment,
                                    'dateOfPayment': date,
                                    'notes': row.notes,
                                    register,
                                  });
                                  const request4 = new XMLHttpRequest();
                                  request4.open('PATCH', payment, true);  // `false` makes the request synchronous
                                  request4.setRequestHeader('Authorization', `Basic ${btoa('myapos:Apostolakis1981')}`);
                                  request4.setRequestHeader('Content-type', 'application/json');
                                  request4.contentType = 'application/json';
                                  request4.row = this.row;
                                  request4.updateMode = this.updateMode; // pass updateMode in object
                                  request4.onload = function () {
                                    if (request4.readyState === 4) {
                                      if (request4.status === 200) {
                                        if (s === resObj3._embedded.payeds.length - 1) {
                                          alert('Payment has been updated in database. Page is reloading');
                                          window.location.reload(true);
                                        } else {
                                          alert('Something bad has happened. Please try again');
                                        }
                                      }
                                    }
                                  };
                                  request4.send(bodyData);
                                }// end of for 2
                              } // end of else
                            }
                          }
                        };
                        request3.send(null);
                      } //end of else of update other cases

                    }
                  }
                };
                request21.send(null);
              }
            }
          };
          request2St.send(null);
        } else {
          console.error(request.statusText);
        }
      }
    };
    request.send(null);
  } else if (0 && updateMode === 'classUpdate') {
    console.log('preparing to update class');
    // step 1
    // find id of selected class
    // find registration id of student 
    // update registration with new row data and class

  }
};
