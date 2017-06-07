import extractId from '../utils/extractId';

export default id => {
  const x = document.getElementById('PaymentRegisters');
  const rowByClassId = x.querySelectorAll('tr')[id];
  const fname = rowByClassId.childNodes[2].innerHTML;
  const lname = rowByClassId.childNodes[3].innerHTML;
  const notes = rowByClassId.childNodes[5].innerHTML;
  const subClassDescription = rowByClassId.childNodes[6].innerHTML;
  parent.paymentDate = rowByClassId.childNodes[7].innerHTML;

  // steps for deletion
  // i need registration id
  // delete payment only if there is one payment.
  if (notes !== 'No payment yet') {
    // step 1 find student by name and last name
    fetch(`${parent.BASE_URL}/api/students/search/findByFnameAndLname`
            + `?fname=${fname}&lname=${lname}`, {
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
          // console.log('res:', res);
          // const studentId = extractId (res._links.student.href);
          // debugger;
          // step 2 find register by student id
          fetch(`${parent.BASE_URL}/api/registers/search/findByStudent?student=${res._links.student.href}`,
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
            .then(res2 => {
              // step3 find payment by register id
              console.log('res2:', res2);
              const registerId = extractId (res2._embedded.registers[0]._links.self.href);
              console.log('registerId:', registerId);
              fetch(`${parent.BASE_URL}/api/payeds/search/findByRegisterId`
                  + `?id=${registerId}`, {
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
                    console.log('res3:', res3);
                    const paymentUrl = res3._embedded.payeds[0]._links.self.href;
                    // step4 delete payment
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
                  });
            });
        });
  }
};
