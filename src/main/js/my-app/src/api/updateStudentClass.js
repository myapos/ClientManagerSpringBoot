/* update selected class from table -- desc parameter is the description in front end table not in the database*/

export default (newdesc, rowUpdate) => {
    // fetch call for update
    // curl -v -u myapos:Apostolakis1981 -X PATCH -H "Content-Type:application/json" -d '{ "description": "TEST_UPDATE", "studentClass":"http://localhost:8181/api/studentClasses/74" }' http://localhost:8181/api/studentClasses/74

  const bodyData = JSON.stringify({
    'description': newdesc,
    'studentClass': rowUpdate._links.self.href,
  });
    // debugger;
  if (rowUpdate.description === 'No subclass') {
    alert('You can not update this class. It is used for declaring classes with no subclasses. Please choose a different one.');
  } else {
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
        alert('Class is updated succsesfully. Prepare for reloading');
        window.location.reload(true);
      }
    });
  }
};

