/* ACTIONS FOR INTIALIZATION*/
export const DATA_INITIALIZATION = 'DATA_INITIALIZATION';

/* ACTIONS FOR STUDENTS*/
export const GET_ALL_STUDENTS = 'GET_ALL_STUDENTS';
export const ADD_STUDENT = 'ADD_STUDENT';
export const SAGAS_SAVE_NEW_STUDENT = 'SAGAS_SAVE_NEW_STUDENT';
export const DELETE_STUDENTS = 'DELETE_STUDENTS';
export const SAGAS_DELETE_STUDENTS = 'SAGAS_DELETE_STUDENTS';
export const UPDATE_STUDENT = 'UPDATE_STUDENT';
export const SAGAS_UPDATE_STUDENT = 'SAGAS_UPDATE_STUDENT';
export const IMPORT_STUDENTS = 'IMPORT_STUDENTS';
export const EXPORT_STUDENTS = 'EXPORT_STUDENTS';

/* ACTIONS FOR CLASSES*/
export const STUDENT_CLASS_DASHBOARD = 'STUDENT_CLASS_DASHBOARD';
export const STUDENT_CLASS_DATA_FETCHED = 'STUDENT_CLASS_DATA_FETCHED';
export const SAVE_NEW_CLASS = 'SAVE_NEW_CLASS';
export const SAGAS_SAVE_NEW_CLASS = 'SAGAS_SAVE_NEW_CLASS';
export const DELETE_CLASS = 'DELETE_CLASS';
export const SAGAS_DELETE_CLASS = 'SAGAS_DELETE_CLASS';
export const UPDATE_CLASS = 'UPDATE_CLASS';
export const SAGAS_UPDATE_CLASS = 'SAGAS_UPDATE_CLASS';
export const NON_TERMINAL_CLASSES = 'NON_TERMINAL_CLASSES';
export const FILTER_NON_TERMINAL_CLASSES = 'FILTER_NON_TERMINAL_CLASSES';
export const SAGAS_NON_TERMINAL_CLASSES = 'SAGAS_NON_TERMINAL_CLASSES';

/* ACTIONS FOR PAYMENTS_REGISTERS*/
export const PAYMENTS_REGISTERS = 'PAYMENTS_REGISTERS';
export const DELETE_PAYMENTS_REGISTERS = 'DELETE_PAYMENTS_REGISTERS';
export const SAGAS_DELETE_PAYMENTS_REGISTERS = 'SAGAS_DELETE_PAYMENTS_REGISTERS';
export const UPDATE_PAYMENTS_REGISTERS = 'UPDATE_PAYMENTS_REGISTERS';
export const SAGAS_UPDATE_PAYMENTS_REGISTERS = 'SAGAS_UPDATE_PAYMENTS_REGISTERS';
export const CREATE_PAYMENTS_REGISTERS = 'CREATE_PAYMENTS_REGISTERS';
export const SAGAS_CREATE_PAYMENTS_REGISTERS = 'SAGAS_CREATE_PAYMENTS_REGISTERS';

/* ACTIONS FOR REGISTERS*/
export const REGISTERS = 'REGISTERS';
export const UPDATE_REGISTERS = 'UPDATE_REGISTERS';
export const SAGAS_UPDATE_REGISTERS = 'SAGAS_UPDATE_REGISTERS';
export const CREATE_REGISTERS = 'CREATE_REGISTERS';
export const SAGAS_CREATE_REGISTERS = 'SAGAS_CREATE_REGISTERS';
export const DELETE_REGISTERS = 'DELETE_REGISTERS';
export const SAGAS_DELETE_REGISTERS = 'SAGAS_DELETE_REGISTERS';

/* ACTIONS FOR SEND EMAILS*/
export const SEND_EMAILS_MANUALLY = 'SEND_EMAILS_MANUALLY';
export const MSG_SUBMITTED = 'MSG_SUBMITTED';
export const SAGAS_MSG_SUBMITTED = 'SAGAS_MSG_SUBMITTED';

/* ACTIONS FOR DATA LOADING*/
export const LOADING_HANDLING = 'LOADING_HANDLING';

/* ACTIONS FOR DATA LOADING*/
export const GET_SUBCLASS = 'GET_SUBCLASS';
export const SAGAS_GET_SUBCLASS = 'SAGAS_GET_SUBCLASS';
export const DATA_REGISTERS = 'DATA_REGISTERS';
export const SAGAS_DATA_REGISTERS = 'SAGAS_DATA_REGISTERS';
export const DATA_PAYMENTS_REGISTERS = 'DATA_PAYMENTS_REGISTERS';
export const SAGAS_DATA_PAYMENTS_REGISTERS = 'SAGAS_DATA_PAYMENTS_REGISTERS';

/* ACTIONS FOR TEXT HANDLING IN MESSAGE TEXTAREA*/
export const CHANGE_TEXT = 'CHANGE_TEXT';
export const DISPLAY_INITIAL_MSG = 'DISPLAY_INITIAL_MSG';

/* TIME FUNCTIONS */
export const TIME_ELAPSED = 'TIME_ELAPSED';
export const COUNTING_TIME = 'COUNTING_TIME';
export const SET_TIMER = 'SET_TIMER';

/* MATCH FIRST NAME WITH LNAME*/
export const MATCH_NAMES = 'MATCH_NAMES';

/* PAGINATION */
export const SET_ACTIVE_PAGE = 'SET_ACTIVE_PAGE';
export const SAGAS_GET_ACTIVE_PAGE_DATA = 'SAGAS_GET_ACTIVE_PAGE_DATA';

/* SEARCHING */
export const SEARCHING = 'SEARCHING';

export function getAllStudents () {
  return {
    type: GET_ALL_STUDENTS,
  };
}
export function addStudent (row, initDataStudents, onModalClose) {
  return {
    type: ADD_STUDENT,
    row,
    initDataStudents,
    onModalClose,
  };
}
export function deleteStudents (students) {
  return {
    type: DELETE_STUDENTS,
    students,
  };
}
export function updateStudent (rowUpdate, cellName, cellValue) {
  return {
    type: UPDATE_STUDENT,
    rowUpdate,
    cellName,
    cellValue,
  };
}
export function importStudents () {
  return {
    type: IMPORT_STUDENTS,
  };
}
export function exportStudents () {
  return {
    type: EXPORT_STUDENTS,
  };
}
export function studentClassDashboard () {
  return {
    type: STUDENT_CLASS_DASHBOARD,
  };
}
export function saveNewClass (row, studentClassesWithLinks, onModalClose) {
  return {
    type: SAVE_NEW_CLASS,
    row,
    studentClassesWithLinks,
    onModalClose,
  };
}
export function deleteClass (classId) {
  return {
    type: DELETE_CLASS,
    classId,
  };
}
export function updateClass (rowUpdate, desc, studentClassesWithLinks, updateMode) {
  return {
    type: UPDATE_CLASS,
    rowUpdate,
    desc,
    studentClassesWithLinks,
    updateMode,
  };
}

export function changeSelectedTab (selectedTab, tabNamespace) {
  let act = '';
  if (selectedTab === 'tab1') {
    act = 'GET_ALL_STUDENTS';
  } else if (selectedTab === 'tab2') {
    act = 'STUDENT_CLASS_DASHBOARD';
  } else if (selectedTab === 'tab3') {
    act = 'REGISTERS';
  } else if (selectedTab === 'tab4') {
    act = 'PAYMENTS_REGISTERS';
  } else if (selectedTab === 'tab5') {
    act = 'SEND_EMAILS_MANUALLY';
  }
  return {
    type: act,
    selectedTab,
    namespace: tabNamespace,
  };
}

export function addPaymentRegisters (row) {
  return {
    type: CREATE_PAYMENTS_REGISTERS,
    row,
  };
}

export function updatePaymentRegisters (rowUpdate, updateMode, cellValue) {
  return {
    type: UPDATE_PAYMENTS_REGISTERS,
    rowUpdate,
    updateMode,
    cellValue,
  };
}

export function createRegisters (rowUpdate, onModalClose) {
  return {
    type: CREATE_REGISTERS,
    rowUpdate,
    onModalClose,
  };
}

export function updateRegisters (rowUpdate) {
  return {
    type: UPDATE_REGISTERS,
    rowUpdate,
  };
}

export function deletePaymentRegisters (rowUpdate, paymentId) {
  return {
    type: DELETE_PAYMENTS_REGISTERS,
    rowUpdate,
    paymentId,
  };
}

// export function deleteRegisters (registerId) {
//   return {
//     type: DELETE_REGISTERS,
//     registerId,
//   };
// }
export function deleteRegisters (registers) {
  return {
    type: DELETE_REGISTERS,
    registers,
  };
}

export function msgSubmitted (msg, selectedClass) {
  return {
    type: MSG_SUBMITTED,
    msg,
    selectedClass,
  };
}

export function loadingHandling (loadingHandlingCommplete) {
  return {
    type: LOADING_HANDLING,
    loadingHandlingCommplete,
  };
}

export function getSubClass (url, parentDesc, obj) {
  return {
    type: GET_SUBCLASS,
    url,
    parentDesc,
    obj,

  };
}

export function dataRegisters (saved_student) {
  return {
    type: DATA_REGISTERS,
    saved_student,
  };
}

export function dataPaymentsRegisters (saved_student) {
  return {
    type: DATA_PAYMENTS_REGISTERS,
    saved_student,
  };
}

export function changeText (text) {
  return {
    type: CHANGE_TEXT,
    text,
  };
}

export function displayInitialMessage (displayInitialMsg) {
  return {
    type: DISPLAY_INITIAL_MSG,
    displayInitialMsg,
  };
}

export function countingTime (seconds) {
  return {
    type: COUNTING_TIME,
    seconds,
  };
}

export function timeElapsed (timePassed) {
  return {
    type: TIME_ELAPSED,
    timePassed,
  };
}

export function setTimer (timer) {
  return {
    type: SET_TIMER,
    timer,
  };
}

export function nonTerminalClasses (setNonTerminalClasses) {
  return {
    type: NON_TERMINAL_CLASSES,
    setNonTerminalClasses,
  };
}

export function filterNonTerminalClasses (filteredClasses) {
  return {
    type: FILTER_NON_TERMINAL_CLASSES,
    filteredClasses,
  };
}

export function matchNames (fname, email){
  return {
    type: MATCH_NAMES,
    fname,
    email,
  };
}
export function sagasDeleteStudents (success){
  return {
    type: SAGAS_DELETE_STUDENTS,
    success,
  };
}

export function setActivePage (activePage) {
  return {
    type: SET_ACTIVE_PAGE,
    activePage,
  };
}

export function searching (searchingStatus) {
  return {
    type: SEARCHING,
    searchingStatus,
  };
}
