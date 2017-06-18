import * as constants from '../constants';

export default row => {
    // create call -- we need student id, studentClass id, dateOfRegistration

    // find studentClass id

  const url = `${constants.searchStudentClassesByDescription}${row.class}`;
  const request = new XMLHttpRequest();
  request.open('GET', url, true);  // `false` makes the request synchronous
  request.setRequestHeader('Authorization', `Basic ${btoa('myapos:Apostolakis1981')}`);
  request.setRequestHeader('Content-type', 'application/json');
  request.contentType = 'application/json';
  request.row = row;
  request.onload = function () {
    if (request.readyState === 4) {
      if (request.status === 200) {
        const resObj = JSON.parse(request.responseText);
        const classLink = resObj._links.self.href; // has to be fixed for many????
        const url2 = `${constants.searchStudentClassesByFnameAndLname}${this.row.fname}&lname=${this.row.lname}`;
        const request2 = new XMLHttpRequest();
        request2.open('GET', url2, true);  // `false` makes the request synchronous
        request2.setRequestHeader('Authorization', `Basic ${btoa('myapos:Apostolakis1981')}`);
        request2.setRequestHeader('Content-type', 'application/json');
        request2.contentType = 'application/json';
        request2.onload = function () {
          if (request2.readyState === 4) {
            if (request2.status === 200) {
              // step 2 find student id to update
              const resObj2 = JSON.parse(request2.responseText);
              const studentLink = resObj2._links.self.href; // has to be fixed for many
              // new registration call
              const url3 = `${constants.searchRegistrationsByStudent}${studentLink}`;
              const request3 = new XMLHttpRequest();
              request3.open('GET', url3, true);  // `false` makes the request synchronous
              request3.setRequestHeader('Authorization', `Basic ${btoa('myapos:Apostolakis1981')}`);
              request3.setRequestHeader('Content-type', 'application/json');
              request3.contentType = 'application/json';
              request3.onload = function () {
                if (request3.readyState === 4) {
                  if (request3.status === 200) {
                    const resObj3 = JSON.parse(request3.responseText);
                    const date = new Date(row.dateOfRegistration.substr(0, 10));

                    const bodyData = JSON.stringify({
                      'studentClass': classLink,
                      'dateOfRegistration': date,
                      'student': studentLink,
                    });

                    // update registration for student
                    const url4 = resObj3._embedded.registers[0]._links.self.href;
                    const request4 = new XMLHttpRequest();
                    request4.open('PATCH', url4, true);  // `false` makes the request synchronous
                    request4.setRequestHeader('Authorization', `Basic ${btoa('myapos:Apostolakis1981')}`);
                    request4.setRequestHeader('Content-type', 'application/json');
                    request4.contentType = 'application/json';
                    request4.onload = function () {
                      if (request4.readyState === 4) {
                        if (request4.status === 200) {
                          if (request4.status === 200) {
                            alert('Registration has been updated in database. Page is reloading');
                            // window.location.reload(true);
                          } else {
                            alert('Something bad has happened. Please try again');
                          }
                        }
                      }
                    };

                    request4.send(bodyData);
                  }
                }
              };
              request3.send(null);
            }
          }
        };
        request2.send(null);
      }
    }
  };
  request.send(null);
};
