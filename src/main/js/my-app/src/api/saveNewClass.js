import * as constants from '../constants';
import findLinkOfSubClass from '../utils/findLinkOfSubClass';

export default (row, studentClassesWithLinks) => {
  // functionality --> Create new class
  // step 1 find link of subclass given to modal window
  // use studentClassesWithLinks for this to match description
  debugger;
  const subClassLink = findLinkOfSubClass(row.subClass, studentClassesWithLinks);
  debugger;
  // step 2 execute post request to studentclasses api
  const bodyData = JSON.stringify({
    'description': row.parentClass,
    'studentClass': subClassLink,
  });

  fetch(constants.studentClassesAPI, {
    method: 'post',
    mode: 'cors',
    cache: 'default',
    headers: {
      'Authorization': `Basic ${btoa('myapos:Apostolakis1981')}`,
      'Content-Type': 'application/json',
    },
    body: bodyData,
  })
.then(res => {
  if (res.status === 201) {
    alert('New class saved succsesfully.Prepare for reloading');
    window.location.reload(true);
  } else {
    alert('Something bad happened.Please check your input data.');
  }
});
};
