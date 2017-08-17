// export const studentsAPI = `${BASE_URL}/api/students?page=${numOfPage}&size=${sizeOfPage}`;
export const BASE_URL = document.location.origin.match(/3000/) ? 'http://localhost:8181' : document.location.origin;
export const sizeOfPage = 10; // used for pagination results
export const studentsAPI = `${BASE_URL}/api/students?size=${sizeOfPage}`;
export const sizeOfAllStudents = 100000; // set this to a big number
export const studentsOfAllAPI = `${BASE_URL}/api/students?size=${sizeOfAllStudents}`;
export const studentClassesAPI = `${BASE_URL}/api/studentClasses/`;
export const registersAPI = `${BASE_URL}/api/registers/`;
export const getData = `${BASE_URL}/getData/`;
export const paymentsAPI = `${BASE_URL}/api/payeds/`;
export const searchPaymentByRegistration = `${BASE_URL}/api/payeds/search/findByRegister?register=`;
export const searchStudentFindByName = `${BASE_URL}/api/students/search/findByFname`;
export const searchStudentFindByFnameAndLname = `${BASE_URL}/api/students/search/findByFnameAndLname?fname=`;
export const searchRegistrationsByStudent = `${BASE_URL}/api/registers/search/findByStudent?student=`;
export const searchRegistrationsByStudentAndStudentClass = `${BASE_URL}/api/registers/search/findByStudentAndStudentClass?student=`;
export const searchRegistrationsByStudentClass = `${BASE_URL}/api/registers/search/findByStudentClass?studentClass=`;
export const searchStudentClassesByDescription = `${BASE_URL}/api/studentClasses/search/findBydescription?description=`;
export const searchStudentClassesByFnameAndLname = `${BASE_URL}/api/studentClasses/search/findByFnameAndLname?fname=`;
export const searchByManager = `${BASE_URL}/api/managers/17`;
export const urlSendEmail = `${BASE_URL}/email`;
export const txtMsg = `
Please select class, write your message and press enter. The message will be send only to \n those students that has registered to classes and has payed.`;
export const giveMessage = 'Press a key to delete this message and give yours';
export const maximumTimeToWaitForData = 60;

export const templateStudentBody = {
  fname: {},
  lname: {},
  phone: {},
  date: {},
  email: {},
  facebook: {},
  manager: {},
};

