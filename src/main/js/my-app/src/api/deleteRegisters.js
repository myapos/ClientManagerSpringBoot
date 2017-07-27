import * as api from './index.js';
/* deletes selected student from table -- studentId parameter is the id in front end table not in the database*/

export default async keys => {
  debugger;
  const deletedPromises = keys.map(key => api.deleteRegistersOneStudent(key));
  debugger;
  const all = Promise.all(deletedPromises).then(values => {
    debugger;
    console.log(values);
    const failedToDelete = values.find(item => item.status !== 204);

    if (!failedToDelete) {
      alert('All items were deleted succesfully');
      // update status in order to redraw table
      return ({
        success: true,
      });
    } else {
      alert(' Failed to delete item in row', failedToDelete.studentId);
      return ({
        success: false,
      });
    }
  });
  await all;
  return all;
};
