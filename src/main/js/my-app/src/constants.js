export const BASE_URL = document.location.origin.match(/3000/) ? 'http://localhost:8181' : document.location.origin;
export const studentsAPI = `${BASE_URL}/api/students`;
export const studentClassesAPI = `${BASE_URL}/api/studentClasses/`;
export const registersAPI = `${BASE_URL}/api/registers/`;
export const paymentsAPI = `${BASE_URL}/api/payeds/`;
export const searchStudentFindByName = `${BASE_URL}/api/students/search/findByFname`;
export const searchStudentFindByFnameAndLname = `${BASE_URL}/api/students/search/findByFnameAndLname?fname=`;
export const searchRegistrationsByStudent = `${BASE_URL}/api/registers/search/findByStudent?student=`;
export const searchRegistrationsByStudentAndStudentClass = `${BASE_URL}/api/registers/search/findByStudent?student=`;
export const searchStudentClassesByDescription = `${BASE_URL}/api/studentClasses/search/findBydescription?description=`;
export const searchStudentClassesByFnameAndLname = `${BASE_URL}/api/students/search/findByFnameAndLname?fname=`;
export const searchPaymentByRegistration = `${BASE_URL}/api/payeds/search/findByRegister?register=`;
export const searchByManager = `${BASE_URL}/api/managers/17`;

