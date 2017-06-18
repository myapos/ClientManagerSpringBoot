import * as constants from '../constants';

export default () => {
  const studentsData = fetch(
        `${constants.studentsAPI}`, {
          method: 'get',
          mode: 'cors',
          cache: 'default',
          headers: {
            'Authorization': `Basic ${btoa('myapos:Apostolakis1981')}`,
            'Content-Type': 'application/json',
          },
        })
    .then(res => res.json())
    .then(res => {
      const students = res._embedded.students;
      return students;
    });
  return studentsData;
};
