import * as constants from '../constants';

export default (page, activePage) => {
  const studentsData = fetch(
    `${constants.studentsAPI}&page=${activePage - 1}`, {
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
      const { page: page_, _embedded : { students } } = res;
      return ({
        students,
        page_,
      });
    });
  return studentsData;
};
