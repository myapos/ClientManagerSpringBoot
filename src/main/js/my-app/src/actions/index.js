export const GET_ALL_STUDENTS = 'GET_ALL_STUDENTS';
export const ADD_STUDENT = 'ADD_STUDENT';
export const DELETE_STUDENT = 'DELETE_STUDENT';
export const UPDATE_STUDENT = 'UPDATE_STUDENT';
export const IMPORT_STUDENTS = 'IMPORT_STUDENTS';
export const EXPORT_STUDENTS = 'EXPORT_STUDENTS';
export const STUDENT_CLASS_DASHBOARD = 'STUDENT_CLASS_DASHBOARD';
// export const ADD_ADVERTISER = 'ADD_ADVERTISER';
// export const CHANGE_ADVERTISER = 'CHANGE_ADVERTISER';
// export const DELETE_ADVERTISER = 'DELETE_ADVERTISER';
// export const SAVE = 'SAVE';
// export const ADD_SITES = 'ADD_SITES';


export function getAllStudents(state) {
  //debugger;
  return {
    type: GET_ALL_STUDENTS,
    state: state
  };
}
export function addStudent(state) {
  //debugger;
  return {
    type: ADD_STUDENT,
    state: state
  };
}
export function deleteStudent(state) {
  //debugger;
  return {
    type: DELETE_STUDENT,
    state: state
  };
}
export function updateStudent(state) {
  //debugger;
  return {
    type: UPDATE_STUDENT,
    state: state
  };
}
export function importStudents(state) {
  //debugger;
  return {
    type: IMPORT_STUDENTS,
    state: state
  };
}
export function exportStudents(state) {
  //debugger;
  return {
    type: EXPORT_STUDENTS,
    state: state
  };
}
export function studentClassDashboard(state) {
  //debugger;
  return {
    type: STUDENT_CLASS_DASHBOARD,
    state: state
  };
}
// // /this.props.index, val.value
// export function addAdvertiser() {
//   //debugger;
//   return {
//     type: ADD_ADVERTISER
//   };
// }


// export function changeAdvertiser(index, id) {
//   //debugger;
//   return {
//     type: CHANGE_ADVERTISER,
//     advertiserIndex:index,
//     id
//   };
// }

// export function deleteAdvertiser(index) {
//   //debugger;
//   return {
//     type: DELETE_ADVERTISER,
//     advertiserIndex:index
//   };
// }

// export function addSites(index, siteIds) {
//   //debugger;
//   return {
//     type: ADD_SITES,
//     advertiserIndex:index,
//     siteIds
//   };
// }

// export function save(index, id) {
//   //debugger;
//   return {
//     type: SAVE,
//     advertiserIndex:index,
//     id
//   };
//}

