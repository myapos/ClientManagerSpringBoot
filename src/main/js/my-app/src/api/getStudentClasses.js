import hideLoader from './hideLoader';

export default () => {
  fetch(
        `${parent.BASE_URL}/api/studentClasses`, {
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
      const classes = res._embedded.studentClasses;
      parent.studentClasses = classes;
      hideLoader('loader studentClasses');
      return classes;
    });
};
