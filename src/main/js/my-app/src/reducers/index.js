import * as actions from '../actions/';

const reducer = (state = {}, action) => {
  const { type, initDataStudentClasses, initDataStudents, initDataAllStudents, initPayments, initRegistrations, studentClassesWithLinks,
    filteredStudentClassesWithLinks, dataFetchedStudentClasses, row, classId, rowUpdate, cellName, cellValue, desc, selectedTab, namespace,
    paymentId, updateMode, registerId, msg, selectedClass, loadingHandlingCommplete,
    url, parentDesc, obj, classesPair, saved_student, dataRegistersLoaded, dataPaymentsRegistersLoaded,
    text, displayInitialMsg, timer, timePassed, setNonTerminalClasses, filteredClasses, processedStudentClasses,
    fname, email, onModalClose, students, success, registers, activePage, page, activePageDataStudents,
    searchingStatus } = action;
  let { seconds } = action;

  switch (type) {
    case actions.GET_ALL_STUDENTS:

      return {
        ...state,
        all: state.saved_student,
        [namespace]: selectedTab,
      };
    case actions.PAYMENTS_REGISTERS:
      return {
        ...state,
        all: state.saved_student,
        [namespace]: selectedTab,
      };
    case actions.REGISTERS:
      return {
        ...state,
        all: state.saved_student,
        [namespace]: selectedTab,
      };
    case actions.SEND_EMAILS_MANUALLY:
      return {
        ...state,
        all: state.saved_student,
        [namespace]: selectedTab,
      };
    case actions.MSG_SUBMITTED:
      return {
        ...state,
        msg,
        selectedClass,
      };
    case actions.CREATE_PAYMENTS_REGISTERS:
      return {
        ...state,
        row,
      };
    case actions.UPDATE_PAYMENTS_REGISTERS:
      return {
        ...state,
        rowUpdate,
        updateMode,
        cellValue,
      };
    case actions.DELETE_PAYMENTS_REGISTERS:
      return {
        ...state,
        rowUpdate,
        paymentId,
      };
    case actions.ADD_STUDENT:
      return {
        ...state,
        row,
        initDataStudents,
        onModalClose,
      };
    case actions.DELETE_STUDENTS:
      return {
        ...state,
        students,
      };
    case actions.UPDATE_STUDENT:
      return {
        ...state,
        rowUpdate,
        cellName,
        cellValue,
      };
    case actions.IMPORT_STUDENTS:
      return {
        ...state,
      };
    case actions.EXPORT_STUDENTS:
      return {
        ...state,
      };
    case actions.STUDENT_CLASS_DASHBOARD:
      return {
        ...state,
        dataFetchedStudentClasses: [{}],
        [namespace]: selectedTab,
      };
    case actions.STUDENT_CLASS_DATA_FETCHED:
      return {
        ...state,
        dataFetchedStudentClasses,
      };
    case actions.DATA_INITIALIZATION:
      // debugger;
      return {
        ...state,
        initDataStudentClasses,
        initDataStudents,
        initPayments,
        initRegistrations,
        studentClassesWithLinks,
        filteredStudentClassesWithLinks,
        processedStudentClasses,
        page,
        initDataAllStudents,
      };
    case actions.SAGAS_GET_ACTIVE_PAGE_DATA:
      return {
        ...state,
        initDataStudents: activePageDataStudents,
      };
    case actions.SAVE_NEW_CLASS:
      return {
        ...state,
        row,
        studentClassesWithLinks,
        onModalClose,
      };
    case actions.DELETE_CLASS:
      return {
        ...state,
        classId,
      };
    case actions.UPDATE_CLASS:
      return {
        ...state,
        rowUpdate,
        desc,
        studentClassesWithLinks,
        updateMode,
      };
    case actions.CHANGE_SELECTED_TAB:
      return {
        ...state,
        [namespace]: selectedTab,
      };
    case actions.UPDATE_REGISTERS:
      return {
        ...state,
        rowUpdate,
      };
    case actions.CREATE_REGISTERS:
      return {
        ...state,
        rowUpdate,
        onModalClose,
      };
    // case actions.DELETE_REGISTERS:
    //   return {
    //     ...state,
    //     registerId,
    //   };
    case actions.DELETE_REGISTERS:
      return {
        ...state,
        registers,
      };
    case actions.LOADING_HANDLING:
      return {
        ...state,
        loadingHandlingCommplete,
      };
    case actions.GET_SUBCLASS:
      return {
        ...state,
        url,
        parentDesc,
        obj,
      };
    case actions.SAGAS_GET_SUBCLASS:
      return {
        ...state,
        classesPair,
      };
    case actions.DATA_REGISTERS:
      return {
        ...state,
        saved_student,

      };
    case actions.SAGAS_DATA_REGISTERS:
      return {
        ...state,
        dataRegistersLoaded,
      };
    case actions.DATA_PAYMENTS_REGISTERS:
      return {
        ...state,
        saved_student,

      };
    case actions.SAGAS_DATA_PAYMENTS_REGISTERS:
      return {
        ...state,
        dataPaymentsRegistersLoaded,
      };
    case actions.CHANGE_TEXT:
      return {
        ...state,
        text,
      };
    case actions.DISPLAY_INITIAL_MSG:
      return {
        ...state,
        displayInitialMsg,
      };
    case actions.COUNTING_TIME:
      seconds = seconds + 1;
      return {
        ...state,
        seconds,
      };
    case actions.TIME_ELAPSED:
      return {
        ...state,
        timePassed,
      };
    case actions.SET_TIMER:
      return {
        ...state,
        timer,
      };
    case actions.NON_TERMINAL_CLASSES:
      return {
        ...state,
        setNonTerminalClasses,
      };
    case actions.FILTER_NON_TERMINAL_CLASSES:
      return {
        ...state,
        filteredClasses,
      };
    case actions.MATCH_NAMES:
      return {
        ...state,
        fname,
        email,
      };
    case actions.SAGAS_DELETE_STUDENTS:
      return {
        ...state,
        success,
      };
    case actions.SET_ACTIVE_PAGE:
      return {
        ...state,
        activePage,
      };
    case actions.SEARCHING:
      return {
        ...state,
        searchingStatus,
      };
    default:
      return state;
  }
};
export default reducer;
