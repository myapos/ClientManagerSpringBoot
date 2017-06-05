export default row => {
  const request1 = createCORSRequest1('post', `${parent.BASE_URL}/api/studentClasses`);
  if (request1) {
    request1.onload = function () {
      if (request1.status === 201) {
        alert('A new record has been created in database. Page is reloading');
        window.location.reload(true);
      }
    };

    request1.open('post', `${parent.BASE_URL}/api/studentClasses`);
    request1.setRequestHeader('Authorization', `Basic ${btoa('myapos:Apostolakis1981')}`);
    request1.setRequestHeader('Content-type', 'application/json');
    request1.contentType = 'application/json';

    /* this has to be fixed* sets subclass*/
    // find subclass by row.subClassdescription
    fetch(`${parent.BASE_URL}/api/studentClasses/search/findBydescription`
            + `?description=${row.subClassDescription}`, {
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
          const body = JSON.stringify({
            'description': parent.rowDescription,
            'studentClass': res._links.studentClass[0].href,
          });
          parent.request1.send(body);
        });

    parent.rowDescription = row.description;
    parent.request1 = request1;
  }
};