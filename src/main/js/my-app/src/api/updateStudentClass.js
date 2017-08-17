/* update selected class from table -- desc parameter is the description in front end table not in the database*/
import * as utils from '../utils';

export default async (newdesc, rowUpdate, studentClassesWithLinks, mode) => {
  // fetch call for update
  // curl -v -u myapos:Apostolakis1981 -X PATCH -H "Content-Type:application/json" -d '{ "description": "TEST_UPDATE", "studentClass":"http://localhost:8181/api/studentClasses/74" }' http://localhost:8181/api/studentClasses/74
  // find subclass link according to selection
  let bodyData = {};
  if (mode === 'parentClass') {
    const subClassLink = utils.findLinkOfSubClass(rowUpdate.subClass, studentClassesWithLinks);
    bodyData = JSON.stringify({
      'description': newdesc,
      'studentClass': subClassLink,
    });
  } else if (mode === 'subClass') {
    const subClassLink = utils.findLinkOfSubClass(newdesc, studentClassesWithLinks);
    bodyData = JSON.stringify({
      'description': rowUpdate.parentClass,
      'studentClass': subClassLink,
    });
  }
  if (rowUpdate.parentClass === 'No subclass') {
    alert('You can not update this class. It is used for declaring classes with no subclasses. Please choose a different one.');
    window.location.reload(true);
  } else {
    const updateStudentClass = await utils.ftchUpdate(rowUpdate._links.self.href, 'PATCH', 'cors', bodyData);
    await updateStudentClass;
    if (updateStudentClass.status === 200) {
      alert('Class is updated succsesfully');
    } else {
      alert('Something bad happened');
    }
  }
};

