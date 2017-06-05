export default (updateMode, row) => {
  if (updateMode === 'paymentUpdate' || updateMode === 'paymentNotesUpdate'
        || updateMode === 'updateDateOfPayment' || updateMode === 'addPayment') {
         // step 1 find student by student fname and lname
    const url = `${parent.BASE_URL}/api/students/search/findByFnameAndLname?fname=${row.fname}&lname=${row.lname}`;
    const request = new XMLHttpRequest();
    request.open('GET', url, true);  // `false` makes the request synchronous
    request.setRequestHeader('Authorization', `Basic ${btoa('myapos:Apostolakis1981')}`);
    request.setRequestHeader('Content-type', 'application/json');
    request.contentType = 'application/json';
    request.row = row; // pass row in object
    request.onload = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          console.log(request.responseText);

          const resObj = JSON.parse(request.responseText);
          const student = resObj._links.self.href;

              // step 2 find student class by description row.class "http://localhost:8181/api/studentClasses/search/findBydescription{?description}",
          const url2St = `${parent.BASE_URL}/api/studentClasses/search/findBydescription?description=${this.row.class}`;
          const request2St = new XMLHttpRequest();
          request2St.open('GET', url2St, true);  // `false` makes the request synchronous
          request2St.setRequestHeader('Authorization', `Basic ${btoa('myapos:Apostolakis1981')}`);
          request2St.setRequestHeader('Content-type', 'application/json');
          request2St.contentType = 'application/json';
          request2St.row = this.row; // pass row in object
          request2St.onload = function () {
            if (request2St.readyState === 4) {
              if (request2St.status === 200) {
                const resObj2St = JSON.parse(request2St.responseText);

                        // step 2.1 find register by student class

                const url21 = `${parent.BASE_URL}/api/registers/search/findByStudentAndStudentClass?student=${
                            student}&studentClass=${resObj2St._links.self.href}`;

                const request21 = new XMLHttpRequest();
                request21.open('GET', url21, true);  // `false` makes the request synchronous
                request21.setRequestHeader('Authorization', `Basic ${btoa('myapos:Apostolakis1981')}`);
                request21.setRequestHeader('Content-type', 'application/json');
                request21.contentType = 'application/json';
                request21.row = this.row; // pass row in object
                request21.onload = function () {
                  if (request21.readyState === 4) {
                    if (request21.status === 200) {
                      const resObj21 = JSON.parse(request21.responseText);
                      // has to be fixed for many
                      const register = resObj21._links.self.href; // has to be fixed for many
                      // update only the selected payment
                      // step 3 update payments
                      // step 3.1 find payment id to update
                      const url3 = `${parent.BASE_URL}/api/payeds/search/findByRegister?register=${register}`;
                      const request3 = new XMLHttpRequest();
                      request3.open('GET', url3, true);  // `false` makes the request synchronous
                      request3.setRequestHeader('Authorization', `Basic ${btoa('myapos:Apostolakis1981')}`);
                      request3.setRequestHeader('Content-type', 'application/json');
                      request3.contentType = 'application/json';
                      request3.row = this.row;
                      request3.onload = function () {
                        if (request3.readyState === 4) {
                          if (request3.status === 200) {
                            const resObj3 = JSON.parse(request3.responseText);
                            // ean den iparxei plirwmi tote dimiourgise ti alliws kane update
                            if (resObj3._embedded.payeds.length === 0) {
                              const payment = `${parent.BASE_URL}/api/payeds/`;
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
                                                    // ki edw
                              for (let s = 0; s < resObj3._embedded.payeds.length; s++) { // for 2
                                const payment = resObj3._embedded.payeds[s]._links.payed.href; // has to be fixed for many

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
  }
};
