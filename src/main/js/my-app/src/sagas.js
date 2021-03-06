import { takeEvery, call, put, select } from 'redux-saga/effects';

import * as api from './api/index.js';
import * as actions from './actions';
import * as utils from './utils';

function* getDataFromServer () {
  console.log('getDataFromServer');

  const state = yield select();

  const initDataStudentClasses_ = yield call(api.getStudentClasses, state);

  const initDataStudents_ = yield call(api.getStudents, 'pagination');

  const { page } = initDataStudents_;

  // change me to get new functionality from server

  const data = yield call(api.getData, state);

  // preprocess area

  const {
    listOfRegistrations: initRegistrations__,
    listOfPayments: initPayments__,
    listOfStudents: initDataAllStudents,
  } = data;

  const initRegistrations = yield utils.preprocessDate(initRegistrations__, 'dateOfRegistration');

  const initPayments = yield utils.preprocessDate(initPayments__, 'dateOfPayment');

  const initDataStudentClasses = yield utils.preprocessStudentClasses(initDataStudentClasses_, 'description');

  const initDataStudents = yield utils.preprocessStudents(initDataStudents_);

  const studentClassesWithLinks = yield utils.preprocessStudentClassesWithLinks(initDataStudentClasses_);

  const filteredStudentClassesWithLinks = yield utils.filterStudentClassesWithLinks(studentClassesWithLinks);

  const processedStudentClasses = yield utils.preprocessStudentClasses(filteredStudentClassesWithLinks, 'parentClass');

  yield put({
    type: actions.DATA_INITIALIZATION,
    initDataStudents,
    initDataAllStudents,
    initRegistrations,
    initDataStudentClasses,
    studentClassesWithLinks,
    filteredStudentClassesWithLinks,
    processedStudentClasses,
    initPayments,
    page,
  });
}

function* getStudentClasses () {
  const state = yield select();
  const dataFetchedStudentClasses = yield call(api.getStudentClasses, state);
  yield put({
    type: actions.STUDENT_CLASS_DATA_FETCHED,
    dataFetchedStudentClasses,
  });
}

function* saveNewStudentClass () {
  const state = yield select();
  const saveNewClass = yield call(api.saveNewClass, state.row, state.studentClassesWithLinks, state.onModalClose);
  yield put({
    type: actions.SAGAS_SAVE_NEW_CLASS,
    saveNewClass,
  });

   /* get data again */
  yield getDataFromServer();
}

function* deleteStudentClass () {
  const state = yield select();
  const deleteStudentClassRes = yield call(api.deleteStudentClass, state.classId);

  yield put({
    type: actions.SAGAS_DELETE_CLASS,
    deleteStudentClassRes,
  });

  /* get data again */
  yield getDataFromServer();
}

function* updateStudentClass () {
  const state = yield select();
  const desc = yield call(
    api.updateStudentClass,
    state.desc,
    state.rowUpdate,
    state.studentClassesWithLinks,
    state.updateMode);

  yield put({
    type: actions.SAGAS_UPDATE_CLASS,
    desc,
  });
  /* get data again */
  yield getDataFromServer();
}

function* saveNewStudent () {
  const state = yield select();
  const saveNewStudentRes = yield call(api.saveNewStudent, state.row, state.initDataStudents, state.onModalClose);

  yield put({
    type: actions.SAGAS_SAVE_NEW_STUDENT,
    saveNewStudentRes,
  });
}

function* deleteStudents () {
  const state = yield select();

  const { success } = yield call(api.deleteStudents, state.students);
  yield put({
    type: actions.SAGAS_DELETE_STUDENTS,
    success,
  });

  /* get data again */
  yield getDataFromServer();
}

function* updateStudent () {
  const state = yield select();
  const row = yield call(api.updateStudent, state.rowUpdate, state.cellName, state.cellValue);

  yield put({
    type: actions.SAGAS_UPDATE_STUDENT,
    row,
  });

  /* get data again */
  yield getDataFromServer();
}

function* addPaymentRegisters () {
  const state = yield select();
  const row = yield call(api.addPaymentRegisters, state.row);

  yield put({
    type: actions.SAGAS_CREATE_PAYMENTS_REGISTERS,
    row,
  });
}

function* updatePaymentRegisters () {
  const state = yield select();
  const rowUpdate = yield call(api.updatePaymentRegisters, state.updateMode, state.rowUpdate, state.cellValue);
  yield put({
    type: actions.SAGAS_UPDATE_PAYMENTS_REGISTERS,
    rowUpdate,
  });
  /* get data again */
  yield getDataFromServer();
}

function* deletePaymentRegisters () {
  const state = yield select();
  const row = yield call(api.deletePaymentRegisters, state.rowUpdate, state.paymentId);
  yield put({
    type: actions.SAGAS_DELETE_PAYMENTS_REGISTERS,
    row,
  });
  /* get data again */
  yield getDataFromServer();
}

function* createRegisters () {
  const state = yield select();
  const row = yield call(api.saveNewRegisters, state.rowUpdate, state.onModalClose);
  yield put({
    type: actions.SAGAS_CREATE_REGISTERS,
    row,
  });

  /* get data again */
  yield getDataFromServer();
}

function* updateRegisters () {
  const state = yield select();
  const row = yield call(api.updateRegisters, state.rowUpdate);

  yield put({
    type: actions.SAGAS_UPDATE_REGISTERS,
    row,
  });

   /* get data again */
  yield getDataFromServer();
}

function* deleteRegisters () {
  const state = yield select();
  const { success } = yield call(api.deleteRegisters, state.registers);
  yield put({
    type: actions.SAGAS_DELETE_REGISTERS,
    success,
  });
  /* get data again */
  yield getDataFromServer();
}

function* msgSubmitted () {
  const state = yield select();
  const msg = yield call(api.msgSubmitted, state.msg, state.selectedClass);

  yield put({
    type: actions.SAGAS_MSG_SUBMITTED,
    msg,
  });
}

function* getSubClass () {
  const state = yield select();
  const classesPair = yield call(api.getSubClass, state.url, state.parentDesc, state.obj);
  debugger;
  yield put({
    type: actions.SAGAS_GET_SUBCLASS,
    classesPair,
  });
}

function* getDataRegisters () {
  const state = yield select();
  const dataRegistersLoaded = yield call(api.getDataRegisters);

  console.log('dataRegistersLoaded:', dataRegistersLoaded);
  yield put({
    type: actions.SAGAS_DATA_REGISTERS,
    dataRegistersLoaded,
  });
}

function* getDataPaymentsRegisters () {
  const state = yield select();
  const dataPaymentsRegistersLoaded = yield call(api.getDataPaymentsRegisters, state.saved_student);
  yield put({
    type: actions.SAGAS_DATA_PAYMENTS_REGISTERS,
    dataPaymentsRegistersLoaded,
  });
}

function* getActivePageData () {
  const state = yield select();
  const { page, activePage } = state;
  const { students: activePageDataStudents_ } = yield call(api.getActivePageData, page, activePage);
  const activePageDataStudents = yield utils.preprocessStudents(activePageDataStudents_);
  yield put({
    type: actions.SAGAS_GET_ACTIVE_PAGE_DATA,
    activePageDataStudents,
  });
}

function* rootSaga () {
  yield getDataFromServer();
  yield takeEvery(actions.STUDENT_CLASS_DASHBOARD, getStudentClasses);
  yield takeEvery(actions.SAVE_NEW_CLASS, saveNewStudentClass);
  yield takeEvery(actions.DELETE_CLASS, deleteStudentClass);
  yield takeEvery(actions.UPDATE_CLASS, updateStudentClass);
  yield takeEvery(actions.ADD_STUDENT, saveNewStudent);
  yield takeEvery(actions.DELETE_STUDENTS, deleteStudents);
  yield takeEvery(actions.UPDATE_STUDENT, updateStudent);
  yield takeEvery(actions.CREATE_PAYMENTS_REGISTERS, addPaymentRegisters);
  yield takeEvery(actions.UPDATE_PAYMENTS_REGISTERS, updatePaymentRegisters);
  yield takeEvery(actions.DELETE_PAYMENTS_REGISTERS, deletePaymentRegisters);
  yield takeEvery(actions.CREATE_REGISTERS, createRegisters);
  yield takeEvery(actions.UPDATE_REGISTERS, updateRegisters);
  yield takeEvery(actions.DELETE_REGISTERS, deleteRegisters);
  yield takeEvery(actions.MSG_SUBMITTED, msgSubmitted);
  yield takeEvery(actions.GET_SUBCLASS, getSubClass);
  yield takeEvery(actions.DATA_REGISTERS, getDataRegisters);
  yield takeEvery(actions.DATA_PAYMENTS_REGISTERS, getDataPaymentsRegisters);
  yield takeEvery(actions.SET_ACTIVE_PAGE, getActivePageData);
}

export default rootSaga;
