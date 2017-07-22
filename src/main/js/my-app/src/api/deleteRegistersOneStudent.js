import * as utils from '../utils';
import * as constants from '../constants';

export default registerId => {
  const x = document.getElementById('registers');
  const rowByClassId = x.querySelectorAll('tr')[registerId];
  const fname = rowByClassId.childNodes[2].innerHTML;
  const lname = rowByClassId.childNodes[3].innerHTML;

  // step 1 find student
  const url = `${constants.BASE_URL}/api/students/search/findByFnameAndLname?fname=${fname}&lname=${lname}`;
  const deletedPromise = utils.ftch(url, 'get', 'cors');
  // find registrations of studentLink
  // delete corresponding payment of register
    // let register = resObj2._embedded.registers[x]._links.self.href; //has to be fixed for many
    // get payments
  // delete all payments first
  // delete registration after deleted payments
  // await deletedPromise;
  // await deletedPromise;
  // debugger;
  return deletedPromise;
};
