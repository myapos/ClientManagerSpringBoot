export default registerId => {
  const x = document.getElementById('registers');
  const rowByClassId = x.querySelectorAll('tr')[registerId];
  const fname = rowByClassId.childNodes[2].innerHTML;
  const lname = rowByClassId.childNodes[3].innerHTML;

    // step 1 find student
  const deletedPromise = fetch(`${parent.BASE_URL}/api/students/search/findByFnameAndLname?fname=${fname}&lname=${lname}`,
    {
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
      try {
        // get studentLink
        const studentLink = res._links.self.href;
        // find registrations of studentLink
        fetch(`${parent.BASE_URL}/api/registers/search/findByStudent?student=${studentLink}`,
          {
            method: 'get',
            mode: 'cors',
            cache: 'default',
            headers: {
              'Authorization': `Basic ${btoa('myapos:Apostolakis1981')}`,
              'Content-Type': 'application/json',
            },
          })
        .then(res2 => res2.json())
        .then(res3 => {
            // debugger;
          if (res3._embedded.registers.length > 0) {
            const registerLink = res3._embedded.registers[0]._links.self.href;
            // delete corresponding payment of register
            // let register = resObj2._embedded.registers[x]._links.self.href; //has to be fixed for many
            // get payments
            const url = `${parent.BASE_URL}/api/payeds/search/findByRegister?register=${registerLink}`;
            const request = new XMLHttpRequest();
            request.open('GET', url, true);  // `false` makes the request synchronous
            request.setRequestHeader('Authorization', `Basic ${btoa('myapos:Apostolakis1981')}`);
            request.setRequestHeader('Content-type', 'application/json');
            request.contentType = 'application/json';
            request.onload = function () {
              if (request.readyState === 4) {
                if (request.status === 200) {
                  const resObj = JSON.parse(request.responseText);
                            // console.log("sync call 1:", resObj);
                            // debugger;
                  const paymentLinks = resObj._embedded.payeds; // has to be fixed for many????
                            // delete all payments first
                  let url2 = '';
                  let request2 = '';

                  for (let ww = 0; ww < paymentLinks.length; ww++) {
                    url2 = paymentLinks[ww]._links.payed.href;
                    request2 = new XMLHttpRequest();
                    request2.open('delete', url2, true);  // `false` makes the request synchronous
                    request2.setRequestHeader('Authorization', `Basic ${btoa('myapos:Apostolakis1981')}`);
                    request2.setRequestHeader('Content-type', 'application/json');
                    request2.contentType = 'application/json';
                    request2.onload = function () {
                      if (request2.readyState === 4) {
                        if (request2.status === 204) {
                          console.log(`deleted payment:${paymentLinks[ww]}`);
                          // delete registration after deleted payments
                          const url3 = registerLink;
                          const request3 = new XMLHttpRequest();
                          request3.open('delete', url3, true);  // `false` makes the request synchronous
                          request3.setRequestHeader('Authorization', `Basic ${btoa('myapos:Apostolakis1981')}`);
                          request3.setRequestHeader('Content-type', 'application/json');
                          request3.contentType = 'application/json';
                          request3.send(null);
                          request3.onload = function () {
                            if (request3.readyState === 4) {
                              if (request3.status === 204) {
                                alert('Register is deleted succesfully');
                                window.location.reload(true);
                              } else {
                                alert('Something bad happened.Please try again!');
                              }
                            }
                          };
                        }
                      }
                    };
                    request2.send(null);
                  }
                } else {
                  alert('Student has no registrations to delete');
                  window.location.reload(true);
                }
              }
            };
            request.send(null);
          }
        });
      } catch (e) {
        alert(`Something bad happened. Error: ${e.message}. Please try again`);
        window.location.reload(true);
      }
    });
  return deletedPromise;
};
