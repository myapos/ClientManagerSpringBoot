import hideLoader from './hideLoader';

export default () => {
  parent.loadedStudents = 0;
  fetch(
        `${parent.BASE_URL}/api/students`, {
          method: 'get',
          mode: 'cors',
          cache: 'default',
          headers: {
            'Authorization': `Basic ${btoa('myapos:Apostolakis1981')}`,
            'Content-Type': 'application/json', // ,
          },
        })
    .then(res => res.json())
    .then(res => {
      const students = res._embedded.students;
      parent.students = students;
      hideLoader('loader students');
      return students;
    });
};
