import * as constants from '../constants';

export default (row, students) => {
  let exist = false;

  // check if student exist already in database due to fname, lname, mobile
  //const students = parent.students;
  students.push(row);
  exist = students.map((obj, key) => {
    const rowtoCheck = students[students.length - 1];
    if (key <= students.length - 2
            && rowtoCheck.fname === obj.fname
            && rowtoCheck.lname === obj.lname
            && rowtoCheck.phone === obj.phone) {
      return true;
    } else {
      return false;
    }
  });

  const existV = exist.reduce((total, num) => {
    console.log('total:', total, ' num ', num);
    return total || num;
  });
  if (!existV) {
    // check email type
    if (row.email.indexOf('@') > 0) {
      const date = new Date(row.dateOfBirth);

      const bodyData = JSON.stringify({
        'fname': row.fname,
        'lname': row.lname,
        'email': row.email,
        'dateOfBirth': date,
        'facebook': row.facebook,
        'phone': row.phone,
        'manager': constants.searchByManager,
      });

      fetch(constants.studentsAPI, {
        method: 'post',
        mode: 'cors',
        cache: 'default',
        body: bodyData,
        headers: {
          'Authorization': `Basic ${btoa('myapos:Apostolakis1981')}`,
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        if (res.status === 201) {
          alert('New student saved succsesfully. Prepare for reloading');
          window.location.reload(true);
        } else {
          alert('something bad happened.Please check your input data.');
        }
      });
    } else {
      alert('Please check email input and try again. It has to be of email type. Example test@test.com');
    }
  } else {
    alert('User already exists in database');
  }
};
