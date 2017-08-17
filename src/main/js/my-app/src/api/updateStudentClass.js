/* update selected class from table -- desc parameter is the description in front end table not in the database*/
import findLinkOfSubClass from '../utils/findLinkOfSubClass';

export default (newdesc, rowUpdate, studentClassesWithLinks, mode) => {
  // fetch call for update
  // curl -v -u myapos:Apostolakis1981 -X PATCH -H "Content-Type:application/json" -d '{ "description": "TEST_UPDATE", "studentClass":"http://localhost:8181/api/studentClasses/74" }' http://localhost:8181/api/studentClasses/74
  // find subclass link according to selection
  let bodyData = {};
  if (mode === 'parentClass') {
    const subClassLink = findLinkOfSubClass(rowUpdate.subClass, studentClassesWithLinks);
    bodyData = JSON.stringify({
      'description': newdesc,
      'studentClass': subClassLink,
    });
  } else if (mode === 'subClass') {
    const subClassLink = findLinkOfSubClass(newdesc, studentClassesWithLinks);
    bodyData = JSON.stringify({
      'description': rowUpdate.parentClass,
      'studentClass': subClassLink,
    });
  }
  if (rowUpdate.parentClass === 'No subclass') {
    alert('You can not update this class. It is used for declaring classes with no subclasses. Please choose a different one.');
    window.location.reload(true);
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
        alert('Class is updated succsesfully.');
        // window.location.reload(true);
      }
    });
  }
};

