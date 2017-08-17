import * as constants from '../constants';
import * as utils from '../utils';

export default async () => {
  console.log('hello from getdataregisters api function');
  // let ret = ['i am a simple string'];
  const dataRegisters = await utils.ftch(constants.getData, 'get', 'cors');
  await dataRegisters;
  return dataRegisters;
};
