import * as constants from '../constants';
import * as utils from '../utils';

export default async () => {
  const studentClasses = await utils.ftch(constants.studentClassesAPI, 'get', 'cors');
  await studentClasses;
  return studentClasses;
};
