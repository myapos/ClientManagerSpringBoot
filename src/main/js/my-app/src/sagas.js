import { takeEvery, call, put, select } from 'redux-saga/effects';

import * as api from './api/index.js';
import * as actions from './actions';

function* getDataFromServer () {
  console.log('getDataFromServer');
  const state = yield select();
  const initDataStudentClasses = yield call(api.getStudentClasses, state);
  const initDataStudents = yield call(api.getStudents, state);
  const initPayments = yield call(api.getPayeds, state);
  // const initRegistrations = yield call(api.getRegisters, state);
  const initRegistrations = yield call(api.getDataRegisters, state);
  // const initRegistrations = yield call(api.getDataRegistersAsyncAwait, state);
  console.log('initPayments:', initPayments);
  yield put({
    type: actions.DATA_INITIALIZATION,
    initRegistrations,
    initDataStudentClasses,
    initDataStudents,
    initPayments,
  });
}

function* getStudentClasses () {
	// console.log('getStudentClasses');
  const state = yield select();
  const dataFetchedStudentClasses = yield call(api.getStudentClasses, state);
  yield put({
    type: actions.STUDENT_CLASS_DATA_FETCHED,
    dataFetchedStudentClasses,
  });
}

function* saveNewStudentClass () {
	// console.log('saveNewStudentClass');
  const state = yield select();
  const saveNewClass = yield call(api.saveNewClass, state.row);
  yield put({
    type: actions.SAGAS_SAVE_NEW_CLASS,
    saveNewClass,
  });
}

function* deleteStudentClass () {
	// console.log('deleteStudentClass');
  const state = yield select();
  const deleteStudentClassRes = yield call(api.deleteStudentClass, state.classId);

  yield put({
    type: actions.SAGAS_DELETE_CLASS,
    deleteStudentClassRes,
  });
}

function* updateStudentClass () {
	// console.log('updateStudentClass');
  const state = yield select();
  const desc = yield call(api.updateStudentClass, state.desc, state.rowUpdate);

  yield put({
    type: actions.SAGAS_UPDATE_CLASS,
    desc,
  });
}

function* saveNewStudent () {
	// console.log('saveNewStudent');
  const state = yield select();
  const saveNewStudentRes = yield call(api.saveNewStudent, state.row, state.initDataStudents);

  yield put({
    type: actions.SAGAS_SAVE_NEW_STUDENT,
    saveNewStudentRes,
  });
}

function* deleteStudent () {
	// console.log('deleteStudent');
  const state = yield select();
  const studentId = yield call(api.deleteStudent, state.studentId);

  yield put({
    type: actions.SAGAS_DELETE_STUDENT,
    studentId,
  });
}

function* updateStudent () {
	// console.log('updateStudent');
  const state = yield select();
  const row = yield call(api.updateStudent, state.rowUpdate);

  yield put({
    type: actions.SAGAS_UPDATE_STUDENT,
    row,
  });
}

function* addPaymentRegisters () {
	// console.log('addPaymentRegisters');
  const state = yield select();
  const row = yield call(api.addPaymentRegisters, state.row);

  yield put({
    type: actions.SAGAS_CREATE_PAYMENTS_REGISTERS,
    row,
  });
}

function* updatePaymentRegisters () {
	// console.log('updatePaymentRegisters');
  const state = yield select();
  const rowUpdate = yield call(api.updatePaymentRegisters, state.updateMode, state.rowUpdate);
  yield put({
    type: actions.SAGAS_UPDATE_PAYMENTS_REGISTERS,
    rowUpdate,
  });
}

function* deletePaymentRegisters () {
	// console.log('deletePaymentRegisters');
  const state = yield select();
  const row = yield call(api.deletePaymentRegisters, state.rowUpdate, state.paymentId);
  yield put({
    type: actions.SAGAS_DELETE_PAYMENTS_REGISTERS,
    row,
  });
}

function* createRegisters () {
	// console.log('createRegisters');
  const state = yield select();
  const row = yield call(api.createRegisters, state.rowUpdate);
  yield put({
    type: actions.SAGAS_CREATE_REGISTERS,
    row,
  });
}

function* updateRegisters () {
	// console.log('updateRegisters');
  const state = yield select();
  const row = yield call(api.updateRegisters, state.rowUpdate);

  yield put({
    type: actions.SAGAS_UPDATE_REGISTERS,
    row,
  });
}

function* deleteRegisters () {
	// console.log('deleteRegister');
  const state = yield select();
  const registerId = yield call(api.deleteRegisters, state.registerId);

  yield put({
    type: actions.SAGAS_DELETE_REGISTERS,
    registerId,
  });
}

function* msgSubmitted () {
	// console.log('msgSubmitted');
  const state = yield select();
  const msg = yield call(api.msgSubmitted, state.msg, state.selectedClass);

  yield put({
    type: actions.SAGAS_MSG_SUBMITTED,
    msg,
  });
}

function* getSubClass () {
  // console.log('msgSubmitted');
  const state = yield select();
  const classesPair = yield call(api.getSubClass, state.url, state.parentDesc, state.obj);
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
  // console.log('msgSubmitted');
  const state = yield select();
  const dataPaymentsRegistersLoaded = yield call(api.getDataPaymentsRegisters, state.saved_student);
  // console.log("SAGAS_DATA_REGISTERS",dataRegisters);
  yield put({
    type: actions.SAGAS_DATA_PAYMENTS_REGISTERS,
    dataPaymentsRegistersLoaded,
  });
}

function* rootSaga () {
  yield getDataFromServer();
  yield takeEvery(actions.STUDENT_CLASS_DASHBOARD, getStudentClasses);
  yield takeEvery(actions.SAVE_NEW_CLASS, saveNewStudentClass);
  yield takeEvery(actions.DELETE_CLASS, deleteStudentClass);
  yield takeEvery(actions.UPDATE_CLASS, updateStudentClass);
  yield takeEvery(actions.ADD_STUDENT, saveNewStudent);
  yield takeEvery(actions.DELETE_STUDENT, deleteStudent);
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
}

export default rootSaga;
