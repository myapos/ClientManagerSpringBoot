import * as constants from '../constants';
/* deletes selected class from table -- classId parameter is the id in front end table not in the database*/
export default classId => {
  const x = document.getElementById('studentClasses');
  const rowByClassId = x.querySelectorAll('tr')[classId];
  const description = rowByClassId.childNodes[2].innerHTML;

  if (description === 'No subclass') {
    alert('You can not delete this class. It is used for declaring classes with no subclasses. Please choose a different one.');
  } else {
    fetch(`${constants.searchStudentClassesByDescription}${description}`, {
               method: 'get',
               mode: 'cors',
               cache: 'default',
               headers: {
                 'Authorization': `Basic ${btoa('myapos:Apostolakis1981')}`,
                 'Content-Type': 'application/json',
               },
             })
         .then(res => res.json())
         .then(res1 => {
             // console.log("data from server: ", res1);
           const ar = res1._links.self.href.split('/');
           const s = ar.length;
           const id = ar[s - 1];

             // delete record student class with id

           fetch(`${constants.studentClassesAPI}${id}`, {
             method: 'delete',
             mode: 'cors',
             cache: 'default',
             headers: {
               'Authorization': `Basic ${btoa('myapos:Apostolakis1981')}`,
               'Content-Type': 'application/json',
             },
           })
         .then(res2 => {
           if (res2.status === 204) {
             alert('Student class is deleted succesfully');
             window.location.reload(true);
           } else {
             alert('The class you are trying to delete is subclass to another class. Please try to delete the parent class first');
           }
         });
         });
  }
};
