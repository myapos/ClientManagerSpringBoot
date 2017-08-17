import * as constants from '../constants';
import * as utils from '../utils';

export default async (row, studentClassesWithLinks, onModalClose) => {
  // functionality --> Create new class
  // step 1 find link of subclass given to modal window
  // use studentClassesWithLinks for this to match description
  const subClassLink = utils.findLinkOfSubClass(row.subClass, studentClassesWithLinks);
  // step 2 execute post request to studentclasses api
  const bodyData = JSON.stringify({
    'description': row.parentClass,
    'studentClass': subClassLink,
  });
  const savedNewClass = await utils.ftchUpdate(constants.studentClassesAPI, 'POST', 'cors', bodyData);
  await savedNewClass;
  if (savedNewClass.status === 201) {
    alert('New class saved succesfully.');
    onModalClose();
  } else {
    alert('Something bad happened.');
  }
};
