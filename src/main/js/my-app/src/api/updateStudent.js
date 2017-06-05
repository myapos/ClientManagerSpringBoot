export default rowUpdate => {
    // fetch call for update
    // curl -v -u myapos:Apostolakis1981 -X PATCH -H "Content-Type:application/json" -d '{ "description": "TEST_UPDATE", "studentClass":"http://localhost:8181/api/studentClasses/74" }' http://localhost:8181/api/students/74

  const str = rowUpdate.email;
  const n = str.includes('@');

  if (n) {
    const date = new Date(rowUpdate.dateOfBirth);
    const bodyData = JSON.stringify({
      'fname': rowUpdate.fname,
      'lname': rowUpdate.lname,
      'email': rowUpdate.email,
      'dateOfBirth': date,
      'facebook': rowUpdate.facebook,
      'phone': rowUpdate.phone,
      'manager': `${parent.BASE_URL}/api/managers/17`,
    });
    fetch(rowUpdate._links.self.href, {
      method: 'PATCH',
      mode: 'cors',
      cache: 'default',
      body: bodyData,
      headers: {
        'Authorization': `Basic ${btoa('myapos:Apostolakis1981')}`,
        'Content-Type': 'application/json',
      },
    })
        .then(res => {
          if (res.status === 200) {
            alert('Student is updated succsesfully. Prepare for reloading');
            window.location.reload(true);
          }
        });
  } else {
    alert('Please check email input and try again. It has to be of email type. Example test@test.com');
    window.location.reload(true);
  }
};
