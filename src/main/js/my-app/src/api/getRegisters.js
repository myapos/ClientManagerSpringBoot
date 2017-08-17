import * as constants from '../constants';
import * as utils from '../utils';

export default async () => {
  const registersData = await utils.ftch(constants.registersAPI, 'get', 'cors');
  await registersData;
  return registersData;
};
