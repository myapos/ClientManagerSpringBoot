import * as constants from '../constants';

export default mode => {
  const studentsData = fetch((mode === 'pagination') ? `${constants.studentsAPI}` : `${constants.studentsOfAllAPI}`, {
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
    const { page, _embedded: { students } } = res;
    return ({
      students,
      page,
    });
  });
  return studentsData;
};
