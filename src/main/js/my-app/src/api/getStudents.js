import * as constants from '../constants';
import * as utils from '../utils';

export default async mode => {
  const studentsData = await utils.ftch((mode === 'pagination') ? `${constants.studentsAPI}` : `${constants.studentsOfAllAPI}`, 'get', 'cors');
  await studentsData;
  return studentsData;
};
