import * as constants from '../constants';

export default (rowUpdate, cellName, cellValue)=> {
  // fetch call for update
  // curl -v -u myapos:Apostolakis1981 -X PATCH -H "Content-Type:application/json" -d '{ "description": "TEST_UPDATE", "studentClass":"http://localhost:8181/api/studentClasses/74" }' http://localhost:8181/api/students/74
  // let bodyData = {};

  const str = rowUpdate.email;
  if (str.indexOf('@') > 0) {
    let { [cellName]: newVar, _links, dateOfBirth, ...bodyData } = rowUpdate;
    bodyData[cellName] = cellValue;
    bodyData.manager = constants.searchByManager;
    const date = new Date(dateOfBirth[0]);
    bodyData.dateOfBirth = date;
    bodyData = JSON.stringify(bodyData);
    // find student by fname and lname and then perform update
    fetch(`${constants.searchStudentFindByFnameAndLname}${rowUpdate.fname}&lname=${rowUpdate.lname}`, {
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
      console.log('res:', res);
      fetch(res._links.self.href, {
        method: 'PATCH',
        mode: 'cors',
        cache: 'default',
        body: bodyData,
        headers: {
          'Authorization': `Basic ${btoa('myapos:Apostolakis1981')}`,
          'Content-Type': 'application/json',
        },
      })
    .then(res1 => {
      if (res1.status === 200) {
        alert('Student is updated succsesfully.');
        // window.location.reload(true);
      }
    });
    });
  } else {
    alert('Please check email input and try again. It has to be of email type. Example test@test.com');
    // window.location.reload(true);
  }
};
