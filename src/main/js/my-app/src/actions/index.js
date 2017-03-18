/*ACTIONS FOR INTIALIZATION*/
export const DATA_INITIALIZATION = 'DATA_INITIALIZATION';

/*ACTIONS FOR STUDENTS*/
export const GET_ALL_STUDENTS = 'GET_ALL_STUDENTS';
export const ADD_STUDENT = 'ADD_STUDENT';
export const SAGAS_SAVE_NEW_STUDENT = 'SAGAS_SAVE_NEW_STUDENT';
export const DELETE_STUDENT = 'DELETE_STUDENT';
export const SAGAS_DELETE_STUDENT = 'SAGAS_DELETE_STUDENT';
export const UPDATE_STUDENT = 'UPDATE_STUDENT';
export const SAGAS_UPDATE_STUDENT = 'SAGAS_UPDATE_STUDENT';
export const IMPORT_STUDENTS = 'IMPORT_STUDENTS';
export const EXPORT_STUDENTS = 'EXPORT_STUDENTS';

/*ACTIONS FOR CLASSES*/
export const STUDENT_CLASS_DASHBOARD = 'STUDENT_CLASS_DASHBOARD';
export const STUDENT_CLASS_DATA_FETCHED = 'STUDENT_CLASS_DATA_FETCHED';
export const SAVE_NEW_CLASS = 'SAVE_NEW_CLASS';
export const SAGAS_SAVE_NEW_CLASS = 'SAGAS_SAVE_NEW_CLASS';
export const DELETE_CLASS = 'DELETE_CLASS';
export const SAGAS_DELETE_CLASS = 'SAGAS_DELETE_CLASS';
export const UPDATE_CLASS = 'UPDATE_CLASS';
export const SAGAS_UPDATE_CLASS = 'SAGAS_UPDATE_CLASS';

/*ACTIONS FOR PAYMENTS_REGISTERS*/
export const PAYMENTS_REGISTERS = 'PAYMENTS_REGISTERS';
export const DELETE_PAYMENTS_REGISTERS = 'DELETE_PAYMENTS_REGISTERS';
export const SAGAS_DELETE_PAYMENTS_REGISTERS = 'SAGAS_DELETE_PAYMENTS_REGISTERS';
export const UPDATE_PAYMENTS_REGISTERS = 'UPDATE_PAYMENTS_REGISTERS';
export const SAGAS_UPDATE_PAYMENTS_REGISTERS = 'SAGAS_UPDATE_PAYMENTS_REGISTERS';
export const CREATE_PAYMENTS_REGISTERS = 'CREATE_PAYMENTS_REGISTERS';
export const SAGAS_CREATE_PAYMENTS_REGISTERS = 'SAGAS_CREATE_PAYMENTS_REGISTERS';

/*ACTIONS FOR REGISTERS*/
export const REGISTERS = 'REGISTERS';
export const UPDATE_REGISTERS = 'UPDATE_REGISTERS';
export const SAGAS_UPDATE_REGISTERS = 'SAGAS_UPDATE_REGISTERS';
export const CREATE_REGISTERS = 'CREATE_REGISTERS';
export const SAGAS_CREATE_REGISTERS = 'SAGAS_CREATE_REGISTERS';
export const DELETE_REGISTERS = 'DELETE_REGISTERS';
export const SAGAS_DELETE_REGISTERS = 'SAGAS_DELETE_REGISTERS';

/*ACTIONS FOR SEND EMAILS*/
export const SEND_EMAILS_MANUALLY = 'SEND_EMAILS_MANUALLY';
export const MSG_SUBMITTED = 'MSG_SUBMITTED';
export const SAGAS_MSG_SUBMITTED = 'SAGAS_MSG_SUBMITTED';

/*ACTIONS FOR DATA LOADING*/
export const LOADING_HANDLING = 'LOADING_HANDLING';

/*ACTIONS FOR DATA LOADING*/
export const GET_SUBCLASS = 'GET_SUBCLASS';
export const SAGAS_GET_SUBCLASS = 'SAGAS_GET_SUBCLASS';
export const DATA_REGISTERS = 'DATA_REGISTERS';
export const SAGAS_DATA_REGISTERS = 'SAGAS_DATA_REGISTERS';
export const DATA_PAYMENTS_REGISTERS = 'DATA_PAYMENTS_REGISTERS';
export const SAGAS_DATA_PAYMENTS_REGISTERS = 'SAGAS_DATA_PAYMENTS_REGISTERS';

export function getAllStudents() {
  //debugger;
  parent.loadedStudentData=0;
  return {
    type: GET_ALL_STUDENTS
  };
}
export function addStudent(row) {

  return {
    type: ADD_STUDENT,
    row
  };
}
export function deleteStudent(studentId) {

  return {
    type: DELETE_STUDENT,
    studentId
  };
}
export function updateStudent(rowUpdate, desc, descBefore) {

  return {
    type: UPDATE_STUDENT,
    rowUpdate
  };
}
export function importStudents() {

  return {
    type: IMPORT_STUDENTS
  };
}
export function exportStudents() {

  return {
    type: EXPORT_STUDENTS
  };
}
export function studentClassDashboard() {

  return {
    type: STUDENT_CLASS_DASHBOARD,
  };
}
export function saveNewClass(row) {

  return {
    type: SAVE_NEW_CLASS,
    row
  };
}
export function deleteClass(classId) {

  return {
    type: DELETE_CLASS,
    classId
  };
}
export function updateClass(rowUpdate, desc, descBefore) {

  return {
    type: UPDATE_CLASS,
    rowUpdate,
    desc,
    descBefore
  };
}

export function changeSelectedTab(selectedTab, tabNamespace) {

  let act = "";
  ////debugger;
  if (selectedTab == 'tab1'){
    act = "GET_ALL_STUDENTS";
  }
  else if (selectedTab == 'tab2'){
    act = "STUDENT_CLASS_DASHBOARD";
  }
  else if (selectedTab == 'tab3'){
    act = "PAYMENTS_REGISTERS";
  }
  else if (selectedTab == 'tab4'){
    act = "REGISTERS";
  }
  else if (selectedTab == 'tab5'){
    act = "SEND_EMAILS_MANUALLY";
  }
    return {
        type: act,
        selectedTab,
        namespace: tabNamespace
    };
}


export function addPaymentRegisters(row) {

  return {
    type: CREATE_PAYMENTS_REGISTERS,
    row
  };
}

export function updatePaymentRegisters(rowUpdate, updateMode) {

  return {
    type: UPDATE_PAYMENTS_REGISTERS,
    rowUpdate,
    updateMode
  };
}

export function createRegisters(rowUpdate) {

  return {
    type: CREATE_REGISTERS,
    rowUpdate
  };
}

export function updateRegisters(rowUpdate) {

  return {
    type: UPDATE_REGISTERS,
    rowUpdate
  };
}


export function deletePaymentRegisters(rowUpdate, paymentId) {

  return {
    type: DELETE_PAYMENTS_REGISTERS,
    rowUpdate,
    paymentId,
  };
}

export function deleteRegisters(registerId) {

  return {
    type: DELETE_REGISTERS,
    registerId
  };
}

export function msgSubmitted(msg, selectedClass) {

  return {
    type: MSG_SUBMITTED,
    msg,
    selectedClass
  };
}

export function loadingHandling(loadingHandlingCommplete) {
  //debugger;
  return {
    type: LOADING_HANDLING,
    loadingHandlingCommplete
  };
}

export function getSubClass(url, parentDesc, obj) {
  //debugger;
  return {
    type: GET_SUBCLASS,
    url,
    parentDesc,
    obj

  };
}

export function dataRegisters(saved_student) {
  //debugger;
  return {
    type: DATA_REGISTERS,
    saved_student
  };
}

export function dataPaymentsRegisters(saved_student) {
  //debugger;
  return {
    type: DATA_PAYMENTS_REGISTERS,
    saved_student
  };
}

