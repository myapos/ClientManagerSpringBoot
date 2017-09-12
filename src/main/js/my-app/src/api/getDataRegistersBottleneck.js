import * as constants from '../constants';

const fetchAsyncA = async url =>
  await (await fetch(url, {
    method: 'get',
    mode: 'cors',
    cache: 'default',
    headers: {
      'Authorization': localStorage.getItem('jwt-token'), 
      'Content-Type': 'application/json',
    },
  })).json();

const wrap_async_actions = async () => {
  // fetchStudents
  let response = {};

  response = await fetch(constants.studentsAPI, {
    method: 'get',
    mode: 'cors',
    cache: 'default',
    headers: {
      'Authorization': localStorage.getItem('jwt-token'), 
      'Content-Type': 'application/json',
    },
  });

  const studentsResp = await response.json();
  const students = studentsResp._embedded.students;

  // console.log('students:', students);

  // fetchStudents
  let classesResponse = {};

  classesResponse = await fetch(constants.studentClassesAPI, {
    method: 'get',
    mode: 'cors',
    cache: 'default',
    headers: {
      'Authorization': localStorage.getItem('jwt-token'), 
      'Content-Type': 'application/json',
    },
  });

  const classesResp = await classesResponse.json();
  const classes = classesResp._embedded.studentClasses;
  // console.log('classes:', classes);

  const registrationPromises = await students.map(async (student, indexS, students) => {

    const url2 = `${constants.searchRegistrationsByStudent}${student._links.self.href}`;

    const response2 = await fetch(url2, {
      method: 'get',
      mode: 'cors',
      cache: 'default',
      headers: {
        'Authorization': localStorage.getItem('jwt-token'), 
        'Content-Type': 'application/json',
      },
    });

    const studentInfo = await response2.json();
    studentInfo.studentLink = student._links.self.href;
    // console.log('studentInfo:', studentInfo);
    return studentInfo;
  }); // end of map students

  const registrationResults = [];
  for (const registration of registrationPromises) {
    registrationResults.push(await registration);
  }

  // console.log('registrationPromises:', registrationPromises);
  // console.log('students:', students);
  // console.log('registrationResults:', registrationResults);

  // match students with registration results in order to compose final display results
  // criteria is registrationResults[i].studentLink === students[i]._links.student.href
  // then construct final results array of objects as the following template
  //     const tempData = {};
  //     tempData.fname = obj._embedded.registers[0].student.fname;
  //     tempData.lname = obj._embedded.registers[0].student.lname;
  //     tempData.email = obj._embedded.registers[0].student.email;
  //     tempData.class = 'No registered classes';
  //     tempData.dateOfRegistration = 'No date of registration';
  //     tempData.index = dataRegisters.length + 1;
  const outputData = [];

  // We need three loops for each array
  // step 1 loop students array
  const firstLoop = students.map((student, index, students) => {
    const secondLoop = registrationResults.map(registers => {
      // console.log('registers:', registers.studentLink);
      // criteria condition
      if (registers.studentLink === student._links.student.href) {
        // console.log('studentLinks:', student._links.student.href);
        // console.log('criteria found in registration array:', registers._embedded.registers); // isArray
        const registrations = registers._embedded.registers;

        const thirdLoop = registrations.map(async registration => {
          // console.log('registration:', registration);
          // get class description from server

          const fetchStudentClassDescription = registration._links.studentClass.href;
          const classDescrResp = await await fetchAsyncA(fetchStudentClassDescription);
          // await classDescrResp;
          // debugger;
          // console.log('classDescrResp:', classDescrResp);
          // console.log('student:', student);
          const tempData = {};
          tempData.fname = student.fname;
          tempData.lname = student.lname;
          tempData.email = student.email;
          tempData.class = classDescrResp.description;
          const dateOfRegistration = new Date(registration.dateOfRegistration);
          const formatedDate = dateOfRegistration.toString().match(/... ... [0-9][0-9] [0-9][0-9][0-9][0-9](?!([0-9][0-9]:[0-9][0-9]:[0-9][0-9] GMT[+]0300 \(EEST\)))/g)[0];
          tempData.dateOfRegistration = formatedDate;
          tempData.index = outputData.length + 1;
          tempData.studentLinks = student._links;
          tempData.studentClassLinks = classDescrResp._links;
          return tempData;
          // outputData.push(tempData);
          // console.log(classDescrResp.description);

          // console.log('tempData:', tempData);
          // return tempData;
        }); // end of third loop
        return Promise.all(thirdLoop);
      }
    });
    return Promise.all(secondLoop);
  });
  return Promise.all(firstLoop);
};

export default async () => {
  console.log('hello from getdataregisters api function');
  // const students = saved_student;
  const ret = await wrap_async_actions();
  // try{
  //   ret = await wrap_async_actions();

  //   await makeMeLookSync(function* () {
  //     console.log(0);
  //     yield ret;
  //   });
  //   console.log('ret:', ret);
  // }
  // catch (rejectedValue) {
  //   console.log('rejectedValue:', rejectedValue);
  // }
  return ret;
};
