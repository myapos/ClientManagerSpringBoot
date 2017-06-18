import * as constants from '../constants';

export default () => {
  // debugger;
  const getPayments = fetch(constants.paymentsAPI, {
    method: 'get',
    mode: 'cors',
    cache: 'default',
    headers: {
      'Authorization': `Basic ${btoa('myapos:Apostolakis1981')}`,
      'Content-Type': 'application/json',
    },
  })
.then(res => res.json())
.then(res => res._embedded.payeds);
  return getPayments;
};
