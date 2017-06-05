export default id => {
  const x = document.getElementById('PaymentRegisters');
  const rowByClassId = x.querySelectorAll('tr')[id];
  const notes = rowByClassId.childNodes[5].innerHTML;
  const subClassDescription = rowByClassId.childNodes[6].innerHTML;
  parent.paymentDate = rowByClassId.childNodes[7].innerHTML;
  // steps for deletion
  // i need registration id
  // delete payment only if there is one payment.
  if (notes !== 'No payment yet') {
    // step 1 find class id by description
    fetch(`${parent.BASE_URL}/api/studentClasses/search/findBydescription`
            + `?description=${subClassDescription}`, {
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
            // step 2 find registration id by class

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
              // for all registers get registration id's
              let url = ''; // initialization
              for (let jj = 0; jj < res2._embedded.registers.length; jj++) {
                // find payment by registration
                url = res2._embedded.registers[jj]._links.self.href;
                fetch(`${parent.BASE_URL}/api/payeds/search/findByRegister`
                    + `?register=${url}`, {
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
                      // step 3 find payments by registration id
                      if (res3._embedded.payeds.length > 0) {
                        // step 4  delete payment which is found
                        for (let vv = 0; vv < res3._embedded.payeds.length; vv++) {
                          const paymentUrl = res3._embedded.payeds[vv]._links.self.href;
                          fetch(paymentUrl, {
                            method: 'delete',
                            mode: 'cors',
                            cache: 'default',
                            headers: {
                              'Authorization': `Basic ${btoa('myapos:Apostolakis1981')}`,
                              'Content-Type': 'application/json',
                            },
                          })
                        .then(res4 => {
                          if (res4.status === 204) {
                            alert('deleted payment succesfully. Page is reloading');
                            window.location.reload(true);
                          } else {
                            alert('Something bad happened');
                          }
                        });
                        }
                      }
                    });
              }
            });
        });
  } else {
    alert('Payment is not set yet!');
  }
};
