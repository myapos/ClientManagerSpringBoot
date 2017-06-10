import hideLoader from './hideLoader';

const fetchStudentClassDescriptions = async url => {
  const responseClassDescription = await fetch(url, {
    method: 'get',
    mode: 'cors',
    cache: 'default',
    headers: {
      'Authorization': `Basic ${btoa('myapos:Apostolakis1981')}`,
      'Content-Type': 'application/json',
    },
  });

  const classDescrResp = await responseClassDescription.json();
  return classDescrResp;
};

const wrap_async_actions = async () => {
  // fetchStudents
  const fetchStudents = `${parent.BASE_URL}/api/students`;
  let response = {};

  response = await fetch(fetchStudents, {
    method: 'get',
    mode: 'cors',
    cache: 'default',
    headers: {
      'Authorization': `Basic ${btoa('myapos:Apostolakis1981')}`,
      'Content-Type': 'application/json',
    },
  });

  const studentsResp = await response.json();
  const students = studentsResp._embedded.students;

  // fetchStudents
  const fetchClasses = `${parent.BASE_URL}/api/studentClasses`;
  let classesResponse = {};

  classesResponse = await fetch(fetchClasses, {
    method: 'get',
    mode: 'cors',
    cache: 'default',
    headers: {
      'Authorization': `Basic ${btoa('myapos:Apostolakis1981')}`,
      'Content-Type': 'application/json',
    },
  });

  const classesResp = await classesResponse.json();
  const classes = classesResp._embedded.studentClasses;
  console.log('classes:', classes);

  const registrationPromises = await students.map(async (student, indexS, students) => {

    const url2 = `${parent.BASE_URL}/api/registers/search/findByStudent?student=${student._links.self.href}`;

    const response2 = await fetch(url2, {
      method: 'get',
      mode: 'cors',
      cache: 'default',
      headers: {
        'Authorization': `Basic ${btoa('myapos:Apostolakis1981')}`,
        'Content-Type': 'application/json',
      },
    });

    const studentInfo = await response2.json();
    studentInfo.studentLink = student._links.self.href;
    // console.log('studentInfo:', studentInfo);
    return studentInfo;
  }); // end of map students

  let registrationResults = [];
  for (let registration of registrationPromises) {
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
  // We need two loops for each array
  // step 1 loop students array
  await students.map(async student => {

    await registrationResults.map(async registers => {
      // console.log('registers:', registers.studentLink);
      // criteria condition
      if (registers.studentLink === student._links.student.href) {
        //console.log('studentLinks:', student._links.student.href);
        // console.log('criteria found in registration array:', registers._embedded.registers); // isArray
        const registrations = registers._embedded.registers;
        registrations.map( async registration => {
          //console.log('registration:', registration);
          // get class description from server

          const fetchStudentClassDescription = registration._links.studentClass.href;
          let responseClassDescription = {};
          const classDescrResp = await fetchStudentClassDescriptions(fetchStudentClassDescription);
          //console.log('classDescrResp:', classDescrResp);
          // responseClassDescription = await fetch(fetchStudentClassDescription, {
          //   method: 'get',
          //   mode: 'cors',
          //   cache: 'default',
          //   headers: {
          //     'Authorization': `Basic ${btoa('myapos:Apostolakis1981')}`,
          //     'Content-Type': 'application/json',
          //   },
          // });

          // const classDescrResp = await responseClassDescription.json();

          // console.log('classDescrResp:', classDescrResp);

          // for every registration save data in output
          const tempData = {};
          tempData.fname = student.fname;
          tempData.lname = student.lname;
          tempData.email = student.email;
          tempData.class = classDescrResp.description;
          const dateOfRegistration = new Date(registration.dateOfRegistration);
          const formatedDate = dateOfRegistration.toString().match(/... ... [0-9][0-9] [0-9][0-9][0-9][0-9](?!([0-9][0-9]:[0-9][0-9]:[0-9][0-9] GMT[+]0300 \(EEST\)))/g)[0];
          tempData.dateOfRegistration = formatedDate;
          tempData.index = outputData.length + 1;
          //debugger;
          outputData.push(tempData);
          // console.log('tempData:', tempData);
        });
      }
    });
  });
  //debugger;
  //console.log('outputData:', outputData);
  return outputData;
};

export default async () => {
  // const students = saved_student;

  const ret = await wrap_async_actions();
  console.log('ret:', ret);
  hideLoader('loader registers');
  //debugger;
  return ret;
};
