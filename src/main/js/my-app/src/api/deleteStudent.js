import * as constants from '../constants';
/* deletes selected student from table -- studentId parameter is the id in front end table not in the database*/

export default studentId => {
  const x = document.getElementById('students');
  const rowByClassId = x.querySelectorAll('tr')[studentId];
  const fname = rowByClassId.childNodes[2].innerHTML;

  fetch(`${constants.searchStudentFindByName}`
            + `?fname=${fname}`, {
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
          try {
            const ar = res1._links.self.href.split('/');
            const s = ar.length;
            const id = ar[s - 1];
            // delete record student class with id

            fetch(`${constants.studentsAPI}/${id}`, {
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
                alert('Student is deleted succesfully.Prepare to reload');
                window.location.reload(true);
              } else if (res2.status === 500) {
                alert('Something bad happened.Are there two users with the same name?');
              } else {
                alert('Something bad happened. Please try again');
              }
            });
          } catch (e) {
            alert(`Something bad happened. Error: ${e.message}. Please try again`);
            window.location.reload(true);
          }
        });
};
