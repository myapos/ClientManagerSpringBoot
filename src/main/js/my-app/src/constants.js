export const BASE_URL = document.location.origin.match(/3000/) ? 'http://localhost:8181' : document.location.origin;
export const studentsAPI = `${BASE_URL}/api/students`;
export const studentClassesAPI = `${BASE_URL}/api/studentClasses/`;
export const registersAPI = `${BASE_URL}/api/registers/`;
export const payementsAPI = `${BASE_URL}/api/payeds/`;
export const searchRegistrationsByStudent = `${BASE_URL}/api/registers/search/findByStudent?student=`;
export const searchRegistrationsByStudentAndStudentClass = `${BASE_URL}/api/registers/search/findByStudent?student=`;
export const searchStudentClassesByDescription = `${BASE_URL}/api/studentClasses/search/findBydescription?description=`;
export const searchStudentClassesByFnameAndLname = `${BASE_URL}/api/students/search/findByFnameAndLname?fname=`;
