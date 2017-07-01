import * as constants from '../constants';

export default () => {
  const studentClasses = fetch(
        constants.studentClassesAPI, {
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
      return classes;
    });
  return studentClasses;
};
