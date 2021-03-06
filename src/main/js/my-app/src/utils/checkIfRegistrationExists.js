import ftch from './ftch';
import * as constants from '../constants';

export default async (studentLink, classLink) => {

  const searchLink = `${constants.searchRegistrationsByStudentAndStudentClass}${studentLink}&studentClass=${classLink}`;
  const res = await await ftch(searchLink, 'get');
  console.log('results from checkIf registration exists', res);
  const { _embedded : { registers: registrations } } = res;
  return registrations.length > 0;
};
