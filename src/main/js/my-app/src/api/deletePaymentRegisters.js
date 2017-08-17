import * as api from './index.js';
/* deletes selected payment register from table*/

export default async keys => {

  const deletedPaymentPromises = keys.map(key => api.deletePaymentRegistersOne(key));
  const all = Promise.all(deletedPaymentPromises).then(values => {
    console.log(values);
    const failedToDelete = values.find(item => item.status !== 204);
    if (!failedToDelete) {
      alert('All items were deleted succesfully');
      // update status in order to redraw table
/*      return ({
        success: true,
      });*/
    } else {
      alert(' Failed to delete item in row. Is there a payment?');
/*      return ({
        success: false,
      });*/
    }
  });
  await all;
  return all;
};