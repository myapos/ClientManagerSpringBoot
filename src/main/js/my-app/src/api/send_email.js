export default (first, last, email, msg) => {
    // send email request to server side
  fetch(`${parent.BASE_URL}/email?fname=${first}&lname=${last}&email=${email}&msg=${msg}&mode=selectedClasses`, {
    method: 'get',
    mode: 'cors',
    cache: 'default',
    headers: {
      'Authorization': `Basic ${btoa('myapos:Apostolakis1981')}`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      if (res.status === 200) {
        console.log('Emails where send succesfully');
      } else {
        alert('Something bad happened');
      }
    });
};// end of send_email
