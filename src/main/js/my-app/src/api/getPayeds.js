import * as constants from '../constants';
import * as utils from '../utils';

export default async () => {
  const getPayments = await utils.ftch(constants.paymentsAPI, 'get', 'cors');
  await getPayments;
  return getPayments;
};
